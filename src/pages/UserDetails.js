// ** React Imports
import { useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** User View Components
import UserTabs from "../@core/components/UserDetails/Tabs";
import UserInfoCard from "../@core/components/UserDetails/UserInfoCard";

// ** Core Imports
import { useUserWithId } from "../core/services/api/user/useUserWithId";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserDetailsPage = () => {
  // ** States
  const [active, setActive] = useState("1");

  // ** Hooks
  const { id } = useParams();
  const { data: user } = useUserWithId(id);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard user={user} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <UserTabs active={active} toggleTab={toggleTab} user={user} />
        </Col>
      </Row>
    </div>
  );
};

export default UserDetailsPage;
