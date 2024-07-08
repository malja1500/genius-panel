// ** Third Party Components
import classnames from "classnames";
import {
  TrendingUp,
  User,
  Box,
  DollarSign,
  UserCheck,
  Book,
  BookOpen,
} from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const StatsCard = ({ cols, dashboardData }) => {
  const data = [
    {
      title: dashboardData?.allUser || 0,
      subtitle: "تعداد کاربران",
      color: "light-info",
      icon: <User size={24} />,
    },
    {
      title: dashboardData?.inCompeletUserCount || 0,
      subtitle: "کاربر تکمیل شده",
      color: "light-success",
      icon: <UserCheck size={24} />,
    },
    {
      title: dashboardData?.allReserve || 0,
      subtitle: "دوره رزرو شده",
      color: "light-danger",
      icon: <Book size={24} />,
    },
    {
      title: dashboardData?.allReserveAccept || 0,
      subtitle: "رزرو تایید شده",
      color: "light-primary",
      icon: <BookOpen size={24} />,
    },
  ];

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />
            <div className="my-auto text-truncate text-overflow-ellipsis">
              <h4 className="fw-bolder mb-0 text-truncate">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">اطلاعات عمومی</CardTitle>
        <CardText className="card-text font-small-2 me-25 mb-0">
          آخرین آپدیت
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
