sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyApp.controller.MyController", {
        calculate: function () {
            const input1 = this.getView().getModel().getData().field1;
            const input2 = this.getView().getModel().getData().field2;
            const operator = this.getView().getModel().getData().operator;

            let output = 0;
            if (operator === "+"){
                output = parseInt(input1) + parseInt(input2);
            }else if (operator === "*"){
                output = parseInt(input1) * parseInt(input2);
            }

            const model = this.getView().getModel();
            let data = model.getData();
            data.output = output;
            model.setData(data);
        },
        gotoPO: function(){
            const router = this.getOwnerComponent().getRouter();
            router.navTo("PurchaseOrder");            
        }
    });
});