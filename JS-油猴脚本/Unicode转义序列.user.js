// ==UserScript==
// @name         Unicode转义序列输出
// @namespace    http://tampermonkey.net/
// @version      1.0.2
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

    // 暴露到全局的查询方法
    window.BB = function(inputChar) {
        if (!inputChar) {
            console.error("请提供查询字符，示例：BB('人')");
            return;
        }

        // 显示查询中的提示
        console.log(`正在查询【${inputChar}】的相似字...`);

        GM_xmlhttpRequest({
            method: "GET",
            url: `https://name.guguyu.com/xiangsizi.html?word=${encodeURIComponent(inputChar)}`,
            onload: function(response) {
                try {
                    // 创建临时DOM解析结果
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(response.responseText, "text/html");
                    
                    // 提取结果（根据实际页面结构调整选择器）
                    const resultList = doc.querySelectorAll('.py-3.text-center.font18 a.font24');
                    const characters = Array.from(resultList).map(el => el.textContent.trim());

                    // 格式化输出
                    console.groupCollapsed(`【${inputChar}】的相似字查询结果`);
                    console.log("原始字符：", inputChar);
                    console.log("相似字符：", characters.join(' '));
                    console.groupEnd();
                } catch (e) {
                    console.error('结果解析失败:', e);
                }
            },
            onerror: function(err) {
                console.error('请求失败:', err);
            }
        });
    };

    // 控制台使用提示
    console.log("相似字查询已加载，使用 BB('字符') 进行查询");
})();
