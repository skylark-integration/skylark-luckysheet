define([
    './luckysheetConfigsetting',
    './zoom',
    './sheetmanage',
    './server',
    '../global/location',
    '../store'
], function (luckysheetConfigsetting, a, sheetmanage, server, b, Store) {
    'use strict';
    let ExcelPlaceholder = {
        '[tabName]': '&A',
        '[CurrentDate]': '&D',
        '[fileName]': '&F',
        '[background]': '&G',
        '[Shadow]': '&H',
        '[TotalPages]': '&N',
        '[pageNumber]': '&P',
        '[CurrentTime]': '&T',
        '[filePath]': '&Z'
    };
    function getOneMmsPx() {
        let div = document.createElement('div');
        div.style.width = '1mm';
        document.querySelector('body').appendChild(div);
        let mm1 = div.getBoundingClientRect();
        let w = mm1.width;
        $(div).remove();
        return mm1.width;
    }
    function viewChange(curType, preType) {
        let currentSheet = sheetmanage.getSheetByIndex();
        if (currentSheet.config == null) {
            currentSheet.config = {};
        }
        if (currentSheet.config.sheetViewZoom == null) {
            currentSheet.config.sheetViewZoom = {};
        }
        let defaultZoom = 1, type = 'zoomScaleNormal';
        printLineAndNumberDelete(currentSheet);
        if (curType == 'viewNormal') {
            type = 'viewNormalZoomScale';
        } else if (curType == 'viewLayout') {
            type = 'viewLayoutZoomScale';
        } else if (curType == 'viewPage') {
            type = 'viewPageZoomScale';
            defaultZoom = 0.6;
            printLineAndNumberCreate(currentSheet);
        }
        let curZoom = currentSheet.config.sheetViewZoom[type];
        if (curZoom == null) {
            curZoom = defaultZoom;
        }
        currentSheet.config.curentsheetView = curType;
        if (Store.clearjfundo) {
            Store.jfredo.push({
                'type': 'viewChange',
                'curType': curType,
                'preType': preType,
                'sheetIndex': Store.currentSheetIndex
            });
        }
        server.saveParam('cg', Store.currentSheetIndex, curType, { 'k': 'curentsheetView' });
        Store.currentSheetView = curType;
        a.zoomChange(curZoom);
    }
    function printLineAndNumberDelete(sheet) {
    }
    function printLineAndNumberCreate(sheet) {
    }
    function switchViewBtn($t) {
        let $viewList = $t.parent(), preType = $viewList.find('luckysheet-print-viewBtn-active').attr('type');
        if ($t.attr('type') == preType) {
            return;
        }
        let curType = $t.attr('type');
        if (curType != null) {
            viewChange(curType, preType);
        } else {
            return;
        }
        $t.parent().find('.luckysheet-print-viewBtn').removeClass('luckysheet-print-viewBtn-active');
        $t.addClass('luckysheet-print-viewBtn-active');
    }
    function printInitial() {
        let container = luckysheetConfigsetting.container;
        let _this = this;
        $('#' + container).find('.luckysheet-print-viewBtn').click(function () {
            switchViewBtn($(this));
        });
    }
    return {
        viewChange: viewChange,
        printInitial: printInitial
    };
});