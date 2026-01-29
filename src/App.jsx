import { useState } from "react";
import Header from "./components/Header";
import TimeInput from "./components/TimeInput";
import ResultCard from "./components/ResultCard";
import ConfigJornada from "./components/ConfigJornada";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { calcularHorarioSaida } from "./utils/timeCalculations";

/**
 * Componente principal da aplicação
 * Responsável por gerenciar o estado e orquestrar os componentes filhos
 */
function App() {
  // Estados para armazenar os horários digitados pelo usuário
  const [entrada1, setEntrada1] = useState("");
  const [saida1, setSaida1] = useState("");
  const [entrada2, setEntrada2] = useState("");
  const [saida2, setSaida2] = useState("");

  // Estado para controlar loading da animação
  const [isCalculating, setIsCalculating] = useState(false);

  // Estados para configuração de jornada (valores padrão mantêm comportamento atual)
  const [jornadaMinutos, setJornadaMinutos] = useState(528); // 8h48min
  const [toleranciaMinutos, setToleranciaMinutos] = useState(10); // 10min
  const [intervaloMinimoMinutos, setIntervaloMinimoMinutos] = useState(72); // 1h12min

  // Estados para armazenar os resultados dos cálculos
  const [resultados, setResultados] = useState({
    horarioSaida: "",
    horarioSaidaSemTolerancia: "",
    tempoAlmoco: "",
    horasTrabalhadas: "",
    horasExtras: "",
  });

  /**
   * Função que salva as novas configurações de jornada
   * @param {Object} config - Objeto com as novas configurações
   */
  const handleSalvarConfig = (config) => {
    setJornadaMinutos(config.jornadaMinutos);
    setToleranciaMinutos(config.toleranciaMinutos);
    setIntervaloMinimoMinutos(config.intervaloMinimoMinutos);

    // Recalcula automaticamente se já houver horários preenchidos
    if (entrada1 && saida1 && entrada2) {
      handleCalcular();
    }
  };

  /**
   * Função que processa o cálculo do horário de saída
   * Chama a função utilitária e atualiza o estado com os resultados
   */
  const handleCalcular = () => {
    // Ativa animação de loading
    setIsCalculating(true);

    // Simula um pequeno delay para mostrar a animação
    setTimeout(() => {
      const resultado = calcularHorarioSaida({
        entrada1,
        saida1,
        entrada2,
        saida2, // Passa o horário real de saída se foi preenchido
        jornadaMinutos,
        toleranciaMinutos,
        intervaloMinimoMinutos,
      });

      setResultados(resultado);

      // Só preenche automaticamente se o usuário NÃO digitou
      if (!saida2) {
        setSaida2(resultado.horarioSaida);
      }

      setIsCalculating(false);
    }, 500);
  };

  /**
   * Função que limpa todos os campos e resultados
   */
  const handleLimpar = () => {
    setEntrada1("");
    setSaida1("");
    setEntrada2("");
    setSaida2("");
    setResultados({
      horarioSaida: "",
      horarioSaidaSemTolerancia: "",
      tempoAlmoco: "",
      horasTrabalhadas: "",
      horasExtras: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50/30 to-orange-50/40 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md space-y-6">
        {/* Cabeçalho */}
        <Header />

        {/* Configuração de Jornada (Accordion colapsável) */}
        <ConfigJornada
          jornadaMinutos={jornadaMinutos}
          toleranciaMinutos={toleranciaMinutos}
          intervaloMinimoMinutos={intervaloMinimoMinutos}
          onSalvar={handleSalvarConfig}
        />

        {/* Card de Registro de Pontos - FUNDO BRANCO! */}
        <Card className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header do card */}
          <div className="px-5 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {/* Ícone com fundo verde */}
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              {/* Texto */}
              <div className="text-left">
                <h3 className="font-semibold text-slate-800">
                  Registrar Pontos
                </h3>
                <p className="text-xs text-slate-500">
                  Informe seus horários do dia
                </p>
              </div>
            </div>
          </div>

          {/* Conteúdo do card */}
          <div className="p-6 space-y-5">
            <div className="space-y-4">
            {/* Grid 2 colunas */}
            <div className="grid grid-cols-2 gap-8">
              <TimeInput
                label="1ª Entrada"
                color="emerald"
                value={entrada1}
                onChange={(e) => setEntrada1(e.target.value)}
              />
              <TimeInput
                label="1ª Saída"
                color="amber"
                value={saida1}
                onChange={(e) => setSaida1(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <TimeInput
                label="2ª Entrada"
                color="blue"
                value={entrada2}
                onChange={(e) => setEntrada2(e.target.value)}
              />
              <TimeInput
                label="2ª Saída"
                color="purple"
                value={saida2}
                onChange={(e) => setSaida2(e.target.value)}
              />
            </div>
            </div>

            {/* Botões */}
            <Button
              onClick={handleCalcular}
              disabled={isCalculating}
              className="w-full mb-2 py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white h-auto rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2"
            >
              {/* Ícone de calculadora BRANCO */}
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {isCalculating ? "Calculando..." : "Calcular Horários"}
            </Button>

            <Button
              onClick={handleLimpar}
              variant="outline"
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl"
            >
              Limpar Campos
            </Button>
          </div>
        </Card>

        {/* Card de resultados */}
        <ResultCard
          horarioSaida={resultados.horarioSaida}
          horarioSaidaSemTolerancia={resultados.horarioSaidaSemTolerancia}
          tempoAlmoco={resultados.tempoAlmoco}
          horasTrabalhadas={resultados.horasTrabalhadas}
          horasExtras={resultados.horasExtras}
          jornadaMinutos={jornadaMinutos}
          toleranciaMinutos={toleranciaMinutos}
        />

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 pb-4">
          Feito com ❤️ para simplificar seu dia
        </footer>
      </div>
    </div>
  );
}

export default App;
