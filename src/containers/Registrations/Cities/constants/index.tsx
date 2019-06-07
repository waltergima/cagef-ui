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
        },
        {
          label: "Estado",
          name: "state",
          type: "select",
          value: "",
          defaultValue: "",
          placeholder: "Selecione um estado",
          required: true,
          width: 4,
          defaultData: [],
          data: [{
            key: 1,
            text: 'Acre',
            value: 'AC'
          },
          {
            key: 2,
            text: 'Alagoas',
            value: 'AL'
          },
          {
            key: 3,
            value: 'AP',
            text: 'Amapá'
          },
          {
            key: 4,
            value: 'AM',
            text: 'Amazonas'
          },
          {
            key: 5,
            value: 'BA',
            text: 'Bahia'
          },
          {
            key: 6,
            value: 'CE',
            text: 'Ceará'
          },
          {
            key: 7,
            value: 'DF',
            text: 'Distrito Federal'
          },
          {
            key: 8,
            value: 'ES',
            text: 'Espírito Santo'
          },
          {
            key: 9,
            value: 'GO',
            text: 'Goiás'
          },
          {
            key: 10,
            value: 'MA',
            text: 'Maranhão'
          },
          {
            key: 11,
            value: 'MT',
            text: 'Mato Grosso'
          },
          {
            key: 12,
            value: 'MS',
            text: 'Mato Grosso do Sul'
          },
          {
            key: 13,
            value: 'MG',
            text: 'Minas Gerais'
          },
          {
            key: 14,
            value: 'PA',
            text: 'Pará'
          },
          {
            key: 15,
            value: 'PB',
            text: 'Paraíba'
          },
          {
            key: 16,
            value: 'PR',
            text: 'Paraná'
          },
          {
            key: 17,
            value: 'PE',
            text: 'Pernambuco'
          },
          {
            key: 18,
            value: 'PI',
            text: 'Piauí'
          },
          {
            key: 19,
            value: 'RJ',
            text: 'Rio de Janeiro'
          },
          {
            key: 20,
            value: 'RN',
            text: 'Rio Grande do Norte'
          },
          {
            key: 21,
            value: 'RS',
            text: 'Rio Grande do Sul'
          },
          {
            key: 22,
            value: 'RO',
            text: 'Rondônia'
          },
          {
            key: 23,
            value: 'RR',
            text: 'Roraima'
          },
          {
            key: 24,
            value: 'SP',
            text: 'São Paulo'
          },
          {
            key: 25,
            value: 'SC',
            text: 'Santa Catarina'
          },
          {
            key: 26,
            value: 'SE',
            text: 'Sergipe'
          },
          {
            key: 27,
            value: 'TO',
            text: 'Tocantins'
          }],
          multiple: false
        },
        {
          label: "Pertence à regional",
          name: "regional",
          type: "checkbox",
          value: "",
          defaultValue: false,
          placeholder: "",
          required: false,
          width: 4
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