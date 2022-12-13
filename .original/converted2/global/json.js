define(['../utils/util'], function (m_util) {
    'use strict';
    const json = {
        parseJsonParm: function (obj) {
            if (obj == null) {
                return {};
            } else if (m_util.getObjType(obj) == 'string') {
                try {
                    let json = new Function('return ' + obj)();
                    return json;
                } catch (e) {
                    return {};
                }
            } else {
                return obj;
            }
        },
        hasKey: function (obj) {
            let _this = this;
            let json = _this.parseJsonParm(obj);
            for (let item in json) {
                return true;
            }
            return false;
        }
    };
    return json;
});