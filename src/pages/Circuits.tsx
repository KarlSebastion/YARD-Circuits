import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import yardLogo from '../assets/YARD-Logo.png'
import { Clock, MapPin, Zap, Users, Trophy } from 'lucide-react'

export default function Circuits() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
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
            setTimeout(() => setSubmitStatus('idle'), 3000)
        } catch (error) {
            console.error('Error:', error)
            setSubmitStatus('error')
            setTimeout(() => setSubmitStatus('idle'), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    const schedule = [
        { day: 'Monday', time: '6:30am', type: 'HIIT Circuits', emoji: '🔥' },
        { day: 'Tuesday', time: '6:30am', type: 'Combat Circuits', emoji: '🥊' },
        { day: 'Wednesday', time: '6:30am', type: 'HIIT Circuits', emoji: '🔥' },
        { day: 'Thursday', time: '6:30am', type: 'Football S&C', emoji: '⚽' },
        { day: 'Friday', time: '6:30am', type: 'HIIT Circuits', emoji: '🔥' },
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
                        <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                            Book Your Spot — £8
                        </a>
                        <a href="#schedule" className="border border-gray-600 hover:border-red-600 text-gray-300 hover:text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                            View Schedule
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
                            { Icon: Trophy, emoji: '💰', stat: '£8', label: 'Per Class', desc: 'Drop-in, no contracts, no commitment. Just show up and work.' },
                            { Icon: Users, emoji: '🙌', stat: 'All Levels', label: 'Welcome', desc: 'Beginner to advanced. Everyone pushes hard. Everyone gets results.' },
                            { Icon: Zap, emoji: '⚡', stat: 'Results', label: 'Guaranteed', desc: 'Real coaching. No fluff. Just work, sweat and transformation.' },
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

            {/* Schedule */}
            <section id="schedule" className="grid-bg py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Weekly</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-16">
                        🗓️ <span className="red-glow-subtle">Schedule</span>
                    </h2>
                    <div className="space-y-3">
                        {schedule.map((s) => (
                            <div key={s.day} className="schedule-row flex items-center justify-between px-6 py-5">
                                <span className="text-white text-base md:text-lg font-medium tracking-wide w-1/3">{s.day}</span>
                                <span className="text-gray-400 text-sm md:text-base flex items-center gap-2 w-1/3 justify-center">
                                    <Clock size={14} color="#9ca3af" /> {s.time}
                                </span>
                                <span className="text-red-400 text-sm md:text-base tracking-wide w-1/3 text-right">
                                    {s.emoji} {s.type}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 flex items-center gap-3 text-gray-400 text-sm">
                        <MapPin size={16} color="#ef4444" />
                        <span>Oakleigh Road North, N20, Barnet — Easy parking available</span>
                    </div>
                </div>
            </section>

            {/* Booking Form */}
            <section id="contact" className="py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-2xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Get Started</p>
                    <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-tight mb-4">
                        Book Your <span className="red-glow-subtle">Spot</span>
                    </h2>
                    <p className="text-gray-300 text-lg mb-12 leading-relaxed">
                        Fill in below and Karl will confirm your session. First class? Just turn up. 💪
                    </p>
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name *"
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
                            placeholder="Anything you want Karl to know? (optional)"
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
                            {isSubmitting ? '⏳ Sending...' : '🔥 Book My Spot — £8'}
                        </button>
                        {submitStatus === 'success' && (
                            <div className="border border-green-600 p-4 text-center">
                                <p className="text-green-400 text-base">✅ Booked! Karl will be in touch soon.</p>
                            </div>
                        )}
                        {submitStatus === 'error' && (
                            <div className="border border-red-800 p-4 text-center">
                                <p className="text-red-400 text-base">❌ Something went wrong. Please try again.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-red-900" style={{ backgroundColor: '#111111' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <Link to="/">
                        <img src={yardLogo} alt="YARD" className="h-6 w-auto opacity-60" />
                    </Link>
                    <p className="text-gray-500 text-sm tracking-widest">© {new Date().getFullYear()} YARD Training. Barnet, North London.</p>
                    <p className="text-gray-500 text-sm">info@yardtraining.co.uk</p>
                </div>
            </footer>
        </div>
    )
}