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

### Verify

Then verify with the new add-in

- make sure there are some solutions in local storage
- go to each endpoint and create the solution

note: it looks like you might need to re-launch script lab after the import is complete.
