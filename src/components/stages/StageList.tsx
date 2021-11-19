import Link from 'next/link'
import styled from 'styled-components'
import { Stage } from '../../types'
import { formatStageName } from '../../utils/formatStageName'
import { Heading } from '../common'
import type { IconType } from 'react-icons'
import { GiScarecrow, GiTeamUpgrade } from 'react-icons/gi'
import { RiDraftLine, RiCheckLine, RiCloseLine } from 'react-icons/ri'
import { HiOutlineLightBulb } from 'react-icons/hi'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export const List = styled.ul`
  display: flex;
  gap: 2rem;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  li {
    max-width: 30%;

    @media (max-width: 768px) {
      width: 100%;
      max-width: 100%;
    }
  }
`

const StageLink = styled.a`
  display: flex;
  height: 20rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 0 1rem;
  text-align: center;
  background: var(--card-color);
  color: var(--foreground);
  box-shadow: var(--card-shadow);
  border: var(--card-border);
  transition: 0.4s ease;
  border-radius: 4px;
  font-weight: bold;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem;
  }

  &:hover {
    background: var(--primary);
    color: black;
  }
`

const StageDescription = styled.p`
  font-weight: normal;
  font-size: 0.9rem;

  @media (max-width: 1024px) {
    display: none;
  }
`

interface StageDetails {
  description: string
  icon: IconType
}

const detailsByStage: Record<Stage, StageDetails> = {
  inactive: {
    description:
      'Inactive proposals are proposals that at one point were presented to the committee but were subsequently abandoned, withdrawn, or rejected.',
    icon: RiCloseLine
  },
  stage0: {
    description:
      'Stage 0 proposals are either planned to be presented to the committee by a TC39 champion, or they have been presented to the committee and not rejected definitively, but have not yet achieved any of the criteria to get into stage 1.',
    icon: GiScarecrow
  },
  stage1: {
    description:
      'Stage 1 proposals represent problems that the committee is interested in spending time exploring solutions to. This stage is where a formal proposal that describes a specific problem and solution is created and reviewed.',
    icon: HiOutlineLightBulb
  },
  stage2: {
    description:
      'Stage 2 precisely describes the syntax and semantics using formal spec language. It indicates that the committee expects these features to be developed and eventually included in the standard.',
    icon: RiDraftLine
  },
  stage3: {
    description:
      'Stage 3 indicates that the solution is complete and no further work is possible without implementation experience, significant usage and external feedback.',
    icon: GiTeamUpgrade
  },
  stage4: {
    description:
      'Stage 4 indicates that the addition is ready for inclusion in the formal ECMAScript standard.',
    icon: RiCheckLine
  }
}

interface Props {
  stages: Stage[]
}

export function StageList({ stages }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <List>
      {stages.map((stage) => {
        const { icon: IconForStage, description } = detailsByStage[stage]

        return (
          <li key={stage}>
            <Link href={`/stages/${stage}`} passHref>
              <StageLink>
                <IconForStage size={isMobile ? 25 : 50} />
                <Heading level={2} fontSize="1.75rem" margin="1rem 0 0 0">
                  {formatStageName(stage)}
                </Heading>
                <StageDescription>{description}</StageDescription>
              </StageLink>
            </Link>
          </li>
        )
      })}
    </List>
  )
}
