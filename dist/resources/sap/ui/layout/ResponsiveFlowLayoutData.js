/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/LayoutData","./library","sap/base/Log"],function(e,t,a){"use strict";var i=e.extend("sap.ui.layout.ResponsiveFlowLayoutData",{metadata:{library:"sap.ui.layout",properties:{minWidth:{type:"int",group:"Misc",defaultValue:100},weight:{type:"int",group:"Misc",defaultValue:1},linebreak:{type:"boolean",group:"Misc",defaultValue:false},margin:{type:"boolean",group:"Misc",defaultValue:true},linebreakable:{type:"boolean",group:"Misc",defaultValue:true}}}});i.MIN_WIDTH=100;i.WEIGHT=1;i.LINEBREAK=false;i.MARGIN=true;i.LINEBREAKABLE=true;i.prototype.setWeight=function(e){if(e>=1){this.setProperty("weight",e)}else{a.warning("Values smaller than 1 are invalid. Default value '1' is used instead",this);this.setProperty("weight",i.WEIGHT)}return this};i.prototype.setLinebreak=function(e){if(this.getLinebreakable()==false&&e){a.warning("Setting 'linebreak' AND 'linebreakable' doesn't make any sense. Please set either 'linebreak' or 'linebreakable'",this)}else{this.setProperty("linebreak",e)}return this};i.prototype.setLinebreakable=function(e){if(this.getLinebreak()===true&&e===false){a.warning("Setting 'linebreak' AND 'linebreakable' doesn't make any sense. Please set either 'linebreak' or 'linebreakable'",this)}else{this.setProperty("linebreakable",e)}return this};return i});
//# sourceMappingURL=ResponsiveFlowLayoutData.js.map