/*global describe:false, it:false, before:false, after:false*/

'use strict';

var kraken = require('kraken-js'),
    express = require('express'),
    expect = require('chai').expect,
    httpStatus = require('http-status'),
    supertest = require('supertest');

var os = require('os');
var _ = require('lodash');

// This gets the ip of the server that will execute this integration test
/*
 var ip = _.chain(os.networkInterfaces())
 .values()
 .flatten()
 .filter(function (val) {
 return (val.family === 'IPv4' && val.internal === false);
 })
 .pluck('address')
 .first()
 .value();
 */

var ip = '127.0.0.1';
var api = supertest('http://' + ip + ':8001');

describe('payment API', function () {

    describe('Process the payment Detail through /payment endpoint', function () {

        it('should return HTTP status 201 (Created) ', function (done) {
            var request = {
			  "orderID": 10,
			  "postingAmount": 100,
			  "userName": "TestKumar"
			};

            api.post('/payment')
                .set('Content-type', 'application/json')
                .set('Authorization', 'Basic T0NUZXN0aW5nOlByb3RlY3QkMQ==')
                .send(request)
                .end(function (err, res) {
                    expect(httpStatus.CREATED).to.equal(res.statusCode);
                    done(err);
                });
        });

        

    });
	
	describe('cancel the payment through /payment/cancel/paymentID endpoint', function () {

        it('should return HTTP status 201 (Created) ', function (done) {
            var request = {
			  "cancelReason": "Wrongly Credited"
			};

            api.post('/payment/10')
                .set('Content-type', 'application/json')
                .set('Authorization', 'Basic T0NUZXN0aW5nOlByb3RlY3QkMQ==')
                .send(request)
                .end(function (err, res) {
                    expect(httpStatus.CREATED).to.equal(res.statusCode);
                    done(err);
                });
        });

        

    });
	
	
	
});
