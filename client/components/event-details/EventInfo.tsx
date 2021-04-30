import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Event } from '../../context'
import { desktopFontSize, fontWeight, PageTitle } from '../../styles'
import { Category } from '../Category'

const BackArrow = styled.img`
  margin-top: 64px;
  cursor: pointer;
`

const EventName = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const EventMetaData = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const Date = styled.p`
  font-size: ${desktopFontSize.h3};
  font-weight: ${fontWeight.semiBold};
  margin-bottom: 0;
`

const CategoriesWrapper = styled.div`
  display: flex;
  margin-left: auto;
`

const EventDescription = styled.p`
  line-height: 1.3;
  margin-top: 24px;
  margin-bottom: 24px;
`

const ClubInfo = styled.div`
  align-items: center;
  display: flex;
  margin-top: 48px;
`

const ClubIcon = styled.img`
  border-radius: 100%;
  height: 40px;
  width: 40px;
`

const ClubName = styled.p`
  font-size: ${desktopFontSize.h3};
  font-weight: ${fontWeight.semiBold};
  margin-left: 16px;
`

interface EventInfoProps {
  event: Event
}

export const EventInfo = ({ event }: EventInfoProps) => {
  const router = useRouter()

  const { name, description, tags, startDate, endDate } = event
  const date = `${startDate.local().format('dddd')}, ${event.startDate.local().format('LL z')}`
  const time = `${startDate.format('ha z')} - ${endDate.format('ha z')}`

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <EventName>{name}</EventName>

      <EventMetaData>
        <Date>
          {date}
          <br />
          {time}
        </Date>
        {/* TODO: color code the tags */}
      </EventMetaData>

      <ClubInfo>
        <ClubIcon src={event.club.iconURL} />
        <ClubName>{event.club.name}</ClubName>
        <Categories tags={tags} />
      </ClubInfo>

      <EventDescription>{description}</EventDescription>
    </div>
  )
}

const Categories = ({ tags }: { tags: Array<string> }) => (
  <CategoriesWrapper>
    {tags.map((t, i) => (
      <Category key={`category-tag-${i}`}>{t}</Category>
    ))}
  </CategoriesWrapper>
)
