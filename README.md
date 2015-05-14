fis-quickstart-demo
===================

fis-quickstart-demo是FIS的快速上手示例，请配合[文档](http://fis.baidu.com/docs/beginning/getting-started.html)使用


## 本地 URL 模拟转发

FIS 的 rewrite 模块。用于本地浏览时，url 的转发，覆盖 fis 默认的 url 规则，模拟线上 url 规则，ajax 请求，文件转发等。

server.conf 是方便调试用的，对应编译到 server-conf/${namespace}-server.conf 目录下
fis会将请求都扔给www目录下面的index.php，index.php 会引入rewrite模块来解析server.conf文件，如果解析成功就按照rewrite格式来转发请求。

安装方法：在使用时，需要首先安装 rewrite:

$ fisp server install rewrite

对外提供match方法，供其他调试模块调用，具体方法参考代码注释说明。

默认读取根目录server.conf文件(在www目录下的rewrite类中静态)，书写方式是：

## 基础配置

在模块目录下通过配置文件 server.conf 文件进行配置，配置方式是：

rewrite 和 redirect 开头的会被翻译成一条匹配规则，自上而下的匹配。所有非 rewrite 和 redirect 开头的会被当做注释处理。

rewrite ： 匹配规则后转发到一个文件
template ： 匹配规则后转发到一个模板文件，但url不改变，只针对模板
redirect ： 匹配规则后重定向到另一个url

    rewrite ^\/news\?.*tn\=[a-zA-Z0-9]+.* app/data/news.php
    template ^\/(.*)\?.*  /home/page/index.tpl
    redirect ^\/index\?.* /home/page/index

## 配置文件说明

配置文件每一行为一条规则。
格式为：匹配类型 (空格) 匹配url正则 (空格) 命中正则后的目的文件路径或者url。 rewrite、redirect和template是fis默认的三种匹配类型。
rewrite ： 匹配规则后转发到一个文件，同时url修改为访问文件的url路径。 目的文件路径的根目录(root)是fis本地调试目录(可以输入命令 $ fis server open 打开噢)，配置文件从根目录之后写即可。 其中，转发到php文件，php会执行。转发到其他文件，会返回文件内容。例如：可以用rewrite模拟ajax请求，返回json数据~
rewrite的目的文件，默认需要经过fis release之后投送到fis调试目录。直接转发到本地文件，该文件可能没有被fis处理，可能会出现诡异问题噢~
template : 为了完全模拟线上url，可通过template配置对应的url规则对应相应的模板进行访问，访问url不变。
redirect ： 匹配规则后重定向到另一个url。
注意:

server.conf专门配置转发规则，文件名不能改哦
项目很大，多模块时，一个模块配置server.conf就可以啦，比如在common模块配置全站的转发规则，否则会覆盖
所有非rewrite、template和redirect开头的会被当做注释处理。
