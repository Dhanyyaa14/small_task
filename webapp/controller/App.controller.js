sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("my.app.controller.App", {
        onInit: function () {
            // We'll use the model from the Component instead of creating a new one
            var oModel = this.getOwnerComponent().getModel("salesModel");
            if (!oModel) {
                console.error("❌ Error: salesModel not found in component");
                
                // Create model only if not available from component
                oModel = new sap.ui.model.json.JSONModel();
                oModel.setData({ salesData: [] });
                this.getView().setModel(oModel, "salesModel");
            } else {
                // Set the component's model to the view
                this.getView().setModel(oModel, "salesModel");
            }
        },
        
        onNavToChart: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Chart");
        }
    });
});