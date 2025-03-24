import { ReactNode } from 'react'
import { StyledMainTable, StyledTableHead, TableContainer } from './Styles'

interface MainTableProps {
  headers: string[]
  children: ReactNode
}

export default function MainTable({ children, headers }: MainTableProps) {
  return (
    <TableContainer>
      <StyledMainTable align="center" color="red" hover bordered responsive>
        <StyledTableHead>
          <tr>
            {headers.map((header) => (
              <th key={header} title={header}>
                {header}
              </th>
            ))}
          </tr>
        </StyledTableHead>
        <tbody>{children}</tbody>
      </StyledMainTable>
    </TableContainer>
  )
}
