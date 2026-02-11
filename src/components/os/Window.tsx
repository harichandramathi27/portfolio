'use client';

import { useOSStore, WindowState } from '@/store/useOSStore';
import { motion, useDragControls } from 'framer-motion';
import { Minus, X, Square, Maximize2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
}

export function Window({ window, children }: WindowProps) {
    const {
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindowPosition,
        activeWindowId
    } = useOSStore();

    const dragControls = useDragControls();
    const constraintsRef = useRef(null);

    const isActive = activeWindowId === window.id;

    return (
        <motion.div
            drag={!window.isMaximized}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
                scale: window.isMinimized ? 0 : window.isMaximized ? 1 : 1,
                opacity: window.isMinimized ? 0 : 1,
                x: window.isMaximized ? 0 : window.position.x,
                y: window.isMaximized ? 0 : window.position.y,
                width: window.isMaximized ? '100vw' : window.size.width,
                height: window.isMaximized ? '100vh' : window.size.height,
                zIndex: window.zIndex
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onPointerDown={() => focusWindow(window.id)}
            style={{ position: 'absolute' }}
            className={cn(
                "flex flex-col overflow-hidden rounded-lg bg-window backdrop-blur-md shadow-2xl border border-white/10",
                isActive ? "shadow-white/5" : "shadow-black/50"
            )}
        >
            {/* Title Bar */}
            <div
                className="flex h-10 items-center justify-between bg-white/5 px-4 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                    focusWindow(window.id);
                    dragControls.start(e);
                }}
                onDoubleClick={() => maximizeWindow(window.id)}
            >
                <span className="text-sm font-medium text-gray-200 select-none">
                    {window.title}
                </span>

                <div className="flex items-center gap-2">
                    <button
                        onClick={(e) => { e.stopPropagation(); minimizeWindow(window.id); }}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Minus size={14} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); maximizeWindow(window.id); }}
                        className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Square size={12} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); closeWindow(window.id); }}
                        className="p-1 hover:bg-red-500/50 rounded-full transition-colors group"
                    >
                        <X size={14} className="group-hover:text-white" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto bg-black/40 p-1 relative">
                {children}
                {/* Interact blocker wrapper if not active? No, usually windows are interactive even if not top, unless modal */}
            </div>

            {/* Resize Handle (Simplified for corner only) -- Todo */}
        </motion.div>
    );
}
