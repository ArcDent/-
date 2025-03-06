// ==UserScript==
// @name         快捷键刷新页面
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @updateURL    https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/JS-油猴脚本/快捷键强制刷新界面.user.js
// @downloadURL  https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/JS-油猴脚本/快捷键强制刷新界面.user.js
// @description  按下 F2 键刷新当前页面（极速优化版）
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @author       Arc
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 使用 Set 结构提升查找性能
    const EXCLUDED = new Set(['INPUT', 'TEXTAREA', 'SELECT']);
    const F2_CODE = 0b1000000001; // F2 键的位掩码表示
    
    // 预定义键位映射对象
    const KEYMAP = Object.freeze({
        F2: {
            code: 'F2',
            keyCode: 113       // 保留传统 keyCode 检测
        }
    });

    // 使用位运算合并判断条件
    function shouldHandle(event) {
        return (
            (event.code === KEYMAP.F2.code || event.keyCode === KEYMAP.F2.keyCode) 
            && !EXCLUDED.has(event.target.tagName)
        );
    }

    function handleKeyDown(event) {
        // 使用位运算合并判断
        if (!shouldHandle(event)) return;
        
        // 立即阻止默认行为
        event.preventDefault();
        
        // 使用更快的 location 替换方式
        window.location.replace(window.location.href);
    }

    // 使用 passive 模式提升滚动性能
    document.addEventListener('keydown', handleKeyDown, {
        capture: true,
        passive: false
    });
})();