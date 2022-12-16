/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../methods/cells","../store","../vendors/flatpickr","skylark-moment","../methods/format"],function(e,t,l,a,r){"use strict";const{update:c,datenum_local:o}=r;return{cellFocus:function(r,s,n){let i=t.visibledatarow[r],d=0==r?0:t.visibledatarow[r-1],m=t.visibledatacolumn[s],u=0==s?0:t.visibledatacolumn[s-1],p=e.mergeborer(t.flowdata,r,s),h=n.ct.fa||"YYYY-MM-DD",f=c("yyyy-MM-dd hh:mm:ss",n.v),g=(e=>{let t=e.replace(/y/g,"Y");return(t=(t=(t=(t=(t=(t=(t=(t=(t=t.replace(/d/g,"D")).replace(/h/g,"H")).replace(/上午\/下午/g,"A")).replace(/上午/g,"A")).replace(/下午/g,"A")).replace(/AM\/PM/g,"A")).replace(/AM/g,"A")).replace(/PM/g,"A")).replace(/\"/g,"")).includes("A")&&(t=t.replace(/H/g,"h")),t})(h),A=!1,M=!1,y=!1,b=!0,w=!1;p&&(i=p.row[1],d=p.row[0],m=p.column[1],u=p.column[0]),$(".cell-date-picker").show().css({width:m-u+1,height:i-d+1,left:u,top:d}),/[上午下午]/.test(h)&&(w=!0),/[Hhms]/.test(g)&&(A=!0),/[YMD]/.test(g)||(M=!0),/s/.test(g)&&(y=!0),/A/.test(g)&&(b=!1);const D=l("#luckysheet-input-box",{allowInput:!1,noCalendar:M,enableSeconds:y,enableTime:A,dateFormat:g,time_24hr:b,defaultDate:f,onClose(){setTimeout(()=>{D.destroy()},0)},parseDate:(e,t)=>a(e).toDate(),formatDate:(e,t,l)=>w?a(e).format(t).replace("AM","上午").replace("PM","下午"):a(e).format(t),onChange:function(e,t){let l=o(new Date(e));$("#luckysheet-rich-text-editor").html(t),setCellValue(r,s,l,{isRefresh:!1}),setCellFormat(r,s,"ct",n.ct)}});$("#luckysheet-input-box").click()}}});
//# sourceMappingURL=../sourcemaps/widgets/cellDatePickerCtrl.js.map
