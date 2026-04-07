const apiKey = "re_UUgeQbua_JBTwK7tRxVadQMyAu5Q28Ljb";
fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        from: 'Extrive Website <info@extriveinnovations.com>',
        to: ['info@extriveinnovations.com'],
        subject: `Test request`,
        html: `<h1>Test</h1>`,
    }),
}).then(async res => {
    console.log(res.status);
    console.log(await res.text());
});
