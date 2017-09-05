# Javascript 基本教程

### 字符串

js 可以使用 `' '` 或者 `" "` 来表示字符串。

```js
str = 'This is a string. 👏';
str2 = "This is the 2nd string. 💁";
```

并且他们之间是可以互相嵌套的。

```js
str = "It's six o'clock.";
str2 = 'Remember to say "please" and "thank you."';
```

或使用 `\` 也可以达到同样目的。

```js
str = 'It\'s six o\'clock.';
str2 = "Remember to say \"please\" and \"thank you.\"";
```

js 里虽然没有 class 声明类方法，但是`所有类型都可以视为对象`，下面举例说明。

```js
// 这里 "caterpillar" 是个临时的字符串，而这个字符串也是个对象，他有他的成员 length 表达当前字符串长度。
"caterpillar".length;
// 以及 toLowerCase() 方法，转换大小写。
"THE KIDS".toLowerCase();
"I wish I were big.".toUpperCase();
// 去掉空格
"   but keep the middle spaces   ".trim();
// 还可以自己添加自定义方法 (这个内容比较高级，无需太过在意)
"This is a custom function of String.".hanggi();
```

字符串的输出和连接也非常方便

```js
// 在 ES5 版本中我们可以简单使用引号和加好
var a = 123
console.log("Value a is equal to " + a + "!!!");
// ES6 给我们带来了更方便的功能。
console.log(`Value a is equal to ${a}!!!`);
```

#### 【穿插内容】var, let, const 用法

在较早版本的 js 中是只有 `var` 声明变量。首先 js 本身是弱类型语言，所以在声明变量是可以简单使用 `var a = 1` 这种表达式，语言本身会判断类型并进行转换。

而在最新版本的 js 中增加了 let 和 const。目的在于解决 `var` 本身的缺陷。
即，`var` 不支持块级声明。

```js
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```
这种特性可以解决很多问题，具体内容虚招ES6相关介绍。

# 数量

js 是弱类型语言，他不区分整型，浮点型等。所以你可以用以下方式简单声明：

```js
var num = 123;
let float = 0.333;
const PI = 3.1415926;
```

并对他们进行加减乘除，你完全可以把它当做计算器来使用。

```js
10 + 3.1415;
1 + (4 / 3)
```
