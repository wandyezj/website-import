# Readme

Import code is used to transfer localstorage data from one domain to another.

## Deploying to old site

Update Settings

- Settings -> Environment variables
- set `WEBSITE_RUN_FROM_PACKAGE` from 1 to 0
- click `Apply`
- click `Confirm`

Upload File

- Development Tools -> Advanced Tools
- click `Go ->`
- In Kudu
- Debug Console -> cmd
- explore to site/wwwroot
- upload import.html

## Verification

Check that import.html is present at the endpoints url

- `<baseurl>/import.html`
- this should show that it can't be loaded outside of an iframe

### Legacy import urls

- [alpha](https://script-lab-react-alpha.azurewebsites.net/import.html)
- [beta](https://script-lab-react-beta.azurewebsites.net/import.html)
- [staging](https://script-lab-react-staging.azurewebsites.net/import.html)
- [production](https://script-lab-react.azurewebsites.net/import.html)
- [CDN](https://script-lab.azureedge.net/import.html)

### Verify

Then verify with the new add-in

- make sure there are some solutions in local storage
- go to each endpoint and create the solution

note: it looks like you might need to re-launch script lab after the import is complete.

[Legacy Dashboard](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/dashboard/arm/subscriptions/3decf8b3-4173-4999-98ee-c636e852d4ac/resourcegroups/dashboards/providers/microsoft.portal/dashboards/457ceee4-5776-434a-b09e-72d50d1c8e96)
