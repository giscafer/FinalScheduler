/**
 * 人员信息逻辑处理js
 */
define(function(require, exports, module) {
    var config = require('js/config');
    var editIndex = undefined;

    var endEditing = function() {
            if (editIndex == undefined) {
                return true
            }
            if ($('#persondg').datagrid('validateRow', editIndex)) {
                var ed = $('#persondg').datagrid('getEditor', {
                    index: editIndex,
                    field: 'pid'
                });
                // var productname = $(ed.target).combobox('getText');
                // $('#persondg').datagrid('getRows')[editIndex]['productname'] = productname;
                $('#persondg').datagrid('endEdit', editIndex);
                editIndex = undefined;
                return true;
            } else {
                return false;
            }
        }
        /**
         * 编辑
         */
    exports.editRow = function(index) {
            if (editIndex != index) {
                if (endEditing()) {
                    $('#persondg').datagrid('selectRow', index)
                        .datagrid('beginEdit', index);
                    editIndex = index;
                } else {
                    $('#persondg').datagrid('selectRow', editIndex);
                }
            }
        }
        /**
         * 新增
         */
    var append = function() {
            if (endEditing()) {
                $('#persondg').datagrid('appendRow', {
                    name: '新人员'
                });
                editIndex = $('#persondg').datagrid('getRows').length - 1;
                $('#persondg').datagrid('selectRow', editIndex)
                    .datagrid('beginEdit', editIndex);
            }
        }
        /**
         * 保存修改（编辑和新增）
         */
    var accept = function() {
            var $dg=$('#persondg');
            if (endEditing()) {
                var inserted = $dg.datagrid('getChanges', "inserted");
                // var deleted = $dg.datagrid('getChanges', "deleted");
                var updated = $dg.datagrid('getChanges', "updated");
                var effectRow = new Object();
                if (inserted.length) {
                    effectRow["inserted"] = JSON.stringify(inserted);
                }
                // if (deleted.length) {
                //     effectRow["deleted"] = JSON.stringify(deleted);
                // }
                if (updated.length) {
                    effectRow["updated"] = JSON.stringify(updated);
                }
                var url = config.options.hostUrl + "commitPerson";
                $.post(url, effectRow, function(res) {
                    if (res) {
                        $("#example").datagrid('acceptChanges');
                    }
                }, "JSON");
            }
        }
        /**
         * 工具条
         * @type {Array}
         */
    exports.toolbar = [{
        text: '新增',
        iconCls: 'icon-add',
        handler: function() {
            append();
        }
    }, {
        text: '删除',
        iconCls: 'icon-cut',
        handler: function() {
            var pdg = $("#persondg");
            var rows = pdg.datagrid('getSelections');
            if (!rows.length) {
                return;
            } else {
                var url = config.options.hostUrl + "delPerson";
                for (var i = 0; i < rows.length; i++) {
                    var id = rows[i].pid;
                    url += "/" + id;
                };
                $.messager.confirm('删除提醒', '是否确定删除该人员信息?', function(ok) {
                    if (ok) {
                        $.get(url, function(data) {
                            pdg.datagrid('reload');
                            $.messager.show({
                                title: '提示',
                                msg: '删除成功！',
                                timeout: 1000,
                                showType: 'fade',
                                style: {
                                    right: '',
                                    bottom: ''
                                }
                            });
                        });
                    }
                });

            }
        }
    }, '-', {
        text: '保存',
        iconCls: 'icon-save',
        handler: function() {
            accept();
        }
    }];

});
