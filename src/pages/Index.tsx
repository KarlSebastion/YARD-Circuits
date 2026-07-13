import { Link } from 'react-router-dom'
import yardLogo from '../assets/YARD-Logo.png'
import gymPhoto from '../assets/IMG_0151.jpg'
import { Wind, Focus, Zap, MapPin, User } from 'lucide-react'

export default function Index() {
    return (
        <div className="min-h-screen text-white" style={{ backgroundColor: '#111111', fontFamily: "'DM Mono', monospace" }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');
                .grid-bg { background-image: linear-gradient(rgba(220,38,38,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.07) 1px, transparent 1px); background-size: 40px 40px; }
                .red-glow { color: #ef4444; text-shadow: 0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(220,38,38,0.4); }
                .red-glow-subtle { color: #ef4444; text-shadow: 0 0 10px rgba(220,38,38,0.6), 0 0 20px rgba(220,38,38,0.3); }
                .why-card { background-color: rgba(17,17,17,0.55); backdrop-filter: blur(6px); border: 1px solid rgba(153,27,27,0.4); transition: all 0.3s ease; }
                .why-card:hover { background-color: rgba(17,17,17,0.8); border-color: rgba(239,68,68,0.7); transform: translateY(-2px); }
                .why-card:hover .card-icon { transform: scale(1.15); }
                .card-icon { transition: all 0.3s ease; }
                .offer-box { background: linear-gradient(135deg, rgba(220,38,38,0.12) 0%, rgba(17,17,17,0.98) 100%); border: 1px solid rgba(239,68,68,0.4); }
                .pt-box { background: linear-gradient(135deg, rgba(17,17,17,0.98) 0%, rgba(220,38,38,0.08) 100%); border: 1px solid rgba(239,68,68,0.3); }
                body { font-size: 16px; line-height: 1.6; }
            `}</style>

            {/* Nav */}
            <nav className="sticky top-0 z-50 border-b border-red-900" style={{ backgroundColor: '#111111' }}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <img src={yardLogo} alt="YARD" className="h-9 w-auto" />
                    <div className="flex items-center gap-8">
                        <span className="text-gray-400 text-sm tracking-widest uppercase hidden sm:block">The Yard</span>
                        <Link to="/circuits" className="bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-5 py-2 font-medium transition-all">
                            Start Now
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="grid-bg relative min-h-screen flex items-center justify-center text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-8">Barnet's Raw Training Experience</p>
                    <h1 className="text-7xl md:text-9xl font-medium tracking-tight leading-none mb-4 uppercase">Transform In</h1>
                    <h1 className="text-7xl md:text-9xl font-medium tracking-tight leading-none mb-12 uppercase red-glow">The Yard</h1>
                    <p className="text-gray-300 text-lg md:text-xl tracking-wide mb-12 max-w-xl mx-auto leading-relaxed">
                        A converted double-garage. Open to the elements. No distractions. Just results.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/circuits" className="bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                            Start Your Transformation
                        </Link>
                        <a href="#about" className="border border-gray-600 hover:border-red-600 text-gray-300 hover:text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                            Explore Training
                        </a>
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-6xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">About</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-16">
                        This Is <span className="red-glow-subtle">The YARD</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
                            <p>Forget the chrome machines and mirror walls. The YARD is a converted double-garage in Barnet — raw concrete, iron, and open to the elements.</p>
                            <p>When it rains, you feel it. When it is cold, you push harder. This is not about comfort. It is about <span className="text-red-400">transformation</span>.</p>
                        </div>
                        <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-6">
                            <p>Training here strips away the noise. No queues. No distractions. No excuses. Just you, the weights, and the work.</p>
                            <p>The exposure to elements does not just build physical resilience — it creates <span className="text-red-400">mental fortitude</span> that carries into every aspect of your life.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-red-900">
                        {[{ stat: 'RAW', label: 'Environment' }, { stat: 'REAL', label: 'Results' }, { stat: '1:1', label: 'Attention' }, { stat: '100%', label: 'Commitment' }].map((item) => (
                            <div key={item.stat} className="py-10 text-center" style={{ backgroundColor: '#1a1a1a' }}>
                                <p className="text-3xl md:text-4xl font-medium uppercase red-glow-subtle mb-3">{item.stat}</p>
                                <p className="text-gray-400 text-sm tracking-widest uppercase">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why The YARD */}
            <section className="relative py-32 px-6" style={{ backgroundImage: `url(${gymPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.82)' }} />
                <div className="relative max-w-6xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">The Difference</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-16">
                        Why <span className="red-glow-subtle">The YARD</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { Icon: Wind, title: 'Exposed To Elements', desc: 'Train in conditions that build real-world resilience. Rain, wind, cold — all part of the transformation.' },
                            { Icon: Focus, title: 'Zero Distractions', desc: 'No mirrors. No TVs. No crowds. Pure, focused training.' },
                            { Icon: Zap, title: 'Functional Results', desc: 'Movement patterns that transfer to real life. Strength that is useful, not just visible.' },
                            { Icon: MapPin, title: 'Barnet Location', desc: 'Convenient for North London. Easy parking. Quick in, intense session, out.' },
                        ].map((item) => (
                            <div key={item.title} className="why-card p-8 md:p-10">
                                <item.Icon className="card-icon mb-5" size={32} color="#ef4444" />
                                <p className="text-white text-sm tracking-widest uppercase mb-3">{item.title}</p>
                                <p className="text-gray-300 text-base leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <p className="text-gray-400 text-lg italic leading-relaxed">
                            The YARD is not just where I train. <span className="text-white font-medium">It is where I became someone different.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Opening Offer — Bring A Friend */}
            <section className="py-24 px-6" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-6xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Summer Soft Launch</p>
                    <div className="offer-box p-10 md:p-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Opening Offer — August 2026</p>
                                <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-tight mb-6">
                                    Bring A Friend<br />
                                    <span className="red-glow-subtle">First Time Free</span>
                                </h2>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                                    Bring a mate, a parent, a teen — their first YARD Circuits session is completely free. You pay £8. They train for free. No strings attached.
                                </p>
                                <Link to="/circuits" className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                                    Claim This Offer
                                </Link>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { emoji: '🔥', text: 'Mon, Wed, Fri — 7:30am and 1:00pm' },
                                    { emoji: '💰', text: 'Just £8 per class — no contracts' },
                                    { emoji: '⚽', text: 'Perfect for football families this preseason' },
                                    { emoji: '👨‍👩‍👧', text: 'Parents, teens and all levels welcome' },
                                    { emoji: '🏘️', text: 'Barnet, North London — easy parking' },
                                    { emoji: '🎁', text: 'Bring a friend — their first session is FREE' },
                                ].map((item) => (
                                    <div key={item.text} className="flex items-center gap-4 text-gray-300 text-base">
                                        <span className="text-2xl">{item.emoji}</span>
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PT 1-1 Free Consultation */}
            <section className="py-24 px-6 grid-bg">
                <div className="max-w-6xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Personal Training</p>
                    <div className="pt-box p-10 md:p-16">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <p className="text-red-500 text-sm tracking-widest uppercase mb-4">1-1 Coaching — Barnet</p>
                                <h2 className="text-4xl md:text-5xl font-medium uppercase tracking-tight mb-6">
                                    Free Goal<br />
                                    <span className="red-glow-subtle">Consultation</span>
                                </h2>
                                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                                    Not sure where to start? Book a free 1-1 consultation with Karl. No pressure, no commitment. Just an honest conversation about your goals, your lifestyle, and how to get you there.
                                </p>
                                <a href="https://wa.me/447595228722" target="_blank" rel="noopener noreferrer" className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-8 py-4 font-medium transition-all">
                                    Book Free Consultation
                                </a>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <User size={24} color="#ef4444" className="mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-sm tracking-widest uppercase mb-1">Tailored To You</p>
                                        <p className="text-gray-400 text-base leading-relaxed">General fitness, weight loss, strength, football conditioning — whatever your goal, Karl builds a plan around your life.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Zap size={24} color="#ef4444" className="mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-sm tracking-widest uppercase mb-1">Real Results</p>
                                        <p className="text-gray-400 text-base leading-relaxed">No fads. No gimmicks. Functional training that makes you stronger, fitter and more resilient in real life.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin size={24} color="#ef4444" className="mt-1 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-sm tracking-widest uppercase mb-1">Barnet Based</p>
                                        <p className="text-gray-400 text-base leading-relaxed">Train at The YARD in Barnet. Flexible scheduling to fit around work, family and the school run.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Circuits CTA */}
            <section className="py-24 px-6 text-center" style={{ backgroundColor: '#1a1a1a' }}>
                <div className="max-w-3xl mx-auto">
                    <p className="text-red-500 text-sm tracking-widest uppercase mb-4">Drop-In Classes</p>
                    <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight mb-6">
                        YARD <span className="red-glow-subtle">Circuits</span>
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed">
                        HIIT. Strength. Combat. Mon, Wed, Fri. No contracts. £8 per class.
                    </p>
                    <Link to="/circuits" className="inline-block bg-red-600 hover:bg-red-700 text-white text-sm tracking-widest uppercase px-10 py-4 font-medium transition-all">
                        Book Your Spot
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-red-900" style={{ backgroundColor: '#111111' }}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <img src={yardLogo} alt="YARD" className="h-6 w-auto opacity-60" />
                    <p className="text-gray-500 text-sm tracking-widest">© {new Date().getFullYear()} YARD Training. Barnet, North London.</p>
                    <p className="text-gray-500 text-sm">info@yardtraining.co.uk</p>
                </div>
            </footer>
        </div>
    )
}