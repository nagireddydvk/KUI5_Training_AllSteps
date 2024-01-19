sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util",
    "sap/m/MessageToast"    
], function (Controller, util, MessageToast) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        formatter: util,
        onInit: function(){
            //router event
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("PurchaseOrder").attachPatternMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function(oEvent){
            const PONumber = oEvent.getParameter("arguments").PONumber;
            const oModel = this.getView().getModel();
            const sPath = oModel.createKey("/POs", {
                "ID": PONumber
            });
            this.getView().bindElement(sPath);
        },
        gotoPO: function(){
            this.oRouter.navTo("Home");            
        },
        onSave: async function(){
            //Update PO
            try {
                this.getView().setBusy(true);
                const oModel = this.getView().getModel();
                if (oModel.hasPendingChanges()){
                    const oResponse = await oModel.submitChanges();
                    MessageToast.show("PO saved successfully");

                }
                this.oRouter.navTo("Home");   
            } catch (oError) {
                MessageBox.error("Error removing item: "+ oError.message);
            } finally{
                this.getView().setBusy(false);
            }
        }
    });
});