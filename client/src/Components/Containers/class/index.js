/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {fetchAllStandards} from "../../../redux/actions/classAction"

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    margin: theme.spacing(2),
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: theme.spacing(2),
    '& > *': {
      padding: theme.spacing(2),
      width: theme.spacing(36),
    }
  },
}));

const Class = ({class: {message, error, loading, standardsData}, fetchAllStandards}) => {
  const styles = useStyles();
  useEffect(() => {
    let userId = JSON.parse(localStorage.getItem('userId'))
    console.log('userId', userId)
    let postObj = {
      userId: userId
    }
    fetchAllStandards(postObj)
  }, [])
  return (
    <div className={styles.mainContainer}>
      {
        standardsData.data.map(std => {
          return <Card className={styles.cardContainer} key={std.id} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Standard: {std.StandardMap.std}
            </Typography>
            <Typography color="textSecondary">
              Standard Code: {std.StandardMap.stdCode}
            </Typography>
            <Typography variant="body2" component="p">
              Subject Name: {std.subject_name}
            </Typography>
            <Typography color="textSecondary">
              Academic Year: {std.academic_year}
            </Typography>
            <Typography variant="body2" component="p">
              Is Class Teacher: {std.is_class_teacher ? 'Yes' : 'No'}
            </Typography>
          </CardContent>
        </Card>
        })
      }
    </div>
  );
}

Class.propTypes = {
  fetchAllStandards: PropTypes.func.isRequired,
  hideNotification: PropTypes.func.isRequired,
  class: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    class: state.class
  }
}

export default connect(mapStateToProps, {fetchAllStandards})(Class)