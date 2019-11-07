---
title: 常见的几种排序算法
tags:
  - algorithm
  - 排序算法
categories:
  - 算法相关
keywords:
  - algorithm
  - 排序算法
thumbnailImage: >-
  https://raw.githubusercontent.com/Wangjun9662/blog-pic/master/images/algorithm.png
thumbnailImagePosition: left
autoThumbnailImage: 'yes'
metaAlignment: center
coverMeta: out
comments: false
date: 2019-11-04 00:50:15
coverImage:
coverCaption:
---


<p>
排序算法
<br>
<!-- excerpt -->
</p>
<p>
算法对于程序猿的重要性不言而喻。每个人学习算法的动机不一样，有人确实是因为兴趣，有人是为了提升编码能力，也有人只是为了面试。但无论什么原因，对于一个合格的程序猿而言，算法这个坎是绕不过的，而且必须得跨过。虽然用的不多，但学进脑子的东西就像吃进肚子里的饭，会变成自己的血肉，支撑自己的成长。

这篇文章，主要介绍一些常见的排序算法。
</p>

#### 1、冒泡排序

冒泡排序应该是最耳熟能详的排序算法了，即使不是计算机相关专业的人应该也都听过。它也是最简单的一个，但是性能是最差的。它的原理是比较任何两个相邻的项，如果第一个比第二个大，则交换两者的位置，直至每项到达正确的位置，就好比气泡逐渐向上一样，这也是它名字的由来。

实现冒泡排序只需要两层循环就行：

```
function bubbleSort(array) {
    const len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1 -i; j++) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j+1);
            }
        }
    }
    return array;
}

// swap用来交换数组中两项的位置，后续算法中swap都是这个。
function swap(array, index1, index2){
    const temp = array[index2];
    array[index2] = array[index1];
    array[index1] = temp;
}

bubbleSort([3, 5, 1, 9, 2, 10]); // [ 1, 2, 3, 5, 9, 10 ]
```
从代码中我们可以看到，冒泡排序算法的时间复杂度是O(n^2)，所以它的性能很差。

为啥说时间复杂度为O(n^2)就很差呢？这里我们也说一说衡量算法运行速度快慢的大O表示法。

大O表示法的单位不是秒，所以它不是用时间来衡量算法快慢的，它计算的是操作数的增速。怎么理解呢？也就是随着输入的增加，算法运行时间的增速。
{% alert info %}
大O表示法计算的是最糟糕的情况
{% endalert %}
下面是几个常用的大O时间复杂度：
* O(n)
* O(n^2)
* O(logn)
* O(nlogn)

我们在纸上画一画这几个函数的曲线就可以看到，冒泡排序的O(n^2)真的很差！！！并且输入越多，它表现得越差。


#### 2、选择排序

选择排序和冒泡排序一样，时间复杂度都为O(n^2)，所以它也是一种性能很差的排序方法。它的原理是首先找出最小的数，放到第一位，然后找出第二小的数，放到第二位......以此类推，找到最大数时排序完毕。

它的实现也是使用两层循环：

```
function selectSort(array) {
    const len = array.length;
    let minIndex;
    // 找到第二大数的时候，最大数的位置就已经确定了，所以i < len - 1，可以减少一次不必要的循环。
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            swap(array, i, minIndex);
        }
    }
    return array;
}

selectSort([3, 5, 1, 9, 2, 10]); // [ 1, 2, 3, 5, 9, 10 ]
```

#### 3、插入排序

插入排序的时间复杂度也是O(n^2)，还是属于性能很差的那种。它的原理是假设第1项已经排好序，比较第2项和第1项的大小，决定第2项应该插在第1项的前面还是后面。这样，前两项的顺序就已经排好了，然后再拿第3项和前两项比较，看排在哪个位置......以此类推，最后完成排序。

实现如下：

```
function insertSort(array) {
    const len = array.length;
    let j, temp;
    for (let i = 1; i < len; i++) {
        j = i;
        // 缓存当前需要插入的项
        temp = array[j];
        while (j > 0 && temp < array[j - 1]) {
            // 前面的项比当前项大，就把它往后挪一项
            array[j] = array[j - 1];
            j--;
        }
        array[j] = temp;
    }
    return array;
}
```

#### 4、归并排序

归并排序采用的是“分治”思想，所谓分治，就是先分后治。先把数组分为一个个有序的子数组，然后再将这些有序的子数组合并为一个有序的数组。那么如何能把数组分为一个个有序的子数组呢？如果数组只有一项的话，那数组肯定是有序的。归并排序采用的就是这种方法，先将数组分解为一个个长度为1的子数组，然后再将他们合并。至于怎么将有序的多个数组合并为一个有序的数组，我们在代码中说明。

```
function mergeSort(array) {
    const len = array.length;
    if (len === 1) {
        return array;
    }
    const mid = Math.floor(len / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid, len);
    // 递归的将数组拆分为长度为1的子数组
    return merge(mergeSort(left), mergeSort(right));
}

// 将两个有序的数组合并为一个有序的数组
function merge(left, right) {
    let il = 0, ir = 0, res = [];
    const lenLeft = left.length, lenRight = right.length;
    // 数组A和B，首先拿A[0]和B[0]比较，如果A[0]<B[0]，A[0]放入res中，再拿A[1]和B[0]比较，小的放入res，以此类推
    while (il < lenLeft && ir < lenRight) {
        if (left[il] > right[ir]) {
            res.push(right[ir++]);
        } else {
            res.push(left[il++]);
        }
    }
    // 当其中一个数组比较完后，将另一个没比完的数组中的剩余项全部放入res
    while (il < lenLeft) {
        res.push(left[il++]);
    }
    while (ir < lenRight) {
        res.push(right[ir++]);
    }
    return res;
}
```
归并排序的时间复杂度为O(n*logn)，是一个性能不错的排序算法，实际应用中是可以使用的。


#### 5、快速排序
我相信对大家来说，快速排序的大名一定是如雷贯耳，它也是最常用的排序算法了。时间复杂度和归并排序一样，也是O(nlogn)，但是它通常比其他的复杂度为O(nlogn)的算法效率要高。他同样也使用的是分治思想，把数组分为较小的数组来处理，但不是像归并那样把数组分为一个个长度为1的数组。
我们直接来看代码：

```
/**
 * @param {Array} array 被排序的数组
 * @param {Number} start 起始位置
 * @param {Number} end 结束位置
 */
function quickSort(array, start, end) {
    let index;
    if (array.length > 1) {
        // index将数组分为较小值数组和较大值数组
        index = partition(array, start, end);
        // 递归处理较小值数组和较大值数组
        if (start < index - 1) {
            quickSort(array, start, index - 1);
        }
        if (index < end) {
            quickSort(array, index, end);
        }
    }
    return array;
}

function partition(array, left, right) {
    const mid = Math.floor((left + right) / 2);
    // 找到哨兵
    const pivot = array[mid];
    // 定义两个指针，一个指向头，一个指向尾部
    let i = left, j = right;
    while (i <= j) {
        // 哨兵左边，找到第一个比哨兵大的
        while (array[i] < pivot) {
            i++;
        }
        // 哨兵右边，找到第一个比哨兵小的
        while (array[j] > pivot) {
            j--
        }
        if (i <= j) {
            // 交换两者位置
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

quickSort([3, 5, 1, 9, 2, 10], 0, 3); // [1, 3, 5, 9, 2, 10]
quickSort([3, 5, 1, 9, 2, 10], 0, 5); // [1, 2, 3, 5, 9, 10]
```

OK，以上就是我目前总结的5种常见的排序算法，后面学习了其他的排序算法后也会在这里更新。同时，后面也会学习总结一些其它经典的、常用的算法。