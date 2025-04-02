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

    // ========== 配置区域开始 ==========
    // 请在这里修改选择器配置

    // 高亮注释：用于获取标签页标题的元素选择器（优先级A）
    const TITLE_SELECTOR_A = "#root > div > div[class*='Common-flexStartAlignStart'] > div[class*='MainScreenComponentStyle-containerPanel'] > div[class*='UserInfoContainerStyle-blockLeftPanel'] > div > div[class*='Common-flexStartAlignCenter'] > div[class*='UserInfoContainerStyle-containerProgressMainScreen'] > div:nth-child(1) > span";

    // 高亮注释：用于获取标签页标题的元素选择器（优先级B，当A找不到时使用）
    const TITLE_SELECTOR_B = "#root [class*='UserInfoContainerStyle-containerProgressMainScreen'] > div:first-child > span";

    // 高亮注释：需要修改内容的元素选择器
    const MODIFY_ELEMENT_SELECTOR = "head > title";
    // ========== 配置区域结束 ==========

    // 主函数
    function main() {
        // 查找标题元素
        const titleElement = findElementWithPriority(TITLE_SELECTOR_A, TITLE_SELECTOR_B);

        // 查找需要修改的元素
        const modifyElement = findElementInDocumentOrIframes(MODIFY_ELEMENT_SELECTOR);

        if (titleElement) {
            // 获取标题文本
            const titleText = getElementText(titleElement);

            // 修改标签页标题
            document.title = titleText;

            // 如果找到了需要修改的元素，则将其内容设置为标题文本
            if (modifyElement) {
                modifyElement.textContent = titleText;
                console.log(`已将元素 ${MODIFY_ELEMENT_SELECTOR} 的内容修改为: ${titleText}`);
            }

            console.log(`已将标签页标题修改为: ${titleText}`);
        } else {
            console.log('未找到标题元素');
        }
    }

    // 优先查找选择器A，找不到则查找选择器B
    function findElementWithPriority(selectorA, selectorB) {
        // 先在主文档中查找
        let element = findElementInDocumentOrIframes(selectorA);
        if (!element && selectorB) {
            element = findElementInDocumentOrIframes(selectorB);
        }
        return element;
    }

    // 在文档和所有iframe中查找元素
    function findElementInDocumentOrIframes(selector) {
        // 先在主文档中查找
        let element = document.querySelector(selector);
        if (element) return element;

        // 如果没有找到，在所有iframe中查找
        const iframes = document.getElementsByTagName('iframe');
        for (let i = 0; i < iframes.length; i++) {
            try {
                const iframeDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
                element = iframeDoc.querySelector(selector);
                if (element) return element;
            } catch (e) {
                console.log('无法访问iframe内容:', e);
            }
        }

        return null;
    }

    // 获取元素的文本内容（兼容各种元素类型）
    function getElementText(element) {
        if (element.value !== undefined) {
            return element.value;
        } else if (element.textContent) {
            return element.textContent.trim();
        } else if (element.innerText) {
            return element.innerText.trim();
        }
        return '';
    }

    // 监听DOM变化，以便在动态内容加载后执行
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                main();
            }
        });
    });

    // 开始观察文档变化
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初始执行
    main();
})();
