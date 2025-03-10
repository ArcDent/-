// ==UserScript==
// @name         安逸￥屏蔽词￥取消记住密码￥绿色特供版
// @version      1.2.3
// @author       Arc
// @downloadURL  https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/绿色特供屏蔽词.user.js
// @updateURL    https://gitee.com/ArcDent/Arc/raw/main/JS-油猴脚本/绿色特供屏蔽词.user.js
// @match        https://3dtank.com/play/
// @match        https://game.4399iw2.com/yxtk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tankionline.com
// ==/UserScript==
(function() {
    'use strict';

    document.addEventListener('input', function(event) {
        var target = event.target;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
            // 检测输入是否为 /49kf ，若是则打开指定网址
            if (target.value.trim() === '/49kf') {
                window.open('https://u.4399.com/kf/im/3Dtk', '_blank');
            }

            // 检测输入是否为 /kf ，若是则打开指定网址
            if (target.value.trim() === '/kf') {
                window.open('https://admin.qidian.qq.com/template/blue/mp/menu/qr-code-jump-market.html?linkType=0&env=ol&kfuin=3009072421&fid=327&key=f3321e05f6258773ceb56a6411e30ff7&cate=1&source=&isLBS=&isCustomEntry=&type=16&', '_blank');
            }
            target.value = target.value.replace(/\u5f31\u667a/g, '\u5f31‎\u667a');
            target.value = target.value.replace(/\u6211\u53bb/g, '\u6211‎\u53bb');
            target.value = target.value.replace(/\u7ed9/g, '\u7d66');
            target.value = target.value.replace(/\u5988/g, '\u51af');
            target.value = target.value.replace(/\u6740/g, '\u6bba');
            target.value = target.value.replace(/\u81ea\u62cd/g, '\u81ea‎\u62cd');
            target.value = target.value.replace(/\u51fa/g, '\u5c80');
            target.value = target.value.replace(/\u53f7/g, '\u547a');
            target.value = target.value.replace(/\u5e9f/g, '\u8153');
            target.value = target.value.replace(/\u5e72/g, '\u6746');
            target.value = target.value.replace(/\u54ed\u4e48/g, '\u54ed‎\u4e48');
            target.value = target.value.replace(/\u6eda/g, '\u6efe');
            target.value = target.value.replace(/\u624b/g, '\u5b88');
            target.value = target.value.replace(/\u501f/g, '\u4ebb\u6614');
            target.value = target.value.replace(/\u52a0/g, '\u8304');
            target.value = target.value.replace(/\u5237\u673a/g, '\u800d‎\u6025');
            target.value = target.value.replace(/\u72d7/g, '\u6784');
            target.value = target.value.replace(/\u5927\u4fbf/g, '\u5927‎\u4fbf');
            target.value = target.value.replace(/\u8d77\u8bc9/g, '\u8d77‎\u8bc9');
            target.value = target.value.replace(/\u65fa\u8d22/g, '\u65fa‎\u8d22');
            target.value = target.value.replace(/\u5f00/g, '\u958b');
            target.value = target.value.replace(/\u6302/g, '\u6842');
            target.value = target.value.replace(/\u6362/g, '\u63db');
            target.value = target.value.replace(/\u5e7f\u4e1c\u7334/g, '\u5e7f‎\u4e1c\u7334');
            target.value = target.value.replace(/\u674e\u68a6\u51e1/g, '\u674e\u68a6\u80a5');
            target.value = target.value.replace(/\u7206\u7834/g, '\u7206‎\u7834');
            target.value = target.value.replace(/\u5b50/g, '\u5b57');
            target.value = target.value.replace(/\u732a/g, '\u8c6c');
            target.value = target.value.replace(/\u516c/g, '\u529f');
            target.value = target.value.replace(/\u65e5/g, '\u6c1c');
            target.value = target.value.replace(/\u624b/g, '\u5b88');
            target.value = target.value.replace(/\u6536/g, '\u53ce');
            target.value = target.value.replace(/\u4e8c/g, '\u5c13');
            target.value = target.value.replace(/\u5988/g, '\u75f2');
            target.value = target.value.replace(/\u8b66\u5bdf/g, '\u8b66‎\u5bdf');
            target.value = target.value.replace(/\u53d1/g, '\u72ae');
            target.value = target.value.replace(/\u51fb/g, '\u6025');
            target.value = target.value.replace(/\u811a/g, '\u8173');
            target.value = target.value.replace(/\u5934/g, '\u982d');
            target.value = target.value.replace(/\u5077/g, '\u5078');
            target.value = target.value.replace(/\u529e/g, '\u7248');
            target.value = target.value.replace(/\u81ed/g, '\u6ba0');
            target.value = target.value.replace(/\u7239/g, '\u74de');
            target.value = target.value.replace(/\u4e1c\u897f/g, '\u4e1c‎\u897f');
            target.value = target.value.replace(/\u8d31/g, '\u621d');
            target.value = target.value.replace(/\u9700\u8981/g, '\u9700‎\u8981');
            target.value = target.value.replace(/\u9ed1\u5386\u53f2/g, '\u9ed1\u5386‎\u53f2');
            target.value = target.value.replace(/\u9891/g, '\u983b');
            target.value = target.value.replace(/\u5c4f/g, '\u983b');
            target.value = target.value.replace(/\u6050\u6016/g, '\u6050‎\u6016');
            target.value = target.value.replace(/\u4e60/g, '\u620f');
            target.value = target.value.replace(/\u7784/g, '\u7de2');
            target.value = target.value.replace(/\u4e45/g, '\u9152');
            target.value = target.value.replace(/\u5e7f\u544a/g, '\u5e7f‎\u544a');
            target.value = target.value.replace(/\u4e2d\u4ecb/g, '\u4e2d‎\u4ecb');
            target.value = target.value.replace(/\u5bb6/g, '\u50a2');
            target.value = target.value.replace(/\u64cd/g, '\u6fa1');
            target.value = target.value.replace(/\u8349/g, '\u6fa1');
            target.value = target.value.replace(/\u66f9/g, '\u6fa1');
            target.value = target.value.replace(/\u5237/g, '\u800d');
            target.value = target.value.replace(/\u4e0d\u884c/g, '\u4e0d‎\u884c');
            target.value = target.value.replace(/\u5565/g, '\u503d');
            target.value = target.value.replace(/\u8214/g, '\u7530');
            target.value = target.value.replace(/\u4ed4/g, '\u5407');
            target.value = target.value.replace(/\u5c3f/g, '\u8132');
            target.value = target.value.replace(/\u8109/g, '\u9721');
            target.value = target.value.replace(/\u5356/g, '\u85b6');
            target.value = target.value.replace(/\u5976/g, '\u4e43');
            target.value = target.value.replace(/\u6478\u4f60/g, '\u6478‎\u4f60');
            target.value = target.value.replace(/\u903c/g, '\u798f');
            target.value = target.value.replace(/\u70c2/g, '\u680f');
            target.value = target.value.replace(/\u5757/g, '\u5feb');
            target.value = target.value.replace(/\u6263/g, '\u7b58');
            target.value = target.value.replace(/\u4f60\u5417/g, '\u4f60‎\u5417');
            target.value = target.value.replace(/\u5ba2/g, '\u5c05');
            target.value = target.value.replace(/\u755c/g, '\u6ec0');
            target.value = target.value.replace(/\u521d/g, '\u695a');
            target.value = target.value.replace(/\u8c01/g, '\u8ab0');
            target.value = target.value.replace(/\u62fc\u97f3/g, '\u62fc‎\u97f3');
            target.value = target.value.replace(/\u725b/g, '\u6c7c');
            target.value = target.value.replace(/\u4e70/g, '\u85b6');
            target.value = target.value.replace(/\u63a8\u7ffb/g, '\u63a8‎\u7ffb');
            target.value = target.value.replace(/\u673a/g, '\u77f6');
            target.value = target.value.replace(/\u98de/g, '\u98db');
            target.value = target.value.replace(/\u4ec0\u4e48DX/g, '\u4ec0\u4e48‎DX');
            target.value = target.value.replace(/\u5361/g, '\u9272');
            target.value = target.value.replace(/\u505a/g, '\u4f5c');
            target.value = target.value.replace(/\u5427/g, '\u628a');
            target.value = target.value.replace(/\u6b8b/g, '\u60e8');
            target.value = target.value.replace(/\u723d/g, '\u6f3a');
            target.value = target.value.replace(/\u6280/g, '\u8ba1');
            target.value = target.value.replace(/\u65b0\u95fb/g, '\u65b0‎\u95fb');
            target.value = target.value.replace(/\u523a\u6fc0/g, '\u523a‎\u6fc0');
            target.value = target.value.replace(/\u56fd\u798f/g, '\u56fd\u5e45');
            target.value = target.value.replace(/\u7a7f/g, '\u4f20');
            target.value = target.value.replace(/\u5973/g, '\u9495');
            target.value = target.value.replace(/\u5916/g, '\u8fef');
            target.value = target.value.replace(/\u6742/g, '\u96dc');
            target.value = target.value.replace(/\u7206\u70b8/g, '\u7206‎\u70b8');
            target.value = target.value.replace(/\u9a97/g, '\u9a19');
            target.value = target.value.replace(/\u6d4b\u8bd5/g, '\u6d4b‎\u8bd5');
            target.value = target.value.replace(/\u53e3/g, '\u7b58');
            target.value = target.value.replace(/\u5a4a/g, '\u88f1');
            target.value = target.value.replace(/\u7cbe/g, '\u9756');
            target.value = target.value.replace(/\u641e\u4f60/g, '\u641e‎\u4f60');
            target.value = target.value.replace(/\u8272/g, '\u94ef');
            target.value = target.value.replace(/\u5fc5/g, '\u924d');
            target.value = target.value.replace(/\u6253\u4eba/g, '\u6253‎\u4eba');
            target.value = target.value.replace(/\u7fa4/g, '\u8f11');
            target.value = target.value.replace(/\u6002/g, '\u8bbc');
            target.value = target.value.replace(/\u9001/g, '\u8bbc');
            target.value = target.value.replace(/\u5bc6/g, '\u6a12');
            target.value = target.value.replace(/\u6295/g, '\u982d');
            target.value = target.value.replace(/\u6c99/g, '\u7802');
            target.value = target.value.replace(/\u6cd5/g, '\u743a');
            target.value = target.value.replace(/\u9ec4/g, '\u9ec3');
            target.value = target.value.replace(/\u6bcd/g, '\u6bcc');
            target.value = target.value.replace(/\u62bd/g, '\u7270');
            target.value = target.value.replace(/\u803b\u8fb1/g, '\u803b‎\u8fb1');
            target.value = target.value.replace(/\u5ba0\u7269/g, '\u5ba0‎\u7269');
            target.value = target.value.replace(/\u8822/g, '\u60f7');
            target.value = target.value.replace(/\u54e5\u54e5/g, '\u54e5‎\u54e5');
            target.value = target.value.replace(/\u540a/g, '\u94de');
            target.value = target.value.replace(/\u87ba/g, '\u9aa1');
            target.value = target.value.replace(/\u4eb2/g, '\u89aa');
            target.value = target.value.replace(/\u5904/g, '\u51e6');
            target.value = target.value.replace(/\u767d\u75f4/g, '\u767d‎\u75f4');
            target.value = target.value.replace(/\u5ae9/g, '\u5af0');
            target.value = target.value.replace(/\u8f66\u5e93/g, '\u8f66‎\u5e93');
            target.value = target.value.replace(/\u4e09/g, '\u4ee8');
            target.value = target.value.replace(/\u5e7b/g, '\u6b22');
            target.value = target.value.replace(/\u4e0a\u5e1d/g, '\u4e0a‎\u5e1d');
            target.value = target.value.replace(/\u968f\u5fc3\u6240\u6b32/g, '\u968f\u5fc3‎\u6240\u6b32');
            target.value = target.value.replace(/\u767e\u5ea6/g, '\u767e‎\u5ea6');
            target.value = target.value.replace(/\u5929\u4e0b/g, '\u5929‎\u4e0b');
            target.value = target.value.replace(/\u5a31/g, '\u5a1b');
            target.value = target.value.replace(/\u4e50/g, '\u6cfa');
            target.value = target.value.replace(/\u9000\u6e38/g, '\u9000‎\u6e38');
            target.value = target.value.replace(/\u6298\u78e8/g, '\u6298‎\u78e8');
            target.value = target.value.replace(/\u9700\u8981/g, '\u9700‎\u8981');
            target.value = target.value.replace(/\u8dea\u4e0b/g, '\u8dea‎\u4e0b');
            target.value = target.value.replace(/\u8c6a/g, '\u568e');
            target.value = target.value.replace(/\u660a/g, '\u6dcf');
            target.value = target.value.replace(/\u7693/g, '\u6667');
            target.value = target.value.replace(/\u6d69/g, '\u6667');
            target.value = target.value.replace(/\u8017/g, '\u869d');
            target.value = target.value.replace(/\u9e21/g, '\u9cee');
            target.value = target.value.replace(/\u5993/g, '\u4f0e');
            target.value = target.value.replace(/\u72b8/g, '\u9a6c');
            target.value = target.value.replace(/\u5c4e/g, '\u9242');
            target.value = target.value.replace(/\u50bb/g, '\u7e4c');
            target.value = target.value.replace(/\u6bdb/g, '\u6786');
            target.value = target.value.replace(/\u9f3b/g, '\u8963');
            target.value = target.value.replace(/\u6bd9/g, '\u6583');
            target.value = target.value.replace(/\u4ef7/g, '\u5fe6');
            target.value = target.value.replace(/\u6c61/g, '\u6c5a');
            target.value = target.value.replace(/\u89c6/g, '\u8996');
            target.value = target.value.replace(/\u67aa/g, '\u69cd');
            target.value = target.value.replace(/\u8902/g, '\u6842');
            target.value = target.value.replace(/\u72ac/g, '\u6c71');
            target.value = target.value.replace(/\u73af/g, '\u5425');
            target.value = target.value.replace(/\u6ce8\u518c/g, '\u6ce8‎\u518c');
            target.value = target.value.replace(/\u7fa4/g, '\u8f11');
            target.value = target.value.replace(/\u8054\u7cfb/g, '\u8054‎\u7cfb');
            target.value = target.value.replace(/\u77ac\u79fb/g, '\u77ac‎\u79fb');
            target.value = target.value.replace(/\u4e0d\u73a9\u4e86/g, '\u4e0d‎\u73a9\u4e86');
            target.value = target.value.replace(/\u6170/g, '\u5c09');
            target.value = target.value.replace(/\u80be/g, '\u814e');
            target.value = target.value.replace(/\u7a74/g, '\u6cec');
            target.value = target.value.replace(/\u5143/g, '\u82ab');
            target.value = target.value.replace(/\u79d1/g, '\u5d59');
            target.value = target.value.replace(/\u5899/g, '\u8537');
            target.value = target.value.replace(/\u58c1/g, '\u5b16');
            target.value = target.value.replace(/\u56db/g, '\u9a77');
            target.value = target.value.replace(/\u4e1d\u889c/g, '\u4e1d‎\u889c');
            target.value = target.value.replace(/\u5185/g, '\u5167');
            target.value = target.value.replace(/\u513f/g, '\u5532');
            target.value = target.value.replace(/\u5b66\u751f/g, '\u5b66‎\u751f');
            target.value = target.value.replace(/\u9a9a/g, '\u6414');
            target.value = target.value.replace(/\u54a8\u8be2/g, '\u54a8‎\u8be2');
            target.value = target.value.replace(/\u4e73/g, '\u5b7a');
            target.value = target.value.replace(/\u7ea2\u9886\u5dfe/g, '\u7ea2‎\u9886\u5dfe');
            target.value = target.value.replace(/\u9a71\u52a8\u5668/g, '\u9a71‎\u52a8\u5668');
            target.value = target.value.replace(/\u9a91\u5175/g, '\u9a91‎\u5175');
            target.value = target.value.replace(/\u4f18\u60e0/g, '\u4f18‎\u60e0');
            target.value = target.value.replace(/\u8f66/g, '\u7817');
            target.value = target.value.replace(/\u7f8e\u56fd/g, '\u7f8e‎\u56fd');
            target.value = target.value.replace(/\u6bd4/g, '\u5421');
            target.value = target.value.replace(/\u53cd\u653b/g, '\u53cd‎\u653b');
            target.value = target.value.replace(/\u5408\u6210/g, '\u5408‎\u6210');
            target.value = target.value.replace(/\u8089/g, '\u79b8');
            target.value = target.value.replace(/\u764c\u75c7/g, '\u764c‎\u75c7');
            target.value = target.value.replace(/\u5c41/g, '\u5564');
            target.value = target.value.replace(/\u7ef4\u62a4/g, '\u7ef4‎\u62a4');
            target.value = target.value.replace(/\u8d39/g, '\u9544');
            target.value = target.value.replace(/\u5b98\u65b9/g, '\u5b98‎\u65b9');
            target.value = target.value.replace(/\u51ef/g, '\u94e0');
            target.value = target.value.replace(/\u5496/g, '\u9272');
            target.value = target.value.replace(/\u6027/g, '\u59d3');
            target.value = target.value.replace(/\u6c28/g, '\u5b89');
            target.value = target.value.replace(/\u97e9\u56fd/g, '\u97e9‎\u56fd');
            target.value = target.value.replace(/\u4ee3/g, '\u73b3');
            target.value = target.value.replace(/\u5f7c/g, '\u8bd0');
            target.value = target.value.replace(/\u74dc/g, '\u526e');
            target.value = target.value.replace(/\u522e/g, '\u526e');
            target.value = target.value.replace(/\u902e\u6355/g, '\u902e‎\u6355');
            target.value = target.value.replace(/\u83ca\u82b1/g, '\u83ca‎\u82b1');
            target.value = target.value.replace(/\u706b\u70ac/g, '\u706b‎\u70ac');
            target.value = target.value.replace(/\u5211\u6ee1\u91ca\u653e/g, '\u5211\u6ee1‎\u91ca\u653e');
            target.value = target.value.replace(/\u5c3c/g, '\u6ce5');
            target.value = target.value.replace(/\u739b/g, '\u51af');
            target.value = target.value.replace(/\u70ed\u821e/g, '\u70ed‎\u821e');
            target.value = target.value.replace(/\u5b89\u88c5/g, '\u5b89‎\u88c5');
            target.value = target.value.replace(/\u63d2/g, '\u63f7');
            target.value = target.value.replace(/\u76d1\u63a7/g, '\u76d1‎\u63a7');
            target.value = target.value.replace(/\u8bfe/g, '\u68f5');
            target.value = target.value.replace(/\u53f0\u6e7e/g, '\u53f0‎\u6e7e');
            target.value = target.value.replace(/\u70ed\u6b66\u5668/g, '\u70ed\u6b66‎\u5668');
            target.value = target.value.replace(/\u57ae/g, '\u5938');
            target.value = target.value.replace(/\u8de8/g, '\u5938');
            target.value = target.value.replace(/\u80ef/g, '\u5938');
            target.value = target.value.replace(/\u80f8\u7f69/g, '\u80f8‎\u7f69');
            target.value = target.value.replace(/\u5167\u8863/g, '\u5167‎\u8863');
            target.value = target.value.replace(/\u88e4\u88c6/g, '\u88e4‎\u88c6');
            target.value = target.value.replace(/\u815a/g, '\u5576');
            target.value = target.value.replace(/\u5978/g, '\u76d1');
            target.value = target.value.replace(/\u8180\u80f1/g, '\u8180‎\u80f1');
            target.value = target.value.replace(/\u4e0d\u4e3e/g, '\u4e0d‎\u4e3e');
            target.value = target.value.replace(/\u6d3b\u4e0d\u8d77/g, '\u6d3b\u4e0d‎\u8d77');
            target.value = target.value.replace(/\u6211\u6fa1\u4f60\u51af/g, '\u6211\u6fa1\u79f0\u51af');
            target.value = target.value.replace(/\u5173\u62bc/g, '\u5173‎\u62bc');
            target.value = target.value.replace(/\u5ba1\u67e5/g, '\u5ba1‎\u67e5');
            target.value = target.value.replace(/\u4e0b\u8f7d/g, '\u4e0b‎\u8f7d');
            target.value = target.value.replace(/\u5a18/g, '\u917f');
            target.value = target.value.replace(/\u8f85/g, '\u8f14');
            target.value = target.value.replace(/\u5e73\u53f0/g, '\u5e73‎\u53f0');
            target.value = target.value.replace(/\u9ed1\u68ee\u6797/g, '\u9ed1‎\u68ee\u6797');
            target.value = target.value.replace(/\u9634/g, '\u836b');
            target.value = target.value.replace(/\u6b7b/g, '\u9a77');
            target.value = target.value.replace(/\u5395/g, '\u53a0');
            target.value = target.value.replace(/\u6c49/g, '\u6c4a');
            target.value = target.value.replace(/\u5821/g, '\u7172');
            target.value = target.value.replace(/\u5b55/g, '\u4f1d');
            target.value = target.value.replace(/\u7c91\u7c91/g, '\u7c91‎\u7c91');
            target.value = target.value.replace(/\u5c38/g, '\u9e24');
            target.value = target.value.replace(/\u88f8/g, '\u502e');
            target.value = target.value.replace(/\u7f8e\u7334\u738b/g, '\u7f8e\u7334‎\u738b');
            target.value = target.value.replace(/\u8c6c\u961f\u53cb/g, '\u8c6c‎\u961f\u53cb');
            target.value = target.value.replace(/\u7caa/g, '\u594b');
            target.value = target.value.replace(/\u5c0f\u6cec/g, '\u5c0f‎\u6cec');
            target.value = target.value.replace(/\u8d25\u7c7b/g, '\u8d25‎\u7c7b');
            target.value = target.value.replace(/\u4e2d\u56fd/g, '\u4e2d‎\u56fd');
            target.value = target.value.replace(/\u80bf/g, '\u4ef2');
            target.value = target.value.replace(/\u4fc4\u7f57\u65af/g, '\u4fc4\u7f57‎\u65af');
            target.value = target.value.replace(/\u8c6c\u982d/g, '\u8c6c‎\u982d');
            target.value = target.value.replace(/\u72af\u7f6a/g, '\u72af‎\u7f6a');
            target.value = target.value.replace(/\u5f15\u5bfc/g, '\u5f15‎\u5bfc');
            target.value = target.value.replace(/\u8fb1\u9a82/g, '\u8fb1‎\u9a82');
            target.value = target.value.replace(/\u8521\u5f90\u5764/g, '\u8521\u5f90‎\u5764');
            target.value = target.value.replace(/\u7537\u540c/g, '\u7537‎\u540c');
            target.value = target.value.replace(/\u5c11\u5987/g, '\u5c11‎\u5987');
            target.value = target.value.replace(/\u94f6\u884c/g, '\u94f6‎\u884c');
            target.value = target.value.replace(/\u4e01\u5b57\u88e4/g, '\u4e01‎\u5b57\u88e4');
            target.value = target.value.replace(/\u667a\u969c/g, '\u667a‎\u969c');
            target.value = target.value.replace(/\u4f69\u5947/g, '\u4f69‎\u5947');
            target.value = target.value.replace(/\u8eab\u4efd\u8bc1/g, '\u8eab‎\u4efd\u8bc1');
            target.value = target.value.replace(/\u8bc1\u4ef6/g, '\u8bc1‎\u4ef6');
            target.value = target.value.replace(/\u5fae\u4fe1/g, '\u5fae‎\u4fe1');
            target.value = target.value.replace(/\u5b59/g, '\u72f2');
            target.value = target.value.replace(/\u800c/g, '\u6d0f');
            target.value = target.value.replace(/\u6e9c/g, '\u905b');
            target.value = target.value.replace(/\u6076\u5fc3\u4eba/g, '\u6076\u5fc3‎\u4eba');
            target.value = target.value.replace(/\u72ec\u88c1/g, '\u72ec‎\u88c1');
            target.value = target.value.replace(/\u6728\u8033/g, '\u6728‎\u8033');
            target.value = target.value.replace(/\u9f9f/g, '\u4e80');
            target.value = target.value.replace(/\u738b\u516b/g, '\u738b‎\u516b');
            target.value = target.value.replace(/\u6234\u7ea2/g, '\u6234‎\u7ea2');
            target.value = target.value.replace(/\u804a\u5929\u5ba4/g, '\u804a\u5929‎\u5ba4');
            target.value = target.value.replace(/\u7f51\u7edc\u4e5e\u4e10/g, '\u7f51\u7edc‎\u4e5e\u4e10');
            target.value = target.value.replace(/\u5783\u573e/g, '\u5783‎\u573e');
            target.value = target.value.replace(/\u592a\u76d1/g, '\u592a‎\u76d1');
            target.value = target.value.replace(/\u4f53\u68c0/g, '\u4f53‎\u68c0');
            target.value = target.value.replace(/\u68c0\u67e5/g, '\u68c0‎\u67e5');
            target.value = target.value.replace(/\u4e0a\u4f60/g, '\u4e0a‎\u4f60');
            target.value = target.value.replace(/\u4e00\u70ae/g, '\u4e00‎\u70ae');
            target.value = target.value.replace(/\u69b4\u5f39/g, '\u69b4‎\u5f39');
            target.value = target.value.replace(/\u658c/g, '\u6ee8');
            target.value = target.value.replace(/\u7238/g, '\u82ad');
            target.value = target.value.replace(/\u5341\u5b57\u519b/g, '\u5341‎\u5b57\u519b');
            target.value = target.value.replace(/\u5c4c/g, '\u6c48');
            target.value = target.value.replace(/\u96d5/g, '\u6c48');
            target.value = target.value.replace(/\u53fc/g, '\u6c48');
            target.value = target.value.replace(/\u5201/g, '\u6c48');
            target.value = target.value.replace(/\u7231\u62cd/g, '\u7231‎\u62cd');
            target.value = target.value.replace(/\u6c9f/g, '\u94a9');
            target.value = target.value.replace(/\u7f13/g, '\u953e');
            target.value = target.value.replace(/\u7559/g, '\u954f');
            target.value = target.value.replace(/\u4e3b\u4eba/g, '\u4e3b‎\u4eba');
            target.value = target.value.replace(/\u4fdd\u5b89/g, '\u4fdd‎\u5b89');
            target.value = target.value.replace(/\u7ba1\u7406/g, '\u7ba1‎\u7406');
            target.value = target.value.replace(/\u9760/g, '\u62f7');
            target.value = target.value.replace(/\u95ed/g, '\u9589');
            target.value = target.value.replace(/\u771f\u4eba/g, '\u771f‎\u4eba');
            target.value = target.value.replace(/\u8981\u597d/g, '\u8981‎\u597d');
            target.value = target.value.replace(/\u800d\u9272/g, '\u800d‎\u9272');
            target.value = target.value.replace(/\u4e03\u4e94/g, '\u4e03‎\u4e94');
            target.value = target.value.replace(/\u5c14/g, '\u5c13');
            target.value = target.value.replace(/\u62c9\u8428/g, '\u62c9‎\u8428');
            target.value = target.value.replace(/\u5927\u4f7f\u9986/g, '\u5927‎\u4f7f\u9986');
            target.value = target.value.replace(/\u5927\u5e08/g, '\u5927‎\u5e08');
            target.value = target.value.replace(/\u4ed8\u6b3e/g, '\u4ed8‎\u6b3e');
            target.value = target.value.replace(/\u6251\u514b/g, '\u6251‎\u514b');
            target.value = target.value.replace(/\u897f\u95e8\u5e86/g, '\u897f\u95e8‎\u5e86');
            target.value = target.value.replace(/\u4f5b\u6559/g, '\u4f5b‎\u6559');
            target.value = target.value.replace(/\u8b66\u65b9/g, '\u8b66‎\u65b9');
            target.value = target.value.replace(/\u6297\u9707/g, '\u6297‎\u9707');
            target.value = target.value.replace(/\u52fe\u516b/g, '\u8d2d‎\u516b');
            target.value = target.value.replace(/\u817e\u8baf/g, '\u817e‎\u8baf');
            target.value = target.value.replace(/\u54d4/g, '\u6bd5');
            target.value = target.value.replace(/\u6df7\u86cb/g, '\u6df7‎\u86cb');
            target.value = target.value.replace(/\u87ac/g, '\u893f');
            target.value = target.value.replace(/\u61c6/g, '\u893f');
            target.value = target.value.replace(/\u93ea/g, '\u893f');
            target.value = target.value.replace(/\u7cd9/g, '\u893f');
            target.value = target.value.replace(/\u8279/g, '\u893f');
            target.value = target.value.replace(/\u613a/g, '\u893f');
            target.value = target.value.replace(/\u9a32/g, '\u893f');
            target.value = target.value.replace(/\u8278/g, '\u893f');
            target.value = target.value.replace(/\u8dcc/g, '\u80c5');
            target.value = target.value.replace(/\u6633/g, '\u80c5');
            target.value = target.value.replace(/\u8fed/g, '\u80c5');
            target.value = target.value.replace(/\u8c0d/g, '\u80c5');
            target.value = target.value.replace(/\u53e0/g, '\u7589');
            target.value = target.value.replace(/\u4e07\u5c81/g, '\u4e07‎\u5c81');
            target.value = target.value.replace(/\u9500\u552e/g, '\u9500‎\u552e');
            target.value = target.value.replace(/\u62df/g, '\u59d2');
            target.value = target.value.replace(/\u68cd\u68d2/g, '\u68cd‎\u68d2');
            target.value = target.value.replace(/\u6233/g, '\u9f8a');
            target.value = target.value.replace(/\u9ad8\u5229\u8d37/g, '\u9ad8‎\u5229\u8d37');
            target.value = target.value.replace(/\u4ea4\u6613/g, '\u4ea4‎\u6613');
            target.value = target.value.replace(/\u4f60M/g, '\u4f60‎M');
            target.value = target.value.replace(/\u541b/g, '\u90e1');
            target.value = target.value.replace(/\u9000\u56e2/g, '\u9000‎\u56e2');
            target.value = target.value.replace(/\u975e\u6d32/g, '\u975e‎\u6d32');
            target.value = target.value.replace(/\u5e7f\u573a/g, '\u5e7f‎\u573a');
            target.value = target.value.replace(/\u9972\u6599/g, '\u9972‎\u6599');
            target.value = target.value.replace(/\u6d1e/g, '\u578c');
            target.value = target.value.replace(/\u9ad8\u8ddf/g, '\u9ad8‎\u8ddf');
            target.value = target.value.replace(/\u6d41\u6c13/g, '\u6d41‎\u6c13');
            target.value = target.value.replace(/\u53d8\u6001/g, '\u53d8‎\u6001');
            target.value = target.value.replace(/\u66b4\u529b/g, '\u66b4‎\u529b');
            target.value = target.value.replace(/\u5c60\u6bba/g, '\u5c60‎\u6bba');
            target.value = target.value.replace(/\u9721\u51b2\u661f/g, '\u2623');
            target.value = target.value.replace(/\u9721\u51b2/g, '\u2623');
            target.value = target.value.replace(/\u8d85\u983b/g, '\u2622');
            target.value = target.value.replace(/\u6838\u80fd/g, '\u2622');
            target.value = target.value.replace(/\u8fc7\u5851/g, '\u2622');
            target.value = target.value.replace(/\u8fc7\u901f/g, '\u2622');
            target.value = target.value.replace(/\u63a8\u8350/g, '\u63a8‎\u8350');
            target.value = target.value.replace(/\u5e8a/g, '\u521b');
            target.value = target.value.replace(/\u809b/g, '\u6760');
            target.value = target.value.replace(/\u6881/g, '\u7cb1');
            target.value = target.value.replace(/\u76d1\u7ba1\u5c40/g, '\u76d1‎\u7ba1\u5c40');
            target.value = target.value.replace(/\u5bfc\u5f39/g, '\u5bfc‎\u5f39');
            target.value = target.value.replace(/\u6b6a/g, '\u8fef');
            target.value = target.value.replace(/\u86e4\u87c6/g, '\u86e4‎\u87c6');
            target.value = target.value.replace(/\u4e11/g, '\u541c');
            target.value = target.value.replace(/\u963f\u5df4/g, '\u963f‎\u5df4');
            target.value = target.value.replace(/\u843d/g, '\u7edc');
            target.value = target.value.replace(/\u79df/g, '\u7ec4');
            target.value = target.value.replace(/\u6728\u9a6c/g, '\u6728‎\u9a6c');
            target.value = target.value.replace(/\u81ea\u7531/g, '\u81ea‎\u7531');
            target.value = target.value.replace(/\u7206\u7c73\u82b1/g, '\u7206‎\u7c73\u82b1');
            target.value = target.value.replace(/\u70d9/g, '\u7d61');
            target.value = target.value.replace(/\u897f\u7ea2\u67ff/g, '\u897f\u7ea2‎\u67ff');
            target.value = target.value.replace(/\u82d7/g, '\u55b5');
            target.value = target.value.replace(/\u8475/g, '\u777d');
            target.value = target.value.replace(/\u8759\u8760/g, '\u8759‎\u8760');
            target.value = target.value.replace(/\u4f01/g, '\u8fc4');
            target.value = target.value.replace(/\u7f8a/g, '\u6d0b');
            target.value = target.value.replace(/\u8d4b\u9a6c/g, '\u8d4b‎\u9a6c');
            target.value = target.value.replace(/\u6784\u53eb/g, '\u6784‎\u53eb');
            target.value = target.value.replace(/\u7ea2\u5b9d\u77f3/g, '\u7ea2\u5b9d‎\u77f3');
            target.value = target.value.replace(/\u601d\u4e86/g, '\u601d‎\u4e86');
            target.value = target.value.replace(/\u73a9\u706b/g, '\u73a9‎\u706b');
            target.value = target.value.replace(/\u552e/g, '\u7626');
            target.value = target.value.replace(/\u65b0\u51a0/g, '\u65b0‎\u51a0');
            target.value = target.value.replace(/\u75c5\u6bd2/g, '\u75c5‎\u6bd2');
            target.value = target.value.replace(/\u4f60\u9a6c/g, '\u4f60‎\u9a6c');
            target.value = target.value.replace(/\u8df3\u697c/g, '\u8df3‎\u697c');
            target.value = target.value.replace(/\u7624/g, '\u954f');
            target.value = target.value.replace(/\u4fbf\u5668/g, '\u4fbf‎\u5668');
            target.value = target.value.replace(/\u6c34\u94b1/g, '\u6c34‎\u94b1');
            target.value = target.value.replace(/\u590d\u5236/g, '\u590d‎\u5236');
            target.value = target.value.replace(/\u6253\u9ed1/g, '\u6253‎\u9ed1');
            target.value = target.value.replace(/\u6e7f\u4e86/g, '\u6e7f‎\u4e86');
            target.value = target.value.replace(/\u8111\u762b/g, '\u8111‎\u762b');
            target.value = target.value.replace(/\u8f6c\u5316/g, '\u8f6c‎\u5316');
            target.value = target.value.replace(/\u771f\u7a7a/g, '\u771f‎\u7a7a');
            target.value = target.value.replace(/\u9886\u53d6/g, '\u9886‎\u53d6');
            target.value = target.value.replace(/\u8fd8\u60f3\u8981/g, '\u8fd8\u60f3‎\u8981');
            target.value = target.value.replace(/\u7231\u76f4\u64ad/g, '\u7231\u76f4‎\u64ad');
            target.value = target.value.replace(/\u4eba\u4e5f/g, '\u4eba‎\u4e5f');
            target.value = target.value.replace(/\u5be1/g, '\u52df');
            target.value = target.value.replace(/\u4e2d\u592e/g, '\u4e2d‎\u592e');
            target.value = target.value.replace(/\u9a6c\u7684/g, '\u9a6c‎\u7684');
            target.value = target.value.replace(/\u57cb/g, '\u85b6');
            target.value = target.value.replace(/\u5348\u591c/g, '\u5348‎\u591c');
            target.value = target.value.replace(/\u5360\u9886/g, '\u5360‎\u9886');
            target.value = target.value.replace(/\u89e3\u5256/g, '\u89e3‎\u5256');
            target.value = target.value.replace(/\u707e/g, '\u70d6');
            target.value = target.value.replace(/\u540e\u5165/g, '\u540e‎\u5165');
            target.value = target.value.replace(/\u5fc3\u810f/g, '\u5fc3‎\u810f');
            target.value = target.value.replace(/\u65e0\u9650/g, '\u65e0‎\u9650');
            target.value = target.value.replace(/\u884c\u661f/g, '\u884c‎\u661f');
            target.value = target.value.replace(/\u5524/g, '\u63db');
            target.value = target.value.replace(/\u5668\u5b98/g, '\u5668‎\u5b98');
            target.value = target.value.replace(/\u6559\u6d3e/g, '\u6559‎\u6d3e');
            target.value = target.value.replace(/\u7236/g, '\u356e');
            target.value = target.value.replace(/\u79bd\u517d/g, '\u79bd‎\u517d');
            target.value = target.value.replace(/\u767e\u5e74/g, '\u767e‎\u5e74');
            target.value = target.value.replace(/\u7cdf/g, '\u906d');
            target.value = target.value.replace(/\u4e3b\u5b57/g, '\u4e3b‎\u5b57');
            target.value = target.value.replace(/\u9a91\u58eb/g, '\u9a91‎\u58eb');
            target.value = target.value.replace(/\u800d\u51e0/g, '\u800d‎\u51e0');
            target.value = target.value.replace(/\u97ad\u70ae/g, '\u97ad‎\u70ae');
            target.value = target.value.replace(/\u6253\u5012/g, '\u6253‎\u5012');
            target.value = target.value.replace(/\u7edf\u6cbb/g, '\u7edf‎\u6cbb');
            target.value = target.value.replace(/\u67d2/g, '\u4e03');
            target.value = target.value.replace(/\u55f7\u55f7\u53eb/g, '\u55f7‎\u55f7\u53eb');
            target.value = target.value.replace(/\u7c73\u7530\u5171/g, '\u7c73‎\u7530\u5171');
            target.value = target.value.replace(/\u7325\u7410/g, '\u7325‎\u7410');
            target.value = target.value.replace(/\u4fbf\u5b9c/g, '\u4fbf‎\u5b9c');
            target.value = target.value.replace(/\u9a82\u7684/g, '\u9a82‎\u7684');
            target.value = target.value.replace(/\u585e\u6ee1\u4f60/g, '\u585e‎\u6ee1\u4f60');
            target.value = target.value.replace(/\u5220/g, '\u73ca');
            target.value = target.value.replace(/\u4f5c\u5f0a/g, '\u4f5c‎\u5f0a');
            target.value = target.value.replace(/\u53fd/g, '\u51e0');
            target.value = target.value.replace(/\u4eba\u5927/g, '\u4eba‎\u5927');
            target.value = target.value.replace(/\u6ce5\u9a6c/g, '\u6ce5‎\u9a6c');
            target.value = target.value.replace(/\u7620\u8584/g, '\u7620‎\u8584');
            target.value = target.value.replace(/\u70b8\u5f39/g, '\u70b8‎\u5f39');
            target.value = target.value.replace(/\u978b\u54e5/g, '\u978b‎\u54e5');
            target.value = target.value.replace(/\u777e/g, '\u776a');
            target.value = target.value.replace(/\u776a\u4e38/g, '\u776a‎\u4e38');
            target.value = target.value.replace(/\u738b\u4f1f/g, '\u738b‎\u4f1f');
            target.value = target.value.replace(/\u84c4/g, '\u7a38');
            target.value = target.value.replace(/\u5420/g, '\u754e');
            target.value = target.value.replace(/\u96c6\u5408/g, '\u96c6‎\u5408');
            target.value = target.value.replace(/\u4e2d\u90fd/g, '\u4e2d‎\u90fd');
            //下面为自行添加部分
            target.value = target.value.replace(/\u78a7/g, '\u924d');
            target.value = target.value.replace(/\u7115/g, '\u6853');
            target.value = target.value.replace(/\u63d0\u70bc/g, '\u63d0‎\u70bc');
            target.value = target.value.replace(/\u865a\u7a7a/g, '\u865a‎\u7a7a');
            target.value = target.value.replace(/\u7a7a\u4e2d/g, '\u7a7a‎\u4e2d');
            target.value = target.value.replace(/\u7f6a\u6076/g, '\u7f6a‎\u6076');
            target.value = target.value.replace(/\u7231\u6b32/g, '\u7231‎\u6b32');
            target.value = target.value.replace(/\u4e49\u89e3/g, '\u4e49‎\u89e3');
            target.value = target.value.replace(/\u4fe1\u4ef0/g, '\u4fe1‎\u4ef0');
            target.value = target.value.replace(/\u9769\u547d/g, '\u9769‎\u547d');
            target.value = target.value.replace(/\u8036\u7a23/g, '\u8036‎\u7a23');
            target.value = target.value.replace(/\u95f4\u6216/g, '\u95f4‎\u6216');
            target.value = target.value.replace(/\u5343\u5e74/g, '\u5343‎\u5e74');
            target.value = target.value.replace(/\u4f1f\u4eba/g, '\u4f1f‎\u4eba');
            target.value = target.value.replace(/\u957f\u8005/g, '\u957f‎\u8005');
            target.value = target.value.replace(/\u4e0d\u7f3a\u94b1/g, '\u4e0d‎\u7f3a‎\u94b1');
            target.value = target.value.replace(/\u9999\u70df/g, '\u9999‎\u70df');
            target.value = target.value.replace(/\u4e00\u6c27\u5316\u78b3/g, '\u4e00‎\u6c27\u5316\u78b3');
            target.value = target.value.replace(/\u670d/g, '\u83d4');
            target.value = target.value.replace(/\u95ee\u9053/g, '\u95ee‎\u9053');
            target.value = target.value.replace(/\u76f4\u4f9b/g, '\u76f4‎\u4f9b');
            target.value = target.value.replace(/\u5c0f\u59d0/g, '\u5c0f‎\u59d0');
            target.value = target.value.replace(/\u59d0\u59d0/g, '\u59d0‎\u59d0');
            target.value = target.value.replace(/\u80a1\u7968/g, '\u80a1‎\u7968');
            target.value = target.value.replace(/\u59b9\u59b9/g, '\u59b9‎\u59b9');
            target.value = target.value.replace(/\u5bfc\u7ba1/g, '\u5bfc‎\u7ba1');
            target.value = target.value.replace(/\u64b8\u7ba1/g, '\u64b8‎\u7ba1');
            target.value = target.value.replace(/\u81ea\u5c09/g, '\u81ea‎\u5c09');
            target.value = target.value.replace(/\u4f5c\u7231/g, '\u4f5c‎\u7231');
            target.value = target.value.replace(/\u973e/g, '\u004d');
            target.value = target.value.replace(/\u9694\u79bb/g, '\u9694‎\u79bb');
            target.value = target.value.replace(/\u5927\u724c/g, '\u5927‎\u724c');
            target.value = target.value.replace(/\u5de5\u4f5c\u4eba\u5458/g, '\u5de5‎\u4f5c\u4eba\u5458');
            target.value = target.value.replace(/\u5168\u56fd/g, '\u5168‎\u56fd');
            target.value = target.value.replace(/\u5965\u8fd0/g, '\u5965‎\u8fd0');
            target.value = target.value.replace(/\u8bba\u529f/g, '\u8bba‎\u529f'); 
            target.value = target.value.replace(/\u56fd\u826f/g, '\u56fd‎\u826f');
            target.value = target.value.replace(/\u52a9\u7406/g, '\u52a9‎\u7406');
            target.value = target.value.replace(/\u8054\u5408\u56fd/g, '\u8054‎\u5408‎\u56fd');
            target.value = target.value.replace(/\u653f\u6cbb/g, '\u653f‎\u6cbb');
            target.value = target.value.replace(/\u69fd/g, '\u6fa1');
            target.value = target.value.replace(/\u5d3d/g, '\u5407');
            target.value = target.value.replace(/\u7956\u575f/g, '\u7956‎\u575f');
            target.value = target.value.replace(/\u5305\u90ae/g, '\u5305‎\u90ae');
            target.value = target.value.replace(/\u9ad8\u6f6e/g, '\u9ad8‎\u6f6e');
            target.value = target.value.replace(/\u5ad6/g, '\u7968');
            target.value = target.value.replace(/\u6cfb\u836f/g, '\u6cfb‎\u836f');
            target.value = target.value.replace(/\u0030\u3002/g, '\u0030‎\u3002');
            target.value = target.value.replace(/\u6c2f/g, '\u7eff');
            target.value = target.value.replace(/\u914d\u65b9/g, '\u914d‎\u65b9');
            target.value = target.value.replace(/\u7ad9\u8857/g, '\u7ad9‎\u8857');
            target.value = target.value.replace(/\u7237/g, '\u8036');
            target.value = target.value.replace(/\u9ed1\u70b9/g, '\u9ed1‎\u70b9');
            target.value = target.value.replace(/\u675c\u857e\u65af/g, '\u675c‎\u857e‎\u65af');
            target.value = target.value.replace(/\u5341\u4e00/g, '\u5341‎\u4e00');
            target.value = target.value.replace(/\u4eba\u6e23/g, '\u4eba‎\u6e23');
            target.value = target.value.replace(/\u5415/g, '\u94dd');
            target.value = target.value.replace(/\u6ecb/g, '\u5179');
            target.value = target.value.replace(/\u591a\u4f59\u7684/g, '\u591a‎\u4f59‎\u7684');
            target.value = target.value.replace(/\u79fb\u6c11/g, '\u79fb‎\u6c11');
            target.value = target.value.replace(/\u51e0\u628a/g, '\u51e0‎\u628a');
            target.value = target.value.replace(/\u654c\u654c\u754f/g, '\u654c‎\u654c‎\u754f');
            target.value = target.value.replace(/\u9006\u6d41/g, '\u9006‎\u6d41');
            target.value = target.value.replace(/\u68fa\u6750/g, '\u68fa‎\u6750');
            target.value = target.value.replace(/\u8d44\u683c\u8bc1/g, '\u8d44‎\u683c‎\u8bc1');
            target.value = target.value.replace(/\u795e\u7ecf\u75c5/g, '\u795e‎\u7ecf‎\u75c5');
            target.value = target.value.replace(/\u5de5\u8d44/g, '\u5de5‎\u8d44');
            target.value = target.value.replace(/\u55b7/g, '\u76c6');
            target.value = target.value.replace(/\u6deb/g, '\u94f6');
            target.value = target.value.replace(/\u575f\u4e0a/g, '\u575f‎\u4e0a');
            target.value = target.value.replace(/\u4eba\u5996/g, '\u4eba‎\u5996');
            target.value = target.value.replace(/\u8f6c\u8ba9/g, '\u8f6c‎\u8ba9');
            target.value = target.value.replace(/\u4f20\u67d3/g, '\u4f20‎\u67d3');
            target.value = target.value.replace(/\u6210\u4eba/g, '\u6210‎\u4eba');
            target.value = target.value.replace(/\u6bd2\u836f/g, '\u6bd2‎\u836f');
            target.value = target.value.replace(/\u4f60\u9ebb\u75f9/g, '\u4f60‎\u9ebb‎\u75f9');
            target.value = target.value.replace(/\u96f7\u950b/g, '\u96f7‎\u950b');
            target.value = target.value.replace(/\u9ebb\u5c06/g, '\u9ebb‎\u5c06');
            target.value = target.value.replace(/\u535c/g, '\u6ce2');
            target.value = target.value.replace(/\u5723\u7ecf/g, '\u5723‎\u7ecf');
            target.value = target.value.replace(/\u6076\u9b54/g, '\u6076‎\u9b54');
            target.value = target.value.replace(/\u5b89\u57f9/g, '\u5b89‎\u57f9');
            target.value = target.value.replace(/\u6253\u7838\u62a2/g, '\u6253‎\u7838‎\u62a2');
            target.value = target.value.replace(/\u5730\u9707/g, '\u5730‎\u9707');
            target.value = target.value.replace(/\u9646/g, '\u5f55');
            target.value = target.value.replace(/\u7a9d\u56ca/g, '\u7a9d‎\u56ca');
            target.value = target.value.replace(/\u5927\u6e05/g, '\u5927‎\u6e05');
            target.value = target.value.replace(/\u6b27\u83b1\u96c5/g, '\u6b27‎\u83b1‎\u96c5');
            target.value = target.value.replace(/\u4e2b\u7684/g, '\u4e2b‎\u7684');
            target.value = target.value.replace(/\u9ed1\u6697/g, '\u9ed1‎\u6697');
            target.value = target.value.replace(/\u88c5\u0031\u0033/g, '\u88c5\u798f');
            target.value = target.value.replace(/\u515a/g, '\u68e0');
            target.value = target.value.replace(/\u6000\u5ff5/g, '\u6000‎\u5ff5');
            target.value = target.value.replace(/\u7977\u544a/g, '\u7977‎\u544a');
            target.value = target.value.replace(/\u4eba\u4eba\u770b/g, '\u4eba‎\u4eba‎\u770b');
            target.value = target.value.replace(/\u8d37\u6b3e/g, '\u8d37‎\u6b3e');
            target.value = target.value.replace(/\u751f\u6b96/g, '\u751f‎\u6b96');
            target.value = target.value.replace(/\u80d6\u864e/g, '\u80d6‎\u864e');
            target.value = target.value.replace(/\u79c1\u4eba/g, '\u79c1‎\u4eba');
            target.value = target.value.replace(/\u6bb7\u6d2a\u6d9b/g, '\u6bb7‎\u6d2a‎\u6d9b');
            
            //空格部分
             target.value = target.value.replace(/\u007e/g, '‎');//~转为无间隙空白符号


            /*
            数字部分
            target.value = target.value.replace(/\u0034/g, '\u9a77');
            target.value = target.value.replace(/\u0033/g, '\u53c1');
            target.value = target.value.replace(/\u0036\u0039/g, '\u0036‎\u0039');
            target.value = target.value.replace(/\u0037\u0035/g, '\u0037‎\u0035');
            target.value = target.value.replace(/\u0038\u0039/g, '\u0038‎\u0039');
            */

            /*
            字母部分
            target.value = target.value.replace(/\u0062/g, '\u5421');
            target.value = target.value.replace(/\u0063/g, '\u6fa1');
            target.value = target.value.replace(/\u006e\u006d/g, '\u4f60\u51af');
            target.value = target.value.replace(/\u0073\u5421/g, '\u503d\u5421');
            target.value = target.value.replace(/\u0066/g, '\u8bf6\u8d1f');
            target.value = target.value.replace(/\u0073/g, '\u8bf6\u9a77');
            target.value = target.value.replace(/\u0077/g, '\u8fbe\u4e0d\u905b');
            target.value = target.value.replace(/\u0079/g, '\u8fef');
            target.value = target.value.replace(/\u006d\u006e/g, '\u006d‎\u006e');
            target.value = target.value.replace(/\u0073\u0062/g, '\u503d\u5421');
            */

            //emoji
            target.value = target.value.replace(/\u002f\u8036/g, '✌');
            target.value = target.value.replace(/\u002f\u5df4\u638c/g, '✋');
            target.value = target.value.replace(/\u002f\u6253\u7bee\u7403/g, '⛹️');
            target.value = target.value.replace(/\u002f\u5199\u4f5c\u4e1a/g, '✍');
            target.value = target.value.replace(/\u002f\u60e8\u75be\u4eba/g, '♿');
            target.value = target.value.replace(/\uff1f/g, '❓');
            target.value = target.value.replace(/\u002f\u8db3\u7403/g, '⚽');
            target.value = target.value.replace(/\u002f\u5e72\u6270/g, '⭐');
            target.value = target.value.replace(/\u002f\u4e0b\u9053\u5177/g, '⚡');


      }
    });
})();

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
(function() {
    let isInitialClicked = false; // 标记初始按钮是否已点击
    let isSecondClicked = false; // 标记第二个路径按钮是否已点击
    let clickedButtonsForThirdPath = new Set(); // 针对第三个路径，使用Set记录已经点击过的按钮，避免重复点击

    function tryClickInitialButton() {
        if (!isInitialClicked) {
            // 查找初始路径下ksc-数字不固定的按钮
            const initialButtons = document.querySelectorAll("#root > div[class^='ksc-'] > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.MainEntranceComponentStyle-container > div");
            if (initialButtons.length > 0) {
                initialButtons[0].click();
                isInitialClicked = true; // 点击后标记已点击
            }
        }
    }

    function tryClickSecondButton() {
        if (isInitialClicked &&!isSecondClicked) {
            // 查找第二个路径（nth-child(2)对应的）下ksc-数字不固定的按钮
            const secondButtons = document.querySelectorAll("#root > div[class^='ksc-'] > div.Common-entranceGradient > div.Common-contentSpaceBetween > div.EntranceComponentStyle-ContainerForm > form > div.MainEntranceComponentStyle-container > div:nth-child(2)");
            if (secondButtons.length > 0) {
                secondButtons[0].click();
                isSecondClicked = true; // 点击后标记已点击
            }
        }
    }

    function tryClickThirdButton() {
        if (isInitialClicked && isSecondClicked) {
            // 查找第三个路径及其子路径下ksc-数字不固定的按钮
            const thirdButtons = document.querySelectorAll("#root > div[class^='ksc-'] > div.Common-entranceGradient > div.Common-contentSpaceBetween > div[class^='ksc-'].EntranceComponentStyle-ContainerForm > form > div[class^='ksc-'].EntranceComponentStyle-blockCheckedLink.Common-flexStartAlignStartColumn > div[class^='ksc-'].EntranceComponentStyle-checkbox > div > label > span");
            for (const button of thirdButtons) {
                if (!clickedButtonsForThirdPath.has(button)) {
                    button.click();
                    clickedButtonsForThirdPath.add(button);
                }
            }
        }
    }

    function checkAndClickButtons() {
        tryClickInitialButton();
        tryClickSecondButton();
        tryClickThirdButton();
    }

    setInterval(checkAndClickButtons, 1);
})();

//大厅表情UI及美化
(function () {
    'use strict';

    // 定义一个标志变量，用于判断按钮是否已经添加
    let buttonAdded = false;
    // 定义一个变量存储目标输入框
    let targetInput;
    // 定义一个变量存储 emoji 选择器
    let emojiPicker;
    // 定义一个标志变量，用于判断 emoji 选择器是否显示
    let isEmojiPickerVisible = false;
    // 存储按钮元素
    let button;

    // 定义一个函数来查找目标元素并添加按钮
    function addButtonIfTargetExists() {
        targetInput = document.querySelector('#root > div.ChatComponentStyle-chatWindow > div[class^="ksc-"] > input[type=text]');

        if (targetInput && !buttonAdded) {
            // 创建按钮元素
            button = document.createElement('button');
            // 使用 emoji 作为按钮图标
            button.innerHTML = '😀 ';

            // 设置按钮的样式
            button.style.marginLeft = '10px';
            button.style.padding = '10px 20px';
            button.style.fontSize = '16px';
            button.style.fontWeight = '600';
            button.style.color = '#fff';
            button.style.border = 'none';
            button.style.borderRadius = 'px'; // 这里应该有具体数值，比如 '4px'
            button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
            // 设置按钮的渐变背景和动画
            button.style.background = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
            button.style.backgroundSize = '400% 400%';
            button.style.animation = 'gradientAnimation 15s ease infinite';

            // 悬停效果
            button.addEventListener('mouseover', function () {
                button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
            });
            button.addEventListener('mouseout', function () {
                button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
            });

            // 点击效果
            button.addEventListener('mousedown', function () {
                button.style.transform = 'scale(1)';
            });
            button.addEventListener('mouseup', function () {
                button.style.transform = 'scale(1)';
            });

            // 将按钮插入到目标元素的右侧
            targetInput.parentNode.insertBefore(button, targetInput.nextSibling);

            // 为按钮添加点击事件监听器
            button.addEventListener('click', function () {
                toggleEmojiPicker();
                targetInput.focus(); // 使输入框处于选中状态
            });

            // 设置标志变量为 true，表示按钮已经添加
            buttonAdded = true;
        } else if (!targetInput && buttonAdded) {
            // 如果目标输入框消失且按钮已添加，移除按钮并重置标志
            if (button) {
                button.remove();
                button = null;
            }
            // 隐藏 emoji 选择器
            if (isEmojiPickerVisible) {
                hideEmojiPicker();
            }
            buttonAdded = false;
        }
    }

    // 定义一个函数来切换 emoji 选择器的显示和隐藏
    function toggleEmojiPicker() {
        if (isEmojiPickerVisible) {
            hideEmojiPicker();
        } else {
            showEmojiPicker();
        }
    }

    // 定义一个函数来显示 emoji 选择器
    function showEmojiPicker() {
        const emojiList = [
            '✌ ', ' ☢ ', '☣', '❄', '✋', '⭐', '⚡', '⚽', '⛹️', '☝',
            '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇',
            '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚',
            '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '✊',
            '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😢', '😭', '😩',
            '😫', '🥺', '😣', '😖', '😤', '😡', '😠', '🤬', '🤯', '😳',
            '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭',
            '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧',
            '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢',
            '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹',
            '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃',
            '✍', '♿', '☺️', '☹️', '✊', '☕', '⛪', '⚓', '⛵', '⏳',
            '✈', '☔', '⛄', '⚾', '✨', '⌨', '☎', '✂', '⛏', '♻',
            '✌ ', ' ☢ ', '☣', '❄', '✋', '⭐', '⚡', '⚽', '⛹️', '☝'
        ];

        // 去重
        const uniqueEmojiList = [...new Set(emojiList)];

        if (!emojiPicker) {
            emojiPicker = document.createElement('div');
            // 给 emojiPicker 添加唯一 ID
            emojiPicker.id = 'custom-emoji-picker';

            const style = document.createElement('style');
            style.textContent = `
                @keyframes gradientAnimation {
                    0% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                    100% {
                        background-position: 0% 50%;
                    }
                }

                #custom-emoji-picker {
                    box-sizing: border-box;
                    position: absolute;
                    border: 1px solid #ccc;
                    padding: 4px;
                    z-index: 1000;
                    max-height: 90px;
                    overflow-y: auto;
                    width: 250px;
                    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    background-size: 400% 400%;
                    animation: gradientAnimation 15s ease infinite;
                }

                #custom-emoji-picker span {
                    cursor: pointer;
                    padding: 3px;
                }

                /* 自定义滚动条样式 */
                #custom-emoji-picker::-webkit-scrollbar {
                    width: 8px;
                }

                #custom-emoji-picker::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                }

                #custom-emoji-picker::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 4px;
                }

                #custom-emoji-picker::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.7);
                }

                /* 兼容 Firefox */
                #custom-emoji-picker {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.5) rgba(255, 255, 255, 0.2);
                }
            `;
            document.head.appendChild(style);

            uniqueEmojiList.forEach(emoji => {
                const emojiSpan = document.createElement('span');
                emojiSpan.textContent = emoji;
                emojiSpan.addEventListener('click', function () {
                    insertEmojiIntoInput(emoji);
                    hideEmojiPicker(); // 插入 emoji 后隐藏选择器
                });
                emojiPicker.appendChild(emojiSpan);
            });
        }

        // 这里可以直接修改 left 和 top 的固定值
        const fixedLeft = 1450; // 你可以根据需要修改这个值
        const fixedTop = 922; // 你可以根据需要修改这个值

        emojiPicker.style.left = fixedLeft + 'px';
        emojiPicker.style.top = fixedTop + 'px';

        document.body.appendChild(emojiPicker);
        isEmojiPickerVisible = true;
    }

    // 定义一个函数来隐藏 emoji 选择器
    function hideEmojiPicker() {
        if (emojiPicker) {
            emojiPicker.remove();
            isEmojiPickerVisible = false;
        }
    }

    // 定义一个函数来将 emoji 插入到输入框中
    function insertEmojiIntoInput(emoji) {
        const startPos = targetInput.selectionStart;
        const endPos = targetInput.selectionEnd;
        const currentValue = targetInput.value;
        targetInput.value = currentValue.slice(0, startPos) + emoji + currentValue.slice(endPos);
        targetInput.selectionStart = targetInput.selectionEnd = startPos + emoji.length;
        targetInput.focus();
    }

    // 创建一个 MutationObserver 实例
    const observer = new MutationObserver(function (mutationsList) {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                addButtonIfTargetExists();
            }
        }
    });

    // 配置观察选项
    const config = { childList: true, subtree: true };

    // 开始观察整个文档的变化
    observer.observe(document.body, config);

    // 初始检查，以防元素在观察开始前就已经存在
    addButtonIfTargetExists();
})();




