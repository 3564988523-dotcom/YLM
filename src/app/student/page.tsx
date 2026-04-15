'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Gamepad2,
  GraduationCap,
  BarChart3,
  Sparkles,
  Star,
  Rocket,
  BookOpen,
  Users,
  Zap,
  Clock,
  Award,
  Trophy,
  Target,
  ChevronRight,
  ChevronLeft,
  Home,
  Play,
  ArrowRight,
  Layers,
  Code,
  Palette,
  Music,
  Brain,
  Heart,
  Shield,
  Globe,
  Lightbulb,
  Cpu,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// 轮播数据
const banners = [
  {
    id: 1,
    title: 'STEAM编程启蒙',
    subtitle: '专为3-6岁幼儿设计',
    description: '通过游戏化教学，让孩子在快乐中培养计算思维和创造力',
    icon: '🎮',
    gradient: 'from-[#FF6B6B] via-[#FF8E8E] to-[#FFB347]',
    tag: '火热报名中',
  },
  {
    id: 2,
    title: '可视化积木编程',
    subtitle: '零基础也能轻松上手',
    description: '像搭积木一样学习编程，激发无限创造力',
    icon: '🧩',
    gradient: 'from-[#4ECDC4] via-[#6EE7DF] to-[#45B7D1]',
    tag: '新品上线',
  },
  {
    id: 3,
    title: '个性化学习路径',
    subtitle: '因材施教，循序渐进',
    description: '根据孩子年龄和兴趣，定制专属学习计划',
    icon: '📚',
    gradient: 'from-[#A78BFA] via-[#C4B5FD] to-[#DDD6FE]',
    tag: '特色课程',
  },
  {
    id: 4,
    title: '成就激励系统',
    subtitle: '每一步都有收获',
    description: '丰富的成就奖励，让学习充满成就感和乐趣',
    icon: '🏆',
    gradient: 'from-[#FFE66D] via-[#FFF3A3] to-[#FDE68A]',
    tag: '激励机制',
  },
];

// 关于我们数据
const teamMembers = [
  {
    name: '张教授',
    role: '学术顾问',
    description: '知名教育学专家，专注儿童发展心理学研究30年',
    avatar: '👨‍🏫',
    color: '#FF6B6B',
  },
  {
    name: '李博士',
    role: '技术总监',
    description: '前硅谷工程师，专注于少儿编程教育产品研发',
    avatar: '👨‍💻',
    color: '#4ECDC4',
  },
  {
    name: '王老师',
    role: '课程总监',
    description: '资深幼教专家，丰富的幼儿园教学经验',
    avatar: '👩‍🏫',
    color: '#A78BFA',
  },
  {
    name: '刘设计师',
    role: '体验设计总监',
    description: '专注儿童产品设计，作品多次获得国际设计大奖',
    avatar: '👩‍🎨',
    color: '#FFE66D',
  },
];

const coreValues = [
  { icon: Heart, title: '寓教于乐', desc: '让孩子在游戏中学习，在学习中成长' },
  { icon: Shield, title: '安全友好', desc: '纯净内容，绿色体验，保护孩子健康成长' },
  { icon: Lightbulb, title: '激发创造力', desc: '鼓励探索，支持试错，培养创新思维' },
  { icon: Globe, title: '面向未来', desc: '为数字时代培养核心竞争力' },
];

const techFeatures = [
  { icon: Cpu, title: 'AI智能适配', desc: '根据学习数据智能推荐适合的课程内容' },
  { icon: Layers, title: '模块化设计', desc: '积木式编程，降低学习门槛' },
  { icon: Palette, title: '精美视觉', desc: '专为儿童设计的友好界面' },
  { icon: Music, title: '音效反馈', desc: '生动的音效激励，增强学习动力' },
];

// 学习数据
const learningDays = [
  { date: '2024-03-01', hours: 1.5, blocks: 8, stars: 2 },
  { date: '2024-03-02', hours: 2.0, blocks: 12, stars: 3 },
  { date: '2024-03-03', hours: 1.0, blocks: 6, stars: 1 },
  { date: '2024-03-04', hours: 2.5, blocks: 15, stars: 3 },
  { date: '2024-03-05', hours: 1.8, blocks: 10, stars: 2 },
  { date: '2024-03-06', hours: 2.2, blocks: 14, stars: 3 },
  { date: '2024-03-07', hours: 1.5, blocks: 9, stars: 2 },
];

const lessonDetails = [
  {
    id: 1,
    title: '认识乐乐',
    status: 'completed',
    stars: 3,
    duration: '10分钟',
    description: '学习与角色乐乐打招呼，了解基本操作',
    skills: ['基本交互', '注意力培养'],
  },
  {
    id: 2,
    title: '乐乐跳舞',
    status: 'completed',
    stars: 2,
    duration: '12分钟',
    description: '使用运动积木让乐乐移动和旋转',
    skills: ['运动指令', '方向概念'],
  },
  {
    id: 3,
    title: '乐乐说话',
    status: 'completed',
    stars: 3,
    duration: '10分钟',
    description: '使用外观积木让乐乐说话和思考',
    skills: ['表达指令', '语言发展'],
  },
  {
    id: 4,
    title: '音乐派对',
    status: 'in-progress',
    stars: 1,
    duration: '15分钟',
    description: '播放音乐，创作简单的节奏',
    skills: ['声音指令', '节奏感'],
  },
  {
    id: 5,
    title: '重复的魔法',
    status: 'locked',
    stars: 0,
    duration: '12分钟',
    description: '学习使用重复积木简化程序',
    skills: ['循环概念', '效率意识'],
  },
  {
    id: 6,
    title: '终极挑战',
    status: 'locked',
    stars: 0,
    duration: '20分钟',
    description: '综合运用所有积木完成挑战任务',
    skills: ['综合应用', '问题解决'],
  },
];

const achievements = [
  {
    id: 1,
    name: '初次探险',
    icon: '🌟',
    description: '完成第一节课程',
    progress: 100,
    unlocked: true,
    reward: '获得50经验值',
    color: '#FFE66D',
  },
  {
    id: 2,
    name: '学习之星',
    icon: '⭐',
    description: '连续学习3天',
    progress: 100,
    unlocked: true,
    reward: '获得「坚持」徽章',
    color: '#4ECDC4',
  },
  {
    id: 3,
    name: '运动健将',
    icon: '🏃',
    description: '完成所有运动课程',
    progress: 100,
    unlocked: true,
    reward: '获得「运动达人」徽章',
    color: '#FF6B6B',
  },
  {
    id: 4,
    name: '音乐天才',
    icon: '🎵',
    description: '完成音乐课程学习',
    progress: 60,
    unlocked: false,
    reward: '解锁新角色「小歌手」',
    color: '#A78BFA',
  },
  {
    id: 5,
    name: '创造大师',
    icon: '🎨',
    description: '独立创作3个作品',
    progress: 40,
    unlocked: false,
    reward: '获得「创意之星」称号',
    color: '#45B7D1',
  },
  {
    id: 6,
    name: '编程高手',
    icon: '🤖',
    description: '完成所有基础课程',
    progress: 20,
    unlocked: false,
    reward: '解锁高级课程',
    color: '#FFB347',
  },
];

export default function StudentPage() {
  const [mounted, setMounted] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showDaysModal, setShowDaysModal] = useState(false);
  const [showLessonsModal, setShowLessonsModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showStarsModal, setShowStarsModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const totalStars = 58;
  const totalLessons = 28;
  const totalDays = 12;
  const totalAchievements = 8;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFF9F0 0%, #FFF5E6 100%)' }}>
      {/* 顶部波浪装饰 */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32">
          <svg viewBox="0 0 1440 120" fill="none" className="absolute w-full h-full">
            <path
              d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 35C672 40 768 50 864 55C960 60 1056 60 1152 55C1248 50 1344 40 1392 35L1440 30V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V60Z"
              fill="url(#waveGradient2)"
            />
            <defs>
              <linearGradient id="waveGradient2" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B6B" />
                <stop offset="0.5" stopColor="#FFB347" />
                <stop offset="1" stopColor="#FFE66D" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* 顶部导航 */}
        <header className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-6">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF6B6B] to-[#FFB347] flex items-center justify-center shadow-lg shadow-[#FF6B6B]/30 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-[#333]">幼乐码</span>
            </a>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm">
                <Star className="w-5 h-5 text-[#FFE66D] fill-[#FFE66D]" />
                <span className="font-bold text-[#FFB347]">{totalStars}</span>
              </div>
              <Button variant="outline" size="sm" className="rounded-full border-[#FFE66D] text-[#FFB347] hover:bg-[#FFE66D]/10" asChild>
                <a href="/">
                  <Home className="w-4 h-4 mr-1" />
                  返回首页
                </a>
              </Button>
            </div>
          </div>
        </header>
      </div>

      <main className="relative max-w-6xl mx-auto px-6 pb-16 -mt-4">
        {/* 欢迎横幅 */}
        <div className="relative mb-10 p-8 rounded-3xl bg-gradient-to-br from-[#FF6B6B] via-[#FF8E8E] to-[#FFB347] overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-xl" />
          <div className="absolute top-4 right-8 text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🎉</div>
          <div className="absolute bottom-4 right-16 text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>⭐</div>

          <div className="relative">
            <h1 className="text-3xl font-bold text-white mb-2">欢迎回来，小朋友！</h1>
            <p className="text-white/90 mb-4">今天也要继续加油哦，乐乐在等你一起玩！</p>

            <div className="flex items-center gap-6">
              <div className="flex-1 max-w-xs">
                <div className="flex justify-between text-white/90 text-sm mb-2">
                  <span>今日学习进度</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-3 bg-white/30 [&>div]:bg-white" />
              </div>
              <Button className="bg-white text-[#FF6B6B] hover:bg-white/90 rounded-full h-12 px-8 shadow-xl font-bold" asChild>
                <a href="/student/workspace">
                  <Sparkles className="w-5 h-5 mr-2" />
                  继续学习
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* 轮播图 */}
        <div className="mb-10">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-[280px] md:h-[320px]">
              {banners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${banner.gradient}`} />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative h-full flex items-center">
                    <div className="px-10 md:px-16 max-w-xl">
                      <Badge className="mb-4 bg-white/90 text-[#333] border-0">
                        {banner.tag}
                      </Badge>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {banner.title}
                      </h2>
                      <p className="text-xl text-white/90 mb-3">{banner.subtitle}</p>
                      <p className="text-white/80 mb-6">{banner.description}</p>
                      <Button className="bg-white text-[#FF6B6B] hover:bg-white/90 rounded-full h-12 px-8 font-bold">
                        <Play className="w-5 h-5 mr-2" />
                        了解更多
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                    <div className="hidden md:block absolute right-16 text-8xl">
                      {banner.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 轮播控制 */}
            <button
              onClick={() => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-[#333]" />
            </button>
            <button
              onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-[#333]" />
            </button>

            {/* 指示器 */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentBanner ? 'bg-white w-8' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <Card
            className="relative overflow-hidden border-0 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => setShowDaysModal(true)}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4ECDC4]" />
            <CardContent className="pt-6 pb-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#4ECDC4]/10">
                <Clock className="w-6 h-6 text-[#4ECDC4]" />
              </div>
              <p className="text-2xl font-bold text-[#333]">{totalDays}</p>
              <p className="text-sm text-[#999]">学习天数</p>
              <p className="text-xs text-[#4ECDC4] mt-2">点击查看详情</p>
            </CardContent>
          </Card>

          <Card
            className="relative overflow-hidden border-0 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => setShowLessonsModal(true)}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#A78BFA]" />
            <CardContent className="pt-6 pb-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#A78BFA]/10">
                <BookOpen className="w-6 h-6 text-[#A78BFA]" />
              </div>
              <p className="text-2xl font-bold text-[#333]">{totalLessons}</p>
              <p className="text-sm text-[#999]">完成课时</p>
              <p className="text-xs text-[#A78BFA] mt-2">点击查看详情</p>
            </CardContent>
          </Card>

          <Card
            className="relative overflow-hidden border-0 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => setShowStarsModal(true)}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFE66D]" />
            <CardContent className="pt-6 pb-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#FFE66D]/10">
                <Star className="w-6 h-6 text-[#FFE66D]" />
              </div>
              <p className="text-2xl font-bold text-[#333]">{totalStars}</p>
              <p className="text-sm text-[#999]">获得星星</p>
              <p className="text-xs text-[#FFE66D] mt-2">点击查看详情</p>
            </CardContent>
          </Card>

          <Card
            className="relative overflow-hidden border-0 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
            onClick={() => setShowAchievementsModal(true)}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B]" />
            <CardContent className="pt-6 pb-4 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-[#FF6B6B]/10">
                <Award className="w-6 h-6 text-[#FF6B6B]" />
              </div>
              <p className="text-2xl font-bold text-[#333]">{totalAchievements}</p>
              <p className="text-sm text-[#999]">获得奖章</p>
              <p className="text-xs text-[#FF6B6B] mt-2">点击查看详情</p>
            </CardContent>
          </Card>
        </div>

        {/* 关于我们 */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#333] mb-8 text-center flex items-center justify-center gap-3">
            <Heart className="w-6 h-6 text-[#FF6B6B]" />
            关于我们
          </h2>

          {/* 项目前景 */}
          <Card className="border-0 rounded-3xl shadow-lg overflow-hidden mb-8">
            <div className="relative bg-gradient-to-br from-[#A78BFA] via-[#C4B5FD] to-[#DDD6FE] p-8">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Rocket className="w-7 h-7" />
                  项目前景
                </h3>
                <p className="text-white/90 leading-relaxed mb-4">
                  幼乐码致力于成为国内领先的幼儿编程启蒙教育品牌。我们相信，每个孩子都有成为未来创造者的潜力，而编程是开启这扇大门的钥匙。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-bold text-white">100+</p>
                    <p className="text-white/80 text-sm">合作幼儿园</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-bold text-white">10,000+</p>
                    <p className="text-white/80 text-sm">服务学员</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-3xl font-bold text-white">98%</p>
                    <p className="text-white/80 text-sm">家长满意度</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 核心理念 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {coreValues.map((item, index) => (
              <Card key={index} className="border-0 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#FFE66D]/20 to-transparent flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#FF6B6B]" />
                  </div>
                  <h4 className="font-bold text-[#333] mb-2">{item.title}</h4>
                  <p className="text-sm text-[#999]">{item.desc}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* 技术特色 */}
          <Card className="border-0 rounded-3xl shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-[#333] mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-[#4ECDC4]" />
                技术特色
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {techFeatures.map((item, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.icon === Cpu ? '#4ECDC4' : item.icon === Layers ? '#A78BFA' : item.icon === Palette ? '#FFE66D' : '#FF6B6B'}20` }}
                    >
                      <item.icon
                        className="w-7 h-7"
                        style={{ color: item.icon === Cpu ? '#4ECDC4' : item.icon === Layers ? '#A78BFA' : item.icon === Palette ? '#FFB347' : '#FF6B6B' }}
                      />
                    </div>
                    <h4 className="font-bold text-[#333] mb-1">{item.title}</h4>
                    <p className="text-xs text-[#999]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 团队成员 */}
          <h3 className="text-xl font-bold text-[#333] mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#A78BFA]" />
            核心团队
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="relative">
                  <div
                    className="h-24"
                    style={{ background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}80 100%)` }}
                  />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                      {member.avatar}
                    </div>
                  </div>
                </div>
                <CardContent className="pt-10 pb-6 text-center">
                  <h4 className="font-bold text-[#333]">{member.name}</h4>
                  <Badge
                    className="mt-2 mb-3 border-0"
                    style={{ backgroundColor: `${member.color}20`, color: member.color }}
                  >
                    {member.role}
                  </Badge>
                  <p className="text-xs text-[#999] leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 课程列表 */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#333] flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#4ECDC4]" />
              推荐课程
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 1,
                title: '奇妙运动派对',
                description: '和乐乐一起跳舞做运动！',
                grade: '小班',
                lessons: 12,
                completedLessons: 8,
                stars: 18,
                icon: '🏃',
                gradient: 'from-[#4ECDC4] to-[#3DBDB5]',
                color: '#4ECDC4',
              },
              {
                id: 2,
                title: '创意造型师',
                description: '给乐乐穿上漂亮的衣服！',
                grade: '中班',
                lessons: 16,
                completedLessons: 10,
                stars: 22,
                icon: '👗',
                gradient: 'from-[#A78BFA] to-[#9583F5]',
                color: '#A78BFA',
              },
              {
                id: 3,
                title: '音乐小达人',
                description: '创作你自己的音乐！',
                grade: '中班',
                lessons: 14,
                completedLessons: 6,
                stars: 12,
                icon: '🎵',
                gradient: 'from-[#FFE66D] to-[#FFD93D]',
                color: '#FFE66D',
              },
              {
                id: 4,
                title: '智慧大冒险',
                description: '解决有趣的难题！',
                grade: '大班',
                lessons: 20,
                completedLessons: 4,
                stars: 6,
                icon: '🧩',
                gradient: 'from-[#FF6B6B] to-[#FF8E8E]',
                color: '#FF6B6B',
              },
            ].map((course) => (
              <a key={course.id} href="/student/workspace" className="group">
                <Card className="relative overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border-0 rounded-3xl">
                  <div className={`h-36 bg-gradient-to-br ${course.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-[#333] border-0 backdrop-blur-sm">
                        {course.grade}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-[#FFE66D] fill-[#FFE66D]" />
                        <span className="font-bold text-[#FFB347]">{course.stars}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl transform group-hover:scale-110 transition-transform duration-300">
                        {course.icon}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="text-xl font-bold text-[#333] mb-1 group-hover:text-[#FF6B6B] transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[#999] text-sm mb-4">{course.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#999]">学习进度</span>
                        <span className="font-medium" style={{ color: course.color }}>
                          {Math.round((course.completedLessons / course.lessons) * 100)}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-[#FFE66D]/20 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${(course.completedLessons / course.lessons) * 100}%`,
                            background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-[#999]">
                        <BookOpen className="w-4 h-4" />
                        {course.completedLessons}/{course.lessons}课时
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full h-10 px-6 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${course.color}, ${course.color}cc)`,
                          boxShadow: `0 4px 15px ${course.color}40`,
                        }}
                      >
                        {course.completedLessons === 0 ? '开始学习' : '继续学习'}
                        <Zap className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* 学习天数详情弹窗 */}
      <Dialog open={showDaysModal} onOpenChange={setShowDaysModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Clock className="w-6 h-6 text-[#4ECDC4]" />
              学习日历
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#4ECDC4]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#4ECDC4]">{totalDays}</p>
                <p className="text-sm text-[#999]">累计学习天数</p>
              </div>
              <div className="bg-[#A78BFA]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#A78BFA]">42.5</p>
                <p className="text-sm text-[#999]">累计学习时长(小时)</p>
              </div>
              <div className="bg-[#FFE66D]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#FFB347]">85%</p>
                <p className="text-sm text-[#999]">本周学习率</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#333] mb-4">本周学习记录</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>日期</TableHead>
                    <TableHead>学习时长</TableHead>
                    <TableHead>使用积木</TableHead>
                    <TableHead>获得星星</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {learningDays.map((day, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell>{day.hours}小时</TableCell>
                      <TableCell>{day.blocks}个</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: day.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-[#FFE66D] fill-[#FFE66D]" />
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 课时详情弹窗 */}
      <Dialog open={showLessonsModal} onOpenChange={setShowLessonsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="w-6 h-6 text-[#A78BFA]" />
              课时详情
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#4ECDC4]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#4ECDC4]">{totalLessons}</p>
                <p className="text-sm text-[#999]">已完成课时</p>
              </div>
              <div className="bg-[#A78BFA]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#A78BFA]">12</p>
                <p className="text-sm text-[#999]">进行中课时</p>
              </div>
            </div>

            <div className="space-y-3">
              {lessonDetails.map((lesson) => (
                <Card
                  key={lesson.id}
                  className={`overflow-hidden ${
                    lesson.status === 'locked' ? 'opacity-50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          lesson.status === 'completed'
                            ? 'bg-[#4ECDC4]/10'
                            : lesson.status === 'in-progress'
                            ? 'bg-[#FFE66D]/10'
                            : 'bg-[#E5E5E5]'
                        }`}
                      >
                        {lesson.status === 'completed' && (
                          <Trophy className="w-6 h-6 text-[#4ECDC4]" />
                        )}
                        {lesson.status === 'in-progress' && (
                          <Target className="w-6 h-6 text-[#FFE66D]" />
                        )}
                        {lesson.status === 'locked' && (
                          <Lock className="w-6 h-6 text-[#999]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#333]">{lesson.title}</h4>
                          {lesson.status === 'in-progress' && (
                            <Badge className="bg-[#FFE66D] text-[#333] border-0 text-xs">进行中</Badge>
                          )}
                          {lesson.status === 'locked' && (
                            <Badge variant="secondary" className="text-xs">未解锁</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#999] mt-1">{lesson.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-[#999]">
                            <Clock className="w-3 h-3 inline mr-1" />
                            {lesson.duration}
                          </span>
                          {lesson.skills.map((skill, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-[#A78BFA]/10 text-[#A78BFA]">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < lesson.stars
                                ? 'text-[#FFE66D] fill-[#FFE66D]'
                                : 'text-[#E5E5E5]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 星星详情弹窗 */}
      <Dialog open={showStarsModal} onOpenChange={setShowStarsModal}>
        <DialogContent className="max-w-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Star className="w-6 h-6 text-[#FFE66D]" />
              星星收集
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-[#FFE66D]/20 to-[#FFB347]/20 rounded-xl p-6 text-center">
              <p className="text-5xl font-bold text-[#FFB347] mb-2">{totalStars}</p>
              <p className="text-[#999]">已收集星星总数</p>
              <div className="flex justify-center gap-1 mt-4">
                {Array.from({ length: Math.min(totalStars, 10) }).map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-[#FFE66D] fill-[#FFE66D]" />
                ))}
                {totalStars > 10 && (
                  <span className="text-[#FFB347] font-bold ml-2">+{totalStars - 10}</span>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#333] mb-3">星星获取途径</h4>
              <div className="space-y-2">
                {[
                  { source: '完成课程', count: 35, icon: BookOpen, color: '#4ECDC4' },
                  { source: '每日签到', count: 10, icon: Clock, color: '#A78BFA' },
                  { source: '成就奖励', count: 8, icon: Trophy, color: '#FF6B6B' },
                  { source: '关卡评价', count: 5, icon: Star, color: '#FFE66D' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-[#F9FAFB]">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: item.color }} />
                      </div>
                      <span className="font-medium text-[#333]">{item.source}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-[#FFE66D] fill-[#FFE66D]" />
                      <span className="font-bold text-[#FFB347]">+{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F9FAFB] rounded-xl p-4">
              <h4 className="font-bold text-[#333] mb-2">星星用途</h4>
              <p className="text-sm text-[#999]">星星可以用于兑换：</p>
              <ul className="mt-2 space-y-1 text-sm text-[#666]">
                <li>解锁新角色（消耗50星星）</li>
                <li>解锁新课程（消耗30星星）</li>
                <li>获得特殊徽章（消耗100星星）</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 成就详情弹窗 */}
      <Dialog open={showAchievementsModal} onOpenChange={setShowAchievementsModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Award className="w-6 h-6 text-[#FF6B6B]" />
              我的成就
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#4ECDC4]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#4ECDC4]">{achievements.filter(a => a.unlocked).length}</p>
                <p className="text-sm text-[#999]">已解锁</p>
              </div>
              <div className="bg-[#A78BFA]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#A78BFA]">{achievements.filter(a => !a.unlocked).length}</p>
                <p className="text-sm text-[#999]">进行中</p>
              </div>
              <div className="bg-[#FFE66D]/10 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-[#FFB347]">60%</p>
                <p className="text-sm text-[#999]">总进度</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`overflow-hidden ${
                    !achievement.unlocked ? 'opacity-70' : ''
                  }`}
                  style={{ borderColor: `${achievement.color}30` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                          achievement.unlocked ? '' : 'grayscale'
                        }`}
                        style={{
                          backgroundColor: `${achievement.color}20`,
                          filter: achievement.unlocked ? 'none' : 'grayscale(100%)',
                        }}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-[#333]">{achievement.name}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-[#4ECDC4] text-white border-0 text-xs">已解锁</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[#999] mt-1">{achievement.description}</p>
                        {!achievement.unlocked && (
                          <div className="mt-2">
                            <Progress value={achievement.progress} className="h-2" />
                            <p className="text-xs text-[#999] mt-1">{achievement.progress}%</p>
                          </div>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-[#FFE66D]" />
                          <span className="text-xs text-[#999]">{achievement.reward}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 底部装饰 */}
      <div className="h-24 bg-gradient-to-t from-[#FFF9F0] to-transparent" />
    </div>
  );
}

function Lock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
