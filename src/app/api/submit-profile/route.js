import { NextResponse } from 'next/server';

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: 'Email service is not configured.' },
                { status: 500 }
            );
        }

        const { candidateName, candidateEmail, portfolioUrl, specialMessage } = await request.json();

        if (!candidateName || !candidateEmail || !portfolioUrl) {
            return NextResponse.json(
                { error: 'Please fill in required fields.' },
                { status: 400 }
            );
        }

        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: process.env.RESEND_FROM || 'Extrive Website <info@extriveinnovations.com>',
                to: [process.env.CONTACT_EMAIL || 'info@extriveinnovations.com'],
                reply_to: candidateEmail,
                subject: `New Application from ${candidateName}`,
                html: `
                    <h2 style="font-family:sans-serif;color:#1a1a1a;">New Engineering/Career Application</h2>
                    <table style="border-collapse:collapse;font-family:sans-serif;width:100%;max-width:500px;">
                        <tr style="border-bottom:1px solid #eee;">
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Name</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${candidateName}</td>
                        </tr>
                        <tr style="border-bottom:1px solid #eee;">
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Email</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${candidateEmail}</td>
                        </tr>
                        <tr style="border-bottom:1px solid #eee;">
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Portfolio/LinkedIn</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${portfolioUrl}</td>
                        </tr>
                        <tr>
                            <td style="padding:12px 16px;font-weight:bold;color:#555;">Why Extrive?</td>
                            <td style="padding:12px 16px;color:#1a1a1a;">${specialMessage || '—'}</td>
                        </tr>
                    </table>
                `,
            }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Resend API error:', res.status, errorText);
            return NextResponse.json(
                { error: 'Failed to submit profile.', details: errorText },
                { status: 500 }
            );
        }

        const data = await res.json();
        return NextResponse.json({ success: true, id: data.id });

    } catch (err) {
        console.error('Profile submit error:', err);
        return NextResponse.json(
            { error: 'Failed to submit. Please try again later.' },
            { status: 500 }
        );
    }
}
