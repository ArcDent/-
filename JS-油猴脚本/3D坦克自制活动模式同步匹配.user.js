// ==UserScript==
// @name         3D坦克自制活动模式同步匹配
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  3D坦克活动模式同步匹配，检测节日模式窗口并支持定时匹配
// @author       Mod
// @match        https://3dtank.com/play/*
// @match        http://3dtank.com/play/*
// @match        https://game.4399iw2.com/yxtk/*
// @match        http://game.4399iw2.com/yxtk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let selectedMatchTime = null;
    let intervalId = null;
    let is24HourFormat = true;
    let lastCheckTime = 0;
    let isMatching = false;
    let currentStatus = '';
    let isDarkMode = false;

    function createFloatingWindow() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn { from { opacity: 0; transform: translate(-50%, -60%); } to { opacity: 1; transform: translate(-50%, -50%); } }
            @keyframes fadeOut { from { opacity: 1; transform: translate(-50%, -50%); } to { opacity: 0; transform: translate(-50%, -60%); } }
            @keyframes fadeInPicker { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes fadeOutPicker { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(10px); } }
            @keyframes flipNumber { 0% { transform: translateY(0); } 50% { transform: translateY(-100%); } 51% { transform: translateY(100%); } 100% { transform: translateY(0); } }
            #floatingWindow { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); padding: 20px; border-radius: 15px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); z-index: 9999; width: 320px; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; animation: fadeIn 0.5s ease-out forwards; border: 1px solid rgba(255, 255, 255, 0.3); transition: background 0.3s ease, color 0.3s ease; }
            #floatingWindow.dark { background: rgba(30, 30, 30, 0.95); border: 1px solid rgba(255, 255, 255, 0.1); color: #e0e0e0; }
            #floatingWindow.closing { animation: fadeOut 0.5s ease-in forwards; }
            #externalStatusText { position: absolute; top: -30px; left: 0; background: rgba(0, 0, 0, 0.7); color: #fff; padding: 5px 10px; border-radius: 5px; font-size: 14px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); }
            #beijingTimeDisplay, .time-picker-label { color: #333; font-size: 14px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); }
            #floatingWindow.dark #beijingTimeDisplay, #floatingWindow.dark .time-picker-label { color: #e0e0e0; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); }
            #beijingTimeDisplay { margin-right: 10px; }
            .toggle-container { display: flex; align-items: center; }
            .toggle-switch { width: 40px; height: 20px; background-color: #d9d9d9; border-radius: 10px; position: relative; cursor: pointer; transition: background-color 0.3s ease; }
            .toggle-switch.active { background-color: #1890ff; }
            .toggle-circle { width: 16px; height: 16px; background-color: #fff; border-radius: 50%; position: absolute; top: 2px; left: 2px; transition: left 0.3s ease; }
            .toggle-circle.active { left: 22px; }
            .toggle-label { margin-left: 10px; font-size: 12px; color: #666; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); }
            #floatingWindow.dark .toggle-label { color: #b0b0b0; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); }
            .time-picker-label { display: block; margin-bottom: 5px; }
            .time-picker-container { display: flex; gap: 5px; margin-bottom: 10px; align-items: center; animation: fadeInPicker 0.5s ease-out forwards; }
            .time-picker-container.closing { animation: fadeOutPicker 0.5s ease-in forwards; }
            .time-picker-container select, .time-picker-container input { padding: 5px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px; transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease; }
            #floatingWindow.dark .time-picker-container select, #floatingWindow.dark .time-picker-container input { background: #333; color: #e0e0e0; border-color: #555; }
            .time-picker-container select:focus, .time-picker-container input:focus { border-color: #1890ff; outline: none; }
            .time-picker-container input { width: 80px; text-align: center; margin-left: 10px; }
            #countdownDisplay { margin-top: 5px; font-size: 12px; color: #666; text-align: center; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); display: flex; justify-content: center; align-items: center; }
            #floatingWindow.dark #countdownDisplay { color: #b0b0b0; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); }
            #countdownDisplay .countdown-digit { display: inline-block; width: 16px; height: 20px; line-height: 20px; position: relative; overflow: hidden; color: #40c4ff !important; font-family: monospace; text-align: center; }
            #floatingWindow.dark #countdownDisplay .countdown-digit { color: #b0b0b0 !important; }
            #countdownDisplay .countdown-digit span { display: block; position: absolute; width: 100%; text-align: center; color: #40c4ff !important; font-family: monospace; }
            #floatingWindow.dark #countdownDisplay .countdown-digit span { color: #b0b0b0 !important; }
            #countdownDisplay .countdown-digit .flip { animation: flipNumber 0.5s ease-in-out forwards; }
            #countdownDisplay .countdown-colon { display: inline-block; width: 8px; text-align: center; color: #666; }
            #floatingWindow.dark #countdownDisplay .countdown-colon { color: #b0b0b0; }
            button { padding: 8px 15px; border: none; border-radius: 5px; color: white; cursor: pointer; font-size: 14px; transition: transform 0.1s ease, box-shadow 0.3s ease; width: 100%; margin-top: 10px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }
            button:hover { transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); }
            button:active { transform: translateY(0); box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); }
            #startMatchButton { background: linear-gradient(45deg, #1890ff, #40c4ff); }
            #cancelMatchButton { background: linear-gradient(45deg, #ff4d4f, #ff7875); }
            .theme-toggle { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; background: #f0f0f0; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 -2px 5px rgba(0, 0, 0, 0.1); cursor: pointer; transition: background 0.3s ease, transform 0.3s ease; display: flex; align-items: center; justify-content: center; }
            #floatingWindow.dark .theme-toggle { background: #333; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5), inset 0 -2px 5px rgba(255, 255, 255, 0.1); }
            .theme-toggle:hover { transform: scale(1.1); }
            .theme-icon { font-size: 18px; transition: opacity 0.3s ease, transform 0.3s ease; }
            .theme-icon.sun { opacity: 1; transform: rotate(0deg); }
            .theme-icon.moon { opacity: 0; transform: rotate(-90deg); position: absolute; }
            .theme-toggle.dark .theme-icon.sun { opacity: 0; transform: rotate(90deg); }
            .theme-toggle.dark .theme-icon.moon { opacity: 1; transform: rotate(0deg); }
        `;
        document.head.appendChild(style);

        const div = document.createElement('div');
        div.id = 'floatingWindow';

        const externalStatusDiv = document.createElement('div');
        externalStatusDiv.id = 'externalStatusText';
        div.appendChild(externalStatusDiv);

        const themeToggle = document.createElement('div');
        themeToggle.className = 'theme-toggle';
        const sunIcon = document.createElement('span');
        sunIcon.className = 'theme-icon sun';
        sunIcon.textContent = '☀️';
        const moonIcon = document.createElement('span');
        moonIcon.className = 'theme-icon moon';
        moonIcon.textContent = '🌙';
        themeToggle.appendChild(sunIcon);
        themeToggle.appendChild(moonIcon);

        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            div.classList.toggle('dark');
            themeToggle.classList.toggle('dark');
        });

        div.appendChild(themeToggle);

        const timeContainer = document.createElement('div');
        timeContainer.style.display = 'flex';
        timeContainer.style.alignItems = 'center';
        timeContainer.style.marginBottom = '15px';

        const timeDiv = document.createElement('div');
        timeDiv.id = 'beijingTimeDisplay';

        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'toggle-container';

        const toggleSwitch = document.createElement('div');
        toggleSwitch.className = 'toggle-switch';
        if (is24HourFormat) toggleSwitch.classList.add('active');

        const toggleCircle = document.createElement('div');
        toggleCircle.className = 'toggle-circle';
        if (is24HourFormat) toggleCircle.classList.add('active');

        toggleSwitch.appendChild(toggleCircle);
        toggleContainer.appendChild(toggleSwitch);

        const toggleLabel = document.createElement('span');
        toggleLabel.className = 'toggle-label';
        toggleLabel.textContent = '12/24小时制';

        toggleContainer.appendChild(toggleLabel);

        toggleSwitch.addEventListener('click', () => {
            is24HourFormat = !is24HourFormat;
            toggleSwitch.classList.toggle('active');
            toggleCircle.classList.toggle('active');
            updateTimeDisplay(timeDiv);
            updateTimePicker();
        });

        timeContainer.appendChild(timeDiv);
        timeContainer.appendChild(toggleContainer);
        div.appendChild(timeContainer);

        setInterval(() => updateTimeDisplay(timeDiv), 1000);

        const timePickerLabel = document.createElement('label');
        timePickerLabel.className = 'time-picker-label';
        timePickerLabel.textContent = '选择匹配时间 (北京时间):';

        const timePickerContainer = document.createElement('div');
        timePickerContainer.className = 'time-picker-container';

        const hourSelect = document.createElement('select');
        const minuteSelect = document.createElement('select');
        const secondSelect = document.createElement('select');
        const ampmSelect = document.createElement('select');

        function updateHourOptions() {
            hourSelect.innerHTML = '';
            if (is24HourFormat) {
                for (let i = 0; i < 24; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i.toString().padStart(2, '0');
                    hourSelect.appendChild(option);
                }
                ampmSelect.style.display = 'none';
            } else {
                for (let i = 1; i <= 12; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i.toString().padStart(2, '0');
                    hourSelect.appendChild(option);
                }
                ampmSelect.style.display = 'inline-block';
            }
        }

        for (let i = 0; i < 60; i++) {
            const optionMin = document.createElement('option');
            optionMin.value = i;
            optionMin.textContent = i.toString().padStart(2, '0');
            minuteSelect.appendChild(optionMin);

            const optionSec = document.createElement('option');
            optionSec.value = i;
            optionSec.textContent = i.toString().padStart(2, '0');
            secondSelect.appendChild(optionSec);
        }

        ampmSelect.innerHTML = '<option value="AM">AM</option><option value="PM">PM</option>';
        ampmSelect.style.display = 'none';

        const manualInput = document.createElement('input');
        manualInput.type = 'text';
        manualInput.value = '00:00:00';
        manualInput.style.marginLeft = '10px';

        manualInput.addEventListener('click', () => {
            if (manualInput.value === '00:00:00') manualInput.value = '';
        });

        manualInput.addEventListener('change', () => {
            let timeValue = manualInput.value.replace(/[^0-9]/g, '');
            if (timeValue.length > 6) timeValue = timeValue.slice(0, 6);
            while (timeValue.length < 6) timeValue = '0' + timeValue;

            const hours = parseInt(timeValue.slice(0, 2));
            const minutes = parseInt(timeValue.slice(2, 4));
            const seconds = parseInt(timeValue.slice(4, 6));

            if (hours > 23 || minutes > 59 || seconds > 59) {
                alert('请输入有效的时间 (HHMMSS)，例如 043030 表示 04:30:30');
                manualInput.value = '00:00:00';
                return;
            }

            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            manualInput.value = formattedTime;

            hourSelect.value = hours;
            minuteSelect.value = minutes;
            secondSelect.value = seconds;
            if (!is24HourFormat) {
                ampmSelect.value = hours >= 12 ? 'PM' : 'AM';
                hourSelect.value = hours % 12 || 12;
            }
        });

        function updateTimePicker() {
            updateHourOptions();
        }

        updateTimePicker();

        timePickerContainer.appendChild(hourSelect);
        timePickerContainer.appendChild(document.createTextNode(':'));
        timePickerContainer.appendChild(minuteSelect);
        timePickerContainer.appendChild(document.createTextNode(':'));
        timePickerContainer.appendChild(secondSelect);
        timePickerContainer.appendChild(ampmSelect);
        timePickerContainer.appendChild(manualInput);

        const countdownDiv = document.createElement('div');
        countdownDiv.id = 'countdownDisplay';
        let lastHours = '', lastMinutes = '', lastSeconds = '';

        function updateCountdownDisplay(hours, minutes, seconds) {
            if (hours === lastHours && minutes === lastMinutes && seconds === lastSeconds) return;

            countdownDiv.innerHTML = '倒计时: ';
            const digits = [
                { value: hours, last: lastHours },
                { value: ':', last: ':' },
                { value: minutes, last: lastMinutes },
                { value: ':', last: ':' },
                { value: seconds, last: lastSeconds }
            ];

            digits.forEach(digit => {
                const digitSpan = document.createElement('span');
                if (digit.value === ':') {
                    digitSpan.className = 'countdown-colon';
                    digitSpan.textContent = ':';
                } else {
                    digitSpan.className = 'countdown-digit';
                    const innerSpan = document.createElement('span');
                    innerSpan.textContent = digit.value;
                    if (digit.value !== digit.last) innerSpan.classList.add('flip');
                    digitSpan.appendChild(innerSpan);
                }
                countdownDiv.appendChild(digitSpan);
            });

            lastHours = hours;
            lastMinutes = minutes;
            lastSeconds = seconds;
        }

        const startButton = document.createElement('button');
        startButton.id = 'startMatchButton';
        startButton.textContent = '开始运行同时匹配';
        startButton.style.display = 'block';

        const cancelButton = document.createElement('button');
        cancelButton.id = 'cancelMatchButton';
        cancelButton.textContent = '取消同时匹配';
        cancelButton.style.display = 'none';

        startButton.addEventListener('click', () => {
            let hours = parseInt(hourSelect.value);
            const minutes = parseInt(minuteSelect.value);
            const seconds = parseInt(secondSelect.value);

            if (!is24HourFormat) hours = ampmSelect.value === 'PM' ? (hours % 12) + 12 : hours % 12;

            const now = getBeijingTime();
            selectedMatchTime = new Date(now);
            selectedMatchTime.setHours(hours, minutes, seconds, 0);

            if (selectedMatchTime < now) selectedMatchTime.setDate(selectedMatchTime.getDate() + 1);

            console.log('选择的匹配时间:', selectedMatchTime.toLocaleString('zh-CN'));
            console.log('当前时间:', now.toLocaleString('zh-CN'));

            if (intervalId) clearInterval(intervalId);

            intervalId = setInterval(() => {
                const currentTime = getBeijingTime();
                console.log('当前时间:', currentTime.toLocaleString('zh-CN'), '目标时间:', selectedMatchTime.toLocaleString('zh-CN'));

                const timeDiff = selectedMatchTime.getTime() - currentTime.getTime();
                if (timeDiff > 0) {
                    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60)).toString().padStart(2, '0');
                    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                    const secondsLeft = Math.floor((timeDiff % (1000 * 60)) / 1000).toString().padStart(2, '0');
                    updateCountdownDisplay(hoursLeft, minutesLeft, secondsLeft);
                } else {
                    updateCountdownDisplay('00', '00', '00');
                    countdownDiv.textContent = '已到达匹配时间';
                    isMatching = true;
                    checkMatchWindow();
                    clearInterval(intervalId);
                    intervalId = null;
                    startButton.style.display = 'block';
                    cancelButton.style.display = 'none';

                    selectedMatchTime.setDate(selectedMatchTime.getDate() + 1);
                    console.log('下一次匹配时间:', selectedMatchTime.toLocaleString('zh-CN'));
                }
            }, 1000);

            showStatus('已启动定时匹配', 'blue');
            startButton.style.display = 'none';
            cancelButton.style.display = 'block';
        });

        cancelButton.addEventListener('click', () => {
            if (intervalId) clearInterval(intervalId);
            intervalId = null;
            countdownDiv.textContent = '';
            showStatus('已取消定时匹配', 'red');
            startButton.style.display = 'block';
            cancelButton.style.display = 'none';
        });

        div.appendChild(timePickerLabel);
        div.appendChild(timePickerContainer);
        div.appendChild(countdownDiv);
        div.appendChild(startButton);
        div.appendChild(cancelButton);
        document.body.appendChild(div);

        checkMatchWindow();
    }

    function updateTimeDisplay(timeDiv) {
        const beijingTime = getBeijingTime();
        timeDiv.textContent = '北京时间: ' + beijingTime.toLocaleString('zh-CN', {
            hour12: !is24HourFormat,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    function showStatus(message, color) {
        const statusDiv = document.getElementById('externalStatusText');
        if (statusDiv && currentStatus !== message) {
            currentStatus = message;
            statusDiv.textContent = message;
            statusDiv.style.color = color;
        }
    }

    function checkMatchWindow() {
        const now = Date.now();
        if (now - lastCheckTime < 500) return;
        lastCheckTime = now;

        const targetElement = Array.from(document.querySelectorAll('div.BattlePickComponentStyle-descriptionBattle')).find(el => {
            const hasHolidayText = el.innerHTML.includes('节日模式');
            const parent = el.closest('.BattlePickComponentStyle-commonStyleBlock.cardImgEvents');
            const hasTimerButton = parent && parent.querySelector('.BattlePickComponentStyle-timerButton');
            const isVisible = parent && parent.offsetParent !== null;
            return hasHolidayText && hasTimerButton && isVisible;
        });

        if (targetElement) {
            console.log('找到目标元素:', targetElement);
            showStatus('已准备完成', 'green');

            if (isMatching) {
                const parentCard = targetElement.closest('.BattlePickComponentStyle-commonStyleBlock.cardImgEvents');
                if (parentCard) {
                    console.log('自动点击节日模式卡片:', parentCard);
                    parentCard.click();
                    isMatching = false;
                    showStatus('已自动点击匹配', 'green');
                } else {
                    console.log('未找到可点击的节日模式卡片');
                    showStatus('自动点击失败', 'red');
                }
            }
        } else {
            console.log('未找到目标节日模式窗口');
            showStatus('初始化未成功，请查询是否打开匹配窗口', 'red');
        }
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Insert') {
            const existingWindow = document.getElementById('floatingWindow');
            if (!existingWindow) {
                createFloatingWindow();
            } else {
                existingWindow.classList.add('closing');
                existingWindow.addEventListener('animationend', () => existingWindow.remove());
            }
        }
    });

    function getBeijingTime() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        return new Date(utc + (8 * 60 * 60000));
    }

    new MutationObserver(mutations => {
        if (mutations.some(mutation => mutation.addedNodes.length)) {
            console.log('检测到页面变化，重新检查节日模式窗口');
            checkMatchWindow();
        }
    }).observe(document.body, { childList: true, subtree: true });
})();