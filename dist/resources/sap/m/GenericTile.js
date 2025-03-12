/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/base/i18n/Localization","sap/ui/core/Control","sap/m/Text","sap/ui/core/HTML","sap/ui/core/Icon","sap/ui/core/IconPool","sap/m/Button","sap/m/GenericTileRenderer","sap/m/GenericTileLineModeRenderer","sap/m/Image","sap/ui/Device","sap/ui/core/Lib","sap/ui/core/ResizeHandler","sap/base/strings/camelize","sap/base/util/deepEqual","sap/ui/events/PseudoEvents","sap/ui/core/theming/Parameters","sap/ui/thirdparty/jquery","sap/ui/core/library","sap/ui/core/InvisibleText","sap/ui/core/Core","sap/ui/core/Theming","./LinkTileContent"],function(e,t,i,s,o,n,a,r,l,h,p,d,c,g,u,f,_,T,jQuery,y,m,v,I,M){"use strict";var A=e.FrameType;var S=e.GenericTileScope,C=e.LoadState,b=y.CSSColor,R=e.FrameType,L=e.Size,x=e.GenericTileMode,E=e.TileSizeBehavior,B=e.WrappingType,D=e.URLHelper,P;P=T.get({name:"sapLegendColor9",callback:function(e){P=e}});var O="GenericTileDeviceSet";var w={};var G=i.extend("sap.m.GenericTile",{metadata:{library:"sap.m",properties:{mode:{type:"sap.m.GenericTileMode",group:"Appearance",defaultValue:x.ContentMode},header:{type:"string",group:"Appearance",defaultValue:null},subheader:{type:"string",group:"Appearance",defaultValue:null},failedText:{type:"string",group:"Appearance",defaultValue:null},size:{type:"sap.m.Size",group:"Misc",defaultValue:L.Auto,deprecated:true},frameType:{type:"sap.m.FrameType",group:"Misc",defaultValue:R.OneByOne},systemInfo:{type:"string",group:"Misc",defaultValue:null},appShortcut:{type:"string",group:"Misc",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},headerImage:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},state:{type:"sap.m.LoadState",group:"Misc",defaultValue:C.Loaded},imageDescription:{type:"string",group:"Accessibility",defaultValue:null},scope:{type:"sap.m.GenericTileScope",group:"Misc",defaultValue:S.Display},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:E.Responsive},ariaLabel:{type:"string",group:"Accessibility",defaultValue:null},ariaRole:{type:"string",group:"Accessibility",defaultValue:null},ariaRoleDescription:{type:"string",group:"Accessibility",defaultValue:null},url:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},enableNavigationButton:{type:"boolean",group:"Misc",defaultValue:false},pressEnabled:{type:"boolean",group:"Misc",defaultValue:true},navigationButtonText:{type:"string",group:"Misc",defaultValue:null},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:B.Normal},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},additionalTooltip:{type:"string",group:"Accessibility",defaultValue:null},tileIcon:{type:"sap.ui.core.URI"},backgroundColor:{type:"string",group:"Appearance",defaultValue:P},valueColor:{type:"sap.m.ValueColor",group:"Appearance",defaultValue:"None"},iconLoaded:{type:"boolean",group:"Misc",defaultValue:true},renderOnThemeChange:{type:"boolean",group:"Misc",defaultValue:false},tileBadge:{type:"string",group:"Misc",defaultValue:""},dropAreaOffset:{type:"int",group:"Misc",defaultValue:0}},defaultAggregation:"tileContent",aggregations:{tileContent:{type:"sap.m.TileContent",multiple:true,bindable:"bindable"},linkTileContents:{type:"sap.m.LinkTileContent",multiple:true,singularName:"linkTileContent",defaultClass:M},icon:{type:"sap.ui.core.Control",multiple:false,deprecated:true},actionButtons:{type:"sap.m.Button",multiple:true,bindable:"bindable"},badge:{type:"sap.m.TileInfo",multiple:false,bindable:"bindable"},_titleText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_failedMessageText:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_invisibleText:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},_tileIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_tileIconImage:{type:"sap.m.Image",multiple:false,visibility:"hidden"}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"},domRef:{type:"any"}}}}},renderer:{apiVersion:2,render:function(e,t){if(t.getMode()===x.LineMode){h.render(e,t)}else{l.render(e,t)}}}});G._Action={Press:"Press",Remove:"Remove",More:"More"};G.LINEMODE_SIBLING_PROPERTIES=["state","subheader","header","scope"];G.prototype.init=function(){this._oRb=c.getResourceBundleFor("sap.m");if(!d.media.hasRangeSet(O)){d.media.initRangeSet(O,[450],"px",["small","large"])}this._oTitle=new s(this.getId()+"-title");this._oTitle.addStyleClass("sapMGTTitle");this._oTitle.cacheLineHeight=false;this.setAggregation("_titleText",this._oTitle,true);this._oAppShortcut=new s(this.getId()+"-appShortcut");this._oAppShortcut.cacheLineHeight=false;this.addDependent(this._oAppShortcut);this._oSystemInfo=new s(this.getId()+"-systemInfo");this._oSystemInfo.cacheLineHeight=false;this.addDependent(this._oSystemInfo);this._oSubTitle=new s(this.getId()+"-subTitle");this._oSubTitle.cacheLineHeight=false;this.addDependent(this._oSubTitle);this._sFailedToLoad=this._oRb.getText("INFOTILE_CANNOT_LOAD_TILE");this._sLoading=this._oRb.getText("INFOTILE_LOADING");this._oFailedText=new s(this.getId()+"-failed-txt",{maxLines:2});this._oFailedText.cacheLineHeight=false;this._oFailedText.addStyleClass("sapMGTFailed");this.setAggregation("_failedMessageText",this._oFailedText,true);this._oInvisibleText=new m(this.getId()+"-ariaText");this.setAggregation("_invisibleText",this._oInvisibleText,true);this._oErrorIcon=new n(this.getId()+"-warn-icon",{src:"sap-icon://error",size:"1.375rem"});this._oBadgeIcon=new n(this.getId()+"-badgeIcon");this.addDependent(this._oBadgeIcon);this._oErrorIcon.addStyleClass("sapMGTFtrFldIcnMrk");var e=T.get({name:"sapNegativeTextColor",callback:function(e){this._oErrorIcon.setColor(e)}.bind(this)});if(e){this._oErrorIcon.setColor(e)}this._oBusy=new o(this.getId()+"-overlay");this._oBusy.setBusyIndicatorDelay(0);this._bTilePress=true;this._bThemeApplied=false;v.ready(this._handleCoreInitialized.bind(this));this._oNavigateAction=new r(this.getId()+"-navigateAction");this._oNavigateAction._bExcludeFromTabChain=true;this.addDependent(this._oNavigateAction);jQuery(window).on("resize",this._setupResizeClassHandler.bind(this));this._oBadgeColors={backgroundColor:P}};G.prototype.setWrappingType=function(e){this.setProperty("wrappingType",e,true);this._oTitle.setWrappingType(e);this._oFailedText.setWrappingType(e);this._oSubTitle.setWrappingType(e);this._oAppShortcut.setWrappingType(e);this._oSystemInfo.setWrappingType(e);return this};G.prototype.setSubheader=function(e){this.setProperty("subheader",e);this._oSubTitle.setText(e);return this};G.prototype.setAppShortcut=function(e){this.setProperty("appShortcut",e);this._oAppShortcut.setText(e);return this};G.prototype.setSystemInfo=function(e){this.setProperty("systemInfo",e);this._oSystemInfo.setText(e);return this};G.prototype._handleCoreInitialized=function(){I.attachApplied(this._handleThemeApplied.bind(this))};G.prototype._handleThemeApplied=function(){this._bThemeApplied=true;I.detachApplied(this._handleThemeApplied.bind(this))};G.prototype.onThemeChanged=function(){if(this.getDomRef()&&this.getRenderOnThemeChange()){this.invalidate()}};G.prototype._initScopeContent=function(e){if(!this.getState||this.getState()!==C.Disabled){if(this._oMoreIcon){this._oMoreIcon.destroy();this._oMoreIcon=null}if(this.isA("sap.m.GenericTile")&&this._isIconModeOfTypeTwoByHalf()){this._oMoreIcon=this._oMoreIcon||new r({id:this.getId()+"-action-more",icon:"sap-icon://overflow",type:"Transparent",tooltip:this._oRb.getText("GENERICTILE_MORE_ACTIONBUTTON_TEXT")}).addStyleClass("sapMPointer").addStyleClass(e+"MoreIcon").addStyleClass(e+"ActionMoreButton");this._oMoreIcon.ontouchstart=function(){this.removeFocus()}.bind(this)}else{this._oMoreIcon=this._oMoreIcon||new r({id:this.getId()+"-action-more",icon:"sap-icon://overflow",type:"Unstyled"}).addStyleClass("sapMPointer").addStyleClass(e+"MoreIcon");this._oMoreIcon._bExcludeFromTabChain=true}this._oRemoveButton=this._oRemoveButton||new r({id:this.getId()+"-action-remove",icon:"sap-icon://decline",tooltip:this._oRb.getText("GENERICTILE_REMOVEBUTTON_TEXT")}).addStyleClass("sapUiSizeCompact").addStyleClass(e+"RemoveButton");this._oRemoveButton._bExcludeFromTabChain=true;switch(this.getScope()){case S.Actions:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(true);break;case S.ActionMore:this._oMoreIcon.setVisible(true);this._oRemoveButton.setVisible(false);break;case S.ActionRemove:this._oRemoveButton.setVisible(true);this._oMoreIcon.setVisible(false);break;default:}}};G.prototype._addClassesForButton=function(){this._oMoreIcon.getDomRef().classList.add("sapMBtn");this._oMoreIcon.getDomRef("inner").classList.add("sapMBtnInner");this._oMoreIcon.getDomRef("inner").classList.add("sapMBtnTransparent")};G.prototype.removeFocus=function(){this.getDomRef().classList.add("sapMGTActionButtonPress");this._oMoreIcon._activeButton()};G.prototype._isSmall=function(){return this.getSizeBehavior()===E.Small||window.matchMedia("(max-width: 374px)").matches};G.prototype.exit=function(){if(this._sParentResizeListenerId){g.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}if(this._sGenericTileResizeListenerId){g.deregister(this._sGenericTileResizeListenerId);this._sGenericTileResizeListenerId=null}d.media.detachHandler(this._handleMediaChange,this,O);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents());this._$RootNode=null}this._clearAnimationUpdateQueue();this._oErrorIcon.destroy();if(this._oImage){this._oImage.destroy()}this._oBusy.destroy();if(this._oMoreIcon){this._oMoreIcon.destroy()}if(this._oRemoveButton){this._oRemoveButton.destroy()}if(this._oNavigateAction){this._oNavigateAction.destroy()}jQuery(window).off("resize",this._setupResizeClassHandler)};G.prototype.onBeforeRendering=function(){var e=!!this.getSubheader();var t=this.getBadge();if(this.getMode()===x.HeaderMode||this.getMode()===x.IconMode){this._applyHeaderMode(e)}else{this._applyContentMode(e)}var i=this.getTileContent().length;for(var s=0;s<i;s++){this.getTileContent()[s].setDisabled(this.getState()===C.Disabled)}this._initScopeContent("sapMGT");this._generateFailedText();this.$().off("mouseenter");this.$().off("mouseleave");if(this._sParentResizeListenerId){g.deregister(this._sResizeListenerId);this._sParentResizeListenerId=null}if(this._sGenericTileResizeListenerId){g.deregister(this._sGenericTileResizeListenerId);this._sGenericTileResizeListenerId=null}var o=this.getParent();if(o&&o.isA("sap.f.GridContainer")){this._applyNewDim()}d.media.detachHandler(this._handleMediaChange,this,O);if(this._$RootNode){this._$RootNode.off(this._getAnimationEvents())}if(this.getFrameType()===R.Auto){this.setFrameType(R.OneByOne)}if(this.getMode()!==x.LineMode&&(this.getAppShortcut()||this.getSystemInfo())){this._setMaxLines()}if(this._isNavigateActionEnabled()){var n=this.getNavigationButtonText()?this.getNavigationButtonText():this._oRb.getText("ACTION_READ_MORE");this._oNavigateAction.setText(n);this._oNavigateAction.detachPress(this._navigateEventHandler,this)}if(this._isIconMode()){this._applyColors("backgroundColor",this.getBackgroundColor())}this._isLinkTileContentPresent=this.getLinkTileContents().length>0;if(t){this._oBadgeIcon.setSrc(t.getSrc())}};G.prototype.onAfterRendering=function(){this._setupResizeClassHandler();var e=this.getMode();var t=this._isScreenLarge();this._sGenericTileResizeListenerId=g.register(this,this._handleResizeOnTile.bind(this));this._handleResizeOnTile();if(e===x.LineMode){var s=this.$().parent();if(t){this._updateHoverStyle(true);if(this.getParent()instanceof i){this._sParentResizeListenerId=g.register(this.getParent(),this._handleResize.bind(this))}else{this._sParentResizeListenerId=g.register(s,this._handleResize.bind(this))}}}if(e===x.LineMode&&this._bUpdateLineTileSiblings){this._updateLineTileSiblings();this._bUpdateLineTileSiblings=false}if(e===x.LineMode){d.media.attachHandler(this._handleMediaChange,this,O)}if(this._isNavigateActionEnabled()){this._oNavigateAction.attachPress(this._navigateEventHandler,this)}if(this._oMoreIcon&&this._oMoreIcon.getDomRef()&&!this._isIconMode()){this._oMoreIcon.getDomRef().firstChild.classList.remove("sapMBtnHoverable");this._oMoreIcon.getDomRef().firstChild.classList.remove("sapMFocusable")}if(this._isIconModeOfTypeTwoByHalf()&&this._oMoreIcon.getDomRef()){this._addClassesForButton()}if(this.getFrameType()===R.TwoByOne&&(this.getMode()===x.ActionMode||this._isLinkTileContentPresent)&&this.getState()===C.Loaded&&!this.isA("sap.m.ActionTile")){this._applyExtraHeight()}if(this.getTooltip()&&this.getDomRef()){this.getDomRef().setAttribute("aria-describedby",this.getAggregation("_invisibleText").getId())}this.onDragComplete();if(this.getDomRef()&&this.getParent()&&this.getParent().isA("sap.m.SlideTile")){this.getDomRef().setAttribute("tabindex","-1")}if(this._oMoreIcon&&this._oMoreIcon.getDomRef()&&this._isIconModeOfTypeTwoByHalf()){this._attachFocusHandlingOnMoreButton(this._oMoreIcon.getDomRef())}};G.prototype._isIconModeOfTypeTwoByHalf=function(){return this._isIconMode()&&this.getFrameType()===R.TwoByHalf};G.prototype._attachFocusHandlingOnMoreButton=function(e){var t=[this.getHeader(),this.getSubheader(),this._oRb.getText("GENERICTILE_MORE_ACTIONBUTTON_TEXT")];var i=t.filter(function(e){return e.trim()!==""});e.removeAttribute("title");e.removeAttribute("aria-describedby");e.setAttribute("aria-label",i.join(" "));e.removeEventListener("mouseenter",this._setTooltipForMoreButton.bind(this,e));e.addEventListener("mouseenter",this._setTooltipForMoreButton.bind(this,e));e.removeEventListener("mouseleave",this._removeTooltipForButton.bind(null,e));e.addEventListener("mouseleave",this._removeTooltipForButton.bind(null,e))};G.prototype._setTooltipForMoreButton=function(e){e.setAttribute("title",this._oRb.getText("GENERICTILE_MORE_ACTIONBUTTON_TEXT"))};G.prototype._removeTooltipForButton=function(e){e.removeAttribute("title")};G.prototype._applyExtraHeight=function(){var e=this.getDomRef("hdr-text").offsetHeight,t=parseInt(getComputedStyle(this.getDomRef("title")).lineHeight.slice(0,2)),i=Math.ceil(e/t);if(i===1&&!this.getHeaderImage()){this.getDomRef("content").classList.add("sapMGTFtrMarginTop")}else{this.getDomRef("content").classList.remove("sapMGTFtrMarginTop")}if(this._isLinkTileContentPresent){this._adjustFocusOnLinkTiles(this.getDomRef().classList.contains("sapMTileSmallPhone"),i)}};G.prototype._adjustFocusOnLinkTiles=function(e,t){var i=e?5:6;i=t===2?--i:i;var s;for(s=this.getLinkTileContents().length-1;s>i-1;--s){this.getLinkTileContents()[s]._getLink().getDomRef().setAttribute("tabindex",-1)}while(s>=0){this.getLinkTileContents()[s]._getLink().getDomRef().setAttribute("tabindex",0);s--}};G.prototype._applyColors=function(e,t){if(b.isValid(t)){this._oBadgeColors[e]=t}else{var i=T.get({name:t,callback:function(t){this._oBadgeColors[e]=t;this.invalidate()}.bind(this)});if(i){this._oBadgeColors[e]=i}}};G.prototype._setMaxLines=function(){var e=this.getFrameType(),t=e===R.OneByOne||e===R.TwoByHalf?1:2;this._oAppShortcut.setMaxLines(t);this._oSystemInfo.setMaxLines(t);if(this.getFrameType()===R.TwoByHalf){var i=this.getAppShortcut().length>11,s=this.getSystemInfo().length>11;if(i&&s||i){this._oAppShortcut.setMaxLines(2)}else if(s){this._oSystemInfo.setMaxLines(2)}}};G.prototype.onDragComplete=function(){if(this.hasStyleClass("sapMGTPressActive")){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===x.LineMode){this.removeStyleClass("sapMGTLineModePress")}}if(this.getDomRef()){this.getDomRef().removeEventListener("mouseenter",this._updateAriaAndTitle.bind(this));this.getDomRef().removeEventListener("mouseleave",this._removeTooltipFromControl.bind(this));this.getDomRef().addEventListener("mouseenter",this._updateAriaAndTitle.bind(this));this.getDomRef().addEventListener("mouseleave",this._removeTooltipFromControl.bind(this))}};G.prototype._handleResize=function(){if(this.getMode()===x.LineMode&&this._isScreenLarge()&&this.getParent()){this._queueAnimationEnd()}};G.prototype._handleResizeOnTile=function(){if(this._isIconMode()&&this.getFrameType()===R.OneByOne){this._handleResizeOnIconTile()}};G.prototype._handleResizeOnIconTile=function(){var e=this._oTitle.getDomRef();var t=window.matchMedia("(max-width: 600px)").matches;var i=window.matchMedia("(max-width: 374px)").matches;if(e){var s=parseInt(getComputedStyle(e).height.slice(0,2));var o=parseInt(getComputedStyle(e).lineHeight.slice(0,2));var n=s/o;if(n===1){this.addStyleClass("sapMGTHeaderOneLine")}else{this.removeStyleClass("sapMGTHeaderOneLine")}if(!(t||i)&&n===3&&this._oSubTitle.getDomRef()){this._oSubTitle.setMaxLines(1);this.addStyleClass("sapMGTHeaderThreeLine")}else{this.removeStyleClass("sapMGTHeaderThreeLine");this._oSubTitle.setMaxLines(2)}}};G.prototype._setupResizeClassHandler=function(){var e=this.getParent();if(e&&e.isA("sap.f.GridContainer")){this._applyNewDim()}if(this.getSizeBehavior()===E.Small||window.matchMedia("(max-width: 374px)").matches||this._isSmallStretchTile()){this.$().addClass("sapMTileSmallPhone");if(this._isSmallStretchTile()){this.addStyleClass("sapMGTStretch")}}else{this.$().removeClass("sapMTileSmallPhone");this.removeStyleClass("sapMGTStretch")}if(this.__isLinkTileContentPresent){this._applyExtraHeight()}};G.prototype._isSmallStretchTile=function(){return this.getFrameType()===R.Stretch&&window.matchMedia("(max-width: 600px)").matches};G.prototype._isCompact=function(){return jQuery("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0};G.prototype._calculateStyleData=function(){this.$("lineBreak").remove();if(!this._isScreenLarge()||!this.getDomRef()||this.$().is(":hidden")){return null}var e=this.$(),i=this.$("endMarker"),s=this.$("startMarker");if(i.length===0||s.length===0){return null}var o=this._getLineCount(),n,a,r=Math.ceil(h._getCSSPixelValue(this,"margin-top")),l,p=this.$().parent().innerWidth(),c=Math.ceil(h._getCSSPixelValue(this,"min-height")),g=h._getCSSPixelValue(this,"line-height"),u=this.$().is(":not(:first-child)")&&o>1,f=jQuery("<span><br></span>"),_=0,T=t.getRTL(),y=i.position();if(u){f.attr("id",this.getId()+"-lineBreak");e.prepend(f);o=this._getLineCount();y=i.position()}var m={rtl:T,lineBreak:u,startOffset:s.offset(),endOffset:i.offset(),availableWidth:p,lines:[]};var v;if(d.browser.msie||d.browser.edge){v=f.find("br").position()}else{v=f.position()}var I=v;if(!(d.browser.mozilla||d.browser.msie||d.browser.edge)&&v.left<y.left){I=y}m.positionLeft=u?v.left:e.position().left;m.positionRight=u?e.width()-I.left:m.availableWidth-e.position().left;if(!u&&o>1){m.positionRight=s.parent().innerWidth()-(s.position().left+s.width())}for(_;_<o;_++){if(u&&_===0){continue}if(o===1){n=T?m.availableWidth-m.positionLeft:m.positionLeft;l=e.width()}else if(_===o-1){n=0;l=T?e.width()-y.left:y.left}else if(u&&_===1){n=0;l=p}else{n=0;l=p}a=_*g+r;m.lines.push({offset:{x:n,y:a},width:l,height:c})}return m};G.prototype._getStyleData=function(){var e=this._calculateStyleData();if(!f(this._oStyleData,e)){delete this._oStyleData;this._oStyleData=e;return true}return false};G.prototype._getAnimationEvents=function(){return"transitionend.sapMGT$id animationend.sapMGT$id".replace(/\$id/g,u(this.getId()))};G.prototype._updateHoverStyle=function(e){if(!this._getStyleData()&&!e){return}this._clearAnimationUpdateQueue();this._cHoverStyleUpdates=-1;this._oAnimationEndCallIds={};if(this._oStyleData&&this._oStyleData.lineBreak&&this.getUIArea()){this._$RootNode=jQuery(this.getUIArea().getRootNode());this._$RootNode.on(this._getAnimationEvents(),this._queueAnimationEnd.bind(this))}this._queueAnimationEnd()};G.prototype._queueAnimationEnd=function(e){if(e){var t=jQuery(e.target);if(t.is(".sapMGT, .sapMGT *")){return false}}if(typeof this._cHoverStyleUpdates!=="number"){this._cHoverStyleUpdates=-1}if(!this._oAnimationEndCallIds){this._oAnimationEndCallIds={}}this._cHoverStyleUpdates++;this._oAnimationEndCallIds[this._cHoverStyleUpdates]=setTimeout(this._handleAnimationEnd.bind(this,this._cHoverStyleUpdates),10)};G.prototype._handleAnimationEnd=function(e){delete this._oAnimationEndCallIds[e];if(this._cHoverStyleUpdates===e){this._getStyleData();h._updateHoverStyle.call(this)}};G.prototype._clearAnimationUpdateQueue=function(){for(var e in this._oAnimationEndCallIds){clearTimeout(this._oAnimationEndCallIds[e]);delete this._oAnimationEndCallIds[e]}};G.prototype._getLineCount=function(){var e=this.getDomRef().getBoundingClientRect(),t=h._getCSSPixelValue(this,"line-height");return Math.round(e.height/t)};G.prototype.getBoundingRects=function(){var e=this.$().offset();return[{offset:{x:e.left,y:e.top},width:this.$().outerWidth(),height:this.$().height()}]};G.prototype._updateLineTileSiblings=function(){var e=this.getParent();if(this.getMode()===x.LineMode&&this._isScreenLarge()&&e){var t=e.indexOfAggregation(this.sParentAggregationName,this);var i=e.getAggregation(this.sParentAggregationName).splice(t+1);for(t=0;t<i.length;t++){var s=i[t];if(s instanceof G&&s.getMode()===x.LineMode){s._updateHoverStyle()}}}};G.prototype.ontouchstart=function(e){if(e&&e.target.id.indexOf("-action-more")===-1&&this.getDomRef()){this.getDomRef().classList.remove("sapMGTActionButtonPress")}this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}if(this.getMode()===x.LineMode){this.addStyleClass("sapMGTLineModePress")}};G.prototype.ontouchcancel=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}};G.prototype.ontouchend=function(){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}if(this.getMode()===x.LineMode){this.removeStyleClass("sapMGTLineModePress")}};G.prototype.ondragend=function(){this.onDragComplete()};G.prototype.ontap=function(e){if(!H(e,this)&&!this._isLinkPressed(e)){var t;if((this._bTilePress||this._isActionMoreButtonVisibleIconMode(e))&&this.getState()!==C.Disabled){this.$().trigger("focus");t=this._getEventParams(e);if(!(this.isInActionRemoveScope()&&t.action===G._Action.Press)){this.firePress(t)}e.preventDefault()}}};var F=false;G.prototype.onkeydown=function(e){if(!H(e,this)&&!this._isLinkPressed(e)){var t=e.shiftKey;var i=e.key==="Tab";var s=e.srcControl.getId()==this._oMoreIcon.getId();F=e.keyCode===16||e.keyCode===27?true:false;var o=w[e.keyCode];if(!o){w[e.keyCode]=true;if(w[32]||w[13]){e.preventDefault()}}if(_.events.sapselect.fnCheck(e)&&this.getState()!==C.Disabled){this.addStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").addClass("sapMGTPressActive")}e.preventDefault()}if(this._isIconModeOfTypeTwoByHalf()&&i){if(s){this._oMoreIcon.removeStyleClass("sapMGTVisible")}else if(!s&&!t){this._oMoreIcon.addStyleClass("sapMGTVisible")}}}};G.prototype._updateAriaLabel=function(){var e=this._getAriaText(),t=this.$(),i=false;if(t.attr("aria-label")!==e){t.attr("aria-label",e);i=true}return i};G.prototype.onkeyup=function(e){if(!H(e,this)&&!this._isLinkPressed(e)){var t=w[e.keyCode];if(t){delete w[e.keyCode]}var i,s=false,o=this.getScope(),n=o===S.Actions||o===S.ActionRemove;if(n&&(_.events.sapdelete.fnCheck(e)||_.events.sapbackspace.fnCheck(e))){i={scope:o,action:G._Action.Remove,domRef:this._oRemoveButton.getPopupAnchorDomRef()};s=true}if(w[16]&&e.keyCode!==16&&this.getState()!==C.Disabled){F===false}if((_.events.sapselect.fnCheck(e)||F)&&this.getState()!==C.Disabled){this.removeStyleClass("sapMGTPressActive");if(this.$("hover-overlay").length>0){this.$("hover-overlay").removeClass("sapMGTPressActive")}i=this._getEventParams(e);s=true}if(!F&&s&&(this._bTilePress||this._isActionMoreButtonVisibleIconMode(e))){this.firePress(i);e.preventDefault()}this._updateAriaLabel()}};G.prototype.setProperty=function(e){i.prototype.setProperty.apply(this,arguments);if(this.getMode()===x.LineMode&&G.LINEMODE_SIBLING_PROPERTIES.indexOf(e)!==-1){this._bUpdateLineTileSiblings=true}return this};G.prototype.getHeader=function(){return this._oTitle.getText()};G.prototype.setHeader=function(e){this.setProperty("header",e);this._oTitle.setText(e);return this};G.prototype.setHeaderImage=function(e){var t=!f(this.getHeaderImage(),e);if(t){if(this._oImage){this._oImage.destroy();this._oImage=undefined}if(e){this._oImage=a.createControlByURI({id:this.getId()+"-icon-image",src:e},p);this._oImage.addStyleClass("sapMGTHdrIconImage")}if(this.isA("sap.m.ActionTile")&&this.getProperty("enableIconFrame")){var i=this._getIconFrame();if(i){i.setSrc(e)}}}return this.setProperty("headerImage",e)};G.prototype._applyHeaderMode=function(e){var t=this.getFrameType();if(this._isIconMode()){var i,s;s=t===R.TwoByHalf?1:2;if(t===R.OneByOne){i=4}else if(t===R.TwoByHalf){i=e?1:2}this._oTitle.setMaxLines(i);this._oSubTitle.setMaxLines(s)}else if(t===R.TwoByOne&&(this.getLinkTileContents()>0||this.getMode()===x.ActionMode)){this._oTitle.setMaxLines(2)}else if(t===R.OneByHalf||t===R.TwoByHalf){this._oTitle.setMaxLines(2)}else{if(e){this._oTitle.setMaxLines(4)}else{this._oTitle.setMaxLines(5)}}this._changeTileContentContentVisibility(false)};G.prototype._applyContentMode=function(e){var t=this.getFrameType();var i=this.getTileContent();var s=false;if(t===R.TwoByHalf||t===R.OneByHalf){if(i.length){for(var o=0;o<i.length;o++){var n=i[o].getAggregation("content");if(n!==null){if(t===R.OneByHalf&&n.getMetadata().getName()==="sap.m.ImageContent"){s=true;this._oTitle.setMaxLines(2);break}else{this._oTitle.setMaxLines(1);break}}this._oTitle.setMaxLines(2)}}else{this._oTitle.setMaxLines(2)}}else if(t===R.TwoByOne&&(this.getLinkTileContents().length>0||this.getMode()===x.ActionMode)){var a=this.isA("sap.m.ActionTile")&&this.getProperty("priority")&&this.getProperty("priorityText");if(e&&!a){this._oTitle.setMaxLines(1)}else{this._oTitle.setMaxLines(2)}}else if(e){this._oTitle.setMaxLines(2)}else{this._oTitle.setMaxLines(3)}this._changeTileContentContentVisibility(true,t,s)};G.prototype._changeTileContentContentVisibility=function(e,t,i){var s;s=this.getTileContent();for(var o=0;o<s.length;o++){if(t==R.OneByHalf&&i){s[o].setRenderContent(false)}else{s[o].setRenderContent(e)}}};G.prototype._getHeaderAriaAndTooltipText=function(){var e="";var t=true;if(this.getHeader()){e+=this.getHeader();t=false}if(this.isA("sap.m.ActionTile")&&this.getProperty("priority")&&this.getProperty("priorityText")){e+=(t?"":"\n")+this.getProperty("priorityText");t=false}else if(this.getSubheader()){e+=(t?"":"\n")+this.getSubheader();t=false}if(this.getImageDescription()){e+=(t?"":"\n")+this.getImageDescription()}return e};G.prototype._getContentAriaAndTooltipText=function(){var e="";var t=true;var i=this.getTileContent();var s=this.getAdditionalTooltip();if(!this._isInActionScope()&&(this.getMode()===x.ContentMode||this.getMode()===x.ArticleMode||this.getMode()===x.ActionMode)){for(var o=0;o<i.length;o++){if(i[o].getVisible()){if(typeof i[o]._getAriaAndTooltipText==="function"){e+=(t?"":"\n")+i[o]._getAriaAndTooltipText()}else if(i[o].getTooltip_AsString()){e+=(t?"":"\n")+i[o].getTooltip_AsString()}t=false}}}if(s){e+=(t?"":"\n")+s}return e};G.prototype._getAriaAndTooltipText=function(){var e=this.getBadge()?.getText();var t=(e?e+" "+this._oRb.getText("GENERICTILE_BADGE_APP")+"\n":"")+this._getHeaderAriaAndTooltipText()+"\n"+this._getContentAriaAndTooltipText();switch(this.getState()){case C.Disabled:return"";case C.Loading:return t+"\n"+this._sLoading;case C.Failed:return t+"\n"+this._oFailedText.getText();default:if(t.trim().length===0){return""}else{return t}}};G.prototype._getAriaText=function(e){var t=this._getAriaAndTooltipText();var i=this.getAriaLabel();if(!t||this._isTooltipSuppressed()){t=this._getAriaAndTooltipText()}if(this._isInActionScope()&&this.getScope()!==S.ActionMore){t=this._oRb.getText("GENERICTILE_ACTIONS_ARIA_TEXT")+" "+t}if(i){t=i+" "+t}if(!e){t=t.trim();if(this.getLinkTileContents().length>0){t+="\n"+this._oRb.getText("GENERICTILE_LINK_TILE_CONTENT_DESCRIPTION")}else{if(this.getFrameType()!==R.Stretch){t+="\n"+this._getSizeDescription()}}}return t.trim()};G.prototype._getSizeDescription=function(){var e="",t=this.getFrameType();if(this.getMode()===x.LineMode){var i=this.getUrl()&&!this._isInActionScope()&&this.getState()!==C.Disabled;var s=this.hasListeners("press");if(i||s){e="GENERIC_TILE_LINK"}else{e="GENERIC_TILE_LINE_SIZE"}}else if(t===R.OneByHalf){e="GENERIC_TILE_FLAT_SIZE"}else if(t===R.TwoByHalf){e="GENERIC_TILE_FLAT_WIDE_SIZE"}else if(t===R.TwoByOne){e="GENERIC_TILE_WIDE_SIZE"}else if(t===R.OneByOne){e="GENERIC_TILE_ROLE_DESCRIPTION"}return this._oRb.getText(e)};G.prototype._getTooltipText=function(){var e=this.getTooltip_Text();if(this._isTooltipSuppressed()===true){e=null}return e};G.prototype._checkFooter=function(e,t){var i=t.getState();var s=this._isInActionScope()||this._bShowActionsView===true;var o=this.getFrameType();var n=e.getAggregation("content");if(this._isIconMode()){e.setRenderFooter(false)}else if(i===C.Failed||s&&i!==C.Disabled){e.setRenderFooter(false)}else if(o===R.TwoByHalf&&(n!==null||this.getSubheader())){e.setRenderFooter(false)}else if(o===R.OneByHalf&&(n!==null&&n.getMetadata().getName()!=="sap.m.ImageContent"||this.getSubheader())){e.setRenderFooter(false)}else{e.setRenderFooter(true);return true}};G.prototype._isInActionScope=function(){return this.getScope()===S.Actions||this.getScope()===S.ActionMore||this.getScope()===S.ActionRemove};G.prototype._isLinkPressed=function(e){var t=e.target.id;var i=this.getLinkTileContents().find(function(e){return e._getLink().getDomRef().id===t});var s=false;this.getTileContent().forEach(function(e){if(e._isLinkPressed){s=true;e._isLinkPressed=false}});return!!i||s};G.prototype.isInActionRemoveScope=function(){return this.getScope()===S.ActionRemove};G.prototype._isActionMoreButtonVisibleIconMode=function(e){return(this.getScope()===S.ActionMore||this.getScope()===S.Actions)&&this._isIconModeOfTypeTwoByHalf()&&e.target.id.indexOf("-action-more")>-1};G.prototype._generateFailedText=function(){var e=this.getFailedText();var t=e?e:this._sFailedToLoad;this._oFailedText.setText(t);this._oFailedText.setTooltip(t)};G.prototype._isTooltipSuppressed=function(){var e=this.getTooltip_Text();if(e&&e.length>0&&e.trim().length===0){return true}else{return false}};G.prototype._isHeaderTextTruncated=function(){var e,t,i,s;if(this.getMode()===x.LineMode){i=this.$("hdr-text");if(i.length>0){s=Math.ceil(i[0].getBoundingClientRect().width);return i[0]&&s<i[0].scrollWidth}else{return false}}else{e=this.getAggregation("_titleText").getDomRef("inner");t=this.getAggregation("_titleText").getClampHeight(e);return t<e.scrollHeight}};G.prototype._isSubheaderTextTruncated=function(){var e;if(this.getMode()===x.LineMode){e=this.$("subHdr-text")}else{e=this.$("subTitle")}if(e.length>0){var t=Math.ceil(e[0].getBoundingClientRect().width);return e[0]&&t<e[0].scrollWidth}else{return false}};G.prototype._setTooltipFromControl=function(){var e=this._getAriaAndTooltipText();if(e&&!this._getTooltipText()&&!this._isTooltipSuppressed()){this.$().attr("title",e.trim());this._bTooltipFromControl=true}};G.prototype._updateAriaAndTitle=function(){var e=this._getAriaAndTooltipText();var t=this._getAriaText();var i=this.$();if(i.attr("title")!==e){i.attr("aria-label",t)}if(this._isInActionScope()){i.find("*:not(.sapMGTRemoveButton,.sapMGTActionMoreButton)").removeAttr("aria-label").removeAttr("title").off("mouseenter")}else{i.find("*").removeAttr("aria-label").removeAttr("title").off("mouseenter")}this._setTooltipFromControl()};G.prototype._removeTooltipFromControl=function(){if(this._bTooltipFromControl){this.$().removeAttr("title");this._bTooltipFromControl=false}};G.prototype._isScreenLarge=function(){return this._getCurrentMediaContainerRange(O).name==="large"};G.prototype._getEventParams=function(e){var t,i=G._Action.Press,s=this.getScope(),o=this.getDomRef();if((s===S.Actions||S.ActionRemove)&&e.target.id.indexOf("-action-remove")>-1){i=G._Action.Remove;o=this._oRemoveButton.getPopupAnchorDomRef()}else if((s===S.Actions||s===S.ActionMore)&&this._isIconMode&&this._isIconMode()&&e.target.id.indexOf("-action-more")>-1){i=G._Action.More;o=this._oMoreIcon.getDomRef()}else if(s===S.Actions||s===S.ActionMore){o=this._oMoreIcon.getDomRef()}t={scope:s,action:i,domRef:o};return t};G.prototype._handleMediaChange=function(){this._bUpdateLineTileSiblings=true;this.invalidate()};G.prototype.setPressEnabled=function(e){this._bTilePress=e;this.setProperty("pressEnabled",e);return this};G.prototype.showActionsView=function(e){if(this._bShowActionsView!==e){this._bShowActionsView=e;this.invalidate()}};G.prototype._generateIconAggregation=function(e){var t="";this._oIcon=a.createControlByURI({size:this.getFrameType()===R.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:e});if(!this._oIcon){this._oIcon=a.createControlByURI({height:this.getFrameType()===R.OneByOne?"2rem":"1.25rem",width:this.getFrameType()===R.OneByOne?"2rem":"1.25rem",useIconTooltip:false,src:e},p).addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon")}this._oIcon.addStyleClass("sapMPointer").addStyleClass("sapMGTTileIcon");if(this._oIcon instanceof p){t="_tileIconImage"}else if(this._oIcon instanceof n){t="_tileIcon"}if(t){this.setAggregation(t,this._oIcon)}return t};G.prototype._isIconMode=function(){var e=this.getMode(),t=this.getFrameType(),i=this.getTileIcon(),s=this.getBackgroundColor(),o=this.getIconLoaded();this._sTileBadge=t===R.TwoByHalf&&this.getTileBadge().trim().substring(0,3);return e===x.IconMode&&(t===R.OneByOne||t===R.TwoByHalf)&&(i&&s||this._sTileBadge&&s||!o)};G.prototype._isNavigateActionEnabled=function(){return this.getMode()===x.ArticleMode&&this.getUrl()&&this.getEnableNavigationButton()};G.prototype._applyNewDim=function(e){var t=e?e.getActiveLayoutSettings().getGap():this.getParent().getActiveLayoutSettings().getGap();var i=t==="16px"||t==="1rem";if(i){this.addStyleClass("sapMGTGridContainerOneRemGap")}else if(!i&&this.hasStyleClass("sapMGTGridContainerOneRemGap")){this.removeStyleClass("sapMGTGridContainerOneRemGap")}};G.prototype._isActionMode=function(){return this.getFrameType()===R.TwoByOne&&this.getMode()===x.ActionMode};G.prototype._getNavigateAction=function(){return this._oNavigateAction};G.prototype._navigateEventHandler=function(e){e.preventDefault();var t=e.getSource().getParent().getUrl();D.redirect(t,true)};G.prototype._applyCssStyle=function(e){var t=this._checkFooter(e,this)&&(e.getFooter()||e.getUnit());var i=this.getFrameType();if(this.getSystemInfo()||this.getAppShortcut()){if(t&&i!==A.OneByHalf){this.getDomRef("content").classList.add("appInfoWithFooter");this.getDomRef("content").classList.remove("appInfoWithoutFooter")}else if(!t){this.getDomRef("content").classList.add("appInfoWithoutFooter");this.getDomRef("content").classList.remove("appInfoWithFooter")}}};G.prototype.getDropAreaRect=function(e){var t=this.getDomRef().getBoundingClientRect().toJSON();var i=this.getDropAreaOffset();if(e==="Horizontal"){t.left-=i;t.right+=i}else{t.top-=i;t.bottom+=i}return t};function H(e,t){var i=false,s=false;if(t._isActionMode()&&t.getActionButtons().length>0){var o=document.querySelector('[id="'+t.getId()+"-actionButtons"+'"]');i=o&&o!==e.target&&o.contains(e.target)}if(t._isNavigateActionEnabled()){var n=document.querySelector('[id="'+t.getId()+"-navigateActionContainer"+'"]');s=n&&n!==e.target&&n.contains(e.target)}return i||s}return G});
//# sourceMappingURL=GenericTile.js.map