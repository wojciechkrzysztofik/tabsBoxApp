import TabComponent from '../TabComponent';
import RssFactory from './RssFactory';

export default class RssFeedTabComponent extends TabComponent {

    constructor(feeds) {
        super();
        console.log('rss feed tab created');

        this.feeds = feeds;

        this.init();
    }

    init() {
        let rssReader = null;
        let rssFactory = new RssFactory();

        // create rss readers
        this.feeds.forEach(function(feed) {
            rssReader = rssFactory.createRssFeedReader(feed.type);
            let rssData = rssReader.fetchRssDataFromUrl(feed.url);
            let parsedRssData = rssReader.parseRssData(rssData);
            console.log(parsedRssData);
        });
    }

    render(tabKey) {
        let template = require('./views/RssFeedTabComponent.hbs');
        this.renderTab(template, tabKey);
    }

};
