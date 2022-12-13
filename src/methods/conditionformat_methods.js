define([
    '../methods/get',
    '../utils/util',
    '../methods/formula_methods',
    '../methods/validate',
    '../methods/getdata',
    '../methods/format',
    '../locale/locale',
    '../methods/protection_methods',
    '../store',
    'skylark-moment'
], function (m_get, m_util, formula, m_validate,  m_getdata, m_format, locale, m_protection, Store, dayjs) {
    'use strict';
    const {getSheetIndex, getRangetxt} = m_get;
    const {replaceHtml, getObjType, chatatABC} = m_util;
    const {isRealNull, isEditMode} = m_validate;
    const {getcellvalue} = m_getdata;
    const {genarate} = m_format;
    const {checkProtectionFormatCells} = m_protection;
    //条件格式
    const conditionformat = {
        fileClone: [],
        editorRule: null,

        selectRange: [],
        selectStatus: false,
        dataBarList: [
            {
                'format': [
                    '#638ec6',
                    '#ffffff'
                ]
            },
            //蓝-白渐变 数据条
            {
                'format': [
                    '#63c384',
                    '#ffffff'
                ]
            },
            //绿-白渐变 数据条
            {
                'format': [
                    '#ff555a',
                    '#ffffff'
                ]
            },
            //红-白渐变 数据条
            {
                'format': [
                    '#ffb628',
                    '#ffffff'
                ]
            },
            //橙-白渐变 数据条
            {
                'format': [
                    '#008aef',
                    '#ffffff'
                ]
            },
            //浅蓝-白渐变 数据条
            {
                'format': [
                    '#d6007b',
                    '#ffffff'
                ]
            },
            //紫-白渐变 数据条
            { 'format': ['#638ec6'] },
            //蓝色 数据条
            { 'format': ['#63c384'] },
            //绿色 数据条
            { 'format': ['#ff555a'] },
            //红色 数据条
            { 'format': ['#ffb628'] },
            //橙色 数据条
            { 'format': ['#008aef'] },
            //浅蓝色 数据条
            { 'format': ['#d6007b'] }    //紫色 数据条
        ],
        //紫色 数据条
        colorGradationList: [
            {
                'format': [
                    'rgb(99, 190, 123)',
                    'rgb(255, 235, 132)',
                    'rgb(248, 105, 107)'
                ]
            },
            //绿-黄-红色阶
            {
                'format': [
                    'rgb(248, 105, 107)',
                    'rgb(255, 235, 132)',
                    'rgb(99, 190, 123)'
                ]
            },
            //红-黄-绿色阶
            {
                'format': [
                    'rgb(99, 190, 123)',
                    'rgb(252, 252, 255)',
                    'rgb(248, 105, 107)'
                ]
            },
            //绿-白-红色阶
            {
                'format': [
                    'rgb(248, 105, 107)',
                    'rgb(252, 252, 255)',
                    'rgb(99, 190, 123)'
                ]
            },
            //红-白-绿色阶
            {
                'format': [
                    'rgb(90, 138, 198)',
                    'rgb(252, 252, 255)',
                    'rgb(248, 105, 107)'
                ]
            },
            //蓝-白-红色阶
            {
                'format': [
                    'rgb(248, 105, 107)',
                    'rgb(252, 252, 255)',
                    'rgb(90, 138, 198)'
                ]
            },
            //红-白-蓝色阶
            {
                'format': [
                    'rgb(252, 252, 255)',
                    'rgb(248, 105, 107)'
                ]
            },
            //白-红色阶
            {
                'format': [
                    'rgb(248, 105, 107)',
                    'rgb(252, 252, 255)'
                ]
            },
            //红-白色阶
            {
                'format': [
                    'rgb(99, 190, 123)',
                    'rgb(252, 252, 255)'
                ]
            },
            //绿-白色阶
            {
                'format': [
                    'rgb(252, 252, 255)',
                    'rgb(99, 190, 123)'
                ]
            },
            //白-绿色阶
            {
                'format': [
                    'rgb(99, 190, 123)',
                    'rgb(255, 235, 132)'
                ]
            },
            //绿-黄色阶
            {
                'format': [
                    'rgb(255, 235, 132)',
                    'rgb(99, 190, 123)'
                ]
            }    //黄-绿色阶
        ],

        getTxtByRange: function (range) {
            if (range.length > 0) {
                let txt = [];
                for (let s = 0; s < range.length; s++) {
                    let r1 = range[s].row[0], r2 = range[s].row[1];
                    let c1 = range[s].column[0], c2 = range[s].column[1];
                    txt.push(getRangetxt(Store.currentSheetIndex, {
                        'row': [
                            r1,
                            r2
                        ],
                        'column': [
                            c1,
                            c2
                        ]
                    }, Store.currentSheetIndex));
                }
                return txt.join(',');
            }
        },
        getRangeByTxt: function (txt) {
            let range = [];
            txt = txt.toString();
            if (txt.indexOf(',') != -1) {
                let arr = txt.split(',');
                for (let i = 0; i < arr.length; i++) {
                    if (formula.iscelldata(arr[i])) {
                        range.push(formula.getcellrange(arr[i]));
                    } else {
                        range = [];
                        break;
                    }
                }
            } else {
                if (formula.iscelldata(txt)) {
                    range.push(formula.getcellrange(txt));
                }
            }
            return range;
        },


        CFSplitRange: function (range1, range2, range3, type) {
            let range = [];
            let offset_r = range3['row'][0] - range2['row'][0];
            let offset_c = range3['column'][0] - range2['column'][0];
            let r1 = range1['row'][0], r2 = range1['row'][1];
            let c1 = range1['column'][0], c2 = range1['column'][1];
            if (r1 >= range2['row'][0] && r2 <= range2['row'][1] && c1 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 全部
                if (type == 'allPart') {
                    //所有部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (r1 >= range2['row'][0] && r1 <= range2['row'][1] && c1 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 行贯穿 条件格式应用范围 上部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [{
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (r2 >= range2['row'][0] && r2 <= range2['row'][1] && c1 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 行贯穿 条件格式应用范围 下部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [{
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (r1 < range2['row'][0] && r2 > range2['row'][1] && c1 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 行贯穿 条件格式应用范围 中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (c1 >= range2['column'][0] && c1 <= range2['column'][1] && r1 >= range2['row'][0] && r2 <= range2['row'][1]) {
                //选区 列贯穿 条件格式应用范围 左部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [{
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        }];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (c2 >= range2['column'][0] && c2 <= range2['column'][1] && r1 >= range2['row'][0] && r2 <= range2['row'][1]) {
                //选区 列贯穿 条件格式应用范围 右部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [{
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        }];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (c1 < range2['column'][0] && c2 > range2['column'][1] && r1 >= range2['row'][0] && r2 <= range2['row'][1]) {
                //选区 列贯穿 条件格式应用范围 中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (r1 >= range2['row'][0] && r1 <= range2['row'][1] && c1 >= range2['column'][0] && c1 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 左上角部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (r1 >= range2['row'][0] && r1 <= range2['row'][1] && c2 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 右上角部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (r2 >= range2['row'][0] && r2 <= range2['row'][1] && c1 >= range2['column'][0] && c1 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 左下角部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (r2 >= range2['row'][0] && r2 <= range2['row'][1] && c2 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 右下角部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (r1 < range2['row'][0] && r2 > range2['row'][1] && c1 >= range2['column'][0] && c1 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 左中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                c1 + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (r1 < range2['row'][0] && r2 > range2['row'][1] && c2 >= range2['column'][0] && c2 <= range2['column'][1]) {
                //选区 包含 条件格式应用范围 右中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                c2 + offset_c
                            ]
                        }];
                }
            } else if (c1 < range2['column'][0] && c2 > range2['column'][1] && r1 >= range2['row'][0] && r1 <= range2['row'][1]) {
                //选区 包含 条件格式应用范围 上中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                r1,
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                r1 + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (c1 < range2['column'][0] && c2 > range2['column'][1] && r2 >= range2['row'][0] && r2 <= range2['row'][1]) {
                //选区 包含 条件格式应用范围 下中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                r2
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                r2 + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else if (r1 < range2['row'][0] && r2 > range2['row'][1] && c1 < range2['column'][0] && c2 > range2['column'][1]) {
                //选区 包含 条件格式应用范围 正中间部分
                if (type == 'allPart') {
                    //所有部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }
                    ];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [
                        {
                            'row': [
                                r1,
                                range2['row'][0] - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                c1,
                                range2['column'][0] - 1
                            ]
                        },
                        {
                            'row': [
                                range2['row'][0],
                                range2['row'][1]
                            ],
                            'column': [
                                range2['column'][1] + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                range2['row'][1] + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [{
                            'row': [
                                range2['row'][0] + offset_r,
                                range2['row'][1] + offset_r
                            ],
                            'column': [
                                range2['column'][0] + offset_c,
                                range2['column'][1] + offset_c
                            ]
                        }];
                }
            } else {
                //选区 在 条件格式应用范围 之外
                if (type == 'allPart') {
                    //所有部分
                    range = [{
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }];
                } else if (type == 'restPart') {
                    //剩余部分
                    range = [{
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }];
                } else if (type == 'operatePart') {
                    //操作部分
                    range = [];
                }
            }
            return range;
        },
        getcolorGradation: function (color1, color2, value1, value2, value) {
            let rgb1 = color1.split(',');
            let r1 = parseInt(rgb1[0].split('(')[1]);
            let g1 = parseInt(rgb1[1]);
            let b1 = parseInt(rgb1[2].split(')')[0]);
            let rgb2 = color2.split(',');
            let r2 = parseInt(rgb2[0].split('(')[1]);
            let g2 = parseInt(rgb2[1]);
            let b2 = parseInt(rgb2[2].split(')')[0]);
            let r = Math.round(r1 - (r1 - r2) / (value1 - value2) * (value1 - value));
            let g = Math.round(g1 - (g1 - g2) / (value1 - value2) * (value1 - value));
            let b = Math.round(b1 - (b1 - b2) / (value1 - value2) * (value1 - value));
            return 'rgb(' + r + ', ' + g + ', ' + b + ')';
        },
        getCFPartRange: function (sheetIndex, range1, range2) {
            let ruleArr = [];
            let cf = Store.luckysheetfile[getSheetIndex(sheetIndex)].luckysheet_conditionformat_save;
            if (cf != null && cf.length > 0) {
                label:
                    for (let i = 0; i < cf.length; i++) {
                        let cellrange = cf[i].cellrange;
                        for (let j = 0; j < cellrange.length; j++) {
                            let r1 = cellrange[j].row[0], r2 = cellrange[j].row[1];
                            let c1 = cellrange[j].column[0], c2 = cellrange[j].column[1];
                            for (let s = 0; s < range.length; s++) {
                                if (range[s].row[0] >= r1 && range[s].row[0] <= r2 || range[s].row[1] >= r1 && range[s].row[1] <= r2 || range[s].column[0] >= c1 && range[s].column[0] <= c2 || range[s].column[1] >= c1 && range[s].column[1] <= c2) {
                                    ruleArr.push(cf[i]);
                                    continue label;
                                }
                            }
                        }
                    }
            }
            return ruleArr;
        },
        checksCF: function (r, c, computeMap) {
            if (computeMap != null && r + '_' + c in computeMap) {
                return computeMap[r + '_' + c];
            } else {
                return null;
            }
        },
        getComputeMap: function (sheetIndex) {
            let index = getSheetIndex(Store.currentSheetIndex);
            if (sheetIndex != null) {
                index = getSheetIndex(sheetIndex);
            }
            let ruleArr = Store.luckysheetfile[index]['luckysheet_conditionformat_save'];
            let data = Store.luckysheetfile[index]['data'];
            if (data == null) {
                return null;
            }
            let computeMap = this.compute(ruleArr, data);
            return computeMap;
        },
        compute: function (ruleArr, d) {
            let _this = this;
            if (ruleArr == null) {
                ruleArr = [];
            }  
            //条件计算存储
            let computeMap = {};
            if (ruleArr.length > 0) {
                for (let i = 0; i < ruleArr.length; i++) {
                    let type = ruleArr[i]['type'];
                    let cellrange = ruleArr[i]['cellrange'];
                    let format = ruleArr[i]['format'];
                    if (type == 'dataBar') {
                        //数据条
                        let max = null, min = null;
                        for (let s = 0; s < cellrange.length; s++) {
                            for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                    if (d[r] == null || d[r][c] == null) {
                                        continue;
                                    }
                                    let cell = d[r][c];
                                    if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                        if (max == null || parseInt(cell.v) > max) {
                                            max = parseInt(cell.v);
                                        }
                                        if (min == null || parseInt(cell.v) < min) {
                                            min = parseInt(cell.v);
                                        }
                                    }
                                }
                            }
                        }
                        if (max != null && min != null) {
                            if (min < 0) {
                                //选区范围内有负数
                                let plusLen = Math.round(max / (max - min) * 10) / 10;    //正数所占比
                                //正数所占比
                                let minusLen = Math.round(Math.abs(min) / (max - min) * 10) / 10;    //负数所占比
                                //负数所占比
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                if (parseInt(cell.v) < 0) {
                                                    //负数
                                                    let valueLen = Math.round(Math.abs(parseInt(cell.v)) / Math.abs(min) * 100) / 100;
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['dataBar'] = {
                                                            'valueType': 'minus',
                                                            'minusLen': minusLen,
                                                            'valueLen': valueLen,
                                                            'format': format
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'dataBar': {
                                                                'valueType': 'minus',
                                                                'minusLen': minusLen,
                                                                'valueLen': valueLen,
                                                                'format': format
                                                            }
                                                        };
                                                    }
                                                }
                                                if (parseInt(cell.v) > 0) {
                                                    //正数
                                                    let valueLen = Math.round(parseInt(cell.v) / max * 100) / 100;
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['dataBar'] = {
                                                            'valueType': 'plus',
                                                            'plusLen': plusLen,
                                                            'minusLen': minusLen,
                                                            'valueLen': valueLen,
                                                            'format': format
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'dataBar': {
                                                                'valueType': 'plus',
                                                                'plusLen': plusLen,
                                                                'minusLen': minusLen,
                                                                'valueLen': valueLen,
                                                                'format': format
                                                            }
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                let plusLen = 1;
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                let valueLen;
                                                if (max == 0) {
                                                    valueLen = 1;
                                                } else {
                                                    valueLen = Math.round(parseInt(cell.v) / max * 100) / 100;
                                                }
                                                if (r + '_' + c in computeMap) {
                                                    computeMap[r + '_' + c]['dataBar'] = {
                                                        'valueType': 'plus',
                                                        'plusLen': plusLen,
                                                        'valueLen': valueLen,
                                                        'format': format
                                                    };
                                                } else {
                                                    computeMap[r + '_' + c] = {
                                                        'dataBar': {
                                                            'valueType': 'plus',
                                                            'plusLen': plusLen,
                                                            'valueLen': valueLen,
                                                            'format': format
                                                        }
                                                    };
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (type == 'colorGradation') {
                        //色阶
                        let max = null, min = null, sum = 0, count = 0;
                        for (let s = 0; s < cellrange.length; s++) {
                            for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                    if (d[r] == null || d[r][c] == null) {
                                        continue;
                                    }
                                    let cell = d[r][c];
                                    if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                        count++;
                                        sum += parseInt(cell.v);
                                        if (max == null || parseInt(cell.v) > max) {
                                            max = parseInt(cell.v);
                                        }
                                        if (min == null || parseInt(cell.v) < min) {
                                            min = parseInt(cell.v);
                                        }
                                    }
                                }
                            }
                        }
                        if (max != null && min != null) {
                            if (format.length == 3) {
                                //三色色阶
                                let avg = Math.floor(sum / count);
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                if (parseInt(cell.v) == min) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = format[2];
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': format[2] };
                                                    }
                                                } else if (parseInt(cell.v) > min && parseInt(cell.v) < avg) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = _this.getcolorGradation(format[2], format[1], min, avg, parseInt(cell.v));
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': _this.getcolorGradation(format[2], format[1], min, avg, parseInt(cell.v)) };
                                                    }
                                                } else if (parseInt(cell.v) == avg) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = format[1];
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': format[1] };
                                                    }
                                                } else if (parseInt(cell.v) > avg && parseInt(cell.v) < max) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = _this.getcolorGradation(format[1], format[0], avg, max, parseInt(cell.v));
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': _this.getcolorGradation(format[1], format[0], avg, max, parseInt(cell.v)) };
                                                    }
                                                } else if (parseInt(cell.v) == max) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = format[0];
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': format[0] };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (format.length == 2) {
                                //两色色阶
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                if (parseInt(cell.v) == min) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = format[1];
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': format[1] };
                                                    }
                                                } else if (parseInt(cell.v) > min && parseInt(cell.v) < max) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = _this.getcolorGradation(format[1], format[0], min, max, parseInt(cell.v));
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': _this.getcolorGradation(format[1], format[0], min, max, parseInt(cell.v)) };
                                                    }
                                                } else if (parseInt(cell.v) == max) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['cellColor'] = format[0];
                                                    } else {
                                                        computeMap[r + '_' + c] = { 'cellColor': format[0] };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (type == 'icons') {
                        //图标集
                        let len = parseInt(format['len']);
                        let leftMin = parseInt(format['leftMin']);
                        let top = parseInt(format['top']);
                        let max = null, min = null;
                        for (let s = 0; s < cellrange.length; s++) {
                            for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                    if (d[r] == null || d[r][c] == null) {
                                        continue;
                                    }
                                    let cell = d[r][c];
                                    if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                        if (max == null || parseInt(cell.v) > max) {
                                            max = parseInt(cell.v);
                                        }
                                        if (min == null || parseInt(cell.v) < min) {
                                            min = parseInt(cell.v);
                                        }
                                    }
                                }
                            }
                        }
                        if (max != null && min != null) {
                            let a = Math.floor((max - min + 1) / len);
                            let b = (max - min + 1) % len;
                            if (len == 3) {
                                //一组图标有三个
                                let v1, v2, v3;
                                if (b == 2) {
                                    v1 = [
                                        min,
                                        min + a
                                    ];
                                    v2 = [
                                        min + a + 1,
                                        min + a * 2
                                    ];
                                    v3 = [
                                        min + a * 2 + 1,
                                        max
                                    ];
                                } else {
                                    v1 = [
                                        min,
                                        min + a - 1
                                    ];
                                    v2 = [
                                        min + a,
                                        min + a * 2 - 1
                                    ];
                                    v3 = [
                                        min + a * 2,
                                        max
                                    ];
                                }
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                if (parseInt(cell.v) >= v1[0] && parseInt(cell.v) <= v1[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 2,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 2,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v2[0] && parseInt(cell.v) <= v2[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 1,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 1,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v3[0] && parseInt(cell.v) <= v3[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (len == 4) {
                                //一组图标有四个
                                let v1, v2, v3, v4;
                                if (b == 2) {
                                    v1 = [
                                        min,
                                        min + a
                                    ];
                                    v2 = [
                                        min + a + 1,
                                        min + a * 2
                                    ];
                                    v3 = [
                                        min + a * 2 + 1,
                                        min + a * 3
                                    ];
                                    v4 = [
                                        min + a * 3 + 1,
                                        max
                                    ];
                                } else if (b == 3) {
                                    v1 = [
                                        min,
                                        min + a
                                    ];
                                    v2 = [
                                        min + a + 1,
                                        min + a * 2
                                    ];
                                    v3 = [
                                        min + a * 2 + 1,
                                        min + a * 3 + 1
                                    ];
                                    v4 = [
                                        min + a * 3 + 2,
                                        max
                                    ];
                                } else {
                                    v1 = [
                                        min,
                                        min + a - 1
                                    ];
                                    v2 = [
                                        min + a,
                                        min + a * 2 - 1
                                    ];
                                    v3 = [
                                        min + a * 2,
                                        min + a * 3 - 1
                                    ];
                                    v4 = [
                                        min + a * 3,
                                        max
                                    ];
                                }
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                if (parseInt(cell.v) >= v1[0] && parseInt(cell.v) <= v1[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 3,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 3,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v2[0] && parseInt(cell.v) <= v2[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 2,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 2,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v3[0] && parseInt(cell.v) <= v3[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 1,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 1,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v4[0] && parseInt(cell.v) <= v4[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (len == 5) {
                                //一组图标有五个
                                let v1, v2, v3, v4, v5;
                                if (b == 2) {
                                    v1 = [
                                        min,
                                        min + a
                                    ];
                                    v2 = [
                                        min + a + 1,
                                        min + a * 2
                                    ];
                                    v3 = [
                                        min + a * 2 + 1,
                                        min + a * 3
                                    ];
                                    v4 = [
                                        min + a * 3 + 1,
                                        min + a * 4
                                    ];
                                    v5 = [
                                        min + a * 4 + 1,
                                        max
                                    ];
                                } else if (b == 3) {
                                    v1 = [
                                        min,
                                        min + a
                                    ];
                                    v2 = [
                                        min + a + 1,
                                        min + a * 2
                                    ];
                                    v3 = [
                                        min + a * 2 + 1,
                                        min + a * 3 + 1
                                    ];
                                    v4 = [
                                        min + a * 3 + 2,
                                        min + a * 4 + 1
                                    ];
                                    v5 = [
                                        min + a * 4 + 2,
                                        max
                                    ];
                                } else if (b == 4) {
                                    v1 = [
                                        min,
                                        min + a
                                    ];
                                    v2 = [
                                        min + a + 1,
                                        min + a * 2 + 1
                                    ];
                                    v3 = [
                                        min + a * 2 + 2,
                                        min + a * 3 + 1
                                    ];
                                    v4 = [
                                        min + a * 3 + 2,
                                        min + a * 4 + 2
                                    ];
                                    v5 = [
                                        min + a * 4 + 3,
                                        max
                                    ];
                                } else {
                                    v1 = [
                                        min,
                                        min + a - 1
                                    ];
                                    v2 = [
                                        min + a,
                                        min + a * 2 - 1
                                    ];
                                    v3 = [
                                        min + a * 2,
                                        min + a * 3 - 1
                                    ];
                                    v4 = [
                                        min + a * 3,
                                        min + a * 4 - 1
                                    ];
                                    v5 = [
                                        min + a * 4,
                                        max
                                    ];
                                }
                                for (let s = 0; s < cellrange.length; s++) {
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }
                                            let cell = d[r][c];
                                            if (getObjType(cell) == 'object' && cell['ct'] != null && cell['ct'].t == 'n' && cell.v != null) {
                                                if (parseInt(cell.v) >= v1[0] && parseInt(cell.v) <= v1[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 4,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 4,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v2[0] && parseInt(cell.v) <= v2[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 3,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 3,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v3[0] && parseInt(cell.v) <= v3[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 2,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 2,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v4[0] && parseInt(cell.v) <= v4[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin + 1,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin + 1,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                } else if (parseInt(cell.v) >= v5[0] && parseInt(cell.v) <= v5[1]) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['icons'] = {
                                                            'left': leftMin,
                                                            'top': top
                                                        };
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'icons': {
                                                                'left': leftMin,
                                                                'top': top
                                                            }
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        //获取变量值
                        let conditionName = ruleArr[i].conditionName,
                            //条件名称
                            conditionValue0 = ruleArr[i].conditionValue[0],
                            //条件值1
                            conditionValue1 = ruleArr[i].conditionValue[1],
                            //条件值2
                            textColor = format.textColor,
                            //条件格式文本颜色 fc
                            cellColor = format.cellColor;    //条件格式单元格颜色 bg
                        //条件格式单元格颜色 bg
                        for (let s = 0; s < cellrange.length; s++) {
                            //条件类型判断
                            if (conditionName == 'greaterThan' || conditionName == 'lessThan' || conditionName == 'equal' || conditionName == 'textContains') {
                                //循环应用范围计算
                                for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                    for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                        if (d[r] == null || d[r][c] == null) {
                                            continue;
                                        }    //单元格值
                                        //单元格值
                                        let cell = d[r][c];
                                        if (getObjType(cell) != 'object' || isRealNull(cell.v)) {
                                            continue;
                                        }    //符合条件
                                        //符合条件
                                        if (conditionName == 'greaterThan' && cell.v > conditionValue0) {
                                            if (r + '_' + c in computeMap) {
                                                computeMap[r + '_' + c]['textColor'] = textColor;
                                                computeMap[r + '_' + c]['cellColor'] = cellColor;
                                            } else {
                                                computeMap[r + '_' + c] = {
                                                    'textColor': textColor,
                                                    'cellColor': cellColor
                                                };
                                            }
                                        } else if (conditionName == 'lessThan' && cell.v < conditionValue0) {
                                            if (r + '_' + c in computeMap) {
                                                computeMap[r + '_' + c]['textColor'] = textColor;
                                                computeMap[r + '_' + c]['cellColor'] = cellColor;
                                            } else {
                                                computeMap[r + '_' + c] = {
                                                    'textColor': textColor,
                                                    'cellColor': cellColor
                                                };
                                            }
                                        } else if (conditionName == 'equal' && cell.v == conditionValue0) {
                                            if (r + '_' + c in computeMap) {
                                                computeMap[r + '_' + c]['textColor'] = textColor;
                                                computeMap[r + '_' + c]['cellColor'] = cellColor;
                                            } else {
                                                computeMap[r + '_' + c] = {
                                                    'textColor': textColor,
                                                    'cellColor': cellColor
                                                };
                                            }
                                        } else if (conditionName == 'textContains' && cell.v.toString().indexOf(conditionValue0) != -1) {
                                            if (r + '_' + c in computeMap) {
                                                computeMap[r + '_' + c]['textColor'] = textColor;
                                                computeMap[r + '_' + c]['cellColor'] = cellColor;
                                            } else {
                                                computeMap[r + '_' + c] = {
                                                    'textColor': textColor,
                                                    'cellColor': cellColor
                                                };
                                            }
                                        }
                                    }
                                }
                            } else if (conditionName == 'betweenness') {
                                //比较条件值1和条件值2的大小
                                let vBig, vSmall;
                                if (conditionValue0 > conditionValue1) {
                                    vBig = conditionValue0;
                                    vSmall = conditionValue1;
                                } else {
                                    vBig = conditionValue1;
                                    vSmall = conditionValue0;
                                }    //循环应用范围计算
                                //循环应用范围计算
                                for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                    for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                        if (d[r] == null || d[r][c] == null) {
                                            continue;
                                        }    //单元格值
                                        //单元格值
                                        let cell = d[r][c];
                                        if (getObjType(cell) != 'object' || isRealNull(cell.v)) {
                                            continue;
                                        }    //符合条件
                                        //符合条件
                                        if (cell.v >= vSmall && cell.v <= vBig) {
                                            if (r + '_' + c in computeMap) {
                                                computeMap[r + '_' + c]['textColor'] = textColor;
                                                computeMap[r + '_' + c]['cellColor'] = cellColor;
                                            } else {
                                                computeMap[r + '_' + c] = {
                                                    'textColor': textColor,
                                                    'cellColor': cellColor
                                                };
                                            }
                                        }
                                    }
                                }
                            } else if (conditionName == 'occurrenceDate') {
                                //获取日期所对应的数值
                                let dBig, dSmall;
                                if (conditionValue0.toString().indexOf('-') == -1) {
                                    dBig = genarate(conditionValue0)[2];
                                    dSmall = genarate(conditionValue0)[2];
                                } else {
                                    let str = conditionValue0.toString().split('-');
                                    dBig = genarate(str[1].trim())[2];
                                    dSmall = genarate(str[0].trim())[2];
                                }    //循环应用范围计算
                                //循环应用范围计算
                                for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                    for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                        if (d[r] == null || d[r][c] == null) {
                                            continue;
                                        }    //单元格值类型为日期类型
                                        //单元格值类型为日期类型
                                        if (d[r][c].ct != null && d[r][c].ct.t == 'd') {
                                            //单元格值
                                            let cellVal = getcellvalue(r, c, d);    //符合条件
                                            //符合条件
                                            if (cellVal >= dSmall && cellVal <= dBig) {
                                                if (r + '_' + c in computeMap) {
                                                    computeMap[r + '_' + c]['textColor'] = textColor;
                                                    computeMap[r + '_' + c]['cellColor'] = cellColor;
                                                } else {
                                                    computeMap[r + '_' + c] = {
                                                        'textColor': textColor,
                                                        'cellColor': cellColor
                                                    };
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (conditionName == 'duplicateValue') {
                                //应用范围单元格值处理
                                let dmap = {};
                                for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                    for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                        let item = getcellvalue(r, c, d);
                                        if (!(item in dmap)) {
                                            dmap[item] = [];
                                        }
                                        dmap[item].push({
                                            'r': r,
                                            'c': c
                                        });
                                    }
                                }    //循环应用范围计算
                                //循环应用范围计算
                                if (conditionValue0 == '0') {
                                    //重复值
                                    for (let x in dmap) {
                                        if (x != 'null' && x != 'undefined' && dmap[x].length > 1) {
                                            for (let j = 0; j < dmap[x].length; j++) {
                                                if (dmap[x][j].r + '_' + dmap[x][j].c in computeMap) {
                                                    computeMap[dmap[x][j].r + '_' + dmap[x][j].c]['textColor'] = textColor;
                                                    computeMap[dmap[x][j].r + '_' + dmap[x][j].c]['cellColor'] = cellColor;
                                                } else {
                                                    computeMap[dmap[x][j].r + '_' + dmap[x][j].c] = {
                                                        'textColor': textColor,
                                                        'cellColor': cellColor
                                                    };
                                                }
                                            }
                                        }
                                    }
                                }
                                if (conditionValue0 == '1') {
                                    //唯一值
                                    for (let x in dmap) {
                                        if (x != 'null' && x != 'undefined' && dmap[x].length == 1) {
                                            if (dmap[x][0].r + '_' + dmap[x][0].c in computeMap) {
                                                computeMap[dmap[x][0].r + '_' + dmap[x][0].c]['textColor'] = textColor;
                                                computeMap[dmap[x][0].r + '_' + dmap[x][0].c]['cellColor'] = cellColor;
                                            } else {
                                                computeMap[dmap[x][0].r + '_' + dmap[x][0].c] = {
                                                    'textColor': textColor,
                                                    'cellColor': cellColor
                                                };
                                            }
                                        }
                                    }
                                }
                            } else if (conditionName == 'top10' || conditionName == 'top10%' || conditionName == 'last10' || conditionName == 'last10%' || conditionName == 'AboveAverage' || conditionName == 'SubAverage') {
                                //应用范围单元格值(数值型)
                                let dArr = [];
                                for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                    for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                        if (d[r] == null || d[r][c] == null) {
                                            continue;
                                        }    //单元格值类型为数字类型
                                        //单元格值类型为数字类型
                                        if (d[r][c].ct != null && d[r][c].ct.t == 'n') {
                                            dArr.push(getcellvalue(r, c, d));
                                        }
                                    }
                                }    //数组处理
                                //数组处理
                                if (conditionName == 'top10' || conditionName == 'top10%' || conditionName == 'last10' || conditionName == 'last10%') {
                                    //从大到小排序
                                    for (let j = 0; j < dArr.length; j++) {
                                        for (let k = 0; k < dArr.length - 1 - j; k++) {
                                            if (dArr[k] < dArr[k + 1]) {
                                                let temp = dArr[k];
                                                dArr[k] = dArr[k + 1];
                                                dArr[k + 1] = temp;
                                            }
                                        }
                                    }    //取条件值数组
                                    //取条件值数组
                                    let cArr;
                                    if (conditionName == 'top10') {
                                        cArr = dArr.slice(0, conditionValue0);    //前10项数组
                                    } else //前10项数组
                                    if (conditionName == 'top10%') {
                                        cArr = dArr.slice(0, Math.floor(conditionValue0 * dArr.length / 100));    //前10%数组
                                    } else //前10%数组
                                    if (conditionName == 'last10') {
                                        cArr = dArr.slice(dArr.length - conditionValue0, dArr.length);    //最后10项数组
                                    } else //最后10项数组
                                    if (conditionName == 'last10%') {
                                        cArr = dArr.slice(dArr.length - Math.floor(conditionValue0 * dArr.length / 100), dArr.length);    //最后10%数组
                                    }    //循环应用范围计算
                                    //最后10%数组
                                    //循环应用范围计算
                                    for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                        for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                            if (d[r] == null || d[r][c] == null) {
                                                continue;
                                            }    //单元格值
                                            //单元格值
                                            let cellVal = getcellvalue(r, c, d);    //符合条件
                                            //符合条件
                                            if (cArr.indexOf(cellVal) != -1) {
                                                if (r + '_' + c in computeMap) {
                                                    computeMap[r + '_' + c]['textColor'] = textColor;
                                                    computeMap[r + '_' + c]['cellColor'] = cellColor;
                                                } else {
                                                    computeMap[r + '_' + c] = {
                                                        'textColor': textColor,
                                                        'cellColor': cellColor
                                                    };
                                                }
                                            }
                                        }
                                    }
                                } else if (conditionName == 'AboveAverage' || conditionName == 'SubAverage') {
                                    //计算数组平均值
                                    let sum = 0;
                                    for (let j = 0; j < dArr.length; j++) {
                                        sum += dArr[j];
                                    }
                                    let averageNum = sum / dArr.length;    //循环应用范围计算
                                    //循环应用范围计算
                                    if (conditionName == 'AboveAverage') {
                                        //高于平均值
                                        for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                            for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                                if (d[r] == null || d[r][c] == null) {
                                                    continue;
                                                }    //单元格值
                                                //单元格值
                                                let cellVal = getcellvalue(r, c, d);    //符合条件
                                                //符合条件
                                                if (cellVal > averageNum) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['textColor'] = textColor;
                                                        computeMap[r + '_' + c]['cellColor'] = cellColor;
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'textColor': textColor,
                                                            'cellColor': cellColor
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    } else if (conditionName == 'SubAverage') {
                                        //低于平均值
                                        for (let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++) {
                                            for (let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++) {
                                                if (d[r] == null || d[r][c] == null) {
                                                    continue;
                                                }    //单元格值
                                                //单元格值
                                                let cellVal = getcellvalue(r, c, d);    //符合条件
                                                //符合条件
                                                if (cellVal < averageNum) {
                                                    if (r + '_' + c in computeMap) {
                                                        computeMap[r + '_' + c]['textColor'] = textColor;
                                                        computeMap[r + '_' + c]['cellColor'] = cellColor;
                                                    } else {
                                                        computeMap[r + '_' + c] = {
                                                            'textColor': textColor,
                                                            'cellColor': cellColor
                                                        };
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if (conditionName == 'formula') {
                                let str = cellrange[s].row[0], edr = cellrange[s].row[1], stc = cellrange[s].column[0], edc = cellrange[s].column[1];
                                let formulaTxt = conditionValue0;
                                if (conditionValue0.toString().slice(0, 1) != '=') {
                                    formulaTxt = '=' + conditionValue0;
                                }
                                for (let r = str; r <= edr; r++) {
                                    for (let c = stc; c <= edc; c++) {
                                        let func = formulaTxt;
                                        let offsetRow = r - str;
                                        let offsetCol = c - stc;
                                        if (offsetRow > 0) {
                                            func = '=' + formula.functionCopy(func, 'down', offsetRow);
                                        }
                                        if (offsetCol > 0) {
                                            func = '=' + formula.functionCopy(func, 'right', offsetCol);
                                        }
                                        let funcV = formula.execfunction(func);
                                        let v = funcV[1];
                                        if (typeof v != 'boolean') {
                                            v = !!Number(v);
                                        }
                                        if (!v) {
                                            continue;
                                        }
                                        if (r + '_' + c in computeMap) {
                                            computeMap[r + '_' + c]['textColor'] = textColor;
                                            computeMap[r + '_' + c]['cellColor'] = cellColor;
                                        } else {
                                            computeMap[r + '_' + c] = {
                                                'textColor': textColor,
                                                'cellColor': cellColor
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return computeMap;
        },
        updateItem: function (type, cellrange, format) {
            if (!checkProtectionFormatCells(Store.currentSheetIndex)) {
                return;
            }
            let _this = this;
            let index = getSheetIndex(Store.currentSheetIndex);    //保存之前的规则
            //保存之前的规则
            let fileH = $.extend(true, [], Store.luckysheetfile);
            let historyRules = _this.getHistoryRules(fileH);    //保存当前的规则
            //保存当前的规则
            let ruleArr;
            if (type == 'delSheet') {
                ruleArr = [];
            } else {
                let rule = {
                    'type': type,
                    'cellrange': cellrange,
                    'format': format
                };
                ruleArr = Store.luckysheetfile[index]['luckysheet_conditionformat_save'] == null ? [] : Store.luckysheetfile[index]['luckysheet_conditionformat_save'];
                ruleArr.push(rule);
            }
            Store.luckysheetfile[index]['luckysheet_conditionformat_save'] = ruleArr;
            let fileC = $.extend(true, [], Store.luckysheetfile);
            let currentRules = _this.getCurrentRules(fileC);    //刷新一次表格
            //刷新一次表格
            _this.ref(historyRules, currentRules);    //发送给后台
            //发送给后台
            if (Store.allowUpdate) {
                Store.saveParam('all', Store.currentSheetIndex, ruleArr, { 'k': 'luckysheet_conditionformat_save' });
            }
        },
        getHistoryRules: function (fileH) {
            let historyRules = [];
            for (let h = 0; h < fileH.length; h++) {
                historyRules.push({
                    'sheetIndex': fileH[h]['index'],
                    'luckysheet_conditionformat_save': fileH[h]['luckysheet_conditionformat_save']
                });
            }
            return historyRules;
        },
        getCurrentRules: function (fileC) {
            let currentRules = [];
            for (let c = 0; c < fileC.length; c++) {
                currentRules.push({
                    'sheetIndex': fileC[c]['index'],
                    'luckysheet_conditionformat_save': fileC[c]['luckysheet_conditionformat_save']
                });
            }
            return currentRules;
        },
        ref: function (historyRules, currentRules) {
            if (Store.clearjfundo) {
                Store.jfundo.length = 0;
                let redo = {};
                redo['type'] = 'updateCF';
                redo['data'] = {
                    'historyRules': historyRules,
                    'currentRules': currentRules
                };
                Store.jfredo.push(redo);
            }
            ///setTimeout(function () {
            ///    luckysheetrefreshgrid();
            ///}, 1);
            Store.refresh();
        }
    };
    return conditionformat;
});