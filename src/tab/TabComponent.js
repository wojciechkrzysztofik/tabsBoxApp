export default class TabComponent {

    constructor() {
        //console.log('tab created');
    }

    renderTab(template) {
        document.addEventListener("DOMContentLoaded", function(event) {
            let tabsContainer = document.querySelector('.tabs-list');

            // create container for new tab
            let newTabContainer = document.createElement('div');

            // add new tab to tabs container
            tabsContainer.appendChild(newTabContainer);

            // render template
            newTabContainer.innerHTML = template();

        });
    }

};
