'use strict';
const Auth = require('../controller/Auth');
const Airline = require('../controller/Airline');

module.exports = class Routes {
    constructor() {
        this.routes = {
            '/v1/auth/login': {
                method: 'POST',
                controller: [Auth, 'login'],
                paramSegment: [],
                paramGET: [],
                paramPOST: [
                    'username:STRING',
                    'password:STRING'
                ],
                auth: []
            },
            '/v1/auth/logout': {
                method: 'GET',
                controller: [Auth, 'logout'],
                paramSegment: [],
                paramGET: ['token:STRING'],
                paramPOST: [],
                auth: ['user', 'admin']
            },
            '/v1/airline': {
                method: 'POST',
                controller: [Airline, 'createCompany'],
                paramSegment: [],
                paramGET: ['token:STRING'],
                paramPOST: [
                    'airline_name:STRING',
                    'city_name:STRING'
                ],
                auth: ['admin']
            },
            '/v1/flight': {
                method: 'POST',
                controller: [Airline, 'createFlight'],
                paramSegment: [],
                paramGET: ['token:STRING'],
                paramPOST: [
                    'from_date:DATE',
                    'to_date:DATE',
                    'flight_time:STRING',
                    'arrival_time:STRING',
                    'from_city_name:STRING',
                    'to_city_name:STRING',
                    'airline_id:INT',
                    'price:INT'
                ],
                auth: ['admin']
            },
            '/v1/flight/{departureDate}/{departureCityName}/{destinationCityName}': {
                method: 'GET',
                controller: [Airline, 'getAirline'],
                paramSegment: [
                    'departureDate:DATE',
                    'departureCityName:STRING',
                    'destinationCityName:STRING'
                ],
                paramGET: ['token:STRING'],
                paramPOST: [],
                auth: ['user', 'admin']
            }
        }
    }
}