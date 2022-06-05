import { useTheme } from "./style";
import Title from "../../components/Title";
import { Add } from "@material-ui/icons";
import Button from "../../components/Button";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  ACTION,
  columns,
  ORDER,
  STATUS,
  statusOfDepartment,
} from "../../constants/department";
import { Pagination } from "@material-ui/lab";
import PropTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";

const DepartmentUI = (props) => {
  const {
    rows,
    count,
    page,
    handleChangePage,
    handleChooseRow,
    handleShowCreate,
  } = props;
  const classes = useTheme();

  const returnValueRow = (id, row, index) => {
    switch (id) {
      case ACTION:
        return (
          <Button
            className={classes.action}
            onClick={(e) => handleChooseRow(row, e)}
            startIcon={<EditIcon />}
            title="edit"
          />
        );

      case STATUS:
        return statusOfDepartment(row[id]);

      case ORDER:
        return (parseInt(page) - 1) * 10 + index + 1;

      default:
        return row[id];
    }
  };

  return (
    <>
      <Box className={classes.title}>
        <Title
          title="List departments"
          variant="h6"
          paragraph={true}
          align="center"
        />
        <Button
          title="add"
          startIcon={<Add />}
          className={classes.btn}
          onClick={handleShowCreate}
        />
      </Box>
      <Box className={classes.areaTable}>
        <Paper className={classes.rootTable} elevation={0}>
          <TableContainer className={classes.container}>
            <Table
              stickyHeader
              aria-label="sticky table"
              component="table"
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
                {rows?.map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {returnValueRow(column.id, row, index)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            siblingCount={1}
            color="primary"
            count={count}
            page={+page}
            className={classes.pagination}
            onChange={handleChangePage}
          />
        </Paper>
      </Box>
    </>
  );
};

DepartmentUI.defaultProps = { rows: [] };

DepartmentUI.propTypes = {
  rows: PropTypes.array,
  count: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
};

export default DepartmentUI;
