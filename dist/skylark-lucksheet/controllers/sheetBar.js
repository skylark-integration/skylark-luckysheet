/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./sheetmanage","./server","./constant","../utils/util","../methods/get","../global/validate","../global/formula","../global/cleargridelement","../global/tooltip","../global/cursorPos","../locale/locale","../store","./luckysheetConfigsetting","../global/api"],function(e,t,s,l,c,h,i,n,o,r,a,u,d,k){"use strict";const{sheetselectlistitemHTML:g,sheetselectlistHTML:f,keycode:y}=s,{replaceHtml:m,mouseclickposition:b}=l,{getSheetIndex:p}=c,{isEditMode:x}=h,{selectTextDom:v}=r,{pagerInit:S}=k;let _=!1,w=null,I=null,C="";function T(){if(!_){_=!0;const e=a();let s=e.toolbar;$("#luckysheetsheetconfigcolorur").spectrum({showPalette:!0,preferredFormat:"hex",clickoutFiresChange:!1,showInitial:!0,showInput:!0,flat:!0,hideAfterPaletteSelect:!1,showSelectionPalette:!0,maxPaletteSize:10,cancelText:e.sheetconfig.cancelText,chooseText:e.sheetconfig.chooseText,togglePaletteMoreText:s.toolMore,togglePaletteLessText:s.toolLess,clearText:s.clearText,noColorSelectedText:s.noColorSelectedText,palette:[["rgb(0, 0, 0)","rgb(67, 67, 67)","rgb(102, 102, 102)","rgb(204, 204, 204)","rgb(217, 217, 217)","rgb(255, 255, 255)"],["rgb(152, 0, 0)","rgb(255, 0, 0)","rgb(255, 153, 0)","rgb(255, 255, 0)","rgb(0, 255, 0)","rgb(0, 255, 255)","rgb(74, 134, 232)","rgb(0, 0, 255)","rgb(153, 0, 255)","rgb(255, 0, 255)"],["rgb(230, 184, 175)","rgb(244, 204, 204)","rgb(252, 229, 205)","rgb(255, 242, 204)","rgb(217, 234, 211)","rgb(208, 224, 227)","rgb(201, 218, 248)","rgb(207, 226, 243)","rgb(217, 210, 233)","rgb(234, 209, 220)"],["rgb(221, 126, 107)","rgb(234, 153, 153)","rgb(249, 203, 156)","rgb(255, 229, 153)","rgb(182, 215, 168)","rgb(162, 196, 201)","rgb(164, 194, 244)","rgb(159, 197, 232)","rgb(180, 167, 214)","rgb(213, 166, 189)"],["rgb(204, 65, 37)","rgb(224, 102, 102)","rgb(246, 178, 107)","rgb(255, 217, 102)","rgb(147, 196, 125)","rgb(118, 165, 175)","rgb(109, 158, 235)","rgb(111, 168, 220)","rgb(142, 124, 195)","rgb(194, 123, 160)"],["rgb(166, 28, 0)","rgb(204, 0, 0)","rgb(230, 145, 56)","rgb(241, 194, 50)","rgb(106, 168, 79)","rgb(69, 129, 142)","rgb(60, 120, 216)","rgb(61, 133, 198)","rgb(103, 78, 167)","rgb(166, 77, 121)"],["rgb(91, 15, 0)","rgb(102, 0, 0)","rgb(120, 63, 4)","rgb(127, 96, 0)","rgb(39, 78, 19)","rgb(12, 52, 61)","rgb(28, 69, 135)","rgb(7, 55, 99)","rgb(32, 18, 77)","rgb(76, 17, 48)"],["#c1232b","#27727b","#fcce10","#e87c25","#b5c334","#fe8463","#9bca63","#fad860","#f3a43b","#60c0dd","#d7504b","#c6e579","#f4e001","#f0805a","#26c0c0","#c12e34","#e6b600","#0098d9","#2b821d","#005eaa","#339ca8","#cda819","#32a487","#3fb1e3","#6be6c1","#626c91","#a0a7e6","#c4ebad","#96dee8"]],change:function(e){$(this);e=null!=e?e.toHexString():"rgb(0, 0, 0)";let s=null;w.find(".luckysheet-sheets-item-color").length>0&&(s=w.find(".luckysheet-sheets-item-color").css("background-color")),w.find(".luckysheet-sheets-item-color").remove(),w.append('<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: '+e+';"></div>');let l=p(u.currentSheetIndex);if(u.luckysheetfile[l].color=e,t.saveParam("all",u.currentSheetIndex,e,{k:"color"}),u.clearjfundo){let t={type:"sheetColor"};t.sheetIndex=u.currentSheetIndex,t.oldcolor=s,t.color=e,u.jfundo.length=0,u.jfredo.push(t)}}}),$("#luckysheetsheetconfigcolorreset").click(function(){let e=null;w.find(".luckysheet-sheets-item-color").length>0&&(e=w.find(".luckysheet-sheets-item-color").css("background-color")),w.find(".luckysheet-sheets-item-color").remove();let s=p(u.currentSheetIndex);if(u.luckysheetfile[s].color=null,t.saveParam("all",u.currentSheetIndex,null,{k:"color"}),u.clearjfundo){let t={type:"sheetColor"};t.sheetIndex=u.currentSheetIndex,t.oldcolor=e,t.color=null,u.jfundo.length=0,u.jfredo.push(t)}})}let e=p(u.currentSheetIndex);null!=u.luckysheetfile[e].color&&u.luckysheetfile[e].color.length>0&&$("#luckysheetsheetconfigcolorur").spectrum("set",u.luckysheetfile[e].color),$("#luckysheetsheetconfigcolorur").parent().find("span, div, button, input, a").addClass("luckysheet-mousedown-cancel");const s=d.sheetRightClickConfig;Object.values(s).every(e=>!e)||setTimeout(function(){b($("#luckysheet-rightclick-sheet-menu"),w.offset().left+w.width(),w.offset().top-18,"leftbottom")},1)}let A=function(t,s,l){clearTimeout(I),s.hasClass("luckysheet-sheets-item-name")&&"true"==s.attr("contenteditable")||(i.rangestart||i.rangedrag_column_start||i.rangedrag_row_start||i.israngeseleciton()?setTimeout(function(){i.setCaretPosition(i.rangeSetValueTo.get(0),0,i.rangeSetValueTo.text().length),i.createRangeHightlight(),$("#luckysheet-input-box-index").find(".luckysheet-input-box-index-sheettxt").remove().end().prepend("<span class='luckysheet-input-box-index-sheettxt'>"+e.getSheetName(i.rangetosheet)+"!</span>").show(),$("#luckysheet-input-box-index").css({left:$("#luckysheet-input-box").css("left"),top:parseInt($("#luckysheet-input-box").css("top"))-20+"px","z-index":$("#luckysheet-input-box").css("z-index")})},1):(parseInt($("#luckysheet-input-box").css("top"))>0&&i.updatecell(u.luckysheetCellUpdate[0],u.luckysheetCellUpdate[1]),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").remove()),$("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active"),t.addClass("luckysheet-sheets-item-active"),n(l),e.changeSheet(t.data("index")),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide(),(s.hasClass("luckysheet-sheets-item-menu")||s.hasClass("fa-sort-desc")||"3"==l.which)&&(w=s.closest(".luckysheet-sheets-item"),T()))};return{initialSheetBar:function(){const s=a().sheetconfig;$("#luckysheet-sheet-area").on("mousedown","div.luckysheet-sheets-item",function(e){if(x())return;let t=$(this),s=$(e.target),l=s.closest(".luckysheet-sheets-item");if("3"==e.which)return A(t,s,e),w=l,void T();l.hasClass("luckysheet-sheets-item-active")&&"false"==l.find(".luckysheet-sheets-item-name").attr("contenteditable")&&(I=setTimeout(function(){u.luckysheet_sheet_move_status=!0,u.luckysheet_sheet_move_data={},u.luckysheet_sheet_move_data.widthlist=[],$("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function(e){0==e?u.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth())):u.luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth())+u.luckysheet_sheet_move_data.widthlist[e-1])}),u.luckysheet_sheet_move_data.curindex=$("#luckysheet-sheet-area div.luckysheet-sheets-item").index(l);let t=e.pageX;u.luckysheet_sheet_move_data.curleft=t-l.offset().left,u.luckysheet_sheet_move_data.pageX=t,u.luckysheet_sheet_move_data.activeobject=l,u.luckysheet_sheet_move_data.cursorobject=s;let c=l.clone().css("visibility","hidden").attr("id","luckysheet-sheets-item-clone");l.after(c),l.css({position:"absolute",opacity:.8,cursor:"move",transition:"initial","z-index":10})},200))}).on("click","div.luckysheet-sheets-item",function(e){if(x())return;let s=$(this),l=$(e.target);A(s,l,e),t.keepHighLightBox()});let l=function(e){!1!==u.allowEdit&&(e.attr("contenteditable","true").addClass("luckysheet-mousedown-cancel").data("oldtxt",e.text()),setTimeout(function(){v(e.get(0))},1))};$("#luckysheet-sheet-area").on("dblclick","span.luckysheet-sheets-item-name",function(e){l($(this))});let c=!0;$("#luckysheet-sheet-area").on("compositionstart","span.luckysheet-sheets-item-name",()=>c=!1),$("#luckysheet-sheet-area").on("compositionend","span.luckysheet-sheets-item-name",()=>c=!0),$("#luckysheet-sheet-area").on("input","span.luckysheet-sheets-item-name",function(){if(!1===u.allowEdit)return;if(!1===u.limitSheetNameLength)return;let e=u.defaultSheetNameMaxLength;0!==e&&setTimeout(()=>{c&&$(this).text().length>=e&&setTimeout(()=>{$(this).text($(this).text().substring(0,e));let t=window.getSelection();t.selectAllChildren(this),t.collapseToEnd()},0)},0)}),$("#luckysheet-sheet-area").on("blur","span.luckysheet-sheets-item-name",function(c){if(!1===u.allowEdit)return;if(0===$(this).text().length)return alert(s.sheetNamecannotIsEmptyError),void setTimeout(()=>{$(this).text(C),l($(this)),$(this).focus()},1);let h=$(this),i=h.text(),n=h.data("oldtxt");if(i.length>31||"'"==i.charAt(0)||"'"==i.charAt(i.length-1)||/[：\:\\\/？\?\*\[\]]+/.test(i))return alert(s.sheetNameSpecCharError),void setTimeout(()=>{l($(this)),$(this).focus()},1);let r=p(u.currentSheetIndex);for(let e=0;e<u.luckysheetfile.length;e++)if(r!=e&&u.luckysheetfile[e].name==i)return x()?alert(s.tipNameRepeat):o.info("",s.tipNameRepeat),void h.text(n).attr("contenteditable","false");if(e.sheetArrowShowAndHide(),u.luckysheetfile[r].name=i,t.saveParam("all",u.currentSheetIndex,i,{k:"name"}),h.attr("contenteditable","false").removeClass("luckysheet-mousedown-cancel"),u.clearjfundo){let e={type:"sheetName"};e.sheetIndex=u.currentSheetIndex,e.oldtxt=n,e.txt=i,u.jfundo.length=0,u.jfredo.push(e)}}),$("#luckysheet-sheet-area").on("keydown","span.luckysheet-sheets-item-name",function(e){if(!1===u.allowEdit)return;let t=e.keyCode,s=$(this);if(t==y.ENTER){let e=p(u.currentSheetIndex);C=u.luckysheetfile[e].name||C,u.luckysheetfile[e].name=s.text(),s.attr("contenteditable","false")}}),$("#luckysheetsheetconfigrename").click(function(){l(w.find("span.luckysheet-sheets-item-name")),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide()}),$("#luckysheetsheetconfigshow").click(function(){$("#luckysheet-sheets-m").click(),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-rightclick-sheet-menu").hide()}),$("#luckysheetsheetconfigmoveleft").click(function(){w.prevAll(":visible").length>0&&(w.insertBefore(w.prevAll(":visible").eq(0)),e.reOrderAllSheet()),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide()}),$("#luckysheetsheetconfigmoveright").click(function(){w.nextAll(":visible").length>0&&(w.insertAfter(w.nextAll(":visible").eq(0)),e.reOrderAllSheet()),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide()}),$("#luckysheetsheetconfigdelete").click(function(t){if($("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide(),$("#luckysheet-sheet-container-c .luckysheet-sheets-item:visible").length<=1)return void(x()?alert(s.noMoreSheet):o.info(s.noMoreSheet,""));let l=p(u.currentSheetIndex);o.confirm(s.confirmDelete+"【"+u.luckysheetfile[l].name+"】？","<span style='color:#9e9e9e;font-size:12px;'>"+s.redoDelete+"</span>",function(){e.deleteSheet(w.data("index"))},null),$("#luckysheet-input-box").removeAttr("style")}),$("#luckysheetsheetconfigcopy").click(function(t){e.copySheet(w.data("index"),t),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide()}),$("#luckysheetsheetconfighide").click(function(){1!=$("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").length?(e.setSheetHide(w.data("index")),$("#luckysheet-input-box").removeAttr("style"),$("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide()):x()?alert(s.noHide):o.info("",s.noHide)}),$("#luckysheet-sheets-add").click(function(t){parseInt($("#luckysheet-input-box").css("top"))>0&&i.updatecell(u.luckysheetCellUpdate[0],u.luckysheetCellUpdate[1]),e.addNewSheet(t),e.locationSheet(),$("#luckysheet-input-box").removeAttr("style")});let h=null,n=0,r=0;$("#luckysheet-sheets-leftscroll").click(function(){let e=$("#luckysheet-sheet-container-c");n=e.scrollLeft(),(r=e.scrollLeft()-150)<=0&&$("#luckysheet-sheet-container .docs-sheet-fade-left").hide(),$("#luckysheet-sheet-container .docs-sheet-fade-right").show(),clearInterval(h),h=setInterval(function(){n-=4,e.scrollLeft(n),n<=r&&clearInterval(h)},1)}),$("#luckysheet-sheets-rightscroll").click(function(){let e=$("#luckysheet-sheet-container-c");n=e.scrollLeft(),r=e.scrollLeft()+150,n>0&&$("#luckysheet-sheet-container .docs-sheet-fade-right").hide(),$("#luckysheet-sheet-container .docs-sheet-fade-left").show(),clearInterval(h),h=setInterval(function(){n+=4,e.scrollLeft(n),n>=r&&clearInterval(h)},1)});let k=!0;$("#luckysheet-sheets-m").click(function(l){parseInt($("#luckysheet-input-box").css("top"))>0&&i.updatecell(u.luckysheetCellUpdate[0],u.luckysheetCellUpdate[1]),$("#luckysheet-sheet-list").html("");let c="";for(let e=0;e<u.luckysheetfile.length;e++){let t=u.luckysheetfile[e],s="",l="";1==t.status&&(s='<i class="fa fa-check" aria-hidden="true"></i>'),1==t.hide&&(s='<i class="fa fa-low-vision" aria-hidden="true"></i>',l+="color:#BBBBBB;"),null!=t.color&&t.color.length>0&&(l+="border-right:4px solid "+t.color+";"),c+=m(g,{index:t.index,name:t.name,icon:s,style:l})}k?($("#"+u.container).append(m(f,{item:c})),$("#luckysheet-sheet-list").on("click",".luckysheet-cols-menuitem",function(l){if(x())return void alert(s.chartEditNoOpt);let c=$(this),h=c.data("index");c.data("index")!=u.currentSheetIndex&&(e.setSheetShow(h),e.locationSheet()),t.keepHighLightBox()}),k=!1):$("#luckysheet-sheet-list").html(c);let h=$("#luckysheet-sheet-list"),n=$(this).offset().left-$("#"+u.container).offset().left,o=$(this).height()+$("#luckysheet-sta-content").height()+12;h.css({left:n+"px",bottom:o+"px"}).show(),$("#luckysheet-input-box").removeAttr("style")}),d.pager&&S(d.pager)}}});
//# sourceMappingURL=../sourcemaps/controllers/sheetBar.js.map