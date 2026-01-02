/**
 * Componente de input para horários
 * @param {string} label - Texto do label
 * @param {string} icon - Emoji do ícone
 * @param {string} value - Valor atual do input
 * @param {function} onChange - Função chamada quando o valor muda
 * @param {string} placeholder - Placeholder opcional
 */
function TimeInput({ label, icon, value, onChange, placeholder }) {
  return (
    <div className="group animate-slide-up">
      {/* Label com ícone */}
      <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2 group-hover:text-primary-600 transition-colors duration-200">
        <span className="text-xl transition-transform group-hover:scale-110">{icon}</span>
        {label}
      </label>
      
      {/* Input estilizado */}
      <input
        type="time"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 text-lg font-medium text-gray-800 
                   bg-white border-2 border-gray-300 rounded-xl
                   focus:border-primary-500 focus:ring-4 focus:ring-primary-100 
                   hover:border-primary-300
                   transition-all duration-200 
                   shadow-sm hover:shadow-md
                   focus:outline-none
                   placeholder:text-gray-400"
      />
    </div>
  );
}

export default TimeInput;