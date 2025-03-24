import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { Dispatch, SetStateAction } from 'react'
import { ProjectFormParams } from '@/domain/project/validation/ProjectZodValidation'

import { StyledContainer } from './Styles'

interface RichTextProps {
  setEditor?: Dispatch<SetStateAction<ClassicEditor | undefined>>
  updateFieldValue?: (field: keyof ProjectFormParams, value: string) => void
  field: keyof ProjectFormParams
  fieldValue?: string
}

export default function RichText({
  fieldValue,
  field,
  setEditor,
  updateFieldValue,
}: RichTextProps) {
  return (
    <StyledContainer>
      <CKEditor
        editor={ClassicEditor}
        data={fieldValue ?? undefined}
        disabled={!(setEditor && updateFieldValue)}
        config={{
          toolbar: [
            'undo',
            'redo',
            '|',
            'bold',
            'italic',
            '|',
            'bulletedList',
            'numberedList',
          ],
        }}
        onBlur={(event, editor) =>
          updateFieldValue ? updateFieldValue(field, editor.getData()) : null
        }
        onReady={(editor) => (setEditor ? setEditor(editor) : null)}
      />
    </StyledContainer>
  )
}
