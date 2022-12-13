define([
    '../methods/getdata',
    '../methods/setdata',
    '../methods/get',
    '../store'
], function ( m_getdata, m_setdata, m_get, Store) {
    'use strict';
    const {datagridgrowth, getcellFormula} = m_getdata;
    const {setcellvalue} = m_setdata;
    const {getSheetIndex} = m_get;

    function luckysheetextendData(rowlen, newData) {
        let d = Store.deepCopyFlowData(Store.flowdata);
        let cfg = $.extend(true, {}, Store.config);
        if (cfg['merge'] == null) {
            cfg['merge'] = {};
        }
        let collen = d[0].length;
        let addNullData = datagridgrowth([], rowlen, collen);
        d = d.concat(addNullData);
        for (let i = 0; i < newData.length; i++) {
            let r = newData[i].r, c = newData[i].c, v = newData[i].v;
            setcellvalue(r, c, d, v);
            if (v != null && v.mc != null && v.mc.rs != null) {
                cfg['merge'][v.mc.r + '_' + v.mc.c] = $.extend(true, {}, v.mc);
            }
        }    //luckysheet.flowdata
        //luckysheet.flowdata
        Store.flowdata = d;
        Store.webWorkerFlowDataCache(Store.flowdata);    //worker存数据
        //worker存数据
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = d;    //config
        //config
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;    //行高、列宽刷新
        //行高、列宽刷新
        ///jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
        Store.refreshGrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    }    

    function getMoveRange(type, str, edr, stc, edc, r1, r2, c1, c2, rlen, clen) {
        let newRange = [];
        if (type == 'moveLeft') {
            if (str > r2 || edr < r1 || stc > c2) {
                newRange.push({
                    'row': [
                        r1,
                        r2
                    ],
                    'column': [
                        c1,
                        c2
                    ]
                });
            } else if (edc < c1) {
                if (str <= r1 && edr >= r2) {
                    newRange.push({
                        'row': [
                            r1,
                            r2
                        ],
                        'column': [
                            c1 - clen,
                            c2 - clen
                        ]
                    });
                } else if (str > r1 && edr < r2) {
                    let range = [
                        {
                            'row': [
                                r1,
                                str - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                edr + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                str,
                                edr
                            ],
                            'column': [
                                c1 - clen,
                                c2 - clen
                            ]
                        }
                    ];
                    newRange = newRange.concat(range);
                } else if (str > r1) {
                    let range = [
                        {
                            'row': [
                                r1,
                                str - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                str,
                                r2
                            ],
                            'column': [
                                c1 - clen,
                                c2 - clen
                            ]
                        }
                    ];
                    newRange = newRange.concat(range);
                } else if (edr < r2) {
                    let range = [
                        {
                            'row': [
                                r1,
                                edr
                            ],
                            'column': [
                                c1 - clen,
                                c2 - clen
                            ]
                        },
                        {
                            'row': [
                                edr + 1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        }
                    ];
                    newRange = newRange.concat(range);
                }
            } else if (edc >= c1) {
                if (stc <= c1 && edc >= c2) {
                    if (str > r1 && edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (str > r1) {
                        let range = [{
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            }];
                        newRange = newRange.concat(range);
                    } else if (edr < r2) {
                        let range = [{
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            }];
                        newRange = newRange.concat(range);
                    }
                } else if (stc > c1 && edc < c2) {
                    if (str <= r1 && edr >= r2) {
                        newRange.push({
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                c2 - clen
                            ]
                        });
                    } else if (str > r1 && edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    str,
                                    edr
                                ],
                                'column': [
                                    c1,
                                    c2 - clen
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (str > r1) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    str,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2 - clen
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    edr
                                ],
                                'column': [
                                    c1,
                                    c2 - clen
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    }
                } else if (stc > c1) {
                    if (str <= r1 && edr >= r2) {
                        newRange.push({
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                stc - 1
                            ]
                        });
                    } else if (str > r1 && edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    str,
                                    edr
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (str > r1) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    str,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    edr
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    }
                } else if (edc < c2) {
                    if (str <= r1 && edr >= r2) {
                        newRange.push({
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1 - clen,
                                c2 - clen
                            ]
                        });
                    } else if (str > r1 && edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    str,
                                    edr
                                ],
                                'column': [
                                    c1 - clen,
                                    c2 - clen
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (str > r1) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    str,
                                    r2
                                ],
                                'column': [
                                    c1 - clen,
                                    c2 - clen
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (edr < r2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    edr
                                ],
                                'column': [
                                    c1 - clen,
                                    c2 - clen
                                ]
                            },
                            {
                                'row': [
                                    edr + 1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    }
                }
            }
        } else if (type == 'moveUp') {
            if (stc > c2 || edc < c1 || str > r2) {
                newRange.push({
                    'row': [
                        r1,
                        r2
                    ],
                    'column': [
                        c1,
                        c2
                    ]
                });
            } else if (edr < r1) {
                if (stc <= c1 && edc >= c2) {
                    newRange.push({
                        'row': [
                            r1 - rlen,
                            r2 - rlen
                        ],
                        'column': [
                            c1,
                            c2
                        ]
                    });
                } else if (stc > c1 && edc < c2) {
                    let range = [
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                stc - 1
                            ]
                        },
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                edc + 1,
                                c2
                            ]
                        },
                        {
                            'row': [
                                r1 - rlen,
                                r2 - rlen
                            ],
                            'column': [
                                stc,
                                edc
                            ]
                        }
                    ];
                    newRange = newRange.concat(range);
                } else if (stc > c1) {
                    let range = [
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                c1,
                                stc - 1
                            ]
                        },
                        {
                            'row': [
                                r1 - rlen,
                                r2 - rlen
                            ],
                            'column': [
                                stc,
                                c2
                            ]
                        }
                    ];
                    newRange = newRange.concat(range);
                } else if (edc < c2) {
                    let range = [
                        {
                            'row': [
                                r1 - rlen,
                                r2 - rlen
                            ],
                            'column': [
                                c1,
                                edc
                            ]
                        },
                        {
                            'row': [
                                r1,
                                r2
                            ],
                            'column': [
                                edc + 1,
                                c2
                            ]
                        }
                    ];
                    newRange = newRange.concat(range);
                }
            } else if (edr >= r1) {
                if (str <= r1 && edr >= r2) {
                    if (stc > c1 && edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (stc > c1) {
                        let range = [{
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            }];
                        newRange = newRange.concat(range);
                    } else if (edc < c2) {
                        let range = [{
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            }];
                        newRange = newRange.concat(range);
                    }
                } else if (str > r1 && edr < r2) {
                    if (stc <= c1 && edc >= c2) {
                        newRange.push({
                            'row': [
                                r1,
                                r2 - rlen
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        });
                    } else if (stc > c1 && edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2 - rlen
                                ],
                                'column': [
                                    stc,
                                    edc
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (stc > c1) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2 - rlen
                                ],
                                'column': [
                                    stc,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2 - rlen
                                ],
                                'column': [
                                    c1,
                                    edc
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    }
                } else if (str > r1) {
                    if (stc <= c1 && edc >= c2) {
                        newRange.push({
                            'row': [
                                r1,
                                str - 1
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        });
                    } else if (stc > c1 && edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    stc,
                                    edc
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (stc > c1) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    stc,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    str - 1
                                ],
                                'column': [
                                    c1,
                                    edc
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    }
                } else if (edr < r2) {
                    if (stc <= c1 && edc >= c2) {
                        newRange.push({
                            'row': [
                                r1 - rlen,
                                r2 - rlen
                            ],
                            'column': [
                                c1,
                                c2
                            ]
                        });
                    } else if (stc > c1 && edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            },
                            {
                                'row': [
                                    r1 - rlen,
                                    r2 - rlen
                                ],
                                'column': [
                                    stc,
                                    edc
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (stc > c1) {
                        let range = [
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    c1,
                                    stc - 1
                                ]
                            },
                            {
                                'row': [
                                    r1 - rlen,
                                    r2 - rlen
                                ],
                                'column': [
                                    stc,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    } else if (edc < c2) {
                        let range = [
                            {
                                'row': [
                                    r1 - rlen,
                                    r2 - rlen
                                ],
                                'column': [
                                    c1,
                                    edc
                                ]
                            },
                            {
                                'row': [
                                    r1,
                                    r2
                                ],
                                'column': [
                                    edc + 1,
                                    c2
                                ]
                            }
                        ];
                        newRange = newRange.concat(range);
                    }
                }
            }
        }
        return newRange;
    }
    return {
        luckysheetextendData,
        getMoveRange
    };
});