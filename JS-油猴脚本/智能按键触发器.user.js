// ==UserScript==
// @name         智能按键触发器
// @namespace    http://tampermonkey.net/
// @version      1.1.5
// @description  Advanced keyboard automation with customizable sequences
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/智能按键触发器.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/智能按键触发器.user.js
// @author       Arc
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 配置存储系统
    const CONFIG_KEY = 'KEYBOARD_CONFIG';
    const defaultConfig = {
        keySequence: ['ArrowUp', 'ArrowDown', 'Space', 'ArrowLeft', 'ArrowRight','Shift',],
        intervals: 500,
        loopCount: 'infinite',
        active: false
    };

    // 初始化配置
    let config = Object.assign({}, defaultConfig, GM_getValue(CONFIG_KEY, {}));

    // 键盘映射表（可扩展）
    const KEY_MAP = {
        'Space': 32,
        'ArrowLeft': 37,
        'ArrowUp': 38,
        'ArrowRight': 39,
        'ArrowDown': 40,
        'ArrowForward': 34,  // PageDown
        'ArrowBack': 33,    // PageUp
        '1':49,
        '2':50,
        '3':51,
        '4':52,
        '5':53,
        'Shift':16,
        'Esc':27,
        'F2':113
    };

    // 状态变量
    let isRunning = false;
    let currentTimeout = null;

    // 创建UI
    const panel = createControlPanel();
    document.body.appendChild(panel);

    // 键盘监听
    document.addEventListener('keydown', (e) => {
        if (e.key === '1' && e.location === 3) { // 小键盘1
            if (!isRunning) startAutomation();
        }
        if (e.key === '2' && e.location === 3) { // 小键盘2
            panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
        }
    });

    function createControlPanel() {
        const panel = document.createElement('div');
        panel.style = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(40,40,40,0.9);
            padding: 20px;
            color: white;
            border-radius: 8px;
            display: none;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            min-width: 300px;
        `;

        const html = `
            <h3 style="margin-top:0;color:#00ff88">Auto Key Controller</h3>
            <div style="margin-bottom:15px">
                <label>按键序列（逗号分隔）：</label>
                <input type="text" id="keySeq" value="${config.keySequence.join(',')}"
                    style="width:96%;padding:5px;margin:5px 0"
                    placeholder="例如：ArrowForward,ArrowBack,Space">
            </div>
            <div style="margin-bottom:15px">
                <label>间隔时间（毫秒）：</label>
                <input type="number" id="interval" value="${config.intervals}"
                    style="width:96%;padding:5px;margin:5px 0" min="50">
            </div>
            <div style="margin-bottom:15px">
                <label>循环次数：</label>
                <input type="text" id="loopCount" value="${config.loopCount}"
                    style="width:96%;padding:5px;margin:5px 0"
                    placeholder="数字或'infinite'">
            </div>
            <div style="display:flex;gap:10px">
                <button id="saveBtn" style="flex:1;padding:8px;background:#4CAF50;border:none;color:white">保存配置</button>
                <button id="stopBtn" style="flex:1;padding:8px;background:#f44336;border:none;color:white">立即停止</button>
            </div>
            <div id="status" style="margin-top:10px;font-size:0.9em"></div>
        `;

        panel.innerHTML = html;

        // 事件绑定
        panel.querySelector('#saveBtn').addEventListener('click', saveConfig);
        panel.querySelector('#stopBtn').addEventListener('click', stopAutomation);

        return panel;
    }

    async function startAutomation() {
        if (isRunning) return;
        isRunning = true;
        updateStatus('运行中...', '#4CAF50');

        let count = 0;
        const maxLoop = isNaN(config.loopCount) ? Infinity : parseInt(config.loopCount);

        while (isRunning && count < maxLoop) {
            for (const key of config.keySequence) {
                if (!isRunning) break;
                await simulateKeyPress(key.trim());
                await delay(config.intervals);
            }
            if (config.loopCount !== 'infinite') count++;
        }

        stopAutomation();
    }

    function simulateKeyPress(key) {
        return new Promise(resolve => {
            const keyCode = KEY_MAP[key] || key.toUpperCase().charCodeAt(0);
            const eventArgs = {
                key: key,
                keyCode: keyCode,
                code: key,
                bubbles: true,
                cancelable: true
            };

            document.dispatchEvent(new KeyboardEvent('keydown', eventArgs));
            document.dispatchEvent(new KeyboardEvent('keyup', eventArgs));

            setTimeout(resolve, 50);
        });
    }

    function stopAutomation() {
        isRunning = false;
        if (currentTimeout) clearTimeout(currentTimeout);
        updateStatus('已停止', '#f44336');
        setTimeout(() => updateStatus('', ''), 2000);
    }

    function saveConfig() {
        const keySeq = document.querySelector('#keySeq').value.split(',').filter(Boolean);
        const interval = parseInt(document.querySelector('#interval').value) || 500;
        const loopCount = document.querySelector('#loopCount').value;

        if (!validateKeys(keySeq)) {
            updateStatus('存在无效按键!', '#ff9800');
            return;
        }

        config = {
            keySequence: keySeq,
            intervals: interval,
            loopCount: loopCount === 'infinite' ? 'infinite' : parseInt(loopCount) || 0
        };

        GM_setValue(CONFIG_KEY, config);
        updateStatus('配置已保存!', '#4CAF50');
        setTimeout(() => updateStatus('', ''), 2000);
    }

    function validateKeys(keys) {
        return keys.every(key => {
            return KEY_MAP.hasOwnProperty(key) ||
                (key.length === 1 && /^[a-zA-Z0-9]$/.test(key));
        });
    }

    function updateStatus(text, color) {
        const status = document.querySelector('#status');
        status.textContent = text;
        status.style.color = color || 'white';
    }

    function delay(ms) {
        return new Promise(resolve => currentTimeout = setTimeout(resolve, ms));
    }

    // 注册菜单命令
    GM_registerMenuCommand("显示控制面板", () => panel.style.display = 'block');
    GM_registerMenuCommand("隐藏控制面板", () => panel.style.display = 'none');
})();
