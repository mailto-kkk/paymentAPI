'use strict';
var logger = require('../lib/logUtil');
var commonUtil = require('../lib/commonUtil');
var httpStatus = require('http-status');
var paymentService= require('../services/paymentService');

module.exports = function (router) {

    router.options('/*', function (req, res) {
        logger.msg('INFO', 'v1', '', '', 'OPTIONS ', 'sets the Cross-origin resource sharing (CORS) headers');
        /*sets the Cross-origin resource sharing (CORS) headers*/
        commonUtil.setCorsResponseHeaders(res)
            .then(function (res) {
                res.sendStatus(httpStatus.OK);
            });
    });



    //POST Create payment
    router.post("/", function (req, res) {
        logger.msg('INFO', 'v1', '', '', 'POST ', 'Create payment - ' + JSON.stringify(req.body));
        if(req.body.constructor === Object && (Object.keys(req.body).length === 0 )) {
            // If it is a empty body , then it is a bad request.
            logger.msg('INFO', 'v1', '', '', 'POST ', 'Contains empty body or contains more than one key ');
            commonUtil.sendResponseWoBody(res, httpStatus.BAD_REQUEST);
        } else {
            paymentService.createPosting(req, res);
        }
    });




    //Cancel Payment
    router.put("cancel/:paymentID", function (req, res) {
        var  paymentID= req.params.paymentID;
        paymentService.cancelPayment(req, res);

    });
};
