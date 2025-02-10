import express from "express";
import {
  createUser,
  getUserByEmail,
  getUserBySessionToken,
} from "../../db/model/users";
import {
  authentication,
  getHtmlRecoverPassword,
  random,
} from "../../db/helpers";
import { SESSION_TOKEN } from "../../const";
import { get } from "lodash";
import nodemailer from "nodemailer";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ message: "Missing requirements" });
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 5) {
      return res
        .status(400)
        .json({ message: "Password must be at least 5 characters long" });
    }
    const salt = random();
    if (!salt) {
      return res.status(500).json({ message: "No salt" });
    }

    await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(password, salt),
      },
    });
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log("register error: ", error);
    return res.status(500).json({ message: "Could not register user" });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(400).json({ message: "Could not login user" });
    }
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password",
    );
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const expectedHash = authentication(password, user.authentication.salt);
    if (user.authentication.password !== expectedHash) {
      return res.status(403).json({ message: "Wrong credentials" });
    }

    const salt = random();
    if (!salt) {
      return res.status(500).json({ message: "No salt" });
    }
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );
    await user.save();
    res.cookie(SESSION_TOKEN, user.authentication.sessionToken, {
      // domain: process.env.DOMAIN, // Ensure DOMAIN is set correctly
      path: "/",
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "lax",
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log("login error: ", error);
    return res.status(500).json({ message: "Could not login user" });
  }
};

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

export const sendResetPasswordEmail = async (
  req: express.Request,
  res: express.Response,
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing email" });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const salt = random();
    if (!salt) {
      return res.status(500).json({ message: "No salt" });
    }
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );

    await user.save();
    const resetLink = `http://${process.env.domain}/reset-password?token=${user.authentication.sessionToken}`;
    const mailOptions = {
      from: "Finance Tracker Support",
      to: email,
      subject: "Finance Tracker Password Reset Request",
      html: getHtmlRecoverPassword(resetLink),
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("sendResetPasswordEmail error:", error);
    return res
      .status(500)
      .json({ message: "Could not send email to reset password" });
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ message: "Missing requirements" });
    }

    const user = await getUserBySessionToken(token);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const salt = random();
    if (!salt) {
      return res.status(500).json({ message: "No salt" });
    }
    user.authentication.salt = salt;
    user.authentication.password = authentication(password, salt);

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("resetPassword error:", error);
    return res.status(500).json({ message: "Could not reset user's password" });
  }
};
