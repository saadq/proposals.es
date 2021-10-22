import Link from 'next/link'
import styled from 'styled-components'

const BreadcrumbList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  margin-bottom: 2rem;
  padding: 0;

  li {
    display: flex;

    &:last-child::after {
      content: '';
    }

    &::after {
      content: '/';
      margin: 0 1rem;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

interface Props {
  crumbs: Array<{
    label: string
    link: string
  }>
}

export function Breadcrumbs({ crumbs }: Props) {
  return (
    <BreadcrumbList>
      {crumbs.map((crumb) => (
        <li key={crumb.link}>
          <Link href={crumb.link} passHref>
            <a>{crumb.label}</a>
          </Link>
        </li>
      ))}
    </BreadcrumbList>
  )
}
