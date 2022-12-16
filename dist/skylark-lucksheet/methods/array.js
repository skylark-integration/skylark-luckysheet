/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./getdata"],function(o){"use strict";const{getcellvalue:l}=o;return{transpose:function(o,n=!0){let u=[];if(0==o.length)return[];if(0==o[0].length)return[];for(let r=0;r<o[0].length;r++){let c=[];for(let u=0;u<o.length;u++){let t="";null!=o[u]&&null!=o[u][r]&&(t=n?l(u,r,o):o[u][r]),c.push(t)}u.push(c)}return u},minusClear:function(o,l){if(l.row[0]>o.row[1]||l.row[1]<o.row[0]||l.column[0]>o.column[1]||l.column[1]<o.column[0])return null;if(l.row[0]==o.row[0]&&l.row[1]<o.row[1]&&l.column[0]>o.column[0]&&l.column[1]<o.column[1])return[];let n=[],u=null,r=[o.column[0],o.column[1]];l.row[1]>o.row[0]&&l.row[1]<o.row[1]?u=[l.row[1]+1,o.row[1]]:l.row[0]>o.row[0]&&l.row[0]<o.row[1]&&(u=[o.row[0],l.row[0]-1]),null!=u&&n.push({row:u,column:r});let c=[o.row[0],o.row[1]],t=null;return l.column[1]>o.column[0]&&l.column[1]<o.column[1]?t=[l.column[1]+1,o.column[1]]:l.column[0]>o.column[0]&&l.column[0]<o.column[1]&&(t=[o.column[0],l.column[0]-1]),null!=t&&n.push({row:c,column:t}),n}}});
//# sourceMappingURL=../sourcemaps/methods/array.js.map
