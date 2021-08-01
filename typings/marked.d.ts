import { Token } from 'marked'

declare module 'marked' {
  export namespace Tokens {
    export interface Table {
      tokens: {
        header: Token[][]
        cells: Token[][][]
      }
    }
  }
}
