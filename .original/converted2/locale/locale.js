define([
    './en',
    './zh',
    './es',
    './zh_tw',
    '../store'
], function (en, zh, es, zh_tw, Store) {
    'use strict';
    const localeObj = {
        en,
        zh,
        es,
        zh_tw
    };
    function locale() {
        return localeObj[Store.lang];
    }
    return locale;
});