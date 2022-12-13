define([
    '../expendPlugins/chart/plugin',
    '../expendPlugins/print/plugin'
], function (a, b) {
    'use strict';
    const pluginsObj = {
        'chart': a.chart,
        'print': b.print
    };
    const isDemo = true;
    function initPlugins(plugins, data) {
        if (plugins.length) {
            plugins.forEach(plugin => {
                pluginsObj[plugin](data, isDemo);
            });
        }
    }
    return { initPlugins };
});