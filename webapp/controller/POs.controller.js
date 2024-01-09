sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util"    
], function (Controller, util) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        formatter: util,
        onItemPress: function(oEvent){
            //Get instance of the selected row
            const source = oEvent.getSource();
            const router = this.getOwnerComponent().getRouter();
            const context = source.getBindingContext().getPath();
            const rowNumberClicked = context.split("/")[2];
            router.navTo("PurchaseOrder", {
                rowNumber: rowNumberClicked
            });            
        },
        showDetailsInPopup: async function(){
            const fragmentContent = this.loadfragment({});
        }
    });
});