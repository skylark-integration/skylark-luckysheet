define([
    '../utils/util',
    './formula_methods',
    './validate',
    './datecontroll',
    './setdata',
    './getdata',
    '../methods/cells',
    '../methods/get',
    '../locale/locale',
    '../store'
], function (m_util, formula, m_validate, m_datecontroll,  m_setdata, m_getdata,  cells,  m_get, locale, Store) {
    'use strict';
    const {replaceHtml} = m_util;
    const {isRealNum, isRealNull} = m_validate;
    const {isdatetime, diff} = m_datecontroll;
    const {setcellvalue} = m_setdata;
    const {getcellvalue} = m_getdata;
    const {getSheetIndex, getRangetxt} = m_get;
    const dataVerificationCtrl = {
        defaultItem: {
            type: 'dropdown',
            //类型
            type2: null,
            //
            value1: '',
            //
            value2: '',
            //
            checked: false,
            remote: false,
            //自动远程获取选项
            prohibitInput: false,
            //输入数据无效时禁止输入
            hintShow: false,
            //选中单元格时显示提示语
            hintText: ''
        },
        //
        curItem: null,
        ///dataVerification: null, // to store
        selectRange: [],
        selectStatus: false,
        optionLabel: {
            'number': '数值',
            'number_integer': '整数',
            'number_decimal': '小数',
            'bw': '介于',
            'nb': '不介于',
            'eq': '等于',
            'ne': '不等于',
            'gt': '大于',
            'lt': '小于',
            'gte': '大于等于',
            'lte': '小于等于',
            'include': '包括',
            'exclude': '不包括',
            'equal': '等于',
            'bf': '早于',
            'nbf': '不早于',
            'af': '晚于',
            'naf': '不晚于',
            'card': '身份证号码',
            'phone': '手机号'
        },
        optionLabel_en: {
            'number': 'numeric',
            'number_integer': 'integer',
            'number_decimal': 'decimal',
            'bw': 'between',
            'nb': 'not between',
            'eq': 'equal to',
            'ne': 'not equal to',
            'gt': 'greater',
            'lt': 'less than',
            'gte': 'greater or equal to',
            'lte': 'less than or equal to',
            'include': 'include',
            'exclude': 'not include',
            'equal': 'equal to',
            'bf': 'earlier than',
            'nbf': 'not earlier than',
            'af': 'later than',
            'naf': 'not later than',
            'card': 'identification number',
            'phone': 'phone number'
        },

        getHintText: function (item) {
            let _this = this;
            let hintText = item.hintText || '';
            if (hintText.length == 0) {
                if (Store.lang == 'en') {
                    if (item.type == 'dropdown') {
                        hintText += 'please select an option in the drop-down list';
                    } else if (item.type == 'checkbox') {
                    } else if (item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal') {
                        hintText += 'please enter a ' + _this.optionLabel_en[item.type] + ' ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                        if (item.type2 == 'bw' || item.type2 == 'nb') {
                            hintText += ' and ' + item.value2;
                        }
                    } else if (item.type == 'text_content') {
                        hintText += 'please enter text ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                    } else if (item.type == 'text_length') {
                        hintText += 'please enter text with length ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                        if (item.type2 == 'bw' || item.type2 == 'nb') {
                            hintText += ' and ' + item.value2;
                        }
                    } else if (item.type == 'date') {
                        hintText += 'please enter a date ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                        if (item.type2 == 'bw' || item.type2 == 'nb') {
                            hintText += ' and ' + item.value2;
                        }
                    } else if (item.type == 'validity') {
                        hintText += 'please enter the correct ' + _this.optionLabel_en[item.type2];
                    }
                } else {
                    if (item.type == 'dropdown') {
                        hintText += '请选择下拉列表中的选项';
                    } else if (item.type == 'checkbox') {
                    } else if (item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal') {
                        hintText += '请输入' + _this.optionLabel[item.type2] + item.value1;
                        if (item.type2 == 'bw' || item.type2 == 'nb') {
                            hintText += '和' + item.value2 + '之间';
                        }
                        hintText += '的' + _this.optionLabel[item.type];
                    } else if (item.type == 'text_content') {
                        hintText += '请输入内容' + _this.optionLabel[item.type2] + item.value1 + '的文本';
                    } else if (item.type == 'text_length') {
                        hintText += '请输入长度' + _this.optionLabel[item.type2] + item.value1;
                        if (item.type2 == 'bw' || item.type2 == 'nb') {
                            hintText += '和' + item.value2 + '之间';
                        }
                        hintText += '的文本';
                    } else if (item.type == 'date') {
                        hintText += '请输入' + _this.optionLabel[item.type2] + item.value1;
                        if (item.type2 == 'bw' || item.type2 == 'nb') {
                            hintText += '和' + item.value2 + '之间';
                        }
                        hintText += '的日期';
                    } else if (item.type == 'validity') {
                        hintText += '请输入正确的' + _this.optionLabel[item.type2];
                    }
                }
            }
            return hintText;
        },
        getFailureText: function (item) {
            let _this = this;
            let failureText = '';
            if (Store.lang == 'en') {
                if (item.type == 'dropdown') {
                    failureText += 'what you selected is not an option in the drop-down list';
                } else if (item.type == 'checkbox') {
                } else if (item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal') {
                    failureText += 'what you entered is not a ' + _this.optionLabel_en[item.type] + ' ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                    if (item.type2 == 'bw' || item.type2 == 'nb') {
                        failureText += ' and ' + item.value2;
                    }
                } else if (item.type == 'text_content') {
                    failureText += 'what you entered is not text that ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                } else if (item.type == 'text_length') {
                    failureText += 'the text you entered is not length ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                    if (item.type2 == 'bw' || item.type2 == 'nb') {
                        failureText += ' and ' + item.value2;
                    }
                } else if (item.type == 'date') {
                    failureText += 'the date you entered is not ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                    if (item.type2 == 'bw' || item.type2 == 'nb') {
                        failureText += ' and ' + item.value2;
                    }
                } else if (item.type == 'validity') {
                    failureText += 'what you entered is not a correct ' + _this.optionLabel_en[item.type2];
                }
            } else {
                if (item.type == 'dropdown') {
                    failureText += '你选择的不是下拉列表中的选项';
                } else if (item.type == 'checkbox') {
                } else if (item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal') {
                    failureText += '你输入的不是' + _this.optionLabel[item.type2] + item.value1;
                    if (item.type2 == 'bw' || item.type2 == 'nb') {
                        failureText += '和' + item.value2 + '之间';
                    }
                    failureText += '的' + _this.optionLabel[item.type];
                } else if (item.type == 'text_content') {
                    failureText += '你输入的不是内容' + _this.optionLabel[item.type2] + item.value1 + '的文本';
                } else if (item.type == 'text_length') {
                    failureText += '你输入的不是长度' + _this.optionLabel[item.type2] + item.value1;
                    if (item.type2 == 'bw' || item.type2 == 'nb') {
                        failureText += '和' + item.value2 + '之间';
                    }
                    failureText += '的文本';
                } else if (item.type == 'date') {
                    failureText += '你输入的不是' + _this.optionLabel[item.type2] + item.value1;
                    if (item.type2 == 'bw' || item.type2 == 'nb') {
                        failureText += '和' + item.value2 + '之间';
                    }
                    failureText += '的日期';
                } else if (item.type == 'validity') {
                    failureText += '你输入的不是一个正确的' + _this.optionLabel[item.type2];
                }
            }
            return failureText;
        },
        validateCellData: function (cellValue, item) {
            let _this = this;
            let type = item.type, type2 = item.type2, value1 = item.value1, value2 = item.value2;
            if (type == 'dropdown') {
                let list = _this.getDropdownList(value1);
                let result = false;
                for (let i = 0; i < list.length; i++) {
                    if (list[i] == cellValue) {
                        result = true;
                        break;
                    }
                }
                return result;
            } else if (type == 'checkbox') {
            } else if (type == 'number' || type == 'number_integer' || type == 'number_decimal') {
                if (!isRealNum(cellValue)) {
                    return false;
                }
                cellValue = Number(cellValue);
                if (type == 'number_integer' && cellValue % 1 !== 0) {
                    return false;
                }
                if (type == 'number_decimal' && cellValue % 1 === 0) {
                    return false;
                }
                value1 = Number(value1);
                value2 = Number(value2);
                if (type2 == 'bw' && (cellValue < value1 || cellValue > value2)) {
                    return false;
                }
                if (type2 == 'nb' && (cellValue >= value1 && cellValue <= value2)) {
                    return false;
                }
                if (type2 == 'eq' && cellValue != value1) {
                    return false;
                }
                if (type2 == 'ne' && cellValue == value1) {
                    return false;
                }
                if (type2 == 'gt' && cellValue <= value1) {
                    return false;
                }
                if (type2 == 'lt' && cellValue >= value1) {
                    return false;
                }
                if (type2 == 'gte' && cellValue < value1) {
                    return false;
                }
                if (type2 == 'lte' && cellValue > value1) {
                    return false;
                }
            } else if (type == 'text_content') {
                cellValue = cellValue.toString();
                value1 = value1.toString();
                if (type2 == 'include' && cellValue.indexOf(value1) == -1) {
                    return false;
                }
                if (type2 == 'exclude' && cellValue.indexOf(value1) > -1) {
                    return false;
                }
                if (type2 == 'equal' && cellValue != value1) {
                    return false;
                }
            } else if (type == 'text_length') {
                cellValue = cellValue.toString().length;
                value1 = Number(value1);
                value2 = Number(value2);
                if (type2 == 'bw' && (cellValue < value1 || cellValue > value2)) {
                    return false;
                }
                if (type2 == 'nb' && (cellValue >= value1 && cellValue <= value2)) {
                    return false;
                }
                if (type2 == 'eq' && cellValue != value1) {
                    return false;
                }
                if (type2 == 'ne' && cellValue == value1) {
                    return false;
                }
                if (type2 == 'gt' && cellValue <= value1) {
                    return false;
                }
                if (type2 == 'lt' && cellValue >= value1) {
                    return false;
                }
                if (type2 == 'gte' && cellValue < value1) {
                    return false;
                }
                if (type2 == 'lte' && cellValue > value1) {
                    return false;
                }
            } else if (type == 'date') {
                if (!isdatetime(cellValue)) {
                    return false;
                }
                if (type2 == 'bw' && (diff(cellValue, value1) < 0 || diff(cellValue, value2) > 0)) {
                    return false;
                }
                if (type2 == 'nb' && (diff(cellValue, value1) >= 0 && diff(cellValue, value2) <= 0)) {
                    return false;
                }
                if (type2 == 'eq' && diff(cellValue, value1) != 0) {
                    return false;
                }
                if (type2 == 'ne' && diff(cellValue, value1) == 0) {
                    return false;
                }
                if (type2 == 'bf' && diff(cellValue, value1) >= 0) {
                    return false;
                }
                if (type2 == 'nbf' && diff(cellValue, value1) < 0) {
                    return false;
                }
                if (type2 == 'af' && diff(cellValue, value1) <= 0) {
                    return false;
                }
                if (type2 == 'naf' && diff(cellValue, value1) > 0) {
                    return false;
                }
            } else if (type == 'validity') {
                if (type2 == 'card' && !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(cellValue)) {
                    return false;
                }
                if (type2 == 'phone' && !/^[1][3,4,5,7,8][0-9]{9}$/.test(cellValue)) {
                    return false;
                }
            }
            return true;
        },

        getDropdownList: function (txt) {
            let list = [];
            if (formula.iscelldata(txt)) {
                let range = formula.getcellrange(txt);
                let d = Store.luckysheetfile[getSheetIndex(range.sheetIndex)].data;
                for (let r = range.row[0]; r <= range.row[1]; r++) {
                    for (let c = range.column[0]; c <= range.column[1]; c++) {
                        if (d[r] == null) {
                            continue;
                        }
                        let cell = d[r][c];
                        if (cell == null || cell.v == null) {
                            continue;
                        }
                        let v = cell.m || cell.v;
                        if (!list.includes(v)) {
                            list.push(v);
                        }
                    }
                }
            } else {
                let arr = txt.split(',');
                for (let i = 0; i < arr.length; i++) {
                    let v = arr[i];
                    if (v.length == 0) {
                        continue;
                    }
                    if (!list.includes(v)) {
                        list.push(v);
                    }
                }
            }
            return list;
        }
    };
    return dataVerificationCtrl;
});