define([
    '../methods/alternateformat_methods',
    '../methods/get',
    '../utils/util',
    '../methods/formula_methods',
    '../methods/validate',
    '../widgets/tooltip',
    '../widgets/constant',
    '../widgets/resize',
    '../widgets/select',
    '../store',
    '../locale/locale'
], function (alternateformat_methods,m_get, m_util, formula, m_validate, tooltip,  m_constant, luckysheetsizeauto, m_select, Store, locale) {
    'use strict';
    const {getSheetIndex, getRangetxt} = m_get;
    const {replaceHtml} = m_util;
    const {isEditMode} = m_validate;
    const {luckysheetAlternateformatHtml, modelHTML} = m_constant;
    const {selectHightlightShow} = m_select;
    //交替颜色
    const alternateformat = Object.assign(alternateformat_methods, {
        rangefocus: false,
        modelfocusIndex: null,

        getModelBox: function (hasRowHeader, hasRowFooter) {
            let _this = this;
            $('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelList').empty();
            $('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelCustom').empty();    //格式样式 模板
            //格式样式 模板
            let modelListHtml = '';
            for (let i = 0; i < _this.FixedModelColor.length; i++) {
                let obj = _this.FixedModelColor[i];
                let color1, color2, color3, color4;
                if (hasRowHeader && hasRowFooter) {
                    color1 = obj['head'];
                    color2 = obj['one'];
                    color3 = obj['two'];
                    color4 = obj['foot'];
                } else if (hasRowHeader) {
                    color1 = obj['head'];
                    color2 = obj['one'];
                    color3 = obj['two'];
                    color4 = obj['one'];
                } else if (hasRowFooter) {
                    color1 = obj['one'];
                    color2 = obj['two'];
                    color3 = obj['one'];
                    color4 = obj['foot'];
                } else {
                    color1 = obj['one'];
                    color2 = obj['two'];
                    color3 = obj['one'];
                    color4 = obj['two'];
                }
                modelListHtml += '<div class="modelbox">' + '<div class="box">' + '<span style="color:' + color1['fc'] + ';background-color:' + color1['bc'] + '"> \u2014 </span>' + '<span style="color:' + color2['fc'] + ';background-color:' + color2['bc'] + '"> \u2014 </span>' + '<span style="color:' + color3['fc'] + ';background-color:' + color3['bc'] + '"> \u2014 </span>' + '<span style="color:' + color4['fc'] + ';background-color:' + color4['bc'] + '"> \u2014 </span>' + '</div>' + '</div>';
            }
            $('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelList').append(modelListHtml);    //自定义 模板
            //自定义 模板
            let modelCustom = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['luckysheet_alternateformat_save_modelCustom'];
            if (modelCustom != null && modelCustom.length > 0) {
                let modelCustomHtml = '';
                for (let i = 0; i < modelCustom.length; i++) {
                    let obj = modelCustom[i];
                    let color1, color2, color3, color4;
                    if (hasRowHeader && hasRowFooter) {
                        color1 = obj['head'];
                        color2 = obj['one'];
                        color3 = obj['two'];
                        color4 = obj['foot'];
                    } else if (hasRowHeader) {
                        color1 = obj['head'];
                        color2 = obj['one'];
                        color3 = obj['two'];
                        color4 = obj['one'];
                    } else if (hasRowFooter) {
                        color1 = obj['one'];
                        color2 = obj['two'];
                        color3 = obj['one'];
                        color4 = obj['foot'];
                    } else {
                        color1 = obj['one'];
                        color2 = obj['two'];
                        color3 = obj['one'];
                        color4 = obj['two'];
                    }
                    modelCustomHtml += '<div class="modelbox">' + '<div class="box">' + '<span style="color:' + color1['fc'] + ';background-color:' + color1['bc'] + '"> \u2014 </span>' + '<span style="color:' + color2['fc'] + ';background-color:' + color2['bc'] + '"> \u2014 </span>' + '<span style="color:' + color3['fc'] + ';background-color:' + color3['bc'] + '"> \u2014 </span>' + '<span style="color:' + color4['fc'] + ';background-color:' + color4['bc'] + '"> \u2014 </span>' + '</div>' + '</div>';
                }
                $('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelCustom').append(modelCustomHtml);
            }
        },
        init: function () {
            let _this = this;
            $('#luckysheet-modal-dialog-slider-alternateformat').remove();
            $('body').append(luckysheetAlternateformatHtml());
            luckysheetsizeauto();
            //关闭
            $('#luckysheet-modal-dialog-slider-alternateformat .luckysheet-model-close-btn').click(function () {
                $('#luckysheet-modal-dialog-slider-alternateformat').hide();
                luckysheetsizeauto();
            }); 
            //应用范围
            $(document).off('focus.AFrangeInput').on('focus.AFrangeInput', '#luckysheet-alternateformat-range input', function () {
                _this.rangefocus = true;
            });
            $(document).off('blur.AFrangeInput').on('blur.AFrangeInput', '#luckysheet-alternateformat-range input', function () {
                _this.rangefocus = false;
            });
            $(document).off('keydown.AFrangeInput').on('keydown.AFrangeInput', '#luckysheet-alternateformat-range input', function (e) {
                let rangeValue = $(this).val().trim();
                if (e.keyCode == 13) {
                    _this.update();
                }
            });
            $(document).off('click.AFrangeIcon').on('click.AFrangeIcon', '#luckysheet-alternateformat-range .fa-table', function () {
                $('#luckysheet-modal-dialog-slider-alternateformat').hide();
                luckysheetsizeauto();
                let rangeValue = $(this).parents('#luckysheet-alternateformat-range').find('input').val().trim();
                _this.rangeDialog(rangeValue);
            });
            $(document).off('click.AFrDCf').on('click.AFrDCf', '#luckysheet-alternateformat-rangeDialog-confirm', function () {
                let rangeValue = $(this).parents('#luckysheet-alternateformat-rangeDialog').find('input').val().trim();
                $('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-range input').val(rangeValue);
                $(this).parents('#luckysheet-alternateformat-rangeDialog').hide();
                $('#luckysheet-modal-dialog-slider-alternateformat').show();
                luckysheetsizeauto();
                _this.update();
            });
            $(document).off('click.AFrDCl').on('click.AFrDCl', '#luckysheet-alternateformat-rangeDialog-close', function () {
                $(this).parents('#luckysheet-alternateformat-rangeDialog').hide();
                $('#luckysheet-modal-dialog-slider-alternateformat').show();
                luckysheetsizeauto();
            });
            $(document).off('click.AFrDTitle').on('click.AFrDTitle', '#luckysheet-alternateformat-rangeDialog .luckysheet-modal-dialog-title-close', function () {
                $(this).parents('#luckysheet-alternateformat-rangeDialog').hide();
                $('#luckysheet-modal-dialog-slider-alternateformat').show();
                luckysheetsizeauto();
            });    //页眉、页脚选中
            //页眉、页脚选中
            $(document).off('change.AFrowHeader').on('change.AFrowHeader', '#luckysheet-alternateformat-rowHeader', function () {
                let hasRowHeader;
                if ($(this).is(':checked')) {
                    hasRowHeader = true;
                } else {
                    hasRowHeader = false;
                }
                let hasRowFooter;
                if ($('#luckysheet-alternateformat-rowFooter').is(':checked')) {
                    hasRowFooter = true;
                } else {
                    hasRowFooter = false;
                }
                _this.checkboxChange(hasRowHeader, hasRowFooter);
                _this.modelboxOn();
                _this.update();
            });
            $(document).off('change.AFrowFooter').on('change.AFrowFooter', '#luckysheet-alternateformat-rowFooter', function () {
                let hasRowHeader;
                if ($('#luckysheet-alternateformat-rowHeader').is(':checked')) {
                    hasRowHeader = true;
                } else {
                    hasRowHeader = false;
                }
                let hasRowFooter;
                if ($(this).is(':checked')) {
                    hasRowFooter = true;
                } else {
                    hasRowFooter = false;
                }
                _this.checkboxChange(hasRowHeader, hasRowFooter);
                _this.modelboxOn();
                _this.update();
            });    //点击样式模板
            //点击样式模板
            $(document).off('click.AFmodelbox').on('click.AFmodelbox', '#luckysheet-modal-dialog-slider-alternateformat .modelbox', function () {
                let index = $(this).index();
                let $id = $(this).parents('.cf').attr('id');
                if ($id == 'luckysheet-alternateformat-modelList') {
                    _this.modelfocusIndex = index;
                } else if ($id == 'luckysheet-alternateformat-modelCustom') {
                    let len = _this.FixedModelColor.length;
                    _this.modelfocusIndex = index + len;
                }
                _this.modelboxOn();
                _this.update();
            }); 
            //点击选择文本/单元格颜色
            $(document).off('click.AFselectColor').on('click.AFselectColor', '#luckysheet-modal-dialog-slider-alternateformat .luckysheet-color-menu-button-indicator', function () {
                let $parent = $(this).closest('.toningbox');
                let colorType, currenColor;
                if ($(this).find('.luckysheet-icon-img').hasClass('luckysheet-icon-text-color')) {
                    colorType = 'fc';
                    currenColor = $parent.find('.toningShow').data('fc');
                } else if ($(this).find('.luckysheet-icon-img').hasClass('luckysheet-icon-cell-color')) {
                    colorType = 'bc';
                    currenColor = $parent.find('.toningShow').data('bc');
                }    //source
                //source
                let source;
                if ($parent.hasClass('header')) {
                    source = '0';
                } else if ($parent.hasClass('ctOne')) {
                    source = '1';
                } else if ($parent.hasClass('ctTwo')) {
                    source = '2';
                } else if ($parent.hasClass('footer')) {
                    source = '3';
                }
                _this.colorSelectDialog(currenColor, colorType, source);
            }); 
            //选择颜色 确定 添加自定义模板
            $(document).off('click.AFselectColorConfirm').on('click.AFselectColorConfirm', '#luckysheet-alternateformat-colorSelect-dialog-confirm', function () {
                let $parent = $(this).parents('#luckysheet-alternateformat-colorSelect-dialog');
                const _locale = locale();
                const alternatingColors = _locale.alternatingColors;
                $('#luckysheet-modal-dialog-mask').hide();
                $parent.hide();    //获取currenColor colorType source
                //获取currenColor colorType source
                let currenColor = $parent.find('.currenColor span').attr('title');
                let colorType;
                if ($parent.find('.luckysheet-modal-dialog-title-text').text() == alternatingColors.selectionTextColor) {
                    colorType = 'fc';
                } else if ($parent.find('.luckysheet-modal-dialog-title-text').text() == alternatingColors.selectionCellColor) {
                    colorType = 'bc';
                }
                let source = $parent.find('.currenColor').attr('data-source');    //赋给颜色
                //赋给颜色
                if (source == '0') {
                    if (colorType == 'fc') {
                        $('#luckysheet-alternateformat-modelToning .header .toningShow').css('color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .header .toningShow').data('fc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .header .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                    if (colorType == 'bc') {
                        $('#luckysheet-alternateformat-modelToning .header .toningShow').css('background-color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .header .toningShow').data('bc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .header .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                } else if (source == '1') {
                    if (colorType == 'fc') {
                        $('#luckysheet-alternateformat-modelToning .ctOne .toningShow').css('color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctOne .toningShow').data('fc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                    if (colorType == 'bc') {
                        $('#luckysheet-alternateformat-modelToning .ctOne .toningShow').css('background-color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctOne .toningShow').data('bc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                } else if (source == '2') {
                    if (colorType == 'fc') {
                        $('#luckysheet-alternateformat-modelToning .ctTwo .toningShow').css('color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctTwo .toningShow').data('fc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                    if (colorType == 'bc') {
                        $('#luckysheet-alternateformat-modelToning .ctTwo .toningShow').css('background-color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctTwo .toningShow').data('bc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                } else if (source == '3') {
                    if (colorType == 'fc') {
                        $('#luckysheet-alternateformat-modelToning .footer .toningShow').css('color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .footer .toningShow').data('fc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                    if (colorType == 'bc') {
                        $('#luckysheet-alternateformat-modelToning .footer .toningShow').css('background-color', currenColor);
                        $('#luckysheet-alternateformat-modelToning .footer .toningShow').data('bc', currenColor);
                        $('#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', currenColor);
                    }
                }    //若模板聚焦在固有模板，则新加模板；若模板聚焦在自定义模板，则修改该模板
                //若模板聚焦在固有模板，则新加模板；若模板聚焦在自定义模板，则修改该模板
                let hasRowHeader;
                if ($('#luckysheet-alternateformat-rowHeader').is(':checked')) {
                    hasRowHeader = true;
                } else {
                    hasRowHeader = false;
                }
                let hasRowFooter;
                if ($('#luckysheet-alternateformat-rowFooter').is(':checked')) {
                    hasRowFooter = true;
                } else {
                    hasRowFooter = false;
                }
                let index = _this.modelfocusIndex;
                let len = _this.FixedModelColor.length;
                let format, file;
                if (index < len) {
                    format = $.extend(true, {}, _this.getFormatByIndex());
                } else {
                    file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
                    let modelCustom = file['luckysheet_alternateformat_save_modelCustom'];
                    format = $.extend(true, {}, modelCustom[index - len]);
                }
                if (source == '0') {
                    if (colorType == 'fc') {
                        format['head']['fc'] = currenColor;
                    } else if (colorType == 'bc') {
                        format['head']['bc'] = currenColor;
                    }
                } else if (source == '1') {
                    if (colorType == 'fc') {
                        format['one']['fc'] = currenColor;
                    } else if (colorType == 'bc') {
                        format['one']['bc'] = currenColor;
                    }
                } else if (source == '2') {
                    if (colorType == 'fc') {
                        format['two']['fc'] = currenColor;
                    } else if (colorType == 'bc') {
                        format['two']['bc'] = currenColor;
                    }
                } else if (source == '3') {
                    if (colorType == 'fc') {
                        format['foot']['fc'] = currenColor;
                    }
                    if (colorType == 'bc') {
                        format['foot']['bc'] = currenColor;
                    }
                }
                if (_this.modelfocusIndex < len) {
                    _this.addCustomModel(format);
                    _this.modelfocusIndex = _this.getIndexByFormat(format);
                } else {
                    file['luckysheet_alternateformat_save_modelCustom'][index - len] = format;
                    if (Store.allowUpdate) {
                        Store.saveParam('all', Store.currentSheetIndex, file['luckysheet_alternateformat_save_modelCustom'], { 'k': 'luckysheet_alternateformat_save_modelCustom' });
                    }
                }
                _this.getModelBox(hasRowHeader, hasRowFooter);
                _this.modelboxOn();
                _this.update();
            });    //点击 移除交替颜色 按钮
            //点击 移除交替颜色 按钮
            $(document).off('click.AFremove').on('click.AFremove', '#luckysheet-alternateformat-remove', function () {
                let dataIndex = $(this).data('index');
                let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
                let ruleArr = file['luckysheet_alternateformat_save'];    //保存之前的规则
                //保存之前的规则
                let historyRules = $.extend(true, [], ruleArr);    //保存当前的规则
                //保存当前的规则
                if (ruleArr.length > 1) {
                    ruleArr.splice(dataIndex, 1);
                } else {
                    ruleArr = [];
                }
                let currentRules = $.extend(true, [], ruleArr);    //刷新一次表格
                //刷新一次表格
                _this.ref(historyRules, currentRules);
                if (Store.allowUpdate) {
                    Store.saveParam('all', Store.currentSheetIndex, ruleArr, { 'k': 'luckysheet_alternateformat_save' });
                }    //隐藏一些dom
                //隐藏一些dom
                $('#luckysheet-modal-dialog-mask').hide();
                $('#luckysheet-modal-dialog-slider-alternateformat').hide();
                luckysheetsizeauto();
            });
        },
        perfect: function () {
            let _this = this;
            let range = $.extend(true, {}, Store.luckysheet_select_save[0]);
            let existsIndex = _this.rangeIsExists(range)[1];
            let obj = $.extend(true, {}, Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['luckysheet_alternateformat_save'][existsIndex]);    //应用范围
            //应用范围
            let cellrange = obj['cellrange'];
            $('#luckysheet-alternateformat-range input').val(getRangetxt(Store.currentSheetIndex, {
                'row': cellrange['row'],
                'column': cellrange['column']
            }, Store.currentSheetIndex));
            Store.luckysheet_select_save = [{
                    'row': cellrange['row'],
                    'column': cellrange['column']
                }];
            selectHightlightShow();    //页眉、页脚
            //页眉、页脚
            let hasRowHeader = obj['hasRowHeader'];
            let hasRowFooter = obj['hasRowFooter'];    //模板聚焦
            //模板聚焦
            let format = obj['format'];
            _this.modelfocusIndex = _this.getIndexByFormat(format);
            if (_this.modelfocusIndex == null) {
                _this.addCustomModel(format);
                _this.modelfocusIndex = _this.getIndexByFormat(format);
            }
            _this.checkboxChange(hasRowHeader, hasRowFooter);
            _this.modelboxOn();    //标识 交替颜色的index
            //标识 交替颜色的index
            $('#luckysheet-alternateformat-remove').data('index', existsIndex);
        },
        checkboxChange: function (hasRowHeader, hasRowFooter) {
            if (hasRowHeader) {
                $('#luckysheet-alternateformat-rowHeader').prop('checked', true);
                $('#luckysheet-alternateformat-modelToning .header').show();
            } else {
                $('#luckysheet-alternateformat-rowHeader').removeAttr('checked');
                $('#luckysheet-alternateformat-modelToning .header').hide();
            }
            if (hasRowFooter) {
                $('#luckysheet-alternateformat-rowFooter').prop('checked', true);
                $('#luckysheet-alternateformat-modelToning .footer').show();
            } else {
                $('#luckysheet-alternateformat-rowFooter').removeAttr('checked');
                $('#luckysheet-alternateformat-modelToning .footer').hide();
            }
            this.getModelBox(hasRowHeader, hasRowFooter);
        },
        modelboxOn: function () {
            let _this = this;    //模板 foucs
            //模板 foucs
            $('#luckysheet-modal-dialog-slider-alternateformat .modelbox').removeClass('on');
            let index = _this.modelfocusIndex;
            let len = _this.FixedModelColor.length;
            if (index < len) {
                $('#luckysheet-alternateformat-modelList .modelbox').eq(index).addClass('on');
            } else {
                $('#luckysheet-alternateformat-modelCustom .modelbox').eq(index - len).addClass('on');
            }    //编辑 对应颜色改变
            //编辑 对应颜色改变
            _this.modelToningColor();
        },
        modelToningColor: function () {
            let format = this.getFormatByIndex();    //页眉
            //页眉
            $('#luckysheet-alternateformat-modelToning .header .toningShow').css({
                'color': format['head'].fc,
                'background-color': format['head'].bc
            });
            $('#luckysheet-alternateformat-modelToning .header .toningShow').data('fc', format['head'].fc).data('bc', format['head'].bc);
            $('#luckysheet-alternateformat-modelToning .header .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['head'].fc);
            $('#luckysheet-alternateformat-modelToning .header .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['head'].bc);    //颜色1
            //颜色1
            $('#luckysheet-alternateformat-modelToning .ctOne .toningShow').css({
                'color': format['one'].fc,
                'background-color': format['one'].bc
            });
            $('#luckysheet-alternateformat-modelToning .ctOne .toningShow').data('fc', format['one'].fc).data('bc', format['one'].bc);
            $('#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['one'].fc);
            $('#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['one'].bc);    //颜色2
            //颜色2
            $('#luckysheet-alternateformat-modelToning .ctTwo .toningShow').css({
                'color': format['two'].fc,
                'background-color': format['two'].bc
            });
            $('#luckysheet-alternateformat-modelToning .ctTwo .toningShow').data('fc', format['two'].fc).data('bc', format['two'].bc);
            $('#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['two'].fc);
            $('#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['two'].bc);    //页脚
            //页脚
            $('#luckysheet-alternateformat-modelToning .footer .toningShow').css({
                'color': format['foot'].fc,
                'background-color': format['foot'].bc
            });
            $('#luckysheet-alternateformat-modelToning .footer .toningShow').data('fc', format['foot'].fc).data('bc', format['foot'].bc);
            $('#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-text-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['foot'].fc);
            $('#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-cell-color').parents('.luckysheet-color-menu-button-indicator').css('border-bottom-color', format['foot'].bc);
        },
        addCustomModel: function (format) {
            let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
            if (file['luckysheet_alternateformat_save_modelCustom'] == null) {
                file['luckysheet_alternateformat_save_modelCustom'] = [];
            }
            file['luckysheet_alternateformat_save_modelCustom'].push(format);
            if (Store.allowUpdate) {
                Store.saveParam('all', Store.currentSheetIndex, file['luckysheet_alternateformat_save_modelCustom'], { 'k': 'luckysheet_alternateformat_save_modelCustom' });
            }
        },
        colorSelectDialog: function (currenColor, colorType, source) {
            $('#luckysheet-modal-dialog-mask').show();
            $('#luckysheet-alternateformat-colorSelect-dialog').remove();
            const _locale = locale();
            const alternatingColors = _locale.alternatingColors;
            const locale_button = _locale.button;
            const locale_toolbar = _locale.toolbar;
            let title;
            if (colorType == 'fc') {
                title = alternatingColors.selectionTextColor;
            } else if (colorType == 'bc') {
                title = alternatingColors.selectionCellColor;
            }
            $('body').append(replaceHtml(modelHTML, {
                'id': 'luckysheet-alternateformat-colorSelect-dialog',
                'addclass': 'luckysheet-alternateformat-colorSelect-dialog',
                'title': title,
                'content': "<div class='currenColor' data-source='" + source + "'>" + alternatingColors.currentColor + "\uFF1A<span title='" + currenColor + "' style='background-color:" + currenColor + "'></span></div><div class='colorshowbox'></div>",
                'botton': '<button id="luckysheet-alternateformat-colorSelect-dialog-confirm" class="btn btn-primary">' + locale_button.confirm + '</button><button class="btn btn-default luckysheet-model-close-btn">' + locale_button.cancel + '</button>',
                'style': 'z-index:100003'
            }));
            let $t = $('#luckysheet-alternateformat-colorSelect-dialog').find('.luckysheet-modal-dialog-content').css('min-width', 300).end(), myh = $t.outerHeight(), myw = $t.outerWidth();
            let winw = $(window).width(), winh = $(window).height();
            let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
            $('#luckysheet-alternateformat-colorSelect-dialog').css({
                'left': (winw + scrollLeft - myw) / 2,
                'top': (winh + scrollTop - myh) / 3
            }).show();    //初始化选择颜色插件
            //初始化选择颜色插件
            $('#luckysheet-alternateformat-colorSelect-dialog').find('.colorshowbox').spectrum({
                showPalette: true,
                showPaletteOnly: true,
                preferredFormat: 'hex',
                clickoutFiresChange: false,
                showInitial: true,
                showInput: true,
                flat: true,
                hideAfterPaletteSelect: true,
                showSelectionPalette: true,
                showButtons: false,
                //隐藏选择取消按钮
                maxPaletteSize: 8,
                maxSelectionSize: 8,
                color: currenColor,
                cancelText: locale_button.cancel,
                chooseText: locale_toolbar.confirmColor,
                togglePaletteMoreText: locale_toolbar.customColor,
                togglePaletteLessText: locale_toolbar.collapse,
                togglePaletteOnly: true,
                clearText: locale_toolbar.clearText,
                noColorSelectedText: locale_toolbar.noColorSelectedText,
                localStorageKey: 'spectrum.textcolor' + Store.gridKey,
                palette: [
                    [
                        '#000',
                        '#444',
                        '#666',
                        '#999',
                        '#ccc',
                        '#eee',
                        '#f3f3f3',
                        '#fff'
                    ],
                    [
                        '#f00',
                        '#f90',
                        '#ff0',
                        '#0f0',
                        '#0ff',
                        '#00f',
                        '#90f',
                        '#f0f'
                    ],
                    [
                        '#f4cccc',
                        '#fce5cd',
                        '#fff2cc',
                        '#d9ead3',
                        '#d0e0e3',
                        '#cfe2f3',
                        '#d9d2e9',
                        '#ead1dc'
                    ],
                    [
                        '#ea9999',
                        '#f9cb9c',
                        '#ffe599',
                        '#b6d7a8',
                        '#a2c4c9',
                        '#9fc5e8',
                        '#b4a7d6',
                        '#d5a6bd'
                    ],
                    [
                        '#e06666',
                        '#f6b26b',
                        '#ffd966',
                        '#93c47d',
                        '#76a5af',
                        '#6fa8dc',
                        '#8e7cc3',
                        '#c27ba0'
                    ],
                    [
                        '#c00',
                        '#e69138',
                        '#f1c232',
                        '#6aa84f',
                        '#45818e',
                        '#3d85c6',
                        '#674ea7',
                        '#a64d79'
                    ],
                    [
                        '#900',
                        '#b45f06',
                        '#bf9000',
                        '#38761d',
                        '#134f5c',
                        '#0b5394',
                        '#351c75',
                        '#741b47'
                    ],
                    [
                        '#600',
                        '#783f04',
                        '#7f6000',
                        '#274e13',
                        '#0c343d',
                        '#073763',
                        '#20124d',
                        '#4c1130'
                    ]
                ],
                move: function (color) {
                    if (color != null) {
                        color = color.toHexString();
                    } else {
                        color = '#000';
                    }
                    $('#luckysheet-alternateformat-colorSelect-dialog .currenColor span').css('background-color', color).attr('title', color);
                }
            });
        },
        rangeDialog: function (value) {
            $('#luckysheet-modal-dialog-mask').hide();
            $('#luckysheet-alternateformat-rangeDialog').remove();
            const _locale = locale();
            const alternatingColors = _locale.alternatingColors;
            const locale_button = _locale.button;
            $('body').append(replaceHtml(modelHTML, {
                'id': 'luckysheet-alternateformat-rangeDialog',
                'addclass': 'luckysheet-alternateformat-rangeDialog',
                'title': alternatingColors.selectRange,
                'content': '<input readonly="readonly" placeholder="' + alternatingColors.tipSelectRange + '" value="' + value + '"/>',
                'botton': '<button id="luckysheet-alternateformat-rangeDialog-confirm" class="btn btn-primary">' + locale_button.confirm + '</button><button id="luckysheet-alternateformat-rangeDialog-close" class="btn btn-default">' + locale_button.cancel + '</button>',
                'style': 'z-index:100003'
            }));
            let $t = $('#luckysheet-alternateformat-rangeDialog').find('.luckysheet-modal-dialog-content').css('min-width', 300).end(), myh = $t.outerHeight(), myw = $t.outerWidth();
            let winw = $(window).width(), winh = $(window).height();
            let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
            $('#luckysheet-alternateformat-rangeDialog').css({
                'left': (winw + scrollLeft - myw) / 2,
                'top': (winh + scrollTop - myh) / 3
            }).show();
        },
        rangeIsExists: function (range, index) {
            let _this = this;
            let isExists = false;
            let existsIndex = null;    //获取已有交替颜色所有应用范围
            //获取已有交替颜色所有应用范围
            let AFarr = $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['luckysheet_alternateformat_save']);
            if (index != undefined && index != null) {
                if (AFarr.length > 1) {
                    AFarr.splice(index, 1);
                } else {
                    AFarr = [];
                }
            }
            if (AFarr.length > 0) {
                let arr = [];
                for (let i = 0; i < AFarr.length; i++) {
                    let obj = {
                        'index': i,
                        'map': _this.getRangeMap(AFarr[i]['cellrange']['row'], AFarr[i]['cellrange']['column'])
                    };
                    arr.push(obj);
                }    //获取当前选区
                //获取当前选区
                let rangeMap = _this.getRangeMap(range['row'], range['column']);    //遍历
                //遍历
                for (let x in rangeMap) {
                    if (isExists) {
                        break;
                    }
                    for (let j = 0; j < arr.length; j++) {
                        if (x in arr[j]['map']) {
                            isExists = true;
                            existsIndex = arr[j]['index'];
                            break;
                        }
                    }
                }
            }
            return [
                isExists,
                existsIndex
            ];
        },
        getRangeMap: function (row, column) {
            let map = {};
            let st_r = row[0], ed_r = row[1], st_c = column[0], ed_c = column[1];
            for (let r = st_r; r <= ed_r; r++) {
                for (let c = st_c; c <= ed_c; c++) {
                    map[r + '_' + c] = 0;
                }
            }
            return map;
        },
        getIndexByFormat: function (format) {
            let _this = this;
            let index = null;    //格式样式 模板
            //格式样式 模板
            let modelList = _this.FixedModelColor;
            for (let i = 0; i < modelList.length; i++) {
                let obj = modelList[i];
                if (format['head'].fc == obj['head'].fc && format['head'].bc == obj['head'].bc) {
                    if (format['one'].fc == obj['one'].fc && format['one'].bc == obj['one'].bc) {
                        if (format['two'].fc == obj['two'].fc && format['two'].bc == obj['two'].bc) {
                            if (format['foot'].fc == obj['foot'].fc && format['foot'].bc == obj['foot'].bc) {
                                index = i;
                                break;
                            }
                        }
                    }
                }
            }    //自定义 模板
            //自定义 模板
            let modelCustom = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['luckysheet_alternateformat_save_modelCustom'];
            if (modelCustom != null && modelCustom.length > 0) {
                for (let j = 0; j < modelCustom.length; j++) {
                    let obj = modelCustom[j];
                    if (format['head'].fc == obj['head'].fc && format['head'].bc == obj['head'].bc) {
                        if (format['one'].fc == obj['one'].fc && format['one'].bc == obj['one'].bc) {
                            if (format['two'].fc == obj['two'].fc && format['two'].bc == obj['two'].bc) {
                                if (format['foot'].fc == obj['foot'].fc && format['foot'].bc == obj['foot'].bc) {
                                    index = modelList.length + j;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            return index;
        },
        getFormatByIndex: function () {
            let _this = this;
            let index = _this.modelfocusIndex;
            let len = _this.FixedModelColor.length;
            let format = {};
            if (index < len) {
                format = _this.FixedModelColor[index];
            } else {
                format = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]['luckysheet_alternateformat_save_modelCustom'][index - len];
            }
            return format;
        },
        new: function (cellrange) {
            let _this = this;
            let format = _this.getFormatByIndex();
            let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
            let ruleArr = file['luckysheet_alternateformat_save'];
            if (ruleArr == null) {
                ruleArr = [];
            }    //保存之前的规则
            //保存之前的规则
            let historyRules = $.extend(true, [], ruleArr);    //保存当前的规则
            //保存当前的规则
            let obj = {
                'cellrange': {
                    'row': cellrange['row'],
                    'column': cellrange['column']
                },
                'format': format,
                'hasRowHeader': true,
                'hasRowFooter': false
            };
            ruleArr.push(obj);
            let currentRules = $.extend(true, [], ruleArr);    //刷新一次表格
            //刷新一次表格
            _this.ref(historyRules, currentRules);
            if (Store.allowUpdate) {
                Store.saveParam('all', Store.currentSheetIndex, ruleArr, { 'k': 'luckysheet_alternateformat_save' });
            }
        },
        update: function () {
            let _this = this;
            const _locale = locale();
            const alternatingColors = _locale.alternatingColors;    //获取标识
            //获取标识
            let dataIndex = $('#luckysheet-alternateformat-remove').data('index');    //应用范围
            //应用范围
            let rangeValue = $('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-range input').val().trim();
            if (!formula.iscelldata(rangeValue)) {
                if (isEditMode()) {
                    alert(alternatingColors.errorNoRange);
                } else {
                    tooltip.info(alternatingColors.errorNoRange, '');
                }
                return;
            }
            let cellrange = formula.getcellrange(rangeValue);
            let isExists = _this.rangeIsExists(cellrange, dataIndex)[0];
            if (isExists) {
                if (isEditMode()) {
                    alert(alternatingColors.errorExistColors);
                } else {
                    tooltip.info(alternatingColors.errorExistColors, '');
                }
                return;
            }    //页眉、页脚
            //页眉、页脚
            let hasRowHeader;
            if ($('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-rowHeader').is(':checked')) {
                hasRowHeader = true;
            } else {
                hasRowHeader = false;
            }
            let hasRowFooter;
            if ($('#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-rowFooter').is(':checked')) {
                hasRowFooter = true;
            } else {
                hasRowFooter = false;
            }    //获取选中样式模板的颜色
            //获取选中样式模板的颜色
            let format = _this.getFormatByIndex();
            let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
            let ruleArr = file['luckysheet_alternateformat_save'];
            if (ruleArr == null) {
                ruleArr = [];
            } 
            //保存之前的规则
            let historyRules = $.extend(true, [], ruleArr);    //保存当前的规则
            //保存当前的规则
            let obj = {
                'cellrange': {
                    'row': cellrange['row'],
                    'column': cellrange['column']
                },
                'format': format,
                'hasRowHeader': hasRowHeader,
                'hasRowFooter': hasRowFooter
            };
            ruleArr[dataIndex] = obj;
            let currentRules = $.extend(true, [], ruleArr);    //刷新一次表格
            //刷新一次表格
            _this.ref(historyRules, currentRules);
            if (Store.allowUpdate) {
                Store.saveParam('all', Store.currentSheetIndex, ruleArr, { 'k': 'luckysheet_alternateformat_save' });
            }
        },

        ref: function (historyRules, currentRules) {
            if (Store.clearjfundo) {
                Store.jfundo.length = 0;
                let redo = {};
                redo['type'] = 'updateAF';
                redo['sheetIndex'] = Store.currentSheetIndex;
                redo['data'] = {
                    'historyRules': historyRules,
                    'currentRules': currentRules
                };
                Store.jfredo.push(redo);
            }
            let index = getSheetIndex(Store.currentSheetIndex);
            Store.luckysheetfile[index]['luckysheet_alternateformat_save'] = currentRules;
            ///setTimeout(function () {
            ///    luckysheetrefreshgrid();
            ///}, 1);
            Store.refresh();
        }
    });
    return alternateformat;
});