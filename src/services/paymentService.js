'use strict';

var logger = require('../lib/logUtil');
var commonUtil = require('../lib/commonUtil');
var httpStatus = require('http-status');
var paymentModel = require('../models/paymentModel');

function paymentService() {
}

module.exports = paymentService;

/*
    Used to store the order details
 */
paymentService.createPosting = function(request,response) {
    var orderID=request.body.orderID;
    var userName=request.body.userName;
    var postingAmount=request.body.postingAmount;
     return paymentModel.createPosting(orderID,userName,postingAmount)
        .then(function(insertedData){
            if(insertedData){
                return commonUtil.sendResponse(response, httpStatus.CREATED, insertedData);
            } else {
                logger.msg('ERROR', 'paymentService', '', '', 'createOrder', 'Undefined error in createOrder - ' + err.stack);
                return commonUtil.sendResponseWoBody(response, httpStatus.INTERNAL_SERVER_ERROR);
            }
        }, function (err) {
            logger.msg('ERROR', 'paymentService', '', '', 'createOrder', 'Undefined error in createOrder - ' + err.stack);
            return commonUtil.sendResponseWoBody(response, httpStatus.INTERNAL_SERVER_ERROR);
        });
};


/*
 Used to cancel the payment
 */
paymentService.cancelPayment = function(request,response) {

    var  paymentID= req.params.paymentID;
    var  cancelReason= req.body.cancelReason;
    return paymentModel.cancelPayment(paymentID,cancelReason)
        .then(function(insertedData){
            if(insertedData){
                return commonUtil.sendResponse(response, httpStatus.CREATED, insertedData);
            } else {
                logger.msg('ERROR', 'paymentService', '', '', 'createOrder', 'Undefined error in createOrder - ' + err.stack);
                return commonUtil.sendResponseWoBody(response, httpStatus.INTERNAL_SERVER_ERROR);
            }
        }, function (err) {
            logger.msg('ERROR', 'paymentService', '', '', 'createOrder', 'Undefined error in createOrder - ' + err.stack);
            return commonUtil.sendResponseWoBody(response, httpStatus.INTERNAL_SERVER_ERROR);
        });
};