import {
  IconsSide,
  InformationCard,
  OptionsSide,
  StyledChatIcon,
  StyledPencil,
  StyledSubmitIcon,
  StyledTrash,
} from './Styles'
import { useLocation } from 'react-router-dom'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
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
}

export default function MainCard({
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
  const location = useLocation()

  const user = GetAuthenticatedUser()

  function getCardOptionsByRoleAndRoute(): boolean {
    if (!user!.role.startsWith('DIRETOR') && location.pathname === '/editais') {
      return false
    }

    return true
  }

  return (
    <InformationCard onClick={viewEntity} title={titleDiv}>
      <h2>{name}</h2>
      <OptionsSide>
        {getCardOptionsByRoleAndRoute() && (
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
          </IconsSide>
        )}
      </OptionsSide>
    </InformationCard>
  )
}
