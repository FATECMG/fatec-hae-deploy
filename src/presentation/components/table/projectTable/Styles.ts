import { Table } from 'react-bootstrap'
import styled from 'styled-components'

export const TableContainer = styled.div`
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`

export const StyledMainTable = styled(Table)`
  margin: 0;
  vertical-align: middle;

  & > thead {
    vertical-align: middle;
  }
`

export const StyledTableHead = styled.thead`
  background: ${({ theme }) => theme['white-275']};
  text-align: center;
  height: 2.75rem;

  th {
    background: rgb(232, 232, 232);
    color: ${({ theme }) => theme['black-350']};
  }

  tr {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.875rem;
  }
`
