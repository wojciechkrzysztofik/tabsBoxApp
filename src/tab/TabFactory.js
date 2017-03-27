import VarnishLogsTabComponent from './VarnishLogsTab/VarnishLogsTabComponent';
import RssFeedTabComponent from './RssFeedTab/RssFeedTabComponent';
import FlickrGalleryTabComponent from './FlickrGalleryTab/FlickrGalleryTabComponent';

export default class TabFactory {

    createTab(tabType) {
        if(tabType == null) {
            return null;
        }
        else if(tabType == 'varnish') {
            return new VarnishLogsTabComponent();
        }
        else if(tabType == 'rss') {
            return new RssFeedTabComponent();
        }
        else if(tabType == 'flickr') {
            return new FlickrGalleryTabComponent();
        }
    }

}
