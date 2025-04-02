// ==UserScript==
// @name         动态标签页标题修改器
// @namespace    ArcDent
// @version      1.0
// @description  根据页面元素动态修改标签页标题
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/标签页名称自动更改.user.js
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/标签页名称自动更改.user.js
// @author       Arc
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ====================== 配置区域开始 ======================
    // 在这里设置你的目标元素选择器（高亮注释）
    // 主选择器（高优先级）
    const PRIMARY_SELECTOR = "#root > div > div[class*='Common-flexStartAlignStart'] > div[class*='MainScreenComponentStyle-containerPanel'] > div[class*='UserInfoContainerStyle-blockLeftPanel'] > div > div[class*='Common-flexStartAlignCenter'] > div[class*='UserInfoContainerStyle-containerProgressMainScreen'] > div:nth-child(1) > span"; // 请替换为你的主选择器

    // 备选选择器（当主选择器找不到时使用）
    const FALLBACK_SELECTOR = "#root [class*='UserInfoContainerStyle-containerProgressMainScreen'] > div:first-child > span"; // 请替换为你的备选选择器
    // ====================== 配置区域结束 ======================

    // 观察器配置
    const OBSERVER_CONFIG = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    };

    // 尝试获取元素的函数
    function tryGetElement() {
        // 尝试从主选择器获取
        let element = findElementInDocument(document, PRIMARY_SELECTOR);

        // 如果主选择器找不到，尝试备选选择器
        if (!element) {
            element = findElementInDocument(document, FALLBACK_SELECTOR);
        }

        return element;
    }

    // 在文档中查找元素（包括Shadow DOM和iframe）
    function findElementInDocument(root, selector) {
        // 尝试在常规DOM中查找
        let element = root.querySelector(selector);
        if (element) return element;

        // 查找Shadow DOM
        const shadowRoots = root.querySelectorAll('*');
        for (const node of shadowRoots) {
            if (node.shadowRoot) {
                element = findElementInDocument(node.shadowRoot, selector);
                if (element) return element;
            }
        }

        // 查找iframe
        const iframes = root.querySelectorAll('iframe');
        for (const iframe of iframes) {
            try {
                // 尝试访问iframe内容（同源情况下）
                if (iframe.contentDocument) {
                    element = findElementInDocument(iframe.contentDocument, selector);
                    if (element) return element;
                }
            } catch (e) {
                // 跨域iframe会抛出安全错误，忽略
                console.log('无法访问iframe内容:', e);
            }
        }

        return null;
    }

    // 更新标题函数
    function updateTitle() {
        const element = tryGetElement();
        if (element) {
            const newTitle = element.textContent || element.value || element.getAttribute('title') || element.getAttribute('data-title');
            if (newTitle && newTitle !== document.title) {
                document.title = newTitle.trim();
            }
        }
    }

    // 初始化观察器
    function initObserver() {
        const observer = new MutationObserver(function(mutations) {
            updateTitle();
        });

        // 开始观察整个文档
        observer.observe(document.documentElement, OBSERVER_CONFIG);

        // 观察所有Shadow DOM
        const shadowRoots = document.querySelectorAll('*');
        for (const node of shadowRoots) {
            if (node.shadowRoot) {
                observer.observe(node.shadowRoot, OBSERVER_CONFIG);
            }
        }

        return observer;
    }

    // 主执行函数
    function main() {
        // 初始尝试更新标题
        updateTitle();

        // 设置观察器监听DOM变化
        const observer = initObserver();

        // 设置定时器作为后备方案（每5秒检查一次）
        const intervalId = setInterval(updateTitle, 5000);

        // 清理函数
        return function() {
            observer.disconnect();
            clearInterval(intervalId);
        };
    }

    // 启动脚本
    const cleanup = main();

    // 当脚本卸载时清理资源
    window.addEventListener('unload', cleanup);
})();
