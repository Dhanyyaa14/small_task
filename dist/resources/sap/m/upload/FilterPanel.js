/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/p13n/BasePanel","sap/ui/core/Lib","sap/ui/model/FilterOperator","sap/m/List","sap/base/util/merge","sap/m/CustomListItem","sap/m/library","sap/m/HBox","sap/m/VBox","sap/m/Button","sap/m/Input","sap/m/Select","sap/ui/core/ListItem","sap/m/ComboBox","sap/ui/layout/cssgrid/CSSGrid","sap/ui/layout/cssgrid/GridItemLayoutData","sap/base/util/uid"],function(t,e,n,i,r,o,a,s,p,l,u,c,d,_,m,T,g){"use strict";const y=n.Contains;const R=[{operator:n.Contains,label:"p13n.FILTER_OPERATOR_CONTAINS"},{operator:n.NotContains,label:"p13n.FILTER_OPERATOR_NOT_CONTAINS"},{operator:n.EQ,label:"p13n.FILTER_OPERATOR_EQ"},{operator:n.GE,label:"p13n.FILTER_OPERATOR_GE"},{operator:n.GT,label:"p13n.FILTER_OPERATOR_GT"},{operator:n.LE,label:"p13n.FILTER_OPERATOR_LE"},{operator:n.LT,label:"p13n.FILTER_OPERATOR_LT"},{operator:n.NE,label:"p13n.FILTER_OPERATOR_NE"},{operator:n.StartsWith,label:"p13n.FILTER_OPERATOR_STARTSWITH"},{operator:n.EndsWith,label:"p13n.FILTER_OPERATOR_ENDSWITH"},{operator:n.NotStartsWith,label:"p13n.FILTER_OPERATOR_NOTSTARTSWITH"},{operator:n.NotEndsWith,label:"p13n.FILTER_OPERATOR_NOTENDSWITH"}];const h=12;const E=t.extend("sap.m.upload.FilterPanel",{metadata:{properties:{title:{type:"string",defaultValue:e.getResourceBundleFor("sap.m").getText("p13n.DEFAULT_TITLE_FILTER")},fields:{type:"sap.m.FilterPanelField[]",defaultValue:[]}}},renderer:{apiVersion:2}});E.prototype.applySettings=function(){t.prototype.applySettings.apply(this,arguments);this._setTemplate(this._getListTemplate())};E.prototype.init=function(){t.prototype.init.apply(this,arguments);this._oRb=e.getResourceBundleFor("sap.m");this._bFocusOnRearrange=false;this.setEnableReorder(true);this.addStyleClass("sapMP13nQueryPanel");const n=this._createAddButton();n.setLayoutData(new T({gridColumn:`1 / ${h}`}));const i=new p({items:[this._getCSSGrid([n])]});i.addStyleClass("sapUiTinyMargin");const r=this.getAggregation("_content");r.addItem(i)};E.prototype._createInnerListControl=function(){return new i(this.getId()+"-innerP13nList",{itemPress:[this._onItemPressed,this],dragDropConfig:this._getDragDropConfig()})};E.prototype.setP13nData=function(e){e=r([],e);t.prototype.setP13nData.call(this,e);return this};E.prototype.getP13nData=function(t){const e=this._getP13nModel().getProperty("/items");return r([],e.filter(function(t){return!!t.path&&!!t.operator}))};E.prototype._getListTemplate=function(){const t=this._createKeySelect(),e=this._createFilterOperationSelect(),n=this._createSearchCriteriaInput();const i=new s({items:[new p({width:"100%",items:[t]}).addStyleClass("sapUiTinyMarginEnd"),new p({width:"100%",items:[e]})]});i.setLayoutData(new T({gridColumn:`1 / ${h}`,gridRow:"1"}));n.setLayoutData(new T({gridColumn:`1 / ${h}`,gridRow:"2"}));const r=this._createRemoveButton();r.setLayoutData(new T({gridColumn:`${h} / ${h+1}`,gridRow:"1 / 3"}));return new o({type:a.ListType.Active,content:[new p({items:[this._getCSSGrid([i,n,r])]}).addStyleClass("sapUiTinyMargin")]})};E.prototype._getCSSGrid=function(t){return new m({gridTemplateColumns:`repeat(${h-1}, 1fr) minmax(32px, 1fr)`,gridTemplateRows:"repeat(2, 1fr)",gridColumnGap:"0.3rem",items:t})};E.prototype._getAvailableItems=function(){if(!this.getFields()){return[]}return this.getFields().map(function(t){return new d({key:t.path,text:t.label})})};E.prototype._createKeySelect=function(t){return new _({width:"100%",items:this._getAvailableItems(),selectedKey:`{${this.P13N_MODEL}>path}`})};E.prototype._createFilterOperationSelect=function(t){return new c({width:"100%",selectedKey:`{${this.P13N_MODEL}>operator}`,items:R.map(function(t){return new d({key:t.operator,text:this._oRb.getText(t.label)})}.bind(this))})};E.prototype._createSearchCriteriaInput=function(t){return new u({value:`{${this.P13N_MODEL}>value}`})};E.prototype._createAddButton=function(){return new s({justifyContent:a.FlexJustifyContent.End,items:[new l({text:this._oRb.getText("p13n.ADD_FILTER_CRITERIA"),press:function(){const t=this._getP13nModel().getProperty("/items");t.push({name:g(),operator:y});this.setP13nData(t)}.bind(this)})]})};E.prototype._createRemoveButton=function(){return new p({alignItems:a.FlexAlignItems.End,justifyContent:a.FlexJustifyContent.End,items:[new l({type:a.ButtonType.Transparent,icon:"sap-icon://decline",press:function(t){let e=t.getSource();while(e&&!(e instanceof o)){e=e.getParent()}if(!(e instanceof o)){return}const n=this._getP13nModel().getProperty("/items"),i=n.indexOf(this._getModelEntry(e));n.splice(i,1);this.setP13nData(n)}.bind(this)})]})};return E});
//# sourceMappingURL=FilterPanel.js.map