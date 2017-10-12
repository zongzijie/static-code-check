(function($) {
    var index = {
        /**
         * 注册项目的模态窗口对象
         * @type {modal}
         */
        registerModal: null,
        /**
         * 页面准备
         * @return {[type]} [description]
         */
        pageReady: function() {
            var me = this;
            me.registerModal = $('#registerModal');
            me.editerModal = $('#editerModal');
            //开始检查
            $('body').on("click", ".btn-check", function(e) {
                var check_btn = $(this).button('loading');
                me.checkStart(e.target.dataset).then(function() {
                        return me.getRowHtml(e.target.dataset.dir);
                    })
                    .then(function(rowHtml) {
                        check_btn.parents('tr').html(rowHtml)
                    });
            });
            //初始化项目
            $('body').on("click", ".btn-init", function(e) {
                var init_btn = $(this).button('loading');
                me.init(e.target.dataset).then(function() {
                        window.location.reload();
                    });
            });
            //删除
            $('body').on("click", ".btn-remove", function(e) {
                if (confirm('删除项目吗？')) {
                    me.remove(e.target.dataset).then(function() {
                        window.location.reload();
                    });
                }
            });
            //新增tfs检查
            $('body').on("click", ".btn-register-tfs", function(e) {
                 me._fillForm($('#register_tfs_form'),{createdTime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')});
            });
            //修改tfs检查
            $('body').on("click", ".btn-edit-tfs", function(e) {
                me.getProject(e.target.dataset.dir).then(function(project) {
                    project.createdTime=moment(project.createdTime).format('YYYY-MM-DD HH:mm:ss')
                    me._fillForm($('#editer_tfs_form'),project);
                });
            });
            //保存tfs
            $('#btnTFSSave').on('click', function() {
                var data = $('#register_tfs_form').serialize();
                data = decodeURIComponent(data, true);
                me.save(data).then(function() {
                    me.registerModal.modal('hide');
                    window.location.reload();
                });
            });
            //更新tfs
            $('#btnTFSUpdate').on('click', function() {
                var data = $('#editer_tfs_form').serialize();
                data = decodeURIComponent(data, true);
                me.update(data).then(function() {
                    me.editerModal.modal('hide');
                    window.location.reload();
                });
            });
            //新增git检查
            $('body').on("click", ".btn-register-git", function(e) {
                 me._fillForm($('#register_git_form'),{createdTime:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')});
            });
            //修改git检查
            $('body').on("click", ".btn-edit-git", function(e) {
                me.getProject(e.target.dataset.dir).then(function(project) {
                    project.createdTime=moment(project.createdTime).format('YYYY-MM-DD HH:mm:ss')
                    me._fillForm($('#editer_git_form'),project);
                });
            });

            //保存git
            $('#btnGITSave').on('click', function() {
                var data = $('#register_git_form').serialize();
                data = decodeURIComponent(data, true);
                me.save(data).then(function() {
                    me.registerModal.modal('hide');
                    window.location.reload();
                });
            });
            //更新git
            $('#btnGITUpdate').on('click', function() {
                var data = $('#editer_git_form').serialize();
                data = decodeURIComponent(data, true);
                me.update(data).then(function() {
                    me.editerModal.modal('hide');
                    window.location.reload();
                });
            });

        },
        _fillForm: function(form,data) {
            _.each(data, function(v, k) {
                if (typeof v == 'function') {
                    return;
                }
                var $input=form.find('[name="'+k+'"]');
                $input.val(v);
            });
        },
        /**
         * 开始检查
         * @param  {Object} data 页面数据
         * @return {Promise}      承诺对象
         */
        checkStart: function(data) {
            return $.post('check', data);
        },
        /**
         * 获取行HTML，用于局部更新
         * @param  {String} dir 文件夹名称
         * @return {Promise}     承诺对象
         */
        getRowHtml: function(dir) {
            return $.get('row/' + dir);
        },
        /**
         * 获取项目信息
         * @param  {String} dir 文件夹名称
         * @return {Promise}     承诺对象
         */
        getProject: function(dir) {
            return $.get('/register/project/' + dir);
        },
        /**
         * 保存
         * @param  {Object} data 表单数据
         * @return {Promise}     承诺对象
         */
        save: function(data) {
            return $.post('/register/save', data);
        },
        /**
         * 更新
         * @param  {Object} data 表单数据
         * @return {Promise}     承诺对象
         */
        update: function(data) {
            return $.post('/register/update', data);
        },
        /**
         * 删除
         * @param  {Object} data 表单数据
         * @return {Promise}     承诺对象
         */
        remove: function(data) {
            return $.post('/register/remove', data);
        },
        /**
         * 初始化
         * @param  {Object} data 表单数据
         * @return {Promise}     承诺对象
         */
        init: function(data) {
            return $.post('/register/init', data).fail(function(jqXHR, textStatus, errorThrown) {
                // net::ERR_CONNECTION_REFUSED 发生时，也能进入
                console.info("网络出错");
                //alert('网络出错');
            });
        }
    };
    window.app = index;
})(window.$);
window.$(window.document).ready(function() {
    window.app.pageReady();
});