define([
    '../controllers/pivotTable',
    '../controllers/conditionformat',
    '../controllers/alternateformat',
    '../controllers/sparkline',
    '../controllers/menuButton',
    '../controllers/dataVerificationCtrl',
    '../controllers/constant',
    '../controllers/sheetSearch',
    './dynamicArray',
    './browser',
    './validate',
    './getRowlen',
    './getdata',
    './border',
    '../methods/get',
    '../utils/util',
    '../controllers/inlineString',
    './method',
    '../store',
    '../locale/locale',
    '../controllers/sheetmanage'
], function (
    pivotTable, 
    conditionformat, 
    alternateformat, 
    luckysheetSparkline, 
    menuButton, 
    dataVerificationCtrl, 
    m_constant, b, c, 
    browser, 
    d, e, f, g, h, i, j, 
    method, 
    Store, 
    locale, 
    sheetmanage
) {
    'use strict';
    function luckysheetDrawgridRowTitle(scrollHeight, drawHeight, offsetTop) {
        if (scrollHeight == null) {
            scrollHeight = $('#luckysheet-cell-main').scrollTop();
        }
        if (drawHeight == null) {
            drawHeight = Store.luckysheetTableContentHW[1];
        }
        if (offsetTop == null) {
            offsetTop = Store.columnHeaderHeight;
        }
        let luckysheetTableContent = $('#luckysheetTableContent').get(0).getContext('2d');
        luckysheetTableContent.save();
        luckysheetTableContent.scale(Store.devicePixelRatio, Store.devicePixelRatio);
        luckysheetTableContent.clearRect(0, offsetTop, Store.rowHeaderWidth - 1, drawHeight);
        luckysheetTableContent.font = m_constant.luckysheetdefaultFont();
        luckysheetTableContent.textBaseline = m_constant.luckysheetdefaultstyle.textBaseline;
        luckysheetTableContent.fillStyle = m_constant.luckysheetdefaultstyle.fillStyle;
        let dataset_row_st, dataset_row_ed;
        dataset_row_st = b.luckysheet_searcharray(Store.visibledatarow, scrollHeight);
        dataset_row_ed = b.luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);
        if (dataset_row_st == -1) {
            dataset_row_st = 0;
        }
        if (dataset_row_ed == -1) {
            dataset_row_ed = Store.visibledatarow.length - 1;
        }
        luckysheetTableContent.save();
        luckysheetTableContent.beginPath();
        luckysheetTableContent.rect(0, offsetTop - 1, Store.rowHeaderWidth - 1, drawHeight - 2);
        luckysheetTableContent.clip();
        let end_r, start_r;
        let bodrder05 = 0.5;
        let preEndR;
        for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
            if (r == 0) {
                start_r = -scrollHeight - 1;
            } else {
                start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
            }
            end_r = Store.visibledatarow[r] - scrollHeight;
            let firstOffset = dataset_row_st == r ? -2 : 0;
            let lastOffset = dataset_row_ed == r ? -2 : 0;
            if (!method.createHookFunction('rowTitleCellRenderBefore', r + 1, {
                    r: r,
                    top: start_r + offsetTop + firstOffset,
                    width: Store.rowHeaderWidth - 1,
                    height: end_r - start_r + 1 + lastOffset - firstOffset
                }, luckysheetTableContent)) {
                continue;
            }
            if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r] != null) {
            } else {
                luckysheetTableContent.fillStyle = '#ffffff';
                luckysheetTableContent.fillRect(0, start_r + offsetTop + firstOffset, Store.rowHeaderWidth - 1, end_r - start_r + 1 + lastOffset - firstOffset);
                luckysheetTableContent.fillStyle = '#000000';
                luckysheetTableContent.save();
                luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
                let textMetrics = e.getMeasureText(r + 1, luckysheetTableContent);
                let horizonAlignPos = (Store.rowHeaderWidth - textMetrics.width) / 2;
                let verticalAlignPos = start_r + (end_r - start_r) / 2 + offsetTop;
                luckysheetTableContent.fillText(r + 1, horizonAlignPos / Store.zoomRatio, verticalAlignPos / Store.zoomRatio);
                luckysheetTableContent.restore();
            }
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(Store.rowHeaderWidth - 2 + bodrder05, start_r + offsetTop - 2);
            luckysheetTableContent.lineTo(Store.rowHeaderWidth - 2 + bodrder05, end_r + offsetTop - 2);
            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
            if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r] == null && Store.config['rowhidden'][r + 1] != null) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(-1, end_r + offsetTop - 4 + bodrder05);
                luckysheetTableContent.lineTo(Store.rowHeaderWidth - 1, end_r + offsetTop - 4 + bodrder05);
                luckysheetTableContent.closePath();
                luckysheetTableContent.stroke();
            } else if (Store.config['rowhidden'] == null || Store.config['rowhidden'][r] == null) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(-1, end_r + offsetTop - 2 + bodrder05);
                luckysheetTableContent.lineTo(Store.rowHeaderWidth - 1, end_r + offsetTop - 2 + bodrder05);
                luckysheetTableContent.closePath();
                luckysheetTableContent.stroke();
            }
            if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r - 1] != null && preEndR != null) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(-1, preEndR + offsetTop + bodrder05);
                luckysheetTableContent.lineTo(Store.rowHeaderWidth - 1, preEndR + offsetTop + bodrder05);
                luckysheetTableContent.closePath();
                luckysheetTableContent.stroke();
            }
            preEndR = end_r;
            method.createHookFunction('rowTitleCellRenderAfter', r + 1, {
                r: r,
                top: start_r + offsetTop + firstOffset,
                width: Store.rowHeaderWidth - 1,
                height: end_r - start_r + 1 + lastOffset - firstOffset
            }, luckysheetTableContent);
        }
        luckysheetTableContent.restore();
        luckysheetTableContent.restore();
    }
    function luckysheetDrawgridColumnTitle(scrollWidth, drawWidth, offsetLeft) {
        if (scrollWidth == null) {
            scrollWidth = $('#luckysheet-cell-main').scrollLeft();
        }
        if (drawWidth == null) {
            drawWidth = Store.luckysheetTableContentHW[0];
        }
        if (offsetLeft == null) {
            offsetLeft = Store.rowHeaderWidth;
        }
        let luckysheetTableContent = $('#luckysheetTableContent').get(0).getContext('2d');
        luckysheetTableContent.save();
        luckysheetTableContent.scale(Store.devicePixelRatio, Store.devicePixelRatio);
        luckysheetTableContent.clearRect(offsetLeft, 0, drawWidth, Store.columnHeaderHeight - 1);
        luckysheetTableContent.font = m_constant.luckysheetdefaultFont();
        luckysheetTableContent.textBaseline = m_constant.luckysheetdefaultstyle.textBaseline;
        luckysheetTableContent.fillStyle = m_constant.luckysheetdefaultstyle.fillStyle;
        let dataset_col_st, dataset_col_ed;
        dataset_col_st = b.luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
        dataset_col_ed = b.luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);
        if (dataset_col_st == -1) {
            dataset_col_st = 0;
        }
        if (dataset_col_ed == -1) {
            dataset_col_ed = Store.visibledatacolumn.length - 1;
        }
        luckysheetTableContent.save();
        luckysheetTableContent.beginPath();
        luckysheetTableContent.rect(offsetLeft - 1, 0, drawWidth, Store.columnHeaderHeight - 1);
        luckysheetTableContent.clip();
        let end_c, start_c;
        let bodrder05 = 0.5;
        let preEndC;
        for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
            if (c == 0) {
                start_c = -scrollWidth;
            } else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }
            end_c = Store.visibledatacolumn[c] - scrollWidth;
            let abc = i.chatatABC(c);
            if (!method.createHookFunction('columnTitleCellRenderBefore', abc, {
                    c: c,
                    left: start_c + offsetLeft - 1,
                    width: end_c - start_c,
                    height: Store.columnHeaderHeight - 1
                }, luckysheetTableContent)) {
                continue;
            }
            if (Store.config['colhidden'] != null && Store.config['colhidden'][c] != null) {
            } else {
                luckysheetTableContent.fillStyle = '#ffffff';
                luckysheetTableContent.fillRect(start_c + offsetLeft - 1, 0, end_c - start_c, Store.columnHeaderHeight - 1);
                luckysheetTableContent.fillStyle = '#000000';
                luckysheetTableContent.save();
                luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
                let textMetrics = e.getMeasureText(abc, luckysheetTableContent);
                let horizonAlignPos = Math.round(start_c + (end_c - start_c) / 2 + offsetLeft - textMetrics.width / 2);
                let verticalAlignPos = Math.round(Store.columnHeaderHeight / 2);
                luckysheetTableContent.fillText(abc, horizonAlignPos / Store.zoomRatio, verticalAlignPos / Store.zoomRatio);
                luckysheetTableContent.restore();
            }
            if (Store.config['colhidden'] != null && Store.config['colhidden'][c] == null && Store.config['colhidden'][c + 1] != null) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(end_c + offsetLeft - 4 + bodrder05, 0);
                luckysheetTableContent.lineTo(end_c + offsetLeft - 4 + bodrder05, Store.columnHeaderHeight - 2);
                luckysheetTableContent.lineWidth = 1;
                luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
                luckysheetTableContent.closePath();
                luckysheetTableContent.stroke();
            } else if (Store.config['colhidden'] == null || Store.config['colhidden'][c] == null) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(end_c + offsetLeft - 2 + bodrder05, 0);
                luckysheetTableContent.lineTo(end_c + offsetLeft - 2 + bodrder05, Store.columnHeaderHeight - 2);
                luckysheetTableContent.lineWidth = 1;
                luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
                luckysheetTableContent.closePath();
                luckysheetTableContent.stroke();
            }
            if (Store.config['colhidden'] != null && Store.config['colhidden'][c - 1] != null && preEndC != null) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(preEndC + offsetLeft + bodrder05, 0);
                luckysheetTableContent.lineTo(preEndC + offsetLeft + bodrder05, Store.columnHeaderHeight - 2);
                luckysheetTableContent.closePath();
                luckysheetTableContent.stroke();
            }
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(start_c + offsetLeft - 1, Store.columnHeaderHeight - 2 + bodrder05);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 1, Store.columnHeaderHeight - 2 + bodrder05);
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
            preEndC = end_c;
            method.createHookFunction('columnTitleCellRenderAfter', abc, {
                c: c,
                left: start_c + offsetLeft - 1,
                width: end_c - start_c,
                height: Store.columnHeaderHeight - 1
            }, luckysheetTableContent);
        }
        luckysheetTableContent.restore();
        luckysheetTableContent.restore();
    }
    function luckysheetDrawMain(scrollWidth, scrollHeight, drawWidth, drawHeight, offsetLeft, offsetTop, columnOffsetCell, rowOffsetCell, mycanvas) {
        if (Store.flowdata == null) {
            return;
        }
        let sheetFile = sheetmanage.getSheetByIndex();
        clearTimeout(Store.measureTextCacheTimeOut);
        if (scrollWidth == null) {
            scrollWidth = $('#luckysheet-cell-main').scrollLeft();
        }
        if (scrollHeight == null) {
            scrollHeight = $('#luckysheet-cell-main').scrollTop();
        }
        if (drawWidth == null) {
            drawWidth = Store.luckysheetTableContentHW[0];
        }
        if (drawHeight == null) {
            drawHeight = Store.luckysheetTableContentHW[1];
        }
        if (offsetLeft == null) {
            offsetLeft = Store.rowHeaderWidth;
        }
        if (offsetTop == null) {
            offsetTop = Store.columnHeaderHeight;
        }
        if (columnOffsetCell == null) {
            columnOffsetCell = 0;
        }
        if (rowOffsetCell == null) {
            rowOffsetCell = 0;
        }
        let luckysheetTableContent = null;
        if (mycanvas == null) {
            luckysheetTableContent = $('#luckysheetTableContent').get(0).getContext('2d');
        } else {
            if (i.getObjType(mycanvas) == 'object') {
                try {
                    luckysheetTableContent = mycanvas.get(0).getContext('2d');
                } catch (err) {
                    luckysheetTableContent = mycanvas;
                }
            } else {
                luckysheetTableContent = $('#' + mycanvas).get(0).getContext('2d');
            }
        }
        luckysheetTableContent.save();
        luckysheetTableContent.scale(Store.devicePixelRatio, Store.devicePixelRatio);
        luckysheetTableContent.clearRect(0, 0, Store.luckysheetTableContentHW[0], Store.luckysheetTableContentHW[1]);
        let dataset_row_st, dataset_row_ed, dataset_col_st, dataset_col_ed;
        dataset_row_st = b.luckysheet_searcharray(Store.visibledatarow, scrollHeight);
        dataset_row_ed = b.luckysheet_searcharray(Store.visibledatarow, scrollHeight + drawHeight);
        if (dataset_row_st == -1) {
            dataset_row_st = 0;
        }
        dataset_row_st += rowOffsetCell;
        if (dataset_row_ed == -1) {
            dataset_row_ed = Store.visibledatarow.length - 1;
        }
        dataset_row_ed += rowOffsetCell;
        if (dataset_row_ed >= Store.visibledatarow.length) {
            dataset_row_ed = Store.visibledatarow.length - 1;
        }
        dataset_col_st = b.luckysheet_searcharray(Store.visibledatacolumn, scrollWidth);
        dataset_col_ed = b.luckysheet_searcharray(Store.visibledatacolumn, scrollWidth + drawWidth);
        if (dataset_col_st == -1) {
            dataset_col_st = 0;
        }
        dataset_col_st += columnOffsetCell;
        if (dataset_col_ed == -1) {
            dataset_col_ed = Store.visibledatacolumn.length - 1;
        }
        dataset_col_ed += columnOffsetCell;
        if (dataset_col_ed >= Store.visibledatacolumn.length) {
            dataset_col_ed = Store.visibledatacolumn.length - 1;
        }
        let fill_row_st, fill_row_ed, fill_col_st, fill_col_ed;
        if (dataset_row_st == 0) {
            fill_row_st = 0;
        } else {
            fill_row_st = Store.visibledatarow[dataset_row_st - 1];
        }
        fill_row_ed = Store.visibledatarow[dataset_row_ed];
        if (dataset_col_st == 0) {
            fill_col_st = 0;
        } else {
            fill_col_st = Store.visibledatacolumn[dataset_col_st - 1];
        }
        fill_col_ed = Store.visibledatacolumn[dataset_col_ed];
        luckysheetTableContent.fillStyle = '#ffffff';
        luckysheetTableContent.fillRect(offsetLeft - 1, offsetTop - 1, fill_col_ed - scrollWidth, fill_row_ed - scrollHeight);
        luckysheetTableContent.font = m_constant.luckysheetdefaultFont();
        luckysheetTableContent.fillStyle = m_constant.luckysheetdefaultstyle.fillStyle;
        let cellupdate = [];
        let mergeCache = {};
        let borderOffset = {};
        let bodrder05 = 0.5;
        method.createHookFunction('cellAllRenderBefore', Store.flowdata, sheetFile, luckysheetTableContent);
        for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
            let start_r;
            if (r == 0) {
                start_r = -scrollHeight - 1;
            } else {
                start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
            }
            let end_r = Store.visibledatarow[r] - scrollHeight;
            if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r] != null) {
                continue;
            }
            for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
                let start_c;
                if (c == 0) {
                    start_c = -scrollWidth;
                } else {
                    start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
                }
                let end_c = Store.visibledatacolumn[c] - scrollWidth;
                if (Store.config['colhidden'] != null && Store.config['colhidden'][c] != null) {
                    continue;
                }
                let firstcolumnlen = Store.defaultcollen;
                if (Store.config['columnlen'] != null && Store.config['columnlen'][c] != null) {
                    firstcolumnlen = Store.config['columnlen'][c];
                }
                if (Store.flowdata[r] != null && Store.flowdata[r][c] != null) {
                    let value = Store.flowdata[r][c];
                    if (i.getObjType(value) == 'object' && 'mc' in value) {
                        borderOffset[r + '_' + c] = {
                            'start_r': start_r,
                            'start_c': start_c,
                            'end_r': end_r,
                            'end_c': end_c
                        };
                        if ('rs' in value['mc']) {
                            let key = 'r' + r + 'c' + c;
                            mergeCache[key] = cellupdate.length;
                        } else {
                            let key = 'r' + value['mc'].r + 'c' + value['mc'].c;
                            let margeMain = cellupdate[mergeCache[key]];
                            if (margeMain == null) {
                                mergeCache[key] = cellupdate.length;
                                cellupdate.push({
                                    'r': r,
                                    'c': c,
                                    'start_c': start_c,
                                    'start_r': start_r,
                                    'end_r': end_r,
                                    'end_c': end_c,
                                    'firstcolumnlen': firstcolumnlen
                                });
                            } else {
                                if (margeMain.c == c) {
                                    margeMain.end_r += end_r - start_r - 1;
                                }
                                if (margeMain.r == r) {
                                    margeMain.end_c += end_c - start_c;
                                    margeMain.firstcolumnlen += firstcolumnlen;
                                }
                            }
                            continue;
                        }
                    }
                } else {
                }
                cellupdate.push({
                    'r': r,
                    'c': c,
                    'start_r': start_r,
                    'start_c': start_c,
                    'end_r': end_r,
                    'end_c': end_c,
                    'firstcolumnlen': firstcolumnlen
                });
                borderOffset[r + '_' + c] = {
                    'start_r': start_r,
                    'start_c': start_c,
                    'end_r': end_r,
                    'end_c': end_c
                };
            }
        }
        let dynamicArray_compute = c.dynamicArrayCompute(Store.luckysheetfile[h.getSheetIndex(Store.currentSheetIndex)]['dynamicArray']);
        let af_compute = alternateformat.getComputeMap();
        let cf_compute = conditionformat.getComputeMap();
        let cellOverflowMap = getCellOverflowMap(luckysheetTableContent, dataset_col_st, dataset_col_ed, dataset_row_st, dataset_row_ed);
        let mcArr = [];
        for (let cud = 0; cud < cellupdate.length; cud++) {
            let item = cellupdate[cud];
            let r = item.r, c = item.c, start_r = item.start_r, start_c = item.start_c, end_r = item.end_r, end_c = item.end_c;
            let firstcolumnlen = item.firstcolumnlen;
            if (Store.flowdata[r] == null) {
                continue;
            }
            if (Store.flowdata[r][c] == null) {
                nullCellRender(r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05);
            } else {
                let cell = Store.flowdata[r][c];
                let value = null;
                if (typeof cell == 'object' && 'mc' in cell) {
                    mcArr.push(cellupdate[cud]);
                } else {
                    value = f.getRealCellValue(r, c);
                }
                if (value == null || value.toString().length == 0) {
                    nullCellRender(r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05);
                    let borderfix = menuButton.borderfix(Store.flowdata, r, c);
                    let cellsize = [
                        start_c + offsetLeft + borderfix[0],
                        start_r + offsetTop + borderfix[1],
                        end_c - start_c - 3 + borderfix[2],
                        end_r - start_r - 3 - 1 + borderfix[3]
                    ];
                    sparklinesRender(r, c, cellsize[0], cellsize[1], 'luckysheetTableContent', luckysheetTableContent);
                } else {
                    if (r + '_' + c in dynamicArray_compute) {
                        value = dynamicArray_compute[r + '_' + c].v;
                    }
                    cellRender(r, c, start_r, start_c, end_r, end_c, value, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05);
                }
            }
        }
        for (let m = 0; m < mcArr.length; m++) {
            let item = mcArr[m];
            let r = item.r, c = item.c, start_r = item.start_r, start_c = item.start_c, end_r = item.end_r - 1, end_c = item.end_c - 1;
            let firstcolumnlen = item.firstcolumnlen;
            let cell = Store.flowdata[r][c];
            let value = null;
            let margeMaindata = cell['mc'];
            value = f.getRealCellValue(margeMaindata.r, margeMaindata.c);
            r = margeMaindata.r;
            c = margeMaindata.c;
            let mainCell = Store.flowdata[r][c];
            if (c == 0) {
                start_c = -scrollWidth;
            } else {
                start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
            }
            if (r == 0) {
                start_r = -scrollHeight - 1;
            } else {
                start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
            }
            end_r = Store.visibledatarow[r + mainCell['mc'].rs - 1] - scrollHeight;
            end_c = Store.visibledatacolumn[c + mainCell['mc'].cs - 1] - scrollWidth;
            if (value == null || value.toString().length == 0) {
                nullCellRender(r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05, true);
                let borderfix = menuButton.borderfix(Store.flowdata, r, c);
                let cellsize = [
                    start_c + offsetLeft + borderfix[0],
                    start_r + offsetTop + borderfix[1],
                    end_c - start_c - 3 + borderfix[2],
                    end_r - start_r - 3 - 1 + borderfix[3]
                ];
                sparklinesRender(r, c, cellsize[0], cellsize[1], 'luckysheetTableContent', luckysheetTableContent);
            } else {
                if (r + '_' + c in dynamicArray_compute) {
                    value = dynamicArray_compute[r + '_' + c].v;
                }
                cellRender(r, c, start_r, start_c, end_r, end_c, value, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05, true);
            }
        }
        for (let r = dataset_row_st; r <= dataset_row_ed; r++) {
            let start_r;
            if (r == 0) {
                start_r = -scrollHeight - 1;
            } else {
                start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
            }
            let end_r = Store.visibledatarow[r] - scrollHeight;
            for (let c = dataset_col_st; c <= dataset_col_ed; c++) {
                let start_c;
                if (c == 0) {
                    start_c = -scrollWidth;
                } else {
                    start_c = Store.visibledatacolumn[c - 1] - scrollWidth;
                }
                let end_c = Store.visibledatacolumn[c] - scrollWidth;
                if (!!Store.luckysheetcurrentisPivotTable && pivotTable.drawPivotTable) {
                    if ((c == 0 || c == 5) && r <= 11) {
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(end_c - 2 + bodrder05 + offsetLeft, start_r + offsetTop);
                        luckysheetTableContent.lineTo(end_c - 2 + bodrder05 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                        luckysheetTableContent.lineWidth = 1;
                        luckysheetTableContent.strokeStyle = '#000000';
                        luckysheetTableContent.closePath();
                        luckysheetTableContent.stroke();
                    }
                    if ((r == 2 || r == 11) && c <= 5) {
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(start_c - 1 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                        luckysheetTableContent.lineTo(end_c - 2 + bodrder05 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                        luckysheetTableContent.lineWidth = 1;
                        luckysheetTableContent.strokeStyle = '#000000';
                        luckysheetTableContent.closePath();
                        luckysheetTableContent.stroke();
                    }
                    if (r == 6 && c == 3) {
                        luckysheetTableContent.save();
                        luckysheetTableContent.font = 'bold 30px Arial';
                        luckysheetTableContent.fillStyle = '#626675';
                        luckysheetTableContent.textAlign = 'center';
                        luckysheetTableContent.fillText(locale().pivotTable.title, start_c + (end_c - start_c) / 2 + 4 + offsetLeft, start_r + (end_r - start_r) / 2 - 1 + offsetTop);
                        luckysheetTableContent.restore();
                    }
                } else if (!!Store.luckysheetcurrentisPivotTable) {
                    if (c < pivotTable.pivotTableBoundary[1] && r < pivotTable.pivotTableBoundary[0]) {
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(end_c - 2 + bodrder05 + offsetLeft, start_r + offsetTop);
                        luckysheetTableContent.lineTo(end_c - 2 + bodrder05 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                        luckysheetTableContent.lineWidth = 1;
                        luckysheetTableContent.strokeStyle = '#000000';
                        luckysheetTableContent.closePath();
                        luckysheetTableContent.stroke();
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(start_c - 1 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                        luckysheetTableContent.lineTo(end_c - 2 + offsetLeft, end_r - 2 + bodrder05 + offsetTop);
                        luckysheetTableContent.lineWidth = 1;
                        luckysheetTableContent.strokeStyle = '#000000';
                        luckysheetTableContent.closePath();
                        luckysheetTableContent.stroke();
                    }
                }
            }
        }
        if (Store.config['borderInfo'] != null && Store.config['borderInfo'].length > 0) {
            let borderLeftRender = function (style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
                let linetype = style;
                let m_st = start_c - 2 + bodrder05 + offsetLeft;
                let m_ed = start_r + offsetTop - 1;
                let line_st = start_c - 2 + bodrder05 + offsetLeft;
                let line_ed = end_r - 2 + bodrder05 + offsetTop;
                canvas.save();
                menuButton.setLineDash(canvas, linetype, 'v', m_st, m_ed, line_st, line_ed);
                canvas.strokeStyle = color;
                canvas.stroke();
                canvas.closePath();
                canvas.restore();
            };
            let borderRightRender = function (style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
                let linetype = style;
                let m_st = end_c - 2 + bodrder05 + offsetLeft;
                let m_ed = start_r + offsetTop - 1;
                let line_st = end_c - 2 + bodrder05 + offsetLeft;
                let line_ed = end_r - 2 + bodrder05 + offsetTop;
                canvas.save();
                menuButton.setLineDash(canvas, linetype, 'v', m_st, m_ed, line_st, line_ed);
                canvas.strokeStyle = color;
                canvas.stroke();
                canvas.closePath();
                canvas.restore();
            };
            let borderBottomRender = function (style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
                let linetype = style;
                let m_st = start_c - 2 + bodrder05 + offsetLeft;
                let m_ed = end_r - 2 + bodrder05 + offsetTop;
                let line_st = end_c - 2 + bodrder05 + offsetLeft;
                let line_ed = end_r - 2 + bodrder05 + offsetTop;
                canvas.save();
                menuButton.setLineDash(canvas, linetype, 'h', m_st, m_ed, line_st, line_ed);
                canvas.strokeStyle = color;
                canvas.stroke();
                canvas.closePath();
                canvas.restore();
            };
            let borderTopRender = function (style, color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, canvas) {
                let linetype = style;
                let m_st = start_c - 2 + bodrder05 + offsetLeft;
                let m_ed = start_r - 1 + bodrder05 + offsetTop;
                let line_st = end_c - 2 + bodrder05 + offsetLeft;
                let line_ed = start_r - 1 + bodrder05 + offsetTop;
                canvas.save();
                menuButton.setLineDash(canvas, linetype, 'h', m_st, m_ed, line_st, line_ed);
                canvas.strokeStyle = color;
                canvas.stroke();
                canvas.closePath();
                canvas.restore();
            };
            let borderInfoCompute = g.getBorderInfoComputeRange(dataset_row_st, dataset_row_ed, dataset_col_st, dataset_col_ed);
            for (let x in borderInfoCompute) {
                let bd_r = x.substr(0, x.indexOf('_'));
                let bd_c = x.substr(x.indexOf('_') + 1);
                if (borderOffset[bd_r + '_' + bd_c]) {
                    let start_r = borderOffset[bd_r + '_' + bd_c].start_r;
                    let start_c = borderOffset[bd_r + '_' + bd_c].start_c;
                    let end_r = borderOffset[bd_r + '_' + bd_c].end_r;
                    let end_c = borderOffset[bd_r + '_' + bd_c].end_c;
                    let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, bd_r, bd_c, dataset_col_st, dataset_col_ed);
                    let borderLeft = borderInfoCompute[x].l;
                    if (borderLeft != null && (!cellOverflow_colInObj.colIn || cellOverflow_colInObj.stc == bd_c)) {
                        borderLeftRender(borderLeft.style, borderLeft.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                    }
                    let borderRight = borderInfoCompute[x].r;
                    if (borderRight != null && (!cellOverflow_colInObj.colIn || cellOverflow_colInObj.colLast)) {
                        borderRightRender(borderRight.style, borderRight.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                    }
                    let borderTop = borderInfoCompute[x].t;
                    if (borderTop != null) {
                        borderTopRender(borderTop.style, borderTop.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                    }
                    let borderBottom = borderInfoCompute[x].b;
                    if (borderBottom != null) {
                        borderBottomRender(borderBottom.style, borderBottom.color, start_r, start_c, end_r, end_c, offsetLeft, offsetTop, luckysheetTableContent);
                    }
                }
            }
        }
        if (dataset_col_ed == Store.visibledatacolumn.length - 1) {
            luckysheetTableContent.clearRect(fill_col_ed - scrollWidth + offsetLeft - 1, offsetTop - 1, Store.ch_width - Store.visibledatacolumn[dataset_col_ed], fill_row_ed - scrollHeight);
        }
        luckysheetTableContent.restore();
        Store.measureTextCacheTimeOut = setTimeout(() => {
            Store.measureTextCache = {};
            Store.measureTextCellInfoCache = {};
            Store.cellOverflowMapCache = {};
        }, 100);
    }
    let sparklinesRender = function (r, c, offsetX, offsetY, canvasid, ctx) {
        if (Store.flowdata[r] == null || Store.flowdata[r][c] == null) {
            return;
        }
        let sparklines = Store.flowdata[r][c].spl;
        if (sparklines != null) {
            if (typeof sparklines == 'string') {
                sparklines = new Function('return ' + sparklines)();
            }
            if (i.getObjType(sparklines) == 'object') {
                let temp1 = sparklines;
                let x = temp1.offsetX;
                let y = temp1.offsetY;
                x = x == null ? 0 : x;
                y = y == null ? 0 : y;
                luckysheetSparkline.render(temp1.shapeseq, temp1.shapes, offsetX + x, offsetY + y, temp1.pixelWidth, temp1.pixelHeight, canvasid, ctx);
            } else if (i.getObjType(sparklines) == 'array' && i.getObjType(sparklines[0]) == 'object') {
                for (let i = 0; i < sparklines.length; i++) {
                    let temp1 = sparklines[i];
                    let x = temp1.offsetX;
                    let y = temp1.offsetY;
                    x = x == null ? 0 : x;
                    y = y == null ? 0 : y;
                    luckysheetSparkline.render(temp1.shapeseq, temp1.shapes, offsetX + x, offsetY + y, temp1.pixelWidth, temp1.pixelHeight, canvasid, ctx);
                }
            }
        }
    };
    let nullCellRender = function (r, c, start_r, start_c, end_r, end_c, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05, isMerge) {
        let checksAF = alternateformat.checksAF(r, c, af_compute);
        let checksCF = conditionformat.checksCF(r, c, cf_compute);
        let borderfix = menuButton.borderfix(Store.flowdata, r, c);
        let fillStyle = menuButton.checkstatus(Store.flowdata, r, c, 'bg');
        if (checksAF != null && checksAF[1] != null) {
            fillStyle = checksAF[1];
        }
        if (checksCF != null && checksCF['cellColor'] != null) {
            fillStyle = checksCF['cellColor'];
        }
        if (Store.flowdata[r][c] != null && Store.flowdata[r][c].tc != null) {
            fillStyle = Store.flowdata[r][c].tc;
        }
        if (fillStyle == null) {
            luckysheetTableContent.fillStyle = '#FFFFFF';
        } else {
            luckysheetTableContent.fillStyle = fillStyle;
        }
        let cellsize = [
            start_c + offsetLeft + borderfix[0],
            start_r + offsetTop + borderfix[1],
            end_c - start_c + borderfix[2] - (!!isMerge ? 1 : 0),
            end_r - start_r + borderfix[3]
        ];
        if (!method.createHookFunction('cellRenderBefore', Store.flowdata[r][c], {
                r: r,
                c: c,
                'start_r': cellsize[1],
                'start_c': cellsize[0],
                'end_r': cellsize[3] + cellsize[1],
                'end_c': cellsize[2] + cellsize[0]
            }, sheetmanage.getSheetByIndex(), luckysheetTableContent)) {
            return;
        }
        luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);
        if (r + '_' + c in dynamicArray_compute) {
            let value = dynamicArray_compute[r + '_' + c].v;
            luckysheetTableContent.fillStyle = '#000000';
            let fontset = m_constant.luckysheetdefaultFont();
            luckysheetTableContent.font = fontset;
            let horizonAlignPos = start_c + 4 + offsetLeft;
            let verticalFixed = browser.luckysheetrefreshfixed();
            let verticalAlignPos = end_r + offsetTop - 2;
            luckysheetTableContent.textBaseline = 'bottom';
            luckysheetTableContent.fillText(value == null ? '' : value, horizonAlignPos, verticalAlignPos);
        }
        if (Store.flowdata[r][c] != null && Store.flowdata[r][c].ps != null) {
            let ps_w = 8 * Store.zoomRatio, ps_h = 8 * Store.zoomRatio;
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(end_c + offsetLeft - 1 - ps_w, start_r + offsetTop);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 1, start_r + offsetTop);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 1, start_r + offsetTop + ps_h);
            luckysheetTableContent.fillStyle = '#FC6666';
            luckysheetTableContent.fill();
            luckysheetTableContent.closePath();
        }
        let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, r, c, dataset_col_st, dataset_col_ed);
        if (cellOverflow_colInObj.colLast) {
            cellOverflowRender(cellOverflow_colInObj.rowIndex, cellOverflow_colInObj.colIndex, cellOverflow_colInObj.stc, cellOverflow_colInObj.edc, luckysheetTableContent, scrollHeight, scrollWidth, offsetLeft, offsetTop, af_compute, cf_compute);
        }
        if (!cellOverflow_colInObj.colIn || cellOverflow_colInObj.colLast) {
            if (!Store.luckysheetcurrentisPivotTable && !fillStyle && Store.showGridLines) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(end_c + offsetLeft - 2 + bodrder05, start_r + offsetTop);
                luckysheetTableContent.lineTo(end_c + offsetLeft - 2 + bodrder05, end_r + offsetTop);
                luckysheetTableContent.lineWidth = 1;
                luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
                luckysheetTableContent.stroke();
                luckysheetTableContent.closePath();
            }
        }
        if (!Store.luckysheetcurrentisPivotTable && !fillStyle && Store.showGridLines) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(start_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
        method.createHookFunction('cellRenderAfter', Store.flowdata[r][c], {
            r: r,
            c: c,
            'start_r': cellsize[1],
            'start_c': cellsize[0],
            'end_r': cellsize[3] + cellsize[1],
            'end_c': cellsize[2] + cellsize[0]
        }, sheetmanage.getSheetByIndex(), luckysheetTableContent);
    };
    let cellRender = function (r, c, start_r, start_c, end_r, end_c, value, luckysheetTableContent, af_compute, cf_compute, offsetLeft, offsetTop, dynamicArray_compute, cellOverflowMap, dataset_col_st, dataset_col_ed, scrollHeight, scrollWidth, bodrder05, isMerge) {
        let cell = Store.flowdata[r][c];
        let cellWidth = end_c - start_c - 2;
        let cellHeight = end_r - start_r - 2;
        let space_width = 2, space_height = 2;
        let horizonAlign = menuButton.checkstatus(Store.flowdata, r, c, 'ht');
        let verticalAlign = menuButton.checkstatus(Store.flowdata, r, c, 'vt');
        let checksAF = alternateformat.checksAF(r, c, af_compute);
        let checksCF = conditionformat.checksCF(r, c, cf_compute);
        let fillStyle = menuButton.checkstatus(Store.flowdata, r, c, 'bg');
        if (checksAF != null && checksAF[1] != null) {
            fillStyle = checksAF[1];
        }
        if (checksCF != null && checksCF['cellColor'] != null) {
            fillStyle = checksCF['cellColor'];
        }
        if (fillStyle == null) {
            luckysheetTableContent.fillStyle = '#FFFFFF';
        } else {
            luckysheetTableContent.fillStyle = fillStyle;
        }
        let borderfix = menuButton.borderfix(Store.flowdata, r, c);
        let cellsize = [
            start_c + offsetLeft + borderfix[0],
            start_r + offsetTop + borderfix[1],
            end_c - start_c + borderfix[2] - (!!isMerge ? 1 : 0),
            end_r - start_r + borderfix[3]
        ];
        if (!method.createHookFunction('cellRenderBefore', Store.flowdata[r][c], {
                r: r,
                c: c,
                'start_r': cellsize[1],
                'start_c': cellsize[0],
                'end_r': cellsize[3] + cellsize[1],
                'end_c': cellsize[2] + cellsize[0]
            }, sheetmanage.getSheetByIndex(), luckysheetTableContent)) {
            return;
        }
        luckysheetTableContent.fillRect(cellsize[0], cellsize[1], cellsize[2], cellsize[3]);
        let dataVerification = dataVerificationCtrl.dataVerification;
        if (dataVerification != null && dataVerification[r + '_' + c] != null && !dataVerificationCtrl.validateCellData(value, dataVerification[r + '_' + c])) {
            let dv_w = 5 * Store.zoomRatio, dv_h = 5 * Store.zoomRatio;
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(start_c + offsetLeft, start_r + offsetTop);
            luckysheetTableContent.lineTo(start_c + offsetLeft + dv_w, start_r + offsetTop);
            luckysheetTableContent.lineTo(start_c + offsetLeft, start_r + offsetTop + dv_h);
            luckysheetTableContent.fillStyle = '#FC6666';
            luckysheetTableContent.fill();
            luckysheetTableContent.closePath();
        }
        if (cell.ps != null) {
            let ps_w = 8 * Store.zoomRatio, ps_h = 8 * Store.zoomRatio;
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(end_c + offsetLeft - ps_w, start_r + offsetTop);
            luckysheetTableContent.lineTo(end_c + offsetLeft, start_r + offsetTop);
            luckysheetTableContent.lineTo(end_c + offsetLeft, start_r + offsetTop + ps_h);
            luckysheetTableContent.fillStyle = '#FC6666';
            luckysheetTableContent.fill();
            luckysheetTableContent.closePath();
        }
        if (cell.qp == 1 && d.isRealNum(cell.v)) {
            let ps_w = 6 * Store.zoomRatio, ps_h = 6 * Store.zoomRatio;
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(start_c + offsetLeft + ps_w - 1, start_r + offsetTop);
            luckysheetTableContent.lineTo(start_c + offsetLeft - 1, start_r + offsetTop);
            luckysheetTableContent.lineTo(start_c + offsetLeft - 1, start_r + offsetTop + ps_h);
            luckysheetTableContent.fillStyle = '#487f1e';
            luckysheetTableContent.fill();
            luckysheetTableContent.closePath();
        }
        let cellOverflow_bd_r_render = true;
        let cellOverflow_colInObj = cellOverflow_colIn(cellOverflowMap, r, c, dataset_col_st, dataset_col_ed);
        if (cell.tb == '1' && cellOverflow_colInObj.colIn) {
            if (cellOverflow_colInObj.colLast) {
                cellOverflowRender(cellOverflow_colInObj.rowIndex, cellOverflow_colInObj.colIndex, cellOverflow_colInObj.stc, cellOverflow_colInObj.edc, luckysheetTableContent, scrollHeight, scrollWidth, offsetLeft, offsetTop, af_compute, cf_compute);
            } else {
                cellOverflow_bd_r_render = false;
            }
        } else if (dataVerification != null && dataVerification[r + '_' + c] != null && dataVerification[r + '_' + c].type == 'checkbox') {
            let pos_x = start_c + offsetLeft;
            let pos_y = start_r + offsetTop + 1;
            luckysheetTableContent.save();
            luckysheetTableContent.beginPath();
            luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
            luckysheetTableContent.clip();
            luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
            let measureText = e.getMeasureText(value, luckysheetTableContent);
            let textMetrics = measureText.width + 14;
            let oneLineTextHeight = measureText.actualBoundingBoxDescent + measureText.actualBoundingBoxAscent;
            let horizonAlignPos = pos_x + space_width;
            if (horizonAlign == '0') {
                horizonAlignPos = pos_x + cellWidth / 2 - textMetrics / 2;
            } else if (horizonAlign == '2') {
                horizonAlignPos = pos_x + cellWidth - space_width - textMetrics;
            }
            let verticalCellHeight = cellHeight > oneLineTextHeight ? cellHeight : oneLineTextHeight;
            let verticalAlignPos_text = pos_y + verticalCellHeight - space_height;
            luckysheetTableContent.textBaseline = 'bottom';
            let verticalAlignPos_checkbox = verticalAlignPos_text - 13 * Store.zoomRatio;
            if (verticalAlign == '0') {
                verticalAlignPos_text = pos_y + verticalCellHeight / 2;
                luckysheetTableContent.textBaseline = 'middle';
                verticalAlignPos_checkbox = verticalAlignPos_text - 6 * Store.zoomRatio;
            } else if (verticalAlign == '1') {
                verticalAlignPos_text = pos_y + space_height;
                luckysheetTableContent.textBaseline = 'top';
                verticalAlignPos_checkbox = verticalAlignPos_text + 1 * Store.zoomRatio;
            }
            horizonAlignPos = horizonAlignPos / Store.zoomRatio;
            verticalAlignPos_text = verticalAlignPos_text / Store.zoomRatio;
            verticalAlignPos_checkbox = verticalAlignPos_checkbox / Store.zoomRatio;
            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = '#000';
            luckysheetTableContent.strokeRect(horizonAlignPos, verticalAlignPos_checkbox, 10, 10);
            if (dataVerification[r + '_' + c].checked) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.lineTo(horizonAlignPos + 1, verticalAlignPos_checkbox + 6);
                luckysheetTableContent.lineTo(horizonAlignPos + 4, verticalAlignPos_checkbox + 9);
                luckysheetTableContent.lineTo(horizonAlignPos + 9, verticalAlignPos_checkbox + 2);
                luckysheetTableContent.stroke();
                luckysheetTableContent.closePath();
            }
            luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, 'fc');
            luckysheetTableContent.fillText(value == null ? '' : value, horizonAlignPos + 14, verticalAlignPos_text);
            luckysheetTableContent.restore();
        } else {
            if (checksCF != null && checksCF['dataBar'] != null) {
                let x = start_c + offsetLeft + space_width;
                let y = start_r + offsetTop + space_height;
                let w = cellWidth - space_width * 2;
                let h = cellHeight - space_height * 2;
                let valueType = checksCF['dataBar']['valueType'];
                let valueLen = checksCF['dataBar']['valueLen'];
                let format = checksCF['dataBar']['format'];
                if (valueType == 'minus') {
                    let minusLen = checksCF['dataBar']['minusLen'];
                    if (format.length > 1) {
                        let my_gradient = luckysheetTableContent.createLinearGradient(x + w * minusLen * (1 - valueLen), y, x + w * minusLen, y);
                        my_gradient.addColorStop(0, '#ffffff');
                        my_gradient.addColorStop(1, '#ff0000');
                        luckysheetTableContent.fillStyle = my_gradient;
                    } else {
                        luckysheetTableContent.fillStyle = '#ff0000';
                    }
                    luckysheetTableContent.fillRect(x + w * minusLen * (1 - valueLen), y, w * minusLen * valueLen, h);
                    luckysheetTableContent.beginPath();
                    luckysheetTableContent.moveTo(x + w * minusLen * (1 - valueLen), y);
                    luckysheetTableContent.lineTo(x + w * minusLen * (1 - valueLen), y + h);
                    luckysheetTableContent.lineTo(x + w * minusLen, y + h);
                    luckysheetTableContent.lineTo(x + w * minusLen, y);
                    luckysheetTableContent.lineTo(x + w * minusLen * (1 - valueLen), y);
                    luckysheetTableContent.lineWidth = 1;
                    luckysheetTableContent.strokeStyle = '#ff0000';
                    luckysheetTableContent.stroke();
                    luckysheetTableContent.closePath();
                } else if (valueType == 'plus') {
                    let plusLen = checksCF['dataBar']['plusLen'];
                    if (plusLen == 1) {
                        if (format.length > 1) {
                            let my_gradient = luckysheetTableContent.createLinearGradient(x, y, x + w * valueLen, y);
                            my_gradient.addColorStop(0, format[0]);
                            my_gradient.addColorStop(1, format[1]);
                            luckysheetTableContent.fillStyle = my_gradient;
                        } else {
                            luckysheetTableContent.fillStyle = format[0];
                        }
                        luckysheetTableContent.fillRect(x, y, w * valueLen, h);
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(x, y);
                        luckysheetTableContent.lineTo(x, y + h);
                        luckysheetTableContent.lineTo(x + w * valueLen, y + h);
                        luckysheetTableContent.lineTo(x + w * valueLen, y);
                        luckysheetTableContent.lineTo(x, y);
                        luckysheetTableContent.lineWidth = 1;
                        luckysheetTableContent.strokeStyle = format[0];
                        luckysheetTableContent.stroke();
                        luckysheetTableContent.closePath();
                    } else {
                        let minusLen = checksCF['dataBar']['minusLen'];
                        if (format.length > 1) {
                            let my_gradient = luckysheetTableContent.createLinearGradient(x + w * minusLen, y, x + w * minusLen + w * plusLen * valueLen, y);
                            my_gradient.addColorStop(0, format[0]);
                            my_gradient.addColorStop(1, format[1]);
                            luckysheetTableContent.fillStyle = my_gradient;
                        } else {
                            luckysheetTableContent.fillStyle = format[0];
                        }
                        luckysheetTableContent.fillRect(x + w * minusLen, y, w * plusLen * valueLen, h);
                        luckysheetTableContent.beginPath();
                        luckysheetTableContent.moveTo(x + w * minusLen, y);
                        luckysheetTableContent.lineTo(x + w * minusLen, y + h);
                        luckysheetTableContent.lineTo(x + w * minusLen + w * plusLen * valueLen, y + h);
                        luckysheetTableContent.lineTo(x + w * minusLen + w * plusLen * valueLen, y);
                        luckysheetTableContent.lineTo(x + w * minusLen, y);
                        luckysheetTableContent.lineWidth = 1;
                        luckysheetTableContent.strokeStyle = format[0];
                        luckysheetTableContent.stroke();
                        luckysheetTableContent.closePath();
                    }
                }
            }
            let pos_x = start_c + offsetLeft;
            let pos_y = start_r + offsetTop + 1;
            luckysheetTableContent.save();
            luckysheetTableContent.beginPath();
            luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
            luckysheetTableContent.clip();
            luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
            let textInfo = e.getCellTextInfo(cell, luckysheetTableContent, {
                cellWidth: cellWidth,
                cellHeight: cellHeight,
                space_width: space_width,
                space_height: space_height,
                r: r,
                c: c
            });
            if (checksCF != null && checksCF['icons'] != null && textInfo.type == 'plain') {
                let l = checksCF['icons']['left'];
                let t = checksCF['icons']['top'];
                let value = textInfo.values[0];
                let horizonAlignPos = pos_x + value.left;
                let verticalAlignPos = pos_y + value.top - textInfo.textHeightAll;
                if (verticalAlign == '0') {
                    verticalAlignPos = pos_y + cellHeight / 2 - textInfo.textHeightAll / 2;
                } else if (verticalAlign == '1') {
                    verticalAlignPos = pos_y;
                } else if (verticalAlign == '2') {
                    verticalAlignPos = verticalAlignPos - textInfo.desc;
                }
                verticalAlignPos = verticalAlignPos / Store.zoomRatio;
                horizonAlignPos = horizonAlignPos / Store.zoomRatio;
                luckysheetTableContent.drawImage(m_constant.luckysheet_CFiconsImg, l * 42, t * 32, 32, 32, pos_x / Store.zoomRatio, verticalAlignPos, textInfo.textHeightAll / Store.zoomRatio, textInfo.textHeightAll / Store.zoomRatio);
                if (horizonAlign != '0' && horizonAlign != '2') {
                    horizonAlignPos = horizonAlignPos + textInfo.textHeightAll / Store.zoomRatio;
                }
            }
            luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, 'fc');
            if (checksAF != null && checksAF[0] != null) {
                luckysheetTableContent.fillStyle = checksAF[0];
            }
            if (checksCF != null && checksCF['textColor'] != null) {
                luckysheetTableContent.fillStyle = checksCF['textColor'];
            }
            if (cell.ct && cell.ct.fa && cell.ct.fa.indexOf('[Red]') > -1 && cell.ct.t == 'n' && cell.v < 0) {
                luckysheetTableContent.fillStyle = '#ff0000';
            }
            cellTextRender(textInfo, luckysheetTableContent, {
                pos_x: pos_x,
                pos_y: pos_y
            });
            luckysheetTableContent.restore();
        }
        if (cellOverflow_bd_r_render) {
            if (!Store.luckysheetcurrentisPivotTable && !fillStyle && Store.showGridLines) {
                luckysheetTableContent.beginPath();
                luckysheetTableContent.moveTo(end_c + offsetLeft - 2 + bodrder05, start_r + offsetTop);
                luckysheetTableContent.lineTo(end_c + offsetLeft - 2 + bodrder05, end_r + offsetTop);
                luckysheetTableContent.lineWidth = 1;
                luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
                luckysheetTableContent.stroke();
                luckysheetTableContent.closePath();
            }
        }
        if (!Store.luckysheetcurrentisPivotTable && !fillStyle && Store.showGridLines) {
            luckysheetTableContent.beginPath();
            luckysheetTableContent.moveTo(start_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
            luckysheetTableContent.lineTo(end_c + offsetLeft - 1, end_r + offsetTop - 2 + bodrder05);
            luckysheetTableContent.lineWidth = 1;
            luckysheetTableContent.strokeStyle = m_constant.luckysheetdefaultstyle.strokeStyle;
            luckysheetTableContent.stroke();
            luckysheetTableContent.closePath();
        }
        method.createHookFunction('cellRenderAfter', Store.flowdata[r][c], {
            r: r,
            c: c,
            'start_r': cellsize[1],
            'start_c': cellsize[0],
            'end_r': cellsize[3] + cellsize[1],
            'end_c': cellsize[2] + cellsize[0]
        }, sheetmanage.getSheetByIndex(), luckysheetTableContent);
    };
    let cellOverflowRender = function (r, c, stc, edc, luckysheetTableContent, scrollHeight, scrollWidth, offsetLeft, offsetTop, af_compute, cf_compute) {
        let start_r;
        if (r == 0) {
            start_r = -scrollHeight - 1;
        } else {
            start_r = Store.visibledatarow[r - 1] - scrollHeight - 1;
        }
        let end_r = Store.visibledatarow[r] - scrollHeight;
        let start_c;
        if (stc == 0) {
            start_c = -scrollWidth;
        } else {
            start_c = Store.visibledatacolumn[stc - 1] - scrollWidth;
        }
        let end_c = Store.visibledatacolumn[edc] - scrollWidth;
        let cell = Store.flowdata[r][c];
        let cellWidth = end_c - start_c - 2;
        let cellHeight = end_r - start_r - 2;
        let space_width = 2, space_height = 2;
        let pos_x = start_c + offsetLeft;
        let pos_y = start_r + offsetTop + 1;
        let fontset = i.luckysheetfontformat(cell);
        luckysheetTableContent.font = fontset;
        luckysheetTableContent.save();
        luckysheetTableContent.beginPath();
        luckysheetTableContent.rect(pos_x, pos_y, cellWidth, cellHeight);
        luckysheetTableContent.clip();
        luckysheetTableContent.scale(Store.zoomRatio, Store.zoomRatio);
        let textInfo = e.getCellTextInfo(cell, luckysheetTableContent, {
            cellWidth: cellWidth,
            cellHeight: cellHeight,
            space_width: space_width,
            space_height: space_height,
            r: r,
            c: c
        });
        let checksAF = alternateformat.checksAF(r, c, af_compute);
        let checksCF = conditionformat.checksCF(r, c, cf_compute);
        luckysheetTableContent.fillStyle = menuButton.checkstatus(Store.flowdata, r, c, 'fc');
        if (checksAF != null && checksAF[0] != null) {
            luckysheetTableContent.fillStyle = checksAF[0];
        }
        if (checksCF != null && checksCF['textColor'] != null) {
            luckysheetTableContent.fillStyle = checksCF['textColor'];
        }
        cellTextRender(textInfo, luckysheetTableContent, {
            pos_x: pos_x,
            pos_y: pos_y
        });
        luckysheetTableContent.restore();
    };
    function getCellOverflowMap(canvas, col_st, col_ed, row_st, row_end) {
        let map = {};
        let data = Store.flowdata;
        for (let r = row_st; r <= row_end; r++) {
            if (data[r] == null) {
                continue;
            }
            if (Store.cellOverflowMapCache[r] != null) {
                map[r] = Store.cellOverflowMapCache[r];
                continue;
            }
            let hasCellOver = false;
            for (let c = 0; c < data[r].length; c++) {
                let cell = data[r][c];
                if (Store.config['colhidden'] != null && Store.config['colhidden'][c] != null) {
                    continue;
                }
                if (cell != null && (!d.isRealNull(cell.v) || j.isInlineStringCell(cell)) && cell.mc == null && cell.tb == '1') {
                    let horizonAlign = menuButton.checkstatus(data, r, c, 'ht');
                    let textMetricsObj = e.getCellTextInfo(cell, canvas, {
                        r: r,
                        c: c
                    });
                    let textMetrics = 0;
                    if (textMetricsObj != null) {
                        textMetrics = textMetricsObj.textWidthAll;
                    }
                    let start_c = c - 1 < 0 ? 0 : Store.visibledatacolumn[c - 1];
                    let end_c = Store.visibledatacolumn[c];
                    let stc, edc;
                    if (end_c - start_c < textMetrics) {
                        if (horizonAlign == '0') {
                            let trace_forward = cellOverflow_trace(r, c, c - 1, 'forward', horizonAlign, textMetrics);
                            let trace_backward = cellOverflow_trace(r, c, c + 1, 'backward', horizonAlign, textMetrics);
                            if (trace_forward.success) {
                                stc = trace_forward.c;
                            } else {
                                stc = trace_forward.c + 1;
                            }
                            if (trace_backward.success) {
                                edc = trace_backward.c;
                            } else {
                                edc = trace_backward.c - 1;
                            }
                        } else if (horizonAlign == '1') {
                            let trace = cellOverflow_trace(r, c, c + 1, 'backward', horizonAlign, textMetrics);
                            stc = c;
                            if (trace.success) {
                                edc = trace.c;
                            } else {
                                edc = trace.c - 1;
                            }
                        } else if (horizonAlign == '2') {
                            let trace = cellOverflow_trace(r, c, c - 1, 'forward', horizonAlign, textMetrics);
                            edc = c;
                            if (trace.success) {
                                stc = trace.c;
                            } else {
                                stc = trace.c + 1;
                            }
                        }
                    } else {
                        stc = c;
                        edc = c;
                    }
                    if ((stc <= col_ed || edc >= col_st) && stc < edc) {
                        let item = {
                            r: r,
                            stc: stc,
                            edc: edc
                        };
                        if (map[r] == null) {
                            map[r] = {};
                        }
                        map[r][c] = item;
                        hasCellOver = true;
                    }
                }
            }
            if (hasCellOver) {
                Store.cellOverflowMapCache[r] = map[r];
            }
        }
        return map;
    }
    function cellOverflow_trace(r, curC, traceC, traceDir, horizonAlign, textMetrics) {
        let data = Store.flowdata;
        if (traceDir == 'forward' && traceC < 0) {
            return {
                success: false,
                r: r,
                c: traceC
            };
        }
        if (traceDir == 'backward' && traceC > data[r].length - 1) {
            return {
                success: false,
                r: r,
                c: traceC
            };
        }
        let cell = data[r][traceC];
        if (cell != null && (!d.isRealNull(cell.v) || cell.mc != null)) {
            return {
                success: false,
                r: r,
                c: traceC
            };
        }
        let start_curC = curC - 1 < 0 ? 0 : Store.visibledatacolumn[curC - 1];
        let end_curC = Store.visibledatacolumn[curC];
        let w = textMetrics - (end_curC - start_curC);
        if (horizonAlign == '0') {
            start_curC -= w / 2;
            end_curC += w / 2;
        } else if (horizonAlign == '1') {
            end_curC += w;
        } else if (horizonAlign == '2') {
            start_curC -= w;
        }
        let start_traceC = traceC - 1 < 0 ? 0 : Store.visibledatacolumn[traceC - 1];
        let end_traceC = Store.visibledatacolumn[traceC];
        if (traceDir == 'forward') {
            if (start_curC < start_traceC) {
                return cellOverflow_trace(r, curC, traceC - 1, traceDir, horizonAlign, textMetrics);
            } else if (start_curC < end_traceC) {
                return {
                    success: true,
                    r: r,
                    c: traceC
                };
            } else {
                return {
                    success: false,
                    r: r,
                    c: traceC
                };
            }
        }
        if (traceDir == 'backward') {
            if (end_curC > end_traceC) {
                return cellOverflow_trace(r, curC, traceC + 1, traceDir, horizonAlign, textMetrics);
            } else if (end_curC > start_traceC) {
                return {
                    success: true,
                    r: r,
                    c: traceC
                };
            } else {
                return {
                    success: false,
                    r: r,
                    c: traceC
                };
            }
        }
    }
    function cellOverflow_colIn(map, r, c, col_st, col_ed) {
        let colIn = false, colLast = false, rowIndex, colIndex, stc, edc;
        for (let rkey in map) {
            for (let ckey in map[rkey]) {
                rowIndex = rkey;
                colIndex = ckey;
                let mapItem = map[rkey][ckey];
                stc = mapItem.stc;
                edc = mapItem.edc;
                if (rowIndex == r) {
                    if (c >= stc && c <= edc) {
                        colIn = true;
                        if (c == edc || c == col_ed) {
                            colLast = true;
                            break;
                        }
                    }
                }
            }
            if (colLast) {
                break;
            }
        }
        return {
            colIn: colIn,
            colLast: colLast,
            rowIndex: rowIndex,
            colIndex: colIndex,
            stc: stc,
            edc: edc
        };
    }
    function cellTextRender(textInfo, ctx, option) {
        if (textInfo == null) {
            return;
        }
        let values = textInfo.values;
        let pos_x = option.pos_x, pos_y = option.pos_y;
        if (values == null) {
            return;
        }
        if (textInfo.rotate != 0 && textInfo.type != 'verticalWrap') {
            ctx.save();
            ctx.translate((pos_x + textInfo.textLeftAll) / Store.zoomRatio, (pos_y + textInfo.textTopAll) / Store.zoomRatio);
            ctx.rotate(-textInfo.rotate * Math.PI / 180);
            ctx.translate(-(textInfo.textLeftAll + pos_x) / Store.zoomRatio, -(pos_y + textInfo.textTopAll) / Store.zoomRatio);
        }
        for (let i = 0; i < values.length; i++) {
            let word = values[i];
            if (word.inline === true && word.style != null) {
                ctx.font = word.style.fontset;
                ctx.fillStyle = word.style.fc;
            } else {
                ctx.font = word.style;
            }
            let txt = typeof word.content === 'object' ? word.content.m : word.content;
            ctx.fillText(txt, (pos_x + word.left) / Store.zoomRatio, (pos_y + word.top) / Store.zoomRatio);
            if (word.cancelLine != null) {
                let c = word.cancelLine;
                ctx.beginPath();
                ctx.moveTo(Math.floor((pos_x + c.startX) / Store.zoomRatio) + 0.5, Math.floor((pos_y + c.startY) / Store.zoomRatio) + 0.5);
                ctx.lineTo(Math.floor((pos_x + c.endX) / Store.zoomRatio) + 0.5, Math.floor((pos_y + c.endY) / Store.zoomRatio) + 0.5);
                ctx.lineWidth = Math.floor(c.fs / 9);
                ctx.strokeStyle = ctx.fillStyle;
                ctx.stroke();
                ctx.closePath();
            }
            if (word.underLine != null) {
                let underLines = word.underLine;
                for (let a = 0; a < underLines.length; a++) {
                    let item = underLines[a];
                    ctx.beginPath();
                    ctx.moveTo(Math.floor((pos_x + item.startX) / Store.zoomRatio) + 0.5, Math.floor((pos_y + item.startY) / Store.zoomRatio));
                    ctx.lineTo(Math.floor((pos_x + item.endX) / Store.zoomRatio) + 0.5, Math.floor((pos_y + item.endY) / Store.zoomRatio) + 0.5);
                    ctx.lineWidth = Math.floor(item.fs / 9);
                    ctx.strokeStyle = ctx.fillStyle;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        if (textInfo.rotate != 0 && textInfo.type != 'verticalWrap') {
            ctx.restore();
        }
    }
    return {
        luckysheetDrawgridRowTitle,
        luckysheetDrawgridColumnTitle,
        luckysheetDrawMain
    };
});