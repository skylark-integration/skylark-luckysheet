define([
    './get',
    '../utils/util',
    '../store',
    './conditionformat_methods',
    './alternateformat_methods',
    '../locale/locale'
], function (m_get, m_util, Store,conditionformat,alternateformat,locale) {
    'use strict';
    const {getSheetIndex} = m_get;
    const {getObjType} = m_util;

    const cells = {
        // from controllers/menuButtons
        borderfix: function (d, r, c) {
            // return [-1, -1, 2, 2];
            let cell = d[r][c];
            let bg = null;
            if (cell == null) {
                return [
                    -1,
                    0,
                    0,
                    -1
                ];
            } else if (d[r][c].bg == null || d[r][c].bg == '') {
                return [
                    -1,
                    0,
                    0,
                    -1
                ];
            } else {
                return [
                    -2,
                    -1,
                    1,
                    0
                ];    //return [-2, -2, 1, 0];
            }
        },


        mergeborer: function (d, row_index, col_index) {
            if (d == null || d[row_index] == null) {
                console.warn('Merge info is null', row_index, col_index);
                return null;
            }
            let value = d[row_index][col_index];
            if (getObjType(value) == 'object' && 'mc' in value) {
                let margeMaindata = value['mc'];
                if (margeMaindata == null) {
                    console.warn('Merge info is null', row_index, col_index);
                    return null;
                }
                col_index = margeMaindata.c;
                row_index = margeMaindata.r;
                if (d[row_index][col_index] == null) {
                    console.warn('Main merge Cell info is null', row_index, col_index);
                    return null;
                }
                let col_rs = d[row_index][col_index].mc.cs;
                let row_rs = d[row_index][col_index].mc.rs;
                let margeMain = d[row_index][col_index].mc;
                let start_r, end_r, row, row_pre;
                for (let r = row_index; r < margeMain.rs + row_index; r++) {
                    if (r == 0) {
                        start_r = -1;
                    } else {
                        start_r = Store.visibledatarow[r - 1] - 1;
                    }
                    end_r = Store.visibledatarow[r];
                    if (row_pre == null) {
                        row_pre = start_r;
                        row = end_r;
                    } else {
                        row += end_r - start_r - 1;
                    }
                }
                let start_c, end_c, col, col_pre;
                for (let c = col_index; c < margeMain.cs + col_index; c++) {
                    if (c == 0) {
                        start_c = 0;
                    } else {
                        start_c = Store.visibledatacolumn[c - 1];
                    }
                    end_c = Store.visibledatacolumn[c];
                    if (col_pre == null) {
                        col_pre = start_c;
                        col = end_c;
                    } else {
                        col += end_c - start_c;
                    }
                }
                return {
                    'row': [
                        row_pre,
                        row,
                        row_index,
                        row_index + row_rs - 1
                    ],
                    'column': [
                        col_pre,
                        col,
                        col_index,
                        col_index + col_rs - 1
                    ]
                };
            } else {
                return null;
            }
        },
        getCellRealSize: function (d, cell_r, cell_c) {
            let _this = this;
            let width = Store.defaultcollen;
            let height = Store.defaultrowlen;
            let celldata = d[cell_r][cell_c];
            if (!!celldata && celldata['mc'] != null) {
                let mc = celldata['mc'];
                let margeset = _this.mergeborer(d, mc.r, mc.c);
                if (!!margeset) {
                    let row = margeset.row[1];
                    let row_pre = margeset.row[0];
                    let row_index = margeset.row[2];
                    let row_index_ed = margeset.row[3];
                    let col = margeset.column[1];
                    let col_pre = margeset.column[0];
                    let col_index = margeset.column[2];
                    let col_index_ed = margeset.column[3];
                    width = col - col_pre - 1;
                    height = row - row_pre - 1;
                }
            } else {
                let config = getluckysheetfile()[getSheetIndex(Store.currentSheetIndex)]['config'];
                if (config['columnlen'] != null && config['columnlen'][cell_c] != null) {
                    width = config['columnlen'][cell_c];
                }
                if (config['rowlen'] != null && config['rowlen'][cell_r] != null) {
                    height = config['rowlen'][cell_r];
                }
            }
            return [
                width,
                height
            ];
        },
        getTextHeightCache: {},
        getTextSize: function (text, font) {
            let fontarray = locale().fontarray;
            let f = font || '10pt ' + fontarray[0];
            let _this = this;
            if (f in _this.getTextHeightCache) {
                return _this.getTextHeightCache[f];
            }
            if ($('#luckysheetTextSizeTest').length == 0) {
                $('<span id="luckysheetTextSizeTest" style="float:left;white-space:nowrap;visibility:hidden;margin:0;padding:0;">' + text + '</span>').appendTo($('body'));
            }
            let o = $('#luckysheetTextSizeTest').text(text).css({ 'font': f }), w = o.innerWidth(), h = o.innerHeight();
            _this.getTextHeightCache[f] = [
                w,
                h
            ];
            return [
                w,
                h
            ];
        },
        getStyleByCell: function (d, r, c) {
            let _this = this;
            let style = '';    //交替颜色
            //交替颜色
            let af_compute = alternateformat.getComputeMap();
            let checksAF = alternateformat.checksAF(r, c, af_compute);    //条件格式
            //条件格式
            let cf_compute = conditionformat.getComputeMap();
            let checksCF = conditionformat.checksCF(r, c, cf_compute);
            const locale_fontarray = locale().fontarray;
            let cell = d[r][c];
            let ct = cell.ct, isInline = false;
            if (cells.isInlineStringCell(cell)) {
                isInline = true;
            }
            for (let key in cell) {
                let value = _this.checkstatus(d, r, c, key);
                if (checksAF != null || checksCF != null && checksCF['cellColor'] != null) {
                    if (checksCF != null && checksCF['cellColor'] != null) {
                        style += 'background: ' + checksCF['cellColor'] + ';';
                    } else if (checksAF != null) {
                        style += 'background: ' + checksAF[1] + ';';
                    }
                }
                if (getObjType(value) == 'object') {
                    continue;
                }
                if (key == 'bg' || checksAF != null || checksCF != null && checksCF['cellColor'] != null) {
                    if (checksCF != null && checksCF['cellColor'] != null) {
                        style += 'background: ' + checksCF['cellColor'] + ';';
                    } else if (checksAF != null) {
                        style += 'background: ' + checksAF[1] + ';';
                    } else {
                        style += 'background: ' + value + ';';
                    }
                }    // if(!isInline){
                     //     if(key == "bl" && value != "0"){
                     //         style += "font-weight: bold;";
                     //     }
                     //     if(key == "it" && value != "0"){
                     //         style += "font-style:italic;";
                     //     }
                     //     if(key == "ff" && value != "0"){
                     //         let f = value;
                     //         if(!isNaN(parseInt(value))){
                     //             f = locale_fontarray[parseInt(value)];
                     //         }
                     //         style += "font-family: " + f + ";";
                     //     }
                     //     if(key == "fs" && value != "10"){
                     //         style += "font-size: "+ value + "pt;";
                     //     }
                     //     if((key == "fc" && value != "#000000") || checksAF != null || (checksCF != null && checksCF["textColor"] != null)){
                     //         if(checksCF != null && checksCF["textColor"] != null){
                     //             style += "color: " + checksCF["textColor"] + ";";
                     //         }
                     //         else if(checksAF != null){
                     //             style += "color: " + checksAF[0] + ";";
                     //         }
                     //         else{
                     //             style += "color: " + value + ";";  
                     //         }
                     //     }
                     // }
                // if(!isInline){
                //     if(key == "bl" && value != "0"){
                //         style += "font-weight: bold;";
                //     }
                //     if(key == "it" && value != "0"){
                //         style += "font-style:italic;";
                //     }
                //     if(key == "ff" && value != "0"){
                //         let f = value;
                //         if(!isNaN(parseInt(value))){
                //             f = locale_fontarray[parseInt(value)];
                //         }
                //         style += "font-family: " + f + ";";
                //     }
                //     if(key == "fs" && value != "10"){
                //         style += "font-size: "+ value + "pt;";
                //     }
                //     if((key == "fc" && value != "#000000") || checksAF != null || (checksCF != null && checksCF["textColor"] != null)){
                //         if(checksCF != null && checksCF["textColor"] != null){
                //             style += "color: " + checksCF["textColor"] + ";";
                //         }
                //         else if(checksAF != null){
                //             style += "color: " + checksAF[0] + ";";
                //         }
                //         else{
                //             style += "color: " + value + ";";  
                //         }
                //     }
                // }
                if (key == 'ht' && value != '1') {
                    if (value == '0') {
                        style += 'text-align: center;';
                    } else if (value == '2') {
                        style += 'text-align: right;';
                    }
                }
                if (key == 'vt' && value != '1') {
                    if (value == '0') {
                        style += 'align-items: center;';
                    } else if (value == '2') {
                        style += 'align-items: flex-end;';
                    }
                }
            }
            if (!isInline) {
                style += cells.getFontStyleByCell(cell, checksAF, checksCF);
            }
            return style;
        },

        mergeMoveData: {},
        mergeMoveMain: function (columnseleted, rowseleted, s, top, height, left, width) {
            let _this = this;
            let mergesetting = Store.getSheetMerge();
            if (mergesetting == null) {
                return;
            }
            let mcset = [];
            for (let key in mergesetting) {
                mcset.push(key);
            }
            if (rowseleted[0] > rowseleted[1]) {
                rowseleted[1] = rowseleted[0];
            }
            if (columnseleted[0] > columnseleted[1]) {
                columnseleted[1] = columnseleted[0];
            }
            let offloop = true;
            _this.mergeMoveData = {};
            while (offloop) {
                offloop = false;
                for (let i = 0; i < mcset.length; i++) {
                    let key = mcset[i];
                    let mc = mergesetting[key];
                    if (key in _this.mergeMoveData) {
                        continue;
                    }
                    let changeparam = _this.mergeMove(mc, columnseleted, rowseleted, s, top, height, left, width);
                    if (changeparam != null) {
                        _this.mergeMoveData[key] = mc;
                        columnseleted = changeparam[0];
                        rowseleted = changeparam[1];
                        top = changeparam[2];
                        height = changeparam[3];
                        left = changeparam[4];
                        width = changeparam[5];
                        offloop = true;
                    } else {
                        delete _this.mergeMoveData[key];
                    }
                }
            }
            return [
                columnseleted,
                rowseleted,
                top,
                height,
                left,
                width
            ];
        },
        mergeMove: function (mc, columnseleted, rowseleted, s, top, height, left, width) {
            let _this = this;
            let row_st = mc.r, row_ed = mc.r + mc.rs - 1;
            let col_st = mc.c, col_ed = mc.c + mc.cs - 1;
            let ismatch = false;
            if (columnseleted[1] < columnseleted[0]) {
                columnseleted[0] = columnseleted[1];
            }
            if (rowseleted[1] < rowseleted[0]) {
                rowseleted[0] = rowseleted[1];
            }
            if (columnseleted[0] <= col_st && columnseleted[1] >= col_ed && rowseleted[0] <= row_st && rowseleted[1] >= row_ed || !(columnseleted[1] < col_st || columnseleted[0] > col_ed) && !(rowseleted[1] < row_st || rowseleted[0] > row_ed)) {
                let margeset = _this.mergeborer(Store.flowdata, mc.r, mc.c);
                if (!!margeset) {
                    let row = margeset.row[1], row_pre = margeset.row[0], row_index = margeset.row[2], col = margeset.column[1], col_pre = margeset.column[0], col_index = margeset.column[2];
                    if (!(columnseleted[1] < col_st || columnseleted[0] > col_ed)) {
                        //向上滑动
                        if (rowseleted[0] <= row_ed && rowseleted[0] >= row_st) {
                            height += top - row_pre;
                            top = row_pre;
                            rowseleted[0] = row_st;
                        }  
                        //向下滑动或者居中时往上滑动的向下补齐
                        if (rowseleted[1] >= row_st && rowseleted[1] <= row_ed) {
                            if (s.row_focus >= row_st && s.row_focus <= row_ed) {
                                height = row - top;
                            } else {
                                height = row - top;
                            }
                            rowseleted[1] = row_ed;
                        }
                    }
                    if (!(rowseleted[1] < row_st || rowseleted[0] > row_ed)) {
                        if (columnseleted[0] <= col_ed && columnseleted[0] >= col_st) {
                            width += left - col_pre;
                            left = col_pre;
                            columnseleted[0] = col_st;
                        }   
                        //向右滑动或者居中时往左滑动的向下补齐
                        if (columnseleted[1] >= col_st && columnseleted[1] <= col_ed) {
                            if (s.column_focus >= col_st && s.column_focus <= col_ed) {
                                width = col - left;
                            } else {
                                width = col - left;
                            }
                            columnseleted[1] = col_ed;
                        }
                    }
                    ismatch = true;
                }
            }
            if (ismatch) {
                return [
                    columnseleted,
                    rowseleted,
                    top,
                    height,
                    left,
                    width
                ];
            } else {
                return null;
            }
        },

        //from ../controllers/inlineString
        isInlineStringCell : function (cell) {
            let isIs = cell && cell.ct != null && cell.ct.t == 'inlineStr' && cell.ct.s != null && cell.ct.s.length > 0;
            return isIs;
        },
        isInlineStringCT : function(ct) {
            let isIs = ct != null && ct.t == 'inlineStr' && ct.s != null && ct.s.length > 0;
            return isIs;
        },
        getFontStyleByCell : function (cell, checksAF, checksCF, isCheck = true) {
            if (cell == null) {
                return;
            }
            let style = '';
            const _locale = locale();
            const locale_fontarray = _locale.fontarray;
            for (let key in cell) {
                let value = cell[key];
                if (isCheck) {
                    value = cells.checkstatusByCell(cell, key);
                }
                if (key == 'bl' && value != '0') {
                    style += 'font-weight: bold;';
                }
                if (key == 'it' && value != '0') {
                    style += 'font-style:italic;';
                }
                if (key == 'ff') {
                    let f = value;
                    if (!isNaN(parseInt(value))) {
                        f = locale_fontarray[parseInt(value)];
                    } else {
                        f = value;
                    }
                    style += 'font-family: ' + f + ';';
                }
                if (key == 'fs' && value != '10') {
                    style += 'font-size: ' + value + 'pt;';
                }
                if (key == 'fc' && value != '#000000' || checksAF != null || checksCF != null && checksCF['textColor'] != null) {
                    if (checksCF != null && checksCF['textColor'] != null) {
                        style += 'color: ' + checksCF['textColor'] + ';';
                    } else if (checksAF != null) {
                        style += 'color: ' + checksAF[0] + ';';
                    } else {
                        style += 'color: ' + value + ';';
                    }
                }
                if (key == 'cl' && value != '0') {
                    style += 'text-decoration: line-through;';
                }
                if (key == 'un' && (value == '1' || value == '3')) {
                    let color = cell['_color'];
                    if (color == null) {
                        color = cell['fc'];
                    }
                    let fs = cell['_fontSize'];
                    if (fs == null) {
                        fs = cell['fs'];
                    }
                    style += 'border-bottom: ' + Math.floor(fs / 9) + 'px solid ' + color + ';';
                }
            }
            return style;
        },
        checkstatusByCell : function (cell, a) {
            let foucsStatus = cell;
            let tf = {
                'bl': 1,
                'it': 1,
                'ff': 1,
                'cl': 1,
                'un': 1
            };
            if (a in tf || a == 'fs' && cells.isInlineStringCell(cell)) {
                if (foucsStatus == null) {
                    foucsStatus = '0';
                } else {
                    // var  w = window.getSelection(), isInlineEdit=false; 
                    // if(w.type!="None"){
                    //     var range = w.getRangeAt(0);
                    //     let startContainer = range.startContainer;
                    //     if (parseInt($("#luckysheet-input-box").css("top")) > 0 && startContainer.parentNode.tagName=="SPAN" && !range.collapsed) {
                    //         let span = startContainer.parentNode;
                    //         let styleList = convertCssToStyleList(span.style.cssText);
                    //         foucsStatus = styleList[a];
                    //         isInlineEdit = true;
                    //     }
                    // }
                    // if(!isInlineEdit){       
                    //     if(isInlineStringCell(cell)){
                    //         foucsStatus = cell.ct.s[0][a];
                    //     }
                    //     else{
                    //         foucsStatus = foucsStatus[a];
                    //     }
                    // }   
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '0';
                    }
                }
            } else if (a == 'fc') {
                if (foucsStatus == null) {
                    foucsStatus = '#000000';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '#000000';
                    }
                    if (foucsStatus.indexOf('rgba') > -1) {
                        foucsStatus = rgbTohex(foucsStatus);
                    }
                }
            } else if (a == 'bg') {
                if (foucsStatus == null) {
                    foucsStatus = null;
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = null;
                    } else if (foucsStatus.toString().indexOf('rgba') > -1) {
                        foucsStatus = rgbTohex(foucsStatus);
                    }
                }
            } else if (a.substr(0, 2) == 'bs') {
                if (foucsStatus == null) {
                    foucsStatus = 'none';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = 'none';
                    }
                }
            } else if (a.substr(0, 2) == 'bc') {
                if (foucsStatus == null) {
                    foucsStatus = '#000000';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '#000000';
                    }
                }
            } else if (a == 'ht') {
                if (foucsStatus == null) {
                    foucsStatus = '1';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '1';
                    }
                }
                if ([
                        '0',
                        '1',
                        '2'
                    ].indexOf(foucsStatus.toString()) == -1) {
                    foucsStatus = '1';
                }
            } else if (a == 'vt') {
                //默认垂直居中
                if (foucsStatus == null) {
                    foucsStatus = '0';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '0';
                    }
                }
                if ([
                        '0',
                        '1',
                        '2'
                    ].indexOf(foucsStatus.toString()) == -1) {
                    foucsStatus = '0';
                }
            } else if (a == 'ct') {
                if (foucsStatus == null) {
                    foucsStatus = null;
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = null;
                    }
                }
            } else if (a == 'fs') {
                if (foucsStatus == null) {
                    foucsStatus = '10';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '10';
                    }
                }
            } else if (a == 'tb') {
                if (foucsStatus == null) {
                    foucsStatus = '0';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '0';
                    }
                }
            } else if (a == 'tr') {
                if (foucsStatus == null) {
                    foucsStatus = '0';
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = '0';
                    }
                }
            } else if (a == 'rt') {
                if (foucsStatus == null) {
                    foucsStatus = null;
                } else {
                    foucsStatus = foucsStatus[a];
                    if (foucsStatus == null) {
                        foucsStatus = null;
                    }
                }
            }
            return foucsStatus;
        },
        checkstatus: function (d, r, c, a) {
            if (d == null || d[r] == null) {
                console.warn("It's incorrect data", r, c);
                return null;
            }
            let foucsStatus = d[r][c];
            return cells.checkstatusByCell(foucsStatus, a);
        },
    };

    return cells;
});