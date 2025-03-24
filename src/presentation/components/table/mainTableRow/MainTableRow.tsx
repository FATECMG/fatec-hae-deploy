import { StyledEye } from '../projectTableRow/Styles'
import {
  OptionsSide,
  IconsSide,
  StyledPencil,
  StyledTrash,
  StyledTableRow,
  StyledSubmitIcon
} from './Styles'

interface CardProps {
  entityData: string[]
  renderIconCondition?: boolean
  titleDiv?: string
  altEdit?: string
  altDelete?: string
  altReport?: string
  showEntityIcon?: boolean
  viewEntity: () => void
  editEntity?: () => void
  deleteEntity?: () => void
  getReport?: () => void
}

export default function MainTableRow({
  entityData,
  renderIconCondition = true,
  showEntityIcon = false,
  titleDiv = 'Clique para ver todas as informações',
  altEdit = 'Editar',
  altDelete = 'Excluir',
  altReport = 'Gerar Relatório',
  viewEntity,
  editEntity,
  deleteEntity,
  getReport
}: CardProps) {
  return (
    <StyledTableRow onClick={viewEntity} title={titleDiv}>
      {entityData.map((data) => (
        <td key={data}>{data}</td>
      ))}
      <td>
        <OptionsSide>
          <IconsSide>
            {showEntityIcon && viewEntity && (
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
            {renderIconCondition && editEntity && (
              <StyledPencil
                alt={altEdit}
                size={16}
                onClick={(e) => {
                  e.stopPropagation()
                  editEntity()
                }}
              />
            )}
            {renderIconCondition && deleteEntity && (
              <StyledTrash
                alt={altDelete}
                size={16}
                onClick={(e) => {
                  e.stopPropagation()
                  deleteEntity()
                }}
              />
            )}
            {renderIconCondition && getReport && (
              <StyledSubmitIcon
                alt={altReport}
                size={16}
                onClick={(e) => {
                  e.stopPropagation()
                  getReport()
                }}
              />
            )}
          </IconsSide>
        </OptionsSide>
      </td>
    </StyledTableRow>
  )
}
