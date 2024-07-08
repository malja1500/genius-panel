// ** React Imports
import { useEffect } from "react";
import { Col, Row } from "reactstrap";

// ** Redux Imports
import { useDispatch } from "react-redux";
import { onDashboardReportChange } from "../redux/dashboardReport";

// ** Core Imports
import CardMedal from "../@core/components/CardMedal";
import ChartJS from "../@core/components/ChartjsDoughnutChart";
import StatsCard from "../@core/components/StatsCard";
import { useDashboardReport } from "../core/services/api/dashboard/useDashboardReport.api";

const Home = () => {
  // ** Hooks
  const dispatch = useDispatch();

  const { data: dashboardReport } = useDashboardReport();

  useEffect(() => {
    if (dashboardReport) dispatch(onDashboardReportChange(dashboardReport));
  }, [dashboardReport]);

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal dashboardData={dashboardReport} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard
            cols={{ xl: "3", sm: "6" }}
            dashboardData={dashboardReport}
          />
        </Col>
      </Row>
      <Row className="match-height dashboard-chart-box-wrapper">
        <ChartJS />
      </Row>
    </div>
  );
};

export default Home;
