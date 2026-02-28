import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { name, company, email, industry, message } = await request.json();

        /* ── Validate ── */
        if (!name || !company || !email || !industry) {
            return Response.json(
                { error: 'Please fill in all required fields.' },
                { status: 400 }
            );
        }

        /* ── Build transporter ── */
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        /* ── Compose email ── */
        const mailOptions = {
            from: `"Extrive Website" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            replyTo: email,
            subject: `Demo Request from ${name} — ${company}`,
            html: `
        <h2>New Demo Request</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;">
          <tr><td style="padding:8px 16px;font-weight:bold;">Name</td><td style="padding:8px 16px;">${name}</td></tr>
          <tr><td style="padding:8px 16px;font-weight:bold;">Company</td><td style="padding:8px 16px;">${company}</td></tr>
          <tr><td style="padding:8px 16px;font-weight:bold;">Email</td><td style="padding:8px 16px;">${email}</td></tr>
          <tr><td style="padding:8px 16px;font-weight:bold;">Industry</td><td style="padding:8px 16px;">${industry}</td></tr>
          <tr><td style="padding:8px 16px;font-weight:bold;">Message</td><td style="padding:8px 16px;">${message || '—'}</td></tr>
        </table>
      `,
        };

        /* ── Send ── */
        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            // Dev mode — log to console when SMTP is not configured
            console.log('📧 Demo request (SMTP not configured):', { name, company, email, industry, message });
        }

        return Response.json({ success: true });
    } catch (err) {
        console.error('Email send error:', err);
        return Response.json(
            { error: 'Failed to send request. Please try again later.' },
            { status: 500 }
        );
    }
}
