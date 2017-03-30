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
                'url': 'http://www.vg.no/rss/feed/?categories=1068,1069,1070&keywords=&limit=25&format=rss'
            },
            {
                'type': 'arstechnica',
                'url': 'http://feeds.arstechnica.com/arstechnica/index?format=xml'
            },
            {
                'type': 'theregister',
                'url': 'http://www.theregister.co.uk/headlines.atom'
            }
        ]
    },
    {
        'title': 'Flickr Gallery',
        'type': 'flickr',
        'keyword': 'muaythai',//'Kraków',
        'api_key': 'a668c9f958e3aac79be62524f51687da',
        //'secret': 'd25ab1d51025d73b'
    }
];

// init tabBox component
let tabsBox = new TabsBoxComponent(tabs, tabsBoxWrapper);

// render component
tabsBox.render();
