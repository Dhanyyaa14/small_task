/*
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Lib"],function(e,t){"use strict";var o={apiVersion:2};var r=t.getResourceBundleFor("sap.m");o.render=function(t,o){t.openStart("div",o);t.class("sapMColorPalette");t.openEnd();if(o._getShowDefaultColorButton()){this.renderDefaultColorButton(t,o);this.renderSeparator(t)}this.renderSwatches(t,o);if(o._getShowMoreColorsButton()){this.renderSeparator(t);this.renderMoreColorsButton(t,o);if(e.system.phone){this.renderSeparator(t)}}if(o._getShowRecentColorsSection()){if(!o._getShowMoreColorsButton()||!e.system.phone){this.renderSeparator(t)}this.renderRecentColorsSection(t,o);if(e.system.phone){this.renderSeparator(t)}}t.close("div")};o.renderSwatches=function(e,t){var o=t.getColors(),n=t.getSelectedColor(),a=t._isSelectedInMainRegion(),s=o.indexOf(n),l;e.openStart("div",t.getId()+"-swatchCont-paletteColor");e.class("sapMColorPaletteContent");e.attr("data-sap-ui-region","main-colors-palette");e.accessibilityState(t,{role:"region",label:r.getText("COLOR_PALETTE_SWATCH_CONTAINER_TITLE")});e.openEnd();o.forEach(function(o,r){l=a&&s===r&&o===n;this.renderSquare(e,t,o,r,false,l)},this);e.close("div")};o.renderSquare=function(e,t,o,n,a,s){var l=t._ColorsHelper.getNamedColor(o),i=l===undefined?r.getText("COLOR_PALETTE_PREDEFINED_COLOR_CUSTOM"):r.getText("COLOR_PALETTE_PREDEFINED_COLOR_"+l.toUpperCase()),d=a?r.getText("COLOR_PALETTE_RECENT_COLOR",[n+1,i]):r.getText("COLOR_PALETTE_PREDEFINED_COLOR",[n+1,i]);e.openStart("div");e.class("sapMColorPaletteSquare");if(a&&o===""){e.class("sapMRecentColorSquareDisabled")}if(s){e.class("sapMColorPaletteSquareSelected")}e.attr("data-sap-ui-color",o);e.attr("tabindex","-1");e.attr("title",d);e.accessibilityState(t,{role:"button",label:d});e.openEnd();e.openStart("div");e.style("background-color",o);e.openEnd();e.close("div");e.close("div")};o.renderSeparator=function(e){e.openStart("div");e.class("sapMColorPaletteSeparator");e.openEnd();e.voidStart("hr");e.voidEnd();e.close("div")};o.renderDefaultColorButton=function(e,t){e.renderControl(t._getDefaultColorButton())};o.renderMoreColorsButton=function(e,t){e.renderControl(t._getMoreColorsButton())};o.renderRecentColorsSection=function(e,t){var o,n=t._getRecentColors(),a=5,s=r.getText("COLOR_PALETTE_SWATCH_RECENT_COLOR_CONTAINER_TITLE"),l=t._isSelectedInRecentColors(),i=t.getSelectedColor(),d;e.openStart("div",t.getId()+"-swatchCont-recentColors");e.class("sapMColorPaletteContent");e.attr("data-sap-ui-region","recent-colors-palette");e.attr("role","region");e.attr("aria-label",s);e.openEnd();for(var c=0;c<a;c++){if(n[c]){o=n[c]}else{o=""}d=l&&c==0&&i&&o===i;this.renderSquare(e,t,o,c,true,d)}e.close("div")};return o},true);
//# sourceMappingURL=ColorPaletteRenderer.js.map