export function handleInputData<T>(data: T, element: any) {
  const inputType = element.localName

  if (isButton(inputType)) return

  let value

  switch (inputType) {
    case 'input':
      value = element.value
      break

    case 'select':
      value = handleSelect(element)
      break

    case 'textarea':
      value = element.textContent
      break
  }

  if (data[element.name as keyof T] instanceof Array) {
    ;(data[element.name as keyof T] as any[]).push(value)
  } else {
    data[element.name as keyof T] = value
  }
}

function handleSelect(element: any): any {
  const options = element.options
  let value
  for (let i = 0; i < options.length; i++) {
    if (options[i].selected) {
      value = options[i].value
    }
  }
  return value
}

function isButton(localName: string) {
  return localName === 'button'
}
