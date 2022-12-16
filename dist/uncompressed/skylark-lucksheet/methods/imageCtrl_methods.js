define([
    '../methods/get',
    '../utils/util',
    '../store',
    '../locale/locale'
], function (m_get, m_util, Store, locale) {
    'use strict';
    const {getSheetIndex} = m_get;
    const {replaceHtml} = m_util;
    const imageCtrl = {
        imgItem: {
            type: '3',
            //1移动并调整单元格大小 2移动并且不调整单元格的大小 3不要移动单元格并调整其大小
            src: '',
            //图片url
            originWidth: null,
            //图片原始宽度
            originHeight: null,
            //图片原始高度
            default: {
                width: null,
                //图片 宽度
                height: null,
                //图片 高度
                left: null,
                //图片离表格左边的 位置
                top: null
            },
            //图片离表格顶部的 位置
            crop: {
                width: null,
                //图片裁剪后 宽度
                height: null,
                //图片裁剪后 高度
                offsetLeft: 0,
                //图片裁剪后离未裁剪时 左边的位移
                offsetTop: 0
            },
            //图片裁剪后离未裁剪时 顶部的位移
            isFixedPos: false,
            //固定位置
            fixedLeft: null,
            //固定位置 左位移
            fixedTop: null,
            //固定位置 右位移
            border: {
                width: 0,
                //边框宽度
                radius: 0,
                //边框半径
                style: 'solid',
                //边框类型
                color: '#000'
            }
        },
        //边框颜色
        images: null,
        currentImgId: null,
        currentWinW: null,
        currentWinH: null,
        resize: null,
        resizeXY: null,
        move: false,
        moveXY: null,
        cropChange: null,
        cropChangeXY: null,
        cropChangeObj: null,
        copyImgItemObj: null,
        inserImg: function (src) {
            let _this = this;
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let rowIndex = last.row_focus || 0;
            let colIndex = last.column_focus || 0;
            let left = colIndex == 0 ? 0 : Store.visibledatacolumn[colIndex - 1];
            let top = rowIndex == 0 ? 0 : Store.visibledatarow[rowIndex - 1];
            let image = new Image();
            image.onload = function () {
                let width = image.width, height = image.height;
                let img = {
                    src: src,
                    left: left,
                    top: top,
                    originWidth: width,
                    originHeight: height
                };
                _this.addImgItem(img);
            };
            image.src = src;
        },
        generateRandomId: function (prefix) {
            if (prefix == null) {
                prefix = 'img';
            }
            let userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, '').split('');
            let mid = '';
            for (let i = 0; i < 12; i++) {
                mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))];
            }
            let time = new Date().getTime();
            return prefix + '_' + mid + '_' + time;
        },

        getImgItemParam(imgItem) {
            let isFixedPos = imgItem.isFixedPos;
            let width = imgItem.default.width, height = imgItem.default.height, left = imgItem.default.left, top = imgItem.default.top;
            if (imgItem.crop.width != width || imgItem.crop.height != height) {
                width = imgItem.crop.width;
                height = imgItem.crop.height;
                left += imgItem.crop.offsetLeft;
                top += imgItem.crop.offsetTop;
            }
            let position = 'absolute';
            if (isFixedPos) {
                position = 'fixed';
                left = imgItem.fixedLeft + imgItem.crop.offsetLeft;
                top = imgItem.fixedTop + imgItem.crop.offsetTop;
            }
            return {
                width: width,
                height: height,
                left: left,
                top: top,
                position: position
            };
        },

        moveChangeSize: function (rc, index, size) {
            let _this = this;
            let images = $.extend(true, {}, _this.images);
            if (rc == 'row') {
                let row = Store.visibledatarow[index], row_pre = index - 1 == -1 ? 0 : Store.visibledatarow[index - 1];
                let changeSize = size - (row - row_pre - 1);
                for (let imgId in images) {
                    let imgItem = images[imgId];
                    let imgItemParam = _this.getImgItemParam(imgItem);
                    let type = imgItem.type;
                    if (type == '1') {
                        if (imgItemParam.top >= row) {
                            imgItem.default.top = imgItemParam.top + changeSize - imgItem.crop.offsetTop;
                        } else {
                            if (imgItemParam.top + imgItemParam.height >= row - 2) {
                                if (imgItemParam.top < row + changeSize) {
                                    let scaleY = (imgItemParam.height + changeSize) / imgItemParam.height;
                                    imgItem.default.height = Math.round(imgItem.default.height * scaleY);
                                    imgItem.crop.height = Math.round(imgItem.crop.height * scaleY);
                                    imgItem.crop.offsetTop = Math.round(imgItem.crop.offsetTop * scaleY);
                                } else {
                                    let scaleY = (imgItemParam.top + imgItemParam.height - row) / imgItemParam.height;
                                    imgItem.default.height = Math.round(imgItem.default.height * scaleY);
                                    imgItem.crop.height = Math.round(imgItem.crop.height * scaleY);
                                    imgItem.crop.offsetTop = Math.round(imgItem.crop.offsetTop * scaleY);
                                    imgItem.default.top = row + changeSize - imgItem.crop.offsetTop;
                                }
                            } else {
                                if (imgItemParam.top > row + changeSize) {
                                    let scaleY = 1 / imgItemParam.height;
                                    imgItem.default.height = Math.round(imgItem.default.height * scaleY);
                                    imgItem.crop.height = Math.round(imgItem.crop.height * scaleY);
                                    imgItem.crop.offsetTop = Math.round(imgItem.crop.offsetTop * scaleY);
                                    imgItem.default.top = row + changeSize - imgItem.crop.offsetTop;
                                } else if (imgItemParam.top + imgItemParam.height > row + changeSize) {
                                    let scaleY = (row + changeSize - imgItemParam.top) / imgItemParam.height;
                                    imgItem.default.height = Math.round(imgItem.default.height * scaleY);
                                    imgItem.crop.height = Math.round(imgItem.crop.height * scaleY);
                                    imgItem.crop.offsetTop = Math.round(imgItem.crop.offsetTop * scaleY);
                                }
                            }
                        }
                    } else if (type == '2') {
                        if (imgItemParam.top >= row) {
                            imgItem.default.top = imgItemParam.top + changeSize - imgItem.crop.offsetTop;
                        } else if (imgItemParam.top > row + changeSize) {
                            imgItem.default.top = row + changeSize - imgItem.crop.offsetTop;
                        }
                    }
                }
            } else if (rc == 'column') {
                let col = Store.visibledatacolumn[index], col_pre = index - 1 == -1 ? 0 : Store.visibledatacolumn[index - 1];
                let changeSize = size - (col - col_pre - 1);
                for (let imgId in images) {
                    let imgItem = images[imgId];
                    let imgItemParam = _this.getImgItemParam(imgItem);
                    let type = imgItem.type;
                    if (type == '1') {
                        if (imgItemParam.left >= col) {
                            imgItem.default.left = imgItemParam.left + changeSize - imgItem.crop.offsetLeft;
                        } else {
                            if (imgItemParam.left + imgItemParam.width >= col - 2) {
                                if (imgItemParam.left < col + changeSize) {
                                    let scaleX = (imgItemParam.width + changeSize) / imgItemParam.width;
                                    imgItem.default.width = Math.round(imgItem.default.width * scaleX);
                                    imgItem.crop.width = Math.round(imgItem.crop.width * scaleX);
                                    imgItem.crop.offsetLeft = Math.round(imgItem.crop.offsetLeft * scaleX);
                                } else {
                                    let scaleX = (imgItemParam.left + imgItemParam.width - col) / imgItemParam.width;
                                    imgItem.default.width = Math.round(imgItem.default.width * scaleX);
                                    imgItem.crop.width = Math.round(imgItem.crop.width * scaleX);
                                    imgItem.crop.offsetLeft = Math.round(imgItem.crop.offsetLeft * scaleX);
                                    imgItem.default.left = col + changeSize - imgItem.crop.offsetLeft;
                                }
                            } else {
                                if (imgItemParam.left > col + changeSize) {
                                    let scaleX = 1 / imgItemParam.width;
                                    imgItem.default.width = Math.round(imgItem.default.width * scaleX);
                                    imgItem.crop.width = Math.round(imgItem.crop.width * scaleX);
                                    imgItem.crop.offsetLeft = Math.round(imgItem.crop.offsetLeft * scaleX);
                                    imgItem.default.left = col + changeSize - imgItem.crop.offsetLeft;
                                } else if (imgItemParam.left + imgItemParam.width > col + changeSize) {
                                    let scaleX = (col + changeSize - imgItemParam.left) / imgItemParam.width;
                                    imgItem.default.width = Math.round(imgItem.default.width * scaleX);
                                    imgItem.crop.width = Math.round(imgItem.crop.width * scaleX);
                                    imgItem.crop.offsetLeft = Math.round(imgItem.crop.offsetLeft * scaleX);
                                }
                            }
                        }
                    } else if (type == '2') {
                        if (imgItemParam.left >= col) {
                            imgItem.default.left = imgItemParam.left + changeSize - imgItem.crop.offsetLeft;
                        } else if (imgItemParam.left > col + changeSize) {
                            imgItem.default.left = col + changeSize - imgItem.crop.offsetLeft;
                        }
                    }
                }
            }
            return images;
        },
        ref: function () {
            let _this = this;
            let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
            let images = _this.images;
            if (Store.clearjfundo) {
                Store.jfundo.length = 0;
                Store.jfredo.push({
                    'type': 'imageCtrl',
                    'sheetIndex': Store.currentSheetIndex,
                    'images': file.images == null ? null : $.extend(true, {}, file.images),
                    'curImages': images
                });
            }
            file.images = $.extend(true, {}, images);
            Store.saveParam('all', Store.currentSheetIndex, file.images, { 'k': 'images' });
        }
    };
    return imageCtrl;
});