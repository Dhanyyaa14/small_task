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
            UIComponent.prototype.init.apply(this, arguments);

            var oModel = new JSONModel();
            var that = this; 

            oModel.loadData("http://localhost:5500/data");

            
            oModel.attachRequestCompleted(function() {
                console.log("Fetched Data:", oModel.getData()); // Debugging
                that.setModel(oModel, "salesModel"); // Set model only after data is loaded
            });

            
            oModel.attachRequestFailed(function(oEvent) {
                console.error("Failed to fetch data:", oEvent.getParameter("statusText"));
            });
        }
    });
});
