/**
 * Componente que exibe os resultados do cálculo
 * @param {string} horarioSaida - Horário calculado de saída (com tolerância)
 * @param {string} horarioSaidaSemTolerancia - Horário calculado de saída (jornada completa)
 * @param {string} tempoAlmoco - Tempo de almoço formatado
 * @param {string} horasTrabalhadas - Total de horas trabalhadas formatado
 * @param {string} horasExtras - Horas extras trabalhadas formatado
 */
function ResultCard({ horarioSaida, horarioSaidaSemTolerancia, tempoAlmoco, horasTrabalhadas, horasExtras }) {
  // Se não tiver horário de saída, não renderiza nada
  if (!horarioSaida) return null

  // Verifica se há horas extras (qualquer valor diferente de "0min")
  const temHoraExtra = horasExtras && horasExtras !== '0min'

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50 rounded-2xl p-6 space-y-4 border-2 border-primary-200 shadow-lg animate-slide-up hover:shadow-xl hover:shadow-primary-200/50 transition-all duration-300">

      {/* Horário de saída com tolerância */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          ✅ Horário de saída (com tolerância - 8h38min):
        </p>
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 animate-pulse-slow">
          <p className="text-5xl font-bold text-white tracking-wider drop-shadow-lg">
            {horarioSaida}
          </p>
        </div>
      </div>

      {/* Horário de saída sem tolerância */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          ⏰ Horário de saída (jornada completa - 8h48min):
        </p>
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-3">
          <p className="text-3xl font-bold text-white tracking-wider drop-shadow-lg">
            {horarioSaidaSemTolerancia}
          </p>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
        <span className="text-primary-600 text-xs font-semibold">RESUMO</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
      </div>

      {/* Informações adicionais */}
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-primary-200 hover:border-primary-400 transition-colors">
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <span className="text-lg">🍽️</span>
            Tempo de almoço:
          </span>
          <span className="font-bold text-primary-600 text-lg">{tempoAlmoco}</span>
        </div>
        <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-primary-200 hover:border-primary-400 transition-colors">
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <span className="text-lg">⏱️</span>
            Total de horas trabalhadas:
          </span>
          <span className="font-bold text-primary-600 text-lg">{horasTrabalhadas}</span>
        </div>

        {/* Card de horas extras com destaque condicional */}
        <div className={`flex justify-between items-center rounded-lg p-3 border transition-all duration-300 ${
          temHoraExtra
            ? 'bg-green-50 border-green-400 hover:border-green-500 animate-pulse-slow shadow-md shadow-green-200/50'
            : 'bg-white border-gray-200 hover:border-gray-300'
        }`}>
          <span className={`font-medium flex items-center gap-2 ${
            temHoraExtra ? 'text-green-700' : 'text-gray-500'
          }`}>
            <span className="text-lg">💰</span>
            Horas extras:
          </span>
          <span className={`font-bold text-lg ${
            temHoraExtra ? 'text-green-600' : 'text-gray-500'
          }`}>
            {horasExtras}
          </span>
        </div>
      </div>

    </div>
  )
}

export default ResultCard