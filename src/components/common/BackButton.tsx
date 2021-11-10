import { useRouter } from 'next/router'
import { useCallback } from 'react'
import styled from 'styled-components'

export const Button = styled.button`
  background: transparent;
  color: black;
  padding: 1rem 2rem;
  align-self: flex-start;
  border: 1px solid black;
  border-radius: 4px;
`

export function BackButton() {
  const router = useRouter()

  const goBack = useCallback(() => {
    router.back()
  }, [router])

  return <Button onClick={goBack}>Go back</Button>
}
