import { action, computed, observable } from "mobx";
import { showErrorMessage } from "../../../config/Messages";
import { ORIGINAL_FORM_TEMPLATE } from '../constants';
import { login } from "../services";
import { transformUser } from "../transformer";
import { LoginRequest } from "../types";
import JWT from 'jsonwebtoken';

export class LoginStore {
    @observable formState: any = {};
    @observable redirect = false;
    @observable widthScreen = 0;
    @observable loadList: boolean = false;
    @observable loadForm: boolean = false;
    @observable form: any = {};
    @observable formTemplate: any = ORIGINAL_FORM_TEMPLATE;
    @observable options: any = [];
    optionsSearch = [{
        key: 1,
        text: 'Casa Branca',
        value: 1
    }, {
        key: 3,
        text: 'Aguas da Prata',
        value: 3
    }]

    @action
    handleSearchChange = (e: any, { searchQuery }: any) => this.options = this.optionsSearch

    @action
    async login(user: LoginRequest) {
        try {
            window.sessionStorage.removeItem("auth_token");
            window.sessionStorage.removeItem("auth_userData");
            this.loadList = true;
            let { headers: response } = await login(transformUser(user));
            window.sessionStorage.setItem("auth_userData", response.authorization.replace('Bearer ', ''));
            window.location.href = `${process.env.REACT_APP_PUBLIC_URL}`;
        } catch (err) {
            console.log(err);
            showErrorMessage(err.response);
        } finally {
            this.loadList = false;
        }
    }

    @computed
    get formLogin() {
        return this.formTemplate;
    }
}

export default new LoginStore();
