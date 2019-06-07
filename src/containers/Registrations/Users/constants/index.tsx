export const ORIGINAL_FORM_TEMPLATE: any[] = [
  {
    row: {
      fields:
        [{
          label: "Nome",
          name: "name",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 255,
          required: true,
          validations: { minLength: 3, maxLength: 255 },
          validationErrors: {
            isDefaultRequiredValue: "O nome é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 255 caracteres",
          },
          width: 8
        }, {
          label: "Email",
          name: "email",
          type: "text",
          value: "",
          maxLength: 255,
          required: true,
          validations: { minLength: 3, maxLength: 255 },
          validationErrors: {
            isDefaultRequiredValue: "O email é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 255 caracteres",
          },
          width: 4
        }]
    },
  },
  {
    row: {
      fields: [{
        label: "Cidades",
        name: "city",
        type: "select",
        value: "",
        placeholder: "Selecione uma cidade",
        required: true,
        width: 8,
        defaultData: [],
        data: [],
        validationErrors: {
          isDefaultRequiredValue: 'A cidade é obrigatória',
        },
        multiple: false
      }, {
        label: "Role",
        name: "role",
        type: "select",
        value: "",
        placeholder: "Selecione uma role",
        required: true,
        defaultData: [],
        data: [{
          key: 1,
          text: 'USUÁRIO',
          value: 'ROLE_USUARIO'
        }, {
          key: 2,
          text: 'ADMIN',
          value: 'ROLE_ADMIN'
        }],
        validationErrors: {
          isDefaultRequiredValue: 'A role é obrigatória',
        },
        multiple: false,
        width: 4
      }]
    }
  },
  {
    row: {
      fields: [{
        label: "Senha (Deixar em branco para manter a senha atual)",
        name: "password",
        type: "password",
        value: "",
        maxLength: 16,
        required: false,
        validations: { minLength: 3, maxLength: 255 },
        validationErrors: {
          isDefaultRequiredValue: 'A senha é obrigatória',
          minLength: "Deve possuir no minimo 3 caracteres",
          maxLength: "Deve possuir no máximo 16 caracteres",
        },
        width: 4
      }]
    }
  },
  {
    row: { fields: [] }
  },
  {
    row: {
      fields: [
        {
          label: "Salvar",
          name: "action",
          type: "submit",
          value: "",
          placeholder: "",
          color: "green",
          icon: "save",
          floated: "right",
          required: false,
          validations: {},
          validationErrors: {},
          width: 16
        }
      ]
    }
  }
];