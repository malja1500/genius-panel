// ** React Imports
import { Fragment, useContext } from "react";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Deom Charts
import DoughnutChart from "./ChartjsDoughnutChart";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Redux
import { useDashboardReportSelector } from "../../../redux/dashboardReport";

// ** Third Party Components
import "chart.js/auto";

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

const ChartJS = () => {
  // ** Context, Hooks & Vars
  const { colors } = useContext(ThemeColors),
    tooltipShadow = "rgba(0, 0, 0, 0.25)",
    lineChartDanger = "#ff4961",
    successColorShade = "#28dac6";

  const { report } = useDashboardReportSelector();

  return (
    <Fragment>
      <Col md="6" xs="12" className="dashboard-first-chart-box">
        <DoughnutChart
          tooltipShadow={tooltipShadow}
          successColorShade={successColorShade}
          lineChartDanger={lineChartDanger}
          primary={colors.primary.main}
          labels={["کاربران فعال", "کاربران غیرفعال"]}
          chartData={[
            report?.activeUserPercent,
            report?.interActiveUserPercent,
          ]}
          activePresent={Math.trunc(report?.activeUserPercent) || "0"}
          inActivePresent={Math.trunc(report?.interActiveUserPercent) || "0"}
          activeDataLabel="کاربران فعال"
          inactiveDataLabel="کاربران غیرفعال"
          dataLabel="اطلاعات کاربران"
        />
      </Col>
      <Col md="6" xs="12" className="dashboard-second-chart-box">
        <DoughnutChart
          tooltipShadow={tooltipShadow}
          successColorShade={successColorShade}
          lineChartDanger={lineChartDanger}
          primary={colors.primary.main}
          labels={["رزرو های تایید شده", "رزرو های تایید شده"]}
          chartData={[report?.allReserveAccept, report?.allReserveNotAccept]}
          activePresent={Math.trunc(report?.allReserveAccept) || "0"}
          inActivePresent={Math.trunc(report?.allReserveNotAccept) || "0"}
          activeDataLabel="رزرو های تایید شده"
          inactiveDataLabel="رزرو های تایید نشده"
          dataLabel="اطلاعات دوره های رزرو شده"
        />
      </Col>
    </Fragment>
  );
};

export default ChartJS;
