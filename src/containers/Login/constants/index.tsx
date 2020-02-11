export const ORIGINAL_FORM_TEMPLATE: any[] = [
  {
    row: {
      fields:
        [{
          label: "Usuário",
          name: "username",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 255,
          required: true,
          validations: { minLength: 3, maxLength: 255 },
          validationErrors: {
            isDefaultRequiredValue: "O usuário é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 255 caracteres",
          },
          width: 10
        }]
    },
  },
  {
    row: {
      fields: [{
        label: "Senha",
        name: "password",
        type: "password",
        value: "",
        defaultValue: "",
        placeholder: "",
        maxLength: 255,
        required: true,
        validations: { minLength: 3, maxLength: 255 },
        validationErrors: {
          isDefaultRequiredValue: "A senha é obrigatória",
          minLength: "Deve possuir no minimo 3 caracteres",
          maxLength: "Deve possuir no máximo 255 caracteres",
        },
        width: 10
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
          label: "Login",
          name: "action",
          type: "submit",
          value: "",
          placeholder: "",
          color: "green",
          icon: "sign in",
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