import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

const styles = theme => ({
    container: {
        padding: "5px",
    }
});
const useStyles = makeStyles(styles);

export default function WeekTable(props) {
    const { keywords } = props;
    const classes = useStyles(styles);

    //TODO make the table more module to be used by any data
    return (
        <div className={classes.container} style={{ overflowX: "auto" }}>
            <Table >
                <TableHead>
                    <TableRow>
                        {/* <TableCell className={classes.border} padding="none">Id</TableCell> */}
                        <TableCell padding="none">Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keywords?.map((row, key) => (
                        <TableRow key={key}>
                            {/* <TableCell className={classes.border} padding="none">{row.id}</TableCell> */}
                            <TableCell padding="none">{row.name}</TableCell>
                            <TableCell padding="none"></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}