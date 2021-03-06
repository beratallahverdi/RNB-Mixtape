const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * Demonstrates a simple HTTP endpoint using API Gateway. You have full
 * access to the request and response payload, including headers and
 * status code.
 *
 * To scan a DynamoDB table, make a GET request with the TableName as a
 * query string parameter. To put, update, or delete an item, make a POST,
 * PUT, or DELETE request respectively, passing in the payload to the
 * DynamoDB API as a JSON body.
 */
exports.handler = async (event, context) => {
	const tableName = 'rb_users';
	let body;
	let statusCode = '200';
	const headers = {
		'Content-Type': 'application/json',
	};
	let userJson = JSON.parse(Buffer.from(event.body, 'base64').toString());
	try {
		switch (event.httpMethod) {
			case 'DELETE':
				body = await dynamo
					.delete({
						Key: { _id: userJson['_id'] },
						TableName: tableName,
					})
					.promise();
				break;
			case 'GET':
				if (userJson['_id'] != null) {
					body = await dynamo
						.get({
							Key: { _id: userJson['_id'] },
							TableName: tableName,
						})
						.promise();
				} else {
					body = await dynamo
						.scan({ TableName: tableName })
						.promise();
				}
				break;
			case 'POST':
				body = await dynamo
					.put({ Item: { ...userJson }, TableName: tableName })
					.promise();
				break;
			case 'PUT':
				body = await dynamo
					.put({ Item: { ...userJson }, TableName: tableName })
					.promise();
				break;
			default:
				throw new Error(`Unsupported method "${event.httpMethod}"`);
		}
	} catch (err) {
		statusCode = '400';
		body = err.message;
	} finally {
		body = JSON.stringify(body);
	}

	return {
		statusCode,
		body,
		headers,
	};
};
