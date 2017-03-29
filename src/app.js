import TabsBoxComponent from './components/tabsBox/tabsBoxComponent';

// set target
let tabsBoxWrapper = document.querySelector('#tabsBoxApp');

// define tab type and content
let tabs = [
    {
        'title': 'Varnish Log',
        'type': 'varnish',
        'path': '...'
    },
    {
        'title': 'RSS Feeds',
        'type': 'rss',
        'feeds': [
            {
                'type': 'vg',
                'url': ''
            },
            {
                'type': 'arstechnica',
                'url': ''
            },
            {
                'type': 'theregister',
                'url': ''
            }
        ]
    },
    {
        'title': 'Flickr Gallery',
        'type': 'flickr',
        'keyword': 'Kraków'
    }
];

// init tabBox component
let tabsBox = new TabsBoxComponent(tabs, tabsBoxWrapper);

// render component
tabsBox.render();
