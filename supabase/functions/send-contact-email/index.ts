import { Resend } from "resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") ?? "");

const EMAIL_TEMPLATE = (name, email, subject, message, timestamp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Form Submission</title>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background-color: #f4f4f6; margin: 0; padding: 0; }
    .container { max-width: 680px; margin: 40px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); overflow: hidden; }
    .header { background: #1a1a1a; color: #ffffff; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; }
    .body { padding: 32px; color: #333333; font-size: 14px; line-height: 1.6; }
    .field { margin-bottom: 24px; }
    .field-label { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #888888; margin-bottom: 6px; }
    .field-value { font-size: 16px; color: #1a1a1a; word-break: break-word; }
    .field-value a { color: #0090ae; text-decoration: none; }
    .footer { padding: 20px 32px; font-size: 11px; color: #888888; text-align: center; border-top: 1px solid #e5e5e5; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="body">
      <div class="field">
        <span class="field-label">Name</span>
        <div class="field-value">${name}</div>
      </div>
      <div class="field">
        <span class="field-label">Email</span>
        <div class="field-value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <span class="field-label">Subject</span>
        <div class="field-value">${subject}</div>
      </div>
      <div class="field">
        <span class="field-label">Message</span>
        <div class="field-value">${message.replace(/\n/g, "<br/>")}</div>
      </div>
      <div class="field">
        <span class="field-label">Received</span>
        <div class="field-value">${timestamp}</div>
      </div>
    </div>
    <div class="footer">
      Sent via Neshan Niroula Portfolio Contact Form
    </div>
  </div>
</body>
</html>
`;

function sanitize(value) {
  if (typeof value !== "string") return "";
  return value.replace(/[<>"'&]/g, "");
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const cleanName = sanitize(name).trim();
    const cleanEmail = sanitize(email).trim();
    const cleanSubject = sanitize(subject).trim();
    const cleanMessage = sanitize(message).trim();
    const timestamp = new Date().toISOString();

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <contact@neshanniroula.com.np>",
      to: ["neshanniroula@gmail.com"],
      subject: `[Portfolio Contact] ${cleanSubject}`,
      html: EMAIL_TEMPLATE(cleanName, cleanEmail, cleanSubject, cleanMessage, timestamp),
      replyTo: cleanEmail,
    });

    if (error) {
      console.error("[send-contact-email] Resend error", error);
      return new Response(
        JSON.stringify({ error: "Failed to send email." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[send-contact-email] Unexpected error", err);
    return new Response(
      JSON.stringify({ error: "Invalid request." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
