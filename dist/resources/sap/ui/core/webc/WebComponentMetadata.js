/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../ElementMetadata","./WebComponentRenderer","sap/base/strings/camelize"],function(t,r,e){"use strict";var o=["property","style","textContent","slot","none"];var p=function(r,e){t.apply(this,arguments)};p.prototype=Object.create(t.prototype);p.prototype.constructor=p;var a=function(t){return o.includes(t)?t:o[0]};var i=t.prototype.metaFactoryProperty;var n=function(t,r,e){i.apply(this,arguments);if(!e.mapping||typeof e.mapping==="string"){this._sMapping=a(e.mapping)}else if(typeof e.mapping==="object"){this._sMapping=a(e.mapping.type);this._sMapTo=e.mapping.to;this._sSlotName=e.mapping.slotName;this._fnMappingFormatter=e.mapping.formatter;this._fnMappingParser=e.mapping.parser}};n.prototype=Object.create(i.prototype);n.prototype.constructor=n;p.prototype.metaFactoryProperty=n;var s=t.prototype.metaFactoryAggregation;var g=function(t,r,e){s.apply(this,arguments);this._sSlot=e.slot||""};g.prototype=Object.create(s.prototype);g.prototype.constructor=g;p.prototype.metaFactoryAggregation=g;var c=t.prototype.metaFactoryAssociation;var y=function(t,r,e){c.apply(this,arguments);if(!e.mapping||typeof e.mapping!=="object"){this._sMapping=""}else{this._sMapping="property";this._sMapTo=e.mapping.to;this._fnMappingFormatter=e.mapping.formatter;this._fnMappingParser=e.mapping.parser}};y.prototype=Object.create(c.prototype);y.prototype.constructor=y;p.prototype.metaFactoryAssociation=y;p.prototype.applySettings=function(r){var e=r.metadata;this._sTag=e.tag;this._aMethods=e.methods||[];this._aGetters=e.getters||[];t.prototype.applySettings.call(this,r)};p.prototype.generateAccessors=function(){t.prototype.generateAccessors.call(this);var r=this.getClass().prototype;this._aMethods.forEach(function(t){if(!r[t]){r[t]=function(){return this.__callPublicMethod(t,arguments)}}});this._aGetters.forEach(function(t){var e="get"+t.substr(0,1).toUpperCase()+t.substr(1);if(!r[e]){r[e]=function(){return this.__callPublicGetter(t)}}})};p.prototype.getTag=function(){return this._sTag};p.prototype.getMethods=function(){return this._aMethods};p.prototype.getGetters=function(){return this._aGetters};p.prototype.getAggregationSlot=function(t){var r=this._mAllAggregations[t];return r?r._sSlot:undefined};p.prototype.isManagedAttribute=function(t){var r=this.getAllProperties();for(var o in r){if(r.hasOwnProperty(o)){var p=r[o];if(p._sMapping==="property"&&(p._sMapTo===t||e(t)===o)){return true}}}var a=this.getAllAssociations();for(var i in a){if(a.hasOwnProperty(i)){var n=a[i];if(n._sMapping==="property"&&n._sMapTo===e(t)){return true}}}return false};p.prototype.getPropertiesByMapping=function(t){var r={};var e=this.getAllProperties();var o=this.getAllPrivateProperties();for(var p in e){if(e.hasOwnProperty(p)){var a=e[p];if(a._sMapping===t){r[p]=a}}}for(var p in o){if(o.hasOwnProperty(p)){var a=o[p];if(a._sMapping===t){r[p]=a}}}return r};p.prototype.getAssociationsWithMapping=function(){var t={};var r=this.getAllAssociations();for(var e in r){if(r.hasOwnProperty(e)){var o=r[e];if(o._sMapping){t[e]=o}}}return t};p.prototype.getRenderer=function(){if(this._oRenderer){return this._oRenderer}return r};return p});
//# sourceMappingURL=WebComponentMetadata.js.map