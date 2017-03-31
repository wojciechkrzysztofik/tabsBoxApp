'use strict';

import TabComponent from '../TabComponent';
import VarnishLogReader from './VarnishLogReader';
import _ from 'underscore';

require('./assets/VarnishLogsTabComponent.less');

export default class VarnishLogsTabComponent extends TabComponent {

    constructor(key) {
        super();

        // Load log file, parse and return as Array
        let varnishLogReader = new VarnishLogReader();
        let logData = varnishLogReader.getLogsDataFromFile('./data/varnish.log');

        // get top five hosts with most traffic
        this.mostTrafficHostnames = this.getMostTrafficHostnames(logData, 5);

        // get top fice most reqested files
        this.mostReqestedFiles = this.getMostRequestedFiles(logData, 5);

        // render complete tab
        this.render(key);
    }

    /*
     * Return *number* of most traffic hostnames from logs array
     */
    getMostTrafficHostnames(logs, number) {
        let groupedByHostname = _.groupBy(logs, 'requested_hostname');
        let sortedByReqNumber = _.sortBy(groupedByHostname, function(request) {
            return request.length * -1;
        });
        let topTrafficHostsTmp = _.first(sortedByReqNumber, number);
        let topTrafficHosts = [];

        topTrafficHostsTmp.forEach(function(requestsArr) {
            topTrafficHosts.push({
                'requested_hostname': requestsArr[0].requested_hostname,
                'requests': requestsArr.length
            });
        });

        return topTrafficHosts;
    }

    getMostRequestedFiles(logs, number) {
        let groupedByRequestedFile = _.groupBy(logs, 'requested_file');
        let sortedByReqNumber = _.sortBy(groupedByRequestedFile, function(fileRequests) {
            return fileRequests.length * -1;
        });
        let topRequestedFilesTmp = _.first(sortedByReqNumber, number);
        let topRequestedFiles = [];

        topRequestedFilesTmp.forEach(function(requestsArr) {
            topRequestedFiles.push({
                'requested_file': requestsArr[0].requested_file,
                'requests': requestsArr.length
            });
        });

        return topRequestedFiles;
    }

    render(key) {
        let template = require('./views/VarnishLogsTabComponent.hbs');
        this.renderTab(template, key, {'mostTrafficHostnames': this.mostTrafficHostnames, 'mostReqestedFiles': this.mostReqestedFiles});
    }

};
