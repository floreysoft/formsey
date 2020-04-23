
// import "./webpack-resolver";
import { getTheme } from '@formsey/core'
import 'ace-builds/src-min-noconflict/ace.js'
import './SignatureField'
import './SourceCodeField'

export { SignatureField } from './SignatureField'
export { SourceCodeField, SourceCodeFieldDefinition } from './SourceCodeField'

let theme = getTheme('native')
if ( theme ) {
  theme.components = {
    ...theme.components,
    'signature': 'formsey-signature',
    'sourceCode': 'formsey-sourcecode'
  }
}