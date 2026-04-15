// 幼乐码 - 模拟数据

export interface Course {
  id: string;
  title: string;
  description: string;
  grade: '小班' | '中班' | '大班';
  difficulty: 1 | 2 | 3;
  duration: number; // 分钟
  progress: number; // 0-100
  stars: number; // 0-3
  coverImage: string;
  lessons: number;
  completedLessons: number;
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  grade: string;
  class: string;
  totalStars: number;
  completedCourses: number;
  level: number;
  lastActive: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'course' | 'star' | 'streak' | 'special';
}

export interface CodeBlock {
  id: string;
  type: 'motion' | 'looks' | 'sound' | 'control' | 'events';
  label: string;
  icon: string;
  params?: string[];
}

export interface TeacherStats {
  totalStudents: number;
  todayAttendance: number;
  avgProgress: number;
  pendingReview: number;
}

export interface AdminStats {
  totalUsers: number;
  todayActive: number;
  totalCourses: number;
  completionRate: number;
}

// 课程数据
export const courses: Course[] = [
  {
    id: 'course-1',
    title: '认识小机器人',
    description: '和乐乐一起开启编程之旅，学习最基础的指令！',
    grade: '小班',
    difficulty: 1,
    duration: 15,
    progress: 100,
    stars: 3,
    coverImage: '/images/courses/robot-welcome.png',
    lessons: 5,
    completedLessons: 5,
  },
  {
    id: 'course-2',
    title: '前进后退',
    description: '让机器人学会向前走和向后退',
    grade: '小班',
    difficulty: 1,
    duration: 20,
    progress: 60,
    stars: 2,
    coverImage: '/images/courses/motion-basic.png',
    lessons: 4,
    completedLessons: 2,
  },
  {
    id: 'course-3',
    title: '左右转弯',
    description: '指挥机器人向左转和向右转',
    grade: '中班',
    difficulty: 2,
    duration: 25,
    progress: 25,
    stars: 1,
    coverImage: '/images/courses/turn-around.png',
    lessons: 6,
    completedLessons: 1,
  },
  {
    id: 'course-4',
    title: '重复指令',
    description: '使用重复积木让代码更简洁',
    grade: '中班',
    difficulty: 2,
    duration: 30,
    progress: 0,
    stars: 0,
    coverImage: '/images/courses/loop-block.png',
    lessons: 4,
    completedLessons: 0,
  },
  {
    id: 'course-5',
    title: '跳跃吧！',
    description: '让机器人跳起来避开障碍',
    grade: '大班',
    difficulty: 3,
    duration: 35,
    progress: 0,
    stars: 0,
    coverImage: '/images/courses/jump-action.png',
    lessons: 5,
    completedLessons: 0,
  },
  {
    id: 'course-6',
    title: '条件判断',
    description: '如果...那么...学会做选择',
    grade: '大班',
    difficulty: 3,
    duration: 40,
    progress: 0,
    stars: 0,
    coverImage: '/images/courses/condition-if.png',
    lessons: 6,
    completedLessons: 0,
  },
];

// 学生数据
export const students: Student[] = [
  {
    id: 'student-1',
    name: '张小明',
    avatar: '/avatars/student-1.png',
    grade: '中班',
    class: '中班1班',
    totalStars: 156,
    completedCourses: 4,
    level: 5,
    lastActive: '今天',
  },
  {
    id: 'student-2',
    name: '李小红',
    avatar: '/avatars/student-2.png',
    grade: '中班',
    class: '中班1班',
    totalStars: 203,
    completedCourses: 6,
    level: 7,
    lastActive: '今天',
  },
  {
    id: 'student-3',
    name: '王小宝',
    avatar: '/avatars/student-3.png',
    grade: '大班',
    class: '大班2班',
    totalStars: 89,
    completedCourses: 2,
    level: 3,
    lastActive: '昨天',
  },
  {
    id: 'student-4',
    name: '陈小雨',
    avatar: '/avatars/student-4.png',
    grade: '小班',
    class: '小班1班',
    totalStars: 45,
    completedCourses: 1,
    level: 2,
    lastActive: '3天前',
  },
  {
    id: 'student-5',
    name: '刘小乐',
    avatar: '/avatars/student-5.png',
    grade: '大班',
    class: '大班1班',
    totalStars: 312,
    completedCourses: 9,
    level: 10,
    lastActive: '今天',
  },
];

// 成就数据
export const achievements: Achievement[] = [
  {
    id: 'ach-1',
    name: '初次探索',
    description: '完成第一堂课',
    icon: 'star',
    unlocked: true,
    unlockedAt: '2024-01-15',
    category: 'course',
  },
  {
    id: 'ach-2',
    name: '三星达人',
    description: '一次性获得三星评价',
    icon: 'trophy',
    unlocked: true,
    unlockedAt: '2024-01-18',
    category: 'star',
  },
  {
    id: 'ach-3',
    name: '连续学习3天',
    description: '连续登录学习3天',
    icon: 'flame',
    unlocked: true,
    unlockedAt: '2024-01-20',
    category: 'streak',
  },
  {
    id: 'ach-4',
    name: '编程小能手',
    description: '完成5个课程',
    icon: 'award',
    unlocked: true,
    unlockedAt: '2024-02-01',
    category: 'course',
  },
  {
    id: 'ach-5',
    name: '连续学习7天',
    description: '连续登录学习7天',
    icon: 'zap',
    unlocked: false,
    category: 'streak',
  },
  {
    id: 'ach-6',
    name: '课程大师',
    description: '完成10个课程',
    icon: 'crown',
    unlocked: false,
    category: 'course',
  },
  {
    id: 'ach-7',
    name: '创意之星',
    description: '使用所有类型的积木',
    icon: 'sparkles',
    unlocked: false,
    category: 'special',
  },
  {
    id: 'ach-8',
    name: '超级玩家',
    description: '收集100颗星星',
    icon: 'gem',
    unlocked: false,
    category: 'star',
  },
];

// 编程积木
export const codeBlocks: CodeBlock[] = [
  // 运动积木
  { id: 'move-forward', type: 'motion', label: '前进', icon: 'arrow-up' },
  { id: 'move-backward', type: 'motion', label: '后退', icon: 'arrow-down' },
  { id: 'turn-left', type: 'motion', label: '左转', icon: 'rotate-ccw' },
  { id: 'turn-right', type: 'motion', label: '右转', icon: 'rotate-cw' },
  { id: 'jump', type: 'motion', label: '跳', icon: 'chevrons-up' },
  // 外观积木
  { id: 'say-hello', type: 'looks', label: '说你好', icon: 'message-circle' },
  { id: 'change-color', type: 'looks', label: '变色', icon: 'palette' },
  { id: 'grow', type: 'looks', label: '变大', icon: 'maximize-2' },
  { id: 'shrink', type: 'looks', label: '变小', icon: 'minimize-2' },
  // 声音积木
  { id: 'play-sound', type: 'sound', label: '播放声音', icon: 'volume-2' },
  { id: 'ding', type: 'sound', label: '叮咚', icon: 'bell' },
  // 控制积木
  { id: 'repeat-2', type: 'control', label: '重复2次', icon: 'repeat' },
  { id: 'repeat-3', type: 'control', label: '重复3次', icon: 'repeat-2' },
  // 事件积木
  { id: 'start', type: 'events', label: '开始', icon: 'play' },
  { id: 'collision', type: 'events', label: '碰到障碍', icon: 'alert-circle' },
];

// 积木分类配置
export const blockCategories = [
  { id: 'motion', name: '运动', color: '#4ECDC4', icon: 'footprints' },
  { id: 'looks', name: '外观', color: '#A78BFA', icon: 'eye' },
  { id: 'sound', name: '声音', color: '#FFE66D', icon: 'music' },
  { id: 'control', name: '控制', color: '#FFB347', icon: 'settings' },
  { id: 'events', name: '事件', color: '#FF6B6B', icon: 'zap' },
];

// 教师统计数据
export const teacherStats: TeacherStats = {
  totalStudents: 28,
  todayAttendance: 25,
  avgProgress: 68,
  pendingReview: 5,
};

// 管理员统计数据
export const adminStats: AdminStats = {
  totalUsers: 1256,
  todayActive: 342,
  totalCourses: 48,
  completionRate: 72,
};

// 图表数据
export const weeklyActivityData = [
  { day: '周一', users: 245, completions: 89 },
  { day: '周二', users: 312, completions: 112 },
  { day: '周三', users: 278, completions: 95 },
  { day: '周四', users: 356, completions: 134 },
  { day: '周五', users: 389, completions: 156 },
  { day: '周六', users: 412, completions: 178 },
  { day: '周日', users: 298, completions: 102 },
];

export const courseDistributionData = [
  { name: '小班', value: 35, color: '#4ECDC4' },
  { name: '中班', value: 42, color: '#FFB347' },
  { name: '大班', value: 23, color: '#A78BFA' },
];

export const gradeProgressData = [
  { subject: '逻辑思维', score: 85 },
  { subject: '创新能力', score: 78 },
  { subject: '动手能力', score: 92 },
  { subject: '协作能力', score: 71 },
  { subject: '表达能力', score: 88 },
];
