// ** React Imports
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import { Button, Card, CardBody, CardText } from "reactstrap";

// ** Redux Imports
import { useUserSelector } from "../../../redux/user";

// ** Images
import medal from "../../../assets/images/dahsboard/badge.svg";

const CardMedal = ({ dashboardData }) => {
  // ** Hooks
  const { user } = useUserSelector();

  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5 className="text-truncate dashboard-card-medal-congratulations-text">
          تبریک میگویم 🎉 {`${user?.fName || "کاربر"} ${user?.lName || "عزیز"}`}
          !
        </h5>
        <CardText className="font-small-3">شما مدال طلایی دارید !</CardText>
        <h3 className="mb-75 mt-2 pt-50">
          <a href="/" onClick={(e) => e.preventDefault()}>
            {dashboardData?.allPaymentCost || 0} تومان
          </a>
        </h3>
        <Button tag={Link} to="/courses" color="primary">
          نمایش دوره ها
        </Button>
        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
