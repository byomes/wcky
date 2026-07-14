interface Commitment {
  id: number
  commitment_number: number
  commitment_text: string
  is_checked: number
}

export default function CommitmentsPreview({ commitments }: { commitments: Commitment[] }) {
  return (
    <ol className="space-y-3">
      {commitments.map((c) => (
        <li key={c.id} className="flex gap-3 items-start text-sm">
          <span className="shrink-0 w-6 h-6 flex items-center justify-center border border-gold-600/40 text-gold-500 text-xs font-bold font-serif mt-0.5">
            {c.commitment_number}
          </span>
          <span className={`leading-relaxed ${c.is_checked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
            {c.commitment_text}
          </span>
        </li>
      ))}
    </ol>
  )
}
