define([
    '../expendPlugins/chart/plugin',
    '../expendPlugins/print/plugin'
], function (m_plugin, m_plugin_a) {
    'use strict';
    const {chart} = m_plugin;
    const {print} = m_plugin_a;
    const pluginsObj = {
        'chart': chart,
        'print': print
    };
    const isDemo = true;    /**
 * Register plugins
 */
    /**
 * Register plugins
 */
    function initPlugins(plugins, data) {
        if (plugins.length) {
            plugins.forEach(plugin => {
                pluginsObj[plugin](data, isDemo);
            });
        }
    }
    return { initPlugins };
});