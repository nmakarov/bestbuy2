BestBuy Assignment
==================

### requirements
No frameworks, full-on build process, all-round testing


Viewing
=======

Preferred way of running the app is by using a simple `http-server`. Since JSON being requested from other domain, to avoid 'Access-Control-Allow-Origin' errors JSONP proxy might be used (configured by editing BestBuyFramework.DataService.proxy to `1`) or disable browser's security by

open -a /Applications/Google\ Chrome.app --args --disable-web-security


Optimization
============

- All thumbnail images should be made of the same size on the server to avoid unnesessary processing on the client side. If that's not possible a component should be developed to represent a product thumbnail which will calculate width and height of an image to preserve image proportions (now it is hardcoded in the CSS to be stretched/reduced to 150x150 pixels).
- extra-long product titles should be truncated and/or saved in the extra data field
- A default thumbnail image to be provided - if there's an error fetching an actual thumbnail, this default one should be displayed instead.
- have multiple configs for easy switching between JSON stubs versus backend service calls. 
- minify and compress javascript files, have multiple .HTML versions for compressed/development versions of the app; have a `gulp` script to automate this.
- precompile Handlebars templates.
- for all invalid requests (non-existing category request, non-existing product etc.) prepare corresponding error messages/default views etc.
- For development and easy versioning each controller/module/template/etc. should be placed in their own file; Grunt/Gulp script should be present to perform stitching/assembly of different functions/parts independently.


Testing
=======

functional tests may be seen in the browser by navigating to /test/index.html. Console runner doesn't work because of the version mismatch between Jasmine html reporter and a current test runner.

I was unable to provide reliable e2e tests since I have quite weird setup of my dev machine - Selenium doesn't work, CasperJS/PhantomJS version mismatch etc. A simple awareness test is present and may be run by ./casper.sh; It will be able to produce positive results if BestBuyFramework.DataService.proxy is set to '1' (i.e. JSONP proxy is in use) and that is quite unreliable - they have limits. In real life JSON stubs should be used along with local server.

