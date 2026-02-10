import { memo, useState, useCallback, useEffect, useRef } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { debounce } from '../../utils/debounce'
import type { Role } from './types'
import { ROLES } from './types'

interface SearchAndFilterProps {
  onSearch: (query: string) => void
  roleFilter: Role | 'All'
  onRoleFilter: (role: Role | 'All') => void
}

const FILTER_OPTIONS: (Role | 'All')[] = ['All', ...ROLES]

const FILTER_LABELS: Record<Role | 'All', string> = {
  All: 'Tümü',
  Admin: 'Yönetici',
  Doctor: 'Doktor',
  Patient: 'Hasta',
}

function SearchAndFilterInner({
  onSearch,
  roleFilter,
  onRoleFilter,
}: SearchAndFilterProps) {
  const [localQuery, setLocalQuery] = useState('')

  const debouncedSearch = useRef(debounce(onSearch, 300)).current

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setLocalQuery(val)
      debouncedSearch(val)
    },
    [debouncedSearch]
  )

  useEffect(() => {
    return () => {
      // cleanup
    }
  }, [])

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="search-users" className="text-sm font-medium text-gray-700">
          Ara
        </label>
        <input
          id="search-users"
          type="search"
          value={localQuery}
          onChange={handleChange}
          placeholder="İsim ile arayın..."
          className="mt-1.5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      <div className="w-full sm:w-48">
        <label className="text-sm font-medium text-gray-700">Rol Filtresi</label>
        <Listbox value={roleFilter} onChange={onRoleFilter}>
          <div className="relative mt-1.5">
            <ListboxButton className="relative w-full cursor-pointer rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              {FILTER_LABELS[roleFilter]}
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg focus:outline-none">
              {FILTER_OPTIONS.map((opt) => (
                <ListboxOption
                  key={opt}
                  value={opt}
                  className="cursor-pointer select-none px-3 py-2 text-gray-700 data-[focus]:bg-blue-50 data-[selected]:font-medium data-[selected]:text-blue-700"
                >
                  {FILTER_LABELS[opt]}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
      </div>
    </div>
  )
}

export const SearchAndFilter = memo(SearchAndFilterInner)
