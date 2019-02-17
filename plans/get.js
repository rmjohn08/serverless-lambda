'use strict'

const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.getPlan = (event, context, callback) => {
    let paramId = '';

    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        if (event.queryStringParameters.id !== undefined && 
            event.queryStringParameters.id !== null && 
            event.queryStringParameters.id !== "") {
            console.log("Received id: " + event.queryStringParameters.id);
            paramId = event.queryStringParameters.id;
        }
    }
    
    if (event.pathParameters !== null && event.pathParameters !== undefined) {
        if (event.pathParameters.id !== undefined && 
            event.pathParameters.id !== null && 
            event.pathParameters.id !== "") {
            console.log("Received id: " + event.pathParameters.id);
            paramId = event.pathParameters.id;
        }
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: paramId,
        }
    };

    // fetch plan from database
    dynamoDB.get(params, (error, result) => {
        // handle errors 
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: {'Content-Type': 'text/plain'},
                body: 'Cannot get plan',
            });
            return;
        }
    
        //set the response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item)
        };
        callback(null, response);
    });
}