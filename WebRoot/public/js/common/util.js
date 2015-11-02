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
		//按钮变灰
	exports.disableBtn=function(btn){
		for(var i=0; i<arguments.length; i++)
			$(arguments[i]).attr('disabled','disabled')
				.css({'background':'#eee', 'color':'#888', 'border':'solid 1px #aaa'});
	}
	//按钮变可用
	exports.enableBtn=function(btn){
		for(var i=0; i<arguments.length; i++){
			var $btn = $(arguments[i]);
			//权限标志，如果权限上已控制按钮为不可用，则无论如何不能将按钮变为可用
			var authtag = $btn.attr('authtag');
			if(!authtag || authtag!='disabled'){
				var display = $btn.css('display');
				$btn.removeAttr('disabled')
				.removeAttr('style')
				.css('display',display);
			}
		}
	}

	//动态载入js文件
	exports.loadScript=function(url){
		var script = document.createElement('script');
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);
	}

	//动态加载css样式文件
	exports.loadStyles=function(url){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = url;
		var head = document.getElementsByTagName('head')[0];
		head.appendChild(link);
	}
	/**
	 * 判断对象是否为空（没有任何属性）
	 */
	exports.isEmpty=function(o){
		if(typeof o !== 'object')
			throw new TypeError('isEmplty不接受非对象类型的参数');
		for(a in o){
			return false;
		}
		return true;
	}
});
