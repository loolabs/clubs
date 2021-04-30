import styled from 'styled-components'
import { Id, Event } from '../../context'
import { desktopFontSize, fontWeight, largerThan, mobileFontSize, tablet } from '../../styles'
import { EventCard } from '../../components/club-details'

const Title = styled.p`
  font-size: ${mobileFontSize.h2};
  font-weight: ${fontWeight.semiBold};

  @media ${largerThan(tablet)} {
    font-size: ${desktopFontSize.h2};
  }
`

const tagsEqual = (a: Array<string>, b: Array<string>) => {
  const aSet = new Set(a)
  const bSet = new Set(b)

  return aSet.size === bSet.size && [...aSet].every((value) => bSet.has(value))
}

interface SimilarEventsProps {
  allEvents: Map<Id, Event>
  event: Event
}

export const SimilarEvents = ({ allEvents, event }: SimilarEventsProps) => {
  const events = Array.from(allEvents.values())
  const similarEvents = events.filter((e) => {
    if (e.id === event.id) return false

    const sameClub = e.club === event.club
    const sameTags = tagsEqual(e.tags, event.tags)

    return sameClub || sameTags
  })

  return (
    <div>
      <Title>Similar Events</Title>
      <EventCards events={similarEvents} />
    </div>
  )
}

const EventCards = ({ events }: { events: Array<Event> }) => {
  return (
    <div>
      {events.map((e, i) => {
        return <EventCard event={e} key={`event-card-${i}`} />
      })}
    </div>
  )
}
