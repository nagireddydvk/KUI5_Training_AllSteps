sap.ui.define([], function() {
    "use strict";

    return {
        toTwoDecimals: function(num) {
            const output = parseInt(num).toFixed(2);
            return output;
        }
    };
});