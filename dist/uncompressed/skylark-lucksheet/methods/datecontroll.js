define([
    'skylark-moment',
    "../utils/util"
], function (dayjs,m_util) {
    'use strict';
    const {isdatetime, isdatatypemulti,isdatatype} = m_util;

    function diff(now, then) {
        return dayjs(now).diff(dayjs(then));
    }


    return {
        isdatetime,
        diff,
        isdatatypemulti,
        isdatatype
    };
});