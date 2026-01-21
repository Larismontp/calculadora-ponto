import { useState } from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

/**
 * Componente para configurar parâmetros da jornada de trabalho
 * Design redesenhado com Accordion rosa claro
 * @param {number} jornadaMinutos - Jornada diária em minutos
 * @param {number} toleranciaMinutos - Tolerância em minutos
 * @param {number} intervaloMinimoMinutos - Intervalo mínimo em minutos
 * @param {function} onSalvar - Callback chamado ao salvar configurações
 */
function ConfigJornada({ jornadaMinutos, toleranciaMinutos, intervaloMinimoMinutos, onSalvar }) {
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
      {/* Accordion rosa claro colapsável */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="config" className="border-none">
          <AccordionTrigger className="bg-pink-50 border border-pink-100 hover:bg-pink-100 rounded-2xl px-5 py-4 hover:no-underline transition-colors shadow-sm">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="font-semibold text-gray-800">Configurar Jornada</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="bg-white rounded-2xl p-5 space-y-4 shadow-sm">
              {/* Jornada diária */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-lg">📋</span>
                  Jornada diária
                </Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={jornadaHoras}
                    onChange={(e) => setJornadaHoras(limitarValor(e.target.value, 0, 12))}
                    className="flex-1"
                    min="0"
                    max="12"
                  />
                  <span className="text-gray-600 font-medium text-sm">h</span>
                  <Input
                    type="number"
                    value={jornadaMin}
                    onChange={(e) => setJornadaMin(limitarValor(e.target.value, 0, 59))}
                    className="flex-1"
                    min="0"
                    max="59"
                  />
                  <span className="text-gray-600 font-medium text-sm">min</span>
                </div>
                {erros.jornada && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{erros.jornada}</p>
                )}
              </div>

              {/* Tolerância */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-lg">⏰</span>
                  Tolerância (minutos)
                </Label>
                <Input
                  type="number"
                  value={tolerancia}
                  onChange={(e) => setTolerancia(limitarValor(e.target.value, 0, 60))}
                  min="0"
                  max="60"
                />
                {erros.tolerancia && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{erros.tolerancia}</p>
                )}
              </div>

              {/* Intervalo mínimo */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <span className="text-lg">🍽️</span>
                  Intervalo mínimo
                </Label>
                <div className="flex gap-2 items-center">
                  <Input
                    type="number"
                    value={intervaloHoras}
                    onChange={(e) => setIntervaloHoras(limitarValor(e.target.value, 0, 3))}
                    className="flex-1"
                    min="0"
                    max="3"
                  />
                  <span className="text-gray-600 font-medium text-sm">h</span>
                  <Input
                    type="number"
                    value={intervaloMin}
                    onChange={(e) => setIntervaloMin(limitarValor(e.target.value, 0, 59))}
                    className="flex-1"
                    min="0"
                    max="59"
                  />
                  <span className="text-gray-600 font-medium text-sm">min</span>
                </div>
                {erros.intervalo && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{erros.intervalo}</p>
                )}
              </div>

              {/* Botão aplicar */}
              <Button
                onClick={handleAplicar}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Aplicar Configurações
              </Button>

              {/* Informação sobre valores padrão */}
              <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
                💡 Valores padrão: 8h48min jornada, 10min tolerância, 1h12min intervalo
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default ConfigJornada
