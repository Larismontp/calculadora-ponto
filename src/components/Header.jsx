/**
 * Componente do cabeçalho da aplicação
 * Design redesenhado seguindo referência do Canva com SVG
 */
function Header() {
  return (
    <header className="text-center mb-6">
      {/* Logo: Círculo vermelho arredondado com relógio SVG branco */}
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-red-600 rounded-2xl shadow-lg">
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      {/* Título principal */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
        Meu Ponto
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm mb-4">
        Controle inteligente de jornada
      </p>

      {/* Linha laranja/vermelha separadora */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-rose-600 rounded-full mb-6"></div>
    </header>
  );
}

export default Header;