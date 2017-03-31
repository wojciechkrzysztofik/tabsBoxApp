'use strict';

export default class VarnishLogReader {

    /*
     * Load and return raw text data from varnish log file
     */
    getRawLogFromFile(logFilePath){
        let rawLogData = null;
        let xr = new XMLHttpRequest();

        xr.open('GET', logFilePath, false);
        xr.onreadystatechange = function() {
            if(xr.readyState === 4) {
                if(xr.status === 200 || xr.status == 0) {
                    rawLogData = xr.responseText;
                }
            }
        };
        xr.send(null);

        return rawLogData;
    }

    /*
     * Parse raw log text data and return it as array of logs
     */
    getParsedLogData(rawLogData) {
        let logs = this.splitToRows(rawLogData);
        let parsedLogData = [];

        logs.forEach(function(log) {
            let singleRowArr = this.splitToCols(log);
            let singleRow;

            // We assume that varnish log file uses defalt format:
            // %h %l %u %t "%r" %s %b "%{Referer}i" "%{User-agent}i"
            if(singleRowArr !== null) {
                let requestedUrl = this.getRequestedUrl(singleRowArr[4])
                let requestedFile = this.getRequestedFile(requestedUrl);
                let requestedHostname = this.getHostnameFromUrl(requestedUrl);

                let singleRow  = {
                    'remote_host': singleRowArr[0],
                    'remote_logname': singleRowArr[1],
                    'remote_user': singleRowArr[2],
                    'recieve_date': singleRowArr[3],
                    'request': singleRowArr[4],
                    'requested_file': requestedFile,
                    'requested_hostname': requestedHostname,
                    'status': singleRowArr[5],
                    'referer': singleRowArr[6],
                    'user_agent': singleRowArr[7],
                }

                parsedLogData.push(singleRow);
            }

        }.bind(this));

        return parsedLogData;
    }

    /*
     * Return path to requested file without http/https protocol
     */
    getRequestedFile(requestString) {
        let requestedFile = requestString.replace(/^(http(s)?:\/\/?)/, '');

        return requestedFile;
    }

    /*
     * Return requested url
     */
    getRequestedUrl(reqestString) {
        // data contains: request method, requested path, protocl info
        let data = reqestString.split(' ');

        return data[1];
    }

    /*
     * Split logs in text format (raw data form file) into rows (lines)
     */
    splitToRows(text) {
        let rows = text.split('\n');

        return rows;
    }

    /*
     * Split single log row into columns with separated values
     */
    splitToCols(row) {
        let cols = row.match(/(".*?"|\[(.*?)\]|[^"\s]+)+(?=\s*|\s*$)/g);

        return cols;
    }

    getHostnameFromUrl(url) {
        let hostname = url.toString().replace(/^(.*\/\/[^\/?#]*).*$/,"$1").replace(/^(http(s)?:\/\/?)/, '');

        return hostname;
    }

    /*
     * Load logs file, parse it and return as Array
     */
    getLogsDataFromFile(logFilePath) {
        let logData = null;

        let rawLogData = this.getRawLogFromFile(logFilePath);
        logData = this.getParsedLogData(rawLogData);

        return logData;
    }

}
