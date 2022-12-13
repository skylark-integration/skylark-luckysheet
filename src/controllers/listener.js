define([
    '../utils/util',
    '../store',
    '../methods/luckysheetConfigsetting',
    '../methods/get',
    '../global/api'
], function (m_util, Store, luckysheetConfigsetting, m_get, m_api) {
    'use strict';
    const {createProxy} = m_util;
    const {getluckysheetfile} = m_get;
    const {toJson} = m_api;
    const initListener = function () {
        // createProxy(Store,['jfredo']);
        createProxy(Store, 'jfredo', (target, property, val, receiver) => {
            if (property !== 'length') {
                //  钩子函数
                luckysheetConfigsetting.createHookFunction('updated', val);
            }
        });
        createProxy(Store, 'asyncLoad', (target, property, val, receiver) => {
            if (property === 'length' && val === 0) {
                luckysheetConfigsetting.createHookFunction('workbookCreateAfter', toJson());
            }
        });
    };
    return { initListener };
});