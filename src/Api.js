export function HttpCall(url,method,params,access_token,callback){
    var header;
    (access_token)?(
        header={
            access_token:access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    ):(header={
        access_token:access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    fetch(url,{
        method:method,
        headers:header,
        body:JSON.stringify(params)
    }).then((response)=>response.json())
    .then(callback)
    .catch(callback);
}
export function HttpGETCall(url,method,access_token,callback){
    var header;
    (access_token)?(
        header={
            access_token:access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    ):(header={
        access_token:access_token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    })
    fetch(url,{
        method:method,
        headers:header,
    }).then((response)=>response.json())
    .then(callback)
    .catch(callback);
}
