// ==UserScript==
// @name         复刻-客服&复制
// @version      1.0.0
// @author       Arc
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/客服呼出&修复49复制名字.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/客服呼出&修复49复制名字.user.js
// @match        https://3dtank.com/play/
// @match        https://game.4399iw2.com/yxtk/*
// @match        http://3dtank.com/play/
// @match        http://game.4399iw2.com/yxtk/*
// @grant        GM_setClipboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// ==/UserScript==


(function() {
    'use strict';

    // 定义要查找的元素选择器
    const selector = "#modal-root > div > div > div:nth-child(5)";

    // 用于记录已经复制过的元素，避免重复复制
    const clonedElements = new Set();

    // 用于存储模态框元素
    let modalRoot;

    // 定义一个函数来查找元素并执行操作
    function findAndDuplicateElement() {
        // 使用 document.querySelector 查找目标元素
        const targetElement = document.querySelector(selector);

        if (targetElement &&!clonedElements.has(targetElement)) {
            // 复制目标元素
            const clonedElement = targetElement.cloneNode(true);

            // 清空复制元素原内容
            clonedElement.textContent = '';

            // 设置文本颜色为白色
            clonedElement.style.color = "white";

            // 使用 margin 调整文本位置，这里以左右各偏移 10px 为例
            clonedElement.style.marginLeft = "0px";
            clonedElement.style.marginRight = "10px";

            // 设置宽度为89%
            clonedElement.style.width = "89%";

            // 为复制元素添加一个新的类名
            clonedElement.classList.add('custom-cloned-element');

            // 创建左边部分
            const leftPart = document.createElement('span');
            leftPart.textContent = "国服客服";
            leftPart.style.display = "inline-block";
            leftPart.style.width = "50%";
            leftPart.style.textAlign = "center";
            leftPart.style.color = "white";
            leftPart.style.cursor = "pointer";

            // 创建右边部分
            const rightPart = document.createElement('span');
            rightPart.textContent = "49客服";
            rightPart.style.display = "inline-block";
            rightPart.style.width = "50%";
            rightPart.style.textAlign = "center";
            rightPart.style.color = "white";
            rightPart.style.cursor = "pointer";

            // 为左右部分添加点击事件监听器
            leftPart.addEventListener('click', function() {
                const textElement = document.querySelector("#modal-root > div > div > div.ContextMenuStyle-menuItem.ContextMenuStyle-menuItemRank > div > div > div > span");
                if (textElement) {
                    let textToCopy = textElement.textContent;
                    textToCopy = textToCopy.replace(/\[.*?\]|\s/g, '');
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                window.open('https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump-market.html?linkType=0&env=ol&kfuin=3009072421&fid=327&key=f3321e05f6258773ceb56a6411e30ff7&cate=1&source=&isLBS=&isCustomEntry=&type=16', '_blank');
            });

            rightPart.addEventListener('click', function() {
                const textElement = document.querySelector("#modal-root > div > div > div.ContextMenuStyle-menuItem.ContextMenuStyle-menuItemRank > div > div > div > span");
                if (textElement) {
                    let textToCopy = textElement.textContent;
                    textToCopy = textToCopy.replace(/\[.*?\]|\s/g, '');
                    const textArea = document.createElement('textarea');
                    textArea.value = textToCopy;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                window.open('https://u.4399.com/kf/im/3Dtk', '_blank');
            });

            // 将左右部分添加到复制元素中
            clonedElement.appendChild(leftPart);
            clonedElement.appendChild(rightPart);

            // 将复制的元素插入到目标元素之后
            targetElement.parentNode.insertBefore(clonedElement, targetElement.nextSibling);

            // 记录已经复制过的元素
            clonedElements.add(targetElement);

            // 获取模态框根元素
            modalRoot = document.getElementById('modal-root');
            if (modalRoot) {
                setupMutationObserver();
            }

            // 为新按钮添加点击事件监听器
            const newButton = document.querySelector("#modal-root > div > div > div:nth-child(5) > span");
            if (newButton) {
                newButton.addEventListener('click', function() {
                    const textElement = document.querySelector("#modal-root > div > div > div.ContextMenuStyle-menuItem.ContextMenuStyle-menuItemRank > div > div > div > span");
                    if (textElement) {
                        let textToCopy = textElement.textContent;
                        textToCopy = textToCopy.replace(/\[.*?\]|\s/g, '');
                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        document.body.appendChild(textArea);
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                    }
                });
            }
        }
    }

    // 设置 MutationObserver 来监控模态框的变化
    function setupMutationObserver() {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const displayValue = window.getComputedStyle(modalRoot).display;
                    if (displayValue === 'none') {
                        // 恢复模态框显示
                        modalRoot.style.display = 'block';
                    }
                }
            }
        });

        const config = { attributes: true, attributeFilter: ['style'] };
        observer.observe(modalRoot, config);
    } 

    //向页面中注入 CSS 样式
    const style = document.createElement('style');
    style.textContent = `
      .custom-cloned-element {
            background-color: transparent;
            background-image: none;
            box-sizing: border-box; // 确保内边距和边框包含在元素的宽度和高度内 
        }
      .custom-cloned-element span {
            background-color: transparent;
            background-image: none;
            box-sizing: border-box;
        }
      .custom-cloned-element span:hover {
            background-color: rgba(128, 128, 128, 0.3); // 鼠标悬停时的背景颜色，可根据需求调整
            border-radius: inherit; // 继承原元素的边框圆角 
            overflow: hidden; // 防止背景溢出 
        }
    `;
    document.head.appendChild(style);

    // 每隔 500 毫秒调用一次 findAndDuplicateElement 函数
    const intervalId = setInterval(findAndDuplicateElement, 1);
})();
