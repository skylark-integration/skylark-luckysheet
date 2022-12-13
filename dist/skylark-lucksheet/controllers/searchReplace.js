/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","../methods/get","./constant","./select","./sheetmanage","../global/validate","../global/format","../global/setdata","../global/refresh","../global/editor","../global/tooltip","../global/func_methods","../store","../locale/locale"],function(e,l,t,c,s,a,r,n,h,o,i,u,p,d){"use strict";const{replaceHtml:k,chatatABC:y}=e,{getSheetIndex:f}=l,{modelHTML:v,keycode:b}=t,{selectHightlightShow:g}=c,{isEditMode:_}=a,{valueShowEs:x}=r,{setcellvalue:m}=n,{jfrefreshgrid:w}=h;return{createDialog:function(e){$("#luckysheet-modal-dialog-mask").hide(),$("#luckysheet-search-replace").remove();const l=d(),t=l.findAndReplace,c=l.button;let s='<div class="tabBox"><span id="searchTab">'+t.find+'</span><span id="replaceTab">'+t.replace+'</span></div><div class="ctBox"><div class="inputBox"><div class="textboxs" id="searchInput">'+t.findTextbox+'：<input class="formulaInputFocus" spellcheck="false" value=""/></div><div class="textboxs" id="replaceInput">'+t.replaceTextbox+'：<input class="formulaInputFocus" spellcheck="false" value=""/></div><div class="checkboxs"><div id="regCheck"><input type="checkbox"/><span>'+t.regexTextbox+'</span></div><div id="wordCheck"><input type="checkbox"/><span>'+t.wholeTextbox+'</span></div><div id="caseCheck"><input type="checkbox"/><span>'+t.distinguishTextbox+'</span></div></div></div><div class="btnBox"><button id="replaceAllBtn" class="btn btn-default">'+t.allReplaceBtn+'</button><button id="replaceBtn" class="btn btn-default">'+t.replaceBtn+'</button><button id="searchAllBtn" class="btn btn-default">'+t.allFindBtn+'</button><button id="searchNextBtn" class="btn btn-default">'+t.findBtn+"</button></div></div>";$("body").append(k(v,{id:"luckysheet-search-replace",addclass:"luckysheet-search-replace",title:"",content:s,botton:'<button class="btn btn-default luckysheet-model-close-btn">'+c.close+"</button>",style:"z-index:100003",close:c.close}));let a=$("#luckysheet-search-replace").find(".luckysheet-modal-dialog-content").css("min-width",500).end(),r=a.outerHeight(),n=a.outerWidth(),h=$(window).width(),o=$(window).height(),i=$(document).scrollLeft(),u=$(document).scrollTop();$("#luckysheet-search-replace").css({left:(h+i-n)/2,top:(o+u-r)/3}).show(),"0"==e?($("#luckysheet-search-replace #searchTab").addClass("on").siblings().removeClass("on"),$("#luckysheet-search-replace #replaceInput").hide(),$("#luckysheet-search-replace #replaceAllBtn").hide(),$("#luckysheet-search-replace #replaceBtn").hide()):"1"==e&&($("#luckysheet-search-replace #replaceTab").addClass("on").siblings().removeClass("on"),$("#luckysheet-search-replace #replaceInput").show(),$("#luckysheet-search-replace #replaceAllBtn").show(),$("#luckysheet-search-replace #replaceBtn").show())},init:function(){let e=this;$(document).off("click.SRtabBoxspan").on("click.SRtabBoxspan","#luckysheet-search-replace .tabBox span",function(){$(this).addClass("on").siblings().removeClass("on");let e=$(this).attr("id");"searchTab"==e?($("#luckysheet-search-replace #replaceInput").hide(),$("#luckysheet-search-replace #replaceAllBtn").hide(),$("#luckysheet-search-replace #replaceBtn").hide(),$("#luckysheet-search-replace #searchInput input").focus()):"replaceTab"==e&&($("#luckysheet-search-replace #replaceInput").show(),$("#luckysheet-search-replace #replaceAllBtn").show(),$("#luckysheet-search-replace #replaceBtn").show(),$("#luckysheet-search-replace #replaceInput input").focus())}),$(document).off("keyup.SRsearchInput").on("keyup.SRsearchInput","#luckysheet-search-replace #searchInput input",function(l){l.keyCode==b.ENTER&&e.searchNext()}),$(document).off("click.SRsearchNextBtn").on("click.SRsearchNextBtn","#luckysheet-search-replace #searchNextBtn",function(){e.searchNext()}),$(document).off("click.SRsearchAllBtn").on("click.SRsearchAllBtn","#luckysheet-search-replace #searchAllBtn",function(){e.searchAll()}),$(document).off("click.SRsearchAllboxItem").on("click.SRsearchAllboxItem","#luckysheet-search-replace #searchAllbox .boxItem",function(){$(this).addClass("on").siblings().removeClass("on");let e=$(this).attr("data-row"),l=$(this).attr("data-col"),t=$(this).attr("data-sheetIndex");t!=p.currentSheetIndex&&s.changeSheetExec(t),p.luckysheet_select_save=[{row:[e,e],column:[l,l]}],g();let c=$("#luckysheet-cell-main").scrollLeft(),a=$("#luckysheet-cell-main").scrollTop(),r=$("#luckysheet-cell-main").height(),n=$("#luckysheet-cell-main").width(),h=p.visibledatarow[e],o=e-1==-1?0:p.visibledatarow[e-1],i=p.visibledatacolumn[l],u=l-1==-1?0:p.visibledatacolumn[l-1];i-c-n+20>0?$("#luckysheet-scrollbar-x").scrollLeft(i-n+20):u-c-20<0&&$("#luckysheet-scrollbar-x").scrollLeft(u-20),h-a-r+20>0?$("#luckysheet-scrollbar-y").scrollTop(h-r+20):o-a-20<0&&$("#luckysheet-scrollbar-y").scrollTop(o-20)}),$(document).off("click.SRreplaceBtn").on("click.SRreplaceBtn","#luckysheet-search-replace #replaceBtn",function(){e.replace()}),$(document).off("click.SRreplaceAllBtn").on("click.SRreplaceAllBtn","#luckysheet-search-replace #replaceAllBtn",function(){e.replaceAll()})},searchNext:function(){let e=$("#luckysheet-search-replace #searchInput input").val();if(""==e||null==e)return;const l=d().findAndReplace;let t;t=0==p.luckysheet_select_save.length||1==p.luckysheet_select_save.length&&p.luckysheet_select_save[0].row[0]==p.luckysheet_select_save[0].row[1]&&p.luckysheet_select_save[0].column[0]==p.luckysheet_select_save[0].column[1]?[{row:[0,p.flowdata.length-1],column:[0,p.flowdata[0].length-1]}]:$.extend(!0,[],p.luckysheet_select_save);let c=this.getSearchIndexArr(e,t);if(0==c.length)return void(_()?alert(l.noFindTip):i.info(l.noFindTip,""));let s=0;if(0==p.luckysheet_select_save.length||1==p.luckysheet_select_save.length&&p.luckysheet_select_save[0].row[0]==p.luckysheet_select_save[0].row[1]&&p.luckysheet_select_save[0].column[0]==p.luckysheet_select_save[0].column[1]){if(0==p.luckysheet_select_save.length)s=0;else for(let e=0;e<c.length;e++)if(c[e].r==p.luckysheet_select_save[0].row[0]&&c[e].c==p.luckysheet_select_save[0].column[0]){s=e==c.length-1?0:e+1;break}p.luckysheet_select_save=[{row:[c[s].r,c[s].r],column:[c[s].c,c[s].c]}]}else{let e=t[t.length-1].row_focus,l=t[t.length-1].column_focus;for(let t=0;t<c.length;t++)if(c[t].r==e&&c[t].c==l){s=t==c.length-1?0:t+1;break}for(let e=0;e<t.length;e++){let l=t[e].row[0],a=t[e].row[1],r=t[e].column[0],n=t[e].column[1];if(c[s].r>=l&&c[s].r<=a&&c[s].c>=r&&c[s].c<=n){let l=t[e];l.row_focus=c[s].r,l.column_focus=c[s].c,t.splice(e,1),t.push(l);break}}p.luckysheet_select_save=t}g();let a=$("#luckysheet-cell-main").scrollLeft(),r=$("#luckysheet-cell-main").scrollTop(),n=$("#luckysheet-cell-main").height(),h=$("#luckysheet-cell-main").width(),o=p.visibledatarow[c[s].r],u=c[s].r-1==-1?0:p.visibledatarow[c[s].r-1],k=p.visibledatacolumn[c[s].c],y=c[s].c-1==-1?0:p.visibledatacolumn[c[s].c-1];k-a-h+20>0?$("#luckysheet-scrollbar-x").scrollLeft(k-h+20):y-a-20<0&&$("#luckysheet-scrollbar-x").scrollLeft(y-20),o-r-n+20>0?$("#luckysheet-scrollbar-y").scrollTop(o-n+20):u-r-20<0&&$("#luckysheet-scrollbar-y").scrollTop(u-20),$("#searchAllbox").is(":visible")&&$("#luckysheet-search-replace #searchAllbox .boxItem").removeClass("on")},searchAll:function(){const e=d().findAndReplace;$("#luckysheet-search-replace #searchAllbox").remove();let l,t=$("#luckysheet-search-replace #searchInput input").val();if(""==t||null==t)return;l=0==p.luckysheet_select_save.length||1==p.luckysheet_select_save.length&&p.luckysheet_select_save[0].row[0]==p.luckysheet_select_save[0].row[1]&&p.luckysheet_select_save[0].column[0]==p.luckysheet_select_save[0].column[1]?[{row:[0,p.flowdata.length-1],column:[0,p.flowdata[0].length-1]}]:$.extend(!0,[],p.luckysheet_select_save);let c=this.getSearchIndexArr(t,l);if(0==c.length)return void(_()?alert(e.noFindTip):i.info(e.noFindTip,""));let s="";for(let e=0;e<c.length;e++){let l=x(c[e].r,c[e].c,p.flowdata).toString();l.indexOf("</")>-1&&l.indexOf(">")>-1?s+='<div class="boxItem" data-row="'+c[e].r+'" data-col="'+c[e].c+'" data-sheetIndex="'+p.currentSheetIndex+'"><span>'+p.luckysheetfile[f(p.currentSheetIndex)].name+"</span><span>"+y(c[e].c)+(c[e].r+1)+"</span><span>"+l+"</span></div>":s+='<div class="boxItem" data-row="'+c[e].r+'" data-col="'+c[e].c+'" data-sheetIndex="'+p.currentSheetIndex+'"><span>'+p.luckysheetfile[f(p.currentSheetIndex)].name+"</span><span>"+y(c[e].c)+(c[e].r+1)+'</span><span title="'+l+'">'+l+"</span></div>"}$('<div id="searchAllbox"><div class="boxTitle"><span>'+e.searchTargetSheet+"</span><span>"+e.searchTargetCell+"</span><span>"+e.searchTargetValue+'</span></div><div class="boxMain">'+s+"</div></div>").appendTo($("#luckysheet-search-replace")),$("#luckysheet-search-replace #searchAllbox .boxItem").eq(0).addClass("on").siblings().removeClass("on"),p.luckysheet_select_save=[{row:[c[0].r,c[0].r],column:[c[0].c,c[0].c]}],g()},getSearchIndexArr:function(e,l){let t=[],c={},s=!1;$("#luckysheet-search-replace #regCheck input[type='checkbox']").is(":checked")&&(s=!0);let a=!1;$("#luckysheet-search-replace #wordCheck input[type='checkbox']").is(":checked")&&(a=!0);let r=!1;$("#luckysheet-search-replace #caseCheck input[type='checkbox']").is(":checked")&&(r=!0);for(let n=0;n<l.length;n++){let h=l[n].row[0],o=l[n].row[1],i=l[n].column[0],d=l[n].column[1];for(let l=h;l<=o;l++)for(let n=i;n<=d;n++){if(null!=p.flowdata[l][n]){let h=x(l,n,p.flowdata);if(0==h&&(h=h.toString()),null!=h&&""!=h)if(h=h.toString(),a)if(r)e==h&&(l+"_"+n in c||(c[l+"_"+n]=0,t.push({r:l,c:n})));else{e.toLowerCase()==h.toLowerCase()&&(l+"_"+n in c||(c[l+"_"+n]=0,t.push({r:l,c:n})))}else if(s){let s;(s=r?new RegExp(u.getRegExpStr(e),"g"):new RegExp(u.getRegExpStr(e),"ig")).test(h)&&(l+"_"+n in c||(c[l+"_"+n]=0,t.push({r:l,c:n})))}else if(r){new RegExp(u.getRegExpStr(e),"g").test(h)&&(l+"_"+n in c||(c[l+"_"+n]=0,t.push({r:l,c:n})))}else{new RegExp(u.getRegExpStr(e),"ig").test(h)&&(l+"_"+n in c||(c[l+"_"+n]=0,t.push({r:l,c:n})))}}}}return t},replace:function(){const e=d().findAndReplace;if(!p.allowEdit)return void i.info(e.modeTip,"");let l,t=$("#luckysheet-search-replace #searchInput input").val();if(""==t||null==t)return void(_()?alert(e.searchInputTip):i.info(e.searchInputTip,""));l=0==p.luckysheet_select_save.length||1==p.luckysheet_select_save.length&&p.luckysheet_select_save[0].row[0]==p.luckysheet_select_save[0].row[1]&&p.luckysheet_select_save[0].column[0]==p.luckysheet_select_save[0].column[1]?[{row:[0,p.flowdata.length-1],column:[0,p.flowdata[0].length-1]}]:$.extend(!0,[],p.luckysheet_select_save);let c=this.getSearchIndexArr(t,l);if(0==c.length)return void(_()?alert(e.noReplceTip):i.info(e.noReplceTip,""));let s=null,a=p.luckysheet_select_save[p.luckysheet_select_save.length-1],r=a.row_focus,n=a.column_focus;for(let e=0;e<c.length;e++)if(c[e].r==r&&c[e].c==n){s=e;break}if(null==s){if(0==c.length)return void(_()?alert(e.noMatchTip):i.info(e.noMatchTip,""));s=0}let h=!1;$("#luckysheet-search-replace #regCheck input[type='checkbox']").is(":checked")&&(h=!0);let k=!1;$("#luckysheet-search-replace #wordCheck input[type='checkbox']").is(":checked")&&(k=!0);let y=!1;$("#luckysheet-search-replace #caseCheck input[type='checkbox']").is(":checked")&&(y=!0);let f,v,b=$("#luckysheet-search-replace #replaceInput input").val(),T=o.deepCopyFlowData(p.flowdata);if(k){f=c[s].r,v=c[s].c,m(f,v,T,b)}else{let e;e=y?new RegExp(u.getRegExpStr(t),"g"):new RegExp(u.getRegExpStr(t),"ig"),f=c[s].r,v=c[s].c;let l=x(f,v,T).toString().replace(e,b);m(f,v,T,l)}p.luckysheet_select_save=[{row:[f,f],column:[v,v]}],$("#luckysheet-search-replace #searchAllbox").is(":visible")&&$("#luckysheet-search-replace #searchAllbox").hide(),w(T,p.luckysheet_select_save),g();let I=$("#luckysheet-cell-main").scrollLeft(),S=$("#luckysheet-cell-main").scrollTop(),R=$("#luckysheet-cell-main").height(),A=$("#luckysheet-cell-main").width(),B=p.visibledatarow[f],C=f-1==-1?0:p.visibledatarow[f-1],E=p.visibledatacolumn[v],L=v-1==-1?0:p.visibledatacolumn[v-1];E-I-A+20>0?$("#luckysheet-scrollbar-x").scrollLeft(E-A+20):L-I-20<0&&$("#luckysheet-scrollbar-x").scrollLeft(L-20),B-S-R+20>0?$("#luckysheet-scrollbar-y").scrollTop(B-R+20):C-S-20<0&&$("#luckysheet-scrollbar-y").scrollTop(C-20)},replaceAll:function(){const e=d().findAndReplace;if(!p.allowEdit)return void i.info(e.modeTip,"");let l,t=$("#luckysheet-search-replace #searchInput input").val();if(""==t||null==t)return void(_()?alert(e.searchInputTip):i.info(e.searchInputTip,""));l=0==p.luckysheet_select_save.length||1==p.luckysheet_select_save.length&&p.luckysheet_select_save[0].row[0]==p.luckysheet_select_save[0].row[1]&&p.luckysheet_select_save[0].column[0]==p.luckysheet_select_save[0].column[1]?[{row:[0,p.flowdata.length-1],column:[0,p.flowdata[0].length-1]}]:$.extend(!0,[],p.luckysheet_select_save);let c=this.getSearchIndexArr(t,l);if(0==c.length)return void(_()?alert(e.noReplceTip):i.info(e.noReplceTip,""));let s=!1;$("#luckysheet-search-replace #regCheck input[type='checkbox']").is(":checked")&&(s=!0);let a=!1;$("#luckysheet-search-replace #wordCheck input[type='checkbox']").is(":checked")&&(a=!0);let r=!1;$("#luckysheet-search-replace #caseCheck input[type='checkbox']").is(":checked")&&(r=!0);let n=$("#luckysheet-search-replace #replaceInput input").val(),h=o.deepCopyFlowData(p.flowdata);if(a)for(let e=0;e<c.length;e++){let t=c[e].r,s=c[e].c;m(t,s,h,n),l.push({row:[t,t],column:[s,s]})}else{let e;e=r?new RegExp(u.getRegExpStr(t),"g"):new RegExp(u.getRegExpStr(t),"ig");for(let t=0;t<c.length;t++){let s=c[t].r,a=c[t].c,r=x(s,a,h).toString().replace(e,n);m(s,a,h,r),l.push({row:[s,s],column:[a,a]})}}$("#luckysheet-search-replace #searchAllbox").is(":visible")&&$("#luckysheet-search-replace #searchAllbox").hide(),w(h,l),p.luckysheet_select_save=$.extend(!0,[],l),g();let y=k(e.successTip,{xlength:c.length});_()?alert(y):i.info(y,"")}}});
//# sourceMappingURL=../sourcemaps/controllers/searchReplace.js.map
