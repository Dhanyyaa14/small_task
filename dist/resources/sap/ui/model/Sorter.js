/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/i18n/Localization","sap/ui/base/Object"],function(t,e,n){"use strict";var r=n.extend("sap.ui.model.Sorter",{constructor:function(e,n,r,i){let o=e;if(typeof e==="object"){o=e.path;n=e.descending;r=e.group;i=e.comparator}this.sPath=o;var s=this.sPath.indexOf(">");if(s>0){t.error('Model names are not allowed in sorter-paths: "'+this.sPath+'"');this.sPath=this.sPath.substr(s+1)}this.bDescending=n;this.vGroup=r;if(typeof r=="boolean"&&r){this.fnGroup=function(t){return t.getProperty(this.sPath)}}if(typeof r=="function"){this.fnGroup=r}this.fnCompare=i},getGroup:function(t){var e=this.fnGroup(t);if(typeof e==="string"||typeof e==="number"||typeof e==="boolean"||e==null){e={key:e}}return e},getGroupFunction:function(){return this.fnGroup&&this.fnGroup.bind(this)},getPath(){return this.sPath},isDescending(){return this.bDescending}});r.defaultComparator=function(t,n){if(t==n){return 0}if(n==null){return-1}if(t==null){return 1}if(typeof t=="string"&&typeof n=="string"){return t.localeCompare(n,e.getLanguageTag().toString())}if(t<n){return-1}if(t>n){return 1}return 0};return r});
//# sourceMappingURL=Sorter.js.map