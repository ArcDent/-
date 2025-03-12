// ==UserScript==
// @name         Unicode转义序列输出
// @namespace    http://tampermonkey.net/
// @version      1.0.6
// @description  将字符转换为Unicode转义序列并附加控制符标记
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/Unicode转义序列.user.js
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/Unicode转义序列.user.js
// @author       Arc
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建全局函数 AA
    window.AA = function(input) {
        // 处理输入内容
        const processText = (str) => {
            let result = '';
            for (let i = 0; i < str.length; i++) {
                // 获取 Unicode 转义序列
                const hex = str.charCodeAt(i).toString(16).padStart(4, '0');
                result += `\\u${hex}`;
            }
            // 添加固定尾部标记
            return `${result} [U+200E]`;
        };

        // 控制台输出结果
        console.log(
            `%c输入内容: "${input}"\n%c转义结果: ${processText(input)}`,
            'color: blue; font-weight: bold;',
            'color: green;'
        );

        return processText(input);
    };

    // 控制台提示信息
    console.log(
        '%cAA() 函数已加载！使用方法：AA("要转换的字符")',
        'color: #2196F3; font-weight: bold;'
    );
})();
document.addEventListener("contextmenu", (e) => {
    e.stopImmediatePropagation();
}, {capture: true})