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
            
            oModel.loadData("http://localhost:5500/data"); // Change to match your API
            
            oModel.attachRequestCompleted(function() {
                var data = oModel.getData();
                console.log("📊 Data Received:", data);
                
                if (!data || !Array.isArray(data)) {
                    console.error("❌ Invalid Data Format!");
                    return;
                }

                oModel.setData({ salesData: data });
            });

            this.setModel(oModel, "salesModel");
        }
    });
});
