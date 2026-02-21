'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[#0A0A0A]">
            {/* Dark Premium Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(17,17,17,1)_0%,_rgba(0,0,0,1)_100%)]" />

            {/* Animated Abstract Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.5, 1],
                    x: [0, -150, 0],
                    y: [0, 100, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-[40%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[100px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, 50, 0],
                    y: [0, -100, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[110px]"
            />

            {/* Subtle Noise / Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Glowing Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden p-10">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: [0.25, 0.45, 0.25],
                        scale: [1, 1.01, 1],
                        textShadow: [
                            "0 0 10px rgba(255,255,255,0.5)",
                            "0 0 30px rgba(255,255,255,0.7)",
                            "0 0 10px rgba(255,255,255,0.5)"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="text-[clamp(1.5rem,5.5vw,7.5vw)] md:text-[clamp(3rem,6vw,12vw)] font-black uppercase tracking-[0.2em] text-white/30 whitespace-nowrap text-center leading-[0.85]"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)' }}
                >
                    Harichandramathi
                </motion.h1>
            </div>
        </div>
    );
}
