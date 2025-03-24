import {
  MainModal,
  ModalForm,
  MainTextArea,
  MainLabelWithRemoveButton,
  MainLabel,
  MainInput,
} from '@/presentation/components'

import {
  AlignedInputs,
  ColoredErrorMessage,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import {
  MainButton,
  PrettyButton,
} from '@/presentation/components/buttons/Styles'
import {
  ModalSectionTitle,
  HorizontalLine,
  RedSpan,
  MainInputFile,
  UploadFileContainer,
  ImageContainer,
  UploadImagesContainer,
  RemoveImageContainer,
  RemoveImageIcon,
  SvgContainer,
} from '@/presentation/pages/reports/modals/styles/Styles'
import { useActivity, useReportValidation } from '@/presentation/hooks'
import { handleInputData } from '@/presentation/utils/HandleInputData'

import { CreateReport, type Report } from '@/domain/report/entities/Report'

import { useEffect, useState } from 'react'
import {
  FileArrowUp,
  FileDoc,
  FilePdf,
  FilePpt,
  FileXls,
  FileZip,
  X,
} from 'phosphor-react'

interface FormData {
  active: string
  activities: string[]
}
interface EditReportModalProps {
  report: Report
  show: boolean
  onHide: VoidFunction
  handleSave: (createReport: CreateReport) => Promise<void>
}

export default function EditReportModal({
  report,
  show,
  onHide,
  handleSave,
}: EditReportModalProps) {
  const { activities, setActivities, addActivity, removeActivity } =
    useActivity(report?.activities ?? [])
  const { errors, validate, clearErrors } = useReportValidation()
  const [images, setImages] = useState<File[]>([])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    clearErrors()
    const form = e.currentTarget
    const formLength = form.length

    const data: FormData = {
      active: report.active ? 'Ativo' : 'Inativo',
      activities: [],
    }

    for (let i = 0; i < formLength; i++) {
      handleInputData(data, form[i])
    }

    const activities = data.activities

    validate(activities)

    if (errors === null || errors.issues.length === 0) {
      await handleSave({
        activities: activities.map((description) => {
          return { description }
        }),
        projectId: report.project.id,
        files: images,
      })
    }
  }

  useEffect(() => {
    if (errors && errors.issues.length === 0) {
      clearErrors()
    }
  }, [errors, clearErrors])

  useEffect(() => {
    const convertUrlToFile = async (url: string) => {
      const response = await fetch(url)
      const blob = await response.blob()
      const fileName = url.split('/').pop()?.split('?')[0] ?? ''
      return new File([blob], fileName, { type: blob.type })
    }

    const fetchImages = async () => {
      if (report.images) {
        const filePromises = report.images.map((image) =>
          convertUrlToFile(image),
        )
        const files = await Promise.all(filePromises)
        setImages(files)
      }
    }

    fetchImages()
  }, [report.images])

  function handleAddNewFiles(file: React.ChangeEvent<HTMLInputElement>) {
    if (!file.target.files) return

    const files = Array.from(file.target.files)

    setImages((prev) => [...prev, ...files])
  }

  return (
    <MainModal
      title="Editar relatório"
      size="xl"
      show={show}
      onHide={onHide}
      closable="static"
    >
      <ModalForm onSubmit={onSubmit}>
        <AlignedInputs>
          <InputDiv>
            <MainLabel htmlFor="title">Título do Projeto:</MainLabel>
            <MainInput
              id="title"
              type="text"
              value={report.project.title}
              disabled
            />
          </InputDiv>
          <InputDiv>
            <MainLabel htmlFor="active">Situação:</MainLabel>
            <MainInput
              id="active"
              type="text"
              name="active"
              value={report.active ? 'Ativo' : 'Inativo'}
              disabled
            />
          </InputDiv>
        </AlignedInputs>
        <HorizontalLine />
        <ModalSectionTitle>Registro de atividades</ModalSectionTitle>
        {activities.map((activity, index) => (
          <InputDiv key={index}>
            <MainLabelWithRemoveButton htmlFor="title">
              Descrição da Atividade {index + 1}:
              <RedSpan
                title={`Clique para remover a atividade ${index + 1}`}
                onClick={() => {
                  removeActivity(index)
                }}
              >
                <X size={24} />
              </RedSpan>
            </MainLabelWithRemoveButton>
            {errors && (
              <ColoredErrorMessage>
                {errors.issues.find((issue) => issue.index === index)?.message}
              </ColoredErrorMessage>
            )}
            <MainTextArea
              rows={10}
              id="title"
              name="activities"
              value={activity.description}
              placeholder="Preencha com as informações da atividade, se possível, quantifique de alguma forma os resultados obtidos com a atividade, por exemplo: Foram feitas aulas de reforço da matéria x para 10 alunos do 1º semestre"
              onChange={(event) =>
                setActivities((prev) => {
                  const newActivities = [...prev]
                  newActivities[index].description = event.target.value
                  return newActivities
                })
              }
            />
          </InputDiv>
        ))}
        <PrettyButton
          type="button"
          onClick={(e) => {
            e.preventDefault()
            addActivity()
          }}
        >
          Adicionar nova atividade
        </PrettyButton>
        <HorizontalLine />
        <ModalSectionTitle>Enviar arquivos</ModalSectionTitle>
        <UploadFileContainer>
          <label
            htmlFor="files"
            title="Enviar arquivos de imagem no formato jpg e png"
          >
            Clique para escolher seus arquivos
            <FileArrowUp size={22} weight="bold" />
          </label>
          <MainInputFile
            id="files"
            type="file"
            multiple
            accept=".jpg, .png, .pdf, .xlsx, .doc, .docx"
            onChange={(event) => handleAddNewFiles(event)}
          />
        </UploadFileContainer>
        {images.length > 0 && (
          <UploadImagesContainer>
            {images.map((image, index) => {
              let imgElement = (
                <img src={URL.createObjectURL(image)} alt={image.name} />
              )
              if (image.name.includes('.zip')) {
                imgElement = (
                  <SvgContainer>
                    <p>{image.name}</p>
                    <FileZip size={32} />
                  </SvgContainer>
                )
              }
              if (image.name.includes('.pptx')) {
                imgElement = (
                  <SvgContainer>
                    <p>{image.name}</p>
                    <FilePpt size={32} />
                  </SvgContainer>
                )
              }
              if (
                image.type === 'application/pdf' ||
                image.name.includes('.pdf')
              ) {
                imgElement = (
                  <SvgContainer>
                    <p>{image.name}</p>
                    <FilePdf size={32} />
                  </SvgContainer>
                )
              }

              if (
                image.type ===
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                image.type === 'application/vnd.ms-excel' ||
                image.name.includes('.xls')
              ) {
                imgElement = (
                  <SvgContainer>
                    <p>{image.name}</p>
                    <FileXls size={32} />
                  </SvgContainer>
                )
              }

              if (
                image.type === 'application/msword' ||
                image.type ===
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                image.name.includes('.doc')
              ) {
                imgElement = (
                  <SvgContainer>
                    <p>{image.name}</p>
                    <FileDoc size={32} />
                  </SvgContainer>
                )
              }

              return (
                <ImageContainer key={index}>
                  {imgElement}
                  <RemoveImageContainer
                    title="Clique para remover a imagem"
                    onClick={() => {
                      setImages((prev) => prev.filter((prev) => prev !== image))
                    }}
                  >
                    <RemoveImageIcon size={22} />
                  </RemoveImageContainer>
                </ImageContainer>
              )
            })}
          </UploadImagesContainer>
        )}
        <ButtonsDiv>
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
          <MainButton type="submit" color="blue-400" hoverColor="blue-350">
            Salvar Relatório
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
