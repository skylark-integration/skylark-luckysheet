define([
    './select',
    './menuButton',
    './conditionformat',
    './protection',
    '../global/editor',
    '../global/tooltip',
    '../global/formula',
    '../global/border',
    '../global/getdata',
    '../global/getRowlen',
    '../global/validate',
    '../global/refresh',
    '../global/format',
    '../methods/get',
    '../utils/util',
    '../store',
    '../locale/locale'
], function (a, menuButton, conditionformat, b, editor, tooltip, formula, c, d, e, f, g, h, i, j, Store, locale) {
    'use strict';
    const selection = {
        clearcopy: function (e) {
            let clipboardData = window.clipboardData;
            if (!clipboardData) {
                if (!!e) {
                    clipboardData = e.originalEvent.clipboardData;
                }
            }
            let cpdata = ' ';
            Store.luckysheet_selection_range = [];
            a.selectionCopyShow();
            if (!clipboardData) {
                let textarea = $('#luckysheet-copy-content').css('visibility', 'hidden');
                textarea.val(cpdata);
                textarea.focus();
                textarea.select();
                setTimeout(function () {
                    textarea.blur().css('visibility', 'visible');
                }, 10);
            } else {
                clipboardData.setData('Text', cpdata);
                return false;
            }
        },
        getHtmlBorderStyle: function (type, color) {
            let style = '';
            let borderType = {
                '0': 'none',
                '1': 'Thin',
                '2': 'Hair',
                '3': 'Dotted',
                '4': 'Dashed',
                '5': 'DashDot',
                '6': 'DashDotDot',
                '7': 'Double',
                '8': 'Medium',
                '9': 'MediumDashed',
                '10': 'MediumDashDot',
                '11': 'MediumDashDotDot',
                '12': 'SlantedDashDot',
                '13': 'Thick'
            };
            type = borderType[type.toString()];
            if (type.indexOf('Medium') > -1) {
                style += '1pt ';
            } else if (type == 'Thick') {
                style += '1.5pt ';
            } else {
                style += '0.5pt ';
            }
            if (type == 'Hair') {
                style += 'double ';
            } else if (type.indexOf('DashDotDot') > -1) {
                style += 'dotted ';
            } else if (type.indexOf('DashDot') > -1) {
                style += 'dashed ';
            } else if (type.indexOf('Dotted') > -1) {
                style += 'dotted ';
            } else if (type.indexOf('Dashed') > -1) {
                style += 'dashed ';
            } else {
                style += 'solid ';
            }
            return style + color + ';';
        },
        copy: function (e) {
            let clipboardData = window.clipboardData;
            if (!clipboardData) {
                clipboardData = e.originalEvent.clipboardData;
            }
            Store.luckysheet_selection_range = [];
            let rowIndexArr = [], colIndexArr = [];
            let copyRange = [], RowlChange = false, HasMC = false;
            for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
                let range = Store.luckysheet_select_save[s];
                let r1 = range.row[0], r2 = range.row[1];
                let c1 = range.column[0], c2 = range.column[1];
                for (let copyR = r1; copyR <= r2; copyR++) {
                    if (Store.config['rowhidden'] != null && Store.config['rowhidden'][copyR] != null) {
                        continue;
                    }
                    if (!rowIndexArr.includes(copyR)) {
                        rowIndexArr.push(copyR);
                    }
                    if (Store.config['rowlen'] != null && copyR in Store.config['rowlen']) {
                        RowlChange = true;
                    }
                    for (let copyC = c1; copyC <= c2; copyC++) {
                        if (Store.config['colhidden'] != null && Store.config['colhidden'][copyC] != null) {
                            continue;
                        }
                        if (!colIndexArr.includes(copyC)) {
                            colIndexArr.push(copyC);
                        }
                        let cell = Store.flowdata[copyR][copyC];
                        if (j.getObjType(cell) == 'object' && 'mc' in cell && cell.mc.rs != null) {
                            HasMC = true;
                        }
                    }
                }
                Store.luckysheet_selection_range.push({
                    'row': range.row,
                    'column': range.column
                });
                copyRange.push({
                    'row': range.row,
                    'column': range.column
                });
            }
            a.selectionCopyShow();
            Store.luckysheet_copy_save = {
                'dataSheetIndex': Store.currentSheetIndex,
                'copyRange': copyRange,
                'RowlChange': RowlChange,
                'HasMC': HasMC
            };
            let _this = this;
            let borderInfoCompute;
            if (Store.config['borderInfo'] && Store.config['borderInfo'].length > 0) {
                borderInfoCompute = c.getBorderInfoCompute();
            }
            let cpdata = '', d = editor.deepCopyFlowData(Store.flowdata);
            let colgroup = '';
            for (let i = 0; i < rowIndexArr.length; i++) {
                let r = rowIndexArr[i];
                if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r] != null) {
                    continue;
                }
                cpdata += '<tr>';
                for (let j = 0; j < colIndexArr.length; j++) {
                    let c = colIndexArr[j];
                    if (Store.config['colhidden'] != null && Store.config['colhidden'][c] != null) {
                        continue;
                    }
                    let column = '<td ${span} style="${style}">';
                    if (d[r] != null && d[r][c] != null) {
                        let style = '', span = '';
                        if (r == rowIndexArr[0]) {
                            if (Store.config == null || Store.config['columnlen'] == null || Store.config['columnlen'][c.toString()] == null) {
                                colgroup += '<colgroup width="72px"></colgroup>';
                            } else {
                                colgroup += '<colgroup width="' + Store.config['columnlen'][c.toString()] + 'px"></colgroup>';
                            }
                        }
                        if (c == colIndexArr[0]) {
                            if (Store.config == null || Store.config['rowlen'] == null || Store.config['rowlen'][r.toString()] == null) {
                                style += 'height:19px;';
                            } else {
                                style += 'height:' + Store.config['rowlen'][r.toString()] + 'px;';
                            }
                        }
                        let reg = /^(w|W)((0?)|(0\.0+))$/;
                        let c_value;
                        if (d[r][c].ct != null && d[r][c].ct.fa != null && d[r][c].ct.fa.match(reg)) {
                            c_value = d.getcellvalue(r, c, d);
                        } else {
                            c_value = d.getcellvalue(r, c, d, 'm');
                        }
                        style += menuButton.getStyleByCell(d, r, c);
                        if (j.getObjType(d[r][c]) == 'object' && 'mc' in d[r][c]) {
                            if ('rs' in d[r][c]['mc']) {
                                span = 'rowspan="' + d[r][c]['mc'].rs + '" colspan="' + d[r][c]['mc'].cs + '"';
                                if (borderInfoCompute && borderInfoCompute[r + '_' + c]) {
                                    let bl_obj = {
                                            'color': {},
                                            'style': {}
                                        }, br_obj = {
                                            'color': {},
                                            'style': {}
                                        }, bt_obj = {
                                            'color': {},
                                            'style': {}
                                        }, bb_obj = {
                                            'color': {},
                                            'style': {}
                                        };
                                    for (let bd_r = r; bd_r < r + d[r][c]['mc'].rs; bd_r++) {
                                        for (let bd_c = c; bd_c < c + d[r][c]['mc'].cs; bd_c++) {
                                            if (bd_r == r && borderInfoCompute[bd_r + '_' + bd_c] && borderInfoCompute[bd_r + '_' + bd_c].t) {
                                                let linetype = borderInfoCompute[bd_r + '_' + bd_c].t.style;
                                                let bcolor = borderInfoCompute[bd_r + '_' + bd_c].t.color;
                                                if (bt_obj['style'][linetype] == null) {
                                                    bt_obj['style'][linetype] = 1;
                                                } else {
                                                    bt_obj['style'][linetype] = bt_obj['style'][linetype] + 1;
                                                }
                                                if (bt_obj['color'][bcolor] == null) {
                                                    bt_obj['color'][bcolor] = 1;
                                                } else {
                                                    bt_obj['color'][bcolor] = bt_obj['color'][bcolor] + 1;
                                                }
                                            }
                                            if (bd_r == r + d[r][c]['mc'].rs - 1 && borderInfoCompute[bd_r + '_' + bd_c] && borderInfoCompute[bd_r + '_' + bd_c].b) {
                                                let linetype = borderInfoCompute[bd_r + '_' + bd_c].b.style;
                                                let bcolor = borderInfoCompute[bd_r + '_' + bd_c].b.color;
                                                if (bb_obj['style'][linetype] == null) {
                                                    bb_obj['style'][linetype] = 1;
                                                } else {
                                                    bb_obj['style'][linetype] = bb_obj['style'][linetype] + 1;
                                                }
                                                if (bb_obj['color'][bcolor] == null) {
                                                    bb_obj['color'][bcolor] = 1;
                                                } else {
                                                    bb_obj['color'][bcolor] = bb_obj['color'][bcolor] + 1;
                                                }
                                            }
                                            if (bd_c == c && borderInfoCompute[bd_r + '_' + bd_c] && borderInfoCompute[bd_r + '_' + bd_c].l) {
                                                let linetype = borderInfoCompute[r + '_' + c].l.style;
                                                let bcolor = borderInfoCompute[bd_r + '_' + bd_c].l.color;
                                                if (bl_obj['style'][linetype] == null) {
                                                    bl_obj['style'][linetype] = 1;
                                                } else {
                                                    bl_obj['style'][linetype] = bl_obj['style'][linetype] + 1;
                                                }
                                                if (bl_obj['color'][bcolor] == null) {
                                                    bl_obj['color'][bcolor] = 1;
                                                } else {
                                                    bl_obj['color'][bcolor] = bl_obj['color'][bcolor] + 1;
                                                }
                                            }
                                            if (bd_c == c + d[r][c]['mc'].cs - 1 && borderInfoCompute[bd_r + '_' + bd_c] && borderInfoCompute[bd_r + '_' + bd_c].r) {
                                                let linetype = borderInfoCompute[bd_r + '_' + bd_c].r.style;
                                                let bcolor = borderInfoCompute[bd_r + '_' + bd_c].r.color;
                                                if (br_obj['style'][linetype] == null) {
                                                    br_obj['style'][linetype] = 1;
                                                } else {
                                                    br_obj['style'][linetype] = br_obj['style'][linetype] + 1;
                                                }
                                                if (br_obj['color'][bcolor] == null) {
                                                    br_obj['color'][bcolor] = 1;
                                                } else {
                                                    br_obj['color'][bcolor] = br_obj['color'][bcolor] + 1;
                                                }
                                            }
                                        }
                                    }
                                    let rowlen = d[r][c]['mc'].rs, collen = d[r][c]['mc'].cs;
                                    if (JSON.stringify(bl_obj).length > 23) {
                                        let bl_color = null, bl_style = null;
                                        for (let x in bl_obj.color) {
                                            if (bl_obj.color[x] >= rowlen / 2) {
                                                bl_color = x;
                                            }
                                        }
                                        for (let x in bl_obj.style) {
                                            if (bl_obj.style[x] >= rowlen / 2) {
                                                bl_style = x;
                                            }
                                        }
                                        if (bl_color != null && bl_style != null) {
                                            style += 'border-left:' + _this.getHtmlBorderStyle(bl_style, bl_color);
                                        }
                                    }
                                    if (JSON.stringify(br_obj).length > 23) {
                                        let br_color = null, br_style = null;
                                        for (let x in br_obj.color) {
                                            if (br_obj.color[x] >= rowlen / 2) {
                                                br_color = x;
                                            }
                                        }
                                        for (let x in br_obj.style) {
                                            if (br_obj.style[x] >= rowlen / 2) {
                                                br_style = x;
                                            }
                                        }
                                        if (br_color != null && br_style != null) {
                                            style += 'border-right:' + _this.getHtmlBorderStyle(br_style, br_color);
                                        }
                                    }
                                    if (JSON.stringify(bt_obj).length > 23) {
                                        let bt_color = null, bt_style = null;
                                        for (let x in bt_obj.color) {
                                            if (bt_obj.color[x] >= collen / 2) {
                                                bt_color = x;
                                            }
                                        }
                                        for (let x in bt_obj.style) {
                                            if (bt_obj.style[x] >= collen / 2) {
                                                bt_style = x;
                                            }
                                        }
                                        if (bt_color != null && bt_style != null) {
                                            style += 'border-top:' + _this.getHtmlBorderStyle(bt_style, bt_color);
                                        }
                                    }
                                    if (JSON.stringify(bb_obj).length > 23) {
                                        let bb_color = null, bb_style = null;
                                        for (let x in bb_obj.color) {
                                            if (bb_obj.color[x] >= collen / 2) {
                                                bb_color = x;
                                            }
                                        }
                                        for (let x in bb_obj.style) {
                                            if (bb_obj.style[x] >= collen / 2) {
                                                bb_style = x;
                                            }
                                        }
                                        if (bb_color != null && bb_style != null) {
                                            style += 'border-bottom:' + _this.getHtmlBorderStyle(bb_style, bb_color);
                                        }
                                    }
                                }
                            } else {
                                continue;
                            }
                        } else {
                            if (borderInfoCompute && borderInfoCompute[r + '_' + c]) {
                                if (borderInfoCompute[r + '_' + c].l) {
                                    let linetype = borderInfoCompute[r + '_' + c].l.style;
                                    let bcolor = borderInfoCompute[r + '_' + c].l.color;
                                    style += 'border-left:' + _this.getHtmlBorderStyle(linetype, bcolor);
                                }
                                if (borderInfoCompute[r + '_' + c].r) {
                                    let linetype = borderInfoCompute[r + '_' + c].r.style;
                                    let bcolor = borderInfoCompute[r + '_' + c].r.color;
                                    style += 'border-right:' + _this.getHtmlBorderStyle(linetype, bcolor);
                                }
                                if (borderInfoCompute[r + '_' + c].b) {
                                    let linetype = borderInfoCompute[r + '_' + c].b.style;
                                    let bcolor = borderInfoCompute[r + '_' + c].b.color;
                                    style += 'border-bottom:' + _this.getHtmlBorderStyle(linetype, bcolor);
                                }
                                if (borderInfoCompute[r + '_' + c].t) {
                                    let linetype = borderInfoCompute[r + '_' + c].t.style;
                                    let bcolor = borderInfoCompute[r + '_' + c].t.color;
                                    style += 'border-top:' + _this.getHtmlBorderStyle(linetype, bcolor);
                                }
                            }
                        }
                        column = j.replaceHtml(column, {
                            'style': style,
                            'span': span
                        });
                        if (c_value == null) {
                            c_value = d.getcellvalue(r, c, d);
                        }
                        if (c_value == null) {
                            c_value = '';
                        }
                        column += c_value;
                    } else {
                        let style = '';
                        if (borderInfoCompute && borderInfoCompute[r + '_' + c]) {
                            if (borderInfoCompute[r + '_' + c].l) {
                                let linetype = borderInfoCompute[r + '_' + c].l.style;
                                let bcolor = borderInfoCompute[r + '_' + c].l.color;
                                style += 'border-left:' + _this.getHtmlBorderStyle(linetype, bcolor);
                            }
                            if (borderInfoCompute[r + '_' + c].r) {
                                let linetype = borderInfoCompute[r + '_' + c].r.style;
                                let bcolor = borderInfoCompute[r + '_' + c].r.color;
                                style += 'border-right:' + _this.getHtmlBorderStyle(linetype, bcolor);
                            }
                            if (borderInfoCompute[r + '_' + c].b) {
                                let linetype = borderInfoCompute[r + '_' + c].b.style;
                                let bcolor = borderInfoCompute[r + '_' + c].b.color;
                                style += 'border-bottom:' + _this.getHtmlBorderStyle(linetype, bcolor);
                            }
                            if (borderInfoCompute[r + '_' + c].t) {
                                let linetype = borderInfoCompute[r + '_' + c].t.style;
                                let bcolor = borderInfoCompute[r + '_' + c].t.color;
                                style += 'border-top:' + _this.getHtmlBorderStyle(linetype, bcolor);
                            }
                        }
                        column += '';
                        if (r == rowIndexArr[0]) {
                            if (Store.config == null || Store.config['columnlen'] == null || Store.config['columnlen'][c.toString()] == null) {
                                colgroup += '<colgroup width="72px"></colgroup>';
                            } else {
                                colgroup += '<colgroup width="' + Store.config['columnlen'][c.toString()] + 'px"></colgroup>';
                            }
                        }
                        if (c == colIndexArr[0]) {
                            if (Store.config == null || Store.config['rowlen'] == null || Store.config['rowlen'][r.toString()] == null) {
                                style += 'height:19px;';
                            } else {
                                style += 'height:' + Store.config['rowlen'][r.toString()] + 'px;';
                            }
                        }
                        column = j.replaceHtml(column, {
                            'style': style,
                            'span': ''
                        });
                        column += '';
                    }
                    column += '</td>';
                    cpdata += column;
                }
                cpdata += '</tr>';
            }
            cpdata = '<table data-type="luckysheet_copy_action_table">' + colgroup + cpdata + '</table>';
            Store.iscopyself = true;
            if (!clipboardData) {
                var oInput = document.createElement('input');
                oInput.setAttribute('readonly', 'readonly');
                oInput.value = cpdata;
                document.body.appendChild(oInput);
                oInput.select();
                document.execCommand('Copy');
                oInput.style.display = 'none';
                document.body.removeChild(oInput);
            } else {
                clipboardData.setData('Text', cpdata);
                return false;
            }
        },
        copybyformat: function (e, txt) {
            let clipboardData = window.clipboardData;
            if (!clipboardData) {
                clipboardData = e.originalEvent && e.originalEvent.clipboardData;
            }
            Store.luckysheet_selection_range = [{
                    'row': Store.luckysheet_select_save[0].row,
                    'column': Store.luckysheet_select_save[0].column
                }];
            a.selectionCopyShow();
            let cpdata = txt;
            Store.iscopyself = true;
            if (!clipboardData) {
                let textarea = $('#luckysheet-copy-content');
                textarea.text(cpdata);
                textarea.focus();
                textarea.select();
                document.execCommand('selectAll');
                document.execCommand('Copy');
                setTimeout(function () {
                    textarea.blur();
                }, 10);
            } else {
                clipboardData.setData('Text', cpdata);
                return false;
            }
        },
        isPasteAction: false,
        paste: function (e, triggerType) {
            let _this = this;
            if (Store.allowEdit === false) {
                return;
            }
            const _locale = locale();
            const local_drag = _locale.drag;
            let textarea = $('#luckysheet-copy-content');
            textarea.focus();
            textarea.select();
            setTimeout(function () {
                let data = textarea.html();
                if (data.indexOf('luckysheet_copy_action_table') > -1 && Store.luckysheet_copy_save['copyRange'] != null && Store.luckysheet_copy_save['copyRange'].length > 0) {
                    if (Store.luckysheet_paste_iscut) {
                        Store.luckysheet_paste_iscut = false;
                        _this.pasteHandlerOfCutPaste(Store.luckysheet_copy_save);
                        _this.clearcopy(e);
                    } else {
                        _this.pasteHandlerOfCopyPaste(Store.luckysheet_copy_save);
                    }
                } else if (triggerType != 'btn') {
                    _this.pasteHandler(data);
                } else {
                    if (f.isEditMode()) {
                        alert(local_drag.pasteMustKeybordAlert);
                    } else {
                        tooltip.info(local_drag.pasteMustKeybordAlertHTMLTitle, local_drag.pasteMustKeybordAlertHTML);
                    }
                }
            }, 10);
        },
        pasteHandler: function (data, borderInfo) {
            if (!b.checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }
            if (Store.allowEdit === false) {
                return;
            }
            if (Store.luckysheet_select_save.length > 1) {
                if (f.isEditMode()) {
                    alert('不能对多重选择区域执行此操作\uFF0C请选择单个区域\uFF0C然后再试');
                } else {
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', '不能对多重选择区域执行此操作\uFF0C请选择单个区域\uFF0C然后再试');
                }
            }
            if (typeof data == 'object') {
                if (data.length == 0) {
                    return;
                }
                ;
                let cfg = $.extend(true, {}, Store.config);
                if (cfg['merge'] == null) {
                    cfg['merge'] = {};
                }
                if (JSON.stringify(borderInfo).length > 2 && cfg['borderInfo'] == null) {
                    cfg['borderInfo'] = [];
                }
                let copyh = data.length, copyc = data[0].length;
                let minh = Store.luckysheet_select_save[0].row[0], maxh = minh + copyh - 1;
                let minc = Store.luckysheet_select_save[0].column[0], maxc = minc + copyc - 1;
                let has_PartMC = false;
                if (cfg['merge'] != null) {
                    has_PartMC = f.hasPartMC(cfg, minh, maxh, minc, maxc);
                }
                if (has_PartMC) {
                    if (f.isEditMode()) {
                        alert('不能对合并单元格做部分更改');
                    } else {
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', '不能对合并单元格做部分更改');
                    }
                    return;
                }
                let d = editor.deepCopyFlowData(Store.flowdata);
                let rowMaxLength = d.length;
                let cellMaxLength = d[0].length;
                let addr = maxh - rowMaxLength + 1, addc = maxc - cellMaxLength + 1;
                if (addr > 0 || addc > 0) {
                    d = d.datagridgrowth([].concat(d), addr, addc, true);
                }
                if (cfg['rowlen'] == null) {
                    cfg['rowlen'] = {};
                }
                let RowlChange = false;
                let offsetMC = {};
                for (let h = minh; h <= maxh; h++) {
                    let x = [].concat(d[h]);
                    let currentRowLen = Store.defaultrowlen;
                    if (cfg['rowlen'][h] != null) {
                        currentRowLen = cfg['rowlen'][h];
                    }
                    for (let c = minc; c <= maxc; c++) {
                        if (j.getObjType(x[c]) == 'object' && 'mc' in x[c]) {
                            if ('rs' in x[c].mc) {
                                delete cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c];
                            }
                            delete x[c].mc;
                        }
                        let value = null;
                        if (data[h - minh] != null && data[h - minh][c - minc] != null) {
                            value = data[h - minh][c - minc];
                        }
                        x[c] = $.extend(true, {}, value);
                        if (value != null && 'mc' in x[c]) {
                            if (x[c]['mc'].rs != null) {
                                x[c]['mc'].r = h;
                                x[c]['mc'].c = c;
                                cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c] = x[c]['mc'];
                                offsetMC[value['mc'].r + '_' + value['mc'].c] = [
                                    x[c]['mc'].r,
                                    x[c]['mc'].c
                                ];
                            } else {
                                x[c] = {
                                    'mc': {
                                        r: offsetMC[value['mc'].r + '_' + value['mc'].c][0],
                                        c: offsetMC[value['mc'].r + '_' + value['mc'].c][1]
                                    }
                                };
                            }
                        }
                        if (borderInfo[h - minh + '_' + (c - minc)]) {
                            let bd_obj = {
                                'rangeType': 'cell',
                                'value': {
                                    'row_index': h,
                                    'col_index': c,
                                    'l': borderInfo[h - minh + '_' + (c - minc)].l,
                                    'r': borderInfo[h - minh + '_' + (c - minc)].r,
                                    't': borderInfo[h - minh + '_' + (c - minc)].t,
                                    'b': borderInfo[h - minh + '_' + (c - minc)].b
                                }
                            };
                            cfg['borderInfo'].push(bd_obj);
                        }
                        let fontset = j.luckysheetfontformat(x[c]);
                        let oneLineTextHeight = menuButton.getTextSize('田', fontset)[1];
                        if (oneLineTextHeight > currentRowLen) {
                            currentRowLen = oneLineTextHeight;
                            RowlChange = true;
                        }
                    }
                    d[h] = x;
                    if (currentRowLen != Store.defaultrowlen) {
                        cfg['rowlen'][h] = currentRowLen;
                    }
                }
                Store.luckysheet_select_save = [{
                        'row': [
                            minh,
                            maxh
                        ],
                        'column': [
                            minc,
                            maxc
                        ]
                    }];
                if (addr > 0 || addc > 0 || RowlChange) {
                    let allParam = {
                        'cfg': cfg,
                        'RowlChange': true
                    };
                    g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
                } else {
                    let allParam = { 'cfg': cfg };
                    g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
                    a.selectHightlightShow();
                }
            } else {
                data = data.replace(/\r/g, '');
                let dataChe = [];
                let che = data.split('\n'), colchelen = che[0].split('\t').length;
                for (let i = 0; i < che.length; i++) {
                    if (che[i].split('\t').length < colchelen) {
                        continue;
                    }
                    dataChe.push(che[i].split('\t'));
                }
                let d = editor.deepCopyFlowData(Store.flowdata);
                let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
                let curR = last['row'] == null ? 0 : last['row'][0];
                let curC = last['column'] == null ? 0 : last['column'][0];
                let rlen = dataChe.length, clen = dataChe[0].length;
                let has_PartMC = false;
                if (Store.config['merge'] != null) {
                    has_PartMC = f.hasPartMC(Store.config, curR, curR + rlen - 1, curC, curC + clen - 1);
                }
                if (has_PartMC) {
                    if (f.isEditMode()) {
                        alert('不能对合并单元格做部分更改');
                    } else {
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', '不能对合并单元格做部分更改');
                    }
                    return;
                }
                let addr = curR + rlen - d.length, addc = curC + clen - d[0].length;
                if (addr > 0 || addc > 0) {
                    d = d.datagridgrowth([].concat(d), addr, addc, true);
                }
                for (let r = 0; r < rlen; r++) {
                    let x = [].concat(d[r + curR]);
                    for (let c = 0; c < clen; c++) {
                        let originCell = x[c + curC];
                        let value = dataChe[r][c];
                        if (f.isRealNum(value)) {
                            if (originCell && originCell.ct && originCell.ct.fa === '@') {
                                value = String(value);
                            } else {
                                value = parseFloat(value);
                            }
                        }
                        if (originCell instanceof Object) {
                            originCell.v = value;
                            if (originCell.ct != null && originCell.ct.fa != null) {
                                originCell.m = h.update(originCell['ct']['fa'], value);
                            } else {
                                originCell.m = value;
                            }
                            if (originCell.f != null && originCell.f.length > 0) {
                                originCell.f = '';
                                formula.delFunctionGroup(r + curR, c + curC, Store.currentSheetIndex);
                            }
                        } else {
                            let cell = {};
                            let mask = h.genarate(value);
                            cell.v = mask[2];
                            cell.ct = mask[1];
                            cell.m = mask[0];
                            x[c + curC] = cell;
                        }
                    }
                    d[r + curR] = x;
                }
                last['row'] = [
                    curR,
                    curR + rlen - 1
                ];
                last['column'] = [
                    curC,
                    curC + clen - 1
                ];
                if (addr > 0 || addc > 0) {
                    let allParam = { 'RowlChange': true };
                    g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
                } else {
                    g.jfrefreshgrid(d, Store.luckysheet_select_save);
                    a.selectHightlightShow();
                }
            }
        },
        pasteHandlerOfCutPaste: function (copyRange) {
            if (!b.checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }
            if (Store.allowEdit === false) {
                return;
            }
            let cfg = $.extend(true, {}, Store.config);
            if (cfg['merge'] == null) {
                cfg['merge'] = {};
            }
            let copyHasMC = copyRange['HasMC'];
            let copyRowlChange = copyRange['RowlChange'];
            let copySheetIndex = copyRange['dataSheetIndex'];
            let c_r1 = copyRange['copyRange'][0].row[0], c_r2 = copyRange['copyRange'][0].row[1], c_c1 = copyRange['copyRange'][0].column[0], c_c2 = copyRange['copyRange'][0].column[1];
            let copyData = $.extend(true, [], d.getdatabyselection({
                'row': [
                    c_r1,
                    c_r2
                ],
                'column': [
                    c_c1,
                    c_c2
                ]
            }, copySheetIndex));
            let copyh = copyData.length, copyc = copyData[0].length;
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let minh = last['row_focus'], maxh = minh + copyh - 1;
            let minc = last['column_focus'], maxc = minc + copyc - 1;
            let has_PartMC = false;
            if (cfg['merge'] != null) {
                has_PartMC = f.hasPartMC(cfg, minh, maxh, minc, maxc);
            }
            if (has_PartMC) {
                if (f.isEditMode()) {
                    alert('不能对合并单元格做部分更改');
                } else {
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', '不能对合并单元格做部分更改');
                }
                return;
            }
            let d = editor.deepCopyFlowData(Store.flowdata);
            let rowMaxLength = d.length;
            let cellMaxLength = d[0].length;
            let addr = copyh + minh - rowMaxLength, addc = copyc + minc - cellMaxLength;
            if (addr > 0 || addc > 0) {
                d = d.datagridgrowth([].concat(d), addr, addc, true);
            }
            let borderInfoCompute = c.getBorderInfoCompute(copySheetIndex);
            let c_dataVerification = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(copySheetIndex)]['dataVerification']);
            let dataVerification = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['dataVerification']);
            if (Store.currentSheetIndex == copySheetIndex) {
                for (let i = c_r1; i <= c_r2; i++) {
                    for (let j = c_c1; j <= c_c2; j++) {
                        let cell = d[i][j];
                        if (j.getObjType(cell) == 'object' && 'mc' in cell) {
                            if ('rs' in cell['mc']) {
                                delete cfg['merge'][cell['mc'].r + '_' + cell['mc'].c];
                            }
                            delete cell['mc'];
                        }
                        d[i][j] = null;
                        delete dataVerification[i + '_' + j];
                    }
                }
                if (cfg['borderInfo'] && cfg['borderInfo'].length > 0) {
                    let source_borderInfo = [];
                    for (let i = 0; i < cfg['borderInfo'].length; i++) {
                        let bd_rangeType = cfg['borderInfo'][i].rangeType;
                        if (bd_rangeType == 'range') {
                            let bd_range = cfg['borderInfo'][i].range;
                            let bd_emptyRange = [];
                            for (let j = 0; j < bd_range.length; j++) {
                                bd_emptyRange = bd_emptyRange.concat(conditionformat.CFSplitRange(bd_range[j], {
                                    'row': [
                                        c_r1,
                                        c_r2
                                    ],
                                    'column': [
                                        c_c1,
                                        c_c2
                                    ]
                                }, {
                                    'row': [
                                        minh,
                                        maxh
                                    ],
                                    'column': [
                                        minc,
                                        maxc
                                    ]
                                }, 'restPart'));
                            }
                            cfg['borderInfo'][i].range = bd_emptyRange;
                            source_borderInfo.push(cfg['borderInfo'][i]);
                        } else if (bd_rangeType == 'cell') {
                            let bd_r = cfg['borderInfo'][i].value.row_index;
                            let bd_c = cfg['borderInfo'][i].value.col_index;
                            if (!(bd_r >= c_r1 && bd_r <= c_r2 && bd_c >= c_c1 && bd_c <= c_c2)) {
                                source_borderInfo.push(cfg['borderInfo'][i]);
                            }
                        }
                    }
                    cfg['borderInfo'] = source_borderInfo;
                }
            }
            let offsetMC = {};
            for (let h = minh; h <= maxh; h++) {
                let x = [].concat(d[h]);
                for (let c = minc; c <= maxc; c++) {
                    if (borderInfoCompute[c_r1 + h - minh + '_' + (c_c1 + c - minc)]) {
                        let bd_obj = {
                            'rangeType': 'cell',
                            'value': {
                                'row_index': h,
                                'col_index': c,
                                'l': borderInfoCompute[c_r1 + h - minh + '_' + (c_c1 + c - minc)].l,
                                'r': borderInfoCompute[c_r1 + h - minh + '_' + (c_c1 + c - minc)].r,
                                't': borderInfoCompute[c_r1 + h - minh + '_' + (c_c1 + c - minc)].t,
                                'b': borderInfoCompute[c_r1 + h - minh + '_' + (c_c1 + c - minc)].b
                            }
                        };
                        if (cfg['borderInfo'] == null) {
                            cfg['borderInfo'] = [];
                        }
                        cfg['borderInfo'].push(bd_obj);
                    } else if (borderInfoCompute[h + '_' + c]) {
                        let bd_obj = {
                            'rangeType': 'cell',
                            'value': {
                                'row_index': h,
                                'col_index': c,
                                'l': null,
                                'r': null,
                                't': null,
                                'b': null
                            }
                        };
                        if (cfg['borderInfo'] == null) {
                            cfg['borderInfo'] = [];
                        }
                        cfg['borderInfo'].push(bd_obj);
                    }
                    if (c_dataVerification[c_r1 + h - minh + '_' + (c_c1 + c - minc)]) {
                        dataVerification[h + '_' + c] = c_dataVerification[c_r1 + h - minh + '_' + (c_c1 + c - minc)];
                    }
                    if (j.getObjType(x[c]) == 'object' && 'mc' in x[c]) {
                        if ('rs' in x[c].mc) {
                            delete cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c];
                        }
                        delete x[c].mc;
                    }
                    let value = null;
                    if (copyData[h - minh] != null && copyData[h - minh][c - minc] != null) {
                        value = copyData[h - minh][c - minc];
                    }
                    x[c] = $.extend(true, {}, value);
                    if (value != null && copyHasMC && 'mc' in x[c]) {
                        if (x[c]['mc'].rs != null) {
                            x[c]['mc'].r = h;
                            x[c]['mc'].c = c;
                            cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c] = x[c]['mc'];
                            offsetMC[value['mc'].r + '_' + value['mc'].c] = [
                                x[c]['mc'].r,
                                x[c]['mc'].c
                            ];
                        } else {
                            x[c] = {
                                'mc': {
                                    r: offsetMC[value['mc'].r + '_' + value['mc'].c][0],
                                    c: offsetMC[value['mc'].r + '_' + value['mc'].c][1]
                                }
                            };
                        }
                    }
                }
                d[h] = x;
            }
            last['row'] = [
                minh,
                maxh
            ];
            last['column'] = [
                minc,
                maxc
            ];
            if (copyRowlChange) {
                if (Store.currentSheetIndex != copySheetIndex) {
                    cfg = e.rowlenByRange(d, minh, maxh, cfg);
                } else {
                    cfg = e.rowlenByRange(d, c_r1, c_r2, cfg);
                    cfg = e.rowlenByRange(d, minh, maxh, cfg);
                }
            }
            let source, target;
            if (Store.currentSheetIndex != copySheetIndex) {
                let sourceData = $.extend(true, [], Store.luckysheetfile[i.getSheetIndex(copySheetIndex)]['data']);
                let sourceConfig = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(copySheetIndex)]['config']);
                let sourceCurData = $.extend(true, [], sourceData);
                let sourceCurConfig = $.extend(true, {}, sourceConfig);
                if (sourceCurConfig['merge'] == null) {
                    sourceCurConfig['merge'] = {};
                }
                for (let source_r = c_r1; source_r <= c_r2; source_r++) {
                    for (let source_c = c_c1; source_c <= c_c2; source_c++) {
                        let cell = sourceCurData[source_r][source_c];
                        if (j.getObjType(cell) == 'object' && 'mc' in cell) {
                            if ('rs' in cell['mc']) {
                                delete sourceCurConfig['merge'][cell['mc'].r + '_' + cell['mc'].c];
                            }
                            delete cell['mc'];
                        }
                        sourceCurData[source_r][source_c] = null;
                    }
                }
                if (copyRowlChange) {
                    sourceCurConfig = e.rowlenByRange(sourceCurData, c_r1, c_r2, sourceCurConfig);
                }
                if (sourceCurConfig['borderInfo'] && sourceCurConfig['borderInfo'].length > 0) {
                    let source_borderInfo = [];
                    for (let i = 0; i < sourceCurConfig['borderInfo'].length; i++) {
                        let bd_rangeType = sourceCurConfig['borderInfo'][i].rangeType;
                        if (bd_rangeType == 'range') {
                            let bd_range = sourceCurConfig['borderInfo'][i].range;
                            let bd_emptyRange = [];
                            for (let j = 0; j < bd_range.length; j++) {
                                bd_emptyRange = bd_emptyRange.concat(conditionformat.CFSplitRange(bd_range[j], {
                                    'row': [
                                        c_r1,
                                        c_r2
                                    ],
                                    'column': [
                                        c_c1,
                                        c_c2
                                    ]
                                }, {
                                    'row': [
                                        minh,
                                        maxh
                                    ],
                                    'column': [
                                        minc,
                                        maxc
                                    ]
                                }, 'restPart'));
                            }
                            sourceCurConfig['borderInfo'][i].range = bd_emptyRange;
                            source_borderInfo.push(sourceCurConfig['borderInfo'][i]);
                        } else if (bd_rangeType == 'cell') {
                            let bd_r = sourceCurConfig['borderInfo'][i].value.row_index;
                            let bd_c = sourceCurConfig['borderInfo'][i].value.col_index;
                            if (!(bd_r >= c_r1 && bd_r <= c_r2 && bd_c >= c_c1 && bd_c <= c_c2)) {
                                source_borderInfo.push(sourceCurConfig['borderInfo'][i]);
                            }
                        }
                    }
                    sourceCurConfig['borderInfo'] = source_borderInfo;
                }
                let source_cdformat = $.extend(true, [], Store.luckysheetfile[i.getSheetIndex(copySheetIndex)]['luckysheet_conditionformat_save']);
                let source_curCdformat = $.extend(true, [], source_cdformat);
                let ruleArr = [];
                if (source_curCdformat != null && source_curCdformat.length > 0) {
                    for (let i = 0; i < source_curCdformat.length; i++) {
                        let source_curCdformat_cellrange = source_curCdformat[i].cellrange;
                        let emptyRange = [];
                        let emptyRange2 = [];
                        for (let j = 0; j < source_curCdformat_cellrange.length; j++) {
                            let range = conditionformat.CFSplitRange(source_curCdformat_cellrange[j], {
                                'row': [
                                    c_r1,
                                    c_r2
                                ],
                                'column': [
                                    c_c1,
                                    c_c2
                                ]
                            }, {
                                'row': [
                                    minh,
                                    maxh
                                ],
                                'column': [
                                    minc,
                                    maxc
                                ]
                            }, 'restPart');
                            emptyRange = emptyRange.concat(range);
                            let range2 = conditionformat.CFSplitRange(source_curCdformat_cellrange[j], {
                                'row': [
                                    c_r1,
                                    c_r2
                                ],
                                'column': [
                                    c_c1,
                                    c_c2
                                ]
                            }, {
                                'row': [
                                    minh,
                                    maxh
                                ],
                                'column': [
                                    minc,
                                    maxc
                                ]
                            }, 'operatePart');
                            if (range2.length > 0) {
                                emptyRange2 = emptyRange2.concat(range2);
                            }
                        }
                        source_curCdformat[i].cellrange = emptyRange;
                        if (emptyRange2.length > 0) {
                            let ruleObj = $.extend(true, {}, source_curCdformat[i]);
                            ruleObj.cellrange = emptyRange2;
                            ruleArr.push(ruleObj);
                        }
                    }
                }
                let target_cdformat = $.extend(true, [], Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save']);
                let target_curCdformat = $.extend(true, [], target_cdformat);
                if (ruleArr.length > 0) {
                    target_curCdformat = target_curCdformat.concat(ruleArr);
                }
                for (let i = c_r1; i <= c_r2; i++) {
                    for (let j = c_c1; j <= c_c2; j++) {
                        delete c_dataVerification[i + '_' + j];
                    }
                }
                source = {
                    'sheetIndex': copySheetIndex,
                    'data': sourceData,
                    'curData': sourceCurData,
                    'config': sourceConfig,
                    'curConfig': sourceCurConfig,
                    'cdformat': source_cdformat,
                    'curCdformat': source_curCdformat,
                    'dataVerification': $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(copySheetIndex)]['dataVerification']),
                    'curDataVerification': c_dataVerification,
                    'range': {
                        'row': [
                            c_r1,
                            c_r2
                        ],
                        'column': [
                            c_c1,
                            c_c2
                        ]
                    }
                };
                target = {
                    'sheetIndex': Store.currentSheetIndex,
                    'data': Store.flowdata,
                    'curData': d,
                    'config': $.extend(true, {}, Store.config),
                    'curConfig': cfg,
                    'cdformat': target_cdformat,
                    'curCdformat': target_curCdformat,
                    'dataVerification': $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['dataVerification']),
                    'curDataVerification': dataVerification,
                    'range': {
                        'row': [
                            minh,
                            maxh
                        ],
                        'column': [
                            minc,
                            maxc
                        ]
                    }
                };
            } else {
                let cdformat = $.extend(true, [], Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save']);
                let curCdformat = $.extend(true, [], cdformat);
                if (curCdformat != null && curCdformat.length > 0) {
                    for (let i = 0; i < curCdformat.length; i++) {
                        let cellrange = curCdformat[i].cellrange;
                        let emptyRange = [];
                        for (let j = 0; j < cellrange.length; j++) {
                            let range = conditionformat.CFSplitRange(cellrange[j], {
                                'row': [
                                    c_r1,
                                    c_r2
                                ],
                                'column': [
                                    c_c1,
                                    c_c2
                                ]
                            }, {
                                'row': [
                                    minh,
                                    maxh
                                ],
                                'column': [
                                    minc,
                                    maxc
                                ]
                            }, 'allPart');
                            emptyRange = emptyRange.concat(range);
                        }
                        curCdformat[i].cellrange = emptyRange;
                    }
                }
                source = {
                    'sheetIndex': Store.currentSheetIndex,
                    'data': Store.flowdata,
                    'curData': d,
                    'config': $.extend(true, {}, Store.config),
                    'curConfig': cfg,
                    'cdformat': cdformat,
                    'curCdformat': curCdformat,
                    'dataVerification': $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['dataVerification']),
                    'curDataVerification': dataVerification,
                    'range': {
                        'row': [
                            c_r1,
                            c_r2
                        ],
                        'column': [
                            c_c1,
                            c_c2
                        ]
                    }
                };
                target = {
                    'sheetIndex': Store.currentSheetIndex,
                    'data': Store.flowdata,
                    'curData': d,
                    'config': $.extend(true, {}, Store.config),
                    'curConfig': cfg,
                    'cdformat': cdformat,
                    'curCdformat': curCdformat,
                    'dataVerification': $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['dataVerification']),
                    'curDataVerification': dataVerification,
                    'range': {
                        'row': [
                            minh,
                            maxh
                        ],
                        'column': [
                            minc,
                            maxc
                        ]
                    }
                };
            }
            if (addr > 0 || addc > 0) {
                g.jfrefreshgrid_pastcut(source, target, true);
            } else {
                g.jfrefreshgrid_pastcut(source, target, copyRowlChange);
            }
        },
        pasteHandlerOfCopyPaste: function (copyRange) {
            if (!b.checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }
            let cfg = $.extend(true, {}, Store.config);
            if (cfg['merge'] == null) {
                cfg['merge'] = {};
            }
            let copyHasMC = copyRange['HasMC'];
            let copyRowlChange = copyRange['RowlChange'];
            let copySheetIndex = copyRange['dataSheetIndex'];
            let c_r1 = copyRange['copyRange'][0].row[0], c_r2 = copyRange['copyRange'][0].row[1], c_c1 = copyRange['copyRange'][0].column[0], c_c2 = copyRange['copyRange'][0].column[1];
            let arr = [], isSameRow = false;
            for (let i = 0; i < copyRange['copyRange'].length; i++) {
                let arrData = d.getdatabyselection({
                    'row': copyRange['copyRange'][i].row,
                    'column': copyRange['copyRange'][i].column
                }, copySheetIndex);
                if (copyRange['copyRange'].length > 1) {
                    if (c_r1 == copyRange['copyRange'][1].row[0] && c_r2 == copyRange['copyRange'][1].row[1]) {
                        arrData = arrData[0].map(function (col, a) {
                            return arrData.map(function (row) {
                                return row[a];
                            });
                        });
                        arr = arr.concat(arrData);
                        isSameRow = true;
                    } else if (c_c1 == copyRange['copyRange'][1].column[0] && c_c2 == copyRange['copyRange'][1].column[1]) {
                        arr = arr.concat(arrData);
                    }
                } else {
                    arr = arrData;
                }
            }
            if (isSameRow) {
                arr = arr[0].map(function (col, b) {
                    return arr.map(function (row) {
                        return row[b];
                    });
                });
            }
            let copyData = $.extend(true, [], arr);
            if (copyRange['copyRange'].length > 1) {
                for (let i = 0; i < copyData.length; i++) {
                    for (let j = 0; j < copyData[i].length; j++) {
                        if (copyData[i][j] != null && copyData[i][j].f != null) {
                            delete copyData[i][j].f;
                            delete copyData[i][j].spl;
                        }
                    }
                }
            }
            let copyh = copyData.length, copyc = copyData[0].length;
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let minh = last['row'][0], maxh = last['row'][1];
            let minc = last['column'][0], maxc = last['column'][1];
            let mh = (maxh - minh + 1) % copyh;
            let mc = (maxc - minc + 1) % copyc;
            if (mh != 0 || mc != 0) {
                maxh = minh + copyh - 1;
                maxc = minc + copyc - 1;
            }
            let has_PartMC = false;
            if (cfg['merge'] != null) {
                has_PartMC = f.hasPartMC(cfg, minh, maxh, minc, maxc);
            }
            if (has_PartMC) {
                if (f.isEditMode()) {
                    alert('不能对合并单元格做部分更改');
                } else {
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', '不能对合并单元格做部分更改');
                }
                return;
            }
            let timesH = (maxh - minh + 1) / copyh;
            let timesC = (maxc - minc + 1) / copyc;
            let d = editor.deepCopyFlowData(Store.flowdata);
            let rowMaxLength = d.length;
            let cellMaxLength = d[0].length;
            let addr = copyh + minh - rowMaxLength, addc = copyc + minc - cellMaxLength;
            if (addr > 0 || addc > 0) {
                d = d.datagridgrowth([].concat(d), addr, addc, true);
            }
            let borderInfoCompute = c.getBorderInfoCompute(copySheetIndex);
            let c_dataVerification = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(copySheetIndex)].dataVerification);
            let dataVerification = null;
            let mth = 0, mtc = 0, maxcellCahe = 0, maxrowCache = 0;
            for (let th = 1; th <= timesH; th++) {
                for (let tc = 1; tc <= timesC; tc++) {
                    mth = minh + (th - 1) * copyh;
                    mtc = minc + (tc - 1) * copyc;
                    maxrowCache = minh + th * copyh;
                    maxcellCahe = minc + tc * copyc;
                    let offsetRow = mth - c_r1;
                    let offsetCol = mtc - c_c1;
                    let offsetMC = {};
                    for (let h = mth; h < maxrowCache; h++) {
                        let x = [].concat(d[h]);
                        for (let c = mtc; c < maxcellCahe; c++) {
                            if (borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)]) {
                                let bd_obj = {
                                    'rangeType': 'cell',
                                    'value': {
                                        'row_index': h,
                                        'col_index': c,
                                        'l': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].l,
                                        'r': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].r,
                                        't': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].t,
                                        'b': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].b
                                    }
                                };
                                if (cfg['borderInfo'] == null) {
                                    cfg['borderInfo'] = [];
                                }
                                cfg['borderInfo'].push(bd_obj);
                            } else if (borderInfoCompute[h + '_' + c]) {
                                let bd_obj = {
                                    'rangeType': 'cell',
                                    'value': {
                                        'row_index': h,
                                        'col_index': c,
                                        'l': null,
                                        'r': null,
                                        't': null,
                                        'b': null
                                    }
                                };
                                if (cfg['borderInfo'] == null) {
                                    cfg['borderInfo'] = [];
                                }
                                cfg['borderInfo'].push(bd_obj);
                            }
                            if (c_dataVerification[c_r1 + h - mth + '_' + (c_c1 + c - mtc)]) {
                                if (dataVerification == null) {
                                    dataVerification = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)].dataVerification);
                                }
                                dataVerification[h + '_' + c] = c_dataVerification[c_r1 + h - mth + '_' + (c_c1 + c - mtc)];
                            }
                            if (j.getObjType(x[c]) == 'object' && 'mc' in x[c]) {
                                if ('rs' in x[c].mc) {
                                    delete cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c];
                                }
                                delete x[c].mc;
                            }
                            let value = null;
                            if (copyData[h - mth] != null && copyData[h - mth][c - mtc] != null) {
                                value = $.extend(true, {}, copyData[h - mth][c - mtc]);
                            }
                            if (value != null && value.f != null) {
                                let func = value.f;
                                if (offsetRow > 0) {
                                    func = '=' + formula.functionCopy(func, 'down', offsetRow);
                                }
                                if (offsetRow < 0) {
                                    func = '=' + formula.functionCopy(func, 'up', Math.abs(offsetRow));
                                }
                                if (offsetCol > 0) {
                                    func = '=' + formula.functionCopy(func, 'right', offsetCol);
                                }
                                if (offsetCol < 0) {
                                    func = '=' + formula.functionCopy(func, 'left', Math.abs(offsetCol));
                                }
                                let funcV = formula.execfunction(func, h, c, undefined, true);
                                if (value.spl != null) {
                                    value.f = funcV[2];
                                    value.v = funcV[1];
                                    value.spl = funcV[3].data;
                                } else {
                                    value.f = funcV[2];
                                    value.v = funcV[1];
                                    if (value.ct != null && value.ct['fa'] != null) {
                                        value.m = h.update(value.ct['fa'], funcV[1]);
                                    }
                                }
                            }
                            x[c] = $.extend(true, {}, value);
                            if (value != null && copyHasMC && 'mc' in x[c]) {
                                if (x[c]['mc'].rs != null) {
                                    x[c]['mc'].r = h;
                                    x[c]['mc'].c = c;
                                    cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c] = x[c]['mc'];
                                    offsetMC[value['mc'].r + '_' + value['mc'].c] = [
                                        x[c]['mc'].r,
                                        x[c]['mc'].c
                                    ];
                                } else {
                                    x[c] = {
                                        'mc': {
                                            r: offsetMC[value['mc'].r + '_' + value['mc'].c][0],
                                            c: offsetMC[value['mc'].r + '_' + value['mc'].c][1]
                                        }
                                    };
                                }
                            }
                        }
                        d[h] = x;
                    }
                }
            }
            let cdformat = null;
            if (copyRange['copyRange'].length == 1) {
                let c_file = Store.luckysheetfile[i.getSheetIndex(copySheetIndex)];
                let a_file = Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)];
                let ruleArr_cf = $.extend(true, [], c_file['luckysheet_conditionformat_save']);
                if (ruleArr_cf != null && ruleArr_cf.length > 0) {
                    cdformat = $.extend(true, [], a_file['luckysheet_conditionformat_save']);
                    for (let i = 0; i < ruleArr_cf.length; i++) {
                        let cf_range = ruleArr_cf[i].cellrange;
                        let emptyRange = [];
                        for (let th = 1; th <= timesH; th++) {
                            for (let tc = 1; tc <= timesC; tc++) {
                                mth = minh + (th - 1) * copyh;
                                mtc = minc + (tc - 1) * copyc;
                                maxrowCache = minh + th * copyh;
                                maxcellCahe = minc + tc * copyc;
                                for (let j = 0; j < cf_range.length; j++) {
                                    let range = conditionformat.CFSplitRange(cf_range[j], {
                                        'row': [
                                            c_r1,
                                            c_r2
                                        ],
                                        'column': [
                                            c_c1,
                                            c_c2
                                        ]
                                    }, {
                                        'row': [
                                            mth,
                                            maxrowCache - 1
                                        ],
                                        'column': [
                                            mtc,
                                            maxcellCahe - 1
                                        ]
                                    }, 'operatePart');
                                    if (range.length > 0) {
                                        emptyRange = emptyRange.concat(range);
                                    }
                                }
                            }
                        }
                        if (emptyRange.length > 0) {
                            ruleArr_cf[i].cellrange = emptyRange;
                            cdformat.push(ruleArr_cf[i]);
                        }
                    }
                }
            }
            last['row'] = [
                minh,
                maxh
            ];
            last['column'] = [
                minc,
                maxc
            ];
            if (copyRowlChange || addr > 0 || addc > 0) {
                cfg = e.rowlenByRange(d, minh, maxh, cfg);
                let allParam = {
                    'cfg': cfg,
                    'RowlChange': true,
                    'cdformat': cdformat,
                    'dataVerification': dataVerification
                };
                g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
            } else {
                let allParam = {
                    'cfg': cfg,
                    'cdformat': cdformat,
                    'dataVerification': dataVerification
                };
                g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
                a.selectHightlightShow();
            }
        },
        pasteHandlerOfPaintModel: function (copyRange) {
            if (!b.checkProtectionLockedRangeList(Store.luckysheet_select_save, Store.currentSheetIndex)) {
                return;
            }
            let cfg = $.extend(true, {}, Store.config);
            if (cfg['merge'] == null) {
                cfg['merge'] = {};
            }
            let copyHasMC = copyRange['HasMC'];
            let copyRowlChange = copyRange['RowlChange'];
            let copySheetIndex = copyRange['dataSheetIndex'];
            let c_r1 = copyRange['copyRange'][0].row[0], c_r2 = copyRange['copyRange'][0].row[1], c_c1 = copyRange['copyRange'][0].column[0], c_c2 = copyRange['copyRange'][0].column[1];
            let copyData = $.extend(true, [], d.getdatabyselection({
                'row': [
                    c_r1,
                    c_r2
                ],
                'column': [
                    c_c1,
                    c_c2
                ]
            }, copySheetIndex));
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let minh = last['row'][0], maxh = last['row'][1];
            let minc = last['column'][0], maxc = last['column'][1];
            let copyh = copyData.length, copyc = copyData[0].length;
            if (minh == maxh && minc == maxc) {
                let has_PartMC = false;
                if (cfg['merge'] != null) {
                    has_PartMC = f.hasPartMC(cfg, minh, minh + copyh - 1, minc, minc + copyc - 1);
                }
                if (has_PartMC) {
                    if (f.isEditMode()) {
                        alert('不能对合并单元格做部分更改');
                    } else {
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', '不能对合并单元格做部分更改');
                    }
                    return;
                }
                maxh = minh + copyh - 1;
                maxc = minc + copyc - 1;
            }
            let timesH = Math.ceil((maxh - minh + 1) / copyh);
            let timesC = Math.ceil((maxc - minc + 1) / copyc);
            let d = editor.deepCopyFlowData(Store.flowdata);
            let cellMaxLength = d[0].length;
            let rowMaxLength = d.length;
            let borderInfoCompute = c.getBorderInfoCompute(copySheetIndex);
            let c_dataVerification = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(copySheetIndex)].dataVerification);
            let dataVerification = null;
            let mth = 0, mtc = 0, maxcellCahe = 0, maxrowCache = 0;
            for (let th = 1; th <= timesH; th++) {
                for (let tc = 1; tc <= timesC; tc++) {
                    mth = minh + (th - 1) * copyh;
                    mtc = minc + (tc - 1) * copyc;
                    maxrowCache = minh + th * copyh > rowMaxLength ? rowMaxLength : minh + th * copyh;
                    if (maxrowCache > maxh + 1) {
                        maxrowCache = maxh + 1;
                    }
                    maxcellCahe = minc + tc * copyc > cellMaxLength ? cellMaxLength : minc + tc * copyc;
                    if (maxcellCahe > maxc + 1) {
                        maxcellCahe = maxc + 1;
                    }
                    let offsetMC = {};
                    for (let h = mth; h < maxrowCache; h++) {
                        let x = [].concat(d[h]);
                        for (let c = mtc; c < maxcellCahe; c++) {
                            if (borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)]) {
                                let bd_obj = {
                                    'rangeType': 'cell',
                                    'value': {
                                        'row_index': h,
                                        'col_index': c,
                                        'l': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].l,
                                        'r': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].r,
                                        't': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].t,
                                        'b': borderInfoCompute[c_r1 + h - mth + '_' + (c_c1 + c - mtc)].b
                                    }
                                };
                                if (cfg['borderInfo'] == null) {
                                    cfg['borderInfo'] = [];
                                }
                                cfg['borderInfo'].push(bd_obj);
                            } else if (borderInfoCompute[h + '_' + c]) {
                                let bd_obj = {
                                    'rangeType': 'cell',
                                    'value': {
                                        'row_index': h,
                                        'col_index': c,
                                        'l': null,
                                        'r': null,
                                        't': null,
                                        'b': null
                                    }
                                };
                                if (cfg['borderInfo'] == null) {
                                    cfg['borderInfo'] = [];
                                }
                                cfg['borderInfo'].push(bd_obj);
                            }
                            if (c_dataVerification[c_r1 + h - mth + '_' + (c_c1 + c - mtc)]) {
                                if (dataVerification == null) {
                                    dataVerification = $.extend(true, {}, Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)].dataVerification);
                                }
                                dataVerification[h + '_' + c] = c_dataVerification[c_r1 + h - mth + '_' + (c_c1 + c - mtc)];
                            }
                            if (j.getObjType(x[c]) == 'object' && 'mc' in x[c]) {
                                if ('rs' in x[c].mc) {
                                    delete cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c];
                                }
                                delete x[c].mc;
                            }
                            let value = null;
                            if (copyData[h - mth] != null && copyData[h - mth][c - mtc] != null) {
                                value = copyData[h - mth][c - mtc];
                            }
                            if (value != null) {
                                delete value['v'];
                                delete value['m'];
                                delete value['f'];
                                delete value['spl'];
                                if (value.ct && value.ct.t == 'inlineStr') {
                                    delete value.ct;
                                }
                                if (j.getObjType(x[c]) == 'object') {
                                } else {
                                    x[c] = { 'v': x[c] };
                                }
                                x[c] = $.extend(true, x[c], value);
                                if (copyHasMC && 'mc' in x[c]) {
                                    if (x[c]['mc'].rs != null) {
                                        x[c]['mc'].r = h;
                                        if (x[c]['mc'].rs + h >= maxrowCache) {
                                            x[c]['mc'].rs = maxrowCache - h;
                                        }
                                        x[c]['mc'].c = c;
                                        if (x[c]['mc'].cs + c >= maxcellCahe) {
                                            x[c]['mc'].cs = maxcellCahe - c;
                                        }
                                        cfg['merge'][x[c]['mc'].r + '_' + x[c]['mc'].c] = x[c]['mc'];
                                        offsetMC[value['mc'].r + '_' + value['mc'].c] = [
                                            x[c]['mc'].r,
                                            x[c]['mc'].c
                                        ];
                                    } else {
                                        x[c] = {
                                            'mc': {
                                                r: offsetMC[value['mc'].r + '_' + value['mc'].c][0],
                                                c: offsetMC[value['mc'].r + '_' + value['mc'].c][1]
                                            }
                                        };
                                    }
                                }
                                if (x[c].v != null) {
                                    if (value['ct'] != null && value['ct']['fa'] != null) {
                                        let mask = h.update(value['ct']['fa'], x[c].v);
                                        x[c].m = mask;
                                    }
                                }
                            }
                        }
                        d[h] = x;
                    }
                }
            }
            let cdformat = null;
            let ruleArr = $.extend(true, [], Store.luckysheetfile[i.getSheetIndex(copySheetIndex)]['luckysheet_conditionformat_save']);
            if (ruleArr != null && ruleArr.length > 0) {
                cdformat = $.extend(true, [], Store.luckysheetfile[i.getSheetIndex(Store.currentSheetIndex)]['luckysheet_conditionformat_save']);
                for (let i = 0; i < ruleArr.length; i++) {
                    let cdformat_cellrange = ruleArr[i].cellrange;
                    let emptyRange = [];
                    for (let j = 0; j < cdformat_cellrange.length; j++) {
                        let range = conditionformat.CFSplitRange(cdformat_cellrange[j], {
                            'row': [
                                c_r1,
                                c_r2
                            ],
                            'column': [
                                c_c1,
                                c_c2
                            ]
                        }, {
                            'row': [
                                minh,
                                maxh
                            ],
                            'column': [
                                minc,
                                maxc
                            ]
                        }, 'operatePart');
                        if (range.length > 0) {
                            emptyRange = emptyRange.concat(range);
                        }
                    }
                    if (emptyRange.length > 0) {
                        ruleArr[i].cellrange = [{
                                'row': [
                                    minh,
                                    maxh
                                ],
                                'column': [
                                    minc,
                                    maxc
                                ]
                            }];
                        cdformat.push(ruleArr[i]);
                    }
                }
            }
            last['row'] = [
                minh,
                maxh
            ];
            last['column'] = [
                minc,
                maxc
            ];
            if (copyRowlChange) {
                cfg = e.rowlenByRange(d, minh, maxh, cfg);
                let allParam = {
                    'cfg': cfg,
                    'RowlChange': true,
                    'cdformat': cdformat,
                    'dataVerification': dataVerification
                };
                g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
            } else {
                let allParam = {
                    'cfg': cfg,
                    'cdformat': cdformat,
                    'dataVerification': dataVerification
                };
                g.jfrefreshgrid(d, Store.luckysheet_select_save, allParam);
                a.selectHightlightShow();
            }
        },
        matchcopy: function (data1, data2) {
            let data1cache = [], data2cache = [], data1len, data2len;
            if (typeof data1 == 'object') {
                data1cache = data1;
            } else {
                data1cache = data1.split('\n');
                for (let i = 0; i < data1cache.length; i++) {
                    data1cache[i] = data1cache[i].split('\t');
                }
            }
            data1len = data1cache.length;
            if (typeof data2 == 'object') {
                data2cache = data2;
            } else {
                data2cache = data2.split('\n');
                for (let i = 0; i < data2cache.length; i++) {
                    data2cache[i] = data2cache[i].split('\t');
                }
            }
            data2len = data2cache.length;
            if (data1len != data2len) {
                return false;
            }
            for (let r1 = 0; r1 < data1len; r1++) {
                if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r1] != null) {
                    continue;
                }
                for (let r2 = 0; r2 < data2len; r2++) {
                    if (data1cache[r1].length != data2cache[r2].length) {
                        return false;
                    }
                }
            }
            for (let r = 0; r < data1len; r++) {
                if (Store.config['rowhidden'] != null && Store.config['rowhidden'][r] != null) {
                    continue;
                }
                for (let c = 0; c < data1cache[0].length; c++) {
                    if (d.getcellvalue(r, c, data1cache) != d.getcellvalue(r, c, data2cache)) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
    return selection;
});