'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play,
  StopCircle,
  RotateCcw,
  Home,
  Star,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Trash2,
} from 'lucide-react';

type BlockType = 'motion' | 'looks' | 'sound' | 'control' | 'events';

interface Block {
  id: string;
  type: BlockType;
  label: string;
  icon: string;
  params?: Record<string, string | number>;
}

interface BlockCategory {
  id: BlockType;
  name: string;
  color: string;
  blocks: Block[];
}

const blockCategories: BlockCategory[] = [
  {
    id: 'events',
    name: '事件',
    color: '#FF6B6B',
    blocks: [
      { id: 'whenStart', type: 'events', label: '当开始时', icon: '▶️' },
      { id: 'whenClick', type: 'events', label: '当点击时', icon: '👆' },
    ],
  },
  {
    id: 'motion',
    name: '运动',
    color: '#4ECDC4',
    blocks: [
      { id: 'move', type: 'motion', label: '移动 10 步', icon: '➡️', params: { steps: 10 } },
      { id: 'turn', type: 'motion', label: '旋转 15 度', icon: '🔄', params: { degrees: 15 } },
      { id: 'goto', type: 'motion', label: '跳到', icon: '🎯' },
      { id: 'glide', type: 'motion', label: '滑行到', icon: '✨' },
    ],
  },
  {
    id: 'looks',
    name: '外观',
    color: '#A78BFA',
    blocks: [
      { id: 'say', type: 'looks', label: '说 你好！', icon: '💬', params: { text: '你好！' } },
      { id: 'think', type: 'looks', label: '想 加油！', icon: '💭', params: { text: '加油！' } },
      { id: 'switch', type: 'looks', label: '切换造型', icon: '👗' },
      { id: 'grow', type: 'looks', label: '变大', icon: '⬆️' },
      { id: 'shrink', type: 'looks', label: '变小', icon: '⬇️' },
    ],
  },
  {
    id: 'sound',
    name: '声音',
    color: '#FFE66D',
    blocks: [
      { id: 'playSound', type: 'sound', label: '播放声音', icon: '🔊' },
      { id: 'playNote', type: 'sound', label: '弹奏音符', icon: '🎵' },
    ],
  },
  {
    id: 'control',
    name: '控制',
    color: '#FFB347',
    blocks: [
      { id: 'wait', type: 'control', label: '等待 1 秒', icon: '⏱️', params: { seconds: 1 } },
      { id: 'repeat', type: 'control', label: '重复 10 次', icon: '🔁', params: { times: 10 } },
    ],
  },
];

const characterStates = [
  { emoji: '🐱', name: '小猫' },
  { emoji: '🐶', name: '小狗' },
  { emoji: '🐰', name: '小兔' },
  { emoji: '🦊', name: '小狐狸' },
];

const levelRewards = [
  { stars: 1, condition: '完成基础任务', color: '#CD7F32' },
  { stars: 2, condition: '使用3种积木', color: '#C0C0C0' },
  { stars: 3, condition: '无错误运行', color: '#FFD700' },
];

export default function WorkspacePage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('events');
  const [codeBlocks, setCodeBlocks] = useState<Block[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [characterEmoji, setCharacterEmoji] = useState(characterStates[0].emoji);
  const [characterPosition, setCharacterPosition] = useState({ x: 50, y: 50 });
  const [characterRotation, setCharacterRotation] = useState(0);
  const [characterScale, setCharacterScale] = useState(1);
  const [speechBubble, setSpeechBubble] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentCategory = blockCategories.find((c) => c.id === activeCategory);

  const addBlock = (block: Block) => {
    setCodeBlocks([...codeBlocks, { ...block, id: `block-${Date.now()}` }]);
  };

  const removeBlock = (id: string) => {
    setCodeBlocks(codeBlocks.filter((b) => b.id !== id));
  };

  const clearBlocks = () => {
    setCodeBlocks([]);
    resetCharacter();
  };

  const resetCharacter = () => {
    setCharacterPosition({ x: 50, y: 50 });
    setCharacterRotation(0);
    setCharacterScale(1);
    setSpeechBubble('');
  };

  const runCode = async () => {
    if (codeBlocks.length === 0 || isRunning) return;

    setIsRunning(true);
    resetCharacter();

    for (const block of codeBlocks) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      switch (block.id) {
        case 'move':
          setCharacterPosition((prev) => ({
            x: Math.min(90, Math.max(10, prev.x + 15)),
            y: prev.y,
          }));
          break;
        case 'turn':
          setCharacterRotation((prev) => prev + 45);
          break;
        case 'say':
          setSpeechBubble((block.params as { text: string })?.text || '你好！');
          break;
        case 'think':
          setSpeechBubble((block.params as { text: string })?.text || '加油！');
          break;
        case 'grow':
          setCharacterScale((prev) => Math.min(2, prev + 0.2));
          break;
        case 'shrink':
          setCharacterScale((prev) => Math.max(0.5, prev - 0.2));
          break;
        case 'wait':
          await new Promise((resolve) => setTimeout(resolve, 1000));
          break;
      }
    }

    setIsRunning(false);
    setShowSuccess(true);
    setEarnedStars(codeBlocks.length >= 3 ? 2 : 1);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const stopCode = () => {
    setIsRunning(false);
    resetCharacter();
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)' }}>
      {/* 顶部导航 */}
      <header className="flex-shrink-0 px-6 py-4 border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
              asChild
            >
              <Link href="/student">
                <ChevronLeft className="w-5 h-5 mr-1" />
                返回
              </Link>
            </Button>
            <div className="h-8 w-px bg-white/20" />
            <h1 className="text-lg font-bold text-white">奇妙运动派对</h1>
            <Badge className="bg-[#4ECDC4]/20 text-[#4ECDC4] border-0">
              小班课程
            </Badge>
          </div>

          <div className="flex items-center gap-3">
            {/* 星星计数 */}
            <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-white/10">
              <Star className="w-5 h-5 text-[#FFE66D] fill-[#FFE66D]" />
              <span className="font-bold text-white">{earnedStars}</span>
              <span className="text-white/50 text-sm">/3</span>
            </div>

            {/* 角色选择 */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10">
              {characterStates.map((state) => (
                <button
                  key={state.emoji}
                  onClick={() => setCharacterEmoji(state.emoji)}
                  className={`text-2xl transition-transform ${
                    characterEmoji === state.emoji ? 'scale-125' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  {state.emoji}
                </button>
              ))}
            </div>

            {/* 音量 */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            {/* 首页 */}
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
              asChild
            >
              <Link href="/">
                <Home className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* 积木分类侧边栏 */}
        <div className="w-48 flex-shrink-0 border-r border-white/10 backdrop-blur-xl bg-black/30">
          <div className="p-3 space-y-1">
            {blockCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? 'text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                style={{
                  backgroundColor: activeCategory === category.id ? `${category.color}30` : undefined,
                  borderLeft: `3px solid ${activeCategory === category.id ? category.color : 'transparent'}`,
                }}
              >
                <span className="text-lg">{category.blocks[0]?.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 积木选择区 */}
        <div className="w-64 flex-shrink-0 border-r border-white/10 backdrop-blur-xl bg-black/20 p-4 overflow-y-auto">
          <h3 className="text-sm font-bold text-white/80 mb-4">
            {currentCategory?.name}积木
          </h3>
          <div className="space-y-2">
            {currentCategory?.blocks.map((block) => (
              <button
                key={block.id}
                onClick={() => addBlock(block)}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: `${currentCategory.color}25`,
                  border: `2px solid ${currentCategory.color}50`,
                }}
              >
                <span className="text-2xl">{block.icon}</span>
                <span className="text-sm font-medium text-white">{block.label}</span>
              </button>
            ))}
          </div>

          {/* 奖励说明 */}
          <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold text-white/60 uppercase mb-3">获得星星</h4>
            <div className="space-y-2">
              {levelRewards.map((reward, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-lg" style={{ filter: `drop-shadow(0 0 4px ${reward.color})` }}>
                    <Star className="w-5 h-5" fill={reward.color} stroke={reward.color} />
                  </span>
                  <span className="text-xs text-white/70">{reward.condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 编程区域 */}
        <div className="flex-1 flex flex-col p-6">
          {/* 代码编辑区 */}
          <div className="flex-1 rounded-3xl border border-white/10 backdrop-blur-xl bg-black/30 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#A78BFA]" />
                <span className="text-sm font-medium text-white">积木程序</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                  onClick={clearBlocks}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  清空
                </Button>
              </div>
            </div>

            <div
              ref={workspaceRef}
              className="p-6 min-h-[200px] space-y-2"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
              }}
            >
              {codeBlocks.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl mb-4 opacity-30">🧩</div>
                    <p className="text-white/40 text-sm">点击左侧积木添加到程序中</p>
                  </div>
                </div>
              ) : (
                codeBlocks.map((block, index) => {
                  const category = blockCategories.find((c) => c.id === block.type);
                  return (
                    <div
                      key={block.id}
                      className="relative flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.01]"
                      style={{
                        backgroundColor: `${category?.color}30`,
                        border: `2px solid ${category?.color}60`,
                        marginLeft: index === 0 ? 0 : 24,
                      }}
                    >
                      <span className="text-lg">{block.icon}</span>
                      <span className="text-sm font-medium text-white flex-1">{block.label}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/50 hover:text-white/80 hover:bg-white/10 rounded-lg"
                        onClick={() => removeBlock(block.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 运行控制按钮 */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10"
              onClick={resetCharacter}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              重置
            </Button>
            {isRunning ? (
              <Button
                size="lg"
                className="h-14 px-12 rounded-full bg-gradient-to-r from-[#FF6B6B] to-[#FF8E8E] hover:opacity-90 text-white shadow-xl shadow-[#FF6B6B]/30"
                onClick={stopCode}
              >
                <StopCircle className="w-5 h-5 mr-2" />
                停止
              </Button>
            ) : (
              <Button
                size="lg"
                className="h-14 px-12 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#3DBDB5] hover:opacity-90 text-white shadow-xl shadow-[#4ECDC4]/30"
                onClick={runCode}
              >
                <Play className="w-5 h-5 mr-2" />
                运行
              </Button>
            )}
          </div>
        </div>

        {/* 舞台预览区 */}
        <div className="w-80 flex-shrink-0 border-l border-white/10 backdrop-blur-xl bg-black/20 p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#4ECDC4]" />
            <span className="text-sm font-medium text-white/80">舞台预览</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: '4/3' }}>
            {/* 星空背景 */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f23]">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${(i * 37) % 100}%`,
                    top: `${(i * 23) % 100}%`,
                    width: `${1 + (i % 2)}px`,
                    height: `${1 + (i % 2)}px`,
                    opacity: 0.3 + (i % 3) * 0.2,
                  }}
                />
              ))}
            </div>

            {/* 角色 */}
            <div
              className="absolute transition-all duration-300"
              style={{
                left: `${characterPosition.x}%`,
                top: `${characterPosition.y}%`,
                transform: `translate(-50%, -50%) rotate(${characterRotation}deg) scale(${characterScale})`,
              }}
            >
              <span className="text-6xl drop-shadow-lg">{characterEmoji}</span>
              {/* 气泡 */}
              {speechBubble && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-2xl bg-white shadow-xl whitespace-nowrap">
                  <p className="text-sm font-medium text-[#333]">{speechBubble}</p>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
                </div>
              )}
            </div>

            {/* 成功动画 */}
            {showSuccess && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="text-center animate-bounce">
                  <Trophy className="w-16 h-16 text-[#FFE66D] mx-auto mb-4" />
                  <p className="text-2xl font-bold text-white mb-2">太棒了！</p>
                  <div className="flex items-center justify-center gap-2">
                    {Array.from({ length: earnedStars }).map((_, i) => (
                      <Star key={i} className="w-8 h-8 text-[#FFE66D] fill-[#FFE66D]" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 提示 */}
          <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-bold text-white/60 uppercase mb-2 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              小提示
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              点击积木添加到程序中，点击运行按钮查看效果。尝试组合不同积木创造有趣的动画！
            </p>
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <footer className="flex-shrink-0 px-6 py-3 border-t border-white/10 backdrop-blur-xl bg-black/20">
        <div className="flex items-center justify-between text-xs text-white/50">
          <div className="flex items-center gap-4">
            <span>已添加 {codeBlocks.length} 个积木</span>
            <span>|</span>
            <span>角色位置: ({Math.round(characterPosition.x)}, {Math.round(characterPosition.y)})</span>
          </div>
          <div>幼乐码 - 可视化编程工作区</div>
        </div>
      </footer>
    </div>
  );
}
