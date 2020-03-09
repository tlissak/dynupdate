# dynupdate
NodeJS script for ovh.com dynamic DNS domain update using simple interval

it simply getting your external IPv4 and then calling ovh url with basic Auth:

 http://www.ovh.com/nic/update?system=dyndns&hostname=YOU_HOST&myip=YOU_EXT_IPV4
  
 More information for ovh dynhost look at : 
 https://docs.ovh.com/fr/domains/utilisation-dynhost/

Installation :
```
npm install ovhdynupdate
```

Usage in your index.js :

```
let app = require('ovhdynupdate');

app.init({
    interval:1000*60*3 , // in MS update every 3 min
    domain:'sub.domain.com', 
    auth : "domain.com-USER:YOURPASSWORD",
    //service_ipv4 : 'http://someserviceforipv4_remoteaddress.com' 
}) ;
```

result should have somthing like this in the console :
```
Init process for domain sub.domain.com auth : domain.com-sub:***** with interval 30000
2020-03-05T16:35:05.496Z nochg 000.000.000.000
```
