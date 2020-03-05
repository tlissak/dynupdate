# dynupdate
NodeJS script for ovh.com dynamic DNS domain update using simple interval

it simply doing request to :

 http://www.ovh.com/nic/update?system=dyndns&hostname=HOST&myip=IPV4
 
 with basic Auth and with your external IPv4 address fetch from : http://ipv4.icanhazip.com
 
 More usage information is on : 
 https://docs.ovh.com/fr/domains/utilisation-dynhost/

Usage :

```
let app = require('dynupdate');

app.init({
    interval:1000*60, // in MS update every 1 min
    domain:'sub.domain.com', 
    auth : "domain.com-USER:YOURPASSWORD"
}) ;
```

result should have somthing like this in the console :
```
2020-03-05T16:35:05.496Z nochg 88.125.212.23
```
