export const ORIGINAL_FORM_TEMPLATE = [
  {
    row: {
      fields:
        [{
          label: "Cidades",
          name: "city",
          type: "multiSelect",
          value: "",
          placeholder: "Selecione uma cidade",
          required: true,
          width: 4,
          includeSelectAll: true,
          defaultData: [],
          data: [],
          validationErrors: {
            isDefaultRequiredValue: 'A cidade é obrigatória',
          },
          multiple: true
        },
        {
          label: "Comum",
          name: "prayingHouse",
          type: "multiSelect",
          value: "",
          placeholder: "Selecione uma comum",
          required: false,
          includeSelectAll: true,
          width: 4,
          defaultData: [],
          data: [],
          validationErrors: {
          },
          multiple: true
        },
        {
          label: "Ministério / Cargo",
          name: "ministryOrPosition",
          type: "multiSelect",
          value: "",
          defaultValue: "",
          placeholder: "Selecione um ministério",
          includeSelectAll: true,
          required: true,
          defaultData: [],
          data: [],
          validationErrors: {
            isDefaultRequiredValue: 'O ministério / cargo é obrigatório',
          },
          multiple: true,
          width: 4
        },
        {
          label: "Gerar",
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
          width: 4
        }
        ]
    },
  },
];