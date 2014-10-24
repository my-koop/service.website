var superagent = require("superagent");

export interface AjaxParams {
  endpoint: string;
  method?: string;
  data?: any;
}

export interface AjaxCallback {
  (err: Error, res: any) : void;
}

export function request(params: AjaxParams, callback: AjaxCallback) {
  var method = params.method ? params.method.toUpperCase() : "GET";
  var data = params.data || {};

  //TODO: Do we want to wrap the response a little? Consider 404 an error,
  // only send the reponse body, etc.
  superagent(method, params.endpoint)
    .send(data)
    .end(callback);
}
