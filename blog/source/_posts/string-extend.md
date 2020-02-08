---
title: ES6学习系列：字符串扩展及其新增方法
date: 2019-12-11 23:12:24
tags:
    - ES6
    - Javascript
    - string
    - 字符串方法
categories:
    - 技术文章
keywords:
    - ES6
    - Javascript
    - string
    - 字符串方法
thumbnailImage: https://raw.githubusercontent.com/Wangjun9662/blog-pic/master/images/es6.jpeg
thumbnailImagePosition: left
autoThumbnailImage: yes
metaAlignment: center
coverImage:
coverCaption:
coverMeta: out
comments: false
---

<p>
学习ES6的总结。
<br>
<!-- excerpt -->
</p>

# 字符串扩展和新增方法
**两个问题：** 什么是Unicode编码？Unicode和UTF-8有什么关系？

1、ASCII码

由美国人编制，使用一个字节的后7位共表示了128个英文字符，最高位固定为0。

2、Unicode码

英语使用128个字符就足够了，但是其他国家的语言仅用128个字符是远远不够的，例如汉子就有10万多个。即使128个字符足够，也可能导致相同的编码在不同的国家表示不同的字符。

Unicode规定了世界上所有字符独一无二的编码，如今规模可以容纳100多万个字符编码。

Unicode的问题：

Unicode规定了字符的编码，但是没有规定如何去存储这些二进制字符。这就导致了两个问题：

* 一个字符到底使用几个字节存储。如果统一规定使用3或者4个字节存储，那对于单个英文字符，本来只需要一个字节就行，现在需要3或者4个，就会造成极大浪费。
* 如何区别ASCII和Unicode。怎么判断3个字节是表示一个字符还是3个字符？

3、UTF-8

**UTF-8是Unicode的一种实现方式**。还有UTF-16（用2或者4个字节表示一个字符）、UTF-32（用4个字节表示一个字符），但是互联网不常用。

编码规则：

* 对于单字节的符号，最高位设为0，其他位为该字符的Unicode码。因此，单字节字符的Unicode码和其ASCII码一样。
* 对于n字节的符号（n > 1），第一个字节的前n位都为1，第n + 1位为0，后面所有的字节，前两位都为10，剩下的位置为该符号的Unicode编码。

因此，若一个符号的第一位为0，那么它一定是单字节的；若一个符号的第一位为1，则连续有多少个1，该符号就是多少个字节，因此解读也就比较简单了。

举个栗子：
汉子“严”。

Unicode码为4E25（100111000100101），因此它编码需要3个字节，那么它的编码格式就是：1110xxxx 10xxxxxx 10xxxxxx。然后，从“严”的最后一个二进制位开始，依次从后向前填入x的位置，多出的x为补0，即为：11100100 10111000 10100101。


#### Unicode的表示法

ES5中加强了对Unicode的支持，允许使用\uxxxx来表示一个字符。但是，这种方式只支持\u0000-\uFFFF之间的字符。超出的必须使用双字节的形式表示。

```
"\uD842\uDFB7"
// '𠮷'

"\u20BB7"
// '₻7'
```

对于超出的，它会直接截取为\u20BB + 7，'\u20BB'表示字符'₻'，所以显示的是₻7。

而在ES6中，对这一点进行了改进。只要将Unicode码点放入大括号中，即可正确解读该字符。

```
'\u{20bb7}'
// '𠮷'
```

#### 字符串的遍历器接口

在ES6中，为字符串部署了Iterator接口，因此可以使用for...of循环来遍历字符串。并且，for...of循环可以识别码点超过\uFFFF的字符，而传统的for...in循环是不可以的。

```
const str = String.fromCodePoint(0x20bb7);
for (let i = 0; i < str.length; i++) {
    console.log(str[i]);
}
// �
// �

for (let n of str) {
    console.log(n);
}
// '𠮷'
```

#### 模板字符串
模板字符串使用反引号``标识，相较于繁琐的传统字符串模板，使用起来更加简洁方便。

模板字符串可以当做普通字符串来使用，也可以定义多行字符串，或者在字符串中嵌入变量。

当定义多行字符串的时候，字符串中的空格、缩进都会保留。

如果想嵌入变量，则变量需要放在${}中。大括号中可以放任何的JavaScript表达式，可以进行运算，可以引用对象属性，可以调用函数等。如果大括号内是一个普通字符串，则原样取出；如果是个对象，则会调用对象的toString方法。

```
`Hello ${'Jason'}`
// 'Hello Jason'

function foo() {
    return 'Hello Jason';
}
`foo ${foo()} bar`
// 'foo Hello Jason bar'
```
模板字符串还可以嵌套。

#### 标签模板
模板字符串的功能，不仅仅是上面这些。它可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能。

标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。

但是，如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```
const name = 'Jason';
const age = 18;
const result = tag`Hello, are you ${name}, ${age} years old forever?`

function tag(args, ...values) {
    let res = '';
    let i;
    for (i = 0, len = values.length; i < len; i++) {
        res += args[i] + values[i];
    }
    res += args[i];
    return res;
}
result // 'Hello, are you Jason, 18 years old forever?'
```

从上面我们可以看到，tag的第一个参数是一个数组，由模板字符串中没有被变量替换的字符串组成，剩余的其他参数，则是模板字符串中被变量替换的值。

**重要应用：**过滤 HTML 字符串，防止用户输入恶意内容。

```
const sender = '<script>alert("Jason")</script>';
const message = SaferHTML`<p>${sender} has sent you a message.</p>`;
function SaferHTML(args, ...values) {
        let res = '';
        let i;
        for (i = 0, len = values.length; i < len; i++) {
            const temp = String(values[i])
            const value = temp.replace(/&/g, "&amp;")
                                .replace(/</g, "&lt;")
                                .replace(/>/g, "&gt;");
            res += args[i] + value;
        }
        res += args[i];
        return res;
}
message // '<p>&lt;script&gt;alert("Jason")&lt;/script&gt; has sent you a message.</p>'
```

标签模板的另一个应用，就是多语言转换（国际化处理）。


#### 字符串新增方法

##### String对象上的方法

1、String.formCodePoint()

返回对应Unicode编码的字符。

ES5的String.fromCharCode()也可以返回对应字符，但是该方法不能识别大于0xFFFF的码点，而String.formCodePoint()方法可以。

```
String.fromCodePoint(0x20bb7);
// '𠮷'
String.fromCharCode(0x20bb7);
// 'ஷ'
```
如果有多个参数，会合并为一个字符串返回。

```
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true
```

2、String.raw()

该方法返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法。

##### 实例方法

1、codePointAt()

JavaScript 内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode 码点大于0xFFFF的字符），JavaScript 会认为它们是两个字符。

```
const str = '𠮷A';

str.length // 3
str.charAt(0); // �
str.charAt(1); // �
str.charAt(2); // A
str.charCodeAt(0).toString(16); // d842
str.charCodeAt(1).toString(16); // dfb7
str.charCodeAt(2).toString(16); // 41
```

可以看到，'𠮷'被视为2个字符，charA()t方法不能识别整个字符，charCodeAt()方法只能分别返回两个字节的值。

```
const str = '𠮷A';
str.codePointAt(0).toString(16) // 20bb7
str.codePointAt(1).toString(16) // dfb7
str.codePointAt(2).toString(16) // 41
```

codePointAt()在第一位返回了正确的码点，其他位和charCodeAt()方法返回值一样。

但是，我们会发现，字母'A'的位置序号应该为1，却出现在2的位置。解决这个问题有两个方法，一个是使用for...of 循环，一个是使使用...扩展运算符。

```
const str = '𠮷A';
for (let val of str) {
    console.log(val.codePointAt(0).toString(16));
}
// 20bb7
// 41

[...str].forEach(val => {
    console.log(val.codePointAt(0).toString(16));
});
// 20bb7
// 41
```

codePointAt()方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。

```
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}
```

2、normalize()
用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 标准化。在开发国际化应用时使用的比较多。

```
'\u01D1' // 'Ǒ'
'\u004F\u030C' // 'Ǒ'
'\u01D1'==='\u004F\u030C' // false
'\u01D1'.normalize() === '\u004F\u030C'.normalize(); // true
```
可以接受4个参数：
* NFC 标准等价合成，标准等价，语义和视觉上都等价
* NFD 标准等价分解
* NFKC 兼容等价合成，兼容等价，语义等价，视觉不等价，比如“囍”和“喜喜”，但normalize不能识别中文。
* NFKD 兼容等价分解

3、includes()、startsWith()、endsWith()

* includes()：是否含有参数字符串，返回Boolean;
* startsWith()：是否以参数字符串开始，返回Boolean;
* endsWith()：是否以参数字符串结尾，返回Boolean;

都有第2个参数n，表示从哪个位置开始搜索。endsWith的第2个参数针对的是前n个字符，另外两个方法是从第n个字符到字符串结尾。

4、repeat()

返回一个新字符串，表示将原字符串重复n次。

```
'6'.repeat(3); // '666'
// 小数会被向下取整
'6'.repeat(2.1); // '66'
'6'.repeat(2.9); // '66'
// NaN相当于0
'6'.repeat(NaN); // ''
Infinity 会报错
'6'.repeat(Infinity) // Invalid count value
// -1 到 0 之间的小数，会转为0，其他小数报错
'6'.repeat(-.4) // ''
// 字符串会先转为数字
'6'.repeat('jason'); // ''
'6'.repeat('4'); // '6666'
```

5、padStart()、padEnd()

padStart用于头部补全，padEnd用于尾部补全。

都接受两个参数，第一个是补全生效的最大长度n，第二个是用来补全的字符串s。

```
'Wang'.padStart(9, 'Jason'); // 'JasonWang'
'Jason'.padEnd(9, 'Wang'); // 'JasonWang'
```

如果原始字符串长度超过n，则返回原字符串。

```
'Wang'.padStart(1, 'Jason'); // Wang
```

如果原始字符串加上字符串s的长度超过n，则会截取字符串s。

```
'Wang'.padStart(6, 'Jason'); // JaWang
```
如果省略第二个参数字符串s，则用空格补全。

```
'Wang'.padStart(10); // '      Wang'
```

6、trimStart()、trimEnd()

trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格，都返回新字符串。包括tab键和换行。