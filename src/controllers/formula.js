define([
    '../utils/util',
    '../methods/get',
    '../methods/set',
    '../widgets/constant',
    '../methods/freezen_methods',
    '../methods/protection_methods',
    '../widgets/dataVerificationCtrl',
    '../widgets/select',
    '../methods/validate',
    '../methods/datecontroll',
    '../methods/getRowlen',
    '../methods/getdata',
    '../methods/setdata',
    '../methods/format',
    '../widgets/tooltip',
    '../methods/location',
    '../widgets/cursorPos',
    '../methods/luckysheetConfigsetting',   
    '../methods/formula_methods',    

    '../function/func',
    '../store',
    '../locale/locale',
    '../methods/json',
    "../methods/cells"
], function (m_util, m_get, m_set, m_constant, luckysheetFreezen, m_protection, dataVerificationCtrl, m_select, m_validate, m_datecontroll, m_getRowlen, m_getdata, m_setdata, m_format, tooltip, m_location, m_cursorPos, luckysheetConfigsetting,formula_methods, m_func, Store, locale, json,cells) {
    'use strict';
    const {replaceHtml, getObjType, chatatABC, ABCatNum, luckysheetfontformat} = m_util;
    const {getSheetIndex, getRangetxt, getluckysheetfile} = m_get;
    const {setluckysheetfile} = m_set;
    const {luckyColor} = m_constant;
    const {checkProtectionLocked, checkProtectionCellHidden} = m_protection;
    const {seletedHighlistByindex, luckysheet_count_show} = m_select;
    const {isRealNum, isRealNull, valueIsError} = m_validate;
    const isEditMode = luckysheetConfigsetting.isEditMode;
    const {isdatetime, isdatatype} = m_datecontroll;
    const {getCellTextSplitArr, getCellTextInfo} = m_getRowlen;
    const {getcellvalue, getcellFormula, getInlineStringNoStyle, getOrigincell} = m_getdata;
    const {setcellvalue} = m_setdata;
    const {genarate, valueShowEs} = m_format;
    const {rowLocation, colLocation, colLocationByIndex, mouseposition} = m_location;
    const {luckysheetRangeLast,setCaretPosition} = m_cursorPos;
    const {convertSpanToShareString} = m_util;

    const {isInlineStringCell} = cells;

    const {luckysheet_compareWith, luckysheet_getarraydata, luckysheet_getcelldata, luckysheet_parseData, luckysheet_getValue, luckysheet_indirect_check, luckysheet_indirect_check_return, luckysheet_offset_check, luckysheet_calcADPMM, luckysheet_getSpecialReference} = m_func;
    const luckysheetformula = Object.assign(formula_methods,{
        oldvalue: null,
        dontupdate: function () {
            let _this = this;
            Store.luckysheetCellUpdate.length = 0;    //clear array
            //clear array
            $('#luckysheet-functionbox-cell, #luckysheet-rich-text-editor').html(_this.oldvalue);
            _this.cancelNormalSelected();
            if (_this.rangetosheet != Store.currentSheetIndex) {
                Store.changeSheet(_this.rangetosheet);
            }
        },
        fucntionboxshow: function (r, c) {
            if (!checkProtectionCellHidden(r, c, Store.currentSheetIndex)) {
                $('#luckysheet-functionbox-cell').html('');
                return;
            }
            let _this = this;
            let d = Store.flowdata;
            let value = '';    // && d[r][c].v != null
            // && d[r][c].v != null
            if (d[r] != null && d[r][c] != null) {
                let cell = $.extend(true, {}, d[r][c]);
                if (isInlineStringCell(cell)) {
                    value = getInlineStringNoStyle(r, c);
                } else if (cell.f != null) {
                    value = getcellvalue(r, c, d, 'f');
                } else {
                    value = valueShowEs(r, c, d);
                }
            }
            _this.oldvalue = value;
            $('#luckysheet-functionbox-cell').html(value);
        },
        rangeHightlightHTML: '<div id="luckysheet-formula-functionrange-highlight-${id}" rangeindex="${id}"  class="luckysheet-selection-highlight luckysheet-formula-functionrange-highlight"><div data-type="top" class="luckysheet-selection-copy-top luckysheet-copy"></div><div data-type="right" class="luckysheet-selection-copy-right luckysheet-copy"></div><div data-type="bottom" class="luckysheet-selection-copy-bottom luckysheet-copy"></div><div data-type="left" class="luckysheet-selection-copy-left luckysheet-copy"></div><div class="luckysheet-selection-copy-hc"></div><div data-type="lt" class="luckysheet-selection-highlight-topleft luckysheet-highlight"></div><div data-type="rt" class="luckysheet-selection-highlight-topright luckysheet-highlight"></div><div data-type="lb" class="luckysheet-selection-highlight-bottomleft luckysheet-highlight"></div><div data-type="rb" class="luckysheet-selection-highlight-bottomright luckysheet-highlight"></div></div>',
        createRangeHightlight: function () {
            let _this = this;
            let $span = $('#luckysheet-rich-text-editor').find('span.luckysheet-formula-functionrange-cell');
            $('#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight').remove();
            $span.each(function () {
                let rangeindex = $(this).attr('rangeindex'), range = $(this).text();
                $('#luckysheet-formula-functionrange').append(replaceHtml(_this.rangeHightlightHTML, { 'id': rangeindex }));
                let cellrange = _this.getcellrange(range);
                let rangeid = 'luckysheet-formula-functionrange-highlight-' + rangeindex;
                if (cellrange == null) {
                } else if (cellrange.sheetIndex == Store.currentSheetIndex || cellrange.sheetIndex == -1 && _this.rangetosheet == Store.currentSheetIndex) {
                    $('#' + rangeid).data('range', cellrange).find('.luckysheet-copy').css({ 'background': luckyColor[rangeindex] }).end().find('.luckysheet-highlight').css({ 'background': luckyColor[rangeindex] }).end().find('.luckysheet-selection-copy-hc').css({ 'background': luckyColor[rangeindex] });
                    seletedHighlistByindex(rangeid, cellrange.row[0], cellrange.row[1], cellrange.column[0], cellrange.column[1]);
                }
            });
            $('#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight').show();
        },
        searchHTML: '<div id="luckysheet-formula-search-c" class="luckysheet-formula-search-c"></div>',
        helpHTML: '<div id="luckysheet-formula-help-c" class="luckysheet-formula-help-c"> <div class="luckysheet-formula-help-close" title="${helpClose}"><i class="fa fa-times" aria-hidden="true"></i></div> <div class="luckysheet-formula-help-collapse" title="${helpCollapse}"><i class="fa fa-angle-up" aria-hidden="true"></i></div> <div class="luckysheet-formula-help-title"><div class="luckysheet-formula-help-title-formula"> <span class="luckysheet-arguments-help-function-name">SUM</span> <span class="luckysheet-arguments-paren">(</span> <span class="luckysheet-arguments-parameter-holder"> <span class="luckysheet-arguments-help-parameter luckysheet-arguments-help-parameter-active" dir="auto">A2:A100</span>, <span class="luckysheet-arguments-help-parameter" dir="auto">101</span> </span> <span class="luckysheet-arguments-paren">)</span> </div></div> <div class="luckysheet-formula-help-content"> <div class="luckysheet-formula-help-content-example"> <div class="luckysheet-arguments-help-section-title">${helpExample}</div> <div class="luckysheet-arguments-help-formula"> <span class="luckysheet-arguments-help-function-name">SUM</span> <span class="luckysheet-arguments-paren">(</span> <span class="luckysheet-arguments-parameter-holder"> <span class="luckysheet-arguments-help-parameter luckysheet-arguments-help-parameter-active" dir="auto">A2:A100</span>, <span class="luckysheet-arguments-help-parameter" dir="auto">101</span> </span> <span class="luckysheet-arguments-paren">)</span> </div> </div> <div class="luckysheet-formula-help-content-detail"> <div class="luckysheet-arguments-help-section"> <div class="luckysheet-arguments-help-section-title luckysheet-arguments-help-parameter-name">${helpAbstract}</div> <span class="luckysheet-arguments-help-parameter-content">${helpAbstract}</span> </div> </div> <div class="luckysheet-formula-help-content-param"> ${param} </div> </div> <div class="luckysheet-formula-help-foot"></div></div>',
        getrangeseleciton: function () {
            let currSelection = window.getSelection();
            let anchor = $(currSelection.anchorNode);
            let anchorOffset = currSelection.anchorOffset;
            if (anchor.parent().is('span') && anchorOffset != 0) {
                let txt = $.trim(anchor.text()), lasttxt = '';
                if (txt.length == 0 && anchor.parent().prev().length > 0) {
                    let ahr = anchor.parent().prev();
                    txt = $.trim(ahr.text());
                    lasttxt = txt.substr(txt.length - 1, 1);
                    return ahr;
                } else {
                    lasttxt = txt.substr(anchorOffset - 1, 1);
                    return anchor.parent();
                }
            } else if (anchor.is('#luckysheet-rich-text-editor') || anchor.is('#luckysheet-functionbox-cell')) {
                let txt = $.trim(anchor.find('span').last().text());
                if (txt.length == 0 && anchor.find('span').length > 1) {
                    let ahr = anchor.find('span');
                    txt = $.trim(ahr.eq(ahr.length - 2).text());
                    return ahr;
                } else {
                    return anchor.find('span').last();
                }
            } else if (anchor.parent().is('#luckysheet-rich-text-editor') || anchor.parent().is('#luckysheet-functionbox-cell') || anchorOffset == 0) {
                if (anchorOffset == 0) {
                    anchor = anchor.parent();
                }
                if (anchor.prev().length > 0) {
                    let txt = $.trim(anchor.prev().text());
                    let lasttxt = txt.substr(txt.length - 1, 1);
                    return anchor.prev();
                }
            }
            return null;
        },
        searchFunctionPosition: function ($menu, $editor, x, y, isparam) {
            let winH = $(window).height(), winW = $(window).width();
            let menuW = $menu.outerWidth(), menuH = $menu.outerHeight();
            if (isparam == null) {
                isparam = false;
            }
            let left = x;
            if (x + menuW > winW) {
                left = x - menuW + $editor.outerWidth();
            } else {
                left = x;
            }
            let top = y;
            if (y + menuH > winH) {
                top = y - menuH;
            } else {
                top = y + $editor.outerHeight();
                if (!isparam) {
                    $menu.html($menu.find('.luckysheet-formula-search-item').get().reverse());
                }
            }
            if (top < 0) {
                top = 0;
            }
            if (left < 0) {
                left = 0;
            }
            $menu.css({
                'top': top,
                'left': left
            }).show();
        },
        searchFunctionCell: null,
        searchFunction: function ($editer) {
            let _this = this;
            let functionlist = Store.functionlist;
            let $cell = _this.getrangeseleciton();
            _this.searchFunctionCell = $cell;
            if ($cell == null || $editer == null) {
                return;
            }
            let inputContent = $editer.text();
            let searchtxt = $cell.text().toUpperCase();
            let reg = /^[a-zA-Z]|[a-zA-Z_]+$/;
            if (!reg.test(searchtxt) || inputContent.substr(0, 1) != '=') {
                return;
            }
            let result = {
                    'f': [],
                    's': [],
                    't': []
                }, result_i = 0;
            for (let i = 0; i < functionlist.length; i++) {
                let item = functionlist[i], n = item.n;
                if (n == searchtxt) {
                    result.f.unshift(item);
                    result_i++;
                } else if (n.substr(0, searchtxt.length) == searchtxt) {
                    result.s.unshift(item);
                    result_i++;
                } else if (n.indexOf(searchtxt) > -1) {
                    result.t.unshift(item);
                    result_i++;
                }
                if (result_i >= 10) {
                    break;
                }
            }
            let list = result.t.concat(result.s.concat(result.f));
            if (list.length <= 0) {
                return;
            }
            let listHTML = _this.searchFunctionHTML(list);
            $('#luckysheet-formula-search-c').html(listHTML).show();
            $('#luckysheet-formula-help-c').hide();
            let $c = $editer.parent(), offset = $c.offset();
            _this.searchFunctionPosition($('#luckysheet-formula-search-c'), $c, offset.left, offset.top);
        },
        searchFunctionEnter: function ($obj) {
            let _this = this;
            let functxt = $obj.data('func');
            _this.searchFunctionCell.text(functxt).after('<span dir="auto" class="luckysheet-formula-text-color">(</span>');
            _this.setCaretPosition(_this.searchFunctionCell.next().get(0), 0, 1);
            $('#luckysheet-formula-search-c').hide();
            _this.helpFunctionExe(_this.searchFunctionCell.closest('div'), _this.searchFunctionCell.next());
        },
        searchFunctionHTML: function (list) {
            let _this = this;
            if ($('#luckysheet-formula-search-c').length == 0) {
                $('body').append(_this.searchHTML);
                $('#luckysheet-formula-search-c').on('mouseover', '.luckysheet-formula-search-item', function () {
                    $('#luckysheet-formula-search-c').find('.luckysheet-formula-search-item').removeClass('luckysheet-formula-search-item-active');
                    $(this).addClass('luckysheet-formula-search-item-active');
                }).on('mouseout', '.luckysheet-formula-search-item', function () {
                }).on('click', '.luckysheet-formula-search-item', function () {
                    if (_this.searchFunctionCell == null) {
                        return;
                    }
                    _this.searchFunctionEnter($(this));
                });
            }
            let itemHTML = '<div data-func="${n}" class="luckysheet-formula-search-item ${class}"><div class="luckysheet-formula-search-func">${n}</div><div class="luckysheet-formula-search-detail">${a}</div></div>';
            let retHTML = '';
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (i == list.length - 1) {
                    retHTML += replaceHtml(itemHTML, {
                        'class': 'luckysheet-formula-search-item-active',
                        'n': item.n,
                        'a': item.a
                    });
                } else {
                    retHTML += replaceHtml(itemHTML, {
                        'class': '',
                        'n': item.n,
                        'a': item.a
                    });
                }
            }
            return retHTML;
        },
        functionlistPosition: {},
        helpFunction: function ($editer, funcname, paramIndex) {
            let _this = this;
            let functionlist = Store.functionlist;
            let $func = functionlist[_this.functionlistPosition[$.trim(funcname).toUpperCase()]];
            if ($func == null) {
                return;
            }
            let _locale = locale();
            let locale_formulaMore = _locale.formulaMore;
            $('#luckysheet-formula-help-c .luckysheet-arguments-help-function-name').html($func.n);
            $('#luckysheet-formula-help-c .luckysheet-arguments-help-parameter-content').html($func.d);
            let helpformula = '<span class="luckysheet-arguments-help-function-name">${name}</span> <span class="luckysheet-arguments-paren">(</span> <span class="luckysheet-arguments-parameter-holder"> ${param} </span> <span class="luckysheet-arguments-paren">)</span>';
            let helpformulaItem = '<span class="luckysheet-arguments-help-parameter" dir="auto">${param}</span>';
            let helpformulaArg = '<div class="luckysheet-arguments-help-section"><div class="luckysheet-arguments-help-section-title">${param}</div><span class="luckysheet-arguments-help-parameter-content">${content}</span></div>';    //"n": "AVERAGE",
                                                                                                                                                                                                                                           //"t": "1",
                                                                                                                                                                                                                                           //"d": "返回数据集的算术平均值，对文本忽略不计。",
                                                                                                                                                                                                                                           //"a": "返回数据集的算术平均值",
                                                                                                                                                                                                                                           //"p": [{ "name": "数值1", "example": "A2:A100", "detail": "计算平均值时用到的第一个数值或范围。", "require": "m", "repeat": "n", "type": "rangenumber" },
                                                                                                                                                                                                                                           //    { "name": "数值2", "example": "B2:B100", "detail": "计算平均值时用到的其他数值或范围。", "require": "o", "repeat": "y", "type": "rangenumber" }
                                                                                                                                                                                                                                           //]
            //"n": "AVERAGE",
            //"t": "1",
            //"d": "返回数据集的算术平均值，对文本忽略不计。",
            //"a": "返回数据集的算术平均值",
            //"p": [{ "name": "数值1", "example": "A2:A100", "detail": "计算平均值时用到的第一个数值或范围。", "require": "m", "repeat": "n", "type": "rangenumber" },
            //    { "name": "数值2", "example": "B2:B100", "detail": "计算平均值时用到的其他数值或范围。", "require": "o", "repeat": "y", "type": "rangenumber" }
            //]
            let fht = '', ahf = '', fhcp = '';
            for (let i = 0; i < $func.p.length; i++) {
                let paramitem = $func.p[i];
                let name = paramitem.name, nameli = paramitem.name;
                if (paramitem.repeat == 'y') {
                    name += ', ...';
                    nameli += '<span class="luckysheet-arguments-help-argument-info">...-' + locale_formulaMore.allowRepeatText + '</span>';
                }
                if (paramitem.require == 'o') {
                    name = '[' + name + ']';
                    nameli += '<span class="luckysheet-arguments-help-argument-info">-[' + locale_formulaMore.allowOptionText + ']</span>';
                }
                fht += '<span class="luckysheet-arguments-help-parameter" dir="auto">' + name + '</span>, ';
                ahf += '<span class="luckysheet-arguments-help-parameter" dir="auto">' + paramitem.example + '</span>, ';
                fhcp += replaceHtml(helpformulaArg, {
                    'param': nameli,
                    'content': paramitem.detail
                });
            }
            fht = fht.substr(0, fht.length - 2);
            ahf = ahf.substr(0, ahf.length - 2);
            $('#luckysheet-formula-help-c .luckysheet-formula-help-title .luckysheet-arguments-parameter-holder').html(fht);    //介绍
            //介绍
            $('#luckysheet-formula-help-c .luckysheet-arguments-help-formula .luckysheet-arguments-parameter-holder').html(ahf);    //示例
            //示例
            $('#luckysheet-formula-help-c .luckysheet-formula-help-content-param').html(fhcp);    //参数
            //参数
            if (paramIndex == null) {
                $('#luckysheet-formula-help-c .luckysheet-formula-help-title-formula .luckysheet-arguments-help-function-name').css('font-weight', 'bold');
            } else {
                $('#luckysheet-formula-help-c .luckysheet-formula-help-title-formula .luckysheet-arguments-help-function-name').css('font-weight', 'normal');
                let index = paramIndex >= $func.p.length ? $func.p.length - 1 : paramIndex;
                $('#luckysheet-formula-help-c .luckysheet-formula-help-title .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter').removeClass('luckysheet-arguments-help-parameter-active');
                $('#luckysheet-formula-help-c .luckysheet-formula-help-title .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter').eq(index).addClass('luckysheet-arguments-help-parameter-active');
                $('#luckysheet-formula-help-c .luckysheet-arguments-help-formula .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter').removeClass('luckysheet-arguments-help-parameter-active');
                $('#luckysheet-formula-help-c .luckysheet-arguments-help-formula .luckysheet-arguments-parameter-holder .luckysheet-arguments-help-parameter').eq(index).addClass('luckysheet-arguments-help-parameter-active');
                $('#luckysheet-formula-help-c .luckysheet-formula-help-content-param .luckysheet-arguments-help-section').removeClass('luckysheet-arguments-help-parameter-active');
                $('#luckysheet-formula-help-c .luckysheet-formula-help-content-param .luckysheet-arguments-help-section').eq(index).addClass('luckysheet-arguments-help-parameter-active');
            }
            let $c = $editer.parent(), offset = $c.offset();
            _this.searchFunctionPosition($('#luckysheet-formula-help-c'), $c, offset.left, offset.top, true);
        },
        helpFunctionExe: function ($editer, currSelection) {
            let _this = this;
            let functionlist = Store.functionlist;
            let _locale = locale();
            let locale_formulaMore = _locale.formulaMore;
            if ($('#luckysheet-formula-help-c').length == 0) {
                $('body').after(replaceHtml(_this.helpHTML, {
                    helpClose: locale_formulaMore.helpClose,
                    helpCollapse: locale_formulaMore.helpCollapse,
                    helpExample: locale_formulaMore.helpExample,
                    helpAbstract: locale_formulaMore.helpAbstract
                }));
                $('#luckysheet-formula-help-c .luckysheet-formula-help-close').click(function () {
                    $('#luckysheet-formula-help-c').hide();
                });
                $('#luckysheet-formula-help-c .luckysheet-formula-help-collapse').click(function () {
                    let $content = $('#luckysheet-formula-help-c .luckysheet-formula-help-content');
                    $content.slideToggle(100, function () {
                        let $c = _this.rangeResizeTo.parent(), offset = $c.offset();
                        _this.searchFunctionPosition($('#luckysheet-formula-help-c'), $c, offset.left, offset.top, true);
                    });
                    if ($content.is(':hidden')) {
                        $(this).html('<i class="fa fa-angle-up" aria-hidden="true"></i>');
                    } else {
                        $(this).html('<i class="fa fa-angle-down" aria-hidden="true"></i>');
                    }
                });
                for (let i = 0; i < functionlist.length; i++) {
                    _this.functionlistPosition[functionlist[i].n] = i;
                }
            }
            if (!currSelection) {
                return;
            }
            let $prev = currSelection, funcLen = $editer.length, $span = $editer.find('span'), currentIndex = currSelection.index(), i = currentIndex;
            if ($prev == null) {
                return;
            }
            let funcName = null, paramindex = null;
            if ($span.eq(i).is('.luckysheet-formula-text-func')) {
                funcName = $span.eq(i).text();
            } else {
                let $cur = null, exceptIndex = [
                        -1,
                        -1
                    ];
                while (--i > 0) {
                    $cur = $span.eq(i);
                    if ($cur.is('.luckysheet-formula-text-func') || $.trim($cur.text()).toUpperCase() in _this.functionlistPosition) {
                        funcName = $cur.text();
                        paramindex = null;
                        let endstate = true;
                        for (let a = i; a <= currentIndex; a++) {
                            if (!paramindex) {
                                paramindex = 0;
                            }
                            if (a >= exceptIndex[0] && a <= exceptIndex[1]) {
                                continue;
                            }
                            $cur = $span.eq(a);
                            if ($cur.is('.luckysheet-formula-text-rpar')) {
                                exceptIndex = [
                                    i,
                                    a
                                ];
                                funcName = null;
                                endstate = false;
                                break;
                            }
                            if ($cur.is('.luckysheet-formula-text-comma')) {
                                paramindex++;
                            }
                        }
                        if (endstate) {
                            break;
                        }
                    }
                }
            }
            if (funcName == null) {
                return;
            }
            _this.helpFunction($editer, funcName, paramindex);
        },
        rangeHightlightselected: function ($editer, kcode) {
            let _this = this;
            let currSelection = _this.getrangeseleciton();
            $('#luckysheet-formula-search-c, #luckysheet-formula-help-c').hide();
            $('#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight .luckysheet-selection-copy-hc').css('opacity', '0.03');
            $('#luckysheet-formula-search-c, #luckysheet-formula-help-c').hide();
            _this.helpFunctionExe($editer, currSelection);    // console.log(currSelection, $(currSelection).closest(".luckysheet-formula-functionrange-cell").length);
            // console.log(currSelection, $(currSelection).closest(".luckysheet-formula-functionrange-cell").length);
            if ($(currSelection).closest('.luckysheet-formula-functionrange-cell').length == 0) {
                _this.searchFunction($editer);
                return;
            }
            let $anchorOffset = $(currSelection).closest('.luckysheet-formula-functionrange-cell');
            let rangeindex = $anchorOffset.attr('rangeindex');
            let rangeid = 'luckysheet-formula-functionrange-highlight-' + rangeindex;
            $('#' + rangeid).find('.luckysheet-selection-copy-hc').css({ 'opacity': '0.13' });
        },
        updatecell: function (r, c, value, isRefresh = true) {
            let _this = this;
            let $input = $('#luckysheet-rich-text-editor');
            let inputText = $input.text(), inputHtml = $input.html();
            if (_this.rangetosheet != null && _this.rangetosheet != Store.currentSheetIndex) {
                Store.changeSheet(_this.rangetosheet);
            }
            if (!checkProtectionLocked(r, c, Store.currentSheetIndex)) {
                return;
            } 
            //数据验证 输入数据无效时禁止输入
            if (Store.dataVerification != null) {
                let dvItem = Store.dataVerification[r + '_' + c];
                if (dvItem != null && dvItem.prohibitInput && !dataVerificationCtrl.validateCellData(inputText, dvItem)) {
                    let failureText = dataVerificationCtrl.getFailureText(dvItem);
                    tooltip.info(failureText, '');
                    _this.cancelNormalSelected();
                    return;
                }
            }
            let curv = Store.flowdata[r][c];    // Store old value for hook function
            // Store old value for hook function
            const oldValue = JSON.stringify(curv);
            let isPrevInline = isInlineStringCell(curv);
            let isCurInline = inputText.slice(0, 1) != '=' && inputHtml.substr(0, 5) == '<span';
            let isCopyVal = false;
            if (!isCurInline && inputText && inputText.length > 0) {
                let splitArr = inputText.replace(/\r\n/g, '_x000D_').replace(/&#13;&#10;/g, '_x000D_').replace(/\r/g, '_x000D_').replace(/\n/g, '_x000D_').split('_x000D_');
                if (splitArr.length > 1) {
                    isCopyVal = true;
                    isCurInline = true;
                    inputText = splitArr.join('\r\n');
                }
            }
            if (!value && !isCurInline && isPrevInline) {
                delete curv.ct.s;
                curv.ct.t = 'g';
                curv.ct.fa = 'General';
                value = '';
            } else if (isCurInline) {
                if (getObjType(curv) != 'object') {
                    curv = {};
                }
                delete curv.f;
                delete curv.v;
                delete curv.m;
                if (curv.ct == null) {
                    curv.ct = {};
                    curv.ct.fa = 'General';
                }
                curv.ct.t = 'inlineStr';
                curv.ct.s = convertSpanToShareString($input.find('span'));
                if (isCopyVal) {
                    curv.ct.s = [{ v: inputText }];
                }
            }    // API, we get value from user
            // API, we get value from user
            value = value || $input.text();    // Hook function
            // Hook function
            if (!luckysheetConfigsetting.createHookFunction('cellUpdateBefore', r, c, value, isRefresh)) {
                _this.cancelNormalSelected();
                return;
            }
            if (!isCurInline) {
                if (isRealNull(value) && !isPrevInline) {
                    if (curv == null || isRealNull(curv.v) && curv.spl == null && curv.f == null) {
                        _this.cancelNormalSelected();
                        return;
                    }
                } else if (curv != null && curv.qp != 1) {
                    if (getObjType(curv) == 'object' && (value == curv.f || value == curv.v || value == curv.m)) {
                        _this.cancelNormalSelected();
                        return;
                    } else if (value == curv) {
                        _this.cancelNormalSelected();
                        return;
                    }
                }
                if (getObjType(value) == 'string' && value.slice(0, 1) == '=' && value.length > 1) {
                } else if (getObjType(curv) == 'object' && curv.ct != null && curv.ct.fa != null && curv.ct.fa != '@' && !isRealNull(value)) {
                    delete curv.m;    //更新时间m处理 ， 会实际删除单元格数据的参数（flowdata时已删除）
                    //更新时间m处理 ， 会实际删除单元格数据的参数（flowdata时已删除）
                    if (curv.f != null) {
                        //如果原来是公式，而更新的数据不是公式，则把公式删除
                        delete curv.f;
                        delete curv.spl;    //删除单元格的sparklines的配置串
                    }
                }
            }
            //删除单元格的sparklines的配置串
            window.luckysheet_getcelldata_cache = null;
            let isRunExecFunction = true;
            let d = editor.deepCopyFlowData(Store.flowdata);
            let dynamicArrayItem = null;    //动态数组
            //动态数组
            if (getObjType(curv) == 'object') {
                if (!isCurInline) {
                    if (getObjType(value) == 'string' && value.slice(0, 1) == '=' && value.length > 1) {
                        let v = _this.execfunction(value, r, c, undefined, true);
                        isRunExecFunction = false;
                        curv = $.extend(true, {}, d[r][c]);
                        curv.v = v[1];
                        curv.f = v[2];    //打进单元格的sparklines的配置串， 报错需要单独处理。
                        //打进单元格的sparklines的配置串， 报错需要单独处理。
                        if (v.length == 4 && v[3].type == 'sparklines') {
                            delete curv.m;
                            delete curv.v;
                            let curCalv = v[3].data;
                            if (getObjType(curCalv) == 'array' && getObjType(curCalv[0]) != 'object') {
                                curv.v = curCalv[0];
                            } else {
                                curv.spl = v[3].data;
                            }
                        } else if (v.length == 4 && v[3].type == 'dynamicArrayItem') {
                            dynamicArrayItem = v[3].data;
                        }
                    }    // from API setCellValue,luckysheet.setCellValue(0, 0, {f: "=sum(D1)", bg:"#0188fb"}),value is an object, so get attribute f as value
                    else // from API setCellValue,luckysheet.setCellValue(0, 0, {f: "=sum(D1)", bg:"#0188fb"}),value is an object, so get attribute f as value
                    if (getObjType(value) == 'object') {
                        let valueFunction = value.f;
                        if (getObjType(valueFunction) == 'string' && valueFunction.slice(0, 1) == '=' && valueFunction.length > 1) {
                            let v = _this.execfunction(valueFunction, r, c, undefined, true);
                            isRunExecFunction = false;    // get v/m/ct
                            // get v/m/ct
                            curv = $.extend(true, {}, d[r][c]);
                            curv.v = v[1];
                            curv.f = v[2];    //打进单元格的sparklines的配置串， 报错需要单独处理。
                            //打进单元格的sparklines的配置串， 报错需要单独处理。
                            if (v.length == 4 && v[3].type == 'sparklines') {
                                delete curv.m;
                                delete curv.v;
                                let curCalv = v[3].data;
                                if (getObjType(curCalv) == 'array' && getObjType(curCalv[0]) != 'object') {
                                    curv.v = curCalv[0];
                                } else {
                                    curv.spl = v[3].data;
                                }
                            } else if (v.length == 4 && v[3].type == 'dynamicArrayItem') {
                                dynamicArrayItem = v[3].data;
                            }
                        }    // from API setCellValue,luckysheet.setCellValue(0, 0, {f: "=sum(D1)", bg:"#0188fb"}),value is an object, so get attribute f as value
                        else
                            // from API setCellValue,luckysheet.setCellValue(0, 0, {f: "=sum(D1)", bg:"#0188fb"}),value is an object, so get attribute f as value
                            {
                                for (let attr in value) {
                                    curv[attr] = value[attr];
                                }    // let valueFunction = value.f;
                                     // if(getObjType(valueFunction) == "string" && valueFunction.slice(0, 1) == "=" && valueFunction.length > 1){
                                     //     let v = _this.execfunction(valueFunction, r, c, undefined, true);
                                     //     isRunExecFunction = false;
                                     //     // get v/m/ct
                                     //     curv = d[r][c];
                                     //     curv.v = v[1];
                                     //     // get f
                                     //     curv.f = v[2];
                                     //     // get other cell style attribute
                                     //     delete value.v;
                                     //     delete value.m;
                                     //     delete value.f;
                                     //     Object.assign(curv,value);
                                     //     //打进单元格的sparklines的配置串， 报错需要单独处理。
                                     //     if(v.length == 4 && v[3].type == "sparklines"){
                                     //         delete curv.m;
                                     //         delete curv.v;
                                     //         let curCalv = v[3].data;
                                     //         if(getObjType(curCalv) == "array" && getObjType(curCalv[0]) != "object"){
                                     //             curv.v = curCalv[0];
                                     //         }
                                     //         else{
                                     //             curv.spl = v[3].data;
                                     //         }
                                     //     }
                                     // }
                            }
                    } else
                        // let valueFunction = value.f;
                        // if(getObjType(valueFunction) == "string" && valueFunction.slice(0, 1) == "=" && valueFunction.length > 1){
                        //     let v = _this.execfunction(valueFunction, r, c, undefined, true);
                        //     isRunExecFunction = false;
                        //     // get v/m/ct
                        //     curv = d[r][c];
                        //     curv.v = v[1];
                        //     // get f
                        //     curv.f = v[2];
                        //     // get other cell style attribute
                        //     delete value.v;
                        //     delete value.m;
                        //     delete value.f;
                        //     Object.assign(curv,value);
                        //     //打进单元格的sparklines的配置串， 报错需要单独处理。
                        //     if(v.length == 4 && v[3].type == "sparklines"){
                        //         delete curv.m;
                        //         delete curv.v;
                        //         let curCalv = v[3].data;
                        //         if(getObjType(curCalv) == "array" && getObjType(curCalv[0]) != "object"){
                        //             curv.v = curCalv[0];
                        //         }
                        //         else{
                        //             curv.spl = v[3].data;
                        //         }
                        //     }
                        // }
                        {
                            _this.delFunctionGroup(r, c);
                            _this.execFunctionGroup(r, c, value);
                            isRunExecFunction = false;
                            curv = $.extend(true, {}, d[r][c]);    // let gd = _this.execFunctionGlobalData[r+"_"+c+"_"+Store.currentSheetIndex];
                                                                   // if(gd!=null){
                                                                   //     curv.v = gd.v;
                                                                   // }
                            // let gd = _this.execFunctionGlobalData[r+"_"+c+"_"+Store.currentSheetIndex];
                            // if(gd!=null){
                            //     curv.v = gd.v;
                            // }
                            curv.v = value;
                            delete curv.f;
                            delete curv.spl;
                            if (curv.qp == 1 && ('' + value).substr(0, 1) != "'") {
                                //if quotePrefix is 1, cell is force string, cell clear quotePrefix when it is updated
                                curv.qp = 0;
                                if (curv.ct != null) {
                                    curv.ct.fa = 'General';
                                    curv.ct.t = 'n';
                                }
                            }
                        }
                }
                value = curv;
            } else {
                if (getObjType(value) == 'string' && value.slice(0, 1) == '=' && value.length > 1) {
                    let v = _this.execfunction(value, r, c, undefined, true);
                    isRunExecFunction = false;
                    value = {
                        'v': v[1],
                        'f': v[2]
                    };    //打进单元格的sparklines的配置串， 报错需要单独处理。
                    //打进单元格的sparklines的配置串， 报错需要单独处理。
                    if (v.length == 4 && v[3].type == 'sparklines') {
                        let curCalv = v[3].data;
                        if (getObjType(curCalv) == 'array' && getObjType(curCalv[0]) != 'object') {
                            value.v = curCalv[0];
                        } else {
                            value.spl = v[3].data;
                        }
                    } else if (v.length == 4 && v[3].type == 'dynamicArrayItem') {
                        dynamicArrayItem = v[3].data;
                    }
                }    // from API setCellValue,luckysheet.setCellValue(0, 0, {f: "=sum(D1)", bg:"#0188fb"}),value is an object, so get attribute f as value
                else // from API setCellValue,luckysheet.setCellValue(0, 0, {f: "=sum(D1)", bg:"#0188fb"}),value is an object, so get attribute f as value
                if (getObjType(value) == 'object') {
                    let valueFunction = value.f;
                    if (getObjType(valueFunction) == 'string' && valueFunction.slice(0, 1) == '=' && valueFunction.length > 1) {
                        let v = _this.execfunction(valueFunction, r, c, undefined, true);
                        isRunExecFunction = false;    // value = {
                                                      //     "v": v[1],
                                                      //     "f": v[2]
                                                      // };
                                                      // update attribute v
                        // value = {
                        //     "v": v[1],
                        //     "f": v[2]
                        // };
                        // update attribute v
                        value.v = v[1];
                        value.f = v[2];    //打进单元格的sparklines的配置串， 报错需要单独处理。
                        //打进单元格的sparklines的配置串， 报错需要单独处理。
                        if (v.length == 4 && v[3].type == 'sparklines') {
                            let curCalv = v[3].data;
                            if (getObjType(curCalv) == 'array' && getObjType(curCalv[0]) != 'object') {
                                value.v = curCalv[0];
                            } else {
                                value.spl = v[3].data;
                            }
                        } else if (v.length == 4 && v[3].type == 'dynamicArrayItem') {
                            dynamicArrayItem = v[3].data;
                        }
                    } else {
                        let v = curv;
                        if (value.v == null) {
                            value.v = v;
                        }
                    }
                } else {
                    _this.delFunctionGroup(r, c);
                    _this.execFunctionGroup(r, c, value);
                    isRunExecFunction = false;
                }
            }    // value maybe an object
            // value maybe an object
            setcellvalue(r, c, d, value);
            _this.cancelNormalSelected();
            let RowlChange = false;
            let cfg = $.extend(true, {}, getluckysheetfile()[getSheetIndex(Store.currentSheetIndex)]['config']);
            if (cfg['rowlen'] == null) {
                cfg['rowlen'] = {};
            }
            if (d[r][c].tb == '2' && d[r][c].v != null || isInlineStringCell(d[r][c])) {
                //自动换行
                let defaultrowlen = Store.defaultrowlen;
                let canvas = $('#luckysheetTableContent').get(0).getContext('2d');    // offlinecanvas.textBaseline = 'top'; //textBaseline以top计算
                                                                                      // let fontset = luckysheetfontformat(d[r][c]);
                                                                                      // offlinecanvas.font = fontset;
                // offlinecanvas.textBaseline = 'top'; //textBaseline以top计算
                // let fontset = luckysheetfontformat(d[r][c]);
                // offlinecanvas.font = fontset;
                if (cfg['customHeight'] && cfg['customHeight'][r] == 1) {
                } else {
                    // let currentRowLen = defaultrowlen;
                    // if(cfg["rowlen"][r] != null){
                    //     currentRowLen = cfg["rowlen"][r];
                    // }
                    let cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 2;
                    let textInfo = getCellTextInfo(d[r][c], canvas, {
                        r: r,
                        c: c,
                        cellWidth: cellWidth
                    });
                    let currentRowLen = defaultrowlen;    // console.log("rowlen", textInfo);
                    // console.log("rowlen", textInfo);
                    if (textInfo != null) {
                        currentRowLen = textInfo.textHeightAll + 2;
                    }    // let strValue = getcellvalue(r, c, d).toString();
                         // let measureText = offlinecanvas.measureText(strValue);
                         // let textMetrics = measureText.width;
                         // let cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 4;
                         // let oneLineTextHeight = measureText.actualBoundingBoxDescent - measureText.actualBoundingBoxAscent;
                         // if(textMetrics > cellWidth){
                         //     let strArr = [];//文本截断数组
                         //     strArr = getCellTextSplitArr(strValue, strArr, cellWidth, offlinecanvas);
                         //     let computeRowlen = oneLineTextHeight * strArr.length + 4;
                         //     //比较计算高度和当前高度取最大高度
                         //     if(computeRowlen > currentRowLen){
                         //         currentRowLen = computeRowlen;
                         //     }
                         // }
                    // let strValue = getcellvalue(r, c, d).toString();
                    // let measureText = offlinecanvas.measureText(strValue);
                    // let textMetrics = measureText.width;
                    // let cellWidth = colLocationByIndex(c)[1] - colLocationByIndex(c)[0] - 4;
                    // let oneLineTextHeight = measureText.actualBoundingBoxDescent - measureText.actualBoundingBoxAscent;
                    // if(textMetrics > cellWidth){
                    //     let strArr = [];//文本截断数组
                    //     strArr = getCellTextSplitArr(strValue, strArr, cellWidth, offlinecanvas);
                    //     let computeRowlen = oneLineTextHeight * strArr.length + 4;
                    //     //比较计算高度和当前高度取最大高度
                    //     if(computeRowlen > currentRowLen){
                    //         currentRowLen = computeRowlen;
                    //     }
                    // }
                    if (currentRowLen > defaultrowlen) {
                        cfg['rowlen'][r] = currentRowLen;
                        RowlChange = true;
                    }
                }
            }    //动态数组
            //动态数组
            let dynamicArray = null;
            if (!!dynamicArrayItem) {
                // let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
                dynamicArray = $.extend(true, [], this.insertUpdateDynamicArray(dynamicArrayItem));    // dynamicArray.push(dynamicArrayItem);
            }
            // dynamicArray.push(dynamicArrayItem);
            let allParam = { 'dynamicArray': dynamicArray };
            if (RowlChange) {
                allParam = {
                    'cfg': cfg,
                    'dynamicArray': dynamicArray,
                    'RowlChange': RowlChange
                };
            }
            setTimeout(() => {
                // Hook function
                luckysheetConfigsetting.createHookFunction('cellUpdated', r, c, JSON.parse(oldValue), Store.flowdata[r][c], isRefresh);
            }, 0);
            if (isRefresh) {
                Store.refreshRange(d, [{
                        'row': [
                            r,
                            r
                        ],
                        'column': [
                            c,
                            c
                        ]
                    }], allParam, isRunExecFunction);    // Store.luckysheetCellUpdate.length = 0; //clear array
                // Store.luckysheetCellUpdate.length = 0; //clear array
                _this.execFunctionGlobalData = null;    //销毁
            } else
                //销毁
                {
                    return {
                        data: d,
                        allParam: allParam
                    };
                }
        },
        cancelNormalSelected: function () {
            let _this = this;
            _this.canceFunctionrangeSelected();
            $('#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight').remove();
            $('#luckysheet-input-box').removeAttr('style');
            $('#luckysheet-input-box-index').hide();
            $('#luckysheet-wa-functionbox-cancel, #luckysheet-wa-functionbox-confirm').removeClass('luckysheet-wa-calculate-active');
            _this.rangestart = false;
            _this.rangedrag_column_start = false;
            _this.rangedrag_row_start = false;
        },
        canceFunctionrangeSelected: function () {
            $('#luckysheet-formula-functionrange-select').hide();
            $('#luckysheet-row-count-show, #luckysheet-column-count-show').hide();    // $("#luckysheet-cols-h-selected, #luckysheet-rows-h-selected").hide();
            // $("#luckysheet-cols-h-selected, #luckysheet-rows-h-selected").hide();
            $('#luckysheet-formula-search-c, #luckysheet-formula-help-c').hide();
        },

        operator: '==|!=|<>|<=|>=|=|+|-|>|<|/|*|%|&|^',
        operatorjson: null,
        functionCopy: function (txt, mode, step) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (mode == null) {
                mode = 'down';
            }
            if (step == null) {
                step = 1;
            }
            if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '', ispassby = true;
            let matchConfig = {
                'bracket': 0,
                'comma': 0,
                'squote': 0,
                'dquote': 0
            };
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.dquote == 0) {
                    matchConfig.bracket += 1;
                    if (str.length > 0) {
                        function_str += str + '(';
                    } else {
                        function_str += '(';
                    }
                    str = '';
                } else if (s == ')' && matchConfig.dquote == 0) {
                    matchConfig.bracket -= 1;
                    function_str += _this.functionCopy(str, mode, step) + ')';
                    str = '';
                } else if (s == '"' && matchConfig.squote == 0) {
                    if (matchConfig.dquote > 0) {
                        function_str += str + '"';
                        matchConfig.dquote -= 1;
                        str = '';
                    } else {
                        matchConfig.dquote += 1;
                        str += '"';
                    }
                } else if (s == ',' && matchConfig.dquote == 0) {
                    function_str += _this.functionCopy(str, mode, step) + ',';
                    str = '';
                } else if (s == '&' && matchConfig.dquote == 0) {
                    if (str.length > 0) {
                        function_str += _this.functionCopy(str, mode, step) + '&';
                        str = '';
                    } else {
                        function_str += '&';
                    }
                } else if (s in _this.operatorjson && matchConfig.dquote == 0) {
                    let s_next = '';
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    let p = i - 1, s_pre = null;
                    if (p >= 0) {
                        do {
                            s_pre = funcstack[p--];
                        } while (p >= 0 && s_pre == ' ');
                    }
                    if (s + s_next in _this.operatorjson) {
                        if (str.length > 0) {
                            function_str += _this.functionCopy(str, mode, step) + s + s_next;
                            str = '';
                        } else {
                            function_str += s + s_next;
                        }
                        i++;
                    } else if (!/[^0-9]/.test(s_next) && s == '-' && (s_pre == '(' || s_pre == null || s_pre == ',' || s_pre == ' ' || s_pre in _this.operatorjson)) {
                        str += s;
                    } else {
                        if (str.length > 0) {
                            function_str += _this.functionCopy(str, mode, step) + s;
                            str = '';
                        } else {
                            function_str += s;
                        }
                    }
                } else {
                    str += s;
                }
                if (i == funcstack.length - 1) {
                    if (_this.iscelldata($.trim(str))) {
                        if (mode == 'down') {
                            function_str += _this.downparam($.trim(str), step);
                        } else if (mode == 'up') {
                            function_str += _this.upparam($.trim(str), step);
                        } else if (mode == 'left') {
                            function_str += _this.leftparam($.trim(str), step);
                        } else if (mode == 'right') {
                            function_str += _this.rightparam($.trim(str), step);
                        }
                    } else {
                        function_str += $.trim(str);
                    }
                }
                i++;
            }
            return function_str;
        },
        isfreezonFuc: function (txt) {
            let row = txt.replace(/[^0-9]/g, '');
            let col = txt.replace(/[^A-Za-z]/g, '');
            let row$ = txt.substr(txt.indexOf(row) - 1, 1);
            let col$ = txt.substr(txt.indexOf(col) - 1, 1);
            let ret = [
                false,
                false
            ];
            if (row$ == '$') {
                ret[0] = true;
            }
            if (col$ == '$') {
                ret[1] = true;
            }
            return ret;
        },
        setfreezonFuceExe: function (rangetxt) {
            let row = parseInt(rangetxt.replace(/[^0-9]/g, ''));
            let col = ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ''));
            let $row = '$', $col = '$';
            if (!isNaN(row) && !isNaN(col)) {
                return $col + chatatABC(col) + $row + row;
            } else if (!isNaN(row)) {
                return $row + row;
            } else if (!isNaN(col)) {
                return $col + chatatABC(col);
            } else {
                return rangetxt;
            }
        },
        setfreezonFuc: function (event) {
            let _this = this;
            let obj = _this.getrangeseleciton();
            if (!_this.iscelldata(obj.text())) {
                return;
            }
            let txt = obj.text(), pos = window.getSelection().anchorOffset;
            let val = txt.split('!'), rangetxt, prefix = '';
            if (val.length > 1) {
                rangetxt = val[1];
                prefix = val[0] + '!';
            } else {
                rangetxt = val[0];
            }
            let newtxt = '', newpos = '';
            let rangetxtIndex = rangetxt.indexOf(':');
            if (rangetxtIndex == -1) {
                newtxt = prefix + _this.setfreezonFuceExe(rangetxt);
                newpos = newtxt.length;
            } else {
                rangetxt = rangetxt.split(':');
                if (pos > rangetxtIndex) {
                    let ret = prefix + rangetxt[0] + ':' + _this.setfreezonFuceExe(rangetxt[1]);
                    newtxt = ret;
                    newpos = ret.length;
                } else {
                    let firsttxt = prefix + _this.setfreezonFuceExe(rangetxt[0]);
                    let ret = firsttxt + ':' + rangetxt[1];
                    newtxt = ret;
                    newpos = firsttxt.length;
                }
            }
            obj.text(prefix + newtxt);
            _this.setCaretPosition(obj.get(0), 0, newpos);
        },
        updateparam: function (orient, txt, step) {
            let _this = this;
            let val = txt.split('!'), rangetxt, prefix = '';
            if (val.length > 1) {
                rangetxt = val[1];
                prefix = val[0] + '!';
            } else {
                rangetxt = val[0];
            }
            if (rangetxt.indexOf(':') == -1) {
                let row = parseInt(rangetxt.replace(/[^0-9]/g, ''));
                let col = ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ''));
                let freezonFuc = _this.isfreezonFuc(rangetxt);
                let $row = freezonFuc[0] ? '$' : '', $col = freezonFuc[1] ? '$' : '';
                if (orient == 'u' && !freezonFuc[0]) {
                    row -= step;
                } else if (orient == 'r' && !freezonFuc[1]) {
                    col += step;
                } else if (orient == 'l' && !freezonFuc[1]) {
                    col -= step;
                } else if (orient == 'd' && !freezonFuc[0]) {
                    row += step;
                }
                if (row[0] < 0 || col[0] < 0) {
                    return _this.error.r;
                }
                if (!isNaN(row) && !isNaN(col)) {
                    return prefix + $col + chatatABC(col) + $row + row;
                } else if (!isNaN(row)) {
                    return prefix + $row + row;
                } else if (!isNaN(col)) {
                    return prefix + $col + chatatABC(col);
                } else {
                    return txt;
                }
            } else {
                rangetxt = rangetxt.split(':');
                let row = [], col = [];
                row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, ''));
                row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, ''));
                if (row[0] > row[1]) {
                    return txt;
                }
                col[0] = ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ''));
                col[1] = ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ''));
                if (col[0] > col[1]) {
                    return txt;
                }
                let freezonFuc0 = _this.isfreezonFuc(rangetxt[0]);
                let freezonFuc1 = _this.isfreezonFuc(rangetxt[1]);
                let $row0 = freezonFuc0[0] ? '$' : '', $col0 = freezonFuc0[1] ? '$' : '';
                let $row1 = freezonFuc1[0] ? '$' : '', $col1 = freezonFuc1[1] ? '$' : '';
                if (orient == 'u') {
                    if (!freezonFuc0[0]) {
                        row[0] -= step;
                    }
                    if (!freezonFuc1[0]) {
                        row[1] -= step;
                    }
                } else if (orient == 'r') {
                    if (!freezonFuc0[1]) {
                        col[0] += step;
                    }
                    if (!freezonFuc1[1]) {
                        col[1] += step;
                    }
                } else if (orient == 'l') {
                    if (!freezonFuc0[1]) {
                        col[0] -= step;
                    }
                    if (!freezonFuc1[1]) {
                        col[1] -= step;
                    }
                } else if (orient == 'd') {
                    if (!freezonFuc0[0]) {
                        row[0] += step;
                    }
                    if (!freezonFuc1[0]) {
                        row[1] += step;
                    }
                }
                if (row[0] < 0 || col[0] < 0) {
                    return _this.error.r;
                }
                if (isNaN(col[0]) && isNaN(col[1])) {
                    return prefix + $row0 + row[0] + ':' + $row1 + row[1];
                } else if (isNaN(row[0]) && isNaN(row[1])) {
                    return prefix + $col0 + chatatABC(col[0]) + ':' + $col1 + chatatABC(col[1]);
                } else {
                    return prefix + $col0 + chatatABC(col[0]) + $row0 + row[0] + ':' + $col1 + chatatABC(col[1]) + $row1 + row[1];
                }
            }
        },
        downparam: function (txt, step) {
            return this.updateparam('d', txt, step);
        },
        upparam: function (txt, step) {
            return this.updateparam('u', txt, step);
        },
        leftparam: function (txt, step) {
            return this.updateparam('l', txt, step);
        },
        rightparam: function (txt, step) {
            return this.updateparam('r', txt, step);
        },
        functionStrChange: function (txt, type, rc, orient, stindex, step) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '', ispassby = true;
            let matchConfig = {
                'bracket': 0,
                //括号
                'comma': 0,
                //逗号
                'squote': 0,
                //单引号
                'dquote': 0    //双引号
            };
            //双引号
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.dquote == 0) {
                    matchConfig.bracket += 1;
                    if (str.length > 0) {
                        function_str += str + '(';
                    } else {
                        function_str += '(';
                    }
                    str = '';
                } else if (s == ')' && matchConfig.dquote == 0) {
                    matchConfig.bracket -= 1;
                    function_str += _this.functionStrChange(str, type, rc, orient, stindex, step) + ')';
                    str = '';
                } else if (s == '"' && matchConfig.squote == 0) {
                    if (matchConfig.dquote > 0) {
                        function_str += str + '"';
                        matchConfig.dquote -= 1;
                        str = '';
                    } else {
                        matchConfig.dquote += 1;
                        str += '"';
                    }
                } else if (s == ',' && matchConfig.dquote == 0) {
                    function_str += _this.functionStrChange(str, type, rc, orient, stindex, step) + ',';
                    str = '';
                } else if (s == '&' && matchConfig.dquote == 0) {
                    if (str.length > 0) {
                        function_str += _this.functionStrChange(str, type, rc, orient, stindex, step) + '&';
                        str = '';
                    } else {
                        function_str += '&';
                    }
                } else if (s in _this.operatorjson && matchConfig.dquote == 0) {
                    let s_next = '';
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    let p = i - 1, s_pre = null;
                    if (p >= 0) {
                        do {
                            s_pre = funcstack[p--];
                        } while (p >= 0 && s_pre == ' ');
                    }
                    if (s + s_next in _this.operatorjson) {
                        if (str.length > 0) {
                            function_str += _this.functionStrChange(str, type, rc, orient, stindex, step) + s + s_next;
                            str = '';
                        } else {
                            function_str += s + s_next;
                        }
                        i++;
                    } else if (!/[^0-9]/.test(s_next) && s == '-' && (s_pre == '(' || s_pre == null || s_pre == ',' || s_pre == ' ' || s_pre in _this.operatorjson)) {
                        str += s;
                    } else {
                        if (str.length > 0) {
                            function_str += _this.functionStrChange(str, type, rc, orient, stindex, step) + s;
                            str = '';
                        } else {
                            function_str += s;
                        }
                    }
                } else {
                    str += s;
                }
                if (i == funcstack.length - 1) {
                    if (_this.iscelldata($.trim(str))) {
                        function_str += _this.functionStrChange_range($.trim(str), type, rc, orient, stindex, step);
                    } else {
                        function_str += $.trim(str);
                    }
                }
                i++;
            }
            return function_str;
        },
        functionStrChange_range: function (txt, type, rc, orient, stindex, step) {
            let _this = this;
            let val = txt.split('!'), rangetxt, prefix = '';
            if (val.length > 1) {
                rangetxt = val[1];
                prefix = val[0] + '!';
            } else {
                rangetxt = val[0];
            }
            let r1, r2, c1, c2;
            let $row0, $row1, $col0, $col1;
            if (rangetxt.indexOf(':') == -1) {
                r1 = r2 = parseInt(rangetxt.replace(/[^0-9]/g, '')) - 1;
                c1 = c2 = ABCatNum(rangetxt.replace(/[^A-Za-z]/g, ''));
                let freezonFuc = _this.isfreezonFuc(rangetxt);
                $row0 = $row1 = freezonFuc[0] ? '$' : '', $col0 = $col1 = freezonFuc[1] ? '$' : '';
            } else {
                rangetxt = rangetxt.split(':');
                r1 = parseInt(rangetxt[0].replace(/[^0-9]/g, '')) - 1;
                r2 = parseInt(rangetxt[1].replace(/[^0-9]/g, '')) - 1;
                if (r1 > r2) {
                    return txt;
                }
                c1 = ABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ''));
                c2 = ABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ''));
                if (c1 > c2) {
                    return txt;
                }
                let freezonFuc0 = _this.isfreezonFuc(rangetxt[0]);
                $row0 = freezonFuc0[0] ? '$' : '';
                $col0 = freezonFuc0[1] ? '$' : '';
                let freezonFuc1 = _this.isfreezonFuc(rangetxt[1]);
                $row1 = freezonFuc1[0] ? '$' : '';
                $col1 = freezonFuc1[1] ? '$' : '';
            }
            if (type == 'del') {
                if (rc == 'row') {
                    if (r1 >= stindex && r2 <= stindex + step - 1) {
                        return _this.error.r;
                    }
                    if (r1 > stindex + step - 1) {
                        r1 -= step;
                    } else if (r1 >= stindex) {
                        r1 = stindex;
                    }
                    if (r2 > stindex + step - 1) {
                        r2 -= step;
                    } else if (r2 >= stindex) {
                        r2 = stindex - 1;
                    }
                    if (r1 < 0) {
                        r1 = 0;
                    }
                    if (r2 < r1) {
                        r2 = r1;
                    }
                } else if (rc == 'col') {
                    if (c1 >= stindex && c2 <= stindex + step - 1) {
                        return _this.error.r;
                    }
                    if (c1 > stindex + step - 1) {
                        c1 -= step;
                    } else if (c1 >= stindex) {
                        c1 = stindex;
                    }
                    if (c2 > stindex + step - 1) {
                        c2 -= step;
                    } else if (c2 >= stindex) {
                        c2 = stindex - 1;
                    }
                    if (c1 < 0) {
                        c1 = 0;
                    }
                    if (c2 < c1) {
                        c2 = c1;
                    }
                }
                if (r1 == r2 && c1 == c2) {
                    if (!isNaN(r1) && !isNaN(c1)) {
                        return prefix + $col0 + chatatABC(c1) + $row0 + (r1 + 1);
                    } else if (!isNaN(r1)) {
                        return prefix + $row0 + (r1 + 1);
                    } else if (!isNaN(c1)) {
                        return prefix + $col0 + chatatABC(c1);
                    } else {
                        return txt;
                    }
                } else {
                    if (isNaN(c1) && isNaN(c2)) {
                        return prefix + $row0 + (r1 + 1) + ':' + $row1 + (r2 + 1);
                    } else if (isNaN(r1) && isNaN(r2)) {
                        return prefix + $col0 + chatatABC(c1) + ':' + $col1 + chatatABC(c2);
                    } else {
                        return prefix + $col0 + chatatABC(c1) + $row0 + (r1 + 1) + ':' + $col1 + chatatABC(c2) + $row1 + (r2 + 1);
                    }
                }
            } else if (type == 'add') {
                if (rc == 'row') {
                    if (orient == 'lefttop') {
                        if (r1 >= stindex) {
                            r1 += step;
                        }
                        if (r2 >= stindex) {
                            r2 += step;
                        }
                    } else if (orient == 'rightbottom') {
                        if (r1 > stindex) {
                            r1 += step;
                        }
                        if (r2 > stindex) {
                            r2 += step;
                        }
                    }
                } else if (rc == 'col') {
                    if (orient == 'lefttop') {
                        if (c1 >= stindex) {
                            c1 += step;
                        }
                        if (c2 >= stindex) {
                            c2 += step;
                        }
                    } else if (orient == 'rightbottom') {
                        if (c1 > stindex) {
                            c1 += step;
                        }
                        if (c2 > stindex) {
                            c2 += step;
                        }
                    }
                }
                if (r1 == r2 && c1 == c2) {
                    if (!isNaN(r1) && !isNaN(c1)) {
                        return prefix + $col0 + chatatABC(c1) + $row0 + (r1 + 1);
                    } else if (!isNaN(r1)) {
                        return prefix + $row0 + (r1 + 1);
                    } else if (!isNaN(c1)) {
                        return prefix + $col0 + chatatABC(c1);
                    } else {
                        return txt;
                    }
                } else {
                    if (isNaN(c1) && isNaN(c2)) {
                        return prefix + $row0 + (r1 + 1) + ':' + $row1 + (r2 + 1);
                    } else if (isNaN(r1) && isNaN(r2)) {
                        return prefix + $col0 + chatatABC(c1) + ':' + $col1 + chatatABC(c2);
                    } else {
                        return prefix + $col0 + chatatABC(c1) + $row0 + (r1 + 1) + ':' + $col1 + chatatABC(c2) + $row1 + (r2 + 1);
                    }
                }
            }
        },
        israngeseleciton: function (istooltip) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (istooltip == null) {
                istooltip = false;
            }
            let currSelection = window.getSelection();
            let anchor = $(currSelection.anchorNode);
            let anchorOffset = currSelection.anchorOffset;
            if (anchor.parent().is('span') && anchorOffset != 0) {
                let txt = $.trim(anchor.text()), lasttxt = '';
                if (txt.length == 0 && anchor.parent().prev().length > 0) {
                    let ahr = anchor.parent().prev();
                    txt = $.trim(ahr.text());
                    lasttxt = txt.substr(txt.length - 1, 1);
                    _this.rangeSetValueTo = ahr;
                } else {
                    lasttxt = txt.substr(anchorOffset - 1, 1);
                    _this.rangeSetValueTo = anchor.parent();
                }
                if (istooltip && (lasttxt == '(' || lasttxt == ',') || !istooltip && (lasttxt == '(' || lasttxt == ',' || lasttxt == '=' || lasttxt in _this.operatorjson || lasttxt == '&')) {
                    return true;
                }
            } else if (anchor.is('#luckysheet-rich-text-editor') || anchor.is('#luckysheet-functionbox-cell')) {
                let txt = $.trim(anchor.find('span').last().text()), lasttxt;
                _this.rangeSetValueTo = anchor.find('span').last();
                if (txt.length == 0 && anchor.find('span').length > 1) {
                    let ahr = anchor.find('span');
                    txt = $.trim(ahr.eq(ahr.length - 2).text());
                    _this.rangeSetValueTo = ahr;
                }
                lasttxt = txt.substr(txt.length - 1, 1);
                if (istooltip && (lasttxt == '(' || lasttxt == ',') || !istooltip && (lasttxt == '(' || lasttxt == ',' || lasttxt == '=' || lasttxt in _this.operatorjson || lasttxt == '&')) {
                    return true;
                }
            } else if (anchor.parent().is('#luckysheet-rich-text-editor') || anchor.parent().is('#luckysheet-functionbox-cell') || anchorOffset == 0) {
                if (anchorOffset == 0) {
                    anchor = anchor.parent();
                }
                if (anchor.prev().length > 0) {
                    let txt = $.trim(anchor.prev().text());
                    let lasttxt = txt.substr(txt.length - 1, 1);
                    _this.rangeSetValueTo = anchor.prev();
                    if (istooltip && (lasttxt == '(' || lasttxt == ',') || !istooltip && (lasttxt == '(' || lasttxt == ',' || lasttxt == '=' || lasttxt in _this.operatorjson || lasttxt == '&')) {
                        return true;
                    }
                }
            }
            return false;
        },
        rangechangeindex: null,
        rangestart: false,
        rangetosheet: null,
        rangeSetValueTo: null,
        func_selectedrange: {},
        //函数选区范围
        rangeSetValue: function (selected, obj) {
            let _this = this;
            let range = '', rf = selected['row'][0], cf = selected['column'][0];
            if (Store.config['merge'] != null && rf + '_' + cf in Store.config['merge']) {
                range = getRangetxt(Store.currentSheetIndex, {
                    column: [
                        cf,
                        cf
                    ],
                    row: [
                        rf,
                        rf
                    ]
                }, _this.rangetosheet);
            } else {
                range = getRangetxt(Store.currentSheetIndex, selected, _this.rangetosheet);
            }
            let $editor;
            if (_this.rangestart || _this.rangedrag_column_start || _this.rangedrag_row_start) {
                if ($('#luckysheet-search-formula-parm').is(':visible') || $('#luckysheet-search-formula-parm-select').is(':visible')) {
                    //公式参数框选取范围
                    $editor = $('#luckysheet-rich-text-editor');
                    $('#luckysheet-search-formula-parm-select-input').val(range);
                    $('#luckysheet-search-formula-parm .parmBox').eq(_this.data_parm_index).find('.txt input').val(range);    //参数对应值显示
                    //参数对应值显示
                    let txtdata = luckysheet_getcelldata(range).data;
                    if (txtdata instanceof Array) {
                        //参数为多个单元格选区
                        let txtArr = [];
                        for (let i = 0; i < txtdata.length; i++) {
                            for (let j = 0; j < txtdata[i].length; j++) {
                                if (txtdata[i][j] == null) {
                                    txtArr.push(null);
                                } else {
                                    txtArr.push(txtdata[i][j].v);
                                }
                            }
                        }
                        $('#luckysheet-search-formula-parm .parmBox').eq(_this.data_parm_index).find('.val').text(' = {' + txtArr.join(',') + '}');
                    } else {
                        //参数为单个单元格选区
                        $('#luckysheet-search-formula-parm .parmBox').eq(_this.data_parm_index).find('.val').text(' = {' + txtdata.v + '}');
                    }    //计算结果显示
                    //计算结果显示
                    let isVal = true;    //参数不为空
                    //参数不为空
                    let parmValArr = [];    //参数值集合
                    //参数值集合
                    let lvi = -1;    //最后一个有值的参数索引
                    //最后一个有值的参数索引
                    $('#luckysheet-search-formula-parm .parmBox').each(function (i, e) {
                        let parmtxt = $(e).find('.txt input').val();
                        if (parmtxt == '' && $(e).find('.txt input').attr('data_parm_require') == 'm') {
                            isVal = false;
                        }
                        if (parmtxt != '') {
                            lvi = i;
                        }
                    });    //单元格显示
                    //单元格显示
                    let functionHtmlTxt;
                    if (lvi == -1) {
                        functionHtmlTxt = '=' + $('#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text').text() + '()';
                    } else if (lvi == 0) {
                        functionHtmlTxt = '=' + $('#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text').text() + '(' + $('#luckysheet-search-formula-parm .parmBox').eq(0).find('.txt input').val() + ')';
                    } else {
                        for (let j = 0; j <= lvi; j++) {
                            parmValArr.push($('#luckysheet-search-formula-parm .parmBox').eq(j).find('.txt input').val());
                        }
                        functionHtmlTxt = '=' + $('#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text').text() + '(' + parmValArr.join(',') + ')';
                    }
                    let function_str = _this.functionHTMLGenerate(functionHtmlTxt);
                    $('#luckysheet-rich-text-editor').html(function_str);
                    $('#luckysheet-functionbox-cell').html($('#luckysheet-rich-text-editor').html());
                    if (isVal) {
                        //公式计算
                        let fp = $.trim(_this.functionParserExe($('#luckysheet-rich-text-editor').text()));
                        let result = new Function('return ' + fp)();
                        $('#luckysheet-search-formula-parm .result span').text(result);
                    }
                } else {
                    let currSelection = window.getSelection();
                    let anchorOffset = currSelection.anchorNode;
                    $editor = $(anchorOffset).closest('div');
                    let $span = $editor.find("span[rangeindex='" + _this.rangechangeindex + "']").html(range);
                    _this.setCaretPosition($span.get(0), 0, range.length);
                }
            } else {
                let function_str = '<span class="luckysheet-formula-functionrange-cell" rangeindex="' + _this.functionHTMLIndex + '" dir="auto" style="color:' + luckyColor[_this.functionHTMLIndex] + ';">' + range + '</span>';
                let $t = $(function_str).insertAfter(_this.rangeSetValueTo);
                _this.rangechangeindex = _this.functionHTMLIndex;
                $editor = $(_this.rangeSetValueTo).closest('div');
                _this.setCaretPosition($editor.find("span[rangeindex='" + _this.rangechangeindex + "']").get(0), 0, range.length);
                _this.functionHTMLIndex++;
            }
            if ($editor.attr('id') == 'luckysheet-rich-text-editor') {
                $('#luckysheet-functionbox-cell').html($('#luckysheet-rich-text-editor').html());
            } else {
                $('#luckysheet-rich-text-editor').html($('#luckysheet-functionbox-cell').html());
            }
        },
        rangedrag: function (event) {
            let _this = this;
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $('#luckysheet-cell-main').scrollLeft();
            let y = mouse[1] + $('#luckysheet-cell-main').scrollTop();
            let row_location = rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            let col_location = colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            let top = 0, height = 0, rowseleted = [];
            if (_this.func_selectedrange.top > row_pre) {
                top = row_pre;
                height = _this.func_selectedrange.top + _this.func_selectedrange.height - row_pre;
                rowseleted = [
                    row_index,
                    _this.func_selectedrange.row[1]
                ];
            } else if (_this.func_selectedrange.top == row_pre) {
                top = row_pre;
                height = _this.func_selectedrange.top + _this.func_selectedrange.height - row_pre;
                rowseleted = [
                    row_index,
                    _this.func_selectedrange.row[0]
                ];
            } else {
                top = _this.func_selectedrange.top;
                height = row - _this.func_selectedrange.top - 1;
                rowseleted = [
                    _this.func_selectedrange.row[0],
                    row_index
                ];
            }
            let left = 0, width = 0, columnseleted = [];
            if (_this.func_selectedrange.left > col_pre) {
                left = col_pre;
                width = _this.func_selectedrange.left + _this.func_selectedrange.width - col_pre;
                columnseleted = [
                    col_index,
                    _this.func_selectedrange.column[1]
                ];
            } else if (_this.func_selectedrange.left == col_pre) {
                left = col_pre;
                width = _this.func_selectedrange.left + _this.func_selectedrange.width - col_pre;
                columnseleted = [
                    col_index,
                    _this.func_selectedrange.column[0]
                ];
            } else {
                left = _this.func_selectedrange.left;
                width = col - _this.func_selectedrange.left - 1;
                columnseleted = [
                    _this.func_selectedrange.column[0],
                    col_index
                ];
            }
            rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], 'h');
            rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], 'h');
            columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], 'v');
            columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], 'v');
            let changeparam = cells.mergeMoveMain(columnseleted, rowseleted, _this.func_selectedrange, top, height, left, width);
            if (changeparam != null) {
                columnseleted = changeparam[0];
                rowseleted = changeparam[1];
                top = changeparam[2];
                height = changeparam[3];
                left = changeparam[4];
                width = changeparam[5];
            }
            _this.func_selectedrange['row'] = rowseleted;
            _this.func_selectedrange['column'] = columnseleted;
            _this.func_selectedrange['left_move'] = left;
            _this.func_selectedrange['width_move'] = width;
            _this.func_selectedrange['top_move'] = top;
            _this.func_selectedrange['height_move'] = height;
            luckysheet_count_show(left, top, width, height, rowseleted, columnseleted);
            $('#luckysheet-formula-functionrange-select').css({
                'left': left,
                'width': width,
                'top': top,
                'height': height
            }).show();
            if ($('#luckysheet-ifFormulaGenerator-multiRange-dialog').is(':visible')) {
                //if公式生成器 选择范围
                let range = getRangetxt(Store.currentSheetIndex, {
                    'row': rowseleted,
                    'column': columnseleted
                }, Store.currentSheetIndex);
                $('#luckysheet-ifFormulaGenerator-multiRange-dialog input').val(range);
            } else {
                _this.rangeSetValue({
                    'row': rowseleted,
                    'column': columnseleted
                });
            }
            luckysheetFreezen.scrollFreezen(rowseleted, columnseleted); //TODO
        },
        rangedrag_column_start: false,
        rangedrag_row_start: false,
        rangedrag_column: function (event) {
            let _this = this;
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $('#luckysheet-cell-main').scrollLeft();
            let y = mouse[1] + $('#luckysheet-cell-main').scrollTop();
            let visibledatarow = Store.visibledatarow;
            let row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
            let col_location = colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            let left = 0, width = 0, columnseleted = [];
            if (_this.func_selectedrange.left > col_pre) {
                left = col_pre;
                width = _this.func_selectedrange.left + _this.func_selectedrange.width - col_pre;
                columnseleted = [
                    col_index,
                    _this.func_selectedrange.column[1]
                ];
            } else if (_this.func_selectedrange.left == col_pre) {
                left = col_pre;
                width = _this.func_selectedrange.left + _this.func_selectedrange.width - col_pre;
                columnseleted = [
                    col_index,
                    _this.func_selectedrange.column[0]
                ];
            } else {
                left = _this.func_selectedrange.left;
                width = col - _this.func_selectedrange.left - 1;
                columnseleted = [
                    _this.func_selectedrange.column[0],
                    col_index
                ];
            }    //rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], "h");
                 //rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], "h");
            //rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], "h");
            //rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], "h");
            columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], 'v');
            columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], 'v');
            let changeparam = cells.mergeMoveMain(columnseleted, [
                0,
                row_index
            ], _this.func_selectedrange, row_pre, row - row_pre - 1, left, width);
            if (changeparam != null) {
                columnseleted = changeparam[0];    // rowseleted= changeparam[1];
                                                   // top = changeparam[2];
                                                   // height = changeparam[3];
                // rowseleted= changeparam[1];
                // top = changeparam[2];
                // height = changeparam[3];
                left = changeparam[4];
                width = changeparam[5];
            }
            _this.func_selectedrange['column'] = columnseleted;
            _this.func_selectedrange['left_move'] = left;
            _this.func_selectedrange['width_move'] = width;
            luckysheet_count_show(left, row_pre, width, row - row_pre - 1, [
                0,
                row_index
            ], columnseleted);
            _this.rangeSetValue({
                'row': [
                    null,
                    null
                ],
                'column': columnseleted
            });
            $('#luckysheet-formula-functionrange-select').css({
                'left': left,
                'width': width,
                'top': row_pre,
                'height': row - row_pre - 1
            }).show();
            luckysheetFreezen.scrollFreezen([
                0,
                row_index
            ], columnseleted); //TODO:lwf
        },
        rangedrag_row: function (event) {
            let _this = this;
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + $('#luckysheet-cell-main').scrollLeft();
            let y = mouse[1] + $('#luckysheet-cell-main').scrollTop();
            let row_location = rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            let visibledatacolumn = Store.visibledatacolumn;
            let col_index = visibledatacolumn.length - 1, col = visibledatacolumn[col_index], col_pre = 0;
            let top = 0, height = 0, rowseleted = [];
            if (_this.func_selectedrange.top > row_pre) {
                top = row_pre;
                height = _this.func_selectedrange.top + _this.func_selectedrange.height - row_pre;
                rowseleted = [
                    row_index,
                    _this.func_selectedrange.row[1]
                ];
            } else if (_this.func_selectedrange.top == row_pre) {
                top = row_pre;
                height = _this.func_selectedrange.top + _this.func_selectedrange.height - row_pre;
                rowseleted = [
                    row_index,
                    _this.func_selectedrange.row[0]
                ];
            } else {
                top = _this.func_selectedrange.top;
                height = row - _this.func_selectedrange.top - 1;
                rowseleted = [
                    _this.func_selectedrange.row[0],
                    row_index
                ];
            }
            rowseleted[0] = luckysheetFreezen.changeFreezenIndex(rowseleted[0], 'h');
            rowseleted[1] = luckysheetFreezen.changeFreezenIndex(rowseleted[1], 'h');    // columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], "v");
                                                                                         // columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], "v");
            // columnseleted[0] = luckysheetFreezen.changeFreezenIndex(columnseleted[0], "v");
            // columnseleted[1] = luckysheetFreezen.changeFreezenIndex(columnseleted[1], "v");
            let changeparam = cells.mergeMoveMain([
                0,
                col_index
            ], rowseleted, _this.func_selectedrange, top, height, col_pre, col - col_pre - 1);
            if (changeparam != null) {
                // columnseleted = changeparam[0];
                rowseleted = changeparam[1];
                top = changeparam[2];
                height = changeparam[3];
            }
            // left = changeparam[4];
            // width = changeparam[5];
            _this.func_selectedrange['row'] = rowseleted;
            _this.func_selectedrange['top_move'] = top;
            _this.func_selectedrange['height_move'] = height;
            luckysheet_count_show(col_pre, top, col - col_pre - 1, height, rowseleted, [
                0,
                col_index
            ]);
            _this.rangeSetValue({
                'row': rowseleted,
                'column': [
                    null,
                    null
                ]
            });
            $('#luckysheet-formula-functionrange-select').css({
                'left': col_pre,
                'width': col - col_pre - 1,
                'top': top,
                'height': height
            }).show();
            luckysheetFreezen.scrollFreezen(rowseleted, [
                0,
                col_index
            ]); //TODO:lwf
        },
        rangedragged: function () {
        },
        rangeResizeObj: null,
        rangeResize: null,
        rangeResizeIndex: null,
        rangeResizexy: null,
        rangeResizeWinH: null,
        rangeResizeWinW: null,
        rangeResizeTo: null,
        rangeResizeDraging: function (event, luckysheetCurrentChartResizeObj, luckysheetCurrentChartResizeXy, luckysheetCurrentChartResize, luckysheetCurrentChartResizeWinW, luckysheetCurrentChartResizeWinH, ch_width, rh_height) {
            let _this = this;
            let scrollTop = $('#luckysheet-scrollbar-y').scrollTop(), scrollLeft = $('#luckysheet-scrollbar-x').scrollLeft();
            let mouse = mouseposition(event.pageX, event.pageY);
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;
            let row_location = rowLocation(y), row = row_location[1], row_pre = row_location[0], row_index = row_location[2];
            let col_location = colLocation(x), col = col_location[1], col_pre = col_location[0], col_index = col_location[2];
            if (x < 0 || y < 0) {
                return false;
            }
            let topchange = row_pre - luckysheetCurrentChartResizeXy[1], leftchange = col_pre - luckysheetCurrentChartResizeXy[0];
            let top = luckysheetCurrentChartResizeXy[5], height = luckysheetCurrentChartResizeXy[3], left = luckysheetCurrentChartResizeXy[4], width = luckysheetCurrentChartResizeXy[2];
            if (luckysheetCurrentChartResize == 'lt' || luckysheetCurrentChartResize == 'lb') {
                if (luckysheetCurrentChartResizeXy[0] + luckysheetCurrentChartResizeXy[2] < col_pre) {
                    return;
                }
                left = col_pre;
                width = luckysheetCurrentChartResizeXy[2] - leftchange;
                if (left > luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[4] - col + col_pre) {
                    left = luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[4] - col + col_pre;
                    width = luckysheetCurrentChartResizeXy[2] - (luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[4] - col + col_pre - luckysheetCurrentChartResizeXy[0]);
                } else if (left <= 0) {
                    left = 0;
                    width = luckysheetCurrentChartResizeXy[2] + luckysheetCurrentChartResizeXy[0];
                }
            }
            if (luckysheetCurrentChartResize == 'rt' || luckysheetCurrentChartResize == 'rb') {
                if (luckysheetCurrentChartResizeXy[6] - luckysheetCurrentChartResizeXy[2] > col) {
                    return;
                }
                width = luckysheetCurrentChartResizeXy[2] + col - luckysheetCurrentChartResizeXy[6];
                if (width < col - col_pre - 1) {
                    width = col - col_pre - 1;
                } else if (width >= ch_width - left) {
                    width = ch_width - left;
                }
            }
            if (luckysheetCurrentChartResize == 'lt' || luckysheetCurrentChartResize == 'rt') {
                if (luckysheetCurrentChartResizeXy[1] + luckysheetCurrentChartResizeXy[3] < row_pre) {
                    return;
                }
                top = row_pre;
                height = luckysheetCurrentChartResizeXy[3] - topchange;
                if (top > luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[5] - row + row_pre) {
                    top = luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[5] - row + row_pre;
                    height = luckysheetCurrentChartResizeXy[3] - (luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[5] - row + row_pre - luckysheetCurrentChartResizeXy[1]);
                } else if (top <= 0) {
                    top = 0;
                    height = luckysheetCurrentChartResizeXy[3] + luckysheetCurrentChartResizeXy[1];
                }
            }
            if (luckysheetCurrentChartResize == 'lb' || luckysheetCurrentChartResize == 'rb') {
                if (luckysheetCurrentChartResizeXy[7] - luckysheetCurrentChartResizeXy[3] > row) {
                    return;
                }
                height = luckysheetCurrentChartResizeXy[3] + row - luckysheetCurrentChartResizeXy[7];
                if (height < row - row_pre - 1) {
                    height = row - row_pre - 1;
                } else if (height >= rh_height - top) {
                    height = rh_height - top;
                }
            }
            let rangeindex = _this.rangeResizeIndex;
            let selected = {
                'top': top,
                'left': left,
                'height': height,
                'width': width
            };
            let range = _this.getSelectedFromRange(selected);
            let rangetxt = getRangetxt(Store.currentSheetIndex, range, _this.rangetosheet);
            let $span = _this.rangeResizeTo.find("span[rangeindex='" + rangeindex + "']").html(rangetxt);
            luckysheetRangeLast(_this.rangeResizeTo[0]);
            luckysheetCurrentChartResizeObj.css(selected).data('range', range);
        },
        getSelectedFromRange: function (obj) {
            let row_st = obj.top + 2, row_ed = obj.top + obj.height - 2;
            let col_st = obj.left + 2, col_ed = obj.left + obj.width - 2;
            let ret = {
                'row': [
                    rowLocation(row_st)[2],
                    rowLocation(row_ed)[2]
                ],
                'column': [
                    colLocation(col_st)[2],
                    colLocation(col_ed)[2]
                ]
            };
            return ret;
        },
        rangeResizeDragged: function (event, luckysheetCurrentChartResizeObj, luckysheetCurrentChartResizeXy, luckysheetCurrentChartResize, luckysheetCurrentChartResizeWinW, luckysheetCurrentChartResizeWinH) {
            let _this = this;
            _this.rangeResize = null;
            $('#luckysheet-formula-functionrange-highlight-' + _this.rangeResizeIndex).find('.luckysheet-selection-copy-hc').css('opacity', 0.03);
        },
        rangeMovexy: null,
        rangeMove: false,
        rangeMoveObj: null,
        rangeMoveIndex: null,
        rangeMoveRangedata: null,
        rangeMoveDraging: function (event, luckysheet_cell_selected_move_index, luckysheet_select_save, obj, sheetBarHeight, statisticBarHeight) {
            let _this = this;
            let mouse = mouseposition(event.pageX, event.pageY);
            let scrollLeft = $('#luckysheet-scrollbar-x').scrollLeft();
            let scrollTop = $('#luckysheet-scrollbar-y').scrollTop();
            let x = mouse[0] + scrollLeft;
            let y = mouse[1] + scrollTop;
            let winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;
            let row_index_original = luckysheet_cell_selected_move_index[0], col_index_original = luckysheet_cell_selected_move_index[1];
            let row_s = luckysheet_select_save['row'][0] - row_index_original + rowLocation(y)[2], row_e = luckysheet_select_save['row'][1] - row_index_original + rowLocation(y)[2];
            let col_s = luckysheet_select_save['column'][0] - col_index_original + colLocation(x)[2], col_e = luckysheet_select_save['column'][1] - col_index_original + colLocation(x)[2];
            if (row_s < 0 || y < 0) {
                row_s = 0;
                row_e = luckysheet_select_save['row'][1] - luckysheet_select_save['row'][0];
            }
            if (col_s < 0 || x < 0) {
                col_s = 0;
                col_e = luckysheet_select_save['column'][1] - luckysheet_select_save['column'][0];
            }
            let visibledatarow = Store.visibledatarow;
            if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                row_s = visibledatarow.length - 1 - luckysheet_select_save['row'][1] + luckysheet_select_save['row'][0];
                row_e = visibledatarow.length - 1;
            }
            let visibledatacolumn = Store.visibledatacolumn;
            if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                col_s = visibledatacolumn.length - 1 - luckysheet_select_save['column'][1] + luckysheet_select_save['column'][0];
                col_e = visibledatacolumn.length - 1;
            }
            let col_pre = col_s - 1 == -1 ? 0 : visibledatacolumn[col_s - 1], col = visibledatacolumn[col_e];
            let row_pre = row_s - 1 == -1 ? 0 : visibledatarow[row_s - 1], row = visibledatarow[row_e];
            let rangeindex = _this.rangeMoveIndex;
            let selected = {
                'left': col_pre,
                'width': col - col_pre - 2,
                'top': row_pre,
                'height': row - row_pre - 2,
                'display': 'block'
            };
            let range = _this.getSelectedFromRange(selected);
            let rangetxt = getRangetxt(Store.currentSheetIndex, range, _this.rangetosheet);
            let $span = _this.rangeResizeTo.find("span[rangeindex='" + rangeindex + "']").html(rangetxt);
            luckysheetRangeLast(_this.rangeResizeTo[0]);
            _this.rangeMoveRangedata = range;
            obj.css(selected);
        },
        rangeMoveDragged: function (obj) {
            let _this = this;
            _this.rangeMove = false;
            $('#luckysheet-formula-functionrange-highlight-' + _this.rangeMoveIndex).data('range', _this.rangeMoveRangedata).find('.luckysheet-selection-copy-hc').css('opacity', 0.03);
        },
        functionHTMLIndex: 0,
        functionRangeIndex: null,
        findrangeindex: function (v, vp) {
            let _this = this;
            let re = /<span.*?>/g;
            let v_a = v.replace(re, ''), vp_a = vp.replace(re, '');
            v_a = v_a.split('</span>');
            vp_a = vp_a.split('</span>');
            v_a.pop();
            vp_a.pop();
            let pfri = _this.functionRangeIndex;
            let i = 0;
            let spanlen = vp_a.length > v_a.length ? v_a.length : vp_a.length;
            let vplen = vp_a.length, vlen = v_a.length;    //不增加元素输入
            //不增加元素输入
            if (vplen == vlen) {
                let i = pfri[0];
                let p = vp_a[i], n = v_a[i];
                if (p == null) {
                    if (vp_a.length <= i) {
                        pfri = [
                            vp_a.length - 1,
                            vp_a.length - 1
                        ];
                    } else if (v_a.length <= i) {
                        pfri = [
                            v_a.length - 1,
                            v_a.length - 1
                        ];
                    }
                    return pfri;
                } else if (p.length == n.length) {
                    if (vp_a[i + 1] != null && v_a[i + 1] != null && vp_a[i + 1].length < v_a[i + 1].length) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = 1;
                    }
                    return pfri;
                } else if (p.length > n.length) {
                    if (p != null && v_a[i + 1] != null && v_a[i + 1].substr(0, 1) == '"' && (p.indexOf('{') > -1 || p.indexOf('}') > -1)) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = 1;
                    }
                    return pfri;
                } else if (p.length < n.length) {
                    if (pfri[1] > n.length) {
                        pfri[1] = n.length;
                    }
                    return pfri;
                }
            }    //减少元素输入
            else //减少元素输入
            if (vplen > vlen) {
                let i = pfri[0];
                let p = vp_a[i], n = v_a[i];
                if (n == null) {
                    if (v_a[i - 1].indexOf('{') > -1) {
                        pfri[0] = pfri[0] - 1;
                        let start = v_a[i - 1].search('{');
                        pfri[1] = pfri[1] + start;
                    } else {
                        pfri[0] = 0;
                        pfri[1] = 0;
                    }
                } else if (p.length == n.length) {
                    if (v_a[i + 1] != null && (v_a[i + 1].substr(0, 1) == '"' || v_a[i + 1].substr(0, 1) == '{' || v_a[i + 1].substr(0, 1) == '}')) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = 1;
                    } else if (p != null && p.length > 2 && p.substr(0, 1) == '"' && p.substr(p.length - 1, 1) == '"') {
                    } else if (v_a[i] != null && v_a[i] == '")') {
                        pfri[1] = 1;
                    } else if (v_a[i] != null && v_a[i] == '"}') {
                        pfri[1] = 1;
                    } else if (v_a[i] != null && v_a[i] == '{)') {
                        pfri[1] = 1;
                    } else {
                        pfri[1] = n.length;
                    }
                    return pfri;
                } else if (p.length > n.length) {
                    if (v_a[i + 1] != null && (v_a[i + 1].substr(0, 1) == '"' || v_a[i + 1].substr(0, 1) == '{' || v_a[i + 1].substr(0, 1) == '}')) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = 1;
                    }
                    return pfri;
                } else if (p.length < n.length) {
                    return pfri;
                }
                return pfri;
            }    //增加元素输入
            else //增加元素输入
            if (vplen < vlen) {
                let i = pfri[0];
                let p = vp_a[i], n = v_a[i];
                if (p == null) {
                    pfri[0] = v_a.length - 1;
                    if (n != null) {
                        pfri[1] = n.length;
                    } else {
                        pfri[1] = 1;
                    }
                } else if (p.length == n.length) {
                    if (vp_a[i + 1] != null && (vp_a[i + 1].substr(0, 1) == '"' || vp_a[i + 1].substr(0, 1) == '{' || vp_a[i + 1].substr(0, 1) == '}')) {
                        pfri[1] = n.length;
                    } else if (v_a[i + 1] != null && v_a[i + 1].substr(0, 1) == '"' && (v_a[i + 1].substr(0, 1) == '{' || v_a[i + 1].substr(0, 1) == '}')) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = 1;
                    } else if (n != null && n.substr(0, 1) == '"' && n.substr(n.length - 1, 1) == '"' && p.substr(0, 1) == '"' && p.substr(p.length - 1, 1) == ')') {
                        pfri[1] = n.length;
                    } else if (n != null && n.substr(0, 1) == '{' && n.substr(n.length - 1, 1) == '}' && p.substr(0, 1) == '{' && p.substr(p.length - 1, 1) == ')') {
                        pfri[1] = n.length;
                    } else {
                        pfri[0] = pfri[0] + vlen - vplen;
                        if (v_a.length > vp_a.length) {
                            pfri[1] = v_a[i + 1].length;
                        } else {
                            pfri[1] = 1;
                        }
                    }
                    return pfri;
                } else if (p.length > n.length) {
                    if (p != null && p.substr(0, 1) == '"') {
                        pfri[1] = n.length;
                    } else if (v_a[i + 1] != null && /{.*?}/.test(v_a[i + 1])) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = v_a[i + 1].length;
                    } else if (p != null && v_a[i + 1].substr(0, 1) == '"' && (p.indexOf('{') > -1 || p.indexOf('}') > -1)) {
                        pfri[0] = pfri[0] + 1;
                        pfri[1] = 1;
                    } else if (p != null && (p.indexOf('{') > -1 || p.indexOf('}') > -1)) {
                    } else {
                        pfri[0] = pfri[0] + vlen - vplen - 1;
                        pfri[1] = v_a[i - 1].length;
                    }
                    return pfri;
                } else if (p.length < n.length) {
                    return pfri;
                }
                return pfri;
            }
            return null;
        },
        setCaretPosition: function (textDom, children, pos) {
            return setCaretPosition(textDom,children,pos);
        },
        functionRange: function (obj, v, vp) {
            let _this = this;
            if (window.getSelection) {
                //ie11 10 9 ff safari
                let currSelection = window.getSelection();
                let fri = _this.findrangeindex(v, vp);
                if (fri == null) {
                    currSelection.selectAllChildren(obj.get(0));
                    currSelection.collapseToEnd();
                } else {
                    _this.setCaretPosition(obj.find('span').get(fri[0]), 0, fri[1]);
                }
            } else if (document.selection) {
                //ie10 9 8 7 6 5
                _this.functionRangeIndex.moveToElementText(obj);    //range定位到obj
                //range定位到obj
                _this.functionRangeIndex.collapse(false);    //光标移至最后
                //光标移至最后
                _this.functionRangeIndex.select();
            }
        },
        functionInputHanddler: function ($to, $input, kcode) {
            if (isEditMode()) {
                //此模式下禁用公式栏
                return;
            }
            let _this = this;
            let $copy = $to, $editer = $input;
            let value1 = $editer.html(), value1txt = $editer.text();
            setTimeout(function () {
                let value = $editer.text(), valuetxt = value;
                if (value.length > 0 && value.substr(0, 1) == '=' && (kcode != 229 || value.length == 1)) {
                    value = _this.functionHTMLGenerate(value);
                    value1 = _this.functionHTMLGenerate(value1txt);
                    if (window.getSelection) {
                        // all browsers, except IE before version 9
                        let currSelection = window.getSelection();
                        if ($(currSelection.anchorNode).is('div')) {
                            let editorlen = $('#luckysheet-rich-text-editor span').length;
                            _this.functionRangeIndex = [
                                editorlen - 1,
                                $('#luckysheet-rich-text-editor').find('span').eq(editorlen - 1).text().length
                            ];
                        } else {
                            _this.functionRangeIndex = [
                                $(currSelection.anchorNode).parent().index(),
                                currSelection.anchorOffset
                            ];
                        }
                    } else {
                        // Internet Explorer before version 9
                        let textRange = document.selection.createRange();
                        _this.functionRangeIndex = textRange;
                    }
                    $editer.html(value);
                    _this.functionRange($editer, value, value1);
                    _this.canceFunctionrangeSelected();
                    if (kcode != 46) {
                        //delete不执行此函数
                        _this.createRangeHightlight();
                    }
                    $copy.html(value);
                    _this.rangestart = false;
                    _this.rangedrag_column_start = false;
                    _this.rangedrag_row_start = false;
                    _this.rangeHightlightselected($editer, kcode);
                } else if (value1txt.substr(0, 1) != '=') {
                    //&& value1.indexOf("span")>-1
                    // $editer.html(value1);
                    // let w = window.getSelection();
                    // if(w!=null && w.type!="None"){
                    //     let range = w.getRangeAt(0);
                    //     let c = range.startContainer;
                    //     if(c.id=="luckysheet-rich-text-editor" || $(c).closest("#luckysheet-rich-text-editor")){
                    //         $functionbox.html(value);
                    //     }
                    //     else if(c.id=="luckysheet-functionbox-cell" || $(c).closest("#luckysheet-functionbox-cell")){
                    //         if(value1.indexOf("span")>-1){
                    //         }
                    //         else{
                    //             $editer.html(value);
                    //         }
                    //     }
                    // }
                    // console.trace();
                    // console.log(value, $copy.attr("id"));
                    if ($copy.attr('id') == 'luckysheet-rich-text-editor') {
                        if ($copy.html().substr(0, 5) == '<span') {
                        } else {
                            $copy.html(value);
                        }
                    } else {
                        $copy.html(value);
                    }
                }
            }, 1);
        },
        functionHTMLGenerate: function (txt) {
            let _this = this;
            if (txt.length == 0 || txt.substr(0, 1) != '=') {
                return txt;
            }
            _this.functionHTMLIndex = 0;
            return '<span dir="auto" class="luckysheet-formula-text-color">=</span>' + _this.functionHTML(txt);
        },
        functionHTML: function (txt) {
            let _this = this;
            if (_this.operatorjson == null) {
                let arr = _this.operator.split('|'), op = {};
                for (let i = 0; i < arr.length; i++) {
                    op[arr[i].toString()] = 1;
                }
                _this.operatorjson = op;
            }
            if (txt.substr(0, 1) == '=') {
                txt = txt.substr(1);
            }
            let funcstack = txt.split('');
            let i = 0, str = '', function_str = '', ispassby = true;
            let matchConfig = {
                'bracket': 0,
                'comma': 0,
                'squote': 0,
                'dquote': 0,
                'braces': 0
            };
            while (i < funcstack.length) {
                let s = funcstack[i];
                if (s == '(' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    matchConfig.bracket += 1;
                    if (str.length > 0) {
                        function_str += '<span dir="auto" class="luckysheet-formula-text-func">' + str + '</span><span dir="auto" class="luckysheet-formula-text-lpar">(</span>';
                    } else {
                        function_str += '<span dir="auto" class="luckysheet-formula-text-lpar">(</span>';
                    }
                    str = '';
                } else if (s == ')' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    matchConfig.bracket -= 1;
                    function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-rpar">)</span>';
                    str = '';
                } else if (s == '{' && matchConfig.squote == 0 && matchConfig.dquote == 0) {
                    str += '{';
                    matchConfig.braces += 1;
                } else if (s == '}' && matchConfig.squote == 0 && matchConfig.dquote == 0) {
                    str += '}';
                    matchConfig.braces -= 1;
                } else if (s == '"' && matchConfig.squote == 0) {
                    if (matchConfig.dquote > 0) {
                        if (str.length > 0) {
                            function_str += str + '"</span>';
                        } else {
                            function_str += '"</span>';
                        }
                        matchConfig.dquote -= 1;
                        str = '';
                    } else {
                        matchConfig.dquote += 1;
                        if (str.length > 0) {
                            function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-string">"';
                        } else {
                            function_str += '<span dir="auto" class="luckysheet-formula-text-string">"';
                        }
                        str = '';
                    }
                }    //修正例如输入公式='1-2'!A1时，只有2'!A1是luckysheet-formula-functionrange-cell色，'1-是黑色的问题。
                else //修正例如输入公式='1-2'!A1时，只有2'!A1是luckysheet-formula-functionrange-cell色，'1-是黑色的问题。
                if (s == "'" && matchConfig.dquote == 0) {
                    str += "'";
                    matchConfig.squote = matchConfig.squote == 0 ? 1 : 0;
                } else if (s == ',' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    //matchConfig.comma += 1;
                    function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-comma">,</span>';
                    str = '';
                } else if (s == '&' && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    if (str.length > 0) {
                        function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-calc">' + '&' + '</span>';
                        str = '';
                    } else {
                        function_str += '<span dir="auto" class="luckysheet-formula-text-calc">' + '&' + '</span>';
                    }
                } else if (s in _this.operatorjson && matchConfig.squote == 0 && matchConfig.dquote == 0 && matchConfig.braces == 0) {
                    let s_next = '';
                    if (i + 1 < funcstack.length) {
                        s_next = funcstack[i + 1];
                    }
                    let p = i - 1, s_pre = null;
                    if (p >= 0) {
                        do {
                            s_pre = funcstack[p--];
                        } while (p >= 0 && s_pre == ' ');
                    }
                    if (s + s_next in _this.operatorjson) {
                        if (str.length > 0) {
                            function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-calc">' + s + s_next + '</span>';
                            str = '';
                        } else {
                            function_str += '<span dir="auto" class="luckysheet-formula-text-calc">' + s + s_next + '</span>';
                        }
                        i++;
                    } else if (!/[^0-9]/.test(s_next) && s == '-' && (s_pre == '(' || s_pre == null || s_pre == ',' || s_pre == ' ' || s_pre in _this.operatorjson)) {
                        str += s;
                    } else {
                        if (str.length > 0) {
                            function_str += _this.functionHTML(str) + '<span dir="auto" class="luckysheet-formula-text-calc">' + s + '</span>';
                            str = '';
                        } else {
                            function_str += '<span dir="auto" class="luckysheet-formula-text-calc">' + s + '</span>';
                        }
                    }
                } else {
                    str += s;
                }
                if (i == funcstack.length - 1) {
                    //function_str += str;
                    if (_this.iscelldata($.trim(str))) {
                        function_str += '<span class="luckysheet-formula-functionrange-cell" rangeindex="' + _this.functionHTMLIndex + '" dir="auto" style="color:' + luckyColor[_this.functionHTMLIndex] + ';">' + str + '</span>';
                        _this.functionHTMLIndex++;
                    } else if (matchConfig.dquote > 0) {
                        function_str += str + '</span>';
                    } else if (str.indexOf('</span>') == -1 && str.length > 0) {
                        let regx = /{.*?}/;
                        if (regx.test($.trim(str))) {
                            let arraytxt = regx.exec(str)[0];
                            let arraystart = str.search(regx);
                            let alltxt = '';
                            if (arraystart > 0) {
                                alltxt += '<span dir="auto" class="luckysheet-formula-text-color">' + str.substr(0, arraystart) + '</span>';
                            }
                            alltxt += '<span dir="auto" style="color:#959a05" class="luckysheet-formula-text-array">' + arraytxt + '</span>';
                            if (arraystart + arraytxt.length < str.length) {
                                alltxt += '<span dir="auto" class="luckysheet-formula-text-color">' + str.substr(arraystart + arraytxt.length, str.length) + '</span>';
                            }
                            function_str += alltxt;
                        } else {
                            function_str += '<span dir="auto" class="luckysheet-formula-text-color">' + str + '</span>';
                        }
                    }
                }
                i++;
            }
            return function_str;
        }
    });
    //选择公式后参数索引标记
    return luckysheetformula;
});