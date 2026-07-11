import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import yardLogo from '../assets/YARD-Logo.png'
import { Clock, MapPin, Zap, Users, Trophy, ChevronDown, ChevronUp } from 'lucide-react'

export default function Circuits() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [selectedSlot, setSelectedSlot] = useState<{ day: string, time: string, type: string } | null>(null)
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSlotSelect = (day: string, time: string, type: string) => {
        setSelectedSlot({ day, time, type })
        setFormData(prev => ({
            ...prev,
            message: `I would like to book the ${day} ${time} ${type} session.`
        }))
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.email.trim()) {
            alert('Please fill in name and email.')
            return
        }
        setIsSubmitting(true)
        setSubmitStatus('idle')
        try {
            const { error } = await supabase.from('circuits_bookings').insert([{
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim() || null,
                message: formData.message.trim() || null,
            }])
            if (error) throw error
            setSubmitStatus('success')
            setFormData({ name: '', email: '', phone: '', message: '' })
            setSelectedSlot(null)
            setTimeout(() => setSubmitStatus('idle'), 5000)
        } catch (error) {
            console.error('Error:', error)
            setSubmitStatus('error')
            setTimeout(() => setSubmitStatus('idle'), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const schedule = [
        { day: 'Monday', times: ['7:30am', '1:00pm'], type: 'HIIT Circuits', emoji: '🔥' },
        { day: 'Wednesday', times: ['7:30am', '1:00pm'], type: 'HIIT Circuits', emoji: '🔥' },
        { day: 'Friday', times: ['7:30am', '1:00pm'], type: 'Combat Circuits', emoji: '🥊' },
    ]

    const faqs = [
        {
            q: 'How do I pay?',
            a: 'For the summer soft launch, simply book your spot via the form and Karl will send you a SumUp payment link by WhatsApp or email. You can also pay cash on the day. Easy. No fuss.'
        },
        {
            q: 'What should I wear and bring?',
            a: 'Comfortable training gear, a water bottle and a towel. Trainers are fine. We train outdoors in a converted garage so dress for the weather and bring layers in cooler months.'
        },
        {
            q: 'Is it suitable for complete beginners?',
            a: 'Absolutely. YARD Circuits is designed for all levels. Karl scales every session so beginners work at their own pace while more advanced athletes push harder. Everyone starts somewhere.'
        },
        {
            q: 'Can my teenager train without me?',
            a: 'Yes. Teens are very welcome. Under 16s should have a parent or guardian sign a consent form first. Karl will send this when you book. The Bring A Friend offer is perfect for getting teens started alongside a parent.'
        },
        {
            q: 'What if I need to cancel?',
            a: 'Life happens. Just let Karl know as soon as possible via WhatsApp on 07595 228772 and he will reschedule you or carry your credit forward. No penalties for the summer soft launch.'
        },
        {
            q: 'Do you train in all weather?',
            a: 'Yes. That is part of the YARD philosophy. The garage is partially covered so you are protected from the worst of it. Rain, wind and cold are all part of building real resilience. We only cancel in extreme conditions and will always give you advance notice.'
        },
        {
            q: 'What is the Bring A Friend offer exactly?',
            a: 'Simple. You book and pay your £8. Your friend comes to their very first YARD Circuits session completely free. Just mention their name when you book. No catches, no hidden fees. Offer runs throughout July 2026.'
        },
    ]

    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: '#111111', fontFamily: "'DM Mono', monospace" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
                .grid-bg {
                    background-image: linear-gradient(rgba(220,38,38,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.07) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .red-glow { color: #ef4444; text-shadow: 0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(220,38,38,0.4); }
                .red-glow-subtle { color: #ef4444; text-shadow: 0 0 10px rgba(220,38,38,0.6), 0 0 20px rgba(220,38,38,0.3); }
                .schedule-row { border: 1px solid rgba(153,27,27,0.4); transition: all 0.3s ease; }
                .schedule-row:hover { border-color: rgba(239,68,68,0.7); background-color: rgba(220,38,38,0.05); }
                .why-card { background-color: rgba(17,17,17,0.8); border: 1px solid rgba(153,27,27,0.4); transition: all 0.3s ease; }
                .why-card:hover { border-color: rgba(239,68,68,0.7); transform: translateY(-2px); }
                .form-input { background-color: rgba(17,17,17,0.8); border: 1px solid rgba(75,85,99,1); transition: border-color 0.3s ease; font-family: 'DM Mono', monospace; }
                .form-input:focus { border-color: #ef4444; outline: none; }
                .offer-banner { background: linear-gradient(135deg, rgba(220,38,38,0.15) 0%, rgba(17,17,17,0.95) 100%); border: 1px solid rgba(239,68,68,0.5); }
                .slot-btn { border: 1px solid rgba(153,27,27,0.4); transition: all 0.3s ease; background: rgba(17,17,17,0.8); }
                .slot-btn:hover { border-color: #ef4444; background: rgba(220,38,38,0.1); cursor: pointer; }
                .slot-btn.selected { border-color: #ef4444; background: rgba(220,38,38,0.2); }
                .faq-item { border: 1px solid rgba(153,27,27,0.3); transition: all 0.3s ease; }
                .faq-item:hover { border-color: rgba(239,68,68,0.5); }
                .faq-item.open { border-color: rgba(239,68,68,0.6); }
            `}</style>

            {/* Nav */}
            <nav className="sticky top-0 z-50 border-b border-red-900" style={{ backgroundColor: '#111111' }}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/">
                        <img src={yardLogo} alt="YARD" className="h-9 w-auto" />
                    </Link>
                    <div className="flex items-center gap-6">
                        <span className="text-red-500 text-sm tracking-widest uppercase hidden sm:block">£8 per class</span>
                        <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-5 py-2 font-medium transition-all">
                            Book Now
                        </a>
                    </div>
                </div>
            </nav>

            {/* Opening Offer Banner */}
            <section className="offer-banner py-10 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-3">🎉 Summer Soft Launch — July 2026</p>
                    <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-tight mb-4">
                        🎁 Bring A Friend — <span className="red-glow-subtle">First Time Free</span>
                    </h2>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                        Grab a mate, a parent, a teen — bring them to their first YARD Circuits session on us. You pay £8. They train for free. No strings. Just results. 💪
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-3 font-medium transition-all">
                            Claim This Offer
                        </a>
                        <span className="text-gray-500 text-sm tracking-widest uppercase">Limited Spaces — July Only</span>
                    </div>
                </div>
            </section>

            {/* Hero */}
            <section className="grid-bg relative min-h-screen flex items-center justify-center text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-8">💪 Drop-In Bootcamp — Barnet, North London</p>
                    <h1 className="text-7xl md:text-9xl font-medium tracking-tight leading-none mb-4 uppercase">YARD</h1>
                    <h1 className="text-7xl md:text-9xl font-medium tracking-tight leading-none mb-12 uppercase red-glow">Circuits</h1>
                    <p className="text-gray-300 text-lg md:text-xl tracking-wide mb-12 max-w-xl mx-auto leading-relaxed">
                        🔥 HIIT. 🥊 Combat. ⚽ Football S&amp;C. All levels welcome. No contracts. Just results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#schedule" className="bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                            Pick Your Session
                        </a>
                        <a href="#contact" className="border border-gray-600 hover:border-red-600 text-gray-300 hover:text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                            Book Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Why Cards */}
            <section className="py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-6xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">The Offer</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-16">
                        Why <span className="red-glow-subtle">Circuits?</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { Icon: Trophy, stat: '£8', label: 'Per Class', desc: 'Drop-in, no contracts, no commitment. Just show up and work.' },
                            { Icon: Users, stat: 'All Levels', label: 'Welcome', desc: 'Parents, teens, beginners, athletes. Everyone pushes hard. Everyone gets results.' },
                            { Icon: Zap, stat: 'Results', label: 'Guaranteed', desc: 'Real coaching. No fluff. Just work, sweat and transformation.' },
                        ].map((item) => (
                            <div key={item.stat} className="why-card p-8 md:p-10">
                                <item.Icon className="mb-4" size={32} color="#ef4444" />
                                <p className="text-3xl md:text-4xl font-medium red-glow-subtle mb-1">{item.stat}</p>
                                <p className="text-gray-400 text-sm tracking-widest uppercase mb-4">{item.label}</p>
                                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bring A Friend */}
            <section className="py-24 px-6 grid-bg">
                <div className="max-w-6xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Opening Offer</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-16">
                        Bring A <span className="red-glow-subtle">Friend</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {[
                            { emoji: '🎁', title: 'First Time Free', desc: 'Bring anyone to their very first YARD Circuits session and they train completely free. No catch.' },
                            { emoji: '👨‍👩‍👧', title: 'Parents + Teens', desc: 'Train together this summer. A shared challenge builds something special. All ages, all levels.' },
                            { emoji: '🏘️', title: 'Community First', desc: 'YARD is for Barnet. Spread the word locally and help build something real in your neighbourhood.' },
                        ].map((item) => (
                            <div key={item.title} className="why-card p-8 md:p-10">
                                <p className="text-5xl mb-5">{item.emoji}</p>
                                <p className="text-white text-lg font-medium uppercase tracking-widest mb-3">{item.title}</p>
                                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Schedule */}
            <section id="schedule" className="py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-4xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Summer 2026</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-4">
                        🗓️ <span className="red-glow-subtle">Schedule</span>
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg mb-4 leading-relaxed">
                        Two sessions daily — early morning or lunchtime. Mon, Wed, Fri throughout July and August.
                    </p>
                    <p className="text-red-400 text-sm mb-12 tracking-wide">
                        👇 Tap a timeslot to pre-fill your booking form
                    </p>
                    <div className="space-y-3 mb-8">
                        {schedule.map((s) => (
                            <div key={s.day} className="schedule-row px-6 py-5">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-white text-base md:text-lg font-medium tracking-wide">{s.day}</span>
                                    <span className="text-red-400 text-sm md:text-base tracking-wide">
                                        {s.emoji} {s.type}
                                    </span>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {s.times.map((t) => {
                                        const isSelected = selectedSlot?.day === s.day && selectedSlot?.time === t
                                        return (
                                            <button
                                                key={t}
                                                onClick={() => handleSlotSelect(s.day, t, s.type)}
                                                className={`slot-btn flex items-center gap-2 px-4 py-2 text-sm tracking-wide ${isSelected ? 'selected text-red-400' : 'text-gray-300'}`}
                                            >
                                                <Clock size={12} color={isSelected ? '#ef4444' : '#9ca3af'} />
                                                {t}
                                                {isSelected && <span className="text-red-400 text-xs ml-1">✓ Selected</span>}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedSlot && (
                        <div className="mb-8 p-4 text-center" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(239,68,68,0.4)' }}>
                            <p className="text-white text-base">
                                ✅ Selected: <span className="text-red-400 font-medium">{selectedSlot.day} {selectedSlot.time} — {selectedSlot.type}</span>
                            </p>
                            <p className="text-gray-400 text-sm mt-1">Scroll down to complete your booking 👇</p>
                        </div>
                    )}
                    <div className="p-6 text-center mb-8" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(239,68,68,0.3)' }}>
                        <p className="text-white text-base md:text-lg">
                            🎁 <span className="text-red-400 font-medium">Bring A Friend</span> — their first session is FREE when you book yours
                        </p>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                        <MapPin size={16} color="#ef4444" />
                        <span>Oakleigh Road North, N20, Barnet — Easy parking available</span>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section id="contact" className="py-24 px-6 grid-bg">
                <div className="max-w-2xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Get Started</p>
                    <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-tight mb-4">
                        Book Your <span className="red-glow-subtle">Spot</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                        Fill in below and Karl will confirm your session and send a payment link. 💪
                    </p>
                    <p className="text-red-400 text-base mb-12 leading-relaxed">
                        🎁 Bringing a friend? Just mention their name in the message box — their first session is free!
                    </p>
                    {selectedSlot && (
                        <div className="mb-6 p-4" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(239,68,68,0.4)' }}>
                            <p className="text-red-400 text-sm tracking-widest uppercase mb-1">Selected Session</p>
                            <p className="text-white text-base font-medium">{selectedSlot.day} {selectedSlot.time} — {selectedSlot.type}</p>
                            <button
                                onClick={() => { setSelectedSlot(null); setFormData(prev => ({ ...prev, message: '' })) }}
                                className="text-gray-500 text-xs mt-2 hover:text-red-400 transition-colors"
                            >
                                Clear selection
                            </button>
                        </div>
                    )}
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Full Name *"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input w-full px-5 py-4 text-white text-base"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address *"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input w-full px-5 py-4 text-white text-base"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="form-input w-full px-5 py-4 text-white text-base"
                        />
                        <textarea
                            name="message"
                            placeholder="Bringing a friend? Tell us their name here! Any questions welcome."
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                            className="form-input w-full px-5 py-4 text-white text-base resize-none"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 py-5 text-white text-sm tracking-widest uppercase font-medium transition-all"
                        >
                            {isSubmitting ? '⏳ Sending...' : '🔥 Book My Spot - £8'}
                        </button>
                        {submitStatus === 'success' && (
                            <div className="border border-green-600 p-4 text-center">
                                <p className="text-green-400 text-base">✅ Booked! Karl will be in touch soon with your payment link. See you in The YARD! 💪</p>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="border border-red-800 p-4 text-center">
                                <p className="text-red-400 text-base">Something went wrong. Please try again or WhatsApp Karl on 07595 228772.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-3xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Got Questions?</p>
                    <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-tight mb-16">
                        FAQ <span className="red-glow-subtle">Answered</span>
                    </h2>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <span className="text-white text-base md:text-lg font-medium pr-4">{faq.q}</span>
                                    {openFaq === i
                                        ? <ChevronUp size={20} color="#ef4444" className="flex-shrink-0" />
                                        : <ChevronDown size={20} color="#9ca3af" className="flex-shrink-0" />
                                    }
                                </button>
                                {openFaq === i && (
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-300 text-base leading-relaxed">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-12 p-6 text-center" style={{ border: '1px solid rgba(153,27,27,0.3)' }}>
                        <p className="text-gray-400 text-base mb-4">Still got questions? Karl is happy to chat.</p>

                        href="https://wa.me/447595228772"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-3 font-medium transition-all"
                        >
                        💬 WhatsApp Karl
                    </a>
                </div>
        </div>
            </section >

        {/* Footer */ }
        < footer className = "py-8 px-6 border-t border-red-900" style = {{ backgroundColor: '#111111' }
}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/">
            <img src={yardLogo} alt="YARD" className="h-6 w-auto opacity-60" />
        </Link>
        <p className="text-gray-500 text-sm tracking-widest">© {new Date().getFullYear()} YARD Training. Barnet, North London.</p>
        <p className="text-gray-500 text-sm">info@yardtraining.co.uk</p>
    </div>
            </footer >
        </div >
    )
}