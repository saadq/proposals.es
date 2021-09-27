import { ChangeEvent, useCallback } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '../common/SearchIcon'
import { ClearSearchIcon } from '../common/ClearSearchIcon'

const Container = styled.div`
  position: relative;
  width: 50rem;
  max-width: 100%;
  margin: 0 auto;
`

const SearchInput = styled.input`
  border: none;
  padding: 2rem 4rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  width: 100%;
  font-family: 'Open Sans';
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
}

export function SearchBar({ searchQuery, setSearchQuery }: Props) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value
      setSearchQuery(query)
    },
    [setSearchQuery]
  )

  const handleClearClick = useCallback(() => {
    setSearchQuery('')
  }, [setSearchQuery])

  return (
    <Container>
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
      <SearchInput
        placeholder="Search for proposals..."
        value={searchQuery}
        onChange={handleChange}
      />
    </Container>
  )
}
