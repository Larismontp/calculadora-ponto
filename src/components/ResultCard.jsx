/**
 * Componente que exibe os resultados do cálculo
 * @param {string} horarioSaida - Horário calculado de saída
 * @param {string} tempoAlmoco - Tempo de almoço formatado
 * @param {string} horasTrabalhadas - Total de horas trabalhadas formatado
 */
function ResultCard({ horarioSaida, tempoAlmoco, horasTrabalhadas }) {
  // Se não tiver horário de saída, não renderiza nada
  if (!horarioSaida) return null

  return (
    <div className="bg-gradient-to-br from-flame-50 via-white to-crimson-50 rounded-2xl p-6 space-y-4 border-2 border-flame-300 shadow-lg animate-slide-up hover:shadow-xl hover:shadow-flame-200/50 transition-all duration-300">

      {/* Horário de saída sugerido */}
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2 font-medium">
          🎯 Horário de saída indicado:
        </p>
        <div className="bg-gradient-to-r from-flame-600 to-crimson-600 rounded-xl p-4 animate-pulse-slow">
          <p className="text-5xl font-bold text-black tracking-wider drop-shadow-lg">
            {horarioSaida}
          </p>
        </div>
      </div>

      {/* Linha divisória */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-flame-300 to-transparent"></div>
        <span className="text-flame-600 text-xs font-semibold">RESUMO</span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-flame-300 to-transparent"></div>
      </div>

      {/* Informações adicionais */}
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-flame-200 hover:border-flame-400 transition-colors">
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <span className="text-lg">⏱️</span>
            Tempo de almoço:
          </span>
          <span className="font-bold text-flame-600 text-lg">{tempoAlmoco}</span>
        </div>
        <div className="flex justify-between items-center bg-white rounded-lg p-3 border border-flame-200 hover:border-flame-400 transition-colors">
          <span className="text-gray-700 font-medium flex items-center gap-2">
            <span className="text-lg">✅</span>
            Horas trabalhadas:
          </span>
          <span className="font-bold text-flame-600 text-lg">{horasTrabalhadas}</span>
        </div>
      </div>

    </div>
  )
}

export default ResultCard