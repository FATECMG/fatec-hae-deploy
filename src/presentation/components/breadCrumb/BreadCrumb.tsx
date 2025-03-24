import { Fragment } from 'react'
import {
  StyledArrowRightIcon,
  StyledBreadCrumbLink,
  StyledItem,
  StyledOrderedList,
} from './Styles'

interface CrumbProps {
  title: string
}

interface BreadCrumbProps {
  crumbs: CrumbProps[]
}

export default function BreadCrumb({ crumbs }: BreadCrumbProps) {
  const isNotFirstItem = (index: number) => index !== 0

  return (
    <StyledOrderedList>
      {crumbs.map((crumb, index) =>
        isNotFirstItem(index) ? (
          <Fragment key={index}>
            <StyledArrowRightIcon weight="bold" size={12} />
            <StyledItem>{crumb.title}</StyledItem>
          </Fragment>
        ) : (
          <StyledItem key={index} title="Voltar para a página inicial">
            <StyledBreadCrumbLink to="/inicio">
              {crumb.title}
            </StyledBreadCrumbLink>
          </StyledItem>
        ),
      )}
    </StyledOrderedList>
  )
}
