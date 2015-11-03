/**
 * 封装轨迹类：ibox弹窗（临时使用版本）
 * @author giscafer
 * @version 1.0
 * @date    2015-11-03T23:44:41+0800
 */
define(function(require, exports, module) {
	var hostUrl=require('js/config').options.hostUrl;
    var defaults = {
        opacity: 0.6,
        zIndexBase: 300,
        callBack: null,
        auto: false,
        timeout: 0,
        requestType: 'ajax',
        url: null,
        target: null,
        title: "Message",
        drag: true,
        showClose: true,
        showMin: true,
        iframeWH: {
            width: 500,
            height: 300
        },
        html: '',
        offsetLeft: false, //新建窗口的左偏移量
        offsetTop: false //新建窗口的顶部偏移量
    };
    function initIboxCon() {
        var iBoxHtml = '<div class="modal" id="gc-modal-ibox" tabindex="-1">'+
        '<div class="modal-dialog"><div class="modal-content">'+
        // '<div class="modal-body">'+
        // '</div><div class="modal-footer">'+
        // '<button type="button"class="btn btn-default"data-dismiss="modal">关闭</button>'+
        // '<button type="button"class="btn btn-primary">保存</button></div>'+
        '</div></div>';
        return $(iBoxHtml).appendTo('body');
    }
    function initHeader(title){
    	if(title===undefined || title===null) title="弹窗";
    	var headHtml='<div class="modal-header">'+
    	'<button type="button"class="close"data-dismiss="modal">'+
    	'<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
    	'<h4 class="modal-title">'+title+'</h4></div>';
    	return headHtml;
    }
    exports.openIbox = function(options) {
    	var $container=null;
    	this._iBox_id_counter += 2;
    	var box=$("#gc-modal-ibox")[0];
    	//ibox的div
    	if($("#gc-modal-ibox")[0]===undefined){
    		$container=initIboxCon();
    	}else{
    		$container=$("#gc-modal-ibox");
    	}
    	var con=$container.find("div.modal-content");
    	//头部
    	con.html(initHeader(options.title));
    	//body和footer
        $.get(hostUrl+options.url, function(data) {
            con.append(data);
            $container.modal();
        }, 'text')
    }

});
