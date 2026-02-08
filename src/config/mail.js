import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { configDotenv } from 'dotenv';


let transporter;

const createTransporter = async () => {
  if (transporter) return transporter;
  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
  });
  return transporter;
};



export const sendEmail = async ({ to }) => {
 const otp = generateOTP();
 const activeTransporter = await createTransporter();
  const info = await activeTransporter.sendMail({
    from: '"Advanced Auth System" <no-reply@authapp.com>',
    to ,
    subject: "Your 2FA Verification Code",
      html: `
    <div style="font-family: sans-serif; text-align: center;">
      <h2>Verification Code</h2>
      <p>Use the code below to complete your login. It expires in 10 minutes.</p>
      <h1 style="letter-spacing: 5px; color: #4A90E2;">${otp}</h1>
    </div>`
  });

  console.log("Email sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
return otp;
};

export const generateOTP = () => {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
};

export const resetPasswordSendEmail = async ({to,resetUrl}) => {
  try {
    if (!to) {
      console.error("❌ Error: Recipient email is missing!");
      return;
    }
    const activeTransporter = await createTransporter();
    const info = await activeTransporter.sendMail({
      from: '"Advanced Auth System" <no-reply@authapp.com>',
      to,
      subject: "Password Reset Request",
      html: `
        <h2>Reset Your Password</h2>
        <p>You requested a password reset. Click the link below to set a new password:</p>
        <a href="${resetUrl}" style="background: blue; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
  })
   console.log("Email sent: %s", info.messageId);
  console.log(" Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return;
  } catch (error) {
     console.error("Forgot Password email Error:", error);
     return;
  }
} 

export const send2FAEmail = async ({ to, code }) => {
  try {
    console.log(to);
    console.log(code)
    if (!to || !code) {
      console.error("❌ Error: Recipient email or 2FA code is missing!");
      return false;
    }

    const activeTransporter = await createTransporter();

    const info = await activeTransporter.sendMail({
      from: '"Advanced Auth System" <no-reply@authapp.com>',
      to,
      subject: "Your 2FA Login Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4F46E5;">Two-Factor Authentication</h2>
          <p>Please enter the following verification code to complete your login:</p>
          
          <div style="background: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="font-size: 32px; letter-spacing: 5px; color: #333; margin: 0;">${code}</h1>
          </div>

          <p>This code expires in <strong>10 minutes</strong>.</p>
          <p style="font-size: 12px; color: #666;">If you did not attempt to login, please change your password immediately.</p>
        </div>
      `
    });

    console.log("2FA Email sent: %s", info.messageId);
    
    // Log Preview URL only in development
    if (process.env.NODE_ENV !== 'production') {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    return true;

  } catch (error) {
    console.error("❌ 2FA Email Error:", error);
    return false;
  }
};

