sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("my.app.controller.App", {
        onInit: function () {
            var oModel = new sap.ui.model.json.JSONModel();
            this.getView().setModel(oModel, "salesModel");

            
            
            fetch("http://localhost:5500/data")
                .then(response => response.json())
                .then(data => {
                    //console.log("Fetched Data:", data);
                    oModel.setData({ salesData: data });
                    //console.log("Model Data:", oModel.getData());  
                })
                .catch(error => console.error("Error fetching data:", error));
            
            
           
        },
        onNavToChart: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Chart");
        }
    });
});






