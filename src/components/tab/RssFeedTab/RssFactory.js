import VgRssFeedReader from './RssFeedReader/VgRssFeedReader';
import ArsTechnicaFeedReader from './RssFeedReader/ArsTechnicaFeedReader';
import TheRegisterFeedReader from './RssFeedReader/TheRegisterFeedReader';

export default class RssFactory {

    createRssFeedReader(rssType) {
        if(rssType == null) {
            return null;
        }
        else if(rssType == 'vg') {
            return new VgRssFeedReader();
        }
        else if(rssType == 'arstechnica') {
            return new ArsTechnicaFeedReader();
        }
        else if(rssType == 'theregister') {
            return new TheRegisterFeedReader();
        }
    }

}
