export const ORIGINAL_FORM_TEMPLATE: any[] = [
  {
    row: {
      fields:
        [{
          label: "Nome",
          name: "description",
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
        },
        {
          label: "Categoria",
          name: "category",
          type: "select",
          value: "",
          defaultValue: "",
          placeholder: "Selecione uma categoria",
          required: true,
          width: 4,
          defaultData: [],
          data: [],
          multiple: false
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