---
title: Hexo + Github搭建个人博客备忘
date: 2019-10-24 00:50:15
tags:
    - Hexo
    - 个人博客
categories:
    - 技术文章
keywords:
    - Hexo
    - 个人博客
thumbnailImage: https://raw.githubusercontent.com/Wangjun9662/blog-pic/master/images/hexo.png
thumbnailImagePosition: left
autoThumbnailImage: yes
metaAlignment: center
coverImage:
coverCaption:
coverMeta: out
comments: false
---
<p>
最近，利用Hexo + GitHub搭建了一个个人博客。基本是按照网上的教程走的，但还是遇到些问题，这也致使我去学习和温故了一些知识。因此，写下这篇文章备忘。
<br>
<!-- excerpt -->
</p>

<!-- ![](https://raw.githubusercontent.com/Wangjun9662/blog-pic/master/images/hexo.jpeg)
{% alert info %}
Here is a danger alert without icon
{% endalert %}

{% hl_text cyan %}
your highlighted text
{% endhl_text %}

 {% tabbed_codeblock example http://example.com %}
      <!-- tab js -->
          var test = 'test';
      <!-- endtab -->
      <!-- tab css -->
          .btn {
              color: red;
          }
      <!-- endtab -->
  {% endtabbed_codeblock %} -->

#### 前言
本篇文章主要是自己在搭建博客的过程中，对遇到的问题的总结和解决方法，对于零基础的同学来说可能不够详尽，更加详细的教程可以看这篇文章 [GitHub+Hexo 搭建个人网站详细教程](https://zhuanlan.zhihu.com/p/26625249)。

本文默认已经做好如下前置准备：
* 安装了Git并且注册有Github账号
* 安装了Node.js环境


#### Github仓库创建
<p>首先，需要创建一个GitHub仓库来托管我们的页面。这里需要注意的是仓库的命名，必须是{% hl_text danger %}xxx.github.io{% endhl_text %}
这种格式。其中xxx就是你的GitHub的用户名称，比如我的用户名称是Wangju9662，那么我创建的仓库名称就是：Wangju9662.github.io。本来这样创建好仓库就完事了，网上的大部分教程也是如此。但是，当我到后面创建博客的时候，我突然想到一个问题：要是我换电脑了，我怎么来迁移已经写好的那些博客呢？因为博客源码都是写在本地的，难道我需要手动的把他们复制粘贴过去吗？这种方法显然比较麻烦。后来，我找到了一个比较高效和简洁的方法。</p>

<p>创建好的仓库默认是有一个master分支的，为了解决迁移的问题，还需要创建一个hexo分支并设为默认分支，该分支就是用来存放博客源码的。平时写博客的时候，都在该分支上进行，写好后推送到hexo分支，然后部署到master分支。当需要迁移的时候，只需要克隆该仓库，然后在hexo分支上npm install hexo-cli -g , npm install, npm install hexo-deployer-git等操作就行了，但是记住：{% hl_text danger %}不需要hexo init这条指令了{% endhl_text %}。</p>


<p>仓库创建好后，需要把它克隆到本地。通常有两种方式来连接远程仓库，分别是{% hl_text danger %}https和SSH{% endhl_text %}。公司一直使用的是https，这次建站使用了SSH，在此也记录一下二者的利弊和使用方法。

使用https的方式克隆仓库，只需要如下命令即可：
```
    git clone https://github.com/Wangjun9662/Wangjun9662.github.io.git
```
该方式的优点是简洁、速度快。不过，每次和远程建立连接的时候，都得输入用户名和密码。当然，也有记住用户名和密码的方法:
```
git config --global credential.helper store
```
这样，就可以长期保存账户和密码了。如果某天账号和密码变了，比如：公司中都是使用的邮箱账号和密码，并且强制每3个月更换一次密码，那么每次变更密码的时候就得再次输入账户和密码了。

SSH方式就不存在这样的问题，只要设置成功就不需要再输入用户名和密码了，只是第一次设置的时候相对复杂一点。那么它是怎么设置的呢？

首先，需要在本机生成密钥。可以通过
```
$ cd ~/.ssh
$ ls
```
查看本机是否已经生成密钥，如若没有生成，可以通过以下命令生成：
```
ssh-keygen -t rsa -C "注册github账号的邮箱"
```
这样就会在.ssh文件下生成id_rsa和id_rsa.pub两个文件，其中id_rsa是私钥，id_rsa.pub是公钥。
注意：在安装git的时候，需要配置用户名和邮箱。配置的命令如下：
```
git config --global user.name "用户名"
git config --global user.email "邮箱"
```
{% alert info %}
顺便提一下：Mac中显示隐藏文件夹的命令是Conmmand + Shift + .。
{% endalert %}
然后，在GitHub仓库中，user==>settings==>SSH and GPG keys，复制id_rsa.pub公钥到SSH下并保存。这样，SSH设置就完成了。
{% alert warning %}
Warning: Permanently added the RSA host key for IP address '13.xxx.xxx.223' to the list of known hosts.
在使用SSH进行push或者pull的时候，可能会出现这个警告，直接yes就可以了，它会在.ssh文件下生成一个known_hosts文件，起到安全防护的作用。
{% endalert %}
</p>

#### Hexo的安装和常用命令
<p>把仓库克隆到本地之后，切换到hexo分支，接下来的操作都是在该分支下进行的。

首先，全局安装hexo。
```
npm install hexo-cli -g
```
然后，初始化。
```
hexo init blog（博客文件夹名称，我这里使用blog）
```
OK，这样就可以查看博客的雏形了。那么如何查看呢？很简单！
首先，进入刚刚创建的blog文件夹。
```
$ cd blog
```
然后，启动本地服务，s是server的简写。
```
hexo s
```
最后，在浏览器中打开：localhost:4000， 即可看到默认的博客了。

环境已经搭好了，接下来就是如何去创建自己的博客了，同样也非常简单，输入以下命令即可创建一篇博客，n是new的简写。
```
hexo n "博客标题"
```
这样就在source文件夹下的_posts文件夹中生成了一个.md文件，然后就可以在其中写博客了。

写完博客后没有完事，我们还需要把博客发布出去。在这里需要先安装hexo-deployer-git插件，它是用来帮助部署本地博客到GitHub仓库的。
```
npm install hexo-deployer-git --save
```
然后，我们还需要在blog文件下的_config.yml站点配置文件下做如下配置：
```
deploy:
  type: git
  repo: git@github.com:Wangjun9662/Wangjun9662.github.io.git
  branch: master
```
其实，就是配置部署的方式、仓库的地址和部署到哪个分支。

最后，我们就可以部署了。
```
hexo g
hexo d
// 简写
hexo g -d
```
g是generate的简写，就是部署前需要先生成。d是deploy的简写。这样，在浏览器中访问xxx.github.io（xxx是你GitHub的用户名）就可以看到自己的博客了。
{% alert info %}
其他的常用命令：
hexo clean：清除缓存
hexo server -p xxx：自定义端口
hexo server -i xxx：自定义ip
{% endalert %}

##### 图床

什么是图床？优秀的博客当然是图文并茂、绘声绘色的，但如果这些图片都在本地source文件夹存放，部署的时候会被一起打包上线，这样就会增加线上包的体积，影响站点的加载速度。因此，可以将图片存储在第三方平台，通过外链来加载。网上有推荐一些平台，比如[七牛云](https://www.qiniu.com/)，但是图片不备份的话，存在丢失的风险。

我这里使用的是Github仓库，直接使用Github提供的download链接来加载图片，需要的图片push到远程仓库可以了。并且，就算以后GitHub不提供该功能了，我的图片也不会丢失。
</p>

#### 自定义域名

如果觉得xxx.github.io这样的域名太丑，也可以使用自定义域名。不过，这需要耗费一些银子。可以到[阿里云](https://www.aliyun.com/)或者[腾讯云](https://cloud.tencent.com/)上购买域名，不同后缀、不同域名价格都不一样。域名买好之后需要备案，感觉现在备案挺快的，我在阿里云上买的，备案只用了几个小时。

域名买好、备案之后，就要解析了。网上大部分的教程这部分都说的有问题，这个坑也浪费了我好长时间。大部分教程里面都说的是要同时进行CNAME记录类型和A记录类型两种解析，这是错误的。其实，只需要CNAME解析就行了。因为我发现，github分配给xxx.github.io的IP地址不是固定的，如果使用A类型的解析，有可能是访问不到的。具体解析见下图：
![](https://raw.githubusercontent.com/Wangjun9662/blog-pic/master/images/hexo-cname.jpeg)
域名解析好之后，还需要做一些其他的配置。

首先，需要在GitHub给自己的仓库设置custom domain。进入自己的仓库==>Settings==>GitHub Pages==>Custom domain，设置自己的域名并且保存。

其次，还得在blog文件夹下的source文件下创建CNAME文件（不是txt文件，文件类型选择所有）,文件中只写入自己的域名。

这样，在浏览器中输入自己的域名，就可以访问自己的博客网站了。


#### hexo自定义主题
如果不喜欢Hexo默认的主题，可以自定义自己喜欢的主题。Hexo提供了200多种[主题](https://hexo.io/themes/)供你选择，总有一款适合你。我这里选择的是Tranquilpeak这款主题。关于这款主题的具体使用，可以参考其[官方文档](https://github.com/LouisBarranqueiro/hexo-theme-tranquilpeak/blob/master/DOCUMENTATION.md)，说得很详细了。我这里想说的是我使用过程中遇到的一个坑。

在设置“首页”的访问路由时，url不能设置为/，否则访问不到首页，因为它生成的链接中会多一个空格，导致链接错误，这个我是看了源码之后才解决的。
```
sidebar:
    menu:
        home:
            title: global.home
            url: ''
            icon: fa fa-home
```
还有一个是每篇文章最顶部，可以跳回首页的那个链接，也是访问不到首页，和上面是同样的错误，这个是通过修改源码解决的。
#### 站点访问量统计
如果想统计网站的访问量，就像下图这样的效果。
![](https://raw.githubusercontent.com/Wangjun9662/blog-pic/master/images/hexo-busuanzi.png)
最简单的方法就是使用[不蒜子](http://busuanzi.ibruce.info/)，只需在footer.ejs（别的主题可能是其他文件）添加3行代码即可搞定。
```
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<span id="busuanzi_container_site_uv">欢迎你，Jason 的第 <span id="busuanzi_value_site_uv"></span> 位朋友！</span>
<span id="busuanzi_container_site_pv">网站总访问量 <span id="busuanzi_value_site_pv"></span> 人次</span>
```
#### sitemap
sitemap是为了更好的seo，可以使用相关的插件来生成站点的sitemap，设置方法也比较简单。

首先，安装插件：
```
npm install hexo-generator-sitemap --save
// 专门针对百度的
npm install hexo-generator-baidu-sitemap --save
```
然后，在站点_config.yml配置文件中加上配置：
```
Plugins:
  - hexo-generator-baidu-sitemap
  - hexo-generator-sitemap

## Sitemap
sitemap:
  path: sitemap.xml
# Baidusitemap
baidusitemap:
  path: baidusitemap.xml
```
<p>这样在发布的时候就会在public文件夹下生成相应的sitemap的.xml文件了。</p>
<br>
<div style="color:#757288;font-size:1.3rem;padding:2px 6px;border:1px solid #fad2d2;background:#ffecea;border-radius:3px;line-height:22px;">
版权声明：
<br>
本文为博主原创文章，转载请务必附上原文出处链接和本声明
<br>
本文链接：<a href="https://www.wangjun9662.com">https://www.wangjun9662.com</a>
</div>