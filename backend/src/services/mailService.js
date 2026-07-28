import { Resend } from "resend";

let resend;

function getClient() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// `onboarding@resend.dev` is Resend's shared sandbox sender — it works with
// no setup, but until a custom domain is verified in Resend, it can only
// deliver to the email address on the Resend account itself, not to
// arbitrary users. Swap RESEND_FROM once a verified domain is set up.
const FROM = process.env.RESEND_FROM ?? "Note Taker <onboarding@resend.dev>";

export async function sendPasswordResetEmail(to, resetLink) {
  const { error } = await getClient().emails.send({
    from: FROM,
    to,
    subject: "Reset your Note Taker password",
    html: `
      <p>We received a request to reset your Note Taker password.</p>
      <p><a href="${resetLink}">Click here to choose a new password</a>. This link expires in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}
