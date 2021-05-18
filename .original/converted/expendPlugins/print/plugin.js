define(['../../utils/util'], function (a) {
    'use strict';
    const dependScripts = ['http://localhost:8080/luckysheetPluginPrint.umd.js'];
    const dependLinks = ['http://localhost:8080/luckysheetPluginPrint.css'];
    function print(data, isDemo) {
        a.loadLinks(dependLinks);
        a.seriesLoadScripts(dependScripts, null, function () {
        });
    }
    return { print };
});