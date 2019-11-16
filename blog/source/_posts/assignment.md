---
title: ES6学习系列：变量的解构赋值
date: 2019-11-12 19:39:10
tags:
    - ES6
    - Javascript
    - 解构赋值
categories:
    - 技术文章
keywords:
    - ES6
    - Javascript
    - 解构赋值
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

在ES5中，我们只能直接给变量赋值。但到了ES6，可以通过某种模式匹配来从数组或对象中提取出来指定值，这就叫做变量的解构赋值。

#### 1、数组的解构赋值
数组可以按照位置进行解构赋值，如下：
```
let [a, b] = [1, 3];
// a = 1, b = 3

let [a, ...b] = [1, 2, 3, 4];
// a = 1, b = [2, 3, 4]
```
如果对应的位置没有对应的值，则变量的值被赋为undefined。
```
let [a, b, c] = [1, 2];
// a = 1, b = 2, c = undefined
```
还可以只解构数组的一部分，这种叫做不完全解构。如下：
```
let [e, f] = [3, 4, 5, 6];
// e = 3, f = 4
```
因为数组是一种特殊的对象，所以数组也可以进行对象解构（对象解构赋值在下节介绍）。
```
let {0: first, 1: second} = [1, 3, 5, 7];
first // 1
second // 3
```
##### 默认值
解构赋值还可以给变量指定默认值，只有当数组中对应位置的值{%hl_text danger%}完全等于{%endhl_text%}（===）undefined时，默认值才会生效。
```
let [a = 100, b = 200] = [0, null];
// a = 0, b = 200
```
因为null不是完全等于undefined，所以上述b设置的默认值200并没有生效。下面两种情况，b设置的默认值都会生效。
```
let [a = 100, b = 200] = [0, undefined];
let [a = 100, b= 200] = [0];
// a = 0, b = 200
```
{% alert info %}
如果默认值是一个表达式，则该表达式是惰性求值的，即只有在默认值生效时才会去执行表达式求值。
{% endalert %}

#### 2、对象的解构赋值
不同于数组按照位置来解构赋值，对象的解构赋值和位置无关，只有当变量和对象属性匹配时，才能取到正确的值。
```
let {foo, bar} = {foo: 'Jason', bar: 'Jack'};
foo // 'Jason'
bar // 'Jack'
```
和数组一样，如果没有对应的值，则变量被赋值为undefined。

如果不想被赋值的变量名和对象的属性名一样，可以这样来写：
```
let {foo: baz, bar: boo} = {foo: 'Jason', bar: 'Jack'};
baz // 'Jason'
boo // 'Jack'
```
也就是说，前者是匹配的模式，真正被赋值的变量是后者。因此，最开始的那种形式是下面这种形式的简写：
```
let {foo: foo, bar: bar} = {foo: 'Jason', bar: 'Jack'};
```

##### 默认值
和数组一样，对象的解构赋值也可以指定默认值。默认值生效的方式同样是对应属性值完全等于（===）undefined。
```
let {foo = 'Jade', bar = 'John'} = {foo: undefined, bar: 'Jack'};
foo // 'Jade'
bar // 'Jack'
```
{% alert info %}
对象的解构赋值是可以取到继承来的属性值的。
{% endalert %}
```
const foo = {
    name: 'Jason'
};
const baz = Object.create(foo);
let {name} = baz;
name // 'Jason'
```
baz自身是没有name属性的，但是它的原型foo上有该属性，因此解构赋值可以取到。

#### 3、字符串的解构赋值
字符串在解构赋值时，是被当做类似数组的对象来处理的。
```
let [first, second] = 'Jason';
first // J
second // a
```
类数组对象都会有一个length属性，所以还可以解构到这个属性值。
```
let {length: len} = 'hello';
len // 5
```

#### 4、数值和布尔值的解构赋值
{% alert info %}
解构赋值时，如果等号右边不是对象，则先会被转为对象。
{% endalert %}
因此，数值和布尔值会被先转化为对象，然后进行解构赋值。
```
let {toString: s} = 1111;
s === Number.prototype.toString; // true

let {toString: s2} = true;
s2 === Boolean.prototype.toString; // true
```

#### 5、函数参数的解构赋值
函数参数也是可以使用解构赋值的。
```
function foo({name, age}) {
    console.log(name, age);
}
```
上述函数的参数是一个对象，当参数传进来时就通过对象解构赋值拿到了name和age属性值，函数内部就可以直接使用了。
函数参数的解构赋值也可以指定默认值。
```
function foo({name = 'jason', age = 18}) {
    console.log(name, age);
}
```
同样，只有当右边属性值完全等于（===）undefined时，参数默认值才会生效。

#### 6、总结
1、对于数组的解构赋值，只要等号右边的数据部署了Iterator接口（如string，Set，Map等），就可以使用数组解构赋值。
```
function* gen() {
    let pre = 0, cur = 1;
    while(true) {
        yield pre;
        [pre, cur] = [cur, pre + cur];
    }
}
let [a, b, c, d] = gen();
a // 0
b // 1
c // 1
d // 2
```
上面的gen是一个Iterator迭代器生成函数，所以它生成的迭代器可以进行数组解构赋值。而如果等号右边数据不具备Iterator接口，则数组解构赋值会报错。
```
let [first] = 111;
let [second] = true;
let [third] = NaN;
let [forth] = {};
// TypeError: 111 is not iterable
```
根据解构赋值的规则，前三个会被转为对象，但是没有部署Iterator接口，最后一个本身是个对象，也没有部署Iterator接口。所以都会报错。
2、对于对象解构赋值。因为null和undefined是不能转为对象的，所以对它俩进行对象解构赋值会报错。
```
let {toString: s1} = null;
let {toString: s2} = undefined;
// TypeError: Cannot destructure property `toString` of 'undefined' or 'null'.
```