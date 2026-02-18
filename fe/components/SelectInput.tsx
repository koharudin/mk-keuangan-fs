import { useEffect, useState } from 'react'
import { api } from '../services/api'

interface Option {
    value: string | number
    label: string
}

interface SelectInputProps {
    label: string
    name: string
    value: string | number
    options?: Option[]                 // ⬅️ array biasa
    apiUrl?: string                    // ⬅️ api source
    mapOption?: (item: any) => Option  // ⬅️ mapping response api
    placeholder?: string
    required?: boolean
    removeDiv? : boolean
    disabled?: boolean
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function SelectInput({
    label,
    name,
    value,
    options = [],
    apiUrl,
    mapOption,
    removeDiv,
    placeholder = '-- Pilih --',
    required = false,
    disabled = false,
    onChange,
}: SelectInputProps) {
    const [items, setItems] = useState<Option[]>(options)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!apiUrl) return

        setLoading(true)
        api.get(apiUrl)
            .then((res) => {
                const data = res.data.data ?? res.data
                setItems(
                    mapOption
                        ? data.map(mapOption)
                        : data
                )
            })
            .finally(() => setLoading(false))
    }, [apiUrl])

    return (
        <div className={removeDiv?"":"mb-4"}>
            <label className="form-label">{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
                className="form-select"
                required={required}
                disabled={disabled || loading}
            >
                <option value="">
                    {loading ? 'Memuat data...' : placeholder}
                </option>

                {items.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
