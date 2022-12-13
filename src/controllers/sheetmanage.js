define([
    '../methods/validate',
    '../widgets/cleargridelement',
    '../methods/getdata',
    '../methods/setdata',
    '../widgets/createdom',
    '../widgets/tooltip',
    './formula',
    '../methods/rhchInit',
    '../methods/sheets',
    '../widgets/extend',
    '../utils/util',
    '../widgets/constant',
    './server',
    '../methods/luckysheetConfigsetting',
    './pivotTable',
    '../widgets/resize',
    './postil',
    '../widgets/imageCtrl',
    '../widgets/dataVerificationCtrl',
    '../widgets/hyperlinkCtrl',
    './freezen',
    './filter',
    '../widgets/select',
    '../store',
    '../locale/locale',
    '../expendPlugins/chart/plugin',
    '../widgets/resize',
    './zoom',
    './menuButton'
], function (m_validate, cleargridelement, m_getdata, m_setdata, luckysheetcreatedom, tooltip, formula,  rhchInit, sheets, m_extend, m_util, m_constant, server, luckysheetConfigsetting, pivotTable, luckysheetsizeauto, luckysheetPostil, imageCtrl, dataVerificationCtrl, hyperlinkCtrl, luckysheetFreezen, m_filter, m_select, Store, locale, m_plugin, m_resize, m_zoom, menuButton) {
    'use strict';
    const {isRealNum} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;
    const {getcellvalue, datagridgrowth, getcellFormula} = m_getdata;
    const {setcellvalue} = m_setdata;
    const {luckysheetextendtable, luckysheetdeletetable} = m_extend;
    const {replaceHtml, getObjType, chatatABC, arrayRemoveItem} = m_util;
    const {sheetHTML, luckysheetlodingHTML} = m_constant;
    const {createFilterOptions, labelFilterOptionState} = m_filter;
    const {selectHightlightShow, selectionCopyShow} = m_select;
    const {renderChartShow} = m_plugin;
    const {changeSheetContainerSize, menuToolBarWidth} = m_resize;
    const {zoomNumberDomBind} = m_zoom;
    const sheetmanage = Object.assign(sheets, {

        addNewSheet: function (e, isPivotTable) {
            if (isEditMode() || Store.allowEdit === false) {
                // alert("非编辑模式下不允许该操作！");
                return;
            }
            let _this = this;
            let order = Store.luckysheetfile.length;
            let index = _this.generateRandomSheetIndex();
            let sheetname = _this.generateRandomSheetName(Store.luckysheetfile, isPivotTable);
            $('#luckysheet-sheet-container-c').append(replaceHtml(sheetHTML, {
                'index': index,
                'active': '',
                'name': sheetname,
                'style': '',
                'colorset': ''
            }));
            let sheetconfig = {
                'name': sheetname,
                'color': '',
                'status': '0',
                'order': order,
                'index': index,
                'celldata': [],
                'row': Store.defaultrowNum,
                'column': Store.defaultcolumnNum,
                'config': {},
                'pivotTable': null,
                'isPivotTable': !!isPivotTable
            };
            Store.luckysheetfile.push(sheetconfig);
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').removeClass('luckysheet-sheets-item-active');
            $('#luckysheet-sheets-item' + index).addClass('luckysheet-sheets-item-active');
            $('#luckysheet-cell-main').append('<div id="luckysheet-datavisual-selection-set-' + index + '" class="luckysheet-datavisual-selection-set"></div>');
            cleargridelement(e);
            Store.saveParam('sha', null, $.extend(true, {}, sheetconfig));
            if (Store.clearjfundo) {
                Store.jfundo.length = 0;
                let redo = {};
                redo['type'] = 'addSheet';
                redo['sheetconfig'] = $.extend(true, {}, sheetconfig);
                redo['index'] = index;
                redo['currentSheetIndex'] = Store.currentSheetIndex;
                Store.jfredo.push(redo);
            }
            ///_this.changeSheetExec(index, isPivotTable, true);
            Store.changeSheet(index, isPivotTable, true)
        },
        setSheetHide: function (index) {
            let _this = this;
            let currentIdx = _this.getSheetIndex(index);
            Store.luckysheetfile[currentIdx].hide = 1;
            let luckysheetcurrentSheetitem = $('#luckysheet-sheets-item' + index);
            luckysheetcurrentSheetitem.hide();
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').removeClass('luckysheet-sheets-item-active');
            let indicator;
            if (luckysheetConfigsetting.showsheetbarConfig.sheet) {
                indicator = luckysheetcurrentSheetitem.nextAll(':visible');
                if (luckysheetcurrentSheetitem.nextAll(':visible').length > 0) {
                    indicator = indicator.eq(0).data('index');
                } else {
                    indicator = luckysheetcurrentSheetitem.prevAll(':visible').eq(0).data('index');
                }
            } else {
                let nextActiveIdx, showSheetIdxs = [];
                Store.luckysheetfile.forEach((ele, index) => {
                    if (1 !== ele.hide)
                        showSheetIdxs.push(index);
                });
                let len = showSheetIdxs.length;
                if (1 === len) {
                    nextActiveIdx = showSheetIdxs[0];
                } else {
                    nextActiveIdx = showSheetIdxs[len - 1] > currentIdx ? showSheetIdxs.find(e => e > currentIdx) : showSheetIdxs[len - 1];
                }
                indicator = Store.luckysheetfile[nextActiveIdx].index;
            }
            $('#luckysheet-sheets-item' + indicator).addClass('luckysheet-sheets-item-active');
            ///_this.changeSheetExec(indicator);
            Store.changeSheet(indicator);
            Store.saveParam('sh', luckysheetcurrentSheetitem.data('index'), 1, {
                'op': 'hide',
                'cur': indicator
            });
        },
        setSheetShow: function (index) {
            let _this = this;
            Store.luckysheetfile[_this.getSheetIndex(index)].hide = 0;
            ///_this.changeSheetExec(index);
            Store.changeSheet(index);
            Store.saveParam('sh', index, 0, {
                'op': 'show',
                'cur': null
            });
        },
        sheetMaxIndex: 0,
        ordersheet: function (property) {
            return function (a, b) {
                let value1 = a[property];
                let value2 = b[property];
                return value1 - value2;
            };
        },
        getCurrentOrder: function () {
            let orders = {};
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').each(function (a) {
                let index = $(this).data('index');
                for (let i = 0; i < Store.luckysheetfile.length; i++) {
                    if (Store.luckysheetfile[i].index == index) {
                        orders[index.toString()] = a;
                        break;
                    }
                }
            });
            return orders;
        },
        reOrderAllSheet: function () {
            let orders = {};
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').each(function (a) {
                let index = $(this).data('index');
                for (let i = 0; i < Store.luckysheetfile.length; i++) {
                    if (Store.luckysheetfile[i].index == index) {
                        Store.luckysheetfile[i].order = a;
                        orders[index.toString()] = a;
                        break;
                    }
                }
            });
            Store.saveParam('shr', null, orders);
            Store.luckysheetfile.sort((x, y) => {
                let order_x = x.order;
                let order_y = y.order;
                if (order_x != null && order_y != null) {
                    return order_x - order_y;
                } else if (order_x != null) {
                    return -1;
                } else if (order_y != null) {
                    return 1;
                } else {
                    return 1;
                }
            });
        },
        createSheet: function () {
            //修复拖动sheet更新后台后，重新打开显示错误
            let _this = this;
            let btn = [];
            Store.luckysheetfile.sort(_this.ordersheet('order'));
            for (let i = 0; i < Store.luckysheetfile.length; i++) {
                let display = '';
                let sheetIndex = Store.luckysheetfile[i].index;
                let colorset = '';
                if (Store.luckysheetfile[i].color != null) {
                    colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + Store.luckysheetfile[i].color + ';"></div>';
                }
                if (Store.currentSheetIndex == sheetIndex) {
                    //使用Store.luckysheetfile中的index比较，而不是order
                    btn.push(replaceHtml(sheetHTML, {
                        'index': sheetIndex,
                        'active': 'luckysheet-sheets-item-active',
                        'name': Store.luckysheetfile[i].name,
                        'style': '',
                        'colorset': colorset
                    }));
                } else {
                    if (Store.luckysheetfile[i].hide == 1) {
                        btn.push(replaceHtml(sheetHTML, {
                            'index': sheetIndex,
                            'active': '',
                            'name': Store.luckysheetfile[i].name,
                            'style': 'display:none;',
                            'colorset': colorset
                        }));
                    } else {
                        btn.push(replaceHtml(sheetHTML, {
                            'index': sheetIndex,
                            'active': '',
                            'name': Store.luckysheetfile[i].name,
                            'style': '',
                            'colorset': colorset
                        }));
                    }
                    display = "style='display:none;'";
                }    //Store.luckysheetfile[i].index = i; //index即为默认
                     // if(sheetIndex > this.sheetMaxIndex){
                     //     this.sheetMaxIndex = sheetIndex;
                     // }
                //Store.luckysheetfile[i].index = i; //index即为默认
                // if(sheetIndex > this.sheetMaxIndex){
                //     this.sheetMaxIndex = sheetIndex;
                // }
                $('#luckysheet-cell-main').append('<div ' + display + ' id="luckysheet-datavisual-selection-set-' + sheetIndex + '" class="luckysheet-datavisual-selection-set"></div>');
            }
            $('#luckysheet-sheet-container-c').append(btn.join(''));
            _this.locationSheet();
        },
        locationSheet: function () {
            let $c = $('#luckysheet-sheet-container-c'), winW = $('#' + Store.container).width();
            let $cursheet = $('#luckysheet-sheet-container-c > div.luckysheet-sheets-item-active').eq(0);
            let scrollLeftpx = 0;
            let c_width = 0;
            $('#luckysheet-sheet-container-c > div.luckysheet-sheets-item:visible').each(function () {
                if ($(this).hasClass('luckysheet-sheets-item-active')) {
                    scrollLeftpx = c_width;
                }
                c_width += $(this).outerWidth();
            });
            setTimeout(function () {
                $c.scrollLeft(scrollLeftpx - 10);
                if (c_width >= winW * 0.7) {
                    if (luckysheetConfigsetting.showsheetbarConfig.sheet) {
                        $('#luckysheet-sheet-area .luckysheet-sheets-scroll').css('display', 'inline-block');
                        $('#luckysheet-sheet-container .docs-sheet-fade-left').show();
                    }
                }
            }, 1);
        },
        copySheet: function (copyindex, e) {
            if (isEditMode() || Store.allowEdit === false) {
                // alert("非编辑模式下不允许该操作！");
                return;
            }
            let _this = this;
            let order = Store.luckysheetfile.length;
            let index = _this.generateRandomSheetIndex();
            let copyarrindex = _this.getSheetIndex(copyindex);
            let copyjson = $.extend(true, {}, Store.luckysheetfile[copyarrindex]);
            copyjson.order = order;
            copyjson.index = index;
            copyjson.name = _this.generateCopySheetName(Store.luckysheetfile, copyjson.name);
            let colorset = '';
            if (copyjson.color != null) {
                colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + copyjson.color + ';"></div>';
            }
            let copyobject = $('#luckysheet-sheets-item' + copyindex);
            $('#luckysheet-sheet-container-c').append(replaceHtml(sheetHTML, {
                'index': copyjson.index,
                'active': '',
                'name': copyjson.name,
                'order': copyjson.order,
                'style': '',
                'colorset': colorset
            }));
            $('#luckysheet-sheets-item' + copyjson.index).insertAfter(copyobject);
            Store.luckysheetfile.splice(copyarrindex + 1, 0, copyjson);
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').removeClass('luckysheet-sheets-item-active');
            $('#luckysheet-sheets-item' + index).addClass('luckysheet-sheets-item-active');
            $('#luckysheet-cell-main').append('<div id="luckysheet-datavisual-selection-set-' + index + '" class="luckysheet-datavisual-selection-set"></div>');
            cleargridelement(e);
            Store.saveParam('shc', index, {
                'copyindex': copyindex,
                'name': copyjson.name
            });
            ///_this.changeSheetExec(index);
            Store.changeSheet(index);
            _this.reOrderAllSheet();
            if (Store.clearjfundo) {
                Store.jfredo.push({
                    'type': 'copySheet',
                    'copyindex': copyindex,
                    'index': copyjson.index,
                    'sheetIndex': copyjson.index
                });
            } else if (Store.jfredo.length > 0) {
                let jfredostr = Store.jfredo[Store.jfredo.length - 1];
                if (jfredostr.type == 'copySheet') {
                    jfredostr.index = copyjson.index;
                    jfredostr.sheetIndex = copyjson.index;
                }
            }
        },
        createSheetbydata: function (data, isrenew, isBefore = true) {
            let _this = this;
            let colorset = '';
            if (data.color != null) {
                colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + data.color + ';"></div>';
            }
            $('#luckysheet-sheet-container-c').append(replaceHtml(sheetHTML, {
                'index': data.index,
                'active': '',
                'name': data.name,
                'order': data.order,
                'style': '',
                'colorset': colorset
            }));
            if (isBefore) {
                let previndex = data.order;
                if (previndex >= Store.luckysheetfile.length) {
                    previndex = Store.luckysheetfile.length - 1;
                    $('#luckysheet-sheets-item' + data.index).insertAfter($('#luckysheet-sheets-item' + Store.luckysheetfile[previndex].index));
                } else {
                    $('#luckysheet-sheets-item' + data.index).insertBefore($('#luckysheet-sheets-item' + Store.luckysheetfile[previndex].index));
                }
            }
            Store.luckysheetfile.push(data);
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').removeClass('luckysheet-sheets-item-active');
            $('#luckysheet-sheets-item' + data.index).addClass('luckysheet-sheets-item-active');
            $('#luckysheet-cell-main').append('<div id="luckysheet-datavisual-selection-set-' + data.index + '" class="luckysheet-datavisual-selection-set"></div>');
            cleargridelement();
            if (isrenew != null) {
                Store.saveParam('shre', null, { 'reIndex': data.index });
                data.hide = 0;
                Store.saveParam('sh', data.index, 0, {
                    'op': 'show',
                    'cur': null
                });
            } else {
                Store.saveParam('sha', null, data);
            }
            ///_this.changeSheetExec(data.index, data.isPivotTable, true);
            Store.changeSheet(data.index,data.isPivotTable,true);
            _this.reOrderAllSheet();
        },
        deleteSheet: function (index) {
            let _this = this;
            if (Store.allowEdit === false) {
                return;
            }
            let arrIndex = _this.getSheetIndex(index);
            _this.setSheetHide(index);
            $('#luckysheet-sheets-item' + index).remove();
            $('#luckysheet-datavisual-selection-set-' + index).remove();
            let removedsheet = Store.luckysheetfile.splice(arrIndex, 1);
            _this.reOrderAllSheet();
            Store.saveParam('shd', null, { 'deleIndex': index });
            if (Store.clearjfundo) {
                removedsheet[0].type = 'deleteSheet';
                Store.jfredo.push(removedsheet[0]);
            }
        },
        nulldata: null,

        initialjfFile: function (menu, title) {
            let _this = this;
            _this.getCurSheet();
            let file = Store.luckysheetfile[_this.getSheetIndex(Store.currentSheetIndex)];
            _this.nulldata = datagridgrowth([], Store.defaultrowNum, Store.defaultcolumnNum);
            let data = _this.buildGridData(file);    //初始化的时候 记录选区
            //初始化的时候 记录选区
            let select_save = [];
            file.jfgird_select_save = file.jfgird_select_save || [];
            file.jfgird_select_save.forEach(item => select_save.push({
                'row': item.row,
                'column': item.column
            }));
            file.luckysheet_select_save = select_save;
            this.sheetParamRestore(file, data);
            let r2 = Store.luckysheet_select_save[0].row[1], c2 = Store.luckysheet_select_save[0].column[1];
            if (Store.luckysheet_select_save.length > 1) {
                for (let i = 0; i < Store.luckysheet_select_save.length; i++) {
                    if (Store.luckysheet_select_save[i].row[1] > r2) {
                        r2 = Store.luckysheet_select_save[i].row[1];
                    }
                    if (Store.luckysheet_select_save[i].column[1] > c2) {
                        c2 = Store.luckysheet_select_save[i].column[1];
                    }
                }
            }
            menuButton.fontInitial(Store.fontList);    //initial font
            //initial font
            file.data = data;
            let rowheight = data.length;
            if (r2 > rowheight - 1) {
                rowheight = r2 + 1;
            }
            let colwidth = data[0].length;
            if (c2 > colwidth - 1) {
                colwidth = c2 + 1;
            }    //钩子函数 表格创建之前触发
            //钩子函数 表格创建之前触发
            if (typeof luckysheetConfigsetting.beforeCreateDom == 'function') {
                luckysheetConfigsetting.beforeCreateDom(luckysheet);
            }
            if (typeof luckysheetConfigsetting.workbookCreateBefore == 'function') {
                luckysheetConfigsetting.workbookCreateBefore(luckysheet);
            }    // Store.flowdata = data;
            // Store.flowdata = data;
            luckysheetcreatedom(colwidth, rowheight, data, menu, title);
            setTimeout(function () {
                tooltip.createHoverTip('#luckysheet_info_detail', '.luckysheet_info_detail_back, .luckysheet_info_detail_input, .luckysheet_info_detail_update');
                tooltip.createHoverTip('#luckysheet-wa-editor', '.luckysheet-toolbar-menu-button, .luckysheet-toolbar-button, .luckysheet-toolbar-combo-button');
                Store.luckysheetTableContentHW = [
                    $('#luckysheet-cell-main').width() + Store.rowHeaderWidth - Store.cellMainSrollBarSize,
                    $('#luckysheet-cell-main').height() + Store.columnHeaderHeight - Store.cellMainSrollBarSize
                ];
                $('#luckysheetTableContent, #luckysheetTableContentF').attr({
                    width: Math.ceil(Store.luckysheetTableContentHW[0] * Store.devicePixelRatio),
                    height: Math.ceil(Store.luckysheetTableContentHW[1] * Store.devicePixelRatio)
                }).css({
                    width: Store.luckysheetTableContentHW[0],
                    height: Store.luckysheetTableContentHW[1]
                }).get(0).getContext('2d');
                let locale_info = locale().info;
                let key = Store.gridKey;
                let cahce_key = key + '__qkcache';
                let ini = function () {
                    file['load'] = '1';
                    _this.createSheet();
                    let execF = function () {
                        _this.mergeCalculation(file['index']);
                        _this.setSheetParam(false);    // editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
                        // editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
                        _this.storeSheetParam();
                        _this.restoreselect();
                        _this.CacheNotLoadControll = [];
                        _this.restoreCache();
                        formula.execFunctionGroupForce(luckysheetConfigsetting.forceCalculation);
                        _this.restoreSheetAll(Store.currentSheetIndex);
                        // luckysheetrefreshgrid(0, 0);
                        $('#luckysheet_info_detail_save').html(locale_info.detailSave);
                        if (!!file.isPivotTable) {
                            Store.luckysheetcurrentisPivotTable = true;    // pivotTable.changePivotTable(Store.currentSheetIndex); //此方法需要注释掉，在restoreSheetAll中已经执行了刷新了数据透视表，这里就不需要了
                        } else
                            // pivotTable.changePivotTable(Store.currentSheetIndex); //此方法需要注释掉，在restoreSheetAll中已经执行了刷新了数据透视表，这里就不需要了
                            {
                                Store.luckysheetcurrentisPivotTable = false;
                                $('#luckysheet-modal-dialog-slider-pivot').hide();
                            }    // Store toolbar button width value
                        // Store toolbar button width value
                        menuToolBarWidth();
                        luckysheetsizeauto();    //等待滚动条dom宽高加载完成后 初始化滚动位置
                        //等待滚动条dom宽高加载完成后 初始化滚动位置
                        if (file['scrollLeft'] != null && file['scrollLeft'] > 0) {
                            $('#luckysheet-scrollbar-x').scrollLeft(file['scrollLeft']);
                        } else {
                            $('#luckysheet-scrollbar-x').scrollLeft(0);
                        }
                        if (file['scrollTop'] != null && file['scrollTop'] > 0) {
                            $('#luckysheet-scrollbar-y').scrollTop(file['scrollTop']);
                        } else {
                            $('#luckysheet-scrollbar-y').scrollTop(0);
                        }    // 此处已经渲染完成表格，应该挪到前面
                             // //钩子函数 表格创建之前触发
                             // if(typeof luckysheetConfigsetting.beforeCreateDom == "function" ){
                             //     luckysheetConfigsetting.beforeCreateDom(luckysheet);
                             // }
                             // if(typeof luckysheetConfigsetting.workbookCreateBefore == "function"){
                             //     luckysheetConfigsetting.workbookCreateBefore(luckysheet);
                             // }
                        // 此处已经渲染完成表格，应该挪到前面
                        // //钩子函数 表格创建之前触发
                        // if(typeof luckysheetConfigsetting.beforeCreateDom == "function" ){
                        //     luckysheetConfigsetting.beforeCreateDom(luckysheet);
                        // }
                        // if(typeof luckysheetConfigsetting.workbookCreateBefore == "function"){
                        //     luckysheetConfigsetting.workbookCreateBefore(luckysheet);
                        // }
                        arrayRemoveItem(Store.asyncLoad, 'core');
                        if (luckysheetConfigsetting.pointEdit) {
                            setTimeout(function () {
                                $('#luckysheetloadingdata').remove();
                            }, 0);
                        } else {
                            setTimeout(function () {
                                $('#luckysheetloadingdata').fadeOut().remove();
                            }, 500);
                        }
                    };
                    let loadSheetUrl = Store.loadSheetUrl;
                    if (loadSheetUrl == '') {
                        //     execF();
                        // }
                        // else if(sheetindex.length>0 && loadSheetUrl == ""){
                        // for(let i = 0;i<Store.luckysheetfile.length;i++){
                        //     let otherfile = Store.luckysheetfile[i];
                        //     if(otherfile.index == file.index){
                        //         continue;
                        //     }
                        //     // let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)]; 
                        //     if(otherfile["load"] == null || otherfile["load"] == "0"){
                        //         otherfile["data"] = _this.buildGridData(otherfile);
                        //         otherfile["load"] = "1";
                        //     }
                        // }
                        _this.loadOtherFile(file);
                        execF();
                    } else {
                        let sheetindexset = _this.checkLoadSheetIndex(file);
                        let sheetindex = [];
                        for (let i = 0; i < sheetindexset.length; i++) {
                            let item = sheetindexset[i];
                            if (item == file['index']) {
                                continue;
                            }
                            sheetindex.push(item);
                        }    // No request is sent if it is not linked to other worksheets
                        // No request is sent if it is not linked to other worksheets
                        if (sheetindex.length === 0) {
                            execF();
                            return;
                        }
                        $.post(loadSheetUrl, {
                            'gridKey': Store.gridKey,
                            'index': sheetindex.join(',')
                        }, function (d) {
                            let dataset = new Function('return ' + d)();
                            for (let item in dataset) {
                                if (item == file['index']) {
                                    continue;
                                }
                                let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];
                                if (otherfile['load'] == null || otherfile['load'] == '0') {
                                    otherfile.celldata = dataset[item.toString()];
                                    otherfile['data'] = _this.buildGridData(otherfile);
                                    otherfile['load'] = '1';
                                }
                            }
                            execF();
                        });
                    }
                };
                try {
                    localforage.getItem(cahce_key).then(function (readValue) {
                        if (readValue != null) {
                            _this.CacheNotLoadControll = readValue;
                        }
                        server.clearcachelocaldata(function () {
                            ini();
                        });
                    });
                } catch (e) {
                    ini();
                    console.log('缓存操作失败');
                }
            }, 1);
        },
        storeSheetParam: function () {
            let index = this.getSheetIndex(Store.currentSheetIndex);
            let file = Store.luckysheetfile[index];
            file['config'] = Store.config;
            file['visibledatarow'] = Store.visibledatarow;
            file['visibledatacolumn'] = Store.visibledatacolumn;
            file['ch_width'] = Store.ch_width;
            file['rh_height'] = Store.rh_height;
            file['luckysheet_select_save'] = $.extend(true, [], Store.luckysheet_select_save);
            file['luckysheet_selection_range'] = $.extend(true, [], Store.luckysheet_selection_range);
            if ($('#luckysheet-scrollbar-x')[0].scrollWidth > $('#luckysheet-scrollbar-x')[0].offsetWidth) {
                file['scrollLeft'] = $('#luckysheet-scrollbar-x').scrollLeft();    //横向滚动条
            }
            //横向滚动条
            if ($('#luckysheet-scrollbar-y')[0].scrollHeight > $('#luckysheet-scrollbar-y')[0].offsetHeight) {
                file['scrollTop'] = $('#luckysheet-scrollbar-y').scrollTop();    //纵向滚动条
            }
            //纵向滚动条
            file['zoomRatio'] = Store.zoomRatio;
        },
        setSheetParam: function (isload = true) {
            let index = this.getSheetIndex(Store.currentSheetIndex);
            let file = Store.luckysheetfile[index];
            Store.flowdata = file['data'];
            Store.webWorkerFlowDataCache(Store.flowdata);    //worker存数据
                                                              // formula.execFunctionGroupData = null;
            //worker存数据
            // formula.execFunctionGroupData = null;
            formula.execFunctionGlobalData = null;
            window.luckysheet_getcelldata_cache = null;
            this.sheetParamRestore(file, Store.flowdata);
            if (file['freezen'] == null) {
                Store.freezenhorizontaldata = null;
                Store.freezenverticaldata = null;
            } else {
                Store.freezenhorizontaldata = file['freezen'].horizontal == null ? null : file['freezen'].horizontal.freezenhorizontaldata;
                Store.freezenverticaldata = file['freezen'].vertical == null ? null : file['freezen'].vertical.freezenverticaldata;
            }
            if (isload) {
                rhchInit(Store.flowdata.length, Store.flowdata[0].length);
            } 
            //批注
            luckysheetPostil.buildAllPs(Store.flowdata); 
            //图片
            imageCtrl.currentImgId = null;
            imageCtrl.images = file.images;
            imageCtrl.allImagesShow();
            imageCtrl.init();    //数据验证
            //数据验证
            Store.dataVerification = file.dataVerification;
            dataVerificationCtrl.init();    //链接
            //链接
            hyperlinkCtrl.hyperlink = file.hyperlink;
            hyperlinkCtrl.init();
            createFilterOptions(file['filter_select'], file['filter']);
        },
        restoreselect: function () {
            let index = this.getSheetIndex(Store.currentSheetIndex);
            let file = Store.luckysheetfile[index];    //选区
            //选区
            selectHightlightShow(true);    //复制选区虚线框
            //复制选区虚线框
            selectionCopyShow();
            if (file['scrollLeft'] != null && file['scrollLeft'] > 0) {
                $('#luckysheet-scrollbar-x').scrollLeft(file['scrollLeft']);    //列标题
            } else
                //列标题
                {
                    $('#luckysheet-scrollbar-x').scrollLeft(0);
                }
            if (file['scrollTop'] != null && file['scrollTop'] > 0) {
                $('#luckysheet-scrollbar-y').scrollTop(file['scrollTop']);    //列标题
            } else
                //列标题
                {
                    $('#luckysheet-scrollbar-y').scrollTop(0);
                }
        },
        storeSheetParamALL: function () {
            let _this = this;
            _this.storeSheetParam();
            let index = _this.getSheetIndex(Store.currentSheetIndex);
            Store.luckysheetfile[index]['data'] = Store.flowdata;
            Store.luckysheetfile[index]['config'] = $.extend(true, {}, Store.config);
        },
        mergeCalculationSheet: {},
        mergeCalculation: function (index) {
            let file = Store.luckysheetfile[this.getSheetIndex(index)];
            let config = file.config, data = file.data;
            if (config == null) {
                return;
            }
            let mergeConfig = config.merge;
            if (mergeConfig == null || index in this.mergeCalculationSheet || file['autoCalculationMerge'] === false) {
                return;
            }
            this.mergeCalculationSheet[index] = 1;
            for (let x in mergeConfig) {
                let r = parseInt(x.substr(0, x.indexOf('_')));
                let c = parseInt(x.substr(x.indexOf('_') + 1));
                let mcInfo = mergeConfig[x];
                if (data[r][c] == null) {
                    data[r][c] = {};
                }
                data[r][c]['mc'] = {
                    r: r,
                    c: c,
                    rs: mcInfo.rs,
                    cs: mcInfo.cs
                };
                for (let ir = r; ir < r + mcInfo.rs; ir++) {
                    for (let ic = c; ic < c + mcInfo.cs; ic++) {
                        if (ir == r && ic == c) {
                            continue;
                        }
                        if (data[ir][ic] == null) {
                            data[ir][ic] = {};
                        }
                        data[ir][ic]['mc'] = {
                            r: r,
                            c: c
                        };
                    }
                }
            }
        },

        changeSheet: function (index, isPivotInitial, isNewSheet) {
            if (isEditMode()) {
                // alert("非编辑模式下不允许该操作！");
                return;
            }
            let _this = this;
            if (index == Store.currentSheetIndex) {
                return;
            }
            if (Store.allowUpdate) {
                $('#luckysheet-cell-main #luckysheet-multipleRange-show').empty();
                server.multipleIndex = 0;
            }    // 钩子函数
            // 钩子函数
            luckysheetConfigsetting.createHookFunction('sheetActivate', index, isPivotInitial, isNewSheet);
            $('#luckysheet-filter-selected-sheet' + Store.currentSheetIndex + ', #luckysheet-filter-options-sheet' + Store.currentSheetIndex).hide();
            $('#luckysheet-filter-selected-sheet' + index + ', #luckysheet-filter-options-sheet' + index).show();
            _this.storeSheetParamALL();
            _this.setCurSheet(index);
            let file = Store.luckysheetfile[_this.getSheetIndex(index)];
            if (!!file.isPivotTable) {
                Store.luckysheetcurrentisPivotTable = true;
                if (!isPivotInitial) {
                    pivotTable.changePivotTable(index);
                }
            } else {
                Store.luckysheetcurrentisPivotTable = false;
                $('#luckysheet-modal-dialog-slider-pivot').hide();
                luckysheetsizeauto(false);
            }
            let load = file['load'];
            if (load != null) {
                let data = _this.buildGridData(file);
                file.data = data;    // _this.loadOtherFile(file);
                // _this.loadOtherFile(file);
                _this.mergeCalculation(index);
                _this.setSheetParam(true);
                _this.showSheet();
                setTimeout(function () {
                    formula.execFunctionGroup();
                    ///luckysheetrefreshgrid();
                    Store.refresh();
                    Store.saveParam('shs', null, Store.currentSheetIndex);
                }, 1);
            } else {
                let loadSheetUrl = Store.loadSheetUrl;
                if (loadSheetUrl == '' || Store.luckysheetcurrentisPivotTable || !!isNewSheet) {
                    let data = _this.buildGridData(file);
                    file['data'] = data;
                    file['load'] = '1';
                    _this.loadOtherFile(file); 
                    // let sheetindexset = _this.checkLoadSheetIndex(file);
                    // let sheetindex = [];
                    // for(let i = 0; i < sheetindexset.length; i++){
                    //     let item = sheetindexset[i];
                    //     if(item == file["index"]){
                    //         continue;
                    //     }
                    //     sheetindex.push(item);
                    // }
                    // for(let i = 0;i<sheetindex.length;i++){
                    //     let item = sheetindex[i];
                    //     let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)]; 
                    //     if(otherfile["load"] == null || otherfile["load"] == "0"){
                    //         otherfile["data"] = _this.buildGridData(otherfile);
                    //         otherfile["load"] = "1";
                    //     }
                    // }
                    _this.mergeCalculation(index);
                    _this.setSheetParam();
                    _this.showSheet();
                    setTimeout(function () {
                        _this.restoreCache();
                        formula.execFunctionGroupForce(luckysheetConfigsetting.forceCalculation);
                        _this.restoreSheetAll(Store.currentSheetIndex);
                        ///luckysheetrefreshgrid();
                        Store.refresh();
                    }, 1);
                    Store.saveParam('shs', null, Store.currentSheetIndex);
                } else {
                    $('#luckysheet-grid-window-1').append(luckysheetlodingHTML());
                    let sheetindex = _this.checkLoadSheetIndex(file);
                    $.post(loadSheetUrl, {
                        'gridKey': Store.gridKey,
                        'index': sheetindex.join(',')
                    }, function (d) {
                        let dataset = new Function('return ' + d)();
                        file.celldata = dataset[index.toString()];
                        let data = _this.buildGridData(file);
                        setTimeout(function () {
                            $('#luckysheetloadingdata').fadeOut().remove();
                        }, 500);
                        for (let item in dataset) {
                            if (item == index) {
                                continue;
                            }
                            let otherfile = Store.luckysheetfile[_this.getSheetIndex(item)];
                            if (otherfile['load'] == null || otherfile['load'] == '0') {
                                otherfile.celldata = dataset[item.toString()];
                                otherfile['data'] = _this.buildGridData(otherfile);
                                otherfile['load'] = '1';
                            }
                        }
                        file['data'] = data;
                        file['load'] = '1';
                        _this.mergeCalculation(index);
                        _this.setSheetParam();
                        _this.showSheet();
                        setTimeout(function () {
                            _this.restoreCache();
                            formula.execFunctionGroupForce(luckysheetConfigsetting.forceCalculation);
                            _this.restoreSheetAll(Store.currentSheetIndex);
                            ///luckysheetrefreshgrid();
                            Store.refresh();

                        }, 1);
                        Store.saveParam('shs', null, Store.currentSheetIndex);
                    });
                }
            }
            $('#luckysheet-cell-main .luckysheet-datavisual-selection-set').hide();
            $('#luckysheet-datavisual-selection-set-' + index).show();    //隐藏其他sheet的图表，显示当前sheet的图表 chartMix
            //隐藏其他sheet的图表，显示当前sheet的图表 chartMix
            renderChartShow(index);
            luckysheetFreezen.initialFreezen(index);
            _this.restoreselect();
        },

        showSheet: function () {
            // changeSheetContainerSize();
            $('#luckysheet-cell-flow_0').css({
                'width': Store.ch_width,
                'top': '-1px'
            });    //width更新
            //width更新
            $('#luckysheet-sheettable_0').css({
                'width': Store.ch_width - 1,
                'height': Store.rh_height
            });
            $('#luckysheetrowHeader_0').css('height', Store.rh_height);
            $('#luckysheet-cols-h-cells_0').css('width', Store.ch_width);    //width更新
            //width更新
            $('#luckysheet-scrollbar-x div').width(Store.ch_width);
            $('#luckysheet-scrollbar-y div').height(Store.rh_height + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3);    //等待滚动条dom宽高计算完成后 初始化该表格滚动位置
            //等待滚动条dom宽高计算完成后 初始化该表格滚动位置
            let index = this.getSheetIndex(Store.currentSheetIndex);
            let file = Store.luckysheetfile[index];
            Store.scrollRefreshSwitch = false;
            if (file['scrollLeft'] != null && file['scrollLeft'] > 0) {
                $('#luckysheet-scrollbar-x').scrollLeft(file['scrollLeft'] * Store.zoomRatio);
            } else {
                $('#luckysheet-scrollbar-x').scrollLeft(0);
            }
            if (file['scrollTop'] != null && file['scrollTop'] > 0) {
                $('#luckysheet-scrollbar-y').scrollTop(file['scrollTop'] * Store.zoomRatio);
            } else {
                $('#luckysheet-scrollbar-y').scrollTop(0);
            }
            setTimeout(() => {
                Store.scrollRefreshSwitch = true;
            }, 0);
            zoomNumberDomBind(Store.zoomRatio);
        },

        changeSheetExec: function (index, isPivotInitial, isNewSheet) {
            let $sheet = $('#luckysheet-sheets-item' + index);
            window.luckysheet_getcelldata_cache = null;
            $('#luckysheet-sheet-area div.luckysheet-sheets-item').removeClass('luckysheet-sheets-item-active');
            $sheet.addClass('luckysheet-sheets-item-active').show();
            cleargridelement();
            this.changeSheet(index, isPivotInitial, isNewSheet);
            $('#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu').hide();
            if (formula.rangestart) {
                formula.createRangeHightlight();
            }
            this.sheetBarShowAndHide(index);
        },
        sheetArrowShowAndHide() {
            let containerW = $('#luckysheet-sheet-container').width();
            let c_width = 0;
            $('#luckysheet-sheet-container-c > div.luckysheet-sheets-item:visible').each(function () {
                c_width += $(this).outerWidth();
            });
            if (c_width >= containerW) {
                if (luckysheetConfigsetting.showsheetbarConfig.sheet) {
                    $('#luckysheet-sheet-area .luckysheet-sheets-scroll').css('display', 'inline-block');
                    $('#luckysheet-sheet-container .docs-sheet-fade-left').show();
                }
            } else {
                $('#luckysheet-sheet-area .luckysheet-sheets-scroll').css('display', 'none');
                $('#luckysheet-sheet-container .docs-sheet-fade-left').hide();
            }
        },
        sheetBarShowAndHide(index) {
            let $c = $('#luckysheet-sheet-container-c');
            if (index != null) {
                let $sheet = $('#luckysheet-sheets-item' + index);
                $c.scrollLeft($sheet.offset().left);
            }
            let c_width = $c.width(), c_srollwidth = $c[0].scrollWidth, scrollLeft = $c.scrollLeft();
            if (scrollLeft <= 0) {
                $('#luckysheet-sheet-container .docs-sheet-fade-left').hide();
            } else {
                $('#luckysheet-sheet-container .docs-sheet-fade-left').show();
            }
            if (c_width + scrollLeft >= c_srollwidth) {
                $('#luckysheet-sheet-container .docs-sheet-fade-right').hide();
            } else {
                $('#luckysheet-sheet-container .docs-sheet-fade-right').show();
            }
        },

        restoreFilter: function (sheetIndex) {
            let index = this.getSheetIndex(sheetIndex);
            let file = Store.luckysheetfile[index]; 
            // if($('#luckysheet-filter-selected-sheet' + sheetIndex).length > 0 || file.filter_select == null || JSON.stringify(file.filter_select) == "{}"){
            //     if(file.config != null && file.config.rowhidden != null){
            //         file.config.rowhidden =  {};
            //         Store.config = file.config;
            //         jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length,false);
            //     }
            //     return;
            // }
            if (getObjType(file.filter_select) == 'string') {
                file.filter_select = JSON.parse(file.filter_select);
            }
            if (file.filter_select == null || file.filter_select.row == null || file.filter_select.column == null) {
                return;
            }
            createFilterOptions(file.filter_select);
            if (getObjType(file.filter) != 'object') {
                if (file.filter != null && getObjType(file.filter) == 'string') {
                    file.filter = JSON.parse(file.filter);
                }
            }
            let rowhidden = {};
            if (file.config != null && file.config.rowhidden != null) {
                rowhidden = file.config.rowhidden;
            }
            $('#luckysheet-filter-options-sheet' + sheetIndex + ' .luckysheet-filter-options').each(function (i) {
                if (file.filter == null) {
                    return false;
                }
                let $top = $(this);
                let item = file.filter[i];
                if (item == null) {
                    return true;
                }
                if (getObjType(item) != 'object') {
                    item = JSON.parse(item);
                }
                labelFilterOptionState($top, item.optionstate, item.rowhidden, item.caljs, false, item.st_r, item.ed_r, item.cindex, item.st_c, item.ed_c);
                rowhidden = $.extend(true, rowhidden, item.rowhidden);
            });
            if (file.config == null) {
                file.config = {};
            }
            file.config['rowhidden'] = rowhidden;
            Store.config = file.config;
            ///jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length, false);
            Store.refreshGrid_rhcw(Store.flowdata.length, Store.flowdata[0].length, false);
        },
        restorePivot: function (sheetIndex) {
            let index = this.getSheetIndex(sheetIndex);
            let file = Store.luckysheetfile[index];
            if (!file.isPivotTable) {
                return;
            }
            pivotTable.getCellData(sheetIndex);
            pivotTable.initialPivotManage(true);
            pivotTable.refreshPivotTable(false);
        },
        restoreSheetAll: function (sheetIndex) {
            let _this = this;
            _this.restorePivot(sheetIndex);
            _this.restoreFilter(sheetIndex);
            _this.restoreFreezen(sheetIndex);
        },
        restoreFreezen: function (sheetIndex) {
            luckysheetFreezen.initialFreezen(sheetIndex);
        },
        restoreCache: function () {
            let _this = this;
            let data = _this.CacheNotLoadControll;
            _this.CacheNotLoadControll = [];
            if (data.length == 0) {
                return;
            }
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                _this.execCache(item);
            }
        }
    });


    Store.onSheetChanging =  sheetmanage.changeSheetExec.bind(sheetmanage);

    // from global/createsheet
    Store.onActive = function() {
        sheetmanage.showSheet();
        setTimeout(function () {
            sheetmanage.restoreCache();
            formula.execFunctionGroup();
            sheetmanage.restoreSheetAll(Store.currentSheetIndex);
            ///luckysheetrefreshgrid();
            Store.refresh();
        }, 1);
    };

    // from zoom.js
    function zoomChange(ratio) {
        let currentSheet = Store.getSheetByIndex(); 
        //批注
        luckysheetPostil.buildAllPs(currentSheet.data); 
        //图片
        imageCtrl.images = currentSheet.images;
        imageCtrl.allImagesShow();
        imageCtrl.init();
        if (currentSheet.config == null) {
            currentSheet.config = {};
        }
        if (currentSheet.config.sheetViewZoom == null) {
            currentSheet.config.sheetViewZoom = {};
        }
        let type = currentSheet.config.curentsheetView;
        if (type == null) {
            type = 'viewNormal';
        }
        currentSheet.config.sheetViewZoom[type + 'ZoomScale'] = ratio;
        Store.saveParam('all', Store.currentSheetIndex, Store.zoomRatio, { 'k': 'zoomRatio' });
        Store.saveParam('cg', Store.currentSheetIndex, currentSheet.config['sheetViewZoom'], { 'k': 'sheetViewZoom' });
        zoomRefreshView();
    }
    function zoomRefreshView() {
        // let $scrollLeft = $("#luckysheet-scrollbar-x"), $scrollTop = $("#luckysheet-scrollbar-y");
        // let sl = $scrollLeft.scrollLeft(), st = $scrollTop.scrollTop();
        // let wp = $scrollLeft.find("div").width(), hp = $scrollTop.find("div").height();
        ///jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
        Store.refreshGrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
        changeSheetContainerSize();    
    }
    Store.onZoomChange = function(ratio){
        zoomChange(ratio);

    };

    return sheetmanage;
});