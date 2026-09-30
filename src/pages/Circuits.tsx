import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

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
            // Save to Supabase
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

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Nav */}
            <nav className="sticky top-0 z-50 bg-black border-b border-red-600">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="font-black text-xl hover:text-red-600">YARD</Link>
                    <div className="flex items-center gap-6">
                        <p className="text-red-600 font-black">£8 per class</p>
                        <a href="#contact" className="text-red-600 hover:text-red-500 font-bold">Book</a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="py-32 px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-6xl md:text-7xl font-black mb-6">
                        YARD<br /><span className="text-red-600">CIRCUITS</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-8">
                        Drop-in bootcamp. HIIT. Combat. Football S&C. All levels. £8 per class.
                    </p>
                </div>
            </section>

            {/* Schedule */}
            <section className="py-20 px-6 bg-gray-950 border-t border-red-600">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-black mb-12">Schedule</h2>
                    <div className="space-y-3">
                        {[
                            { day: 'Monday', time: '11:30–13:30' },
                            { day: 'Tuesday', time: '6:30–8:30 AM / 11:30–13:30 / 18:00–20:00' },
                            { day: 'Wednesday', time: '11:30–13:30' },
                            { day: 'Thursday', time: '6:30–8:30 AM / 11:30–13:30 / 18:00–20:00' },
                            { day: 'Friday', time: '11:30–13:30' },
                        ].map((slot, i) => (
                            <div key={i} className="border border-red-600 p-6 hover:bg-gray-900 transition-colors">
                                <div className="flex justify-between items-center">
                                    <p className="font-black text-lg">{slot.day}</p>
                                    <p className="text-red-600 font-bold">{slot.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section id="contact" className="py-20 px-6 border-t border-red-600">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-black mb-12 text-center">
                        Book Your<br /><span className="text-red-600">First Class</span>
                    </h2>

                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-600/10 border border-green-600 text-green-400 rounded">
                            ✓ Booked! Check your email. See you soon.
                        </div>
                    )}
                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-600/10 border border-red-600 text-red-400 rounded">
                            ✗ Error. Try WhatsApp instead.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-950 border border-red-600 text-white placeholder-gray-600 focus:outline-none"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-950 border border-red-600 text-white placeholder-gray-600 focus:outline-none"
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="07XXX XXX XXX"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-950 border border-red-600 text-white placeholder-gray-600 focus:outline-none"
                        />
                        <textarea
                            name="message"
                            placeholder="Any questions or injuries we should know?"
                            rows={3}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-950 border border-red-600 text-white placeholder-gray-600 focus:outline-none resize-none"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 px-8 py-4 font-black transition-all"
                        >
                            {isSubmitting ? 'BOOKING...' : 'BOOK NOW'}
                        </button>
                    </form>

                    <div className="mt-12 space-y-4 text-center">
                        <p className="text-gray-400">Or reach out directly:</p>
                        <a href="https://wa.me/447595228722" className="block text-red-600 hover:text-red-500 font-bold">
                            💬 WhatsApp: 07595 228722
                        </a>
                        <a href="mailto:info@yardtraining.co.uk" className="block text-red-600 hover:text-red-500 font-bold">
                            📧 Email: info@yardtraining.co.uk
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-red-600 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} YARD Training. Barnet, North London.</p>
            </footer>
        </div>
    )
}