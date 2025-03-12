/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(e,t,i,n){"use strict";var r="sap.ui.model.odata.v4.Context",o=0,s,h=-9007199254740991,a=n.extend("sap.ui.model.odata.v4.Context",{constructor:d});function d(e,t,i,r,o,s,h){if(i[0]!=="/"){throw new Error("Not an absolute path: "+i)}if(i.endsWith("/")){throw new Error("Unsupported trailing slash: "+i)}n.call(this,e,i);this.oBinding=t;this.setCreated(o);this.oDeletePromise=null;this.bFiringCreateActivate=false;this.iGeneration=s||0;this.bInactive=h||undefined;this.iIndex=r;this.bKeepAlive=false;this.bOutOfPlace=false;this.bSelected=false;this.fnOnBeforeDestroy=undefined}a.prototype.adjustPredicate=function(e,t,i){var n=this.sPath;this.sPath=n.replace(e,t);if(i){i(n,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(i){i.adjustPredicate(e,t)})};a.prototype.checkUpdate=function(){if(this.oModel){this.oModel.getDependentBindings(this).forEach(function(e){e.checkUpdate()})}};a.prototype.checkUpdateInternal=function(){return i.all(this.oModel.getDependentBindings(this).map(function(e){return e.checkUpdateInternal()}))};a.prototype.collapse=function(e){switch(this.getProperty("@$ui5.node.level")===0?undefined:this.isExpanded()){case true:this.oBinding.collapse(this,e);break;case false:throw new Error("Already collapsed: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.created=function(){return this.oCreatedPromise};a.prototype.delete=function(t,n){var r,o=null,s=this;if(this.isDeleted()){throw new Error("Must not delete twice: "+this)}if(e.isDataAggregation(this.oBinding.mParameters)){throw new Error("Cannot delete "+this+" when using data aggregation")}this.oBinding.checkSuspended();if(this.isTransient()){if(!this.oBinding.getHeaderContext){throw new Error("Cannot delete "+this)}if(this.iIndex===undefined){return Promise.resolve()}t=null}else if(t===null){if(this.iIndex!==undefined||!this.isKeepAlive()){throw new Error("Cannot delete "+this)}}if(this.oBinding.mParameters.$$aggregation){if(this.iIndex===undefined){throw new Error("Unsupported kept-alive context: "+this)}if(t!==null){const e=t??this.oBinding.getUpdateGroupId();if(this.oModel.isApiGroup(e)){throw new Error("Unsupported group ID: "+e)}}}if(t===null){r=i.resolve();n=true}else{e.checkGroupId(t,false,true);r=this.fetchCanonicalPath().then(function(e){return e.slice(1)});o=this.oBinding.lockGroup(t,true,true)}return Promise.resolve(r.then(function(e){return s.oBinding.delete(o,e,s,null,n,function(){s.oDeletePromise=null})}).catch(function(e){if(o){o.unlock(true)}throw e}))};a.prototype.destroy=function(){var e=this.fnOnBeforeDestroy;if(e){this.fnOnBeforeDestroy=undefined;e()}this.oModel?.getDependentBindings(this).forEach(function(e){e.setContext(undefined)});this.oBinding=undefined;delete this.mChangeListeners;this.oCreatedPromise=undefined;this.oSyncCreatePromise=undefined;this.bInactive=undefined;this.bKeepAlive=undefined;this.bSelected=false;this.oModel=undefined;n.prototype.destroy.call(this)};a.prototype.doDelete=function(e,t,i,n,o,s){var h=this.oModel,a=this;this.oDeletePromise=o.deleteFromCache(e,t,i,n,s).then(function(){var e=a.sPath.slice(1);h.getAllBindings().forEach(function(t){t.removeCachesAndMessages(e,true)})}).catch(function(e){h.reportError("Failed to delete "+a.getPath(),r,e);a.checkUpdate();throw e});if(e&&h.isApiGroup(e.getGroupId())){h.getDependentBindings(this).forEach(function(e){e.setContext(undefined)})}return this.oDeletePromise};a.prototype.doSetProperty=function(t,n,o,s,h){var a=this.oModel,d=a.getMetaModel(),u,c,f=this;if(this.isDeleted()){if(o){o.unlock()}throw new Error("Must not modify a deleted entity: "+this)}if(t==="@$ui5.context.isSelected"){this.setSelected(n);if(o){o.unlock();o=null}if(this.oBinding.getHeaderContext?.()===this){return i.resolve()}}if(o&&this.isTransient()&&!this.isInactive()){c=this.getValue();u=c&&e.getPrivateAnnotation(c,"transient");if(u instanceof Promise){o.unlock();o=o.getUnlockedCopy();this.doSetProperty(t,n,null,true,true).catch(a.getReporter());return i.resolve(u).then(function(e){return e&&f.created()}).then(function(){return f.doSetProperty(t,n,o,s)})}}if(a.bAutoExpandSelect){t=d.getReducedPath(a.resolve(t,this),this.oBinding.getBaseForPathReduction())}return this.withCache(function(i,u,c){return c.doSetProperty(u,n,o)||d.fetchUpdateData(t,f,!o).then(function(u){var l=e.getRelativePath(u.entityPath,c.oReturnValueContext?c.oReturnValueContext.getPath():c.getResolvedPath()),p=false;function g(e){a.reportError("Failed to update path "+a.resolve(t,f),r,e);P(false)}function P(e){if(p){c.firePatchCompleted(e);p=false}}function v(){p=true;c.firePatchSent()}if(!o){return i.setProperty(u.propertyPath,n,l,h)}if(f.bInactive&&!f.bFiringCreateActivate){i.setProperty(u.propertyPath,n,l,h).catch(a.getReporter());f.bFiringCreateActivate=true;f.bInactive=c.fireCreateActivate(f)?false:1;f.bFiringCreateActivate=false;i.setInactive(l,f.bInactive)}const y=e.hasPathSuffix(f.sPath,l)?f.setCreated.bind(f):null;return i.update(o,u.propertyPath,n,s?undefined:g,u.editUrl,l,d.getUnitOrCurrencyPath(f.oModel.resolve(t,f)),c.isPatchWithoutSideEffects(),v,f.isEffectivelyKeptAlive.bind(f),y).then(function(){P(true)},function(e){P(false);throw e})})},t,false,true)};a.prototype.doSetSelected=function(e,t){if(e===this.bSelected){return false}if(!t){this.withCache((t,i)=>{if(this.oBinding){t.setProperty("@$ui5.context.isSelected",e,i)}},"")}this.bSelected=e;this.oBinding?.onKeepAliveChanged(this);return true};a.prototype.expand=function(e){switch(this.isExpanded()){case true:if(!e){throw new Error("Already expanded: "+this)}this.oBinding.collapse(this,false,true);case false:{const t=e?Number.MAX_SAFE_INTEGER:1;return Promise.resolve(this.oBinding.expand(this,t)).then(()=>{})}default:throw new Error("Not expandable: "+this)}};a.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};a.prototype.fetchPrimitiveValue=function(e,t,n){var r,o=[this.fetchValue(e,null,n)],s=this.oModel.resolve(e,this);if(t){o.push(this.oModel.getMetaModel().fetchUI5Type(s))}return i.all(o).then(function(e){var i=e[1],n=e[0];if(n&&typeof n==="object"){r=new Error("Accessed value is not primitive: "+s);r.isNotPrimitive=true;throw r}return t?i.formatValue(n,"string"):n})};a.prototype.fetchValue=function(t,n,r){var o=this.oBinding,s=this;if(this.iIndex===h){return i.resolve()}if(o.getHeaderContext?.()===this){if(t&&t.startsWith(this.sPath)){t=t.slice(this.sPath.length+1)}if(!t){if(n){throw new Error("Cannot register change listener for header context object")}return o.fetchValue(this.sPath+"/$count",null,r).then(e=>({"@$ui5.context.isSelected":s.bSelected,$count:e}))}else if(t==="@$ui5.context.isSelected"){this.mChangeListeners??={};e.registerChangeListener(this,"",n);return i.resolve(this.bSelected)}else if(t!=="$count"&&t!=="@$ui5.context.isSelected"){throw new Error("Invalid header path: "+t)}}if(!t){t=this.sPath}else if(t[0]!=="/"){t=this.oModel.resolve(t,this);if(this.oModel.bAutoExpandSelect){t=this.oModel.getMetaModel().getReducedPath(t,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(t,n,r)};a.prototype.getAndRemoveCollection=function(e){return this.withCache(function(e,t){return e.getAndRemoveCollection(t)},e,true).unwrap()};a.prototype.getBinding=function(){return this.oBinding};a.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);a.prototype.getFilter=function(){if(!this.oBinding.getHeaderContext||this.isTransient()){throw new Error("Not a list context path to an entity: "+this)}const t=e.getPredicateIndex(this.sPath);const i=this.sPath.slice(t).replace(/,?\$isTotal=true\)$/,")");if(i==="()"){return null}const n=this.oModel.getMetaModel();const r=e.getMetaPath(this.sPath);const o=n.getObject(r+"/");return e.getFilterForPredicate(i,o,n,r,true)};a.prototype.getGeneration=function(e){if(this.iGeneration||e){return this.iGeneration}return this.oBinding.getGeneration()};a.prototype.getGroupId=function(){return this.oBinding.getGroupId()};a.prototype.getIndex=function(){if(this.iIndex===undefined){return undefined}if(this.oBinding?.isFirstCreateAtEnd()){if(this.iIndex<0){return this.oBinding.bLengthFinal?this.oBinding.iMaxLength-this.iIndex-1:-this.iIndex-1}return this.iIndex}return this.getModelIndex()};a.prototype.getModelIndex=function(){if(this.iIndex!==undefined&&this.oBinding?.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};a.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};a.prototype.getParent=function(){if(!this.oBinding.fetchOrGetParent){throw new Error("Not a list binding's context: "+this)}return this.oBinding.fetchOrGetParent(this)};a.prototype.getProperty=function(e,i){var n,o;this.oBinding.checkSuspended();o=this.fetchPrimitiveValue(e,i,true);if(o.isRejected()){o.caught();n=o.getResult();if(n.isNotPrimitive){throw n}else if(!n.$cached){t.warning(n.message,e,r)}}return o.isFulfilled()?o.getResult():undefined};a.prototype.getQueryOptionsForPath=function(e){return this.oBinding.getQueryOptionsForPath(e)};a.prototype.getSibling=function(e){return this.oBinding.fetchOrGetSibling(this,e)};a.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};a.prototype.getValue=function(e){var t,i=this;this.oBinding.checkSuspended();t=this.fetchValue(e,null,true).catch(function(e){if(!e.$cached){i.oModel.reportError("Unexpected error",r,e)}});if(t.isFulfilled()){return t.getResult()}};a.prototype.hasPendingChanges=function(){var e=this;return this.isTransient()&&this.isInactive()!==true||this.oDeletePromise?.isPending()||this.oBinding.hasPendingChangesForPath(this.sPath)||this.oModel.getDependentBindings(this).some(function(t){return t.oCache?t._hasPendingChanges(false,e.sPath):t.hasPendingChangesInDependents(false,e.sPath)})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};a.prototype.isAggregated=function(){this.oBinding.checkSuspended();const e=this.oBinding.mParameters.$$aggregation?.$leafLevelAggregated;if(e===undefined){return false}return e||this!==this.oBinding.getHeaderContext()&&this.isExpanded()!==undefined};a.prototype.isAncestorOf=function(e){if(!this.oBinding.isAncestorOf){throw new Error("Missing recursive hierarchy")}return this.oBinding.isAncestorOf(this,e)};a.prototype.isDeleted=function(){return!!this.oDeletePromise};a.prototype.isEffectivelyKeptAlive=function(){var t=this.oBinding.mParameters;return this.bKeepAlive&&!this.isDeleted()||!t.$$sharedRequest&&this.oBinding.getHeaderContext?.()&&this.oBinding.getHeaderContext().isSelected()!==this.isSelected()&&(t.$$ownRequest||!this.oBinding.isRelative())&&!e.isDataAggregation(t)&&this.sPath.indexOf("(",this.sPath.lastIndexOf("/"))>0};a.prototype.isExpanded=function(){return this.getProperty("@$ui5.node.isExpanded")};a.prototype.isInactive=function(){return this.bInactive};a.prototype.isKeepAlive=function(){return this.bKeepAlive};a.prototype.isOutOfPlace=function(){return this.bOutOfPlace};a.prototype.isSelected=function(){return this.bSelected&&!this.oDeletePromise};a.prototype.isTransient=function(){return this.oSyncCreatePromise?.isPending()};a.prototype.move=function({nextSibling:e,parent:t}={}){if(e===undefined&&t===undefined){return Promise.resolve()}if(this.iIndex===undefined||this.isDeleted()||this.isTransient()){throw new Error("Cannot move "+this)}if(t&&(t.iIndex===undefined||t.isDeleted()||t.isTransient())){throw new Error("Cannot move to "+t)}if(this.isAncestorOf(t)){throw new Error("Unsupported parent context: "+t)}return Promise.resolve(this.oBinding.move(this,t,e))};a.prototype.patch=function(e){return this.withCache(function(t,i){t.patch(i,e)},"")};a.prototype.refresh=function(e,t){this.requestRefresh.apply(this,arguments).catch(this.oModel.getReporter())};a.prototype.refreshDependentBindings=function(e,t,n,r){return i.all(this.oModel.getDependentBindings(this).map(function(i){return i.refreshInternal(e,t,n,r)}))};a.prototype.replaceWith=function(t){var i;this.oBinding.checkSuspended();if(this.isTransient()||this.isDeleted()){throw new Error("Cannot replace "+this)}if(t.oBinding!==this.oBinding||t.iIndex!==undefined||t.isDeleted()||!t.isKeepAlive()){throw new Error("Cannot replace with "+t)}i=t.getValue();this.oBinding.doReplaceWith(this,i,e.getPrivateAnnotation(i,"predicate"))};a.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");a.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};a.prototype.requestParent=function(){if(!this.oBinding.fetchOrGetParent){throw new Error("Not a list binding's context: "+this)}return Promise.resolve(this.oBinding.fetchOrGetParent(this,true))};a.prototype.requestProperty=function(e,i){var n=Array.isArray(e)?e:[e],o=this;this.oBinding.checkSuspended();return Promise.all(n.map(function(e){return o.oBinding.fetchIfChildCanUseCache(o,e,undefined,true).then(function(n){if(n){return o.fetchPrimitiveValue(n,i)}t.error("Not a valid property path: "+e,undefined,r)})})).then(function(t){return Array.isArray(e)?t:t[0]})};a.prototype.requestRefresh=function(t,i){var n;e.checkGroupId(t);if(this.oBinding.mParameters.$$aggregation){throw new Error("Cannot refresh "+this+" when using data aggregation")}this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){n=this.oBinding.refreshSingle(this,this.oBinding.lockGroup(t,true),i)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+i)}n=this.oBinding.refreshReturnValueContext(this,t)||this.oBinding.requestRefresh(t)}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1));return Promise.resolve(n).then(function(){})};a.prototype.requestSibling=function(e){return Promise.resolve(this.oBinding.fetchOrGetSibling(this,e,true))};a.prototype.requestSideEffects=function(t,n){var r,o=this.oModel.getMetaModel(),s=[],h=[],a,d,u=this;function c(e){if(!e){return false}if(e==="*"){return true}if(e.endsWith("/*")){e=e.slice(0,-2)}return!e.includes("*")}this.oBinding.checkSuspended();e.checkGroupId(n);if(this.isTransient()||this.isDeleted()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(!this.oBinding.isResolved()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}r=o.getObject("/$EntityContainer");if(!r){throw new Error("Missing metadata")}r="/"+r+"/";t.map(function(e){if(e&&typeof e==="object"){if(c(e.$PropertyPath)){return e.$PropertyPath}if(typeof e.$NavigationPropertyPath==="string"&&!e.$NavigationPropertyPath.includes("*")){return e.$NavigationPropertyPath}}else if(typeof e==="string"&&(!e||c(e))){return e}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(e))}).forEach(function(e){if(e[0]==="/"){if(!e.startsWith(r)){throw new Error("Path must start with '"+r+"': "+e)}h.push(e.slice(r.length-1))}else{s.push(e)}});a=this.oBinding.getRootBinding();d=a.getResolvedPath();s=s.reduce(function(t,i){return t.concat(o.getAllPathReductions(e.buildPath(u.getPath(),i),d))},[]);s=e.filterPaths(h,s);n??=this.getUpdateGroupId();return Promise.resolve(i.resolve(this.oModel.isAutoGroup(n)&&this.oModel.oRequestor.waitForRunningChangeRequests(n).then(function(){u.oModel.oRequestor.relocateAll("$parked."+n,n)})).then(function(){return i.all([u.oModel.requestSideEffects(n,h),u.requestSideEffectsInternal(s,n)])})).then(function(){})};a.prototype.requestSideEffectsInternal=function(t,n){var r=this,o,s=r,h,a=[],d,u=[],c,f=[];if(!t.length){return undefined}for(;;){o=s.oBinding;c=o.getPath();d=o.getContext();if(o.oCache&&(!h||o.oCache.hasChangeListeners())){h=s}if(h&&c){break}if(!o.getBoundContext){if(o.oCache===undefined){return undefined}throw new Error("Not a context binding: "+o)}s=d}o=h.oBinding;t.forEach(function(t){var i=e.getRelativePath(t,h.getPath());if(i===undefined){u.push(t)}else{a.push(i)}});if(u.length){f.push(o.getContext().requestSideEffectsInternal(u,n))}if(a.length&&o.oCache!==undefined){f.push(o.requestSideEffects(n,a,h))}return i.all(f)};a.prototype.resetChanges=function(){var e=this.oDeletePromise?[this.oDeletePromise.catch(function(){})]:[],t=this;if(this.iIndex===h||this.oBinding.getHeaderContext&&!this.bInactive&&this.isTransient()||this===this.oBinding.getHeaderContext?.()||this.oBinding.oOperation&&this===this.oBinding.getParameterContext()){throw new Error("Cannot reset: "+this)}this.oBinding.checkSuspended();this.oBinding.resetChangesForPath(this.sPath,e);if(this.bInactive===1){this.bInactive=true}this.oModel.getDependentBindings(this).forEach(function(i){if(i.oCache){e.push(i._resetChanges(t.sPath))}else{i.resetChangesInDependents(e,t.sPath);i.resetInvalidDataState()}});return Promise.all(e).then(function(){})};a.prototype.resetKeepAlive=function(){this.bKeepAlive=false;this.bSelected=false};a.prototype.setCreated=function(e){if(e&&this.oCreatedPromise){throw new Error("Already 'created'")}this.oCreatedPromise=e&&Promise.resolve(e).then(function(){});this.oSyncCreatePromise=e};a.prototype.setInactive=function(){if(!this.bInactive){throw new Error("Not inactive: "+this.bInactive)}this.bInactive=true};a.prototype.setKeepAlive=function(t,i,n){var r=this;if(this.isTransient()||t&&this.isDeleted()){throw new Error("Unsupported context: "+this)}e.getPredicateIndex(this.sPath);this.oBinding.checkKeepAlive(this,t);if(t&&n){if(!this.oModel.bAutoExpandSelect){throw new Error("Missing parameter autoExpandSelect at model")}this.bKeepAlive=t;this.oModel.getMetaModel().fetchObject(e.getMetaPath(this.sPath)+"/@com.sap.vocabularies.Common.v1.Messages/$Path").then(function(e){if(!e){throw new Error("Missing @com.sap.vocabularies.Common.v1.Messages")}return r.oBinding.fetchIfChildCanUseCache(r,e,undefined,true)}).then(function(e){return r.fetchValue(e)}).catch(this.oModel.getReporter())}this.bKeepAlive=t;this.fnOnBeforeDestroy=t?i:undefined;this.oBinding.onKeepAliveChanged(this)};a.prototype.setNewGeneration=function(){o+=1;this.iGeneration=o};a.prototype.setOutOfPlace=function(e){if(!e){this.setPersisted()}else if(!this.created()){throw new Error("Not 'created persisted'")}this.bOutOfPlace=e};a.prototype.setPersisted=function(e){if(!e&&this.isTransient()!==false){throw new Error("Not 'created persisted'")}this.bInactive=undefined;this.oCreatedPromise=undefined;this.oSyncCreatePromise=undefined};a.prototype.setProperty=function(t,i,n,o){var s=null,h=this.oModel,a=this;this.oBinding.checkSuspended();if(typeof i==="function"||i&&typeof i==="object"){throw new Error("Not a primitive value")}if(n!==null){e.checkGroupId(n);s=this.oBinding.lockGroup(n,true,true)}return Promise.resolve(this.doSetProperty(t,i,s,!o)).catch(function(e){if(s){s.unlock(true)}h.reportError("Failed to update path "+h.resolve(t,a),r,e);throw e})};a.prototype.setSelected=function(t){if(this.oBinding&&!this.oBinding.getHeaderContext){throw new Error("Unsupported context: "+this)}if(t&&this.isDeleted()){throw new Error("Must not select a deleted entity: "+this)}const i=this.oBinding.getHeaderContext()===this&&this.oBinding._getAllExistingContexts().reduce((e,i)=>i.doSetSelected(t)||e,false);const n=this.doSetSelected(t);if(n&&this.mChangeListeners){e.fireChange(this.mChangeListeners,"",t)}if(n||i){this.oBinding.fireSelectionChanged(this)}};a.prototype.toString=function(){var e="";if(!this.oModel){e=";destroyed"}else if(this.isDeleted()){e=";deleted"}if(this.iIndex!==undefined){if(!e){switch(this.isTransient()){case false:e=";createdPersisted";break;case true:e=this.isInactive()?";inactive":";transient";break}if(this.isSelected()){e+=";selected"}}e="["+this.iIndex+e+"]"}else if(this.isSelected()){e+=";selected"}return this.sPath+e};a.prototype.updateAfterCreate=function(e,t){i.all(this.oModel.getDependentBindings(this).map(function(i){return i.updateAfterCreate(e,t)})).catch(this.oModel.getReporter())};a.prototype.withCache=function(e,t,n,r){if(this.iIndex===h){return i.resolve()}return this.oBinding.withCache(e,this.oModel.resolve(t,this),n,r)};s={create:function(e,t,i,n,r,o){return new a(e,t,i,n,r,0,o)},createNewContext:function(e,t,i){o+=1;return new a(e,t,i,undefined,undefined,o)}};Object.defineProperty(s,"VIRTUAL",{value:h});return s},false);
//# sourceMappingURL=Context.js.map