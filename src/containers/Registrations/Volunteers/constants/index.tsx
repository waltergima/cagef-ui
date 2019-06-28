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
          multiple: false
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
          label: "Endereço",
          name: "address",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 255,
          validations: { minLength: 3, maxLength: 255 },
          validationErrors: {
            isDefaultRequiredValue: "O endereço é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 255 caracteres",
          },
          width: 4
        },
        {
          label: "Bairro",
          name: "district",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 45,
          validations: { minLength: 3, maxLength: 45 },
          validationErrors: {
            isDefaultRequiredValue: "O bairro é obrigatório",
            minLength: "Deve possuir no minimo 3 caracteres",
            maxLength: "Deve possuir no máximo 45 caracteres",
          },
          width: 4
        },
        {
          label: "CEP",
          name: "zipCode",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 9,
          mask: "99999-999",
          alwaysShowMask: true,
          raw: true,
          validations: { minLength: 8, maxLength: 8 },
          validationErrors: {
            isDefaultRequiredValue: "O CEP é obrigatório",
            minLength: "Deve possuir no minimo 8 caracteres",
            maxLength: "Deve possuir no máximo 8 caracteres",
          },
          width: 4
        },
        {
          label: "Naturalidade",
          name: "naturalness",
          type: "dropdown",
          search: true,
          multiple: false,
          defaultValue: "",
          placeholder: "Selecione uma cidade",
          required: false,
          width: 8,
          defaultData: [],
          data: [],
          handleSearchChange: null,
          validationErrors: {
          }
        }
      ]
    }
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
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: -4
        }
      ]
    }
  },
  {
    row: {
      fields: [
        {
          label: "Data de batismo",
          name: "dateOfBaptism",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 10,
          required: false,
          timeCaption: "time",
          selected: "",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 4
        },
        {
          label: "CPF",
          name: "cpf",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          minLength: 14,
          maxLength: 14,
          mask: '999-999-999-99',
          alwaysShowMask: false,
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
          label: "RG",
          name: "rg",
          type: "text",
          value: "",
          defaultValue: "",
          placeholder: "",
          minLength: 8,
          maxLength: 14,
          required: false,
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 8 caracteres",
            maxLength: "Deve possuir no máximo 14 caracteres",
          },
          width: 4
        },
        {
          label: "Estado civil",
          name: "maritalStatus",
          type: "select",
          value: "",
          defaultValue: "",
          placeholder: "Selecione um estado civil",
          required: false,
          width: 4,
          defaultData: [],
          data: [{
            key: 1,
            text: 'Solteiro',
            value: 'solteiro'
          },
          {
            key: 2,
            text: 'Casado',
            value: 'casado'
          },
          {
            key: 3,
            text: 'Divorciado',
            value: 'divorciado'
          },
          {
            key: 4,
            text: 'Viúvo',
            value: 'viuvo'
          }],
          validationErrors: {
          },
          multiple: false
        }
      ]
    }
  },
  {
    row: {
      fields: [
        {
          locale: "pt-BR",
          label: "Data de apresentação no ministério",
          name: "ministryApresentationDate",
          type: "date",
          dateFormat: 'dd/MM/yyyy',
          value: "",
          defaultValue: "",
          placeholder: "",
          maxLength: 10,
          required: false,
          selected: "",
          validations: {},
          validationErrors: {
            minLength: "Deve possuir no minimo 10 caracteres",
            maxLength: "Deve possuir no máximo 10 caracteres",
          },
          width: 4
        },
        {
          label: "Promessa",
          name: "promise",
          type: "select",
          value: "",
          defaultValue: "",
          placeholder: "Selecione uma opção",
          required: false,
          width: 4,
          defaultData: [],
          data: [{
            key: 1,
            text: 'Sim',
            value: 'S'
          },
          {
            key: 2,
            text: 'Não',
            value: 'S'
          }],
          validationErrors: {
          },
          multiple: false
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