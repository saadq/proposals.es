import { ChangeEvent, FC, memo, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { SearchIcon, ClearSearchIcon } from './icons'
import { debounce } from '../../utils/debounce'

const Container = styled.div<{ width: string; hideOnMobile?: boolean }>`
  position: relative;
  margin: 0 auto;
  width: ${({ width }) => width};
  max-width: 100%;
`

const SearchInput = styled.input`
  border: 1px solid #f4f6fb;
  box-shadow: 0px 8px 10px #e7f0f3;
  padding: 1rem 4rem;
  border-radius: 4px;
  width: 100%;
  font-family: 'Nunito';
  font-weight: bold;

  &::placeholder {
    opacity: 0.75;
    font-weight: bold;
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 5px ${({ theme }) => theme.colors.primary};
  }
`

interface Props {
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  placeholder: string
  debounceRate?: number
  width?: string
  hideOnMobile?: boolean
}

export const SearchBar: FC<Props> = memo(
  ({ searchQuery, setSearchQuery, placeholder, debounceRate, width = '100%' }) => {
    const inputRef = useRef<HTMLInputElement>(null) // Don't use a controlled input to make typing smoother

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleChange = useCallback(
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value
        setSearchQuery(query)
      }, debounceRate),
      [setSearchQuery]
    )

    const handleClearClick = useCallback(() => {
      setSearchQuery('')
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }, [setSearchQuery])

    return (
      <Container width={width}>
        <SearchIcon
          style={{
            position: 'absolute',
            left: '1.5rem',
            top: 0,
            bottom: 0,
            margin: 'auto'
          }}
        />
        {searchQuery.trim() !== '' ? (
          <ClearSearchIcon
            onClick={handleClearClick}
            style={{
              cursor: 'pointer',
              position: 'absolute',
              right: '2rem',
              top: 0,
              bottom: 0,
              margin: 'auto'
            }}
          />
        ) : null}
        <SearchInput placeholder={placeholder} onChange={handleChange} ref={inputRef} />
      </Container>
    )
  }
)
