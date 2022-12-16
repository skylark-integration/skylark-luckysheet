define(function () {
    'use strict';
    const luckysheetConfigsetting = {
        autoFormatw: false,
        accuracy: undefined,
        total: 0,
        allowCopy: true,
        showtoolbar: true,
        showinfobar: true,
        showsheetbar: true,
        showstatisticBar: true,
        pointEdit: false,
        pointEditUpdate: null,
        pointEditZoom: 1,
        userInfo: false,
        userMenuItem: [],
        myFolderUrl: null,
        functionButton: null,
        showConfigWindowResize: true,
        enableAddRow: true,
        enableAddBackTop: true,
        enablePage: true,
        pageInfo: null,
        editMode: false,
        beforeCreateDom: null,
        workbookCreateBefore: null,
        workbookCreateAfter: null,
        fireMousedown: null,
        plugins: [],
        forceCalculation: false,
        //强制刷新公式，公式较多会有性能问题，慎用
        defaultColWidth: 73,
        defaultRowHeight: 19,
        defaultTextColor: '#000',
        defaultCellColor: '#fff',

        ///from ../global/validate
        //是否为非编辑模式
        isEditMode : function() {
            if (luckysheetConfigsetting.editMode) {
                return true;
            } else {
                return false;
            }
        } ,

        ///from widgets/method
        createHookFunction: function () {
            let hookName = arguments[0];
            if (luckysheetConfigsetting.hook && luckysheetConfigsetting.hook[hookName] != null && typeof luckysheetConfigsetting.hook[hookName] == 'function') {
                var args = Array.prototype.slice.apply(arguments);
                args.shift();
                let ret = luckysheetConfigsetting.hook[hookName].apply(this, args);
                if (ret === false) {
                    return false;
                } else {
                    return true;
                }
            }
            return true;
        }
    };
    return luckysheetConfigsetting;
});