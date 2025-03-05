// ==UserScript==
// @name         点场
// @version      1
// @description  Supplies Clicker
// @author       Arc
// @match        https://*.tankionline.com/*
// @match        https://3dtank.com/play/
// @match        https://*.3dtank.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// @grant        none
// ==/UserScript==


// 创建一个透明的HTML元素来监听键盘事件
let keyboardListener = document.createElement("div");
keyboardListener.tabIndex = 0; // 让元素可以获取焦点，以便监听键盘事件
keyboardListener.style.width = "0";
keyboardListener.style.height = "0";
keyboardListener.style.outline = "none"; // 去掉焦点边框
keyboardListener.style.position = "absolute";
keyboardListener.style.top = "0";
keyboardListener.style.left = "0";
document.body.appendChild(keyboardListener);



const root = document.getElementById('root');

function getChatState() {
    return document.querySelector(".BattleChatComponentStyle-inputContainer")
}


let HackGUI = document.createElement("div");

let HackGUIStyle = `

.App {

display: flex;
background: rgb(12 12 12 / 40%);
height: 390px;
width: 340px;
position: absolute;
right: 40%;
opacity: 0,75%;
transform: translate(-50%,-50%);
border-radius: 25px;
border-width: 1px;
top: 40%;
border: 2px solid rgba(255,255,255,0.2);
backdrop-filter: blur(3px);

}`

let addStyle = function(styleString) {
    var style = document.createElement('style');

    style.innerHTML = styleString

    document.head.appendChild(style)

    return style

}

addStyle(HackGUIStyle)

HackGUI.className = 'App'

let Title = document.createElement("span");

let TitleStyle = `

.TitleSt {

position: absolute;
color: #ff0000;
text-align: center;
font-size: 20px;
padding: 34px 39%;



}`

addStyle(TitleStyle)

Title.className = 'TitleSt'

Title.innerText = ''

HackGUI.appendChild(Title)

let ToggleButton = document.createElement("div");

let ToggleButtonStyle = `
.ToggleButton {
    position: absolute;
    width: 100px;
    height: 30px;
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    right: 10px;
    top: 10px;
    user-select: none;
}
.ToggleButton:hover {
    background-color: #0056b3;
}
`

addStyle(ToggleButtonStyle);

ToggleButton.className = 'ToggleButton';
ToggleButton.innerText = '开启地雷';

HackGUI.appendChild(ToggleButton);



let StartHackButton = document.createElement("div");

let StartHackButtonStyle = `
.StartHackButton {
    position: absolute;
    width: 100px;
    height: 30px;
    background-color: #007bff;
    color: white;
    border: 1px solid #007bff;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    left: 10px;
    top: 10px;
    user-select: none;
}
.StartHackButton:hover {
    background-color: #0056b3;
}
`

addStyle(StartHackButtonStyle);

StartHackButton.className = 'StartHackButton';
StartHackButton.innerText = '开始挂机';

HackGUI.appendChild(StartHackButton);



let Button1 = document.createElement("div");
let Button2 = document.createElement("span");
let Button3 = document.createElement("span");
let Button4 = document.createElement("span");


let InnerCircle1 = document.createElement("span");
let InnerCircle2 = document.createElement("span");
let InnerCircle3 = document.createElement("span");
let InnerCircle4 = document.createElement("span");


let ButtonStyle = `

.Button {

    position: absolute;
    width: 2px;
    height: 2px;
    background-color: #00000000;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 15px;
    box-shadow: inset 0 0 5px rgba(0,0,0,.2);
    transition: .5s;
    padding: 6px 8%;
    right: 8%;

}

.innerCircle {

    width: 35%;
    height: 92%;
    background-color: red;
    position: absolute;
    border-radius: 10px;
    top: 2%;
    right: 65%;
    transition: right 0.7s;

}`

addStyle(ButtonStyle)

Button1.className = 'Button'

Button1.style.top = '100px'

InnerCircle1.className = 'innerCircle'

Button1.appendChild(InnerCircle1)

HackGUI.appendChild(Button1)

Button2.className = 'Button'

Button2.style.top = '150px'

InnerCircle2.className = 'innerCircle'

Button2.appendChild(InnerCircle2)

HackGUI.appendChild(Button2)

Button3.className = 'Button'

Button3.style.top = '200px'

InnerCircle3.className = 'innerCircle'

Button3.appendChild(InnerCircle3)

HackGUI.appendChild(Button3)

Button4.className = 'Button'

Button4.style.top = '250px'

InnerCircle4.className = 'innerCircle'

Button4.appendChild(InnerCircle4)

HackGUI.appendChild(Button4)






let slider1 = document.createElement("input")

slider1.type = "range"

slider1.step = 5

slider1.min = 0
slider1.max = 200
slider1.style.position = "absolute"
slider1.style.marginLeft = "42%"
slider1.style.top = "300px"
slider1.value = 0

let slider2 = document.createElement("input")

slider2.type = "range"

slider2.step = 5

slider2.min = 0
slider2.max = 200
slider2.style.position = "absolute"
slider2.style.marginLeft = "42%"
slider2.style.top = "350px"
slider2.value = 0




let sliderStyle = `
.slider {
    user-select: none;
    list-style-type: none;
    -webkit-font-smoothing: antialiased;
    font-family: Open-Sans;
    font-size: 1em;
    -webkit-appearance: none;
    border-radius: 10px;
    height: 17px;
    border: 2px solid rgba(255,255,255,0.2);
    opacity: 0.8;
    background: rgb(0 ,0 ,0 ,0.47);
    width: 81px;
    left: 15%;

}

.slider::-webkit-slider-thumb{
cursor:pointer;
appearance:none;
height:17px;
width:17px;
outline:none;
border-radius:50%;
position:revert;
background: red;
box-shadow: inset 0 0 5px rgba(0,0,0,.2);
}`

addStyle(sliderStyle)

slider1.className = 'slider'
slider2.className = 'slider'

HackGUI.appendChild(slider1)
HackGUI.appendChild(slider2)

let defval = slider1.value = 0

let Label1 = document.createElement("span")
let Label2 = document.createElement("span")
let Label3 = document.createElement("span")
let Label4 = document.createElement("span")
let Label5 = document.createElement("span")
let Label6 = document.createElement("span")

let LabelStyle = `

.label {

position: absolute;
color: red;
font-size: 13px;
padding: 2px 7%;
font-weight: 1000;

}`

addStyle(LabelStyle)

Label1.className = 'label'
Label2.className = 'label'
Label3.className = 'label'
Label4.className = 'label'
Label5.className = 'label'
Label6.className = 'label'

Label1.innerText = 'A队'
Label2.innerText = 'B队'
Label3.innerText = '混战'
Label4.innerText = '三开'


setInterval(function UpdateInnerText() {
    Label5.innerText = ` A队 [${slider1.value}] (Num1):`
    Label6.innerText = ` B队 [${slider2.value}] (Num2):`
}, -1)

Label1.style.top = '100px'
Label2.style.top = '150px'
Label3.style.top = '200px'
Label4.style.top = '250px'
Label5.style.top = '300px'
Label6.style.top = '350px'

HackGUI.appendChild(Label1)
HackGUI.appendChild(Label2)
HackGUI.appendChild(Label3)
HackGUI.appendChild(Label4)
HackGUI.appendChild(Label5)
HackGUI.appendChild(Label6)



function leftbattlefield() {
    const shiftleftdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Shift",
            keyCode: 16,
            which: 16,
            code: "ShiftLeft",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: true,
            repeat: true
        })
    )
    const shiftleftup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Shift",
            keyCode: 16,
            which: 16,
            code: "ShiftLeft",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: true,
            repeat: true
        })
    )
    const enterdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const enterup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    }

function rightbattlefield() {
    const shiftrightdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Shift",
            keyCode: 16,
            which: 16,
            code: "ShiftRight",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: true,
            repeat: true
        })
    )
    const shiftrightup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Shift",
            keyCode: 16,
            which: 16,
            code: "ShiftRight",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: true,
            repeat: true
        })
    )
    const enterdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const enterup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    }



function clicker() {

       const minedown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "5",
            keyCode: 53,
            which: 53,
            code: "Digit5",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const mineup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "5",
            keyCode: 53,
            which: 53,
            code: "Digit5",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    }

function guaji() {
    const adown = document.body.dispatchEvent(new KeyboardEvent('keydown', {
        // ...其他属性配置...
        bubbles: true,
        cancelBubble: false,
        cancelable: true,
        key: "a",// 将 "1" 改为 "a"
        keyCode: 65, // 对应 "a" 键的 keyCode
        which: 65,// 对应 "a" 键的 which 值
        code: "KeyA", // 对应 "a" 键的 code 值
        location: 0,
        altKey: false,
        ctrlKey: false,
        metaKey: false,
        shiftKey: false,
        repeat: true
    }));

    // 添加按下 'a' 键后的第一个延迟
    setTimeout(() => {
        const aup = document.body.dispatchEvent(new KeyboardEvent('keyup', {
            // ...其他属性配置...
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "a",// 将 "1" 改为 "a"
            keyCode: 65, // 对应 "a" 键的 keyCode
            which: 65,// 对应 "a" 键的 which 值
            code: "KeyA", // 对应 "a" 键的 code 值
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        }));

        // 添加 'a' 键和 'd' 键之间的延迟
        setTimeout(() => {
            const ddown = document.body.dispatchEvent(new KeyboardEvent('keydown', {
                // ...模拟按下 'd' 键的属性配置...
                bubbles: true,
                cancelBubble: false,
                cancelable: true,
                key: "d",// 将 "a" 改为 "d"
                keyCode: 68, // 对应 "d" 键的 keyCode
                which: 68, // 对应 "d" 键的 which 值
                code: "KeyD", // 对应 "d" 键的 code 值
                location: 0,
                altKey: false,
                ctrlKey: false,
                metaKey: false,
                shiftKey: false,
                repeat: true
            }));

            // 添加按下 'd' 键后的延迟
            setTimeout(() => {
                const dup = document.body.dispatchEvent(new KeyboardEvent('keyup', {
                    // ...模拟释放 'd' 键的属性配置...
                    bubbles: true,
                    cancelBubble: false,
                    cancelable: true,
                    key: "d",// 将 "a" 改为 "d"
                    keyCode: 68, // 对应 "d" 键的 keyCode
                    which: 68,// 对应 "d" 键的 which 值
                    code: "KeyD", // 对应 "d" 键的 code 值
                    location: 0,
                    altKey: false,
                    ctrlKey: false,
                    metaKey: false,
                    shiftKey: false,
                    repeat: true
                }));
            }, 500); // 'd' 键延迟时间为 100 毫秒
        }, 1000); // 'a' 键和 'd' 键之间的延迟时间为 100 毫秒
    }, 500); // 'a' 键延迟时间为 100 毫秒
}







function sups() {
    const armordown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "2",
            keyCode: 50,
            which: 50,
            code: "Digit2",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const armorup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "j",
            keyCode: 74,
            which: 50,
            code: "Digit2",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const dmgdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "3",
            keyCode: 51,
            which: 51,
            code: "Digit3",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const dmgup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "3",
            keyCode: 51,
            which: 51,
            code: "Digit3",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const speeddown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "4",
            keyCode: 52,
            which: 52,
            code: "Digit4",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )

    const speedup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "4",
            keyCode: 52,
            which: 52,
            code: "Digit4",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    }

function hunzhan() {
    const jdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "j", // 将1改为j
            keyCode: 74, // 对应j键的keyCode
            which: 74, // 对应j键的which值
            code: "KeyJ", // 对应j键的code值
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const jup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "j", // 将1改为j
            keyCode: 74, // 对应j键的keyCode
            which: 74,// 对应j键的which值
            code: "KeyJ", // 对应j键的code值
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const enterdown = document.body.dispatchEvent(
        new KeyboardEvent('keydown', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    const enterup = document.body.dispatchEvent(
        new KeyboardEvent('keyup', {
            bubbles: true,
            cancelBubble: false,
            cancelable: true,
            key: "Enter",
            keyCode: 13,
            which: 13,
            code: "Enter",
            location: 0,
            altKey: false,
            ctrlKey: false,
            metaKey: false,
            shiftKey: false,
            repeat: true
        })
    )
    }


let up = 0;
let hunzhanInterval;


//混战
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 105 && getChatState() == null) {
        up++
        if(up%2==1) {
            hunzhanInterval = setInterval(hunzhan, 0);
            Button3.style.color = 'White'
            Button3.children[0].style.right = "6%"
            Button3.children[0].style.backgroundColor = "black"
        }
        if(up%2==0) {
            clearInterval(hunzhanInterval);
            Button3.children[0].style.right = "60%"
            Button3.children[0].style.backgroundColor = "red"
            Button3.style.color = 'radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)'
        }
    }
});





let vp = 0;
let supsInterval;
//三开
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 100 && getChatState() == null) {
        vp++
        if(vp%2==1) {
            supsInterval = setInterval(sups, slider2.value);
            Button4.style.color = 'White'
            Button4.children[0].style.right = "6%"
            Button4.children[0].style.backgroundColor = "black"
        }
        if(vp%2==0) {
            clearInterval(supsInterval);
            Button4.children[0].style.right = "60%"
            Button4.children[0].style.backgroundColor = "red"
            Button4.style.color = 'radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)'
        }
    }
});



let ip = 0;
let leftbattlefieldInterval;
//左队
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 103 && getChatState() == null) {
        ip++
        if(ip%2==1) {
            Button1.style.color = 'White'
            Button1.children[0].style.right = "6%"
            Button1.children[0].style.backgroundColor = "black"
            leftbattlefieldInterval = setInterval(leftbattlefield, slider1.value);
        }
        if(ip%2==0) {
            clearInterval(leftbattlefieldInterval);
            Button1.children[0].style.right = "60%"
            Button1.children[0].style.backgroundColor = "red"
            Button1.style.color = 'radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)'
        }
    }
});

let op = 0;
let rightbattlefieldInterval;
//右队
document.addEventListener('keydown', (e) => {
    if(e.keyCode === 104 && getChatState() == null) {
        op++
        if(op%2==1) {
            rightbattlefieldInterval = setInterval(rightbattlefield, slider2.value);
            Button2.style.color = 'White'
            Button2.children[0].style.right = "6%"
            Button2.children[0].style.backgroundColor = "black"
        }
        if(op%2==0) {
            clearInterval(rightbattlefieldInterval);
            Button2.children[0].style.right = "60%"
            Button2.children[0].style.backgroundColor = "red"
            Button2.style.color = 'radial-gradient(50% 100% at 50% 100%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 100%)'
        }
    }
});

let pressCount = 0;

document.addEventListener('keydown', (e) => {
    if ( e.keyCode == 102 && getChatState() == null ){
        pressCount ++
        if(pressCount%2==1){
            root.appendChild(HackGUI)
        }
        if(pressCount%2==0){
            root.removeChild(HackGUI)
        }
    }
});





function draggable(el) {
    el.addEventListener('mousedown', function(e) {
        var offsetX = e.clientX - parseInt(window.getComputedStyle(this).left);
        var offsetY = e.clientY - parseInt(window.getComputedStyle(this).top);

        function mouseMoveHandler(e) {
            if (e.target != slider1 && e.target != slider2) {
                el.style.top = (e.clientY - offsetY) + 'px';
                el.style.left = (e.clientX - offsetX) + 'px';
            }
        }

        function reset() {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', reset);
        }

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', reset);
    });
}

draggable(HackGUI);

root.appendChild(HackGUI);




let hackEnabled = false; // 用于跟踪挂机功能的启用状态
let toggleButton = document.querySelector('.ToggleButton');
let clickerInterval;


// 监听Num3键的按下事件
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 82 && getChatState() == null ) {
        if (!hackEnabled) {
            // 启用叠雷功能
            hackEnabled = true;
            toggleButton.innerText = '关闭地雷';
            clickerInterval = setInterval(clicker, 5);//地雷延迟
        } else {
            // 停止叠雷功能
            hackEnabled = false;
            toggleButton.innerText = '开启地雷';
            clearInterval(clickerInterval);
        }
    }
});


let hackEnabled1 = false; // 用于跟踪挂机功能的启用状态

let guajiInterval;

document.addEventListener('keydown', (event) => {
    if (event.keyCode === 101 && getChatState() == null ) {
        if (!hackEnabled1) {

            hackEnabled1 = true;
            StartHackButton.innerText = '停止挂机';
            guajiInterval = setInterval(guaji, 3000);//挂机延迟
        } else {

            hackEnabled1 = false;
            StartHackButton.innerText = '开始挂机';
            clearInterval(guajiInterval);
        }
    }
});

