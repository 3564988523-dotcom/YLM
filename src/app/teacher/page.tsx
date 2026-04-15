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
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Trophy,
  Clock,
  Star,
  ArrowUpRight,
  Home,
  Calendar,
  Bell,
  Settings,
  Play,
  Eye,
  CheckCircle,
  XCircle,
  Clock3,
  BookMarked,
  Award,
  Target,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';

const weeklyData = [
  { day: '周一', 幼儿: 45, 教师: 12 },
  { day: '周二', 幼儿: 52, 教师: 15 },
  { day: '周三', 幼儿: 48, 教师: 14 },
  { day: '周四', 幼儿: 61, 教师: 18 },
  { day: '周五', 幼儿: 55, 教师: 16 },
  { day: '周六', 幼儿: 38, 教师: 10 },
  { day: '周日', 幼儿: 32, 教师: 8 },
];

const courseDistribution = [
  { name: '运动模块', value: 35, color: '#4ECDC4' },
  { name: '外观模块', value: 25, color: '#A78BFA' },
  { name: '声音模块', value: 20, color: '#FFE66D' },
  { name: '控制模块', value: 12, color: '#FFB347' },
  { name: '事件模块', value: 8, color: '#FF6B6B' },
];

const abilityData = [
  { subject: '逻辑思维', A: 86, fullMark: 100 },
  { subject: '创造力', A: 78, fullMark: 100 },
  { subject: '问题解决', A: 92, fullMark: 100 },
  { subject: '协作能力', A: 74, fullMark: 100 },
  { subject: '表达能力', A: 88, fullMark: 100 },
];

const monthlyTrend = [
  { month: '9月', students: 85, completion: 72 },
  { month: '10月', students: 96, completion: 78 },
  { month: '11月', students: 108, completion: 82 },
  { month: '12月', students: 115, completion: 85 },
  { month: '1月', students: 122, completion: 88 },
  { month: '2月', students: 128, completion: 92 },
];

const students = [
  { id: 1, name: '王小明', grade: '中班', progress: 85, totalHours: 24, stars: 42, avatar: '👶', status: 'active', lastActive: '今天' },
  { id: 2, name: '李小雨', grade: '大班', progress: 92, totalHours: 32, stars: 58, avatar: '👧', status: 'active', lastActive: '今天' },
  { id: 3, name: '张小强', grade: '小班', progress: 68, totalHours: 16, stars: 28, avatar: '👦', status: 'active', lastActive: '昨天' },
  { id: 4, name: '陈小花', grade: '中班', progress: 78, totalHours: 20, stars: 35, avatar: '👸', status: 'inactive', lastActive: '3天前' },
  { id: 5, name: '刘小乐', grade: '大班', progress: 95, totalHours: 36, stars: 65, avatar: '🧒', status: 'active', lastActive: '今天' },
  { id: 6, name: '周小爱', grade: '小班', progress: 55, totalHours: 12, stars: 22, avatar: '👼', status: 'active', lastActive: '昨天' },
  { id: 7, name: '吴小杰', grade: '中班', progress: 72, totalHours: 18, stars: 32, avatar: '🦸', status: 'inactive', lastActive: '5天前' },
  { id: 8, name: '郑小心', grade: '大班', progress: 88, totalHours: 28, stars: 48, avatar: '👧', status: 'active', lastActive: '今天' },
];

const courses = [
  { id: 1, title: '奇妙运动派对', grade: '小班', difficulty: '入门', lessons: 12, completed: 8, students: 45, progress: 67, color: '#4ECDC4', teachers: ['王老师', '李老师'] },
  { id: 2, title: '创意造型师', grade: '中班', difficulty: '进阶', lessons: 16, completed: 10, students: 38, progress: 62, color: '#A78BFA', teachers: ['张老师'] },
  { id: 3, title: '音乐小达人', grade: '中班', difficulty: '进阶', lessons: 14, completed: 6, students: 32, progress: 43, color: '#FFE66D', teachers: ['王老师'] },
  { id: 4, title: '智慧大冒险', grade: '大班', difficulty: '挑战', lessons: 20, completed: 4, students: 28, progress: 20, color: '#FF6B6B', teachers: ['李老师', '张老师'] },
];

const topStudents = [
  { rank: 1, name: '李小雨', stars: 58, avatar: '👧', badge: '🏆' },
  { rank: 2, name: '刘小乐', stars: 65, avatar: '🧒', badge: '🥈' },
  { rank: 3, name: '郑小心', stars: 48, avatar: '👧', badge: '🥉' },
];

const upcomingActivities = [
  { id: 1, title: '期末学习成果展示', date: '2024-03-15', participants: 45, type: '展示' },
  { id: 2, title: '新课程内容培训', date: '2024-03-18', participants: 12, type: '培训' },
  { id: 3, title: '家长开放日活动', date: '2024-03-20', participants: 60, type: '活动' },
];

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFF9F0 0%, #FFF5E6 100%)' }}>
      {/* 顶部渐变导航栏 */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-[#FFE66D]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FFB347] flex items-center justify-center shadow-lg shadow-[#FF6B6B]/30 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#333]">教师工作台</h1>
                <p className="text-xs text-[#999]">幼乐码</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-2 bg-white/60 rounded-full px-6 py-2 shadow-sm">
              {[
                { id: 'overview', label: '教学概览', icon: Home },
                { id: 'courses', label: '课程管理', icon: BookOpen },
                { id: 'students', label: '学生管理', icon: Users },
                { id: 'analysis', label: '学习分析', icon: BarChart3 },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white shadow-lg shadow-[#FF6B6B]/20'
                      : 'text-[#666] hover:bg-[#FFE66D]/20'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="relative rounded-xl border-[#FFE66D]/30">
                <Bell className="w-5 h-5 text-[#FFB347]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B6B] rounded-full text-[10px] text-white flex items-center justify-center font-bold">2</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-xl border-[#FFE66D]/30">
                <Settings className="w-5 h-5 text-[#FFB347]" />
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex border-[#FFE66D] text-[#FFB347] hover:bg-[#FFE66D]/10 rounded-full">
                <Download className="w-4 h-4 mr-2" />
                导出报表
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] hover:opacity-90 text-white rounded-full shadow-lg shadow-[#FF6B6B]/20">
                <Plus className="w-4 h-4 mr-2" />
                新建课程
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* 教学概览 */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 欢迎横幅 */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#4ECDC4] via-[#45B7D1] to-[#A78BFA] p-8 text-white">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              <div className="relative">
                <h1 className="text-3xl font-bold mb-2">下午好，王老师！</h1>
                <p className="text-white/80 mb-6">今天是充实的一天，您班上有 {students.length} 名小朋友在认真学习</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">今日活跃</p>
                    <p className="text-2xl font-bold">{students.filter(s => s.lastActive === '今天').length}人</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">进行中课程</p>
                    <p className="text-2xl font-bold">{courses.length}门</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                    <p className="text-sm text-white/70">待完成作业</p>
                    <p className="text-2xl font-bold">8份</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 统计卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: '在园幼儿', value: '128', change: '+12', trend: 'up', icon: Users, gradient: 'from-[#4ECDC4] to-[#3DBDB5]' },
                { label: '课程总数', value: '24', change: '+3', trend: 'up', icon: BookOpen, gradient: 'from-[#A78BFA] to-[#9583F5]' },
                { label: '学习时长', value: '1,856', change: '+256', trend: 'up', icon: Clock, gradient: 'from-[#FFE66D] to-[#FFD93D]' },
                { label: '获得星星', value: '3,420', change: '+580', trend: 'up', icon: Star, gradient: 'from-[#FF6B6B] to-[#FF8E8E]' },
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
                          <ArrowUpRight className="w-4 h-4 text-[#4ECDC4]" />
                          <span className="text-sm text-[#4ECDC4] font-medium">{stat.change}</span>
                          <span className="text-xs text-[#999]">本周</span>
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
              {/* 学习趋势 */}
              <Card className="lg:col-span-2 border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-[#FFE66D]/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#FF6B6B]" />
                      周学习趋势
                    </CardTitle>
                    <Badge variant="secondary" className="bg-[#4ECDC4]/10 text-[#4ECDC4] border-0">
                      本周数据
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <defs>
                          <linearGradient id="color幼儿" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ECDC4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="color教师" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#A78BFA" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                        <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                        <Area type="monotone" dataKey="幼儿" stroke="#4ECDC4" strokeWidth={3} fillOpacity={1} fill="url(#color幼儿)" />
                        <Area type="monotone" dataKey="教师" stroke="#A78BFA" strokeWidth={3} fillOpacity={1} fill="url(#color教师)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 学习之星 */}
              <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-[#FFE66D]/20 to-transparent border-b border-[#FFE66D]/10">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#FFE66D]" />
                    学习之星
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {topStudents.map((student, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white to-[#FFF9F0] hover:shadow-md transition-all cursor-pointer">
                        <div className="relative">
                          <span className="text-3xl">{student.avatar}</span>
                          <span className="absolute -top-1 -right-1 text-lg">{student.badge}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-[#333]">{student.name}</p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#FFE66D] fill-[#FFE66D]" />
                            <span className="text-sm text-[#FFB347]">{student.stars}颗星</span>
                          </div>
                        </div>
                        <span className={`text-lg font-bold ${index === 0 ? 'text-[#FFD700]' : index === 1 ? 'text-[#C0C0C0]' : 'text-[#CD7F32]'}`}>
                          #{student.rank}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 即将到来 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 近期活动 */}
              <Card className="border-0 rounded-3xl shadow-lg">
                <CardHeader className="bg-white border-b border-[#FFE66D]/10">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#A78BFA]" />
                    近期活动
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {upcomingActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 p-4 rounded-2xl bg-[#FFF9F0] hover:bg-[#FFE66D]/10 transition-colors">
                        <div className="w-12 h-12 rounded-xl bg-[#A78BFA]/10 flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-[#A78BFA]" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#333]">{activity.title}</h4>
                          <p className="text-sm text-[#999]">{activity.date} · {activity.participants}人参与</p>
                        </div>
                        <Badge className="bg-[#4ECDC4]/10 text-[#4ECDC4] border-0">{activity.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 快捷操作 */}
              <Card className="border-0 rounded-3xl shadow-lg">
                <CardHeader className="bg-white border-b border-[#FFE66D]/10">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#FF6B6B]" />
                    快捷操作
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: '新建课程', icon: Plus, color: '#FF6B6B' },
                      { label: '导入学生', icon: Upload, color: '#4ECDC4' },
                      { label: '导出报表', icon: Download, color: '#A78BFA' },
                      { label: '查看分析', icon: BarChart3, color: '#FFE66D' },
                    ].map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col gap-2 rounded-2xl border-2 hover:border-current transition-all"
                        style={{ borderColor: `${action.color}40` }}
                      >
                        <action.icon className="w-6 h-6" style={{ color: action.color }} />
                        <span className="text-sm text-[#666]">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* 课程管理 */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#333]">课程管理</h2>
              <Button className="bg-gradient-to-r from-[#FF6B6B] to-[#FFB347] text-white rounded-full">
                <Plus className="w-4 h-4 mr-2" />
                新建课程
              </Button>
            </div>

            <Card className="border-0 rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                    <Input placeholder="搜索课程..." className="pl-10 rounded-xl border-[#FFE66D]/30 focus:border-[#FFE66D]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[140px] rounded-xl border-[#FFE66D]/30">
                      <SelectValue placeholder="年级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部年级</SelectItem>
                      <SelectItem value="小班">小班</SelectItem>
                      <SelectItem value="中班">中班</SelectItem>
                      <SelectItem value="大班">大班</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px] rounded-xl border-[#FFE66D]/30">
                      <SelectValue placeholder="难度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部难度</SelectItem>
                      <SelectItem value="入门">入门</SelectItem>
                      <SelectItem value="进阶">进阶</SelectItem>
                      <SelectItem value="挑战">挑战</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="border-0 rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}80 100%)` }}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-[#333] border-0">{course.grade}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className={`${course.difficulty === '入门' ? 'bg-[#4ECDC4]' : course.difficulty === '进阶' ? 'bg-[#FFE66D] text-[#333]' : 'bg-[#FF6B6B]'} text-white border-0`}>
                        {course.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white">{course.title}</h3>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#333]">{course.completed}/{course.lessons}</p>
                          <p className="text-xs text-[#999]">已完成课时</p>
                        </div>
                        <div className="w-px h-10 bg-[#FFE66D]/30" />
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#333]">{course.students}</p>
                          <p className="text-xs text-[#999]">学习人数</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#999]">课程进度</span>
                        <span className="font-medium" style={{ color: course.color }}>{course.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-[#FFE66D]/20 rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)` }} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {course.teachers.map((teacher, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-[#A78BFA] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                            {teacher.charAt(0)}
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-xl">
                          <Eye className="w-4 h-4 mr-1" />
                          预览
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="rounded-xl">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="w-4 h-4 mr-2" />编辑课程</DropdownMenuItem>
                            <DropdownMenuItem><Users className="w-4 h-4 mr-2" />查看学员</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500"><Trash2 className="w-4 h-4 mr-2" />删除课程</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 学生管理 */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#333]">学生管理</h2>
              <div className="flex gap-3">
                <Button variant="outline" className="border-[#4ECDC4] text-[#4ECDC4] rounded-full">
                  <Download className="w-4 h-4 mr-2" />
                  导出
                </Button>
                <Button className="bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5] text-white rounded-full">
                  <Upload className="w-4 h-4 mr-2" />
                  批量导入
                </Button>
              </div>
            </div>

            <Card className="border-0 rounded-2xl shadow-sm">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                    <Input placeholder="搜索学生..." className="pl-10 rounded-xl border-[#FFE66D]/30 focus:border-[#FFE66D]" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[140px] rounded-xl border-[#FFE66D]/30">
                      <SelectValue placeholder="年级" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部年级</SelectItem>
                      <SelectItem value="小班">小班</SelectItem>
                      <SelectItem value="中班">中班</SelectItem>
                      <SelectItem value="大班">大班</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px] rounded-xl border-[#FFE66D]/30">
                      <SelectValue placeholder="状态" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部状态</SelectItem>
                      <SelectItem value="active">活跃</SelectItem>
                      <SelectItem value="inactive">不活跃</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 rounded-3xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#FFE66D]/20 to-transparent">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">幼儿信息</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">年级</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">学习时长</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">学习进度</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">获得星星</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">最近活跃</th>
                      <th className="text-left px-6 py-4 text-sm font-bold text-[#666]">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-t border-[#FFE66D]/10 hover:bg-[#FFE66D]/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{student.avatar}</span>
                            <span className="font-bold text-[#333]">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="secondary" className="bg-[#A78BFA]/10 text-[#A78BFA] border-0 rounded-full">
                            {student.grade}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-[#666]">{student.totalHours}课时</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-[#FFE66D]/20 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5]" style={{ width: `${student.progress}%` }} />
                            </div>
                            <span className="text-sm font-medium text-[#4ECDC4]">{student.progress}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-[#FFE66D] fill-[#FFE66D]" />
                            <span className="font-bold text-[#FFB347]">{student.stars}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {student.lastActive === '今天' ? (
                              <span className="flex items-center gap-1 text-[#4ECDC4]"><CheckCircle className="w-4 h-4" />今天</span>
                            ) : student.lastActive === '昨天' ? (
                              <span className="flex items-center gap-1 text-[#FFE66D]"><Clock3 className="w-4 h-4" />昨天</span>
                            ) : (
                              <span className="flex items-center gap-1 text-[#999]"><XCircle className="w-4 h-4" />{student.lastActive}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="rounded-xl">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>查看详情</DropdownMenuItem>
                              <DropdownMenuItem>学习报告</DropdownMenuItem>
                              <DropdownMenuItem>联系家长</DropdownMenuItem>
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

        {/* 学习分析 */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#333]">学习分析</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 能力雷达图 */}
              <Card className="border-0 rounded-3xl shadow-lg">
                <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-[#FFE66D]/10">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-[#A78BFA]" />
                    能力分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={abilityData}>
                        <PolarGrid stroke="#E5E5E5" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 12 }} />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#999', fontSize: 10 }} />
                        <Radar name="能力值" dataKey="A" stroke="#A78BFA" strokeWidth={3} fill="#A78BFA" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* 课程分布 */}
              <Card className="border-0 rounded-3xl shadow-lg">
                <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-[#FFE66D]/10">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#4ECDC4]" />
                    课程分布
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                          {courseDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {courseDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm text-[#666]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 月度趋势 */}
            <Card className="border-0 rounded-3xl shadow-lg">
              <CardHeader className="bg-white/80 backdrop-blur-sm border-b border-[#FFE66D]/10">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#FF6B6B]" />
                  月度趋势
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#666', fontSize: 14 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#999', fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                      <Line type="monotone" dataKey="students" stroke="#4ECDC4" strokeWidth={3} dot={{ fill: '#4ECDC4', strokeWidth: 2 }} name="学生数" />
                      <Line type="monotone" dataKey="completion" stroke="#A78BFA" strokeWidth={3} dot={{ fill: '#A78BFA', strokeWidth: 2 }} name="完成率(%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
