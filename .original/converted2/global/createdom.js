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
], function (
    m_constant, 
    luckysheetConfigsetting, 
    luckysheetPostil, 
    m_getdata, 
    editor, 
    rhchInit, 
    m_util, 
    Store, 
    locale
) {
    'use strict';
    return function luckysheetcreatedom(colwidth, rowheight, data, menu, title) {
        let gh = m_constant.gridHTML();
        gh = m_util.replaceHtml(gh, { 'logotitle': title });
        gh = m_util.replaceHtml(gh, { 'menu': m_constant.menuToolBar() });
        let flowHTML = m_constant.flow;
        if (Store.config == null) {
            Store.config = {};
        }
        rhchInit(rowheight, colwidth);
        const _locale = locale();
        const locale_info = _locale.info;
        let addControll = '<button id="luckysheet-bottom-add-row" class="btn btn-default">' + locale_info.add + '</button><input id="luckysheet-bottom-add-row-input" type="text" class="luckysheet-datavisual-config-input luckysheet-mousedown-cancel" placeholder="100"><span style="font-size: 14px;">' + locale_info.row + '</span><span style="font-size: 14px;color: #9c9c9c;">(' + locale_info.addLast + ')</span>';
        let backControll = ' <button id="luckysheet-bottom-bottom-top" class="btn btn-default" style="">' + locale_info.backTop + '</button>';
        let pageInfo = m_util.replaceHtml(locale_info.pageInfo, {
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
        let flowstr = m_util.replaceHtml('<div id="luckysheetcoltable_0" class="luckysheet-cell-flow-col"> <div id ="luckysheet-sheettable_0" class="luckysheet-cell-sheettable" style="height:${height}px;width:${width}px;"></div><div id="luckysheet-bottom-controll-row" class="luckysheet-bottom-controll-row"> ' + bottomControll + ' </div> </div>', {
            'height': Store.rh_height,
            'width': Store.ch_width - 1
        });
        let colsheader = m_util.replaceHtml(m_constant.columnHeaderHTML, {
            'width': Store.ch_width,
            'index': 0,
            'column': ''
        });
        flowHTML = m_util.replaceHtml(flowHTML, {
            'width': Store.ch_width,
            'flow': flowstr,
            'index': 0
        });
        gh = m_util.replaceHtml(gh, {
            'flow': flowHTML,
            'rowHeader': "<div style='height:" + Store.rh_height + "px' id='luckysheetrowHeader_0' class='luckysheetsheetchange'></div>",
            'columnHeader': colsheader,
            'functionButton': luckysheetConfigsetting.functionButton
        });
        $('#' + Store.container).append(gh);
        $('#luckysheet-scrollbar-x div').width(Store.ch_width);
        $('#luckysheet-scrollbar-y div').height(Store.rh_height + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3);
        $('body').append(m_constant.maskHTML);
        $('body').append(m_constant.colsmenuHTML);
        $('body').append(m_constant.rightclickHTML());
        $('body').append(m_constant.inputHTML);
        $('body').append(m_util.replaceHtml(m_constant.filtermenuHTML(), { 'menuid': 'filter' }));
        $('body').append(m_util.replaceHtml(m_constant.filtersubmenuHTML(), { 'menuid': 'filter' }));
        $('body').append(m_constant.sheetconfigHTML());
        $('#luckysheet-rows-h').width(Store.rowHeaderWidth - 1.5);
        $('#luckysheet-cols-h-c').height(Store.columnHeaderHeight - 1.5);
        $('#luckysheet-left-top').css({
            width: Store.rowHeaderWidth - 1.5,
            height: Store.columnHeaderHeight - 1.5
        });
        $('#luckysheet_info_detail_input').val(luckysheetConfigsetting.title);
    };
});