sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util"
], function (Controller, util) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        formatter: util,
        onInit: function(){
            //router event
            const router = this.getOwnerComponent().getRouter();
            router.getRoute("PurchaseOrder").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent){
            const PONumber = oEvent.getParameter("arguments").PONumber;
            const itemNo = oEvent.getParameter("arguments").itemNo;
            const oModel = this.getView().getModel();
            const sPath = oModel.createKey("/C_PurchaseRequisitionValueHelp", {
                "PurchaseRequisition": PONumber,
                "PurchaseRequisitionItem": itemNo
            });
            this.getView().bindElement(sPath);
        },

        gotoPO: function(){
            const router = this.getOwnerComponent().getRouter();
            router.navTo("Home");            
        }
    });
});