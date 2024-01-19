sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util",
    "sap/m/Dialog",
    "sap/ui/core/Fragment",
    "sap/m/Button",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], function (Controller, util, Dialog, Fragment, Button, MessageBox, MessageToast) {
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
                let dialogContent = await Fragment.load({
                    "name": "MyApp.view.fragments.poCreate",
                    "type": "XML"
                });
                this.createDialog = new Dialog({
                    title: "New PO",
                    content: dialogContent,
					endButton: new Button({
						text: "Save",
						press: this.create.bind(this)
					})
                });
            }
            this.getView().addDependent(this.createDialog);
            this.createDialog.open();

            //Create a binding context via createEntry and assign it to the dialog
            const oModel = this.getView().getModel();
            const oContext = oModel.createEntry("/POs");
            this.createDialog.setBindingContext(oContext);
        },
        create: async function(){
            //Create a new PO
            try {
                const oModel = this.getView().getModel();
                this.createDialog.setBusy(true);
                const oData = this.createDialog.getBindingContext().getProperty();
                const oResponse = await oModel.create("/POs", oData);
                console.log(oResponse);
                this.createDialog.setBusy(false);
                this.createDialog.close();
                MessageToast.show("PO created successfully");
            } catch (oError) {
                this.createDialog.setBusy(false);
                MessageBox.error("Error creating item: " + oError.message);
            }
        },
        onDelete: async function(oEvent){
            //Delete a PO
            try {
                const oBindingContext = oEvent.getSource().getParent().getBindingContext();
                const oModel = this.getView().getModel();
                this.getView().setBusy(true);
                const oResponse = await oModel.remove(oBindingContext.getPath());
                this.getView().setBusy(false);
                MessageToast.show("PO deleted successfully");
            } catch (oError) {
                this.getView().setBusy(false);
                // Handle the error
                MessageBox.error("Error removing item: "+ oError.message);
            }
        }
    });
});