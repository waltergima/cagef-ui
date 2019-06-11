import { isAdmin } from "../../../config/Utils";

const subItens = () => {
  let subItens = [{
    id: 1,
    name: "Casas de Oração",
    route: "/cadastros/casas-oracao"
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
    description: "registre todos os itens",
    icon: "wpforms",
    visible: true,
    group: [
      {
        name: "",
        route: "",
        visible: false,
        items: subItens()
      }
    ]
  }
];