import { Modal } from 'react-bootstrap'
import {
  CloseCommentsModalIcon,
  CommentForm,
  CommentContainer,
  ModalContainer,
  CommentsModalHeaderContainer,
  CommentHeader,
  CommentInfo,
  IconContainer,
  SendMessageIcon,
  CommentFormContainer,
  CommentsContainer,
  UpdatedModalBody,
} from './Styles'
import { User } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { Comment, createdComment } from '@/domain/comment/entities/Comment'
import { useEffect, useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

interface CommentsModalProps {
  projectId: string
  comments: Comment[]
  handleCreateComment: (
    projectId: string,
    comment: createdComment,
  ) => Promise<void>
  show: boolean
  onHide: () => void
}

const commentFormValidationSchema = z.object({
  messageInput: z.string().min(1, { message: 'Campo obrigatório' }).trim(),
})

type CommentFormProps = z.infer<typeof commentFormValidationSchema>

export default function CommentsModal({
  projectId,
  comments,
  handleCreateComment,
  show,
  onHide,
}: CommentsModalProps) {
  const [projectComments, setProjectComments] = useState<Comment[]>(comments)

  useEffect(() => {
    setProjectComments(comments)
  }, [comments])

  const user = GetAuthenticatedUser()

  const { register, handleSubmit, reset, setFocus } = useForm<CommentFormProps>(
    {
      resolver: zodResolver(commentFormValidationSchema),
      defaultValues: { messageInput: '' },
    },
  )

  function capitalizeName(name: string) {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  function handleSendComment(data: CommentFormProps) {
    if (!data.messageInput) return
    const comment: createdComment = {
      author: {
        id: user!.id,
        name: user!.name,
      },
      content: data.messageInput,
    }
    handleCreateComment(projectId, comment)
    reset()
    setFocus('messageInput')
    document.querySelector('.modal-body')?.scrollTo(0, 0)
  }

  function capitalizeDate(date: string): string {
    return date.charAt(0).toUpperCase() + date.slice(1)
  }

  return (
    <Modal
      show={show}
      size="lg"
      onHide={onHide}
      dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <CommentsModalHeaderContainer>
        <CloseCommentsModalIcon
          size={24}
          weight="bold"
          onClick={onHide}
          alt="Fechar comentários"
        />
      </CommentsModalHeaderContainer>
      <UpdatedModalBody>
        <ModalContainer>
          <CommentsContainer>
            {projectComments.map((comment) => (
              <CommentContainer
                key={comment.id}
                isOwner={user!.id === comment.author.id}
              >
                <CommentHeader>
                  <IconContainer>
                    <User size={24} color="#c9c9c9" weight="fill" />
                  </IconContainer>
                  <CommentInfo>
                    <strong>
                      {capitalizeName(comment.author.name.toLowerCase())}
                    </strong>
                    <span
                      title={`Publicado às ${format(
                        new Date(comment.timestamp),
                        'HH:mm - dd/MM/yyyy',
                      )}`}
                    >
                      {capitalizeDate(
                        formatDistanceToNow(new Date(comment.timestamp), {
                          addSuffix: true,
                          locale: ptBR,
                        }),
                      )}
                    </span>
                  </CommentInfo>
                </CommentHeader>
                <p>{comment.content}</p>
              </CommentContainer>
            ))}
          </CommentsContainer>
          <CommentFormContainer>
            <CommentForm
              onSubmit={handleSubmit((data) => handleSendComment(data))}
            >
              <input
                placeholder="Escreva aqui o comentário"
                autoFocus
                autoComplete="off"
                {...register('messageInput')}
              />
              <button type="submit">
                <SendMessageIcon
                  size={24}
                  weight="fill"
                  alt="Enviar comentário"
                />
              </button>
            </CommentForm>
          </CommentFormContainer>
        </ModalContainer>
      </UpdatedModalBody>
    </Modal>
  )
}
