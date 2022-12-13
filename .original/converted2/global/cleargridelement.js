define([
    'skylark-jquery',
    '../controllers/selection',
    '../controllers/menuButton'
], function ($,selection, menuButton) {
    'use strict';
    return function cleargridelement(event) {
        $('#luckysheet-cols-h-hover').hide();
        $('#luckysheet-rightclick-menu').hide();
        $('#luckysheet-cell-selected-boxs .luckysheet-cell-selected').hide();
        $('#luckysheet-cols-h-selected .luckysheet-cols-h-selected').hide();
        $('#luckysheet-rows-h-selected .luckysheet-rows-h-selected').hide();
        $('#luckysheet-cell-selected-focus').hide();
        $('#luckysheet-rows-h-hover').hide();
        $('#luckysheet-selection-copy .luckysheet-selection-copy').hide();
        $('#luckysheet-cols-menu-btn').hide();
        $('#luckysheet-row-count-show, #luckysheet-column-count-show').hide();
        if (!event) {
            selection.clearcopy(event);
        }
        if ($('#luckysheet-dropCell-icon').is(':visible')) {
            if (event) {
                $('#luckysheet-dropCell-icon').remove();
            }
        }
        if (menuButton.luckysheetPaintModelOn && !event) {
            menuButton.cancelPaintModel();
        }
    };
});