export const ORIGINAL_FORM_TEMPLATE: any[] = [
  {
    row: {
      fields:
        [{
          label: "Cod. Relatorio",
          name: "reportCode",
          type: "text",
          value: "",
          placeholder: "",
          maxLength: 45,
          required: true,
          validations: { minLength: 3, maxLength: 45 },
          validationErrors: {
            isDefaultRequiredValue: "O cod. relatório é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 45 caracteres",
          },
          width: 4
        }, {
          label: "Bairro",
          name: "district",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 45,
          required: true,
          validations: { minLength: 3, maxLength: 45 },
          validationErrors: {
            isDefaultRequiredValue: "O bairro é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 45 caracteres",
          },
          width: 4
        },
        {
          label: "Cidades",
          name: "city.name",
          type: "select",
          value: "",
          defaultValue: "",
          placeholder: "Selecione uma cidade",
          required: true,
          width: 8,
          defaultData: [],
          data: [],
          validationErrors: {
            isDefaultRequiredValue: 'A cidade é obrigatória',
          },
          multiple: false
        }
        ]
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