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

  //estado para armazenar erro de intervalo minimo
  const [erroIntervalo, setErroIntervalo] = useState("");

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
   * Valida se o intervalo de almoço está dentro das regras da CLT
   */
  const validarIntervalo = () => {
    if (!saida1 || !entrada2) {
      setErroIntervalo("");
      return true;
    }

    const saida1Min =
      parseInt(saida1.split(":")[0]) * 60 + parseInt(saida1.split(":")[1]);
    const entrada2Min =
      parseInt(entrada2.split(":")[0]) * 60 + parseInt(entrada2.split(":")[1]);
    const intervaloReal = entrada2Min - saida1Min;

    // Valida conforme CLT
    if (jornadaMinutos > 480 && intervaloReal < 60) {
      setErroIntervalo(
        "⚠️ CLT: Jornada acima de 8h exige intervalo mínimo de 1 hora",
      );
      return false;
    } else if (
      jornadaMinutos > 240 &&
      jornadaMinutos <= 360 &&
      intervaloReal < 15
    ) {
      setErroIntervalo(
        "⚠️ CLT: Jornada entre 4h e 6h exige intervalo mínimo de 15 minutos",
      );
      return false;
    } else {
      setErroIntervalo("");
      return true;
    }
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
                  label="Entrada"
                  color="emerald"
                  value={entrada1}
                  onChange={(e) => setEntrada1(e.target.value)}
                />
                <TimeInput
                  label="Saída pro almoço"
                  color="amber"
                  value={saida1}
                  onChange={(e) => {
                    setSaida1(e.target.value);
                    setTimeout(() => validarIntervalo(), 100);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-8">
                <TimeInput
                  label="Retorno do almoço"
                  color="blue"
                  value={entrada2}
                  onChange={(e) => {
                    setEntrada2(e.target.value);
                    setTimeout(() => validarIntervalo(), 100);
                  }}
                />
                <TimeInput
                  label="Fim do expediente"
                  color="purple"
                  value={saida2}
                  onChange={(e) => setSaida2(e.target.value)}
                />
              </div>
            </div>

            {/* Mensagem de aviso do intervalo */}
            {erroIntervalo && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-xs text-red-700 font-medium">{erroIntervalo}</p>
              </div>
            )}

            {/* Botões */}
            <Button
              onClick={handleCalcular}
              disabled={isCalculating || !entrada1 || !saida1 || !entrada2 || erroIntervalo}
              className="w-full mb-2 py-4 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white h-auto rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
