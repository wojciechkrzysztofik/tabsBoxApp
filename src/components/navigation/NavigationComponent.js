
'use strict';

import Handlebars from 'handlebars-template-loader/runtime';

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
        let navigationLinks = document.querySelectorAll('.navigation__item');

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
        //this.hideActiveTab();
        let activeTab = document.querySelector('.tabs-list .visible');
        activeTab.className = 'tab hidden';

        // set new active tab
        let selectedTabId = this.dataset.tabId;
        //this.showSelectedTab(selectedTabId);
        let selectedTab = document.querySelector('.tab[data-tab-id="' + selectedTabId + '"]');
        selectedTab.className = 'tab visible';
    }

    hideActiveTab() {
        let activeTab = document.querySelector('.tabs-list .visible');
        activeTab.className = 'tab hidden';
    }

    showSelectedTab(id) {
        let selectedTab = document.querySelector('.tab[data-tab-id="' + id + '"]');
        selectedTab.className = 'tab visible';
    }

}
