/*!
 * OpenUI5
 * (c) Copyright 2009-2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./QuickActionItem",
	"./QuickAction",
	"sap/m/SegmentedButton",
	"sap/m/SegmentedButtonItem",
	"sap/m/library",
	"sap/ui/core/Lib",
	"sap/ui/core/library"
], function(
	QuickActionItem,
	QuickAction,
	SegmentedButton,
	SegmentedButtonItem,
	library,
	Library,
	CoreLibrary
) {
	"use strict";

	/**
	 * Constructor for a new <code>QuickSortItem</code>.
	 *
	 * @param {string} [sId] ID for the new <code>QuickSortItem</code>, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new <code>QuickSortItem</code>
	 *
	 * @class
	 * The <code>QuickSortItem</code> class is used for items for the <code>sap.m.table.columnmenu.QuickSort</code>.
	 * It can be used to specify control- and application-specific items for sorting.
	 *
	 * @extends sap.m.table.columnmenu.QuickActionItem
	 *
	 * @author SAP SE
	 * @version 1.133.0
	 *
	 * @public
	 * @since 1.110
	 *
	 * @alias sap.m.table.columnmenu.QuickSortItem
	 */
	var QuickSortItem = QuickActionItem.extend("sap.m.table.columnmenu.QuickSortItem", {

		metadata: {
			library: "sap.m",
			properties: {
				/**
				 * Specifies the sort order that is applied for the respective column.
				 */
				sortOrder: { type: "sap.ui.core.SortOrder", defaultValue: CoreLibrary.SortOrder.None }
			},
			aggregations: {
				/**
				 * Defines the quick action of the quick sort item.
				 */
				quickAction: { type: "sap.m.table.columnmenu.QuickAction", multiple: false, visibility: "hidden" }
			}
		}
	});

	QuickSortItem.prototype._getAction = function() {
		var oQuickAction = this.getAggregation("quickAction");
		var sLabel = this.getLabel();

		if (oQuickAction) {
			oQuickAction.setLabel(sLabel);
		} else {
			oQuickAction = new QuickAction({
				label: sLabel,
				content: [this._createContent()],
				category: library.table.columnmenu.Category.Sort,
				contentSize: library.InputListItemContentSize.L
			});
		}

		this.setAggregation("quickAction", oQuickAction, true);
		return oQuickAction;
	};

	QuickSortItem.prototype._createContent = function() {
		var oBundle = Library.getResourceBundleFor("sap.m");
		return new SegmentedButton({
			selectedKey: this.getSortOrder(),
			items: [
				new SegmentedButtonItem({
					icon: "sap-icon://menu2",
					key: "None",
					tooltip: oBundle.getText("table.COLUMNMENU_SORT_NONE")
				}),
				new SegmentedButtonItem({
					icon: "sap-icon://sort-ascending",
					key: "Ascending",
					tooltip: oBundle.getText("table.COLUMNMENU_SORT_ASCENDING")
				}),
				new SegmentedButtonItem({
					icon: "sap-icon://sort-descending",
					key: "Descending",
					tooltip: oBundle.getText("table.COLUMNMENU_SORT_DESCENDING")
				})
			],
			selectionChange: [{item: this}, this._onSortChange, this]
		});
	};

	QuickSortItem.prototype._onSortChange = function (oEvent, mSortInfo) {
		this.setSortOrder(oEvent.getSource().getSelectedKey(), true);
		this.getParent().onChange(mSortInfo.item);
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	QuickSortItem.prototype.setSortOrder = function(sSortOrder) {
		this.setProperty("sortOrder", sSortOrder, true);

		var oQuickAction = this.getAggregation("quickAction");
		if (oQuickAction) {
			var aButtons = oQuickAction.getContent();
			aButtons[0].setSelectedKey(sSortOrder);
		}
		return this;
	};

	return QuickSortItem;
});