'use strict';

import TabComponent from '../TabComponent';
import VarnishLogReader from './VarnishLogReader';
import _ from 'underscore';

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
        let groupedByHost = _.groupBy(logs, 'remote_host');
        let sortedByReqNumber = _.sortBy(groupedByHost, function(hostRequests) {
            return hostRequests.length * -1;
        });
        let topTrafficHostsTmp = _.first(sortedByReqNumber, number);
        let topTrafficHosts = [];

        topTrafficHostsTmp.forEach(function(requestsArr) {
            topTrafficHosts.push({
                'host': requestsArr[0].remote_host,
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
