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