
(function(){
	var index={
		pageReady:function(){
			var me=this;
			$("#btn-check").on("click",function(e){
				me.checkStart(e.target.dataset.id);
			});
			$("#btn-register").on("click",function(e){
				window.open('/register');
			});
		},
		checkStart:function(dir){
			$.post("/check/"+dir).then(function(id){
					window.location.reload();
			});
		}
	};
	window.app=index;
})();
$(document).ready(function(){
	app.pageReady();
});