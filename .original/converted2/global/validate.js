define([
    '../controllers/luckysheetConfigsetting',
    '../store'
], function (luckysheetConfigsetting, Store) {
    'use strict';
    const error = {
        v: '#VALUE!',
        n: '#NAME?',
        na: '#N/A',
        r: '#REF!',
        d: '#DIV/0!',
        nm: '#NUM!',
        nl: '#NULL!',
        sp: '#SPILL!'
    };
    function isRealNull(val) {
        if (val == null || val.toString().replace(/\s/g, '') == '') {
            return true;
        } else {
            return false;
        }
    }
    function isRealNum(val) {
        if (val == null || val.toString().replace(/\s/g, '') === '') {
            return false;
        }
        if (typeof val == 'boolean') {
            return false;
        }
        if (!isNaN(val)) {
            return true;
        } else {
            return false;
        }
    }
    function valueIsError(value) {
        let isError = false;
        for (let x in error) {
            if (value == error[x]) {
                isError = true;
                break;
            }
        }
        return isError;
    }
    function hasChinaword(s) {
        let patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
        if (!patrn.exec(s)) {
            return false;
        } else {
            return true;
        }
    }
    function isEditMode() {
        if (luckysheetConfigsetting.editMode) {
            return true;
        } else {
            return false;
        }
    }
    function hasPartMC(cfg, r1, r2, c1, c2) {
        let hasPartMC = false;
        for (let x in Store.config['merge']) {
            let mc = cfg['merge'][x];
            if (r1 < mc.r) {
                if (r2 >= mc.r && r2 < mc.r + mc.rs - 1) {
                    if (c1 >= mc.c && c1 <= mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c2 >= mc.c && c2 <= mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 < mc.c && c2 > mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    }
                } else if (r2 >= mc.r && r2 == mc.r + mc.rs - 1) {
                    if (c1 > mc.c && c1 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c2 > mc.c && c2 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 == mc.c && c2 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 > mc.c && c2 == mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    }
                } else if (r2 > mc.r + mc.rs - 1) {
                    if (c1 > mc.c && c1 <= mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c2 >= mc.c && c2 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 == mc.c && c2 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 > mc.c && c2 == mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    }
                }
            } else if (r1 == mc.r) {
                if (r2 < mc.r + mc.rs - 1) {
                    if (c1 >= mc.c && c1 <= mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c2 >= mc.c && c2 <= mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 < mc.c && c2 > mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    }
                } else if (r2 >= mc.r + mc.rs - 1) {
                    if (c1 > mc.c && c1 <= mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c2 >= mc.c && c2 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 == mc.c && c2 < mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    } else if (c1 > mc.c && c2 == mc.c + mc.cs - 1) {
                        hasPartMC = true;
                        break;
                    }
                }
            } else if (r1 <= mc.r + mc.rs - 1) {
                if (c1 >= mc.c && c1 <= mc.c + mc.cs - 1) {
                    hasPartMC = true;
                    break;
                } else if (c2 >= mc.c && c2 <= mc.c + mc.cs - 1) {
                    hasPartMC = true;
                    break;
                } else if (c1 < mc.c && c2 > mc.c + mc.cs - 1) {
                    hasPartMC = true;
                    break;
                }
            }
        }
        return hasPartMC;
    }
    function checkWordByteLength(value) {
        return Math.ceil(value.charCodeAt().toString(2).length / 8);
    }
    return {
        error: error,
        isRealNull,
        isRealNum,
        valueIsError,
        hasChinaword,
        isEditMode,
        hasPartMC,
        checkWordByteLength
    };
});