import React from 'react'
import { Tooltip } from '@material-ui/core'

const MuiToolTip = (props) => {
  return (
    <Tooltip title={props.title} placement={props.placement}>{props.children}</Tooltip>
  )
}

export default MuiToolTip