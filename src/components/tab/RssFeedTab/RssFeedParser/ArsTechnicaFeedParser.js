'use strict';

import _ from 'underscore';
import moment from 'Moment';

export default class ArsTechnicaRssFeedParser {

    getParsedRssData(document) {

        let items = document.getElementsByTagName("channel")[0].getElementsByTagName("item");

        let parsedRssData = _.map(items, function(item) {
            let itemData = {
                'title': item.childNodes[1].textContent,
                'link': item.childNodes[3].textContent,
                'date': moment(item.childNodes[5].textContent).format('LLL')
            }

            return itemData;
        })


        return parsedRssData;
    }

}
