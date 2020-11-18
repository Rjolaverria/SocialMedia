import {Popup} from 'semantic-ui-react'

import React from 'react'

const Tooltip = ({children, content}) => {
    return  <Popup 
                content={content} 
                trigger={children}
                style={{
                    borderRadius: '4px',
                    opacity: 0.8,
                }}
                inverted
                />
}

export default Tooltip
