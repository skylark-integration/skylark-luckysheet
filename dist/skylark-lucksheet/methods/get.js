/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","../store"],function(u,e){"use strict";const{chatatABC:t}=u;function n(u){for(let t=0;t<e.luckysheetfile.length;t++)if(e.luckysheetfile[t].index==u)return t;return null}return{getSheetIndex:n,getRangetxt:function(u,l,F){let c="";null==F&&(F=e.currentSheetIndex),u!=F&&(c=e.luckysheetfile[n(u)].name.replace(/'/g,"''"),/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/.test(c)?c+="!":c="'"+c+"'!");let r=l.row[0],i=l.row[1],s=l.column[0],o=l.column[1];return null==r&&null==i?c+t(s)+":"+t(o):null==s&&null==o?c+(r+1)+":"+(i+1):s==o&&r==i?c+t(s)+(r+1):c+t(s)+(r+1)+":"+t(o)+(i+1)},getluckysheet_select_save:function(){return e.luckysheet_select_save},getluckysheet_scroll_status:function(){return e.luckysheet_scroll_status},getluckysheetfile:function(u){return u&&e.luckysheetfile.forEach(u=>{u.chart&&u.chart.forEach(u=>{const t=e.getChartJson(u.chart_id);u.chartOptions=t})}),e.luckysheetfile},getconfig:function(){return e.config},getvisibledatarow:function(){return e.visibledatarow},getvisibledatacolumn:function(){return e.visibledatacolumn}}});
//# sourceMappingURL=../sourcemaps/methods/get.js.map
