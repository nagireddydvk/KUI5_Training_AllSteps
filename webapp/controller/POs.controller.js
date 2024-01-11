sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util",
    "sap/m/Dialog",
    "sap/ui/core/Fragment"
], function (Controller, util, Dialog, Fragment) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        formatter: util,
        onItemPress: function(oEvent){
            //Get instance of the selected row
            const source = oEvent.getSource();
            const router = this.getOwnerComponent().getRouter();
            const oData = source.getBindingContext().getProperty();
            const poNumber = oData.PurchaseRequisition;
            const itemNumber = oData.PurchaseRequisitionItem;
            router.navTo("PurchaseOrder", {
                PONumber: poNumber,
                itemNo: itemNumber
            });            
        },
        showDetailsInPopup: async function(oEvent){
            let oBindingContext = oEvent.getSource().getParent().getBindingContext();
            
            const fragmentContent = await Fragment.load({
                "name": "MyApp.view.fragments.poDetail",
                "type": "XML"
            });

            const oDialog = new Dialog({
                title: "PO Detail",
                content: fragmentContent,
                afterClose: function(){
                    this.destroy();
                }
            });

            this.getView().addDependent(oDialog);

            oDialog.open();            
            oDialog.setBindingContext(oBindingContext);
        }
    });
});