define([
    '../utils/browser',
    '../methods/formula_methods',
    '../methods/getdata',
    '../methods/get',
    '../store'
], function (browser, formula, m_getdata, m_get, Store) {
    'use strict';
    const {datagridgrowth} = m_getdata;
    const {getSheetIndex} = m_get;
    const editor = {
        /**
     * @param {Array} dataChe 
     * @param {Object} range 是否指定选区，默认为当前选区
     * @since Add range parameter. Update by siwei@2020-09-10. 
     */
        controlHandler: function (dataChe, range) {
            let _this = this;
            let d = _this.deepCopyFlowData(Store.flowdata);
            //取数据
            // let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let last = range || Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let curR = last['row'] == null ? 0 : last['row'][0];
            let curC = last['column'] == null ? 0 : last['column'][0];
            let rlen = dataChe.length, clen = dataChe[0].length;
            let addr = curR + rlen - d.length, addc = curC + clen - d[0].length;
            if (addr > 0 || addc > 0) {
                d = datagridgrowth([].concat(d), addr, addc, true);
            }
            for (let r = 0; r < rlen; r++) {
                let x = [].concat(d[r + curR]);
                for (let c = 0; c < clen; c++) {
                    let value = '';
                    if (dataChe[r] != null && dataChe[r][c] != null) {
                        value = dataChe[r][c];
                    }
                    x[c + curC] = value;
                }
                d[r + curR] = x;
            }
            if (addr > 0 || addc > 0) {
                ///jfrefreshgridall(d[0].length, d.length, d, null, Store.luckysheet_select_save, 'datachangeAll');
                Store.refreshGridAll(d[0].length, d.length, d, null, Store.luckysheet_select_save, 'datachangeAll');
            } else {
                ///jfrefreshrange(d, Store.luckysheet_select_save);
                Store.refreshRange(d, Store.luckysheet_select_save);
            }
        },
        clearRangeByindex: function (st_r, ed_r, st_c, ed_c, sheetIndex) {
            let index = getSheetIndex(sheetIndex);
            let d = $.extend(true, [], Store.luckysheetfile[index]['data']);
            for (let r = st_r; r <= ed_r; r++) {
                let x = [].concat(d[r]);
                for (let c = st_c; c <= ed_c; c++) {
                    formula.delFunctionGroup(r, c);
                    formula.execFunctionGroup(r, c, '');
                    x[c] = null;
                }
                d[r] = x;
            }
            if (sheetIndex == Store.currentSheetIndex) {
                let rlen = ed_r - st_r + 1, clen = ed_c - st_c + 1;
                if (rlen > 5000) {
                    Store.refreshRange(d, [{
                            'row': [
                                st_r,
                                ed_r
                            ],
                            'column': [
                                st_c,
                                ed_c
                            ]
                        }]);
                } else {
                    jfrefreshrange(d, {
                        'row': [
                            st_r,
                            ed_r
                        ],
                        'column': [
                            st_c,
                            ed_c
                        ]
                    });
                }
            } else {
                Store.luckysheetfile[index]['data'] = d;
            }
        },
        controlHandlerD: function (dataChe) {
            let _this = this;
            let d = _this.deepCopyFlowData(Store.flowdata); 
            //取数据
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let r1 = last['row'][0], r2 = last['row'][1];
            let c1 = last['column'][0], c2 = last['column'][1];
            let rlen = dataChe.length, clen = dataChe[0].length;
            let addr = r1 + rlen - d.length, addc = c1 + clen - d[0].length;
            if (addr > 0 || addc > 0) {
                d = datagridgrowth([].concat(d), addr, addc, true);
            }
            for (let r = r1; r <= r2; r++) {
                for (let c = c1; c <= c2; c++) {
                    d[r][c] = null;
                }
            }
            for (let i = 0; i < rlen; i++) {
                for (let j = 0; j < clen; j++) {
                    d[r1 + i][c1 + j] = dataChe[i][j];
                }
            }
            let range = [
                {
                    'row': [
                        r1,
                        r2
                    ],
                    'column': [
                        c1,
                        c2
                    ]
                },
                {
                    'row': [
                        r1,
                        r1 + rlen - 1
                    ],
                    'column': [
                        c1,
                        c1 + clen - 1
                    ]
                }
            ];
            Store.refreshRange(d, range);
        }
    };

    editor.deepCopyFlowData = Store.deepCopyFlowData.bind(Store);
    editor.webWorkerFlowDataCache = Store.webWorkerFlowDataCache.bind(Store);
    
    return editor;
});