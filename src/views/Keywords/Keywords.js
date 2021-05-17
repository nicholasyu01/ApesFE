import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import WeekTable from "components/Table/WeekTable.js";
import { Test } from "components/api/api.js"
import KeywordsTable from "components/Table/KeywordsTable.js";


const styles = theme => ({
  formControl: {
    minWidth: 120,
    margin: '5px'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
});

const useStyles = makeStyles(styles);

export default function WeekStats() {
  const classes = useStyles();
  const [keywords, setKeywords] = useState();

  useEffect(() => {
    axios.get('/api/keywords')
      .then(w => {
        setKeywords(w.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);


  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.typo}>
              <h3><b>Keywords</b></h3>
            </div>
            <KeywordsTable
              keywords={keywords}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
