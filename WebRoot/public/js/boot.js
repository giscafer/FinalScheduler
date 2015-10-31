__CreateJSPath = function (js) {
    var scripts = document.getElementsByTagName("script");    
    var path = "";
    for (var i = 0, l = scripts.length; i < l; i++) {
        var src = scripts[i].src;
        if (src.indexOf(js) != -1) {
            var ss = src.split(js);
            path = ss[0];
            break;
        }
    }
    var href = location.href;
    href = href.split("#")[0];
    href = href.split("?")[0];
    var ss = href.split("/");
    ss.length = ss.length - 1;
    href = ss.join("/");
    if (path.indexOf("https:") == -1 && path.indexOf("http:") == -1 && path.indexOf("file:") == -1 && path.indexOf("\/") != 0) {
        path = href + "/" + path;
    }
    return path;
}

//bootPath
var bootPATH = __CreateJSPath("boot.js");

easyui_debugger = true;   

document.write('<link href="' + bootPATH + 'modules/easyui/themes/default/easyui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'modules/easyui/themes/icon.css" rel="stylesheet" type="text/css" />');

//easyui核心文件
document.write('<script src="' + bootPATH + 'modules/easyui/jquery.easyui.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'modules/easyui/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>');


