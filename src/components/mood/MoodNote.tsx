'use client'

interface MoodNoteProps {
  note: string
  onNoteChange: (note: string) => void
  placeholder?: string
}

export function MoodNote({ note, onNoteChange, placeholder }: MoodNoteProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground mb-3">
        {placeholder?.includes('optional') ? 'Add a note (optional)' : 'Add a note'}
      </h3>
      <textarea
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder={placeholder || "What's on your mind?"}
        className="w-full p-3 border border-border rounded-lg bg-surface text-foreground placeholder-foreground-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-24 text-sm"
        maxLength={300}
      />
      <div className="text-xs text-foreground-tertiary mt-1 text-right">
        {note.length}/300
      </div>
    </div>
  )
}