'use strict';

export default class TabComponent {

    /*
     * Render handlebars template with some data if it is defined
     */
    renderTab(template, tabKey, data = null) {
        document.addEventListener("DOMContentLoaded", function(event) {
            let tabsContainer = document.querySelector('.js-tabs-list');
            let newTabElement = this.createNewTabElement(tabKey, template, data);
            tabsContainer.appendChild(newTabElement);
        }.bind(this));
    }

    /*
     * Create new tab element
     */
     createNewTabElement(tabKey, template, data) {
         let newTabElement = document.createElement('div');
         newTabElement.dataset.tabId = tabKey;
         newTabElement.className = this.setClassName(tabKey);
         newTabElement.innerHTML = template(data);

         return newTabElement;
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
