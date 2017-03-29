import TabComponent from '../TabComponent';

export default class FlickrGalleryTabComponent extends TabComponent {

    constructor() {
        super();
        console.log('flickr gallery tab created');
    }

    render(tabKey) {
        let template = require('./views/FlickrGalleryTabComponent.hbs');
        this.renderTab(template, tabKey);
    }

};
