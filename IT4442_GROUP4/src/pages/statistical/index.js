import Layout from "../../layouts/Layout";
import { Box } from "@material-ui/core";
import { useTheme } from "./style";
import PieChart from "./PieChart"
import LineChart from "./LineChart"

const Statistical = (props) => {
  const classes = useTheme();

  return (
    <Layout>
      <Box p={10} className={classes.root}>
        <PieChart />
        <div style={{
            width : "10%",
            display : "inline-block"
        }}>          
        </div>
        <LineChart />
      </Box>
    </Layout>
  );
};

export default Statistical;
