define([
    '../controllers/constant',
    '../controllers/menuButton',
    '../global/datecontroll',
    '../global/validate',
    '../store',
    '../locale/locale',
    'numeral'
], function (a, menuButton, b, c, Store, locale, numeral) {
    'use strict';
    function isJsonString(str) {
        try {
            if (typeof JSON.parse(str) == 'object') {
                return true;
            }
        } catch (e) {
        }
        return false;
    }
    function common_extend(jsonbject1, jsonbject2) {
        let resultJsonObject = {};
        for (let attr in jsonbject1) {
            resultJsonObject[attr] = jsonbject1[attr];
        }
        for (let attr in jsonbject2) {
            if (jsonbject2[attr] == undefined) {
                continue;
            }
            resultJsonObject[attr] = jsonbject2[attr];
        }
        return resultJsonObject;
    }
    ;
    function replaceHtml(temp, dataarry) {
        return temp.replace(/\$\{([\w]+)\}/g, function (s1, s2) {
            let s = dataarry[s2];
            if (typeof s != 'undefined') {
                return s;
            } else {
                return s1;
            }
        });
    }
    ;
    function getObjType(obj) {
        let toString = Object.prototype.toString;
        let map = {
            '[object Boolean]': 'boolean',
            '[object Number]': 'number',
            '[object String]': 'string',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Undefined]': 'undefined',
            '[object Null]': 'null',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    }
    function getNowDateTime(format) {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth();
        let date = now.getDate();
        let day = now.getDay();
        let hour = now.getHours();
        let minu = now.getMinutes();
        let sec = now.getSeconds();
        month = month + 1;
        if (month < 10)
            month = '0' + month;
        if (date < 10)
            date = '0' + date;
        if (hour < 10)
            hour = '0' + hour;
        if (minu < 10)
            minu = '0' + minu;
        if (sec < 10)
            sec = '0' + sec;
        let time = '';
        if (format == 1) {
            time = year + '-' + month + '-' + date;
        } else if (format == 2) {
            time = year + '-' + month + '-' + date + ' ' + hour + ':' + minu + ':' + sec;
        }
        return time;
    }
    function hexToRgb(hex) {
        let color = [], rgb = [];
        hex = hex.replace(/#/, '');
        if (hex.length == 3) {
            let tmp = [];
            for (let i = 0; i < 3; i++) {
                tmp.push(hex.charAt(i) + hex.charAt(i));
            }
            hex = tmp.join('');
        }
        for (let i = 0; i < 3; i++) {
            color[i] = '0x' + hex.substr(i + 2, 2);
            rgb.push(parseInt(Number(color[i])));
        }
        return 'rgb(' + rgb.join(',') + ')';
    }
    ;
    function rgbTohex(color) {
        let rgb;
        if (color.indexOf('rgba') > -1) {
            rgb = color.replace('rgba(', '').replace(')', '').split(',');
        } else {
            rgb = color.replace('rgb(', '').replace(')', '').split(',');
        }
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);
        let hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
    }
    ;
    function ABCatNum(a) {
        if (a == null || a.length == 0) {
            return NaN;
        }
        var str = a.toLowerCase().split('');
        var num = 0;
        var al = str.length;
        var getCharNumber = function (charx) {
            return charx.charCodeAt() - 96;
        };
        var numout = 0;
        var charnum = 0;
        for (var i = 0; i < al; i++) {
            charnum = getCharNumber(str[i]);
            numout += charnum * Math.pow(26, al - i - 1);
        }
        ;
        if (numout == 0) {
            return NaN;
        }
        return numout - 1;
    }
    ;
    function chatatABC(n) {
        var orda = 'a'.charCodeAt(0);
        var ordz = 'z'.charCodeAt(0);
        var len = ordz - orda + 1;
        var s = '';
        while (n >= 0) {
            s = String.fromCharCode(n % len + orda) + s;
            n = Math.floor(n / len) - 1;
        }
        return s.toUpperCase();
    }
    ;
    function ceateABC(index) {
        let wordlen = a.columeHeader_word.length;
        if (index < wordlen) {
            return a.columeHeader_word;
        } else {
            let relist = [];
            let i = 2, n = 0;
            while (index < wordlen / (wordlen - 1) * (Math.pow(wordlen, i) - 1)) {
                n = i;
                i++;
            }
            for (let x = 0; x < n; x++) {
                if (x == 0) {
                    relist = relist.concat(a.columeHeader_word);
                } else {
                    relist = relist.concat(createABCdim(x), index);
                }
            }
        }
    }
    ;
    function createABCdim(x, count) {
        let chwl = a.columeHeader_word.length;
        if (x == 1) {
            let ret = [];
            let c = 0, con = true;
            for (let i = 0; i < chwl; i++) {
                let b = a.columeHeader_word[i];
                for (let n = 0; n < chwl; n++) {
                    let bq = b + a.columeHeader_word[n];
                    ret.push(bq);
                    c++;
                    if (c > index) {
                        return ret;
                    }
                }
            }
        } else if (x == 2) {
            let ret = [];
            let c = 0, con = true;
            for (let i = 0; i < chwl; i++) {
                let bb = a.columeHeader_word[i];
                for (let w = 0; w < chwl; w++) {
                    let aa = a.columeHeader_word[w];
                    for (let n = 0; n < chwl; n++) {
                        let bqa = bb + aa + a.columeHeader_word[n];
                        ret.push(bqa);
                        c++;
                        if (c > index) {
                            return ret;
                        }
                    }
                }
            }
        }
    }
    ;
    function getByteLen(val, subLen) {
        if (subLen === 0) {
            return '';
        }
        if (val == null) {
            return 0;
        }
        let len = 0;
        for (let i = 0; i < val.length; i++) {
            let a = val.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            } else {
                len += 1;
            }
            if (c.isRealNum(subLen) && len === ~~subLen) {
                return val.substring(0, i);
            }
        }
        return len;
    }
    ;
    function ArrayUnique(dataArr) {
        let result = [];
        let obj = {};
        if (dataArr.length > 0) {
            for (let i = 0; i < dataArr.length; i++) {
                let item = dataArr[i];
                if (!obj[item]) {
                    result.push(item);
                    obj[item] = 1;
                }
            }
        }
        return result;
    }
    function luckysheetfontformat(format) {
        let fontarray = locale().fontarray;
        if (getObjType(format) == 'object') {
            let font = '';
            if (format.it == '0' || format.it == null) {
                font += 'normal ';
            } else {
                font += 'italic ';
            }
            font += 'normal ';
            if (format.bl == '0' || format.bl == null) {
                font += 'normal ';
            } else {
                font += 'bold ';
            }
            if (!format.fs) {
                font += Store.defaultFontSize + 'pt ';
            } else {
                font += Math.ceil(format.fs) + 'pt ';
            }
            if (!format.ff) {
                font += fontarray[0] + ', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif';
            } else {
                let fontfamily = null;
                let fontjson = locale().fontjson;
                if (b.isdatatypemulti(format.ff)['num']) {
                    fontfamily = fontarray[parseInt(format.ff)];
                } else {
                    fontfamily = format.ff;
                    fontfamily = fontfamily.replace(/"/g, '').replace(/'/g, '');
                    if (fontfamily.indexOf(' ') > -1) {
                        fontfamily = '"' + fontfamily + '"';
                    }
                    if (fontfamily != null && document.fonts && !document.fonts.check('12px ' + fontfamily)) {
                        menuButton.addFontTolist(fontfamily);
                    }
                }
                if (fontfamily == null) {
                    fontfamily = fontarray[0];
                }
                font += fontfamily + ', "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif';
            }
            return font;
        } else {
            return a.luckysheetdefaultFont();
        }
    }
    function showrightclickmenu($menu, x, y) {
        let winH = $(window).height(), winW = $(window).width();
        let menuW = $menu.width(), menuH = $menu.height();
        let top = y, left = x;
        if (x + menuW > winW) {
            left = x - menuW;
        }
        if (y + menuH > winH) {
            top = y - menuH;
        }
        if (top < 0) {
            top = 0;
        }
        $menu.css({
            'top': top,
            'left': left
        }).show();
    }
    function luckysheetactiveCell() {
        if (!!Store.fullscreenmode) {
            setTimeout(function () {
                $('#luckysheet-rich-text-editor').focus().select();
            }, 50);
        }
    }
    function luckysheetContainerFocus() {
        $('#' + Store.container).attr('tabindex', 0).focus();
    }
    function numFormat(num, type) {
        if (num == null || isNaN(parseFloat(num)) || c.hasChinaword(num) || num == -Infinity || num == Infinity) {
            return null;
        }
        let floatlen = 6, ismustfloat = false;
        if (type == null || type == 'auto') {
            if (num < 1) {
                floatlen = 6;
            } else {
                floatlen = 1;
            }
        } else {
            if (b.isdatatype(type) == 'num') {
                floatlen = parseInt(type);
                ismustfloat = true;
            } else {
                floatlen = 6;
            }
        }
        let format = '', value = null;
        for (let i = 0; i < floatlen; i++) {
            format += '0';
        }
        if (!ismustfloat) {
            format = '[' + format + ']';
        }
        if (num >= 1e+21) {
            value = parseFloat(numeral(num).value());
        } else {
            value = parseFloat(numeral(num).format('0.' + format));
        }
        return value;
    }
    function numfloatlen(n) {
        if (n != null && !isNaN(parseFloat(n)) && !c.hasChinaword(n)) {
            let value = numeral(n).value();
            let lens = value.toString().split('.');
            if (lens.length == 1) {
                lens = 0;
            } else {
                lens = lens[1].length;
            }
            return lens;
        } else {
            return null;
        }
    }
    function mouseclickposition($menu, x, y, p) {
        let winH = $(window).height(), winW = $(window).width();
        let menuW = $menu.width(), menuH = $menu.height();
        let top = y, left = x;
        if (p == null) {
            p = 'lefttop';
        }
        if (p == 'lefttop') {
            $menu.css({
                'top': y,
                'left': x
            }).show();
        } else if (p == 'righttop') {
            $menu.css({
                'top': y,
                'left': x - menuW
            }).show();
        } else if (p == 'leftbottom') {
            $menu.css({
                'bottom': winH - y - 12,
                'left': x
            }).show();
        } else if (p == 'rightbottom') {
            $menu.css({
                'bottom': winH - y - 12,
                'left': x - menuW
            }).show();
        }
    }
    function $$(selector, context) {
        context = context || document;
        var elements = context.querySelectorAll(selector);
        return elements.length == 1 ? Array.prototype.slice.call(elements)[0] : Array.prototype.slice.call(elements);
    }
    function seriesLoadScripts(scripts, options, callback) {
        if (typeof scripts !== 'object') {
            var scripts = [scripts];
        }
        var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
        var s = [];
        var last = scripts.length - 1;
        var recursiveLoad = function (i) {
            s[i] = document.createElement('script');
            s[i].setAttribute('type', 'text/javascript');
            s[i].onload = s[i].onreadystatechange = function () {
                if (!0 || this.readyState === 'loaded' || this.readyState === 'complete') {
                    this.onload = this.onreadystatechange = null;
                    this.parentNode.removeChild(this);
                    if (i !== last) {
                        recursiveLoad(i + 1);
                    } else if (typeof callback === 'function') {
                        callback();
                    }
                    ;
                }
            };
            s[i].setAttribute('src', scripts[i]);
            if (typeof options === 'object') {
                for (var attr in options) {
                    s[i].setAttribute(attr, options[attr]);
                }
            }
            HEAD.appendChild(s[i]);
        };
        recursiveLoad(0);
    }
    function parallelLoadScripts(scripts, options, callback) {
        if (typeof scripts !== 'object') {
            var scripts = [scripts];
        }
        var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
        var s = [];
        var loaded = 0;
        for (var i = 0; i < scripts.length; i++) {
            s[i] = document.createElement('script');
            s[i].setAttribute('type', 'text/javascript');
            s[i].onload = s[i].onreadystatechange = function () {
                if (!0 || this.readyState === 'loaded' || this.readyState === 'complete') {
                    loaded++;
                    this.onload = this.onreadystatechange = null;
                    this.parentNode.removeChild(this);
                    if (loaded === scripts.length && typeof callback === 'function')
                        callback();
                }
            };
            s[i].setAttribute('src', scripts[i]);
            if (typeof options === 'object') {
                for (var attr in options) {
                    s[i].setAttribute(attr, options[attr]);
                }
            }
            HEAD.appendChild(s[i]);
        }
    }
    function loadLink(url) {
        var doc = document;
        var link = doc.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', url);
        var heads = doc.getElementsByTagName('head');
        if (heads.length) {
            heads[0].appendChild(link);
        } else {
            doc.documentElement.appendChild(link);
        }
    }
    function loadLinks(urls) {
        if (typeof urls !== 'object') {
            urls = [urls];
        }
        if (urls.length) {
            urls.forEach(url => {
                loadLink(url);
            });
        }
    }
    function transformRangeToAbsolute(txt1) {
        if (txt1 == null || txt1.length == 0) {
            return null;
        }
        let txtArray = txt1.split(',');
        let ret = '';
        for (let i = 0; i < txtArray.length; i++) {
            let txt = txtArray[i];
            let txtSplit = txt.split('!'), sheetName = '', rangeTxt = '';
            if (txtSplit.length > 1) {
                sheetName = txtSplit[0];
                rangeTxt = txtSplit[1];
            } else {
                rangeTxt = txtSplit[0];
            }
            let rangeTxtArray = rangeTxt.split(':');
            let rangeRet = '';
            for (let a = 0; a < rangeTxtArray.length; a++) {
                let t = rangeTxtArray[a];
                let row = t.replace(/[^0-9]/g, '');
                let col = t.replace(/[^A-Za-z]/g, '');
                let rangeTT = '';
                if (col != '') {
                    rangeTT += '$' + col;
                }
                if (row != '') {
                    rangeTT += '$' + row;
                }
                rangeRet += rangeTT + ':';
            }
            rangeRet = rangeRet.substr(0, rangeRet.length - 1);
            ret += sheetName + rangeRet + ',';
        }
        return ret.substr(0, ret.length - 1);
    }
    function openSelfModel(id, isshowMask = true) {
        let $t = $('#' + id).find('.luckysheet-modal-dialog-content').css('min-width', 300).end(), myh = $t.outerHeight(), myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $t.css({
            'left': (winw + scrollLeft - myw) / 2,
            'top': (winh + scrollTop - myh) / 3
        }).show();
        if (isshowMask) {
            $('#luckysheet-modal-dialog-mask').show();
        }
    }
    const createProxy = (data, k, callback) => {
        if (!data.hasOwnProperty(k)) {
            console.info('No %s in data', k);
            return;
        }
        ;
        if (getObjType(data) === 'object') {
            if (getObjType(data[k]) === 'object' || getObjType(data[k]) === 'array') {
                defineObjectReactive(data, k, data[k], callback);
            } else {
                defineBasicReactive(data, k, data[k], callback);
            }
        }
    };
    function defineObjectReactive(obj, key, value, callback) {
        obj[key] = new Proxy(value, {
            set(target, property, val, receiver) {
                setTimeout(() => {
                    callback(target, property, val, receiver);
                }, 0);
                return Reflect.set(target, property, val, receiver);
            }
        });
    }
    function defineBasicReactive(obj, key, value, callback) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            get() {
                return value;
            },
            set(newValue) {
                if (value === newValue)
                    return;
                console.log(`发现 ${ key } 属性 ${ value } -> ${ newValue }`);
                setTimeout(() => {
                    callback(value, newValue);
                }, 0);
                value = newValue;
            }
        });
    }
    function arrayRemoveItem(array, item) {
        array.some((curr, index, arr) => {
            if (curr === item) {
                arr.splice(index, 1);
                return curr === item;
            }
        });
    }
    return {
        isJsonString,
        common_extend,
        replaceHtml,
        getObjType,
        getNowDateTime,
        hexToRgb,
        rgbTohex,
        ABCatNum,
        chatatABC,
        ceateABC,
        createABCdim,
        getByteLen,
        ArrayUnique,
        luckysheetfontformat,
        showrightclickmenu,
        luckysheetactiveCell,
        numFormat,
        numfloatlen,
        mouseclickposition,
        $$,
        seriesLoadScripts,
        parallelLoadScripts,
        loadLinks,
        luckysheetContainerFocus,
        transformRangeToAbsolute,
        openSelfModel,
        createProxy,
        arrayRemoveItem
    };
});