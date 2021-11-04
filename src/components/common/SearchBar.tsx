import { ChangeEvent, FC, memo, useCallback } from 'react'
import styled from 'styled-components'
import { SearchIcon } from './SearchIcon'
import { ClearSearchIcon } from './ClearSearchIcon'
import { debounce } from '../../utils/debounce'

const Container = styled.div<{ width: string }>`
  position: relative;
  margin: 0 auto;
  width: ${({ width }) => width};
  max-width: 100%;
`

const SearchInput = styled.input`
  border: none;
  padding: 1rem 4rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
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
}

export const SearchBar: FC<Props> = memo(
  ({ searchQuery, setSearchQuery, placeholder, debounceRate, width = '100%' }) => {
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
        {searchQuery.trim() !== '' && (
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
        )}
        <SearchInput placeholder={placeholder} onChange={handleChange} />
      </Container>
    )
  }
)
