import express from "express";
import { createUser, getUserByEmail, getUserBySessionToken, updateUserById } from "../../db/model/users";
import { authentication, random } from "../../db/helpers";
import { SESSION_TOKEN } from "../../const";
import { get } from "lodash";
import nodemailer from "nodemailer";


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password, username} = req.body;
        if (!email || !password || !username) {
         return res.status(400).json({ message: "Missing requirements" });
        }
        const existingUser = await getUserByEmail(email);

        if (existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 5 characters long" });
        }
        const salt = random();
        if (!salt) {
            return res.status(500).json({ message: "No salt" });
          }
      
         await createUser({email, username, authentication: {
            salt,
            password: authentication(password, salt)}});
            return res.status(200).json({message: "User created"});
    } catch (error) {
        console.log("register error: ", error);
        return res.status(500).json({ message: "Could not register user" });
    }
}  

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Could not login user" });
        }
        const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
        if (!user){
            return res.status(404).json({ message: "User does not exist" });
        }
        const expectedHash = authentication(password, user.authentication.salt);
        if (user.authentication.password !== expectedHash){
            return res.status(403).json({ message: "Invalid access" });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie(SESSION_TOKEN, user.authentication.sessionToken, {  
            // domain: process.env.DOMAIN, // Ensure DOMAIN is set correctly
            path: "/",
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "lax",});
        return res.status(200).json(user);

    } catch (error) {
        console.log("login error: ", error);
        return res.status(500).json({ message: "Could not login user" });
    }
}

export const logout = async (req: express.Request, res: express.Response) => {
    try {
  
        
        const sessionToken = req.cookies[SESSION_TOKEN];
        if (!sessionToken) {
            return res.status(404).json({ message: "No session token found" });
        }

        // Get user ID from middleware or session
        const userId = get(req, "user._id");
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user found" });
        }

        res.clearCookie(SESSION_TOKEN, {
            // domain: process.env.DOMAIN, // Ensure DOMAIN is set correctly
            path: "/",
            httpOnly: true,
            // secure: process.env.NODE_ENV === "production", // Only secure in production
            sameSite: "lax",
        });

        return res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ message: "Could not logout user" });
    }
};

export const resetPassword = async (req: express.Request, res: express.Response) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.EMAIL_PASS 
        }
    });

    
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({ message: "Missing email" });
        }
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found by email" });
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        const resetLink = `http://${process.env.domain}/reset-password?token=${user.authentication.sessionToken}`;
        const mailOptions = {
            from: "Finance Tracker Support" ,
            to: email,
            subject: 'Finance Tracker Password Reset Request',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #2C3E50;">Password Reset Request</h2>
                <p>Hello,</p>
                <p>We received a request to reset your password for your <strong>Finance Tracker</strong> account. Click the button below to set a new password:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${resetLink}" 
                        style="background-color: #3498DB; color: white; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">
                        Reset Password
                    </a>
                </div>
                <p>If you did not request this, you can safely ignore this email. Your password will not change unless you take action.</p>
                <hr>
                <p style="font-size: 12px; color: #7F8C8D;">If you're having trouble clicking the button, copy and paste this link into your browser:</p>
                <p style="font-size: 12px; word-break: break-word;">${resetLink}</p>
                <p style="font-size: 12px; color: #7F8C8D;">Best regards, <br>Finance Tracker Support Team</p>
            </div>
        `,
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
          console.error("resetPassword error:", error);
        return res.status(500).json({ message: "Could not reset user's password" });
    }
}