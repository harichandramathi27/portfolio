'use client';

import { useOSStore } from '@/store/useOSStore';
import { Window } from '@/components/os/Window';
import { AnimatePresence } from 'framer-motion';

import { TerminalApp } from '@/components/apps/TerminalApp';
import { ProjectsApp } from '@/components/apps/ProjectsApp';
import { AboutApp } from '@/components/apps/AboutApp';
import { ContactApp } from '@/components/apps/ContactApp';
import { SettingsApp } from '@/components/apps/SettingsApp';
import { CertificatesApp } from '@/components/apps/CertificatesApp';

// App Registry - mapping IDs to Components
const Apps: Record<string, React.FC> = {
    'terminal': TerminalApp,
    'projects': ProjectsApp,
    'about': AboutApp,
    'contact': ContactApp,
    'settings': SettingsApp,
    'certificates': CertificatesApp,
};

export function WindowManager() {
    const windows = useOSStore((state) => state.windows);

    return (
        <AnimatePresence>
            {windows.map((window) => {
                const AppContent = Apps[window.component] || (() => <div className="p-4 text-red-500">App not found</div>);

                return (
                    <Window key={window.id} window={window}>
                        <AppContent />
                    </Window>
                );
            })}
        </AnimatePresence>
    );
}
