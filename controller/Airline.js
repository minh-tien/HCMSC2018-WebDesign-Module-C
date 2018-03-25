'use strict';
const DBAirline = require('../model/DBAirline');
const View = require('../view/View');

module.exports = class Airline {
    constructor(res, data) {
        this.res = res;
        this.data = data;
    }

    async createCompany() {
        try {
            for (var i in this.data.POST) {
                if (this.data.POST[i] instanceof Error) {
                    throw new Error('422');
                }
            }
            var { airline_name, city_name } = this.data.POST;
            var oDBAirline = new DBAirline({ airline_name, city_name });
            var res = await oDBAirline.createCompany();
            var oView = new View(200, this.res, { message: 'Create Success', id: res });
            oView.exec();
        } catch (error) {
            var oView = new View(422, this.res, null);
            oView.exec();
        }
    }

    async createFlight() {
        try {
            for (var i in this.data.POST) {
                if (this.data.POST[i] instanceof Error) {
                    throw new Error('422');
                }
            }
            var { from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price } = this.data.POST;
            var oDBAirline = new DBAirline({ from_date, to_date, flight_time, arrival_time, from_city_name, to_city_name, airline_id, price });
            var res = await oDBAirline.createFlight();
            var oView = new View(200, this.res, { message: 'Create Success', id: res });
            oView.exec();
        } catch (error) {
            var oView = new View(422, this.res, null);
            oView.exec();
        }
    }

    async getAirline() {
        try {
            for (var i in this.data.SEG) {
                if (this.data.SEG[i] instanceof Error) {
                    throw new Error('422');
                }
            }
            var { departureDate, departureCityName, destinationCityName } = this.data.SEG;
            var oDBAirline = new DBAirline({ departureDate, departureCityName, destinationCityName });
            var res = await oDBAirline.getAirline();
            var oView = new View(200, this.res, res);
            oView.exec();
        } catch (error) {
            var oView = new View(422, this.res, null);
            oView.exec();
        }
    }
}