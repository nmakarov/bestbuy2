BestBuy Assignment
==================

### requirements
No frameworks, full-on build process, all-round testing


Viewing
=======

Preferred way of running the app is by using a simple `http-server`. Since JSON being requested from other domain, to avoid 'Access-Control-Allow-Origin' errors JSONP proxy might be used (configured by editing BestBuyFramework.DataService.proxy to `1`) or disable browser's security by

open -a /Applications/Google\ Chrome.app --args --disable-web-security



Testing
=======

functional tests may be seen in the browser by navigating to /test/index.html. Console runner doesn't work because of the version mismatch between Jasmine html reporter and a current test runner.

I was unable to provide reliable e2e tests since I have quite weird setup of my dev machine - Selenium doesn't work, CasperJS/PhantomJS version mismatch etc. A simple awareness test is present and may be run by ./casper.sh; It will be able to produce positive results if BestBuyFramework.DataService.proxy is set to '1' (i.e. JSONP proxy is in use) and that is quite unreliable - they have limits. In real life JSON stubs should be used along with local server.

