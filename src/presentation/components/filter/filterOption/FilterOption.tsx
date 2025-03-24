import { useSearchParams } from 'react-router-dom'
import { Option } from './Styles'

interface FilterOptionProps {
  label: string
  param: string
  value: string
  defaultChecked?: boolean
}

export default function FilterOption({
  label,
  value,
  param,
  defaultChecked,
}: FilterOptionProps) {
  const [searchParams] = useSearchParams()

  const foundParam = searchParams.get(param)

  return (
    <Option
      to={`?${param}=${value}`}
      // 'chosen' must be a string, or React will throw an error
      chosen={foundParam ? `${foundParam === value}` : undefined}
      defaultChecked={!!defaultChecked && !foundParam}
      title="Clique para selecionar e aplicar o filtro"
    >
      <p>{label}</p>
    </Option>
  )
}
