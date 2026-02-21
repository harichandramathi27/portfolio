'use client';

import { useOSStore } from '@/store/useOSStore';
import { User, Code, MapPin, Calendar, Heart, Wrench } from 'lucide-react';

export function AboutApp() {
    const { accentColor } = useOSStore();

    return (
        <div className="h-full w-full bg-zinc-900 text-white p-8 overflow-auto">
            <div className="flex flex-col items-center mb-8">
                <div
                    className="h-32 w-32 rounded-full p-1 mb-4 shadow-2xl"
                    style={{ background: `linear-gradient(to bottom right, ${accentColor}, #4A00E0)` }}
                >
                    <div className="h-full w-full rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
                        <User size={64} className="text-gray-400" />
                        {/* <img src="/avatar.jpg" alt="Avatar" className="h-full w-full object-cover" /> */}
                    </div>
                </div>
                <h1 className="text-3xl font-bold">Harichandramathi</h1>
                <p className="font-mono" style={{ color: accentColor }}>Web Developer /AI Enthusiast/Pursuing AWS Cloud</p>
            </div>

            <div className="grid gap-6 max-w-2xl mx-auto">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <User size={20} style={{ color: accentColor }} /> About Me
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        My core stack includes HTML, CSS, React, Flask, Node.js, and MongoDB, and I have practical experience deploying websites on the cloud using AWS S3 and CloudFront with secure HTTPS delivery. I actively use AI-powered tools to speed up development, improve design workflows, and prototype ideas efficiently.
                    </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
                        <Code size={20} style={{ color: accentColor }} /> Tech Stack
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                category: "Frontend",
                                skills: ["HTML5", "CSS3", "React.js", "Tailwind CSS", "Framer Motion"]
                            },
                            {
                                category: "Backend",
                                skills: ["Python (Flask)", "Node.js (Express.js)"]
                            },
                            {
                                category: "Database",
                                skills: ["MongoDB"]
                            },
                            {
                                category: "Cloud & Deployment",
                                skills: ["AWS S3", "AWS CloudFront", "AWS IAM", "Vercel"]
                            },
                            {
                                category: "UI & UX",
                                skills: ["Figma"],
                            },
                            {
                                category: "Other",
                                skills: ["AI Website Builders"]
                            }
                        ].map((section) => (
                            <div key={section.category}>
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-400"
                                    style={{ color: accentColor }}
                                >
                                    {section.category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {section.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Wrench size={20} style={{ color: accentColor }} /> Tools
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {['VS Code', 'Git', 'GitHub', 'Figma', 'Vercel', 'AWS Console'].map(tool => (
                            <span key={tool} className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition">
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/10">
                        <MapPin style={{ color: accentColor }} />
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Location</div>
                            <div>Salem, Tamil Nadu</div>
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 border border-white/10">
                        <Calendar style={{ color: accentColor }} />
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Experience</div>
                            <div>Fresher</div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
