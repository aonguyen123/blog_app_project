(window["webpackJsonpreact-antd"]=window["webpackJsonpreact-antd"]||[]).push([[31],{1260:function(e,t,n){"use strict";n.r(t);var r=n(9),a=n(51),o=n(0),i=n.n(o),c=n(1256),l=n(1244),u=n(786),s=c.a.Item;function f(e){var t=e.form;return i.a.createElement(c.a,Object.assign({form:t},{labelCol:{span:8},wrapperCol:{span:13}},{layout:"horizontal",name:"changePasswordForm"}),i.a.createElement(s,{label:"Current Password",name:"current_password",rules:[{required:!0,message:"Please input your current password"}]},i.a.createElement(u.a.Password,null)),i.a.createElement(s,{label:"New Password",name:"new_password",rules:[{required:!0,message:"Please input your new password"}]},i.a.createElement(u.a.Password,null)),i.a.createElement(s,{label:"Password Comfirm",name:"password_comfirm",rules:[{required:!0,message:"Please input your confirm password"}]},i.a.createElement(u.a.Password,null)))}var d=n(55),m=n(917),p=n.n(m),b=n(4),h=n.n(b),w=n(31),y=n(128),v=n.n(y),g=n(149),O=n(44),E=n(42),P=n(93);function j(e){return(j="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function S(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(e,t){return!t||"object"!==j(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function I(e){return(I=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,t){return(N=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var x=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=_(this,I(t).call(this,e))).saveSwitch=function(e){n.rcSwitch=e},n.renderSwitch=function(e){var t=e.getPrefixCls,r=e.direction,a=n.props,i=a.prefixCls,c=a.size,l=a.loading,u=a.className,s=void 0===u?"":u,f=a.disabled,d=t("switch",i),m=l?o.createElement(v.a,{className:"".concat(d,"-loading-icon")}):null;return o.createElement(P.b.Consumer,null,(function(e){var t,a=h()(s,(S(t={},"".concat(d,"-small"),"small"===(c||e)),S(t,"".concat(d,"-loading"),l),S(t,"".concat(d,"-rtl"),"rtl"===r),t));return o.createElement(g.a,{insertExtraNode:!0},o.createElement(p.a,C({},Object(w.default)(n.props,["loading"]),{prefixCls:d,className:a,disabled:f||l,ref:n.saveSwitch,loadingIcon:m})))}))},Object(E.a)("checked"in e||!("value"in e),"Switch","`value` is not validate prop, do you mean `checked`?"),n}var n,r,a;return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&N(e,t)}(t,e),n=t,(r=[{key:"focus",value:function(){this.rcSwitch.focus()}},{key:"blur",value:function(){this.rcSwitch.blur()}},{key:"render",value:function(){return o.createElement(O.a,null,this.renderSwitch)}}])&&k(n.prototype,r),a&&k(n,a),t}(o.Component);function F(e){return[{name:"Account Password",action:i.a.createElement(d.a,{htmlType:"button",type:"link",onClick:function(){return e()},style:{margin:0,padding:0}},"Modify"),description:"Account passwords may be modify"},{name:"Security Phone",action:i.a.createElement(x,{checkedChildren:"Show",unCheckedChildren:"Hide",defaultChecked:!1}),description:"Phone numbers can be shown or hidden to everyone"}]}x.__ANT_SWITCH=!0;var L=n(209);function T(e){var t=Object(o.useState)({visible:!1,confirmLoading:!1}),n=Object(a.a)(t,2),u=n[0],s=n[1],d=c.a.useForm(),m=Object(a.a)(d,1)[0],p=Object(o.useCallback)((function(){m.submit()}),[m]);return i.a.createElement(c.a.Provider,{onFormFinish:function(e,t){t.values,t.forms;"changePasswordForm"===e&&s(Object(r.a)({},u,{visible:!1,confirmLoading:!1}))}},i.a.createElement(l.a,{itemLayout:"horizontal",dataSource:F((function(){s(Object(r.a)({},u,{visible:!0}))})),renderItem:function(e){return i.a.createElement(l.a.Item,{actions:[e.action]},i.a.createElement(l.a.Item.Meta,{title:e.name,description:e.description}))}}),i.a.createElement(L.h,{title:"Change the password",visible:u.visible,handleCancel:function(){s(Object(r.a)({},u,{visible:!1}))},handleOk:p,confirmLoading:u.confirmLoading,content:i.a.createElement(f,{form:m})}))}n.d(t,"default",(function(){return T}))}}]);