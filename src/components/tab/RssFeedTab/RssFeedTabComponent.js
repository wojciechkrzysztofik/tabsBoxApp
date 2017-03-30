import TabComponent from '../TabComponent';
import RssFeedParserFactory from './RssFeedParserFactory';
import RssFeedReader from './RssFeedReader';
import _ from 'underscore';

export default class RssFeedTabComponent extends TabComponent {

    constructor(feeds, key) {
        super();

        this.setFeeds(feeds);
        this.setTabKey(key);
        this.createEntriesContainer();
        this.init();
    }

    init() {
        let _self = this;
        let rssReader = new RssFeedReader();
        let feedUrls = this.getFeedsUrls(this.feeds);

        // read rss data from external urls
        let feedPromises = this.feeds.map(rssReader.fetchRssData.bind(rssReader));

        Promise.all(feedPromises)
            // put all data from all feeds into one place
            .then(function(results) {
                let rssData = results.map(function(entry) {
                    return entry;
                })
                _self.rssRawData = rssData;
            })
            // parse xml documents and save only neccessary data
            .then(function() {
                let rssFeedParserFactory = new RssFeedParserFactory();
                _self.rssRawData.forEach(function(feed) {
                    let rssParser = rssFeedParserFactory.createParser(feed.type);
                    let parsedRssFeed = rssParser.getParsedRssData(feed.document);

                    _self.rssParsedData = _self.rssParsedData.concat(parsedRssFeed);;
                });
            })
            // sort entries(post) by date (desc)
            .then(function() {
                let entries = _self.rssParsedData;
                _self.sortedEntries = _self.sortEntriesByDate(entries);
            })
            // render tab
            .then(function() {
                let entries = _self.sortedEntries;
                let tabKey = _self.key;

                _self.render(tabKey, entries);
            });
    }

    setFeeds(feeds) {
        this.feeds = feeds;
    }

    createEntriesContainer() {
        this.rssParsedData = [];
    }

    setTabKey(key) {
        this.key = key;
    }

    sortEntriesByDate(entries) {
        let sortedEntries = _.sortBy(entries, function(entry) {
            return entry.date * -1;
        });

        return sortedEntries;
    }

    getFeedsUrls(feeds) {
        let urls = feeds.map(function(feed) {
            return feed.url;
        })

        return urls;
    }

    render(tabKey, entries) {
        let template = require('./views/RssFeedTabComponent.hbs');
        this.renderTab(template, tabKey, {'entries': entries});
    }

};
