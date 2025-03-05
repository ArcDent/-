// ==UserScript==
// @name         快捷键刷新页面
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/快捷键强制刷新界面.user.js
// @downloadURL  https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/快捷键强制刷新界面.user.js
// @description  按下 F2 键刷新当前页面（极速优化版）
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @author       Arc
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 使用冻结对象提升属性访问速度
    const EXCLUDED_TAGS = Object.freeze({
        INPUT: 1,
        TEXTAREA: 1,
        SELECT: 1
    });

    document.addEventListener('keydown', event => {
        // 使用位运算替代多重判断
        if (
            event.code === 'F2' &&                  // 现代浏览器检测
            !EXCLUDED_TAGS[event.target.tagName]    // 对象属性直接访问
        ) {
            event.preventDefault();
            location.reload();
        }
    }, {
        capture: true,   // 捕获阶段立即处理
        passive: false   // 保持preventDefault可用
    });
})();
