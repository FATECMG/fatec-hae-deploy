import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ButtonsDiv } from './Styles'

import {
  AlignedInputs,
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
import { normalizeCep } from '@/presentation/utils/Masks'

import { errorsField } from '@/main/error/RequestError'

import { Fields } from '@/domain/school/entities/Enums'
import { createdSchool } from '@/domain/school/entities/School'
import { Address } from '@/domain/address/entities/Address'
import {
  SchoolFormParams,
  schoolFormValidationSchema,
} from '@/domain/school/validation/SchoolZodValidation'

interface CreateSchoolModalProps {
  possibleErrors?: errorsField<Fields>[]
  show: boolean
  handleCreateSchool: (school: createdSchool) => Promise<void>
  handleAddressFetch: (postCode: string, callback: Function) => Promise<void>
  onHide: () => void
}

export default function CreateSchoolModal({
  handleCreateSchool,
  handleAddressFetch,
  onHide,
  show,
  possibleErrors,
}: CreateSchoolModalProps) {
  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<SchoolFormParams>({
    resolver: zodResolver(schoolFormValidationSchema),
    defaultValues: {
      name: '',
      active: '',
      state: '',
      street: '',
      postCode: '',
      number: '',
      complement: '',
      district: '',
      city: '',
    },
  })

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

  const schoolPostCode = watch('postCode')

  useEffect(() => {
    setValue('postCode', normalizeCep(schoolPostCode))
  }, [schoolPostCode, setValue])

  async function createSchool(data: SchoolFormParams) {
    const school: createdSchool = {
      active: data.active === 'Ativa',
      name: data.name,
      address: {
        city: data.city,
        district: data.district,
        postCode: data.postCode,
        street: data.street,
        number: data.number,
        complement: !data.complement ? 'S/C' : data.complement,
        state: data.state,
      },
    }

    await handleCreateSchool(school)
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

  return (
    <MainModal
      title="Adicionar nova escola"
      show={show}
      size="lg"
      onHide={onHide}
    >
      <ModalForm onSubmit={handleSubmit((data) => createSchool(data))}>
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
            <MainSelect id="situaçãoEscola" {...register('active')}>
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
            Criar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
