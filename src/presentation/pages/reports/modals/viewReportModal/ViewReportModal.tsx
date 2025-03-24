import {
  MainInput,
  MainLabel,
  MainModal,
  ModalForm,
  MainTextArea,
} from '@/presentation/components'
import {
  AlignedInputs,
  InputDiv,
} from '@/presentation/pages/users/modals/createUserModal/Styles'
import { ButtonsDiv } from '@/presentation/pages/schools/modals/createSchoolModal/Styles'
import { MainButton } from '@/presentation/components/buttons/Styles'
import {
  ModalSectionTitle,
  HorizontalLine,
  UploadImagesContainer,
  ImageContainer,
  RemoveImageContainer,
  RemoveImageIcon,
  SvgContainer,
  DownloadImageContainer,
  DownloadImageIcon,
} from '@/presentation/pages/reports/modals/styles/Styles'

import { type Report } from '@/domain/report/entities/Report'

import { Fragment, useEffect, useState } from 'react'
import { FilePdf, FileXls, FileDoc, FilePpt, FileZip } from 'phosphor-react'

interface ViewReportModalProps {
  report: Report
  show: boolean
  onHide: VoidFunction
}

export default function ViewReportModal({
  report,
  show,
  onHide,
}: ViewReportModalProps) {
  const [images, setImages] = useState<File[]>([])

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

  function downloadFile(fileToBeDownloaded: File) {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(fileToBeDownloaded)
    link.download = fileToBeDownloaded.name
    link.click()
  }

  return (
    <MainModal
      title={`Relatório do projeto ${report.project.title}`}
      show={show}
      onHide={onHide}
      size="xl"
    >
      <ModalForm>
        <MainLabel htmlFor="author">Autor:</MainLabel>
        <MainInput
          id="author"
          type="text"
          value={report.author.name}
          disabled
        />
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
              value={report.active ? 'Ativo' : 'Inativo'}
              disabled
            />
          </InputDiv>
        </AlignedInputs>
        <HorizontalLine />
        <ModalSectionTitle>Atividades registradas</ModalSectionTitle>
        {report.activities.map((activity, index) => (
          <Fragment key={index}>
            <InputDiv>
              <MainLabel htmlFor="title">
                Descrição da Atividade {index + 1}:
              </MainLabel>
              <MainTextArea
                rows={10}
                id="title"
                value={activity.description}
                disabled
              />
            </InputDiv>
          </Fragment>
        ))}
        {images && images.length > 0 && (
          <>
            <HorizontalLine />
            <ModalSectionTitle>Arquivos enviados</ModalSectionTitle>
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
                if (image.name.includes('.pdf')) {
                  imgElement = (
                    <SvgContainer>
                      <p>{image.name}</p>
                      <FilePdf size={32} />
                    </SvgContainer>
                  )
                }

                if (image.name.includes('.xls')) {
                  imgElement = (
                    <SvgContainer>
                      <p>{image.name}</p>
                      <FileXls size={32} />
                    </SvgContainer>
                  )
                }

                if (image.name.includes('.doc')) {
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
                      title="Clique para remover o anexo"
                      onClick={() => {
                        setImages((prev) =>
                          prev.filter((prev) => prev !== image),
                        )
                      }}
                    >
                      <RemoveImageIcon size={22} />
                    </RemoveImageContainer>
                    <DownloadImageContainer
                      title="Clique para baixar o anexo"
                      onClick={() => downloadFile(image)}
                    >
                      <DownloadImageIcon size={22} />
                    </DownloadImageContainer>
                  </ImageContainer>
                )
              })}
            </UploadImagesContainer>
          </>
        )}
        <ButtonsDiv justifyOption="right">
          <MainButton
            type="button"
            color="black-400"
            hoverColor="black-350"
            onClick={onHide}
          >
            Fechar
          </MainButton>
        </ButtonsDiv>
      </ModalForm>
    </MainModal>
  )
}
