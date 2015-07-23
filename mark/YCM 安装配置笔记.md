# YCM 配置笔记
## *Wed Jul 22 11:10:21 2015*

### 来由

当程序的规模逐渐庞大的时候，仅凭大脑来记忆各种类名和成员的命名显然是很愚蠢的
于是这时就需要一个能够自动补全的工具，前些天一直使用 vim-omnicppcomplete 来实
现这个功能，但是 ctags 不是一个基于语义分析的工具，而是生成一个静态的列表，存
储在文件中，效率虽然不差，但是每次添加了新的类或者修改了成员后，都要重新生成
ctags 的文件，甚是繁琐。

    这时一个叫 YouCompleteMe 的插件出现了(同样来源于 quininer 大神的提醒)
而且这个插件是基于语义补全的，正是我想要的特性。在这里记下配置过程，以备以后查阅。

### 安装
******

#### What U Need?

- cmake
- vundle 插件 *这貌似是个管理插件的插件*
- 较快的网速！！
- 如果是 deb 系的发行版，请安装 python-dev

******
#### How to Do?

从 aur 构建 vundle

 **这里有点疑问**
 
 依据 [VundleOnGitHub](https://github.com/VundleVim/Vundle.vim) 上的内容

> Configure Plugins:  
> Put this at the top of your .vimrc to use Vundle. Remove plugins you don't need, they are for illustration purposes.  
> * 这里有一段配置代码(略)

但是根据 aur 构建完 vundle 后的提示信息
>  \>\>\> To use vundle, please check the file /usr/share/vundle/vimrc.sample  
>  \>\>\> and update your ~/.vimrc file, accordingly  
也就是指向那个 vimrc.sample 文件中的信息

我做了比较，发现内容有出入，而 [arch wiki:VIM#using a plugin manager](https://wiki.archlinux.org/index.php/Vim#Using_a_plugin_manager) 关于
vundle 的描述也只是一句话 = =; 在这里好迷茫

我决定相信 aur 中的提示信息

接下来根据 GitHub 上的介绍，用 vundle 安装插件的方法就是很简单的命令了

> Launch vim and run :PluginInstall  
> To install from command line: vim +PluginInstall +qall

然后根据 GitHub 上 [YCM 的 Full-Installation-Guide](https://github.com/Valloric/YouCompleteMe#full-installation-guide) 的指示
先进入 vim 然后执行 :vesion 来查看版本，如果 <= 7.3 可能会有一些麻烦(除非特别老旧的发行版版本，不然正常发行版提供的 vim 包应该
都是 7.4 or 7.4+)

#####接下来是安装 YCM 插件  
在 vimrc 中添加一行
> `Plugin 'Valloric/YouCompleteMe'`

**下面这一步骤有点特殊，如果你经常使用的语言不是 C-family 的，那么就可以省略掉了**

下载最新的 libclang 包, clang 编译器提供了有力的 C-family 语言的语义分析功能,官方推荐下载 3.6+ 的版本，不过 3.2 也可以接受.  
请下载 [official binaries from llvm.org](http://llvm.org/releases/download.html) 而不是使用系统自带的 libclang 包
或者是自行编译的包。

######      然而我在 aur 里看到了 vim-clang-complete 这样的包 0.0 这是怎么回事...

   (以后可能会另开一篇博文写关于 clang 的内容)

**特殊的一步结束了**

下面这一步需要安装 cmake 如果没有按照文章开头的要求做好准备，现在就安装 cmake 吧  
在 vim 中输入 :help vundle ，按照手册中的提示，键入
` :PluginInstall`
然后，会启动一个特别的界面,提示正在安装 YCM 插件，这时候界面是不动的，不要输入任何东西
，静静等待就是了.... 第一次安装以为是卡住了，查看了网速发现走的飞快，才知道是在安装中  

等待安装结束\(没有提示\)后，执行如下创建文件夹的命令，用来存放中间文件
`cd ~
mkdir ycm_build
cd ycm_build`

现在，如果你不关心 C-family 语言的语义分析功能，执行

`cmake -G "Unix Makefiles" . ~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp`  

强烈建议打开 -DUSE\_SYSTEM\_BOOST=ON 选项

如果关心 C-family 语言语义分析

1. 在 ~/ 中新建文件夹 ycm\_temp/llvm\_root\_dir
2. 解压之前下载的 clang 包
3. 将解压内容放入新建的文件夹中
4. 执行 `cmake -G "Unix Makefiles" -DPATH_TO_LLVM_ROOT=~/ycm_temp/llvm_root_dir . ~/.vim/bundle/YouCompleteMe/third_party/ycmd/cpp`
5. 现在 makefiles 已经创建完成，继续执行 `make ycm_support_libs`

如果执行完毕，没有报错，说明安装完成了，不过我出现了如下错误

> Linking CXX shared library /home/zwindl/.vim/bundle/YouCompleteMe/third\_party/ycmd/ycm\_core.so  
> /home/zwindl/ycm\_temp/llvm\_root\_dir/lib/libclang.so: error adding symbols: 文件格式错误  
> collect2: 错误：ld 返回 1  
> ycm/CMakeFiles/ycm\_core.dir/build.make:588: recipe for target '/home/zwindl/.vim/bundle/YouCompleteMe/third\_party/ycmd/ycm\_core.so' failed  
> make[3]: \*\*\* [/home/zwindl/.vim/bundle/YouCompleteMe/third\_party/ycmd/ycm\_core.so] Error 1  
> CMakeFiles/Makefile2:165: recipe for target 'ycm/CMakeFiles/ycm\_core.dir/all' failed  
> make[2]: \*\*\* [ycm/CMakeFiles/ycm\_core.dir/all] Error 2  
> CMakeFiles/Makefile2:209: recipe for target 'ycm/CMakeFiles/ycm\_support\_libs.dir/rule' failed  
> make[1]: \*\*\* [ycm/CMakeFiles/ycm\_support\_libs.dir/rule] Error 2  
> Makefile:148: recipe for target 'ycm\_support\_libs' failed  
> make: \*\*\* [ycm\_support\_libs] Error 2

正在解决这些问题，不过从 aur 中安装通过了，初步判断是有部分文件没有下载完整

详细配置过程后续更新

##更新

问题已解决，确实是文件没有下载完，程序就卡死了

### 配置

******

依据[这篇文章](http://www.tuicool.com/articles/RZRJJbf) 和 [这篇文章](http://blog.jobbole.com/58978/)  
修改 vimrc 更方便

最后，终于能尽情使用了，简单测试了一下，没有明显的卡顿感

#### 2015 07 23 更新
关于 .ycm\_extra\_conf.py 的配置问题，建议参考这个项目 [newycm\_extra\_conf.py](https://github.com/robturtle/newycm_extra_conf.py); 使用方便，可以解决 C++ 不能补全标准库的问题
