define([
    '../controllers/freezen',
    '../methods/sheetSearch',
    '../store',
    '../methods/luckysheetConfigsetting'
], function (luckysheetFreezen, m_sheetSearch, Store, luckysheetConfigsetting) {
    'use strict';
    const {luckysheet_searcharray} = m_sheetSearch;
    let scrollRequestAnimationFrameIni = true, scrollRequestAnimationFrame = false, scrollTimeOutCancel = null;
    function execScroll() {
        let scrollLeft = $('#luckysheet-scrollbar-x').scrollLeft(), scrollTop = $('#luckysheet-scrollbar-y').scrollTop();
        ///luckysheetrefreshgrid(scrollLeft, scrollTop);
        Store.refresh(scrollLeft,scrollTop)
        scrollRequestAnimationFrame = window.requestAnimationFrame(execScroll);
    } 
    //全局滚动事件
    return function luckysheetscrollevent(isadjust) {
        let $t = $('#luckysheet-cell-main');
        let scrollLeft = $('#luckysheet-scrollbar-x').scrollLeft(), scrollTop = $('#luckysheet-scrollbar-y').scrollTop(), canvasHeight = $('#luckysheetTableContent').height();                                                                             // }
        // canvas高度
        // clearTimeout(scrollTimeOutCancel);
        // scrollTimeOutCancel = setTimeout(() => {
        //     scrollRequestAnimationFrameIni  = true;
        //     window.cancelAnimationFrame(scrollRequestAnimationFrame);
        // }, 500);
        // if (!!isadjust) {
        //     let scrollHeight = $t.get(0).scrollHeight;
        //     let windowHeight = $t.height();
        //     let scrollWidth = $t.get(0).scrollWidth;
        //     let windowWidth = $t.width();
        //     let maxScrollLeft = scrollWidth - windowWidth;
        //     let maxScrollTop = scrollHeight - windowHeight;
        //     let visibledatacolumn_c = Store.visibledatacolumn, visibledatarow_c = Store.visibledatarow;
        //     if (Store.freezenhorizontaldata != null) {
        //         visibledatarow_c = Store.freezenhorizontaldata[3];
        //     }
        //     if (Store.freezenverticaldata != null) {
        //         visibledatacolumn_c = Store.freezenverticaldata[3];
        //     }
        //     let col_ed = luckysheet_searcharray(visibledatacolumn_c, scrollLeft);
        //     let row_ed = luckysheet_searcharray(visibledatarow_c, scrollTop);
        //     let refreshLeft = scrollLeft , refreshTop = scrollTop;
        //     if (col_ed <= 0) {
        //         scrollLeft = 0;
        //     }
        //     else {
        //         scrollLeft = visibledatacolumn_c[col_ed - 1];
        //     }
        //     if (row_ed <= 0) {
        //         scrollTop = 0;
        //     }
        //     else {
        //         scrollTop = visibledatarow_c[row_ed - 1];
        //     }
        // }
        if (Store.freezenhorizontaldata != null) {
            if (scrollTop < Store.freezenhorizontaldata[2]) {
                scrollTop = Store.freezenhorizontaldata[2];
                $('#luckysheet-scrollbar-y').scrollTop(scrollTop);
                return;
            }
        }
        if (Store.freezenverticaldata != null) {
            if (scrollLeft < Store.freezenverticaldata[2]) {
                scrollLeft = Store.freezenverticaldata[2];
                $('#luckysheet-scrollbar-x').scrollLeft(scrollLeft);
                return;
            }
        }
        $('#luckysheet-cols-h-c').scrollLeft(scrollLeft);    //列标题
        //列标题
        $('#luckysheet-rows-h').scrollTop(scrollTop);    //行标题
        //行标题
        $t.scrollLeft(scrollLeft).scrollTop(scrollTop);
        $('#luckysheet-input-box-index').css({
            'left': $('#luckysheet-input-box').css('left'),
            'top': parseInt($('#luckysheet-input-box').css('top')) - 20 + 'px',
            'z-index': $('#luckysheet-input-box').css('z-index')
        }).show();    // if(scrollRequestAnimationFrameIni && Store.scrollRefreshSwitch){
                      //     execScroll();
                      //     scrollRequestAnimationFrameIni = false;
                      // }
        // if(scrollRequestAnimationFrameIni && Store.scrollRefreshSwitch){
        //     execScroll();
        //     scrollRequestAnimationFrameIni = false;
        // }
        ///luckysheetrefreshgrid(scrollLeft, scrollTop);
        Store.refresh(scrollLeft,scrollTop)

        $('#luckysheet-bottom-controll-row').css('left', scrollLeft);    //有选区且有冻结时，滚动适应
        //有选区且有冻结时，滚动适应
        if (Store.freezenhorizontaldata != null || Store.freezenverticaldata != null) {
            luckysheetFreezen.scrollAdapt();
        }
        if (!luckysheetConfigsetting.createHookFunction('scroll', {
                scrollLeft,
                scrollTop,
                canvasHeight
            })) {
            return;
        }
    };
});