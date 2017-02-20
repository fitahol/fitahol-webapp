webpackJsonp([10],{1332:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),o=a(n),i=r(2),l=a(i),s=r(3),c=a(s),u=r(6),d=a(u),f=r(5),p=a(f),m=r(0),h=a(m),g=r(764),v=a(g),b=r(84),y=a(b),C=r(377),P=r(1333),E=a(P),w=function(e){function t(e){(0,l["default"])(this,t);var r=(0,d["default"])(this,(0,o["default"])(t).call(this,e));return r.getUseInfo=r.getUseInfo.bind(r),r.changeEditor=r.changeEditor.bind(r),r.confirmEditor=r.confirmEditor.bind(r),r.canelEditor=r.canelEditor.bind(r),r}return(0,p["default"])(t,e),(0,c["default"])(t,[{key:"componentWillMount",value:function(){this.props.modalState&&this.props.modalClose(),this.getUseInfo()}},{key:"getUseInfo",value:function(){var e=y["default"].local.get("self")||y["default"].local.get("user_id")||0;this.props.fetchList("/account/profile/"+e+"/",void 0,"userInfo")}},{key:"changeEditor",value:function(e,t){var r=void 0;void 0!==t&&(r=+t,this.props.valChange(r,"gender")),this.props.valChange(!0,"editorStatus")}},{key:"canelEditor",value:function(){this.props.valChange(!1,"editorStatus"),this.getUseInfo()}},{key:"confirmEditor",value:function(){function e(e){e.code>=200&&e.code<300&&setTimeout(t.canelEditor,10)}var t=this,r=this.props,a=y["default"].local.get("self")||y["default"].local.get("user_id")||0,n=this.refs.nickname.value,o=this.refs.intro.value;this.props.fetchList("/account/profile/"+a+"/",{method:"PATCH",params:{nickname:n,intro:o,gender:r.gender}},void 0,e)}},{key:"render",value:function(){var e=this.props,t=e.userInfo||{},r={width:"7rem",flex:1},a=h["default"].createElement(C.RadioButtonGroup,{name:"shipSpeed",defaultSelected:(e.gender+1).toFixed(0),ref:"sex",className:"list-item-right choose-sex",onChange:this.changeEditor},h["default"].createElement(C.RadioButton,{value:"0",checkedIcon:h["default"].createElement(C.ActionFavorite,null),uncheckedIcon:h["default"].createElement(C.ActionFavoriteBorder,null),label:"男",style:r}),h["default"].createElement(C.RadioButton,{checkedIcon:h["default"].createElement(C.ActionFavorite,null),value:"1",uncheckedIcon:h["default"].createElement(C.ActionFavoriteBorder,null),label:"女",style:r})),n=e.modalState?h["default"].createElement(v["default"],{modal:e.modal,modalClose:e.modalClose,modalState:e.modalState,directTo:e.directTo}):"",o=e.editorStatus?h["default"].createElement("div",{className:"confirm-editor"},h["default"].createElement("a",{className:"cancel-btn",onClick:this.canelEditor},"取消编辑"),h["default"].createElement("a",{className:"confirm-btn",onClick:this.confirmEditor},"保存")):"";return h["default"].createElement("div",{className:"container personal-center-wrap"},h["default"].createElement(E["default"],{userInfo:t,choosePortraitInfo:e.choosePortraitInfo,largePortraitShow:e.largePortraitShow,modalOpen:e.modalOpen,directTo:e.directTo,fetchList:e.fetchList,valChange:e.valChange,getUseInfo:this.getUseInfo}),h["default"].createElement("div",{className:"panel"}),o,h["default"].createElement("div",{className:"list-item"},h["default"].createElement("span",null,"昵称"),h["default"].createElement("input",{type:"text",className:"list-item-right",placeholder:t.nickname||"昵称",ref:"nickname",onChange:this.changeEditor})),h["default"].createElement("div",{className:"list-item no-border"},h["default"].createElement("span",null,"账号"),h["default"].createElement("p",{className:"list-item-right"},t.nickname)),h["default"].createElement("div",{className:"panel"}),h["default"].createElement("div",{className:"list-item"},h["default"].createElement("span",null,"性别"),a),h["default"].createElement("div",{className:"list-item personal-center-item"},h["default"].createElement("span",null,"个性签名"),h["default"].createElement("input",{type:"text",placeholder:t.ontro||"个性签名",className:"list-item-right",ref:"intro",onChange:this.changeEditor})),n)}}]),t}(h["default"].Component);w.propTypes={valChange:m.PropTypes.func.isRequired,fetchList:m.PropTypes.func.isRequired,directTo:m.PropTypes.func.isRequired,modal:m.PropTypes.object.isRequired,modalState:m.PropTypes.bool.isRequired,modalOpen:m.PropTypes.func.isRequired,modalClose:m.PropTypes.func.isRequired,userInfo:m.PropTypes.object.isRequired,gender:m.PropTypes.number.isRequired,choosePortraitInfo:m.PropTypes.string.isRequired,editorStatus:m.PropTypes.bool.isRequired},w.defaultProps={userInfo:{}},t["default"]=w},1333:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),o=a(n),i=r(2),l=a(i),s=r(3),c=a(s),u=r(6),d=a(u),f=r(5),p=a(f),m=r(0),h=a(m),g=r(84),v=a(g),b=function(e){function t(e){(0,l["default"])(this,t);var r=(0,d["default"])(this,(0,o["default"])(t).call(this,e));return r.toggelPortrait=r.toggelPortrait.bind(r),r.changePortrait=r.changePortrait.bind(r),r.confirmChangePortrait=r.confirmChangePortrait.bind(r),r.cancelChangePortrait=r.cancelChangePortrait.bind(r),r.drawCanvasImage=r.drawCanvasImage.bind(r),r}return(0,p["default"])(t,e),(0,c["default"])(t,[{key:"toggelPortrait",value:function(e){e.preventDefault(),e.stopPropagation();var t=this.props;t.valChange(!t.largePortraitShow,"largePortraitShow")}},{key:"confirmChangePortrait",value:function(){function e(e){200===e.code&&setTimeout(t.getUseInfo,10)}var t=this.props,r=v["default"].local.get("self")||v["default"].local.get("user_id")||0;t.valChange(!1,"largePortraitShow"),t.fetchList("/account/profile/"+r+"/",{method:"PATCH",params:{nickname:t.userInfo.nickname,portrait:t.choosePortraitInfo}},"undefined",e)}},{key:"cancelChangePortrait",value:function(){var e=this.props;e.valChange(!1,"largePortraitShow"),e.valChange("","choosePortraitInfo")}},{key:"changePortrait",value:function(e){this.readImage(e.target.files[0])}},{key:"loadImage",value:function(e,t){var r=new Image;r.src=e,r.onload=function(){t(r)},r.onerror=function(){t(!1)}}},{key:"readImage",value:function(e){var t=this,r=new FileReader;r.onload=function(e){t.loadImage(e.target.result,t.drawCanvasImage)},r.readAsDataURL(e)}},{key:"drawCanvasImage",value:function(e){function t(){var t=document.createElement("canvas"),i=t.getContext("2d"),l=document.createElement("canvas"),s=l.getContext("2d");i.fillStyle="#fff",i.clearRect(0,0,t.width,t.height),t.width=a,t.height=n;var c=a*n/1e6;if(c>1){c=~~(Math.sqrt(c)+1);var u=~~(a/c),d=~~(n/c);l.width=u,l.height=d;for(var f=0;f<c;f++)for(var p=0;p<c;p++)s.drawImage(e,f*u*o,p*d*o,u*o,d*o,0,0,u,d),i.drawImage(l,f*u,p*d,u,d)}else i.drawImage(e,0,0,t.width,t.height);var m=t.toDataURL("image/jpg",.1);r.valChange(m,"choosePortraitInfo"),r.valChange(!0,"largePortraitShow")}var r=this.props,a=e.width,n=e.height,o=a*n/1e6;o>1?(o=Math.sqrt(o),a/=o,n/=o):o=1,t()}},{key:"render",value:function(){var e=this.props,t=this.props.userInfo||{},r=void 0;return e.largePortraitShow&&(r=e.choosePortraitInfo?h["default"].createElement("div",{className:"large-portrait-wrap"},h["default"].createElement("div",{className:"large-portrait"},h["default"].createElement("img",{src:e.choosePortraitInfo,alt:"",onClick:this.toggelPortrait})),h["default"].createElement("a",{className:"cancel-btn",onClick:this.cancelChangePortrait},"取消"),h["default"].createElement("a",{className:"confirm-btn",onClick:this.confirmChangePortrait},"确认使用")):h["default"].createElement("div",{className:"large-portrait-wrap"},h["default"].createElement("div",{className:"large-portrait"},h["default"].createElement("img",{src:t.portrait,alt:"",onClick:this.toggelPortrait})))),h["default"].createElement("div",{className:"list-item personal-center-item no-border"},h["default"].createElement("input",{type:"file",accept:"image/png,image/jpeg,image/gif",name:"file",onChange:this.changePortrait,className:"file-input"}),h["default"].createElement("img",{src:t.portrait,alt:"",onClick:this.toggelPortrait,className:"small-portrait"}),r)}}]),t}(h["default"].Component);b.propTypes={valChange:m.PropTypes.func.isRequired,fetchList:m.PropTypes.func.isRequired,directTo:m.PropTypes.func.isRequired,modalOpen:m.PropTypes.func.isRequired,getUseInfo:m.PropTypes.func.isRequired,userInfo:m.PropTypes.object.isRequired,choosePortraitInfo:m.PropTypes.string.isRequired,largePortraitShow:m.PropTypes.bool.isRequired},b.defaultProps={userInfo:{}},t["default"]=b},1334:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(376),o=r(1332),i=a(o),l=r(272),s={fetchList:function(e,t,r,a){return(0,l.fetchList)(e,t,r,a)},valChange:function(e,t){return(0,l.valChange)(e,t)},modalClose:function(){return(0,l.modalClose)()},modalOpen:function(e){return(0,l.modalOpen)(e)},directTo:function(e){return(0,l.directTo)(e)}},c=function(e){return{modal:e.personalCenter.modal,modalState:e.personalCenter.modalState,userInfo:e.personalCenter.userInfo,gender:e.personalCenter.gender,largePortraitShow:e.personalCenter.largePortraitShow,choosePortraitInfo:e.personalCenter.choosePortraitInfo,editorStatus:e.personalCenter.editorStatus}};t["default"]=(0,n.connect)(c,s)(i["default"])},1335:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}function n(){var e=arguments.length<=0||void 0===arguments[0]?c:arguments[0],t=arguments[1];if("/personal-center"!==location.pathname)return e;var r=s[t.type];return r?r(e,t):e}Object.defineProperty(t,"__esModule",{value:!0});var o=r(8),i=a(o);t["default"]=n;var l=r(375),s=(0,i["default"])({},l.globalHandler),c={modal:{},modalState:!1,userInfo:{},gender:0,largePortraitShow:!1,choosePortraitInfo:"",editorStatus:!1}},1364:function(e,t,r){t=e.exports=r(759)(),t.push([e.i,".personal-center-wrap{padding:3.33rem 0 56px;color:#333}.personal-center-item{position:relative}.personal-center-item .small-portrait{width:8rem;height:8rem;margin:2rem auto;display:block;position:relative;z-index:10}.personal-center-wrap input{text-align:right;color:#333}.personal-center-wrap input::-webkit-input-placeholder{color:#333}.no-border{border:0 none}.personal-center-wrap .list-item-right{line-height:4rem}.choose-sex{padding-top:1rem;padding-left:8rem}.choose-sex,.large-portrait-wrap{display:-webkit-box;display:-ms-flexbox;display:flex}.large-portrait-wrap{position:fixed;left:0;top:0;width:100%;height:100%;z-index:998;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;text-align:center;-webkit-display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-align-items:center;background:rgba(0,0,0,.6)}.large-portrait-wrap a{width:6rem;height:2rem;line-height:2rem;text-align:center;position:absolute;top:10%;border-radius:.5rem}.large-portrait-wrap .cancel-btn{left:10%}.large-portrait-wrap .confirm-btn{right:10%}.large-portrait{width:70%;background:#fff;margin:0 auto;position:relative;top:-5%}.large-portrait img{width:100%}.file-input{position:absolute;left:0;top:0;width:100%;height:100%;opacity:0;z-index:1}.confirm-editor{margin-left:56%}.confirm-editor a{width:5rem;line-height:2rem;text-align:center;margin-top:.5rem;display:inline-block}.confirm-editor .cancel-btn{margin-right:8%}",""])},1385:function(e,t,r){var a=r(1364);"string"==typeof a&&(a=[[e.i,a,""]]);r(760)(a,{});a.locals&&(e.exports=a.locals)},751:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(375),o=r(1334),i=a(o),l=r(1335),s=a(l);r(1385),t["default"]=function(e,t){(0,n.injectReducer)(e,{key:"personalCenter",reducer:s["default"]}),t(null,i["default"])}},759:function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var r=this[t];r[2]?e.push("@media "+r[2]+"{"+r[1]+"}"):e.push(r[1])}return e.join("")},e.i=function(t,r){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},n=0;n<this.length;n++){var o=this[n][0];"number"==typeof o&&(a[o]=!0)}for(n=0;n<t.length;n++){var i=t[n];"number"==typeof i[0]&&a[i[0]]||(r&&!i[2]?i[2]=r:r&&(i[2]="("+i[2]+") and ("+r+")"),e.push(i))}},e}},760:function(e,t){function r(e,t){for(var r=0;r<e.length;r++){var a=e[r],n=f[a.id];if(n){n.refs++;for(var o=0;o<n.parts.length;o++)n.parts[o](a.parts[o]);for(;o<a.parts.length;o++)n.parts.push(s(a.parts[o],t))}else{for(var i=[],o=0;o<a.parts.length;o++)i.push(s(a.parts[o],t));f[a.id]={id:a.id,refs:1,parts:i}}}}function a(e){for(var t=[],r={},a=0;a<e.length;a++){var n=e[a],o=n[0],i=n[1],l=n[2],s=n[3],c={css:i,media:l,sourceMap:s};r[o]?r[o].parts.push(c):t.push(r[o]={id:o,parts:[c]})}return t}function n(e,t){var r=h(),a=b[b.length-1];if("top"===e.insertAt)a?a.nextSibling?r.insertBefore(t,a.nextSibling):r.appendChild(t):r.insertBefore(t,r.firstChild),b.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");r.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=b.indexOf(e);t>=0&&b.splice(t,1)}function i(e){var t=document.createElement("style");return t.type="text/css",n(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",n(e,t),t}function s(e,t){var r,a,n;if(t.singleton){var s=v++;r=g||(g=i(t)),a=c.bind(null,r,s,!1),n=c.bind(null,r,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(r=l(t),a=d.bind(null,r),n=function(){o(r),r.href&&URL.revokeObjectURL(r.href)}):(r=i(t),a=u.bind(null,r),n=function(){o(r)});return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else n()}}function c(e,t,r,a){var n=r?"":a.css;if(e.styleSheet)e.styleSheet.cssText=y(t,n);else{var o=document.createTextNode(n),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}function u(e,t){var r=t.css,a=t.media;if(a&&e.setAttribute("media",a),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}function d(e,t){var r=t.css,a=t.sourceMap;a&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */");var n=new Blob([r],{type:"text/css"}),o=e.href;e.href=URL.createObjectURL(n),o&&URL.revokeObjectURL(o)}var f={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},m=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),g=null,v=0,b=[];e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},"undefined"==typeof t.singleton&&(t.singleton=m()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=a(e);return r(n,t),function(e){for(var o=[],i=0;i<n.length;i++){var l=n[i],s=f[l.id];s.refs--,o.push(s)}if(e){var c=a(e);r(c,t)}for(var i=0;i<o.length;i++){var s=o[i];if(0===s.refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete f[s.id]}}}};var y=function(){var e=[];return function(t,r){return e[t]=r,e.filter(Boolean).join("\n")}}()},764:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(765),o=a(n);t["default"]=o["default"]},765:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(4),o=a(n),i=r(2),l=a(i),s=r(3),c=a(s),u=r(6),d=a(u),f=r(5),p=a(f),m=r(0),h=a(m),g=r(274),v=a(g),b=r(275),y=a(b),C=function(e){function t(e){(0,l["default"])(this,t);var r=(0,d["default"])(this,(0,o["default"])(t).call(this,e));return r.confirm=r.confirm.bind(r),r.cancel=r.cancel.bind(r),r}return(0,p["default"])(t,e),(0,c["default"])(t,[{key:"confirm",value:function(e){e.preventDefault(),e.stopPropagation();var t=this.props.modal;t.confirmCallback&&t.confirmCallback(),this.props.modalClose()}},{key:"cancel",value:function(e){e.preventDefault(),e.stopPropagation();var t=this.props.modal;t.cancelCallback&&t.cancelCallback(),this.props.modalClose()}},{key:"render",value:function(){var e=this.props,t=void 0;return t=e.cancel&&e.confirm?[h["default"].createElement(y["default"],{label:e.cancel,primary:!0,onTouchTap:this.cancel}),h["default"].createElement(y["default"],{label:e.confirm,primary:!0,onTouchTap:this.confirm})]:[h["default"].createElement(y["default"],{label:e.confirm||"确认",primary:!0,onTouchTap:this.confirm})],h["default"].createElement(v["default"],{modal:!1,actions:t,open:e.modalState,onRequestClose:e.modalClose},e.modal.content)}}]),t}(h["default"].Component);C.propTypes={modal:m.PropTypes.object.isRequired,modalState:m.PropTypes.bool.isRequired,modalClose:m.PropTypes.func.isRequired,directTo:m.PropTypes.func},C.defaultProps={modal:{content:"",cancel:"",cancelCallback:function(){},confirm:"",confirmCallback:function(){}}},t["default"]=C}});