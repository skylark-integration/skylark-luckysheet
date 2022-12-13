define([
    './pivotTable',
    './freezen',
    './menuButton',
    './conditionformat',
    './alternateformat',
    './cellDatePickerCtrl',
    './dataVerificationCtrl',
    './protection',
    '../utils/util',
    '../global/validate',
    '../global/getdata',
    '../global/format',
    '../global/formula',
    '../global/cursorPos',
    '../global/cleargridelement',
    './inlineString',
    '../store',
    './server',
    '../global/method'
], function (
    pivotTable, 
    luckysheetFreezen, 
    menuButton, 
    conditionformat, 
    alternateformat, 
    cellDatePickerCtrl, 
    dataVerificationCtrl, 
    a, 
    b, 
    c, 
    d, 
    e, 
    formula, 
    f, 
    cleargridelement, 
    g, 
    Store, 
    server, 
    method
) {
    'use strict';
    function luckysheetupdateCell(row_index1, col_index1, d, cover, isnotfocus) {
        if (!a.checkProtectionLocked(row_index1, col_index1, Store.currentSheetIndex)) {
            $('#luckysheet-functionbox-cell').blur();
            return;
        }
        if (c.isEditMode() || Store.allowEdit === false) {
            return;
        }
        method.createHookFunction('cellEditBefore', Store.luckysheet_select_save);
        server.saveParam('mv', Store.currentSheetIndex, {
            op: 'enterEdit',
            range: Store.luckysheet_select_save
        });
        if (dataVerificationCtrl.dataVerification != null && dataVerificationCtrl.dataVerification[row_index1 + '_' + col_index1] != null) {
            let dataVerificationItem = dataVerificationCtrl.dataVerification[row_index1 + '_' + col_index1];
            if (dataVerificationItem.type == 'dropdown') {
                dataVerificationCtrl.dropdownListShow();
            } else if (dataVerificationItem.type == 'checkbox') {
                return;
            }
        }
        let size = getColumnAndRowSize(row_index1, col_index1, d);
        let row = size.row, row_pre = size.row_pre, col = size.col, col_pre = size.col_pre, row_index = size.row_index, col_index = size.col_index;
        if ($('#luckysheet-dropCell-icon').is(':visible')) {
            $('#luckysheet-dropCell-icon').remove();
        }
        let winH = $(window).height(), winW = $(window).width();
        let container_offset = $('#' + Store.container).offset();
        let scrollLeft = $('#luckysheet-cell-main').scrollLeft();
        let scrollTop = $('#luckysheet-cell-main').scrollTop();
        if (pivotTable.isPivotRange(row_index, col_index)) {
            return;
        }
        let left = col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2;
        if (luckysheetFreezen.freezenverticaldata != null && col_index1 <= luckysheetFreezen.freezenverticaldata[1]) {
            left = col_pre + container_offset.left + Store.rowHeaderWidth - 2;
        }
        let top = row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2;
        if (luckysheetFreezen.freezenhorizontaldata != null && row_index1 <= luckysheetFreezen.freezenhorizontaldata[1]) {
            top = row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - 2;
        }
        let input_postition = {
            'min-width': col - col_pre + 1 - 8,
            'min-height': row - row_pre + 1 - 4,
            'max-width': winW + scrollLeft - col_pre - 20 - Store.rowHeaderWidth,
            'max-height': winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight,
            'left': left,
            'top': top
        };
        let inputContentScale = {
            'transform': 'scale(' + Store.zoomRatio + ')',
            'transform-origin': 'left top',
            'width': 100 / Store.zoomRatio + '%',
            'height': 100 / Store.zoomRatio + '%'
        };
        Store.luckysheetCellUpdate = [
            row_index,
            col_index
        ];
        if (!isnotfocus) {
            $('#luckysheet-rich-text-editor').focus().select();
        }
        $('#luckysheet-input-box').removeAttr('style').css({
            'background-color': 'rgb(255, 255, 255)',
            'padding': '0px 2px',
            'font-size': '13px',
            'right': 'auto',
            'overflow-y': 'auto',
            'box-sizing': 'initial',
            'display': 'flex'
        });
        if (luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null) {
            $('#luckysheet-input-box').css('z-index', 10002);
        }
        $('#luckysheet-input-box-index').html(b.chatatABC(col_index) + (row_index + 1)).hide();
        $('#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm').addClass('luckysheet-wa-calculate-active');
        let value = '', isCenter = false;
        if (d[row_index] != null && d[row_index][col_index] != null) {
            let cell = d[row_index][col_index];
            let htValue = cell['ht'];
            let leftOrigin = 'left', topOrigin = 'top';
            if (htValue == '0') {
                input_postition = {
                    'min-width': col - col_pre + 1 - 8,
                    'min-height': row - row_pre + 1 - 4,
                    'max-width': winW * 2 / 3,
                    'max-height': winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight,
                    'left': col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2,
                    'top': row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2
                };
                if (Store.zoomRatio < 1) {
                    leftOrigin = 'center';
                }
                isCenter = true;
            } else if (htValue == '2') {
                input_postition = {
                    'min-width': col - col_pre + 1 - 8,
                    'min-height': row - row_pre + 1 - 4,
                    'max-width': col + container_offset.left - scrollLeft - 8,
                    'max-height': winH + scrollTop - row_pre - 20 - 15 - Store.toolbarHeight - Store.infobarHeight - Store.calculatebarHeight - Store.sheetBarHeight - Store.statisticBarHeight,
                    'right': winW - (container_offset.left + (Store.rowHeaderWidth - 1) - scrollLeft) - col,
                    'top': row_pre + container_offset.top + Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight - scrollTop - 2
                };
                if (Store.zoomRatio < 1) {
                    leftOrigin = 'right';
                }
            }
            if (cell['vt'] == '0') {
                topOrigin = 'center';
            } else if (cell['vt'] == '2') {
                topOrigin = 'bottom';
            }
            inputContentScale['transform-origin'] = leftOrigin + ' ' + topOrigin;
            if (!cover) {
                if (g.isInlineStringCell(cell)) {
                    value = d.getInlineStringStyle(row_index, col_index, d);
                } else if (cell.f != null) {
                    value = d.getcellvalue(row_index, col_index, d, 'f');
                } else {
                    value = e.valueShowEs(row_index, col_index, d);
                    if (cell.qp == '1') {
                        value = "'" + value;
                    }
                }
            }
            let style = menuButton.getStyleByCell(d, row_index, col_index);
            style = $('#luckysheet-input-box').get(0).style.cssText + style;
            $('#luckysheet-input-box').get(0).style.cssText = style;
            if ($('#luckysheet-input-box').get(0).style.backgroundColor == 'rgba(0, 0, 0, 0)') {
                $('#luckysheet-input-box').get(0).style.background = 'rgb(255,255,255)';
            }
        } else {
            let af_compute = alternateformat.getComputeMap();
            var checksAF = alternateformat.checksAF(row_index, col_index, af_compute);
            var cf_compute = conditionformat.getComputeMap();
            var checksCF = conditionformat.checksCF(row_index, col_index, cf_compute);
            if (checksCF != null && checksCF['cellColor'] != null) {
                $('#luckysheet-input-box').get(0).style.background = checksCF['cellColor'];
            } else if (checksAF != null) {
                $('#luckysheet-input-box').get(0).style.background = checksAF[1];
            }
        }
        if (input_postition['min-height'] > input_postition['max-height']) {
            input_postition['min-height'] = input_postition['max-height'];
        }
        if (input_postition['min-width'] > input_postition['max-width']) {
            input_postition['min-width'] = input_postition['max-width'];
        }
        if ((value == null || value.toString() == '') && !cover) {
            value = '<br/>';
        }
        if (!a.checkProtectionCellHidden(row_index, col_index, Store.currentSheetIndex) && value.length > 0 && value.substr(0, 63) == '<span dir="auto" class="luckysheet-formula-text-color">=</span>') {
            $('#luckysheet-rich-text-editor').html('');
        } else {
            $('#luckysheet-rich-text-editor').html(value);
            if (!isnotfocus) {
                f.luckysheetRangeLast($('#luckysheet-rich-text-editor')[0]);
            }
        }
        if (isCenter) {
            let width = $('#luckysheet-input-box').width();
            if (width > input_postition['max-width']) {
                width = input_postition['max-width'];
            }
            if (width < input_postition['min-width']) {
                width = input_postition['min-width'];
            }
            let newLeft = input_postition['left'] - width / 2 + (col - col_pre) / 2;
            if (newLeft < 2) {
                newLeft = 2;
            }
            input_postition['left'] = newLeft - 2;
        }
        $('#luckysheet-input-box').css(input_postition);
        $('#luckysheet-rich-text-editor').css(inputContentScale);
        if (d[row_index1][col_index1] && d[row_index1][col_index1].ct && d[row_index1][col_index1].ct.t == 'd') {
            cellDatePickerCtrl.cellFocus(row_index1, col_index1, d[row_index1][col_index1]);
        }
        formula.rangetosheet = Store.currentSheetIndex;
        formula.createRangeHightlight();
        formula.rangeResizeTo = $('#luckysheet-rich-text-editor');
        cleargridelement();
    }
    function setCenterInputPosition(row_index, col_index, d) {
        if (row_index == null || col_index == null) {
            return;
        }
        let cell = d[row_index][col_index];
        if (cell == null) {
            return;
        }
        let htValue = cell['ht'];
        if (cell != null && htValue != '0') {
            return;
        }
        let size = getColumnAndRowSize(row_index, col_index, d);
        let row = size.row, row_pre = size.row_pre, col = size.col, col_pre = size.col_pre;
        let winH = $(window).height(), winW = $(window).width();
        let container_offset = $('#' + Store.container).offset();
        let scrollLeft = $('#luckysheet-cell-main').scrollLeft();
        let scrollTop = $('#luckysheet-cell-main').scrollTop();
        let input_postition = {
            'min-width': col - col_pre + 1 - 8,
            'max-width': winW * 2 / 3,
            'left': col_pre + container_offset.left + Store.rowHeaderWidth - scrollLeft - 2
        };
        let width = $('#luckysheet-input-box').width();
        if (width > input_postition['max-width']) {
            width = input_postition['max-width'];
        }
        if (width < input_postition['min-width']) {
            width = input_postition['min-width'];
        }
        let newLeft = input_postition['left'] - width / 2 + (col - col_pre) / 2;
        if (newLeft < 2) {
            newLeft = 2;
        }
        input_postition['left'] = newLeft - 2;
        $('#luckysheet-input-box').css(input_postition);
    }
    function getColumnAndRowSize(row_index, col_index, d) {
        let row = Store.visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : Store.visibledatarow[row_index - 1];
        let col = Store.visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : Store.visibledatacolumn[col_index - 1];
        if (d == null) {
            d = Store.flowdata;
        }
        let margeset = menuButton.mergeborer(d, row_index, col_index);
        if (!!margeset) {
            row = margeset.row[1];
            row_pre = margeset.row[0];
            row_index = margeset.row[2];
            col = margeset.column[1];
            col_pre = margeset.column[0];
            col_index = margeset.column[2];
        }
        return {
            row: row,
            row_pre: row_pre,
            row_index: row_index,
            col: col,
            col_pre: col_pre,
            col_index: col_index
        };
    }
    return {
        luckysheetupdateCell: luckysheetupdateCell,
        setCenterInputPosition: setCenterInputPosition,
        getColumnAndRowSize: getColumnAndRowSize
    };
});