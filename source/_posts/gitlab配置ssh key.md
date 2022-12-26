---
title: gitlab 配置 ssh key
categories:
  - gitlab
tags:
  - git
index_img: /img3/gqj1.jpg
banner_img: /img3/gqj1.jpg
---

# gitlab 配置 ssh key

打开本地 git bash 或者 cmd,使用如下命令生成[ssh](https://so.csdn.net/so/search?q=ssh&spm=1001.2101.3001.7020)公钥和私钥对

`ssh-keygen -t rsa -C 'xxx@xxx.com'` 然后一路回车(-C 参数是你的邮箱地址)

```
ssh-keygen
```

Enter 一路回车,遇到 y 选 y

```cmd
C:\Users\LL>ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (C:\Users\LL/.ssh/id_rsa):
C:\Users\LL/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in C:\Users\LL/.ssh/id_rsa.
Your public key has been saved in C:\Users\LL/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:TJf1AiiRDMYxs4bTcjOnIKrGn42s1yZfWIwRbrcIEHw ll\ll@LL
The key's randomart image is:
+---[RSA 3072]----+
|.o..*=.o .. .    |
| ..Eo+= .  + .   |
|. *.B+.o. o . .  |
|.. *o=*o..   .   |
|.   .o +S        |
|o     o          |
|.o  .. .         |
|. oo+o.          |
| .o=+o           |
+----[SHA256]-----+
到此就是完成了！
```

然后打开~/.ssh/id_rsa.pub 文件(~表示用户目录，比如我的 windows 就是 C:\Users\LL\.ssh)，复制其中的内容

打开 gitlab,找到 Profile Settings-->SSH Keys--->Add SSH Key,并把上一步中复制的内容粘贴到 Key 所对应的文本框，在 Title 对应的文本框中给这个 sshkey 设置一个名字，点击 Add key 按钮

<img src="https://img1.imgtp.com/2022/09/10/OFvHa8Bf.jpg" />

为啥要设置 ssh 协议呢？

```javascript
// 我们为什么要使用ssh协议呢？因为ssh更加安全，然后更加方便，比如我们公司的gitlab由http协议换成了https协议，那么如果你是使用http协议管理代码，那么需要修改所有的项目中的git地址变成https，这会把我们给逼疯的！但是如果我们一开始就是用ssh协议，这不需要任何的修改，简直不能再爽一点了。
```

# 使用 GitBash 对 GitLab 服务器上的项目进行操作

| 序号 | 命令                                             | 命令说明                                                                       |
| ---- | ------------------------------------------------ | ------------------------------------------------------------------------------ |
| 1    | $ git --version                                  | 检查 Git 的版本                                                                |
| 2    | $ git config --global user.name "Coffee"         | 提交信息时添加 Git 用户名                                                      |
| 3    | $ git config --global user.name                  | 验证输入的用户名                                                               |
| 4    | $ git config --global user.email "xxxxx@163.com" | 设置电子邮件地址                                                               |
| 5    | $ git config --global user.email                 | 验证输入的电子邮件地址                                                         |
| 6    | $ git config --global --list                     | 检查输入的信息                                                                 |
| 7    | $ git checkout master                            | 获取对主分支所做的最新更改                                                     |
| 8    | $ git pull origin **NAME-OF-BRANCH** -u          | 获取工作目录的最新更改(**`NAME-OF-BRANCH`可以是’master’或任何其他现有的分支**) |
| 9    | $ git checkout -b branch-name                    | 创建一个新的分支                                                               |
| 10   | $git clone 项目的 ssh 地址                       | 克隆项目到本地                                                                 |

# Git

Git（读音为/gɪt/）是一个开源的分布式版本控制系统，可以有效、高速地处理从很小到非常大的项目版本管理。 [1] 也是 Linus Torvalds 为了帮助管理 Linux 内核开发而开发的一个开放源码的版本控制软件。

Git 的作用是用于管理项目的源代码
它主要用于管理 开发环境(Dev)下的项目代码

市面上主要有两类源代码管理工具

1. 集中式代码管理工具 (svn)
2. 分布式代码管理工具 (git)

官网
https://git-scm.com/
git 是一个跨平台的项目管理工具 可以运行在 Windows Linux Unix OSX

### git 与 github

git 是目前世界上最先进分布式的版本控制系统
github 是一个仓库

### git 基本操作

#### 全局用户配置

```bash
# 每台计算机只需要执行一次配置
$ git config --global user.name 'li xxx'
$ git config --global user.email 'xxx@163.com'
```

1. 项目构建 在项目的根目录创建文件 (README.md .gitignore)
2. 在 .gitignore 中 存放需要忽略的文件或目录 (不需要 git 管理的文件或目录)
3. 在项目的根目录 执行 `$ git init` 进行仓库初始化操作
4. 进行项目初始化 `$ npm init -y`

#### 本地仓库操作

```bash
# 查看状态   （查看文件是否被修改 被删除 或者添加）
$ git status

# 查看版本的差别
$ git diff

# 添加管理(将文件或目录添加到git本地仓库的暂存区)
$ git add filename    # 添加文件到暂存区
$ git add .           # 添加当前目录所有内容到暂存区
$ git add path/       # 添加指定目录到暂存区
$ git add --all       # 添加所有内容到暂存区

# 将文件移出暂存区
$ git rm --cached filename

# 将暂存区的内容提交到本地仓库
$ git commit -m 'message'    //这里的message可以是版本号

# 查看提交日志
$ git log

# 回退一个版本
$ git reset HEAD^

# 回退到指定版本
$ git reset --hard 提交记录的前6位

# 查看帮助
$ git --help

# 恢复文件
$ git checkout filename

# 查看所有历史版本
$ git reflog
```

#### 分支相关操作

```bash
# 查看分支
$ git branch

# 创建分支
$ git branch 分支名

# 切换分支
$ git checkout 分支名  或者    git switch 分支名

# 创建并切换分支
$ git checkout -b 分支名

# 合并分支内容
$ git merge 分支名

# 删除分支
$ git branch -d 分支名

# 查看分支记录
$ git log --graph --pretty=oneline

# 直接拉取数据到对应的分支
$ git pull origin master
```

#### 远程仓库操作

```bash
# 生成密钥对 (公钥 / 私钥)
ssh-keygen -t rsa -C '里面输入邮箱地址'

# 设置远程仓库地址
$ git remote add origin https://github.com/jxsrzj0325/suning.com.git

# 将本地仓库提交到远程仓库
$ git push -u origin master

# 查看所有源
$ git remote

# 查看源的路径
$ git remote get-url 名称

# 克隆仓库(下载 从无到有)
$ git clone https://gitee.com/rootbk/suning.com.git

# 拉取(已有 更新)
$ git pull origin master
```

### 组员的流程 （刚拿到项目时）

1. git clone xxxxxxxx (获取克隆的地址)
2. git checkout -b 分支名 (创建并切换分支)
3. git add . (存储内容到暂存区)
4. git commit -m "xxx" (将暂存区的内容提交到本地仓库)
5. git push --set-upstream origin 分支名 第一次需要如此上传

### 组员的流程 （项目开始时）

1. git pull origin master 将远程的 master 拉到自己的 master
2. git checkout 分支名 (切换回到自己的分支)
3. git merge master ( 将自己的 master 合并到自己的分支 让分支是最新的)
4. 开始写代码 ing
5. git add . (存储内容到暂存区)
6. git commit -m "xxx2" (将暂存区的内容提交到本地仓库)
7. git pull origin master (将远程的最新的代码 拉到自己的分支)
8. 可能需要解决冲突(如果解决了冲突，需要重新 add 和 commit)
9. git push (上传)

### 组长

---

​ git fetch --all （查看所有分支）

​ git checkout self （切换到相应组员分支）

​ 启动项目并检查

​ git checkout master （切换回主分支）

​ git merge self （将检查无误的组员分支合并到主分支）

​ git push (将本地的 master 推送到远程的 master)

---

​ git checkout self

​ git pull (将远程的 self 拉到本地的 self)

​ 启动项目并检查

​ git checkout master

​ git merge self

​ git push (将本地的 master 推送到远程的 master)
