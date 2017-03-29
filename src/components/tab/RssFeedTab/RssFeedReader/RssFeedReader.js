export default class RssFeedReader {

    constructor() {
        // I had to write simple proxy (it is written in PHP) to read rss from your servers.
        // It was not possible to fetch data directly from rss domains because of CORS.
        // As far as I know it is the only one solution which doesn't need any modifications on server side.
        this.proxyUrl = 'http://appslabs.pl/proxy.php?url=';
    }

    /*
     * Read rss/xml data from *url*
     */
    fetchRssDataFromUrl(url) {
        let x = new XMLHttpRequest();
        let rssData;

        x.open("GET", this.proxyUrl + url, false);
        x.onreadystatechange = function () {
            if (x.readyState == 4 && x.status == 200) {
                rssData = x.responseXML;
            }
        }.bind(this);
        x.send(null);

        return rssData;
    }

}
