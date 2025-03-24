import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'

import {
  MainModal,
  MainSelect,
  ModalForm,
  StyledP,
} from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  ButtonsDiv,
  ColoredErrorMessage,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { Status } from '@/presentation/pages/projects/utils/strategyIcon'

import { FeedbackCommentContainer } from './Styles'

export const evaluateProjectFormValidationSchema = z.object({
  status: z.string().min(1, 'Status é obrigatório'),
  comment: z.string().optional(),
})

type EvaluateProjectFormParams = z.infer<
  typeof evaluateProjectFormValidationSchema
>

interface EvaluateProjectModalProps {
  projectId: string
  title: string
  show: boolean
  onHide: () => void
  handleEvaluateProject: (
    projectId: string,
    status: string,
    comment: string | undefined,
  ) => void
}

export default function EvaluateProjectModal({
  projectId,
  title,
  show,
  onHide,
  handleEvaluateProject,
}: EvaluateProjectModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<EvaluateProjectFormParams>({
    resolver: zodResolver(evaluateProjectFormValidationSchema),
    defaultValues: {
      status: '',
    },
  })

  function evaluateProject(data: EvaluateProjectFormParams) {
    handleEvaluateProject(projectId, data.status, data.comment)
  }

  const watchedStatus = watch('status')

  useEffect(() => setValue('comment', undefined), [setValue, watchedStatus])

  return (
    <MainModal title="Avaliar projeto" onHide={onHide} show={show}>
      <StyledP>
        Avaliar o projeto <strong>{title}</strong>
      </StyledP>
      <ModalForm onSubmit={handleSubmit((data) => evaluateProject(data))}>
        <MainSelect {...register('status')}>
          <option value="APROVADO">Aprovado</option>
          <option value="REJEITADO">Rejeitado</option>
          <option value="DEVOLVIDO PARA AJUSTES">Devolver para ajustes</option>
        </MainSelect>
        {errors.status && (
          <ColoredErrorMessage>{errors.status.message}</ColoredErrorMessage>
        )}
        {Status.IsReturnedForCorrection(watchedStatus) && (
          <FeedbackCommentContainer>
            <textarea
              placeholder="Insira o comentário de avaliação"
              rows={5}
              {...register('comment')}
            />
          </FeedbackCommentContainer>
        )}
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
            Avaliar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
