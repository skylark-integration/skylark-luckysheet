/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../store","./getdata","./validate","./format","../locale/locale"],function(e,t,n,s,a){"use strict";const{getdatabyselectionNoCopy:l}=t,{isRealNull:i,isRealNum:c}=n,{update:o}=s;return{countfunc:function(){if(0==e.luckysheet_select_save.length)return;let t=1/0,n=-1/0,s=0,u=0;for(let a=0;a<e.luckysheet_select_save.length;a++){let o=l(e.luckysheet_select_save[a]);for(let e=0;e<o.length;e++)for(let a=0;a<o[0].length;a++){if(i(o[e][a]))continue;if(u++,null!=o[e][a].ct&&"d"==o[e][a].ct.t)continue;let l=o[e][a].v;c(l)&&(s+=l=parseFloat(l),l<t&&(t=l),l>n&&(n=l))}}let r=a().formula,p="";p+="<span>"+r.count+":"+u+"</span>",(isFinite(n)||isFinite(t))&&(p+="<span>"+r.sum+":"+o("w",s)+"</span>",p+="<span>"+r.average+":"+o("w",Math.round(s/u*1e4)/1e4)+"</span>"),isFinite(n)&&(p+="<span>"+r.max+":"+o("w",n)+"</span>"),isFinite(t)&&(p+="<span>"+r.min+":"+o("w",t)+"</span>"),$("#luckysheet-sta-content").html(p)}}});
//# sourceMappingURL=../sourcemaps/global/count.js.map
