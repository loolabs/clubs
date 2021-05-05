import { EventDTO } from '../../../../mappers/event-dto'

export const createMockEventDTOs = (): Array<EventDTO> => {
  const events: Array<EventDTO> = []
  for (let i = 1; i <= 3; ++i) {
    events.push({
      name: `Event Name ${i}`,
      description: `Event Description ${i}`,
      links: {
        url: `Event URL ${i}`,
        bannerImage: `Banner Image ${i}`,
        facebook: `Facebook ${i}`,
        twitter: `Twitter ${i}`,
        instagram: `Instagram ${i}`,
      },
      startTime: '2021-01-01T00:00:00.000Z',
      endTime: '2021-01-01T00:00:00.000Z',
      tags: ['tag1', 'tag2', 'tag3'],
      clubs: [{ name: 'Club Name 1', iconImage: '' }],
    })
  }
  return events
}