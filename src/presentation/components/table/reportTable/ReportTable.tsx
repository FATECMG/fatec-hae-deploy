import { ReactNode } from 'react'
import {
  StyledMainTable,
  StyledTableHead,
  TableContainer,
} from '../projectTable/Styles'

interface ReportTableProps {
  children: ReactNode
}

export default function ReportTable({ children }: ReportTableProps) {
  return (
    <TableContainer>
      <StyledMainTable align="center" color="red" hover bordered responsive>
        <StyledTableHead>
          <tr>
            <th title="Título do projeto">Título</th>
            <th title="Status do projeto">Status</th>
            <th title="Ações para gerenciar o projeto">Ações</th>
          </tr>
        </StyledTableHead>
        <tbody>{children}</tbody>
      </StyledMainTable>
    </TableContainer>
  )
}
