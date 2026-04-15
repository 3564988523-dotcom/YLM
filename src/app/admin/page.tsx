'use client';

import { useState } from 'react';
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
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Home,
  Settings,
  Bell,
  Search,
  Plus,
  MoreVertical,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  BarChart,
  PieChart,
  Activity,
  Clock,
  Star,
  UserPlus,
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  DollarSign,
  Calendar,
  UserCheck,
  UserX,
  BookMarked,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Target,
  ShoppingCart,
  CreditCard,
  MessageSquare,
  Mail,
  Phone,
  Globe,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
  BarChart as RechartsBar,
  Bar,
  LineChart,
  Line,
} from 'recharts';

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
  { id: 2, type: 'course', user: '李老师', action: '新建课程《创意造型师》', time: '5分钟前', icon: BookOpen, color: '#A78BFA' },
  { id: 3, type: 'complete', user: '李小雨', action: '完成课时「跳舞的乐乐」', time: '8分钟前', icon: Star, color: '#FFE66D' },
  { id: 4, type: 'register', user: '张小强', action: '新用户注册', time: '12分钟前', icon: UserPlus, color: '#FF6B6B' },
  { id: 5, type: 'course', user: '周老师', action: '更新课程进度', time: '15分钟前', icon: Activity, color: '#45B7D1' },
  { id: 6, type: 'complete', user: '陈小花', action: '获得3颗新星星', time: '20分钟前', icon: Star, color: '#FFE66D' },
  { id: 7, type: 'login', user: '刘小乐', action: '完成学习任务', time: '25分钟前', icon: Target, color: '#4ECDC4' },
  { id: 8, type: 'course', user: '王老师', action: '导入新生数据', time: '30分钟前', icon: Users, color: '#A78BFA' },
];

const recentCourses = [
  { id: 1, title: '奇妙运动派对', students: 45, progress: 67, status: '进行中', color: '#4ECDC4', revenue: 22500 },
  { id: 2, title: '创意造型师', students: 38, progress: 62, status: '进行中', color: '#A78BFA', revenue: 19000 },
  { id: 3, title: '音乐小达人', students: 32, progress: 43, status: '进行中', color: '#FFE66D', revenue: 16000 },
  { id: 4, title: '智慧大冒险', students: 28, progress: 20, status: '进行中', color: '#FF6B6B', revenue: 14000 },
];

const systemAlerts = [
  { id: 1, level: 'success', message: '系统运行正常，所有服务在线', time: '10:30' },
  { id: 2, level: 'warning', message: '课程《智慧大冒险》完成率偏低', time: '09:15' },
  { id: 3, level: 'success', message: '本周新增用户数创历史新高', time: '昨日' },
  { id: 4, level: 'info', message: '服务器已自动升级到最新版本', time: '昨日' },
];

const topInstructors = [
  { rank: 1, name: '王老师', courses: 8, students: 156, rating: 4.9, avatar: '👩‍🏫' },
  { rank: 2, name: '李老师', courses: 6, students: 128, rating: 4.8, avatar: '👨‍🏫' },
  { rank: 3, name: '张老师', courses: 5, students: 98, rating: 4.7, avatar: '👨‍🏫' },
];

const notifications = [
  { id: 1, type: 'user', title: '新用户注册申请', desc: '有3条待审核的注册申请', time: '10分钟前', unread: true },
  { id: 2, type: 'course', title: '课程审核提醒', desc: '《新编程启蒙课》待审核', time: '30分钟前', unread: true },
  { id: 3, type: 'system', title: '系统更新通知', desc: '新版本 v1.2.0 已发布', time: '2小时前', unread: false },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

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
                <h1 className="text-xl font-bold text-[#333]">管理中心</h1>
                <p className="text-xs text-[#999]">幼乐码</p>
              </div>
            </Link>

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
              <Button variant="outline" size="icon" className="rounded-xl border-[#A78BFA]/30">
                <Settings className="w-5 h-5 text-[#7C3AED]" />
              </Button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A78BFA] to-[#7C3AED] flex items-center justify-center text-white font-bold shadow-lg shadow-[#A78BFA]/30">
                管
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 数据看板 */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 欢迎横幅 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-[#C4B5FD] p-8 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 blur-2xl transform -translate-x-1/2 translate-y-1/2" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-white/20 text-white border-0">管理员</Badge>
                  <Badge className="bg-[#4ECDC4] text-white border-0 animate-pulse">系统正常</Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">欢迎回来，管理员</h1>
                <p className="text-white/80 mb-6">今天是美好的一天，平台运行一切正常</p>

                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">今日活跃</p>
                    <p className="text-2xl font-bold">256人</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">今日学习</p>
                    <p className="text-2xl font-bold">1,248课时</p>
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
                { label: '总用户数', value: '633', change: '+15%', trend: 'up', icon: Users, gradient: 'from-[#FF6B6B] to-[#FF8E8E]' },
                { label: '课程总数', value: '24', change: '+2', trend: 'up', icon: BookOpen, gradient: 'from-[#4ECDC4] to-[#6EE7DF]' },
                { label: '本月收入', value: '¥156K', change: '+23%', trend: 'up', icon: DollarSign, gradient: 'from-[#A78BFA] to-[#C4B5FD]' },
                { label: '发放星星', value: '12,580', change: '+18%', trend: 'up', icon: Star, gradient: 'from-[#FFE66D] to-[#FFF3A3]' },
              ].map((stat, index) => (
                <Card key={index} className="relative overflow-hidden border-0 rounded-3xl shadow-lg">
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stat.gradient}`} />
                  <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 blur-xl`} />
                  <CardContent className="relative pt-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[#999] mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-[#333]">{stat.value}</h3>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
                          <span className="text-sm text-[#4ECDC4] font-medium">{stat.change}</span>
                          <span className="text-xs text-[#999]">较上月</span>
                        </div>
                      </div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 用户活跃趋势 */}
              <Card className="lg:col-span-2 border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-white border-b border-[#A78BFA]/10 pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#7C3AED]" />
                      数据趋势
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-[#FF6B6B]/10 text-[#FF6B6B] border-0">用户数</Badge>
                      <Badge variant="secondary" className="bg-[#4ECDC4]/10 text-[#4ECDC4] border-0">活跃数</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                        <Area type="monotone" dataKey="active" stroke="#4ECDC4" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 用户分布 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-white border-b border-[#A78BFA]/10 pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-[#A78BFA]" />
                    用户分布
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPie>
                        <Pie data={userDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                          {userDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPie>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {userDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-[#64748B]">{item.name}</span>
                        </div>
                        <span className="font-bold text-[#333]">{item.value}人</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 年级分布和实时动态 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 年级分布 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-white border-b border-[#A78BFA]/10 pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#4ECDC4]" />
                    年级分布
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {gradeDistribution.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-[#333]">{item.grade}</span>
                          <span className="text-[#64748B]">{item.students}人 ({item.percentage}%)</span>
                        </div>
                        <div className="h-3 bg-[#F1F5F9] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 实时动态 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#4ECDC4]/10 to-transparent border-b border-[#4ECDC4]/20">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#4ECDC4]" />
                    实时动态
                    <Badge className="ml-2 bg-[#4ECDC4] text-white border-0 animate-pulse">LIVE</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[280px] overflow-y-auto">
                  <div className="space-y-3">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${activity.color}20` }}>
                          <activity.icon className="w-5 h-5" style={{ color: activity.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#333]">
                            <span className="font-bold">{activity.user}</span>
                            <span className="text-[#64748B]"> {activity.action}</span>
                          </p>
                          <p className="text-xs text-[#94A3B8] mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 热门课程和优秀教师 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 热门课程 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-white border-b border-[#A78BFA]/10">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <BarChart className="w-5 h-5 text-[#FF6B6B]" />
                      热门课程
                    </span>
                    <Button variant="ghost" size="sm" className="text-[#7C3AED]">
                      查看全部
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {recentCourses.map((course, index) => (
                      <div key={course.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                        <span className="text-lg font-bold text-[#94A3B8] w-6">{index + 1}</span>
                        <div className="w-3 h-12 rounded-full" style={{ backgroundColor: course.color }} />
                        <div className="flex-1">
                          <p className="font-bold text-[#333]">{course.title}</p>
                          <p className="text-sm text-[#94A3B8]">{course.students}人学习 · ¥{course.revenue.toLocaleString()}</p>
                        </div>
                        <Badge className="bg-[#4ECDC4]/10 text-[#4ECDC4] border-0">{course.progress}%</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 优秀教师 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-white border-b border-[#A78BFA]/10">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#FFE66D]" />
                      优秀教师
                    </span>
                    <Button variant="ghost" size="sm" className="text-[#7C3AED]">
                      查看排名
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {topInstructors.map((teacher, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#F8FAFC] transition-colors">
                        <span className={`text-lg font-bold w-6 ${index === 0 ? 'text-[#FFD700]' : index === 1 ? 'text-[#C0C0C0]' : 'text-[#CD7F32]'}`}>
                          #{teacher.rank}
                        </span>
                        <span className="text-2xl">{teacher.avatar}</span>
                        <div className="flex-1">
                          <p className="font-bold text-[#333]">{teacher.name}</p>
                          <p className="text-sm text-[#94A3B8]">{teacher.courses}门课程 · {teacher.students}名学生</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-[#FFE66D] fill-[#FFE66D]" />
                          <span className="font-bold text-[#FFB347]">{teacher.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 快捷操作 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: '添加用户', icon: UserPlus, color: '#FF6B6B' },
                { label: '创建课程', icon: Plus, color: '#4ECDC4' },
                { label: '导出报表', icon: Download, color: '#A78BFA' },
                { label: '系统设置', icon: Settings, color: '#FFE66D' },
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col gap-2 rounded-2xl border-2 transition-all hover:shadow-lg"
                  style={{ borderColor: `${action.color}30` }}
                >
                  <action.icon className="w-6 h-6" style={{ color: action.color }} />
                  <span className="text-sm text-[#64748B]">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 用户管理 */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#333]">用户管理</h2>
              <div className="flex gap-3">
                <Button variant="outline" className="border-[#A78BFA] text-[#7C3AED] rounded-full">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white rounded-full">
                  <UserPlus className="w-4 h-4 mr-2" />
                  添加用户
                </Button>
              </div>
            </div>

            <Card className="border-0 rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                    <Input placeholder="搜索用户..." className="pl-10 rounded-xl border-[#A78BFA]/30 focus:border-[#A78BFA]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[140px] rounded-xl border-[#A78BFA]/30">
                      <SelectValue placeholder="用户类型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部用户</SelectItem>
                      <SelectItem value="student">幼儿</SelectItem>
                      <SelectItem value="teacher">教师</SelectItem>
                      <SelectItem value="admin">管理员</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px] rounded-xl border-[#A78BFA]/30">
                      <SelectValue placeholder="年级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部年级</SelectItem>
                      <SelectItem value="小班">小班</SelectItem>
                      <SelectItem value="中班">中班</SelectItem>
                      <SelectItem value="大班">大班</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#A78BFA]/10 to-transparent">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#64748B]">用户信息</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#64748B]">类型</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#64748B]">年级/班级</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#64748B]">学习时长</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#64748B]">状态</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#64748B]">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 1, name: '王小明', type: 'student', grade: '中班', hours: 24, status: 'active', avatar: '👶' },
                      { id: 2, name: '李小雨', type: 'student', grade: '大班', hours: 32, status: 'active', avatar: '👧' },
                      { id: 3, name: '张老师', type: 'teacher', grade: '中班', hours: 156, status: 'active', avatar: '👩‍🏫' },
                      { id: 4, name: '刘管理员', type: 'admin', grade: '-', hours: 0, status: 'active', avatar: '👨‍💼' },
                      { id: 5, name: '陈小花', type: 'student', grade: '小班', hours: 18, status: 'inactive', avatar: '👸' },
                      { id: 6, name: '周老师', type: 'teacher', grade: '大班', hours: 128, status: 'active', avatar: '👨‍🏫' },
                    ].map((user) => (
                      <tr key={user.id} className="border-t border-[#A78BFA]/10 hover:bg-[#A78BFA]/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{user.avatar}</span>
                            <span className="font-bold text-[#333]">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={`${user.type === 'admin' ? 'bg-[#A78BFA] text-white' : user.type === 'teacher' ? 'bg-[#4ECDC4] text-white' : 'bg-[#FF6B6B]/20 text-[#FF6B6B]'} border-0 rounded-full`}>
                            {user.type === 'admin' ? '管理员' : user.type === 'teacher' ? '教师' : '幼儿'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-[#64748B]">{user.grade}</td>
                        <td className="px-6 py-4 text-[#64748B]">{user.hours}课时</td>
                        <td className="px-6 py-4">
                          {user.status === 'active' ? (
                            <Badge className="bg-[#4ECDC4]/10 text-[#4ECDC4] border-0 rounded-full">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              正常
                            </Badge>
                          ) : (
                            <Badge className="bg-[#FF6B6B]/10 text-[#FF6B6B] border-0 rounded-full">
                              <XCircle className="w-3 h-3 mr-1" />
                              停用
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-xl">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem><Eye className="w-4 h-4 mr-2" />查看详情</DropdownMenuItem>
                              <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />编辑</DropdownMenuItem>
                              <DropdownMenuItem><Trash2 className="w-4 h-4 mr-2 text-red-500" />删除</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* 课程管理 & 报表中心 */}
        {(activeTab === 'courses' || activeTab === 'reports') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#333]">
                {activeTab === 'courses' ? '课程管理' : '报表中心'}
              </h2>
              <Button className="bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white rounded-full">
                <Download className="w-4 h-4 mr-2" />
                导出报表
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentCourses.map((course) => (
                <Card key={course.id} className="border-0 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}80 100%)` }}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#333]">{course.students}</p>
                        <p className="text-xs text-[#999]">学习人数</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold" style={{ color: course.color }}>{course.progress}%</p>
                        <p className="text-xs text-[#999]">完成率</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#333]">24</p>
                        <p className="text-xs text-[#999]">总课时</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full rounded-xl border-[#A78BFA]/30">
                      <Eye className="w-4 h-4 mr-2" />
                      查看详情
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
