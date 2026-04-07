import { NextResponse } from 'next/server';

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'Email service is not configured (missing RESEND_API_KEY).' },
                { status: 500 }
            );
        }

        const { name, company, role, email, facilityType, message } = await request.json();

        /* ── Validate required fields ── */
        if (!name || !company || !email || !facilityType) {
            return NextResponse.json(
                { error: 'Please fill in all required fields.' },
                { status: 400 }
            );
        }

        /* ── Send via Resend REST API ── */
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: process.env.RESEND_FROM || 'Extrive Website <info@extriveinnovations.com>',
                to: [process.env.CONTACT_EMAIL || 'info@extriveinnovations.com'],
                reply_to: email,
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
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Role</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${role || '—'}</td>
                        </tr>
                        <tr style="border-bottom:1px solid #eee;">
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Email</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${email}</td>
                        </tr>
                        <tr style="border-bottom:1px solid #eee;">
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Facility Type</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${facilityType}</td>
                        </tr>
                        <tr>
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Message</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${message || '—'}</td>
                        </tr>
                    </table>
                `,
            }),
        });

        /* ── Handle Resend API errors ── */
        if (!res.ok) {
            const errorText = await res.text();
            console.error('Resend API error:', res.status, errorText);
            return NextResponse.json(
                { error: 'Failed to send request.', details: errorText },
                { status: 500 }
            );
        }

        const data = await res.json();
        return NextResponse.json({ success: true, id: data.id });

    } catch (err) {
        console.error('Email send error:', err);
        return NextResponse.json(
            { error: 'Failed to send request. Please try again later.' },
            { status: 500 }
        );
    }
}
