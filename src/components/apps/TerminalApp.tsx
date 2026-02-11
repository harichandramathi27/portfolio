'use client';

import { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { cn } from '@/lib/utils'; // Assuming you have this utility

const MOCK_FS: Record<string, string[]> = {
    '~': ['Documents', 'Pictures', 'Projects', 'README.md'],
    '~/Documents': ['resume.pdf', 'notes.txt'],
    '~/Pictures': ['wallpaper.jpg', 'screenshot.png'],
    '~/Projects': ['portfolio', 'os-web', 'ai-chat'],
};

const FILE_CONTENTS: Record<string, string> = {
    '~/README.md': '# WebOS Portfolio\nWelcome to my interactive portfolio! Try exploring with `cd` and `ls`.',
    '~/Documents/notes.txt': 'Meeting notes:\n- Discuss new features\n- Review design',
    '~/Documents/resume.pdf': '[PDF Content Redacted]',
};

export function TerminalApp() {
    const { openWindow, closeWindow, setAccentColor } = useOSStore();
    const [history, setHistory] = useState<string[]>(['Welcome to OS System v1.0.0', 'Type "help" to see available commands.']);
    const [input, setInput] = useState('');
    const [currentDir, setCurrentDir] = useState('~');
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const focusInput = () => inputRef.current?.focus();

    const executeCommand = (cmd: string, args: string[]) => {
        switch (cmd) {
            case 'help':
                return `Available commands:
  help      - Show this help message
  ls        - List directory contents
  cd <dir>  - Change directory
  cat <file>- Read file content
  clear     - Clear terminal
  echo      - Print arguments
  date      - Show current date/time
  whoami    - Display current user
  open <app>- Open an application (settings, projects, about, etc.)
  exit      - Close terminal
  theme <color> - Set accent color (blue, purple, green, orange, red, pink)`;

            case 'ls':
                return (MOCK_FS[currentDir] || []).join('\n');

            case 'cd': {
                const target = args[0];
                if (!target || target === '~') {
                    setCurrentDir('~');
                    return;
                }
                if (target === '..') {
                    if (currentDir === '~') return;
                    const parts = currentDir.split('/');
                    parts.pop();
                    setCurrentDir(parts.join('/') || '~');
                    return;
                }

                const newPath = currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`;
                if (MOCK_FS[newPath]) {
                    setCurrentDir(newPath);
                    return;
                }
                return `cd: no such file or directory: ${target}`;
            }

            case 'cat': {
                const file = args[0];
                if (!file) return 'usage: cat <file>';

                // Simple path resolution
                const path = file.startsWith('~') ? file : currentDir === '~' ? `~/${file}` : `${currentDir}/${file}`;

                if (FILE_CONTENTS[path]) {
                    return FILE_CONTENTS[path];
                }
                return `cat: ${file}: No such file or directory`;
            }

            case 'clear':
                setHistory([]);
                return null; // Special case handled in handler

            case 'echo':
                return args.join(' ');

            case 'date':
                return new Date().toLocaleString();

            case 'whoami':
                return 'guest@os-portfolio';

            case 'open': {
                const app = args[0]?.toLowerCase();
                if (!app) return 'usage: open <app_name>';
                const validApps = ['settings', 'projects', 'about', 'contact', 'terminal'];
                if (validApps.includes(app)) {
                    openWindow(app);
                    return `Opening ${app}...`;
                }
                return `open: application not found: ${app}`;
            }

            case 'theme': {
                const color = args[0]?.toLowerCase();
                const validColors = ['blue', 'purple', 'green', 'orange', 'red', 'pink'];
                if (validColors.includes(color)) {
                    setAccentColor(color);
                    return `Accent color set to ${color}`;
                }
                return `usage: theme <color>\nAvailable: ${validColors.join(', ')}`;
            }

            case 'exit':
                closeWindow('terminal');
                return null;

            default:
                return `Command not found: ${cmd}`;
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const commandLine = input.trim();
            if (!commandLine) return;

            const [cmd, ...args] = commandLine.split(' ');

            const output = executeCommand(cmd, args);

            if (cmd === 'clear' && output === null) {
                // History cleared in executeCommand if specialized, 
                // but we used setHistory([]) inside the switch for 'clear'? 
                // Wait, I can't call hooks/setters easily from a pure function if extracted. 
                // But here executeCommand is inside component.
                // For 'clear', I returned null.
            } else if (cmd !== 'clear') {
                setHistory(prev => [...prev, `${currentDir === '~' ? '~' : currentDir.replace('~', '')} $ ${commandLine}`]);
                if (output) {
                    setHistory(prev => [...prev, output]);
                }
            }

            setInput('');
        }
    };

    return (
        <div
            className="h-full w-full bg-black/90 p-2 font-mono text-sm text-green-400 overflow-auto"
            onClick={focusInput}
        >
            <div className="flex flex-col gap-1">
                {history.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap">{line}</div>
                ))}

                <div className="flex gap-2">
                    <span className="text-blue-400">guest@os:{currentDir === '~' ? '~' : currentDir.replace('~', '')}</span>
                    <span className="text-gray-400">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent outline-none border-none text-green-400"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
