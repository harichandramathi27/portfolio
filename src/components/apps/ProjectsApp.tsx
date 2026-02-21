'use client';

import { Folder, Github, ExternalLink } from 'lucide-react';

const PROJECTS = [
    {
        id: 1,
        title: 'Attendance Management System',
        description: 'An Attendance Management System is a digital solution used to record and monitor attendance efficiently.',
        tech: ['React', 'Flask', 'python'],
        link: 'https://attendance-management-system-3-lz2g.onrender.com/login',
        github: 'https://github.com/harichandramathi27/attendance-management-system'
    },
    {
        id: 2,
        title: 'Blog Application',
        description: 'A comprehensive blog application that allows users to create, edit, and delete blog posts. ',
        tech: ['react', 'Flask', 'json', 'python'],
        link: 'https://blog-application-3-h22k.onrender.com/admin/login',
        github: 'https://github.com/harichandramathi27/blog-application'
    },
    {
        id: 3,
        title: 'AI Smart Productivity platform',
        description: '',
        tech: ['React', 'Fast API', 'OpenAI'],
        link: 'https://claude.ai/public/artifacts/3b762eee-cc77-471e-bde7-beab657bd5b0'
    },
    {
        id: 4,
        title: 'Task Management App',
        description: 'Collaborative task board with drag-and-drop functionality.',
        tech: ['Vue.js', 'Firebase', 'Pinia'],
        link: '#',
        github: '#'
    },
];

export function ProjectsApp() {
    return (
        <div className="h-full w-full bg-zinc-900 text-white p-6 overflow-auto">
            <div className="flex items-center gap-4 mb-6">
                <Folder className="h-8 w-8 text-blue-400" />
                <h2 className="text-2xl font-bold">My Projects</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROJECTS.map((project) => (
                    <div
                        key={project.id}
                        className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/10 hover:border-white/20 hover:shadow-lg"
                    >
                        <div className="flex justify-between items-start">
                            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                <Folder size={20} />
                            </div>
                            <div className="flex gap-2">
                                <a href={project.github} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/10 transition">
                                    <Github size={16} className="text-gray-400 hover:text-white" />
                                </a>
                                <a href={project.link} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/10 transition">
                                    <ExternalLink size={16} className="text-gray-400 hover:text-white" />
                                </a>
                            </div>
                        </div>

                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{project.description}</p>

                        <div className="mt-auto pt-2 flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
