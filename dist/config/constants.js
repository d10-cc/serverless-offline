"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVER_SHUTDOWN_TIMEOUT = exports.DEFAULT_WEBSOCKETS_ROUTE = exports.DEFAULT_WEBSOCKETS_API_ROUTE_SELECTION_EXPRESSION = exports.DEFAULT_LAMBDA_TIMEOUT = exports.DEFAULT_LAMBDA_RUNTIME = exports.DEFAULT_LAMBDA_MEMORY_SIZE = exports.DEFAULT_DOCKER_CONTAINER_PORT = exports.CUSTOM_OPTION = exports.BASE_URL_PLACEHOLDER = void 0;
// dummy placeholder url for the WHATWG URL constructor
// https://github.com/nodejs/node/issues/12682
const BASE_URL_PLACEHOLDER = 'http://example';
exports.BASE_URL_PLACEHOLDER = BASE_URL_PLACEHOLDER;
const CUSTOM_OPTION = 'serverless-offline';
exports.CUSTOM_OPTION = CUSTOM_OPTION;
const DEFAULT_LAMBDA_RUNTIME = 'nodejs12.x'; // https://docs.aws.amazon.com/lambda/latest/dg/limits.html

exports.DEFAULT_LAMBDA_RUNTIME = DEFAULT_LAMBDA_RUNTIME;
const DEFAULT_LAMBDA_MEMORY_SIZE = 1024; // default function timeout in seconds

exports.DEFAULT_LAMBDA_MEMORY_SIZE = DEFAULT_LAMBDA_MEMORY_SIZE;
const DEFAULT_LAMBDA_TIMEOUT = 900; // 15 min
// timeout for all connections to be closed

exports.DEFAULT_LAMBDA_TIMEOUT = DEFAULT_LAMBDA_TIMEOUT;
const SERVER_SHUTDOWN_TIMEOUT = 5000;
exports.SERVER_SHUTDOWN_TIMEOUT = SERVER_SHUTDOWN_TIMEOUT;
const DEFAULT_WEBSOCKETS_API_ROUTE_SELECTION_EXPRESSION = '$request.body.action';
exports.DEFAULT_WEBSOCKETS_API_ROUTE_SELECTION_EXPRESSION = DEFAULT_WEBSOCKETS_API_ROUTE_SELECTION_EXPRESSION;
const DEFAULT_WEBSOCKETS_ROUTE = '$default';
exports.DEFAULT_WEBSOCKETS_ROUTE = DEFAULT_WEBSOCKETS_ROUTE;
const DEFAULT_DOCKER_CONTAINER_PORT = 9001;
exports.DEFAULT_DOCKER_CONTAINER_PORT = DEFAULT_DOCKER_CONTAINER_PORT;