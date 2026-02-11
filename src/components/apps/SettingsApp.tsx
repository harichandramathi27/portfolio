'use client';

import { useState } from 'react';
import { useOSStore } from '@/store/useOSStore';
import { Monitor, Image, Info, Wifi, Bluetooth, Shield, Bell, Lock } from 'lucide-react';

export function SettingsApp() {
    const [activeTab, setActiveTab] = useState('personalization');
    const {
        wallpaper, setWallpaper,
        accentColor, setAccentColor,
        taskbarAlignment, setTaskbarAlignment
    } = useOSStore();

    // Mock States
    const [wifiEnabled, setWifiEnabled] = useState(true);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(true);

    const wallpapers = [
        { name: 'Midnight Gradient', value: 'linear-gradient(to bottom right, #0F2027, #203A43, #2C5364)' },
        { name: 'Sunset Vibes', value: 'linear-gradient(to bottom right, #ff7e5f, #feb47b)' },
        { name: 'Ocean Blue', value: 'linear-gradient(to bottom right, #2193b0, #6dd5ed)' },
        { name: 'Lush Green', value: 'linear-gradient(to bottom right, #11998e, #38ef7d)' },
        { name: 'Royal Purple', value: 'linear-gradient(to bottom right, #8E2DE2, #4A00E0)' },
        { name: 'Deep Space', value: 'linear-gradient(to bottom right, #232526, #414345)' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'personalization':
                return (
                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold mb-4">Background</h2>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                {wallpapers.map((wp) => (
                                    <button
                                        key={wp.name}
                                        onClick={() => setWallpaper(wp.value)}
                                        className={`relative group rounded-lg overflow-hidden h-24 w-full border-2 transition-all ${wallpaper === wp.value ? 'border-blue-500 scale-105' : 'border-transparent hover:scale-105'
                                            }`}
                                    >
                                        <div
                                            className="absolute inset-0"
                                            style={{ background: wp.value }}
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 text-xs text-white text-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            {wp.name}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4">Accent Color</h2>
                            <div className="flex flex-wrap gap-3">
                                {['blue', 'purple', 'green', 'orange', 'red', 'pink'].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setAccentColor(color)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${accentColor === color ? 'border-white scale-110' : 'border-transparent hover:scale-110'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold mb-4">Taskbar Alignment</h2>
                            <div className="flex gap-4 p-1 bg-white/10 rounded-lg w-max">
                                <button
                                    onClick={() => setTaskbarAlignment('center')}
                                    className={`px-4 py-2 rounded-md transition-all ${taskbarAlignment === 'center' ? 'bg-white/20 shadow' : 'hover:bg-white/5'
                                        }`}
                                >
                                    Center
                                </button>
                                <button
                                    onClick={() => setTaskbarAlignment('left')}
                                    className={`px-4 py-2 rounded-md transition-all ${taskbarAlignment === 'left' ? 'bg-white/20 shadow' : 'hover:bg-white/5'
                                        }`}
                                >
                                    Left
                                </button>
                            </div>
                        </section>
                    </div>
                );
            case 'network':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Network & Internet</h2>

                        {/* Wi-Fi Section */}
                        <div className="bg-white/5 p-4 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <Wifi size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Wi-Fi</h3>
                                        <p className="text-xs text-slate-400">Connect to the world</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={wifiEnabled}
                                        onChange={(e) => setWifiEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {wifiEnabled && (
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition cursor-pointer bg-white/10">
                                        <div className="flex items-center gap-3">
                                            <Wifi size={18} />
                                            <span>Home_Network_5G</span>
                                        </div>
                                        <span className="text-xs text-green-400">Connected</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition cursor-pointer opacity-75">
                                        <div className="flex items-center gap-3">
                                            <Wifi size={18} />
                                            <span>Office_Guest</span>
                                        </div>
                                        <Lock size={14} className="text-slate-500" />
                                    </div>
                                    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition cursor-pointer opacity-75">
                                        <div className="flex items-center gap-3">
                                            <Wifi size={18} />
                                            <span>Free_Public_WiFi</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'bluetooth':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Bluetooth & Devices</h2>

                        <div className="bg-white/5 p-4 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                        <Bluetooth size={24} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">Bluetooth</h3>
                                        <p className="text-xs text-slate-400">Discoverable as "WebOS-PC"</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={bluetoothEnabled}
                                        onChange={(e) => setBluetoothEnabled(e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            {bluetoothEnabled && (
                                <div className="space-y-2 pt-2 border-t border-white/10">
                                    <p className="text-xs text-slate-400 mb-2">Paired Devices</p>
                                    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">🎧</div>
                                            <span>Sony WH-1000XM5</span>
                                        </div>
                                        <span className="text-xs text-slate-400">Connected via Bluetooth</span>
                                    </div>
                                    <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center">⌨️</div>
                                            <span>Keychron K2</span>
                                        </div>
                                        <span className="text-xs text-slate-400">Paired</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'security':
                const [newPass, setNewPass] = useState('');
                const [passSuccess, setPassSuccess] = useState(false);
                const { password, setPassword, setLocked } = useOSStore();

                const handlePassChange = (e: React.FormEvent) => {
                    e.preventDefault();
                    if (newPass.length >= 4) {
                        setPassword(newPass);
                        setPassSuccess(true);
                        setNewPass('');
                        setTimeout(() => setPassSuccess(false), 3000);
                    }
                };

                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Security & Authentication</h2>

                        <div className="grid gap-4">
                            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-4">
                                <div className="flex items-center gap-3 text-amber-400">
                                    <Lock size={20} />
                                    <h3 className="font-bold uppercase tracking-wider text-sm">Session Control</h3>
                                </div>
                                <p className="text-xs text-slate-400">Secure your session immediately by locking the desktop. You will need your password to return.</p>
                                <button
                                    onClick={() => setLocked(true)}
                                    className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                >
                                    Lock Session Now
                                </button>
                            </div>

                            <div className="bg-white/5 p-5 rounded-xl border border-white/10 space-y-4">
                                <div className="flex items-center gap-3 text-blue-400">
                                    <Shield size={20} />
                                    <h3 className="font-bold uppercase tracking-wider text-sm">Access Management</h3>
                                </div>
                                <form onSubmit={handlePassChange} className="space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Update Master Key</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="password"
                                                value={newPass}
                                                onChange={(e) => setNewPass(e.target.value)}
                                                placeholder="New Password (min 4 chars)"
                                                className="flex-1 bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                    {passSuccess && (
                                        <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest animate-pulse">
                                            Password Updated Successfully
                                        </p>
                                    )}
                                    <div className="pt-2">
                                        <p className="text-[10px] text-slate-500">Current Password: <span className="text-slate-300 ml-1">{password}</span></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>

                        <div className="space-y-3">
                            <div className="bg-white/5 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Shield size={20} className="text-green-400" />
                                    <div>
                                        <h3 className="font-semibold">Windows Security</h3>
                                        <p className="text-xs text-slate-400">Antivirus, browser control, firewall</p>
                                    </div>
                                </div>
                                <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition">Open</button>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Lock size={20} className="text-yellow-400" />
                                    <div>
                                        <h3 className="font-semibold">Location Permissions</h3>
                                        <p className="text-xs text-slate-400">Apps can access your location</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Bell size={20} className="text-purple-400" />
                                    <div>
                                        <h3 className="font-semibold">Notifications</h3>
                                        <p className="text-xs text-slate-400">Get notifications from apps and senders</p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case 'system':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">System Information</h2>
                        <div className="space-y-4 text-sm">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-blue-400">OS Specifications</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="text-slate-400">Edition</span>
                                    <span>WebOS Pro</span>
                                    <span className="text-slate-400">Version</span>
                                    <span>24H2</span>
                                    <span className="text-slate-400">Build</span>
                                    <span>10.0.22631</span>
                                    <span className="text-slate-400">Experience</span>
                                    <span>Windows Feature Experience Pack</span>
                                </div>
                            </div>
                            <div className="bg-white/5 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2 text-blue-400">Device Specifications</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <span className="text-slate-400">Processor</span>
                                    <span>Virtual CPU @ 3.50GHz</span>
                                    <span className="text-slate-400">Installed RAM</span>
                                    <span>16.0 GB (15.8 GB usable)</span>
                                    <span className="text-slate-400">System Type</span>
                                    <span>64-bit operating system</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'about':
                return (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold mb-4">About</h2>
                        <div className="bg-white/5 p-6 rounded-lg text-center space-y-4">
                            <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4">
                                OS
                            </div>
                            <h3 className="text-xl font-bold">WebOS Portfolio</h3>
                            <p className="text-slate-400">
                                A web-based operating system portfolio built with Next.js, Tailwind CSS, and Framer Motion.
                            </p>
                            <div className="pt-4 border-t border-white/10">
                                <p className="text-xs text-slate-500">© 2024 WebOS Project. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex h-full text-white bg-slate-900/95 backdrop-blur-sm">
            {/* Sidebar */}
            <div className="w-16 md:w-64 flex-shrink-0 bg-black/20 border-r border-white/10 flex flex-col">
                <div className="p-4 border-b border-white/10 mb-2">
                    <h1 className="text-sm font-bold hidden md:block pl-2">Settings</h1>
                </div>

                <nav className="flex-1 px-2 space-y-1">
                    <button
                        onClick={() => setActiveTab('personalization')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'personalization' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Image size={18} />
                        <span className="hidden md:inline text-sm">Personalization</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('network')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'network' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Wifi size={18} />
                        <span className="hidden md:inline text-sm">Network</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('bluetooth')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'bluetooth' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Bluetooth size={18} />
                        <span className="hidden md:inline text-sm">Bluetooth</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('security')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'security' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Lock size={18} />
                        <span className="hidden md:inline text-sm">Security</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'privacy' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Shield size={18} />
                        <span className="hidden md:inline text-sm">Privacy</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('system')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'system' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Monitor size={18} />
                        <span className="hidden md:inline text-sm">System</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors ${activeTab === 'about' ? 'bg-white/10 text-blue-400' : 'hover:bg-white/5 text-slate-300'
                            }`}
                    >
                        <Info size={18} />
                        <span className="hidden md:inline text-sm">About</span>
                    </button>
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10 overflow-auto">
                {renderContent()}
            </div>
        </div>
    );
}
