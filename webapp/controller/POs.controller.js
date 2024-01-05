sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        onItemPress: function(){
            const router = this.getOwnerComponent().getRouter();
            router.navTo("PurchaseOrder", {
                poNumber: "1"
            });            
        }
    });
});