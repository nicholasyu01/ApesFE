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
import WebsitesTable from "components/Table/WebsitesTable.js";
import WebsitesTable2 from "components/Table/WebsitesTable2.js";
import CSRF from 'components/CSRF/CSRF.js';
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

export default function Websites() {
  const classes = useStyles();
  const [websites, setWebsites] = useState();
  const [selected, setSelected] = useState([]);
  const [heads, setHeads] = useState([]);

  useEffect(() => {
    // async function fetchData() {
    axios.get('/api/websites')
      .then(w => {
        setWebsites(w.data);
        console.log("DATA: " + JSON.stringify(w.data[0].keywords))
      })
      .catch(function (error) {
        console.log(error);
      })
    // }
    // fetchData();
    formatHeads(websites);
   
  }, []);

  function formatHeads(w) {
    heads.push( { id: 'name', numeric: false, disablePadding: true, label: 'Websites' });
    heads.push( { id: 'url', numeric: true, disablePadding: false, label: 'Url' });
    heads.push( { id: 'storage_url', numeric: true, disablePadding: false, label: 'Storage Url' });
    //heads.push( { id: 'keywords', numeric: false, disablePadding: false, label: 'Keywords' });
    console.log(w)
    //TODO add dynamic key word head fomatting
    // websites.get(0).keywords.forEach(function(keyword) {
    //   heads.push( { id: keyword, numeric: false, disablePadding: false, label: keyword });
    // })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      csrfmiddlewaretoken: event.target.csrfmiddlewaretoken.value,
      url: event.target.url.value,
    }
    axios.post('/api/websites/add/', data)
    .then((response) => {
      console.log(response);
      updateWebsites()
    }, (error) => {
      console.log(error);
    });
    event.target.reset();
  }

  function updateWebsites() {
    axios.get('/api/websites')
      .then(w => {
        setWebsites(w.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const deleteWebsites = () => {
    selected.forEach(function(website) {
      const data = {
        csrfmiddlewaretoken: getCookie('csrftoken'),
        name: website,
      }
      axios.delete('/api/websites/', {data: data})
      .then((response) => {
        console.log(response);
        updateWebsites()
      }, (error) => {
        console.log(error);
      });
      console.log(website)
    })
    setSelected([]);
  };
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardBody>
            <div className={classes.typo}>
              <h3><b>Websites</b></h3>
            </div>
            <form onSubmit={onSubmit} id="websitesForm" className={classes.column}>
              <TextField
                className={classes.formControl}
                id="url"
                label="URL"
                required
              />
              <CSRF />
              <Button type="submit" color="success">Add Website</Button>
            </form>
            {/* <WebsitesTable
              websites={websites}
            /> */}
            <WebsitesTable2
              websites={websites}
              deleteWebsites={deleteWebsites}
              selected={selected}
              setSelected={setSelected}
              heads={heads}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
