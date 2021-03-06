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
import SearchTable from "components/Table/SearchTable";
import Table from "components/Table/Table.js";
import Table2 from "components/Table/Table2.js";
import CSRF from 'components/CSRF/CSRF.js';
import LinearProgress from '@material-ui/core/LinearProgress';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

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

const PrintJson = ({data}) => {
  // (destructured) data could be a prop for example
  return (<div><pre>{ JSON.stringify(data, null, 2) }</pre></div>);
}

export default function WeekStats() {
  const classes = useStyles();
  // const data = [{"name": "crm"}]
  const [data, setData] = useState([]);
  const [keywords, setKeywords] = useState({});
  const [headers, setHeaders] = useState([]);
  const [word, setWord] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = (event) => {
    setLoading(true);
    event.preventDefault()
    console.log("submit");
    console.log(event.data);
    setWord(event.target.search.value);
    axios.get('/api/websites/search/?search=' + event.target.search.value)
      .then(w => {
        setData(w.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    axios.get('/api/keywords')
    .then(w => {
      setKeywords(w.data);
    })
    .catch(function (error) {
      console.log(error);
    })
    // formatKeywords()
  }, []);

  const formatKeywords = () => {
    var temp = []
    keywords.forEach(function(i){
      temp.push(i.name)
    })
    setHeaders(temp);
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.typo}>
              <h3><b>Search</b></h3>
            </div>
            <form onSubmit={onSubmit} id="gameForm" className={classes.column}>
              <TextField
                className={classes.formControl}
                id="search"
                label="Search"
                required
              />
              <CSRF />
              <Button type="submit" color="success">Search</Button>
            </form>
            { loading && <LinearProgress />}
            <SearchTable
              data={data}
              word={word}
            />
          </CardBody>
            {/* <Table2/> */}
        </Card>
      </GridItem>
    </GridContainer>
  );
}
