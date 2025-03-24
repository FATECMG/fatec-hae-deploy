import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { normalizeCep } from '@/presentation/utils/Masks'
import {
  AlignedInputs,
  ButtonsDiv,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  MainInput,
  MainLabel,
  MainModal,
  MainSelect,
  ModalForm,
  StateOptions,
} from '@/presentation/components'

import { errorsField } from '@/main/error/RequestError'

import { School } from '@/domain/school/entities/School'
import { Fields } from '@/domain/school/entities/Enums'
import { Address } from '@/domain/address/entities/Address'
import {
  SchoolFormParams,
  schoolFormValidationSchema,
} from '@/domain/school/validation/SchoolZodValidation'

interface EditSchoolModalProps extends School {
  possibleErrors: errorsField<Fields>[] | undefined
  show: boolean
  handleUpdateSchool: (school: School) => void
  handleAddressFetch: (postCode: string, callback: Function) => Promise<void>
  onHide: () => void
}

export default function EditSchoolModal({
  id,
  name,
  active,
  address,
  show,
  handleUpdateSchool,
  handleAddressFetch,
  onHide,
  possibleErrors,
}: EditSchoolModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    setError,
  } = useForm<SchoolFormParams>({
    resolver: zodResolver(schoolFormValidationSchema),
    defaultValues: {
      name,
      active: active ? 'Ativa' : 'Inativa',
      state: address.state,
      street: address.street,
      postCode: address.postCode,
      number: address.number,
      complement: address.complement,
      district: address.district,
      city: address.city,
    },
  })

  const schoolPostCode = watch('postCode')

  useEffect(() => {
    setValue('postCode', normalizeCep(schoolPostCode))
  }, [schoolPostCode, setValue])

  function updateSchool(data: SchoolFormParams) {
    const updatedSchool: School = {
      id,
      name: data.name,
      active: data.active === 'Ativa',
      address: {
        street: data.street,
        number: data.number,
        complement: data.complement ? data.complement : 'S/C',
        district: data.district,
        city: data.city,
        postCode: data.postCode,
        state: data.state,
      },
    }
    handleUpdateSchool(updatedSchool)
  }

  function getAddress() {
    if (schoolPostCode.length === 9) {
      handleAddressFetch(schoolPostCode, (address: Address) => {
        setValue('street', address.street)
        setValue('district', address.district)
        setValue('city', address.city)
        setValue('state', address.state)
      })
    }
  }

  const renderErrors = (): void => {
    if (possibleErrors && possibleErrors?.length > 0) {
      possibleErrors.map((error) =>
        setError(error.field, { type: 'custom', message: error.message }),
      )
    }
  }

  useEffect(() => {
    renderErrors()
  }, [possibleErrors])

  return (
    <MainModal
      title="Editar informações da escola"
      show={show}
      onHide={onHide}
      size="lg"
    >
      <ModalForm onSubmit={handleSubmit((data) => updateSchool(data))}>
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="nomeEscola">Nome da instituição: *</MainLabel>
            <MainInput id="nomeEscola" {...register('name')} type="text" />
            {errors.name && (
              <ColoredErrorMessage>{errors.name.message}</ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="situaçãoEscola">Situação: *</MainLabel>
            <MainSelect
              id="situaçãoEscola"
              {...register('active')}
              defaultValue={active ? 'Ativa' : 'Inativa'}
            >
              <option value="Ativa">Ativa</option>
              <option value="Inativa">Inativa</option>
            </MainSelect>
            {errors.active && (
              <ColoredErrorMessage>{errors.active.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <MainLabel htmlFor="cepEscola">CEP: *</MainLabel>
        <MainInput
          id="cepEscola"
          {...register('postCode')}
          type="text"
          onBlur={getAddress}
          placeholder="Ex: 00000000"
        />
        {errors.postCode && (
          <ColoredErrorMessage>{errors.postCode.message}</ColoredErrorMessage>
        )}
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="ruaEscola">Logradouro: *</MainLabel>
            <MainInput id="ruaEscola" {...register('street')} type="text" />
            {errors.street && (
              <ColoredErrorMessage>{errors.street.message}</ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="numeroEscola">Número: *</MainLabel>
            <MainInput id="numeroEscola" {...register('number')} type="text" />
            {errors.number && (
              <ColoredErrorMessage>{errors.number.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <MainLabel htmlFor="complementoEscola">Complemento:</MainLabel>
        <MainInput
          id="complementoEscola"
          {...register('complement')}
          type="text"
        />
        <MainLabel htmlFor="bairroEscola">Bairro: *</MainLabel>
        <MainInput id="bairroEscola" {...register('district')} type="text" />
        {errors.district && (
          <ColoredErrorMessage>{errors.district.message}</ColoredErrorMessage>
        )}
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="estadoEscola">Estado: *</MainLabel>
            <MainSelect id="estadoEscola" {...register('state')}>
              <StateOptions />
            </MainSelect>
            {errors.state && (
              <ColoredErrorMessage>{errors.state.message}</ColoredErrorMessage>
            )}
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="cidadeEscola">Cidade: *</MainLabel>
            <MainInput id="cidadeEscola" {...register('city')} type="text" />
            {errors.city && (
              <ColoredErrorMessage>{errors.city.message}</ColoredErrorMessage>
            )}
          </InputDiv>
        </AlignedInputs>
        <p>Campos com * devem ser obrigatoriamente preenchidos</p>
        <ButtonsDiv>
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
          <MainButton type="submit" color="blue-400" hoverColor="blue-350">
            Atualizar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
