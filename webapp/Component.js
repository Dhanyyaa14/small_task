sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("my.app.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the parent init function
            UIComponent.prototype.init.apply(this, arguments);

            // Initialize routing
            this.getRouter().initialize();

            // Create and load JSON data model
            var oModel = new JSONModel();
            
            // Set default data structure
            oModel.setData({ salesData: [] });
            
            // Load data from server
            fetch("http://localhost:5500/data")
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    console.log("📊 Data Received:", data);
                    
                    if (!data || !Array.isArray(data)) {
                        console.error("❌ Invalid Data Format!");
                        return;
                    }

                    oModel.setData({ salesData: data });
                    
                    // Fire event to notify that data is ready
                    sap.ui.getCore().getEventBus().publish("salesModel", "ready", { data: data });
                    oModel.fireEvent("dataReceived");
                    oModel.fireEvent("requestCompleted");
                })
                .catch(function(error) {
                    console.error("❌ Error fetching data:", error);
                });

            this.setModel(oModel, "salesModel");
        }
    });
});