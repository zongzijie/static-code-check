
(function(){
	var index={
		pageReady:function(){
			var me=this;
			$("#btn-check").on("click",function(e){
				me.checkStart(e.target.dataset);
			});
			$("#btn-register").on("click",function(e){
				window.open('/register');
			});
		},
		checkStart:function(data){
			$.post('check',data).then(function(id){
					window.location.reload();
			});
		}
	};
	window.app=index;
})();
$(document).ready(function(){
	app.pageReady();
});