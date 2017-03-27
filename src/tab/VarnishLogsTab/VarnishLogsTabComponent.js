import TabComponent from '../TabComponent';
import VarnishLogReader from './VarnishLogReader';

export default class VarnishLogsTabComponent extends TabComponent {

    constructor() {
        super();

        let varnishLogReader = new VarnishLogReader();
        this.logData = varnishLogReader.getParsedLogData('./data/varnish.log');

        console.log(this.logData);

    }

    render() {
        let template = require('./VarnishLogsTabComponent.hbs');
        this.renderTab(template);
    }

};
