import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { useTheme } from "./style";
import PropTypes from "prop-types";
import { columns } from "../../constants/listUser";
import Button from '../../components/Button';
import { ACTION, ID, UPDATE } from '../../constants/category';
import { setOder } from '../../helper/index';

const TableComponent = (props) => {
  const { rows, onHandleChooseRow, page } = props;
  const classes = useTheme();
  const handleChooseRow = (row) => {
    onHandleChooseRow(row, UPDATE);
  };

  const cellItem = (id, index, value, row) => {
    if (id === ACTION) {
      return (
        <Button
          onClick={(e) => handleChooseRow(row, e)}
          startIcon={<EditIcon />}
          title='Edit'
        />
      )
    } if (id === ID) return setOder(page, index);
    return value;
  }
  return (
    <Paper className={classes.rootTable} elevation={0}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  classes={{
                    head: classes.tableHead,
                  }}
                  className={classes.cell}
                  key={column.id}
                  align={column.align}
                  style={{ width: column.width }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={index}
                  onDoubleClick={(event) => {
                    handleChooseRow(row);
                  }}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ width: column.width }}
                        className={classes.cell}
                      >
                        {cellItem(column.id, index, value, row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

TableComponent.defaultProps = {
  rows: []
};

TableComponent.propTypes = {
  rows: PropTypes.array,
  onHandleChooseRow: PropTypes.func,
};

export default TableComponent;
