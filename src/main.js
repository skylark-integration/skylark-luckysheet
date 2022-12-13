define([
    "skylark-langx-ns",
    "skylark-jquery",
    './core'
], function (skylark,$,m_core) {
    'use strict';
    const {luckysheet} = m_core;

    window.$ = $;
    window.luckysheet = luckysheet;

    skylark.attach("intg.luckysheet",luckysheet);
    return luckysheet;
});