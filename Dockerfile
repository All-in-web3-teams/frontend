# 使用特定版本的 Node.js 基础镜像
FROM node:18.17.1-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package.json package-lock.json ./

# 安装依赖
RUN npm install

# 复制所有源代码到工作目录
COPY . .

# 构建应用（如果你的前端项目需要构建步骤）
RUN npm run build

# 暴露容器内部的端口号
EXPOSE 3000

# 设置容器启动后执行的命令
CMD ["npm", "start"]
