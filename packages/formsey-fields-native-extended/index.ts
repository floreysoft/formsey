
// import "./webpack-resolver";
import { registerTheme } from '@formsey/core'
import 'ace-builds/src-min-noconflict/ace.js'
import './SignatureField'
import './SourceCodeField'

export { SignatureField } from './SignatureField'
export { SourceCodeField, SourceCodeFieldDefinition } from './SourceCodeField'

registerTheme('native', {
  components: {
    'signature': 'formsey-signature',
    'sourceCode': 'formsey-sourcecode'
  }
})