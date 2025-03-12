/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/Engine","sap/m/p13n/modules/xConfigAPI"],(e,t)=>{"use strict";const n={};const a=(e,t)=>{const n=t=>{if(e._pQueue===t){delete e._pQueue}};e._pQueue=e._pQueue instanceof Promise?e._pQueue.then(t):t();e._pQueue.then(n.bind(null,e._pQueue));return e._pQueue};function g(t,n){if(t.isA){e.getInstance().trace(t,{selectorElement:t,changeSpecificData:{changeType:n.getChangeType(),content:n.getContent()}});if(!t._pPendingModification){t._pPendingModification=e.getInstance().waitForChanges(t).then(()=>{e.getInstance().fireStateChange(t);e.getInstance().clearTrace(t);delete t._pPendingModification})}}}function r(e){const t=["add","remove","move","set"];return t.find(t=>e.indexOf(t)===0)}function o(e){const t={add:"remove",remove:"add",move:"move",set:"set"};const n=r(e);return t[n]}n.createHandler=n=>{if(!n||!n.hasOwnProperty("property")){throw new Error("Please provide a map containing the affected aggregation and property name!")}const i=n.property;let s;return{changeHandler:{applyChange:function(o,c,p){const u=o.getContent().persistenceIdentifier;const f=e.getInstance().getController(c,o.getChangeType(),u);if(u&&f.getPersistenceIdentifier()!==u){return Promise.resolve(false)}return a(c,()=>e.getInstance().readXConfig(c,{propertyBag:p}).then(async a=>{const g=r(o.getChangeType());s=o.getContent().targetAggregation;const f={key:o.getContent().key};if(u){f.persistenceIdentifier=u}if(g!=="set"){f.value=g!=="add"}else{f.value=null}if(!a||!(a?.aggregations?.[s]?.length>0)){const e=await t.getCurrentItemState(c,{propertyBag:p,changeType:o.getChangeType()},a,s);if(e){const t=e?.find((e,t)=>e.key===o.getContent().key);f.index=e.indexOf(t)}}f.targetAggregation=o.getContent().targetAggregation;const d=a?.aggregations?.[s]?.[o.getContent().key];if(d){if(d?.[i]){f.value=a.aggregations[s][o.getContent().key][i]}f.index=a.aggregations[s][o.getContent().key].position!==undefined?a.aggregations[s][o.getContent().key].position:f.index}o.setRevertData(f);const y={property:i,key:o.getContent().key,value:o.getContent(),operation:g,changeType:o.getChangeType(),propertyBag:p,markAsModified:true};if(n.aggregationBased){y.controlMeta={aggregation:s}}return e.getInstance().enhanceXConfig(c,y)}).then(e=>{if(!e){return}g(c,o)}))},completeChangeContent:function(e,t,n){},revertChange:function(t,a,r){const c=o(t.getChangeType());s=t.getContent().targetAggregation;const p={controlMeta:{aggregation:s,property:i},property:i,operation:c,changeType:t.getChangeType(),key:t.getRevertData().key,value:t.getRevertData(),propertyBag:r};if(n.aggregationBased){p.controlMeta={aggregation:s}}return e.getInstance().enhanceXConfig(a,p).then(e=>{if(!e){return}t.resetRevertData();g(a,t)})}},layers:{USER:true}}};return n});
//# sourceMappingURL=xConfigHandler.js.map