/**
 * Componente do cabeçalho da aplicação
 */
function Header() {
  return (
    <header className="text-center mb-8 animate-fade-in">
      {/* Container do ícone com animação */}
      <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300">
        <span className="text-5xl animate-pulse-slow">⏰</span>
      </div>
      
      {/* Título com gradiente */}
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-3">
        Calculadora de Horário
      </h1>
      
      {/* Meta */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <p className="text-gray-700 text-lg font-semibold px-3">
          Meta: <span className="text-primary-600 text-xl font-bold">8h38min</span>
        </p>
      </div>
      
      {/* Subtítulo com gradiente e emoji */}
      <div className="h-px flex bg-gradient-to-r from-transparent via-primary-300 to-transparent"></div>
      
      <p className="text-gray-500 text-xs italic">
        Contribua o mínimo com o capitalismo!
      </p>
    </header>
  );
}

export default Header;