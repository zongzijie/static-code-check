# 代码检查平台
### 安装项目
    cd static-code-check
    npm install
### 安装 MongoDB
    sudo brew install mongodb
#### 创建 MongoDB
    sudo mkdir -p /data/db
#### 运行 MongoDB
    sudo mongod
### 运行代码检查平台
    node bin/www
### 如果需要支撑TFS仓库的代码检查，还需要安装git-tf
    brew install git-tf
### 访问 localhost:3000
