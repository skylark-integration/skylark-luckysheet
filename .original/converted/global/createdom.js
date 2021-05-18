define([
    '../controllers/constant',
    '../controllers/luckysheetConfigsetting',
    '../controllers/postil',
    './getdata',
    './editor',
    './rhchInit',
    '../utils/util',
    '../store',
    '../locale/locale'
], function (a, luckysheetConfigsetting, luckysheetPostil, b, editor, rhchInit, c, Store, locale) {
    'use strict';
    return function luckysheetcreatedom(colwidth, rowheight, data, menu, title) {
        let gh = a.gridHTML();
        gh = c.replaceHtml(gh, { 'logotitle': title });
        gh = c.replaceHtml(gh, { 'menu': a.menuToolBar() });
        let flowHTML = a.flow;
        if (Store.config == null) {
            Store.config = {};
        }
        rhchInit(rowheight, colwidth);
        const _locale = locale();
        const locale_info = _locale.info;
        let addControll = '<button id="luckysheet-bottom-add-row" class="btn btn-default">' + locale_info.add + '</button><input id="luckysheet-bottom-add-row-input" type="text" class="luckysheet-datavisual-config-input luckysheet-mousedown-cancel" placeholder="100"><span style="font-size: 14px;">' + locale_info.row + '</span><span style="font-size: 14px;color: #9c9c9c;">(' + locale_info.addLast + ')</span>';
        let backControll = ' <button id="luckysheet-bottom-bottom-top" class="btn btn-default" style="">' + locale_info.backTop + '</button>';
        let pageInfo = c.replaceHtml(locale_info.pageInfo, {
            total: luckysheetConfigsetting.total ? luckysheetConfigsetting.total : '',
            totalPage: luckysheetConfigsetting.pageInfo.totalPage ? luckysheetConfigsetting.pageInfo.totalPage : '',
            currentPage: luckysheetConfigsetting.pageInfo.currentPage ? luckysheetConfigsetting.pageInfo.currentPage : ''
        });
        let pageControll = ' <span id="luckysheet-bottom-page-info" style="font-size: 14px;color: #f34141;">' + pageInfo + '</span> <button id="luckysheet-bottom-page-next" class="btn btn-danger" style="">下一页</button>';
        let pageControll2 = ' <span id="luckysheet-bottom-page-info" style="font-size: 14px;color: #f34141;">' + pageInfo + '</span>';
        let bottomControll = '';
        if (luckysheetConfigsetting.enableAddRow) {
            bottomControll += addControll;
        }
        if (luckysheetConfigsetting.enablePage) {
            if (parseInt(luckysheetConfigsetting.pageInfo.totalPage) == 1) {
                bottomControll += pageControll2;
            } else {
                bottomControll += pageControll;
            }
        }
        if (luckysheetConfigsetting.enableAddBackTop) {
            bottomControll += backControll;
        }
        let flowstr = c.replaceHtml('<div id="luckysheetcoltable_0" class="luckysheet-cell-flow-col"> <div id ="luckysheet-sheettable_0" class="luckysheet-cell-sheettable" style="height:${height}px;width:${width}px;"></div><div id="luckysheet-bottom-controll-row" class="luckysheet-bottom-controll-row"> ' + bottomControll + ' </div> </div>', {
            'height': Store.rh_height,
            'width': Store.ch_width - 1
        });
        let colsheader = c.replaceHtml(a.columnHeaderHTML, {
            'width': Store.ch_width,
            'index': 0,
            'column': ''
        });
        flowHTML = c.replaceHtml(flowHTML, {
            'width': Store.ch_width,
            'flow': flowstr,
            'index': 0
        });
        gh = c.replaceHtml(gh, {
            'flow': flowHTML,
            'rowHeader': "<div style='height:" + Store.rh_height + "px' id='luckysheetrowHeader_0' class='luckysheetsheetchange'></div>",
            'columnHeader': colsheader,
            'functionButton': luckysheetConfigsetting.functionButton
        });
        $('#' + Store.container).append(gh);
        $('#luckysheet-scrollbar-x div').width(Store.ch_width);
        $('#luckysheet-scrollbar-y div').height(Store.rh_height + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3);
        $('body').append(a.maskHTML);
        $('body').append(a.colsmenuHTML);
        $('body').append(a.rightclickHTML());
        $('body').append(a.inputHTML);
        $('body').append(c.replaceHtml(a.filtermenuHTML(), { 'menuid': 'filter' }));
        $('body').append(c.replaceHtml(a.filtersubmenuHTML(), { 'menuid': 'filter' }));
        $('body').append(a.sheetconfigHTML());
        $('#luckysheet-rows-h').width(Store.rowHeaderWidth - 1.5);
        $('#luckysheet-cols-h-c').height(Store.columnHeaderHeight - 1.5);
        $('#luckysheet-left-top').css({
            width: Store.rowHeaderWidth - 1.5,
            height: Store.columnHeaderHeight - 1.5
        });
        $('#luckysheet_info_detail_input').val(luckysheetConfigsetting.title);
    };
});