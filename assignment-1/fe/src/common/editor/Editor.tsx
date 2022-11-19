import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from 'src/common/ckeditor5/build/ckeditor'
type EditorProps = {
  data?: string
  value?: string
  onReady?: (editor) => void
  onChange?: (event, editor) => void
  onBlur?: (event, editor) => void
  onFocus?: (event, editor) => void
  minHeight?: number
}

const Editor: React.FC<EditorProps> = (props) => {
  return (
    <div className="ecm-editor">
      <CKEditor editor={ClassicEditor} {...props} />
      <style jsx global>
        {`
          .ecm-editor {
            width: 100%;
          }
          .ecm-editor .ck-editor__editable_inline {
            min-height: ${props.minHeight || '300px'};
          }

          .ecm-editor ul,
          .ecm-editor ul li {
            list-style-type: circle;
          }

          .ecm-editor ol,
          .ecm-editor ol li {
            list-style-type: decimal !important;
          }
        `}
      </style>
    </div>
  )
}

export default Editor
