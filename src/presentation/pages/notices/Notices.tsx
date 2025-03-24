import { useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useSearchParams } from 'react-router-dom'
import { NewspaperClipping, PlusCircle } from 'phosphor-react'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

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
  BreadCrumb,
  PageTitleWrapper,
} from '@/presentation/components'
import { MainButton } from '@/presentation/components/buttons/Styles'
import { Alert } from '@/presentation/utils/SweetAlert'
import { useLogout } from '@/presentation/hooks'
import { GetAuthenticatedUser } from '@/presentation/utils/GetAuthenticatedUser'
import { MainOptions } from '@/presentation/pages/schools/Styles'

import {
  CreateNoticeModal,
  DeleteNoticeModal,
  EditNoticeModal,
  ViewNoticeModal,
} from './modals'

import { getCourseUseCases, getNoticeUseCases } from '@/main/factories'
import { RequestError, errorsField } from '@/main/error/RequestError'
import { UnauthorizedError } from '@/main/error/UnathorizedError'

import { CreatedNotice, Notice } from '@/domain/notice/entities/Notice'
import { NoticeFields } from '@/domain/notice/entities/Enums'
import { Course } from '@/domain/course/entities/Course'

export default function Notices() {
  document.title = 'Gestão de editais'

  const [notices, setNotices] = useState<Notice[]>([])
  const [searchNotice, setsearchNotice] = useState<string>('')
  const [createNoticeModal, setCreateNoticeModal] = useState<boolean>(false)
  const [noticeToView, setNoticeToView] = useState<Notice>()
  const [noticeToEdit, setNoticeToEdit] = useState<Notice>()
  const [noticeToDelete, setnoticeToDelete] = useState<Notice>()
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams()
  const [formErros, setFormErros] = useState<errorsField<NoticeFields>[]>()
  const [courses, setCourses] = useState<Course[]>([])
  const logout = useLogout()

  const noticeUseCases = getNoticeUseCases()
  const courseUseCases = getCourseUseCases()

  const user = GetAuthenticatedUser()

  const fetchData = async (): Promise<void> => {
    try {
      const [notices, courses] = await Promise.all([
        noticeUseCases.findAll(searchParams.get('active') !== 'false'),
        courseUseCases.findAll(true),
      ])

      setNotices(notices)
      setCourses(courses)
      setLoading(false)
    } catch (error: unknown) {
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })

      error instanceof UnauthorizedError && Alert.disconnected(logout)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('active')])

  function updateNoticeState(notices: Notice[]): void {
    let newNotices: Notice[]
    switch (searchParams.get('active')) {
      case 'false':
        newNotices = notices.filter((notice) => notice.active === false)
        setNotices(newNotices)
        return
      default:
        newNotices = notices.filter((notice) => notice.active === true)
        setNotices(newNotices)
    }
  }

  const getReport = async (notice: Notice) => {
    console.log(notice)
    try {
      // Variaveis usadas
      let pdfUrl = "";
      let curso = 0;
      let arquivoSaida = "";
      let variablesPositions: Record<string, { pageIndex: number; x: number; y: number }> = {
        edital: { pageIndex: 0, x: 190, y: 144 },
        letivo: { pageIndex: 0, x: 120, y: 330 },
        periodo: { pageIndex: 3, x: 275, y: 625 },
        aprovacao: { pageIndex: 4, x: 75, y: 357 },
        aprovacao2: { pageIndex: 4, x: 201, y: 451 },
        pagamento: { pageIndex: 4, x: 75, y: 464 },
        data: { pageIndex: 5, x: 100, y: 310 },
      };
      
      // 1. Carregar o PDF base
      if (notice.title.toLocaleUpperCase().includes("ADMINISTRAÇÃO")) {
        pdfUrl = "/base-adm.pdf"
        curso = 1;
        variablesPositions = {
          edital: { pageIndex: 0, x: 190, y: 144 },
          letivo: { pageIndex: 0, x: 120, y: 330 },
          periodo: { pageIndex: 3, x: 275, y: 625 },
          aprovacao: { pageIndex: 4, x: 75, y: 357 },
          aprovacao2: { pageIndex: 4, x: 201, y: 451 },
          pagamento: { pageIndex: 4, x: 75, y: 464 },
          data: { pageIndex: 5, x: 100, y: 310 }
        }
        arquivoSaida = "edital-adm";
      }
      else if (notice.title.toLocaleUpperCase().includes("ADS")) {
        pdfUrl = "/base-ads.pdf"
        curso = 2;
        variablesPositions = {
          edital: { pageIndex: 0, x: 245, y: 144 },
          letivo: { pageIndex: 0, x: 120, y: 330 },
          periodo: { pageIndex: 4, x: 218, y: 269 },
          aprovacao: { pageIndex: 4, x: 75, y: 638 },
          aprovacao2: { pageIndex: 5, x: 201, y: 130 },
          pagamento: { pageIndex: 5, x: 75, y: 143 },
          data: { pageIndex: 5, x: 100, y: 590 }
        }
        arquivoSaida = "edital-ads";
      }
      else if (notice.title.toLocaleUpperCase().includes("AGRO")) {
        pdfUrl = "/base-agro.pdf"
        curso = 3;
        variablesPositions = {
          edital: { pageIndex: 0, x: 230, y: 144 },
          letivo: { pageIndex: 0, x: 120, y: 330 },
          periodo: { pageIndex: 4, x: 218, y: 145 },
          aprovacao: { pageIndex: 4, x: 75, y: 512 },
          aprovacao2: { pageIndex: 4, x: 201, y: 605 },
          pagamento: { pageIndex: 4, x: 75, y: 618 },
          data: { pageIndex: 5, x: 100, y: 450 }
        }
        arquivoSaida = "edital-agro";
      }
      else if (notice.title.toLocaleUpperCase().includes("LOG")) {
        pdfUrl = "/base-log.pdf"
        curso = 4;
        variablesPositions = {
          edital: { pageIndex: 0, x: 235, y: 144 },
          letivo: { pageIndex: 0, x: 120, y: 330 },
          periodo: { pageIndex: 3, x: 218, y: 683 },
          aprovacao: { pageIndex: 4, x: 75, y: 434 },
          aprovacao2: { pageIndex: 4, x: 201, y: 528 },
          pagamento: { pageIndex: 4, x: 75, y: 542 },
          data: { pageIndex: 5, x: 100, y: 365 }
        }
        arquivoSaida = "edital-log";
      }
      else {
        pdfUrl = "/base-rh.pdf"
        curso = 5;
        variablesPositions = {
          edital: { pageIndex: 0, x: 165, y: 144 },
          letivo: { pageIndex: 0, x: 120, y: 330 },
          periodo: { pageIndex: 4, x: 218, y: 175 },
          aprovacao: { pageIndex: 4, x: 75, y: 540 },
          aprovacao2: { pageIndex: 4, x: 201, y: 636 },
          pagamento: { pageIndex: 4, x: 75, y: 650 },
          data: { pageIndex: 5, x: 100, y: 495 }
        }
        arquivoSaida = "edital-grh";
      }
      const pdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());

      // 2. Carregar o PDF no pdf-lib
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // 3. Embutir uma fonte para o texto
      const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // 4. Pegar a primeira página do PDF
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      let semestre = "";
      let numSemestre = "";
      let periodo = "";
      let aprovacacao = "";
      let pagamento = "";
      if (notice.semester.toLocaleLowerCase() != "segundo") {
        semestre = `${curso}/${notice.year}`;
        numSemestre = `01`;
        periodo = `25/01/${notice.year} a 01/02/${notice.year} às 12h.`;
        aprovacacao = `02 de fevereiro de ${notice.year}.`;
        pagamento = `março/${notice.year}.`;
      } else {
        semestre = `${curso + 5}/${notice.year}`;
        numSemestre = `2`;
        periodo = `28/07/${notice.year} a 01/08/${notice.year} às 12h.`;
        aprovacacao = `02 de agosto de ${notice.year}.`;
        pagamento = `setembro/${notice.year}.`;
      }

      // Pega a data atual
      const today = new Date();
      let dataAtual = today.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const variaveis: Record<keyof typeof variablesPositions, string> = {
        edital: `EDITAL  Nº ${semestre}`,
        letivo: `${numSemestre}º Semestre letivo de ${notice.year}`,
        periodo,
        aprovacao: aprovacacao,
        aprovacao2: aprovacacao.slice(0, -1),
        pagamento,
        data: `Mogi das Cruzes, ${dataAtual}`,
      };

      // Iterar sobre as variaveis para substituir
      for (const [variavel, posicao] of Object.entries(variablesPositions)) {
        const { pageIndex, x, y } = posicao;

        // Verifica a existência da página
        if (pdfDoc.getPages().length <= pageIndex) {
          console.warn(`A página ${pageIndex + 1} não existe no PDF.`);
          continue;
        }

        const { width, height } = firstPage.getSize();
        // Add texto na posição específica
        const page = pdfDoc.getPages()[pageIndex];
        page.drawText(variaveis[variavel] || "Erro", {
          x,
          y: height - y,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      }

      // 6. Salvar o PDF modificado
      const modifiedPdfBytes = await pdfDoc.save();

      // 7. Baixar o arquivo editado
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${arquivoSaida}.pdf`;
      link.click();
    } catch (error) {
      console.error("Erro ao editar o PDF:", error);
    }
  };

  async function handleCreateNotice(notice: CreatedNotice): Promise<void> {
    try {
      const result = await noticeUseCases.create(notice)
      updateNoticeState([...notices, result])
      Toast({ message: 'Edital criado com sucesso!', type: 'success' })
      setCreateNoticeModal(false)
      setFormErros([])
    } catch (error: unknown) {
      if (error instanceof RequestError) {
        setFormErros(error.errors)
        Toast({ message: error.message, type: error.type })
      }
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleUpdateNotice(notice: Notice): Promise<void> {
    try {
      const response = await noticeUseCases.updateById(notice)
      const newNotices = notices.map((notice) =>
        notice.id === response.id ? response : notice,
      )
      updateNoticeState(newNotices)
      Toast({ message: 'Edital atualizado com sucesso!', type: 'success' })
      setNoticeToEdit(undefined)
      setFormErros([])
    } catch (error) {
      if (error instanceof RequestError) {
        setFormErros(error.errors)
        Toast({ message: error.message, type: error.type })
      }
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  async function handleDeleteNotice(id: string): Promise<void> {
    try {
      await noticeUseCases.deleteById(id)
      const newNotices = notices.filter((notice) => notice.id !== id)
      setNotices(newNotices)
      Toast({ message: 'Edital excluído com sucesso!', type: 'success' })
      setnoticeToDelete(undefined)
    } catch (error) {
      error instanceof RequestError &&
        Toast({ message: error.message, type: error.type })
      error instanceof UnauthorizedError && Alert.disconnected(logout)
    }
  }

  const filteredNotices = useMemo(() => {
    const lowerCaseSearch = searchNotice.toLowerCase()
    return notices.filter((notice) => {
      return notice.title.toLowerCase().includes(lowerCaseSearch) || notice.description.toLowerCase().includes(lowerCaseSearch)
    })
  }, [notices, searchNotice])

  const filteredData = !searchNotice ? notices : filteredNotices

  const isUserDirector = user?.role.startsWith('DIRETOR')

  return (
    <>
      <ToastContainer />
      <PageContainer>
        <PageTitleWrapper>
          {isUserDirector && (
            <BreadCrumb crumbs={[{ title: 'Início' }, { title: 'Editais' }]} />
          )}
          <PageTitle>Gestão de editais</PageTitle>
        </PageTitleWrapper>
        <PageHeader>
          <MainOptions>
            <SearchBar
              type="text"
              placeholder="Buscar por editais"
              onChange={(e) => setsearchNotice(e.target.value)}
            />
            {isUserDirector && (
              <MainButton
                color="blue-400"
                hoverColor="blue-350"
                onClick={() => setCreateNoticeModal(true)}
              >
                Criar edital
                <PlusCircle size={18} color="#FFFFFF" weight="bold" />
              </MainButton>
            )}
          </MainOptions>
          {isUserDirector && (
            <FilterContainer>
              <OptionsContainer>
                <FilterOption
                  label="Editais Ativos"
                  param="active"
                  value="true"
                  defaultChecked={true}
                />
                <FilterOption
                  label="Editais Inativos"
                  param="active"
                  value="false"
                />
              </OptionsContainer>
            </FilterContainer>
          )}
        </PageHeader>
        {createNoticeModal && (
          <CreateNoticeModal
            courses={courses}
            possibleErrors={formErros}
            show={createNoticeModal}
            onHide={() => {
              setCreateNoticeModal(false)
              setFormErros([])
            }}
            createNotice={handleCreateNotice}
          />
        )}
        {noticeToView && (
          <ViewNoticeModal
            notice={noticeToView}
            show={!!noticeToView}
            onHide={() => setNoticeToView(undefined)}
          />
        )}
        {noticeToEdit && (
          <EditNoticeModal
            courses={courses}
            noticeToEdit={noticeToEdit}
            possibleErrors={formErros}
            editNotice={handleUpdateNotice}
            show={!!noticeToEdit}
            onHide={() => {
              setNoticeToEdit(undefined)
              setFormErros([])
            }}
          />
        )}
        {noticeToDelete && (
          <DeleteNoticeModal
            title={noticeToDelete.title}
            show={!!noticeToDelete}
            onHide={() => setnoticeToDelete(undefined)}
            handleDeleteNotice={() => handleDeleteNotice(noticeToDelete.id)}
          />
        )}
        <PageLoader loading={loading} />
        {notices.length === 0 && !loading && (
          <NoEntitiesFound
            message="Comece criando um novo edital ou redefinindo os filtros de busca"
            Icon={<NewspaperClipping size={32} color="#645C5A" weight="fill" />}
          />
        )}
        {!loading && filteredData.length > 0 && (
          <MainTable
            headers={['Título', 'Curso', 'Tópicos de interesse', 'Ações']}
          >
            {filteredData
              .sort((current, next) => current.title.localeCompare(next.title))
              .map((notice) => (
                <MainTableRow
                  key={notice.id}
                  entityData={[
                    notice.title,
                    notice.course.name,
                    notice.topicsOfInterest.join(' | '),
                  ]}
                  renderIconCondition={isUserDirector}
                  viewEntity={() => setNoticeToView(notice)}
                  editEntity={() => setNoticeToEdit(notice)}
                  deleteEntity={() => setnoticeToDelete(notice)}
                  getReport={() => getReport(notice)}
                />
              ))}
          </MainTable>
        )}
      </PageContainer>
    </>
  )
}
