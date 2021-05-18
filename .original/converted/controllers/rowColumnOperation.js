define([
    './pivotTable',
    './postil',
    './imageCtrl',
    './menuButton',
    './server',
    './select',
    '../utils/util',
    '../methods/get',
    '../global/location',
    '../global/validate',
    '../global/count',
    '../global/formula',
    '../global/extend',
    '../global/refresh',
    '../global/getdata',
    '../global/tooltip',
    '../global/editor',
    '../locale/locale',
    '../global/getRowlen',
    '../controllers/sheetSearch',
    './inlineString',
    './protection',
    '../store',
    './luckysheetConfigsetting'
], function (pivotTable, luckysheetPostil, imageCtrl, menuButton, server, a, b, c, d, e, f, formula, g, h, i, tooltip, editor, locale, j, k, l, m, Store, luckysheetConfigsetting) {
    'use strict';
    function rowColumnOperationInitial() {
        $('#luckysheet-rows-h').mousedown(function (event) {
            if (!m.checkProtectionAllSelected(Store.currentSheetIndex)) {
                return;
            }
            luckysheetPostil.removeActivePs();
            if ($('#luckysheet-modal-dialog-activeImage').is(':visible') || $('#luckysheet-modal-dialog-cropping').is(':visible')) {
                imageCtrl.cancelActiveImgItem();
            }
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let y = mouse[1] + $('#luckysheet-rows-h').scrollTop();
            let row_location = d.rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            let col_index = Store.visibledatacolumn.length - 1, col = Store.visibledatacolumn[col_index], col_pre = 0;
            $('#luckysheet-rightclick-menu').hide();
            $('#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu').hide();
            if (event.which == '3') {
                let isright = false;
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let obj_s = Store.luckysheet_select_save[s];
                    if (obj_s['row'] != null && (row_index >= obj_s['row'][0] && row_index <= obj_s['row'][1]) && (obj_s['column'][0] == 0 && obj_s['column'][1] == Store.flowdata[0].length - 1)) {
                        isright = true;
                        break;
                    }
                }
                if (isright) {
                    return;
                }
            }
            let top = row_pre, height = row - row_pre - 1;
            let rowseleted = [
                row_index,
                row_index
            ];
            Store.luckysheet_scroll_status = true;
            let $input = $('#luckysheet-input-box');
            if (parseInt($input.css('top')) > 0) {
                if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton() || $('#luckysheet-ifFormulaGenerator-multiRange-dialog').is(':visible')) {
                    let changeparam = menuButton.mergeMoveMain([
                        0,
                        col_index
                    ], rowseleted, {
                        'row_focus': row_index,
                        'column_focus': 0
                    }, top, height, col_pre, col);
                    if (changeparam != null) {
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                    }
                    if (event.shiftKey) {
                        let last = formula.func_selectedrange;
                        let top = 0, height = 0, rowseleted = [];
                        if (last.top > row_pre) {
                            top = row_pre;
                            height = last.top + last.height - row_pre;
                            if (last.row[1] > last.row_focus) {
                                last.row[1] = last.row_focus;
                            }
                            rowseleted = [
                                row_index,
                                last.row[1]
                            ];
                        } else if (last.top == row_pre) {
                            top = row_pre;
                            height = last.top + last.height - row_pre;
                            rowseleted = [
                                row_index,
                                last.row[0]
                            ];
                        } else {
                            top = last.top;
                            height = row - last.top - 1;
                            if (last.row[0] < last.row_focus) {
                                last.row[0] = last.row_focus;
                            }
                            rowseleted = [
                                last.row[0],
                                row_index
                            ];
                        }
                        let changeparam = menuButton.mergeMoveMain([
                            0,
                            col_index
                        ], rowseleted, {
                            'row_focus': row_index,
                            'column_focus': 0
                        }, top, height, col_pre, col);
                        if (changeparam != null) {
                            rowseleted = changeparam[1];
                            top = changeparam[2];
                            height = changeparam[3];
                        }
                        last['row'] = rowseleted;
                        last['top_move'] = top;
                        last['height_move'] = height;
                        formula.func_selectedrange = last;
                    } else if (event.ctrlKey && $('#luckysheet-rich-text-editor').find('span').last().text() != ',') {
                        let vText = $('#luckysheet-rich-text-editor').text() + ',';
                        if (vText.length > 0 && vText.substr(0, 1) == '=') {
                            vText = formula.functionHTMLGenerate(vText);
                            if (window.getSelection) {
                                let currSelection = window.getSelection();
                                formula.functionRangeIndex = [
                                    $(currSelection.anchorNode).parent().index(),
                                    currSelection.anchorOffset
                                ];
                            } else {
                                let textRange = document.selection.createRange();
                                formula.functionRangeIndex = textRange;
                            }
                            $('#luckysheet-rich-text-editor').html(vText);
                            formula.canceFunctionrangeSelected();
                            formula.createRangeHightlight();
                        }
                        formula.rangestart = false;
                        formula.rangedrag_column_start = false;
                        formula.rangedrag_row_start = false;
                        $('#luckysheet-functionbox-cell').html(vText);
                        formula.rangeHightlightselected($('#luckysheet-rich-text-editor'));
                        formula.israngeseleciton();
                        formula.func_selectedrange = {
                            'left': d.colLocationByIndex(0)[0],
                            'width': d.colLocationByIndex(0)[1] - d.colLocationByIndex(0)[0] - 1,
                            'top': top,
                            'height': height,
                            'left_move': col_pre,
                            'width_move': col - col_pre - 1,
                            'top_move': top,
                            'height_move': height,
                            'row': rowseleted,
                            'column': [
                                0,
                                col_index
                            ],
                            'row_focus': row_index,
                            'column_focus': 0
                        };
                    } else {
                        formula.func_selectedrange = {
                            'left': d.colLocationByIndex(0)[0],
                            'width': d.colLocationByIndex(0)[1] - d.colLocationByIndex(0)[0] - 1,
                            'top': top,
                            'height': height,
                            'left_move': col_pre,
                            'width_move': col - col_pre - 1,
                            'top_move': top,
                            'height_move': height,
                            'row': rowseleted,
                            'column': [
                                0,
                                col_index
                            ],
                            'row_focus': row_index,
                            'column_focus': 0
                        };
                    }
                    if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton()) {
                        formula.rangeSetValue({
                            'row': rowseleted,
                            'column': [
                                null,
                                null
                            ]
                        });
                    } else if ($('#luckysheet-ifFormulaGenerator-multiRange-dialog').is(':visible')) {
                        let range = c.getRangetxt(Store.currentSheetIndex, {
                            'row': rowseleted,
                            'column': [
                                0,
                                col_index
                            ]
                        }, Store.currentSheetIndex);
                        $('#luckysheet-ifFormulaGenerator-multiRange-dialog input').val(range);
                    }
                    formula.rangedrag_row_start = true;
                    formula.rangestart = false;
                    formula.rangedrag_column_start = false;
                    $('#luckysheet-formula-functionrange-select').css({
                        'left': col_pre,
                        'width': col - col_pre - 1,
                        'top': top,
                        'height': height
                    }).show();
                    $('#luckysheet-formula-help-c').hide();
                    a.luckysheet_count_show(col_pre, top, col - col_pre - 1, height, rowseleted, [
                        0,
                        col_index
                    ]);
                    setTimeout(function () {
                        let currSelection = window.getSelection();
                        let anchorOffset = currSelection.anchorNode;
                        let $editor;
                        if ($('#luckysheet-search-formula-parm').is(':visible') || $('#luckysheet-search-formula-parm-select').is(':visible')) {
                            $editor = $('#luckysheet-rich-text-editor');
                            formula.rangechangeindex = formula.data_parm_index;
                        } else {
                            $editor = $(anchorOffset).closest('div');
                        }
                        let $span = $editor.find("span[rangeindex='" + formula.rangechangeindex + "']");
                        formula.setCaretPosition($span.get(0), 0, $span.html().length);
                    }, 1);
                    return;
                } else {
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    Store.luckysheet_rows_selected_status = true;
                }
            } else {
                Store.luckysheet_rows_selected_status = true;
            }
            if (Store.luckysheet_rows_selected_status) {
                if (event.shiftKey) {
                    let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);
                    let top = 0, height = 0, rowseleted = [];
                    if (last.top > row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        if (last.row[1] > last.row_focus) {
                            last.row[1] = last.row_focus;
                        }
                        rowseleted = [
                            row_index,
                            last.row[1]
                        ];
                    } else if (last.top == row_pre) {
                        top = row_pre;
                        height = last.top + last.height - row_pre;
                        rowseleted = [
                            row_index,
                            last.row[0]
                        ];
                    } else {
                        top = last.top;
                        height = row - last.top - 1;
                        if (last.row[0] < last.row_focus) {
                            last.row[0] = last.row_focus;
                        }
                        rowseleted = [
                            last.row[0],
                            row_index
                        ];
                    }
                    last['row'] = rowseleted;
                    last['top_move'] = top;
                    last['height_move'] = height;
                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;
                } else if (event.ctrlKey) {
                    Store.luckysheet_select_save.push({
                        'left': d.colLocationByIndex(0)[0],
                        'width': d.colLocationByIndex(0)[1] - d.colLocationByIndex(0)[0] - 1,
                        'top': top,
                        'height': height,
                        'left_move': col_pre,
                        'width_move': col - col_pre - 1,
                        'top_move': top,
                        'height_move': height,
                        'row': rowseleted,
                        'column': [
                            0,
                            col_index
                        ],
                        'row_focus': row_index,
                        'column_focus': 0,
                        'row_select': true
                    });
                } else {
                    Store.luckysheet_select_save.length = 0;
                    Store.luckysheet_select_save.push({
                        'left': d.colLocationByIndex(0)[0],
                        'width': d.colLocationByIndex(0)[1] - d.colLocationByIndex(0)[0] - 1,
                        'top': top,
                        'height': height,
                        'left_move': col_pre,
                        'width_move': col - col_pre - 1,
                        'top_move': top,
                        'height_move': height,
                        'row': rowseleted,
                        'column': [
                            0,
                            col_index
                        ],
                        'row_focus': row_index,
                        'column_focus': 0,
                        'row_select': true
                    });
                }
                a.selectHightlightShow();
                server.saveParam('mv', Store.currentSheetIndex, Store.luckysheet_select_save);
            }
            a.selectHelpboxFill();
            setTimeout(function () {
                clearTimeout(Store.countfuncTimeout);
                f.countfunc();
            }, 101);
        }).mousemove(function (event) {
            if (Store.luckysheet_rows_selected_status || Store.luckysheet_rows_change_size || Store.luckysheet_select_status) {
                $('#luckysheet-rows-h-hover').hide();
                return;
            }
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let y = mouse[1] + $('#luckysheet-rows-h').scrollTop();
            let row_location = d.rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            $('#luckysheet-rows-h-hover').css({
                'top': row_pre,
                'height': row - row_pre - 1,
                'display': 'block'
            });
            if (y < row - 1 && y >= row - 5) {
                $('#luckysheet-rows-change-size').css({
                    'top': row - 3,
                    'opacity': 0
                });
            } else {
                $('#luckysheet-rows-change-size').css('opacity', 0);
            }
        }).mouseleave(function (event) {
            $('#luckysheet-rows-h-hover').hide();
            $('#luckysheet-rows-change-size').css('opacity', 0);
        }).mouseup(function (event) {
            if (event.which == 3) {
                if (e.isEditMode()) {
                    return;
                }
                $('#luckysheet-cols-rows-shift').hide();
                Store.luckysheetRightHeadClickIs = 'row';
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word').text(locale().rightclick.row);
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size').text(locale().rightclick.height);
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left').text(locale().rightclick.top);
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right').text(locale().rightclick.bottom);
                $('#luckysheet-cols-rows-add').show();
                $('#luckysheet-cols-rows-data').show();
                $('#luckysheet-cols-rows-shift').hide();
                $('#luckysheet-cols-rows-handleincell').hide();
                b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'block';
                b.$$('#luckysheet-cols-rows-data .luckysheet-menuseparator').style.display = 'block';
                const cellRightClickConfig = luckysheetConfigsetting.cellRightClickConfig;
                if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste && !cellRightClickConfig.insertRow && !cellRightClickConfig.deleteRow && !cellRightClickConfig.hideRow && !cellRightClickConfig.rowHeight && !cellRightClickConfig.clear && !cellRightClickConfig.matrix && !cellRightClickConfig.sort && !cellRightClickConfig.filter && !cellRightClickConfig.chart && !cellRightClickConfig.image && !cellRightClickConfig.link && !cellRightClickConfig.data && !cellRightClickConfig.cellFormat) {
                    return;
                }
                b.$$('#luckysheet-top-left-add-selected').style.display = cellRightClickConfig.insertRow ? 'block' : 'none';
                b.$$('#luckysheet-bottom-right-add-selected').style.display = cellRightClickConfig.insertRow ? 'block' : 'none';
                b.$$('#luckysheet-del-selected').style.display = cellRightClickConfig.deleteRow ? 'block' : 'none';
                b.$$('#luckysheet-hide-selected').style.display = cellRightClickConfig.hideRow ? 'block' : 'none';
                b.$$('#luckysheet-show-selected').style.display = cellRightClickConfig.hideRow ? 'block' : 'none';
                b.$$('#luckysheet-column-row-width-selected').style.display = cellRightClickConfig.rowHeight ? 'block' : 'none';
                if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste) {
                    b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'none';
                    if (!cellRightClickConfig.insertRow && !cellRightClickConfig.deleteRow && !cellRightClickConfig.hideRow && !cellRightClickConfig.rowHeight) {
                        b.$$('#luckysheet-cols-rows-data .luckysheet-menuseparator').style.display = 'none';
                    }
                }
                if (!cellRightClickConfig.insertRow && !cellRightClickConfig.deleteRow && !cellRightClickConfig.hideRow && !cellRightClickConfig.rowHeight) {
                    b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'none';
                }
                if (!cellRightClickConfig.clear && !cellRightClickConfig.matrix && !cellRightClickConfig.sort && !cellRightClickConfig.filter && !cellRightClickConfig.chart && !cellRightClickConfig.image && !cellRightClickConfig.link && !cellRightClickConfig.data && !cellRightClickConfig.cellFormat) {
                    b.$$('#luckysheet-cols-rows-data .luckysheet-menuseparator').style.display = 'none';
                }
                b.showrightclickmenu($('#luckysheet-rightclick-menu'), $(this).offset().left + 46, event.pageY);
                Store.luckysheet_cols_menu_status = true;
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['rowlen'] == null) {
                    cfg['rowlen'] = {};
                }
                let first_rowlen = cfg['rowlen'][Store.luckysheet_select_save[0].row[0]] == null ? Store.defaultrowlen : cfg['rowlen'][Store.luckysheet_select_save[0].row[0]];
                let isSame = true;
                for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
                    let s = Store.luckysheet_select_save[i];
                    let r1 = s.row[0], r2 = s.row[1];
                    for (let r = r1; r <= r2; r++) {
                        let rowlen = cfg['rowlen'][r] == null ? Store.defaultrowlen : cfg['rowlen'][r];
                        if (rowlen != first_rowlen) {
                            isSame = false;
                            break;
                        }
                    }
                }
                if (isSame) {
                    $('#luckysheet-cols-rows-add').find("input[type='number'].rcsize").val(first_rowlen);
                } else {
                    $('#luckysheet-cols-rows-add').find("input[type='number'].rcsize").val('');
                }
            }
        });
        $('#luckysheet-cols-h-c').mousedown(function (event) {
            if (!m.checkProtectionAllSelected(Store.currentSheetIndex)) {
                return;
            }
            luckysheetPostil.removeActivePs();
            if ($('#luckysheet-modal-dialog-activeImage').is(':visible') || $('#luckysheet-modal-dialog-cropping').is(':visible')) {
                imageCtrl.cancelActiveImgItem();
            }
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $(this).scrollLeft();
            let row_index = Store.visibledatarow.length - 1, row = Store.visibledatarow[row_index], row_pre = 0;
            let col_location = d.colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            Store.orderbyindex = col_index;
            $('#luckysheet-rightclick-menu').hide();
            $('#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu').hide();
            $('#luckysheet-filter-menu, #luckysheet-filter-submenu').hide();
            if (event.which == '3') {
                let isright = false;
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let obj_s = Store.luckysheet_select_save[s];
                    if (obj_s['column'] != null && (col_index >= obj_s['column'][0] && col_index <= obj_s['column'][1]) && (obj_s['row'][0] == 0 && obj_s['row'][1] == Store.flowdata.length - 1)) {
                        isright = true;
                        break;
                    }
                }
                if (isright) {
                    return;
                }
            }
            let left = col_pre, width = col - col_pre - 1;
            let columnseleted = [
                col_index,
                col_index
            ];
            Store.luckysheet_scroll_status = true;
            let $input = $('#luckysheet-input-box');
            if (parseInt($input.css('top')) > 0) {
                if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton() || $('#luckysheet-ifFormulaGenerator-multiRange-dialog').is(':visible')) {
                    let changeparam = menuButton.mergeMoveMain(columnseleted, [
                        0,
                        row_index
                    ], {
                        'row_focus': 0,
                        'column_focus': col_index
                    }, row_pre, row, left, width);
                    if (changeparam != null) {
                        columnseleted = changeparam[0];
                        left = changeparam[4];
                        width = changeparam[5];
                    }
                    if (event.shiftKey) {
                        let last = formula.func_selectedrange;
                        let left = 0, width = 0, columnseleted = [];
                        if (last.left > col_pre) {
                            left = col_pre;
                            width = last.left + last.width - col_pre;
                            if (last.column[1] > last.column_focus) {
                                last.column[1] = last.column_focus;
                            }
                            columnseleted = [
                                col_index,
                                last.column[1]
                            ];
                        } else if (last.left == col_pre) {
                            left = col_pre;
                            width = last.left + last.width - col_pre;
                            columnseleted = [
                                col_index,
                                last.column[0]
                            ];
                        } else {
                            left = last.left;
                            width = col - last.left - 1;
                            if (last.column[0] < last.column_focus) {
                                last.column[0] = last.column_focus;
                            }
                            columnseleted = [
                                last.column[0],
                                col_index
                            ];
                        }
                        let changeparam = menuButton.mergeMoveMain(columnseleted, [
                            0,
                            row_index
                        ], {
                            'row_focus': 0,
                            'column_focus': col_index
                        }, row_pre, row, left, width);
                        if (changeparam != null) {
                            columnseleted = changeparam[0];
                            left = changeparam[4];
                            width = changeparam[5];
                        }
                        last['column'] = columnseleted;
                        last['left_move'] = left;
                        last['width_move'] = width;
                        formula.func_selectedrange = last;
                    } else if (event.ctrlKey && $('#luckysheet-rich-text-editor').find('span').last().text() != ',') {
                        let vText = $('#luckysheet-rich-text-editor').text() + ',';
                        if (vText.length > 0 && vText.substr(0, 1) == '=') {
                            vText = formula.functionHTMLGenerate(vText);
                            if (window.getSelection) {
                                let currSelection = window.getSelection();
                                formula.functionRangeIndex = [
                                    $(currSelection.anchorNode).parent().index(),
                                    currSelection.anchorOffset
                                ];
                            } else {
                                let textRange = document.selection.createRange();
                                formula.functionRangeIndex = textRange;
                            }
                            $('#luckysheet-rich-text-editor').html(vText);
                            formula.canceFunctionrangeSelected();
                            formula.createRangeHightlight();
                        }
                        formula.rangestart = false;
                        formula.rangedrag_column_start = false;
                        formula.rangedrag_row_start = false;
                        $('#luckysheet-functionbox-cell').html(vText);
                        formula.rangeHightlightselected($('#luckysheet-rich-text-editor'));
                        formula.israngeseleciton();
                        formula.func_selectedrange = {
                            'left': left,
                            'width': width,
                            'top': d.rowLocationByIndex(0)[0],
                            'height': d.rowLocationByIndex(0)[1] - d.rowLocationByIndex(0)[0] - 1,
                            'left_move': left,
                            'width_move': width,
                            'top_move': row_pre,
                            'height_move': row - row_pre - 1,
                            'row': [
                                0,
                                row_index
                            ],
                            'column': columnseleted,
                            'row_focus': 0,
                            'column_focus': col_index
                        };
                    } else {
                        formula.func_selectedrange = {
                            'left': left,
                            'width': width,
                            'top': d.rowLocationByIndex(0)[0],
                            'height': d.rowLocationByIndex(0)[1] - d.rowLocationByIndex(0)[0] - 1,
                            'left_move': left,
                            'width_move': width,
                            'top_move': row_pre,
                            'height_move': row - row_pre - 1,
                            'row': [
                                0,
                                row_index
                            ],
                            'column': columnseleted,
                            'row_focus': 0,
                            'column_focus': col_index
                        };
                    }
                    if (formula.rangestart || formula.rangedrag_column_start || formula.rangedrag_row_start || formula.israngeseleciton()) {
                        formula.rangeSetValue({
                            'row': [
                                null,
                                null
                            ],
                            'column': columnseleted
                        });
                    } else if ($('#luckysheet-ifFormulaGenerator-multiRange-dialog').is(':visible')) {
                        let range = c.getRangetxt(Store.currentSheetIndex, {
                            'row': [
                                0,
                                row_index
                            ],
                            'column': columnseleted
                        }, Store.currentSheetIndex);
                        $('#luckysheet-ifFormulaGenerator-multiRange-dialog input').val(range);
                    }
                    formula.rangedrag_column_start = true;
                    formula.rangestart = false;
                    formula.rangedrag_row_start = false;
                    $('#luckysheet-formula-functionrange-select').css({
                        'left': left,
                        'width': width,
                        'top': row_pre,
                        'height': row - row_pre - 1
                    }).show();
                    $('#luckysheet-formula-help-c').hide();
                    a.luckysheet_count_show(left, row_pre, width, row - row_pre - 1, [
                        0,
                        row_index
                    ], columnseleted);
                    return;
                } else {
                    formula.updatecell(Store.luckysheetCellUpdate[0], Store.luckysheetCellUpdate[1]);
                    Store.luckysheet_cols_selected_status = true;
                }
            } else {
                Store.luckysheet_cols_selected_status = true;
            }
            if (Store.luckysheet_cols_selected_status) {
                if (event.shiftKey) {
                    let last = $.extend(true, {}, Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1]);
                    let left = 0, width = 0, columnseleted = [];
                    if (last.left > col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        if (last.column[1] > last.column_focus) {
                            last.column[1] = last.column_focus;
                        }
                        columnseleted = [
                            col_index,
                            last.column[1]
                        ];
                    } else if (last.left == col_pre) {
                        left = col_pre;
                        width = last.left + last.width - col_pre;
                        columnseleted = [
                            col_index,
                            last.column[0]
                        ];
                    } else {
                        left = last.left;
                        width = col - last.left - 1;
                        if (last.column[0] < last.column_focus) {
                            last.column[0] = last.column_focus;
                        }
                        columnseleted = [
                            last.column[0],
                            col_index
                        ];
                    }
                    last['column'] = columnseleted;
                    last['left_move'] = left;
                    last['width_move'] = width;
                    Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1] = last;
                } else if (event.ctrlKey) {
                    Store.luckysheet_select_save.push({
                        'left': left,
                        'width': width,
                        'top': d.rowLocationByIndex(0)[0],
                        'height': d.rowLocationByIndex(0)[1] - d.rowLocationByIndex(0)[0] - 1,
                        'left_move': left,
                        'width_move': width,
                        'top_move': row_pre,
                        'height_move': row - row_pre - 1,
                        'row': [
                            0,
                            row_index
                        ],
                        'column': columnseleted,
                        'row_focus': 0,
                        'column_focus': col_index,
                        'column_select': true
                    });
                } else {
                    Store.luckysheet_select_save.length = 0;
                    Store.luckysheet_select_save.push({
                        'left': left,
                        'width': width,
                        'top': d.rowLocationByIndex(0)[0],
                        'height': d.rowLocationByIndex(0)[1] - d.rowLocationByIndex(0)[0] - 1,
                        'left_move': left,
                        'width_move': width,
                        'top_move': row_pre,
                        'height_move': row - row_pre - 1,
                        'row': [
                            0,
                            row_index
                        ],
                        'column': columnseleted,
                        'row_focus': 0,
                        'column_focus': col_index,
                        'column_select': true
                    });
                }
                a.selectHightlightShow();
                server.saveParam('mv', Store.currentSheetIndex, Store.luckysheet_select_save);
            }
            a.selectHelpboxFill();
            setTimeout(function () {
                clearTimeout(Store.countfuncTimeout);
                f.countfunc();
            }, 101);
            if (Store.luckysheet_cols_menu_status) {
                $('#luckysheet-rightclick-menu').hide();
                $('#luckysheet-cols-h-hover').hide();
                $('#luckysheet-cols-menu-btn').hide();
                Store.luckysheet_cols_menu_status = false;
            }
            event.stopPropagation();
        }).mousemove(function (event) {
            if (Store.luckysheet_cols_selected_status || Store.luckysheet_select_status) {
                $('#luckysheet-cols-h-hover').hide();
                $('#luckysheet-cols-menu-btn').hide();
                return;
            }
            if (Store.luckysheet_cols_menu_status || Store.luckysheet_cols_change_size) {
                return;
            }
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $('#luckysheet-cols-h-c').scrollLeft();
            let col_location = d.colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            $('#luckysheet-cols-h-hover').css({
                'left': col_pre,
                'width': col - col_pre - 1,
                'display': 'block'
            });
            $('#luckysheet-cols-menu-btn').css({
                'left': col - 19,
                'display': 'block'
            });
            $('#luckysheet-cols-change-size').css({ 'left': col - 5 });
            if (x < col && x >= col - 5) {
                $('#luckysheet-cols-change-size').css({ 'opacity': 0 });
                $('#luckysheet-cols-menu-btn').hide();
            } else {
                $('#luckysheet-change-size-line').hide();
                $('#luckysheet-cols-change-size').css('opacity', 0);
            }
        }).mouseleave(function (event) {
            if (Store.luckysheet_cols_menu_status || Store.luckysheet_cols_change_size) {
                return;
            }
            $('#luckysheet-cols-h-hover').hide();
            $('#luckysheet-cols-menu-btn').hide();
            $('#luckysheet-cols-change-size').css('opacity', 0);
        }).mouseup(function (event) {
            if (event.which == 3) {
                if (e.isEditMode()) {
                    return;
                }
                Store.luckysheetRightHeadClickIs = 'column';
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word').text(locale().rightclick.column);
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-size').text(locale().rightclick.width);
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left').text(locale().rightclick.left);
                $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right').text(locale().rightclick.right);
                $('#luckysheet-cols-rows-add').show();
                $('#luckysheet-cols-rows-data').show();
                $('#luckysheet-cols-rows-shift').hide();
                $('#luckysheet-cols-rows-handleincell').hide();
                b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'block';
                b.$$('#luckysheet-cols-rows-data .luckysheet-menuseparator').style.display = 'block';
                const cellRightClickConfig = luckysheetConfigsetting.cellRightClickConfig;
                if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste && !cellRightClickConfig.insertColumn && !cellRightClickConfig.deleteColumn && !cellRightClickConfig.hideColumn && !cellRightClickConfig.columnWidth && !cellRightClickConfig.clear && !cellRightClickConfig.matrix && !cellRightClickConfig.sort && !cellRightClickConfig.filter && !cellRightClickConfig.chart && !cellRightClickConfig.image && !cellRightClickConfig.link && !cellRightClickConfig.data && !cellRightClickConfig.cellFormat) {
                    return;
                }
                b.$$('#luckysheet-top-left-add-selected').style.display = cellRightClickConfig.insertColumn ? 'block' : 'none';
                b.$$('#luckysheet-bottom-right-add-selected').style.display = cellRightClickConfig.insertColumn ? 'block' : 'none';
                b.$$('#luckysheet-del-selected').style.display = cellRightClickConfig.deleteColumn ? 'block' : 'none';
                b.$$('#luckysheet-hide-selected').style.display = cellRightClickConfig.hideColumn ? 'block' : 'none';
                b.$$('#luckysheet-show-selected').style.display = cellRightClickConfig.hideColumn ? 'block' : 'none';
                b.$$('#luckysheet-column-row-width-selected').style.display = cellRightClickConfig.columnWidth ? 'block' : 'none';
                if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste) {
                    b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'none';
                    if (!cellRightClickConfig.insertColumn && !cellRightClickConfig.deleteColumn && !cellRightClickConfig.hideColumn && !cellRightClickConfig.columnWidth) {
                        b.$$('#luckysheet-cols-rows-data .luckysheet-menuseparator').style.display = 'none';
                    }
                }
                if (!cellRightClickConfig.insertColumn && !cellRightClickConfig.deleteColumn && !cellRightClickConfig.hideColumn && !cellRightClickConfig.columnWidth) {
                    b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'none';
                }
                if (!cellRightClickConfig.clear && !cellRightClickConfig.matrix && !cellRightClickConfig.sort && !cellRightClickConfig.filter && !cellRightClickConfig.chart && !cellRightClickConfig.image && !cellRightClickConfig.link && !cellRightClickConfig.data && !cellRightClickConfig.cellFormat) {
                    b.$$('#luckysheet-cols-rows-data .luckysheet-menuseparator').style.display = 'none';
                }
                b.showrightclickmenu($('#luckysheet-rightclick-menu'), event.pageX, $(this).offset().top + 18);
                Store.luckysheet_cols_menu_status = true;
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['columnlen'] == null) {
                    cfg['columnlen'] = {};
                }
                let first_collen = cfg['columnlen'][Store.luckysheet_select_save[0].column[0]] == null ? Store.defaultcollen : cfg['columnlen'][Store.luckysheet_select_save[0].column[0]];
                let isSame = true;
                for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
                    let s = Store.luckysheet_select_save[i];
                    let c1 = s.column[0], c2 = s.column[1];
                    for (let c = c1; c <= c2; c++) {
                        let collen = cfg['columnlen'][c] == null ? Store.defaultcollen : cfg['columnlen'][c];
                        if (collen != first_collen) {
                            isSame = false;
                            break;
                        }
                    }
                }
                if (isSame) {
                    $('#luckysheet-cols-rows-add').find("input[type='number'].rcsize").val(first_collen);
                } else {
                    $('#luckysheet-cols-rows-add').find("input[type='number'].rcsize").val('');
                }
            }
        });
        $('#luckysheet-rows-change-size').mousedown(function (event) {
            luckysheetPostil.removeActivePs();
            if ($('#luckysheet-modal-dialog-activeImage').is(':visible') || $('#luckysheet-modal-dialog-cropping').is(':visible')) {
                imageCtrl.cancelActiveImgItem();
            }
            $('#luckysheet-input-box').hide();
            $('#luckysheet-rows-change-size').css({ 'opacity': 1 });
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let y = mouse[1] + $('#luckysheet-rows-h').scrollTop();
            let scrollLeft = $('#luckysheet-cell-main').scrollLeft();
            let winW = $('#luckysheet-cell-main').width();
            let row_location = d.rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            Store.luckysheet_rows_change_size = true;
            Store.luckysheet_scroll_status = true;
            $('#luckysheet-change-size-line').css({
                'height': '1px',
                'border-width': '0 0px 1px 0',
                'top': row - 3,
                'left': 0,
                'width': scrollLeft + winW,
                'display': 'block',
                'cursor': 'ns-resize'
            });
            $('#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas').css('cursor', 'ns-resize');
            Store.luckysheet_rows_change_size_start = [
                row_pre,
                row_index
            ];
            $('#luckysheet-rightclick-menu').hide();
            $('#luckysheet-rows-h-hover').hide();
            $('#luckysheet-cols-menu-btn').hide();
            event.stopPropagation();
        });
        $('#luckysheet-cols-change-size').mousedown(function (event) {
            luckysheetPostil.removeActivePs();
            if ($('#luckysheet-modal-dialog-activeImage').is(':visible') || $('#luckysheet-modal-dialog-cropping').is(':visible')) {
                imageCtrl.cancelActiveImgItem();
            }
            $('#luckysheet-input-box').hide();
            $('#luckysheet-cols-change-size').css({ 'opacity': 1 });
            let mouse = d.mouseposition(event.pageX, event.pageY);
            let scrollLeft = $('#luckysheet-cols-h-c').scrollLeft();
            let scrollTop = $('#luckysheet-cell-main').scrollTop();
            let winH = $('#luckysheet-cell-main').height();
            let x = mouse[0] + scrollLeft;
            let row_index = Store.visibledatarow.length - 1, row = Store.visibledatarow[row_index], row_pre = 0;
            let col_location = d.colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            Store.luckysheet_cols_change_size = true;
            Store.luckysheet_scroll_status = true;
            $('#luckysheet-change-size-line').css({
                'height': winH + scrollTop,
                'border-width': '0 1px 0 0',
                'top': 0,
                'left': col - 3,
                'width': '1px',
                'display': 'block',
                'cursor': 'ew-resize'
            });
            $('#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas').css('cursor', 'ew-resize');
            Store.luckysheet_cols_change_size_start = [
                col_pre,
                col_index
            ];
            $('#luckysheet-rightclick-menu').hide();
            $('#luckysheet-cols-h-hover').hide();
            $('#luckysheet-cols-menu-btn').hide();
            Store.luckysheet_cols_dbclick_times = 0;
            event.stopPropagation();
        }).dblclick(function () {
            luckysheetcolsdbclick();
        });
        $('#luckysheet-cols-menu-btn').click(function (event) {
            let $menu = $('#luckysheet-rightclick-menu');
            let offset = $(this).offset();
            $('#luckysheet-cols-rows-shift').show();
            Store.luckysheetRightHeadClickIs = 'column';
            $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-word').text(locale().rightclick.column);
            $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-left').text(locale().rightclick.left);
            $('#luckysheet-rightclick-menu .luckysheet-cols-rows-shift-right').text(locale().rightclick.right);
            $('#luckysheet-cols-rows-add').show();
            $('#luckysheet-cols-rows-data').hide();
            $('#luckysheet-cols-rows-shift').show();
            $('#luckysheet-cols-rows-handleincell').hide();
            b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'block';
            b.$$('#luckysheet-cols-rows-shift .luckysheet-menuseparator').style.display = 'block';
            const cellRightClickConfig = luckysheetConfigsetting.cellRightClickConfig;
            if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste && !cellRightClickConfig.insertColumn && !cellRightClickConfig.deleteColumn && !cellRightClickConfig.hideColumn && !cellRightClickConfig.columnWidth && !cellRightClickConfig.sort) {
                return;
            }
            b.$$('#luckysheet-top-left-add-selected').style.display = cellRightClickConfig.insertColumn ? 'block' : 'none';
            b.$$('#luckysheet-bottom-right-add-selected').style.display = cellRightClickConfig.insertColumn ? 'block' : 'none';
            b.$$('#luckysheet-del-selected').style.display = cellRightClickConfig.deleteColumn ? 'block' : 'none';
            b.$$('#luckysheet-hide-selected').style.display = cellRightClickConfig.hideColumn ? 'block' : 'none';
            b.$$('#luckysheet-show-selected').style.display = cellRightClickConfig.hideColumn ? 'block' : 'none';
            b.$$('#luckysheet-column-row-width-selected').style.display = cellRightClickConfig.columnWidth ? 'block' : 'none';
            if (!cellRightClickConfig.copy && !cellRightClickConfig.copyAs && !cellRightClickConfig.paste) {
                b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'none';
                if (!cellRightClickConfig.insertColumn && !cellRightClickConfig.deleteColumn && !cellRightClickConfig.hideColumn && !cellRightClickConfig.columnWidth) {
                    b.$$('#luckysheet-cols-rows-shift .luckysheet-menuseparator').style.display = 'none';
                }
            }
            if (!cellRightClickConfig.insertColumn && !cellRightClickConfig.deleteColumn && !cellRightClickConfig.hideColumn && !cellRightClickConfig.columnWidth) {
                b.$$('#luckysheet-cols-rows-add .luckysheet-menuseparator').style.display = 'none';
            }
            if (!cellRightClickConfig.sort) {
                b.$$('#luckysheet-cols-rows-shift .luckysheet-menuseparator').style.display = 'none';
            }
            b.showrightclickmenu($menu, offset.left, offset.top + 18);
            Store.luckysheet_cols_menu_status = true;
        });
        $('#luckysheet-top-left-add-selected').click(function (event) {
            if (event.target.nodeName === 'INPUT') {
                return;
            }
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const _locale = locale();
            const locale_drag = _locale.drag;
            const locale_info = _locale.info;
            if (Store.luckysheet_select_save.length > 1) {
                if (e.isEditMode()) {
                    alert(locale_drag.noMulti);
                } else {
                    tooltip.info(locale_drag.noMulti, '');
                }
                return;
            }
            let $t = $(this), value = $t.find('input').val();
            if (!e.isRealNum(value)) {
                if (e.isEditMode()) {
                    alert(locale_info.tipInputNumber);
                } else {
                    tooltip.info(locale_info.tipInputNumber, '');
                }
                return;
            }
            value = parseInt(value);
            if (value < 1 || value > 100) {
                if (e.isEditMode()) {
                    alert(locale_info.tipInputNumberLimit);
                } else {
                    tooltip.info(locale_info.tipInputNumberLimit, '');
                }
                return;
            }
            let st_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][0];
            g.luckysheetextendtable(Store.luckysheetRightHeadClickIs, st_index, value, 'lefttop');
        });
        $('#luckysheetColsRowsHandleAdd_row').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            if (Store.allowEdit === false) {
                return;
            }
            let st_index = Store.luckysheet_select_save[0].row[0];
            g.luckysheetextendtable('row', st_index, 1, 'lefttop');
        });
        $('#luckysheetColsRowsHandleAdd_column').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            if (Store.allowEdit === false) {
                return;
            }
            let st_index = Store.luckysheet_select_save[0].column[0];
            g.luckysheetextendtable('column', st_index, 1, 'lefttop');
        });
        $('#luckysheet-bottom-right-add-selected').click(function (event) {
            if (event.target.nodeName === 'INPUT') {
                return;
            }
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const _locale = locale();
            const locale_drag = _locale.drag;
            const locale_info = _locale.info;
            if (Store.luckysheet_select_save.length > 1) {
                if (e.isEditMode()) {
                    alert(locale_drag.noMulti);
                } else {
                    tooltip.info(locale_drag.noMulti, '');
                }
                return;
            }
            let $t = $(this), value = $t.find('input').val();
            if (!e.isRealNum(value)) {
                if (e.isEditMode()) {
                    alert(locale_info.tipInputNumber);
                } else {
                    tooltip.info(locale_info.tipInputNumber, '');
                }
                return;
            }
            value = parseInt(value);
            if (value < 1 || value > 100) {
                if (e.isEditMode()) {
                    alert(locale_info.tipInputNumberLimit);
                } else {
                    tooltip.info(locale_info.tipInputNumberLimit, '');
                }
                return;
            }
            let st_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][1];
            g.luckysheetextendtable(Store.luckysheetRightHeadClickIs, st_index, value, 'rightbottom');
        });
        $('#luckysheet-del-selected, #luckysheet-del-selected_t').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (Store.luckysheetRightHeadClickIs == 'row') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                } else if (Store.luckysheetRightHeadClickIs == 'column') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                }
                return;
            }
            let st_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][0], ed_index = Store.luckysheet_select_save[0][Store.luckysheetRightHeadClickIs][1];
            g.luckysheetdeletetable(Store.luckysheetRightHeadClickIs, st_index, ed_index);
        });
        $('#luckysheet-delRows').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (Store.luckysheetRightHeadClickIs == 'row') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                } else if (Store.luckysheetRightHeadClickIs == 'column') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                }
                return;
            }
            let st_index = Store.luckysheet_select_save[0].row[0], ed_index = Store.luckysheet_select_save[0].row[1];
            g.luckysheetdeletetable('row', st_index, ed_index);
        });
        $('#luckysheet-delCols').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (Store.luckysheetRightHeadClickIs == 'row') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                } else if (Store.luckysheetRightHeadClickIs == 'column') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                }
                return;
            }
            let st_index = Store.luckysheet_select_save[0].column[0], ed_index = Store.luckysheet_select_save[0].column[1];
            g.luckysheetdeletetable('column', st_index, ed_index);
        });
        $('#luckysheet-hide-selected').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (Store.luckysheetRightHeadClickIs == 'row') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                } else if (Store.luckysheetRightHeadClickIs == 'column') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                }
                return;
            }
            if (Store.luckysheetRightHeadClickIs == 'row') {
                if (!m.checkProtectionAuthorityNormal(Store.currentSheetIndex, 'formatRows')) {
                    return;
                }
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['rowhidden'] == null) {
                    cfg['rowhidden'] = {};
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let r1 = Store.luckysheet_select_save[s].row[0], r2 = Store.luckysheet_select_save[s].row[1];
                    for (let r = r1; r <= r2; r++) {
                        cfg['rowhidden'][r] = 0;
                    }
                }
                if (Store.clearjfundo) {
                    let redo = {};
                    redo['type'] = 'showHidRows';
                    redo['sheetIndex'] = Store.currentSheetIndex;
                    redo['config'] = $.extend(true, {}, Store.config);
                    redo['curconfig'] = cfg;
                    Store.jfundo.length = 0;
                    Store.jfredo.push(redo);
                }
                Store.config = cfg;
                Store.luckysheetfile[c.getSheetIndex(Store.currentSheetIndex)].config = Store.config;
                server.saveParam('cg', Store.currentSheetIndex, cfg['rowhidden'], { 'k': 'rowhidden' });
                h.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
            } else if (Store.luckysheetRightHeadClickIs == 'column') {
                if (!m.checkProtectionAuthorityNormal(Store.currentSheetIndex, 'formatColumns')) {
                    return;
                }
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['colhidden'] == null) {
                    cfg['colhidden'] = {};
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let c1 = Store.luckysheet_select_save[s].column[0], c2 = Store.luckysheet_select_save[s].column[1];
                    for (let c = c1; c <= c2; c++) {
                        cfg['colhidden'][c] = 0;
                    }
                }
                if (Store.clearjfundo) {
                    let redo = {};
                    redo['type'] = 'showHidCols';
                    redo['sheetIndex'] = Store.currentSheetIndex;
                    redo['config'] = $.extend(true, {}, Store.config);
                    redo['curconfig'] = cfg;
                    Store.jfundo.length = 0;
                    Store.jfredo.push(redo);
                }
                Store.config = cfg;
                Store.luckysheetfile[c.getSheetIndex(Store.currentSheetIndex)].config = Store.config;
                server.saveParam('cg', Store.currentSheetIndex, cfg['colhidden'], { 'k': 'colhidden' });
                h.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
            }
        });
        $('#luckysheet-show-selected').click(function (event) {
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (Store.luckysheetRightHeadClickIs == 'row') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                } else if (Store.luckysheetRightHeadClickIs == 'column') {
                    if (e.isEditMode()) {
                        alert(locale_drag.noMulti);
                    } else {
                        tooltip.info(locale_drag.noMulti, '');
                    }
                }
                return;
            }
            if (Store.luckysheetRightHeadClickIs == 'row') {
                if (!m.checkProtectionAuthorityNormal(Store.currentSheetIndex, 'formatRows')) {
                    return;
                }
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['rowhidden'] == null) {
                    return;
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let r1 = Store.luckysheet_select_save[s].row[0], r2 = Store.luckysheet_select_save[s].row[1];
                    for (let r = r1; r <= r2; r++) {
                        delete cfg['rowhidden'][r];
                    }
                }
                if (Store.clearjfundo) {
                    let redo = {};
                    redo['type'] = 'showHidRows';
                    redo['sheetIndex'] = Store.currentSheetIndex;
                    redo['config'] = $.extend(true, {}, Store.config);
                    redo['curconfig'] = cfg;
                    Store.jfundo.length = 0;
                    Store.jfredo.push(redo);
                }
                Store.config = cfg;
                Store.luckysheetfile[c.getSheetIndex(Store.currentSheetIndex)].config = Store.config;
                server.saveParam('cg', Store.currentSheetIndex, cfg['rowhidden'], { 'k': 'rowhidden' });
                h.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
            } else if (Store.luckysheetRightHeadClickIs == 'column') {
                if (!m.checkProtectionAuthorityNormal(Store.currentSheetIndex, 'formatColumns')) {
                    return;
                }
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['colhidden'] == null) {
                    return;
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let c1 = Store.luckysheet_select_save[s].column[0], c2 = Store.luckysheet_select_save[s].column[1];
                    for (let c = c1; c <= c2; c++) {
                        delete cfg['colhidden'][c];
                    }
                }
                if (Store.clearjfundo) {
                    let redo = {};
                    redo['type'] = 'showHidCols';
                    redo['sheetIndex'] = Store.currentSheetIndex;
                    redo['config'] = $.extend(true, {}, Store.config);
                    redo['curconfig'] = cfg;
                    Store.jfundo.length = 0;
                    Store.jfredo.push(redo);
                }
                Store.config = cfg;
                Store.luckysheetfile[c.getSheetIndex(Store.currentSheetIndex)].config = Store.config;
                server.saveParam('cg', Store.currentSheetIndex, cfg['colhidden'], { 'k': 'colhidden' });
                h.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
            }
        });
        $('#luckysheet-delCellsMoveLeft').click(function (event) {
            $('body .luckysheet-cols-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (e.isEditMode()) {
                    alert(locale_drag.noMulti);
                } else {
                    tooltip.info(locale_drag.noMulti, '');
                }
                return;
            }
            let str = Store.luckysheet_select_save[0].row[0], edr = Store.luckysheet_select_save[0].row[1], stc = Store.luckysheet_select_save[0].column[0], edc = Store.luckysheet_select_save[0].column[1];
            g.luckysheetDeleteCell('moveLeft', str, edr, stc, edc);
        });
        $('#luckysheet-delCellsMoveUp').click(function (event) {
            $('body .luckysheet-cols-menu').hide();
            b.luckysheetContainerFocus();
            const locale_drag = locale().drag;
            if (Store.luckysheet_select_save.length > 1) {
                if (e.isEditMode()) {
                    alert(locale_drag.noMulti);
                } else {
                    tooltip.info(locale_drag.noMulti, '');
                }
                return;
            }
            let str = Store.luckysheet_select_save[0].row[0], edr = Store.luckysheet_select_save[0].row[1], stc = Store.luckysheet_select_save[0].column[0], edc = Store.luckysheet_select_save[0].column[1];
            g.luckysheetDeleteCell('moveUp', str, edr, stc, edc);
        });
        $('#luckysheet-delete-text').click(function () {
            if (!m.checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            if (Store.allowEdit === false) {
                return;
            }
            if (Store.luckysheet_select_save.length > 0) {
                let d = editor.deepCopyFlowData(Store.flowdata);
                let has_PartMC = false;
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let r1 = Store.luckysheet_select_save[s].row[0], r2 = Store.luckysheet_select_save[s].row[1];
                    let c1 = Store.luckysheet_select_save[s].column[0], c2 = Store.luckysheet_select_save[s].column[1];
                    if (e.hasPartMC(Store.config, r1, r2, c1, c2)) {
                        has_PartMC = true;
                        break;
                    }
                }
                if (has_PartMC) {
                    const locale_drag = locale().drag;
                    if (e.isEditMode()) {
                        alert(locale_drag.noPartMerge);
                    } else {
                        tooltip.info(locale_drag.noPartMerge, '');
                    }
                    return;
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let r1 = Store.luckysheet_select_save[s].row[0], r2 = Store.luckysheet_select_save[s].row[1];
                    let c1 = Store.luckysheet_select_save[s].column[0], c2 = Store.luckysheet_select_save[s].column[1];
                    for (let r = r1; r <= r2; r++) {
                        for (let c = c1; c <= c2; c++) {
                            if (pivotTable.isPivotRange(r, c)) {
                                continue;
                            }
                            if (b.getObjType(d[r][c]) == 'object') {
                                delete d[r][c]['m'];
                                delete d[r][c]['v'];
                                if (d[r][c]['f'] != null) {
                                    delete d[r][c]['f'];
                                    formula.delFunctionGroup(r, c, Store.currentSheetIndex);
                                    delete d[r][c]['spl'];
                                }
                                if (d[r][c]['ct'] != null && d[r][c]['ct'].t == 'inlineStr') {
                                    delete d[r][c]['ct'];
                                }
                            } else {
                                d[r][c] = null;
                            }
                        }
                    }
                }
                h.jfrefreshgrid(d, Store.luckysheet_select_save);
            }
        });
        $('#luckysheet-column-row-width-selected').click(function (event) {
            if (event.target.nodeName === 'INPUT') {
                return;
            }
            $('#luckysheet-rightclick-menu').hide();
            b.luckysheetContainerFocus();
            let size = parseInt($(this).closest('.luckysheet-cols-menuitem').find("input[type='number']").val().trim());
            const locale_info = locale().info;
            let cfg = $.extend(true, {}, Store.config);
            let type;
            let images = null;
            if (Store.luckysheetRightHeadClickIs == 'row') {
                if (!m.checkProtectionAuthorityNormal(Store.currentSheetIndex, 'formatRows')) {
                    return;
                }
                if (size < 0 || size > 545) {
                    if (e.isEditMode()) {
                        alert(locale_info.tipRowHeightLimit);
                    } else {
                        tooltip.info(locale_info.tipRowHeightLimit, '');
                    }
                    return;
                }
                type = 'resizeR';
                if (cfg['rowlen'] == null) {
                    cfg['rowlen'] = {};
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let r1 = Store.luckysheet_select_save[s].row[0];
                    let r2 = Store.luckysheet_select_save[s].row[1];
                    for (let r = r1; r <= r2; r++) {
                        cfg['rowlen'][r] = size;
                        images = imageCtrl.moveChangeSize('row', r, size);
                    }
                }
            } else if (Store.luckysheetRightHeadClickIs == 'column') {
                if (!m.checkProtectionAuthorityNormal(Store.currentSheetIndex, 'formatColumns')) {
                    return;
                }
                if (size < 0 || size > 2038) {
                    if (e.isEditMode()) {
                        alert(locale_info.tipColumnWidthLimit);
                    } else {
                        tooltip.info(locale_info.tipColumnWidthLimit, '');
                    }
                    return;
                }
                type = 'resizeC';
                if (cfg['columnlen'] == null) {
                    cfg['columnlen'] = {};
                }
                for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                    let c1 = Store.luckysheet_select_save[s].column[0];
                    let c2 = Store.luckysheet_select_save[s].column[1];
                    for (let c = c1; c <= c2; c++) {
                        cfg['columnlen'][c] = size;
                        images = imageCtrl.moveChangeSize('column', c, size);
                    }
                }
            }
            if (Store.clearjfundo) {
                Store.jfundo.length = 0;
                Store.jfredo.push({
                    'type': 'resize',
                    'ctrlType': type,
                    'sheetIndex': Store.currentSheetIndex,
                    'config': $.extend(true, {}, Store.config),
                    'curconfig': $.extend(true, {}, cfg),
                    'images': $.extend(true, {}, imageCtrl.images),
                    'curImages': $.extend(true, {}, images)
                });
            }
            Store.config = cfg;
            Store.luckysheetfile[c.getSheetIndex(Store.currentSheetIndex)].config = Store.config;
            Store.luckysheetfile[c.getSheetIndex(Store.currentSheetIndex)].images = images;
            server.saveParam('all', Store.currentSheetIndex, images, { 'k': 'images' });
            imageCtrl.images = images;
            imageCtrl.allImagesShow();
            if (Store.luckysheetRightHeadClickIs == 'row') {
                server.saveParam('cg', Store.currentSheetIndex, cfg['rowlen'], { 'k': 'rowlen' });
                h.jfrefreshgrid_rhcw(Store.flowdata.length, null);
            } else if (Store.luckysheetRightHeadClickIs == 'column') {
                server.saveParam('cg', Store.currentSheetIndex, cfg['columnlen'], { 'k': 'columnlen' });
                h.jfrefreshgrid_rhcw(null, Store.flowdata[0].length);
            }
        });
    }
    function luckysheetcolsdbclick() {
        Store.luckysheet_cols_change_size = false;
        $('#luckysheet-change-size-line').hide();
        $('#luckysheet-cols-change-size').css('opacity', 0);
        $('#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas').css('cursor', 'default');
        let mouse = d.mouseposition(event.pageX, event.pageY);
        let scrollLeft = $('#luckysheet-cols-h-c').scrollLeft();
        let x = mouse[0] + scrollLeft;
        let colIndex = d.colLocation(x)[2];
        let d = editor.deepCopyFlowData(Store.flowdata);
        let canvas = $('#luckysheetTableContent').get(0).getContext('2d');
        let cfg = $.extend(true, {}, Store.config);
        if (cfg['columnlen'] == null) {
            cfg['columnlen'] = {};
        }
        let matchColumn = {};
        let scrollTop = $('#luckysheet-cell-main').scrollTop(), drawHeight = Store.luckysheetTableContentHW[1];
        let dataset_row_st = k.luckysheet_searcharray(Store.visibledatarow, scrollTop);
        let dataset_row_ed = k.luckysheet_searcharray(Store.visibledatarow, scrollTop + drawHeight);
        dataset_row_ed += dataset_row_ed - dataset_row_st;
        if (dataset_row_ed >= d.length) {
            dataset_row_ed = d.length - 1;
        }
        for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
            let c1 = Store.luckysheet_select_save[s].column[0], c2 = Store.luckysheet_select_save[s].column[1];
            if (colIndex < c1 || colIndex > c2) {
                if (colIndex in matchColumn) {
                    continue;
                }
                let currentColLen = Store.defaultcollen;
                for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
                    let cell = d[r][colIndex];
                    if (cell == null || e.isRealNull(cell.v) && !l.isInlineStringCell(cell)) {
                        continue;
                    }
                    let cellWidth = d.colLocationByIndex(colIndex)[1] - d.colLocationByIndex(colIndex)[0] - 2;
                    let textInfo = j.getCellTextInfo(cell, canvas, {
                        r: r,
                        c: colIndex,
                        cellWidth: cellWidth
                    });
                    let computeRowlen = 0;
                    if (textInfo != null) {
                        computeRowlen = textInfo.textWidthAll;
                    }
                    if (computeRowlen + 6 > currentColLen) {
                        currentColLen = computeRowlen + 6;
                    }
                }
                if (currentColLen != Store.defaultcollen) {
                    cfg['columnlen'][colIndex] = currentColLen;
                    if (cfg['customWidth']) {
                        delete cfg['customWidth'][colIndex];
                    }
                }
                matchColumn[colIndex] = 1;
            } else {
                for (let c = c1; c <= c2; c++) {
                    if (c in matchColumn) {
                        continue;
                    }
                    let currentColLen = Store.defaultcollen;
                    for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
                        let cell = d[r][c];
                        if (cell == null || e.isRealNull(cell.v) && !l.isInlineStringCell(cell)) {
                            continue;
                        }
                        let cellWidth = d.colLocationByIndex(c)[1] - d.colLocationByIndex(c)[0] - 2;
                        let textInfo = j.getCellTextInfo(cell, canvas, {
                            r: r,
                            c: c,
                            cellWidth: cellWidth
                        });
                        let computeRowlen = 0;
                        if (textInfo != null) {
                            computeRowlen = textInfo.textWidthAll;
                        }
                        if (computeRowlen + 6 > currentColLen) {
                            currentColLen = computeRowlen + 6;
                        }
                    }
                    if (currentColLen != Store.defaultcollen) {
                        cfg['columnlen'][c] = currentColLen;
                        if (cfg['customWidth']) {
                            delete cfg['customWidth'][c];
                        }
                    }
                    matchColumn[c] = 1;
                }
            }
        }
        h.jfrefreshgridall(Store.flowdata[0].length, Store.flowdata.length, Store.flowdata, cfg, Store.luckysheet_select_save, 'resizeC', 'columnlen');
    }
    function deleteRows(type, st_index, ed_index) {
        Store.luckysheetRightHeadClickIs = 'column';
    }
    function deleteColumns() {
    }
    return {
        rowColumnOperationInitial: rowColumnOperationInitial,
        deleteRows: deleteRows,
        deleteColumns: deleteColumns
    };
});