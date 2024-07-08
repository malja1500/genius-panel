// ** Third Party Components
import { Doughnut } from "react-chartjs-2";
import { CheckCircle, XCircle } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

// ** Redux Imports

const ChartjsRadarChart = ({
  tooltipShadow,
  successColorShade,
  lineChartDanger,
  labels,
  chartData,
  activePresent,
  inActivePresent,
  activeDataLabel,
  inactiveDataLabel,
  dataLabel,
}) => {
  // ** Chart Options
  const options = {
    maintainAspectRatio: false,
    cutout: 60,
    animation: {
      resize: {
        duration: 500,
      },
    },
    plugins: {
      legend: { display: false },
      tooltips: {
        callbacks: {
          label(context) {
            let label = context.label || "";
            if (label) {
              label += "Ronak: ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
        // Updated default tooltip UI
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        shadowBlur: 8,
        shadowColor: tooltipShadow,
        backgroundColor: "#fff",
        titleFontColor: "#000",
        bodyFontColor: "#000",
      },
    },
  };

  // ** Chart data
  const data = {
    datasets: [
      {
        labels,
        data: chartData,
        backgroundColor: [successColorShade, lineChartDanger],
        borderWidth: 0,
        pointStyle: "rectRounded",
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">{dataLabel}</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "275px" }}>
          <Doughnut data={data} options={options} height={275} />
        </div>
        <div className="d-flex justify-content-between mt-3 mb-1">
          <div className="d-flex align-items-center">
            <CheckCircle size={17} className="text-primary" />
            <span className="fw-bold ms-75 me-25">{activeDataLabel}</span>
            <span>- {activePresent}%</span>
          </div>
        </div>
        <div className="d-flex justify-content-between mb-1">
          <div className="d-flex align-items-center">
            <XCircle size={17} className="text-danger" />
            <span className="fw-bold ms-75 me-25">{inactiveDataLabel}</span>
            <span>- {inActivePresent}%</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartjsRadarChart;
