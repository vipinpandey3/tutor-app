import { Typography } from '@material-ui/core'
import React from 'react'

const Text = (props) => {
    const {variant, children, component, className} = props
    return (
        <Typography variant={variant} component={component} className={className}>
            {children}
        </Typography>
    )
}

export default Text
