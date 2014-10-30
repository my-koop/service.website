///<reference path="../../typings/tsd.d.ts" />
var agent: superagent.Agent = require("superagent");

export interface AjaxParams {
  endpoint: string;
  method?: string;
  data?: any;
}

export interface AjaxCallback {
  (err: Error, body?: any, res?: superagent.Response) : void;
}

export function request(params: AjaxParams, callback: AjaxCallback) {
  var method = params.method ? params.method.toUpperCase() : "GET";
  var data = method === "GET" ?
    {
      query: params.data,
      send: <any>{}
    }
    :
    {
      query: <any>{},
      send: params.data
    };
  function wrapSuperAgentCallback(err, res: superagent.Response) {
    if(err) {
      return callback(new Error(err));
    }
    if(res.error) {
      return callback(new Error(res.text));
    }
    callback(null, res.body, res);
  }
  //TODO: Do we want to wrap the response a little? Consider 404 an error,
  // only send the reponse body, etc.
  agent(method, params.endpoint)
    .query(data.query)
    .send(data.send)
    .end(wrapSuperAgentCallback);
}
