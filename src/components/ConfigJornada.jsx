import { useState } from 'react'

/**
 * Componente para configurar parâmetros da jornada de trabalho
 * @param {number} jornadaMinutos - Jornada diária em minutos
 * @param {number} toleranciaMinutos - Tolerância em minutos
 * @param {number} intervaloMinimoMinutos - Intervalo mínimo em minutos
 * @param {function} onSalvar - Callback chamado ao salvar configurações
 */
function ConfigJornada({ jornadaMinutos, toleranciaMinutos, intervaloMinimoMinutos, onSalvar }) {
  // Estado para controlar se o painel está aberto
  const [isAberto, setIsAberto] = useState(false)

  // Estados locais temporários para os campos de entrada
  const [jornadaHoras, setJornadaHoras] = useState(Math.floor(jornadaMinutos / 60))
  const [jornadaMin, setJornadaMin] = useState(jornadaMinutos % 60)
  const [tolerancia, setTolerancia] = useState(toleranciaMinutos)
  const [intervaloHoras, setIntervaloHoras] = useState(Math.floor(intervaloMinimoMinutos / 60))
  const [intervaloMin, setIntervaloMin] = useState(intervaloMinimoMinutos % 60)

  // Estados para mensagens de erro
  const [erros, setErros] = useState({})

  /**
   * Valida os valores inseridos
   * @returns {boolean} - true se tudo estiver válido
   */
  const validarCampos = () => {
    const novosErros = {}

    // Validação da jornada (mínimo 4h, máximo 12h)
    const totalJornadaMinutos = jornadaHoras * 60 + jornadaMin
    if (totalJornadaMinutos < 240) {
      novosErros.jornada = 'Jornada mínima: 4h'
    } else if (totalJornadaMinutos > 720) {
      novosErros.jornada = 'Jornada máxima: 12h'
    }

    // Validação da tolerância (0 a 60 minutos)
    if (tolerancia < 0 || tolerancia > 60) {
      novosErros.tolerancia = 'Tolerância deve estar entre 0 e 60 minutos'
    }

    // Validação do intervalo (mínimo 30min para jornadas acima de 6h)
    const totalIntervaloMinutos = intervaloHoras * 60 + intervaloMin
    if (totalJornadaMinutos > 360 && totalIntervaloMinutos < 30) {
      novosErros.intervalo = 'Intervalo mínimo: 30min para jornadas acima de 6h'
    }

    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  /**
   * Aplica as configurações ao pressionar o botão
   */
  const handleAplicar = () => {
    if (validarCampos()) {
      const novaJornadaMinutos = jornadaHoras * 60 + jornadaMin
      const novoIntervaloMinutos = intervaloHoras * 60 + intervaloMin

      onSalvar({
        jornadaMinutos: novaJornadaMinutos,
        toleranciaMinutos: tolerancia,
        intervaloMinimoMinutos: novoIntervaloMinutos
      })

      setIsAberto(false)
    }
  }

  /**
   * Limita valores numéricos em inputs
   */
  const limitarValor = (valor, min, max) => {
    const num = parseInt(valor) || 0
    return Math.max(min, Math.min(max, num))
  }

  return (
    <div className="mb-6">
      {/* Botão para expandir/colapsar */}
      <button
        onClick={() => setIsAberto(!isAberto)}
        className="w-full flex items-center justify-between bg-gradient-to-r from-gray-100 to-gray-50
                   hover:from-gray-200 hover:to-gray-100
                   border-2 border-gray-300 hover:border-primary-400
                   rounded-xl p-4 transition-all duration-200
                   shadow-sm hover:shadow-md group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isAberto ? '▼' : '⚙️'}</span>
          <span className="font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
            Configurar Jornada
          </span>
        </div>
        <span className="text-xs text-gray-500 font-medium">
          {isAberto ? 'Clique para fechar' : 'Clique para abrir'}
        </span>
      </button>

      {/* Painel de configuração (exibido quando aberto) */}
      {isAberto && (
        <div className="mt-3 bg-gradient-to-br from-blue-50 via-white to-indigo-50
                        border-2 border-blue-200 rounded-xl p-5 space-y-4
                        animate-slide-up shadow-lg">

          {/* Jornada diária */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-lg">📋</span>
              Jornada diária
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={jornadaHoras}
                onChange={(e) => setJornadaHoras(limitarValor(e.target.value, 0, 12))}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                           outline-none transition-all"
                min="0"
                max="12"
              />
              <span className="text-gray-600 font-medium">h</span>
              <input
                type="number"
                value={jornadaMin}
                onChange={(e) => setJornadaMin(limitarValor(e.target.value, 0, 59))}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                           outline-none transition-all"
                min="0"
                max="59"
              />
              <span className="text-gray-600 font-medium">min</span>
            </div>
            {erros.jornada && (
              <p className="text-red-500 text-xs mt-1 font-medium">{erros.jornada}</p>
            )}
          </div>

          {/* Tolerância */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-lg">⏰</span>
              Tolerância (minutos)
            </label>
            <input
              type="number"
              value={tolerancia}
              onChange={(e) => setTolerancia(limitarValor(e.target.value, 0, 60))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg
                         focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                         outline-none transition-all"
              min="0"
              max="60"
            />
            {erros.tolerancia && (
              <p className="text-red-500 text-xs mt-1 font-medium">{erros.tolerancia}</p>
            )}
          </div>

          {/* Intervalo mínimo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <span className="text-lg">🍽️</span>
              Intervalo mínimo
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                value={intervaloHoras}
                onChange={(e) => setIntervaloHoras(limitarValor(e.target.value, 0, 3))}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                           outline-none transition-all"
                min="0"
                max="3"
              />
              <span className="text-gray-600 font-medium">h</span>
              <input
                type="number"
                value={intervaloMin}
                onChange={(e) => setIntervaloMin(limitarValor(e.target.value, 0, 59))}
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg
                           focus:border-primary-500 focus:ring-2 focus:ring-primary-200
                           outline-none transition-all"
                min="0"
                max="59"
              />
              <span className="text-gray-600 font-medium">min</span>
            </div>
            {erros.intervalo && (
              <p className="text-red-500 text-xs mt-1 font-medium">{erros.intervalo}</p>
            )}
          </div>

          {/* Botão aplicar */}
          <button
            onClick={handleAplicar}
            className="w-full bg-gradient-to-r from-green-500 to-green-600
                       hover:from-green-600 hover:to-green-700
                       text-white font-semibold py-3 rounded-lg
                       transition-all duration-200
                       shadow-md hover:shadow-lg hover:shadow-green-500/50
                       active:scale-95
                       flex items-center justify-center gap-2"
          >
            <span>✅</span>
            Aplicar Configurações
          </button>

          {/* Informação sobre valores padrão */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
            💡 Valores padrão: 8h48min jornada, 10min tolerância, 1h12min intervalo
          </div>
        </div>
      )}
    </div>
  )
}

export default ConfigJornada
