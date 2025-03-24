import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { StyledContainer } from './Styles'

interface RichTextProps {
  fieldValue: string
}

export default function ViewDataEditor({ fieldValue }: RichTextProps) {
  return (
    <StyledContainer>
      <CKEditor
        editor={ClassicEditor}
        data={fieldValue}
        disabled={true}
        config={{
          toolbar: [],
          heading: {
            options: [],
          },
        }}
      />
    </StyledContainer>
  )
}
