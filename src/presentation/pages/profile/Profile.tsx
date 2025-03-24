import {
  MainInput,
  MainLabel,
  PageContainer,
  PageTitle,
} from '@/presentation/components'
import { Separator, UserInformationContainer } from './Styles'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'

export default function Profile() {
  const user = GetAuthenticatedUser()

  return (
    <PageContainer>
      <PageTitle>Perfil do usuário</PageTitle>
      <UserInformationContainer>
        <Separator>
          <MainLabel>Nome: </MainLabel>
          <MainInput type="text" value={user!.name} disabled />
        </Separator>
        <Separator>
          <MainLabel>E-mail: </MainLabel>
          <MainInput type="text" value={user!.email} disabled />
        </Separator>
        <Separator>
          <MainLabel>Cargo: </MainLabel>
          <MainInput type="text" value={user!.role} disabled />
        </Separator>
      </UserInformationContainer>
    </PageContainer>
  )
}
