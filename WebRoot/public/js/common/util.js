define(function(require,exports,module){
	//datagrid自适应函数,尚未封装成类，仅是一种临时的解决方案
	exports.setGridHeightAuto=function(gridId, dx) {
	    //获取head logo的高度
	    var headHeight = $(".zs-top").height();
	    //获取一级菜单高度，注意：一级菜单有时候和log栏在重叠在一起，不用额外计算菜单栏高度
	    var menuHeight = $(".zs-top").height();
	    var locationHeight = $(".zs-location").height();
	    //50表示grid表格toolbar栏的高度
	    var winHeight = $(window).height() - headHeight - locationHeight - 70;
	    if (dx) {
	        winHeight = winHeight + dx;
	    }
	    $("#" + gridId).css({
	        height: winHeight
	    });
	    window.onresize = function() {
	        var locationHeight = $(".zs-location").height();
	        var winHeight = $(window).height() - $(".fore-2d3d-head").height() - $(".fore-2d3d-menu").height() + 30 - locationHeight;
	        if (dx) {
	            winHeight = winHeight + dx;
	        }
	        $("#" + gridId).css({
	            height: winHeight
	        });
	    }
	}
});