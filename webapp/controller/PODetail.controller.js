sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyApp.controller.POs", {
        onInit: function(){
            //router event
            const router = this.getOwnerComponent().getRouter();
            router.getRoute("PurchaseOrder").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function(oEvent){
            const rowNumber = oEvent.getParameter("arguments").rowNumber;
            const bindingPath = "/myPOs/" + rowNumber;
            this.getView().bindElement(bindingPath);
        },

        gotoPO: function(){
            const router = this.getOwnerComponent().getRouter();
            router.navTo("Home");            
        }
    });
});