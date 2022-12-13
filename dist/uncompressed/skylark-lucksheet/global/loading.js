define(function () {
    'use strict';
    function showloading(txt) {
        $('#luckysheet-cell-loading').find('span').text(txt).end().show();
    }
    ;
    function hideloading() {
        $('#luckysheet-cell-loading').hide();
    }
    ;
    return {
        showloading: showloading,
        hideloading: hideloading
    };
});