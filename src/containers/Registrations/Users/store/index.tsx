import { Button, Popup } from "maga-components";
import { action, computed, observable } from "mobx";
import * as React from "react";
import { notify } from "react-notify-toast";
import { colorMessage } from "../../../../config/Const";
import { showErrorMessage } from "../../../../config/Messages";
import { findAll as getCitiesList } from '../../Cities/services';
import { mountSelectValues } from "../../Cities/transformer";
import { SelectItem } from "../../types";
import { ORIGINAL_FORM_TEMPLATE } from '../constants';
import { create, findAll, remove, update } from '../services';
import { transform } from "../transformer";
import { User } from "../types";

export class UsersStore {
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable branch: number = 0;
  @observable tabIndex: number = 0;
  @observable pages: number = 0;
  @observable pageSize: number = 10;
  @observable loadList: boolean = false;
  @observable loadForm: boolean = false;
  @observable listUsers: User[] = [];
  @observable actionType: string = "";
  @observable formState: any = {};
  @observable form: any = {};
  @observable cities: any[] = [];
  @observable unselectedUsers: SelectItem[] = [];
  @observable users: User[] = [];
  @observable id: number = -1;
  @observable formTemplate: any = ORIGINAL_FORM_TEMPLATE;
  @observable
  columsMaster: any[] = [
    {
      Header: "",
      accessor: "action",
      maxWidth: 100,
      filterable: false,
      Cell: (row: any) => (
        <Button.Group basic size="medium">
          <Popup
            trigger={
              <Button
                icon="edit"
                onClick={() => {
                  this.prepareEditUser(this, 1, row.original)
                }}
              />
            }
            content="Editar registro"
            inverted
            position="left center"
          />
          <Popup
            trigger={
              <Button
                icon="trash"
                onClick={() => {
                  this.prepareRemoveUser(this, row.original);
                }}
              />
            }
            content="Remover registro"
            inverted
            position="top center"
          />
        </Button.Group>
      )
    },
    {
      Header: "ID",
      accessor: "id"
    },
    {
      Header: "Nome",
      accessor: "name"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Cidade",
      id: "city.name",
      acessor: 'city',
      Cell: (row: any) => { return (<span> {row.original.city.name}</span >) }
    },
    {
      Header: "Role",
      accessor: "role",
      Cell: (row: any) => { return (<span> {row.original.role.substring(5)}</span >) }
    }
  ];

  @action
  handleTabChange = (e: any, tabIndex: any) => {
    if (tabIndex.activeIndex === 1) {
      this.form.resetForm();
      this.prepareCreateUser(this, {
        activeIndex: 1
      });
    }
    this.tabIndex = tabIndex.activeIndex;
  };

  @action
  async getListUsers(params: any) {
    this.offset = params.offset;
    this.limit = params.limit;
    try {
      this.loadList = true;
      let { data: response } = await findAll(params);
      this.pages = Math.ceil(response.totalPages);
      this.listUsers = response.content;
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action
  prepareCreateUser = async (e: any, tabIndex: any) => {
    this.loadForm = true;
    this.form.resetForm();
    this.resetUpdate();
    this.actionType = "CREATE";
    this.loadForm = false;
  };

  @action async saveUser(user: any) {
    if (this.actionType === "EDIT") {
      await this.updateUser(user);
    } else {
      await this.postUser(user);
    }
  }

  @action
  async postUser(dataForm: any) {
    this.loadForm = true;
    try {
      let response = await create(dataForm);
      this.tabIndex = 0;
      await this.getListUsers({ offset: this.offset, limit: this.limit });

      notify.show(
        `${response.status}  - Usuário criado com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadForm = false;
    }
  }

  @action
  prepareEditUser = async (
    e: any,
    activeIndex: number,
    selectedUser: User
  ) => {
    this.loadForm = true;
    this.form.resetForm();
    await this.mountCitiesSelect();
    this.actionType = "EDIT";
    this.tabIndex = activeIndex;
    this.id = selectedUser.id;

    this.resetUpdate(selectedUser);

    this.loadForm = false;
  };

  @action
  async updateUser(dataForm: any) {
    this.loadForm = true;
    try {
      this.tabIndex = 0;
      let response = await update(transform(dataForm), this.id);
      this.getListUsers({ offset: this.offset, limit: this.limit });
      notify.show(
        `${response.status}  - Usuário atualizado com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    } finally {
      this.loadForm = false;
    }
  }

  @action
  async prepareRemoveUser(e: any, selectedUser: User) {
    await this.removeUser(selectedUser);
  }

  @action
  async removeUser(selectedUser: User) {
    this.loadList = true;
    try {
      let response = await remove(selectedUser.id);

      await this.getListUsers({
        offset: this.offset,
        limit: this.limit
      });

      notify.show(
        `${response.status}  - Usuário removido com sucesso`,
        "custom",
        2000,
        colorMessage.success
      );
    } catch (err) {
      showErrorMessage(err.response);
    } finally {
      this.loadList = false;
    }
  }

  @action
  mountCitiesSelect = async () => {
    try {
      let response: any = await getCitiesList({ offset: 0, limit: 20, filtered: 'regional=true' });
      this.cities = mountSelectValues(response.data.content);
    } catch (err) {
      console.log(err);
      showErrorMessage(err.response);
    }
  };

  private resetUpdate(selectedUser?: User) {
    if (selectedUser) {
      this.formTemplate[1].row.fields[0].data = this.cities;
      this.formTemplate[2].row.fields[0].label = 'Senha (Deixar em branco para manter a senha atual)';
      this.formTemplate[2].row.fields[0].required = false;
      this.form.resetUpdate({
        id: this.id,
        name: selectedUser.name,
        email: selectedUser.email,
        city: selectedUser.city.id,
        role: selectedUser.role,
        password: undefined
      });
    } else {
      this.formTemplate[2].row.fields[0].label = 'Senha';
      this.formTemplate[2].row.fields[0].required = true;
      this.form.resetUpdate({
        id: this.id,
        name: null,
        email: null,
        city: null,
        role: null,
        password: null
      });
    }
  }

  @computed
  get activeTab(): number {
    return this.tabIndex;
  }

  @computed
  get columsMasterUsers() {
    return this.columsMaster;
  }

  @computed
  get formCreateUser() {
    return this.formTemplate;
  }
}

export default new UsersStore();
