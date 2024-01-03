sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent, ResourceModel) {
    "use strict";
    return UIComponent.extend("MyApp.Component", {
        metadata : {
            manifest: "json"
        },
        init: function(){
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
        }
    });
});
