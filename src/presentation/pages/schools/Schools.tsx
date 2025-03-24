import { useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { Buildings, PlusCircle } from 'phosphor-react'

import { MainOptions } from './Styles'
import {
  CreateSchoolModal,
  DeleteSchoolModal,
  EditSchoolModal,
  SchoolModal,
} from '@/presentation/pages/schools/modals'
import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  FilterContainer,
  FilterOption,
  NoEntitiesFound,
  OptionsContainer,
  PageContainer,
  PageHeader,
  PageTitle,
  SearchBar,
  Toast,
  PageLoader,
  MainTable,
  MainTableRow,
} from '@/presentation/components'
import { Alert } from '@/presentation/utils/SweetAlert'
import { useLogout } from '@/presentation/hooks'

import { RequestError, errorsField } from '@/main/error/RequestError'
import { getSchoolUseCases, getAddressUseCases } from '@/main/factories'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

import { Fields } from '@/domain/school/entities/Enums'
import { School, createdSchool } from '@/domain/school/entities/School'

export default function Schools() {
  document.title = 'Gestão de escolas'

  const [schools, setSchools] = useState<School[]>([])
  const [searchSchool, setsearchSchool] = useState<string>('')
  const [createModal, setCreateModal] = useState<boolean>(false)
  const [schoolToView, setSchoolToView] = useState<School>()
  const [schoolToEdit, setSchoolToEdit] = useState<School>()
  const [schoolToDelete, setSchoolToDelete] = useState<School>()
  const [formErros, setFormErros] = useState<errorsField<Fields>[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const logout = useLogout()

  const schoolUseCases = getSchoolUseCases()
  const addressUseCases = getAddressUseCases()

  const fetchData = async (): Promise<void> => {
    try {
      const result = await schoolUseCases.findAll(
        searchParams.get('active') !== 'false',
      )
      setLoading(false)
      setSchools(result)
    } catch (err: unknown) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('active')])

  const filteredSchools = useMemo(() => {
    const lowerCaseSearch = searchSchool.toLowerCase()
    return schools.filter((school) =>
      school.name.toLowerCase().includes(lowerCaseSearch),
    )
  }, [searchSchool, schools])

  function updateSchoolState(Schools: School[]): void {
    let newSchools: School[]
    switch (searchParams.get('active')) {
      case 'false':
        newSchools = Schools.filter((school) => school.active === false)
        setSchools(newSchools)
        return
      default:
        newSchools = Schools.filter((school) => school.active === true)
        setSchools(newSchools)
    }
  }

  async function handleCreateSchool(school: createdSchool): Promise<void> {
    try {
      const data = await schoolUseCases.create(school)
      updateSchoolState([...schools, data])
      Toast({ message: 'Escola criada com sucesso!', type: 'success' })
      setCreateModal(false)
      setFormErros([])
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        Toast({ message: err.message, type: err.type })
        setFormErros(err.errors as Fields)
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleUpdateSchool(school: School): Promise<void> {
    try {
      const updatedSchool = await schoolUseCases.updateById(school)
      const newSchools = schools.map((school) =>
        school.id === updatedSchool.id ? updatedSchool : school,
      )
      updateSchoolState(newSchools)
      Toast({ message: 'Escola atualizada com sucesso!', type: 'success' })
      setSchoolToEdit(undefined)
      setFormErros([])
    } catch (err: unknown) {
      if (err instanceof RequestError) {
        Toast({ message: err.message, type: err.type })
        setFormErros(err.errors as Fields)
      }
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleDeleteSchool(id: string): Promise<void> {
    try {
      await schoolUseCases.deleteById(id)
      const newSchools = schools.filter((each) => each.id !== id)
      setSchools(newSchools)
      Toast({ message: 'Escola excluída com sucesso!', type: 'success' })
      setSchoolToDelete(undefined)
    } catch (err: unknown) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleAddressFetch(
    schoolPostCode: string,
    callback: Function,
  ) {
    function CepIsNotCompleted() {
      return schoolPostCode.length < 9
    }

    if (CepIsNotCompleted()) return
    try {
      const data = await addressUseCases.getByPostCode(
        schoolPostCode.replace('-', ''),
      )
      callback(data)
    } catch (err: unknown) {
      err instanceof RequestError &&
        Toast({ message: err.message, type: err.type })
      err instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  const filteredData = !searchSchool ? schools : filteredSchools

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitle>Gestão de escolas</PageTitle>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar por escolas"
              onChange={(event) => setsearchSchool(event.target.value)}
            />
            <MainButton
              color="blue-400"
              hoverColor="blue-350"
              onClick={() => setCreateModal(true)}
            >
              Criar escola
              <PlusCircle size={18} color="#FFFFFF" weight="bold" />
            </MainButton>
          </MainOptions>
          <FilterContainer>
            <OptionsContainer>
              <FilterOption
                label="Escolas Ativas"
                param="active"
                value="true"
                defaultChecked={true}
              />
              <FilterOption
                label="Escolas Inativas"
                param="active"
                value="false"
              />
            </OptionsContainer>
          </FilterContainer>
        </PageHeader>
        {createModal && (
          <CreateSchoolModal
            show={createModal}
            possibleErrors={formErros}
            handleCreateSchool={handleCreateSchool}
            handleAddressFetch={handleAddressFetch}
            onHide={() => {
              setCreateModal(false)
              setFormErros([])
            }}
          />
        )}
        {schoolToView && (
          <SchoolModal
            name={schoolToView.name}
            active={schoolToView.active}
            address={schoolToView.address}
            show={!!schoolToView}
            onHide={() => setSchoolToView(undefined)}
          />
        )}
        {schoolToEdit && (
          <EditSchoolModal
            id={schoolToEdit.id}
            name={schoolToEdit.name}
            active={schoolToEdit.active}
            address={schoolToEdit.address}
            handleUpdateSchool={handleUpdateSchool}
            handleAddressFetch={handleAddressFetch}
            possibleErrors={formErros}
            show={!!schoolToEdit}
            onHide={() => {
              setSchoolToEdit(undefined)
              setFormErros([])
            }}
          />
        )}
        {schoolToDelete && (
          <DeleteSchoolModal
            schoolId={schoolToDelete.id}
            name={schoolToDelete.name}
            handleDeleteSchool={handleDeleteSchool}
            show={!!schoolToDelete}
            onHide={() => setSchoolToDelete(undefined)}
          />
        )}
        <PageLoader loading={loading} />
        {schools.length === 0 && !loading && (
          <NoEntitiesFound
            message="Comece criando uma nova escola ou redefinindo os filtros de busca"
            Icon={<Buildings size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!loading && filteredData.length > 0 && (
          <MainTable headers={['Nome', 'Ações']}>
            {filteredData
              .sort((current, next) => current.name.localeCompare(next.name))
              .map((school) => (
                <MainTableRow
                  key={school.id}
                  entityData={[school.name]}
                  viewEntity={() => setSchoolToView(school)}
                  editEntity={() => setSchoolToEdit(school)}
                  deleteEntity={() => setSchoolToDelete(school)}
                />
              ))}
          </MainTable>
        )}
      </PageContainer>
    </>
  )
}
