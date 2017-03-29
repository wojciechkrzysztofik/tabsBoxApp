import VgRssFeedReader from './VgRssFeedReader';
import ArsTechnicaFeedReader from './ArsTechnicaFeedReader';
import TheRegisterFeedReader from './TheRegisterFeedReader';

export default RssFactory {

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
