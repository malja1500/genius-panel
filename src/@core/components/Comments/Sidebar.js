// ** React Imports
import { Link, useParams } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";
import { Mail, Send, Trash } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import { Badge, ListGroup, ListGroupItem } from "reactstrap";

const Sidebar = ({
  sidebarOpen,
  allComments,
  acceptedComments,
  notAcceptedComments,
}) => {
  // ** Vars
  const params = useParams();

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (
      (params.folder && params.folder === value) ||
      (params.label && params.label === value)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div
      className={classnames("sidebar-left", {
        show: sidebarOpen,
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content email-app-sidebar">
          <div className="email-app-menu">
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-messages mt-1">
                <ListGroupItem
                  tag={Link}
                  to="/comments/all"
                  action
                  active={
                    !Object.keys(params).length || handleActiveItem("all")
                  }
                >
                  <Mail size={18} className="me-75" />
                  <span className="align-middle">همه نظرات</span>
                  <Badge className="float-end" color="light-primary" pill>
                    {allComments?.totalCount || 0}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to="/comments/accepted"
                  action
                  active={handleActiveItem("accepted")}
                >
                  <Send size={18} className="me-75" />
                  <span className="align-middle">تایید شده</span>
                  <Badge className="float-end" color="light-success" pill>
                    {acceptedComments}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to="/comments/not-accepted"
                  action
                  active={handleActiveItem("not-accepted")}
                >
                  <Trash size={18} className="me-75" />
                  <span className="align-middle">تایید نشده</span>
                  <Badge className="float-end" color="light-danger" pill>
                    {notAcceptedComments}
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
