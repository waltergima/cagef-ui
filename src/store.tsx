import { action, observable } from 'mobx';

interface App {
    message: string
}



class AppStore {

    @observable message: App["message"] = 'hey';

    @action showMessage() {
        return this.message;
    };

    @action
    async getMessage() {
        let result = {}
        return result
    }

    @action
    async getAnotherMessage() {
        let result = {}
        return result
    }
}

export default new AppStore();