// ==UserScript==
// @name         表情相关
// @version      1.0.0
// @author       Mod
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/表情相关.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/表情相关.user.js
// @match        https://3dtank.com/play/
// @match        https://game.4399iw2.com/yxtk/*
// @match        http://3dtank.com/play/
// @match        http://game.4399iw2.com/yxtk/*
// @grant        GM_setClipboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// ==/UserScript==

//表情相关
(function() {
    'use strict';

    // 定义检查聊天框是否出现的间隔时间
    const checkInterval = 1;

    // 用于存储找到的聊天框元素
    let chatBoxDiv;

    // 用于标记是否已经添加了emoji按钮
    let emojiButtonAdded = false;

    // 存储聊天框的输入框元素，用于后续操作
    let chatBoxInput;

    // 定义函数用于设置元素宽度
    function setChatComponentWidth() {
        var chatComponent = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop");

        if (chatComponent) {
            chatComponent.style.width = '47em';
        }
    }

    // 检查聊天框是否出现的函数
    function checkForChatBox() {
        // 根据指定路径查找聊天框所在的div元素
        chatBoxDiv = document.querySelector("#root > div > div > div.BattleChatComponentStyle-rootDesktop > div > div > div");

        if (chatBoxDiv) {
            // 找到聊天框时，获取其输入框元素
            chatBoxInput = chatBoxDiv.querySelector('input[type="text"]');
            if (!emojiButtonAdded) {
                addEmojiButton();
                emojiButtonAdded = true;
            } else {
                // 如果按钮已添加，确保它显示
                const existingEmojiButton = document.querySelector('button[textContent="🗩"]');
                if (existingEmojiButton) {
                    existingEmojiButton.style.backgroundColor = 'transparent';
                    existingEmojiButton.style.borderColor = 'transparent';
                    existingEmojiButton.style.borderStyle = 'none';
                    existingEmojiButton.style.borderWidth = '0';
                    existingEmojiButton.style.display = 'block';
                }
            }
        } else {
            // 如果聊天框不存在，隐藏emoji按钮（如果存在）
            const existingEmojiButton = document.querySelector('button[textContent="🗩"]');
            if (existingEmojiButton) {
                existingEmojiButton.style.display = 'none';
            }
            // 聊天框不存在时，重置emojiButton添加标记，以便下次出现聊天框时可重新添加按钮
            emojiButtonAdded = false;
        }
    }

    // 添加emoji按钮及相关功能的函数
    function addEmojiButton() {
        // 创建一个按钮元素
        const emojiButton = document.createElement('button');
        emojiButton.textContent = '🗩';
        // 设置按钮背景颜色为透明
        emojiButton.style.backgroundColor = 'transparent';
        // 设置按钮边框颜色为透明，边框样式为无，边框宽度为0
        emojiButton.style.borderColor = 'transparent';
        emojiButton.style.borderStyle = 'none';
        emojiButton.style.borderWidth = '0';

        // 创建一个隐藏的div来存放emoji选项，初始设为隐藏
        const emojiOptionsDiv = document.createElement('div');
        emojiOptionsDiv.style.display = 'none';

        // 这里可以定义一些emoji示例，你可以根据需要扩展或从其他地方获取完整的emoji列表
        const emojis = ['✌', '☢', '☣', '❄', '✋', '⭐', '⚡', '⚽', '⛹️', '☝', '✍', '♿', '☺️', '☹️', '✊', '☕', '⛪', '⚓', '⛵', '⏳', '✈', '☔', '⛄', '⚾', '✨', '⌨', '☎', '✂', '⛏', '♻'];

        emojis.forEach((emoji) => {
            const emojiSpan = document.createElement('span');
            emojiSpan.textContent = emoji;
            emojiSpan.addEventListener('click', function() {
                // 当点击某个emoji时，模拟在聊天框中输入该emoji并触发发送（这里假设发送按钮等相关逻辑存在且可触发，可能需要进一步适配具体页面）
                if (chatBoxInput) {
                    const start = chatBoxInput.selectionStart;
                    const end = chatBoxInput.selectionEnd;
                    chatBoxInput.value = chatBoxInput.value.slice(0, start) + emoji + chatBoxInput.value.slice(end);
                    // 将光标位置设置回原来的位置（点击表情后光标仍停留在原位置）
                    chatBoxInput.selectionStart = start + 1;
                    chatBoxInput.selectionEnd = start + 1;
                    // 确保光标始终停留在输入框内，这里再次设置焦点
                    chatBoxInput.focus();
                    // 这里假设存在一个id为'sendButton'的总发送按钮，需根据实际页面调整触发发送的逻辑
                    const sendButton = document.getElementById('sendButton');
                    if (sendButton) {
                        sendButton.click();
                    }
                }
            });
            emojiOptionsDiv.appendChild(emojiSpan);
        });

        // 点击emoji按钮时，切换emojiOptionsDiv的显示状态
        emojiButton.addEventListener('click', function() {
            if (emojiOptionsDiv.style.display = 'none') {
                emojiOptionsDiv.style.display = 'block';
            } else {
                emojiOptionsDirv.style.display = 'none';
            }
            // 点击按钮后将焦点设置到输入框
            if (chatBoxInput) {
                chatBoxInput.focus();
            }
        });

        // 将emojiButton和emojiOptionsDiv添加到聊天框所在的div元素中
        chatBoxDiv.appendChild(emojiButton);
        chatBoxDiv.appendChild(emojiOptionsDiv);
    }

    // 页面首次加载时设置宽度
    window.addEventListener('DOMContentLoaded', function() {
        setChatComponentWidth();
    });

    // 使用MutationObserver监听DOM变化
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                setChatComponentWidth();
            }
        });
    });

    // 配置MutationObserver观察的目标节点和选项
    var targetNode = document.documentElement;
    var config = {
        childList: true,
        attributes: true,
        subtree: true
    };

    // 启动MutationObserver开始观察
    observer.observe(targetNode, config);

    // 开始定期检查聊天框是否出现
    const checkIntervalId = setInterval(checkForChatBox, checkInterval);
})();
