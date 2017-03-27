import TabsBoxComponent from './tabsBox/tabsBoxComponent';

// set target
let tabsBoxWrapper = document.querySelector('#tabsBoxApp');

// define tab type and content
let tabs = [
    {
      'type': 'varnish',
      'path': '...'
    },
    {
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
        'type': 'flickr',
        'keyword': 'Kraków'
    }
];

// init tabBox component
let tabsBox = new TabsBoxComponent(tabs, tabsBoxWrapper);

// render component
tabsBox.render();
