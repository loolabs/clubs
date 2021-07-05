import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { TagGroup, TagRow } from './Tag'
import { TagBubble } from '../common/TagBubble'
import { House } from '../../utils'
import { colours } from '../../styles'

// Shared styled components that can probably be factored out later
const Icon = styled.img<{ size: string }>`
  border-radius: 4px;
  height: ${({ size }) => size};
  object-fit: cover;
  width: ${({ size }) => size};
`

const HouseCardContainer = styled.div`
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  cursor: pointer;

  // A subtle shadow around the card
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
`

const HouseCardBanner = styled.div<{ bannerImageURL: string }>`
  background-image: url(${({ bannerImageURL }) => bannerImageURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 0;
  padding-top: calc(100% / 3); // 3:1 aspect ratio
  width: 100%;
`

const HouseCardContent = styled.div`
  margin: 24px;
`

const HouseCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 56px;
  justify-content: space-between;
`

const HouseCardName = styled.h2`
  flex-grow: 1;
  font-size: 20px;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 16px;
  margin-top: 0;
  overflow: hidden;
  text-overflow: ellipsis;

  // Truncate overflowing text
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const HouseCardDescription = styled.p`
  height: 64px;
  overflow: hidden;
  position: relative;
  margin-bottom: 24px;
  margin-top: 16px;

  // Truncate overflowing text with an ellipse
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`

const ClubCardTag = (tag: string) => {
  if (tag in colours.tagColours) {
    return (
      <TagBubble colour={colours.tagColours[tag]} key={`club-card-tag-${tag}`}>
        {tag}
      </TagBubble>
    )
  } else {
    return <TagBubble key={`club-card-tag-${tag}`}>{tag}</TagBubble>
  }
}

interface HouseCardProps {
  House: House
}

export const HouseCard = ({ House }: HouseCardProps) => {
  const { id, name, description } = House
  const router = useRouter()

  const handleClick = () => {
    router.push({ pathname: `/Houses/${id}` })
  }

  return (
    <HouseCardContainer onClick={handleClick}>
      {/* <HouseCardBanner bannerImageURL={links.bannerImage}></HouseCardBanner> */}
      <HouseCardContent>
        <HouseCardHeader>
          <HouseCardName>{name}</HouseCardName>
          {/* <Icon src={links.iconImage} size="56px"></Icon> */}
        </HouseCardHeader>
        <HouseCardDescription>{description}</HouseCardDescription>
        {/* <TagRow>
          <TagGroup>{tags.map(HouseCardTag)}</TagGroup>
        </TagRow> */}
      </HouseCardContent>
    </HouseCardContainer>
  )
}
