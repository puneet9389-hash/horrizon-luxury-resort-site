/**
 * Blink UI Compatibility Layer
 * Provides Blink UI components wrapped with Radix UI/Tailwind CSS
 * This allows gradual migration from Blink UI to custom components
 */
import React from 'react'
import { toast as toastUtil } from '@/lib/ui-utils'

// Re-export toast utility
export const toast = toastUtil

// Page layout components
export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
)

export const PageHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-8 ${className}`}>{children}</div>
)

export const PageTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h1 className={`text-3xl font-bold text-white ${className}`}>{children}</h1>
)

export const PageBody: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
)

// Card components
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-slate-900 rounded-xl border border-slate-800 overflow-hidden ${className}`}>{children}</div>
)

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-slate-800 ${className}`}>{children}</div>
)

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-lg font-semibold text-white ${className}`}>{children}</h2>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
)

// Form components
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { className?: string }> = (props) => (
  <input
    {...props}
    className={`w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${props.className || ''}`}
  />
)

export const Field: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-2 ${className}`}>{children}</div>
)

export const FieldLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <label className={`text-sm font-medium text-white ${className}`}>{children}</label>
)

export const FieldDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <p className={`text-xs text-slate-400 ${className}`}>{children}</p>
)

// Button component
export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'outline'; className?: string }
> = ({ children, variant = 'default', className = '', ...props }) => {
  const variants = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white border-0',
    outline: 'bg-transparent border border-slate-700 text-white hover:bg-slate-800',
  }
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

// Badge component
export const Badge: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; className?: string }> = ({
  children,
  style,
  className = '',
}) => (
  <span
    style={style}
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-white ${className}`}
  >
    {children}
  </span>
)

// Tab components
export const Tabs: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
)

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`flex border-b border-slate-700 gap-4 ${className}`}>{children}</div>
)

export const TabsTrigger: React.FC<{ children: React.ReactNode; value?: string; className?: string; onClick?: () => void }> = ({
  children,
  onClick,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 border-transparent hover:border-blue-500 text-slate-400 hover:text-white transition-colors ${className}`}
  >
    {children}
  </button>
)

export const TabsContent: React.FC<{ children: React.ReactNode; value?: string; className?: string }> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
)

// Table/DataTable components
export const DataTable: React.FC<{ columns?: any[]; data?: any[]; className?: string }> = ({ columns = [], data = [], className = '' }) => (
  <div className={`overflow-x-auto rounded-lg border border-slate-700 ${className}`}>
    <table className="w-full text-sm">
      <thead className="bg-slate-800 border-b border-slate-700">
        <tr>
          {columns.map((col, idx) => (
            <th key={idx} className="px-4 py-3 text-left font-semibold text-white">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={rowIdx} className="border-b border-slate-700 hover:bg-slate-800/50">
            {columns.map((col, colIdx) => (
              <td key={colIdx} className="px-4 py-3 text-slate-300">
                {col.cell ? col.cell({ row: { original: row } }) : row[col.accessorKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// Empty state component
export const EmptyState: React.FC<{ icon?: React.ReactNode; title: string; description: string; className?: string }> = ({
  icon,
  title,
  description,
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
    {icon && <div className="mb-4 text-slate-400">{icon}</div>}
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-slate-400 text-sm">{description}</p>
  </div>
)

// Dialog components
export const Dialog: React.FC<{ children: React.ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }> = ({
  children,
  open,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = React.useState(open || false)

  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open)
  }, [open])

  if (!isOpen) return null

  const handleClose = () => {
    setIsOpen(false)
    onOpenChange?.(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleClose} />
      <div className="relative z-50 bg-slate-900 rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  )
}

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`p-6 ${className}`}>{children}</div>

export const DialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
)

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold text-white ${className}`}>{children}</h2>
)
