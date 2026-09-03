import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { CircuitCard } from '../components/CircuitCard';

export default function Circuits() {
    const [loading, setLoading] = useState(false);
    const [circuit, setCircuit] = useState<any>(null);
    const [savedCircuits, setSavedCircuits] = useState<any[]>([]);

    // Form State
    const [ageGroup, setAgeGroup] = useState('U12');
    const [nasmPhase, setNasmPhase] = useState('phase_1_stabilization');
    const [focus, setFocus] = useState('eccentric deceleration, dynamic core balance, rapid directional shifts');

    // Fetch past circuits on page load
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const { data } = await supabase
            .from('workout_circuits')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        if (data) setSavedCircuits(data);
    };

    const generateCircuit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Extract active session token or fall back to client key dynamically
            const { data: sessionData } = await supabase.auth.getSession();
            const clientKey = (supabase as any).supabaseKey ||
                (supabase as any).rest?.headers?.apikey ||
                (supabase as any).headers?.apikey || '';

            const authToken = sessionData?.session?.access_token || clientKey;

            const res = await fetch('https://jwipcfbgphdpziixrjyb.supabase.co/functions/v1/generate-circuit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    prompt: `Generate a 12-minute ${ageGroup} session focusing on ${focus}.`,
                    ageGroup,
                    nasmPhase
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || `HTTP ${res.status}`);
            }

            const activeCircuit = data?.circuit || data?.data?.circuit_data || data?.data;

            if (activeCircuit) {
                setCircuit(activeCircuit);
                fetchHistory(); // Refresh history list
            } else {
                throw new Error('Response received but no circuit payload found');
            }
        } catch (err: any) {
            console.error('Generation Error:', err);
            alert(`Failed to generate circuit: ${err.message || err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-black text-white p-6 font-mono flex flex-col items-center">
            <div className="max-w-4xl w-full text-center mb-10">
                <h1 className="text-4xl font-extrabold uppercase tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">
                    YARD <span className="text-[#FF0000]">CIRCUITS</span> ENGINE
                </h1>
                <p className="text-gray-400 text-xs mt-2 uppercase">Automated S&C Generation for Youth Athletes</p>
            </div>

            {/* Generation Controls */}
            <form onSubmit={generateCircuit} className="max-w-4xl w-full bg-[#111111] border border-[#222222] p-6 mb-10 rounded">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">Target Age Group</label>
                        <select
                            value={ageGroup}
                            onChange={(e) => setAgeGroup(e.target.value)}
                            className="w-full bg-black border border-[#333] text-white p-2 text-sm rounded focus:border-[#FF0000] outline-none"
                        >
                            <option value="U10">U10</option>
                            <option value="U12">U12</option>
                            <option value="U14">U14</option>
                            <option value="U16">U16</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs uppercase text-gray-400 mb-1">NASM Phase</label>
                        <select
                            value={nasmPhase}
                            onChange={(e) => setNasmPhase(e.target.value)}
                            className="w-full bg-black border border-[#333] text-white p-2 text-sm rounded focus:border-[#FF0000] outline-none"
                        >
                            <option value="phase_1_stabilization">Phase 1: Stabilization Endurance</option>
                            <option value="phase_2_strength_endurance">Phase 2: Strength Endurance</option>
                            <option value="phase_3_power">Phase 3: Power</option>
                        </select>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-xs uppercase text-gray-400 mb-1">Session Focus & Constraints</label>
                    <input
                        type="text"
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        className="w-full bg-black border border-[#333] text-white p-2 text-sm rounded focus:border-[#FF0000] outline-none"
                        placeholder="e.g. Lateral speed, partner relays, bodyweight only"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF0000] text-white py-3 font-bold uppercase tracking-wider border border-[#FF0000] hover:bg-black hover:text-[#FF0000] transition-all disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'BUILDING S&C CIRCUIT...' : 'GENERATE AI CIRCUIT'}
                </button>
            </form>

            {/* Generated Active Circuit */}
            {circuit && (
                <div className="max-w-4xl w-full mb-12">
                    <CircuitCard circuit={circuit} />
                </div>
            )}

            {/* Recent Circuits History */}
            {savedCircuits.length > 0 && (
                <div className="max-w-4xl w-full bg-[#0A0A0A] border border-[#222] p-6 rounded">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Recent Database Logs</h2>
                    <div className="space-y-3">
                        {savedCircuits.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => setCircuit(item.circuit_data)}
                                className="flex justify-between items-center bg-[#111] p-3 border border-[#222] hover:border-[#FF0000] cursor-pointer transition-all"
                            >
                                <div>
                                    <div className="text-white text-sm font-bold">{item.title || 'Untitled Circuit'}</div>
                                    <div className="text-xs text-gray-500 uppercase">{item.target_age_group} • {item.nasm_phase}</div>
                                </div>
                                <div className="text-xs text-[#FF0000] uppercase font-bold">Load Session →</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}