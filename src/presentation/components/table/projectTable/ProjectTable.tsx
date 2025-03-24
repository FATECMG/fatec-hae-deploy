import { ReactNode } from 'react'
import { StyledMainTable, StyledTableHead, TableContainer } from './Styles'

interface ProjectTableProps {
  showAuthor?: boolean
  children: ReactNode
}

export default function ProjectTable({
  children,
  showAuthor = true,
}: ProjectTableProps) {
  return (
    <TableContainer>
      <StyledMainTable align="center" color="red" hover bordered responsive>
        <StyledTableHead>
          <tr>
            <th title="Título do projeto">Título</th>
            {showAuthor && <th title="Autor do projeto">Autor</th>}
            <th title="Data de envio do projeto">Data de envio</th>
            <th title="Status do projeto">Status</th>
            <th title="Ações para gerenciar o projeto">Ações</th>
          </tr>
        </StyledTableHead>
        <tbody>{children}</tbody>
      </StyledMainTable>
    </TableContainer>
  )
}
