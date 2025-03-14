// ==UserScript==
// @name         添加复制团标选项
// @namespace    http://tampermonkey.net/
// @version      2.7.0
// @description  在3D坦克查看用户菜单中添加“复制军团标”选项，仅为有军团标的用户显示，并确保样式一致，49国服共用
// @author       Mod
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @match        https://3dtank.com/play/*
// @match        http://game.4399iw2.com/yxtk/*
// @grant        GM_setClipboard
// ==/UserScript==

//复制团标
(function() {
    'use strict';

    function showFloatingNotification(message, isSuccess = true) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.padding = '10px 20px';
        notification.style.backgroundColor = isSuccess ? 'rgba(0, 128, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)';
        notification.style.color = '#fff';
        notification.style.borderRadius = '5px';
        notification.style.zIndex = '9999';
        notification.style.fontSize = '14px';
        notification.style.fontFamily = 'Arial, sans-serif';
        notification.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease-in-out';

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // 降级方案
    function fallbackCopyText(text) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);
            return successful;
        } catch (err) {
            console.error('降级复制失败:', err);
            return false;
        }
    }

    function safeCopyText(text) {
        // 检查 API 是否可用
        if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            GM_setClipboard(text)
                .then(() => {
                    console.log(`已通过 GM_setClipboard 复制军团标: ${text}`);
                    showFloatingNotification(`成功复制军团标：${text}`, true);
                })
                .catch(err => {
                    console.error('GM_setClipboard 失败:', err);
                    // 降级方案
                    if (fallbackCopyText(text)) {
                        showFloatingNotification(`成功复制军团标（降级方案）：${text}`, true);
                    } else {
                        showFloatingNotification('复制失败：剪贴板权限不足或环境限制', false);
                    }
                });
        } else {
            //直接使用降级方案
            console.warn('Clipboard API 不可用，尝试降级方案');
            if (fallbackCopyText(text)) {
                showFloatingNotification(`成功复制军团标（降级方案）：${text}`, true);
            } else {
                showFloatingNotification('复制失败：剪贴板权限不足或环境限制', false);
            }
        }
    }

    function addCopyClanTagOption(contextMenu, copyNameOption, username) {
        if (!contextMenu.querySelector('.copy-clan-tag') && username && username.includes('[') && username.includes(']')) {
            const copyClanTagOption = document.createElement('div');
            copyClanTagOption.className = 'ksc-67 Common-flexStartAlignCenter copy-clan-tag';

            const spanElement = document.createElement('span');
            spanElement.textContent = '复制军团标';
            copyClanTagOption.appendChild(spanElement);

            if (copyNameOption) {
                const computedStyle = window.getComputedStyle(copyNameOption);
                const spanComputedStyle = window.getComputedStyle(copyNameOption.querySelector('span'));

                copyClanTagOption.style.padding = computedStyle.padding || '5px 10px';
                copyClanTagOption.style.margin = computedStyle.margin || '0px';
                copyClanTagOption.style.color = computedStyle.color || '#fff';
                copyClanTagOption.style.display = computedStyle.display || 'flex';
                copyClanTagOption.style.justifyContent = computedStyle.justifyContent || 'flex-start';
                copyClanTagOption.style.alignItems = computedStyle.alignItems || 'center';
                copyClanTagOption.style.width = '100%';
                copyClanTagOption.style.boxSizing = 'border-box';
                copyClanTagOption.style.height = computedStyle.height || 'auto';
                copyClanTagOption.style.lineHeight = computedStyle.lineHeight || 'normal';
                copyClanTagOption.style.cursor = 'pointer';
                copyClanTagOption.style.visibility = 'visible';

                spanElement.style.padding = spanComputedStyle.padding || '0px';
                spanElement.style.margin = spanComputedStyle.margin || '0px';
                spanElement.style.width = spanComputedStyle.width || 'auto';
                spanElement.style.whiteSpace = spanComputedStyle.whiteSpace || 'nowrap';
                spanElement.style.lineHeight = spanComputedStyle.lineHeight || 'normal';
                spanElement.style.visibility = 'visible';

                copyNameOption.insertAdjacentElement('afterend', copyClanTagOption);
            } else {
                copyClanTagOption.style.display = 'flex';
                copyClanTagOption.style.justifyContent = 'flex-start';
                copyClanTagOption.style.alignItems = 'center';
                copyClanTagOption.style.padding = '5px 10px';
                copyClanTagOption.style.margin = '0px';
                copyClanTagOption.style.color = '#fff';
                copyClanTagOption.style.width = '100%';
                copyClanTagOption.style.boxSizing = 'border-box';
                copyClanTagOption.style.height = 'auto';
                copyClanTagOption.style.lineHeight = 'normal';
                copyClanTagOption.style.cursor = 'pointer';
                copyClanTagOption.style.visibility = 'visible';

                spanElement.style.padding = '0px';
                spanElement.style.margin = '0px';
                spanElement.style.width = 'auto';
                spanElement.style.whiteSpace = 'nowrap';
                spanElement.style.lineHeight = 'normal';
                spanElement.style.visibility = 'visible';

                contextMenu.appendChild(copyClanTagOption);
            }

            copyClanTagOption.addEventListener('click', () => {
                console.log(`点击“复制军团标”，当前用户名: ${username}`);
                if (!username) {
                    console.log('用户名为空，无法提取军团标');
                    showFloatingNotification('未找到用户名', false);
                    return;
                }

                let clanTag = '';
                const clanTagMatch = username.match(/^\[([^\]]+)\]/);
                if (clanTagMatch && clanTagMatch[1]) {
                    clanTag = `[${clanTagMatch[1]}]`;
                } else if (username.includes('[') && username.includes(']')) {
                    const startIndex = username.indexOf('[');
                    const endIndex = username.indexOf(']');
                    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
                        clanTag = username.substring(startIndex, endIndex + 1);
                    }
                }
                if (clanTag) {
                    safeCopyText(clanTag);
                } else {
                    console.log('未找到军团标，当前用户名: ' + username);
                    showFloatingNotification('未找到军团标', false);
                }
            });
        }
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const contextMenus = document.querySelectorAll('.ContextMenuStyle-menu');
            contextMenus.forEach(contextMenu => {
                if (contextMenu && !contextMenu.dataset.processed) {
                    const spans = contextMenu.querySelectorAll('span');
                    const copyNameOption = Array.from(spans)
                        .find(span => ['复制名称', 'Copy Name', 'Copiar Nombre'].includes(span.textContent.trim()))?.parentElement;
                    const usernameElement = contextMenu.querySelector('span.Common-whiteSpaceNoWrap');
                    const currentUsername = usernameElement ? usernameElement.textContent.trim() : '';

                    addCopyClanTagOption(contextMenu, copyNameOption, currentUsername);
                    contextMenu.dataset.processed = 'true'; // 标记已处理，避免重复添加
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    window.addEventListener('beforeunload', () => {
        observer.disconnect();
    });

    document.addEventListener('click', () => {
        const contextMenus = document.querySelectorAll('.ContextMenuStyle-menu');
        contextMenus.forEach(menu => delete menu.dataset.processed);
    });
})();