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
var Giscafer={};
easyui_debugger = true;   
//排班插件；和easyui冲突，需要置前
document.write('<script src="' + bootPATH + 'modules/jquery/jquery.dragsort-0.5.2.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'modules/jquery/jquery.bigcolorpicker.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'modules/jquery/jquery-ui-1.9.1.custom.min.js" type="text/javascript"></script>');

//easyui核心文件
document.write('<script src="' + bootPATH + 'modules/easyui/jquery.easyui.min.js" type="text/javascript"></script>');
document.write('<script src="' + bootPATH + 'modules/easyui/locale/easyui-lang-zh_CN.js" type="text/javascript"></script>');

//bootstrap
document.write('<link href="' + bootPATH + 'modules/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />');

//easyui样式，放在bootstrap后边，避免被覆盖
document.write('<link href="' + bootPATH + 'modules/easyui/themes/default/easyui.css" rel="stylesheet" type="text/css" />');
document.write('<link href="' + bootPATH + 'modules/easyui/themes/icon.css" rel="stylesheet" type="text/css" />');
//<link rel="stylesheet" type="text/css" href="public/css/theme.css">
//<link rel="stylesheet" href="public/font-awesome/css/font-awesome.css">
//避免主题样式被覆盖
document.write('<link href="public/css/theme.css" rel="stylesheet" type="text/css" />');
document.write('<link href="public/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />');


