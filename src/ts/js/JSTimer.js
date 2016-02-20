/**
 * Created by Administrator on 2016/2/20.
 */

var div = document.createElement("div");
document.body.appendChild(div);
var obj = new Timer.Test(div);
var button = document.createElement("button");
button.innerHTML = "start";
button.onclick = function () {
    obj.start();
};
document.body.appendChild(button);

var buttons = document.createElement("button");
buttons.innerHTML = "stop";
buttons.onclick = function () {
    obj.stop();
};
document.body.appendChild(buttons);