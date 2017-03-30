'use strict';

import TabComponent from '../TabComponent';
import moment from 'Moment';
import _ from 'underscore';

require('./assets/FlickrGalleryTabComponent.less');

export default class FlickrGalleryTabComponent extends TabComponent {

    constructor(keyword, api_key, key) {
        super();

        this.setTabKey(key);
        this.setKeyword(keyword);
        this.setApiKey(api_key);
        this.currentPage = 1;
        this.init();
    }

    init() {
        let keyword = this.getKeyword();
        let limit = 4;
        let sort = 'date-posted-desc';
        let maxTakenDate = moment().startOf('year').unix();
        let search = this.searchPhotos(keyword, sort, maxTakenDate, limit);

        search.then(function(result) {
            let flickrData = result.getElementsByTagName("photos")[0].getElementsByTagName('photo');
            this.totalPages = result.getElementsByTagName("photos")[0].getAttribute('total');

            let photos = _.map(flickrData, function(photo) {
                let photoPaths = this.createPhotoPaths(photo);

                return photoPaths;
            }.bind(this));

            // render complete tab
            let key = this.getTabKey();
            this.render(key, photos);

            this.currentPage += 1;

            this.addLoadMoreEventListener();

            //result.getElementsByTagName("photos")[0].getAttribute('total');

        }.bind(this));
    }

    /*
     * Return object with paths to thumb and original size of photo file
     */
    createPhotoPaths(photo) {
        let id = photo.getAttribute('id');
        let farm = photo.getAttribute('farm');
        let server = photo.getAttribute('server');
        let secret = photo.getAttribute('secret');
        let photoPaths = {
            'thumb': `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`,
            'original': `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`
        }

        return photoPaths;
    }

    /*
     * Add click event listener to *load more* button
     */
    addLoadMoreEventListener() {
        document.addEventListener("DOMContentLoaded", function(event) {
            let loadMoreBtn = document.querySelector('.js-load-more');

            loadMoreBtn.addEventListener('click', this.loadMorePhotos.bind(this));
        }.bind(this));
    }

    /*
     * Action executed after click on *load more* button
     */
    loadMorePhotos(e) {
        e.preventDefault();

        let keyword = this.getKeyword();
        let limit = 4;
        let sort = 'date-posted-desc';
        let maxTakenDate = moment().startOf('year').unix();
        let page = this.currentPage;

        let search = this.searchPhotos(keyword, sort, maxTakenDate, limit, page);
        search.then(function(result) {
            // parsujemy
            let flickrData = result.getElementsByTagName("photos")[0].getElementsByTagName('photo');
            _.each(flickrData, function(photo) {
                let photoPaths = this.createPhotoPaths(photo);

                this.injectNewPhoto(photoPaths);
            }.bind(this));

            this.currentPage += 1;

        }.bind(this));
    }

    injectNewPhoto(photoPaths) {
        let photoItemTemplate = require('./views/PhotoItem.hbs');
        let photoItem = photoItemTemplate(photoPaths);

        let photosContainer = document.querySelector('.js-photos-list');
        let newPhotoElement = document.createElement('li');
        newPhotoElement.className = 'photos-list__item';
        newPhotoElement.innerHTML = photoItem;
        photosContainer.appendChild(newPhotoElement);
    }

    /*
     *
     */
    searchPhotos(keyword, sort, maxTakenDate, limit, page = 1) {
        let apiKey = this.getApiKey();

        let apiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + apiKey + '&text=' + keyword + '&max_taken_date=' + maxTakenDate + '&sort=' + sort + '&per_page=' + limit + '&page=' + page;

        return new Promise((resolve, reject) => {
            let x = new XMLHttpRequest();
            x.open('GET', apiUrl, false);
            x.onreadystatechange = function () {
                if (x.readyState == 4 && x.status == 200) {
                    let results = x.responseXML;
                    resolve(results);
                } else {
                    reject(null);
                }
            };
            x.send(null);
        });
    }

    /*
     * *key* setter
     */
    setTabKey(key) {
        this.key = key;
    }

    /*
     * *key* getter
     */
    getTabKey() {
        return this.key;
    }

    /*
     * *keyword* setter
     */
    setKeyword(keyword) {
        this.keyword = keyword;
    }

    /*
     * *keyword* getter
     */
    getKeyword() {
        return this.keyword;
    }

    /*
     * *apiKey* setter
     */
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    /*
     * *apiKey* getter
     */
    getApiKey() {
        return this.apiKey;
    }

    render(tabKey, photos) {
        let template = require('./views/FlickrGalleryTabComponent.hbs');
        this.renderTab(template, tabKey, {'photos': photos});
    }

};
