import {
  OptionsSide,
  IconsSide,
  StyledSubmitIcon,
  StyledPencil,
  StyledTrash,
  StyledTableRow,
  StyledProjectStatusCell,
  StyledEye,
} from '../projectTableRow/Styles'

interface CardProps {
  name: string
  author?: string
  titleDiv?: string
  altEdit?: string
  altDelete?: string
  hasComments?: boolean
  submitReport?: () => void
  viewEntity: () => void
  editEntity?: () => void
  deleteEntity?: () => void
  cardStatus: string
}

export default function ReportTableRow({
  cardStatus,
  name,
  author,
  titleDiv = 'Clique para ver todas as informações',
  altEdit = 'Editar',
  altDelete = 'Excluir',
  submitReport,
  viewEntity,
  editEntity,
  deleteEntity,
}: CardProps) {
  return (
    <StyledTableRow onClick={viewEntity} title={titleDiv}>
      <td>{name}</td>
      {author && <td>{author}</td>}
      <td>
        <StyledProjectStatusCell status={cardStatus}>
          {cardStatus}
        </StyledProjectStatusCell>
      </td>
      <td>
        <OptionsSide>
          <IconsSide>
            {viewEntity && (
              <StyledEye
                size={16}
                weight="bold"
                alt="Clique para ver todas as informações"
                onClick={(e) => {
                  e.stopPropagation()
                  viewEntity()
                }}
              />
            )}
            {submitReport && (
              <StyledSubmitIcon
                alt="Clique para enviar o relatório para avaliação"
                size={16}
                weight="fill"
                onClick={(e) => {
                  e.stopPropagation()
                  submitReport()
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
          </IconsSide>
        </OptionsSide>
      </td>
    </StyledTableRow>
  )
}
