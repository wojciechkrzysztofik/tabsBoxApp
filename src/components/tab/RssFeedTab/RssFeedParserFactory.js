import VgRssFeedParser from './RssFeedParser/VgRssFeedParser';
import ArsTechnicaFeedParser from './RssFeedParser/ArsTechnicaFeedParser';
import TheRegisterFeedParser from './RssFeedParser/TheRegisterFeedParser';

export default class RssFeedParserFactory {

    createParser(type) {
        if(type == null) {
            return null;
        }
        else if(type == 'vg') {
            return new VgRssFeedParser();
        }
        else if(type == 'arstechnica') {
            return new ArsTechnicaFeedParser();
        }
        else if(type == 'theregister') {
            return new TheRegisterFeedParser();
        }
    }

}
