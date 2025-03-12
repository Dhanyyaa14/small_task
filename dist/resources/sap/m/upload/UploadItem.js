/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/IconPool","sap/base/Log","sap/ui/core/Lib","sap/ui/core/Element"],function(e,t,i,s){"use strict";var a=s.extend("sap.m.upload.UploadItem",{metadata:{library:"sap.m",properties:{fileName:{type:"string",defaultValue:null},mediaType:{type:"string",defaultValue:null},url:{type:"string",defaultValue:null},uploadUrl:{type:"string",defaultValue:null},uploadState:{type:"sap.m.UploadState",defaultValue:null},previewable:{type:"boolean",defaultValue:true},fileSize:{type:"float",defaultValue:0},isTrustedSource:{type:"boolean",defaultValue:false}},aggregations:{headerFields:{type:"sap.ui.core.Item",multiple:true,singularName:"headerField"}}}});a.prototype.init=function(){this._oFileObject=null;this._fFileSize=null;this._bFileTypeRestricted=false;this._bNameLengthRestricted=false;this._bSizeRestricted=false;this._bMediaTypeRestricted=false;this._oRb=i.getResourceBundleFor("sap.m");this._oCloudFileInfo=null};a.prototype.setFileName=function(e){if(this.getFileName()!==e){this.setProperty("fileName",e);if(this.getParent()&&this.getParent().getMaxFileNameLength&&this.getParent().getFileTypes){this._checkNameLengthRestriction(this.getParent()?.getMaxFileNameLength());this._checkTypeRestriction(this.getParent()?.getFileTypes())}}return this};a.prototype.getFileObject=function(){return this._oFileObject};a.prototype.download=function(e){var i=this.getParent();if(!i){t.warning("Download cannot proceed without a parent association.");return false}return i?._initiateFileDownload(this,e)};a.prototype.isRestricted=function(){return this._isRestricted()};a.prototype.getCloudFileInfo=function(){return this._oCloudFileInfo};a._getIconByMimeType=function(t,i){if(t){return e.getIconForMimeType(t)}else{return a._getIconByFileType(i)}};a._getIconByFileType=function(e){var t=a._splitFileName(e).extension;if(!t){return"sap-icon://document"}switch(t.toLowerCase()){case"bmp":case"jpg":case"jpeg":case"png":return a.IMAGE_FILE_ICON;case"csv":case"xls":case"xlsx":return"sap-icon://excel-attachment";case"doc":case"docx":case"odt":return"sap-icon://doc-attachment";case"pdf":return"sap-icon://pdf-attachment";case"ppt":case"pptx":return"sap-icon://ppt-attachment";case"txt":return"sap-icon://document-text";default:return"sap-icon://document"}};a._splitFileName=function(e,t){var i={};var s=/(?:\.([^.]+))?$/;var a=s.exec(e);if(!a[0]){a[0]="";i.name=e}else{i.name=e?e.slice(0,e.indexOf(a[0])):""}if(t){i.extension=a[0]}else{i.extension=a[1]}return i};a.prototype._setFileObject=function(e){this._oFileObject=e;if(e){this._fFileSize=e.size/a.MEGABYTE;this.setFileSize(e.size);this.setMediaType(e.type)}else{this._fFileSize=null;this.setMediaType(null)}if(this.getParent()){this._checkSizeRestriction(this.getParent()?.getMaxFileSize());this._checkMediaTypeRestriction(this.getParent()?.getMediaTypes())}};a.prototype._checkNameLengthRestriction=function(e){var t=e&&!!this.getFileName()&&this.getFileName().length>e;if(t!==this._bNameLengthRestricted){this._bNameLengthRestricted=t;this.invalidate();if(t&&this.getParent()){this.getParent()?.fireFileNameLengthExceeded({item:this})}}};a.prototype._checkSizeRestriction=function(e){var t=e&&this._fFileSize>e;if(t!==this._bSizeRestricted){this._bSizeRestricted=t;this.invalidate();if(t&&this.getParent()){this.getParent()?.fireFileSizeExceeded({item:this})}}};a.prototype._checkMediaTypeRestriction=function(e){var t=!!e&&e.length>0&&!!this.getMediaType()&&e.indexOf(this.getMediaType())===-1;if(t!==this._bMediaTypeRestricted){this._bMediaTypeRestricted=t;this.invalidate();if(t&&this.getParent()){this.getParent()?.fireMediaTypeMismatch({item:this})}}};a.prototype._checkTypeRestriction=function(e){var t=a._splitFileName(this.getFileName()),i=!!this.getFileName()&&!!e&&e.length>0&&t.extension&&e.indexOf(t.extension.toLowerCase())===-1;if(i!==this._bFileTypeRestricted){this._bFileTypeRestricted=i;this.invalidate();if(i&&this.getParent()){this.getParent()?.fireFileTypeMismatch({item:this})}}};a.prototype._isRestricted=function(){return this._bFileTypeRestricted||this._bNameLengthRestricted||this._bSizeRestricted||this._bMediaTypeRestricted};a.prototype._setCloudFileInfo=function(e){this._oCloudFileInfo=e};a.IMAGE_FILE_ICON="sap-icon://card";a.MEGABYTE=1048576;a.FILETYPES={VDS:".vds"};a.MEDIATYPES={VDS:"application/vnd.vds"};return a});
//# sourceMappingURL=UploadItem.js.map