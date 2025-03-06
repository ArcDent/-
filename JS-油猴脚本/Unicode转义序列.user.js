// ==UserScript==
// @name         Unicode转义序列输出
// @namespace    http://tampermonkey.net/
// @version      1.0.3
// @description  将字符转换为Unicode转义序列并附加控制符标记
// @updateURL    https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/JS-油猴脚本/Unicode转义序列.user.js
// @downloadURL  https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/JS-油猴脚本/Unicode转义序列.user.js
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
(function() {
    'use strict';

    window.BB = function(inputChar) {
        if (!inputChar || inputChar.length !== 1) {
            console.error("请输入单个汉字，示例：BB('人')");
            return;
        }

        console.log(`[SIMCHAR] 正在查询【${inputChar}】的相似字...`);

        GM.xmlHttpRequest({
            method: "GET",
            url: `https://name.guguyu.com/xiangsizi.html?word=${encodeURIComponent(inputChar)}`,
            onload: function(response) {
                try {
                    // 新增状态码检查
                    if (response.status !== 200) {
                        throw new Error(`HTTP ${response.status}`);
                    }

                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    
                    // 更精确的选择器（根据2024年最新页面结构）
                    const resultList = doc.querySelectorAll('.similar-char-list a.char-item');
                    const characters = Array.from(resultList).map(el => {
                        return el.textContent.replace(/[\s]/g, '');
                    }).filter(Boolean);

                    // 增强输出格式
                    console.groupCollapsed(`%c【${inputChar}】找到 ${characters.length} 个相似字`, 
                        'color: #4CAF50; font-weight: bold;');
                    console.log(`%c原始字符`, 'font-weight: bold;', `→ ${inputChar}`);
                    console.log(`%c相似结果`, 'font-weight: bold;', `→ ${characters.join(' ')}`);
                    console.groupEnd();
                } catch (e) {
                    console.error('[SIMCHAR] 解析失败:', e.message);
                    console.debug('响应内容:', response.responseText);
                }
            },
            onerror: function(err) {
                console.error('[SIMCHAR] 请求失败:', err.message);
            }
        });
    };

    // 添加控制台自动完成提示
    if (window.console && window.console.log) {
        console.log("%c相似字查询已加载！", "color: #2196F3; font-weight: bold;");
        console.log("%c用法说明：", "font-weight: bold;", "BB('要查询的汉字')");
        console.log("示例：BB('人'), BB('汉'), BB('美')");
    }
})();
