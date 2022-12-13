define([
    '../store',
    '../locale/locale',
    '../utils/util',
    './sheetmanage',
    './resize',
    '../global/refresh',
    './server',
    './postil',
    './imageCtrl'
], function (
    Store, 
    locale, 
    m_util, 
    sheetmanage, 
    m_resize, 
    c, 
    server, 
    luckysheetPostil, 
    imageCtrl
) {
    'use strict';
    let luckysheetZoomTimeout = null;
    function zoomChange(ratio) {
        if (Store.flowdata == null || Store.flowdata.length == 0) {
            return;
        }
        clearTimeout(luckysheetZoomTimeout);
        luckysheetZoomTimeout = setTimeout(() => {
            if (Store.clearjfundo) {
                Store.jfredo.push({
                    'type': 'zoomChange',
                    'zoomRatio': Store.zoomRatio,
                    'curZoomRatio': ratio,
                    'sheetIndex': Store.currentSheetIndex
                });
            }
            Store.zoomRatio = ratio;
            let currentSheet = sheetmanage.getSheetByIndex();
            luckysheetPostil.buildAllPs(currentSheet.data);
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
            server.saveParam('all', Store.currentSheetIndex, Store.zoomRatio, { 'k': 'zoomRatio' });
            server.saveParam('cg', Store.currentSheetIndex, currentSheet.config['sheetViewZoom'], { 'k': 'sheetViewZoom' });
            zoomRefreshView();
        }, 100);
    }
    function zoomRefreshView() {
        c.jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
        m_resize.changeSheetContainerSize();
    }
    function zoomInitial() {
        $('#luckysheet-zoom-minus').click(function () {
            let currentRatio;
            if (Store.zoomRatio == null) {
                currentRatio = Store.zoomRatio = 1;
            } else {
                currentRatio = Math.ceil(Store.zoomRatio * 10) / 10;
            }
            currentRatio = currentRatio - 0.1;
            if (currentRatio == Store.zoomRatio) {
                currentRatio = currentRatio - 0.1;
            }
            if (currentRatio <= 0.1) {
                currentRatio = 0.1;
            }
            zoomChange(currentRatio);
            zoomNumberDomBind(currentRatio);
        });
        $('#luckysheet-zoom-plus').click(function () {
            let currentRatio;
            if (Store.zoomRatio == null) {
                currentRatio = Store.zoomRatio = 1;
            } else {
                currentRatio = Math.floor(Store.zoomRatio * 10) / 10;
            }
            currentRatio = currentRatio + 0.1;
            if (currentRatio == Store.zoomRatio) {
                currentRatio = currentRatio + 0.1;
            }
            if (currentRatio >= 4) {
                currentRatio = 4;
            }
            zoomChange(currentRatio);
            zoomNumberDomBind(currentRatio);
        });
        $('#luckysheet-zoom-slider').mousedown(function (e) {
            let xoffset = $(this).offset().left, pageX = e.pageX;
            let currentRatio = positionToRatio(pageX - xoffset);
            zoomChange(currentRatio);
            zoomNumberDomBind(currentRatio);
        });
        $('#luckysheet-zoom-cursor').mousedown(function (e) {
            let curentX = e.pageX, cursorLeft = parseFloat($('#luckysheet-zoom-cursor').css('left'));
            $('#luckysheet-zoom-cursor').css('transition', 'none');
            $(document).off('mousemove.zoomCursor').on('mousemove.zoomCursor', function (event) {
                let moveX = event.pageX;
                let offsetX = moveX - curentX;
                let pos = cursorLeft + offsetX;
                let currentRatio = positionToRatio(pos);
                if (currentRatio > 4) {
                    currentRatio = 4;
                    pos = 100;
                }
                if (currentRatio < 0.1) {
                    currentRatio = 0.1;
                    pos = 0;
                }
                zoomChange(currentRatio);
                let r = Math.round(currentRatio * 100) + '%';
                $('#luckysheet-zoom-ratioText').html(r);
                $('#luckysheet-zoom-cursor').css('left', pos - 4);
            });
            $(document).off('mouseup.zoomCursor').on('mouseup.zoomCursor', function (event) {
                $(document).off('.zoomCursor');
                $('#luckysheet-zoom-cursor').css('transition', 'all 0.3s');
            });
            e.stopPropagation();
        }).click(function (e) {
            e.stopPropagation();
        });
        $('#luckysheet-zoom-ratioText').click(function () {
            zoomChange(1);
            zoomNumberDomBind(1);
        });
        zoomNumberDomBind(Store.zoomRatio);
    }
    function zoomSlierDown() {
    }
    function positionToRatio(pos) {
        let ratio = 1;
        if (pos < 50) {
            ratio = Math.round((pos * 1.8 / 100 + 0.1) * 100) / 100;
        } else if (pos > 50) {
            ratio = Math.round(((pos - 50) * 6 / 100 + 1) * 100) / 100;
        }
        return ratio;
    }
    function zoomSlierDomBind(ratio) {
        let domPos = 50;
        if (ratio < 1) {
            domPos = Math.round((ratio - 0.1) * 100 / 0.18) / 10;
        } else if (ratio > 1) {
            domPos = Math.round((ratio - 1) * 100 / 0.6) / 10 + 50;
        }
        $('#luckysheet-zoom-cursor').css('left', domPos - 4);
    }
    function zoomNumberDomBind(ratio) {
        let r = Math.round(ratio * 100) + '%';
        $('#luckysheet-zoom-ratioText').html(r);
        zoomSlierDomBind(ratio);
    }
    return {
        zoomChange: zoomChange,
        zoomRefreshView: zoomRefreshView,
        zoomInitial: zoomInitial,
        zoomNumberDomBind: zoomNumberDomBind
    };
});