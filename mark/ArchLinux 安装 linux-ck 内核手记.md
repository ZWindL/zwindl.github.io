# 安装 linux-ck 内核手记
## *Sat Jul 25 13:50:49 2015*

### 科普
******
昨日在 arch 论坛中看到了有人在用加 cjktty 补丁内核，所以决定尝试一下带 bfs 和 bfq 补丁的内核，体验一下"看得到的快"。
有关 ck 内核的历史，特点以及安装途径都在下面的两个链接里  
- [ArchWiki](http://www.ibm.com/developerworks/cn/linux/l-cn-bfs/)
- [IBM dev](https://wiki.archlinux.org/index.php/Linux-ck)

### 过程
******
#### **方法一**

直接在 aur 中搜索 linux-ck，然后编译安装，如果不想听到电脑风扇的怒吼就不建议开启多线程了，建议开启 [bfq 调度器](http://algo.ing.unimo.it/people/paolo/disk_sched/)，
另外 /tmp 空间可能不足，不过编译安装的是最适合自己口味的内核

编译完请看后面的 [添加到启动器](#Install BootLoader) 部分

#### **方法二**

使用 [Repo-ck](https://wiki.archlinux.org/index.php/Repo-ck)  
编辑 /etc/pacman.conf 添加
`[repo-ck]							
Server = http://repo-ck.com/$arch
Server = http://repo-ck.com/$arch
Server = http://repo-ck.com/$arch
Server = http://repo-ck.com/$arch
Server = http://repo-ck.com/$arch
Server = http://repo-ck.com/$arch
Server = http://repo-ck.com/$arch`

这里的地址一定要多添加几遍，具体原因在[这里](https://wiki.archlinux.org/index.php/Repo-ck#Downloads_interrupt_regularly)

下面这步很重要，与上一步同样的原因，如果不修改下载器的话安装过程会让你疯掉  
在 pacman.conf 中的 [Option] 段加入
`XferCommand = /usr/bin/wget -c -q --show-progress --passive-ftp -O %o %u`

然后执行这条(我执行总出错后来发现忽略也没什么事...)
`pacman-key -r 5EE46C4C && pacman-key --lsign-key 5EE46C4C`

刷新一下
`pacman -Syy`

在终端执行  
`gcc -c -Q -march=native --help=target | grep march`
然后安装对应的 linux-xxx (xxx 是执行命令得到的结果与 [这个表格](https://wiki.archlinux.org/index.php/Repo-ck#Selecting_the_correct_CPU_optimized_package) 对应的字符串)

如果有 N 卡的话，建议安装 nvidia-ck-xxx

### 添加到启动器
<a name="Install BootLoader"id="Install BootLoader"></a>

**我使用了 UEFI 和 GPT 磁盘，MRB 分区表添加启动器的方式可能会略有不同。**这里介绍两种启动器，一种是 [Grub2](#grub) 另一种是 [Gummiboot](#gummiboot)，其他的暂时不算很了解

### Grub 启动器
<a name="grub" id="grub"></a>
可以参照[这里](https://wiki.archlinux.org/index.php/Linux-ck#Boot_loader_and_Linux-ck)设置

### Gummiboot
<a name="gummiboot" id="gummiboot"></a>
以 root 身份进入 /boot/loader/entries  
然后建立新文件 arch-ck.conf  
加入如下内容  

`title   Arch Linux-ck kernel
linux   /vmlinuz-linux-ck
initrd  /initramfs-linux-ck.img
options root=/dev/sdaX rw`

这里需要注意, options 行的 sdaX 是 / 分区或是 /boot 分区的位置，根据自己的分区定

### 结束
******
不出意外的话，安装就成功了，可以尝试一下"流畅" 的内核，但是不要抱太大的希望，以免失望
