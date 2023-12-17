sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("MyController", {
        onInit: function () {
            console.log("onInit reached");
            var oData = {
                field1: "",
                field2: ""
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },
        echoInput: function () {
            var input1 = this.byId("inputField1").getValue();
            var input2 = this.byId("inputField2").getValue();
            alert("Values: " + input1 + ", " + input2 );
        },
        onBeforeRendering: function(){
            console.log("onBeforeRendering reached");
        },
        onAfterRendering: function(){
            console.log("onAfterRendering reached");
        },
        onExit: function(){
            console.log("onExit reached");
        }
    });
});
