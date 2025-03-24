import { MainModal, ModalForm } from '@/presentation/components'
import {
  CheckboxInput,
  FilterButtonsContainer,
  FilterContainer,
  FiltersSection,
  FilterSectionTitle,
  FiltersModalContainer,
  FilterSeparator,
  OrderByContainer,
  RadioInput,
  ButtonsContainer,
} from './Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLocation, useSearchParams } from 'react-router-dom'

const FiltersFormSchema = z.object({
  status: z.array(z.string()).optional(),
  orderBy: z.string().optional(),
})

type FormType = z.infer<typeof FiltersFormSchema>

interface FilterProjectsModalProps {
  show: boolean
  onHide: () => void
  handleApplyFilters: (url: string) => void
}

export default function FilterProjectsModal({
  onHide,
  show,
  handleApplyFilters,
}: FilterProjectsModalProps) {
  const location = useLocation()

  const params = new URLSearchParams(location.search)
  const statusParam = params.getAll('status')

  const [searchParams] = useSearchParams()

  const ApplyFilters = (data: FormType) => {
    let url = ''

    data.status?.forEach((status) => (url += `status=${status}&`))
    data.orderBy ? (url += `ordenarPor=${data.orderBy}&`) : <></>
    handleApplyFilters(url.slice(0, url.length - 1))
  }

  const { handleSubmit, register, reset } = useForm<FormType>({
    resolver: zodResolver(FiltersFormSchema),
    defaultValues: {
      status: statusParam ?? [],
      orderBy: searchParams.get('ordenarPor') ?? '',
    },
  })

  return (
    <MainModal
      title="Filtrar projetos"
      show={show}
      onHide={onHide}
      animationOnEnter={false}
      size="lg"
    >
      <ModalForm
        onSubmit={handleSubmit((data) => ApplyFilters(data))}
        gap="1rem"
      >
        <FiltersModalContainer>
          <FilterContainer>
            <FilterSectionTitle>Filtrar por: </FilterSectionTitle>
            <FiltersSection>
              <FilterSeparator>
                <CheckboxInput
                  type="checkbox"
                  id="SENT"
                  value="ENVIADO"
                  {...register('status')}
                />
                <label htmlFor="SENT">Projetos enviados</label>
              </FilterSeparator>
              <FilterSeparator>
                <CheckboxInput
                  type="checkbox"
                  id="UNDER_VALIDATION"
                  value="EM VALIDAÇÃO"
                  {...register('status')}
                />
                <label htmlFor="UNDER_VALIDATION">Projetos em validação</label>
              </FilterSeparator>
              <FilterSeparator>
                <CheckboxInput
                  type="checkbox"
                  id="AWAITING_CORRECTION"
                  value="AGUARDANDO CORREÇÃO"
                  {...register('status')}
                />
                <label htmlFor="AWAITING_CORRECTION">
                  Projetos aguardando correção
                </label>
              </FilterSeparator>
              <FilterSeparator>
                <CheckboxInput
                  type="checkbox"
                  id="APPROVED"
                  value="APROVADO"
                  {...register('status')}
                />
                <label htmlFor="APPROVED">Projetos aprovados</label>
              </FilterSeparator>
              <FilterSeparator>
                <CheckboxInput
                  type="checkbox"
                  id="REJECTED"
                  value="REJEITADO"
                  {...register('status')}
                />
                <label htmlFor="REJECTED">Projetos rejeitados</label>
              </FilterSeparator>
            </FiltersSection>
          </FilterContainer>
          <FilterContainer>
            <FilterSectionTitle>Ordenar por: </FilterSectionTitle>
            <OrderByContainer>
              <FilterSeparator>
                <RadioInput
                  type="radio"
                  id="name"
                  value="name"
                  {...register('orderBy')}
                />
                <label htmlFor="name">Nome</label>
              </FilterSeparator>
              <FilterSeparator>
                <RadioInput
                  type="radio"
                  id="sendDate"
                  value="sendDate"
                  {...register('orderBy')}
                />
                <label htmlFor="sendDate">Data de envio</label>
              </FilterSeparator>
              <FilterSeparator>
                <RadioInput
                  type="radio"
                  id="status"
                  value="status"
                  {...register('orderBy')}
                />
                <label htmlFor="status">Status</label>
              </FilterSeparator>
              <FilterSeparator>
                <RadioInput
                  type="radio"
                  id="author"
                  value="author"
                  {...register('orderBy')}
                />
                <label htmlFor="author">Nome do autor</label>
              </FilterSeparator>
            </OrderByContainer>
          </FilterContainer>
        </FiltersModalContainer>
        <ButtonsContainer>
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
          <FilterButtonsContainer>
            <MainButton
              color="blue-400"
              hoverColor="blue-350"
              type="button"
              onClick={() => reset({ status: [], orderBy: '' })}
            >
              Limpar filtros
            </MainButton>
            <MainButton type="submit" color="blue-400" hoverColor="blue-350">
              Aplicar
            </MainButton>
          </FilterButtonsContainer>
        </ButtonsContainer>
      </ModalForm>
    </MainModal>
  )
}
