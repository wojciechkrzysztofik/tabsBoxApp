'use strict';

export default class TabComponent {

    /*
     * Render handlebars template with some data if it is defined
     */
    renderTab(template, tabKey, data = null) {
        document.addEventListener("DOMContentLoaded", function(event) {
            let tabsContainer = document.querySelector('.tabs-list');

            // create container for new tab
            let newTabContainer = document.createElement('div');
            newTabContainer.dataset.tabId = tabKey;
            newTabContainer.className = this.setClassName(tabKey);

            // add new tab to tabs container
            tabsContainer.appendChild(newTabContainer);

            // render template
            newTabContainer.innerHTML = template(data);
        }.bind(this));
    }

    /*
     * Set class name for tab - visible/hidden
     */
    setClassName(tabKey) {
        if(tabKey == 0) {
            return 'tab visible';
        } else {
            return 'tab hidden';
        }
    }

};
