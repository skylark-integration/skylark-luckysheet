/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util"],function(n){"use strict";const{getObjType:r}=n;return{parseJsonParm:function(n){if(null==n)return{};if("string"!=r(n))return n;try{return new Function("return "+n)()}catch(n){return{}}},hasKey:function(n){let r=this.parseJsonParm(n);for(let n in r)return!0;return!1}}});
//# sourceMappingURL=../sourcemaps/methods/json.js.map
