import Link from 'next/link'
import styled from 'styled-components'
import { SanitizedHtml } from '.'

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

    code {
      font-size: 0.95rem;
    }
  }
`

interface Props {
  crumbs: Array<{
    label: string
    link: string
    isHtml?: boolean
  }>
}

export function Breadcrumbs({ crumbs }: Props) {
  return (
    <BreadcrumbList>
      {crumbs.map((crumb) => (
        <li key={crumb.link}>
          <Link href={crumb.link} passHref>
            {crumb.isHtml ? <SanitizedHtml html={crumb.label} /> : crumb.label}
          </Link>
        </li>
      ))}
    </BreadcrumbList>
  )
}
