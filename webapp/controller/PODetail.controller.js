sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "MyApp/model/util"
], function (Controller, util) {
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
                    public: true,
                    final: true
                },
                onDelete: {
                    public: true,
                    final: false
                }
            }
        },
        formatter: util,
        onInit: function(){
            //router event
            const router = this.getOwnerComponent().getRouter();
            router.getRoute("PurchaseOrder").attachPatternMatched(this._onRouteMatched, this);
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
            const router = this.getOwnerComponent().getRouter();
            router.navTo("Home");            
        }
    });
});