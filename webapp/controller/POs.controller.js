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
        metadata: {
            methods: {
                onItemPress: {
                    public: true,
                    final: false
                },
                onCreate: {
                    public: true,
                    final: true
                },
                create: {
                    public: false,
                    final: true
                },
                onDelete: {
                    public: false,
                    final: false
                }
            }
        },
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
                let dialogContent = await this.loadFragment({
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
            //Ensure that there are no errors in the dialog from message manager
            const oMessageManager = sap.ui.getCore().getMessageManager();
            const oMessageModel = oMessageManager.getMessageModel();

            const aMessages = oMessageModel.getData();
            if (aMessages.length > 0){
                MessageBox.error("Please fix the errors in the dialog");
                return;
            }

            //Mandatory validation
            const pg = this.getView().byId("_IDGenInput3");
            const value = pg.getValue();
            if (value == ""){
                pg.setValueState("Error") ;
                pg.setValueStateText("Mandatory");
                return;              
            }else {
                pg.setValueState();
                pg.setValueStateText();                
            }

            //Create a new PO
            try {
                const oModel = this.getView().getModel();
                this.createDialog.setBusy(true);
                const oData = this.createDialog.getBindingContext().getProperty();
                await oModel.create("/POs", oData, {
                    success: function(oData, oResponse){
                        MessageToast.show("PO created successfully");
                    },
                    error: function(oError){
                        const sError = JSON.parse(oError.responseText).error.message.value;
                        MessageBox.error("Error creating item: " + sError);
                    }
                }); 
                this.createDialog.close();
                this.createDialog.setBusy(false);              
                
            } catch (oError) {            
                this.createDialog.close();    
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