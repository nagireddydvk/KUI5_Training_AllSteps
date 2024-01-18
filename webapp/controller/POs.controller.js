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
            const poNumber = oData.ID;
            router.navTo("PurchaseOrder", {
                PONumber: poNumber
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
        },
        onCreate: async function(){
            //Create a dialog, showing the fragment poCreate.fragment.xml
            if (!this.createDialog){
                this.createDialog = await Fragment.load({
                    "name": "MyApp.view.fragments.poCreate",
                    "type": "XML"
                });
            }
            this.getView().addDependent(this.createDialog);
            this.createDialog.open();

            //Create a binding context via createEntry and assign it to the dialog
            const oModel = this.getView().getModel();
            const oContext = oModel.createEntry("/PurchaseOrders");
            this.createDialog.setBindingContext(oContext);
        },
        create: async function(){
            //Create a new PO
            const oModel = this.getView().getModel();
            const oData = this.createDialog.getBindingContext().getProperty();
            const oResponse = await oModel.create("/PurchaseOrders", oData);
            console.log(oResponse);
            this.createDialog.close();
        }      
    });
});