'use strict';

import Handlebars from 'handlebars-template-loader/runtime';

require('./assets/NavigationComponent.less');

export default class NavigationComponent {

    constructor(tabs) {
        this.tabs = tabs;
    }

    /*
     * Get array with link titles for navigation
     */
    getNavigationLinks() {
        let navigationLinks = [];

        this.tabs.forEach(function(tab) {
            navigationLinks.push(tab.title);
        });

        return navigationLinks;
    }

    /*
     * Add click listeners to items in navigation
     */
    addNavigationClickActions() {
        let navigationLinks = document.querySelectorAll('.js-navigation-link');

        navigationLinks.forEach(function(navigationLink) {
            navigationLink.addEventListener('click', this.navLinkClickAction);
        }.bind(this));
    }

    /*
     * This is what happen when somebody clicks on navigation item
     */
    navLinkClickAction(e) {
        e.preventDefault();

        // hide active tab
        let activeTab = document.querySelector('.js-tabs-list .tab.visible');
        activeTab.classList.remove('visible');
        activeTab.classList.add('hidden');

        // // set new active tab
        let selectedTabId = this.dataset.tabId;
        let selectedTab = document.querySelector('.tab[data-tab-id="' + selectedTabId + '"]');
        selectedTab.classList.add('visible');
        selectedTab.classList.remove('hidden');
    }

}
