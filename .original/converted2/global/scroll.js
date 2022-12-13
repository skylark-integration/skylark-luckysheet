define([
    '../controllers/freezen',
    '../controllers/sheetSearch',
    '../global/refresh',
    '../store',
    '../global/method'
], function (luckysheetFreezen, a, b, Store, method) {
    'use strict';
    let scrollRequestAnimationFrameIni = true, scrollRequestAnimationFrame = false, scrollTimeOutCancel = null;
    function execScroll() {
        let scrollLeft = $('#luckysheet-scrollbar-x').scrollLeft(), scrollTop = $('#luckysheet-scrollbar-y').scrollTop();
        b.luckysheetrefreshgrid(scrollLeft, scrollTop);
        scrollRequestAnimationFrame = window.requestAnimationFrame(execScroll);
    }
    return function luckysheetscrollevent(isadjust) {
        let $t = $('#luckysheet-cell-main');
        let scrollLeft = $('#luckysheet-scrollbar-x').scrollLeft(), scrollTop = $('#luckysheet-scrollbar-y').scrollTop(), canvasHeight = $('#luckysheetTableContent').height();
        if (luckysheetFreezen.freezenhorizontaldata != null) {
            if (scrollTop < luckysheetFreezen.freezenhorizontaldata[2]) {
                scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
                $('#luckysheet-scrollbar-y').scrollTop(scrollTop);
                return;
            }
        }
        if (luckysheetFreezen.freezenverticaldata != null) {
            if (scrollLeft < luckysheetFreezen.freezenverticaldata[2]) {
                scrollLeft = luckysheetFreezen.freezenverticaldata[2];
                $('#luckysheet-scrollbar-x').scrollLeft(scrollLeft);
                return;
            }
        }
        $('#luckysheet-cols-h-c').scrollLeft(scrollLeft);
        $('#luckysheet-rows-h').scrollTop(scrollTop);
        $t.scrollLeft(scrollLeft).scrollTop(scrollTop);
        $('#luckysheet-input-box-index').css({
            'left': $('#luckysheet-input-box').css('left'),
            'top': parseInt($('#luckysheet-input-box').css('top')) - 20 + 'px',
            'z-index': $('#luckysheet-input-box').css('z-index')
        }).show();
        b.luckysheetrefreshgrid(scrollLeft, scrollTop);
        $('#luckysheet-bottom-controll-row').css('left', scrollLeft);
        if (luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null) {
            luckysheetFreezen.scrollAdapt();
        }
        if (!method.createHookFunction('scroll', {
                scrollLeft,
                scrollTop,
                canvasHeight
            })) {
            return;
        }
    };
});