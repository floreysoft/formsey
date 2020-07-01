
// import "./webpack-resolver";
import { registerTheme } from '@formsey/core'

export { SignatureField } from './SignatureField'
export { SourceCodeField, SourceCodeFieldDefinition } from './SourceCodeField'
export { MarkdownField } from './MarkdownField';

registerTheme('native', {
  components: {
    'signature': 'formsey-signature',
    'sourceCode': 'formsey-sourcecode',
    'markdown': 'formsey-markdown'
  }
})