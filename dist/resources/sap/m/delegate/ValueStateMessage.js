/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/Object","sap/ui/core/RenderManager","sap/ui/core/ValueStateSupport","sap/ui/core/Popup","sap/ui/core/library","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/Aria"],function(t,e,o,a,n,r,jQuery){"use strict";var s=r.ValueState;var i=e.extend("sap.m.delegate.ValueState",{constructor:function(t){e.apply(this,arguments);this._oControl=t;this._oPopup=null}});i.prototype.open=function(){var e=this._oControl,o=this.getPopup(),a=this.createDom(),r=n.Dock,s;if(!e||!e.getDomRef()||!o||!a){return}var i=e.getValueState();var u=this._getValueStateText(e,i);s=jQuery(e.getDomRefForValueStateMessage());o.setContent(a);o.close(0);if(o.getContent()){o.getContent().style.maxWidth=e.getDomRef().offsetWidth+"px"}else{o.getContent().style.maxWidth=""}o.open(this.getOpenDuration(),r.BeginTop,r.BeginBottom,e.getDomRefForValueStateMessage(),null,null,null,t.system.phone?true:n.CLOSE_ON_SCROLL);this.createFormattedTextDOM(u,a);var p=jQuery(a);if(s.offset().top<p.offset().top){p.addClass("sapMValueStateMessageBottom")}else{p.addClass("sapMValueStateMessageTop")}};i.prototype.close=function(){if(this._oPopup){this._oPopup.close(0)}};i.prototype.getId=function(){var t=this._oControl;if(!t){return""}return typeof t.getValueStateMessageId==="function"?t.getValueStateMessageId():t.getId()+"-message"};i.prototype.getOpenDuration=function(){var t=this._oControl;if(!t){return 0}return t.iOpenMessagePopupDuration===undefined?0:t.iOpenMessagePopupDuration};i.prototype.createPopup=function(t){t=t||this.getId();if(this._oPopup){return this._oPopup}this._oPopup=new n(document.createElement("span"),false,false,false);this._oPopup.attachClosed(function(){jQuery(document.getElementById(t)).remove()});this._oPopup.attachOpened(function(){var t=this._oPopup.getContent();if(t){t.style.zIndex=this._getCorrectZIndex()}}.bind(this));return this._oPopup};i.prototype.getPopup=function(){if(!this._oControl){return null}return this.createPopup()};i.prototype._getValueStateText=function(t,e){if(e===s.Success||e===s.None){return""}var o=t.getFormattedValueStateText&&t.getFormattedValueStateText();var n=o&&o.getHtmlText();var r=t.getValueStateText()||a.getAdditionalText(t);return n?o:r};i.prototype.createDom=function(){var t=this._oControl;if(!t){return null}var e=this.getId(),o,a=document.createElement("div"),n=t.getValueState(),r=this._getValueStateText(t,n);if(n===s.Success||n===s.None){a.className="sapUiInvisibleText"}else{a.className="sapMValueStateMessage sapMValueStateMessage"+n}if(typeof r==="string"){o=document.createElement("span");o.id=e+"-text";o.appendChild(document.createTextNode(r));a.appendChild(o)}a.setAttribute("role","presentation");a.setAttribute("aria-hidden","true");a.id=e;return a};i.prototype.createFormattedTextDOM=function(t,e){if(typeof t==="string"){return}(new o).getInterface().render(t,e);e.lastElementChild.setAttribute("id",this.getId()+"-text")};i.prototype.destroy=function(){if(this._oPopup){this._oPopup.destroy();this._oPopup=null}this._oControl=null};i.prototype._getCorrectZIndex=function(){var t=this._oControl.$().parents().filter(function(){var t=jQuery(this).css("z-index");return t&&t!=="auto"&&t!=="0"});if(!t.length){return 1}var e=0;t.each(function(){var t=parseInt(jQuery(this).css("z-index"));if(t>e){e=t}});return e+1};return i});
//# sourceMappingURL=ValueStateMessage.js.map