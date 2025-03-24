export function normalizeCep(value: string | undefined) {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1')
}

export function normalizePhoneNumber(value: string | undefined) {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

export const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\sçéê]+$/

export function normalizeDate(value: string | undefined) {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\/\d{4})\d+?/, '$1')
}
