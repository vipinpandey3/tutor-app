import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import React from 'react'
import { makeStyles } from '@material-ui/core'
import styles from './MainNavigation.module.css'

const useStyles = makeStyles(theme => ({
    container: {
        background: theme.palette.primary.main
    } 
}));

const MainNavigation = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <ul className={styles['links-container']}>
                {
                    NavLinks.map(link=> {
                        return <li key={link.id} className={styles.navLink}><Link className={styles.link} to={link.path}>{link.name}</Link></li>
                    })
                }
            </ul>
        </div>
    )
}

export default MainNavigation
