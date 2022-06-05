import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { TooltipDetail, useTheme } from "./style/list";
import PropTypes from "prop-types";
import { columns } from "../../../constants/request";
import InfoIcon from "@material-ui/icons/Info";
import Title from "../../../components/Title";

const List = (props) => {
  const { rows, page, count, handleChangePage, isLoading, handleWatchDetail } =
    props;
  const classes = useTheme();

  return (
    <Paper className={classes.root} elevation={0}>
      <TableContainer className={classes.container}>
        <Table
          stickyHeader
          aria-label="sticky table"
          component="table"
          className={classes.table}
        >
          <TableHead className={classes.header}>
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
            {isLoading ? (
              <tr className={classes.loading}>
                <td>
                  <CircularProgress />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td>
                  <Title
                    className={classes.loading}
                    title="No requests found!"
                    variant="h6"
                  />
                </td>
              </tr>
            ) : (
              rows.map((row, index) => {
                return (
                  <TooltipDetail
                    key={index}
                    interactive
                    enterDelay={0}
                    placement="left"
                    PopperProps={{
                      popperOptions: {
                        modifiers: {
                          offset: {
                            enabled: true,
                            offset: "0, -60px",
                          },
                        },
                      },
                    }}
                    title={
                      <Tooltip title="Watch detail">
                        <InfoIcon onClick={() => handleWatchDetail(row.id)} />
                      </Tooltip>
                    }
                  >
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{ width: column.width }}
                            classes={{
                              body: classes.cell,
                            }}
                            key={column.id}
                            align={column.align}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  </TooltipDetail>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={count}
        page={+page}
        color="primary"
        className={classes.pagination}
        onChange={handleChangePage}
        siblingCount={1}
      />
    </Paper>
  );
};

List.defaultProps = { rows: [] };
List.propTypes = {
  rows: PropTypes.array.isRequired,
  count: PropTypes.number,
  page: PropTypes.number,
  getRequestByPage: PropTypes.func,
  handleChangePage: PropTypes.func,
  isLoading: PropTypes.bool,
  handleWatchDetail: PropTypes.func,
};

export default List;
