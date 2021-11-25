import { Button } from '@proposals.es/ui'
import { hello } from '@proposals.es/utils'
import { PageContainer } from '../../components/common'

export default function WasmPage() {
  hello()
  return (
    <PageContainer width="85%" margin="0 auto">
      <h1>WASM</h1>
      <Button>I am a button</Button>
    </PageContainer>
  )
}
