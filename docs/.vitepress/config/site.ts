import { latestReleaseMeta } from "./version";
import { qqGroupLink, githubRepoLink, qqIconSvg } from "./constants";

export const siteConfig = {
    base: "/",
    title: "MaaLYSK",
    description: "MaaLYSK Documentation",
    lastUpdated: true,
    head: [
        ["link", { rel: "icon", href: "/logo.ico" }] as [string, Record<string, string>],
        [
            "link",
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
            },
        ] as [string, Record<string, string>],
    ],
};

export const sharedThemeConfig = {
    logo: "/logo.ico",
    latestReleaseMeta,
    socialLinks: [
        { icon: { svg: qqIconSvg }, link: qqGroupLink, ariaLabel: 'QQ群' },
        { icon: 'github', link: githubRepoLink },
    ],
    editLink: {
        pattern: 'https://github.com/Witty36/MaaLYSK/edit/main/docs/:path',
    },
    search: {
        provider: "local" as const,
        options: {
            locales: {
                zh_cn: {
                    translations: {
                        button: {
                            buttonText: "搜索文档",
                            buttonAriaLabel: "搜索文档",
                        },
                        modal: {
                            noResultsText: "无法找到相关结果",
                            resetButtonTitle: "清除查询条件",
                            footer: {
                                selectText: "选择",
                                navigateText: "切换",
                                closeText: "关闭",
                            },
                        },
                    },
                },
                en_us: {
                    translations: {
                        button: {
                            buttonText: "Search",
                            buttonAriaLabel: "Search",
                        },
                        modal: {
                            noResultsText: "No results for",
                            resetButtonTitle: "Clear query",
                            footer: {
                                selectText: "Select",
                                navigateText: "Switch",
                                closeText: "Close",
                            },
                        },
                    },
                },
            },
        },
    },
};
