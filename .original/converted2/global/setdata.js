define([
    '../utils/util',
    './validate',
    './format',
    '../controllers/server',
    '../controllers/luckysheetConfigsetting',
    '../store/index'
], function (util, validate, server, server, luckysheetConfigsetting, Store) {
    'use strict';
    function setcellvalue(r, c, d, v) {
        if (d == null) {
            d = Store.flowdata;
        }
        let cell = d[r][c];
        let vupdate;
        if (util.getObjType(v) == 'object') {
            if (cell == null) {
                cell = v;
            } else {
                if (v.f != null) {
                    cell.f = v.f;
                }
                if (v.spl != null) {
                    cell.spl = v.spl;
                }
                if (v.ct != null) {
                    cell.ct = v.ct;
                }
            }
            if (util.getObjType(v.v) == 'object') {
                vupdate = v.v.v;
            } else {
                vupdate = v.v;
            }
        } else {
            vupdate = v;
        }
        if (validate.isRealNull(vupdate)) {
            if (util.getObjType(cell) == 'object') {
                delete cell.m;
                delete cell.v;
            } else {
                cell = null;
            }
            d[r][c] = cell;
            return;
        }
        if (validate.isRealNull(cell) || (util.getObjType(cell) === 'string' || util.getObjType(cell) === 'number') && cell === v) {
            cell = {};
        }
        if (vupdate.toString().substr(0, 1) == "'") {
            cell.m = vupdate.toString().substr(1);
            cell.ct = {
                'fa': '@',
                't': 's'
            };
            cell.v = vupdate.toString().substr(1);
            cell.qp = 1;
        } else if (cell.qp == 1) {
            cell.m = vupdate.toString();
            cell.ct = {
                'fa': '@',
                't': 's'
            };
            cell.v = vupdate.toString();
        } else if (vupdate.toString().toUpperCase() === 'TRUE') {
            cell.m = 'TRUE';
            cell.ct = {
                'fa': 'General',
                't': 'b'
            };
            cell.v = true;
        } else if (vupdate.toString().toUpperCase() === 'FALSE') {
            cell.m = 'FALSE';
            cell.ct = {
                'fa': 'General',
                't': 'b'
            };
            cell.v = false;
        } else if (validate.valueIsError(vupdate)) {
            cell.m = vupdate.toString();
            if (cell.ct != null) {
                cell.ct.t = 'e';
            } else {
                cell.ct = {
                    'fa': 'General',
                    't': 'e'
                };
            }
            cell.v = vupdate;
        } else {
            if (cell.f != null && validate.isRealNum(vupdate) && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(vupdate)) {
                cell.v = parseFloat(vupdate);
                if (cell.ct == null) {
                    cell.ct = {
                        'fa': 'General',
                        't': 'n'
                    };
                }
                if (cell.v == Infinity || cell.v == -Infinity) {
                    cell.m = cell.v.toString();
                } else {
                    if (cell.v.toString().indexOf('e') > -1) {
                        let len;
                        if (cell.v.toString().split('.').length == 1) {
                            len = 0;
                        } else {
                            len = cell.v.toString().split('.')[1].split('e')[0].length;
                        }
                        if (len > 5) {
                            len = 5;
                        }
                        cell.m = cell.v.toExponential(len).toString();
                    } else {
                        let v_p = Math.round(cell.v * 1000000000) / 1000000000;
                        if (cell.ct == null) {
                            let mask = c.genarate(v_p);
                            cell.m = mask[0].toString();
                        } else {
                            let mask = c.update(cell.ct.fa, v_p);
                            cell.m = mask.toString();
                        }
                    }
                }
            } else if (cell.ct != null && cell.ct.fa == '@') {
                cell.m = vupdate.toString();
                cell.v = vupdate;
            } else if (cell.ct != null && cell.ct.fa != null && cell.ct.fa != 'General') {
                if (validate.isRealNum(vupdate)) {
                    vupdate = parseFloat(vupdate);
                }
                let mask = c.update(cell.ct.fa, vupdate);
                if (mask === vupdate) {
                    mask = c.genarate(vupdate);
                    cell.m = mask[0].toString();
                    cell.ct = mask[1];
                    cell.v = mask[2];
                } else {
                    cell.m = mask.toString();
                    cell.v = vupdate;
                }
            } else {
                if (validate.isRealNum(vupdate) && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(vupdate)) {
                    vupdate = parseFloat(vupdate);
                    cell.v = parseFloat(vupdate);
                    cell.ct = {
                        'fa': 'General',
                        't': 'n'
                    };
                    if (cell.v == Infinity || cell.v == -Infinity) {
                        cell.m = cell.v.toString();
                    } else {
                        let mask = c.genarate(cell.v);
                        cell.m = mask[0].toString();
                    }
                } else {
                    let mask = c.genarate(vupdate);
                    cell.m = mask[0].toString();
                    cell.ct = mask[1];
                    cell.v = mask[2];
                }
            }
        }
        if (!server.allowUpdate && !luckysheetConfigsetting.pointEdit) {
            if (cell.ct != null && /^(w|W)((0?)|(0\.0+))$/.test(cell.ct.fa) == false && cell.ct.t == 'n' && cell.v != null && parseInt(cell.v).toString().length > 4) {
                let autoFormatw = luckysheetConfigsetting.autoFormatw.toString().toUpperCase();
                let accuracy = luckysheetConfigsetting.accuracy;
                let sfmt = setAccuracy(autoFormatw, accuracy);
                if (sfmt != 'General') {
                    cell.ct.fa = sfmt;
                    cell.m = c.update(sfmt, cell.v);
                }
            }
        }
        d[r][c] = cell;
    }
    function setAccuracy(autoFormatw, accuracy) {
        let acc = '0.';
        let fmt;
        if (autoFormatw == 'TRUE') {
            if (accuracy == undefined) {
                return 'w';
            } else {
                let alength = parseInt(accuracy);
                if (alength == 0) {
                    return 'w0';
                } else {
                    acc = 'w0.';
                    for (let i = 0; i < alength; i++) {
                        acc += '0';
                    }
                    fmt = acc;
                }
            }
        } else {
            if (accuracy == undefined) {
                return 'General';
            } else {
                let alength = parseInt(accuracy);
                if (alength == 0) {
                    return '0';
                } else {
                    for (let i = 0; i < alength; i++) {
                        acc += '0';
                    }
                    fmt = acc;
                }
            }
        }
        return fmt.toString();
    }
    return {
        setcellvalue,
        setAccuracy
    };
});