define([
    'pako',
    '../global/loading',
    '../global/refresh',
    '../global/editor',
    './constant',
    './sheetmanage',
    './menuButton',
    './filter',
    './freezen',
    './postil',
    './imageCtrl',
    './dataVerificationCtrl',
    './hyperlinkCtrl',
    '../utils/util',
    '../methods/get',
    '../store',
    './select',
    '../locale/locale',
    'dayjs',
    '../global/json'
], function (pako, a, b, editor, c, sheetmanage, menuButton, d, luckysheetFreezen, luckysheetPostil, imageCtrl, dataVerificationCtrl, hyperlinkCtrl, e, f, Store, g, locale, dayjs, json) {
    'use strict';
    const server = {
        gridKey: null,
        loadUrl: null,
        updateUrl: null,
        updateImageUrl: null,
        title: null,
        loadSheetUrl: null,
        retryTimer: null,
        allowUpdate: false,
        historyParam: function (data, sheetIndex, range) {
            let _this = this;
            let r1 = range.row[0], r2 = range.row[1];
            let c1 = range.column[0], c2 = range.column[1];
            if (r1 == r2 && c1 == c2) {
                let v = data[r1][c1];
                _this.saveParam('v', sheetIndex, v, {
                    'r': r1,
                    'c': c1
                });
            } else {
                let rowlen = r2 - r1 + 1;
                let collen = c2 - c1 + 1;
                let timeR = Math.floor(1000 / collen);
                let n = Math.ceil(rowlen / timeR);
                for (let i = 0; i < n; i++) {
                    let str = r1 + timeR * i;
                    let edr;
                    if (i == n - 1) {
                        edr = r2;
                    } else {
                        edr = r1 + timeR * (i + 1) - 1;
                    }
                    let v = [];
                    for (let r = str; r <= edr; r++) {
                        let v_row = [];
                        for (let c = c1; c <= c2; c++) {
                            if (data[r] == null) {
                                v_row.push(null);
                            } else {
                                v_row.push(data[r][c]);
                            }
                        }
                        v.push(v_row);
                    }
                    _this.saveParam('rv', sheetIndex, v, {
                        'range': {
                            'row': [
                                str,
                                edr
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    });
                    if (i == n - 1) {
                        _this.saveParam('rv_end', sheetIndex, null);
                    }
                }
            }
        },
        saveParam: function (type, index, value, params) {
            let _this = this;
            if (!_this.allowUpdate) {
                return;
            }
            if (value == undefined) {
                value = null;
            }
            let d = {};
            d.t = type;
            d.i = index;
            d.v = value;
            if (type === 'shs') {
                return;
            }
            if (type == 'rv') {
                d.range = params.range;
            } else if (type == 'v' || type == 'fu' || type == 'fm') {
                d.r = params.r;
                d.c = params.c;
            } else if (type == 'fc') {
                d.op = params.op;
                d.pos = params.pos;
            } else if (type == 'drc' || type == 'arc' || type == 'h' || type == 'wh') {
                d.rc = params.rc;
            } else if (type == 'c') {
                d.cid = params.cid;
                d.op = params.op;
            } else if (type == 'f') {
                d.op = params.op;
                d.pos = params.pos;
            } else if (type == 's') {
            } else if (type == 'sh') {
                d.op = params.op;
                if (params.cur != null) {
                    d.cur = params.cur;
                }
            } else if (type == 'cg') {
                d.k = params.k;
            } else if (type == 'all') {
                d.k = params.k;
            }
            let msg = pako.gzip(encodeURIComponent(JSON.stringify(d)), { to: 'string' });
            if (_this.websocket != null) {
                _this.websocket.send(msg);
            }
        },
        websocket: null,
        wxErrorCount: 0,
        openWebSocket: function () {
            let _this = this;
            if ('WebSocket' in window) {
                let wxUrl = _this.updateUrl + '?t=111&g=' + encodeURIComponent(_this.gridKey);
                if (_this.updateUrl.indexOf('?') > -1) {
                    wxUrl = _this.updateUrl + '&t=111&g=' + encodeURIComponent(_this.gridKey);
                }
                _this.websocket = new WebSocket(wxUrl);
                _this.websocket.onopen = function () {
                    console.info(locale().websocket.success);
                    a.hideloading();
                    _this.wxErrorCount = 0;
                    _this.retryTimer = setInterval(function () {
                        _this.websocket.send('rub');
                    }, 60000);
                };
                _this.websocket.onmessage = function (result) {
                    Store.result = result;
                    let data = new Function('return ' + result.data)();
                    console.info(data);
                    let type = data.type;
                    let {message, id} = data;
                    if (message === '用户退出') {
                        $('#luckysheet-multipleRange-show-' + id).hide();
                        Store.cooperativeEdit.changeCollaborationSize = Store.cooperativeEdit.changeCollaborationSize.filter(value => {
                            return value.id != id;
                        });
                        Store.cooperativeEdit.checkoutData = Store.cooperativeEdit.checkoutData.filter(value => {
                            return value.id != id;
                        });
                    }
                    if (type == 1) {
                    } else if (type == 2) {
                        let item = JSON.parse(data.data);
                        _this.wsUpdateMsg(item);
                        let chang_data = JSON.parse(data.data);
                        if (chang_data.k == 'columnlen') {
                            g.collaborativeEditBox(chang_data.v, null);
                        } else if (chang_data.k == 'rowlen') {
                            g.collaborativeEditBox(null, chang_data.v);
                        }
                    } else if (type == 3) {
                        let id = data.id;
                        let username = data.username;
                        let item = JSON.parse(data.data);
                        let type = item.t, index = item.i, value = item.v;
                        if (Store.cooperativeEdit.changeCollaborationSize.length === 0) {
                            Store.cooperativeEdit.changeCollaborationSize.push({
                                id: id,
                                v: item.v[0],
                                i: index
                            });
                        }
                        let flag = Store.cooperativeEdit.changeCollaborationSize.some(value1 => {
                            return value1.id == id;
                        });
                        if (flag) {
                            Store.cooperativeEdit.changeCollaborationSize.forEach(val => {
                                if (val.id == id) {
                                    val.v = item.v[0];
                                    val.i = index;
                                }
                            });
                        } else {
                            Store.cooperativeEdit.changeCollaborationSize.push({
                                id: id,
                                v: item.v[0],
                                i: index
                            });
                        }
                        if (e.getObjType(value) != 'array' && e.getObjType(value) !== 'object') {
                            value = JSON.parse(value);
                        }
                        let r = 0;
                        let c = 0;
                        if (index == Store.currentSheetIndex) {
                            if (e.getObjType(value) === 'object' && value.op === 'enterEdit') {
                                r = value.range[value.range.length - 1].row[0];
                                c = value.range[value.range.length - 1].column[0];
                                _this.multipleRangeShow(id, username, r, c, value.op);
                            } else {
                                r = value[value.length - 1].row[0];
                                c = value[value.length - 1].column[0];
                                _this.multipleRangeShow(id, username, r, c);
                            }
                        } else {
                            if (e.getObjType(value) === 'object' && value.op === 'enterEdit') {
                                r = value.range[value.range.length - 1].row[0];
                                c = value.range[value.range.length - 1].column[0];
                            } else {
                                r = value[value.length - 1].row[0];
                                c = value[value.length - 1].column[0];
                            }
                        }
                        if (Store.cooperativeEdit.checkoutData.length === 0) {
                            if (value.op) {
                                Store.cooperativeEdit.checkoutData.push({
                                    id,
                                    username,
                                    r,
                                    c,
                                    op: value.op,
                                    index
                                });
                            } else {
                                Store.cooperativeEdit.checkoutData.push({
                                    id,
                                    username,
                                    r,
                                    c,
                                    index
                                });
                            }
                        }
                        let checkoutFlag = Store.cooperativeEdit.checkoutData.some(item => {
                            return item.id == id;
                        });
                        if (checkoutFlag) {
                            Store.cooperativeEdit.checkoutData.forEach(item => {
                                if (item.id == id) {
                                    item.username = username;
                                    item.r = r;
                                    item.c = c;
                                    item.index = index;
                                    if (value.op === 'enterEdit') {
                                        item.op = value.op;
                                    }
                                }
                            });
                        } else {
                            if (value.op === 'enterEdit') {
                                Store.cooperativeEdit.checkoutData.push({
                                    id,
                                    username,
                                    r,
                                    c,
                                    op: value.op,
                                    index
                                });
                            } else {
                                Store.cooperativeEdit.checkoutData.push({
                                    id,
                                    username,
                                    r,
                                    c,
                                    index
                                });
                            }
                        }
                        Store.cooperativeEdit.checkoutData.forEach(item => {
                            if (item.index != Store.currentSheetIndex) {
                                $('#luckysheet-multipleRange-show-' + item.id).hide();
                                item.op == '';
                            }
                        });
                        if ($('#luckysheet-multipleRange-show-' + id)[0]) {
                            let change_bottom = $('#luckysheet-multipleRange-show-' + id)[0].offsetHeight - 1;
                            $('#luckysheet-multipleRange-show-' + id + '>.username').css({ 'bottom': change_bottom + 'px' });
                        }
                    } else if (type == 4) {
                        let items = data.data === '' ? data.data : JSON.parse(data.data);
                        for (let i = 0; i < items.length; i++) {
                            _this.wsUpdateMsg(item[i]);
                        }
                    }
                };
                _this.websocket.onerror = function () {
                    _this.wxErrorCount++;
                    if (_this.wxErrorCount > 3) {
                        a.showloading(locale().websocket.refresh);
                    } else {
                        a.showloading(locale().websocket.wait);
                        _this.openWebSocket();
                    }
                };
                _this.websocket.onclose = function (e) {
                    console.info(locale().websocket.close);
                    if (e.code === 1000) {
                        clearInterval(_this.retryTimer);
                        _this.retryTimer = null;
                    } else {
                        alert(locale().websocket.contact);
                    }
                };
            } else {
                alert(locale().websocket.support);
            }
        },
        wsUpdateMsg: function (item) {
            let type = item.t, index = item.i, value = item.v;
            let file = Store.luckysheetfile[f.getSheetIndex(index)];
            if ([
                    'v',
                    'rv',
                    'cg',
                    'all',
                    'fc',
                    'drc',
                    'arc',
                    'f',
                    'fsc',
                    'fsr',
                    'sh',
                    'c'
                ].includes(type) && file == null) {
                return;
            }
            if (type == 'v') {
                if (file.data == null || file.data.length == 0) {
                    return;
                }
                let r = item.r, c = item.c;
                file.data[r][c] = value;
                if (index == Store.currentSheetIndex) {
                    Store.flowdata = file.data;
                    editor.webWorkerFlowDataCache(Store.flowdata);
                    if (value != null && value.ps != null) {
                        luckysheetPostil.buildPs(r, c, value.ps);
                    } else {
                        luckysheetPostil.buildPs(r, c, null);
                    }
                    setTimeout(function () {
                        b.luckysheetrefreshgrid();
                    }, 1);
                }
            } else if (type == 'rv') {
                if (Object.keys(item.range).length > 0) {
                    Store.cooperativeEdit.merge_range = item.range;
                    Store.cooperativeEdit.merge_range.v = item.v;
                    g.collaborativeEditBox();
                }
                if (file.data == null || file.data.length == 0) {
                    return;
                }
                let r1 = item.range.row[0], r2 = item.range.row[1];
                let c1 = item.range.column[0], c2 = item.range.column[1];
                for (let r = r1; r <= r2; r++) {
                    for (let c = c1; c <= c2; c++) {
                        file.data[r][c] = value[r - r1][c - c1];
                    }
                }
                if (index == Store.currentSheetIndex) {
                    Store.flowdata = file.data;
                    editor.webWorkerFlowDataCache(Store.flowdata);
                    for (let r = r1; r <= r2; r++) {
                        for (let c = c1; c <= c2; c++) {
                            if (value[r - r1][c - c1] != null && value[r - r1][c - c1].ps != null) {
                                luckysheetPostil.buildPs(r, c, value[r - r1][c - c1].ps);
                            } else {
                                luckysheetPostil.buildPs(r, c, null);
                            }
                        }
                    }
                    setTimeout(function () {
                        b.luckysheetrefreshgrid();
                    }, 1);
                }
            } else if (type == 'cg') {
                let k = item.k;
                if (k == 'borderInfo') {
                    file['config']['borderInfo'] = value;
                } else {
                    if (!(k in file['config'])) {
                        file['config'][k] = {};
                    }
                    for (let key in value) {
                        file['config'][k][key] = value[key];
                    }
                }
                if (index == Store.currentSheetIndex) {
                    Store.config = file['config'];
                    if (k == 'rowlen' || k == 'columnlen' || k == 'rowhidden') {
                        b.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
                    }
                    setTimeout(function () {
                        b.luckysheetrefreshgrid();
                    }, 1);
                }
            } else if (type == 'all') {
                let k = item.k;
                file[k] = value;
                if (k == 'name') {
                    $('#luckysheet-sheet-container-c #luckysheet-sheets-item' + index).find('span.luckysheet-sheets-item-name').html(value);
                } else if (k == 'color') {
                    let currentSheetItem = $('#luckysheet-sheet-container-c #luckysheet-sheets-item' + index);
                    currentSheetItem.find('.luckysheet-sheets-item-color').remove();
                    if (value != null || value != '') {
                        currentSheetItem.append('<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + value + ';"></div>');
                    }
                } else if (k == 'pivotTable') {
                } else if (k == 'frozen') {
                    luckysheetFreezen.frozenTofreezen();
                    if (index == Store.currentSheetIndex) {
                        const _locale = locale();
                        const locale_freezen = _locale.freezen;
                        if (file['freezen'].horizontal == null) {
                            $('#luckysheet-freezen-btn-horizontal').html('<i class="fa fa-list-alt"></i> ' + locale_freezen.freezenRow);
                            luckysheetFreezen.freezenhorizontaldata = null;
                            $('#luckysheet-freezebar-horizontal').hide();
                        } else {
                            luckysheetFreezen.createFreezenHorizontal(file['freezen'].horizontal.freezenhorizontaldata, file['freezen'].horizontal.top);
                        }
                        if (file['freezen'].vertical == null) {
                            $('#luckysheet-freezen-btn-vertical').html('<i class="fa fa-indent"></i> ' + locale_freezen.freezenColumn);
                            luckysheetFreezen.freezenverticaldata = null;
                            $('#luckysheet-freezebar-vertical').hide();
                        } else {
                            luckysheetFreezen.createFreezenVertical(file['freezen'].vertical.freezenverticaldata, file['freezen'].vertical.left);
                        }
                        luckysheetFreezen.createAssistCanvas();
                    }
                } else if (k == 'filter_select') {
                    if (index == Store.currentSheetIndex) {
                        d.createFilterOptions(value);
                    }
                } else if (k == 'filter') {
                    if (index == Store.currentSheetIndex) {
                        d.createFilterOptions(file.filter_select, value);
                    }
                } else if (k == 'luckysheet_conditionformat_save') {
                    if (index == Store.currentSheetIndex) {
                        setTimeout(function () {
                            b.luckysheetrefreshgrid();
                        }, 1);
                    }
                } else if (k == 'luckysheet_alternateformat_save') {
                    if (index == Store.currentSheetIndex) {
                        setTimeout(function () {
                            b.luckysheetrefreshgrid();
                        }, 1);
                    }
                } else if (k == 'config') {
                    if (index == Store.currentSheetIndex) {
                        Store.config = value;
                        b.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
                    }
                } else if (k == 'dynamicArray') {
                    if (index == Store.currentSheetIndex) {
                        setTimeout(function () {
                            b.luckysheetrefreshgrid();
                        }, 1);
                    }
                } else if (k == 'images') {
                    if (index == Store.currentSheetIndex) {
                        imageCtrl.images = value;
                        imageCtrl.allImagesShow();
                        imageCtrl.init();
                    }
                } else if (k == 'dataVerification') {
                    if (index == Store.currentSheetIndex) {
                        dataVerificationCtrl.dataVerification = value;
                        dataVerificationCtrl.init();
                    }
                } else if (k == 'hyperlink') {
                    if (index == Store.currentSheetIndex) {
                        hyperlinkCtrl.hyperlink = value;
                        hyperlinkCtrl.init();
                    }
                }
            } else if (type == 'fc') {
                let op = item.op, pos = item.pos;
                if (e.getObjType(value) != 'object') {
                    value = new Function('return ' + value)();
                }
                let r = value.r, c = value.c;
                let calcChain = file['calcChain'] == null ? [] : file['calcChain'];
                if (op == 'add') {
                    calcChain.push(value);
                } else if (op == 'del') {
                    for (let a = 0; a < calcChain.length; a++) {
                        if (r == calcChain[a].r && c == calcChain[a].c && index == calcChain[a].index) {
                            calcChain.splice(a, 1);
                        }
                    }
                }
                setTimeout(function () {
                    b.luckysheetrefreshgrid();
                }, 1);
            } else if (type == 'drc') {
                if (file.data == null || file.data.length == 0) {
                    return;
                }
                let rc = item.rc, st_i = value.index, len = value.len, mc = value.mc, borderInfo = value.borderInfo;
                let data = file.data;
                if (rc == 'r') {
                    file['row'] -= len;
                    data.splice(st_i, len);
                    let row = [];
                    for (let c = 0; c < data[0].length; c++) {
                        row.push(null);
                    }
                    for (let r = 0; r < len; r++) {
                        data.push(row);
                    }
                } else {
                    file['column'] -= len;
                    let addcol = [];
                    for (let r = 0; r < len; r++) {
                        addcol.push(null);
                    }
                    for (let i = 0; i < data.length; i++) {
                        data[i].splice(st_i, len);
                        data[i] = data[i].concat(addcol);
                    }
                }
                for (let x in mc) {
                    let r = mc[x].r, c = mc[x].c;
                    data[r][c].mc = mc[x];
                }
                file['config'].merge = mc;
                file['config'].borderInfo = borderInfo;
                if (index == Store.currentSheetIndex) {
                    Store.flowdata = data;
                    editor.webWorkerFlowDataCache(Store.flowdata);
                    Store.config['merge'] = mc;
                    Store.config['borderInfo'] = borderInfo;
                    setTimeout(function () {
                        b.luckysheetrefreshgrid();
                    }, 1);
                }
            } else if (type == 'arc') {
                if (file.data == null || file.data.length == 0) {
                    return;
                }
                let rc = item.rc, st_i = value.index, len = value.len, addData = value.data, direction = value.direction, mc = value.mc, borderInfo = value.borderInfo;
                let data = $.extend(true, [], file.data);
                if (rc == 'r') {
                    file['row'] += len;
                    let row = [];
                    for (let c = 0; c < data[0].length; c++) {
                        row.push(null);
                    }
                    let arr = [];
                    for (let i = 0; i < len; i++) {
                        if (addData[i] == null) {
                            arr.push(JSON.stringify(row));
                        } else {
                            arr.push(JSON.stringify(addData[i]));
                        }
                    }
                    if (direction == 'lefttop') {
                        if (st_i == 0) {
                            new Function('data', 'return ' + 'data.unshift(' + arr.join(',') + ')')(data);
                        } else {
                            new Function('data', 'return ' + 'data.splice(' + st_i + ', 0, ' + arr.join(',') + ')')(data);
                        }
                    } else {
                        new Function('data', 'return ' + 'data.splice(' + (st_i + 1) + ', 0, ' + arr.join(',') + ')')(data);
                    }
                } else {
                    file['column'] += len;
                    for (let i = 0; i < data.length; i++) {
                        data[i].splice(st_i, 0, addData[i]);
                    }
                }
                for (let x in mc) {
                    let r = mc[x].r, c = mc[x].c;
                    data[r][c].mc = mc[x];
                }
                file.data = data;
                file['config'].merge = mc;
                file['config'].borderInfo = borderInfo;
                if (index == Store.currentSheetIndex) {
                    Store.flowdata = data;
                    editor.webWorkerFlowDataCache(Store.flowdata);
                    Store.config['merge'] = mc;
                    Store.config['borderInfo'] = borderInfo;
                    setTimeout(function () {
                        b.luckysheetrefreshgrid();
                    }, 1);
                }
            } else if (type == 'f') {
                let op = item.op, pos = item.pos;
                let filter = file.filter;
                if (filter == null) {
                    filter = {};
                }
                if (op == 'upOrAdd') {
                    filter[pos] = value;
                } else if (op == 'del') {
                    delete filter[pos];
                }
                if (index == Store.currentSheetIndex) {
                    d.createFilterOptions(file.filter_select, filter);
                }
            } else if (type == 'fsc') {
                file.filter = null;
                file.filter_select = null;
                if (index == Store.currentSheetIndex) {
                    $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex + ', #luckysheet-filter-options-sheet' + Store.currentSheetIndex).remove();
                    $('#luckysheet-filter-menu, #luckysheet-filter-submenu').hide();
                }
            } else if (type == 'fsr') {
                file.filter = value.filter;
                file.filter_select = value.filter_select;
                if (index == Store.currentSheetIndex) {
                    d.createFilterOptions(file.filter_select, file.filter);
                }
            } else if (type == 'sha') {
                Store.luckysheetfile.push(value);
                let colorset = '';
                if (value.color != null) {
                    colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + value.color + ';"></div>';
                }
                $('#luckysheet-sheet-container-c').append(e.replaceHtml(c.sheetHTML, {
                    'index': value.index,
                    'active': '',
                    'name': value.name,
                    'style': '',
                    'colorset': colorset
                }));
                $('#luckysheet-cell-main').append('<div id="luckysheet-datavisual-selection-set-' + value.index + '" class="luckysheet-datavisual-selection-set"></div>');
            } else if (type == 'shc') {
                let copyindex = value.copyindex, name = value.name;
                let copyarrindex = f.getSheetIndex(copyindex);
                let copyjson = $.extend(true, {}, Store.luckysheetfile[copyarrindex]);
                copyjson.index = index;
                copyjson.name = name;
                Store.luckysheetfile.splice(copyarrindex + 1, 0, copyjson);
                let copyobject = $('#luckysheet-sheets-item' + copyindex);
                $('#luckysheet-sheet-container-c').append(e.replaceHtml(c.sheetHTML, {
                    'index': copyjson.index,
                    'active': '',
                    'name': copyjson.name,
                    'style': '',
                    'colorset': ''
                }));
                $('#luckysheet-sheets-item' + copyjson.index).insertAfter(copyobject);
                $('#luckysheet-cell-main').append('<div id="luckysheet-datavisual-selection-set-' + copyjson.index + '" class="luckysheet-datavisual-selection-set"></div>');
            } else if (type == 'shd') {
                for (let i = 0; i < Store.luckysheetfile.length; i++) {
                    if (Store.luckysheetfile[i].index == value.deleIndex) {
                        if (Store.currentSheetIndex === value.deleIndex) {
                            const index = value.deleIndex;
                            Store.luckysheetfile[sheetmanage.undefined(index)].hide = 1;
                            let luckysheetcurrentSheetitem = $('#luckysheet-sheets-item' + index);
                            luckysheetcurrentSheetitem.hide();
                            $('#luckysheet-sheet-area div.luckysheet-sheets-item').removeClass('luckysheet-sheets-item-active');
                            let indicator = luckysheetcurrentSheetitem.nextAll(':visible');
                            if (luckysheetcurrentSheetitem.nextAll(':visible').length > 0) {
                                indicator = indicator.eq(0).data('index');
                            } else {
                                indicator = luckysheetcurrentSheetitem.prevAll(':visible').eq(0).data('index');
                            }
                            $('#luckysheet-sheets-item' + indicator).addClass('luckysheet-sheets-item-active');
                            sheetmanage.changeSheetExec(indicator);
                        }
                        server.sheetDeleSave.push(Store.luckysheetfile[i]);
                        Store.luckysheetfile.splice(i, 1);
                        break;
                    }
                }
                $('#luckysheet-sheets-item' + value.deleIndex).remove();
                $('#luckysheet-datavisual-selection-set-' + value.deleIndex).remove();
            } else if (type == 'shr') {
                for (let x in value) {
                    Store.luckysheetfile[f.getSheetIndex(x)].order = value[x];
                }
            } else if (type == 'shre') {
                for (let i = 0; i < server.sheetDeleSave.length; i++) {
                    if (server.sheetDeleSave[i].index == value.reIndex) {
                        let datav = server.sheetDeleSave[i];
                        Store.luckysheetfile.push(datav);
                        let colorset = '';
                        if (value.color != null) {
                            colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + datav.color + ';"></div>';
                        }
                        $('#luckysheet-sheet-container-c').append(e.replaceHtml(c.sheetHTML, {
                            'index': datav.index,
                            'active': '',
                            'name': datav.name,
                            'style': '',
                            'colorset': colorset
                        }));
                        $('#luckysheet-cell-main').append('<div id="luckysheet-datavisual-selection-set-' + datav.index + '" class="luckysheet-datavisual-selection-set"></div>');
                        break;
                    }
                }
            } else if (type == 'sh') {
                let op = item.op, cur = item.cur;
                if (op == 'hide') {
                    file.hide = 1;
                    $('#luckysheet-sheets-item' + index).hide();
                    if (index == Store.currentSheetIndex) {
                        $('#luckysheet-sheets-item' + cur).addClass('luckysheet-sheets-item-active');
                        sheetmanage.changeSheetExec(cur);
                    }
                } else if (op == 'show') {
                    file.hide = 0;
                    $('#luckysheet-sheets-item' + index).show();
                }
            } else if (type == 'c') {
                let op = item.op, cid = item.cid;
                if (op == 'add') {
                    file.chart.push(value);
                    luckysheet.insertChartTosheet(value.sheetIndex, value.dataSheetIndex, value.option, value.chartType, value.selfOption, value.defaultOption, value.row, value.column, value.chart_selection_color, value.chart_id, value.chart_selection_id, value.chartStyle, value.rangeConfigCheck, value.rangeRowCheck, value.rangeColCheck, value.chartMarkConfig, value.chartTitleConfig, value.winWidth, value.winHeight, value.scrollLeft1, value.scrollTop1, value.chartTheme, value.myWidth, value.myHeight, value.myLeft, value.myTop, value.myindexrank1, true);
                } else if (op == 'xy' || op == 'wh' || op == 'update') {
                    for (let i = 0; i < file.chart.length; i++) {
                        let chartjson = file.chart[i];
                        if (chartjson.chart_id == cid) {
                            for (let item in chartjson) {
                                for (let vitem in value) {
                                    if (item == vitem) {
                                        chartjson[item] = value[vitem];
                                    }
                                }
                            }
                            sheetmanage.saveChart(chartjson);
                            return;
                        }
                    }
                } else if (op == 'del') {
                    for (let i = 0; i < file.chart.length; i++) {
                        let chartjson = file.chart[i];
                        if (chartjson.chart_id == cid) {
                            file.chart.splice(i, 1);
                            $('#' + cid).remove();
                            sheetmanage.delChart($('#' + cid).attr('chart_id'), $('#' + cid).attr('sheetIndex'));
                            return;
                        }
                    }
                }
            } else if (type == 'na') {
                $('#luckysheet_info_detail_input').val(value).css('width', e.getByteLen(value) * 10);
            }
        },
        multipleIndex: 0,
        multipleRangeShow: function (id, name, r, c, value) {
            let _this = this;
            let row = Store.visibledatarow[r], row_pre = r - 1 == -1 ? 0 : Store.visibledatarow[r - 1], col = Store.visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : Store.visibledatacolumn[c - 1];
            let margeset = menuButton.mergeborer(Store.flowdata, r, c);
            if (!!margeset) {
                row = margeset.row[1];
                row_pre = margeset.row[0];
                col = margeset.column[1];
                col_pre = margeset.column[0];
            }
            if (e.getByteLen(name) > 16) {
                name = e.getByteLen(name, 16) + '...';
            }
            if (value === 'enterEdit') {
                name += ' ' + locale().edit.typing;
            }
            if ($('#luckysheet-multipleRange-show-' + id).length > 0) {
                $('#luckysheet-multipleRange-show-' + id).css({
                    'position': 'absolute',
                    'left': col_pre - 1,
                    'width': col - col_pre - 1,
                    'top': row_pre - 1,
                    'height': row - row_pre - 1
                });
                $('#luckysheet-multipleRange-show-' + id + ' .username').text(name);
                $('#luckysheet-multipleRange-show-' + id + ' .username').show();
                if (Store.cooperativeEdit.usernameTimeout['user' + id] != null) {
                    clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id]);
                }
                Store.cooperativeEdit.usernameTimeout['user' + id] = setTimeout(() => {
                    clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id]);
                    Store.cooperativeEdit.usernameTimeout['user' + id] = null;
                }, 10 * 1000);
            } else {
                let itemHtml = `<div 
								id="luckysheet-multipleRange-show-${ id }"
								class="luckysheet-multipleRange-show"
								data-color="${ c.luckyColor[_this.multipleIndex] }" 
								title="${ name }" 
								style="position: absolute;left: ${ col_pre - 1 }px;width: ${ col - col_pre - 1 }px;top: ${ row_pre - 1 }px;height: ${ row - row_pre - 1 }px;border: 1px solid ${ c.luckyColor[_this.multipleIndex] };z-index: 15;">

								<div class="username" style="height: 19px;line-height:19px;width: max-content;position: absolute;bottom: ${ row - row_pre - 1 }px;right: 0;background-color: ${ c.luckyColor[_this.multipleIndex] };color:#ffffff;padding:0 10px;">
								${ name }
								</div>

								<div style="width: 100%;height: 100%;position: absolute;top: 0;right: 0;bottom: 0;left: 0;opacity: 0.03;background-color: ${ c.luckyColor[_this.multipleIndex] }">
								</div>

							</div>`;
                $(itemHtml).appendTo($('#luckysheet-cell-main #luckysheet-multipleRange-show'));
                _this.multipleIndex++;
                if (Store.cooperativeEdit.usernameTimeout['user' + id] != null) {
                    clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id]);
                }
                Store.cooperativeEdit.usernameTimeout['user' + id] = setTimeout(() => {
                    clearTimeout(Store.cooperativeEdit.usernameTimeout['user' + id]);
                    Store.cooperativeEdit.usernameTimeout['user' + id] = null;
                }, 10 * 1000);
            }
        },
        sheetDeleSave: [],
        submitInterval: 1000,
        imagesubmitInterval: 5000,
        submitdatalimit: 50,
        submitcompresslimit: 1000,
        checksubmit: function (data) {
            let _this = this;
            _this.submitTimeout();
            clearTimeout(_this.imageRequestTimeout);
            _this.imageRequestTimeout = setTimeout(function () {
                _this.imageRequest();
            }, _this.imagesubmitInterval);
        },
        submitTimeout: function () {
            let _this = this;
            clearTimeout(_this.requestTimeOut);
            if (!_this.requestLock && (_this.requestlast != null && _this.requestlast.clone().add(1, 'seconds').isBefore(dayjs()))) {
                _this.request();
            }
            _this.requestTimeOut = setTimeout(function () {
                _this.submitTimeout();
            }, _this.submitInterval);
        },
        requestLock: false,
        requestlast: null,
        firstchange: true,
        requestTimeOut: null,
        request: function () {
            let _this = this;
            let key = this.gridKey;
            let cahce_key = key + '__qkcache';
            _this.cachelocaldata(function (cahce_key, params) {
                if (params.length == 0) {
                    return;
                }
                params = encodeURIComponent(JSON.stringify(params));
                let compressBeginLen = params.length;
                let iscommpress = false;
                _this.requestLock = true;
                if (_this.updateUrl != '') {
                    $.post(_this.updateUrl, {
                        compress: iscommpress,
                        gridKey: _this.gridKey,
                        data: params
                    }, function (data) {
                        let re = new Function('return ' + data)();
                        if (re.status) {
                            $('#luckysheet_info_detail_update').html('最近存档时间:' + dayjs().format('M-D H:m:s'));
                            $('#luckysheet_info_detail_save').html('同步成功');
                            _this.clearcachelocaldata();
                        } else {
                            $('#luckysheet_info_detail_save').html("<span style='color:#ff2121'>同步失败</span>");
                            _this.restorecachelocaldata();
                        }
                        _this.requestlast = dayjs();
                        _this.requestLock = false;
                    });
                }
            });
        },
        imageRequestLast: null,
        imageRequestLock: false,
        imageRequestTimeout: null,
        imageRequest: function () {
            let _this = this;
            html2canvas($('#' + container).find('.luckysheet-grid-window').get(0), {
                onrendered: function (canvas) {
                    let old = $(canvas).appendTo('body');
                    old.hide();
                    let newwidth = old.width();
                    let newheight = old.height();
                    let imageData = old.get(0).getContext('2d').getImageData(0, 0, newwidth, newheight);
                    let cutW = newwidth, cutH = newheight;
                    if (cutW * 0.54 > cutH) {
                        cutW = cutH / 0.54;
                    } else {
                        cutH = cutW * 0.54;
                    }
                    let newCanvas = $('<canvas>').attr('width', cutW).attr('height', cutH)[0];
                    newCanvas.getContext('2d').putImageData(imageData, 0, 0);
                    old.attr('width', 350);
                    old.attr('height', 189);
                    old.get(0).getContext('2d').drawImage(newCanvas, 0, 0, 350, 189);
                    let base64 = old.get(0).toDataURL('image/jpeg', 0.9);
                    let curindex = luckysheet.sheetmanage.getCurSheetnoset();
                    _this.imageRequestLock = true;
                    let data1 = encodeURIComponent(JSON.stringify({
                        't': 'thumb',
                        'img': base64,
                        'curindex': curindex
                    }));
                    old.remove();
                    if (_this.updateImageUrl != '') {
                        $.post(_this.updateImageUrl, {
                            compress: false,
                            gridKey: _this.gridKey,
                            data: data1
                        }, function (data) {
                            let re = new Function('return ' + data)();
                            if (re.status) {
                                imageRequestLast = dayjs();
                            } else {
                                $('#luckysheet_info_detail_save').html("<span style='color:#ff2121'>网络不稳定</span>");
                            }
                            _this.imageRequestLock = true;
                        });
                    }
                }
            });
        },
        localdata: [],
        matchOpt: function (v, d) {
            for (let vitem in v) {
                if (vitem == 't' && v['t'] in {
                        'drc': 1,
                        'arc': 1,
                        'sha': 1,
                        'shc': 1,
                        'shd': 1
                    }) {
                    return false;
                }
                if (vitem == 'v') {
                    continue;
                }
                if (!(vitem in d)) {
                    return false;
                }
                if (d[vitem] != v[vitem]) {
                    return false;
                }
            }
            return true;
        },
        deleteRepeatOpt: function (data, value) {
            let d = data;
            let _this = this;
            if (value instanceof Array) {
                for (let i = 0; i < value.length; i++) {
                    let vitem = value[i];
                    for (let a = 0; a < d.length; a++) {
                        let ditem = data[i];
                        if (_this.matchOpt(vitem, ditem)) {
                            delete d[a];
                        }
                    }
                }
            } else {
                for (let a = 0; a < d.length; a++) {
                    let ditem = d[a];
                    if (_this.matchOpt(value, ditem)) {
                        delete d[a];
                    }
                }
            }
            let ret = [];
            for (let i = 0; i < d.length; i++) {
                if (d[i] != null) {
                    ret.push(d[i]);
                }
            }
            return ret;
        },
        setlocaldata: function (value, func) {
            let key = this.gridKey;
            let _this = this;
            _this.getlocaldata(function (data) {
                if (data == null) {
                    data = [];
                }
                if (value instanceof Array) {
                    data = data.concat(value);
                } else {
                    data.push(value);
                }
                _this.localdata = data;
                func(_this.localdata);
            });
        },
        getlocaldata: function (func) {
            let key = this.gridKey;
            func(this.localdata);
        },
        clearlocaldata: function (func) {
            let key = this.gridKey;
            this.localdata = [];
            func();
        },
        cachelocaldata: function (func) {
            let key = this.gridKey;
            let _this = this;
            let cahce_key = key + '__qkcache';
            let updatedata = _this.localdata;
            let uLen = updatedata.length;
            if (uLen > 1) {
                let prevData = [];
                prevData[0] = updatedata[0];
                for (let i = 1; i < uLen; i++) {
                    let value = updatedata[i];
                    let flag = true;
                    for (let a = 0; a < prevData.length; a++) {
                        let ditem = prevData[a];
                        if (_this.matchOpt(value, ditem)) {
                            prevData.splice(a, 1, value);
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        prevData = prevData.concat(value);
                    }
                }
                updatedata = prevData;
            }
            if (updatedata == null || updatedata.length == 0) {
                return;
            }
            _this.clearlocaldata(function () {
                localforage.setItem(cahce_key, updatedata).then(function () {
                    func(cahce_key, updatedata);
                });
            });
        },
        clearcachelocaldata: function (func) {
            let key = this.gridKey;
            let cahce_key = key + '__qkcache';
            localforage.removeItem(cahce_key, function (err, value) {
                if (func && typeof func == 'function') {
                    func();
                }
            });
        },
        restorecachelocaldata: function (func) {
            let key = this.gridKey;
            let cahce_key = key + '__qkcache';
            let _this = this;
            localforage.getItem(cahce_key).then(function (readValue) {
                let updatedata = readValue;
                _this.getlocaldata(function (data) {
                    if (data == null) {
                        data = [];
                    }
                    let newdata = updatedata.concat(data);
                    _this.localdata = newdata;
                    if (func instanceof Function) {
                        func(_this.localdata);
                    }
                });
            });
        },
        keepHighLightBox: function () {
            Store.cooperativeEdit.checkoutData.forEach(value => {
                if (value.index == Store.currentSheetIndex) {
                    if (value.op === 'enterEdit') {
                        server.multipleRangeShow(value.id, value.username, value.r, value.c, value.op);
                    } else {
                        server.multipleRangeShow(value.id, value.username, value.r, value.c);
                    }
                }
            });
        }
    };
    return server;
});