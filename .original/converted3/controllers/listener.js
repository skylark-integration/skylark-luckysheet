define([
    '../utils/util',
    '../store/index',
    '../global/method',
    '../methods/get',
    '../global/api'
], function (m_util, Store, method, m_get, m_api) {
    'use strict';
    const {createProxy} = m_util;
    const {getluckysheetfile} = m_get;
    const {toJson} = m_api;
    const initListener = function () {
        // createProxy(Store,['jfredo']);
        createProxy(Store, 'jfredo', (target, property, val, receiver) => {
            if (property !== 'length') {
                //  钩子函数
                method.createHookFunction('updated', val);
            }
        });
        createProxy(Store, 'asyncLoad', (target, property, val, receiver) => {
            if (property === 'length' && val === 0) {
                method.createHookFunction('workbookCreateAfter', toJson());
            }
        });
    };
    return { initListener };
});