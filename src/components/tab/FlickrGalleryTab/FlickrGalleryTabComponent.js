'use strict';

import TabComponent from '../TabComponent';
import FlickrSearch from './FlickrSearch';
import moment from 'Moment';
import _ from 'underscore';

require('./assets/FlickrGalleryTabComponent.less');

export default class FlickrGalleryTabComponent extends TabComponent {

    constructor(keyword, api_key, photos_per_page, key) {
        super();

        // tab key (id used for navigation)
        this.key = key;

        this.initSearch(api_key, photos_per_page, keyword);
        this.loadFirstPageOfPhotos();
    }

    /*
     * Initialize Flickr Search
     */
    initSearch(api_key, photos_per_page, keyword) {
        // keyword for flickr search
        this.keyword = keyword;
        // sort order
        this.sort = 'date-posted-desc';
        // max taken date for search - begining of current year
        this.maxTakenDate = moment().startOf('year').unix();
        // current page of displayed results (photos)
        this.currentPage = 1;
        // number of total available pages with results
        this.totalPages;

        this.flickrSearch = new FlickrSearch(api_key, photos_per_page);
    }

    /*
     * Load first page of photos from Flickr
     */
    loadFirstPageOfPhotos() {
        let search = this.flickrSearch.searchPhotos(this.keyword, this.sort, this.maxTakenDate, this.photosPerPage);

        search.then(function(result) {
            this.flickrSearch.totalPages = this.flickrSearch.getTotalPages(result);
            let flickrData = this.flickrSearch.getPhotoElements(result);

            let photos = _.map(flickrData, function(photo) {
                let photoPath = this.getPhotoPath(photo);

                return photoPath;
            }.bind(this));

            // render complete tab
            this.render(this.key, photos);

            // increment current page number if it's lower than totalPages
            this.incrementCurrentPage(this.flickrSearch.totalPages);

        }.bind(this));
    }

    /*
     * Get path to photo - mobile or desktop version
     */
    getPhotoPath(photo) {
        let id = photo.getAttribute('id');
        let farm = photo.getAttribute('farm');
        let server = photo.getAttribute('server');
        let secret = photo.getAttribute('secret');

        let windowWidth = window.innerWidth;
        let photoPath;
        if(windowWidth > 768) {
            photoPath = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_b.jpg`;
        } else {
            photoPath = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
        }

        return photoPath;
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

        let search = this.flickrSearch.searchPhotos(this.keyword, this.sort, this.maxTakenDate, this.currentPage);

        search.then(function(result) {

            let flickrData = this.flickrSearch.getPhotoElements(result);
            _.each(flickrData, function(photo) {
                let photoPath = this.getPhotoPath(photo);

                this.appendPhotoToGallery(photoPath);
            }.bind(this));

            this.currentPage += 1;

        }.bind(this));
    }

    /*
     * Add new photo element to existing gallery
     */
    appendPhotoToGallery(photoPath) {
        let photoItemTemplate = require('./views/PhotoItem.hbs');
        let photoItem = photoItemTemplate({'photoPath': photoPath});

        let photosContainer = document.querySelector('.js-photos-list');
        let newPhotoElement = document.createElement('li');
        newPhotoElement.className = 'photos-list__item';
        newPhotoElement.innerHTML = photoItem;
        photosContainer.appendChild(newPhotoElement);
    }

    /*
     * Increment current page number
     */
    incrementCurrentPage(totalPages) {
        if(this.currentPage < totalPages) {
            this.currentPage += 1;
            document.addEventListener("DOMContentLoaded", this.makeLoadMoreBtnVisible);
        } else {
            document.addEventListener("DOMContentLoaded", this.makeLoadMoreBtnHidden);
        }
    }

    /*
     * Add class *visible* to *load more* button
     */
    makeLoadMoreBtnVisible() {
        let loadMoreBtn = document.querySelector('.js-load-more');
        if(!loadMoreBtn.classList.contains('visible')) {
            loadMoreBtn.classList.add('visible');
            //loadMoreBtn.classList.remove('hidden');
        }
    }

    /*
     * Remove class *visible* from *load more* button
     */
    makeLoadMoreBtnHidden() {
        let loadMoreBtn = document.querySelector('.js-load-more');
        if(loadMoreBtn.classList.contains('visible')) {
            loadMoreBtn.classList.remove('visible');
            //loadMoreBtn.classList.add('hidden');
        }
    }

    /*
     * Render completed tab with photo gallery
     */
    render(tabKey, photos) {
        let template = require('./views/FlickrGalleryTabComponent.hbs');
        this.renderTab(template, tabKey, {'photos': photos});

        this.addLoadMoreEventListener();
    }

};
