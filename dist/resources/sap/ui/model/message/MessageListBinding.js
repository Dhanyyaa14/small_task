/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/strings/hash","sap/base/util/deepEqual","sap/base/util/deepExtend","sap/base/util/each","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding"],function(t,e,s,i,n,a){"use strict";var o=a.extend("sap.ui.model.message.MessageListBinding");o.prototype.enableExtendedChangeDetection=function(){a.prototype.enableExtendedChangeDetection.apply(this,arguments);this.oExtendedChangeDetectionConfig=this.oExtendedChangeDetectionConfig||{};this.oExtendedChangeDetectionConfig.symbol=function(e){if(typeof e!=="string"){return this.getContextData(e)}return t(e)}.bind(this)};o.prototype.getEntryData=function(t){var e=t.getObject();var s=e.processor;delete e.processor;var i=JSON.stringify(e);e.processor=s;return i};o.prototype.update=function(){var t=this.oModel._getObject(this.sPath,this.oContext);if(Array.isArray(t)){if(this.bUseExtendedChangeDetection){this.oList=s([],t)}else{this.oList=t.slice(0)}this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength()}else{this.oList=[];this.aIndices=[];this.iLength=0}};o.prototype.checkUpdate=function(t){var s;if(this.bSuspended&&!this.bIgnoreSuspend){return}if(!this.bUseExtendedChangeDetection){s=this.oModel._getObject(this.sPath,this.oContext);if(!e(this.oList,s)||t){this.update();this._fireChange({reason:n.Change})}}else{var a=false;var o=this;s=this.oModel._getObject(this.sPath,this.oContext);if(!e(this.oList,s)){this.update()}var h=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts){if(this.aLastContexts.length!=h.length){a=true}else{i(this.aLastContextData,function(t,e){if(o.getContextData(h[t])!==e){a=true;return false}return true})}}else{a=true}if(a||t){this._fireChange({reason:n.Change})}}};return o});
//# sourceMappingURL=MessageListBinding.js.map