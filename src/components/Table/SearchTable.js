import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "components/CustomButtons/Button.js";

const styles = theme => ({
    border: {
        padding: "5px"
    },
    container: {
        padding: "5px",
    }
});
const useStyles = makeStyles(styles);

export default function SearchTable(props) {
    const { data, word, setWord } = props;
    const classes = useStyles(styles);

    function temmpp() {
        console.log(data)
    }
    //TODO make the table more module to be used by any data
    return (
        <div className={classes.container} style={{ overflowX: "auto" }}>
            <Table >
                <TableHead>
                    <TableRow>
                        {/* <TableCell className={classes.border} padding="none">Id</TableCell> */}
                        <TableCell className={classes.border} padding="none">Websites</TableCell>
                        <TableCell className={classes.border} padding="none">{word}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row, key) => (
                        <TableRow key={key}>
                            {/* <TableCell className={classes.border} padding="none">{row.id}</TableCell> */}
                            <TableCell className={classes.border} padding="none">{row.name}</TableCell>
                            {/* <TableCell className={classes.border} padding="none">{row.keywords.crm}</TableCell> */}
                        </TableRow>
                    ))}
                </TableBody>
                {/* <Button
                    onClick={temmpp}
                > TEMP</Button> */}

            </Table>
        </div>
    );
}