# dynupdate
NodeJS script for ovh.com dynamic DNS domain update using simple interval

Usage :

```
let app = require('dynupdate');

app.init({
    interval:1000*60, // in MS update every 1 min
    domain:'sub.domain.fr', 
    auth : "domain.com-USER:YOURPASSWORD"
}) ;

```
