// ==UserScript==
// @name         呼出客服++复制ID团标
// @namespace    http://tampermonkey.net/
// @version      1.2.1
// @description  快速呼出客服/复制游戏ID/复制军团标，优化操作体验 已坠机
// @author       Arc
// @match        https://tankionline.com/*
// @match        https://3dtank.com/play/*
// @match        *://*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    /* 全局配置 */
    const SELECTORS = {
        modalRoot: "#modal-root",
        targetElement: "#modal-root > div > div > div:nth-child(5)",
        usernameElement: "#modal-root > div > div > div.ContextMenuStyle-menuItem.ContextMenuStyle-menuItemRank > div > div > div > span"
    };

    /* 全局状态 */
    let clonedElements = new Set();
    let modalRoot;

    /* 通用功能模块 */
    function showNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.textContent = message;
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            backgroundColor: isSuccess ? 'rgba(0, 128, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)',
            color: '#fff',
            borderRadius: '5px',
            zIndex: '9999',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            opacity: '0',
            transition: 'opacity 0.3s ease-in-out'
        });

        document.body.appendChild(notification);

        setTimeout(() => notification.style.opacity = '1', 10);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function extractGameInfo(username) {
        const clanTagMatch = username.match(/^(\[[^\]]+\])/);
        return {
            clanTag: clanTagMatch ? clanTagMatch[1] : '',
            gameID: username.replace(clanTagMatch ? clanTagMatch[0] : '', '').trim()
        };
    }

    /* 客服模块 */
    function createServiceButton(text, url) {
        const button = document.createElement('span');
        button.textContent = text;
        Object.assign(button.style, {
            display: 'inline-block',
            width: '50%',
            textAlign: 'center',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        });

        button.addEventListener('click', () => {
            const usernameElement = document.querySelector(SELECTORS.usernameElement);
            if (usernameElement) {
                const { gameID } = extractGameInfo(usernameElement.textContent.trim());
                GM_setClipboard(gameID);
                showNotification(`已复制ID：${gameID}`);
            }
            window.open(url, '_blank');
        });

        return button;
    }

    function injectServiceButtons() {
        const targetElement = document.querySelector(SELECTORS.targetElement);
        if (!targetElement || clonedElements.has(targetElement)) return;

        const clonedElement = targetElement.cloneNode(true);
        clonedElement.textContent = '';
        Object.assign(clonedElement.style, {
            color: 'white',
            marginLeft: '0px',
            marginRight: '10px',
            width: '89%'
        });
        clonedElement.classList.add('custom-cloned-element');

        clonedElement.append(
            createServiceButton('国服客服', 'https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump-market.html?linkType=0&env=ol&kfuin=3009072421&fid=327&key=f3321e05f6258773ceb56a6411e30ff7&cate=1'),
            createServiceButton('49客服', 'https://u.4399.com/kf/im/3Dtk')
        );

        targetElement.parentNode.insertBefore(clonedElement, targetElement.nextSibling);
        clonedElements.add(targetElement);

        // 模态框保活逻辑
        modalRoot = document.querySelector(SELECTORS.modalRoot);
        if (modalRoot) {
            new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.attributeName === 'style' &&
                        window.getComputedStyle(modalRoot).display === 'none') {
                        modalRoot.style.display = 'block';
                    }
                });
            }).observe(modalRoot, { attributes: true });
        }
    }

    /* 右键菜单模块 */
    function createContextMenuOption(text, className, clickHandler) {
        const option = document.createElement('div');
        option.className = `ksc-67 Common-flexStartAlignCenter ${className}`;
        const span = document.createElement('span');
        span.textContent = text;
        option.append(span);

        Object.assign(option.style, {
            padding: '7px 29px',
            margin: '0px',
            color: '#fff',
            width: '76%',
            cursor: 'pointer',
            visibility: 'visible'
        });

        option.addEventListener('click', clickHandler);
        return option;
    }

    function enhanceContextMenu() {
        new MutationObserver(mutations => {
            mutations.forEach(() => {
                document.querySelectorAll('.ContextMenuStyle-menu').forEach(menu => {
                    if (menu.dataset.enhanced) return;

                    // 移除原始复制选项
                    const originalCopy = Array.from(menu.querySelectorAll('span'))
                        .find(span => ['复制名称', 'Copy Name'].includes(span.textContent.trim()));
                    if (originalCopy) originalCopy.parentElement.remove();

                    // 添加新功能
                    const usernameElement = menu.querySelector('span.Common-whiteSpaceNoWrap');
                    const username = usernameElement?.textContent.trim() || '';
                    const { clanTag, gameID } = extractGameInfo(username);

                    // 复制团标
                    if (clanTag) {
                        menu.append(createContextMenuOption('复制团标', 'copy-clan', () => {
                            GM_setClipboard(clanTag);
                            showNotification(`已复制团标：${clanTag}`);
                        }));
                    }

                    // 复制ID
                    if (gameID) {
                        menu.append(createContextMenuOption('复制ID', 'copy-id', () => {
                            GM_setClipboard(gameID);
                            showNotification(`已复制ID：${gameID}`);
                        }));
                    }

                    menu.dataset.enhanced = true;
                });
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    /* 样式注入 */
    const style = document.createElement('style');
    style.textContent = `
        .custom-cloned-element,
        .custom-cloned-element span {
            background: transparent !important;
            box-sizing: border-box;
        }
        .custom-cloned-element span:hover {
            background: rgba(128, 128, 128, 0.3) !important;
            border-radius: inherit;
        }
        .copy-clan:hover, .copy-id:hover {
            background: rgba(255, 255, 255, 0.1) !important;
        }
    `;
    document.head.append(style);

    /* 初始化 */
    setInterval(injectServiceButtons, 50);
    enhanceContextMenu();
})();
