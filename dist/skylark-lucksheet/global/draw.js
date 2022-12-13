/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["../controllers/pivotTable","../controllers/conditionformat","../controllers/alternateformat","../controllers/sparkline","../controllers/menuButton","../controllers/dataVerificationCtrl","../controllers/constant","../controllers/sheetSearch","./dynamicArray","./browser","./validate","./getRowlen","./getdata","./border","../methods/get","../utils/util","../controllers/inlineString","./method","../store","../locale/locale","../controllers/sheetmanage"],function(e,l,t,o,i,n,a,r,c,s,d,f,u,h,m,g,b,y,v,w,k){"use strict";const{luckysheetdefaultstyle:T,luckysheet_CFiconsImg:R,luckysheetdefaultFont:S}=a,{luckysheet_searcharray:_}=r,{dynamicArrayCompute:x}=c,{isRealNull:p,isRealNum:P}=d,{getMeasureText:H,getCellTextInfo:C}=f,{getRealCellValue:z}=u,{getBorderInfoComputeRange:W}=h,{getSheetIndex:B}=m,{getObjType:F,chatatABC:L,luckysheetfontformat:I}=g,{isInlineStringCell:A}=b;let M=function(e,l,t,i,n,a){if(null==v.flowdata[e]||null==v.flowdata[e][l])return;let r=v.flowdata[e][l].spl;if(null!=r)if("string"==typeof r&&(r=new Function("return "+r)()),"object"==F(r)){let e=r,l=e.offsetX,c=e.offsetY;l=null==l?0:l,c=null==c?0:c,o.render(e.shapeseq,e.shapes,t+l,i+c,e.pixelWidth,e.pixelHeight,n,a)}else if("array"==F(r)&&"object"==F(r[0]))for(let e=0;e<r.length;e++){let l=r[e],c=l.offsetX,s=l.offsetY;c=null==c?0:c,s=null==s?0:s,o.render(l.shapeseq,l.shapes,t+c,i+s,l.pixelWidth,l.pixelHeight,n,a)}},O=function(e,o,n,a,r,c,d,f,u,h,m,g,b,w,R,_,x,p,P){let H=t.checksAF(e,o,f),C=l.checksCF(e,o,u),z=i.borderfix(v.flowdata,e,o),W=i.checkstatus(v.flowdata,e,o,"bg");null!=H&&null!=H[1]&&(W=H[1]),null!=C&&null!=C.cellColor&&(W=C.cellColor),null!=v.flowdata[e][o]&&null!=v.flowdata[e][o].tc&&(W=v.flowdata[e][o].tc),d.fillStyle=null==W?"#FFFFFF":W;let B=[a+h+z[0],n+m+z[1],c-a+z[2]-(P?1:0),r-n+z[3]];if(!y.createHookFunction("cellRenderBefore",v.flowdata[e][o],{r:e,c:o,start_r:B[1],start_c:B[0],end_r:B[3]+B[1],end_c:B[2]+B[0]},k.getSheetByIndex(),d))return;if(d.fillRect(B[0],B[1],B[2],B[3]),e+"_"+o in g){let l=g[e+"_"+o].v;d.fillStyle="#000000";let t=S();d.font=t;let i=a+4+h,n=(s.luckysheetrefreshfixed(),r+m-2);d.textBaseline="bottom",d.fillText(null==l?"":l,i,n)}if(null!=v.flowdata[e][o]&&null!=v.flowdata[e][o].ps){let e=8*v.zoomRatio,l=8*v.zoomRatio;d.beginPath(),d.moveTo(c+h-1-e,n+m),d.lineTo(c+h-1,n+m),d.lineTo(c+h-1,n+m+l),d.fillStyle="#FC6666",d.fill(),d.closePath()}let F=X(b,e,o,w,R);F.colLast&&j(F.rowIndex,F.colIndex,F.stc,F.edc,d,_,x,h,m,f,u),F.colIn&&!F.colLast||v.luckysheetcurrentisPivotTable||W||!v.showGridLines||(d.beginPath(),d.moveTo(c+h-2+p,n+m),d.lineTo(c+h-2+p,r+m),d.lineWidth=1,d.strokeStyle=T.strokeStyle,d.stroke(),d.closePath()),v.luckysheetcurrentisPivotTable||W||!v.showGridLines||(d.beginPath(),d.moveTo(a+h-1,r+m-2+p),d.lineTo(c+h-1,r+m-2+p),d.lineWidth=1,d.strokeStyle=T.strokeStyle,d.stroke(),d.closePath()),y.createHookFunction("cellRenderAfter",v.flowdata[e][o],{r:e,c:o,start_r:B[1],start_c:B[0],end_r:B[3]+B[1],end_c:B[2]+B[0]},k.getSheetByIndex(),d)},D=function(e,o,a,r,c,s,d,f,u,h,m,g,b,w,S,_,x,p,z,W){let B=v.flowdata[e][o],F=s-r-2,L=c-a-2,I=i.checkstatus(v.flowdata,e,o,"ht"),A=i.checkstatus(v.flowdata,e,o,"vt"),M=t.checksAF(e,o,u),O=l.checksCF(e,o,h),D=i.checkstatus(v.flowdata,e,o,"bg");null!=M&&null!=M[1]&&(D=M[1]),null!=O&&null!=O.cellColor&&(D=O.cellColor),f.fillStyle=null==D?"#FFFFFF":D;let $=i.borderfix(v.flowdata,e,o),G=[r+m+$[0],a+g+$[1],s-r+$[2]-(W?1:0),c-a+$[3]];if(!y.createHookFunction("cellRenderBefore",v.flowdata[e][o],{r:e,c:o,start_r:G[1],start_c:G[0],end_r:G[3]+G[1],end_c:G[2]+G[0]},k.getSheetByIndex(),f))return;f.fillRect(G[0],G[1],G[2],G[3]);let q=n.dataVerification;if(null!=q&&null!=q[e+"_"+o]&&!n.validateCellData(d,q[e+"_"+o])){let e=5*v.zoomRatio,l=5*v.zoomRatio;f.beginPath(),f.moveTo(r+m,a+g),f.lineTo(r+m+e,a+g),f.lineTo(r+m,a+g+l),f.fillStyle="#FC6666",f.fill(),f.closePath()}if(null!=B.ps){let e=8*v.zoomRatio,l=8*v.zoomRatio;f.beginPath(),f.moveTo(s+m-e,a+g),f.lineTo(s+m,a+g),f.lineTo(s+m,a+g+l),f.fillStyle="#FC6666",f.fill(),f.closePath()}if(1==B.qp&&P(B.v)){let e=6*v.zoomRatio,l=6*v.zoomRatio;f.beginPath(),f.moveTo(r+m+e-1,a+g),f.lineTo(r+m-1,a+g),f.lineTo(r+m-1,a+g+l),f.fillStyle="#487f1e",f.fill(),f.closePath()}let V=!0,N=X(w,e,o,S,_);if("1"==B.tb&&N.colIn)N.colLast?j(N.rowIndex,N.colIndex,N.stc,N.edc,f,x,p,m,g,u,h):V=!1;else if(null!=q&&null!=q[e+"_"+o]&&"checkbox"==q[e+"_"+o].type){let l=r+m,t=a+g+1;f.save(),f.beginPath(),f.rect(l,t,F,L),f.clip(),f.scale(v.zoomRatio,v.zoomRatio);let n=H(d,f),c=n.width+14,s=n.actualBoundingBoxDescent+n.actualBoundingBoxAscent,u=l+2;"0"==I?u=l+F/2-c/2:"2"==I&&(u=l+F-2-c);let h=L>s?L:s,b=t+h-2;f.textBaseline="bottom";let y=b-13*v.zoomRatio;"0"==A?(b=t+h/2,f.textBaseline="middle",y=b-6*v.zoomRatio):"1"==A&&(b=t+2,f.textBaseline="top",y=b+1*v.zoomRatio),u/=v.zoomRatio,b/=v.zoomRatio,y/=v.zoomRatio,f.lineWidth=1,f.strokeStyle="#000",f.strokeRect(u,y,10,10),q[e+"_"+o].checked&&(f.beginPath(),f.lineTo(u+1,y+6),f.lineTo(u+4,y+9),f.lineTo(u+9,y+2),f.stroke(),f.closePath()),f.fillStyle=i.checkstatus(v.flowdata,e,o,"fc"),f.fillText(null==d?"":d,u+14,b),f.restore()}else{if(null!=O&&null!=O.dataBar){let e=r+m+2,l=a+g+2,t=F-4,o=L-4,i=O.dataBar.valueType,n=O.dataBar.valueLen,c=O.dataBar.format;if("minus"==i){let i=O.dataBar.minusLen;if(c.length>1){let o=f.createLinearGradient(e+t*i*(1-n),l,e+t*i,l);o.addColorStop(0,"#ffffff"),o.addColorStop(1,"#ff0000"),f.fillStyle=o}else f.fillStyle="#ff0000";f.fillRect(e+t*i*(1-n),l,t*i*n,o),f.beginPath(),f.moveTo(e+t*i*(1-n),l),f.lineTo(e+t*i*(1-n),l+o),f.lineTo(e+t*i,l+o),f.lineTo(e+t*i,l),f.lineTo(e+t*i*(1-n),l),f.lineWidth=1,f.strokeStyle="#ff0000",f.stroke(),f.closePath()}else if("plus"==i){let i=O.dataBar.plusLen;if(1==i){if(c.length>1){let o=f.createLinearGradient(e,l,e+t*n,l);o.addColorStop(0,c[0]),o.addColorStop(1,c[1]),f.fillStyle=o}else f.fillStyle=c[0];f.fillRect(e,l,t*n,o),f.beginPath(),f.moveTo(e,l),f.lineTo(e,l+o),f.lineTo(e+t*n,l+o),f.lineTo(e+t*n,l),f.lineTo(e,l),f.lineWidth=1,f.strokeStyle=c[0],f.stroke(),f.closePath()}else{let a=O.dataBar.minusLen;if(c.length>1){let o=f.createLinearGradient(e+t*a,l,e+t*a+t*i*n,l);o.addColorStop(0,c[0]),o.addColorStop(1,c[1]),f.fillStyle=o}else f.fillStyle=c[0];f.fillRect(e+t*a,l,t*i*n,o),f.beginPath(),f.moveTo(e+t*a,l),f.lineTo(e+t*a,l+o),f.lineTo(e+t*a+t*i*n,l+o),f.lineTo(e+t*a+t*i*n,l),f.lineTo(e+t*a,l),f.lineWidth=1,f.strokeStyle=c[0],f.stroke(),f.closePath()}}}let l=r+m,t=a+g+1;f.save(),f.beginPath(),f.rect(l,t,F,L),f.clip(),f.scale(v.zoomRatio,v.zoomRatio);let n=C(B,f,{cellWidth:F,cellHeight:L,space_width:2,space_height:2,r:e,c:o});if(null!=O&&null!=O.icons&&"plain"==n.type){let e=O.icons.left,o=O.icons.top,i=n.values[0],a=l+i.left,r=t+i.top-n.textHeightAll;"0"==A?r=t+L/2-n.textHeightAll/2:"1"==A?r=t:"2"==A&&(r-=n.desc),r/=v.zoomRatio,a/=v.zoomRatio,f.drawImage(R,42*e,32*o,32,32,l/v.zoomRatio,r,n.textHeightAll/v.zoomRatio,n.textHeightAll/v.zoomRatio),"0"!=I&&"2"!=I&&(a+=n.textHeightAll/v.zoomRatio)}f.fillStyle=i.checkstatus(v.flowdata,e,o,"fc"),null!=M&&null!=M[0]&&(f.fillStyle=M[0]),null!=O&&null!=O.textColor&&(f.fillStyle=O.textColor),B.ct&&B.ct.fa&&B.ct.fa.indexOf("[Red]")>-1&&"n"==B.ct.t&&B.v<0&&(f.fillStyle="#ff0000"),Y(n,f,{pos_x:l,pos_y:t}),f.restore()}V&&(v.luckysheetcurrentisPivotTable||D||!v.showGridLines||(f.beginPath(),f.moveTo(s+m-2+z,a+g),f.lineTo(s+m-2+z,c+g),f.lineWidth=1,f.strokeStyle=T.strokeStyle,f.stroke(),f.closePath())),v.luckysheetcurrentisPivotTable||D||!v.showGridLines||(f.beginPath(),f.moveTo(r+m-1,c+g-2+z),f.lineTo(s+m-1,c+g-2+z),f.lineWidth=1,f.strokeStyle=T.strokeStyle,f.stroke(),f.closePath()),y.createHookFunction("cellRenderAfter",v.flowdata[e][o],{r:e,c:o,start_r:G[1],start_c:G[0],end_r:G[3]+G[1],end_c:G[2]+G[0]},k.getSheetByIndex(),f)},j=function(e,o,n,a,r,c,s,d,f,u,h){let m;m=0==e?-c-1:v.visibledatarow[e-1]-c-1;let g,b=v.visibledatarow[e]-c;g=0==n?-s:v.visibledatacolumn[n-1]-s;let y=v.visibledatacolumn[a]-s,w=v.flowdata[e][o],k=y-g-2,T=b-m-2,R=g+d,S=m+f+1,_=I(w);r.font=_,r.save(),r.beginPath(),r.rect(R,S,k,T),r.clip(),r.scale(v.zoomRatio,v.zoomRatio);let x=C(w,r,{cellWidth:k,cellHeight:T,space_width:2,space_height:2,r:e,c:o}),p=t.checksAF(e,o,u),P=l.checksCF(e,o,h);r.fillStyle=i.checkstatus(v.flowdata,e,o,"fc"),null!=p&&null!=p[0]&&(r.fillStyle=p[0]),null!=P&&null!=P.textColor&&(r.fillStyle=P.textColor),Y(x,r,{pos_x:R,pos_y:S}),r.restore()};function G(e,l,t,o,i,n){let a=v.flowdata;if("forward"==o&&t<0)return{success:!1,r:e,c:t};if("backward"==o&&t>a[e].length-1)return{success:!1,r:e,c:t};let r=a[e][t];if(null!=r&&(!p(r.v)||null!=r.mc))return{success:!1,r:e,c:t};let c=l-1<0?0:v.visibledatacolumn[l-1],s=v.visibledatacolumn[l],d=n-(s-c);"0"==i?(c-=d/2,s+=d/2):"1"==i?s+=d:"2"==i&&(c-=d);let f=t-1<0?0:v.visibledatacolumn[t-1],u=v.visibledatacolumn[t];return"forward"==o?c<f?G(e,l,t-1,o,i,n):c<u?{success:!0,r:e,c:t}:{success:!1,r:e,c:t}:"backward"==o?s>u?G(e,l,t+1,o,i,n):s>f?{success:!0,r:e,c:t}:{success:!1,r:e,c:t}:void 0}function X(e,l,t,o,i){let n,a,r,c,s=!1,d=!1;for(let o in e){for(let f in e[o]){n=o,a=f;let u=e[o][f];if(r=u.stc,c=u.edc,n==l&&t>=r&&t<=c&&(s=!0,t==c||t==i)){d=!0;break}}if(d)break}return{colIn:s,colLast:d,rowIndex:n,colIndex:a,stc:r,edc:c}}function Y(e,l,t){if(null==e)return;let o=e.values,i=t.pos_x,n=t.pos_y;if(null!=o){0!=e.rotate&&"verticalWrap"!=e.type&&(l.save(),l.translate((i+e.textLeftAll)/v.zoomRatio,(n+e.textTopAll)/v.zoomRatio),l.rotate(-e.rotate*Math.PI/180),l.translate(-(e.textLeftAll+i)/v.zoomRatio,-(n+e.textTopAll)/v.zoomRatio));for(let e=0;e<o.length;e++){let t=o[e];!0===t.inline&&null!=t.style?(l.font=t.style.fontset,l.fillStyle=t.style.fc):l.font=t.style;let a="object"==typeof t.content?t.content.m:t.content;if(l.fillText(a,(i+t.left)/v.zoomRatio,(n+t.top)/v.zoomRatio),null!=t.cancelLine){let e=t.cancelLine;l.beginPath(),l.moveTo(Math.floor((i+e.startX)/v.zoomRatio)+.5,Math.floor((n+e.startY)/v.zoomRatio)+.5),l.lineTo(Math.floor((i+e.endX)/v.zoomRatio)+.5,Math.floor((n+e.endY)/v.zoomRatio)+.5),l.lineWidth=Math.floor(e.fs/9),l.strokeStyle=l.fillStyle,l.stroke(),l.closePath()}if(null!=t.underLine){let e=t.underLine;for(let t=0;t<e.length;t++){let o=e[t];l.beginPath(),l.moveTo(Math.floor((i+o.startX)/v.zoomRatio)+.5,Math.floor((n+o.startY)/v.zoomRatio)),l.lineTo(Math.floor((i+o.endX)/v.zoomRatio)+.5,Math.floor((n+o.endY)/v.zoomRatio)+.5),l.lineWidth=Math.floor(o.fs/9),l.strokeStyle=l.fillStyle,l.stroke(),l.closePath()}}}0!=e.rotate&&"verticalWrap"!=e.type&&l.restore()}}return{luckysheetDrawgridRowTitle:function(e,l,t){null==e&&(e=$("#luckysheet-cell-main").scrollTop()),null==l&&(l=v.luckysheetTableContentHW[1]),null==t&&(t=v.columnHeaderHeight);let o,i,n,a,r,c=$("#luckysheetTableContent").get(0).getContext("2d");c.save(),c.scale(v.devicePixelRatio,v.devicePixelRatio),c.clearRect(0,t,v.rowHeaderWidth-1,l),c.font=S(),c.textBaseline=T.textBaseline,c.fillStyle=T.fillStyle,o=_(v.visibledatarow,e),i=_(v.visibledatarow,e+l),-1==o&&(o=0),-1==i&&(i=v.visibledatarow.length-1),c.save(),c.beginPath(),c.rect(0,t-1,v.rowHeaderWidth-1,l-2),c.clip();for(let l=o;l<=i;l++){a=0==l?-e-1:v.visibledatarow[l-1]-e-1,n=v.visibledatarow[l]-e;let s=o==l?-2:0,d=i==l?-2:0;if(y.createHookFunction("rowTitleCellRenderBefore",l+1,{r:l,top:a+t+s,width:v.rowHeaderWidth-1,height:n-a+1+d-s},c)){if(null!=v.config.rowhidden&&null!=v.config.rowhidden[l]);else{c.fillStyle="#ffffff",c.fillRect(0,a+t+s,v.rowHeaderWidth-1,n-a+1+d-s),c.fillStyle="#000000",c.save(),c.scale(v.zoomRatio,v.zoomRatio);let e=H(l+1,c),o=(v.rowHeaderWidth-e.width)/2,i=a+(n-a)/2+t;c.fillText(l+1,o/v.zoomRatio,i/v.zoomRatio),c.restore()}c.beginPath(),c.moveTo(v.rowHeaderWidth-2+.5,a+t-2),c.lineTo(v.rowHeaderWidth-2+.5,n+t-2),c.lineWidth=1,c.strokeStyle=T.strokeStyle,c.stroke(),c.closePath(),null!=v.config.rowhidden&&null==v.config.rowhidden[l]&&null!=v.config.rowhidden[l+1]?(c.beginPath(),c.moveTo(-1,n+t-4+.5),c.lineTo(v.rowHeaderWidth-1,n+t-4+.5),c.closePath(),c.stroke()):null!=v.config.rowhidden&&null!=v.config.rowhidden[l]||(c.beginPath(),c.moveTo(-1,n+t-2+.5),c.lineTo(v.rowHeaderWidth-1,n+t-2+.5),c.closePath(),c.stroke()),null!=v.config.rowhidden&&null!=v.config.rowhidden[l-1]&&null!=r&&(c.beginPath(),c.moveTo(-1,r+t+.5),c.lineTo(v.rowHeaderWidth-1,r+t+.5),c.closePath(),c.stroke()),r=n,y.createHookFunction("rowTitleCellRenderAfter",l+1,{r:l,top:a+t+s,width:v.rowHeaderWidth-1,height:n-a+1+d-s},c)}}c.restore(),c.restore()},luckysheetDrawgridColumnTitle:function(e,l,t){null==e&&(e=$("#luckysheet-cell-main").scrollLeft()),null==l&&(l=v.luckysheetTableContentHW[0]),null==t&&(t=v.rowHeaderWidth);let o,i,n,a,r,c=$("#luckysheetTableContent").get(0).getContext("2d");c.save(),c.scale(v.devicePixelRatio,v.devicePixelRatio),c.clearRect(t,0,l,v.columnHeaderHeight-1),c.font=S(),c.textBaseline=T.textBaseline,c.fillStyle=T.fillStyle,o=_(v.visibledatacolumn,e),i=_(v.visibledatacolumn,e+l),-1==o&&(o=0),-1==i&&(i=v.visibledatacolumn.length-1),c.save(),c.beginPath(),c.rect(t-1,0,l,v.columnHeaderHeight-1),c.clip();for(let l=o;l<=i;l++){a=0==l?-e:v.visibledatacolumn[l-1]-e,n=v.visibledatacolumn[l]-e;let o=L(l);if(y.createHookFunction("columnTitleCellRenderBefore",o,{c:l,left:a+t-1,width:n-a,height:v.columnHeaderHeight-1},c)){if(null!=v.config.colhidden&&null!=v.config.colhidden[l]);else{c.fillStyle="#ffffff",c.fillRect(a+t-1,0,n-a,v.columnHeaderHeight-1),c.fillStyle="#000000",c.save(),c.scale(v.zoomRatio,v.zoomRatio);let e=H(o,c),l=Math.round(a+(n-a)/2+t-e.width/2),i=Math.round(v.columnHeaderHeight/2);c.fillText(o,l/v.zoomRatio,i/v.zoomRatio),c.restore()}null!=v.config.colhidden&&null==v.config.colhidden[l]&&null!=v.config.colhidden[l+1]?(c.beginPath(),c.moveTo(n+t-4+.5,0),c.lineTo(n+t-4+.5,v.columnHeaderHeight-2),c.lineWidth=1,c.strokeStyle=T.strokeStyle,c.closePath(),c.stroke()):null!=v.config.colhidden&&null!=v.config.colhidden[l]||(c.beginPath(),c.moveTo(n+t-2+.5,0),c.lineTo(n+t-2+.5,v.columnHeaderHeight-2),c.lineWidth=1,c.strokeStyle=T.strokeStyle,c.closePath(),c.stroke()),null!=v.config.colhidden&&null!=v.config.colhidden[l-1]&&null!=r&&(c.beginPath(),c.moveTo(r+t+.5,0),c.lineTo(r+t+.5,v.columnHeaderHeight-2),c.closePath(),c.stroke()),c.beginPath(),c.moveTo(a+t-1,v.columnHeaderHeight-2+.5),c.lineTo(n+t-1,v.columnHeaderHeight-2+.5),c.stroke(),c.closePath(),r=n,y.createHookFunction("columnTitleCellRenderAfter",o,{c:l,left:a+t-1,width:n-a,height:v.columnHeaderHeight-1},c)}}c.restore(),c.restore()},luckysheetDrawMain:function(o,n,a,r,c,s,d,f,u){if(null==v.flowdata)return;let h=k.getSheetByIndex();clearTimeout(v.measureTextCacheTimeOut),null==o&&(o=$("#luckysheet-cell-main").scrollLeft()),null==n&&(n=$("#luckysheet-cell-main").scrollTop()),null==a&&(a=v.luckysheetTableContentHW[0]),null==r&&(r=v.luckysheetTableContentHW[1]),null==c&&(c=v.rowHeaderWidth),null==s&&(s=v.columnHeaderHeight),null==d&&(d=0),null==f&&(f=0);let m,g,b,R,P,H,L,I,j=null;if(null==u)j=$("#luckysheetTableContent").get(0).getContext("2d");else if("object"==F(u))try{j=u.get(0).getContext("2d")}catch(e){j=u}else j=$("#"+u).get(0).getContext("2d");j.save(),j.scale(v.devicePixelRatio,v.devicePixelRatio),j.clearRect(0,0,v.luckysheetTableContentHW[0],v.luckysheetTableContentHW[1]),m=_(v.visibledatarow,n),g=_(v.visibledatarow,n+r),-1==m&&(m=0),m+=f,-1==g&&(g=v.visibledatarow.length-1),(g+=f)>=v.visibledatarow.length&&(g=v.visibledatarow.length-1),b=_(v.visibledatacolumn,o),R=_(v.visibledatacolumn,o+a),-1==b&&(b=0),b+=d,-1==R&&(R=v.visibledatacolumn.length-1),(R+=d)>=v.visibledatacolumn.length&&(R=v.visibledatacolumn.length-1),P=0==m?0:v.visibledatarow[m-1],H=v.visibledatarow[g],L=0==b?0:v.visibledatacolumn[b-1],I=v.visibledatacolumn[R],j.fillStyle="#ffffff",j.fillRect(c-1,s-1,I-o,H-n),j.font=S(),j.fillStyle=T.fillStyle;let Y=[],q={},V={};y.createHookFunction("cellAllRenderBefore",v.flowdata,h,j);for(let e=m;e<=g;e++){let l;l=0==e?-n-1:v.visibledatarow[e-1]-n-1;let t=v.visibledatarow[e]-n;if(null==v.config.rowhidden||null==v.config.rowhidden[e])for(let i=b;i<=R;i++){let n;n=0==i?-o:v.visibledatacolumn[i-1]-o;let a=v.visibledatacolumn[i]-o;if(null!=v.config.colhidden&&null!=v.config.colhidden[i])continue;let r=v.defaultcollen;if(null!=v.config.columnlen&&null!=v.config.columnlen[i]&&(r=v.config.columnlen[i]),null!=v.flowdata[e]&&null!=v.flowdata[e][i]){let o=v.flowdata[e][i];if("object"==F(o)&&"mc"in o){if(V[e+"_"+i]={start_r:l,start_c:n,end_r:t,end_c:a},!("rs"in o.mc)){let c="r"+o.mc.r+"c"+o.mc.c,s=Y[q[c]];null==s?(q[c]=Y.length,Y.push({r:e,c:i,start_c:n,start_r:l,end_r:t,end_c:a,firstcolumnlen:r})):(s.c==i&&(s.end_r+=t-l-1),s.r==e&&(s.end_c+=a-n,s.firstcolumnlen+=r));continue}q["r"+e+"c"+i]=Y.length}}Y.push({r:e,c:i,start_r:l,start_c:n,end_r:t,end_c:a,firstcolumnlen:r}),V[e+"_"+i]={start_r:l,start_c:n,end_r:t,end_c:a}}}let N=x(v.luckysheetfile[B(v.currentSheetIndex)].dynamicArray),E=t.getComputeMap(),J=l.getComputeMap(),K=function(e,l,t,o,n){let a={},r=v.flowdata;for(let c=o;c<=n;c++){if(null==r[c])continue;if(null!=v.cellOverflowMapCache[c]){a[c]=v.cellOverflowMapCache[c];continue}let o=!1;for(let n=0;n<r[c].length;n++){let s=r[c][n];if((null==v.config.colhidden||null==v.config.colhidden[n])&&null!=s&&(!p(s.v)||A(s))&&null==s.mc&&"1"==s.tb){let d=i.checkstatus(r,c,n,"ht"),f=C(s,e,{r:c,c:n}),u=0;null!=f&&(u=f.textWidthAll);let h,m,g=n-1<0?0:v.visibledatacolumn[n-1],b=v.visibledatacolumn[n];if(b-g<u){if("0"==d){let e=G(c,n,n-1,"forward",d,u),l=G(c,n,n+1,"backward",d,u);h=e.success?e.c:e.c+1,m=l.success?l.c:l.c-1}else if("1"==d){let e=G(c,n,n+1,"backward",d,u);h=n,m=e.success?e.c:e.c-1}else if("2"==d){let e=G(c,n,n-1,"forward",d,u);m=n,h=e.success?e.c:e.c+1}}else h=n,m=n;if((h<=t||m>=l)&&h<m){let e={r:c,stc:h,edc:m};null==a[c]&&(a[c]={}),a[c][n]=e,o=!0}}}o&&(v.cellOverflowMapCache[c]=a[c])}return a}(j,b,R,m,g),Q=[];for(let e=0;e<Y.length;e++){let l=Y[e],t=l.r,a=l.c,r=l.start_r,d=l.start_c,f=l.end_r,u=l.end_c;if(l.firstcolumnlen,null!=v.flowdata[t])if(null==v.flowdata[t][a])O(t,a,r,d,f,u,j,E,J,c,s,N,K,b,R,n,o,.5);else{let l=v.flowdata[t][a],h=null;if("object"==typeof l&&"mc"in l?Q.push(Y[e]):h=z(t,a),null==h||0==h.toString().length){O(t,a,r,d,f,u,j,E,J,c,s,N,K,b,R,n,o,.5);let e=i.borderfix(v.flowdata,t,a),l=[d+c+e[0],r+s+e[1],u-d-3+e[2],f-r-3-1+e[3]];M(t,a,l[0],l[1],"luckysheetTableContent",j)}else t+"_"+a in N&&(h=N[t+"_"+a].v),D(t,a,r,d,f,u,h,j,E,J,c,s,N,K,b,R,n,o,.5)}}for(let e=0;e<Q.length;e++){let l=Q[e],t=l.r,a=l.c,r=l.start_r,d=l.start_c,f=l.end_r-1,u=l.end_c-1,h=(l.firstcolumnlen,null),m=v.flowdata[t][a].mc;h=z(m.r,m.c),t=m.r,a=m.c;let g=v.flowdata[t][a];if(d=0==a?-o:v.visibledatacolumn[a-1]-o,r=0==t?-n-1:v.visibledatarow[t-1]-n-1,f=v.visibledatarow[t+g.mc.rs-1]-n,u=v.visibledatacolumn[a+g.mc.cs-1]-o,null==h||0==h.toString().length){O(t,a,r,d,f,u,j,E,J,c,s,N,K,b,R,n,o,.5,!0);let e=i.borderfix(v.flowdata,t,a),l=[d+c+e[0],r+s+e[1],u-d-3+e[2],f-r-3-1+e[3]];M(t,a,l[0],l[1],"luckysheetTableContent",j)}else t+"_"+a in N&&(h=N[t+"_"+a].v),D(t,a,r,d,f,u,h,j,E,J,c,s,N,K,b,R,n,o,.5,!0)}for(let l=m;l<=g;l++){let t;t=0==l?-n-1:v.visibledatarow[l-1]-n-1;let i=v.visibledatarow[l]-n;for(let n=b;n<=R;n++){let a;a=0==n?-o:v.visibledatacolumn[n-1]-o;let r=v.visibledatacolumn[n]-o;v.luckysheetcurrentisPivotTable&&e.drawPivotTable?((0==n||5==n)&&l<=11&&(j.beginPath(),j.moveTo(r-2+.5+c,t+s),j.lineTo(r-2+.5+c,i-2+.5+s),j.lineWidth=1,j.strokeStyle="#000000",j.closePath(),j.stroke()),(2==l||11==l)&&n<=5&&(j.beginPath(),j.moveTo(a-1+c,i-2+.5+s),j.lineTo(r-2+.5+c,i-2+.5+s),j.lineWidth=1,j.strokeStyle="#000000",j.closePath(),j.stroke()),6==l&&3==n&&(j.save(),j.font="bold 30px Arial",j.fillStyle="#626675",j.textAlign="center",j.fillText(w().pivotTable.title,a+(r-a)/2+4+c,t+(i-t)/2-1+s),j.restore())):v.luckysheetcurrentisPivotTable&&n<e.pivotTableBoundary[1]&&l<e.pivotTableBoundary[0]&&(j.beginPath(),j.moveTo(r-2+.5+c,t+s),j.lineTo(r-2+.5+c,i-2+.5+s),j.lineWidth=1,j.strokeStyle="#000000",j.closePath(),j.stroke(),j.beginPath(),j.moveTo(a-1+c,i-2+.5+s),j.lineTo(r-2+c,i-2+.5+s),j.lineWidth=1,j.strokeStyle="#000000",j.closePath(),j.stroke())}}if(null!=v.config.borderInfo&&v.config.borderInfo.length>0){let e=function(e,l,t,o,n,a,r,c,s){let d=e,f=o-2+.5+r,u=t+c-1,h=o-2+.5+r,m=n-2+.5+c;s.save(),i.setLineDash(s,d,"v",f,u,h,m),s.strokeStyle=l,s.stroke(),s.closePath(),s.restore()},l=function(e,l,t,o,n,a,r,c,s){let d=e,f=a-2+.5+r,u=t+c-1,h=a-2+.5+r,m=n-2+.5+c;s.save(),i.setLineDash(s,d,"v",f,u,h,m),s.strokeStyle=l,s.stroke(),s.closePath(),s.restore()},t=function(e,l,t,o,n,a,r,c,s){let d=e,f=o-2+.5+r,u=n-2+.5+c,h=a-2+.5+r,m=n-2+.5+c;s.save(),i.setLineDash(s,d,"h",f,u,h,m),s.strokeStyle=l,s.stroke(),s.closePath(),s.restore()},o=function(e,l,t,o,n,a,r,c,s){let d=e,f=o-2+.5+r,u=t-1+.5+c,h=a-2+.5+r,m=t-1+.5+c;s.save(),i.setLineDash(s,d,"h",f,u,h,m),s.strokeStyle=l,s.stroke(),s.closePath(),s.restore()},n=W(m,g,b,R);for(let i in n){let a=i.substr(0,i.indexOf("_")),r=i.substr(i.indexOf("_")+1);if(V[a+"_"+r]){let d=V[a+"_"+r].start_r,f=V[a+"_"+r].start_c,u=V[a+"_"+r].end_r,h=V[a+"_"+r].end_c,m=X(K,a,r,0,R),g=n[i].l;null==g||m.colIn&&m.stc!=r||e(g.style,g.color,d,f,u,h,c,s,j);let b=n[i].r;null==b||m.colIn&&!m.colLast||l(b.style,b.color,d,f,u,h,c,s,j);let y=n[i].t;null!=y&&o(y.style,y.color,d,f,u,h,c,s,j);let v=n[i].b;null!=v&&t(v.style,v.color,d,f,u,h,c,s,j)}}}R==v.visibledatacolumn.length-1&&j.clearRect(I-o+c-1,s-1,v.ch_width-v.visibledatacolumn[R],H-n),j.restore(),v.measureTextCacheTimeOut=setTimeout(()=>{v.measureTextCache={},v.measureTextCellInfoCache={},v.cellOverflowMapCache={}},100)}}});
//# sourceMappingURL=../sourcemaps/global/draw.js.map
