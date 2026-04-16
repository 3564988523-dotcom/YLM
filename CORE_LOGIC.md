# 幼乐码 - 面向幼儿园的STEAM编程启蒙解决方案

## 项目概述

幼乐码是基于STEAM教育理念，专为3-6岁幼儿开发的编程启蒙解决方案。系统包含三个主要端：幼儿端（可视化编程）、教师端（教学管理）、管理端（运营分析）。

---

## 版本技术栈

| 技术 | 版本 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Core | React 19 |
| Language | TypeScript 5 |
| UI 组件 | shadcn/ui (基于 Radix UI) |
| Styling | Tailwind CSS 4 |
| 图表 | Recharts |
| 图标 | Lucide React |

---

## 目录结构

```
/workspace/projects/
├── SPEC.md                      # 项目设计规范文档
├── public/                      # 静态资源
│   └── images/                  # 课程图片
├── src/
│   ├── app/                     # 页面路由 (App Router)
│   │   ├── page.tsx             # 首页 - 角色选择入口
│   │   ├── globals.css          # 全局样式 (幼乐码品牌色)
│   │   ├── layout.tsx           # 根布局
│   │   ├── student/             # 幼儿端
│   │   │   ├── page.tsx         # 课程首页（轮播图、统计卡片详情弹窗）
│   │   │   └── workspace/       # 可视化编程工作区
│   │   │       └── page.tsx    # 核心编程界面
│   │   ├── teacher/            # 教师端
│   │   │   └── page.tsx        # 教学概览/课程管理/学生管理/学习分析
│   │   └── admin/               # 管理端
│   │       └── page.tsx        # 数据看板/课程管理/用户管理/报表中心
│   ├── components/ui/           # shadcn/ui 组件库
│   └── lib/
│       ├── utils.ts             # 工具函数 (cn)
│       └── mock-data.ts         # 模拟数据 (课程/学生/成就等)
└── package.json                 # 项目依赖
```

---

## 页面路由

| 路径 | 描述 |
|------|------|
| `/` | 首页 - 角色选择 (幼儿/教师/管理员) |
| `/student` | 幼儿端 - 轮播图、统计卡片、课时详情弹窗、成就详情弹窗 |
| `/student/workspace` | 可视化编程工作区 (核心功能) |
| `/teacher` | 教师端 - 教学概览/课程管理/学生管理/学习分析 |
| `/admin` | 管理端 - 数据看板/课程管理/用户管理/报表中心 |

---

## 核心功能

### 1. 幼儿端 - 课程首页

**功能特性**:
- 自动轮播Banner（4张宣传图，自动5秒切换）
- 统计卡片详情弹窗：
  - 学习天数：显示日历、学习时长、使用积木数、获得星星
  - 课时详情：显示已完成课时、进行中课时、每个课时的状态和星星
  - 星星收集：显示星星总数、获取途径（课程、签到、成就、评价）、用途说明
  - 成就详情：显示已解锁/进行中成就徽章、进度条、奖励说明
- 关于我们板块：项目前景、核心价值观、技术特色、核心团队

**实现文件**: `src/app/student/page.tsx`

### 2. 幼儿端 - 可视化编程工作区

**功能特性**:
- 积木式编程界面 (类似 ScratchJr)
- 5类积木: 运动、外观、声音、控制、事件
- 拖拽添加积木，点击运行
- 角色实时反馈动画
- 成就奖励系统

**实现文件**: `src/app/student/workspace/page.tsx`

### 3. 教师端 - 教学管理

**功能特性**:
- 教学概览仪表盘
- 课程管理 (CRUD)
- 学生管理 (批量导入、导出)
- 学习分析 (进度跟踪、能力雷达图)
- 周活动趋势图表

**实现文件**: `src/app/teacher/page.tsx`

### 4. 管理端 - 数据分析

**功能特性**:
- 核心指标统计卡片
- 用户活跃趋势图 (Area Chart)
- 课程分布饼图
- 实时动态信息流
- 报表导出功能

**实现文件**: `src/app/admin/page.tsx`

---

## 设计系统

### 品牌色

```css
--primary: #FF6B6B;        /* 珊瑚红 */
--secondary: #4ECDC4;     /* 薄荷绿 */
--accent-yellow: #FFE66D;  /* 阳光黄 */
--accent-blue: #45B7D1;    /* 天空蓝 */
--accent-purple: #A78BFA;  /* 梦幻紫 */
--background: #FFF9F0;     /* 奶油白 */
```

### 积木块颜色

| 类型 | 颜色 |
|------|------|
| 运动 | #4ECDC4 |
| 外观 | #A78BFA |
| 声音 | #FFE66D |
| 控制 | #FFB347 |
| 事件 | #FF6B6B |

---

## 开发规范

### Hydration 问题防范

1. 所有页面组件使用 `'use client'` 指令
2. 禁止在 JSX 中直接使用 `Math.random()`、`Date.now()` 等动态数据
3. 动态内容必须使用 `useState` + `useEffect` 模式

### 组件使用

- 优先使用 shadcn/ui 组件
- 图表使用 Recharts
- 图标使用 Lucide React
- 按钮最小尺寸: 48px (幼儿端 64px)

---

## 构建与运行

```bash
# 开发环境
pnpm dev

# 生产构建
pnpm build

# 生产运行
pnpm start
```

服务运行端口: **5000**

---

## 数据结构

### 课程数据 (Course)

```typescript
interface Course {
  id: string;
  title: string;           // 课程名称
  description: string;     // 课程描述
  grade: '小班' | '中班' | '大班';
  difficulty: 1 | 2 | 3;    // 1=入门, 2=进阶, 3=挑战
  duration: number;        // 时长(分钟)
  progress: number;        // 进度(0-100)
  stars: number;           // 获得星星(0-3)
  lessons: number;         // 总课时
  completedLessons: number; // 已完成课时
}
```

### 积木块 (CodeBlock)

```typescript
interface CodeBlock {
  id: string;
  type: 'motion' | 'looks' | 'sound' | 'control' | 'events';
  label: string;
  icon: string;
}
```

### 轮播数据 (Banner)

```typescript
interface Banner {
  id: number;
  title: string;           // 标题
  subtitle: string;       // 副标题
  description: string;    // 描述
  icon: string;           // 图标 emoji
  gradient: string;       // 渐变类名
  tag: string;             // 标签
}
```

### 课时数据 (Lesson)

```typescript
interface Lesson {
  id: number;
  title: string;          // 课时名称
  status: 'completed' | 'in-progress' | 'locked';  // 状态
  stars: number;          // 获得星星(0-3)
  duration: string;       // 时长
  description: string;    // 描述
  skills: string[];       // 培养技能
}
```

### 成就数据 (Achievement)

```typescript
interface Achievement {
  id: number;
  name: string;           // 成就名称
  icon: string;           // 图标 emoji
  description: string;    // 描述
  progress: number;       // 进度(0-100)
  unlocked: boolean;      // 是否已解锁
  reward: string;         // 奖励说明
  color: string;          // 主题色
}
```

---

## 注意事项

1. **性能优化**: 动画使用 CSS transform/opacity
2. **触摸友好**: 所有可交互元素最小 48x48px
3. **无障碍**: 支持键盘导航和屏幕阅读器
4. **响应式**: 平板优先 (768px-1024px)
