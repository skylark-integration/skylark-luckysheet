/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","../store"],function(c,r){"use strict";const e={v:"#VALUE!",n:"#NAME?",na:"#N/A",r:"#REF!",d:"#DIV/0!",nm:"#NUM!",nl:"#NULL!",sp:"#SPILL!"},{isRealNull:i,isRealNum:s,hasChinaword:f}=c;return{error:e,isRealNull:i,isRealNum:s,valueIsError:function(c){let r=!1;for(let i in e)if(c==e[i]){r=!0;break}return r},hasChinaword:f,hasPartMC:function(c,e,i,s,f){let a=!1;for(let t in r.config.merge){let r=c.merge[t];if(e<r.r){if(i>=r.r&&i<r.r+r.rs-1){if(s>=r.c&&s<=r.c+r.cs-1){a=!0;break}if(f>=r.c&&f<=r.c+r.cs-1){a=!0;break}if(s<r.c&&f>r.c+r.cs-1){a=!0;break}}else if(i>=r.r&&i==r.r+r.rs-1){if(s>r.c&&s<r.c+r.cs-1){a=!0;break}if(f>r.c&&f<r.c+r.cs-1){a=!0;break}if(s==r.c&&f<r.c+r.cs-1){a=!0;break}if(s>r.c&&f==r.c+r.cs-1){a=!0;break}}else if(i>r.r+r.rs-1){if(s>r.c&&s<=r.c+r.cs-1){a=!0;break}if(f>=r.c&&f<r.c+r.cs-1){a=!0;break}if(s==r.c&&f<r.c+r.cs-1){a=!0;break}if(s>r.c&&f==r.c+r.cs-1){a=!0;break}}}else if(e==r.r){if(i<r.r+r.rs-1){if(s>=r.c&&s<=r.c+r.cs-1){a=!0;break}if(f>=r.c&&f<=r.c+r.cs-1){a=!0;break}if(s<r.c&&f>r.c+r.cs-1){a=!0;break}}else if(i>=r.r+r.rs-1){if(s>r.c&&s<=r.c+r.cs-1){a=!0;break}if(f>=r.c&&f<r.c+r.cs-1){a=!0;break}if(s==r.c&&f<r.c+r.cs-1){a=!0;break}if(s>r.c&&f==r.c+r.cs-1){a=!0;break}}}else if(e<=r.r+r.rs-1){if(s>=r.c&&s<=r.c+r.cs-1){a=!0;break}if(f>=r.c&&f<=r.c+r.cs-1){a=!0;break}if(s<r.c&&f>r.c+r.cs-1){a=!0;break}}}return a},checkWordByteLength:function(c){return Math.ceil(c.charCodeAt().toString(2).length/8)}}});
//# sourceMappingURL=../sourcemaps/methods/validate.js.map
