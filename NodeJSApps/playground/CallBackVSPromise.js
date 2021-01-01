const callbackFunction =(response)=>{
    setTimeout(()=>{
        response('backend services has send error',undefined);
        response(undefined,[1,2,3]);
    },2000)
}

callbackFunction((error,result)=>{
    if(error){
        return console.log(error)
    }
    console.log(result);

})