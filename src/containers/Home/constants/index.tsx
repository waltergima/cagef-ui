import { hasRole } from "../../../config/Utils";

const subItens = () => {
  let subItens = [{
    id: 1,
    name: "Casas de Oração",
    route: "/cadastros/casas-oracao",
    icon: "place-of-worship"
  }, {
    id: 4,
    name: "Voluntários",
    route: "/cadastros/voluntarios",
    icon: "place-of-worship"
  }];

  if (hasRole()) {
    subItens = subItens.concat([
      {
        id: 2,
        name: "Cidades",
        route: "/cadastros/cidades",
        icon: "place-of-worship"
      }, {
        id: 3,
        name: "Ministérios / Cargos",
        route: "/cadastros/ministerios-cargos",
        icon: "place-of-worship"
      }, {
        id: 5,
        name: "Usuários",
        route: "/cadastros/usuarios",
        icon: "place-of-worship"
      }
    ]);
  }

  return subItens;
};

const musicSubItens = () => {
  let subItens = [{
    id: 1,
    name: "Músicos",
    route: "/cadastros/musicos"
  }];

  if ((hasRole() || hasRole("ROLE_ADMIN_MUSICA"))) {
    subItens = subItens.concat([
      {
        id: 2,
        name: "Instrumentos",
        route: "/cadastros/instrumentos"
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
  }, !hasRole("ROLE_USUARIO") && {
    name: "Gestão Musical",
    description: "Realize a gestão musical da nossa região",
    icon: "music",
    visible: true,
    items: musicSubItens()
  }
];