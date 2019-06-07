import { notify } from 'react-notify-toast'
import { colorMessage } from '../Const'

export const showErrorMessage = (error) => {

  notify.show(
    error.data.message,
    'custom',
    4000,
    error.status < 500 ? colorMessage.warn : colorMessage.error
  )
}

export const showNotify = (status, time, objName) => {
  let msg
  let color
  switch (status) {
    case 100:
      msg = '100 - Continue'
      color = colorMessage.success
      break
    case 101:
      msg = '101 - Protocolos de comutação'
      color = colorMessage.info
      break
    case 200:
      msg = '200 - Sucesso'
      color = colorMessage.success
      break
    case 201:
      msg = `201 - Sucesso ${objName}`
      color = colorMessage.success
      break
    case 202:
      msg = '202 - Aceito com sucesso'
      color = colorMessage.success
      break
    case 203:
      msg = '203 - Informações não autorizadas'
      color = colorMessage.warn
      break
    case 204:
      msg = `204 - Sucesso ${objName}`
      color = colorMessage.success
      break
    case 205:
      msg = '205 - Redefinir conteúdo'
      color = colorMessage.warn
      break
    case 206:
      msg = '206 - Conteudo parcial'
      color = colorMessage.warn
      break
    case 300:
      msg = '300 - Múltiplas Escolhas'
      color = colorMessage.warn
      break
    case 301:
      msg = '301 - Mudou-se permanentemente'
      color = colorMessage.warn
      break
    case 302:
      msg = '302 - Encontrados'
      color = colorMessage.success
      break
    case 303:
      msg = '303 - Ver Outro'
      color = colorMessage.warn
      break
    case 304:
      msg = '304 - Não Modificado'
      color = colorMessage.warn
      break
    case 307:
      msg = '307 - Redirecionamento Temporário'
      color = colorMessage.warn
      break
    case 308:
      msg = '308 - Redirecionamento Permanente'
      color = colorMessage.warn
      break
    case 400:
      msg = objName ? `400 - ${objName} inválido` : '400 - Pedido incorreto'
      color = colorMessage.warn
      break
    case 401:
      msg = '401 - Não autorizado'
      color = colorMessage.warn
      break
    case 403:
      msg = '403 - Proibido'
      color = colorMessage.warn
      break
    case 404:
      msg = `404 - Nenhum ${objName} foi econtrado`
      color = colorMessage.warn
      break
    case 405:
      msg = '405 - Método não permitido'
      color = colorMessage.warn
      break
    case 406:
      msg = '406 - Não Aceitável'
      color = colorMessage.warn
      break
    case 407:
      msg = '407 - Autenticação de proxy necessária'
      color = colorMessage.warn
      break
    case 408:
      msg = '408 - Request Timeout'
      color = colorMessage.error
      break
    case 409:
      msg = '409 - Conflito'
      color = colorMessage.warn
      break
    case 410:
      msg = '410 - Feito'
      color = colorMessage.success
      break
    case 411:
      msg = '411 -Comprimento necessário'
      color = colorMessage.warn
      break
    case 412:
      msg = '412 - Precondição falhou'
      color = colorMessage.error
      break
    case 413:
      msg = '413 - Carga muito grande'
      color = colorMessage.error
      break
    case 414:
      msg = '414 - URI muito longa'
      color = colorMessage.error
      break
    case 415:
      msg = '415 - Tipo de mídia não suportada'
      color = colorMessage.error
      break
    case 416:
      msg = '416 - Faixa não satisfatória'
      color = colorMessage.error
      break
    case 417:
      msg = '417 - Expectativa falhou'
      color = colorMessage.warn
      break
    case 418:
      msg = '418 - Sou um bule'
      color = colorMessage.error
      break
    case 422:
      msg = '422 - Entidade não processável'
      color = colorMessage.error
      break
    case 426:
      msg = '426 - Upgrade necessário'
      color = colorMessage.warn
      break
    case 428:
      msg = '428 - Pré-requisito necessário'
      color = colorMessage.warn
      break
    case 429:
      msg = '429 - Pedidos em excesso'
      color = colorMessage.error
      break
    case 431:
      msg = '431 - Campos de cabeçalho de solicitação muito grandes'
      color = colorMessage.error
      break
    case 451:
      msg = '451 - Indisponível por motivos legais'
      color = colorMessage.error
      break
    case 500:
      msg = '500 - Erro interno do servidor'
      color = colorMessage.error
      break
    case 501:
      msg = '501 - Não implementado'
      color = colorMessage.error
      break
    case 502:
      msg = '502 - Bad Gateway'
      color = colorMessage.error
      break
    case 503:
      msg = '503 - Serviço indisponível'
      color = colorMessage.error
      break
    case 504:
      msg = '504 - Tempo limite do gateway '
      color = colorMessage.error
      break
    case 505:
      msg = '505 - Versão HTTP Não Suportada'
      color = colorMessage.error
      break
    case 511:
      msg = '511 - Autenticação de rede necessária'
      color = colorMessage.error
      break
    default:
      msg = '512 - Não foi possível identificar o erro'
      color = colorMessage.error
  }

  notify.show(msg, 'custom', time, color)
}
