'use client';

import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';

const CERTIFICATES = [
    {
        id: 1,
        title: 'Artifical Intelligence Fundamentals',
        issuer: 'IBM',
        date: '2025',
        link: 'https://github.com/harichandramathi27/NM-Certificate/blob/main/big%20data%20scala%20program%20certificate.pdf',
    },
    {
        id: 2,
        title: 'Cloud Computing Fundamentals',
        issuer: 'AWS',
        date: '2024',
        link: '#',
    },
    {
        id: 3,
        title: 'React Design Patterns',
        issuer: 'LinkedIn Learning',
        date: '2024',
        link: '#',
    },
];

export function CertificatesApp() {
    return (
        <div className="h-full w-full bg-zinc-900 text-white p-6 overflow-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <Award className="h-8 w-8" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold italic tracking-tight">Certification Center</h2>
                    <p className="text-gray-400 text-sm">Validating technical expertise and achievements.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CERTIFICATES.map((cert) => (
                    <div
                        key={cert.id}
                        className="group relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-5 transition-all hover:bg-white/[0.08] hover:border-white/20 hover:shadow-2xl overflow-hidden"
                    >
                        {/* Background Gradients */}
                        <div className="absolute -right-8 -top-8 h-24 w-24 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-all duration-500" />

                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors uppercase tracking-wide">
                                    {cert.title}
                                </h3>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Building2 size={14} className="text-amber-500/60" />
                                    <span className="text-sm font-medium">{cert.issuer}</span>
                                </div>
                            </div>
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black transition-all duration-300"
                            >
                                <ExternalLink size={18} />
                            </a>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-zinc-500 bg-white/5 px-3 py-1 rounded-full border border-white/5 shadow-inner">
                                <Calendar size={12} />
                                <span className="text-[10px] font-bold tracking-widest">{cert.date}</span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-[10px] font-bold text-amber-500/80 uppercase">Verified</span>
                                <div className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {CERTIFICATES.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                    <Award size={64} className="mb-4 text-zinc-700" />
                    <p className="text-zinc-500">Transmitting certificate data...</p>
                </div>
            )}
        </div>
    );
}
