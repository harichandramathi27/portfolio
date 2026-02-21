'use client';

import { Mail, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

export function ContactApp() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        setStatus('sending');

        // Simulate API call
        setTimeout(() => {
            setStatus('sent');
            form.reset();
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <div className="h-full w-full bg-zinc-900 text-white flex flex-col sm:flex-row overflow-hidden">
            {/* Sidebar / Info */}
            <div className="w-full sm:w-1/3 bg-black/20 p-6 flex flex-col gap-6 border-r border-white/5">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Mail className="text-blue-500" /> Contact
                </h2>

                <div className="flex flex-col gap-4">
                    <a href="https://github.com/harichandramathi27" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                        <Github size={20} />
                        <span>GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/harichandramathi-p-8a232a354" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                        <Linkedin size={20} className="text-blue-400" />
                        <span>LinkedIn</span>
                    </a>
                    <a href="mailto:hari@gmail.com" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                        <Mail size={20} className="text-red-400" />
                        <span>hari@gmail.com</span>
                    </a>
                </div>

                <div className="mt-auto text-sm text-gray-500">
                    Scanning frequencies...<br />
                    Open for opportunities.
                </div>
            </div>

            {/* Form */}
            <div className="flex-1 p-8 overflow-auto">
                <h3 className="text-xl font-semibold mb-6">Send a Transmission</h3>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 uppercase">Identity</label>
                        <input required className="bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition" placeholder="Your Name" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 uppercase">Frequency (Email)</label>
                        <input required type="email" className="bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition" placeholder="email@example.com" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-gray-400 uppercase">Message</label>
                        <textarea required rows={5} className="bg-white/5 border border-white/10 rounded-lg p-2 focus:outline-none focus:border-blue-500 transition resize-none" placeholder="Enter your message..." />
                    </div>

                    <button
                        disabled={status !== 'idle'}
                        className="mt-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg p-3 font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {status === 'idle' && <><Send size={18} /> Send Message</>}
                        {status === 'sending' && 'Transmitting...'}
                        {status === 'sent' && 'Transmission Received'}
                    </button>
                </form>
            </div>
        </div>
    );
}
