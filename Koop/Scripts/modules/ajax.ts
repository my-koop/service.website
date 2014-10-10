///<reference path="../typings/superagent/superagent.d.ts" />
import superagent = require('superagent');
var t: any = superagent;
var agent: superagent.Agent = t;

export interface AjaxParams {
    endpoint: string;
    method: string;
    data: Object;
}

export interface AjaxCallback {
    (err: Error, res: superagent.Response) : void;
}

export function request(params: AjaxParams, callback: AjaxCallback) {
    agent
        .get(params.endpoint)
        .end(callback);
}
