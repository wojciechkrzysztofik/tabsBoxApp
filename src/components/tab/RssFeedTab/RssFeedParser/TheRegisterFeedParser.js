'use strict';

import _ from 'underscore';
import moment from 'Moment';

export default class ArsTechnicaFeedParser {

    getParsedRssData(document) {

        let items = document.getElementsByTagName('feed')[0].getElementsByTagName('entry');

        let parsedRssData = _.map(items, function(item) {
            let itemData = {
               'title': item.childNodes[9].textContent,
               'link': item.childNodes[7].textContent,
               'date': moment(item.childNodes[3].textContent).format('LLL')
            }

            return itemData;
        })


        return parsedRssData;
    }

}
