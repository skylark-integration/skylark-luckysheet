/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../controllers/luckysheetConfigsetting","../store"],function(c,e){"use strict";const r={v:"#VALUE!",n:"#NAME?",na:"#N/A",r:"#REF!",d:"#DIV/0!",nm:"#NUM!",nl:"#NULL!",sp:"#SPILL!"};return{error:r,isRealNull:function(c){return null==c||""==c.toString().replace(/\s/g,"")},isRealNum:function(c){return null!=c&&""!==c.toString().replace(/\s/g,"")&&"boolean"!=typeof c&&!isNaN(c)},valueIsError:function(c){let e=!1;for(let i in r)if(c==r[i]){e=!0;break}return e},hasChinaword:function(c){return!!/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.exec(c)},isEditMode:function(){return!!c.editMode},hasPartMC:function(c,r,i,s,n){let f=!1;for(let t in e.config.merge){let e=c.merge[t];if(r<e.r){if(i>=e.r&&i<e.r+e.rs-1){if(s>=e.c&&s<=e.c+e.cs-1){f=!0;break}if(n>=e.c&&n<=e.c+e.cs-1){f=!0;break}if(s<e.c&&n>e.c+e.cs-1){f=!0;break}}else if(i>=e.r&&i==e.r+e.rs-1){if(s>e.c&&s<e.c+e.cs-1){f=!0;break}if(n>e.c&&n<e.c+e.cs-1){f=!0;break}if(s==e.c&&n<e.c+e.cs-1){f=!0;break}if(s>e.c&&n==e.c+e.cs-1){f=!0;break}}else if(i>e.r+e.rs-1){if(s>e.c&&s<=e.c+e.cs-1){f=!0;break}if(n>=e.c&&n<e.c+e.cs-1){f=!0;break}if(s==e.c&&n<e.c+e.cs-1){f=!0;break}if(s>e.c&&n==e.c+e.cs-1){f=!0;break}}}else if(r==e.r){if(i<e.r+e.rs-1){if(s>=e.c&&s<=e.c+e.cs-1){f=!0;break}if(n>=e.c&&n<=e.c+e.cs-1){f=!0;break}if(s<e.c&&n>e.c+e.cs-1){f=!0;break}}else if(i>=e.r+e.rs-1){if(s>e.c&&s<=e.c+e.cs-1){f=!0;break}if(n>=e.c&&n<e.c+e.cs-1){f=!0;break}if(s==e.c&&n<e.c+e.cs-1){f=!0;break}if(s>e.c&&n==e.c+e.cs-1){f=!0;break}}}else if(r<=e.r+e.rs-1){if(s>=e.c&&s<=e.c+e.cs-1){f=!0;break}if(n>=e.c&&n<=e.c+e.cs-1){f=!0;break}if(s<e.c&&n>e.c+e.cs-1){f=!0;break}}}return f},checkWordByteLength:function(c){return Math.ceil(c.charCodeAt().toString(2).length/8)}}});
//# sourceMappingURL=../sourcemaps/global/validate.js.map
