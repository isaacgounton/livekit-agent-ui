'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Menu, MessageCircle, Radio, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavigationSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      name: 'Agent Chat',
      href: '/',
      icon: MessageCircle,
      description: 'Full-featured agent interface',
    },
    {
      name: 'Popup Embed',
      href: '/test/popup',
      icon: Zap,
      description: 'Floating widget embed',
    },
    {
      name: 'Iframe Embed',
      href: '/embed',
      icon: Radio,
      description: 'Inline chat bar embed',
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 inline-flex items-center justify-center rounded-md bg-zinc-900 p-2 text-zinc-50 transition-colors hover:bg-zinc-800 md:hidden"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Sidebar */}
      <nav
        className={cn(
          'fixed top-0 left-0 z-40 h-screen w-64 transform border-r border-zinc-800 bg-zinc-950 p-6 transition-transform duration-300 ease-in-out md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo/Title */}
        <div className="mt-12 mb-8 md:mt-0">
          <h1 className="text-xl font-bold text-zinc-50">LiveKit Agent</h1>
          <p className="mt-1 text-sm text-zinc-400">Multi-UI Framework</p>
        </div>
        {/* Navigation Items */}
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = mounted && pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'group flex items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-all duration-200',
                  isActive
                    ? 'border-blue-500 bg-blue-500/10 text-blue-50'
                    : 'border-transparent text-zinc-400 hover:border-zinc-700 hover:bg-zinc-900 hover:text-zinc-200'
                )}
              >
                <Icon
                  className={cn(
                    'mt-0.5 h-4 w-4 flex-shrink-0 transition-colors',
                    isActive ? 'text-blue-400' : 'text-zinc-500'
                  )}
                />
                <div className="flex-1">
                  <p className={cn('font-medium', isActive ? 'text-blue-100' : '')}>{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.description}</p>
                </div>
                <ChevronRight
                  className={cn(
                    'mt-0.5 h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1',
                    isActive ? 'text-blue-400' : 'text-zinc-600'
                  )}
                />
              </Link>
            );
          })}
        </div>{' '}
        {/* Footer Info */}
        <div className="absolute right-6 bottom-6 left-6">
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs font-medium text-zinc-300">Tips:</p>
            <ul className="mt-2 space-y-1 text-xs text-zinc-400">
              <li>• Agent Chat for full control</li>
              <li>• Popup for website widgets</li>
              <li>• Iframe for embeds</li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Content Spacing */}
      <div className="hidden md:block md:w-64" />
    </>
  );
}
