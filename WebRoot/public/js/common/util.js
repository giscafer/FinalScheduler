/**
 * 通用工具类
 * @author giscafer
 * @version 1.0
 * @date    2015-11-04T22:29:32+0800
 */
define(function(require,exports,module){
	/**
	 * 设置窗口高度
	 * @param   {String}                 winId 窗口id
	 * @param   {Number}                 dx     可调高度值
	 */
	exports.initWinHeight=function(winId, dx) {
	    var navbarH = $(".navbar").height();
	    var winH = $(window).height() - navbarH;
	    if (dx) {
	        winH = winH + dx;
	    }
	    $("#" + winId).css({
	        height: winH
	    });
	    window.onresize = function() {
	        var navbarH = $(".navbar").height();
	        var winH = $(window).height() - navbarH;
	        if (dx) {
	            winH = winH + dx;
	        }
	        $("#" + winId).css({
	            height: winH
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
