var Service = require('node-windows').Service;

var svc = new Service({
    name: 'static-code-check', //服务名称
    description: '静态代码检查服务', //描述
    script: './bin/www' //nodejs项目要启动的文件路径
});

svc.on('install', function(){
    svc.start();
});

svc.install();