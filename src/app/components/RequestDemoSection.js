'use client';

import { useEffect, useRef, useState } from 'react';

export default function RequestDemoSection() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [focusedField, setFocusedField] = useState(null);
    const [form, setForm] = useState({
        name: '',
        company: '',
        email: '',
        industry: '',
        message: '',
    });

    /* ── Scroll-triggered entrance ── */
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const filled = (field) => form[field]?.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const res = await fetch('/api/request-demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setStatus('success');
                setForm({ name: '', company: '', email: '', industry: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    /* ── Field helper ── */
    const fieldClass = (name) =>
        `rdemo-field${focusedField === name || filled(name) ? ' active' : ''}`;

    return (
        <section className="rdemo-section" id="demo" ref={sectionRef}>
            {/* ── Cinematic background layers ── */}
            <div className="rdemo-spotlight-top" />
            <div className="rdemo-spotlight-bottom" />
            <div className="rdemo-light-beam" />
            <div className="rdemo-grain" />

            <div className="rdemo-container">
                {/* ── Header ── */}
                <div className={`rdemo-header${isVisible ? ' rdemo-visible' : ''}`}>
                    <h2 className="rdemo-title">
                        Request a <span className="rdemo-orange">Demo</span>
                    </h2>
                    <p className="rdemo-subtitle">
                        Interested in deploying assistive exosuits in your workplace or
                        learning more about Extrive technologies? Submit a request and our
                        team will get in touch.
                    </p>
                </div>

                {/* ── Form Card ── */}
                <form
                    className={`rdemo-card${isVisible ? ' rdemo-visible' : ''}`}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    {/* Shimmer line */}
                    <div className="rdemo-shimmer" />

                    <div className="rdemo-grid">
                        {/* Row 1 */}
                        <div className={fieldClass('name')}>
                            <input
                                type="text"
                                name="name"
                                id="rdemo-name"
                                className="rdemo-input"
                                required
                                value={form.name}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="rdemo-name" className="rdemo-label">Name</label>
                        </div>

                        <div className={fieldClass('company')}>
                            <input
                                type="text"
                                name="company"
                                id="rdemo-company"
                                className="rdemo-input"
                                required
                                value={form.company}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('company')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="rdemo-company" className="rdemo-label">Company</label>
                        </div>

                        {/* Row 2 */}
                        <div className={fieldClass('email')}>
                            <input
                                type="email"
                                name="email"
                                id="rdemo-email"
                                className="rdemo-input"
                                required
                                value={form.email}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="rdemo-email" className="rdemo-label">Email</label>
                        </div>

                        <div className={fieldClass('industry')}>
                            <input
                                type="text"
                                name="industry"
                                id="rdemo-industry"
                                className="rdemo-input"
                                required
                                value={form.industry}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('industry')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="rdemo-industry" className="rdemo-label">Industry</label>
                        </div>

                        {/* Row 3 — full width */}
                        <div className={`${fieldClass('message')} rdemo-full`}>
                            <textarea
                                name="message"
                                id="rdemo-message"
                                className="rdemo-input rdemo-textarea"
                                rows="4"
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <label htmlFor="rdemo-message" className="rdemo-label">What's your biggest workplace challenge</label>
                        </div>
                    </div>

                    {/* ── Button ── */}
                    <button
                        type="submit"
                        className="rdemo-btn"
                        disabled={status === 'sending'}
                    >
                        <span className="rdemo-btn-text">
                            {status === 'sending' ? 'Sending…' : 'Request Demo'}
                        </span>
                        <span className="rdemo-btn-shine" />
                    </button>

                    {/* ── Status messages ── */}
                    {status === 'success' && (
                        <p className="rdemo-success">
                            Thank you. Our team will contact you shortly.
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="rdemo-error">
                            Something went wrong. Please try again.
                        </p>
                    )}

                    {/* ── Trust line ── */}
                    <p className="rdemo-trust">
                        We respond within 24–48 hours. All discussions are confidential.
                    </p>
                </form>
            </div>
        </section>
    );
}
