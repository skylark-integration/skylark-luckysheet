define([
    './menuButton',
    './updateCell',
    './constant',
    './sheetMove',
    './insertFormula',
    '../global/location',
    '../global/validate',
    '../global/formula',
    '../global/tooltip',
    '../locale/locale',
    '../store'
], function (menuButton, a, b, c, insertFormula, d, e, formula, tooltip, locale, Store) {
    'use strict';
    function formulaBarInitial() {
        const _locale = locale();
        const locale_formula = _locale.formula;
        $('#luckysheet-functionbox-cell').focus(function () {
            if (e.isEditMode()) {
                return;
            }
            if (Store.luckysheet_select_save.length > 0) {
                let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
                let row_index = last['row_focus'], col_index = last['column_focus'];
                a.luckysheetupdateCell(row_index, col_index, Store.flowdata, null, true);
                formula.rangeResizeTo = $('#luckysheet-functionbox-cell');
            }
        }).keydown(function (event) {
            if (e.isEditMode()) {
                return;
            }
            let ctrlKey = event.ctrlKey;
            let altKey = event.altKey;
            let shiftKey = event.shiftKey;
            let kcode = event.keyCode;
            let $inputbox = $('#luckysheet-input-box');
            if (kcode == b.keycode.ENTER && parseInt($inputbox.css('top')) > 0) {
                if ($('#luckysheet-formula-search-c').is(':visible') && formula.searchFunctionCell != null) {
                    formula.searchFunctionEnter($('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item-active'));
                } else {
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    Store.luckysheet_select_save = [{
                            'row': [
                                Store.luckysheetCellUpdate[0],
                                Store.luckysheetCellUpdate[0]
                            ],
                            'column': [
                                Store.luckysheetCellUpdate[1],
                                Store.luckysheetCellUpdate[1]
                            ],
                            'row_focus': Store.luckysheetCellUpdate[0],
                            'column_focus': Store.luckysheetCellUpdate[1]
                        }];
                    c.luckysheetMoveHighlightCell('down', 1, 'rangeOfSelect');
                    $('#luckysheet-rich-text-editor').focus();
                }
                event.preventDefault();
            } else if (kcode == b.keycode.ESC && parseInt($inputbox.css('top')) > 0) {
                formula.dontupdate();
                c.luckysheetMoveHighlightCell('down', 0, 'rangeOfSelect');
                $('#luckysheet-rich-text-editor').focus();
                event.preventDefault();
            } else if (kcode == b.keycode.F4 && parseInt($inputbox.css('top')) > 0) {
                formula.setfreezonFuc(event);
                event.preventDefault();
            } else if (kcode == b.keycode.UP && parseInt($inputbox.css('top')) > 0) {
                if ($('#luckysheet-formula-search-c').is(':visible')) {
                    let $up = $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item-active').prev();
                    if ($up.length == 0) {
                        $up = $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item').last();
                    }
                    $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item').removeClass('luckysheet-formula-search-item-active');
                    $up.addClass('luckysheet-formula-search-item-active');
                    event.preventDefault();
                }
            } else if (kcode == b.keycode.DOWN && parseInt($inputbox.css('top')) > 0) {
                if ($('#luckysheet-formula-search-c').is(':visible')) {
                    let $up = $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item-active').next();
                    if ($up.length == 0) {
                        $up = $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item').first();
                    }
                    $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item').removeClass('luckysheet-formula-search-item-active');
                    $up.addClass('luckysheet-formula-search-item-active');
                    event.preventDefault();
                }
            } else if (kcode == b.keycode.LEFT && parseInt($inputbox.css('top')) > 0) {
                formula.rangeHightlightselected($('#luckysheet-functionbox-cell'));
            } else if (kcode == b.keycode.RIGHT && parseInt($inputbox.css('top')) > 0) {
                formula.rangeHightlightselected($('#luckysheet-functionbox-cell'));
            } else if (!(kcode >= 112 && kcode <= 123 || kcode <= 46 || kcode == 144 || kcode == 108 || event.ctrlKey || event.altKey || event.shiftKey && (kcode == 37 || kcode == 38 || kcode == 39 || kcode == 40)) || kcode == 8 || kcode == 32 || kcode == 46 || event.ctrlKey && kcode == 86) {
                formula.functionInputHanddler($('#luckysheet-rich-text-editor'), $('#luckysheet-functionbox-cell'), kcode);
            }
        }).click(function () {
            if (e.isEditMode()) {
                return;
            }
            formula.rangeHightlightselected($('#luckysheet-functionbox-cell'));
        });
        $('#luckysheet-wa-functionbox-cancel').click(function () {
            if (!$(this).hasClass('luckysheet-wa-calculate-active')) {
                return;
            }
            if ($('#luckysheet-search-formula-parm').is(':visible')) {
                $('#luckysheet-search-formula-parm').hide();
            }
            if ($('#luckysheet-search-formula-parm-select').is(':visible')) {
                $('#luckysheet-search-formula-parm-select').hide();
            }
            formula.dontupdate();
            c.luckysheetMoveHighlightCell('down', 0, 'rangeOfSelect');
        });
        $('#luckysheet-wa-functionbox-confirm').click(function () {
            if (!$(this).hasClass('luckysheet-wa-calculate-active')) {
                return;
            }
            if ($('#luckysheet-search-formula-parm').is(':visible')) {
                $('#luckysheet-search-formula-parm').hide();
            }
            if ($('#luckysheet-search-formula-parm-select').is(':visible')) {
                $('#luckysheet-search-formula-parm-select').hide();
            }
            formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
            c.luckysheetMoveHighlightCell('down', 0, 'rangeOfSelect');
        });
        $('#luckysheet-wa-functionbox-fx').click(function () {
            if (Store.luckysheet_select_save.length == 0) {
                if (e.isEditMode()) {
                    alert(locale_formula.tipSelectCell);
                } else {
                    tooltip.info(locale_formula.tipSelectCell, '');
                }
                return;
            }
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let row_index = last['row_focus'], col_index = last['column_focus'];
            a.luckysheetupdateCell(row_index, col_index, Store.flowdata);
            let cell = Store.flowdata[row_index][col_index];
            if (cell != null && cell.f != null) {
                let functionStr = formula.getfunctionParam(cell.f);
                if (functionStr.fn != null) {
                    insertFormula.formulaParmDialog(functionStr.fn, functionStr.param);
                } else {
                    insertFormula.formulaListDialog();
                }
            } else {
                $('#luckysheet-rich-text-editor').html('<span dir="auto" class="luckysheet-formula-text-color">=</span>');
                $('#luckysheet-functionbox-cell').html($('#luckysheet-rich-text-editor').html());
                insertFormula.formulaListDialog();
            }
            insertFormula.init();
        });
        $('#luckysheet-formula-functionrange').on('mousedown', '.luckysheet-copy', function (event) {
            formula.rangeMove = true;
            Store.luckysheet_scroll_status = true;
            formula.rangeMoveObj = $(this).parent();
            formula.rangeMoveIndex = $(this).parent().attr('rangeindex');
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $('#luckysheet-cell-main').scrollLeft();
            let y = mouse[1] + $('#luckysheet-cell-main').scrollTop();
            $('#luckysheet-formula-functionrange-highlight-' + formula.rangeMoveIndex).find('.luckysheet-selection-copy-hc').css('opacity', 0.13);
            let type = $(this).data('type');
            if (type == 'top') {
                y += 3;
            } else if (type == 'right') {
                x -= 3;
            } else if (type == 'bottom') {
                y -= 3;
            } else if (type == 'left') {
                x += 3;
            }
            let row_index = d.rowLocation(y)[2];
            let col_index = d.colLocation(x)[2];
            formula.rangeMovexy = [
                row_index,
                col_index
            ];
            $('#luckysheet-sheettable').css('cursor', 'move');
            event.stopPropagation();
        });
        $('#luckysheet-formula-functionrange').on('mousedown', '.luckysheet-highlight', function (event) {
            formula.rangeResize = $(this).data('type');
            formula.rangeResizeIndex = $(this).parent().attr('rangeindex');
            let mouse = d.mouseposition(event.pageX, event.pageY), scrollLeft = $('#luckysheet-cell-main').scrollLeft(), scrollTop = $('#luckysheet-cell-main').scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;
            formula.rangeResizeObj = $(this).parent();
            $('#luckysheet-formula-functionrange-highlight-' + formula.rangeResizeIndex).find('.luckysheet-selection-copy-hc').css('opacity', 0.13);
            if (formula.rangeResize == 'lt') {
                x += 3;
                y += 3;
            } else if (formula.rangeResize == 'lb') {
                x += 3;
                y -= 3;
            } else if (formula.rangeResize == 'rt') {
                x -= 3;
                y += 3;
            } else if (formula.rangeResize == 'rb') {
                x -= 3;
                y -= 3;
            }
            let row_location = d.rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            let col_location = d.colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            let position = formula.rangeResizeObj.position();
            formula.rangeResizexy = [
                col_pre,
                row_pre,
                formula.rangeResizeObj.width(),
                formula.rangeResizeObj.height(),
                position.left + scrollLeft,
                position.top + scrollTop,
                col,
                row
            ];
            formula.rangeResizeWinH = $('#luckysheet-cell-main')[0].scrollHeight;
            formula.rangeResizeWinW = $('#luckysheet-cell-main')[0].scrollWidth;
            Store.luckysheet_scroll_status = true;
            event.stopPropagation();
        });
    }
    return { formulaBarInitial: formulaBarInitial };
});