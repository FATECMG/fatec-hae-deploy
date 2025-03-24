import { Title } from '@/presentation/components/modal/mainModal/Styles'
import { Trash, FileArrowDown } from 'phosphor-react'
import styled from 'styled-components'

export const HorizontalLine = styled.div`
  border: 1px solid ${({ theme }) => theme['white-325']};
  background-color: ${({ theme }) => theme['white-325']};
  height: 0.125rem;
  margin: 1rem 0;
  width: 100%;
`
export const ModalSectionTitle = styled(Title)`
  font-size: 1.25rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme['black-350']};
  text-align: center;
`

export const RedSpan = styled.span`
  color: ${({ theme }) => theme['red-400']};
  cursor: pointer;
`

export const UploadFileContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme['white-350']};
  border-radius: 6px;

  label {
    display: inherit;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Popins', sans-serif;
    font-weight: 600;
    color: ${({ theme }) => theme['black-350']};
    font-size: 1rem;
    background-color: ${({ theme }) => theme['white-300']};
    width: 100%;
    cursor: pointer;
    padding: 1rem;
    text-align: center;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme['white-250']};
    }
  }
`

export const MainInputFile = styled.input`
  display: none;
`

export const UploadImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

export const ImageContainer = styled.div`
  height: 300px;
  position: relative;

  img,
  svg {
    height: 100%;
    width: 100%;
    object-fit: contain;
    border-radius: 6px;
    border: 2px solid ${({ theme }) => theme['white-350']};
  }
`

export const SvgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 521px;
  border: 2px solid ${({ theme }) => theme['white-350']};
  border-radius: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  p {
    text-align: start;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    @media (max-width: 992px) {
      width: auto;
    }
  }

  @media (max-width: 992px) {
    max-width: 418px;
  }
`

export const RemoveImageContainer = styled.div`
  position: absolute;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  bottom: -1rem;
  background: ${({ theme }) => theme['white-275']};
  border: 2px solid ${({ theme }) => theme['white-350']};
  border-radius: 50%;
  padding: 0.25rem;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme['white-250']};

    svg {
      color: ${({ theme }) => theme['red-350']};
    }
  }
`

export const DownloadImageContainer = styled.div`
  position: absolute;
  cursor: pointer;
  left: 50%;
  transform: translateX(-50%);
  bottom: -1rem;
  background: ${({ theme }) => theme['white-275']};
  border: 2px solid ${({ theme }) => theme['white-350']};
  border-radius: 50%;
  padding: 0.25rem;
  transition: background 0.3s, color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme['white-250']};

    svg {
      color: ${({ theme }) => theme['blue-350']};
    }
  }
`

export const DownloadImageIcon = styled(FileArrowDown)`
  color: ${({ theme }) => theme['blue-350']};
`

export const RemoveImageIcon = styled(Trash)`
  color: ${({ theme }) => theme['red-400']};
`
