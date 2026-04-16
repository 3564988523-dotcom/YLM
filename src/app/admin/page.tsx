'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3, Users, BookOpen, TrendingUp, Home, Settings, Bell, Search, Plus,
  MoreVertical, Download, RefreshCw, Eye, Edit, Trash2, BarChart, PieChart,
  Activity, Clock, Star, UserPlus, FileText, AlertCircle, CheckCircle2,
  XCircle, DollarSign, Calendar, UserCheck, UserX, BookMarked, Award,
  ArrowUpRight, ArrowDownRight, Zap, Target, ShoppingCart, CreditCard,
  MessageSquare, Mail, Phone, Globe, LogOut
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPie, Pie, Cell, BarChart as RechartsBar, Bar, LineChart, Line,
} from 'recharts';

// ======================== 原有模拟数据（严禁删除） ========================
const trendData = [
  { month: '9月', users: 420, active: 380, courses: 12, revenue: 85000 },
  { month: '10月', users: 480, active: 420, courses: 14, revenue: 98000 },
  { month: '11月', users: 520, active: 480, courses: 16, revenue: 112000 },
  { month: '12月', users: 580, active: 520, courses: 18, revenue: 125000 },
  { month: '1月', users: 640, active: 580, courses: 20, revenue: 138000 },
  { month: '2月', users: 720, active: 650, courses: 22, revenue: 156000 },
];

const userDistribution = [
  { name: '幼儿', value: 580, color: '#FF6B6B' },
  { name: '教师', value: 45, color: '#4ECDC4' },
  { name: '管理员', value: 8, color: '#A78BFA' },
];

const gradeDistribution = [
  { grade: '小班', students: 180, percentage: 28, color: '#4ECDC4' },
  { grade: '中班', students: 240, percentage: 37, color: '#A78BFA' },
  { grade: '大班', students: 225, percentage: 35, color: '#FFE66D' },
];

const activities = [
  { id: 1, type: 'login', user: '王小明', action: '登录学习', time: '2分钟前', icon: Users, color: '#4ECDC4' },
  { id: 2, type: 'course', user: '李老师', action: '调用 YL-Engine 核心分发逻辑', time: '5分钟前', icon: Activity, color: '#A78BFA' },
  { id: 3, type: 'complete', user: '李小雨', action: '完成课时「跳舞的乐乐」', time: '8分钟前', icon: Star, color: '#FFE66D' },
  { id: 4, type: 'register', user: '张小强', action: '新用户注册', time: '12分钟前', icon: UserPlus, color: '#FF6B6B' },
  { id: 5, type: 'course', user: '周老师', action: '更新课程进度', time: '15分钟前', icon: Activity, color: '#45B7D1' },
];

const recentCourses = [
  { id: 1, title: '奇妙运动派对', students: 45, progress: 67, status: '进行中', color: '#4ECDC4', revenue: 22500 },
  { id: 2, title: '创意造型师', students: 38, progress: 62, status: '进行中', color: '#A78BFA', revenue: 19000 },
  { id: 3, title: '音乐小达人', students: 32, progress: 43, status: '进行中', color: '#FFE66D', revenue: 16000 },
  { id: 4, title: '智慧大冒险', students: 28, progress: 20, status: '进行中', color: '#FF6B6B', revenue: 14000 },
];

const topInstructors = [
  { rank: 1, name: '王老师', courses: 8, students: 156, rating: 4.9, avatar: '👩‍🏫' },
  { rank: 2, name: '李老师', courses: 6, students: 128, rating: 4.8, avatar: '👨‍🏫' },
  { rank: 3, name: '张老师', courses: 5, students: 98, rating: 4.7, avatar: '👨‍🏫' },
];

const notifications = [
  { id: 1, type: 'user', title: '新用户注册申请', desc: '有3条待审核的注册申请', time: '10分钟前', unread: true },
  { id: 2, type: 'course', title: '课程审核提醒', desc: '《新编程启蒙课》待审核', time: '30分钟前', unread: true },
];

// ======================== 组件核心逻辑 ========================
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  
  // 1. 真实鉴权逻辑：进入页面先检查登录标记
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      router.replace('/'); // 未登录强制回首页
    } else {
      setIsLoaded(true);
    }
  }, [router]);

  // 2. 退出登录逻辑
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    router.push('/');
  };

  // 渲染校验屏
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7C3AED]"></div>
          <p className="text-[#7C3AED] font-medium animate-pulse">幼乐码核心环境校验中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)' }}>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b border-[#A78BFA]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-[#A78BFA]/30 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#333]">管理中台</h1>
                <p className="text-xs text-[#999]">幼乐码 YL-Engine</p>
              </div>
            </Link>

            {/* 核心导航切换逻辑 */}
            <div className="hidden md:flex items-center gap-1 bg-[#F1F5F9] rounded-2xl p-1.5">
              {[
                { id: 'dashboard', label: '数据看板', icon: Home },
                { id: 'users', label: '用户管理', icon: Users },
                { id: 'courses', label: '课程管理', icon: BookOpen },
                { id: 'reports', label: '报表中心', icon: FileText },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-white text-[#7C3AED] shadow-sm'
                      : 'text-[#64748B] hover:text-[#7C3AED]'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative rounded-xl border-[#A78BFA]/30">
                <Bell className="w-5 h-5 text-[#7C3AED]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B6B] rounded-full text-[10px] text-white flex items-center justify-center font-bold">
                  {notifications.filter(n => n.unread).length}
                </span>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white font-bold shadow-lg shadow-[#A78BFA]/30 hover:scale-105 transition-transform">
                    管
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-2xl p-2 mt-2 border-[#A78BFA]/20">
                  <DropdownMenuItem className="rounded-xl"><Settings className="w-4 h-4 mr-2" />系统设置</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-xl text-[#FF6B6B] focus:text-[#FF6B6B] focus:bg-red-50 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    安全退出
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ======================== 模块一：数据看板（Dashboard） ======================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* 欢迎横幅 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD] p-8 text-white shadow-xl">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/20 text-white border-0">中台管理员</Badge>
                  <Badge className="bg-[#4ECDC4] text-white border-0 animate-pulse">系统正常运行中</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">欢迎回来，管理专家</h1>
                <p className="text-white/80 mb-6">“幼乐码” STEAM 编程启蒙系统当前运行一切正常</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">今日活跃</p>
                    <p className="text-2xl font-bold">256人</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">今日收入</p>
                    <p className="text-2xl font-bold">¥5,280</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: '总用户数', value: '633', change: '+15%', icon: Users, gradient: 'from-[#FF6B6B] to-[#FF8E8E]' },
                { label: '课程总数', value: '24', change: '+2', icon: BookOpen, gradient: 'from-[#4ECDC4] to-[#6EE7DF]' },
                { label: '本月收入', value: '¥156K', change: '+23%', icon: DollarSign, gradient: 'from-[#A78BFA] to-[#C4B5FD]' },
                { label: '发放星星', value: '12,580', change: '+18%', icon: Star, gradient: 'from-[#FFE66D] to-[#FFF3A3]' },
              ].map((stat, i) => (
                <Card key={i} className="relative overflow-hidden border-0 rounded-3xl shadow-lg">
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient}`} />
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-400">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
                        <div className="flex items-center gap-1 mt-2 text-[#4ECDC4]">
                          <TrendingUp className="w-4 h-4" />
                          <span className="text-sm font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 图表展示区 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-0 rounded-3xl shadow-lg">
                <CardHeader className="border-b border-gray-50">
                  <CardTitle className="text-lg">数据趋势趋势</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                        <Area type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={3} fillOpacity={0.1} fill="#7C3AED" />
                        <Area type="monotone" dataKey="active" stroke="#4ECDC4" strokeWidth={3} fillOpacity={0.1} fill="#4ECDC4" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 实时动态 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="border-b border-gray-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#4ECDC4]" /> 实时动态
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[350px] overflow-y-auto">
                  <div className="space-y-4">
                    {activities.map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor: `${item.color}15`}}>
                          <item.icon className="w-5 h-5" style={{color: item.color}} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{item.user} <span className="font-normal text-gray-500">{item.action}</span></p>
                          <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ======================== 模块二：用户管理（Users） ======================== */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">用户全量数据库</h2>
              <Button className="bg-[#7C3AED] text-white rounded-xl shadow-lg shadow-[#7C3AED]/30">
                <UserPlus className="w-4 h-4 mr-2" /> 新增用户录入
              </Button>
            </div>
            <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
              <div className="p-6 bg-white border-b border-gray-100 flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="输入姓名或 ID 搜索..." className="pl-10 rounded-xl border-gray-100 focus:border-[#7C3AED]" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32 rounded-xl border-gray-100"><SelectValue placeholder="类型" /></SelectTrigger>
                  <SelectContent><SelectItem value="all">全部</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-gray-500 text-sm">
                    <tr>
                      <th className="px-6 py-4 text-left">姓名</th>
                      <th className="px-6 py-4 text-left">角色</th>
                      <th className="px-6 py-4 text-left">年级</th>
                      <th className="px-6 py-4 text-left">状态</th>
                      <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[{name: '王小明', role: '幼儿', grade: '中班', status: '正常'}].map((u, i) => (
                      <tr key={i} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-bold">{u.name}</td>
                        <td className="px-6 py-4"><Badge variant="outline" className="border-[#A78BFA] text-[#7C3AED] rounded-full">{u.role}</Badge></td>
                        <td className="px-6 py-4 text-gray-500">{u.grade}</td>
                        <td className="px-6 py-4 text-[#4ECDC4]">● {u.status}</td>
                        <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ======================== 模块三：课程管理（Courses） ======================== */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500">
            {recentCourses.map((course) => (
              <Card key={course.id} className="border-0 rounded-3xl shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                <div className="h-40 relative" style={{backgroundColor: `${course.color}20`}}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <BookOpen className="w-20 h-20" style={{color: course.color}} />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-600 border-0">{course.status}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{course.title}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">已学习 {course.students} 人</span>
                      <span className="font-bold" style={{color: course.color}}>{course.progress}% 完成</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{width: `${course.progress}%`, backgroundColor: course.color}} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* ======================== 模块四：报表中心（Reports） ======================== */}
        {activeTab === 'reports' && (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-top-4 duration-700">
             <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7C3AED]/10 to-[#A78BFA]/10 flex items-center justify-center mb-8">
               <FileText className="w-12 h-12 text-[#7C3AED]" />
             </div>
             <h2 className="text-3xl font-bold mb-4">YL-Engine 深度效能报表</h2>
             <p className="text-gray-400 max-w-md mx-auto">正在提取本季度 STEAM 教学逻辑分发数据，系统已自动生成加密 PDF 报告供您下载评估。</p>
             <Button className="mt-8 px-8 py-6 rounded-2xl bg-white border-2 border-[#7C3AED] text-[#7C3AED] font-bold hover:bg-[#7C3AED] hover:text-white transition-all">
               <Download className="w-5 h-5 mr-2" /> 导出全局运行分析
             </Button>
          </div>
        )}
      </main>
    </div>
  );
}