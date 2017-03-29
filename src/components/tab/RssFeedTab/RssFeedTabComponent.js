import TabComponent from '../TabComponent';

export default class RssFeedTabComponent extends TabComponent {

    constructor() {
        super();
        console.log('rss feed tab created');

        var x = new XMLHttpRequest();
        //x.open("GET", "https://www.vg.no/rss/feed/?categories=1068,1069,1070&keywords=&limit=25&format=rss", true);
        //x.open("GET", "http://feeds.arstechnica.com/arstechnica/index?format=xml", true);
        x.open("GET", "http://appslabs.pl/proxy.php", true);
        x.onreadystatechange = function () {
          if (x.readyState == 4 && x.status == 200)
          {
            var doc = x.responseXML;
            // …
        console.log(x);
          }
        };
        x.send(null);
    }

    render(tabKey) {
        let template = require('./views/RssFeedTabComponent.hbs');
        this.renderTab(template, tabKey);
    }

};
