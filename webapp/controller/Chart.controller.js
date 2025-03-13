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
        },

        _onRouteMatched: function () {
            console.log("🚀 Chart route matched");
            var oModel = this.getView().getModel("salesModel");
            
            if (!oModel) {
                // Try to get model from component if not in view
                oModel = this.getOwnerComponent().getModel("salesModel");
                console.log("📊 Getting model from component");
            }

            if (!oModel) {
                console.error("❌ Error: salesModel not found in view or component");
                return;
            }

            // Check if data is already available
            var oData = oModel.getData();
            console.log("Current model data:", oData);
            
            if (oData && oData.salesData && oData.salesData.length > 0) {
                console.log("✅ Data already available, initializing chart");
                this._initVizFrame();
            } else {
                console.log("⏳ Waiting for data...");
                // Set up one-time data change event handler
                oModel.attachEventOnce("dataReceived", this._initVizFrame, this);
                oModel.attachEventOnce("requestCompleted", this._initVizFrame, this);
                
                // Fallback timeout in case events don't fire
                setTimeout(function() {
                    if (oModel.getData() && oModel.getData().salesData) {
                        console.log("⏰ Timeout triggered, initializing chart");
                        this._initVizFrame();
                    }
                }.bind(this), 1000);
            }
        },

        _initVizFrame: function () {
            var oView = this.getView();
            var oVizFrame = oView.byId("idVizFrame");

            if (!oVizFrame) {
                console.error("❌ Error: VizFrame not found.");
                return;
            }

            console.log("✔ Initializing VizFrame...");
            
            // Get model and verify data again
            var oModel = this.getView().getModel("salesModel");
            if (!oModel) {
                oModel = this.getOwnerComponent().getModel("salesModel");
            }
            
            var oData = oModel.getData();
            console.log("Data for chart:", oData);
            
            if (!oData || !oData.salesData || oData.salesData.length === 0) {
                console.error("❌ No data available for the chart");
                return;
            }

            // Create dataset with correct binding path
            var oDataset = new FlattenedDataset({
                dimensions: [{ 
                    name: "Region", 
                    value: "{region}" 
                }],
                measures: [{ 
                    name: "Sales", 
                    value: "{sales}" 
                }],
                data: { 
                    path: "/salesData" 
                }
            });

            oVizFrame.setModel(oModel);
            oVizFrame.setDataset(oDataset);
            oVizFrame.setVizType("bar");

            oVizFrame.removeAllFeeds();
            oVizFrame.addFeed(new FeedItem({ 
                uid: "categoryAxis", 
                type: "Dimension", 
                values: ["Region"] 
            }));
            oVizFrame.addFeed(new FeedItem({ 
                uid: "valueAxis", 
                type: "Measure", 
                values: ["Sales"] 
            }));

            oVizFrame.setVizProperties({
                title: { text: "Sales by Region" },
                plotArea: { 
                    colorPalette: ["#5899DA", "#E8743B", "#19A979", "#ED4A7B", "#945ECF", "#13A4B4", "#525DF4", "#BF399E", "#6C8893", "#EE6868"],
                    dataLabel: { 
                        visible: true,
                        showTotal: false
                    }
                },
                valueAxis: {
                    title: {
                        visible: true,
                        text: "Sales"
                    }
                },
                categoryAxis: {
                    title: {
                        visible: true,
                        text: "Region"
                    }
                },
                legend: { 
                    visible: true,
                    position: "bottom"
                }
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