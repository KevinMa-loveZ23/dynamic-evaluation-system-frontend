# Basic Source Code Structure - 源码基本结构

## ./ (Root - 根目录)

### ./App.vue

Top component for App.  
应用顶层组件。

### ./main.js

App entrance, router and global error handler definition.  
应用入口，路由与全局错误处理定义。

## ./assets/ - (Resources - 资源)

### ./assets/logo.svg

Favicon for the page.  
页面的 Favicon。

### ./assets/main.css

Main Css Definition of App.  
应用的主要 Css 定义。

## ./comp/ (Components - 组件目录)

### ./comp/info/

info.js defines method for file uploading from API definition.  
info.js 定义文件上传方法（根据 API 定义）。

Info.vue is component for file uploading page.  
Info.vue 为文件上传页组件。

### ./comp/posts/

posts.js defines methods for getting post's / posts' information and data structure for post information from API definition.  
posts.js 定义获取帖子信息相关方法和帖子信息的数据结构（根据 API 定义）。

PostsHeat.vue is component for page of getting specific post's information from post's id.  
PostsHeat.vue 为根据帖子 id 值获取特定帖子信息页组件。

PostsInfluence.vue is component for page of getting top n posts' information from posts' field and timestamp.  
PostsInfluence.vue 为根据帖子领域与时间戳获取热度值前 n 帖子信息页组件。

### ./comp/users/

users.js defines methods for getting user's / users' information and data structure for user information and achievement status from API and other definitions.  
users.js 定义获取用户信息相关方法和用户信息与成就状态的数据结构（根据 API 和其他相关定义）。

UsersHeat.vue is component for page of getting specific user's information and achievement status from user's id.  
UsersHeat.vue 为根据用户 id 值获取特定用户信息和成就状态页组件。

UsersInfluence.vue is component for page of getting top n users' information from users' field and timestamp.  
UsersInfluence.vue 为根据用户领域与时间戳获取得分前 n 用户信息页组件。

### ./comp/check.js

Method for checking if input string is purely made of number.  
检测输入字符串是否为纯数字的方法。

## ./store/ (Global constants & status - 全局常量和状态管理)

### ./store/store.js

Centralized Definitions for Global constants and status flag.  
全局常量和状态标志的集中定义处。

## ./web/ (Request Method Packaging - 请求方法包装)

### ./web/comm.js

DIY Http Request Method Packaging from Fetch API, including Get, Post, Put, Delete.  
自定义实现的 Fetch API 的 Http 请求方法包装，包括 Get，Post，Put，Delete。
