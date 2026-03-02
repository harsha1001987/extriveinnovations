export const runtime = "edge";

import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

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

        /* ── Send via Resend ── */
        const { data, error } = await resend.emails.send({
            from: 'Extrive Website <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL || 'info@extriveinnovations.com'],
            replyTo: email,
            subject: `Demo Request from ${name} — ${company}`,
            html: `
                <h2 style="font-family:sans-serif;color:#1a1a1a;">New Demo Request</h2>
                <table style="border-collapse:collapse;font-family:sans-serif;width:100%;max-width:500px;">
                    <tr style="border-bottom:1px solid #eee;">
                        <td style="padding:12px 16px;font-weight:bold;color:#555;">Name</td>
                        <td style="padding:12px 16px;color:#1a1a1a;">${name}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #eee;">
                        <td style="padding:12px 16px;font-weight:bold;color:#555;">Company</td>
                        <td style="padding:12px 16px;color:#1a1a1a;">${company}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #eee;">
                        <td style="padding:12px 16px;font-weight:bold;color:#555;">Email</td>
                        <td style="padding:12px 16px;color:#1a1a1a;">${email}</td>
                    </tr>
                    <tr style="border-bottom:1px solid #eee;">
                        <td style="padding:12px 16px;font-weight:bold;color:#555;">Industry</td>
                        <td style="padding:12px 16px;color:#1a1a1a;">${industry}</td>
                    </tr>
                    <tr>
                        <td style="padding:12px 16px;font-weight:bold;color:#555;">Message</td>
                        <td style="padding:12px 16px;color:#1a1a1a;">${message || '—'}</td>
                    </tr>
                </table>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return Response.json(
                { error: 'Failed to send request. Please try again later.' },
                { status: 500 }
            );
        }

        return Response.json({ success: true, id: data.id });
    } catch (err) {
        console.error('Email send error:', err);
        return Response.json(
            { error: 'Failed to send request. Please try again later.' },
            { status: 500 }
        );
    }
}
