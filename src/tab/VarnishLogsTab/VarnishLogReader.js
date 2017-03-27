export default class VarnishLogReader {

    constructor() {

    }

    loadLogFile(logFilePath){
        let logFile = new XMLHttpRequest();
        //let logFilePath = './data/varnish.log';
        logFile.open('GET', logFilePath, false);

        logFile.onreadystatechange = function() {
            if(logFile.readyState === 4) {
                // if log file is loaded
                if(logFile.status === 200 || logFile.status == 0) {
                    this.rawLogData = logFile.responseText;
                }
                // if cannot read log file
                else {
                    return false;
                }
            }
        }.bind(this);
        logFile.send(null);

        return true;
    }

    parseLogFile() {
        let logs = this.rawLogData.split('\n');
        let parsedLogData = [];

        logs.forEach(function(log) {
             let singleRow  = log.match(/(".*?"|\[(.*?)\]|[^"\s]+)+(?=\s*|\s*$)/g);
             parsedLogData.push(singleRow);
        });

        this.parsedLogData = parsedLogData;
    }

    getParsedLogData(logFilePath) {
        let _self = this;
        let logFileOperations = new Promise((resolve, reject) => {
            if(this.loadLogFile(logFilePath)) {
                resolve();
            }
        });

        logFileOperations.then(() => {
            this.parseLogFile().bind(_self);
        });

        console.log('vlr: ' + this);

        return this.parsedLogData;
    }

}
