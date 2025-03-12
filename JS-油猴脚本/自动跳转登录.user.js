// ==UserScript==
// @name         安逸￥屏蔽词￥取消记住密码￥绿色特供版
// @version      1.0.0
// @author       Arc
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/自动跳转登录.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/自动跳转登录.user.js
// @match        https://3dtank.com/play/
// @match        https://game.4399iw2.com/yxtk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// ==/UserScript==
(function() {
    'use strict';

    let observer;
    const GLOBAL_TIMEOUT = 20000; // 全局超时时间设置为20秒
    let intervals = []; // 存储所有 setInterval 的 ID
    let isTerminated = false; // 标记脚本是否已终止

    // 全局超时检查器
    function startGlobalTimeout(resolve) {
        const timeoutId = setTimeout(() => {
            console.log('脚本执行超过20秒，自动结束');
            terminateScript();
            resolve(); // 结束主流程
        }, GLOBAL_TIMEOUT);
        return timeoutId;
    }

    // 清除全局超时
    function clearGlobalTimeout(timeoutId) {
        clearTimeout(timeoutId);
        console.log('全局超时已清除');
    }

    // 清理所有任务并终止脚本
    function terminateScript() {
        if (isTerminated) return;
        isTerminated = true;

        // 清除所有 setInterval
        intervals.forEach(intervalId => clearInterval(intervalId));
        intervals = [];
        console.log('所有 setInterval 已清理');

        // 关闭 MutationObserver
        if (observer) {
            observer.disconnect();
            observer = null;
            console.log('MutationObserver 已关闭');
        }
    }

    // 查找并点击第一个登录按钮
    function waitForFirstLoginButton() {
        return new Promise((resolve) => {
            if (isTerminated) return resolve();
            const checkInterval = setInterval(() => {
                if (isTerminated) {
                    clearInterval(checkInterval);
                    return resolve();
                }
                console.log('检查第一个登录按钮...');
                let loginButtons = document.querySelectorAll('.RoundBigButtonComponentStyle-innerCircle');
                let clickableButton = null;

                loginButtons.forEach(button => {
                    const style = window.getComputedStyle(button);
                    const isVisible = style.opacity !== '0' && style.display !== 'none' && style.visibility !== 'hidden';
                    const isEnabled = !button.hasAttribute('disabled');
                    if (isVisible && isEnabled) {
                        clickableButton = button;
                        console.log('找到可点击的第一个登录按钮:', clickableButton);
                    }
                });

                if (clickableButton) {
                    console.log('点击第一个登录按钮...', clickableButton);
                    clickableButton.click();
                    clearInterval(checkInterval);
                    intervals = intervals.filter(id => id !== checkInterval);
                    resolve();
                }
            }, 500);
            intervals.push(checkInterval);
        });
    }

    // 查找并点击第二个登录按钮
    function waitForSecondLoginButton() {
        return new Promise((resolve) => {
            if (isTerminated) return resolve();
            const checkInterval = setInterval(() => {
                if (isTerminated) {
                    clearInterval(checkInterval);
                    return resolve();
                }
                console.log('检查第二个登录按钮...');
                let loginButtons = document.querySelectorAll('.RoundBigButtonComponentStyle-innerCircle');
                let clickableButton = null;

                loginButtons.forEach(button => {
                    const style = window.getComputedStyle(button);
                    const hasAuthIcon = button.querySelector('img[src*="/play/static/images/authorization.fbedcc5e.svg"]');
                    const isVisible = style.opacity !== '0' && style.display !== 'none' && style.visibility !== 'hidden';
                    const isEnabled = !button.hasAttribute('disabled');
                    if (hasAuthIcon && isVisible && isEnabled) {
                        clickableButton = button;
                        console.log('找到可点击的第二个登录按钮:', clickableButton);
                    }
                });

                if (clickableButton) {
                    console.log('点击第二个登录按钮...', clickableButton);
                    clickableButton.click();
                    clearInterval(checkInterval);
                    intervals = intervals.filter(id => id !== checkInterval);
                    resolve();
                }
            }, 500);
            intervals.push(checkInterval);
        });
    }

    // 等待页面跳转并显示表单（不自动配置）
    function waitForFormDisplay() {
        return new Promise((resolve) => {
            if (isTerminated) return resolve();
            const maxWaitTime = 10000; // 局部最大等待时间仍为10秒
            let elapsedTime = 0;
            const checkInterval = setInterval(() => {
                if (isTerminated) {
                    clearInterval(checkInterval);
                    return resolve();
                }
                elapsedTime += 500;
                let loginForm = document.querySelector('input[type="text"], input[type="password"]');
                console.log(`检查登录表单... 耗时: ${elapsedTime}ms, 找到表单: ${!!loginForm}`);

                if (loginForm) {
                    console.log('登录表单已显示，请手动输入:', loginForm);
                    clearInterval(checkInterval);
                    intervals = intervals.filter(id => id !== checkInterval);
                    resolve();
                } else if (elapsedTime >= maxWaitTime) {
                    console.log('表单加载超时，当前可见输入框:', document.querySelectorAll('input'));
                    clearInterval(checkInterval);
                    intervals = intervals.filter(id => id !== checkInterval);
                    resolve();
                }
            }, 500);
            intervals.push(checkInterval);
        });
    }

    // 主流程
    (async function() {
        console.log('脚本启动，查找第一个登录按钮...');
        return new Promise((resolve) => {
            const globalTimeoutId = startGlobalTimeout(resolve); // 启动全局20秒超时

            Promise.resolve()
                .then(() => waitForFirstLoginButton())
                .then(() => {
                    if (isTerminated) return;
                    console.log('第一个登录按钮点击完成，查找第二个登录按钮...');
                    return waitForSecondLoginButton();
                })
                .then(() => {
                    if (isTerminated) return;
                    console.log('第二个登录按钮点击完成，等待表单显示...');
                    return waitForFormDisplay();
                })
                .then(() => {
                    if (isTerminated) return;
                    console.log('登录界面已准备好，请手动输入');
                    clearGlobalTimeout(globalTimeoutId); // 成功完成，清除超时
                    terminateScript(); // 主动清理所有任务
                    resolve();
                })
                .catch((error) => {
                    console.error('脚本执行出错:', error);
                    clearGlobalTimeout(globalTimeoutId);
                    terminateScript();
                    resolve();
                });
        });
    })();

    // 初始化并监听DOM变化
    observer = new MutationObserver((mutations) => {
        if (isTerminated) return;
        let loginForm = document.querySelector('input[type="text"], input[type="password"]');
        if (loginForm) {
            console.log('检测到登录表单:', loginForm);
            observer.disconnect();
            observer = null;
            console.log('MutationObserver 已关闭');
        }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    // 确保Service Worker不干扰
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(reg => reg.unregister());
            console.log('Service Worker 已禁用');
        });
    }
})();