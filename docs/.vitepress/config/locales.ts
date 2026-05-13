import { enNav, zhNav } from "./nav";
import { getSidebar } from "./sidebar";

export const locales = {
    zh_cn: {
        label: "简体中文",
        lang: "zh-CN",
        link: "/zh_cn/",
        themeConfig: {
            editLink: {
                text: '在 GitHub 上编辑此页',
            },
            outline: {
                level: [2, 3] as [number, number],
                label: "本页导航",
            },
            darkModeSwitchLabel: '切换主题',
            lightModeSwitchTitle: '切换到浅色模式',
            darkModeSwitchTitle: '切换到深色模式',
            sidebarMenuLabel: '菜单',
            returnToTopLabel: '回到顶部',
            docFooter: {
                prev: '上一页',
                next: '下一页',
            },
            lastUpdated: {
                text: '最后更新',
            },
            notFound: {
                title: '页面未找到',
                quote: '你来到了没有知识的荒原',
                linkLabel: '返回首页',
                linkText: '带我回家',
            },
            nav: zhNav,
            sidebar: {
                "/zh_cn/manual/": [
                    {
                        text: '<i class="ri-book-read-line"></i> 用户手册',
                        items: getSidebar("zh_cn", "manual"),
                    },
                ],
                "/zh_cn/develop/": [
                    {
                        text: '<i class="ri-code-s-slash-line"></i> 开发文档',
                        items: getSidebar("zh_cn", "develop"),
                    },
                ],
            },
        },
    },
    en_us: {
        label: "English",
        lang: "en-US",
        link: "/en_us/",
        themeConfig: {
            editLink: {
                text: 'Edit this page on GitHub',
            },
            outline: {
                level: [2, 3] as [number, number],
                label: 'On this page',
            },
            sidebarMenuLabel: 'Menu',
            returnToTopLabel: 'Return to top',
            docFooter: {
                prev: 'Previous page',
                next: 'Next page',
            },
            lastUpdated: {
                text: 'Last updated',
            },
            notFound: {
                title: 'Page not found',
                quote: 'You have found a desolate land without knowledge',
                linkLabel: 'Go to home',
                linkText: 'Take me home',
            },
            nav: enNav,
            sidebar: {
                "/en_us/manual/": [
                    {
                        text: '<i class="ri-book-read-line"></i> User Manual',
                        items: getSidebar("en_us", "manual"),
                    },
                ],
                "/en_us/develop/": [
                    {
                        text: '<i class="ri-code-s-slash-line"></i> Developer Guide',
                        items: getSidebar("en_us", "develop"),
                    },
                ],
            },
        },
    },
};
