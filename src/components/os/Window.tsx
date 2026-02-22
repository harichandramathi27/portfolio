'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useOSStore, WindowState } from '@/store/useOSStore';
import { cn } from '@/lib/utils';
import { Minus, X } from 'lucide-react';

interface WindowProps {
    window: WindowState;
    children: React.ReactNode;
}

const SNAP_LAYOUTS = [
    {
        id: 'split-50-50',
        label: 'Split 50:50',
        zones: [
            { x: 0, y: 0, w: '50%', h: '100%' },
            { x: '50%', y: 0, w: '50%', h: '100%' }
        ]
    },
    {
        id: 'split-70-30',
        label: 'Split 70:30',
        zones: [
            { x: 0, y: 0, w: '70%', h: '100%' },
            { x: '70%', y: 0, w: '30%', h: '100%' }
        ]
    },
    {
        id: 'three-columns',
        label: 'Three Columns',
        zones: [
            { x: 0, y: 0, w: '33%', h: '100%' },
            { x: '33%', y: 0, w: '34%', h: '100%' },
            { x: '67%', y: 0, w: '33%', h: '100%' }
        ]
    },
    {
        id: 'quad-grid',
        label: 'Four Quarters',
        zones: [
            { x: 0, y: 0, w: '50%', h: '50%' },
            { x: '50%', y: 0, w: '50%', h: '50%' },
            { x: 0, y: '50%', w: '50%', h: '50%' },
            { x: '50%', y: '50%', w: '50%', h: '50%' }
        ]
    }
];

export function Window({ window: windowData, children }: WindowProps) {
    const {
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        updateWindow,
        activeWindowId
    } = useOSStore();

    const dragControls = useDragControls();
    const [isResizing, setIsResizing] = useState<string | null>(null);
    const [showSnapLayouts, setShowSnapLayouts] = useState(false);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const isActive = activeWindowId === windowData.id;

    const handleDragEnd = useCallback((_: any, info: any) => {
        if (typeof window === 'undefined') return;
        let { x, y } = info.point;
        updateWindow(windowData.id, { position: { x, y } });
    }, [windowData.id, updateWindow]);

    const startResizing = (direction: string) => (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation();
        setIsResizing(direction);
    };

    useEffect(() => {
        if (!isResizing || typeof window === 'undefined') return;

        const onMouseMove = (e: MouseEvent) => {
            const dx = e.movementX;
            const dy = e.movementY;
            const currentWidth = typeof windowData.size.width === 'number' ? windowData.size.width : 800;
            const currentHeight = typeof windowData.size.height === 'number' ? windowData.size.height : 600;

            let newWidth = currentWidth;
            let newHeight = currentHeight;
            let newPos = { ...windowData.position };

            if (isResizing.includes('e')) newWidth += dx;
            if (isResizing.includes('s')) newHeight += dy;
            if (isResizing.includes('w')) {
                newWidth -= dx;
                newPos.x += dx;
            }
            if (isResizing.includes('n')) {
                newHeight -= dy;
                newPos.y += dy;
            }

            updateWindow(windowData.id, {
                size: { width: Math.max(300, newWidth), height: Math.max(200, newHeight) },
                position: newPos
            });
        };

        const onMouseUp = () => setIsResizing(null);

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isResizing, windowData.id, windowData.size, windowData.position, updateWindow]);

    const handleMaximizeMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            setShowSnapLayouts(true);
        }, 300);
    };

    const handleMaximizeMouseLeave = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = setTimeout(() => {
            setShowSnapLayouts(false);
        }, 500);
    };

    const handlePanelMouseEnter = () => {
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };

    const handlePanelMouseLeave = () => {
        setShowSnapLayouts(false);
    };

    const applyLayout = (zone: any) => {
        if (typeof window === 'undefined') return;

        const x = typeof zone.x === 'string' ? (parseFloat(zone.x) / 100) * window.innerWidth : zone.x;
        const y = typeof zone.y === 'string' ? (parseFloat(zone.y) / 100) * (window.innerHeight - 64) : zone.y;

        updateWindow(windowData.id, {
            position: { x, y },
            size: {
                width: zone.w,
                height: zone.h
            },
            isMaximized: false
        });
        setShowSnapLayouts(false);
    };

    return (
        <>
            <motion.div
                drag={!windowData.isMaximized && !isMobile}
                dragListener={false}
                dragControls={dragControls}
                dragMomentum={false}
                onDragEnd={handleDragEnd}
                initial={{ scale: 0.9, opacity: 0, x: windowData.position.x, y: windowData.position.y }}
                animate={{
                    scale: 1,
                    opacity: isActive ? 1 : 0.8,
                    x: (windowData.isMaximized || isMobile) ? 0 : windowData.position.x,
                    y: (windowData.isMaximized || isMobile) ? 0 : windowData.position.y,
                    width: (windowData.isMaximized || isMobile) ? '100%' : windowData.size.width,
                    height: (windowData.isMaximized || isMobile) ? '100%' : windowData.size.height,
                    zIndex: windowData.zIndex
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                onPointerDown={() => focusWindow(windowData.id)}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                className={cn(
                    "flex flex-col overflow-hidden backdrop-blur-2xl border border-white/20 shadow-2xl no-scrollbar",
                    (windowData.isMaximized || isMobile) ? "rounded-none" : "rounded-2xl",
                    isActive ? "bg-white/10 ring-1 ring-white/30" : "bg-black/40 scale-[0.98] blur-[0.5px]"
                )}
            >
                {!windowData.isMaximized && !isMobile && (
                    <>
                        <div className="absolute top-0 left-0 w-2 h-full cursor-w-resize z-50 hover:bg-white/5" onMouseDown={startResizing('w')} />
                        <div className="absolute top-0 right-0 w-2 h-full cursor-e-resize z-50 hover:bg-white/5" onMouseDown={startResizing('e')} />
                        <div className="absolute top-0 left-0 w-full h-2 cursor-n-resize z-50 hover:bg-white/5" onMouseDown={startResizing('n')} />
                        <div className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize z-50 hover:bg-white/5" onMouseDown={startResizing('s')} />
                        <div className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50 group hover:bg-white/5" onMouseDown={startResizing('se')}>
                            <div className="absolute bottom-1 right-1 w-2 h-2 border-r-2 border-b-2 border-white/20 group-hover:border-white/40" />
                        </div>
                    </>
                )}

                {/* Header */}
                <div
                    className={cn(
                        "flex h-12 items-center justify-between bg-white/5 pl-6 pr-0 border-b border-white/10 shrink-0 select-none overflow-visible",
                        isMobile ? "cursor-default" : "cursor-grab active:cursor-grabbing"
                    )}
                    onPointerDown={(e) => {
                        if (isMobile) {
                            focusWindow(windowData.id);
                            return;
                        }
                        focusWindow(windowData.id);
                        dragControls.start(e);
                    }}
                    onDoubleClick={() => !isMobile && maximizeWindow(windowData.id)}
                >
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] leading-none">
                            {windowData.title}
                        </span>
                    </div>

                    <div className="flex items-stretch h-full relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(windowData.id); }}
                            className="flex items-center justify-center w-12 h-full hover:bg-white/10 transition-colors group/btn"
                        >
                            <Minus className="w-4 h-4 text-white/60 group-hover/btn:text-white transition-colors" />
                        </button>

                        {!isMobile && (
                            <div className="relative h-full">
                                <button
                                    ref={buttonRef}
                                    onClick={(e) => { e.stopPropagation(); maximizeWindow(windowData.id); }}
                                    onMouseEnter={handleMaximizeMouseEnter}
                                    onMouseLeave={handleMaximizeMouseLeave}
                                    className="flex items-center justify-center w-12 h-full hover:bg-white/10 transition-colors group/btn"
                                >
                                    <div className="w-3 h-3 border border-white/60 group-hover/btn:border-white transition-colors" />
                                </button>

                                <AnimatePresence>
                                    {showSnapLayouts && (
                                        <motion.div
                                            ref={panelRef}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            onMouseEnter={handlePanelMouseEnter}
                                            onMouseLeave={handlePanelMouseLeave}
                                            className="absolute top-full right-0 mt-2 z-[100] w-64 p-4 rounded-xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl grid grid-cols-2 gap-3"
                                        >
                                            {SNAP_LAYOUTS.map((layout) => (
                                                <div
                                                    key={layout.id}
                                                    className="group/layout cursor-pointer flex flex-col gap-2"
                                                >
                                                    <div className="aspect-[4/3] border border-white/10 rounded-md p-1 grid gap-1 relative overflow-hidden bg-white/5 group-hover/layout:bg-white/10 transition-colors">
                                                        {layout.zones.map((zone, idx) => (
                                                            <div
                                                                key={idx}
                                                                onClick={(e) => { e.stopPropagation(); applyLayout(zone); }}
                                                                className="border border-white/20 rounded-sm hover:bg-blue-500/40 hover:border-blue-400 transition-all flex items-center justify-center group/zone"
                                                                style={{
                                                                    position: 'absolute',
                                                                    left: zone.x,
                                                                    top: zone.y,
                                                                    width: zone.w,
                                                                    height: zone.h,
                                                                    padding: '2px', // gap simulation
                                                                    backgroundClip: 'content-box'
                                                                }}
                                                            >
                                                                <div className="w-full h-full rounded-[1px] bg-white/5 group-hover/zone:bg-blue-400/20" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/40 group-hover/layout:text-white/80 transition-colors px-1">
                                                        {layout.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(windowData.id); }}
                            className="flex items-center justify-center w-12 h-full hover:bg-red-600 transition-colors group/btn"
                        >
                            <X className="w-4 h-4 text-white/60 group-hover/btn:text-white transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className={cn(
                    "flex-1 overflow-auto bg-black/20 no-scrollbar relative font-inter",
                    isMobile ? "p-4" : "p-6"
                )}>
                    <div className="mx-auto h-full">
                        {children}
                    </div>
                </div>
            </motion.div>
        </>
    );
}
