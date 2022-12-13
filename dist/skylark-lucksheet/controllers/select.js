/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./menuButton","../global/formula","../global/dynamicArray","../global/location","../global/browser","./dataVerificationCtrl","../methods/get","../store","../global/method","../locale/locale"],function(e,l,t,s,c,o,h,u,i,n){"use strict";const{dynamicArrayHightShow:a}=t,{rowLocationByIndex:_,colLocationByIndex:y}=s,{getSheetIndex:v,getRangetxt:d}=h;function r(e,l,t){let s=$.extend(!0,{},e);for(let e=l;e<=t;e++)e in s||(s[e]=0);return s}function k(e){let l=[];for(let t in e)l.push(t);l.sort(function(e,l){return e-l});let t=[],s=[];if(l.length>1)for(let e=1;e<l.length;e++)l[e]-l[e-1]==1?(s.push(l[e-1]),e==l.length-1&&(s.push(l[e]),t.push(s))):1==e?e==l.length-1?(s.push(l[e-1]),t.push(s),t.push([l[e]])):t.push(l[0]):e==l.length-1?(s.push(l[e-1]),t.push(s),t.push([l[e]])):(s.push(l[e-1]),t.push(s),s=[]);else t.push([l[0]]);return t}function p(e,l,t,s,c,o){let h=c[1]-c[0]+1,i=o[1]-o[0]+1,a=u.luckysheetTableContentHW[0],_=u.luckysheetTableContentHW[1],y=$("#luckysheet-cell-main").scrollLeft(),v=$("#luckysheet-cell-main").scrollTop();const d=n().info;if(h>=4){let t=e-25;t<0&&(t=e+5),t<y&&(t=y+10);let c=l+s/2;s>_&&(c=v+_/2),$("#luckysheet-row-count-show").css({left:t,top:c,display:"block",width:"11px"}).html("<div>"+h.toString().split("").join("</div><div>")+"</div><div>"+d.row+"</div>")}else $("#luckysheet-row-count-show").hide();if(i>=4){let s=l-25;s<0&&(s=l+5),s<v&&(s=v+10);let c=e+t/2;t>a&&(c=y+a/2),$("#luckysheet-column-count-show").css({left:c,top:s,display:"block"}).text(i+d.column)}else $("#luckysheet-column-count-show").hide()}function f(){let e=u.luckysheet_select_save[u.luckysheet_select_save.length-1],l=e.row_focus,t=e.column_focus;null!=u.config.merge&&l+"_"+t in u.config.merge?$("#luckysheet-helpbox-cell").text(d(u.currentSheetIndex,{column:[t,t],row:[l,l]})):$("#luckysheet-helpbox-cell").text(d(u.currentSheetIndex,e))}return{seletedHighlistByindex:function(e,l,t,s,c){let o=u.visibledatarow[t],h=l-1==-1?0:u.visibledatarow[l-1],i=u.visibledatacolumn[c],n=s-1==-1?0:u.visibledatacolumn[s-1];$("#"+e).css({left:n,width:i-n-1,top:h,height:o-h-1})},selectHightlightShow:function(t=!1){if($("#luckysheet-cell-selected-boxs").show(),$("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").siblings(".luckysheet-cell-selected").remove(),u.luckysheet_select_save.length>0){for(let t=0;t<u.luckysheet_select_save.length;t++){let s,h,i=u.luckysheet_select_save[t].row[0],n=u.luckysheet_select_save[t].row[1],a=u.luckysheet_select_save[t].column[0],_=u.luckysheet_select_save[t].column[1];s=null==u.luckysheet_select_save[t].row_focus?i:u.luckysheet_select_save[t].row_focus,h=null==u.luckysheet_select_save[t].column_focus?a:u.luckysheet_select_save[t].column_focus;let y=u.visibledatarow[n],v=i-1==-1?0:u.visibledatarow[i-1],d=u.visibledatacolumn[_],r=a-1==-1?0:u.visibledatacolumn[a-1],k=u.visibledatarow[s],f=s-1==-1?0:u.visibledatarow[s-1],m=u.visibledatacolumn[h],g=h-1==-1?0:u.visibledatacolumn[h-1],w=e.mergeborer(u.flowdata,s,h);w&&(k=w.row[1],f=w.row[0],m=w.column[1],g=w.column[0]),u.luckysheet_select_save[t].row=[i,n],u.luckysheet_select_save[t].column=[a,_],u.luckysheet_select_save[t].row_focus=s,u.luckysheet_select_save[t].column_focus=h,u.luckysheet_select_save[t].left=g,u.luckysheet_select_save[t].width=m-g-1,u.luckysheet_select_save[t].top=f,u.luckysheet_select_save[t].height=k-f-1,u.luckysheet_select_save[t].left_move=r,u.luckysheet_select_save[t].width_move=d-r-1,u.luckysheet_select_save[t].top_move=v,u.luckysheet_select_save[t].height_move=y-v-1,0==t?1==u.luckysheet_select_save.length?c.mobilecheck()?$("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({left:u.luckysheet_select_save[t].left_move,width:u.luckysheet_select_save[t].width_move,top:u.luckysheet_select_save[t].top_move,height:u.luckysheet_select_save[t].height_move,display:"block",border:"1px solid #0188fb"}).find(".luckysheet-cs-draghandle").css("display","block").end().find(".luckysheet-cs-fillhandle").css("display","none").end().find(".luckysheet-cs-touchhandle").css("display","block"):$("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({left:u.luckysheet_select_save[t].left_move,width:u.luckysheet_select_save[t].width_move,top:u.luckysheet_select_save[t].top_move,height:u.luckysheet_select_save[t].height_move,display:"block",border:"1px solid #0188fb"}).find(".luckysheet-cs-draghandle").css("display","block").end().find(".luckysheet-cs-fillhandle").css("display","block").end().find(".luckysheet-cs-touchhandle").css("display","none"):$("#luckysheet-cell-selected-boxs #luckysheet-cell-selected").css({left:u.luckysheet_select_save[t].left_move,width:u.luckysheet_select_save[t].width_move,top:u.luckysheet_select_save[t].top_move,height:u.luckysheet_select_save[t].height_move,display:"block",border:"1px solid rgba(1, 136, 251, 0.15)"}).find(".luckysheet-cs-draghandle").css("display","none").end().find(".luckysheet-cs-fillhandle").css("display","none"):$("#luckysheet-cell-selected-boxs").append('<div class="luckysheet-cell-selected" style="left: '+u.luckysheet_select_save[t].left_move+"px; width: "+u.luckysheet_select_save[t].width_move+"px; top: "+u.luckysheet_select_save[t].top_move+"px; height: "+u.luckysheet_select_save[t].height_move+'px; border: 1px solid rgba(1, 136, 251, 0.15); display: block;"></div>'),t==u.luckysheet_select_save.length-1&&($("#luckysheet-cell-selected-focus").css({left:u.luckysheet_select_save[t].left,width:u.luckysheet_select_save[t].width,top:u.luckysheet_select_save[t].top,height:u.luckysheet_select_save[t].height,display:"block"}),p(u.luckysheet_select_save[t].left_move,u.luckysheet_select_save[t].top_move,u.luckysheet_select_save[t].width_move,u.luckysheet_select_save[t].height_move,[i,n],[a,_]),l.fucntionboxshow(s,h),o.cellFocus(s,h))}!function(e,l=!1){let t=$.extend(!0,[],e),s={},c={};for(let e=0;e<t.length;e++){let l=t[e].row[0],o=t[e].row[1],h=t[e].column[0],u=t[e].column[1];s=r(s,l,o),c=r(c,h,u)}$("#luckysheet-rows-h-selected").empty();let o=k(s);for(let e=0;e<o.length;e++){let l=o[e][0],t=o[e][o[e].length-1],s=_(t)[1],c=_(l)[0];$("#luckysheet-rows-h-selected").append('<div class="luckysheet-rows-h-selected" style="top: '+c+"px; height: "+(s-c-1)+'px; display: block; background-color: rgba(76, 76, 76, 0.1);"></div>')}$("#luckysheet-cols-h-selected").empty();let h=k(c);for(let e=0;e<h.length;e++){let l=h[e][0],t=h[e][h[e].length-1],s=y(t)[1],c=y(l)[0];$("#luckysheet-cols-h-selected").append('<div class="luckysheet-cols-h-selected" style="left: '+c+"px; width: "+(s-c-1)+'px; display: block; background-color: rgba(76, 76, 76, 0.1);"></div>')}}(u.luckysheet_select_save,t),f(),1==u.luckysheet_select_save.length&&u.luckysheet_select_save[0].row[0]==u.luckysheet_select_save[0].row[1]&&u.luckysheet_select_save[0].column[0]==u.luckysheet_select_save[0].column[1]&&a(u.luckysheet_select_save[0].row[0],u.luckysheet_select_save[0].column[0])}u.luckysheetfile[v(u.currentSheetIndex)].luckysheet_select_save=u.luckysheet_select_save;const s=JSON.stringify(u.luckysheet_select_save);null==u.luckysheet_select_save_previous|u.luckysheet_select_save_previous!==s&&i.createHookFunction("rangeSelect",u.luckysheetfile[v(u.currentSheetIndex)],u.luckysheet_select_save),u.luckysheet_select_save_previous=s},selectIsOverlap:function(e){null==e&&(e=u.luckysheet_select_save);let l=!1,t={};for(let s=0;s<e.length;s++){let c=e[s].row[0],o=e[s].row[1],h=e[s].column[0],u=e[s].column[1];for(let e=c;e<=o;e++)for(let s=h;s<=u;s++){if(e+"_"+s in t){l=!0;break}t[e+"_"+s]=0}}return l},selectionCopyShow:function(e){if($("#luckysheet-selection-copy").empty(),null==e&&(e=u.luckysheet_selection_range),e.length>0)for(let l=0;l<e.length;l++){let t=e[l].row[0],s=e[l].row[1],c=e[l].column[0],o=e[l].column[1],h=u.visibledatarow[s],i=t-1==-1?0:u.visibledatarow[t-1],n=u.visibledatacolumn[o],a=c-1==-1?0:u.visibledatacolumn[c-1],_='<div class="luckysheet-selection-copy" style="display: block; left: '+a+"px; width: "+(n-a-1)+"px; top: "+i+"px; height: "+(h-i-1)+'px;"><div class="luckysheet-selection-copy-top luckysheet-copy"></div><div class="luckysheet-selection-copy-right luckysheet-copy"></div><div class="luckysheet-selection-copy-bottom luckysheet-copy"></div><div class="luckysheet-selection-copy-left luckysheet-copy"></div><div class="luckysheet-selection-copy-hc"></div></div>';$("#luckysheet-selection-copy").append(_)}},collaborativeEditBox:function(){let e=u.visibledatacolumn,l=u.visibledatarow;u.cooperativeEdit.changeCollaborationSize.forEach(t=>{if(t.i==u.currentSheetIndex){let s=t.v.column,c=e[s[0]]-1;0!==t.v.column[0]&&(c=e[s[1]]-e[s[0]-1]-(s[1]-s[0]+1));let o=t.v.row,h=l[o[0]]-1;0!==t.v.row[0]&&(h=l[o[1]]-l[o[0]-1]-(o[1]-o[0]+1));let i=u.cooperativeEdit.merge_range,n=e[t.v.column[0]-1]-1,a=l[t.v.row[0]-1]-1;if(null!==u.config.columnlen)for(let e in u.config.columnlen)if(t.v.column[0]<=e&&e<=t.v.column[1]){u.luckysheet_cols_change_size_start[1]=e-0;break}if(null!==u.config.rowlen)for(let e in u.config.rowlen)if(t.v.row[0]<=e&&e<=t.v.row[1]){u.luckysheet_rows_change_size_start[1]=e-0;break}if(t.v.column[0]<=u.luckysheet_cols_change_size_start[1]&&u.luckysheet_cols_change_size_start[1]<=t.v.column[1])if(0==u.luckysheet_cols_change_size_start[1])c=e[0]-1;else{let l=t.v.column;c=e[l[1]]-e[l[0]-1]-(l[1]-l[0]+1)}if(t.v.row[0]<=u.luckysheet_rows_change_size_start[1]&&u.luckysheet_rows_change_size_start[1]<=t.v.row[1])if(0==u.luckysheet_rows_change_size_start[1])h=l[0]-1;else{let e=t.v.row;h=l[e[1]]-l[e[0]-1]-(e[1]-e[0]+1)}if(Object.keys(i).length>0){let u=!1;if(i.v.length>1&&(u=Object.keys(i.v[1][0]).length>0),i.v[0].length>1&&(u=Object.keys(i.v[0][1]).length>0),u){let s=i.column[0]<=t.v.column[0]&&i.column[1]>=t.v.column[1];if(n=e[i.column[0]-1]-1,a=l[i.row[0]-1]-1,c=e[i.column[1]]-1,h=l[i.row[1]]-1,s){if(0!==i.column[0]){let l=i.column;c=e[l[1]]-e[l[0]-1]-(l[1]-l[0]+1)}else n=0;t.v.column=i.column}if(i.row[0]<=t.v.row[0]&&i.row[1]>=t.v.row[1]){if(0!==i.row[0]){let e=i.row;h=l[e[1]]-l[e[0]-1]-(e[1]-e[0]+1)}else a=0;t.v.row=i.row}}else c=e[s[0]]-e[s[0]-1]-1,0===s[0]&&(c=e[s[0]]-1),h=l[o[0]]-l[o[0]-1]-1,0===o[0]&&(h=l[o[0]]-1)}$("#luckysheet-multipleRange-show-"+t.id).css({height:h,width:c,top:a+"px",left:n+"px"});let _=$("#luckysheet-multipleRange-show-"+t.id)[0].offsetHeight-1;$("#luckysheet-multipleRange-show-"+t.id+">.username").css({bottom:_+"px"})}})},luckysheet_count_show:p,selectHelpboxFill:f}});
//# sourceMappingURL=../sourcemaps/controllers/select.js.map