'use client'

import { useCallback, useEffect, useMemo, useState, FormEvent } from 'react'
import {
  Star, Bookmark, Archive, RotateCcw, Lock, Unlock, Search,
  MapPin, Phone, Globe, Mail, ChefHat, Plus,
} from 'lucide-react'
import type { Retreat, RetreatStatus, FitRating } from '@/lib/retreats-types'

const UNLOCK_HINT_KEY = 'retreats_unlocked_hint'

const STATUS_LABEL: Record<RetreatStatus, string> = {
  candidate: 'Candidate',
  saved: 'Saved',
  starred: 'Starred',
  archived: 'Archived',
}

const STATUS_PILL_CLASS: Record<RetreatStatus, string> = {
  candidate: 'bg-navy-800 text-slate-400 border border-navy-700',
  saved: 'bg-gold-500/15 text-gold-400 border border-gold-600/40',
  starred: 'bg-gold-500 text-navy-950 border border-gold-500',
  archived: 'bg-navy-900 text-slate-600 border border-navy-800',
}

const FIT_DOT_CLASS: Record<FitRating, string> = {
  good: 'bg-emerald-400',
  warn: 'bg-amber-400',
  bad: 'bg-rose-400',
}

const FIT_LABEL: Record<FitRating, string> = {
  good: 'Good fit',
  warn: 'Worth a look',
  bad: 'Poor fit',
}

function fmtDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return iso
  }
}

interface AddFormState {
  name: string
  location: string
  distance_miles: string
  drive_time: string
  price: string
  capacity: string
  notes: string
  website: string
  phone: string
}

const EMPTY_ADD_FORM: AddFormState = {
  name: '',
  location: '',
  distance_miles: '',
  drive_time: '',
  price: '',
  capacity: '',
  notes: '',
  website: '',
  phone: '',
}

export default function RetreatsBoard() {
  const [listings, setListings] = useState<Retreat[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [statusFilter, setStatusFilter] = useState<string>('')
  const [fitFilter, setFitFilter] = useState<string>('')
  const [maxDistance, setMaxDistance] = useState<string>('')
  const [search, setSearch] = useState('')

  const [unlocked, setUnlocked] = useState(false)
  const [showUnlock, setShowUnlock] = useState(false)
  const [passphrase, setPassphrase] = useState('')
  const [unlockError, setUnlockError] = useState('')
  const [unlocking, setUnlocking] = useState(false)

  const [patchingId, setPatchingId] = useState<string | null>(null)

  const [showAddForm, setShowAddForm] = useState(false)
  const [addForm, setAddForm] = useState<AddFormState>(EMPTY_ADD_FORM)
  const [addSubmitting, setAddSubmitting] = useState(false)
  const [addError, setAddError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem(UNLOCK_HINT_KEY) === '1') {
      setUnlocked(true)
    }
  }, [])

  const fetchListings = useCallback(async () => {
    setLoading(true)
    setLoadError('')
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    if (fitFilter) params.set('fit_rating', fitFilter)
    if (maxDistance) params.set('max_distance', maxDistance)

    try {
      const res = await fetch(`/api/retreats?${params.toString()}`, { cache: 'no-store' })
      if (!res.ok) throw new Error('failed')
      const data = await res.json()
      setListings(data.listings ?? [])
    } catch {
      setLoadError('Could not load retreats. Try refreshing.')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, fitFilter, maxDistance])

  useEffect(() => {
    fetchListings()
  }, [fetchListings])

  const visibleListings = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return listings
    return listings.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        (l.location ?? '').toLowerCase().includes(q),
    )
  }, [listings, search])

  async function handleUnlock(e: FormEvent) {
    e.preventDefault()
    setUnlocking(true)
    setUnlockError('')
    try {
      const res = await fetch('/api/retreats/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passphrase }),
      })
      if (res.ok) {
        setUnlocked(true)
        setShowUnlock(false)
        setPassphrase('')
        window.localStorage.setItem(UNLOCK_HINT_KEY, '1')
      } else {
        setUnlockError('Incorrect passphrase.')
      }
    } catch {
      setUnlockError('Something went wrong. Please try again.')
    } finally {
      setUnlocking(false)
    }
  }

  async function updateStatus(id: string, status: RetreatStatus) {
    if (!unlocked) {
      setShowUnlock(true)
      return
    }
    setPatchingId(id)
    try {
      const res = await fetch(`/api/retreats/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.status === 401) {
        setUnlocked(false)
        window.localStorage.removeItem(UNLOCK_HINT_KEY)
        setShowUnlock(true)
        return
      }
      if (res.ok) {
        const data = await res.json()
        setListings((prev) => prev.map((l) => (l.id === id ? data.listing : l)))
      }
    } finally {
      setPatchingId(null)
    }
  }

  async function handleAddSubmit(e: FormEvent) {
    e.preventDefault()
    if (!unlocked) {
      setShowUnlock(true)
      return
    }
    if (!addForm.name.trim()) return
    setAddSubmitting(true)
    setAddError('')
    try {
      const res = await fetch('/api/retreats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: addForm.name.trim(),
          location: addForm.location || null,
          distance_miles: addForm.distance_miles ? Number(addForm.distance_miles) : null,
          drive_time: addForm.drive_time || null,
          price: addForm.price || null,
          capacity: addForm.capacity || null,
          notes: addForm.notes || null,
          website: addForm.website || null,
          phone: addForm.phone || null,
        }),
      })
      if (res.status === 401) {
        setUnlocked(false)
        window.localStorage.removeItem(UNLOCK_HINT_KEY)
        setShowUnlock(true)
        return
      }
      if (res.ok) {
        const data = await res.json()
        setListings((prev) => [data.listing, ...prev])
        setAddForm(EMPTY_ADD_FORM)
        setShowAddForm(false)
      } else {
        setAddError('Could not add this listing. Please try again.')
      }
    } catch {
      setAddError('Something went wrong. Please try again.')
    } finally {
      setAddSubmitting(false)
    }
  }

  return (
    <>
      {/* Toolbar */}
      <section className="bg-navy-900 border-b border-navy-800 py-6 sticky top-0 z-30 lg:top-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or location…"
                className="w-full bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 pl-9 pr-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600/30 transition-colors"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-navy-800 border border-navy-700 text-slate-300 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-600"
            >
              <option value="">All statuses</option>
              <option value="candidate">Candidate</option>
              <option value="saved">Saved</option>
              <option value="starred">Starred</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={fitFilter}
              onChange={(e) => setFitFilter(e.target.value)}
              className="bg-navy-800 border border-navy-700 text-slate-300 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-600"
            >
              <option value="">Any fit</option>
              <option value="good">Good fit</option>
              <option value="warn">Worth a look</option>
              <option value="bad">Poor fit</option>
            </select>

            <input
              type="number"
              min={0}
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              placeholder="Max miles"
              className="w-28 bg-navy-800 border border-navy-700 text-slate-300 placeholder-slate-500 text-sm px-3 py-2.5 rounded-sm focus:outline-none focus:border-gold-600"
            />

            <button
              onClick={() => (unlocked ? setShowAddForm((v) => !v) : setShowUnlock(true))}
              className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-200 text-sm px-4 py-2.5 rounded-sm transition-colors"
            >
              <Plus size={15} /> Add a listing
            </button>

            <button
              onClick={() => (unlocked ? null : setShowUnlock((v) => !v))}
              className={`flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-sm transition-colors ${
                unlocked
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-600/40 cursor-default'
                  : 'bg-navy-800 hover:bg-navy-700 border border-navy-700 text-slate-200'
              }`}
            >
              {unlocked ? <Unlock size={15} /> : <Lock size={15} />}
              {unlocked ? 'Unlocked' : 'Unlock to save/star'}
            </button>
          </div>

          {showUnlock && !unlocked && (
            <form onSubmit={handleUnlock} className="mt-4 flex items-center gap-3 max-w-sm">
              <input
                type="password"
                autoFocus
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Family passphrase"
                className="flex-1 bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <button
                type="submit"
                disabled={unlocking || !passphrase}
                className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-2 px-4 text-xs tracking-widest uppercase rounded-sm transition-colors"
              >
                {unlocking ? '…' : 'Unlock'}
              </button>
            </form>
          )}
          {unlockError && <p className="mt-2 text-red-400 text-xs">{unlockError}</p>}

          {showAddForm && unlocked && (
            <form onSubmit={handleAddSubmit} className="mt-4 bg-navy-950 border border-navy-800 rounded-sm p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                required
                value={addForm.name}
                onChange={(e) => setAddForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Name *"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600 sm:col-span-2"
              />
              <input
                value={addForm.location}
                onChange={(e) => setAddForm((f) => ({ ...f, location: e.target.value }))}
                placeholder="Location"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <input
                value={addForm.distance_miles}
                onChange={(e) => setAddForm((f) => ({ ...f, distance_miles: e.target.value }))}
                placeholder="Distance (miles)"
                type="number"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <input
                value={addForm.price}
                onChange={(e) => setAddForm((f) => ({ ...f, price: e.target.value }))}
                placeholder="Price"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <input
                value={addForm.capacity}
                onChange={(e) => setAddForm((f) => ({ ...f, capacity: e.target.value }))}
                placeholder="Capacity"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <input
                value={addForm.website}
                onChange={(e) => setAddForm((f) => ({ ...f, website: e.target.value }))}
                placeholder="Website"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <input
                value={addForm.phone}
                onChange={(e) => setAddForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="Phone"
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600"
              />
              <textarea
                value={addForm.notes}
                onChange={(e) => setAddForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Notes"
                rows={2}
                className="bg-navy-800 border border-navy-700 text-slate-200 placeholder-slate-500 px-3 py-2 text-sm rounded-sm focus:outline-none focus:border-gold-600 sm:col-span-2 resize-none"
              />
              {addError && <p className="text-red-400 text-xs sm:col-span-2">{addError}</p>}
              <div className="sm:col-span-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-500 text-xs hover:text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addSubmitting || !addForm.name.trim()}
                  className="bg-gold-500 hover:bg-gold-400 disabled:bg-navy-700 disabled:text-slate-500 text-navy-950 font-semibold py-2 px-5 text-xs tracking-widest uppercase rounded-sm transition-colors"
                >
                  {addSubmitting ? 'Adding…' : 'Add Listing'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Listings */}
      <section className="bg-navy-950 py-10 min-h-[40vh]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {loading && <p className="text-slate-500 text-sm text-center py-16">Loading…</p>}
          {!loading && loadError && (
            <p className="text-red-400 text-sm text-center py-16">{loadError}</p>
          )}
          {!loading && !loadError && visibleListings.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-16">
              No retreats match yet. Watson will keep looking, or add one yourself above.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleListings.map((listing) => (
              <article
                key={listing.id}
                className="bg-navy-900 border border-navy-800 rounded-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-serif text-xl text-white leading-snug">{listing.name}</h2>
                  {listing.fit_rating && (
                    <span className="flex items-center gap-1.5 shrink-0 text-xs text-slate-400 mt-1">
                      <span className={`w-2 h-2 rounded-full ${FIT_DOT_CLASS[listing.fit_rating]}`} />
                      {FIT_LABEL[listing.fit_rating]}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-400">
                  {listing.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {listing.location}
                    </span>
                  )}
                  {(listing.distance_miles !== null || listing.drive_time) && (
                    <span>
                      {listing.distance_miles !== null ? `${listing.distance_miles} mi` : ''}
                      {listing.distance_miles !== null && listing.drive_time ? ' · ' : ''}
                      {listing.drive_time ?? ''}
                    </span>
                  )}
                  {listing.price && <span>{listing.price}</span>}
                  {listing.capacity && <span>{listing.capacity}</span>}
                </div>

                {listing.kitchen_status && (
                  <div className="flex items-center gap-1.5 text-sm text-slate-400">
                    <ChefHat size={14} />
                    <span>
                      {listing.kitchen_status === 'yes' && 'Full kitchen'}
                      {listing.kitchen_status === 'no' && 'No kitchen'}
                      {listing.kitchen_status === 'unclear' && 'Kitchen unclear'}
                      {listing.kitchen_detail ? ` — ${listing.kitchen_detail}` : ''}
                    </span>
                  </div>
                )}

                {listing.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {listing.amenities.map((a) => (
                      <span
                        key={a}
                        className="text-xs text-slate-400 bg-navy-800 border border-navy-700 px-2 py-0.5 rounded-sm"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                )}

                {listing.notes && (
                  <p className="text-sm text-slate-400 leading-relaxed">{listing.notes}</p>
                )}

                {(listing.website || listing.phone || listing.email) && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    {listing.website && (
                      <a
                        href={listing.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-gold-400 transition-colors"
                      >
                        <Globe size={12} /> Website
                      </a>
                    )}
                    {listing.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={12} /> {listing.phone}
                      </span>
                    )}
                    {listing.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={12} /> {listing.email}
                      </span>
                    )}
                  </div>
                )}

                <div className="mt-auto pt-3 border-t border-navy-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wide ${STATUS_PILL_CLASS[listing.status]}`}>
                      {STATUS_LABEL[listing.status]}
                    </span>
                    <span className="text-xs text-slate-600">{fmtDate(listing.date_added)}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    {listing.status === 'archived' ? (
                      <ActionButton
                        title="Restore"
                        icon={<RotateCcw size={16} />}
                        onClick={() => updateStatus(listing.id, 'candidate')}
                        disabled={patchingId === listing.id}
                      />
                    ) : (
                      <>
                        {listing.status !== 'saved' && (
                          <ActionButton
                            title="Save"
                            icon={<Bookmark size={16} />}
                            onClick={() => updateStatus(listing.id, 'saved')}
                            disabled={patchingId === listing.id}
                          />
                        )}
                        {listing.status !== 'starred' && (
                          <ActionButton
                            title="Star"
                            icon={<Star size={16} />}
                            onClick={() => updateStatus(listing.id, 'starred')}
                            disabled={patchingId === listing.id}
                          />
                        )}
                        <ActionButton
                          title="Archive"
                          icon={<Archive size={16} />}
                          onClick={() => updateStatus(listing.id, 'archived')}
                          disabled={patchingId === listing.id}
                        />
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function ActionButton({
  title,
  icon,
  onClick,
  disabled,
}: {
  title: string
  icon: React.ReactNode
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-gold-400 disabled:opacity-40 transition-colors rounded-sm hover:bg-navy-800"
    >
      {icon}
    </button>
  )
}
