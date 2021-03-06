import styled from 'styled-components'

export type Tag = {
  text: string
  colour: string
}

export const TAG_HEIGHT = '38px'
const TAG_HORIZONTAL_PADDING = '16px'

export const TagBubble = styled.a<{
  colour?: string
  borderStyle?: string
  borderWidth?: string
  highlightOnHover?: boolean
}>`
  align-items: center;
  border-color: ${({ colour }) => colour || 'black'};
  border-radius: 100vw; // arbitrarily large so that sides are fully rounded
  border-style: ${({ borderStyle }) => borderStyle || 'solid'};
  border-width: ${({ borderWidth }) => borderWidth || 'auto'};
  box-sizing: border-box;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  height: ${TAG_HEIGHT};
  justify-content: center;
  line-height: ${TAG_HEIGHT};
  margin-right: 16px;
  overflow: hidden;
  padding: 0 ${TAG_HORIZONTAL_PADDING};
  text-align: center;
  white-space: nowrap;

  :hover {
    ${({ colour, highlightOnHover }) => highlightOnHover && `background-color: ${colour};`}
  }
`
