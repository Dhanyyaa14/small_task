/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./Model","./ClientContextBinding","./ClientListBinding","./ClientPropertyBinding","./ClientTreeBinding"],function(jQuery,e,t){"use strict";var n=e.extend("sap.ui.model.ClientModel",{constructor:function(t){e.apply(this,arguments);this.bCache=true;this.aPendingRequestHandles=[];this.mUnsupportedFilterOperators={Any:true,All:true};if(typeof t=="string"){this.loadData(t)}},metadata:{publicMethods:["loadData","setData","getData","setProperty","forceNoCache"]}});n.prototype.getData=function(){return this.oData};n.prototype.createBindingContext=function(e,t,n,i){if(typeof t=="function"){i=t;t=null}if(typeof n=="function"){i=n;n=null}var r=this.resolve(e,t),s=r==undefined?undefined:this.getContext(r?r:"/");if(!s){s=null}if(i){i(s)}return s};n.prototype._ajax=function(e){var t,n=this;if(this.bDestroyed){return}function i(e){return function(){if(n.aPendingRequestHandles){var i=n.aPendingRequestHandles.indexOf(t);if(i>-1){n.aPendingRequestHandles.splice(i,1)}}if(!(t&&t.bSuppressErrorHandlerCall)){e.apply(this,arguments)}}}e.success=i(e.success);e.error=i(e.error);t=jQuery.ajax(e);if(e.async){this.aPendingRequestHandles.push(t)}};n.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);if(this.aPendingRequestHandles){for(var t=this.aPendingRequestHandles.length-1;t>=0;t--){var n=this.aPendingRequestHandles[t];if(n&&n.abort){n.bSuppressErrorHandlerCall=true;n.abort()}}delete this.aPendingRequestHandles}};n.prototype.destroyBindingContext=function(e){};n.prototype.bindContext=function(e,n,i){var r=new t(this,e,n,i);return r};n.prototype.updateBindings=function(e){this.checkUpdate(e)};n.prototype.forceNoCache=function(e){this.bCache=!e};return n});
//# sourceMappingURL=ClientModel.js.map