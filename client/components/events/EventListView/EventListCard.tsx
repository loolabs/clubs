import React from 'react'
import { useRouter } from 'next/router'
import { Event } from '../../../context'
import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../../../styles'

interface EventProps {
  event: Event
}

const ListCard = styled.div`
  margin-bottom: 20px;
  flex: 3 0 auto;
  display: flex;
  width: auto;
  border-radius: 6px;
  box-shadow: 0px 4px 4px 1px ${colours.neutralLight1};
  @media not all and ${device.tablet} {
    margin-right: 150px;
  }
`

interface ListCardImageProps {
  backgroundImageURL: string
}

const ListCardImage = styled.div<ListCardImageProps>`
  height: auto;
  flex 0 0 80px;
  cursor: pointer;
  @media not all and ${device.laptop} {
    flex 0 0 200px;
  }
  
  ${(props: ListCardImageProps) => `
    background-image: url(${props.backgroundImageURL});
 `};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

const ListCardContent = styled.div`
  padding: 20px;
  flex-grow: 1
`

const ListCardName = styled.div`
  font-weight: bold;
  font-size: ${mobileFontSize.h3};
  @media not all and ${device.tablet} {
    font-size: ${desktopFontSize.h3};
  }
  margin-bottom: 5px;
`

const ListCardTime = styled.div`
  font-size: ${mobileFontSize.subtitle2};
  line-height: 120%;
  margin-bottom: 20px;
  @media not all and ${device.tablet} {
    font-size: ${desktopFontSize.subtitle2};
  }
`

const ListCardFooter = styled.div`
  display: block;
  justify-content: space-between;
  @media not all and ${device.tablet} {
    display: flex;  
  }
`

const ListCardClub = styled.div`
  font-size: ${mobileFontSize.subtitle2};
  font-weight: bold;
  flex: 0 0 100px;
  margin-bottom: 10px;
  @media not all and ${device.tablet} {
    font-size: ${desktopFontSize.subtitle2};
  }
`

const ListCardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  @media not all and ${device.tablet} {
    margin-top: 0;
    justify-content: flex-end;
  }
`

const ListCardTag = styled.div<any>`
  margin-right: 12px;
  margin-bottom: 10px;
  padding: 8px 16px;
  background: white;
  flex: 0 0 50px;
  border-radius: 50px;
  ${(props: any) => `
    border: 2px solid ${colours.tagColours[props.tag]};
 `};
`
const MAXIMUM_NUMBER_OF_VIEWABLE_TAGS = 3;

export const EventListCard = ({ event }: EventProps) => {
  const { id, name, club, backgroundImageURL, startDate, endDate, tags } = event

  const router = useRouter()

  const handleEventClick = () => {
    router.push({ pathname: `/events/${id}` })
  }

  const getFormattedTimeString = () => (
     //Format: 8:55 PM - 9:55 PM EST
    `${startDate.format('LT')} - ${endDate.format('LT z')}`
  )

  const getFormattedTags = () => {
    let formattedTags = [...tags];
    if(tags.length > MAXIMUM_NUMBER_OF_VIEWABLE_TAGS){
      formattedTags = formattedTags.slice(0, MAXIMUM_NUMBER_OF_VIEWABLE_TAGS);
    }
    return formattedTags.map((tag, index) => <ListCardTag tag={tag} key={`list-card-tag-${index}-${tag}`}>
    {tag}
  </ListCardTag>)
  }


  return (
    <ListCard onClick={handleEventClick}>
      <ListCardImage backgroundImageURL={backgroundImageURL}/>
      <ListCardContent>
        <ListCardName>
          {name}
        </ListCardName>
        <ListCardTime>
          {getFormattedTimeString()}
        </ListCardTime>
        <ListCardFooter>
          <ListCardClub>
            {club.name}
          </ListCardClub>
          <ListCardTags>
            {getFormattedTags()}
          </ListCardTags>
        </ListCardFooter>
      </ListCardContent>
    </ListCard>
  )
}
