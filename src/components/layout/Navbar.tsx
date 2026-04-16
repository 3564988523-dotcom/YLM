'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, User, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoginModal from '../auth/LoginModal';

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo 区域 */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
            <Gamepad2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] to-[#A78BFA]">
            幼乐码
          </span>
        </Link>

        {/* 导航链接 - 路演演示核心路径 */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="#course" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">课程体系</Link>
          <Link href="#team" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">核心团队</Link>
          <Link href="#about" className="text-gray-600 hover:text-[#FF6B6B] transition-colors">项目前景</Link>
          
          {user ? (
            <div className="flex items-center gap-3 px-4 py-1.5 bg-[#4ECDC4]/10 rounded-full border border-[#4ECDC4]/20">
              <div className="w-6 h-6 rounded-full bg-[#4ECDC4] flex items-center justify-center text-[10px] text-white">
                <User size={14} />
              </div>
              <span className="text-sm font-bold text-[#3DBDB5]">{user.name}</span>
            </div>
          ) : (
            <Button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-gray-900 text-white rounded-full px-6 hover:bg-gray-800 transition-all"
            >
              后台登录 <ChevronRight size={16} className="ml-1" />
            </Button>
          )}
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={(name) => setUser({ name })} 
      />
    </nav>
  );
}