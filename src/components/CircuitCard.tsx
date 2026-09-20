import React from 'react';
import { Clock } from 'lucide-react';

interface Drill {
    drill_id?: string;
    name?: string;
    fms_category?: string;
    nasm_biomotor?: string;
    pair_mechanic?: string;
    setup_instructions?: string;
    execution_rules?: string;
    coaching_cues?: string[];
}

interface CircuitProps {
    circuit: {
        title?: string;
        target_age_group?: string;
        duration_minutes?: number;
        nasm_phase?: string;
        equipment_needed?: string[];
        circuit_structure?: {
            rounds?: number;
            work_interval_seconds?: number;
            rest_interval_seconds?: number;
            format?: string;
        };
        drills?: Drill[];
    };
}

export const CircuitCard: React.FC<CircuitProps> = ({ circuit }) => {
    if (!circuit) return null;

    const safeString = (val?: string) => (typeof val === 'string' ? val : '');

    return (
        <div className="bg-[#000000] text-white font-mono p-6 border border-[#1A1A1A] max-w-4xl mx-auto shadow-[0_0_15px_rgba(255,0,0,0.15)]">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-[#222222] pb-4 mb-6">
                <div>
                    <span className="text-xs text-[#FF0000] tracking-widest uppercase font-bold">
                        {circuit.target_age_group || 'AGE GROUP N/A'} | {safeString(circuit.nasm_phase).replace(/_/g, ' ') || 'GENERAL PHASE'}
                    </span>
                    <h1 className="text-3xl font-extrabold uppercase tracking-tight mt-1 text-white drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]">
                        {circuit.title || 'AI S&C CIRCUIT'}
                    </h1>
                </div>
                <div className="flex items-center gap-2 bg-[#111111] px-4 py-2 border border-[#333333]">
                    <Clock className="w-4 h-4 text-[#FF0000]" />
                    <span className="text-sm font-bold">{circuit.duration_minutes ?? 12} MINS</span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-xs uppercase">
                <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
                    <span className="text-gray-500 block">Rounds</span>
                    <span className="text-base font-bold">{circuit.circuit_structure?.rounds ?? 3} Sets</span>
                </div>
                <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
                    <span className="text-gray-500 block">Work / Rest</span>
                    <span className="text-base font-bold text-[#FF0000]">
                        {circuit.circuit_structure?.work_interval_seconds ?? 30}s / {circuit.circuit_structure?.rest_interval_seconds ?? 15}s
                    </span>
                </div>
                <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
                    <span className="text-gray-500 block">Format</span>
                    <span className="text-base font-bold">{circuit.circuit_structure?.format || 'Circuit'}</span>
                </div>
                <div className="bg-[#0A0A0A] p-3 border border-[#1A1A1A]">
                    <span className="text-gray-500 block">Equipment</span>
                    <span className="text-xs font-bold text-gray-300 truncate block">
                        {circuit.equipment_needed?.length ? circuit.equipment_needed.join(', ') : 'None / Bodyweight'}
                    </span>
                </div>
            </div>

            {/* Drills Section */}
            <div className="space-y-4">
                {(circuit.drills && Array.isArray(circuit.drills) ? circuit.drills : []).map((drill, index) => (
                    <div key={drill.drill_id || index} className="bg-[#0A0A0A] border border-[#222222] p-4 hover:border-[#FF0000] transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-[#FF0000] font-bold text-lg">#{index + 1}</span>
                                <h3 className="text-lg font-bold uppercase">{drill.name || 'Unnamed Drill'}</h3>
                            </div>
                            {drill.nasm_biomotor && (
                                <span className="bg-[#1A0000] text-[#FF0000] border border-[#FF0000] text-[10px] uppercase px-2 py-0.5">
                                    {drill.nasm_biomotor}
                                </span>
                            )}
                        </div>
                        {drill.execution_rules && (
                            <p className="text-xs text-gray-400 mb-3">{drill.execution_rules}</p>
                        )}
                        {drill.coaching_cues && drill.coaching_cues.length > 0 && (
                            <div className="bg-[#000000] border-l-2 border-[#FF0000] p-2 mb-1">
                                <span className="text-[10px] text-gray-500 uppercase block font-bold">Coaching Cues:</span>
                                <ul className="list-disc list-inside text-xs text-gray-300">
                                    {drill.coaching_cues.map((cue, idx) => (
                                        <li key={idx}>{cue}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};