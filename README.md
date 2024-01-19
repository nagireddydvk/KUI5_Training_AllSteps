# ui5-training

## Enable Flexibility
    - Add the following to the manifest.json
    - "sap.ui5": {
        "flexEnabled": true
    }
    - Add ViewID in the manifest.json for all 'targets' in the routing section
    - Set async:true in target, and rootView
    - Add stable IDs to all controls that need to be changed
    - In the Controllers add 'metadata' section and define which methods can be enhanced
    - For Views, add hooks
  
