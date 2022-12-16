/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","../store","../methods/luckysheetConfigsetting","../methods/get","../global/api"],function(e,t,o,n,i){"use strict";const{createProxy:r}=e,{getluckysheetfile:s}=n,{toJson:c}=i;return{initListener:function(){r(t,"jfredo",(e,t,n,i)=>{"length"!==t&&o.createHookFunction("updated",n)}),r(t,"asyncLoad",(e,t,n,i)=>{"length"===t&&0===n&&o.createHookFunction("workbookCreateAfter",c())})}}});
//# sourceMappingURL=../sourcemaps/controllers/listener.js.map
