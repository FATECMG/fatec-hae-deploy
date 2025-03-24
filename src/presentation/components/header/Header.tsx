import { Outlet } from 'react-router-dom'
import { Menu, MobileHeader } from './components'

function Header() {
  return (
    <>
      <Menu />
      <MobileHeader />
      <Outlet />
    </>
  )
}

export default Header
