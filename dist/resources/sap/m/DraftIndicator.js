/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Label","sap/m/library","./DraftIndicatorRenderer","sap/ui/core/Lib"],function(e,t,a,i,r){"use strict";var o=a.DraftIndicatorState;var s=e.extend("sap.m.DraftIndicator",{metadata:{library:"sap.m",designtime:"sap/m/designtime/DraftIndicator.designtime",properties:{state:{type:"sap.m.DraftIndicatorState",group:"Behavior",defaultValue:o.Clear},minDisplayTime:{type:"int",group:"Behavior",defaultValue:1500}},aggregations:{_label:{type:"sap.m.Label",multiple:false,visibility:"hidden"}}},renderer:i});var u=r.getResourceBundleFor("sap.m");s._oTEXTS={};s._oTEXTS[o.Saving]=u.getText("DRAFT_INDICATOR_SAVING_DRAFT");s._oTEXTS[o.Saved]=u.getText("DRAFT_INDICATOR_DRAFT_SAVED");s._oTEXTS[o.Clear]="";s.prototype.init=function(){this.aQueue=[];this.iDelayedCallId=null};s.prototype.exit=function(){this._resetDraftTimer()};s.prototype.setState=function(e){this.setProperty("state",e);this._addToQueue(e);if(e===o.Saving){this._addToQueue(o.Clear)}return this};s.prototype._getLabel=function(){var e=this.getAggregation("_label");if(!e){var e=new t({id:this.getId()+"-label"});this.setAggregation("_label",e,true);e=this.getAggregation("_label")}return e};s.prototype.showDraftSaving=function(){this._addToQueue(o.Saving);this._addToQueue(o.Clear)};s.prototype.showDraftSaved=function(){this._addToQueue(o.Saved)};s.prototype.clearDraftState=function(){this._addToQueue(o.Clear)};s.prototype._addToQueue=function(e){this.aQueue.push(e);this._processQueue()};s.prototype._processQueue=function(){if(this.iDelayedCallId){return}var e=this.aQueue.shift();var t=this.getMinDisplayTime();if(!e){return}this._applyState(e);if(e===o.Clear){this._proceed();return}this.iDelayedCallId=setTimeout(this._proceed.bind(this),t)};s.prototype._proceed=function(){this._resetDraftTimer();this._processQueue()};s.prototype._applyState=function(e){this._getLabel().setText(s._oTEXTS[e])};s.prototype._resetDraftTimer=function(){clearTimeout(this.iDelayedCallId);this.iDelayedCallId=null};return s});
//# sourceMappingURL=DraftIndicator.js.map