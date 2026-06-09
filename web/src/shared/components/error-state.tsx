import { AlertTriangle } from 'lucide-react'

interface ErrorStateProps {
  message?: string
}

export function ErrorState({
  message = 'Something went wrong.',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-red-500" />

      <h3 className="text-lg font-semibold">
        Error
      </h3>

      <p className="text-muted-foreground mt-2 text-sm">
        {message}
      </p>
    </div>
  )
}