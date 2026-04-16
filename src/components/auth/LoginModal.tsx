'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ShieldCheck } from 'lucide-react';

export default function LoginModal({ isOpen, onClose, onSuccess }: { 
  isOpen: boolean; 
  onClose: () => void;
  onSuccess: (name: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // 模拟 1.5 秒的后端校验时间，增加评委演示时的真实感
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onSuccess(phone === '13888888888' ? '评审专家' : '创业导师');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] rounded-3xl border-0 shadow-2xl">
        <DialogHeader className="space-y-3">
          <div className="mx-auto w-12 h-12 bg-[#4ECDC4]/10 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-[#4ECDC4]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-gray-800">幼乐码账户登录</DialogTitle>
          <p className="text-center text-gray-500 text-sm">请输入您的手机号以进入教学管理后台</p>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-5 pt-4">
          <div className="space-y-2">
            <Label htmlFor="phone">手机号码</Label>
            <Input 
              id="phone" 
              placeholder="138 **** 8888" 
              required 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl h-11 border-gray-100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">验证码 / 密码</Label>
            <Input id="password" type="password" placeholder="请输入密码" required className="rounded-xl h-11 border-gray-100" />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] rounded-xl text-lg font-bold shadow-lg shadow-red-200"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="animate-spin mr-2" /> : '安全登录'}
          </Button>
          
          <div className="text-center text-xs text-gray-400">
            登录即代表同意《幼乐码用户服务协议》
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}