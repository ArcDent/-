// ==UserScript==
// @name         内置宏
// @version      1.0.0
// @author       Mod
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/战场装备底转显示.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/屏蔽词/战场装备底转显示.user.js
// @match        https://3dtank.com/play/
// @match        https://game.4399iw2.com/yxtk/*
// @match        http://3dtank.com/play/
// @match        http://game.4399iw2.com/yxtk/*
// @grant        GM_setClipboard
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// ==/UserScript==

(function() {
    'use strict';
    let countFirebird = 0;
    let countFreeze = 0;
    let countIsis = 0;
    let countTesla = 0;
    let countHammer = 0;
    let countTwins = 0;
    let countRicochet = 0;
    let countVulcan = 0;
    let countSmoky = 0;
    let countRocketLauncher = 0;
    let countThunder = 0;
    let countScorpio = 0;
    let countArtillery = 0;
    let countRailgun = 0;
    let countGauss = 0;
    let countShaft = 0;

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                for (let i = 0; i < mutation.addedNodes.length; i++) {
                    let node = mutation.addedNodes[i];
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        let element = node.querySelector("#root > div > div.BattleTabStatisticComponentStyle-container > div > div.BattleTabStatisticComponentStyle-commonBlockScroll > div > div.BattleTabStatisticComponentStyle-redTeamTableContainer > table");
                        if (element) {
                            findUrlCountFirebird(element);
                            findUrlCountFreeze(element);
                            findUrlCountIsis(element);
                            findUrlCountTesla(element);
                            findUrlCountHammer(element);
                            findUrlCountTwins(element);
                            findUrlCountRicochet(element);
                            findUrlCountVulcan(element);
                            findUrlCountSmoky(element);
                            findUrlCountRocketLauncher(element);
                            findUrlCountThunder(element);
                            findUrlCountScorpio(element);
                            findUrlCountArtillery(element);
                            findUrlCountRailgun(element);
                            findUrlCountGauss(element);
                            findUrlCountShaft(element);
                        }
                    }
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    function findUrlCountFirebird(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/firebird_resistance.785a9d6b.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/firebird_resistance.785a9d6b.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/firebird_resistance.785a9d6b.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/firebird_resistance.785a9d6b.svg')) {
                currentCount++;
            }
        }
        countFirebird = currentCount;
        updateTextContentFirebird();
    }

    function findUrlCountFreeze(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/freeze_resistance.33bdf642.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/freeze_resistance.33bdf642.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/freeze_resistance.33bdf642.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/freeze_resistance.33bdf642.svg')) {
                currentCount++;
            }
        }
        countFreeze = currentCount;
        updateTextContentFreeze();
    }

    function findUrlCountIsis(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/isis_resistance.30a69ffc.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/isis_resistance.30a69ffc.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/isis_resistance.30a69ffc.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/isis_resistance.30a69ffc.svg')) {
                currentCount++;
            }
        }
        countIsis = currentCount;
        updateTextContentIsis();
    }

    function findUrlCountTesla(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/tesla_resistance.3e686c8e.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/tesla_resistance.3e686c8e.svg') ||
                computedStyle.borderImage.includes('https://3dtaxk.com/play/static/images/tesla_resistance.3e686c8e.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/tesla_resistance.3e686c8e.svg')) {
                currentCount++;
            }
        }
        countTesla = currentCount;
        updateTextContentTesla();
    }

    function findUrlCountHammer(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/hammer_resistance.6c549d29.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/hammer_resistance.6c549d29.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/hammer_resistance.6c549d29.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/hammer_resistance.6c549d29.svg')) {
                currentCount++;
            }
        }
        countHammer = currentCount;
        updateTextContentHammer();
    }

    function findUrlCountTwins(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/twins_resistance.ad189f61.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/twins_resistance.ad189f61.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/twins_resistance.ad189f61.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/twins_resistance.ad189f61.svg')) {
                currentCount++;
            }
        }
        countTwins = currentCount;
        updateTextContentTwins();
    }

    function findUrlCountRicochet(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/ricochet_resistance.8247beaa.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/ricochet_resistance.8247beaa.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/ricochet_resistance.8247beaa.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/ricochet_resistance.8247beaa.svg')) {
                currentCount++;
            }
        }
        countRicochet = currentCount;
        updateTextContentRicochet();
    }

    function findUrlCountVulcan(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/vulcan_resistance.824f6f0e.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/vulcan_resistance.824f6f0e.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/vulcan_resistance.824f6f0e.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/vulcan_resistance.824f6f0e.svg')) {
                currentCount++;
            }
        }
        countVulcan = currentCount;
        updateTextContentVulcan();
    }

    function findUrlCountSmoky(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/smoky_resistance.845afc14.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/smoky_resistance.845afc14.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/smoky_resistance.845afc14.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/smoky_resistance.845afc14.svg')) {
                currentCount++;
            }
        }
        countSmoky = currentCount;
        updateTextContentSmoky();
    }

    function findUrlCountRocketLauncher(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/rocket_launcher_resistance.b7dfd64f.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/rocket_launcher_resistance.b7dfd64f.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/rocket_launcher_resistance.b7dfd64f.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/rocket_launcher_resistance.b7dfd64f.svg')) {
                currentCount++;
            }
        }
        countRocketLauncher = currentCount;
        updateTextContentRocketLauncher();
    }

    function findUrlCountThunder(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/thunder_resistance.6d7f4531.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/thunder_resistance.6d7f4531.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/thunder_resistance.6d7f4531.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/thunder_resistance.6d7f4531.svg')) {
                currentCount++;
            }
        }
        countThunder = currentCount;
        updateTextContentThunder();
    }

    function findUrlCountScorpio(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/scorpio_resistance.e8f1787f.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/scorpio_resistance.e8f1787f.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/scorpio_resistance.e8f1787f.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/scorpio_resistance.e8f1787f.svg')) {
                currentCount++;
            }
        }
        countScorpio = currentCount;
        updateTextContentScorpio();
    }

    function findUrlCountArtillery(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/artillery_resistance.9b4cbc34.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/artillery_resistance.9b4cbc34.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/artillery_resistance.9b4cbc34.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/artillery_resistance.9b4cbc34.svg')) {
                currentCount++;
            }
        }
        countArtillery = currentCount;
        updateTextContentArtillery();
    }

    function findUrlCountRailgun(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/railgun_resistance.636a554f.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/railgun_resistance.636a554f.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/railgun_resistance.636a554f.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/railgun_resistance.636a554f.svg')) {
                currentCount++;
            }
        }
        countRailgun = currentCount;
        updateTextContentRailgun();
    }

    function findUrlCountGauss(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/gauss_resistance.bb8f409c.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/gauss_resistance.bb8f409c.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/gauss_resistance.bb8f409c.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/gauss_resistance.bb8f409c.svg')) {
                currentCount++;
            }
        }
        countGauss = currentCount;
        updateTextContentGauss();
    }


    function findUrlCountShaft(element) {
        let currentCount = 0;
        let allElements = element.querySelectorAll('*');
        for (let i = 0; i < allElements.length; i++) {
            let computedStyle = window.getComputedStyle(allElements[i]);
            if (computedStyle.backgroundImage.includes('https://3dtank.com/play/static/images/shaft_resistance.0778fd3e.svg') ||
                computedStyle.listStyleImage.includes('https://3dtank.com/play/static/images/shaft_resistance.0778fd3e.svg') ||
                computedStyle.borderImage.includes('https://3dtank.com/play/static/images/shaft_resistance.0778fd3e.svg') ||
                computedStyle.cursor.includes('https://3dtank.com/play/static/images/shaft_resistance.0778fd3e.svg')) {
                currentCount++;
            }
        }
        countShaft = currentCount;
        updateTextContentShaft();
    }

    function updateTextContentThunder() {
        let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
        for (let i = 0; i < targetElements.length; i++) {
            let targetElement = targetElements[i];
            if (targetElement.textContent.includes("\u7070\u718a")) {
                if (countThunder > 0) {
                    targetElement.textContent = ` ${countThunder}`;
                }
            }
        }
    }

    function updateTextContentFirebird() {
        let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
        for (let i = 0; i < targetElements.length; i++) {
            let targetElement = targetElements[i];
            if (targetElement.textContent.includes("\u72d0\u72f8")) {
                if (countFirebird > 0) {
                    targetElement.textContent = ` ${countFirebird}`;
                }
            }
        }
    }

    function updateTextContentFreeze() {
        let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
        for (let i = 0; i < targetElements.length; i++) {
            let targetElement = targetElements[i];
            if (targetElement.textContent.includes("\u737e")) {
                if (countFreeze > 0) {
                    targetElement.textContent = ` ${countFreeze}`;
                }
            }
        }
    }

    function updateTextContentIsis() {
        let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
        for (let i = 0; i < targetElements.length; i++) {
            let targetElement = targetElements[i];
            if (targetElement.textContent.includes("\u5c71\u732b")) {
                if (countIsis > 0) {
                    targetElement.textContent = ` ${countIsis}`;
                }
            }
        }
    }

    function updateTextContentTesla() {
        let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
        for (let i = 0; i < targetElements.length; i++) {
            let targetElement = targetElements[i];
            if (targetElement.textContent.includes("\u9f2c")) {
                if (countTesla > 0) {
                    targetElement.textContent = ` ${countTesla}`;
                }
            }
        }
    }

    function updateTextContentHammer() {
        let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
        for (let i = 0; i < targetElements.length; i++) {
            let targetElement = targetElements[i];
            if (targetElement.textContent.includes("\u72fc")) {
                if (countHammer > 0) {
                    targetElement.textContent = ` ${countHammer}`;
                }
            }
        }
    }

function updateTextContentTwins() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u9ed1\u8c79")) {
            if (countTwins > 0) {
                targetElement.textContent = ` ${countTwins}`;
            }
        }
    }
}

function updateTextContentRicochet() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u72ee\u5b50")) {
            if (countRicochet > 0) {
                targetElement.textContent = ` ${countRicochet}`;
            }
        }
    }
}

function updateTextContentVulcan() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u9ca8\u9c7c")) {
            if (countVulcan > 0) {
                targetElement.textContent = ` ${countVulcan}`;
            }
        }
    }
}

function updateTextContentSmoky() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u6d77\u8c5a")) {
            if (countSmoky > 0) {
                targetElement.textContent = ` ${countSmoky}`;
            }
        }
    }
}

function updateTextContentRocketLauncher() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u864e\u9cb8")) {
            if (countRocketLauncher > 0) {
                targetElement.textContent = ` ${countRocketLauncher}`;
            }
        }
    }
}

function updateTextContentThunder() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u7070\u718a")) {
            if (countThunder > 0) {
                targetElement.textContent = ` ${countThunder}`;
            }
        }
    }
}

function updateTextContentScorpio() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u79c3\u9e70")) {
            if (countScorpio > 0) {
                targetElement.textContent = ` ${countScorpio}`;
            }
        }
    }
}

function updateTextContentArtillery() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u72ee\u9e6b")) {
            if (countArtillery > 0) {
                targetElement.textContent = ` ${countArtillery}`;
            }
        }
    }
}

function updateTextContentRailgun() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u730e\u9e70")) {
            if (countRailgun > 0) {
                targetElement.textContent = ` ${countRailgun}`;
            }
        }
    }
}

function updateTextContentGauss() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u732b\u5934\u9e70")) {
            if (countGauss > 0) {
                targetElement.textContent = ` ${countGauss}`;
            }
        }
    }
}

function updateTextContentShaft() {
    let targetElements = document.querySelectorAll("span[class^='ksc-'].Common-whiteSpaceNoWrap.Font-bold.Common-whiteSpaceNoWrap");
    for (let i = 0; i < targetElements.length; i++) {
        let targetElement = targetElements[i];
        if (targetElement.textContent.includes("\u9e70")) {
            if (countShaft > 0) {
                targetElement.textContent = ` ${countShaft}`;
            }
        }
    }
}


// 初始时检查一次
updateTextContentFirebird();
updateTextContentFreeze();
updateTextContentIsis();
updateTextContentTesla();
updateTextContentHammer();
updateTextContentTwins();
updateTextContentRicochet();
updateTextContentVulcan();
updateTextContentSmoky();
updateTextContentRocketLauncher();
updateTextContentThunder();
updateTextContentScorpio();
updateTextContentArtillery();
updateTextContentRailgun();
updateTextContentGauss();
updateTextContentShaft();


// 观察元素的添加，当元素添加时检查是否需要更新文本
let innerObserver = new MutationObserver(function() {
    updateTextContentFirebird();
    updateTextContentFreeze();
    updateTextContentIsis();
    updateTextContentTesla();
    updateTextContentHammer();
    updateTextContentTwins();
    updateTextContentRicochet();
    updateTextContentVulcan();
    updateTextContentSmoky();
    updateTextContentRocketLauncher();
    updateTextContentThunder();
    updateTextContentScorpio();
    updateTextContentArtillery();
    updateTextContentRailgun();
    updateTextContentGauss();
    updateTextContentShaft();
});
innerObserver.observe(document.body, { childList: true, subtree: true });
})();