export function HttpCall(url,method,params,callback){
    fetch(url,{
        method:method,
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(params)
    }).then((response)=>response.json())
    .then(callback)
    .catch(callback);
}