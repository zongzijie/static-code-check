var Service = require('node-windows').Service;

var svc = new Service({
    name: 'static-code-check-web', //服务名称
    description: '静态代码检查服务', //描述
    script: 'node bin\www' //nodejs项目要启动的文件路径
});

svc.on('uninstall', function() {
    console.log('Uninstall complete.');
    console.log('The service exists: ', svc.exists);
});

svc.uninstall();