'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
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
  Heart,
  Shield,
  Lightbulb,
  Globe,
  Cpu,
  Layers,
  Palette,
  Music,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  ChevronRight,
  Quote,
  ChevronLeft,
  ChevronDown,
  Calendar,
  BookMarked,
  Play,
  School,
  Smartphone,
  FileText,
  BrainCircuit,
  Building2,
  Handshake,
  Trophy,
  Bot,
  Blocks,
  Wrench,
  Target,
  Menu,
} from 'lucide-react';

// 轮播图数据
const carouselItems = [
  {
    title: "游戏化编程启蒙",
    desc: "让3-6岁儿童在趣味游戏中掌握编程思维",
    longDesc: "通过积木式拖拽、闯关冒险等游戏形式，让孩子在快乐中建立逻辑思维与问题解决能力。",
    bgColor: "from-[#FF6B6B] to-[#FF8E8E]",
    bgStart: "#FF6B6B",
    bgEnd: "#FF8E8E",
    icon: <Gamepad2 className="w-20 h-20 text-white" />,
    features: ["零基础图形化编程", "300+趣味关卡", "即时正向激励"]
  },
  {
    title: "AI智能适配教学",
    desc: "根据儿童学习进度动态调整课程难度",
    longDesc: "基于学习数据的智能分析，为每个孩子提供个性化的学习路径与难度推荐，实现因材施教。",
    bgColor: "from-[#4ECDC4] to-[#3DBDB5]",
    bgStart: "#4ECDC4",
    bgEnd: "#3DBDB5",
    icon: <Cpu className="w-20 h-20 text-white" />,
    features: ["动态难度调节", "薄弱点精准推送", "学习报告智能生成"]
  },
  {
    title: "STEAM教育理念",
    desc: "融合科学、技术、工程、艺术、数学多领域",
    longDesc: "跨学科项目制学习，培养综合素养与创造力，为未来数字时代奠定坚实基础。",
    bgColor: "from-[#A78BFA] to-[#9583F5]",
    bgStart: "#A78BFA",
    bgEnd: "#9583F5",
    icon: <Lightbulb className="w-20 h-20 text-white" />,
    features: ["项目式学习", "多学科融合", "创意工坊实践"]
  },
  {
    title: "全场景教学支持",
    desc: "幼儿园、家庭多场景无缝衔接的学习体验",
    longDesc: "园所集体教学与家庭亲子学习数据互通，形成教育闭环，让编程启蒙无处不在。",
    bgColor: "from-[#FFE66D] to-[#FFD166]",
    bgStart: "#FFE66D",
    bgEnd: "#FFD166",
    icon: <Globe className="w-20 h-20 text-white" />,
    features: ["家园共育平台", "多终端同步", "学习数据互通"]
  },
];

// 学习天数/课时数据
const learningModules = [
  {
    id: 1,
    day: "第1天",
    title: "认识编程积木",
    duration: "20分钟",
    content: "认识基础的编程积木，了解前进、后退、左转、右转等指令含义，通过小游戏熟悉积木拖拽操作。",
    lessons: [
      { id: 101, name: "积木王国探险", content: "认识不同形状的编程积木，学习积木的基本分类" },
      { id: 102, name: "小机器人搬家", content: "练习拖拽积木，控制机器人完成简单的移动任务" }
    ]
  },
  {
    id: 2,
    day: "第2天",
    title: "顺序编程思维",
    duration: "25分钟",
    content: "学习顺序执行的编程逻辑，按照步骤完成任务，培养孩子的逻辑顺序感和条理性。",
    lessons: [
      { id: 201, name: "小兔子回家", content: "按顺序摆放积木，让小兔子沿着正确路线回家" },
      { id: 202, name: "整理玩具柜", content: "按照指定顺序整理虚拟玩具，强化顺序思维" }
    ]
  },
  {
    id: 3,
    day: "第3天",
    title: "循环指令学习",
    duration: "30分钟",
    content: "认识循环积木，理解重复操作的概念，用更少的步骤完成重复任务，提升编程效率。",
    lessons: [
      { id: 301, name: "花园浇水", content: "使用循环积木给多朵花浇水，体会循环的便捷性" },
      { id: 302, name: "小星星排列", content: "用循环绘制规律的星星图案，理解循环次数" }
    ]
  },
  {
    id: 4,
    day: "第4天",
    title: "条件判断入门",
    duration: "25分钟",
    content: "初步接触条件判断，学习如果...就...的逻辑，让程序根据不同情况做出不同反应。",
    lessons: [
      { id: 401, name: "红绿灯规则", content: "根据红绿灯颜色，让小车做出停止或前进的反应" },
      { id: 402, name: "天气穿衣服", content: "根据不同天气选择合适的衣物，理解条件判断" }
    ]
  },
];

// 团队成员数据
const teamMembers = [
  {
    name: '杜亭亭',
    role: '现代教育技术 · 课程研发',
    description: '负责将《学前教育课程设计》实训项目迭代开发为3-6岁分龄STEAM编程启蒙课程体系，确保课程完全贴合幼儿认知规律与幼儿园教学场景。',
    avatar: '👨‍🏫',
    color: '#FF6B6B',
  },
  {
    name: '过智蕊',
    role: '工业软件开发 · 技术负责人',
    description: '将《工业控制模块化设计》课程的实训内容转化为编程教具的核心逻辑，把工业级“输入-处理-输出”标准化流程下沉适配为幼儿可操作的教具体系。',
    avatar: '👩‍🎨',
    color: '#4ECDC4',
  },
  {
    name: '胥雨欣',
    role: '移动应用开发 · 交互设计',
    description: '将《移动端UI设计》课程作业持续迭代为幼乐码教学APP交互界面，打造适配幼儿操作习惯的可视化教学工具，实现技术与教育的深度融合。',
    avatar: '👩‍🏫',
    color: '#A78BFA',
  },
  {
    name: '杨文峰',
    role: '工业软件开发 · 教具逻辑',
    description: '与过智蕊共同将工业控制模块化设计理念转化为幼儿编程教具核心逻辑，构建项目独一无二的“工业级思维+幼儿化适配”技术壁垒。',
    avatar: '👨‍💻',
    color: '#FFE66D',
  },
];

// 核心价值观
const coreValues = [
  { icon: Heart, title: '寓教于乐', desc: '让孩子在游戏中学习，在学习中成长', color: '#FF6B6B' },
  { icon: Shield, title: '安全友好', desc: '纯净内容，绿色体验，保护孩子健康成长', color: '#4ECDC4' },
  { icon: Lightbulb, title: '激发创造力', desc: '鼓励探索，支持试错，培养创新思维', color: '#FFE66D' },
  { icon: Globe, title: '面向未来', desc: '为数字时代培养核心竞争力', color: '#A78BFA' },
];

// 技术特色
const techFeatures = [
  { icon: Cpu, title: 'AI智能适配', desc: '根据学习数据智能推荐适合的课程内容', color: '#4ECDC4' },
  { icon: Layers, title: '模块化设计', desc: '积木式编程，降低学习门槛', color: '#A78BFA' },
  { icon: Palette, title: '精美视觉', desc: '专为儿童设计的友好界面', color: '#FFB347' },
  { icon: Music, title: '音效反馈', desc: '生动的音效激励，增强学习动力', color: '#FF6B6B' },
];

// 荣誉与数据
const achievements = [
  { value: '5+', label: '合作幼儿园', icon: BookOpen },
  { value: '400+', label: '服务学员', icon: Users },
  { value: '98%', label: '家长满意度', icon: Heart },
  { value: '50+', label: '精品课程', icon: Award },
];

// 用户评价
const testimonials = [
  {
    name: '陈妈妈',
    role: '中班家长',
    avatar: '👩',
    content: '孩子自从用了幼乐码，每天都主动要学习！看着他在游戏中不知不觉就掌握了编程思维，真的很惊喜。',
    rating: 5,
  },
  {
    name: '张老师',
    role: '幼儿园教师',
    avatar: '👩‍🏫',
    content: '作为老师，我非常认可幼乐码的教育理念。它不仅让孩子学到知识，更重要的是培养了解决问题的能力。',
    rating: 5,
  },
  {
    name: '李爸爸',
    role: '大班家长',
    avatar: '👨',
    content: '原本担心编程太难孩子学不会，没想到幼乐码的积木式设计让孩子很快就上手了，还爱上了创作！',
    rating: 5,
  },
];

// 合作院校数据
const partnerSchools = [
  { name: '抚州幼儿师范高等专科学校附属幼儿园', logo: '🏫' },
];

// 教学服务体系
const serviceSystem = [
  {
    icon: School,
    title: '师资培训认证',
    desc: '提供系统化教师培训，颁发结业证书，确保教学质量',
    color: '#4ECDC4',
  },
  {
    icon: FileText,
    title: '全套教案课件',
    desc: '每节课配备详细教案、PPT、教具清单，备课无忧',
    color: '#A78BFA',
  },
  {
    icon: Smartphone,
    title: '家园共育平台',
    desc: '家长端实时查看学习报告，亲子互动巩固知识',
    color: '#FF6B6B',
  },
  {
    icon: BrainCircuit,
    title: 'AI学情分析',
    desc: '智能诊断学习薄弱点，个性化推送练习内容',
    color: '#FFB347',
  },
];

// 课程核心特色
const coreCurriculumFeatures = [
  {
    icon: Gamepad2,
    title: '游戏化闯关',
    desc: '将知识点融入冒险故事，每完成一关获得成就感',
    color: '#FF6B6B'
  },
  {
    icon: BrainCircuit,
    title: '计算思维培养',
    desc: '分解问题、模式识别、抽象思维、算法设计',
    color: '#4ECDC4'
  },
  {
    icon: Users,
    title: '协作式学习',
    desc: '小组任务与作品分享，培养沟通与团队能力',
    color: '#A78BFA'
  },
  {
    icon: Rocket,
    title: '创造力工坊',
    desc: '开放创作工具，让孩子自由设计动画与游戏',
    color: '#FFE66D'
  }
];

// 四大产品特色
const productFeatures = [
  {
    icon: Blocks,
    title: '实物模块化编程',
    desc: '500+件实物教具，安全环保，让抽象编程看得见摸得着',
    color: '#FF6B6B',
    tag: '易理解'
  },
  {
    icon: Bot,
    title: '机器人互动教学',
    desc: '亲密接触、快乐互动、新奇体验，激发孩子学习兴趣',
    color: '#4ECDC4',
    tag: '强互动'
  },
  {
    icon: Gamepad2,
    title: '情景式游戏化',
    desc: '故事情景导入，提供沉浸式学习体验，学中玩做中学',
    color: '#A78BFA',
    tag: '沉浸式'
  },
  {
    icon: Sparkles,
    title: '自由创编工坊',
    desc: '让孩子享受游戏创造者的乐趣，赋予成就感',
    color: '#FFE66D',
    tag: '高成就'
  }
];

// 进阶式课程体系
const curriculumSystem = [
  {
    stage: '启蒙阶段',
    age: '3-4岁',
    title: '情景互动编程课',
    focus: '注重编程思维的建立和培养',
    features: ['图形化拖拽', '故事情境导入', '实物卡片操作'],
    color: '#FF6B6B'
  },
  {
    stage: '进阶阶段',
    age: '4-5岁',
    title: '模块指令编程课',
    focus: '注重编程思维的应用和提升',
    features: ['积木式编程', '项目制学习', '小组协作'],
    color: '#4ECDC4'
  },
  {
    stage: '高阶阶段',
    age: '5-6岁',
    title: '创意编程工坊',
    focus: '培养计算思维与创新能力',
    features: ['ScratchJr入门', '动画创作', '游戏设计'],
    color: '#A78BFA'
  }
];

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentCarousel, setCurrentCarousel] = useState(0);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<typeof carouselItems[0] | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动，为顶部导航栏添加动态投影效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 轮播自动切换
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    const carouselTimer = setInterval(() => {
      setCurrentCarousel((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => {
      clearInterval(testimonialTimer);
      clearInterval(carouselTimer);
    };
  }, []);

  // 展开/收起学习模块
  const toggleModule = (id: number) => {
    if (expandedModule === id) {
      setExpandedModule(null);
      setActiveLesson(null);
    } else {
      setExpandedModule(id);
      setActiveLesson(null);
    }
  };

  // 选择具体课时
  const selectLesson = (lessonId: number) => {
    setActiveLesson(lessonId);
  };

  // 当前轮播项
  const currentItem = carouselItems[currentCarousel];

  return (
    <div className="min-h-screen relative bg-gray-50 font-sans">
      
      {/* ========== 全局顶部商业导航栏 (Header) ========== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3' 
            : 'bg-white/50 backdrop-blur-sm py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo及品牌区 -> 锚点到顶部 hero 区 */}
          <Link href="#hero" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#A78BFA] flex items-center justify-center text-white font-black text-xl md:text-2xl shadow-lg group-hover:scale-105 transition-transform">
              Y
            </div>
            <span className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A78BFA] to-[#4ECDC4] tracking-tight">
              幼乐码
            </span>
          </Link>

          {/* 桌面端导航菜单 -> 全面更新为真实有效的锚点链接 */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#hero" className="text-gray-900 font-bold hover:text-[#4ECDC4] transition-colors">首页</Link>
            <Link href="#curriculum" className="text-gray-600 font-medium hover:text-[#4ECDC4] transition-colors">课程体系</Link>
            <Link href="#features" className="text-gray-600 font-medium hover:text-[#4ECDC4] transition-colors">产品特色</Link>
            <Link href="#services" className="text-gray-600 font-medium hover:text-[#4ECDC4] transition-colors">服务支持</Link>
            <Link href="#partners" className="text-gray-600 font-medium hover:text-[#4ECDC4] transition-colors">合作案例</Link>
            <Link href="#about" className="text-gray-600 font-medium hover:text-[#4ECDC4] transition-colors">关于我们</Link>
          </nav>

          {/* 右侧功能按钮区 */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-gray-600 font-medium hover:text-gray-900 hover:bg-gray-100/50 rounded-full px-6">
              登录
            </Button>
            <Button className="bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5] text-white rounded-full px-8 shadow-md hover:shadow-lg hover:opacity-90 transition-all hover:-translate-y-0.5 font-bold">
              免费体验
            </Button>
          </div>

          {/* 移动端菜单唤起按钮 */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </header>
      {/* ======================= 导航栏结束 ======================= */}

      {/* 页面主背景 */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFBFC 30%, #F9FCFE 70%, #F5FAFF 100%)' }}
      ></div>

      {/* 动态星星效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] text-[#FFD166] text-2xl animate-star-twinkle animate-star-move-1">⭐</div>
        <div className="absolute top-[20%] right-[8%] text-[#FFD166] text-xl animate-star-twinkle animate-star-move-2" style={{animationDelay: '0.5s'}}>⭐</div>
        <div className="absolute bottom-[30%] right-[15%] text-[#FFD166] text-2xl animate-star-twinkle animate-star-move-3" style={{animationDelay: '1s'}}>⭐</div>
        <div className="absolute top-[40%] left-[20%] text-[#FFD166] text-xl animate-star-twinkle animate-star-float" style={{animationDelay: '1.5s'}}>⭐</div>
        <div className="absolute bottom-[20%] left-[10%] text-[#FFD166] text-xl animate-star-twinkle animate-star-float-reverse" style={{animationDelay: '0.8s'}}>⭐</div>
        
        <div className="absolute top-1/4 left-1/5 w-60 h-60 rounded-full bg-pink-50/40 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-50/40 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-40 h-40 rounded-full bg-purple-50/30 blur-3xl"></div>
        
        <div className="absolute bottom-40 left-1/4 text-[#FF6B81]/10 text-3xl transform -rotate-15 animate-pulse-slow">✦</div>
        <div className="absolute bottom-20 right-1/5 text-[#8A4FFF]/10 text-2xl transform rotate-10 animate-pulse-slow" style={{animationDelay: '1s'}}>✧</div>
      </div>

      {/* 注意：绑定 id="hero" 以供首页锚点跳转 */}
      <div id="hero" className="relative z-10 flex flex-col items-center px-4 pt-28 md:pt-36 pb-8 md:pb-12 max-w-[1400px] mx-auto scroll-mt-32">
        
        {/* ========== 升级版极致融合大模块：分两行、绝不换行的横向超大主标题 + 交互轮播 ========== */}
        <div className="w-full mb-24 mt-4">
          <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 bg-white/95 backdrop-blur-xl border border-white/60 flex flex-col min-h-[600px]">
            
            {/* 顶层区域：分两行的超大标题（绝对横向、强制不换行） */}
            <div className="w-full pt-16 pb-10 px-4 md:px-8 text-center relative z-30 flex flex-col justify-center items-center bg-gradient-to-b from-white to-transparent overflow-hidden">
              {/* 第一行：超大品牌名 */}
              <h1 
                className="font-black tracking-tight whitespace-nowrap drop-shadow-md animate-fadeIn mb-3"
                style={{ fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: '1.1' }}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF6B6B] via-[#A78BFA] to-[#4ECDC4]">
                  幼乐码
                </span>
              </h1>
              {/* 第二行：醒目业务定义 */}
              <h2 
                className="font-extrabold tracking-tight text-gray-800 whitespace-nowrap drop-shadow-sm animate-fadeIn"
                style={{ fontSize: 'clamp(22px, 4vw, 56px)', animationDelay: '0.1s' }}
              >
                面向幼儿园的STEAM编程启蒙解决方案
              </h2>
            </div>

            {/* 底层区域：左侧内容区与右侧轮播无缝融合 */}
            <div className="flex flex-col lg:flex-row flex-1 w-full relative z-20">
              
              {/* 左侧：简介与按钮区 */}
              <div className="lg:w-5/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/40">
                <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                  融合实物积木、机器人互动与情景化游戏，让3-6岁儿童在快乐探索中建立计算思维、逻辑推理与创新能力。
                </p>

                {/* 行动按钮 */}
                <div className="flex flex-wrap items-center gap-5 mb-12">
                  <Button className="bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5] hover:opacity-90 text-white rounded-full h-14 px-10 text-lg font-bold shadow-lg shadow-[#4ECDC4]/20 transition-transform hover:-translate-y-1">
                    免费体验 <Rocket className="w-5 h-5 ml-2" />
                  </Button>
                  <Button variant="outline" className="border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 rounded-full h-14 px-10 text-lg font-bold transition-colors">
                    预约演示
                  </Button>
                </div>

                {/* 轮播指示器 */}
                <div className="flex gap-2 mt-auto">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCarousel(index)}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentCarousel ? 'bg-[#A78BFA] w-12' : 'bg-gray-200 w-6 hover:bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* 右侧：动态轮播滑动区 */}
              <div className="lg:w-7/12 relative overflow-hidden flex flex-col justify-center min-h-[480px]">
                {/* 动态背景层 */}
                <div 
                  className="absolute inset-0 transition-all duration-700 ease-in-out"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentItem.bgStart} 0%, ${currentItem.bgEnd} 100%)`
                  }}
                />
                {/* 左侧边缘渐变遮罩，使左右模块自然融合 */}
                <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white/40 to-transparent z-10 hidden lg:block"></div>
                
                {/* 轮播内容区域 */}
                <div className="relative z-20 h-full flex flex-col justify-center p-10 md:p-16 text-white">
                  <div key={currentCarousel} className="animate-fadeIn">
                    {/* 图标 */}
                    <div className="mb-8 transform hover:scale-105 transition-transform duration-300 inline-block">
                      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 w-fit shadow-2xl border border-white/20">
                        {currentItem.icon}
                      </div>
                    </div>

                    {/* 标题 */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight drop-shadow-lg">
                      {currentItem.title}
                    </h2>
                    
                    {/* 描述 */}
                    <p className="text-white/95 text-xl mb-4 leading-relaxed font-semibold">
                      {currentItem.desc}
                    </p>
                    
                    <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-xl">
                      {currentItem.longDesc}
                    </p>

                    {/* 特色标签 */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {currentItem.features.map((feature, idx) => (
                        <Badge key={idx} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 text-sm font-medium rounded-full shadow-sm">
                          ✓ {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* 详情按钮 */}
                    <Button 
                      onClick={() => setShowDetailModal(currentItem)}
                      className="bg-white text-gray-800 hover:bg-gray-50 shadow-xl border-0 rounded-full h-12 px-8 text-base font-bold transition-all"
                    >
                      了解更多 <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>

                  {/* 轮播控制按钮 */}
                  <div className="absolute bottom-8 right-8 flex items-center gap-3">
                    <button 
                      onClick={() => setCurrentCarousel((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all border border-white/20"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button 
                      onClick={() => setCurrentCarousel((prev) => (prev + 1) % carouselItems.length)}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all border border-white/20"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ======================= 融合大模块结束 ======================= */}

        {/* ========== 四大产品特色 -> 绑定 id="features" ========== */}
        <div id="features" className="w-full max-w-[1200px] mb-20 scroll-mt-32">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white border-0 px-5 py-2 text-sm font-bold rounded-full shadow-md">
              4大特色 · 让编程变成幼儿乐学的事
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">为什么选择幼乐码</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              融合实物教具、机器人互动、情景游戏、自由创编，打造沉浸式编程启蒙体验
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productFeatures.map((feature, idx) => (
              <Card key={idx} className="border-0 rounded-3xl bg-white/90 backdrop-blur-xl overflow-hidden hover:shadow-2xl transition-all group hover:-translate-y-2">
                <CardContent className="p-7">
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shrink-0"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                    </div>
                    <Badge 
                      className="mt-1 border-0 text-xs font-medium rounded-full"
                      style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                    >
                      {feature.tag}
                    </Badge>
                  </div>
                  <h3 className="font-bold text-gray-800 text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ========== 进阶式课程体系 -> 绑定 id="curriculum" ========== */}
        <div id="curriculum" className="w-full max-w-[1200px] mb-20 scroll-mt-32">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-[#A78BFA] to-[#9583F5] text-white border-0 px-5 py-2 text-sm font-bold rounded-full shadow-md">
              进阶式课程体系
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">由浅入深，循序渐进的编程之旅</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              依据幼儿编程能力发展指标编写，共108课时，涵盖小中大班，每学期18课时
            </p>
          </div>
          
          <div className="relative">
            {/* 连接线 */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B]/30 via-[#A78BFA]/30 to-[#4ECDC4]/30 -translate-y-1/2 rounded-full"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
              {curriculumSystem.map((item, idx) => (
                <Card key={idx} className="border-0 rounded-3xl bg-white/90 backdrop-blur-xl overflow-hidden hover:shadow-2xl transition-all group">
                  <div className="relative">
                    <div
                      className="h-24 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}90 100%)` }}
                    >
                      <div className="text-center">
                        <p className="text-white text-lg font-semibold">{item.stage}</p>
                        <p className="text-white/90 text-sm">{item.age}</p>
                      </div>
                    </div>
                    {/* 阶段编号 */}
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-white">
                      <span className="font-bold text-gray-700">{idx + 1}</span>
                    </div>
                  </div>
                  <CardContent className="pt-10 pb-7 text-center">
                    <h3 className="font-bold text-gray-800 text-xl mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{item.focus}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {item.features.map((feature, fIdx) => (
                        <Badge key={fIdx} variant="outline" className="bg-gray-50 border-gray-200 text-gray-600 rounded-full text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* 课程核心特色卡片 */}
        <div className="w-full max-w-[1200px] mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#FF6B6B]/10 text-[#FF6B6B] border-0 px-4 py-2 text-sm font-medium rounded-full">
              核心特色
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">专为3-6岁幼儿设计的编程体系</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              融合游戏化与STEAM教育理念，让孩子在探索中建立计算思维
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreCurriculumFeatures.map((feature, idx) => (
              <Card key={idx} className="border-0 rounded-3xl bg-white/80 backdrop-blur-xl overflow-hidden hover:shadow-xl transition-all group hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <feature.icon className="w-10 h-10" style={{ color: feature.color }} />
                  </div>
                  <h3 className="font-bold text-gray-800 text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 角色选择卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] w-full mb-20">
          <Link href="/student" className="group">
            <Card className="relative overflow-hidden rounded-3xl border-0 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4ECDC4] to-[#2EC0BE]"></div>
              <CardContent className="relative p-10 text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-[#4ECDC4]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="w-12 h-12 text-[#4ECDC4]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#4ECDC4] transition-colors">
                  小朋友
                </h2>
                <p className="text-gray-600 mb-8 text-base">
                  和乐乐一起学习编程，开启奇妙冒险！
                </p>
                <Button className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#2EC0BE] hover:opacity-90 text-white rounded-full h-12 text-base font-medium shadow-md">
                  开始学习
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/teacher" className="group">
            <Card className="relative overflow-hidden rounded-3xl border-0 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#45B7D1] to-[#3AA5BD]"></div>
              <CardContent className="relative p-10 text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-[#45B7D1]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-12 h-12 text-[#45B7D1]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#45B7D1] transition-colors">
                  老师
                </h2>
                <p className="text-gray-600 mb-8 text-base">
                  管理课程、查看学生学习报告
                </p>
                <Button className="w-full bg-gradient-to-r from-[#45B7D1] to-[#3AA5BD] hover:opacity-90 text-white rounded-full h-12 text-base font-medium shadow-md">
                  教师工作台
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin" className="group">
            <Card className="relative overflow-hidden rounded-3xl border-0 bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#A78BFA] to-[#9583F5]"></div>
              <CardContent className="relative p-10 text-center">
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-[#A78BFA]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-12 h-12 text-[#A78BFA]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#A78BFA] transition-colors">
                  管理员
                </h2>
                <p className="text-gray-600 mb-8 text-base">
                  数据分析、课程管理、运营监控
                </p>
                <Button className="w-full bg-gradient-to-r from-[#A78BFA] to-[#9583F5] hover:opacity-90 text-white rounded-full h-12 text-base font-medium shadow-md">
                  管理后台
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* 学习模块 */}
        <div className="w-full max-w-[1200px] mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-3 bg-[#FF6B6B]/10 text-[#FF6B6B] border-0 px-4 py-2 text-sm font-medium rounded-full">
              课程体系
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">趣味编程启蒙课程</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              循序渐进的4天入门课程，每天20-30分钟，轻松掌握编程思维
            </p>
          </div>

          <div className="relative mb-6 hidden md:flex justify-between items-center px-4">
            {learningModules.map((_, idx) => (
              <div key={idx} className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${idx < learningModules.length - 1 ? 'bg-[#FF6B6B]/20 text-[#FF6B6B]' : 'bg-[#4ECDC4]/20 text-[#4ECDC4]'} flex items-center justify-center font-bold text-sm`}>
                  {idx + 1}
                </div>
                {idx < learningModules.length - 1 && (
                  <div className="w-16 h-0.5 bg-gray-300 mx-2"></div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-5">
            {learningModules.map((module) => (
              <Card key={module.id} className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B] font-bold text-xl">
                      {module.id}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800 text-xl flex items-center gap-3">
                        {module.day} <span className="text-gray-600 font-medium text-lg">{module.title}</span>
                      </h3>
                      <p className="text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-4 h-4" /> {module.duration}
                      </p>
                    </div>
                  </div>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                      expandedModule === module.id ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {expandedModule === module.id && (
                  <div className="px-8 pb-8 border-t border-gray-100/80 animate-fadeIn">
                    <div className="my-6 p-6 bg-gray-50/80 rounded-2xl">
                      <p className="text-gray-700 text-base leading-relaxed">{module.content}</p>
                    </div>

                    <h4 className="font-semibold text-gray-800 mb-5 flex items-center gap-2 text-lg">
                      <BookMarked className="w-5 h-5 text-[#4ECDC4]" />
                      今日课时
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {module.lessons.map((lesson) => (
                        <div 
                          key={lesson.id}
                          onClick={() => selectLesson(lesson.id)}
                          className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                            activeLesson === lesson.id 
                              ? 'border-[#4ECDC4] bg-[#4ECDC4]/5 shadow-md' 
                              : 'border-gray-100 bg-white/50 hover:border-[#4ECDC4]/40 hover:bg-white/80 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-gray-800">课时 {lesson.id.toString().slice(1)}</h5>
                            <Play className="w-5 h-5 text-[#4ECDC4]" />
                          </div>
                          <h6 className="font-semibold text-gray-800 text-lg mb-2">{lesson.name}</h6>
                          
                          {activeLesson === lesson.id && (
                            <div className="mt-4 pt-4 border-t border-gray-100 text-gray-600">
                              <p className="mb-4">{lesson.content}</p>
                              <Button className="w-full bg-[#4ECDC4]/10 text-[#4ECDC4] hover:bg-[#4ECDC4]/20 border-0 rounded-full h-11">
                                开始上课 <Play className="w-4 h-4 ml-2" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* 关于我们板块 -> 绑定 id="about" */}
        <div id="about" className="w-full max-w-[1200px] mb-20 scroll-mt-32">
          <div className="text-center mb-14">
            <Badge className="mb-3 bg-[#A78BFA]/10 text-[#A78BFA] border-0 px-4 py-2 text-sm font-medium rounded-full">
              ABOUT US
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-5 tracking-tight">关于幼乐码</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              幼乐码致力于成为国内领先的幼儿编程启蒙教育品牌，让每个孩子都能在快乐中探索科技的奥秘
            </p>
          </div>

          {/* 项目前景 - 大卡片 */}
          <Card className="border-0 rounded-[2.5rem] overflow-hidden mb-14 shadow-2xl">
            <div className="relative bg-gradient-to-br from-[#A78BFA] via-[#C4B5FD] to-[#DDD6FE] p-10 md:p-14">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">项目前景</h3>
                </div>
                <p className="text-white/90 text-lg leading-relaxed mb-10 max-w-4xl">
                  幼乐码是基于STEAM教育理念，专为3-6岁幼儿开发的编程启蒙解决方案。随着人工智能时代的到来，编程思维已成为儿童核心素养的重要组成部分。
                  我们的产品填补了低龄儿童编程教育的空白，通过游戏化教学方式，让孩子在快乐中培养计算思维、逻辑推理和创新能力，为未来的数字时代奠定坚实基础。
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {achievements.map((item, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-center">
                      <item.icon className="w-8 h-8 text-white/80 mx-auto mb-4" />
                      <p className="text-4xl font-bold text-white mb-1">{item.value}</p>
                      <p className="text-white/70 text-base">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* 核心价值观 */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 flex items-center justify-center gap-3">
              <Heart className="w-7 h-7 text-[#FF6B6B]" />
              核心价值观
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {coreValues.map((item, index) => (
                <Card key={index} className="border-0 rounded-3xl bg-white/80 backdrop-blur-xl overflow-hidden hover:shadow-xl transition-all group hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon className="w-10 h-10" style={{ color: item.color }} />
                    </div>
                    <h4 className="font-bold text-gray-800 text-xl mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 技术特色 */}
          <Card className="border-0 rounded-[2.5rem] bg-white/80 backdrop-blur-xl mb-16 shadow-xl">
            <CardContent className="p-10 md:p-14">
              <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 flex items-center justify-center gap-3">
                <Cpu className="w-7 h-7 text-[#4ECDC4]" />
                技术特色
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {techFeatures.map((item, index) => (
                  <div key={index} className="text-center p-8 rounded-3xl bg-white/60 hover:bg-white/90 transition-all hover:shadow-md">
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon className="w-10 h-10" style={{ color: item.color }} />
                    </div>
                    <h4 className="font-bold text-gray-800 text-xl mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 核心团队 */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 flex items-center justify-center gap-3">
              <Users className="w-7 h-7 text-[#A78BFA]" />
              核心团队
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border-0 rounded-3xl bg-white/80 backdrop-blur-xl overflow-hidden hover:shadow-xl transition-all group hover:-translate-y-2">
                  <div className="relative">
                    <div
                      className="h-28"
                      style={{ background: `linear-gradient(135deg, ${member.color} 0%, ${member.color}80 100%)` }}
                    />
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                      <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center text-5xl">
                        {member.avatar}
                      </div>
                    </div>
                  </div>
                  <CardContent className="pt-16 pb-8 text-center">
                    <h4 className="font-bold text-gray-800 text-xl">{member.name}</h4>
                    <Badge
                      className="mt-3 mb-4 border-0 px-4 py-1.5 text-sm font-medium rounded-full"
                      style={{ backgroundColor: `${member.color}20`, color: member.color }}
                    >
                      {member.role}
                    </Badge>
                    <p className="text-gray-600 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 用户评价 */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 text-center mb-12 flex items-center justify-center gap-3">
              <Star className="w-7 h-7 text-[#FFE66D]" />
              用户评价
            </h3>
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-xl">
                <Quote className="w-14 h-14 text-gray-300 mb-8" />
                <div className="min-h-[160px]">
                  {testimonials.map((item, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        index === currentTestimonial ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                      }`}
                    >
                      <p className="text-2xl text-gray-700 leading-relaxed mb-8">
                        "{item.content}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{item.avatar}</span>
                          <div>
                            <p className="font-bold text-gray-800 text-lg">{item.name}</p>
                            <p className="text-gray-600">{item.role}</p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-[#FFE66D] fill-[#FFE66D]" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-3 mt-10">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentTestimonial ? 'bg-gray-600 w-12' : 'bg-gray-300 w-8'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 产品优势 */}
          <Card className="border-0 rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl">
            <div className="bg-gradient-to-r from-[#FF6B6B] via-[#FF8E8E] to-[#FFB347] p-10 md:p-14">
              <h3 className="text-3xl font-bold text-white text-center mb-12">为什么选择幼乐码</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                {[
                  { icon: Gamepad2, title: '游戏化教学', desc: '寓教于乐' },
                  { icon: Sparkles, title: 'STEAM教育', desc: '全面发展' },
                  { icon: Star, title: '工业级标准', desc: '专业可靠' },
                  { icon: Rocket, title: '零基础入门', desc: '轻松上手' },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <item.icon className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-bold text-white text-xl mb-2">{item.title}</h4>
                    <p className="text-white/80 text-base">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* 全场景教学服务体系 -> 绑定 id="services" */}
          <div id="services" className="w-full mb-20 scroll-mt-32">
            <div className="text-center mb-12">
              <Badge className="mb-3 bg-[#4ECDC4]/10 text-[#4ECDC4] border-0 px-4 py-2 text-sm font-medium rounded-full">
                服务体系
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 tracking-tight">全场景教学支持</h2>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                从课程落地到家园共育，提供一站式解决方案
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {serviceSystem.map((item, idx) => (
                <Card key={idx} className="border-0 rounded-3xl bg-white/80 backdrop-blur-xl overflow-hidden hover:shadow-xl transition-all group hover:-translate-y-2">
                  <CardContent className="p-8 text-center">
                    <div
                      className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                      style={{ backgroundColor: `${item.color}20` }}
                    >
                      <item.icon className="w-10 h-10" style={{ color: item.color }} />
                    </div>
                    <h4 className="font-bold text-gray-800 text-xl mb-3">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 合作院校 -> 绑定 id="partners" */}
          <div id="partners" className="w-full mb-20 scroll-mt-32">
            <div className="flex items-center justify-center gap-3 mb-12">
              <Building2 className="w-7 h-7 text-[#A78BFA]" />
              <h3 className="text-3xl font-bold text-gray-800">合作院校</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {partnerSchools.map((school, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/90 transition-all shadow-sm">
                  <div className="text-4xl mb-2">{school.logo}</div>
                  <p className="text-gray-700 font-medium text-sm">{school.name}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="rounded-full border-gray-300 text-gray-600 hover:bg-white">
                成为合作伙伴 <Handshake className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* 竞赛荣誉/数据看板 */}
          <Card className="border-0 rounded-[2.5rem] bg-white/80 backdrop-blur-xl mb-16 shadow-xl overflow-hidden">
            <CardContent className="p-10 md:p-14">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <Badge className="mb-4 bg-[#FFE66D]/20 text-[#D4A017] border-0 px-4 py-2 rounded-full">
                    <Trophy className="w-4 h-4 inline mr-1" /> 创新成果
                  </Badge>
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">用数据见证成长</h3>
                  <p className="text-gray-600 text-lg mb-6">
                    幼乐码已在全国5+所幼儿园落地实践，累计服务超过400名学员。
                    通过AI学情分析系统，我们追踪到学员的逻辑思维能力平均提升47%，
                    问题解决能力提升52%，获得了家长与教师的一致好评。
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-[#4ECDC4]/10 rounded-2xl px-6 py-3">
                      <p className="text-sm text-gray-500">逻辑思维提升</p>
                      <p className="text-3xl font-bold text-[#4ECDC4]">47%</p>
                    </div>
                    <div className="bg-[#A78BFA]/10 rounded-2xl px-6 py-3">
                      <p className="text-sm text-gray-500">问题解决提升</p>
                      <p className="text-3xl font-bold text-[#A78BFA]">52%</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full border-8 border-[#4ECDC4]/20"></div>
                    <div className="absolute inset-0 rounded-full border-8 border-[#A78BFA]/30 transform rotate-45"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-gray-800">98%</p>
                        <p className="text-gray-600">家长满意度</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 联系我们 */}
          <Card className="border-0 rounded-[2.5rem] bg-white/80 backdrop-blur-xl shadow-xl">
            <CardContent className="p-10 md:p-14 text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-5">联系我们</h3>
              <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
                欢迎幼儿园、教育机构与我们合作，共同推动幼儿编程启蒙教育的发展
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <Button className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] text-white rounded-full h-14 px-10 text-lg font-bold shadow-xl hover:shadow-2xl">
                  商务合作
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full h-14 px-10 text-lg shadow-md">
                  预约演示
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-8 mt-10 text-gray-600">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4]" />
                  免费试用30天
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4]" />
                  专业培训支持
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-[#4ECDC4]" />
                  7x24小时服务
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 底部版权 */}
        <div className="w-full max-w-[1200px] border-t border-gray-200/50 pt-10 pb-6 text-center">
          <p className="text-gray-500 text-base">
            © {new Date().getFullYear()} 幼乐码编程启蒙平台 | 让每个孩子爱上编程
          </p>
        </div>
      </div>

      {/* 详情弹窗 */}
      <Dialog open={showDetailModal !== null} onOpenChange={() => setShowDetailModal(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              {showDetailModal?.title}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600">
              {showDetailModal?.desc}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            {showDetailModal?.title === "游戏化编程启蒙" && (
              <div className="space-y-3">
                <p className="text-gray-700">✅ 积木式拖拽编程，不用打字</p>
                <p className="text-gray-700">✅ 趣味闯关游戏，边玩边学</p>
                <p className="text-gray-700">✅ 卡通角色陪伴，激发学习兴趣</p>
                <p className="text-gray-700">✅ 即时正向反馈，增强成就感</p>
              </div>
            )}
            {showDetailModal?.title === "AI智能适配教学" && (
              <div className="space-y-3">
                <p className="text-gray-700">✅ 智能分析学习数据</p>
                <p className="text-gray-700">✅ 动态调整课程难度</p>
                <p className="text-gray-700">✅ 个性化学习路径</p>
                <p className="text-gray-700">✅ 薄弱点针对性练习</p>
              </div>
            )}
            {showDetailModal?.title === "STEAM教育理念" && (
              <div className="space-y-3">
                <p className="text-gray-700">✅ 融合科学、技术、工程、艺术、数学</p>
                <p className="text-gray-700">✅ 培养跨学科思维能力</p>
                <p className="text-gray-700">✅ 动手实践与理论结合</p>
                <p className="text-gray-700">✅ 全面提升综合素养</p>
              </div>
            )}
            {showDetailModal?.title === "全场景教学支持" && (
              <div className="space-y-3">
                <p className="text-gray-700">✅ 幼儿园课堂教学</p>
                <p className="text-gray-700">✅ 家庭亲子学习</p>
                <p className="text-gray-700">✅ 学习进度同步</p>
                <p className="text-gray-700">✅ 多设备无缝切换</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button onClick={() => setShowDetailModal(null)} className="w-full rounded-full">
              我知道了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        /* 全局平滑滚动，让点击导航栏后的页面滑动变得丝滑高级 */
        :global(html) {
          scroll-behavior: smooth;
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes starMove1 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(80px, 60px) rotate(180deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        @keyframes starMove2 {
          0% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-60px, 80px) rotate(-180deg); }
          100% { transform: translate(0, 0) rotate(-360deg); }
        }
        @keyframes starMove3 {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -40px) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes starFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes starFloatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-star-twinkle {
          animation: starTwinkle 3s ease-in-out infinite;
        }
        .animate-star-move-1 {
          animation: starMove1 15s linear infinite, starTwinkle 3s ease-in-out infinite;
        }
        .animate-star-move-2 {
          animation: starMove2 18s linear infinite, starTwinkle 3s ease-in-out infinite;
        }
        .animate-star-move-3 {
          animation: starMove3 20s linear infinite, starTwinkle 3s ease-in-out infinite;
        }
        .animate-star-float {
          animation: starFloat 6s ease-in-out infinite, starTwinkle 3s ease-in-out infinite;
        }
        .animate-star-float-reverse {
          animation: starFloatReverse 7s ease-in-out infinite, starTwinkle 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
