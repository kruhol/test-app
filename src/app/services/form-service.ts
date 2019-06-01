import * as angular from 'angular';
import {IHttpService, IModule} from 'angular';

class FormsService {
    public static $inject: string[] = ['$http'];

    constructor(private $http: IHttpService) {
    }

    public async getForms() {
        const rates = await this.$http.get('/availableforms.json');

        return rates.data;
    }
}

const ServicesModule: IModule = angular
    .module('services', [])
    .service('FormService', FormsService);

export default ServicesModule;