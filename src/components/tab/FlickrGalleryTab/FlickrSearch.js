'use strict';

export default class FlickrSearch {

    constructor(apiKey, photosPerPage) {
        // Flickr API Key
        this.apiKey = apiKey;
        // number of photos displayed on the page
        this.photosPerPage = photosPerPage;;
    }

    /*
     * Search photos using defined parameters (Request to Flickr API)
     */
    searchPhotos(keyword, sort, maxTakenDate, page = 1) {
        let apiBaseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search';
        let apiParams = `&api_key=${this.apiKey}&text=${keyword}&max_taken_date=${maxTakenDate}&sort=${sort}&per_page=${this.photosPerPage}&page=${page}`;
        let apiUrl = apiBaseUrl + apiParams;

        return new Promise((resolve, reject) => {
            let xr = new XMLHttpRequest();
            xr.open('GET', apiUrl, false);
            xr.onreadystatechange = function () {
                if (xr.readyState == 4 && xr.status == 200) {
                    let results = xr.responseXML;
                    resolve(results);
                } else {
                    reject(null);
                }
            };
            xr.send(null);
        });
    }

    /*
     * Return photo elements from flickr search results
     */
    getPhotoElements(resultsDoc) {
        let photoElements = resultsDoc.getElementsByTagName("photos")[0].getElementsByTagName('photo');

        return photoElements;
    }

    /*
     * Return total pages number from flickr search results
     */
    getTotalPages(resultsDoc) {
        let totalPages = resultsDoc.getElementsByTagName("photos")[0].getAttribute('total');

        return totalPages;
    }

}
