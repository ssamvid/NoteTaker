import nodemailer from "nodemailer";

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 10_000,
    });
  }
  return transporter;
}

export async function sendPasswordResetEmail(to, resetLink) {
  await getTransporter().sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: "Reset your Note Taker password",
    html: `
      <p>We received a request to reset your Note Taker password.</p>
      <p><a href="${resetLink}">Click here to choose a new password</a>. This link expires in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });
}
