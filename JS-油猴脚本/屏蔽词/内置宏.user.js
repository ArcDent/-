// ==UserScript==
// @name         内置宏
// @version      1.0.0
// @author       Mod
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/内置宏.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/内置宏.user.js
// @match        https://3dtank.com/play/
// @match        https://game.4399iw2.com/yxtk/*
// @match        http://3dtank.com/play/
// @match        http://game.4399iw2.com/yxtk/*
// @grant        GM_setClipboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// ==/UserScript==

(function () {
    'use strict';

    // 存储记录的操作
    let actionLog = [];
    // 标记是否正在记录
    let isRecording = false;
    // 标记是否正在回放
    let isPlaying = false;
    // 记录开始时间
    let startTime;
    // 记录当前按下的按键及其按下时间
    let currentKeys = new Map();
    // 记录回放时当前按下的按键
    let playingKeys = new Set();
    // 记录 `\` 键按下次数
    let backslashPressCount = 0;
    // 记录上次按下 `\` 键的时间
    let lastBackslashPressTime = 0;
    // 记录 `\` 键是否处于按下状态
    let isBackslashPressed = false;
    // 定义两次按键的最大间隔时间（毫秒）
    const MAX_BACKSLASH_INTERVAL = 500;
    // 记录每个按键的按下状态
    let keyPressStatus = new Map();
    // 新增：标记画布是否隐藏
    let isHidden = false;
    // 新增：循环次数，默认无限循环
    let loopCount = Infinity;
    // 标记是否正在选择元素
    let isSelectingElement = false;

    // 创建操作按钮
    function createButton(text, handler) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.position = 'fixed';
        button.style.top = '43px';
        button.style.zIndex = '9999';
        button.style.padding = '10px 20px';
        button.style.fontSize = '16px';
        button.style.fontFamily = 'Arial, sans-serif';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.backgroundColor = '#007BFF';
        button.style.color = 'white';
        button.style.cursor = 'pointer';
        button.style.transition = 'background - color 0.3s ease';
        button.style.display = 'none'; // 默认隐藏按钮

        // 鼠标悬停事件
        button.addEventListener('mouseover', function () {
            this.style.backgroundColor = '#0056b3';
            if (text === '⏺ 开始记录') {
                showTooltip(this, '如果您是在战场内执行移动类操作，点击开始记录后请先点击一下游戏画面后再进行操作。');
            }
        });

        // 鼠标移出事件
        button.addEventListener('mouseout', function () {
            this.style.backgroundColor = '#007BFF';
            if (text === '⏺ 开始记录') {
                hideTooltip();
            }
        });

        button.addEventListener('click', handler);
        return button;
    }

    // 显示提示框
    function showTooltip(target, message) {
        let tooltip = document.getElementById('recorder - tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'recorder - tooltip';
            tooltip.style.position = 'absolute';
            tooltip.style.zIndex = '10000';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '3px';
            tooltip.style.fontFamily = 'Arial, sans - serif';
            tooltip.style.fontSize = '14px';
            tooltip.textContent = message;
            document.body.appendChild(tooltip);
        }

        // 动态调整提示框位置
        const rect = target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = rect.bottom + 5 + 'px';
    }

    // 隐藏提示框
    function hideTooltip() {
        const tooltip = document.getElementById('recorder - tooltip');
        if (tooltip) {
            document.body.removeChild(tooltip);
        }
    }

    // 添加按钮到页面
    const startRecordBtn = createButton('⏺ 开始记录', startRecording);
    startRecordBtn.style.left = '10px';
    document.body.appendChild(startRecordBtn);

    const stopRecordBtn = createButton('⏹ 停止记录', stopRecording);
    stopRecordBtn.style.left = '135px';
    document.body.appendChild(stopRecordBtn);

    const startPlayBtn = createButton('🔁 开始循环', playActions);
    startPlayBtn.style.left = '260px';
    document.body.appendChild(startPlayBtn);

    const stopPlayBtn = createButton('⏸ 停止循环', stopPlay);
    stopPlayBtn.style.left = '393px';
    document.body.appendChild(stopPlayBtn);

    const saveActionsBtn = createButton('↪ 导出操作', saveActions);
    saveActionsBtn.style.left = '520px';
    document.body.appendChild(saveActionsBtn);

    const importActionsBtn = createButton('↩ 导入操作', importActions);
    importActionsBtn.style.left = '645px';
    document.body.appendChild(importActionsBtn);

    // 操作预览按钮
    const previewActionsBtn = createButton('👁️ 操作预览', previewActions);
    previewActionsBtn.style.left = '770px';
    document.body.appendChild(previewActionsBtn);

    // 新增：隐藏画布按钮
    const hideCanvasBtn = createButton('🚫 隐藏画布', toggleCanvasVisibility);
    hideCanvasBtn.style.left = '903px';
    document.body.appendChild(hideCanvasBtn);

    // 开发人员按钮
    const developerBtn = createButton('❗ 开发人员', showDeveloperInfo);
    developerBtn.style.left = '1036px';
    document.body.appendChild(developerBtn);

    // 创建进度条元素
    const progressBarContainer = document.createElement('div');
    progressBarContainer.style.position = 'fixed';
    progressBarContainer.style.width = '257px';
    progressBarContainer.style.height = '5px';
    progressBarContainer.style.backgroundColor = '#ccc';
    progressBarContainer.style.borderRadius = '5px';
    progressBarContainer.style.overflow = 'hidden';
    progressBarContainer.style.display = 'none'; // 初始时隐藏进度条

    const progressBar = document.createElement('div');
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#007BFF';
    progressBar.style.width = '0%';
    progressBarContainer.appendChild(progressBar);
    document.body.appendChild(progressBarContainer);

    // 调整进度条位置，使其在开始循环按钮下方
    function adjustProgressBarPosition() {
        const startPlayBtnRect = startPlayBtn.getBoundingClientRect();
        progressBarContainer.style.top = startPlayBtnRect.bottom + 4 + 'px';
        progressBarContainer.style.left = startPlayBtnRect.left + 'px';
    }

    // 创建画布提示框，使用新样式
    function showCanvasPopup(message, addNotice = false, closeable = false, clickThrough = false, isPreview = false) {
        const popup = document.createElement('div');
        popup.style.userSelect = 'none';
        // 修改字体大小
        popup.style.fontSize = '18px';
        popup.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        popup.style.color = 'white';
        popup.style.webkitTapHighlightColor = 'transparent';
        popup.style.alignItems = 'center';
        popup.style.boxShadow = 'rgba(0, 0, 0, 0.25) 0px 0.313em 1.25em 0px';
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.justifyContent = 'center'; // 让内容在垂直方向上居中
        popup.style.textAlign = 'center'; // 让文本在水平方向上居中
        // 根据 isPreview 设置 pointer-events
        popup.style.pointerEvents = isPreview? 'auto' : 'none';
        popup.style.outline = 'rgba(255, 255, 255, 0.25) solid 0.063em';
        popup.style.zIndex = '60';
        // 调整内边距
        popup.style.padding = '2em 1em 1em 1em';
        popup.style.background = 'radial-gradient(100% 100% at 0% 0%, rgba(254, 38, 74, 0.75) 0%, rgba(255, 38, 74, 0) 100%), rgba(0, 25, 38, 0.75)';
        popup.style.webkitBoxAlign = 'center';
        popup.style.webkitBoxOrient = 'vertical';
        popup.style.webkitBoxDirection = 'normal';
        popup.style.webkitBoxPack = 'start';
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';

        if (isPreview) {
            // 操作预览框自适应大小
            popup.style.minHeight = 'auto';
            popup.style.maxHeight = '80vh';
            popup.style.overflow = 'auto';
        } else {
            // 其他提示框固定大小
            popup.style.width = '25.625em';
            popup.style.minHeight = '14.125em';
            popup.style.maxHeight = '14.125em';
        }

        if (addNotice) {
            const notice = document.createElement('div');
            notice.style.position = 'absolute';
            notice.style.top = '0.5em';
            notice.style.left = '0.5em';
            notice.style.color = 'yellow';
            notice.style.fontWeight = 'bold';
            notice.textContent = '注意';
            popup.appendChild(notice);
        }

        popup.innerHTML = message;

        document.body.appendChild(popup);

        if (!isPreview) {
            // 非操作预览框一段时间后移除
            setTimeout(() => {
                if (popup.parentNode) {
                    document.body.removeChild(popup);
                }
            }, 2000);
        }
        return popup;
    }

    // 动态边框动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes borderAnimation {
            0% {
                border-color: #FF0000;
            }
            25% {
                border-color: #00FF00;
            }
            50% {
                border-color: #0000FF;
            }
            75% {
                border-color: #FFFF00;
            }
            100% {
                border-color: #FF0000;
            }
        }

        /* 操作预览列表样式 */
      .preview-list li {
            text-align: left;
            margin-bottom: 5px;
        }
        /* 缩小输入框大小 */
      .timestamp-input,.key-input {
            width: 80px;
            padding: 2px 5px;
            font-size: 14px;
        }
        /* 分类标题样式 */
      .category-title {
            font-weight: bold;
            margin-top: 10px;
            text-align: left;
        }
        /* 选择操作的复选框样式 */
      .select-action-checkbox {
            margin-right: 5px;
        }
        /* 选择元素提示样式 */
      .select-element-hint {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 9999;
        }
        /* 遮罩层样式 */
      .selection-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 9998;
        }
    `;
    document.head.appendChild(style);

    // 开始记录操作
    function startRecording() {
        console.log('开始记录操作被触发');
        actionLog = [];
        isRecording = true;
        startTime = Date.now();
        document.addEventListener('click', recordClick);
        document.addEventListener('input', recordInput);
        document.addEventListener('keydown', recordKeydown);
        document.addEventListener('keyup', recordKeyup);
        showCanvasPopup('开始记录操作', false, false, true);
    }

    // 记录点击操作
    function recordClick(event) {
        if (isRecording &&!isControlButton(event.target)) {
            const selector = getElementSelector(event.target);
            const timestamp = Date.now() - startTime;
            actionLog.push({ type: 'click', selector, timestamp });
            console.log(`记录点击操作，选择器: ${selector}，时间戳: ${timestamp}`);
        }
    }

    // 记录输入操作
    function recordInput(event) {
        if (isRecording &&!isControlButton(event.target)) {
            const selector = getElementSelector(event.target);
            const value = event.target.value;
            const timestamp = Date.now() - startTime;
            actionLog.push({ type: 'input', selector, value, timestamp });
            console.log(`记录输入操作，选择器: ${selector}，值: ${value}，时间戳: ${timestamp}`);
        }
    }

    // 记录按键按下操作
    function recordKeydown(event) {
        if (isRecording &&!isControlButton(event.target)) {
            const timestamp = Date.now() - startTime;
            const keyCode = event.code;

            // 检查该按键是否已经按下
            if (!keyPressStatus.has(keyCode) ||!keyPressStatus.get(keyCode)) {
                keyPressStatus.set(keyCode, true);
                currentKeys.set(keyCode, timestamp);
                actionLog.push({
                    type: 'keydown',
                    code: keyCode,
                    char: event.key,
                    keyCode: event.keyCode,
                    which: event.which,
                    timestamp
                });
                console.log(`记录按键按下操作，按键: ${event.key}，code: ${keyCode}，时间戳: ${timestamp}`);
            }
        }

        // 处理 `\` 键连按
        if (event.code === 'Backslash') {
            if (isBackslashPressed) {
                // 如果 `\` 键已经处于按下状态，说明是长按，不做处理
                return;
            }
            isBackslashPressed = true;
            const currentTime = Date.now();
            if (currentTime - lastBackslashPressTime < MAX_BACKSLASH_INTERVAL) {
                backslashPressCount++;
            } else {
                backslashPressCount = 1;
            }
            lastBackslashPressTime = currentTime;

            if (backslashPressCount === 2) {
                toggleButtonsVisibility();
                backslashPressCount = 0;
            }
        }
    }

    // 记录按键弹起操作
    function recordKeyup(event) {
        if (isRecording &&!isControlButton(event.target)) {
            const timestamp = Date.now() - startTime;
            const keyCode = event.code;

            if (currentKeys.has(keyCode)) {
                const pressTime = currentKeys.get(keyCode);
                actionLog.push({
                    type: 'keyup',
                    code: keyCode,
                    char: event.key,
                    keyCode: event.keyCode,
                    which: event.which,
                    timestamp,
                    pressDuration: timestamp - pressTime
                });
                currentKeys.delete(keyCode);
            }
            console.log(`记录按键弹起操作，按键: ${event.key}，code: ${keyCode}，时间戳: ${timestamp}`);
        }

                // 重置 `\` 键按下状态
        if (event.code === 'Backslash') {
            isBackslashPressed = false;
            // 如果间隔超过最大间隔，重置计数
            if (Date.now() - lastBackslashPressTime > MAX_BACKSLASH_INTERVAL) {
                backslashPressCount = 0;
            }
        }
    }

    // 判断是否为控制按钮
    function isControlButton(element) {
        const controlTexts = ['⏺ 开始记录', '⏹ 停止记录', '🔁 开始循环', '⏸ 停止循环', '↪ 导出操作', '↩ 导入操作', '👁️ 操作预览', '🚫 隐藏画布', '❗ 开发人员'];
        return controlTexts.includes(element.textContent);
    }

    // 获取元素的选择器
    function getElementSelector(element) {
        if (element.id) {
            return `#${element.id}`;
        }

        const path = [];
        while (element && element.nodeType === Node.ELEMENT_NODE) {
            let selector = element.tagName.toLowerCase();

            if (element.classList.length > 0) {
                const classes = Array.from(element.classList);
                const validClasses = classes.filter(cls =>!cls.includes('dynamic-'));
                if (validClasses.length > 0) {
                    selector += '.' + validClasses.join('.');
                }
            }

            if (element.name) {
                selector += `[name="${element.name}"]`;
            }

            const siblings = Array.from(element.parentNode.children).filter(child => child.tagName === element.tagName);
            if (siblings.length > 1) {
                const index = siblings.indexOf(element) + 1;
                selector += `:nth-of-type(${index})`;
            }

            path.unshift(selector);
            element = element.parentNode;
        }

        const finalSelector = path.join(' > ');
        console.log('生成的选择器:', finalSelector);
        return finalSelector;
    }

    // 停止记录操作
    function stopRecording() {
        console.log('停止记录操作被触发');
        if (isRecording) {
            isRecording = false;
            document.removeEventListener('click', recordClick);
            document.removeEventListener('input', recordInput);
            document.removeEventListener('keydown', recordKeydown);
            document.removeEventListener('keyup', recordKeyup);
            showCanvasPopup('停止记录操作，已保存操作');
        }
    }

    // 操作预览
    function previewActions() {
        // 先移除之前的操作预览弹窗
        const existingPreviewPopup = document.querySelector('.preview-popup');
        if (existingPreviewPopup) {
            document.body.removeChild(existingPreviewPopup);
        }

        // 分类操作
        const groupedActions = {
            click: [],
            input: [],
            keydown: [],
            keyup: []
        };
        actionLog.forEach(action => {
            if (groupedActions[action.type]) {
                groupedActions[action.type].push(action);
            }
        });

        let previewHtml = '<ul class="preview-list align-start">';
        for (const [category, actions] of Object.entries(groupedActions)) {
            if (actions.length > 0) {
                previewHtml += `<li class="category-title">${category} 操作</li>`;
                actions.forEach((action, index) => {
                    let inputField = '';
                    let keyInputField = '';
                    if (action.type === 'click' || action.type === 'input') {
                        inputField = `<input type="number" value="${action.timestamp / 1000}" data-index="${index}" class="timestamp-input">`;
                    } else if (action.type === 'keydown' || action.type === 'keyup') {
                        inputField = `<input type="number" value="${action.timestamp / 1000}" data-index="${index}" class="timestamp-input">`;
                        keyInputField = `<input type="text" value="${action.char}" data-index="${index}" class="key-input">`;
                    }
                    previewHtml += `<li><input type="checkbox" data-index="${index}" data-category="${category}" class="select-action-checkbox"> 操作 ${index + 1}: 类型 - ${action.type}`;
                    if (action.type === 'click' || action.type === 'input') {
                        previewHtml += `, 选择器 - ${action.selector}`;
                    }
                    if (action.type === 'input') {
                        previewHtml += `, 值 - ${action.value}`;
                    }
                    if (action.type === 'keydown' || action.type === 'keyup') {
                        previewHtml += `, 按键 - ${keyInputField}`;
                    }
                    // 将“时间戳”改为“延迟”，以秒为单位
                    previewHtml += `, 延迟（s） - ${inputField}</li>`;
                });
            }
        }

        // 即使没有录制操作，也提供自定义添加操作的区域
        previewHtml += `
            <li class="category-title">自定义操作</li>
            <li>
                <label>操作类型:
                    <select id="custom-action-type">
                        <option value="click">点击</option>
                        <option value="input">输入</option>
                        <option value="keydown">按键按下</option>
                        <option value="keyup">按键弹起</option>
                        <option value="keyclick">按键点击</option>
                    </select>
                </label>
                <p class="help-text">若选择点击或输入操作，可点击“选择元素”按钮来选取页面元素；若选择按键操作，填写按键字符（如 a、Enter）。一定不要使延迟为0，否则网页会直接崩溃！</p>
                <label>选择器/按键: <input type="text" id="custom-action-selector" readonly> <button id="select-element-btn">选择元素</button></label>
                <label id="custom-value-label" style="display: none;">值（仅输入操作需要）: <input type="text" id="custom-action-value"></label>
                <label>延迟（s）: <input type="number" value="1" id="custom-action-delay"></label>
                <button id="add-custom-action">添加操作</button>
                <button id="add-1ms-delay">1毫秒</button>
                <button id="add-1s-delay">1秒</button>
            </li>
        `;

        const loopCountDisplay = loopCount === Infinity? '无限' : loopCount;

        // 修改 HTML 结构，将删除按钮和循环次数输入框放在同一行，且删除按钮在最左边
        previewHtml += `
            <div class="align-start button-row" style="display: flex; align-items: center; margin-top: 10px;">
                <button id="delete-selected" style="padding: 10px 20px; font-size: 16px; font-family: Arial, sans-serif; border: none; border-radius: 5px; background-color: #dc3545; color: white; cursor: pointer;">删除选中操作</button>
                <div style="flex-grow: 1;"></div>
                <label for="loop-count-input" style="margin-right: 5px;">循环次数:</label>
                <input type="text" id="loop-count-input" value="${loopCountDisplay}" placeholder="无限" style="color: black; width: 80px;">
            </div>
        `;
        previewHtml += '<button id="saveAndClosePreview" style="padding: 10px 20px; font-size: 16px; font-family: Arial, sans-serif; border: none; border-radius: 5px; background-color: #007BFF; color: white; cursor: pointer; margin-top: 1em;">保存并关闭</button>';
        const popup = showCanvasPopup(previewHtml, false, false, false, true);
        popup.classList.add('preview-popup'); // 添加类名以便后续识别

        // 确保内容容器可滚动
        const content = popup.querySelector('ul');
        if (content) {
            content.style.overflowY = 'auto';
            content.style.maxHeight = 'calc(80vh - 150px)'; // 预留按钮和边距空间
        }

        // 为时间戳（延迟）输入框绑定事件
        const timestampInputs = popup.querySelectorAll('.timestamp-input');
        timestampInputs.forEach(input => {
            input.addEventListener('focus', function () {
                // 输入框聚焦时，移除全局按键事件监听
                document.removeEventListener('keydown', recordKeydown);
                document.removeEventListener('keyup', recordKeyup);

                // 为输入框添加独立的按键事件监听
                this.addEventListener('keydown', function (e) {
                    e.stopPropagation(); // 阻止事件冒泡
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        let value = parseFloat(this.value) + 0.5;
                        this.value = value;
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        let value = parseFloat(this.value) - 0.5;
                        if (value < 0) {
                            value = 0;
                        }
                        this.value = value;
                    }
                });

                this.addEventListener('keyup', function (e) {
                    e.stopPropagation(); // 阻止事件冒泡
                });
            });

            input.addEventListener('blur', function () {
                // 输入框失去焦点时，恢复全局按键事件监听
                document.addEventListener('keydown', recordKeydown);
                document.addEventListener('keyup', recordKeyup);
            });

            input.addEventListener('change', function (event) {
                event.stopPropagation(); // 阻止事件冒泡
                const index = parseInt(this.dataset.index, 10);
                const value = parseFloat(this.value) * 1000;
                const category = this.closest('li').querySelector('.select-action-checkbox').dataset.category;
                const actionIndex = groupedActions[category].findIndex((_, i) => i === index);
                if (actionIndex!== -1) {
                    groupedActions[category][actionIndex].timestamp = value;
                    console.log(`操作 ${category} - ${index} 的时间戳已更新为 ${value}`);
                } else {
                    console.error(`无效的操作索引 ${index}，无法更新时间戳`);
                }
            });
        });

        // 为按键输入框绑定事件
        const keyInputs = popup.querySelectorAll('.key-input');
        keyInputs.forEach(input => {
            input.addEventListener('focus', function () {
                // 阻止事件冒泡到 canvas 元素
                this.addEventListener('keydown', function (e) {
                    e.stopPropagation();
                    handleKeyInput.call(this, e);
                });
                this.addEventListener('keyup', function (e) {
                    e.stopPropagation();
                });
            });
            input.addEventListener('blur', function () {
                this.removeEventListener('keydown', handleKeyInput);
            });
        });

        function handleKeyInput(event) {
            event.preventDefault(); // 阻止默认行为
            event.stopPropagation(); // 阻止事件冒泡

            let key = event.key;
            if (key.length === 1) {
                // 如果是单个字符，根据 Shift 键状态决定大小写
                if (event.shiftKey) {
                    key = key.toUpperCase();
                } else {
                    key = key.toLowerCase();
                }
            }

            this.value = key;

            const index = parseInt(this.dataset.index, 10);
            const category = this.closest('li').querySelector('.select-action-checkbox').dataset.category;
            const actionIndex = groupedActions[category].findIndex((_, i) => i === index);
            if (actionIndex!== -1 && (category === 'keydown' || category === 'keyup' || category === 'keyclick')) {
                groupedActions[category][actionIndex].char = key;
                groupedActions[category][actionIndex].key = key;
                const { code, keyCode } = getKeyCodeFromChar(key);
                groupedActions[category][actionIndex].code = code;
                groupedActions[category][actionIndex].keyCode = keyCode;
                groupedActions[category][actionIndex].which = keyCode;
                console.log(`操作 ${category} - ${index} 的按键已更新为 ${key}`);
            } else {
                console.error(`无效的操作索引 ${index} 或操作类型不匹配，无法更新按键`);
            }
        }

        // 为删除选中操作按钮绑定事件
        const deleteSelectedBtn = popup.querySelector('#delete-selected');
        deleteSelectedBtn.addEventListener('click', function () {
            const checkboxes = popup.querySelectorAll('.select-action-checkbox:checked');
            const selectedIndices = [];
            checkboxes.forEach(checkbox => {
                const category = checkbox.dataset.category;
                const index = parseInt(checkbox.dataset.index, 10);
                selectedIndices.push({ category, index });
            });
            selectedIndices.sort((a, b) => {
                if (a.category!== b.category) {
                    return a.category.localeCompare(b.category);
                }
                return b.index - a.index;
            }); // 从大到小排序，避免删除时索引混乱
            selectedIndices.forEach(({ category, index }) => {
                groupedActions[category].splice(index, 1);
            });
            actionLog = [];
            Object.values(groupedActions).forEach(actions => {
                actionLog = actionLog.concat(actions);
            });
            previewActions(); // 重新加载预览
        });

        // 为循环次数输入框绑定事件
        const loopCountInput = popup.querySelector('#loop-count-input');
        loopCountInput.addEventListener('change', function () {
            const inputValue = this.value.trim();
            if (inputValue === '无限') {
                loopCount = Infinity;
            } else {
                const parsedValue = parseInt(inputValue, 10);
                if (!isNaN(parsedValue) && parsedValue > 0) {
                    loopCount = parsedValue;
                } else {
                    showCanvasPopup('请输入有效的正整数或“无限”');
                    this.value = loopCount === Infinity? '无限' : loopCount;
                }
            }
        });

        // 为操作类型选择框绑定事件，控制值输入框的显示与隐藏
        const customActionTypeSelect = popup.querySelector('#custom-action-type');
        const customValueLabel = popup.querySelector('#custom-value-label');
        const customActionSelectorInput = popup.querySelector('#custom-action-selector');
        const selectElementBtn = popup.querySelector('#select-element-btn');

        customActionTypeSelect.addEventListener('change', function () {
            const type = this.value;
            if (type === 'click' || type === 'input') {
                customActionSelectorInput.setAttribute('readonly', 'readonly');
                selectElementBtn.style.display = 'inline';
                customValueLabel.style.display = type === 'input'? 'inline' : 'none';
            } else if (type === 'keydown' || type === 'keyup' || type === 'keyclick') {
                customActionSelectorInput.removeAttribute('readonly');
                selectElementBtn.style.display = 'none';
                customValueLabel.style.display = 'none';
                customActionSelectorInput.placeholder = '请输入按键字符（如 a、Enter）';
            }
        });

        // 为选择元素按钮绑定事件
        selectElementBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            const type = customActionTypeSelect.value;
            if (type === 'click' || type === 'input') {
                isSelectingElement = true;

                // 隐藏操作预览弹窗
                popup.style.display = 'none';

                // 创建遮罩层
                const overlay = document.createElement('div');
                overlay.classList.add('selection-overlay');
                overlay.style.pointerEvents = 'none'; // 允许点击穿透遮罩层
                document.body.appendChild(overlay);

                // 创建提示信息
                const hint = document.createElement('div');
                hint.classList.add('select-element-hint');
                hint.textContent = '请点击页面上的元素来选择';
                hint.style.pointerEvents = 'none'; // 允许点击穿透提示信息
                document.body.appendChild(hint);

                const selectElementHandler = function (event) {
                    event.stopPropagation();
                    if (isSelectingElement) {
                        isSelectingElement = false;
                        const target = event.target;
                        const selector = getElementSelector(target);
                        customActionSelectorInput.value = selector;
                        document.body.removeChild(overlay);
                        document.body.removeChild(hint);
                        document.removeEventListener('click', selectElementHandler);

                        // 显示操作预览弹窗
                        popup.style.display = 'flex';
                    }
                };

                document.addEventListener('click', selectElementHandler);
            }
        });

        // 为自定义操作的选择器/按键输入框绑定事件
        customActionSelectorInput.addEventListener('focus', function () {
            // 输入框聚焦时，暂时移除全局按键事件监听
            document.removeEventListener('keydown', recordKeydown);
            document.removeEventListener('keyup', recordKeyup);

            this.addEventListener('keydown', function (e) {
                e.preventDefault(); // 阻止默认行为
                e.stopPropagation(); // 阻止事件冒泡

                let key = e.key;
                if (key.length === 1) {
                    // 如果是单个字符，根据 Shift 键状态决定大小写
                    if (e.shiftKey) {
                        key = key.toUpperCase();
                    } else {
                        key = key.toLowerCase();
                    }
                }

                    // 更新输入框的值
    this.value = key;
  });

  this.addEventListener('keyup', function (e) {
    e.stopPropagation(); // 阻止事件冒泡
  });
});

customActionSelectorInput.addEventListener('blur', function () {
  // 输入框失去焦点时，恢复全局按键事件监听
  document.addEventListener('keydown', recordKeydown);
  document.addEventListener('keyup', recordKeyup);
});

// 为添加自定义操作按钮绑定事件
const addCustomActionBtn = popup.querySelector('#add-custom-action');
addCustomActionBtn.addEventListener('click', function () {
  const type = popup.querySelector('#custom-action-type').value;
  const selectorOrKey = popup.querySelector('#custom-action-selector').value;
  const value = popup.querySelector('#custom-action-value').value;
  let delay = parseFloat(popup.querySelector('#custom-action-delay').value);
  if (isNaN(delay) || delay < 0) {
    showCanvasPopup('请填写有效的非负延迟时间');
    return;
  }
  delay = delay * 1000;

  if (!selectorOrKey) {
    showCanvasPopup('请填写有效的选择器/按键');
    return;
  }

  let newAction;
  if (type === 'click') {
    newAction = { type, selector: selectorOrKey, timestamp: delay };
  } else if (type === 'input') {
    if (!value) {
      showCanvasPopup('输入操作必须填写值');
      return;
    }
    newAction = { type, selector: selectorOrKey, value, timestamp: delay };
  } else if (type === 'keydown' || type === 'keyup') {
    const { code, keyCode } = getKeyCodeFromChar(selectorOrKey);
    if (!code || keyCode === 0) {
      showCanvasPopup('无效的按键，请输入有效的按键字符');
      return;
    }
    newAction = {
      type,
      code,
      char: selectorOrKey,
      keyCode,
      which: keyCode,
      timestamp: delay
    };
  } else if (type === 'keyclick') {
    const { code, keyCode } = getKeyCodeFromChar(selectorOrKey);
    if (!code || keyCode === 0) {
      showCanvasPopup('无效的按键，请输入有效的按键字符');
      return;
    }
    const keydownAction = {
      type: 'keydown',
      code,
      char: selectorOrKey,
      keyCode,
      which: keyCode,
      timestamp: delay
    };
    const keyupAction = {
      type: 'keyup',
      code,
      char: selectorOrKey,
      keyCode,
      which: keyCode,
      timestamp: delay + 50 // 假设按下和弹起间隔 50ms，可按需调整
    };
    actionLog.push(keydownAction);
    actionLog.push(keyupAction);
    previewActions(); // 重新加载预览
    return;
  }

  if (newAction) {
    actionLog.push(newAction);
    groupedActions[type].push(newAction);
    previewActions(); // 重新加载预览
  }
});

// 为 1 毫秒和 1 秒按钮绑定事件
const add1msDelayBtn = popup.querySelector('#add-1ms-delay');
add1msDelayBtn.addEventListener('click', function () {
  const delayInput = popup.querySelector('#custom-action-delay');
  delayInput.value = 0.001;
});

const add1sDelayBtn = popup.querySelector('#add-1s-delay');
add1sDelayBtn.addEventListener('click', function () {
  const delayInput = popup.querySelector('#custom-action-delay');
  delayInput.value = 1;
});

const saveAndCloseBtn = popup.querySelector('#saveAndClosePreview');
saveAndCloseBtn.addEventListener('click', function () {
  if (popup && popup.parentNode) {
    document.body.removeChild(popup);
  }
  showCanvasPopup('操作记录已保存');
});

// 添加样式来确保对齐
const style = document.createElement('style');
style.textContent = `
 .align-start {
    padding-left: 0;
    margin-left: 0;
  }
 .button-row {
    list-style-type: none;
  }
 .help-text {
    font-size: 12px;
    color: #ccc;
    margin-top: 2px;
    margin-bottom: 5px;
  }
`;
document.head.appendChild(style);
}

// 根据字符获取按键码和 code
function getKeyCodeFromChar(char) {
  const charMap = {
    '0': { code: 'Digit0', keyCode: 48 },
    '1': { code: 'Digit1', keyCode: 49 },
    '2': { code: 'Digit2', keyCode: 50 },
    '3': { code: 'Digit3', keyCode: 51 },
    '4': { code: 'Digit4', keyCode: 52 },
    '5': { code: 'Digit5', keyCode: 53 },
    '6': { code: 'Digit6', keyCode: 54 },
    '7': { code: 'Digit7', keyCode: 55 },
    '8': { code: 'Digit8', keyCode: 56 },
    '9': { code: 'Digit9', keyCode: 57 },
    'w': { code: 'KeyW', keyCode: 87 },
    'a': { code: 'KeyA', keyCode: 65 },
    's': { code: 'KeyS', keyCode: 83 },
    'd': { code: 'KeyD', keyCode: 68 },
    'Enter': { code: 'Enter', keyCode: 13 }
  };
  return charMap[char] || { code: '', keyCode: 0 };
}

// 执行记录的操作
function playActions() {
  if (actionLog.length === 0) {
    showCanvasPopup('没有记录任何操作，请先记录操作或添加自定义操作。');
    return;
  }
  isPlaying = true;
  let currentLoop = 0;
  let index = 0;
  let playbackStartTime = Date.now();
  progressBarContainer.style.display = 'block'; // 显示进度条
  adjustProgressBarPosition(); // 调整进度条位置

  function loop() {
    if (!isPlaying) {
      return;
    }
    if (loopCount!== Infinity && currentLoop >= loopCount) {
      stopPlay();
      return;
    }
    if (index >= actionLog.length) {
      index = 0;
      currentLoop++;
      playbackStartTime = Date.now();
    }
    const action = actionLog[index];
    const elapsedTime = Date.now() - playbackStartTime;
    const delay = action.timestamp - elapsedTime;

    if (delay <= 0) {
      executeAction(action);
      index++;
      // 更新进度条
      const progress = (index + currentLoop * actionLog.length) / (loopCount === Infinity? actionLog.length : loopCount * actionLog.length) * 100;
      progressBar.style.width = `${progress}%`;
      loop();
    } else {
      setTimeout(() => {
        if (!isPlaying) {
          return;
        }
        executeAction(action);
        index++;
        // 更新进度条
        const progress = (index + currentLoop * actionLog.length) / (loopCount === Infinity? actionLog.length : loopCount * actionLog.length) * 100;
        progressBar.style.width = `${progress}%`;
        loop();
      }, delay);
    }
  }

  loop();
  showCanvasPopup('开始循环执行操作<br><br><span style="color: white;">严重警告：开始执行循环后，请将画面留一个小窗口，切记不可最小化，否则会导致坦克瞬移或自爆造成不必要的风险。</span>', true);
}

// 执行单个操作
function executeAction(action) {
  if (action.type === 'click') {
    const waitForElement = (selector, maxAttempts = 10, interval = 500) => {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const check = () => {
          const target = findElement(selector);
          if (target) {
            resolve(target);
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(check, interval);
          } else {
            reject(new Error(`未找到目标元素，选择器: ${selector}`));
          }
        };
        check();
      });
    };

    waitForElement(action.selector)
     .then(target => {
        try {
          target.focus();
          target.click();
          console.log(`执行点击操作，选择器: ${action.selector}`);
        } catch (error) {
          console.error(`点击操作出错，选择器: ${action.selector}，错误: ${error.message}`);
        }
      })
     .catch(error => {
        console.error(error.message);
      });
  } else if (action.type === 'input') {
    const target = findElement(action.selector);
    if (target) {
      target.value = action.value;
      target.dispatchEvent(new Event('input'));
      console.log(`执行输入操作，选择器: ${action.selector}，值: ${action.value}`);
    } else {
      console.log(`未找到目标元素，选择器: ${action.selector}，跳过此操作`);
    }
  } else if (action.type === 'keydown') {
    document.body.dispatchEvent(new KeyboardEvent('keydown', {
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      charCode: 0,
      ctrlKey: false,
      location: 0,
      code: action.code,
      char: action.char,
      key: action.char,
      shiftKey: false,
      keyCode: action.keyCode,
      which: action.which,
      repeat: false
    }));
    playingKeys.add(action.code);
    console.log(`执行 keydown 操作，按键: ${action.char}，code: ${action.code}`);
  } else if (action.type === 'keyup') {
    document.body.dispatchEvent(new KeyboardEvent('keyup', {
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      charCode: 0,
      ctrlKey: false,
      location: 0,
      code: action.code,
      char: action.char,
      key: action.char,
      shiftKey: false,
      keyCode: action.keyCode,
      which: action.which,
      repeat: false
    }));
    playingKeys.delete(action.code);
    console.log(`执行 keyup 操作，按键: ${action.char}，code: ${action.code}`);
  }
}

function findElement(selector) {
  let target = document.querySelector(selector);
  if (!target) {
    const iframes = document.querySelectorAll('iframe');
    for (let i = 0; i < iframes.length; i++) {
      try {
        const iframeDoc = iframes[i].contentDocument || iframes[i].contentWindow.document;
        target = iframeDoc.querySelector(selector);
        if (target) {
          break;
        }
      } catch (error) {
        console.error(`访问 iframe 时出错: ${error.message}`);
      }
    }
  }
  return target;
}

// 停止循环执行操作
function stopPlay() {
  isPlaying = false;
  // 模拟弹起所有正在按下的按键
  playingKeys.forEach(key => {
    document.body.dispatchEvent(new KeyboardEvent('keyup', {
      bubbles: true,
      cancelBubble: false,
      cancelable: true,
      charCode: 0,
      ctrlKey: false,
      location: 0,
      code: key,
      char: getKeyCharFromCode(key),
      key: getKeyCharFromCode(key),
      shiftKey: false,
      keyCode: getKeyCodeFromCode(key),
      which: getKeyCodeFromCode(key),
      repeat: false
    }));
    console.log(`模拟弹起按键，按键: ${getKeyCharFromCode(key)}，code: ${key}`);
  });
  playingKeys.clear();
  // 重置 `\` 键计数和状态
  backslashPressCount = 0;
  lastBackslashPressTime = 0;
  isBackslashPressed = false;
  // 移除事件监听（如果有必要）
  document.removeEventListener('click', recordClick);
  document.removeEventListener('input', recordInput);
  document.removeEventListener('keydown', recordKeydown);
  document.removeEventListener('keyup', recordKeyup);
  // 重新添加全局按键监听
  document.addEventListener('keydown', recordKeydown);
  document.addEventListener('keyup', recordKeyup);
  // 隐藏进度条
  progressBarContainer.style.display = 'none';
  // 重置进度条
  progressBar.style.width = '0%';
  showCanvasPopup('停止循环执行操作');
}

// 根据 code 获取按键字符
function getKeyCharFromCode(code) {
  const codeMap = {
    'Digit0': '0',
    'Digit1': '1',
    'Digit2': '2',
    'Digit3': '3',
    'Digit4': '4',
    'Digit5': '5',
    'Digit6': '6',
    'Digit7': '7',
    'Digit8': '8',
    'Digit9': '9',
    'KeyW': 'w',
    'KeyA': 'a',
    'KeyS': 's',
    'KeyD': 'd',
    'Enter': 'Enter'
  };
  return codeMap[code] || '';
}

// 根据 code 获取按键码
function getKeyCodeFromCode(code) {
  const codeMap = {
    'Digit0': 48,
    'Digit1': 49,
    'Digit2': 50,
    'Digit3': 51,
    'Digit4': 52,
    'Digit5': 53,
    'Digit6': 54,
    'Digit7': 55,
    'Digit8': 56,
    'Digit9': 57,
    'KeyW': 87,
    'KeyA': 65,
    'KeyS': 83,
    'KeyD': 68,
    'Enter': 13
  };
  return codeMap[code] || 0;
}

// 导出操作到本地
function saveActions() {
  const jsonData = JSON.stringify(actionLog);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Club.json';
  a.click();
  URL.revokeObjectURL(url);
  showCanvasPopup('操作已导出为 Club.json');
}

// 导入操作
function importActions() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const importedActions = JSON.parse(e.target.result);
          actionLog = importedActions;
          showCanvasPopup('操作导入成功');
        } catch (error) {
          console.error('导入操作失败:', error);
          showCanvasPopup('导入操作失败，请检查文件格式');
        }
      };
      reader.readAsText(file);
    }
  });
  input.click();
}

// 切换按钮可见性
function toggleButtonsVisibility() {
  const buttons = [startRecordBtn, stopRecordBtn, startPlayBtn, stopPlayBtn, saveActionsBtn, importActionsBtn, previewActionsBtn, hideCanvasBtn, developerBtn];
  buttons.forEach(button => {
    button.style.display = button.style.display === 'none'? 'block' : 'none';
  });
}

// 显示开发人员信息提示框
function showDeveloperInfo() {
  // 先移除之前的开发人员信息弹窗
  const existingDeveloperPopup = document.querySelector('.developer-popup');
  if (existingDeveloperPopup) {
    document.body.removeChild(existingDeveloperPopup);
  }

  // 假设这是 QQ 推广链接，你可以根据实际情况替换
  const qqLink = 'tencent://message/?uin=2084219003&Site=&Menu=yes';
  const developerInfoHtml = `
    <p>尊敬的用户！ 欢迎您使用脚本系统 <br>
    开发人员联系方式：<a href="${qqLink}" target="_blank">QQ 2084219003</a><br>
    如果您有更好的建议请随时与我们联系，我们会进行判断和采纳更新。<br>
      注意事项：<br>
    1.当您在战场执行操作移动类操作时，请在开始录制后点击一次游戏画面再进行操作<br>
    2.请不要连续点击开始循环，避免造成重复运行导致回放速度过快而引发无法返回上一级的错误<br>
    3.请一定不要在后台运行战场内的移动脚本。经过测试如果您将窗口最小化（即浏览器右上角的"一"按钮），并且游戏执行着移动脚本，则会导致瞬移和自爆。您在其他页面时，须要将执行脚本的页面留出一个空间，以保证不会完全进入后台休眠移动。<br>
    免责声明：<br>
    此脚本以学习为目的，因使用脚本出现的任何问题（例如账号明显使用脚本导致的封禁等），与作者无关，用户应该自行承担。否则请立刻删除该脚本。您使用此脚本即代表您同意此协议，并且知晓存在的风险。<br>
    1.1.0 更新列表：<br>
    1.添加隐藏画布的选项，提高帧数，防止多开眩目。<br>
    2.对操作预览再次更新，目前用户可以通过自行编写脚本内容，提高脚本的可玩性。</p>
    1.0.9 更新列表：<br>
    1.添加可视化操作预览，用户可以自行查看录制或导入的操作。<br>
    <button id="closeDeveloperInfo" style="padding: 10px 20px; font-size: 16px; font-family: Arial, sans-serif; border: none; border-radius: 5px; background-color: #007BFF; color: white; cursor: pointer; margin-top: 1em;">知道了</button>
  `;
  const popup = showCanvasPopup(developerInfoHtml, false, false, false, true);
  popup.classList.add('developer-popup'); // 添加类名以便后续识别

  const closeDeveloperInfoBtn = popup.querySelector('#closeDeveloperInfo');
  closeDeveloperInfoBtn.addEventListener('click', function () {
    if (popup && popup.parentNode) {
      document.body.removeChild(popup);
    }
  });
}

// 新增：切换画布可见性的函数
function toggleCanvasVisibility() {
  const canvasElements = document.getElementsByTagName('canvas');
  if (canvasElements.length === 0) {
    showCanvasPopup('没找到 canvas 元素');
    return;
  }
  isHidden =!isHidden; // 切换隐藏状态
  if (isHidden) {
    showCanvasPopup('已隐藏符合条件的 canvas 元素');
    console.log('已隐藏符合条件的 canvas 元素');
  } else {
    showCanvasPopup('已恢复符合条件的 canvas 元素显示');
    console.log('已恢复符合条件的 canvas 元素显示');
  }
  // 立即执行查找和处理操作，以响应点击操作
  checkAndHandleCanvasElements();
}

// 新增：查找并处理 canvas 元素的函数
function checkAndHandleCanvasElements() {
  const canvasElements = document.getElementsByTagName('canvas');
  for (let i = 0; i < canvasElements.length; i++) {
    const canvas = canvasElements[i];
    if (isHidden) {
      canvas.style.display = 'none';
    } else {
      canvas.style.display = 'block';
    }
  }
}

// 监听页面可见性变化
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === 'hidden') {
    // 页面最小化或不可见时，可尝试保持活跃
    // 这里可以添加一些定时任务，尽量让页面保持运行状态
    if (isPlaying) {
      // 简单示例：每隔一段时间触发一个空函数，防止浏览器过度休眠
      let intervalId = setInterval(() => {}, 100);
      document.addEventListener('visibilitychange', function checkVisibility() {
        if (document.visibilityState === 'visible') {
          clearInterval(intervalId);
          document.removeEventListener('visibilitychange', checkVisibility);
        }
      });
    }
  }
});

// 监听全局按键事件
document.addEventListener('keydown', recordKeydown);
document.addEventListener('keyup', recordKeyup);

// 初始根据窗口大小设置按钮文字显示状态及按键相关状态
const initialButtons = [startRecordBtn, stopRecordBtn, startPlayBtn, stopPlayBtn, saveActionsBtn, importActionsBtn, previewActionsBtn, hideCanvasBtn, developerBtn];
const initialTextElements = document.querySelectorAll('button .text');
if (window.innerWidth < 800) {
  initialTextElements.forEach(text => {
    text.style.display = 'none';
  });
  initialButtons.forEach(button => {
    button.style.padding = '10px';
  });
  backslashPressCount = 0;
  lastBackslashPressTime = 0;
  isBackslashPressed = false;
  document.addEventListener('keydown', recordKeydown);
  document.addEventListener('keyup', recordKeyup);
} else {
  initialTextElements.forEach(text => {
    text.style.display = 'inline';
  });
  initialButtons.forEach(button => {
    button.style.padding = '10px 20px';
  });
  backslashPressCount = 0;
  lastBackslashPressTime = 0;
  isBackslashPressed = false;
  document.addEventListener('keydown', recordKeydown);
  document.addEventListener('keyup', recordKeyup);
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (window.innerWidth < 800) {
    initialTextElements.forEach(text => {
      text.style.display = 'none';
    });
    initialButtons.forEach(button => {
      button.style.padding = '10px';
    });
  } else {
    initialTextElements.forEach(text => {
      text.style.display = 'inline';
    });
    initialButtons.forEach(button => {
      button.style.padding = '10px 20px';
    });
  }
  adjustProgressBarPosition();
});

})();