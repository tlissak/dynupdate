let http = require('http') ;

var app = {
    interval:1000*60*5, //in ms = 1000*60*5 = 5min
    domain:null,
    auth : null,
    ip:null,
    get: (uri,opt,cb)=>{
        req = http.get(uri,{auth: app.auth },(resp)=>{
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                cb.call(app,data);
            });
        }) ;
    },
    init:(cfg)=>{
        if (!cfg.domain) throw("No config domain e.g. sub.domain.com") ;
        if (!cfg.auth) throw ('No config auth e.g. domain.com-sub:password');
        if (!cfg.interval || cfg.interval < 1000 ) cfg.interval = 1000*60*5 ;

        app.domain = cfg.domain ;
        app.auth = cfg. auth ;
        app.interval  = cfg.interval ;

        console.log("Starting process for domain " + app.domain + " auth : "+ app.auth + ' with interval '+ app.interval );

        app.process();
        setInterval(app.process,app.interval) ;
    },
    process : ()=>{
        app.get("http://ipv4.icanhazip.com",{},(res)=>{
            app.ip = res.replace("\n","") ;
            app.update()
        }) ;
    },
    update:()=> {
        app.get("http://www.ovh.com/nic/update?system=dyndns&hostname=" + app.domain + "&myip=" + app.ip, {auth: app.auth}, (res) => {
            console.log(new Date(),res);
        });
    }

} ;

module.exports = app ;