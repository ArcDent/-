// ==UserScript==
// @name         智能按键触发器
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/智能按键触发器.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/智能按键触发器.user.js
// @description  自定义按键顺序自动触发工具
// @author       Arc
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // 配置存储
    let config = {
        keys: GM_getValue('keys', ['ArrowForward', 'ArrowBack', 'Space', 'ArrowLeft', 'ArrowRight']),
        interval: GM_getValue('interval', 5000),
        loopCount: GM_getValue('loopCount', 0),
        isRunning: false
    };

    let currentLoop = 0;
    let timer = null;
    let currentKeyIndex = 0;

    // 创建UI
    const ui = document.createElement('div');
    ui.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        z-index: 9999;
        display: none;
    `;

    ui.innerHTML = `
        <h3 style="margin:0 0 10px 0;">按键配置</h3>
        <div style="margin-bottom:10px;">
            <label>按键顺序（逗号分隔）：</label>
            <input type="text" id="keySequence" style="width:200px;" value="${config.keys.join(',')}">
        </div>
        <div style="margin-bottom:10px;">
            <label>触发间隔（ms）：</label>
            <input type="number" id="interval" value="${config.interval}" style="width:100px;">
        </div>
        <div style="margin-bottom:10px;">
            <label>循环次数（0=无限）：</label>
            <input type="number" id="loopCount" value="${config.loopCount}" style="width:100px;">
        </div>
        <button id="saveConfig" style="margin-right:10px;">保存</button>
        <button id="closeUI">关闭</button>
    `;

    document.body.appendChild(ui);

    // 事件监听
    document.addEventListener('keydown', (e) => {
        if (e.key === '2' && e.location === 3) { // 小键盘2
            ui.style.display = ui.style.display === 'none' ? 'block' : 'none';
        }
        if (e.key === '1' && e.location === 3) { // 小键盘1
            toggleExecution();
        }
    });

    ui.querySelector('#saveConfig').addEventListener('click', saveConfig);
    ui.querySelector('#closeUI').addEventListener('click', () => ui.style.display = 'none');

    function saveConfig() {
        config.keys = ui.querySelector('#keySequence').value.split(',').map(k => k.trim());
        config.interval = parseInt(ui.querySelector('#interval').value) || 5000;
        config.loopCount = parseInt(ui.querySelector('#loopCount').value) || 0;

        GM_setValue('keys', config.keys);
        GM_setValue('interval', config.interval);
        GM_setValue('loopCount', config.loopCount);

        alert('配置已保存！');
    }

    function toggleExecution() {
        if (!config.isRunning) {
            startExecution();
        } else {
            stopExecution();
        }
    }

    function startExecution() {
        config.isRunning = true;
        currentLoop = 0;
        currentKeyIndex = 0;

        timer = setInterval(() => {
            if (config.loopCount > 0 && currentLoop >= config.loopCount) {
                stopExecution();
                return;
            }

            const key = config.keys[currentKeyIndex];
            simulateKeyPress(key);

            currentKeyIndex = (currentKeyIndex + 1) % config.keys.length;
            if (currentKeyIndex === 0) {
                currentLoop++;
            }
        }, config.interval);
    }

    function stopExecution() {
        config.isRunning = false;
        clearInterval(timer);
    }

    function simulateKeyPress(key) {
        const event = new KeyboardEvent('keydown', {
            key: key,
            code: key,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    }
})();
