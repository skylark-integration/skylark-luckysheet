define([
    '../methods/get',
    '../utils/util',
    '../methods/getdata',
    '../methods/datecontroll',
    '../methods/format',
    '../methods/validate',
    "../methods/pivotTable_methods",
    '../methods/sort_methods',
    '../widgets/tooltip',
    '../widgets/cleargridelement',
    '../methods/array',
    '../methods/analysis',
    '../widgets/select',
    '../methods/luckysheetConfigsetting',
    '../methods/sheetSearch',
    '../widgets/constant',
    '../methods/sheets',
    '../widgets/resize',
    '../methods/protection_methods',
    '../store',
    '../locale/locale',
    '../vendors/numeral'
], function (m_get, m_util, m_getdata, m_datecontroll, m_format, m_validate, pivotTable_methods,m_sort, tooltip, cleargridelement, luckysheetArray, analysis, m_select,luckysheetConfigsetting, m_sheetSearch, m_constant, sheets, luckysheetsizeauto,  m_protection, Store, locale, numeral) {
    'use strict';
    const {getSheetIndex, getRangetxt} = m_get;
    const {replaceHtml, getObjType, ABCatNum, numFormat, numfloatlen, showrightclickmenu, mouseclickposition} = m_util;
    const {getdatabyselectionD, getcellvalue, datagridgrowth} = m_getdata;
    const {isdatetime, diff, isdatatypemulti, isdatatype} = m_datecontroll;
    const {genarate, update} = m_format;
    const {isRealNull} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;
    const {orderbydata1D} = m_sort;
    const {selectHightlightShow} = m_select;
    const {luckysheet_searcharray} = m_sheetSearch;
    const {modelHTML, filtermenuHTML, filtersubmenuHTML, pivottableconfigHTML, pivottablesumHTML, luckysheetPivotTableHTML} = m_constant;
    const {checkProtectionAuthorityNormal} = m_protection;
    const pivotTable = Object.assign(pivotTable_methods,{
        showvaluecolrow: function () {
            let _this = this;
            if ($('#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item').length >= 2) {
                $('#luckysheetpivottablevaluecolrowshow').show();
                if (_this.showType == 'column') {
                    $('#luckysheetpivottablevaluecolrow').prop('checked', true);
                    $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").addClass('ui-state-active');
                    $('#luckysheetpivottablevaluecolrow1').prop('checked', false);
                    $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").removeClass('ui-state-active');
                } else {
                    $('#luckysheetpivottablevaluecolrow1').prop('checked', true);
                    $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").addClass('ui-state-active');
                    $('#luckysheetpivottablevaluecolrow').prop('checked', false);
                    $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").removeClass('ui-state-active');
                }
            } else {
                $('#luckysheetpivottablevaluecolrowshow').hide();
            }
        },
        resetOrderby: function (obj) {
            let orderby = $('#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item').index(obj);
            $('#luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column').find('.luckysheet-modal-dialog-slider-config-item').each(function () {
                if ($(this).data('orderby') == orderby) {
                    $(this).data('orderby', 'self');
                }
            });
        },
        luckysheetsliderlistclearfilter: function ($filter) {
            let _this = this;
            let $t = $filter.parent();
            let cindex = $t.data('index');
            let rowhidden = {}, selected = {}, d = _this.origindata, filterdata = {};
            $t.data('rowhidden', '').find('.luckysheet-slider-list-item-filtered').hide();
            _this.setDatatojsfile('selected', {}, cindex);
            _this.setDatatojsfile('rowhidden', null, cindex);
            let newdata = [];
            for (let i = 0; i < d.length; i++) {
                if (rowhidden[i] != null) {
                    continue;
                }
                newdata.push([].concat(d[i]));
            }
            _this.celldata = newdata;
            _this.refreshPivotTable();
            $('#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu').hide();
        },
        luckysheetsliderlistitemfilter: function ($filter) {
            let _this = this;
            const _locale = locale();
            const locale_filter = _locale.filter;
            let $t = $filter.parent(), toffset = $t.offset(), $menu = $('#luckysheet-pivotTableFilter-menu'), winH = $(window).height(), winW = $(window).width();
            let cindex = $t.data('index');
            let rowhidden = $t.data('rowhidden');
            if (rowhidden == null || rowhidden == '') {
                rowhidden = {};
            } else if (getObjType(rowhidden) == 'string') {
                rowhidden = JSON.parse(rowhidden);
            }
            $('body .luckysheet-cols-menu').hide();
            $('#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu').hide();
            $('#luckysheet-pivotTableFilter-byvalue-input').val('');
            $('#luckysheet-pivotTableFilter-bycondition').next().hide();
            $('#luckysheet-pivotTableFilter-byvalue').next().show();
            $menu.data('index', cindex);
            $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input').hide().find('input').val();
            $('#luckysheet-pivotTableFilter-selected span').data('type', '0').data('type', null).text(locale_filter.filiterInputNone);
            let byconditiontype = $t.data('byconditiontype');
            $('#luckysheet-pivotTableFilter-selected span').data('value', $t.data('byconditionvalue')).data('type', byconditiontype).text($t.data('byconditiontext'));
            if (byconditiontype == '2') {
                let $input = $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input2').show().find('input');
                $input.eq(0).val($t.data('byconditionvalue1'));
                $input.eq(1).val($t.data('byconditionvalue2'));
            } else if (byconditiontype == '1') {
                $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input').eq(0).show().find('input').val($t.data('byconditionvalue1'));
            }
            $('#luckysheet-pivotTableFilter-byvalue-select').empty().html('<div style="width:100%;text-align:center;position:relative;top:45%;font-size: 14px;"> <div class="luckysheetLoaderGif"> </div> <span>' + locale_filter.filiterMoreDataTip + '</span></div>');
            let rowhiddenother = {};    //其它筛选列的隐藏行
            //其它筛选列的隐藏行
            $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').not($t.get(0)).each(function () {
                let $t = $(this), rh = $t.data('rowhidden');
                if (rh == null || rh == '') {
                    return true;
                }
                if (getObjType(rh) == 'string') {
                    rh = JSON.parse(rh);
                }
                for (let r in rh) {
                    rowhiddenother[r] = 0;
                }
            });
            let data = _this.origindata;
            setTimeout(function () {
                //日期值
                let dvmap = {};
                let dvmap_uncheck = {};    //除日期以外的值
                //除日期以外的值
                let vmap = {};
                let vmap_uncheck = {};
                for (let r = 1; r < data.length; r++) {
                    if (r in rowhiddenother) {
                        continue;
                    }
                    if (data[r] == null) {
                        continue;
                    }
                    let cell = data[r][cindex];
                    if (cell != null && cell.ct != null && cell.ct.t == 'd') {
                        //单元格是日期
                        let v = update('YYYY-MM-DD', cell.v);
                        let y = v.split('-')[0];
                        let m = v.split('-')[1];
                        let d = v.split('-')[2];
                        if (!(y in dvmap)) {
                            dvmap[y] = {};
                        }
                        if (!(m in dvmap[y])) {
                            dvmap[y][m] = {};
                        }
                        if (!(d in dvmap[y][m])) {
                            dvmap[y][m][d] = 0;
                        }
                        dvmap[y][m][d]++;
                        if (r in rowhidden) {
                            dvmap_uncheck[y] = 0;
                            dvmap_uncheck[m] = 0;
                            dvmap_uncheck[d] = 0;
                        }
                    } else {
                        let v, m;
                        if (cell == null || isRealNull(cell.v)) {
                            v = null;
                            m = null;
                        } else {
                            v = cell.v;
                            m = cell.m;
                        }
                        if (!(v in vmap)) {
                            vmap[v] = {};
                        }
                        if (!(m in vmap[v])) {
                            vmap[v][m] = 0;
                        }
                        vmap[v][m]++;
                        if (r in rowhidden) {
                            vmap_uncheck[v + '#$$$#' + m] = 0;
                        }
                    }
                }    //遍历数据加到页面
                //遍历数据加到页面
                let item = [];
                if (JSON.stringify(dvmap).length > 2) {
                    for (let y in dvmap) {
                        let ysum = 0;
                        let monthHtml = '';
                        for (let m in dvmap[y]) {
                            let msum = 0;
                            let dayHtml = '';
                            for (let d in dvmap[y][m]) {
                                let dayL = dvmap[y][m][d];
                                msum += dayL;    //月 小于 10
                                //月 小于 10
                                let mT;
                                if (Number(m) < 10) {
                                    mT = '0' + Number(m);
                                } else {
                                    mT = m;
                                }    //日 小于 10
                                //日 小于 10
                                let dT;
                                if (Number(d) < 10) {
                                    dT = '0' + Number(d);
                                } else {
                                    dT = d;
                                }    //日是否选中状态
                                //日是否选中状态
                                if (y in dvmap_uncheck && m in dvmap_uncheck && d in dvmap_uncheck) {
                                    dayHtml += '<div class="day luckysheet-mousedown-cancel cf" data-check="false" title="' + y + '-' + mT + '-' + dT + '">' + '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' + '<label class="luckysheet-mousedown-cancel">' + d + '</label>' + '<span class="count luckysheet-mousedown-cancel">( ' + dayL + ' )</span>' + '</div>';
                                } else {
                                    dayHtml += '<div class="day luckysheet-mousedown-cancel cf" data-check="true" title="' + y + '-' + mT + '-' + dT + '">' + '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' + '<label class="luckysheet-mousedown-cancel">' + d + '</label>' + '<span class="count luckysheet-mousedown-cancel">( ' + dayL + ' )</span>' + '</div>';
                                }
                            }
                            ysum += msum;    //月 小于 10
                            //月 小于 10
                            let mT2;
                            if (Number(m) < 10) {
                                mT2 = '0' + Number(m);
                            } else {
                                mT2 = m;
                            }    //月是否选中状态
                            //月是否选中状态
                            if (y in dvmap_uncheck && m in dvmap_uncheck) {
                                monthHtml += '<div class="monthBox luckysheet-mousedown-cancel">' + '<div class="month luckysheet-mousedown-cancel cf" data-check="false" title="' + y + '-' + mT2 + '">' + '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' + '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' + '<label class="luckysheet-mousedown-cancel">' + m + '' + locale_filter.filiterMonthText + '</label>' + '<span class="count luckysheet-mousedown-cancel">( ' + msum + ' )</span>' + '</div>' + '<div class="dayList luckysheet-mousedown-cancel">' + dayHtml + '</div>' + '</div>';
                            } else {
                                monthHtml += '<div class="monthBox luckysheet-mousedown-cancel">' + '<div class="month luckysheet-mousedown-cancel cf" data-check="true" title="' + y + '-' + mT2 + '">' + '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' + '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' + '<label class="luckysheet-mousedown-cancel">' + m + '' + locale_filter.filiterMonthText + '</label>' + '<span class="count luckysheet-mousedown-cancel">( ' + msum + ' )</span>' + '</div>' + '<div class="dayList luckysheet-mousedown-cancel">' + dayHtml + '</div>' + '</div>';
                            }
                        }    //年是否选中状态
                        //年是否选中状态
                        let yearHtml;
                        if (y in dvmap_uncheck) {
                            yearHtml = '<div class="yearBox luckysheet-mousedown-cancel">' + '<div class="year luckysheet-mousedown-cancel cf" data-check="false" title="' + y + '">' + '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' + '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' + '<label class="luckysheet-mousedown-cancel">' + y + '' + locale_filter.filiterYearText + '</label>' + '<span class="count luckysheet-mousedown-cancel">( ' + ysum + ' )</span>' + '</div>' + '<div class="monthList luckysheet-mousedown-cancel">' + monthHtml + '</div>' + '</div>';
                        } else {
                            yearHtml = '<div class="yearBox luckysheet-mousedown-cancel">' + '<div class="year luckysheet-mousedown-cancel cf" data-check="true" title="' + y + '">' + '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' + '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' + '<label class="luckysheet-mousedown-cancel">' + y + '' + locale_filter.filiterYearText + '</label>' + '<span class="count luckysheet-mousedown-cancel">( ' + ysum + ' )</span>' + '</div>' + '<div class="monthList luckysheet-mousedown-cancel">' + monthHtml + '</div>' + '</div>';
                        }
                        item.unshift(yearHtml);
                    }
                }
                if (JSON.stringify(vmap).length > 2) {
                    let vmapKeys = Object.keys(vmap);
                    vmapKeys = orderbydata1D(vmapKeys, true);
                    for (let i = 0; i < vmapKeys.length; i++) {
                        let v = vmapKeys[i];
                        for (let x in vmap[v]) {
                            let text;
                            if (v + '#$$$#' + x == 'null#$$$#null') {
                                text = locale_filter.valueBlank;
                            } else {
                                text = x;
                            }    //是否选中状态
                            //是否选中状态
                            let dataHtml;
                            if (v + '#$$$#' + x in vmap_uncheck) {
                                dataHtml = '<div class="textBox luckysheet-mousedown-cancel cf" data-check="false" data-filter="' + (v + '#$$$#' + x) + '" title="' + x + '">' + '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' + '<label class="luckysheet-mousedown-cancel">' + text + '</label>' + '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' + '</div>';
                            } else {
                                dataHtml = '<div class="textBox luckysheet-mousedown-cancel cf" data-check="true" data-filter="' + (v + '#$$$#' + x) + '" title="' + x + '">' + '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' + '<label class="luckysheet-mousedown-cancel">' + text + '</label>' + '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' + '</div>';
                            }
                            item.push(dataHtml);
                        }
                    }
                }
                $('#luckysheet-pivotTableFilter-byvalue-select').html("<div class='ListBox luckysheet-mousedown-cancel' style='max-height:" + (winH - toffset.top - 350) + "px;overflow-y:auto;overflow-x:hidden;'>" + item.join('') + '</div>');
            }, 1);
            showrightclickmenu($menu, toffset.left - 250, toffset.top);
        },

        createPivotTable: function (e) {
            if (isEditMode() || Store.allowEdit === false) {
                return;
            }
            let _this = this;
            let datasheetindex = Store.currentSheetIndex;
            const _locale = locale();
            const locale_pivotTable = _locale.pivotTable;
            if (isEditMode()) {
                alert(locale_pivotTable.errorNotAllowEdit);
                return;
            }
            if (Store.luckysheet_select_save.length > 1) {
                tooltip.info('', locale_pivotTable.errorNotAllowMulti);
                return;
            }
            if (Store.luckysheet_select_save.length == 0 || Store.luckysheet_select_save[0].row[0] == Store.luckysheet_select_save[0].row[1] || Store.luckysheet_select_save[0].column[0] == Store.luckysheet_select_save[0].column[1]) {
                tooltip.info('', locale_pivotTable.errorSelectRange);
                return;
            }
            let select_save = $.extend(true, {}, Store.luckysheet_select_save[0]);
            sheets.addNewSheet(e, true); //TODO:lwf
            _this.getCellData(Store.currentSheetIndex, datasheetindex, select_save);
            _this.setDatatojsfile('pivot_select_save', select_save);
            _this.setDatatojsfile('pivotDataSheetIndex', datasheetindex);
            _this.initialPivotManage();
        },
        changePivotTable: function (index) {
            let _this = this;
            const _locale = locale();
            const locale_pivotTable = _locale.pivotTable;
            let pivotDataSheetIndex = Store.luckysheetfile[getSheetIndex(index)].pivotTable.pivotDataSheetIndex;
            let real_pivotDataSheetIndex = getSheetIndex(pivotDataSheetIndex);
            if (real_pivotDataSheetIndex == null) {
                tooltip.info(locale_pivotTable.errorIsDamage, '');
                return;
            }
            _this.getCellData(index);
            _this.initialPivotManage(true);
            _this.refreshPivotTable();    //初始化在一个普通sheet页，从此普通sheet页切换到数据透视表页时，需要刷新下数据，否则还是旧数据
        },
        //初始化在一个普通sheet页，从此普通sheet页切换到数据透视表页时，需要刷新下数据，否则还是旧数据
        refreshPivotTable: function (isRefreshCanvas = true) {
            let _this = this;
            let redo = {};
            redo['pivotTable'] = pivotTable_methods;
            redo['data'] = Store.deepCopyFlowData(Store.flowdata);    //取数据
            //取数据
            _this.storePivotTableParam();
            let ret = _this.dataHandler(_this.column, _this.row, _this.values, _this.showType, _this.celldata);
            _this.setDatatojsfile('pivotDatas', ret);
            let d = $.extend(true, [], sheets.nulldata);
            let data = d;
            let addr = 0, addc = 0;
            if (ret.length == 0) {
                _this.setDatatojsfile('drawPivotTable', true);
                _this.setDatatojsfile('pivotTableBoundary', [
                    12,
                    6
                ]);
            } else {
                _this.setDatatojsfile('drawPivotTable', false);
                _this.setDatatojsfile('pivotTableBoundary', [
                    ret.length,
                    ret[0].length
                ]);
                let rlen = ret.length, clen = ret[0].length;
                addr = rlen - d.length;
                addc = clen - d[0].length;
                data = datagridgrowth(d, addr + 20, addc + 10, true);
                for (let r = 0; r < rlen; r++) {
                    let x = [].concat(data[r]);
                    for (let c = 0; c < clen; c++) {
                        let value = '';
                        if (ret[r] != null && ret[r][c] != null) {
                            value = getcellvalue(r, c, ret);
                        }
                        x[c] = value;
                    }
                    data[r] = x;
                }
            }
            redo['type'] = 'pivotTable_change';
            redo['curdata'] = $.extend(true, [], data);
            redo['sheetIndex'] = Store.currentSheetIndex;
            let pivotTable = _this.getPivotTableData();
            redo['pivotTablecur'] = pivotTable;
            if (Store.clearjfundo) {
                Store.jfundo.length = 0;
                Store.jfredo.push(redo);
            }
            cleargridelement();
            Store.clearjfundo = false;
            if (addr > 0 || addc > 0) {
                ///jfrefreshgridall(data[0].length, data.length, data, null, Store.luckysheet_select_save, 'datachangeAll', undefined, undefined, isRefreshCanvas);
                Store.refreshGridAll(data[0].length, data.length, data, null, Store.luckysheet_select_save, 'datachangeAll', undefined, undefined, isRefreshCanvas);
            } else {
                ///jfrefreshgrid(data, Store.luckysheet_select_save, {}, null, isRefreshCanvas);
                Store.refreshGrid(data, Store.luckysheet_select_save, {}, null, isRefreshCanvas);
                selectHightlightShow();
            }
            Store.clearjfundo = true;
        },
        pivotclick: function (row_index, col_index, index) {
            if (index == null) {
                index = Store.currentSheetIndex;
            }
            let file = Store.luckysheetfile[getSheetIndex(index)];
            if (!file.isPivotTable) {
                return;
            }
            let pivotDataSheetIndex = file.pivotTable.pivotDataSheetIndex;
            let real_pivotDataSheetIndex = getSheetIndex(pivotDataSheetIndex);
            if (real_pivotDataSheetIndex == null) {
                return;
            }
            let slider = $('#luckysheet-modal-dialog-slider-pivot');
            let isRangeClick = this.isPivotRange(row_index, col_index);
            if (isRangeClick && slider.is(':hidden')) {
                if (!checkProtectionAuthorityNormal(index, 'usePivotTablereports', false)) {
                    // Store.luckysheet_select_status = false;
                    return;
                }
                slider.show();
                luckysheetsizeauto();
                $('#luckysheet-sta-content').css('padding-right', 260);
            } else if (!isRangeClick && slider.is(':visible')) {
                slider.hide();
                luckysheetsizeauto();
                $('#luckysheet-sta-content').css('padding-right', 10);
            }
        },
        storePivotTableParam: function () {
            let _this = this;
            let columnarr = [], rowarr = [], filterarr = [], valuesarr = [];
            $('#luckysheet-modal-dialog-config-filter .luckysheet-modal-dialog-slider-config-item').each(function () {
                let item = {};
                item['index'] = $(this).data('index');
                item['name'] = $(this).data('name');
                item['fullname'] = $(this).find('.luckysheet-modal-dialog-slider-config-item-txt').text();
                filterarr.push(item);
            });
            $('#luckysheet-modal-dialog-config-row .luckysheet-modal-dialog-slider-config-item').each(function () {
                let item = {};
                item['index'] = $(this).data('index');
                item['name'] = $(this).data('name');
                item['fullname'] = $(this).find('.luckysheet-modal-dialog-slider-config-item-txt').text();
                item['order'] = $(this).data('order');
                item['orderby'] = $(this).data('orderby');
                item['stastic'] = $(this).data('stastic');
                rowarr.push(item);
            });
            $('#luckysheet-modal-dialog-config-column .luckysheet-modal-dialog-slider-config-item').each(function () {
                let item = {};
                item['index'] = $(this).data('index');
                item['name'] = $(this).data('name');
                item['fullname'] = $(this).find('.luckysheet-modal-dialog-slider-config-item-txt').text();
                item['order'] = $(this).data('order');
                item['orderby'] = $(this).data('orderby');
                item['stastic'] = $(this).data('stastic');
                columnarr.push(item);
            });
            $('#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item').each(function () {
                let item = {};
                item['index'] = $(this).data('index');
                item['name'] = $(this).data('name');
                item['fullname'] = $(this).find('.luckysheet-modal-dialog-slider-config-item-txt').text();
                item['sumtype'] = $(this).data('sumtype');
                item['nameindex'] = $(this).data('nameindex');
                valuesarr.push(item);
            });
            _this.setDatatojsfile('column', columnarr);
            _this.setDatatojsfile('row', rowarr);
            _this.setDatatojsfile('filter', filterarr);
            _this.setDatatojsfile('values', valuesarr);
            let showtype = $('#luckysheetpivottablevaluecolrow:checked, #luckysheetpivottablevaluecolrow1:checked').val();
            _this.setDatatojsfile('showType', showtype == '0' ? 'row' : 'column');
            let pivotTable = _this.getPivotTableData();
            delete pivotTable.pivotDatas;
            Store.saveParam('all', _this.pivotSheetIndex, pivotTable, { 'k': 'pivotTable' });
        },
        initialPivotManage: function (restore) {
            let _this = this;
            const _locale = locale();
            const locale_pivotTable = _locale.pivotTable;
            const locale_button = _locale.button;
            const locale_filter = _locale.filter;
            if (_this.initial) {
                _this.initial = false;
                $('body').append(luckysheetPivotTableHTML());
                $('#luckysheet-modal-dialog-slider-close').click(function () {
                    $('#luckysheet-modal-dialog-slider-pivot').hide();
                    luckysheetsizeauto();
                });
                $('body').append(replaceHtml(modelHTML, {
                    'id': 'luckysheet-data-pivotTable-selection',
                    'addclass': 'luckysheet-data-pivotTable-selection',
                    'title': locale_pivotTable.titleSelectionDataRange,
                    'content': '<input id="luckysheet-pivotTable-range-selection-input" class="luckysheet-datavisual-range-container" style="font-size: 14px;padding:5px;max-width:none;" spellcheck="false" aria-label="' + locale_pivotTable.titleDataRange + '" placeholder="' + locale_pivotTable.titleDataRange + '">',
                    'botton': '<button id="luckysheet-pivotTable-selection-confirm" class="btn btn-primary">' + locale_button.confirm + '</button><button class="btn btn-default luckysheet-model-close-btn">' + locale_button.cancel + '</button>'
                }));
                $('body').append(replaceHtml(filtermenuHTML(), { 'menuid': 'pivotTableFilter' }));
                $('body').append(replaceHtml(filtersubmenuHTML(), { 'menuid': 'pivotTableFilter' }));
                $('body').append(pivottableconfigHTML());
                $('body').append(pivottablesumHTML());
                $('#luckysheet-pivotTableFilter-orderby-asc').remove();
                $('#luckysheet-pivotTableFilter-orderby-desc').next().remove();
                $('#luckysheet-pivotTableFilter-orderby-desc').remove();
                $('#luckysheet-pivotTableFilter-orderby-color').next().remove();
                $('#luckysheet-pivotTableFilter-orderby-color').remove();
                $('#luckysheetpivottablevaluecolrow, #luckysheetpivottablevaluecolrow1').checkboxradio({ icon: false }).change(function () {
                    _this.refreshPivotTable();
                });
                let hidefilersubmenu = null;
                $('#luckysheet-pivotTableFilter-menu').mouseover(function () {
                    clearTimeout(hidefilersubmenu);
                    hidefilersubmenu = setTimeout(function () {
                        $('#luckysheet-pivotTableFilter-submenu').hide();
                    }, 500);
                });    //点击复选框
                //点击复选框
                $(document).off('click.ptFilterCheckbox1').on('click.ptFilterCheckbox1', '#luckysheet-pivotTableFilter-byvalue-select .textBox', function () {
                    if ($(this).attr('data-check') == 'true') {
                        $(this).attr('data-check', 'false');
                        $(this).find("input[type='checkbox']").removeAttr('checked');
                    } else {
                        $(this).attr('data-check', 'true');
                        $(this).find("input[type='checkbox']").prop('checked', true);
                    }
                });
                $(document).off('click.ptFilterCheckbox2').on('click.ptFilterCheckbox2', '#luckysheet-pivotTableFilter-byvalue-select .year', function () {
                    if ($(this).attr('data-check') == 'true') {
                        $(this).attr('data-check', 'false');
                        $(this).parents('.yearBox').find('.month').attr('data-check', 'false');
                        $(this).parents('.yearBox').find('.day').attr('data-check', 'false');
                        $(this).parents('.yearBox').find("input[type='checkbox']").removeAttr('checked');
                    } else {
                        $(this).attr('data-check', 'true');
                        $(this).parents('.yearBox').find('.month').attr('data-check', 'true');
                        $(this).parents('.yearBox').find('.day').attr('data-check', 'true');
                        $(this).parents('.yearBox').find("input[type='checkbox']").prop('checked', true);
                    }
                });
                $(document).off('click.ptFilterCheckbox3').on('click.ptFilterCheckbox3', '#luckysheet-pivotTableFilter-byvalue-select .month', function () {
                    //月份 对应的 天
                    if ($(this).attr('data-check') == 'true') {
                        $(this).attr('data-check', 'false');
                        $(this).parents('.monthBox').find('.day').attr('data-check', 'false');
                        $(this).parents('.monthBox').find("input[type='checkbox']").removeAttr('checked');
                    } else {
                        $(this).attr('data-check', 'true');
                        $(this).parents('.monthBox').find('.day').attr('data-check', 'true');
                        $(this).parents('.monthBox').find("input[type='checkbox']").prop('checked', true);
                    }    //月份 对应的 年份
                    //月份 对应的 年份
                    let yearDayAllCheck = true;
                    let $yearDay = $(this).parents('.yearBox').find('.day');
                    $yearDay.each(function (i, e) {
                        if ($(e).attr('data-check') == 'true') {
                        } else {
                            yearDayAllCheck = false;
                        }
                    });
                    if (yearDayAllCheck) {
                        $(this).parents('.yearBox').find('.year').attr('data-check', 'true');
                        $(this).parents('.yearBox').find(".year input[type='checkbox']").prop('checked', true);
                    } else {
                        $(this).parents('.yearBox').find('.year').attr('data-check', 'false');
                        $(this).parents('.yearBox').find(".year input[type='checkbox']").removeAttr('checked');
                    }
                });
                $(document).off('click.ptFilterCheckbox4').on('click.ptFilterCheckbox4', '#luckysheet-pivotTableFilter-byvalue-select .day', function () {
                    if ($(this).attr('data-check') == 'true') {
                        $(this).attr('data-check', 'false');
                        $(this).find("input[type='checkbox']").removeAttr('checked');
                    } else {
                        $(this).attr('data-check', 'true');
                        $(this).find("input[type='checkbox']").prop('checked', true);
                    }    //天 对应的 月份
                    //天 对应的 月份
                    let monthDayAllCheck = true;
                    let $monthDay = $(this).parents('.monthBox').find('.day');
                    $monthDay.each(function (i, e) {
                        if ($(e).attr('data-check') == 'true') {
                        } else {
                            monthDayAllCheck = false;
                        }
                    });
                    if (monthDayAllCheck) {
                        $(this).parents('.monthBox').find('.month').attr('data-check', 'true');
                        $(this).parents('.monthBox').find(".month input[type='checkbox']").prop('checked', true);
                    } else {
                        $(this).parents('.monthBox').find('.month').attr('data-check', 'false');
                        $(this).parents('.monthBox').find(".month input[type='checkbox']").removeAttr('checked');
                    }    //天 对应的 年份
                    //天 对应的 年份
                    let yearDayAllCheck = true;
                    let $yearDay = $(this).parents('.yearBox').find('.day');
                    $yearDay.each(function (i, e) {
                        if ($(e).attr('data-check') == 'true') {
                        } else {
                            yearDayAllCheck = false;
                        }
                    });
                    if (yearDayAllCheck) {
                        $(this).parents('.yearBox').find('.year').attr('data-check', 'true');
                        $(this).parents('.yearBox').find(".year input[type='checkbox']").prop('checked', true);
                    } else {
                        $(this).parents('.yearBox').find('.year').attr('data-check', 'false');
                        $(this).parents('.yearBox').find(".year input[type='checkbox']").removeAttr('checked');
                    }
                });    //日期 三级下拉显示
                //日期 三级下拉显示
                $(document).off('click.ptFilterYearDropdown').on('click.ptFilterYearDropdown', '#luckysheet-pivotTableFilter-byvalue-select .yearBox .fa-caret-right', function () {
                    let $p = $(this).parents('.luckysheet-mousedown-cancel');
                    if ($p.hasClass('year')) {
                        $(this).parents('.yearBox').find('.monthList').slideToggle();
                    }
                    if ($p.hasClass('month')) {
                        $(this).parents('.monthBox').find('.dayList').slideToggle();
                    }
                });    //全选
                //全选
                $('#luckysheet-pivotTableFilter-byvalue-btn-all').click(function () {
                    $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").prop('checked', true);
                    $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").parents('.luckysheet-mousedown-cancel').attr('data-check', 'true');
                });    //反选
                //反选
                $('#luckysheet-pivotTableFilter-byvalue-btn-contra').click(function () {
                    let $input = $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']");
                    $input.each(function (i, e) {
                        if ($(e).is(':checked')) {
                            $(e).removeAttr('checked');
                            $(e).parents('.luckysheet-mousedown-cancel').attr('data-check', 'false');
                        } else {
                            $(e).prop('checked', true);
                            $(e).parents('.luckysheet-mousedown-cancel').attr('data-check', 'true');
                        }
                    });    //天 对应的 月份
                    //天 对应的 月份
                    let $month = $('#luckysheet-pivotTableFilter-byvalue-select .ListBox .monthBox');
                    $month.each(function (index, event) {
                        let monthDayAllCheck = true;
                        let $monthDay = $(event).find(".day input[type='checkbox']");
                        $monthDay.each(function (i, e) {
                            if ($(e).is(':checked')) {
                            } else {
                                monthDayAllCheck = false;
                            }
                        });
                        if (monthDayAllCheck) {
                            $(event).find(".month input[type='checkbox']").prop('checked', true);
                            $(event).attr('data-check', 'true');
                        } else {
                            $(event).find(".month input[type='checkbox']").removeAttr('checked');
                            $(event).attr('data-check', 'false');
                        }
                    });    //天 对应的 年份
                    //天 对应的 年份
                    let $year = $('#luckysheet-pivotTableFilter-byvalue-select .ListBox .yearBox');
                    $year.each(function (index, event) {
                        let yearDayAllCheck = true;
                        let $yearDay = $(event).find(".day input[type='checkbox']");
                        $yearDay.each(function (i, e) {
                            if ($(e).is(':checked')) {
                            } else {
                                yearDayAllCheck = false;
                            }
                        });
                        if (yearDayAllCheck) {
                            $(event).find(".year input[type='checkbox']").prop('checked', true);
                            $(event).attr('data-check', 'true');
                        } else {
                            $(event).find(".year input[type='checkbox']").removeAttr('checked');
                            $(event).attr('data-check', 'false');
                        }
                    });
                });    //清除
                //清除
                $('#luckysheet-pivotTableFilter-byvalue-btn-clear').click(function () {
                    $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").removeAttr('checked');
                    $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").parents('.luckysheet-mousedown-cancel').attr('data-check', 'false');
                });    //按照值进行筛选
                //按照值进行筛选
                $('#luckysheet-pivotTableFilter-byvalue-input').on('input propertychange', function () {
                    let v = $(this).val().toString();
                    $('#luckysheet-pivotTableFilter-byvalue-select .ListBox .luckysheet-mousedown-cancel').show();
                    if (v != '') {
                        let $check = $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']");
                        $check.each(function (i, e) {
                            let $p = $(e).parents('.luckysheet-mousedown-cancel');
                            if ($p.hasClass('day')) {
                                //日期
                                let day = $(e).siblings('label').text().toString();
                                let month = $(e).parents('.monthBox').find('.month label').text().toString();
                                let year = $(e).parents('.yearBox').find('.year label').text().toString();
                                let itemV = year + '-' + month + '-' + day;
                                if (itemV.indexOf(v) == -1) {
                                    $(e).parents('.day').hide();    //天 对应的 月份
                                    //天 对应的 月份
                                    let $monthDay = $(e).parents('.dayList').find('.day:visible');
                                    if ($monthDay.length == 0) {
                                        $(e).parents('.monthBox').find('.month').hide();
                                    }    //天 对应的 年份
                                    //天 对应的 年份
                                    let $yearDay = $(e).parents('.monthList').find('.day:visible');
                                    if ($yearDay.length == 0) {
                                        $(e).parents('.yearBox').find('.year').hide();
                                    }
                                }
                            }
                            if ($p.hasClass('textBox')) {
                                //其它
                                let itemV = $(e).siblings('label').text().toString();
                                if (itemV.indexOf(v) == -1) {
                                    $(e).parents('.textBox').hide();
                                }
                            }
                        });
                    }
                });
                $('#luckysheet-pivotTableFilter-bycondition, #luckysheet-pivotTableFilter-byvalue').click(function () {
                    let $t = $(this);
                    $t.next().slideToggle(200);
                    setTimeout(function () {
                        if ($t.attr('id') == 'luckysheet-pivotTableFilter-bycondition' && $('#luckysheet-pivotTableFilter-bycondition').next().is(':visible')) {
                            if ($('#luckysheet-pivotTableFilter-selected span').text() != locale_filter.filiterInputNone) {
                                $('#luckysheet-pivotTableFilter-byvalue').next().slideUp(200);
                            }
                        }
                        if ($t.is($('#luckysheet-pivotTableFilter-bycondition'))) {
                            if ($('#luckysheet-pivotTableFilter-bycondition').next().is(':hidden') && $('#luckysheet-pivotTableFilter-byvalue').next().is(':hidden')) {
                                $('#luckysheet-pivotTableFilter-byvalue').next().slideDown(200);
                            }
                        }
                    }, 300);
                });    //取消按钮
                //取消按钮
                $('#luckysheet-pivotTableFilter-cancel').click(function () {
                    $('#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu').hide();
                });
                $('#luckysheet-pivotTableFilter-selected').click(function () {
                    let $t = $(this), toffset = $t.offset(), $menu = $('#luckysheet-pivotTableFilter-submenu');
                    $menu.hide();
                    let winH = $(window).height(), winW = $(window).width();
                    let menuW = $menu.width(), menuH = $menu.height();
                    let top = toffset.top, left = toffset.left, mheight = winH - toffset.top - 20;
                    if (toffset.left + menuW > winW) {
                        left = toffset.left - menuW;
                    }
                    if (toffset.top > winH / 2) {
                        top = winH - toffset.top;
                        if (top < 0) {
                            top = 0;
                        }
                        mheight = toffset.top - 20;
                    }
                    $menu.css({
                        'top': top,
                        'left': left,
                        'height': mheight
                    }).show();
                    clearTimeout(hidefilersubmenu);
                });    //按条件过滤
                //按条件过滤
                $('#luckysheet-pivotTableFilter-submenu').mouseover(function () {
                    clearTimeout(hidefilersubmenu);
                }).find('.luckysheet-cols-menuitem').click(function (e) {
                    $('#luckysheet-pivotTableFilter-selected span').html($(this).find('.luckysheet-cols-menuitem-content').text()).data('value', $(this).data('value'));
                    $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input').hide();
                    if ($(this).data('type') == '2') {
                        $('#luckysheet-pivotTableFilter-selected span').data('type', '2');
                        $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input2').show();
                    } else if ($(this).data('type') == '0') {
                        $('#luckysheet-pivotTableFilter-selected span').data('type', '0');
                    } else {
                        $('#luckysheet-pivotTableFilter-selected span').data('type', '1');
                        $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input').eq(0).show();    //若是日期 改变input type类型为date
                        //若是日期 改变input type类型为date
                        if ($(this).attr('data-value') == 'dateequal' || $(this).attr('data-value') == 'datelessthan' || $(this).attr('data-value') == 'datemorethan') {
                            $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input input').prop('type', 'date');
                        } else {
                            $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input input').prop('type', 'text');
                        }
                    }
                    $('#luckysheet-pivotTableFilter-byvalue').next().slideUp();
                    $('#luckysheet-pivotTableFilter-submenu').hide();
                });
                $('#luckysheet-modal-dialog-pivotTable-list').on('click', ' .luckysheet-slider-list-item-filter', function (e) {
                    _this.luckysheetsliderlistitemfilter($(this));
                    e.stopPropagation();
                    return false;
                });
                $('#luckysheet-modal-dialog-pivotTable-list').on('click', ' .luckysheet-slider-list-item-filtered', function (e) {
                    _this.luckysheetsliderlistclearfilter($(this).next());
                    e.stopPropagation();
                    return false;
                });
                $('#luckysheet-dialog-pivotTable-range-seleted').click(function () {
                    $('#luckysheet-modal-dialog-slider-pivot').hide();
                    luckysheetsizeauto();
                    let $t = $('#luckysheet-data-pivotTable-selection'), myh = $t.outerHeight(), myw = $t.outerWidth();
                    let winw = $(window).width(), winh = $(window).height();
                    let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
                    $('#luckysheet-data-pivotTable-selection').css({
                        'left': (winw + scrollLeft - myw) / 2,
                        'top': (winh + scrollTop - myh) / 4
                    }).show();
                    _this.jgridCurrentPivotInput = $('#luckysheet-dialog-pivotTable-range').html();
                    $('#luckysheet-pivotTable-range-selection-input').val(_this.jgridCurrentPivotInput);
                    _this.luckysheet_pivotTable_select_state = true;
                });    //清除筛选按钮
                //清除筛选按钮
                $('#luckysheet-pivotTableFilter-initial').click(function () {
                    $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-slider-list-item-filtered').hide();
                    $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').data('rowhidden', '');
                    $('#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu').hide();
                    $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input').hide().find('input').val();
                    $('#luckysheet-pivotTableFilter-selected span').data('type', '0').data('type', null).text(locale_filter.filiterInputNone);
                    _this.setDatatojsfile('filterparm', null);
                    _this.celldata = _this.origindata;
                    _this.refreshPivotTable();
                });
                $('#luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column').on('click', '.luckysheet-modal-dialog-slider-config-item-icon', function (e) {
                    let $t = $(e.target), $item = $t.closest('.luckysheet-modal-dialog-slider-config-item'), cindex = $item.data('index'), toffset = $item.offset();
                    let order = $item.data('order'), orderby = $item.data('orderby'), stastic = $item.data('stastic');
                    if (order == null) {
                        order = 'default';
                    }
                    let option = '<option value="self">' + $item.find('.luckysheet-modal-dialog-slider-config-item-txt').data('name') + '</option>';
                    $('#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item').each(function (i) {
                        option += '<option value="' + i + '">' + $(this).find('.luckysheet-modal-dialog-slider-config-item-txt').text() + '</option>';
                    });
                    $('#luckysheet-pivotTable-config-option-orderby').empty().html(option);
                    if (orderby == null) {
                        orderby = 'self';
                    }
                    if (stastic == null) {
                        stastic = '1';
                    }
                    $('#luckysheet-pivotTable-config-option-order').val(order).data('index', cindex);
                    $('#luckysheet-pivotTable-config-option-orderby').val(orderby).data('index', cindex);
                    $('#luckysheet-pivotTable-config-option-stastic').val(stastic).data('index', cindex);
                    mouseclickposition($('#luckysheet-pivotTable-config-option'), toffset.left + $item.outerWidth(), toffset.top - 13, 'rightbottom');
                    e.stopPropagation();
                    return false;
                });
                $('#luckysheet-pivotTable-config-option-order,#luckysheet-pivotTable-config-option-orderby,#luckysheet-pivotTable-config-option-stastic').change(function () {
                    let $t = $(this), cindex = $t.data('index');
                    $('#luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column').find('.luckysheet-modal-dialog-slider-config-item').each(function () {
                        if ($(this).data('index') == cindex) {
                            $(this).data($t.attr('id').replace('luckysheet-pivotTable-config-option-', ''), $t.val());
                        }
                    });
                    _this.refreshPivotTable();
                });
                $('#luckysheet-modal-dialog-config-value').on('click', '.luckysheet-modal-dialog-slider-config-item-icon', function (e) {
                    let $t = $(e.target), $item = $t.closest('.luckysheet-modal-dialog-slider-config-item'), cindex = $item.data('index'), toffset = $item.offset(), sumtype = $item.data('sumtype');
                    let type = _this.pivot_data_type[cindex.toString()];
                    if (sumtype == null) {
                        if (type == 'num') {
                            sumtype = 'SUM';
                        } else {
                            sumtype = 'COUNTA';
                        }
                    }
                    let $menu = $('#luckysheet-pivotTable-config-option-sumtype');
                    $menu.find('.luckysheet-submenu-arrow').hide();
                    $menu.find(".luckysheet-cols-menuitem[sumtype='" + sumtype + "'] .luckysheet-submenu-arrow").css('display', 'inline');
                    $menu.data('item', $item);
                    mouseclickposition($menu, toffset.left + $item.outerWidth(), toffset.top - 13, 'rightbottom');
                    e.stopPropagation();
                    return false;
                });
                $('#luckysheet-pivotTable-config-option-sumtype .luckysheet-cols-menuitem').click(function () {
                    let $item = $('#luckysheet-pivotTable-config-option-sumtype').data('item');
                    let sumtype = $(this).attr('sumtype');
                    $item.data('sumtype', $(this).attr('sumtype'));
                    let name = _this.getSumTypeName(sumtype) + ':' + $item.data('name');
                    $item.attr('title', name).find('.luckysheet-modal-dialog-slider-config-item-txt').html(name);
                    $('#luckysheet-pivotTable-config-option-sumtype').hide();
                    _this.refreshPivotTable();
                });
                $('#luckysheet-modal-dialog-config-filter').on('click', '.luckysheet-modal-dialog-slider-config-item-icon', function (e) {
                    let $t = $(e.target), cindex = $t.closest('.luckysheet-modal-dialog-slider-config-item').data('index');
                    _this.luckysheetsliderlistitemfilter($('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').eq(cindex).find('.luckysheet-slider-list-item-filter'));
                    e.stopPropagation();
                    return false;
                });    //确认按钮
                //确认按钮
                $('#luckysheet-pivotTableFilter-confirm').click(function () {
                    let $menu = $('#luckysheet-pivotTableFilter-menu');
                    let cindex = $menu.data('index');
                    let rowhiddenother = {};    //其它筛选列的隐藏行
                    //其它筛选列的隐藏行
                    $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').each(function () {
                        let $t = $(this), rh = $t.data('rowhidden');
                        if ($t.data('index') != cindex) {
                            if (rh == null || rh == '') {
                                return true;
                            }
                            if (getObjType(rh) == 'string') {
                                rh = JSON.parse(rh);
                            }
                            for (let r in rh) {
                                rowhiddenother[r] = 0;
                            }
                        }
                    });
                    let d = _this.origindata;
                    let filterdata = {};
                    let rowhidden = {};
                    let caljs = {};
                    if ($('#luckysheet-pivotTableFilter-bycondition').next().is(':visible') && $('#luckysheet-pivotTableFilter-byvalue').next().is(':hidden') && $('#luckysheet-pivotTableFilter-selected span').data('value') != 'null') {
                        let $t = $('#luckysheet-pivotTableFilter-selected span');
                        let type = $t.data('type'), value = $t.data('value');
                        caljs['value'] = value;
                        caljs['text'] = $t.text();
                        if (type == '0') {
                            caljs['type'] = '0';
                        } else if (type == '2') {
                            let $input = $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input2 input');
                            caljs['type'] = '2';
                            caljs['value1'] = $input.eq(0).val();
                            caljs['value2'] = $input.eq(1).val();
                        } else {
                            caljs['type'] = '1';
                            caljs['value1'] = $('#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input').eq(0).find('input').val();
                        }
                        for (let r = 1; r < d.length; r++) {
                            if (r in rowhiddenother) {
                                continue;
                            }
                            if (d[r] == null) {
                                continue;
                            }
                            let cell = d[r][cindex];
                            if (value == 'cellnull') {
                                //单元格为空
                                if (cell != null && !isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'cellnonull') {
                                //单元格有数据
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'textinclude') {
                                //文本包含 
                                let value1 = caljs['value1'];
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else {
                                    if (cell.m.indexOf(value1) == -1) {
                                        rowhidden[r] = 0;
                                    }
                                }
                            } else if (value == 'textnotinclude') {
                                //文本不包含
                                let value1 = caljs['value1'];
                                if (cell == null || isRealNull(cell.v)) {
                                } else {
                                    if (cell.m.indexOf(value1) > -1) {
                                        rowhidden[r] = 0;
                                    }
                                }
                            } else if (value == 'textstart') {
                                //文本开头为
                                let value1 = caljs['value1'], valuelen = value1.length;
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else {
                                    if (cell.m.substr(0, valuelen) != value1) {
                                        rowhidden[r] = 0;
                                    }
                                }
                            } else if (value == 'textend') {
                                //文本结尾为
                                let value1 = caljs['value1'], valuelen = value1.length;
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else {
                                    if (valuelen > cell.m.length || cell.m.substr(cell.m.length - valuelen, valuelen) != value1) {
                                        rowhidden[r] = 0;
                                    }
                                }
                            } else if (value == 'textequal') {
                                //文本等于
                                let value1 = caljs['value1'];
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else {
                                    if (cell.m != value1) {
                                        rowhidden[r] = 0;
                                    }
                                }
                            } else if (value == 'dateequal') {
                                //日期等于
                                let value1 = genarate(caljs['value1'])[2];
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'd') {
                                    if (parseInt(cell.v) != value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'datelessthan') {
                                //日期早于
                                let value1 = genarate(caljs['value1'])[2];
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'd') {
                                    if (parseInt(cell.v) >= value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'datemorethan') {
                                //日期晚于
                                let value1 = genarate(caljs['value1'])[2];
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'd') {
                                    if (parseInt(cell.v) <= value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'morethan') {
                                //大于
                                let value1 = parseFloat(caljs['value1']);
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v <= value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'moreequalthan') {
                                //大于等于
                                let value1 = parseFloat(caljs['value1']);
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v < value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'lessthan') {
                                //小于
                                let value1 = parseFloat(caljs['value1']);
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v >= value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'lessequalthan') {
                                //小于等于
                                let value1 = parseFloat(caljs['value1']);
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v > value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'equal') {
                                //等于
                                let value1 = parseFloat(caljs['value1']);
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v != value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'noequal') {
                                //不等于
                                let value1 = parseFloat(caljs['value1']);
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v == value1) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'include') {
                                //介于
                                let value1 = parseFloat(caljs['value1']), value2 = parseFloat(caljs['value2']);
                                let min, max;
                                if (value1 < value2) {
                                    min = value1;
                                    max = value2;
                                } else {
                                    max = value1;
                                    min = value2;
                                }
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v < min || cell.v > max) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            } else if (value == 'noinclude') {
                                //不在其中
                                let value1 = parseFloat(caljs['value1']), value2 = parseFloat(caljs['value2']);
                                let min, max;
                                if (value1 < value2) {
                                    min = value1;
                                    max = value2;
                                } else {
                                    max = value1;
                                    min = value2;
                                }
                                if (cell == null || isRealNull(cell.v)) {
                                    rowhidden[r] = 0;
                                } else if (cell.ct != null && cell.ct.t == 'n') {
                                    if (cell.v >= min && cell.v <= max) {
                                        rowhidden[r] = 0;
                                    }
                                } else {
                                    rowhidden[r] = 0;
                                }
                            }
                        }
                    } else {
                        $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").each(function (i, e) {
                            if ($(e).is(':visible') && $(e).is(':checked')) {
                                return true;
                            }
                            if ($(e).closest('.day').length > 0) {
                                let day = $(e).siblings('label').text();
                                if (Number(day) < 10) {
                                    day = '0' + day;
                                }
                                let month = $(e).closest('.monthBox').find('.month label').text().replace(locale_filter.filiterMonthText, '');
                                if (Number(month) < 10) {
                                    month = '0' + month;
                                }
                                let year = $(e).closest('.yearBox').find('.year label').text().replace(locale_filter.filiterYearText, '');
                                let itemV = locale_filter.filterDateFormatTip + '#$$$#' + year + '-' + month + '-' + day;
                                filterdata[itemV] = '1';
                            }
                            if ($(e).closest('.textBox').length > 0) {
                                let itemV = $(e).closest('.textBox').data('filter');
                                filterdata[itemV] = '1';
                            }
                        });
                        for (let r = 1; r < d.length; r++) {
                            if (r in rowhiddenother) {
                                continue;
                            }
                            if (d[r] == null) {
                                continue;
                            }
                            let cell = d[r][cindex];
                            let value;
                            if (cell == null || isRealNull(cell.v)) {
                                value = 'null#$$$#null';
                            } else if (cell.ct != null && cell.ct.t == 'd') {
                                let fmt = update('YYYY-MM-DD', cell.v);
                                value = locale_filter.filterDateFormatTip + '#$$$#' + fmt;
                            } else {
                                value = cell.v + '#$$$#' + cell.m;
                            }
                            if (value in filterdata) {
                                rowhidden[r] = 0;
                            }
                        }
                    }
                    let $top = $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').eq(cindex);
                    if ($("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']:visible:checked").length < $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']:visible").length || $('#luckysheet-pivotTableFilter-byvalue-input').val().length > 0 || $('#luckysheet-pivotTableFilter-bycondition').next().is(':visible') && $('#luckysheet-pivotTableFilter-byvalue').next().is(':hidden') && $('#luckysheet-pivotTableFilter-selected span').data('value') != 'null') {
                        $top.data('rowhidden', JSON.stringify(rowhidden)).find('.luckysheet-slider-list-item-filtered').show();
                        _this.setDatatojsfile('rowhidden', rowhidden, cindex);
                        if (caljs != null) {
                            $top.data('byconditionvalue', caljs['value']).data('byconditiontype', caljs['type']).data('byconditiontext', caljs['text']);
                            if (caljs['value1'] != null) {
                                $top.data('byconditionvalue1', caljs['value1']);
                            }
                            if (caljs['value2'] != null) {
                                $top.data('byconditionvalue2', caljs['value2']);
                            }
                            _this.setDatatojsfile('caljs', caljs, cindex);
                        }
                    } else {
                        $top.data('rowhidden', '').find('.luckysheet-slider-list-item-filtered').hide();
                        _this.setDatatojsfile('rowhidden', null, cindex);
                    }
                    let newdata = [];
                    for (let i = 0; i < d.length; i++) {
                        if (i in rowhidden || i in rowhiddenother) {
                            continue;
                        }
                        newdata.push([].concat(d[i]));
                    }
                    _this.celldata = newdata;
                    _this.refreshPivotTable();
                    $('#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu').hide();
                    cleargridelement();
                });
                $('#luckysheet-data-pivotTable-selection .luckysheet-model-close-btn, #luckysheet-data-pivotTable-selection .luckysheet-modal-dialog-title-close').click(function () {
                    $('#luckysheet-modal-dialog-slider-pivot').show();
                    luckysheetsizeauto();
                    $('#luckysheet-cell-main .luckysheet-pivotTable-selection-set div').show();
                    $('#luckysheet-data-pivotTable-selection').hide();
                    Store.changeSheet(_this.pivotSheetIndex);
                    _this.luckysheet_pivotTable_select_state = false;
                    cleargridelement();
                });
                $('#luckysheet-pivotTable-selection-confirm').click(function () {
                    let $input = $('#luckysheet-pivotTable-range-selection-input'), val = $input.val();
                    if ($.trim(val).length == 0 || $.trim(val).toUpperCase() == _this.jgridCurrentPivotInput.toUpperCase()) {
                        $input.val(_this.jgridCurrentPivotInput);
                        $('#luckysheet-data-pivotTable-selection .luckysheet-model-close-btn').click();
                        return;
                    } else {
                        let val1 = val.split('!');
                        let sheettxt = '', rangetxt = '', sheetIndex = -1;
                        if (val1.length > 1) {
                            sheettxt = val1[0];
                            rangetxt = val1[1];
                            for (let i in Store.luckysheetfile) {
                                if (sheettxt == Store.luckysheetfile[i].name) {
                                    sheetIndex = Store.luckysheetfile[i].index;
                                    break;
                                }
                            }
                            if (sheetIndex == -1) {
                                sheetIndex = 0;
                            }
                        } else {
                            let index = getSheetIndex(Store.currentSheetIndex);
                            sheettxt = Store.luckysheetfile[index].name;
                            sheetIndex = Store.luckysheetfile[index].index;
                            rangetxt = val1[0];
                        }
                        if (Store.luckysheetfile[getSheetIndex(sheetIndex)].isPivotTable) {
                            if (isEditMode()) {
                                alert(locale_pivotTable.errorNotAllowPivotData);
                            } else {
                                tooltip.info('', locale_pivotTable.errorNotAllowPivotData);
                            }
                            $input.val(_this.jgridCurrentPivotInput);
                            return;
                        }
                        if (rangetxt.indexOf(':') == -1) {
                            if (isEditMode()) {
                                alert(locale_pivotTable.errorSelectionRange);
                            } else {
                                tooltip.info('', locale_pivotTable.errorSelectionRange);
                            }
                            $input.val(_this.jgridCurrentPivotInput);
                            return;
                        }
                        rangetxt = rangetxt.split(':');
                        let row = [], col = [];
                        row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, '')) - 1;
                        row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, '')) - 1;
                        if (row[0] > row[1]) {
                            if (isEditMode()) {
                                alert(locale_pivotTable.errorSelectionRange);
                            } else {
                                tooltip.info('', locale_pivotTable.errorSelectionRange);
                            }
                            $input.val(_this.jgridCurrentPivotInput);
                            return;
                        }
                        col[0] = ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ''));
                        col[1] = ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ''));
                        if (col[0] > col[1]) {
                            if (isEditMode()) {
                                alert(locale_pivotTable.errorSelectionRange);
                            } else {
                                tooltip.info(locale_pivotTable.errorSelectionRange);
                            }
                            $input.val(_this.jgridCurrentPivotInput);
                            return;
                        }
                        Store.changeSheet(_this.pivotSheetIndex);
                        _this.setDatatojsfile('pivot_select_save', {
                            'row': row,
                            'column': col
                        });
                        _this.setDatatojsfile('pivotDataSheetIndex', sheetIndex);
                        _this.getCellData(_this.pivotSheetIndex, sheetIndex, {
                            'row': row,
                            'column': col
                        });
                        _this.initialPivotManage();
                        $('#luckysheet-dialog-pivotTable-range').html(val);
                        $('#luckysheet-modal-dialog-slider-pivot').show();
                        $('#luckysheet-data-pivotTable-selection').hide();
                        _this.luckysheet_pivotTable_select_state = false;
                        _this.refreshPivotTable();
                        luckysheetsizeauto();
                        cleargridelement();
                    }
                });
                $('#luckysheet-modal-dialog-slider-pivot').on('mousedown', '.luckysheet-slider-list-item-name, .luckysheet-modal-dialog-slider-config-item-txt', function (e) {
                    let $cur = $(e.target);
                    _this.movestate = true;
                    _this.movesave.obj = $cur.parent();
                    _this.movesave.name = $cur.data('name');
                    _this.movesave.containerid = $cur.parent().parent().attr('id');
                    _this.movesave.index = $cur.data('index');
                    if ($('#luckysheet-modal-dialog-slider-pivot-move').length == 0) {
                        $('body').append('<div id="luckysheet-modal-dialog-slider-pivot-move">' + _this.movesave.name + '</div>');
                    }
                    _this.movesave.width = $('#luckysheet-modal-dialog-slider-pivot-move').outerWidth();
                    _this.movesave.height = $('#luckysheet-modal-dialog-slider-pivot-move').outerHeight();
                    $('#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value').css('cursor', 'default');
                });
                $('#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value').mousemove(function (e) {
                    if (_this.movestate) {
                        if (_this.moveitemposition.length == 0) {
                            _this.moveitemposition = [0];
                            $(this).find('.luckysheet-modal-dialog-slider-config-item').each(function (i) {
                                let $t = $(this), h = $t.outerHeight();
                                _this.moveitemposition.push(_this.moveitemposition[i] + h + 2);
                            });
                            $(this).append('<div id="luckysheet-modal-dialog-config-order-help" style="position:absolute;height:3px;width:100%;background:#007ACC;z-index:1;pointer-events: none;user-select:none;"></div>');
                        }
                        $('#luckysheet-modal-dialog-slider-pivot-move').css({
                            'background': '#FD8585',
                            'color': '#fff',
                            'border': '1px solid #FD7070'
                        });
                        let x = event.pageX, y = event.pageY, $container = $(this);
                        let curtop = y - $container.offset().top + $container.scrollTop();
                        let position = _this.moveitemposition;
                        let row_index = luckysheet_searcharray(position, curtop);
                        if (row_index == -1) {
                            $('#luckysheet-modal-dialog-config-order-help').css({ 'top': position[position.length - 1] });
                        } else if (curtop - position[row_index - 1] > (position[row_index] - position[row_index - 1]) / 2) {
                            $('#luckysheet-modal-dialog-config-order-help').css({ 'top': position[row_index] });
                        } else {
                            $('#luckysheet-modal-dialog-config-order-help').css({ 'top': position[row_index - 1] });
                        }
                    }
                }).mouseleave(function () {
                    if (_this.movestate) {
                        $('#luckysheet-modal-dialog-slider-pivot-move').css({
                            'background': '#fff',
                            'color': '#000',
                            'border': '1px dotted #000'
                        });
                        _this.moveitemposition = [];
                        $('#luckysheet-modal-dialog-config-order-help').remove();
                    }
                }).mouseup(function (e) {
                    if (_this.movestate) {
                        let $t = $(this);
                        let itemHTML;
                        if (_this.movesave.containerid == $t.attr('id')) {
                            itemHTML = _this.movesave.obj.clone();
                        } else {
                            let name = _this.movesave.name, sumtype = '', nameindex = '';
                            if ($t.attr('id') == 'luckysheet-modal-dialog-config-value') {
                                let type = _this.pivot_data_type[_this.movesave.index.toString()];
                                if (type == 'num') {
                                    name = locale_pivotTable.valueStatisticsSUM + ':' + name;
                                    sumtype = "data-sumtype='SUM'";
                                    nameindex = "data-nameindex='0'";
                                } else {
                                    name = locale_pivotTable.valueStatisticsCOUNTA + ':' + name;
                                    sumtype = "data-sumtype='COUNTA'";
                                    nameindex = "data-nameindex='0'";
                                }
                                $('#luckysheet-modal-dialog-config-value').find('.luckysheet-modal-dialog-slider-config-item').each(function () {
                                    if ($(this).find('.luckysheet-modal-dialog-slider-config-item-txt').text() == name) {
                                        let ni = parseFloat($(this).data('nameindex')) + 1;
                                        name = name + ni.toString();
                                        $(this).data('nameindex', ni);
                                        return false;
                                    }
                                });
                            }
                            itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + nameindex + ' ' + sumtype + ' data-index="' + _this.movesave.index + '" data-name="' + _this.movesave.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + nameindex + ' ' + sumtype + ' data-index="' + _this.movesave.index + '" data-name="' + _this.movesave.name + '">' + name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        }
                        let x = event.pageX, y = event.pageY, $container = $(this);
                        let curtop = y - $container.offset().top + $container.scrollTop();
                        let position = _this.moveitemposition;
                        let row_index = luckysheet_searcharray(position, curtop);
                        if (_this.movesave.containerid == 'luckysheet-modal-dialog-pivotTable-list' || _this.movesave.containerid == 'luckysheet-modal-dialog-config-value' && _this.movesave.containerid != $t.attr('id')) {
                            $('#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column').find('.luckysheet-modal-dialog-slider-config-item').each(function () {
                                if ($(this).data('index') == _this.movesave.index) {
                                    $(this).remove();
                                }
                            });
                        }
                        if (row_index == -1) {
                            if ($t.find('.luckysheet-modal-dialog-slider-config-item').length == 0) {
                                $t.append(itemHTML);
                            } else {
                                $t.find('.luckysheet-modal-dialog-slider-config-item').last().after(itemHTML);
                            }
                        } else if (curtop - position[row_index - 1] > (position[row_index] - position[row_index - 1]) / 2) {
                            $t.find('.luckysheet-modal-dialog-slider-config-item').eq(row_index - 1).after(itemHTML);
                        } else {
                            $t.find('.luckysheet-modal-dialog-slider-config-item').eq(row_index - 1).before(itemHTML);
                        }
                        if (_this.movesave.containerid == 'luckysheet-modal-dialog-pivotTable-list') {
                        } else if (_this.movesave.containerid == 'luckysheet-modal-dialog-config-value' && _this.movesave.containerid != $t.attr('id')) {
                        } else {
                            _this.movesave.obj.remove();
                        }
                        $('#luckysheet-modal-dialog-pivotTable-list').find('.luckysheet-modal-dialog-slider-list-item').each(function () {
                            let $seleted = $(this).find('.luckysheet-slider-list-item-selected');
                            if ($(this).data('index') == _this.movesave.index && $seleted.find('i').length == 0) {
                                $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                            }
                        });
                        _this.refreshPivotTable();
                        $('#luckysheet-modal-dialog-slider-pivot-move').remove();
                        _this.movestate = false;
                        $('#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value').css('cursor', 'default');
                        _this.moveitemposition = [];
                        $('#luckysheet-modal-dialog-config-order-help').remove();
                        _this.showvaluecolrow();
                        e.stopPropagation();
                    }
                });
                $('#luckysheet-modal-dialog-pivotTable-list').on('click', '.luckysheet-slider-list-item-selected', function () {
                    let $t = $(this), $item = $t.parent(), index = $item.data('index'), name = $item.data('name');
                    if ($t.find('i').length == 0) {
                        $t.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                        let type = _this.pivot_data_type[index.toString()], itemHTML;
                        if (type == 'num') {
                            itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" data-nameindex="0" data-sumtype="SUM" data-index="' + index + '" data-name="' + name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" data-nameindex="0" data-sumtype="SUM" data-index="' + index + '" data-name="' + name + '">求和:' + name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                            $('#luckysheet-modal-dialog-config-value').append(itemHTML);
                        } else {
                            itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" data-index="' + index + '" data-name="' + name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" data-index="' + index + '" data-name="' + name + '">' + name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                            let $column = $('#luckysheet-modal-dialog-config-column'), $row = $('#luckysheet-modal-dialog-config-row');
                            let columnitem = $column.find('.luckysheet-modal-dialog-slider-config-item'), rowitem = $row.find('.luckysheet-modal-dialog-slider-config-item');
                            if (columnitem.length < 2) {
                                $column.append(itemHTML);
                            } else if (rowitem.length < 2) {
                                $row.append(itemHTML);
                            } else {
                                $column.append(itemHTML);
                            }
                        }
                    } else {
                        $t.find('i').remove();
                        $('#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value').find('.luckysheet-modal-dialog-slider-config-item').each(function () {
                            if ($(this).data('index') == index) {
                                if ($(this).parent().attr('id') == 'luckysheet-modal-dialog-config-value') {
                                    _this.resetOrderby($(this));
                                }
                                $(this).remove();
                            }
                        });
                    }
                    _this.refreshPivotTable();
                    _this.showvaluecolrow();
                });
                $('#luckysheet-dialog-pivotTable-clearitem').click(function () {
                    $('#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value').find('.luckysheet-modal-dialog-slider-config-item').each(function () {
                        $(this).remove();
                    });
                    $('#luckysheet-modal-dialog-pivotTable-list').find('.luckysheet-modal-dialog-slider-list-item').each(function () {
                        $(this).find('.luckysheet-slider-list-item-selected').find('i').remove();
                    });
                    _this.refreshPivotTable();
                    _this.showvaluecolrow();
                });
            }
            if (restore == null) {
                restore = false;
            }
            if (_this.celldata.length <= 1 && _this.celldata[0].length <= 1) {
                if (isEditMode()) {
                    alert(locale_pivotTable.errorIncreaseRange);
                } else {
                    tooltip.info('', locale_pivotTable.errorIncreaseRange);
                }
            }
            let selecteditem = '', selecteditemIndex = 1, selecteditemtest = {}, selecteditemNullIndex = 1;
            for (let i = 0; i < _this.celldata[0].length; i++) {
                let name;
                if (!!_this.celldata[0][i] && !!_this.celldata[0][i]['m']) {
                    name = _this.celldata[0][i]['m'];
                } else {
                    name = getcellvalue(0, i, _this.celldata);
                }
                if (name != null) {
                    name = name.toString();
                }
                if (name == null || $.trim(name.toString()).length == 0) {
                    name = locale_pivotTable.titleColumn + ' ' + selecteditemNullIndex;
                }
                selecteditemNullIndex++;
                if (name in selecteditemtest) {
                    name = name + selecteditemIndex++;
                    if (name in selecteditemtest) {
                        name = name + selecteditemIndex++;
                        if (name in selecteditemtest) {
                            name = name + selecteditemIndex++;
                        }
                    }
                }
                selecteditemtest[name] = 1;
                let dataother = '', style = '';
                if (restore && _this.filterparm != null) {
                    if (_this.filterparm[i.toString()] != null) {
                        let itemset = _this.filterparm[i.toString()];
                        if (itemset.rowhidden != null) {
                            dataother += "data-rowhidden='" + JSON.stringify(itemset.rowhidden) + "'";
                        }
                        if (itemset.selected != null) {
                            dataother += "data-selected='" + JSON.stringify(itemset.selected) + "'";
                        }
                        if (itemset.caljs != null) {
                            let caljsset = itemset.caljs;
                            if (caljsset.value != null) {
                                dataother += "data-byconditionvalue='" + caljsset.value + "'";
                            }
                            if (caljsset.type != null) {
                                dataother += "data-byconditiontype='" + caljsset.type + "'";
                            }
                            if (caljsset.text != null) {
                                dataother += "data-byconditiontext='" + caljsset.text + "'";
                            }
                            if (caljsset.value1 != null) {
                                dataother += "data-byconditionvalue1='" + caljsset.value1 + "'";
                            }
                            if (caljsset.value2 != null) {
                                dataother += "data-byconditionvalue2='" + caljsset.value2 + "'";
                            }
                        }
                    }
                }
                if (dataother.length > 0) {
                    style = 'display:block;';
                }
                selecteditem += '<div class="luckysheet-modal-dialog-slider-list-item" ' + dataother + ' data-index="' + i + '" data-name="' + name + '"><div title="' + locale_pivotTable.titleAddColumn + '" class="luckysheet-slider-list-item-selected"><div></div></div><div title="' + locale_pivotTable.titleMoveColumn + '" class="luckysheet-slider-list-item-name" ' + dataother + ' data-index="' + i + '" data-name="' + name + '">' + name + '</div><div title="' + locale_pivotTable.titleClearColumnFilter + '" class="luckysheet-slider-list-item-filtered" style="' + style + '"><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i></div><div title="' + locale_pivotTable.titleFilterColumn + '" class="luckysheet-slider-list-item-filter"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
            }
            $('#luckysheet-modal-dialog-pivotTable-list').html(selecteditem);
            $('#luckysheetpivottablevaluecolrowshow').hide();
            $('#luckysheetpivottablevaluecolrow').prop('checked', true);
            $('#luckysheetpivottablevaluecolrow1').prop('checked', false);
            $('#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value').empty();
            if (restore) {
                if (_this.filter != null && _this.filter.length > 0) {
                    for (let i = 0; i < _this.filter.length; i++) {
                        let item = _this.filter[i];
                        let itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" data-index="' + item.index + '" data-name="' + item.name + '">' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        $('#luckysheet-modal-dialog-config-filter').append(itemHTML);
                        let $seleted = $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').eq(item.index).find('.luckysheet-slider-list-item-selected');
                        if ($seleted.find('i').length == 0) {
                            $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                        }
                    }
                }
                if (_this.row != null && _this.row.length > 0) {
                    for (let i = 0; i < _this.row.length; i++) {
                        let item = _this.row[i];
                        let otherset = '';
                        if (item.order != null) {
                            otherset += "data-order = '" + item.order + "'";
                        }
                        if (item.orderby != null) {
                            otherset += "data-orderby = '" + item.orderby + "'";
                        }
                        if (item.order != null) {
                            otherset += "data-stastic = '" + item.stastic + "'";
                        }
                        let itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '">' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        $('#luckysheet-modal-dialog-config-row').append(itemHTML);
                        let $seleted = $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').eq(item.index).find('.luckysheet-slider-list-item-selected');
                        if ($seleted.find('i').length == 0) {
                            $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                        }
                    }
                }
                if (_this.column != null && _this.column.length > 0) {
                    for (let i = 0; i < _this.column.length; i++) {
                        let item = _this.column[i];
                        let otherset = '';
                        if (item.order != null) {
                            otherset += "data-order = '" + item.order + "'";
                        }
                        if (item.orderby != null) {
                            otherset += "data-orderby = '" + item.orderby + "'";
                        }
                        if (item.order != null) {
                            otherset += "data-stastic = '" + item.stastic + "'";
                        }
                        let itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '">' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        $('#luckysheet-modal-dialog-config-column').append(itemHTML);
                        let $seleted = $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').eq(item.index).find('.luckysheet-slider-list-item-selected');
                        if ($seleted.find('i').length == 0) {
                            $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                        }
                    }
                }
                if (_this.values != null && _this.values.length > 0) {
                    for (let i = 0; i < _this.values.length; i++) {
                        let item = _this.values[i];
                        let otherset = '';
                        if (item.sumtype != null) {
                            otherset += "data-sumtype = '" + item.sumtype + "'";
                        }
                        if (item.nameindex != null) {
                            otherset += "data-nameindex = '" + item.nameindex + "'";
                        }
                        let itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '">' + _this.getSumTypeName(item.sumtype) + ':' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        $('#luckysheet-modal-dialog-config-value').append(itemHTML);
                        let $seleted = $('#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item').eq(item.index).find('.luckysheet-slider-list-item-selected');
                        if ($seleted.find('i').length == 0) {
                            $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                        }
                    }
                    if (_this.values.length >= 2) {
                        $('#luckysheetpivottablevaluecolrowshow').show();
                        if (_this.showType == 'column') {
                            $('#luckysheetpivottablevaluecolrow').prop('checked', true);
                            $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").addClass('ui-state-active');
                            $('#luckysheetpivottablevaluecolrow1').prop('checked', false);
                            $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").removeClass('ui-state-active');
                        } else {
                            $('#luckysheetpivottablevaluecolrow1').prop('checked', true);
                            $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").addClass('ui-state-active');
                            $('#luckysheetpivottablevaluecolrow').prop('checked', false);
                            $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").removeClass('ui-state-active');
                        }
                    }
                }
            }
            $('#luckysheet-dialog-pivotTable-range').html(getRangetxt(_this.pivotDataSheetIndex, _this.pivot_select_save));
            $('#luckysheet-modal-dialog-slider-pivot').show();
            luckysheetsizeauto(false);
        },
        drillDown: function (row_index, col_index) {
            if (!checkProtectionAuthorityNormal(Store.currentSheetIndex, 'usePivotTablereports')) {
                return;
            }
            let _this = this;
            let cell = _this.pivotDatas[row_index][col_index];
            let d = $.extend(true, [], sheets.nulldata);
            const _locale = locale();
            const locale_filter = _locale.filter;
            const locale_pivotTable = _locale.pivotTable;
            let selecteditemNullIndex = 1;
            for (let i = 0; i < _this.celldata[0].length; i++) {
                let name;
                if (!!_this.celldata[0][i] && !!_this.celldata[0][i]['m']) {
                    name = _this.celldata[0][i]['m'];
                } else {
                    name = getcellvalue(0, i, _this.celldata);
                }
                if (name != null) {
                    name = name.toString();
                }
                if (name == null || $.trim(name.toString()).length == 0) {
                    name = locale_pivotTable.titleColumn + ' ' + selecteditemNullIndex;
                }
                selecteditemNullIndex++;
                d[0][i] = name;
            }
            let obj = {};    //行
            //行
            if (_this.row != null && _this.row.length > 0) {
                for (let a = 0; a < _this.row.length; a++) {
                    obj[_this.row[a]['index']] = _this.pivotDatas[row_index][a];
                }
            }    //列
            //列
            if (_this.column != null && _this.column.length > 0) {
                for (let b = 0; b < _this.column.length; b++) {
                    obj[_this.column[b]['index']] = _this.pivotDatas[b][col_index];
                }
            }
            let rowArr = [];
            for (let j = 1; j < _this.celldata.length; j++) {
                let isEqual = true;
                for (let x in obj) {
                    let value;
                    if (!!_this.celldata[j][x] && !!_this.celldata[j][x]['m']) {
                        value = _this.celldata[j][x]['m'];
                    } else {
                        value = getcellvalue(j, x, _this.celldata);
                    }
                    if (value != null) {
                        value = value.toString();
                    } else {
                        value = locale_filter.valueBlank;
                    }
                    if (value != obj[x]) {
                        isEqual = false;
                        break;
                    }
                }
                if (isEqual) {
                    rowArr.push(j);
                }
            }
            for (let r = 0; r < rowArr.length; r++) {
                for (let c = 0; c < _this.celldata[0].length; c++) {
                    let value;
                    if (!!_this.celldata[rowArr[r]][c] && !!_this.celldata[rowArr[r]][c]['m']) {
                        value = _this.celldata[rowArr[r]][c]['m'];
                    } else {
                        value = getcellvalue(rowArr[r], c, _this.celldata);
                    }
                    if (value != null) {
                        value = value.toString();
                    } else {
                        value = '';
                    }
                    d[r + 1][c] = value;
                }
            }
            Store.luckysheet_select_save = [{
                    'row': [
                        0,
                        rowArr.length
                    ],
                    'column': [
                        0,
                        _this.celldata[0].length - 1
                    ]
                }];
            Store.clearjfundo = false;
            ///jfrefreshgrid(d, Store.luckysheet_select_save);
            Store.refreshGrid(d, Store.luckysheet_select_save);
            selectHightlightShow();
            Store.clearjfundo = true;
        }
    });
    return pivotTable;
});