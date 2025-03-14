// ==UserScript==
// @name         智能按键触发器
// @namespace    http://tampermonkey.net/
// @version      1.2.0
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
        keySequence: ['ArrowUp', 'ArrowDown', 'Space', 'ArrowLeft', 'ArrowRight','Shift','1','F2'],
        intervals: 500,
        loopCount: 'infinite',
        active: false
    };
    
    // 初始化配置
    let config = Object.assign({}, defaultConfig, GM_getValue(CONFIG_KEY, {}));
    
    // 键盘映射表（扩展版）
    const KEY_MAP = {
        'Space': 32,
        'ArrowLeft': 37,
        'ArrowUp': 38,
        'ArrowRight': 39,
        'ArrowDown': 40,
        'ArrowForward': 34,  // PageDown
        'ArrowBack': 33,     // PageUp
        '1':49, '2':50, '3':51, '4':52, '5':53,
        'Shift':16, 'Control':17, 'Alt':18, 'Meta':91,
        'Esc':27, 'F1':112, 'F2':113, 'F3':114,
        'Tab':9, 'Enter':13, 'Backspace':8, 'Delete':46,
        'Home':36, 'End':35
    };
    
    // 物理按键映射
    const CODE_MAP = {
        'Shift': 'ShiftLeft',
        'Control': 'ControlLeft',
        'Alt': 'AltLeft',
        'Meta': 'MetaLeft',
        '1': 'Digit1', '2': 'Digit2', '3': 'Digit3',
        '4': 'Digit4', '5': 'Digit5',
        'Space': 'Space',
        'Esc': 'Escape',
        'F1': 'F1', 'F2': 'F2', 'F3': 'F3',
        'Tab': 'Tab', 'Enter': 'Enter',
        'Backspace': 'Backspace', 'Delete': 'Delete'
    };
    
    // 修饰键属性
    const MODIFIERS = {
        'Shift': { shiftKey: true },
        'Control': { ctrlKey: true },
        'Alt': { altKey: true },
        'Meta': { metaKey: true }
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
                    placeholder="例如：Shift,1,Space,F2">
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
            const code = CODE_MAP[key] || key;
            const modifierProps = MODIFIERS[key] || {};
    
            const eventArgs = {
                ...modifierProps,
                key: key,
                code: code,
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true,
                composed: true
            };
    
            // 同步修饰键状态
            if (modifierProps.shiftKey) window.__simulatedShift = true;
            if (modifierProps.ctrlKey) window.__simulatedCtrl = true;
            if (modifierProps.altKey) window.__simulatedAlt = true;
    
            // 触发keydown
            document.dispatchEvent(new KeyboardEvent('keydown', eventArgs));
    
            setTimeout(() => {
                // 触发keyup
                document.dispatchEvent(new KeyboardEvent('keyup', eventArgs));
                
                // 清除修饰键状态
                if (modifierProps.shiftKey) window.__simulatedShift = false;
                if (modifierProps.ctrlKey) window.__simulatedCtrl = false;
                if (modifierProps.altKey) window.__simulatedAlt = false;
                
                resolve();
            }, 50);
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
                CODE_MAP.hasOwnProperty(key) ||
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
    