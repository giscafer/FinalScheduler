define(function(require,exports,module){
    /**
     * 弹窗信息
     * @param  {String} info    
     * @param  {String} title  
     * @param  {Number} timeout
     */
    exports.alert = function() {
        var message = arguments[0];
        var wait, title, callback;
        for(var i=1; i<arguments.length; i++){
            var type = typeof arguments[i]
            switch(type){
                case 'number':
                    wait = arguments[i];
                    break;
                case 'string':
                    title = arguments[i];
                    break;
                case 'function':
                    callback = arguments[i];
                    break;
            }
        }
        $.messager.show({
            title: (title || '提示'),
            msg: message,
            timeout: (wait || 1000),
            showType: 'fade',
            style: {
                right: '',
                bottom: ''
            }
        });
    };
});