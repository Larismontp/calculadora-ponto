import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Componente de input para horários
 * Design redesenhado com bolinhas coloridas
 * @param {string} label - Texto do label
 * @param {string} dotColor - Cor da bolinha (emerald, amber, blue, purple)
 * @param {string} value - Valor atual do input
 * @param {function} onChange - Função chamada quando o valor muda
 * @param {string} placeholder - Placeholder opcional
 */
function TimeInput({ label, color, value, onChange }) {
  const colorClasses = {
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    blue: 'bg-blue-400',
    purple: 'bg-purple-400'
  }

  return (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1.5 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 ${colorClasses[color]} rounded-full`}></span>
        {label}
      </label>
      <input
        type="time"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-center focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-100 transition-all outline-none"
      />
    </div>
  )
}

export default TimeInput;