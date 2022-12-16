/**
 * skylark-lucksheet - A version of lucksheet.js that ported to running on skylarkjs.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(function(){"use strict";const o={autoFormatw:!1,accuracy:void 0,total:0,allowCopy:!0,showtoolbar:!0,showinfobar:!0,showsheetbar:!0,showstatisticBar:!0,pointEdit:!1,pointEditUpdate:null,pointEditZoom:1,userInfo:!1,userMenuItem:[],myFolderUrl:null,functionButton:null,showConfigWindowResize:!0,enableAddRow:!0,enableAddBackTop:!0,enablePage:!0,pageInfo:null,editMode:!1,beforeCreateDom:null,workbookCreateBefore:null,workbookCreateAfter:null,fireMousedown:null,plugins:[],forceCalculation:!1,defaultColWidth:73,defaultRowHeight:19,defaultTextColor:"#000",defaultCellColor:"#fff",isEditMode:function(){return!!o.editMode},createHookFunction:function(){let e=arguments[0];if(o.hook&&null!=o.hook[e]&&"function"==typeof o.hook[e]){var t=Array.prototype.slice.apply(arguments);return t.shift(),!1!==o.hook[e].apply(this,t)}return!0}};return o});
//# sourceMappingURL=../sourcemaps/methods/luckysheetConfigsetting.js.map
