import { InputHTMLAttributes } from 'react'
import { SearchBarInput } from './Styles'

export default function SearchBar(
  props: InputHTMLAttributes<HTMLInputElement>,
) {
  return <SearchBarInput {...props} />
}
