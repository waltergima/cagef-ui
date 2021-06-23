export const ORIGINAL_FORM_TEMPLATE: any[] = [
  {
    row: {
      fields:
        [{
          label: "Descrição",
          name: "description",
          type: "text",
          value: "",
          placeholder: "",
          maxLength: 45,
          required: true,
          validations: { minLength: 3, maxLength: 45 },
          validationErrors: {
            isDefaultRequiredValue: "A descrição é obrigatória",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 45 caracteres",
          },
          width: 8
        }]
    },
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