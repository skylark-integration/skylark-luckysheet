define(function () {
    'use strict';
    return {
        container: 'luckysheet',
        column: 60,
        row: 84,
        allowCopy: true,
        showtoolbar: true,
        showinfobar: true,
        showsheetbar: true,
        showstatisticBar: true,
        pointEdit: false,
        pointEditUpdate: null,
        pointEditZoom: 1,
        data: [
            {
                'name': 'Sheet1',
                color: '',
                'status': '1',
                'order': '0',
                'data': [],
                'config': {},
                'index': 0
            },
            {
                'name': 'Sheet2',
                color: '',
                'status': '0',
                'order': '1',
                'data': [],
                'config': {},
                'index': 1
            },
            {
                'name': 'Sheet3',
                color: '',
                'status': '0',
                'order': '2',
                'data': [],
                'config': {},
                'index': 2
            }
        ],
        title: 'Luckysheet Demo',
        userInfo: false,
        userMenuItem: [
            {
                url: 'www.baidu.com',
                'icon': '<i class="fa fa-folder" aria-hidden="true"></i>',
                'name': '我的表格'
            },
            {
                url: 'www.baidu.com',
                'icon': '<i class="fa fa-sign-out" aria-hidden="true"></i>',
                'name': '退出登陆'
            }
        ],
        myFolderUrl: 'www.baidu.com',
        config: {},
        fullscreenmode: true,
        devicePixelRatio: window.devicePixelRatio,
        allowEdit: true,
        loadUrl: '',
        loadSheetUrl: '',
        gridKey: '',
        updateUrl: '',
        updateImageUrl: '',
        allowUpdate: false,
        functionButton: '',
        showConfigWindowResize: true,
        enableAddRow: true,
        enableAddBackTop: true,
        autoFormatw: false,
        accuracy: undefined,
        pageInfo: {
            'queryExps': '',
            'reportId': '',
            'fields': '',
            'mobile': '',
            'frezon': '',
            'currentPage': '',
            'totalPage': 10,
            'pageUrl': ''
        },
        editMode: false,
        beforeCreateDom: null,
        fireMousedown: null,
        lang: 'en',
        plugins: [],
        forceCalculation: false,
        rowHeaderWidth: 46,
        columnHeaderHeight: 20,
        defaultColWidth: 73,
        defaultRowHeight: 19,
        defaultFontSize: 10,
        limitSheetNameLength: true,
        defaultSheetNameMaxLength: 31,
        sheetFormulaBar: true,
        showtoolbarConfig: {},
        showsheetbarConfig: {},
        showstatisticBarConfig: {},
        cellRightClickConfig: {},
        sheetRightClickConfig: {}
    };
});