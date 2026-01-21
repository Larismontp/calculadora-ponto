import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

/**
 * Componente que exibe os resultados do cálculo
 * Design completamente redesenhado seguindo referência do Canva com SVG
 * @param {string} horarioSaida - Horário calculado de saída (com tolerância)
 * @param {string} horarioSaidaSemTolerancia - Horário calculado de saída (jornada completa)
 * @param {string} tempoAlmoco - Tempo de almoço formatado
 * @param {string} horasTrabalhadas - Total de horas trabalhadas formatado
 * @param {string} horasExtras - Horas extras trabalhadas formatado
 * @param {number} jornadaMinutos - Jornada configurada em minutos (padrão: 528)
 * @param {number} toleranciaMinutos - Tolerância configurada em minutos (padrão: 10)
 */
function ResultCard({
  horarioSaida,
  horarioSaidaSemTolerancia,
  tempoAlmoco,
  horasTrabalhadas,
  horasExtras,
  jornadaMinutos = 528,
  toleranciaMinutos = 10
}) {
  // Se não tiver horário de saída, não renderiza nada
  if (!horarioSaida) return null

  // Verifica se há horas extras (qualquer valor diferente de "0min")
  const temHoraExtra = horasExtras && horasExtras !== '0min'

  return (
    <div className="space-y-6">
      {/* Título da seção de resultados com SVG de gráfico */}
      <div className="flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-800 text-center">Seus Resultados</h2>
      </div>

      {/* Cards de horários com cores exatas do Canva */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card verde - Saída com tolerância */}
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100 rounded-2xl shadow-md">
          <CardContent className="p-6 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Saída c/ Tolerância
            </p>
            <p className="text-4xl font-bold text-emerald-600">
              {horarioSaida}
            </p>
          </CardContent>
        </Card>

        {/* Card rosa - Jornada completa */}
        <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-100 rounded-2xl shadow-md">
          <CardContent className="p-6 text-center">
            <p className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
              Jornada Completa
            </p>
            <p className="text-4xl font-bold text-red-600">
              {horarioSaidaSemTolerancia}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mensagem motivacional sobre tolerância */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-xl p-4 text-center">
        <p className="text-sm font-medium text-gray-700 italic">
          Isso mesmo camarada, contribua o mínimo com o capitalismo! HAHAHA
        </p>
      </div>

      {/* Seção Resumo do Dia com ícones */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo do Dia</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Tempo de Almoço */}
          <Card className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">☀️</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Tempo de Almoço</p>
                  <p className="text-lg font-bold text-gray-800">{tempoAlmoco}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Trabalhado */}
          <Card className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total Trabalhado</p>
                  <p className="text-lg font-bold text-gray-800">{horasTrabalhadas}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Horas Extras */}
          <Card className={`border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow ${
            temHoraExtra ? 'bg-green-50' : 'bg-white'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Horas Extras</p>
                  <p className={`text-lg font-bold ${temHoraExtra ? 'text-green-600' : 'text-gray-800'}`}>
                    {horasExtras}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="bg-white border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Status</p>
                  <p className="text-lg font-bold text-gray-800">
                    {temHoraExtra ? 'Extra' : 'Normal'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResultCard