'use strict';

import TabFactory from '../tab/TabFactory';
import NavigationComponent from '../navigation/NavigationComponent';
import Handlebars from 'handlebars-template-loader/runtime';//@TODO

require('./TabBoxComponent.less');

export default class TabsBoxComponent {

    constructor(tabs, target) {
        // tabs configuration
        this.tabs = tabs;
        // component will be displayed in this element
        this.target = target;

        this.navigation = new NavigationComponent(tabs);

        this.init();
    }

    /*
     * Initialize tabsBox component
     */
    init() {
        let tab;
        let tabFactory = new TabFactory();

        // create tabs
        this.tabs.forEach(function(tab, key) {
            tab = tabFactory.createTab(tab, key);
            //tab.render(tabKey);
        });

        // register partial with tabs navigation
        this.registerNavigationPartial();
    }

    registerNavigationPartial() {
    }

    /*
     * Render handlebars template for tabsBox component
     */
    render() {
        let appContainer = document.querySelector('#tabsBoxApp');
        let template = require('./views/TabsBoxComponent.hbs');
        let navigationLinks = this.navigation.getNavigationLinks();

        appContainer.innerHTML = template({'links': navigationLinks});

        this.navigation.addNavigationClickActions();

    }

}
