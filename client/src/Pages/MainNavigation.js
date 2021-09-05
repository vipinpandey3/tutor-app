import React from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import styles from './MainNavigation.module.css'
import { makeStyles } from '@material-ui/core'

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
