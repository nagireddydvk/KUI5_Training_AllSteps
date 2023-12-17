sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyController", {
        onInit: function () {
            alert("onInit reached");
            var oData = {
                field1: "Krishna",
                field2: "Kammaje"
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            let inputField1 = this.byId("inputField1");
            inputField1.setRequired(true);
        },
        onBeforeRendering: function(){
            alert("onBeforeRendering reached");
            var inputField2 = this.byId("inputField2");
            if (inputField2) {
                inputField2.focus();
            }            
        },
        onAfterRendering: function(){
            alert("onAfterRendering reached");
            var inputField2 = this.byId("inputField2");
            if (inputField2) {
                inputField2.focus();
            }               
        },
        onExit: function(){
            alert("onExit reached");
        },
        echoInput: function () {
            var input1 = this.byId("inputField1").getValue();
            var input2 = this.byId("inputField2").getValue();
            alert("Values: " + input1 + ", " + input2 );
        }        
    });
});
