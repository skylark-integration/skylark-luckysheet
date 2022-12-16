/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","../methods/validate","../methods/datecontroll","../methods/luckysheetConfigsetting","../store","../vendors/numeral"],function(e,t,l,o,u,n){"use strict";const{getObjType:r}=e,{isRealNull:a,isRealNum:i}=t,{isdatetime:c,diff:v}=l;o.isEditMode;return{orderbydata:function(e,t,l){null==l&&(l=!0);let o=function(e,l){let o=e[t],u=l[t];return"object"==r(e[t])&&(o=e[t].v),"object"==r(l[t])&&(u=l[t].v),a(o)?1:a(u)?-1:c(o)&&c(u)?v(o,u):i(o)&&i(u)?n(o).value()-n(u).value():i(o)||i(u)?i(o)?i(u)?void 0:-1:1:o.localeCompare(u,"zh")},u=function(e,l){let o=e[t],u=l[t];return"object"==r(e[t])&&(o=e[t].v),"object"==r(l[t])&&(u=l[t].v),a(o)?1:a(u)?-1:c(o)&&c(u)?v(u,o):i(o)&&i(u)?n(u).value()-n(o).value():i(o)||i(u)?i(o)?i(u)?void 0:1:-1:u.localeCompare(o,"zh")};return l?e.sort(o):e.sort(u)},orderbydata1D:function(e,t){null==t&&(t=!0);let l=function(e,t){let l=e,o=t;return"object"==r(e)&&(l=e.v),"object"==r(t)&&(o=t.v),null==l&&(l=""),null==o&&(o=""),c(l)&&c(o)?v(l,o):i(l)&&i(o)?n(l).value()-n(o).value():i(l)||i(o)?i(l)?i(o)?void 0:-1:1:l.localeCompare(o,"zh")},o=function(e,t){let l=e,o=t;return"object"==r(e)&&(l=e.v),"object"==r(t)&&(o=t.v),null==l&&(l=""),null==o&&(o=""),c(l)&&c(o)?v(o,l):i(l)&&i(o)?n(o).value()-n(l).value():i(l)||i(o)?i(l)?i(o)?void 0:1:-1:o.localeCompare(l,"zh")};return t?e.sort(l):e.sort(o)}}});
//# sourceMappingURL=../sourcemaps/methods/sort_methods.js.map
