export const getAllUrlParams = (): string[] => {
  const params = new URLSearchParams(location.search)
  return params.getAll('status')
}
