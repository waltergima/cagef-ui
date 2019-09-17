import { isAdmin } from "../../../config/Utils";

const subItens = () => {
  let subItens = [{
    id: 1,
    name: "Casas de Oração",
    route: "/cadastros/casas-oracao"
  }, {
    id: 4,
    name: "Voluntários",
    route: "/cadastros/voluntarios"
  }];

  if (isAdmin()) {
    subItens = subItens.concat([
      {
        id: 2,
        name: "Cidades",
        route: "/cadastros/cidades"
      }, {
        id: 3,
        name: "Ministérios / Cargos",
        route: "/cadastros/ministerios-cargos"
      }, {
        id: 5,
        name: "Usuários",
        route: "/cadastros/usuarios"
      }
    ]);
  }

  return subItens;
};

export const menuItens = [
  {
    name: "Cadastros",
    description: "Cadastre os voluntários de nossa região",
    icon: "wpforms",
    visible: true,
    items: subItens()
  }
];