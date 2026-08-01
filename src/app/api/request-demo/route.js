import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const contactEmail =
  process.env.CONTACT_EMAIL || "info@extriveinnovations.com";

const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

export async function POST(req) {
  try {
    const payload = await req.json();

    const {
      name = "",
      email = "",
      role = "",
      company = "",
      facilityType = "",
      message = "",
    } = payload;

    const html = `
      <h1>New Demo Request</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Facility Type:</strong> ${facilityType}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;

    // Send email using Resend
    if (resend) {
      await resend.emails.send({
        from: `noreply@${
          new URL(
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost"
          ).hostname
        }`,
        to: contactEmail,
        subject: `New demo request from ${name || "a user"}`,
        html,
      });
    } else {
      console.log("[request-demo] Incoming payload:", payload);
      console.log("RESEND_API_KEY not provided, email not sent.");
    }

    // Trigger Make Webhook
    if (makeWebhookUrl) {
      try {
        const webhookResponse = await fetch(makeWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
            company,
            facilityType,
            message,
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!webhookResponse.ok) {
          console.error(
            "Make webhook responded with:",
            webhookResponse.status
          );
        }
      } catch (err) {
        console.error("Error sending data to Make:", err);
      }
    } else {
      console.warn("MAKE_WEBHOOK_URL is not configured.");
    }

    return new Response(
      JSON.stringify({
        status: "success",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("[request-demo] POST error:", error);

    return new Response(
      JSON.stringify({
        status: "error",
        message: "Unable to process request.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}