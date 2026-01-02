import { useState } from 'react'
import Header from './components/Header'
import TimeInput from './components/TimeInput'
import ResultCard from './components/ResultCard'
import { calcularHorarioSaida } from './utils/timeCalculations'

/**
 * Componente principal da aplicação
 * Responsável por gerenciar o estado e orquestrar os componentes filhos
 */
function App() {
  // Estados para armazenar os horários digitados pelo usuário
  const [entrada1, setEntrada1] = useState('')
  const [saida1, setSaida1] = useState('')
  const [entrada2, setEntrada2] = useState('')
  const [saida2, setSaida2] = useState('')
  
  // Estado para controlar loading da animação
  const [isCalculating, setIsCalculating] = useState(false)
  
  // Estados para armazenar os resultados dos cálculos
  const [resultados, setResultados] = useState({
    horarioSaida: '',
    tempoAlmoco: '',
    horasTrabalhadas: ''
  })

  /**
   * Função que processa o cálculo do horário de saída
   * Chama a função utilitária e atualiza o estado com os resultados
   */
  const handleCalcular = () => {
    // Ativa animação de loading
    setIsCalculating(true)
    
    // Simula um pequeno delay para mostrar a animação
    setTimeout(() => {
      const resultado = calcularHorarioSaida({
        entrada1,
        saida1,
        entrada2
      })
      
      setResultados(resultado)
      setSaida2(resultado.horarioSaida) // Preenche automaticamente o campo de saída
      setIsCalculating(false)
    }, 500)
  }

  /**
   * Função que limpa todos os campos e resultados
   */
  const handleLimpar = () => {
    setEntrada1('')
    setSaida1('')
    setEntrada2('')
    setSaida2('')
    setResultados({
      horarioSaida: '',
      tempoAlmoco: '',
      horasTrabalhadas: ''
    })
  }

  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 hover:shadow-primary-500/20">

        {/* Cabeçalho */}
        <Header />

        {/* Formulário de inputs */}
        <div className="space-y-4 mb-6">
          
          <TimeInput
            label="1ª Entrada"
            icon="🌅"
            value={entrada1}
            onChange={(e) => setEntrada1(e.target.value)}
          />

          <TimeInput
            label="1ª Saída (Almoço)"
            icon="🍽️"
            value={saida1}
            onChange={(e) => setSaida1(e.target.value)}
          />

          <TimeInput
            label="2ª Entrada (Volta)"
            icon="🔙"
            value={entrada2}
            onChange={(e) => setEntrada2(e.target.value)}
          />

          <TimeInput
            label="2ª Saída (Fim do Expediente)"
            icon="🏠"
            value={saida2}
            onChange={(e) => setSaida2(e.target.value)}
            placeholder={resultados.horarioSaida}
          />

        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleCalcular}
            disabled={isCalculating}
            className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 rounded-xl font-semibold 
                       hover:from-primary-600 hover:to-primary-700 
                       active:scale-95 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 
                       shadow-lg hover:shadow-xl hover:shadow-primary-500/50
                       flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculando...
              </>
            ) : (
              <>⚡ Calcular</>
            )}
          </button>
          
          <button
            onClick={handleLimpar}
            className="px-6 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold 
                       hover:bg-gray-200 
                       active:scale-95 
                       transition-all duration-200 
                       border-2 border-gray-300 hover:border-gray-400"
          >
            🗑️ Limpar
          </button>
        </div>

        {/* Card de resultados */}
        <ResultCard
          horarioSaida={resultados.horarioSaida}
          tempoAlmoco={resultados.tempoAlmoco}
          horasTrabalhadas={resultados.horasTrabalhadas}
        />

      </div>
    </div>
  )
}

export default App