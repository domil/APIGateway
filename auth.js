const axios = require('axios')

const verifyToken = async (req, res) => {
    const response = await axios({
        url: "verifyTokenUrl",
        method: "POST",
        //headers: mergedHeader,
        //params: req.query, 
        data: requestBody,
        timeout: timeoutInSecs ? timeoutInSecs*1000 : 25000
    }).catch((err) => {
      console.log('Error occured in : ' + domainURL+req.path);
      // console.log({...err});   
      if (err.response) { // client received an error response (5xx, 4xx)
          console.log(err.response);
          // res.status(err.response.status);
          // res.send(err.response.data);
          return {status: err.response.status,data: err.response.data};
      } else if (err.request) { // client never received a response, or request never left
        console.log(err.request);
        // res.status(502);
        // res.send(err);
        console.log("Couldn't make the request or Service unresponsive");
        return {status: 502, data: err};
      } else {  
        console.log('Unknown error occured.');
        // res.status(err.response.status);
        // res.send(err);
        return {status:500 ,data: err};
        
        // throw  new Error(err.message);
      }
    });

    if(response.status == 200){
        return next(req,res);
    }
    else {
        res.status(responseFromService.status);
        res.send(responseFromService.data);
        return;
    }
    
}


const setupAuth = (app, routes) => {
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, verifyToken, function (req, res, next) {
                next();
            });
        }
    });
}

exports.setupAuth = setupAuth