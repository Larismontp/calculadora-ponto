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
  // Estados locais temporários - AGORA COMO STRING para melhor controle
  const [jornadaHoras, setJornadaHoras] = useState(Math.floor(jornadaMinutos / 60).toString())
  const [jornadaMin, setJornadaMin] = useState((jornadaMinutos % 60).toString())
  const [tolerancia, setTolerancia] = useState(toleranciaMinutos.toString())
  const [intervaloHoras, setIntervaloHoras] = useState(Math.floor(intervaloMinimoMinutos / 60).toString())
  const [intervaloMin, setIntervaloMin] = useState((intervaloMinimoMinutos % 60).toString())

  // Estados para mensagens de erro
  const [erros, setErros] = useState({})

  /**
   * Valida os valores inseridos
   * @returns {boolean} - true se tudo estiver válido
   */
  const validarCampos = () => {
    const novosErros = {}

    // Validação da jornada (mínimo 4h, máximo 12h)
    const totalJornadaMinutos = (parseInt(jornadaHoras) || 0) * 60 + (parseInt(jornadaMin) || 0)
    if (totalJornadaMinutos < 240) {
      novosErros.jornada = 'Jornada mínima: 4h'
    } else if (totalJornadaMinutos > 720) {
      novosErros.jornada = 'Jornada máxima: 12h'
    }

    // Validação da tolerância (0 a 60 minutos)
    const tolNum = parseInt(tolerancia) || 0
    if (tolNum < 0 || tolNum > 60) {
      novosErros.tolerancia = 'Tolerância deve estar entre 0 e 60 minutos'
    }

    // Validação do intervalo (mínimo 30min para jornadas acima de 6h)
    const totalIntervaloMinutos = (parseInt(intervaloHoras) || 0) * 60 + (parseInt(intervaloMin) || 0)
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
      const novaJornadaMinutos = (parseInt(jornadaHoras) || 0) * 60 + (parseInt(jornadaMin) || 0)
      const novoIntervaloMinutos = (parseInt(intervaloHoras) || 0) * 60 + (parseInt(intervaloMin) || 0)

      onSalvar({
        jornadaMinutos: novaJornadaMinutos,
        toleranciaMinutos: parseInt(tolerancia) || 0,
        intervaloMinimoMinutos: novoIntervaloMinutos
      })
    }
  }

  /**
   * Handler para inputs numéricos - aceita apenas números e valida máximo
   */
  const handleNumericChange = (value, setter, max) => {
    // Remove tudo que não é número
    const numeros = value.replace(/\D/g, '')
    
    // Valida se está dentro do limite
    if (numeros === '' || (parseInt(numeros) >= 0 && parseInt(numeros) <= max)) {
      setter(numeros)
    }
  }

  /**
   * Remove zeros à esquerda quando o campo perde foco
   */
  const handleBlur = (value, setter) => {
    const numero = parseInt(value) || 0
    setter(numero.toString())
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="2"
                    value={jornadaHoras}
                    onChange={(e) => handleNumericChange(e.target.value, setJornadaHoras, 12)}
                    onBlur={(e) => handleBlur(e.target.value, setJornadaHoras)}
                    className="flex-1 text-center"
                  />
                  <span className="text-gray-600 font-medium text-sm">h</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="2"
                    value={jornadaMin}
                    onChange={(e) => handleNumericChange(e.target.value, setJornadaMin, 59)}
                    onBlur={(e) => handleBlur(e.target.value, setJornadaMin)}
                    className="flex-1 text-center"
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
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="2"
                  value={tolerancia}
                  onChange={(e) => handleNumericChange(e.target.value, setTolerancia, 60)}
                  onBlur={(e) => handleBlur(e.target.value, setTolerancia)}
                  className="text-center"
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={intervaloHoras}
                    onChange={(e) => handleNumericChange(e.target.value, setIntervaloHoras, 3)}
                    onBlur={(e) => handleBlur(e.target.value, setIntervaloHoras)}
                    className="flex-1 text-center"
                  />
                  <span className="text-gray-600 font-medium text-sm">h</span>
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="2"
                    value={intervaloMin}
                    onChange={(e) => handleNumericChange(e.target.value, setIntervaloMin, 59)}
                    onBlur={(e) => handleBlur(e.target.value, setIntervaloMin)}
                    className="flex-1 text-center"
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

export default ConfigJornada;