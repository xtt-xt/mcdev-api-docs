import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MCDev 非官方 API 文档',
  description: '网易我的世界开发者平台（MCDev）非官方 API 接口文档',
  lang: 'zh-CN',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }]
  ],
  themeConfig: {
    logo: '/favicon.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/intro' },
      { text: 'API 参考', link: '/api/overview' },
      {
        text: 'GitHub',
        link: 'https://github.com/xtt-xt/mcdev-api-docs'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '项目介绍', link: '/guide/intro' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '登录认证', link: '/guide/auth' },
            { text: '文件上传', link: '/guide/upload' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: '概览', link: '/api/overview' },
            { text: '作品管理', link: '/api/resource' },
            { text: '商品管理', link: '/api/goods' },
            { text: '用户与榜单', link: '/api/user' },
            { text: '收益', link: '/api/income' },
            { text: '数据分析', link: '/api/analyze' },
            { text: '活动', link: '/api/activity' },
            { text: '评论', link: '/api/comment' },
            { text: '反馈', link: '/api/feedback' },
            { text: '站内信', link: '/api/mailbox' },
            { text: '推广', link: '/api/promotion' },
            { text: '其他', link: '/api/other' }
          ]
        }
      ]
    },
    footer: {
      message: '非官方项目 · 仅供学习研究 · 与网易无任何关联',
      copyright: 'MIT Licensed'
    },
    search: {
      provider: 'local'
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: { dateStyle: 'full', timeStyle: 'short' }
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  }
})
