define([
    './luckysheetConfigsetting',
    './freezen',
    '../global/refresh',
    '../store',
    '../locale/locale',
    './sheetmanage',
    '../global/tooltip'
], function (luckysheetConfigsetting, luckysheetFreezen, a, Store, locale, sheetmanage, tooltip) {
    'use strict';
    let gridW = 0, gridH = 0;
    function luckysheetsizeauto(isRefreshCanvas = true) {
        if (!luckysheetConfigsetting.showinfobar) {
            Store.infobarHeight = 0;
            $('#luckysheet_info_detail').hide();
        } else {
            $('#luckysheet_info_detail').show();
            Store.infobarHeight = document.querySelector('#luckysheet_info_detail').offsetHeight;
        }
        if (!!Store.toobarObject && !!Store.toobarObject.toobarElements && Store.toobarObject.toobarElements.length === 0) {
            $('#' + Store.container).find('.luckysheet-wa-editor').hide();
            Store.toolbarHeight = 0;
        } else {
            $('#' + Store.container).find('.luckysheet-wa-editor').show();
            Store.toolbarHeight = document.querySelector('#' + Store.container + ' .luckysheet-wa-editor').offsetHeight;
        }
        customSheetbarConfig();
        customStatisticBarConfig();
        const formulaEle = document.querySelector('#' + Store.container + ' .luckysheet-wa-calculate');
        if (!luckysheetConfigsetting.sheetFormulaBar) {
            formulaEle.style.display = 'none';
            Store.calculatebarHeight = 0;
        } else {
            formulaEle.style.display = 'block';
            Store.calculatebarHeight = formulaEle.offsetHeight;
        }
        $('#' + Store.container).find('.luckysheet-grid-container').css('top', Store.toolbarHeight + Store.infobarHeight + Store.calculatebarHeight);
        gridW = $('#' + Store.container).width();
        if (luckysheetConfigsetting.showConfigWindowResize) {
            if ($('#luckysheet-modal-dialog-slider-pivot').is(':visible')) {
                gridW -= $('#luckysheet-modal-dialog-slider-pivot').outerWidth();
            } else if ($('.chartSetting').is(':visible')) {
                gridW -= $('.chartSetting').outerWidth();
            } else if ($('#luckysheet-modal-dialog-slider-alternateformat').is(':visible')) {
                gridW -= $('#luckysheet-modal-dialog-slider-alternateformat').outerWidth();
            }
            if ($('#luckysheet-modal-dialog-slider-protection').is(':visible')) {
                gridW -= $('#luckysheet-modal-dialog-slider-protection').outerWidth();
            }
        }
        const _locale = locale();
        const locale_toolbar = _locale.toolbar;
        let ismore = false, toolbarW = 0, morebtn = `<div class="luckysheet-toolbar-button luckysheet-inline-block" data-tips="${ locale_toolbar.toolMoreTip }" id="luckysheet-icon-morebtn" role="button" style="user-select: none;"> 
            <div class="luckysheet-toolbar-button-outer-box luckysheet-inline-block" style="user-select: none;"> 
                <div class="luckysheet-toolbar-button-inner-box luckysheet-inline-block" style="user-select: none;">

                    <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                        ${ locale_toolbar.toolMore }
                    </div> 
                    <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige" style="user-select: none;font-size:12px;">
                    </div>

                </div> 
            </div>
         </div>`, morediv = '<div id="luckysheet-icon-morebtn-div" class="luckysheet-wa-editor" style="position:absolute;top:' + (Store.infobarHeight + Store.toolbarHeight + $('#' + Store.container).offset().top + $('body').scrollTop()) + 'px; right:0px;z-index:1003;padding:5.5px;display:none;height:auto;white-space:initial;"></div>';
        if ($('#luckysheet-icon-morebtn-div').length == 0) {
            $('body').append(morediv);
        }
        $('#luckysheet-icon-morebtn-div').hide();
        $('#luckysheet-icon-morebtn-div > div').each(function () {
            const $t = $(this)[0];
            const $container = $('#luckysheet-wa-editor')[0];
            $container.appendChild(document.createTextNode(' '));
            $container.appendChild($t);
        });
        $('#luckysheet-icon-morebtn').remove();
        const toobarWidths = Store.toobarObject.toobarWidths;
        const toobarElements = Store.toobarObject.toobarElements;
        let moreButtonIndex = 0;
        if (toobarWidths == undefined) {
            return;
        }
        for (let index = toobarWidths.length - 1; index >= 0; index--) {
            if (toobarWidths[index] < gridW - 90) {
                moreButtonIndex = index;
                if (moreButtonIndex < toobarWidths.length - 1) {
                    ismore = true;
                }
                break;
            }
        }
        for (let index = moreButtonIndex; index < toobarElements.length; index++) {
            const element = toobarElements[index];
            if (element instanceof Array) {
                for (const ele of element) {
                    $('#luckysheet-icon-morebtn-div').append($(`${ ele }`));
                }
            } else {
                $('#luckysheet-icon-morebtn-div').append($(`${ element }`));
            }
        }
        if (ismore) {
            $('#luckysheet-wa-editor').append(morebtn);
            $('#luckysheet-icon-morebtn').click(function () {
                let right = $(window).width() - $('#luckysheet-icon-morebtn').offset().left - $('#luckysheet-icon-morebtn').width() + $('body').scrollLeft();
                $('#luckysheet-icon-morebtn-div').toggle().css('right', right < 0 ? 0 : right);
                let $txt = $(this).find('.luckysheet-toolbar-menu-button-caption');
                if ($txt.text().indexOf(locale_toolbar.toolMore) > -1) {
                    const toolCloseHTML = `
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                    ${ locale_toolbar.toolClose }
                </div> 
                <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-shangyige" style="user-select: none;font-size:12px;">
                </div>
                `;
                    $(this).find('.luckysheet-toolbar-button-inner-box').html(toolCloseHTML);
                } else {
                    const toolMoreHTML = `
                <div class="luckysheet-toolbar-menu-button-caption luckysheet-inline-block" style="user-select: none;">
                    ${ locale_toolbar.toolMore }
                </div> 
                <div class="luckysheet-toolbar-menu-button-dropdown luckysheet-inline-block iconfont luckysheet-iconfont-xiayige" style="user-select: none;font-size:12px;">
                </div>
                `;
                    $(this).find('.luckysheet-toolbar-button-inner-box').html(toolMoreHTML);
                }
            });
            $('#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-left').off('hover').hover(function () {
                $(this).next('.luckysheet-toolbar-button-split-right').addClass('luckysheet-toolbar-button-split-right-hover');
            }, function () {
                $(this).next('.luckysheet-toolbar-button-split-right').removeClass('luckysheet-toolbar-button-split-right-hover');
            });
            $('#luckysheet-icon-morebtn-div .luckysheet-toolbar-button-split-right').off('hover').hover(function () {
                $(this).prev('.luckysheet-toolbar-button-split-left').addClass('luckysheet-toolbar-button-hover');
            }, function () {
                $(this).prev('.luckysheet-toolbar-button-split-left').removeClass('luckysheet-toolbar-button-hover');
            });
            tooltip.createHoverTip('#luckysheet-icon-morebtn-div', '.luckysheet-toolbar-menu-button, .luckysheet-toolbar-button, .luckysheet-toolbar-combo-button');
        }
        $('#' + Store.container + ' .luckysheet-wa-editor .luckysheet-toolbar-button-split-left').off('hover').hover(function () {
            $(this).next('.luckysheet-toolbar-button-split-right').addClass('luckysheet-toolbar-button-split-right-hover');
        }, function () {
            $(this).next('.luckysheet-toolbar-button-split-right').removeClass('luckysheet-toolbar-button-split-right-hover');
        });
        $('#' + Store.container + ' .luckysheet-wa-editor .luckysheet-toolbar-button-split-right').off('hover').hover(function () {
            $(this).prev('.luckysheet-toolbar-button-split-left').addClass('luckysheet-toolbar-button-hover');
        }, function () {
            $(this).prev('.luckysheet-toolbar-button-split-left').removeClass('luckysheet-toolbar-button-hover');
        });
        gridH = $('#' + Store.container).height();
        $('#' + Store.container).find('.luckysheet').height(gridH - 2).width(gridW - 2);
        changeSheetContainerSize(gridW, gridH);
        if (isRefreshCanvas) {
            a.luckysheetrefreshgrid($('#luckysheet-cell-main').scrollLeft(), $('#luckysheet-cell-main').scrollTop());
        }
        sheetmanage.sheetArrowShowAndHide();
        sheetmanage.sheetBarShowAndHide();
    };
    
    function changeSheetContainerSize(gridW, gridH) {
        if (gridW == null) {
            gridW = $('#' + Store.container).width();
        }
        if (gridH == null) {
            gridH = $('#' + Store.container).height();
        }
        Store.cellmainHeight = gridH - (Store.infobarHeight + Store.toolbarHeight + Store.calculatebarHeight + Store.columnHeaderHeight + Store.sheetBarHeight + Store.statisticBarHeight);
        Store.cellmainWidth = gridW - Store.rowHeaderWidth;
        $('#luckysheet-cols-h-c, #luckysheet-cell-main').width(Store.cellmainWidth);
        $('#luckysheet-cell-main').height(Store.cellmainHeight);
        $('#luckysheet-rows-h').height(Store.cellmainHeight - Store.cellMainSrollBarSize);
        $('#luckysheet-scrollbar-y').height(Store.cellmainHeight + Store.columnHeaderHeight - Store.cellMainSrollBarSize - 3);
        $('#luckysheet-scrollbar-x').height(Store.cellMainSrollBarSize);
        $('#luckysheet-scrollbar-y').width(Store.cellMainSrollBarSize);
        $('#luckysheet-scrollbar-x').width(Store.cellmainWidth).css('left', Store.rowHeaderWidth - 2);
        Store.luckysheetTableContentHW = [
            Store.cellmainWidth + Store.rowHeaderWidth - Store.cellMainSrollBarSize,
            Store.cellmainHeight + Store.columnHeaderHeight - Store.cellMainSrollBarSize
        ];
        $('#luckysheetTableContent, #luckysheetTableContentF').attr({
            width: Math.ceil(Store.luckysheetTableContentHW[0] * Store.devicePixelRatio),
            height: Math.ceil(Store.luckysheetTableContentHW[1] * Store.devicePixelRatio)
        }).css({
            width: Store.luckysheetTableContentHW[0],
            height: Store.luckysheetTableContentHW[1]
        });
        $('#' + Store.container).find('#luckysheet-grid-window-1').css('bottom', Store.sheetBarHeight);
        $('#' + Store.container).find('.luckysheet-grid-window').css('bottom', Store.statisticBarHeight);
        let gridwidth = $('#luckysheet-grid-window-1').width();
        $('#luckysheet-freezebar-horizontal').find('.luckysheet-freezebar-horizontal-handle').css({ 'width': gridwidth - 10 }).end().find('.luckysheet-freezebar-horizontal-drop').css({ 'width': gridwidth - 10 });
        let gridheight = $('#luckysheet-grid-window-1').height();
        $('#luckysheet-freezebar-vertical').find('.luckysheet-freezebar-vertical-handle').css({ 'height': gridheight - 10 }).end().find('.luckysheet-freezebar-vertical-drop').css({ 'height': gridheight - 10 });
        luckysheetFreezen.createAssistCanvas();
    }
    
    function menuToolBarWidth() {
        const showtoolbar = luckysheetConfigsetting.showtoolbar;
        const showtoolbarConfig = luckysheetConfigsetting.showtoolbarConfig;
        const toobarWidths = Store.toobarObject.toobarWidths = [];
        const toobarElements = Store.toobarObject.toobarElements = [];
        const toobarConfig = Store.toobarObject.toobarConfig = {
            undo: {
                ele: '#luckysheet-icon-undo',
                index: 0
            },
            redo: {
                ele: '#luckysheet-icon-redo',
                index: 1
            },
            paintFormat: {
                ele: [
                    '#luckysheet-icon-paintformat',
                    '#toolbar-separator-paint-format'
                ],
                index: 2
            },
            currencyFormat: {
                ele: '#luckysheet-icon-currency',
                index: 3
            },
            percentageFormat: {
                ele: '#luckysheet-icon-percent',
                index: 4
            },
            numberDecrease: {
                ele: '#luckysheet-icon-fmt-decimal-decrease',
                index: 5
            },
            numberIncrease: {
                ele: '#luckysheet-icon-fmt-decimal-increase',
                index: 6
            },
            moreFormats: {
                ele: [
                    '#luckysheet-icon-fmt-other',
                    '#toolbar-separator-more-format'
                ],
                index: 7
            },
            font: {
                ele: [
                    '#luckysheet-icon-font-family',
                    '#toolbar-separator-font-family'
                ],
                index: 8
            },
            fontSize: {
                ele: [
                    '#luckysheet-icon-font-size',
                    '#toolbar-separator-font-size'
                ],
                index: 9
            },
            bold: {
                ele: '#luckysheet-icon-bold',
                index: 10
            },
            italic: {
                ele: '#luckysheet-icon-italic',
                index: 11
            },
            strikethrough: {
                ele: '#luckysheet-icon-strikethrough',
                index: 12
            },
            underline: {
                ele: '#luckysheet-icon-underline',
                index: 13
            },
            textColor: {
                ele: [
                    '#luckysheet-icon-text-color',
                    '#luckysheet-icon-text-color-menu',
                    '#toolbar-separator-text-color'
                ],
                index: 14
            },
            fillColor: {
                ele: [
                    '#luckysheet-icon-cell-color',
                    '#luckysheet-icon-cell-color-menu'
                ],
                index: 15
            },
            border: {
                ele: [
                    '#luckysheet-icon-border-all',
                    '#luckysheet-icon-border-menu'
                ],
                index: 16
            },
            mergeCell: {
                ele: [
                    '#luckysheet-icon-merge-button',
                    '#luckysheet-icon-merge-menu',
                    '#toolbar-separator-merge-cell'
                ],
                index: 17
            },
            horizontalAlignMode: {
                ele: [
                    '#luckysheet-icon-align',
                    '#luckysheet-icon-align-menu'
                ],
                index: 18
            },
            verticalAlignMode: {
                ele: [
                    '#luckysheet-icon-valign',
                    '#luckysheet-icon-valign-menu'
                ],
                index: 19
            },
            textWrapMode: {
                ele: [
                    '#luckysheet-icon-textwrap',
                    '#luckysheet-icon-textwrap-menu'
                ],
                index: 20
            },
            textRotateMode: {
                ele: [
                    '#luckysheet-icon-rotation',
                    '#luckysheet-icon-rotation-menu',
                    '#toolbar-separator-text-rotate'
                ],
                index: 21
            },
            image: {
                ele: '#luckysheet-insertImg-btn-title',
                index: 22
            },
            link: {
                ele: '#luckysheet-insertLink-btn-title',
                index: 23
            },
            chart: {
                ele: '#luckysheet-chart-btn-title',
                index: 24
            },
            postil: {
                ele: '#luckysheet-icon-postil',
                index: 25
            },
            pivotTable: {
                ele: [
                    '#luckysheet-pivot-btn-title',
                    '#toolbar-separator-pivot-table'
                ],
                index: 26
            },
            function: {
                ele: [
                    '#luckysheet-icon-function',
                    '#luckysheet-icon-function-menu'
                ],
                index: 27
            },
            frozenMode: {
                ele: [
                    '#luckysheet-freezen-btn-horizontal',
                    '#luckysheet-icon-freezen-menu'
                ],
                index: 28
            },
            sortAndFilter: {
                ele: '#luckysheet-icon-autofilter',
                index: 29
            },
            conditionalFormat: {
                ele: '#luckysheet-icon-conditionformat',
                index: 30
            },
            dataVerification: {
                ele: '#luckysheet-dataVerification-btn-title',
                index: 31
            },
            splitColumn: {
                ele: '#luckysheet-splitColumn-btn-title',
                index: 32
            },
            screenshot: {
                ele: '#luckysheet-chart-btn-screenshot',
                index: 33
            },
            findAndReplace: {
                ele: '#luckysheet-icon-seachmore',
                index: 34
            },
            protection: {
                ele: '#luckysheet-icon-protection',
                index: 35
            },
            print: {
                ele: '#luckysheet-icon-print',
                index: 36
            }
        };
        const config = {
            undo: true,
            redo: true,
            paintFormat: true,
            currencyFormat: true,
            percentageFormat: true,
            numberDecrease: true,
            numberIncrease: true,
            moreFormats: true,
            font: true,
            fontSize: true,
            bold: true,
            italic: true,
            strikethrough: true,
            underline: true,
            textColor: true,
            fillColor: true,
            border: true,
            mergeCell: true,
            horizontalAlignMode: true,
            verticalAlignMode: true,
            textWrapMode: true,
            textRotateMode: true,
            image: true,
            link: true,
            chart: true,
            postil: true,
            pivotTable: true,
            function: true,
            frozenMode: true,
            sortAndFilter: true,
            conditionalFormat: true,
            dataVerification: true,
            splitColumn: true,
            screenshot: true,
            findAndReplace: true,
            protection: true,
            print: true
        };
        if (!showtoolbar) {
            for (let s in config) {
                config[s] = false;
            }
        }
        if (JSON.stringify(showtoolbarConfig) !== '{}') {
            if (showtoolbarConfig.hasOwnProperty('undoRedo')) {
                config.undo = config.redo = showtoolbarConfig.undoRedo;
                delete showtoolbarConfig.undoRedo;
            }
            Object.assign(config, showtoolbarConfig);
        }
        for (let s in config) {
            if (config[s]) {
                toobarElements.push($.extend(true, {}, toobarConfig[s]));
            } else {
                if (toobarConfig[s].ele instanceof Array) {
                    for (const item of toobarConfig[s].ele) {
                        $(item).remove();
                    }
                } else {
                    $(toobarConfig[s].ele).remove();
                }
            }
        }
        toobarElements.sort(sortToolbar);
        function sortToolbar(a, b) {
            if (a.index > b.index) {
                return 1;
            } else {
                return -1;
            }
        }
        toobarElements.forEach((curr, index, arr) => {
            arr[index] = curr.ele;
            if (index !== toobarElements.length - 1) {
                if (curr.ele instanceof Array) {
                    toobarWidths.push($(curr.ele[0]).offset().left);
                } else {
                    toobarWidths.push($(curr.ele).offset().left);
                }
            } else {
                if (curr.ele instanceof Array) {
                    toobarWidths.push($(curr.ele[0]).offset().left);
                    toobarWidths.push($(curr.ele[0]).offset().left + $(curr.ele[0]).outerWidth() + 5);
                } else {
                    toobarWidths.push($(curr.ele).offset().left);
                    toobarWidths.push($(curr.ele).offset().left + $(curr.ele).outerWidth() + 5);
                }
            }
        });
    }
    function customSheetbarConfig() {
        if (!luckysheetConfigsetting.initShowsheetbarConfig) {
            luckysheetConfigsetting.initShowsheetbarConfig = true;
            const config = {
                add: true,
                menu: true,
                sheet: true
            };
            if (!luckysheetConfigsetting.showsheetbar) {
                for (let s in config) {
                    config[s] = false;
                }
            }
            if (JSON.stringify(luckysheetConfigsetting.showsheetbarConfig) !== '{}') {
                Object.assign(config, luckysheetConfigsetting.showsheetbarConfig);
            }
            luckysheetConfigsetting.showsheetbarConfig = config;
        }
        const config = luckysheetConfigsetting.showsheetbarConfig;
        let isHide = 0;
        for (let s in config) {
            if (!config[s]) {
                switch (s) {
                case 'add':
                    $('#luckysheet-sheets-add').hide();
                    isHide++;
                    break;
                case 'menu':
                    $('#luckysheet-sheets-m').hide();
                    isHide++;
                    break;
                case 'sheet':
                    $('#luckysheet-sheet-container').hide();
                    $('#luckysheet-sheets-leftscroll').hide();
                    $('#luckysheet-sheets-rightscroll').hide();
                    isHide++;
                    break;
                default:
                    break;
                }
            }
        }
        if (isHide === 3) {
            $('#' + Store.container).find('#luckysheet-sheet-area').hide();
            Store.sheetBarHeight = 0;
        } else {
            $('#' + Store.container).find('#luckysheet-sheet-area').show();
            Store.sheetBarHeight = 31;
        }
    }
    function customStatisticBarConfig() {
        if (!luckysheetConfigsetting.initStatisticBarConfig) {
            luckysheetConfigsetting.initStatisticBarConfig = true;
            const config = {
                count: true,
                view: true,
                zoom: true
            };
            if (!luckysheetConfigsetting.showstatisticBar) {
                for (let s in config) {
                    config[s] = false;
                }
            }
            if (JSON.stringify(luckysheetConfigsetting.showstatisticBarConfig) !== '{}') {
                Object.assign(config, luckysheetConfigsetting.showstatisticBarConfig);
            }
            luckysheetConfigsetting.showstatisticBarConfig = config;
        }
        const config = luckysheetConfigsetting.showstatisticBarConfig;
        let isHide = 0;
        for (let s in config) {
            if (!config[s]) {
                switch (s) {
                case 'count':
                    $('#luckysheet-sta-content').hide();
                    isHide++;
                    break;
                case 'view':
                    $('.luckysheet-print-viewList').hide();
                    isHide++;
                    break;
                case 'zoom':
                    $('#luckysheet-zoom-content').hide();
                    isHide++;
                    break;
                default:
                    break;
                }
            }
        }
        if (isHide === 3) {
            $('#' + Store.container).find('.luckysheet-stat-area').hide();
            Store.statisticBarHeight = 0;
        } else {
            $('#' + Store.container).find('.luckysheet-stat-area').show();
            Store.statisticBarHeight = 23;
        }
    }

    return {
        luckysheetsizeauto,
        changeSheetContainerSize,
        menuToolBarWidth
    }
});