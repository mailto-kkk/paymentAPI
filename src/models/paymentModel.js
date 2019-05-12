'use strict';

function paymentModel() {
    return {};
}

module.exports = paymentModel;

var moment=require('moment');
var Q = require('q');
var logger = require('../lib/logUtil');
var commonUtil = require('../lib/commonUtil');
var DBUtil = require('../lib/dbUtil');

paymentModel.createPosting = function (orderID,userName,postingAmount) {
    logger.msg('INFO', 'paymentModel', '', '', 'createPosting', 'createPosting');
    var d              = Q.defer();
    //var currentTimestamp=moment().unix();
    var currentTimestamp=moment.utc().unix();
    var postingID=uuid.v4();
    var isSettledTransaction="N";
    var sqlData        = [postingID,orderID,userName,"CREATED",postingAmount,currentTimestamp];
    var tableMainQuery   = "INSERT INTO POSTING(POSTING_ID,ORDER_ID,USER_NAME,STATE,POSTING_AMOUNT,isSettledTransaction,CREATED_TIME_UTC) VALUES(?,?,?,?,?,?,?)";
    DBUtil.getConnection(function (err, dbConn) {
        if (err) {
            logger.msg('ERROR', 'paymentModel', '', '', 'insertOrder', 'Error during getConnection :: err - ' + err.stack);
            d.reject(err);
        } else {
            dbConn.query(tableMainQuery, sqlData, function (err, results) {
                DBUtil.releaseConnection(dbConn);
                if (err) {
                    logger.msg('ERROR', 'paymentModel', '', '', 'insertOrder', 'Error during executing SQL :: err - ' + err.stack);
                    d.reject(err);
                } else {
                    var responseToSend={
                        "postingID":postingID
                    };
                    // If time permits, insert audit trail information.
                    d.resolve(responseToSend);
                }
            });
        }
    });
    return d.promise;
};

paymentModel.cancelPayment = function (paymentID,cancelReason) {
    logger.msg('INFO', 'paymentModel', '', '', 'cancelPayment', 'cancelPayment');
    var d              = Q.defer();

    var sqlData        = ["Y",cancelReason,paymentID];
    var tableMainQuery   = "UPDATE POSTING SET LOGICAL_DELETE = ?,CANCEL_REASON=? WHERE PAYMENT_ID = ?";
    DBUtil.getConnection(function (err, dbConn) {
        if (err) {
            logger.msg('ERROR', 'paymentModel', '', '', 'cancelPayment', 'Error during getConnection :: err - ' + err.stack);
            d.reject(err);
        } else {
            dbConn.query(tableMainQuery, sqlData, function (err, results) {
                DBUtil.releaseConnection(dbConn);
                if (err) {
                    logger.msg('ERROR', 'paymentModel', '', '', 'cancelPayment', 'Error during executing SQL :: err - ' + err.stack);
                    d.reject(err);
                } else {
                    var responseToSend={
                        "paymentID":paymentID
                    };
                    d.resolve(responseToSend);
                }
            });
        }
    });
    return d.promise;
};
