define([
    '../store',
    '../locale/locale',
    '../utils/util'
], function (Store, locale, m_util) {
    'use strict';
    const {replaceHtml} = m_util;
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
            }    // Store.zoomRatio = currentRatio;
            // Store.zoomRatio = currentRatio;
            Store.changeZoom(currentRatio);
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
            }    // Store.zoomRatio = currentRatio;
            // Store.zoomRatio = currentRatio;
            zoomChange(currentRatio);
            zoomNumberDomBind(currentRatio);
        });
        $('#luckysheet-zoom-slider').mousedown(function (e) {
            let xoffset = $(this).offset().left, pageX = e.pageX;
            let currentRatio = positionToRatio(pageX - xoffset);    // Store.zoomRatio = currentRatio;
            // Store.zoomRatio = currentRatio;
            Store.changeZoom(currentRatio);
            zoomNumberDomBind(currentRatio);
        });
        $('#luckysheet-zoom-cursor').mousedown(function (e) {
            let curentX = e.pageX, cursorLeft = parseFloat($('#luckysheet-zoom-cursor').css('left'));
            $('#luckysheet-zoom-cursor').css('transition', 'none');
            $(document).off('mousemove.zoomCursor').on('mousemove.zoomCursor', function (event) {
                let moveX = event.pageX;
                let offsetX = moveX - curentX;    // console.log(moveX, curentX, offsetX);
                                                  // curentX = moveX;
                                                  // let left = parseFloat($("#luckysheet-zoom-cursor").css("left"));
                // console.log(moveX, curentX, offsetX);
                // curentX = moveX;
                // let left = parseFloat($("#luckysheet-zoom-cursor").css("left"));
                let pos = cursorLeft + offsetX;
                let currentRatio = positionToRatio(pos);
                if (currentRatio > 4) {
                    currentRatio = 4;
                    pos = 100;
                }
                if (currentRatio < 0.1) {
                    currentRatio = 0.1;
                    pos = 0;
                }    // Store.zoomRatio = currentRatio;
                // Store.zoomRatio = currentRatio;
                Store.changeZoom(currentRatio);
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
            // Store.zoomRatio = 1;
            Store.changeZoom(1);
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
        zoomInitial: zoomInitial,
        zoomNumberDomBind: zoomNumberDomBind
    };
});