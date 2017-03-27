import TabFactory from '../tab/TabFactory';
import Handlebars from 'handlebars-template-loader/runtime';
import Layouts from 'handlebars-layouts';

export default class TabsBoxComponent {

    constructor(tabs, target) {
        this.tabs = tabs;
        this.target = target;

        this.init();
    }

    init() {
        let tab;
        let tabFactory = new TabFactory();

        this.tabs.forEach(function(tab) {
            tab = tabFactory.createTab(tab.type);
            tab.render();
        });
    }

    // setLayoutTemplate() {
    //     Layouts.register(Handlebars);
    //
    //     let tabsBoxLayout = require('./layout.hbs');
    //     Handlebars.registerPartial('layout', tabsBoxLayout);
    // }

    render() {
        let appContainer = document.querySelector('#tabsBoxApp');
        let template = require('./TabsBoxComponent.hbs');
        appContainer.innerHTML = template();
    }

}
