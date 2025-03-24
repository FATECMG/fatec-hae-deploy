import {
  OptionsSide,
  IconsSide,
  StyledSubmitIcon,
  StyledChatIcon,
  StyledPencil,
  StyledTrash,
  StyledCheckIcon,
  StyledTableRow,
  StyledProjectStatusCell,
  StyledChartBar,
} from './Styles'

interface CardProps {
  name: string
  author?: string
  sendDate?: string
  titleDiv?: string
  altEdit?: string
  altDelete?: string
  hasComments?: boolean
  submitProject?: () => void
  viewComments?: () => void
  viewEntity: () => void
  editEntity?: () => void
  deleteEntity?: () => void
  evaluateProject?: () => void
  reportProject?: () => void
  cardStatus: string
}

export default function ProjectTableRow({
  evaluateProject,
  cardStatus,
  name,
  author,
  sendDate,
  titleDiv = 'Clique para ver todas as informações',
  altEdit = 'Editar',
  altDelete = 'Excluir',
  viewComments,
  submitProject,
  viewEntity,
  editEntity,
  deleteEntity,
  reportProject,
}: CardProps) {
  return (
    <StyledTableRow onClick={viewEntity} title={titleDiv}>
      <td>{name}</td>
      {author && <td>{author}</td>}
      <td>{sendDate ?? 'Não enviado'}</td>
      <td>
        <StyledProjectStatusCell status={cardStatus}>
          {cardStatus}
        </StyledProjectStatusCell>
      </td>
      <td>
        <OptionsSide>
          <IconsSide>
            {submitProject && (
              <StyledSubmitIcon
                alt="Clique para enviar o projeto para avaliação"
                size={16}
                weight="fill"
                onClick={(e) => {
                  e.stopPropagation()
                  submitProject()
                }}
              />
            )}
            {viewComments && (
              <StyledChatIcon
                alt="Exibir comentários"
                size={16}
                weight="fill"
                onClick={(e) => {
                  e.stopPropagation()
                  viewComments()
                }}
              />
            )}
            {editEntity && (
              <StyledPencil
                alt={altEdit}
                size={16}
                onClick={(e) => {
                  e.stopPropagation()
                  editEntity()
                }}
              />
            )}
            {deleteEntity && (
              <StyledTrash
                alt={altDelete}
                size={16}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteEntity()
                }}
              />
            )}
            {evaluateProject && (
              <StyledChartBar
                size={16}
                weight="fill"
                alt="Clique para avaliar o projeto"
                onClick={(e) => {
                  e.stopPropagation()
                  evaluateProject()
                }}
              />
            )}
            {reportProject && (
              <StyledCheckIcon
                size={16}
                weight="fill"
                alt="Clique para abrir o relatório do projeto"
                onClick={(e) => {
                  e.stopPropagation()
                  reportProject()
                }}
              />
            )}
          </IconsSide>
        </OptionsSide>
      </td>
    </StyledTableRow>
  )
}
