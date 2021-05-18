define([
    '../store',
    './getdata',
    './validate',
    './format',
    '../locale/locale'
], function (Store, a, b, c, locale) {
    'use strict';
    function countfunc() {
        if (Store.luckysheet_select_save.length == 0) {
            return;
        }
        let min = Infinity, max = -Infinity, sum = 0, count = 0, mean = 0;
        for (let s = 0; s < Store.luckysheet_select_save.length; s++) {
            let data = a.getdatabyselectionNoCopy(Store.luckysheet_select_save[s]);
            for (let r = 0; r < data.length; r++) {
                for (let c = 0; c < data[0].length; c++) {
                    if (b.isRealNull(data[r][c])) {
                        continue;
                    }
                    count++;
                    if (data[r][c].ct != null && data[r][c].ct.t == 'd') {
                        continue;
                    }
                    let value = data[r][c].v;
                    if (!b.isRealNum(value)) {
                        continue;
                    }
                    value = parseFloat(value);
                    sum += value;
                    if (value < min) {
                        min = value;
                    }
                    if (value > max) {
                        max = value;
                    }
                }
            }
        }
        let locale_formula = locale().formula;
        let ret = '';
        ret += '<span>' + locale_formula.count + ':' + count + '</span>';
        if (isFinite(max) || isFinite(min)) {
            ret += '<span>' + locale_formula.sum + ':' + c.update('w', sum) + '</span>';
            ret += '<span>' + locale_formula.average + ':' + c.update('w', Math.round(sum / count * 10000) / 10000) + '</span>';
        }
        if (isFinite(max)) {
            ret += '<span>' + locale_formula.max + ':' + c.update('w', max) + '</span>';
        }
        if (isFinite(min)) {
            ret += '<span>' + locale_formula.min + ':' + c.update('w', min) + '</span>';
        }
        $('#luckysheet-sta-content').html(ret);
    }
    return { countfunc: countfunc };
});