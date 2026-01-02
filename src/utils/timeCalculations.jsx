/**
 * Converte horário no formato "HH:MM" para minutos totais
 * @param {string} horario - Horário no formato "HH:MM"
 * @returns {number} - Total de minutos
 * @example converterParaMinutos("08:30") // retorna 510
 */
export const converterParaMinutos = (horario) => {
  if (!horario) return 0
  const [horas, minutos] = horario.split(':').map(Number)
  return horas * 60 + minutos
}

/**
 * Converte minutos totais de volta para o formato "HH:MM"
 * @param {number} minutos - Total de minutos
 * @returns {string} - Horário no formato "HH:MM"
 * @example converterParaHorario(510) // retorna "08:30"
 */
export const converterParaHorario = (minutos) => {
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  return `${String(horas).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

/**
 * Formata minutos para exibição amigável (Xh Ymin)
 * @param {number} minutos - Total de minutos
 * @returns {string} - Tempo formatado
 * @example formatarTempo(90) // retorna "1h 30min"
 */
export const formatarTempo = (minutos) => {
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  if (horas === 0) return `${mins}min`
  if (mins === 0) return `${horas}h`
  return `${horas}h ${mins}min`
}

/**
 * Calcula o horário de saída e informações do expediente
 * @param {Object} horarios - Objeto com os horários de entrada e saída
 * @returns {Object} - Objeto com horário de saída, tempo de almoço e horas trabalhadas
 */
export const calcularHorarioSaida = ({ entrada1, saida1, entrada2 }) => {
  // Meta de trabalho: 8h38min = 518 minutos
  const META_MINUTOS = 518
  
  // Converter todos os horários para minutos
  const entrada1Min = converterParaMinutos(entrada1)
  const saida1Min = converterParaMinutos(saida1)
  const entrada2Min = converterParaMinutos(entrada2)
  
  // Calcular tempo trabalhado no período da manhã
  const periodoManha = saida1Min - entrada1Min
  
  // Calcular tempo de almoço (intervalo entre saída e retorno)
  const almoco = entrada2Min - saida1Min
  
  // Calcular quantos minutos ainda faltam trabalhar após o almoço
  const faltaTrabalhar = META_MINUTOS - periodoManha
  
  // Calcular o horário de saída somando o tempo que falta ao horário de entrada2
  const saidaCalculada = entrada2Min + faltaTrabalhar
  
  // Calcular total trabalhado
  const totalTrabalhado = periodoManha + faltaTrabalhar
  
  return {
    horarioSaida: converterParaHorario(saidaCalculada),
    tempoAlmoco: formatarTempo(almoco),
    horasTrabalhadas: formatarTempo(totalTrabalhado)
  }
}