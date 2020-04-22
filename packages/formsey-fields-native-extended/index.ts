
// import "./webpack-resolver";
import { themes } from '@formsey/core'
import 'ace-builds/src-min-noconflict/ace.js'
import './SourceCodeField'
import './SignatureField'

export { SignatureField } from './SignatureField'
export { SourceCodeField, SourceCodeFieldDefinition } from './SourceCodeField'

themes['native'] = {
  components: {
    ...themes['native'].components,
    'signature': 'formsey-signature',
    'sourceCode': 'formsey-sourcecode'
  }
}