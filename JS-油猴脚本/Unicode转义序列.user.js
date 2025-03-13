// ==UserScript==
// @name         Unicode转义序列输出
// @namespace    http://tampermonkey.net/
// @version      1.1.2
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

//查询键码
(function() {
    'use strict';

    const keyCodeMap = {
        8: 'Backspace', 9: 'Tab', 13: 'Enter', 16: 'Shift', 17: 'Ctrl', 18: 'Alt',
        19: 'Pause', 20: 'CapsLock', 27: 'Escape', 32: 'Space', 33: 'PageUp',
        34: 'PageDown', 35: 'End', 36: 'Home', 37: 'ArrowLeft', 38: 'ArrowUp',
        39: 'ArrowRight', 40: 'ArrowDown', 45: 'Insert', 46: 'Delete',
        48: '0', 49: '1', 50: '2', 51: '3', 52: '4', 53: '5', 54: '6', 55: '7',
        56: '8', 57: '9', 65: 'A', 66: 'B', 67: 'C', 68: 'D', 69: 'E', 70: 'F',
        71: 'G', 72: 'H', 73: 'I', 74: 'J', 75: 'K', 76: 'L', 77: 'M', 78: 'N',
        79: 'O', 80: 'P', 81: 'Q', 82: 'R', 83: 'S', 84: 'T', 85: 'U', 86: 'V',
        87: 'W', 88: 'X', 89: 'Y', 90: 'Z', 91: 'Win', 92: 'Win', 93: 'Menu',
        96: 'Num0', 97: 'Num1', 98: 'Num2', 99: 'Num3', 100: 'Num4', 101: 'Num5',
        102: 'Num6', 103: 'Num7', 104: 'Num8', 105: 'Num9', 106: 'Num*',
        107: 'Num+', 109: 'Num-', 110: 'Num.', 111: 'Num/', 112: 'F1', 113: 'F2',
        114: 'F3', 115: 'F4', 116: 'F5', 117: 'F6', 118: 'F7', 119: 'F8',
        120: 'F9', 121: 'F10', 122: 'F11', 123: 'F12', 144: 'NumLock',
        145: 'ScrollLock', 186: ';', 187: '=', 188: ',', 189: '-', 190: '.',
        191: '/', 192: '`', 219: '[', 220: '\\', 221: ']', 222: "'"
    };

    const keyNameToCode = {};
    Object.entries(keyCodeMap).forEach(([code, name]) => {
        const normalized = name.toUpperCase().replace(/\s+/g, '');
        if (!keyNameToCode[normalized]) {
            keyNameToCode[normalized] = parseInt(code);
        }
    });

    function A(param) {
        const processKey = (key) => {
            if (key === ' ') return {code: 32, name: 'Space'};

            const normalized = key.toUpperCase().replace(/\s+/g, '');
            const code = keyNameToCode[normalized];
            if (code) return {code, name: keyCodeMap[code]};

            const charCode = key.charCodeAt(0);
            if (keyCodeMap[charCode]) return {code: charCode, name: keyCodeMap[charCode]};

            return null;
        };

        if (typeof param === 'undefined') {
            const allKeys = Object.entries(keyCodeMap).map(([code, name]) => ({
                '键码': parseInt(code),
                '按键': name
            }));
            console.table(allKeys);
        } else {
            let result;
            if (typeof param === 'string') {
                result = processKey(param) ||
                    Object.entries(keyCodeMap).find(([_, name]) => name === param);
            } else if (typeof param === 'number') {
                result = keyCodeMap[param] ? {code: param, name: keyCodeMap[param]} : null;
            }

            if (result) {
                console.table([{
                    '键码': result.code || parseInt(result[0]),
                    '按键': result.name || result[1]
                }]);
            } else {
                console.log(`未找到匹配的按键: ${param}`);
            }
        }
    }

    unsafeWindow.A = A;
    console.log('A() 函数已加载！输入 A() 查看所有按键，输入 A("按键") 查询特定按键');
})();

document.addEventListener("contextmenu", (e) => {
    e.stopImmediatePropagation();
}, {capture: true})



