# dynamic-evaluation-system-frontend

A simple frontend page for dynamic evaluation system project.  
为小组作业提供的简单前端页面实现。

To deploy in backend server, put **/dist** folder in this project into **/static** folder of backend Spring project. In this case, delete links' prefixes **"/"** of **href** attributes in **&lt;link>** tags in **index.html** (include favicon, js and css files) and all will work.  
将页面部署到后端，需要把此项目的 **/dist** 文件夹放到后端项目的 **/static** 文件夹中。此时，需要删除 **index.html** 的 **&lt;link>** 标签的 **href** 属性内容链接的 **"/"** 前缀（包括favicon，js和css文件）。
*Or change the files' positions to make sure they get the right HTTP request.*  
*或者想办法重新排列各文件的位置，使得访问时能向后端发送正确的HTTP请求来正确获得各文件。*

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
