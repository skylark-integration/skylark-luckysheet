/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./validate","skylark-moment"],function(t,e){"use strict";const{hasChinaword:n}=t;function r(t){return!(null==t||t.toString().length<5)&&!!function(t){if(!/^(\d{4})-(\d{1,2})-(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/.test(t)&&!/^(\d{4})\/(\d{1,2})\/(\d{1,2})(\s(\d{1,2}):(\d{1,2})(:(\d{1,2}))?)?$/.test(t))return!1;var e=RegExp.$1,n=RegExp.$2,r=RegExp.$3;if(e<1900)return!1;if(n>12)return!1;if(r>31)return!1;if(2==n){if(29==new Date(e,1,29).getDate()&&r>29)return!1;if(29!=new Date(e,1,29).getDate()&&r>28)return!1}return!0}(t)}return{isdatetime:r,diff:function(t,n){return e(t).diff(e(n))},isdatatypemulti:function(t){let e={};return r(t)&&(e.date=!0),isNaN(parseFloat(t))||n(t)||(e.num=!0),e},isdatatype:function(t){let e="string";return r(t)?e="date":isNaN(parseFloat(t))||n(t)||(e="num"),e}}});
//# sourceMappingURL=../sourcemaps/global/datecontroll.js.map
