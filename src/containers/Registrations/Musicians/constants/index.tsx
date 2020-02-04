export const ORIGINAL_FORM_TEMPLATE = [
  {
    row: {
      fields: [
        {
          label: "Ministério / Cargo",
          name: "ministryOrPosition",
          type: "multiSelectArea",
          value: "",
          defaultValue: "",
          placeholder: "",
          required: true,
          defaultData: [],
          data: [],
          validationErrors: {
            isDefaultRequiredValue: 'O ministério / cargo é obrigatório',
          },
          multiple: true,
          width: 16
        }
      ]
    }
  },
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
          maxLength: 45,
          required: true,
          validations: { minLength: 3, maxLength: 255 },
          validationErrors: {
            isDefaultRequiredValue: "O nome é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 255 caracteres",
          },
          width: 4
        },
        {
          label: "Cidades",
          name: "city",
          type: "select",
          value: "",
          placeholder: "Selecione uma cidade",
          required: true,
          width: 4,
          defaultData: [],
          data: [],
          validationErrors: {
            isDefaultRequiredValue: 'A cidade é obrigatória',
          },
          multiple: false,
          fluid: true,
          search: false,
          selection: true
        },
        {
          label: "Comum",
          name: "prayingHouse",
          type: "select",
          value: "",
          placeholder: "Selecione uma comum",
          required: false,
          width: 4,
          defaultData: [],
          data: [],
          validationErrors: {
          },
          multiple: false
        }
        ]
    },
  },
  {
    row: {
      fields: [
        {
          label: "Telefone",
          name: "phoneNumber",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 10,
          mask: '(99)9999-9999',
          alwaysShowMask: true,
          raw: true,
          required: false,
          validations: { minLength: 10, maxLength: 10 },
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 4
        },
        {
          label: "Celular",
          name: "celNumber",
          type: "tel",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 45,
          mask: '(99)9 9999-9999',
          alwaysShowMask: true,
          raw: true,
          required: false,
          validations: { minLength: 11, maxLength: 11 },
          validationErrors: {
            minLength: "Deve possuir no minimo 11 caracteres",
            maxLength: "Deve possuir no máximo 11 caracteres",
          },
          width: 4
        },
        {
          label: "Email",
          name: "email",
          type: "email",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 45,
          required: false,
          validations: { minLength: 3, maxLength: 45 },
          validationErrors: {
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 45 caracteres",
          },
          width: 4
        },
        {
          label: "Data de Nascimento",
          name: "dateOfBirth",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 2
        }
      ]
    }
  },
  {
    row: {
      fields: [
        {
          label: "Instrumento",
          name: "instrument",
          type: "select",
          value: "",
          placeholder: "Selecione um instrumento",
          required: true,
          width: 4,
          defaultData: [],
          data: [],
          validationErrors: {
          },
          multiple: false,
          fluid: true,
          search: false,
          selection: true
        },
        {
          label: "Data de oficializaçao",
          name: "oficializationDate",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 3
        },
        {
          label: "Ensaio",
          name: "rehearsalDate",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 3
        },
        {
          label: "Exame RJM",
          name: "rjmExamDate",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 3
        },
        {
          label: "Culto oficial",
          name: "oficialCultExamDate",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 3
        },
      ]
    }
  },
  {
    row: {
      fields: [
        {
          label: "Observação",
          name: "observation",
          type: "textArea",
          width: 16,
          defaultData: "",
          data: []
        }
      ]
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