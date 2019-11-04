---
title: ES6学习系列：let和const
date: 2019-10-26 17:57:16
tags:
    - ES6
    - Javascript
    - let
    - const
categories:
    - 技术文章
keywords:
    - ES6
    - Javascript
    - let
    - const
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

#### 块级作用域
我们都知道，在ES5中只有全局作用域和函数作用域，不存在块级作用域。这样就会导致一些不合理的场景，最经典的一个就是for循环中的计数变量泄露为全局变量，如下：
```
    let arr = [];
    for(var i = 0; i < 10; i++) {
        arr.push(() => {
            console.log(i);
        });
    }
    arr[0](); // 10
    arr[1](); // 10
    ......
    arr[9](); // 10
```
因为没有块级作用域，所以函数执行时，在该作用域下访问到的都是同一个i，而此时for循环已经执行完，i的值是10，所以最后输出的都是10。

另外一个常见问题就是，内层变量会覆盖掉外层的变量，如下：
```
    var bar = 'hello';
    function foo() {
        console.log(bar);
        var bar = 'world';
    }
    foo(); // undefined
```
由于变量声明提升，函数执行后并没有输出外层的bar，而是输出的undefined。

#### let命令
let命令的用法类似于var，用来声明变量。不同之处主要有以下几点：

1）**只在当前作用域有效**

<p>也就是说，在作用域外是访问不到作用域内的变量的，这就相当于给Javascript增加了块级作用域，在外部访问块级作用域内声明的变量是会报错的。
```
{
    let bar = 'hello';
}
console.log(bar); // ReferenceError: bar is not defined
```
{% alert success %}
ES6中块级作用域必须使用{}包起来。
{% endalert %}

对于上述的第一个不合理的场景（for循环中的计数变量泄露为全局变量），如果将var改为let来声明i，就会得到我们想要的结果。
```
    let arr = [];
    for(let i = 0; i < 10; i++) {
        arr.push(() => {
            console.log(i);
        });
    }
    arr[0](); // 0
    arr[1](); // 1
    ......
    arr[9](); // 9
```
每一轮循环都是一个独立的作用域，都会新声明一个i，因此i只在当前的作用域中生效。
{% alert success %}
注意：for循环中，声明变量和循环体是两个不同的作用域，并且是父子作用域。
{% endalert %}
</p>

2）**没有变量声明提升**

<p>
在ES5中是存在变量声明提升的，这也是导致上述第二种不合理场景的原因。但使用let声明的变量是不存在变量声明提升的，必须先声明，再使用。在使用了let或者const的区块中，变量在声明之前使用会报错，这被称为“暂时性死区”。因此，ES5中绝对安全的操作typeof也不再安全。

```
ES6:
typeof bar; // ReferenceError
let bar = 'hello';

ES5:
typeof bar; // undefined
var bar = 'hello';
```
暂时性死区和let、const命令不存在变量声明提升，主要是为了减少运行时错误，防止变量在声明前就使用，以免产生意想不到的错误。</p>

3）**不能重复声明**

同一个作用域下，不能重复声明同一个变量，否则会报错。

#### const命令

<p>const是用来声明常量的，和let命令一样，const命令也只在当前作用域有效、不存在变量声明提升、存在暂时性死区、不能重复声明。另外一个不同的点就是，使用const声明的常量，不能再被改变。这样一来，const声明常量的时候，必须得赋值，不能留在以后再赋值。</p>

```
const bar; // SyntaxError: Missing initializer in const declaration
const bar = 'hello';
const bar = 'world'; // TypeError: Assignment to constant variable.
```
{% hl_text danger %}本质：{% endhl_text %}const不能被改变的实际上是常量所指向的那个内存地址的值。如果使用const声明基本类型数据，const相当于保存的是数据本身，该常量是不能被改变的；如果const声明的是一个引用类型数据，常量保存的是引用地址，只是该地址不能被改变，该地址所指向的数据是可以被改变的。

```
const arr = [];
arr.push(0); // 不会报错
arr = []; //TypeError: Assignment to constant variable.
```
{% alert success %}
如果真的想冻结对象，可以使用Object.freeze()方法。
{% endalert %}