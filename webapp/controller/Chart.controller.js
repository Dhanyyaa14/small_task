sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/common/feeds/FeedItem",
    "sap/viz/ui5/data/FlattenedDataset"
], function (Controller, FeedItem, FlattenedDataset) {
    "use strict";

    return Controller.extend("my.app.controller.Chart", {
        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("Chart").attachPatternMatched(this._onRouteMatched, this);
            console.log("📌 Chart Controller Initialized");

            // Wait for data before initializing VizFrame
            sap.ui.getCore().getEventBus().subscribe("salesModel", "ready", this._initVizFrame, this);
        },

        _onRouteMatched: function () {
            var oModel = this.getOwnerComponent().getModel("salesModel");

            if (!oModel) {
                console.error("❌ Error: salesModel not found.");
                return;
            }

            if (!oModel.getProperty("/salesData")) {
                console.warn("⚠ Data not yet available.");
                return;
            }

            this._initVizFrame();
        },

        _initVizFrame: function () {
            var oView = this.getView();
            var oVizFrame = oView.byId("idVizFrame");

            if (!oVizFrame) {
                console.error("❌ Error: VizFrame not found.");
                return;
            }

            console.log("✔ Initializing VizFrame...");

            var oDataset = new FlattenedDataset({
                dimensions: [{ name: "Region", value: "{salesModel>region}" }],
                measures: [{ name: "Sales", value: "{salesModel>sales}" }],
                data: { path: "salesModel>/salesData" }
            });

            oVizFrame.setDataset(oDataset);
            oVizFrame.setVizType("bar");

            oVizFrame.removeAllFeeds();
            oVizFrame.addFeed(new FeedItem({ uid: "categoryAxis", type: "Dimension", values: ["Region"] }));
            oVizFrame.addFeed(new FeedItem({ uid: "valueAxis", type: "Measure", values: ["Sales"] }));

            oVizFrame.setVizProperties({
                title: { text: "Sales by Region" },
                plotArea: { dataLabel: { visible: true } },
                legend: { visible: true }
            });

            var oPopOver = oView.byId("idPopOver");
            if (oPopOver) {
                oPopOver.connect(oVizFrame.getVizUid());
            } else {
                console.warn("⚠ Popover not found.");
            }
        },

        onNavBack: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("App");
        }
    });
});
