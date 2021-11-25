import { Header } from '@proposals.es/ui'
import { hello } from '@proposals.es/utils'
import { PageContainer } from '../../components/common'

export default function WasmPage() {
  hello()
  return (
    <PageContainer width="85%" margin="0 auto">
      <h1>WASM</h1>
      <Header>Common package header</Header>
    </PageContainer>
  )
}
