define([
    '../methods/get',
    '../utils/util',
    '../store',
    '../locale/locale'
], function (m_get, m_util,  Store, locale) {
    'use strict';
    const {getSheetIndex, getRangetxt} = m_get;
    const {replaceHtml} = m_util;
    //交替颜色
    const alternateformat = {

        FixedModelColor: [
            {
                'head': {
                    'fc': '#000',
                    'bc': '#bfbdbe'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f8f3f7'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#dde2de'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#4bd4e7'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#eaf7ff'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#aae9f8'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#5ed593'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#e5fbee'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#a5efcc'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#f6cb4b'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#fff9e7'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#ffebac'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#f96420'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#ffe5d9'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#ffcfba'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#5599fc'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#ecf2fe'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#afcbfa'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#22a69b'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#dff2f8'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#8dd4d0'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#7a939a'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f0eff7'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#bdcad0'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#d7a270'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#fdf3f1'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#ead2b6'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#89c54b'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f1f7e9'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#c5e3a7'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#8f88f0'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f0e5ff'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#c6c4f6'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#fd1664'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#feddee'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#f98ab5'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#da96d3'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#fce8fb'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#f2caee'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#b49191'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f5ebe8'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#d8c3c3'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#91b493'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f0fbf0'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#b4cfb6'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#b4a891'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f8f6f1'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#d3cab8'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#91abb4'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#eff7fa'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#b7cbd3'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#b7ba82'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#fafbeb'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#dadcb4'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#df3e3e'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#fde9e9'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#f89292'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#f2711c'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#fef0d7'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#fbb335'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#b5cc18'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f9fbd4'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#e2ed2a'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#00b5ad'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#ccfaf9'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#00e4df'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#2185d0'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#d8f3fc'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#3cc4f0'
                }
            },
            {
                'head': {
                    'fc': '#000',
                    'bc': '#a5673f'
                },
                'one': {
                    'fc': '#000',
                    'bc': '#ffffff'
                },
                'two': {
                    'fc': '#000',
                    'bc': '#f6ede5'
                },
                'foot': {
                    'fc': '#000',
                    'bc': '#d3a47c'
                }
            }
        ],

        checksAF: function (r, c, computeMap) {
            if (r + '_' + c in computeMap) {
                //返回值（fc  bc）
                return computeMap[r + '_' + c];
            } else {
                return null;
            }
        },
        getComputeMap: function () {
            let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
            let ruleArr = file['luckysheet_alternateformat_save'];
            let computeMap = this.compute(ruleArr);
            return computeMap;
        },
        compute: function (obj) {
            //计算存储
            let computeMap = {};
            if (obj != null && obj.length > 0) {
                for (let i = 0; i < obj.length; i++) {
                    let cellrange = obj[i]['cellrange'];
                    let format = obj[i]['format'];
                    let hasRowHeader = obj[i]['hasRowHeader'];
                    let hasRowFooter = obj[i]['hasRowFooter'];
                    let st_r = cellrange['row'][0], ed_r = cellrange['row'][1], st_c = cellrange['column'][0], ed_c = cellrange['column'][1];
                    if (hasRowHeader && hasRowFooter) {
                        //页眉所在行
                        for (let c = st_c; c <= ed_c; c++) {
                            computeMap[st_r + '_' + c] = [
                                format['head'].fc,
                                format['head'].bc
                            ];
                        }    //中间行
                        //中间行
                        if (ed_r - st_r > 1) {
                            for (let r = st_r + 1; r < ed_r; r++) {
                                let fc, bc;
                                if ((r - st_r) % 2 != 0) {
                                    fc = format['one'].fc;
                                    bc = format['one'].bc;
                                } else {
                                    fc = format['two'].fc;
                                    bc = format['two'].bc;
                                }
                                for (let c = st_c; c <= ed_c; c++) {
                                    computeMap[r + '_' + c] = [
                                        fc,
                                        bc
                                    ];
                                }
                            }
                        }    //页脚所在行
                        //页脚所在行
                        if (ed_r > st_r) {
                            for (let c = st_c; c <= ed_c; c++) {
                                computeMap[ed_r + '_' + c] = [
                                    format['foot'].fc,
                                    format['foot'].bc
                                ];
                            }
                        }
                    } else if (hasRowHeader) {
                        //页眉所在行
                        for (let c = st_c; c <= ed_c; c++) {
                            computeMap[st_r + '_' + c] = [
                                format['head'].fc,
                                format['head'].bc
                            ];
                        }    //中间行
                        //中间行
                        if (ed_r > st_r) {
                            for (let r = st_r + 1; r <= ed_r; r++) {
                                let fc, bc;
                                if ((r - st_r) % 2 != 0) {
                                    fc = format['one'].fc;
                                    bc = format['one'].bc;
                                } else {
                                    fc = format['two'].fc;
                                    bc = format['two'].bc;
                                }
                                for (let c = st_c; c <= ed_c; c++) {
                                    computeMap[r + '_' + c] = [
                                        fc,
                                        bc
                                    ];
                                }
                            }
                        }
                    } else if (hasRowFooter) {
                        //中间行
                        if (ed_r > st_r) {
                            for (let r = st_r; r < ed_r; r++) {
                                let fc, bc;
                                if ((r - st_r) % 2 == 0) {
                                    fc = format['one'].fc;
                                    bc = format['one'].bc;
                                } else {
                                    fc = format['two'].fc;
                                    bc = format['two'].bc;
                                }
                                for (let c = st_c; c <= ed_c; c++) {
                                    computeMap[r + '_' + c] = [
                                        fc,
                                        bc
                                    ];
                                }
                            }
                        }    //页脚所在行
                        //页脚所在行
                        for (let c = st_c; c <= ed_c; c++) {
                            computeMap[ed_r + '_' + c] = [
                                format['foot'].fc,
                                format['foot'].bc
                            ];
                        }
                    } else {
                        //中间行
                        for (let r = st_r; r <= ed_r; r++) {
                            let fc, bc;
                            if ((r - st_r) % 2 == 0) {
                                fc = format['one'].fc;
                                bc = format['one'].bc;
                            } else {
                                fc = format['two'].fc;
                                bc = format['two'].bc;
                            }
                            for (let c = st_c; c <= ed_c; c++) {
                                computeMap[r + '_' + c] = [
                                    fc,
                                    bc
                                ];
                            }
                        }
                    }
                }
            }
            return computeMap;
        }
    };
    return alternateformat;
});