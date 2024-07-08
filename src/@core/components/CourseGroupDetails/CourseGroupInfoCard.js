// ** React Imports
import { Fragment } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Briefcase, Check } from "react-feather";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Core Imports
import { deleteCourseGroupAPI } from "../../../core/services/api/course/course-group/delete-course-group.api";

// ** Utils
import { onFormData } from "../../../utility/form-data-helper.utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";

const MySwal = withReactContent(Swal);

const CourseGroupInfoCard = ({ group }) => {
  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  // ** render course group avatar
  const renderCourseGroupAvatar = () => {
    return (
      <Avatar
        initials
        color="light-primary"
        className="rounded mt-3 mb-2"
        content={group?.courseGroupDto.groupName || "بی نام"}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(48px)",
          width: "100%",
          height: "100%",
        }}
        style={{
          height: "110px",
          width: "110px",
        }}
      />
    );
  };

  const handleSuspendedClick = async () => {
    MySwal.fire({
      title: "آیا از حذف گروه مورد نظر مطمئن هستید؟",
      text: "در صورت مطمئن بودن از حذف گروه مورد نظر این کار را انجام دهید.",
      icon: "warning",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-danger ms-1",
      },
      buttonsStyling: false,
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "بله، گروه را حذف میکنم!",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      async preConfirm() {
        try {
          const deleteCourseGroupFormData = onFormData({ id });

          const deleteCourseGroup = await deleteCourseGroupAPI(
            deleteCourseGroupFormData
          );

          if (deleteCourseGroup.success) {
            toast.success("گروه با موفقیت حذف شد !");

            navigate("/course-groups");
          } else {
            toast.error("مشکلی در حذف گروه به وجود آمد !");
          }
        } catch (error) {
          toast.error("مشکلی در حذف گروه به وجود آمد !");
        }
      },
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderCourseGroupAvatar()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{group?.courseGroupDto.groupName}</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{group?.courseUserListDto.length}</h4>
                <small>لیست کاربر</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Briefcase className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {group?.courseGroupDto.groupCapacity || 0}
                </h4>
                <small>ظرفیت گروه</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات</h4>
          <div className="info-container">
            {group !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام گروه:</span>
                  <span>{group?.courseGroupDto.groupName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ظرفیت گروه:</span>
                  <span>{group?.courseGroupDto.groupCapacity}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ظرفیت دوره:</span>
                  <span>{group?.courseGroupDto.courseCapacity}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام استاد:</span>
                  <span>{group?.courseGroupDto.teacherName || "بی نام"}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button tag={Link} to={`/course-groups/edit/${id}`} color="primary">
              ویرایش
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              حذف
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default CourseGroupInfoCard;
