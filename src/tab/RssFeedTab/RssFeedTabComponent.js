import TabComponent from '../TabComponent';

export default class RssFeedTabComponent extends TabComponent {

    constructor() {
        super();
        console.log('rss feed tab created');
    }

    render() {
        let template = require('./RssFeedTabComponent.hbs');
        this.renderTab(template);
    }

};
