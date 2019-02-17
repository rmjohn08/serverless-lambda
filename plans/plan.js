'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.new = (event, context, callback) => {
    const timestamp = new Date().getTime();
    let str = JSON.stringify(event);
    console.log(str);
    //JSON.stringify(event)
    const data = JSON.parse(str);
    
    /*
    if (typeof data.text !== 'string') {
        console.error ('Validation failed, did not get expected parameters ');
        callback (null, {
            statusCode: 400,
            headers: {'Content-Type': 'text/plain'},
            body: 'Cannot create new plan',
        });
        return;
    }*/

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            planName: event.planName,
            description: event.description,
            enabled: event.enabled,
            benefits: event.benefits,
            createdAt: timestamp,
            updatedAt: timestamp,

        },
    };

    // write plan to the db
    dynamoDB.put(params, (error) => {
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers:{'Content-Type':'text/plain'},
                body: 'Cannot create new plan ',

            });
            return;
        }

        // create a reponse
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);

    });
};
