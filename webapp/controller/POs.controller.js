sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        onItemPress: function(oEvent){
            //Get instance of the selected row
            const source = oEvent.getSource();
            const router = this.getOwnerComponent().getRouter();
            const context = source.getBindingContext().getPath();
            const rowNumberClicked = context.split("/")[2];
            router.navTo("PurchaseOrder", {
                rowNumber: rowNumberClicked
            });            
        }
    });
});