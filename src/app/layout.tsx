import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '我的应用',
    template: '%s | 我的应用',
  },
  description:
    '一站式云端开发平台。通过对话轻松构建智能体、工作流和网站，实现从创意到上线的无缝衔接。',
  keywords: [
    'Vibe Coding',
    'AI 编程',
    '智能体搭建',
    '工作流搭建',
    '网站搭建',
    '网站部署',
    '全栈开发',
    'AI 工程师',
  ],
  authors: [{ name: '参赛团队', url: 'https://your-project.com' }],
  generator: 'Next.js',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '让创意快速上线',
    description: '通过对话开发，告别繁琐配置，专注创意实现。',
    url: 'https://your-project.com',
    siteName: '我的参赛项目',
    locale: 'zh_CN',
    type: 'website',
    // images: [
    //   {
    //     url: '',
    //     width: 1200,
    //     height: 630,
    //     alt: '项目预览图',
    //   },
    // ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Your Project Title',
  //   description: 'Project description for social sharing',
  //   // images: [''],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}