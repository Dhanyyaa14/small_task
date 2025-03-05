sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
    
], function(UIComponent,JSONModel) {
    "use strict";
    
    return UIComponent.extend("my.app.Component", {
        metadata: {
            manifest: "json"
        },
        
        init: function () {
            UIComponent.prototype.init.apply(this, arguments);
            var oModel = new JSONModel();
            oModel.loadData("http://localhost:5500/data"); // Ensure API is working
            oModel.attachRequestCompleted(function() {
                var data = oModel.getData();
                oModel.setData({ salesData: data });  // Ensuring correct format
            });
            // Set model to the component so it's available in the views
            this.setModel(oModel, "salesModel");
        }
    });
});
