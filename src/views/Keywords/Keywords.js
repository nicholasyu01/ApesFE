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
import CSRF from 'components/CSRF/CSRF.js';
import KeywordsTable2 from "components/Table/KeywordsTable2.js";
import { getCookie } from 'components/CSRF/CSRFToken.js'


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

export default function Keywords() {
  const classes = useStyles();
  const [keywords, setKeywords] = useState();
  const [selected, setSelected] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      await axios.get('/api/keywords')
      .then(w => {
        setKeywords(w.data);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    fetchData();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      csrfmiddlewaretoken: event.target.csrfmiddlewaretoken.value,
      name: event.target.keyword.value,
    }
    const formData = new FormData()
    formData.append('csrfmiddlewaretoken', event.target.csrfmiddlewaretoken.value);
    formData.append('name', 'test_formdata')
    axios.post('/api/keywords/add/', data)
    .then((response) => {
      console.log(response);
      updateKeywords()
    }, (error) => {
      console.log(error);
    });
    event.target.reset();
  }

  function updateKeywords() {
    axios.get('/api/keywords')
      .then(w => {
        setKeywords(w.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const deleteKeywords = () => {
    selected.forEach(function(keyword) {
      const data = {
        csrfmiddlewaretoken: getCookie('csrftoken'),
        name: keyword,
      }
      const formData = new FormData()
      formData.append('csrfmiddlewaretoken', getCookie('csrftoken'));
      formData.append('id', keyword)
      axios.delete('/api/keywords/', {data: data})
      .then((response) => {
        console.log(response);
        updateKeywords()
      }, (error) => {
        console.log(error);
      });
      console.log(keyword)
    })
    setSelected([]);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.typo}>
              <h3><b>Keywords</b></h3>
            </div>
            <form onSubmit={onSubmit} id="keywordForm" className={classes.column}>
                <TextField
                className={classes.formControl}
                id="keyword"
                label="Add Keyword"
                required
                />
              <CSRF />
              <Button type="submit" color="success">Add Keyword</Button>
            </form>
            {/* <KeywordsTable
              keywords={keywords}
            /> */}
            <KeywordsTable2
              keywords={keywords}
              deleteKeywords={deleteKeywords}
              selected={selected}
              setSelected={setSelected}
            />
            <PrintJson
              data={keywords}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
