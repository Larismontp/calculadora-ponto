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
export const calcularHorarioSaida = ({ entrada1, saida1, entrada2, saida2 }) => {
  // Meta de trabalho COM tolerância: 8h38min = 518 minutos
  const META_MINUTOS = 518

  // Jornada completa SEM tolerância: 8h48min = 528 minutos
  const JORNADA_COMPLETA = 528

  // Converter todos os horários para minutos
  const entrada1Min = converterParaMinutos(entrada1)
  const saida1Min = converterParaMinutos(saida1)
  const entrada2Min = converterParaMinutos(entrada2)

  // Calcular tempo trabalhado no período da manhã
  const periodoManha = saida1Min - entrada1Min

  // Calcular tempo de almoço (intervalo entre saída e retorno)
  const almoco = entrada2Min - saida1Min

  // ===== CÁLCULO COM TOLERÂNCIA (8h38min) =====
  // Calcular quantos minutos ainda faltam trabalhar após o almoço
  const faltaTrabalhar = META_MINUTOS - periodoManha

  // Calcular o horário de saída somando o tempo que falta ao horário de entrada2
  const saidaCalculada = entrada2Min + faltaTrabalhar

  // ===== CÁLCULO SEM TOLERÂNCIA (8h48min) =====
  // Calcular quantos minutos faltam para completar jornada completa
  const faltaTrabalharCompleto = JORNADA_COMPLETA - periodoManha

  // Calcular horário de saída para jornada completa
  const saidaCalculadaCompleta = entrada2Min + faltaTrabalharCompleto

  // ===== CÁLCULO DO TOTAL TRABALHADO =====
  let totalTrabalhado

  if (saida2) {
    // Se o usuário informou a saída, calcular baseado no horário REAL
    const saida2Min = converterParaMinutos(saida2)
    const periodoTarde = saida2Min - entrada2Min
    totalTrabalhado = periodoManha + periodoTarde
  } else {
    // Se não informou, usar a meta padrão
    totalTrabalhado = META_MINUTOS
  }

  // ===== CÁLCULO DE HORAS EXTRAS =====
  // Horas extras só existem se trabalhar MAIS de 8h48min
  // Se trabalhou entre 8h38min e 8h48min, hora extra = 0
  let horasExtras = 0
  if (totalTrabalhado > JORNADA_COMPLETA) {
    horasExtras = totalTrabalhado - JORNADA_COMPLETA
  }

  return {
    horarioSaida: converterParaHorario(saidaCalculada),
    horarioSaidaSemTolerancia: converterParaHorario(saidaCalculadaCompleta),
    tempoAlmoco: formatarTempo(almoco),
    horasTrabalhadas: formatarTempo(totalTrabalhado),
    horasExtras: formatarTempo(horasExtras)
  }
}