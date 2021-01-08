import * as React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import RobotoBold from "../../../../assets/fonts/Roboto/Roboto-Bold.ttf";
import RobotoRegular from "../../../../assets/fonts/Roboto/Roboto-Regular.ttf";
import * as dateFns from 'date-fns';
import ptBRLocale from 'date-fns/locale/pt-BR';

const NOT_INFORMED = 'Não Informado';

const styles = StyleSheet.create({
  topic: {
    borderBottomStyle: "solid",
    borderBottom: '1',
    margin: 10
  },
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingTop: 20,
    paddingBottom: 0,
    paddingHorizontal: 35,
    textAlign: 'justify'
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 10,
    justifyContent: 'flex-end',
    fontFamily: 'Roboto-Regular',
  },
  link: {
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    textTransform: 'uppercase'
  },
  textTitle: {
    flexDirection: 'column',
    flexGrow: 0,
    fontWeight: 'ultrabold',
    fontSize: 10,
    textDecorationStyle: 'solid',
    color: 'black',
    fontFamily: 'Roboto-Bold'
  },
  text: {
    flexDirection: 'column',
    fontSize: 10,
    flexGrow: 0,
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    textAlign: 'justify',
    marginRight: 50
  },
  spacer: {    
    flexGrow: 0.2,
  },
});

const getProperty = (volunteer: any, propertyName: string) => {
  return volunteer[propertyName] || NOT_INFORMED;
}

const getDate = (date: string) => {
  const subs = date ? date.split('-') : NOT_INFORMED;
  return Array.isArray(subs) ? dateFns.format(new Date(Number(subs[0]), Number(subs[1]) - 1, Number(subs[2])), 'dd/MM/yyyy', {locale: ptBRLocale}) : subs;
}

Font.register({
  family: 'Roboto-Bold',
  src: RobotoBold
});

Font.register({
  family: 'Roboto-Regular',
  src: RobotoRegular
});

function getMusicianProperties(props: any, isMusician = false) {
  return isMusician ? (
    <React.Fragment>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Instrumento: </Text>
        <Text style={styles.text}>{props.volunteer.instrument ? props.volunteer.instrument.description : NOT_INFORMED}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Data de oficialização: </Text>
        <Text style={styles.text}>{getDate(props.volunteer.oficializationDate)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Data de ensaio: </Text>
        <Text style={styles.text}>{getDate(props.volunteer.rehearsalDate)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Data de RJM: </Text>
        <Text style={styles.text}>{getDate(props.volunteer.rjmExamDate)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Date de culto oficial: </Text>
        <Text style={styles.text}>{getDate(props.volunteer.oficialCultExamDate)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Observação: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer, 'observation')}</Text>
      </View>
    </React.Fragment>) : undefined;
}

export const MyDocument = (props: any) => (
  <Document>
    <Page>
      <View style={styles.container}>
        <View style={styles.detailColumn}>
          <Text style={styles.subtitle}>Congregação Cristã no Brasil</Text>
        </View>
        <View style={styles.linkColumn}>
          <Text style={styles.link}>Regional Porto Ferreira</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.name}>{getProperty(props.volunteer, 'name')}</Text>
      </View>
      <View style={styles.topic}>
        <Text>Dados Pessoais</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>CPF: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer, 'cpf')}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>RG: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer, 'rg')}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Data de Nascimento: </Text>
        <Text style={styles.text}>{getDate(props.volunteer.dateOfBirth)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Cidade: </Text>
        <Text style={styles.text}>{props.volunteer.city ? props.volunteer.city.name: NOT_INFORMED}</Text>
        <Text style={styles.spacer} />
        <Text style={styles.textTitle}>Comum Congregação: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer.prayingHouse, 'name')}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Naturalidade: </Text>
        <Text style={styles.text}>{props.volunteer.naturalness ? props.volunteer.naturalness.name: NOT_INFORMED}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Estado Civil: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer, 'maritalStatus')}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Endereço: </Text>
        <Text style={styles.text}>{`Rua: ${getProperty(props.volunteer, 'address')}, Bairro: ${getProperty(props.volunteer,'district')}, CEP: ${getProperty(props.volunteer, 'zipCode')}`}</Text>
      </View>
      <View style={styles.topic}>
        <Text>Contato</Text>
      </View>
      <View style={styles.container}>
          <Text style={styles.textTitle}>Email: </Text>
          <Text style={styles.text}>{getProperty(props.volunteer, 'email')}</Text>
        </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Telefone: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer, 'phoneNumber')}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Celular: </Text>
        <Text style={styles.text}>{getProperty(props.volunteer, 'celNumber')}</Text>
      </View>
      <View style={styles.topic}>
        <Text>Ministério</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Ministérios: </Text>
        <Text style={styles.text}>{props.volunteer.ministryOrPosition.map((m: any) => m.description).join(', ')}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Data de apresentação: </Text>
        <Text style={styles.text}>{getDate(props.volunteer.ministryApresentationDate)}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Tem Promessa: </Text>
        <Text style={styles.text}>{props.volunteer.promise ? 'Sim' : 'Não'}</Text>
      </View>
      {getMusicianProperties(props, props.isMusician)}
    </Page>
  </Document>
);