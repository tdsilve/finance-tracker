import crypto from "crypto";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: string) =>
  crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.secret)
    .digest("hex");
export const getHtmlRecoverPassword = (resetLink: string) => `
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
`;
