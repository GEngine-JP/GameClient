/**
 * Created by Administrator on 2016/2/20.
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 4] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
alert(c);
//# sourceMappingURL=枚举.js.map