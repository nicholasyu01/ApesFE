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

const styles = theme => ({

});

const useStyles = makeStyles(styles);

export default function WeekStats() {
  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault()
    console.log("submit");
  }

  const [weeks, setWeeks] = useState([]);

  function updateWeeks() {
    axios.get('/api/weeks')
      .then(w => {
        setWeeks(w.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    console.log("use effect");
  }, []);

  function print() {
    Test()
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.typo}>
              <h3><b>Search</b></h3>
            </div>
            <form onSubmit={onSubmit} id="gameForm">
                <TextField
                className={classes.formControl}
                id="awaySpread"
                label="Search"
                type="number"
                required
                />
              <Button type="submit" color="success">Update Profile</Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
