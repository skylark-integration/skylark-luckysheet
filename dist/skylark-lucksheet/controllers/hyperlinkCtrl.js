/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../utils/util","../global/getdata","../global/refresh","../global/location","../global/formula","../global/tooltip","../global/editor","./constant","./select","./server","./sheetmanage","./freezen","./menuButton","../methods/get","../locale/locale","../store"],function(e,l,t,i,n,o,s,a,r,c,d,k,h,u,y,p){"use strict";const{replaceHtml:f}=e,{getcellvalue:g}=l,{luckysheetrefreshgrid:v}=t,{rowLocation:m,colLocation:b,mouseposition:w}=i,{modelHTML:x}=a,{selectHightlightShow:L}=r,{getSheetIndex:T}=u;return{item:{linkType:"external",linkAddress:"",linkTooltip:""},hyperlink:null,createDialog:function(){const e=y(),l=e.insertLink,t=e.toolbar,i=e.button;$("#luckysheet-modal-dialog-mask").show(),$("#luckysheet-insertLink-dialog").remove();let n="";p.luckysheetfile.forEach(e=>{n+=`<option value="${e.name}">${e.name}</option>`});let o=`<div class="box">\n                            <div class="box-item">\n                                <label for="luckysheet-insertLink-dialog-linkText">${l.linkText}：</label>\n                                <input type="text" id="luckysheet-insertLink-dialog-linkText"/>\n                            </div>\n                            <div class="box-item">\n                                <label for="luckysheet-insertLink-dialog-linkType">${l.linkType}：</label>\n                                <select id="luckysheet-insertLink-dialog-linkType">\n                                    <option value="external">${l.external}</option>\n                                    <option value="internal">${l.internal}</option>\n                                </select>\n                            </div>\n                            <div class="show-box show-box-external">\n                                <div class="box-item">\n                                    <label for="luckysheet-insertLink-dialog-linkAddress">${l.linkAddress}：</label>\n                                    <input type="text" id="luckysheet-insertLink-dialog-linkAddress" placeholder="${l.placeholder1}" />\n                                </div>\n                            </div>\n                            <div class="show-box show-box-internal">\n                                <div class="box-item">\n                                    <label for="luckysheet-insertLink-dialog-linkSheet">${l.linkSheet}：</label>\n                                    <select id="luckysheet-insertLink-dialog-linkSheet">\n                                        ${n}\n                                    </select>\n                                </div>\n                                <div class="box-item">\n                                    <label for="luckysheet-insertLink-dialog-linkCell">${l.linkCell}：</label>\n                                    <input type="text" id="luckysheet-insertLink-dialog-linkCell" value="A1" placeholder="${l.placeholder2}" />\n                                </div>\n                            </div>\n                            <div class="box-item">\n                                <label for="luckysheet-insertLink-dialog-linkTooltip">${l.linkTooltip}：</label>\n                                <input type="text" id="luckysheet-insertLink-dialog-linkTooltip" placeholder="${l.placeholder3}" />\n                            </div>\n                        </div>`;$("body").append(f(x,{id:"luckysheet-insertLink-dialog",addclass:"luckysheet-insertLink-dialog",title:t.insertLink,content:o,botton:`<button id="luckysheet-insertLink-dialog-confirm" class="btn btn-primary">${i.confirm}</button>\n                        <button class="btn btn-default luckysheet-model-close-btn">${i.cancel}</button>`,style:"z-index:100003"}));let s=$("#luckysheet-insertLink-dialog").find(".luckysheet-modal-dialog-content").css("min-width",350).end(),a=s.outerHeight(),r=s.outerWidth(),c=$(window).width(),d=$(window).height(),k=$(document).scrollLeft(),h=$(document).scrollTop();$("#luckysheet-insertLink-dialog").css({left:(c+k-r)/2,top:(d+h-a)/3}).show(),this.dataAllocation()},init:function(){let e=this;const l=y().insertLink;$(document).off("change.linkType").on("change.linkType","#luckysheet-insertLink-dialog-linkType",function(e){let l=this.value;$("#luckysheet-insertLink-dialog .show-box").hide(),$("#luckysheet-insertLink-dialog .show-box-"+l).show()}),$(document).off("click.confirm").on("click.confirm","#luckysheet-insertLink-dialog-confirm",function(t){let i=p.luckysheet_select_save[p.luckysheet_select_save.length-1],a=i.row_focus||i.row[0],r=i.column_focus||i.column[0],c=$("#luckysheet-insertLink-dialog-linkText").val(),d=$("#luckysheet-insertLink-dialog-linkType").val(),k=$("#luckysheet-insertLink-dialog-linkAddress").val(),h=$("#luckysheet-insertLink-dialog-linkSheet").val(),u=$("#luckysheet-insertLink-dialog-linkCell").val(),y=$("#luckysheet-insertLink-dialog-linkTooltip").val();if("external"==d){if(/^http[s]?:\/\//.test(k)||(k="https://"+k),!/^http[s]?:\/\/([\w\-\.]+)+[\w-]*([\w\-\.\/\?%&=]+)?$/gi.test(k))return void o.info('<i class="fa fa-exclamation-triangle"></i>',l.tooltipInfo1)}else{if(!n.iscelldata(u))return void o.info('<i class="fa fa-exclamation-triangle"></i>',l.tooltipInfo2);k=h+"!"+u}null!=c&&""!=c.replace(/\s/g,"")||(c=k);let f={linkType:d,linkAddress:k,linkTooltip:y},g=$.extend(!0,{},e.hyperlink),v=$.extend(!0,{},e.hyperlink);v[a+"_"+r]=f;let m=s.deepCopyFlowData(p.flowdata),b=m[a][r];null==b&&(b={}),b.fc="rgb(0, 0, 255)",b.un=1,b.v=c,m[a][r]=b,e.ref(g,v,p.currentSheetIndex,m,{row:[a,a],column:[r,r]}),$("#luckysheet-modal-dialog-mask").hide(),$("#luckysheet-insertLink-dialog").hide()})},dataAllocation:function(){let e=p.luckysheet_select_save[p.luckysheet_select_save.length-1],l=e.row_focus||e.row[0],t=e.column_focus||e.column[0],i=(this.hyperlink||{})[l+"_"+t]||{},o=g(l,t,null,"m");$("#luckysheet-insertLink-dialog-linkText").val(o);let s=i.linkType||"external";$("#luckysheet-insertLink-dialog-linkType").val(s),$("#luckysheet-insertLink-dialog .show-box").hide(),$("#luckysheet-insertLink-dialog .show-box-"+s).show();let a=i.linkAddress||"";if("external"==s)$("#luckysheet-insertLink-dialog-linkAddress").val(a);else if(n.iscelldata(a)){let e=a.split("!")[0],l=a.split("!")[1];$("#luckysheet-insertLink-dialog-linkSheet").val(e),$("#luckysheet-insertLink-dialog-linkCell").val(l)}let r=i.linkTooltip||"";$("#luckysheet-insertLink-dialog-linkTooltip").val(r)},cellFocus:function(e,l){if(null==this.hyperlink||null==this.hyperlink[e+"_"+l])return;let t=this.hyperlink[e+"_"+l];if("external"==t.linkType)window.open(t.linkAddress);else{let e=n.getcellrange(t.linkAddress),l=e.sheetIndex,i=[{row:e.row,column:e.column}];l!=p.currentSheetIndex&&($("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active"),$("#luckysheet-sheets-item"+l).addClass("luckysheet-sheets-item-active"),d.changeSheet(l)),p.luckysheet_select_save=i,L(!0);let o=e.row[0]-1==-1?0:p.visibledatarow[e.row[0]-1],s=e.column[0]-1==-1?0:p.visibledatacolumn[e.column[0]-1];$("#luckysheet-scrollbar-x").scrollLeft(s),$("#luckysheet-scrollbar-y").scrollTop(o)}},overshow:function(e){if($("#luckysheet-hyperlink-overshow").remove(),0==$(e.target).closest("#luckysheet-cell-main").length)return;let l=w(e.pageX,e.pageY),t=$("#luckysheet-cell-main").scrollLeft(),i=$("#luckysheet-cell-main").scrollTop(),n=l[0]+t,o=l[1]+i;if(null!=k.freezenverticaldata&&l[0]<k.freezenverticaldata[0]-k.freezenverticaldata[2])return;if(null!=k.freezenhorizontaldata&&l[1]<k.freezenhorizontaldata[0]-k.freezenhorizontaldata[2])return;let s=m(o)[2],a=b(n)[2],r=h.mergeborer(p.flowdata,s,a);if(r&&(s=r.row[2],a=r.column[2]),null==this.hyperlink||null==this.hyperlink[s+"_"+a])return;let c=this.hyperlink[s+"_"+a],d=c.linkTooltip;null!=d&&""!=d.replace(/\s/g,"")||(d=c.linkAddress);let u=p.visibledatarow[s],y=s-1==-1?0:p.visibledatarow[s-1],f=p.visibledatacolumn[a],g=a-1==-1?0:p.visibledatacolumn[a-1];r&&(u=r.row[1],y=r.row[0],f=r.column[1],g=r.column[0]);let v=`<div id="luckysheet-hyperlink-overshow" style="background:#fff;padding:5px 10px;border:1px solid #000;box-shadow:2px 2px #999;position:absolute;left:${g}px;top:${u+5}px;z-index:100;">\n                        <div>${d}</div>\n                        <div>单击鼠标可以追踪</div>\n                    </div>`;$(v).appendTo($("#luckysheet-cell-main"))},ref:function(e,l,t,i,n){if(p.clearjfundo){p.jfundo.length=0;let o={type:"updateHyperlink"};o.sheetIndex=t,o.historyHyperlink=e,o.currentHyperlink=l,o.data=p.flowdata,o.curData=i,o.range=n,p.jfredo.push(o)}this.hyperlink=l,p.luckysheetfile[T(t)].hyperlink=l,p.flowdata=i,s.webWorkerFlowDataCache(p.flowdata),p.luckysheetfile[T(t)].data=p.flowdata,c.allowUpdate&&(c.saveParam("all",t,l,{k:"hyperlink"}),c.historyParam(p.flowdata,t,n)),setTimeout(function(){v()},1)}}});
//# sourceMappingURL=../sourcemaps/controllers/hyperlinkCtrl.js.map
