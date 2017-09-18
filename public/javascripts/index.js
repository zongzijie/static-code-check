(function() {
    var index = {
        pageReady: function() {
            var me = this;
            $('body').on("click", ".btn-check", function(e) {
                var check_btn = $(this).button('loading');
                me.checkStart(e.target.dataset).then(function() {
                        return me.getRowHtml(e.target.dataset.dir);
                    })
                    .then(function(rowHtml) {
                        check_btn.parents('tr').html(rowHtml)
                    });
            });
            $("#btn-register").on("click", function(e) {
                window.open('/register');
            });
            $('#regitserModal').on('shown.bs.modal', function() {
                $('#myInput').focus()
            })
        },
        checkStart: function(data) {
            return $.post('check', data);
        },
        getRowHtml: function(dir) {
            return $.get('row/' + dir);
        }
    };
    window.app = index;
})();
$(document).ready(function() {
    app.pageReady();
});