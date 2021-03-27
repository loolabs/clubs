import { EventEntity } from '../../shared/infra/db/entities/event.entity'

export const createMockEventEntities = (): EventEntity[] => {
  const events: Array<EventEntity> = []
  for (let i = 1; i <= 3; ++i) {
    const eventEntity = new EventEntity()
    eventEntity.name = `Event Name ${i}`
    eventEntity.description = `Event Description ${i}`
    eventEntity.url = `Event URL ${i}`
    eventEntity.startTime = new Date(`2021-0${i}-01T00:00:00.000Z`)
    eventEntity.endTime = new Date(`2021-0${i}-01T00:00:00.000Z`)
    eventEntity.facebookLink = `Facebook ${i}`
    eventEntity.twitterLink = `Twitter ${i}`
    eventEntity.instagramLink = `Instagram ${i}`
    eventEntity.websiteLink = `Website ${i}`
    eventEntity.backgroundImageURL = `Event Background ${i}`
    events.push(eventEntity)
  }
  return events
}
