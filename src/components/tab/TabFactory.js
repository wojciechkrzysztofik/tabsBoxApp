'use strict';

import VarnishLogsTabComponent from './VarnishLogsTab/VarnishLogsTabComponent';
import RssFeedTabComponent from './RssFeedTab/RssFeedTabComponent';
import FlickrGalleryTabComponent from './FlickrGalleryTab/FlickrGalleryTabComponent';

export default class TabFactory {

    /*
     * Create and return new tab object by defined tab tabType
     */
    createTab(tab) {
        if(tab.type == null) {
            return null;
        }
        else if(tab.type == 'varnish') {
            return new VarnishLogsTabComponent();
        }
        else if(tab.type == 'rss') {
            return new RssFeedTabComponent(tab.feeds);
        }
        else if(tab.type == 'flickr') {
            return new FlickrGalleryTabComponent();
        }
    }

}
