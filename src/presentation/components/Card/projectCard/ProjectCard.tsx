import {
  CardTitleContainer,
  IconsSide,
  InformationCard,
  OptionsSide,
  StyledChatIcon,
  StyledCheckIcon,
  StyledPencil,
  StyledSubmitIcon,
  StyledTrash,
} from './Styles'

interface CardProps {
  name: string
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
  cardStatus: string
}

export default function ProjectCard({
  evaluateProject,
  cardStatus,
  name,
  titleDiv = 'Clique para ver todas as informações',
  altEdit = 'Editar',
  altDelete = 'Excluir',
  viewComments,
  submitProject,
  viewEntity,
  editEntity,
  deleteEntity,
}: CardProps) {
  return (
    <InformationCard onClick={viewEntity} title={titleDiv}>
      <CardTitleContainer status={cardStatus}>
        <h2>{name}</h2>
        <h3 title="Status atual do projeto">{cardStatus}</h3>
      </CardTitleContainer>
      <OptionsSide>
        <IconsSide>
          {submitProject && (
            <StyledSubmitIcon
              alt="Clique para enviar o projeto para avaliação"
              size={20}
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
              size={20}
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
              size={20}
              onClick={(e) => {
                e.stopPropagation()
                editEntity()
              }}
            />
          )}
          {deleteEntity && (
            <StyledTrash
              alt={altDelete}
              size={20}
              onClick={(e) => {
                e.stopPropagation()
                deleteEntity()
              }}
            />
          )}
          {evaluateProject && (
            <StyledCheckIcon
              size={20}
              weight="fill"
              alt="Clique para avaliar o projeto"
              onClick={(e) => {
                e.stopPropagation()
                evaluateProject()
              }}
            />
          )}
        </IconsSide>
      </OptionsSide>
    </InformationCard>
  )
}
