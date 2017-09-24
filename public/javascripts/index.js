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
            $('body').on("click", ".btn-check", function(e) {
                var check_btn = $(this).button('loading');
                me.checkStart(e.target.dataset).then(function() {
                        return me.getRowHtml(e.target.dataset.dir);
                    })
                    .then(function(rowHtml) {
                        check_btn.parents('tr').html(rowHtml)
                    });
            });
            $('body').on("click", ".btn-init", function(e) {
                var init_btn = $(this).button('loading');
                me.init(e.target.dataset).then(function() {
                        return me.getRowHtml(e.target.dataset.dir);
                    })
                    .then(function(rowHtml) {
                        init_btn.parents('tr').html(rowHtml)
                    });
            });
            $('#btnSave').on('click', function() {
                var data = $('#register_form').serialize();
                data = decodeURIComponent(data, true);
                me.save(data).then(function() {
                    me.registerModal.modal('hide');
                    window.location.reload();
                });
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
         * 保存
         * @param  {Object} data 表单数据
         * @return {Promise}     承诺对象
         */
        save: function(data) {
            return $.post('/register/save', data);
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