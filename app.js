let http = require('http') ;

var app = {
    interval:1000*60*5, //in ms = 1000*60*5 = 5min
    domain:null,
    auth : null,
    ip:null,
    service_ipv4:'http://ipv4.icanhazip.com', //

    get: (uri,opt,cb)=>{
        http.get(uri,{auth: app.auth },(resp)=>{
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                cb.call(app,data);
            });
        }).on('error', (err)=> {
            if (err.code === 'ETIMEDOUT') { console.log("Err connection timeout "+ err.address); return }
            console.log(err);
        }).on('uncaughtException', (err)=> {
                console.log(err);
        });
    },
    init:(cfg)=>{
        if (!cfg.domain) throw("No config domain e.g. sub.domain.com") ;
        if (!cfg.auth) throw ('No config auth e.g. domain.com-sub:password');
        if (!cfg.interval || cfg.interval < 1000 ) cfg.interval = 1000*60*5 ;
        if (cfg.service_ipv4) app.service_ipv4 = cfg.service_ipv4;

        app.domain = cfg.domain ;
        app.auth = cfg. auth ;
        app.interval  = cfg.interval ;

        console.log("Init process for domain " + app.domain + " auth : "+ app.auth + ' with interval '+ app.interval );

        setTimeout(()=>{app.process();},1000) ;
        setInterval(app.process,app.interval) ;
    },
    process : ()=>{
        console.log(new Date(),"Starting Process..");
        app.get(app.service_ipv4,{},(res)=>{
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