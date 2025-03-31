// ==UserScript==
// @name         3D坦克会话劫持（4399渠道服）
// @namespace    http://tampermonkey.net/
// @version      2.0.2
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/49网页Token&Cookie纵向对比.user.js
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/49网页Token&Cookie纵向对比.user.js
// @description  手动测试旧凭证，改密码后验证
// @author       Mod
// @match        https://my.4399.com/yxtk/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log("脚本注入成功，锁定4399渠道服");

    let initialCreds = null;

    async function stealCredentials() {
        const cookies = document.cookie;
        const mywebAuth = (cookies.match(/myweb_auth=([^;]+)/) || [])[1] || 'none';
        let ssoToken = 'none';
        try {
            const response = await fetch('https://my.4399.com/webgame/home/sso-ajaxGetToken?_AJAX_=1&type=play&rand=' + Math.random(), {
                method: 'GET',
                credentials: 'include',
                headers: { 'Accept': 'application/json' }
            });
            const result = await response.json();
            ssoToken = result.data?.token || 'none';
            console.log("当前 SSO 响应：", result);
        } catch (e) {
            console.log("抓 SSO token 失败：", e);
        }
        const creds = { cookies, mywebAuth, ssoToken };
        console.log("偷到当前凭证：", creds);
        return creds;
    }

    async function testCredentials(creds, label) {
        console.log(`测试${label}凭证...`);

        if (creds.mywebAuth !== 'none') {
            try {
                const response = await fetch('https://my.4399.com/webgame/home/sso-ajaxGetToken?_AJAX_=1&type=play&rand=' + Math.random(), {
                    method: 'GET',
                    headers: { 'Cookie': `myweb_auth=${creds.mywebAuth}` },
                    credentials: 'include'
                });
                const result = await response.json();
                if (result.status > 0 && result.data?.token) {
                    console.log(`${label} myweb_auth 有效，SSO token：`, result.data.token);
                } else {
                    console.log(`${label} myweb_auth 无效，返回：`, result);
                }
            } catch (e) {
                console.log(`${label} myweb_auth 测试失败：`, e);
            }
        }

        if (creds.ssoToken !== 'none') {
            try {
                const response = await fetch(`https://my.4399.com/yxtk/?token=${creds.ssoToken}`, {
                    method: 'GET'
                });
                if (response.ok) {
                    const text = await response.text();
                    if (!text.includes("login") && !text.includes("登录")) {
                        console.log(`${label} SSO token 有效，页面访问成功`);
                    } else {
                        console.log(`${label} SSO token 无效，跳转登录页面`);
                    }
                } else {
                    console.log(`${label} SSO token 无效，状态码：`, response.status);
                }
            } catch (e) {
                console.log(`${label} SSO token 测试失败：`, e);
            }
        }
    }

    window.testOldCreds = async function() {
        if (!initialCreds) {
            initialCreds = await stealCredentials();
            console.log("已保存初始凭证，请改密码后再次调用 window.testOldCreds()");
        } else {
            console.log("测试改密码后的旧凭证...");
            await testCredentials(initialCreds, "旧");
            const currentCreds = await stealCredentials();
            await testCredentials(currentCreds, "当前");
        }
    };

    console.log("脚本加载完成，目标：https://my.4399.com/yxtk/");
    console.log("请登录后在控制台输入 window.testOldCreds() 获取初始凭证，改密码后再输入一次测试");
})();
