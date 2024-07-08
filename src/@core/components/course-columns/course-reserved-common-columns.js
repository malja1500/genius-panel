// ** React Imports
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ** Reactstrap Import
import { Badge, Tooltip } from "reactstrap";

// ** Icon Imports
import { Check, X } from "react-feather";

// ** Core Imports
import { getCourseGroupAPI } from "../../../core/services/api/course/course-group/get-course-group.api";
import { deleteCourseReserveAPI } from "../../../core/services/api/course/course-reserve/delete-course-reserve.api";
import { sendReserveToCourseAPI } from "../../../core/services/api/course/course-reserve/send-reserve-to-course.api";
import { getCourseByIdAPI } from "../../../core/services/api/course/get-course-by-id.api";

// ** Utils Imports
import { convertDateToPersian } from "../../../utility/date-helper.utils";

export const COURSE_RESERVED_COMMON_COLUMNS = (redirectUrl) => [
  {
    name: "زمان رزرو",
    reorder: true,
    minWidth: "170px",
    cell: (row) => <span>{convertDateToPersian(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    reorder: true,
    minWidth: "200px",
    cell: (row) => (
      <Badge color={row.accept ? "light-success" : "light-danger"}>
        {row.accept ? "تایید شده" : "تایید نشده"}
      </Badge>
    ),
  },
  {
    name: "تایید رزرو",
    reorder: true,
    minWidth: "100px",
    cell: (row) => {
      // ** State
      const [addReserveToCourse, setAddReserveToCourse] = useState(false);
      const [deleteCourseReserve, setDeleteCourseReserve] = useState(false);

      const navigate = useNavigate();

      // ** Function for handle change course reserve to student course
      const handleChangeCourseReserveToStudentCourse = async () => {
        try {
          const getCourseDetail = await getCourseByIdAPI(row.courseId);
          const getCourseGroup = await getCourseGroupAPI(
            getCourseDetail.teacherId,
            row.courseId
          );

          console.log(getCourseGroup);
          const sendReserveToCourse = await sendReserveToCourseAPI(
            row.courseId,
            getCourseGroup.length === 0 ? undefined : getCourseGroup[0].groupId,
            row.studentId
          );

          if (sendReserveToCourse.success) {
            toast.success("رزرو با موفقیت تایید شد !");
            navigate(redirectUrl);
          } else {
            toast.error(sendReserveToCourse.ErrorMessage);
          }
        } catch (error) {
          console.log(error);
          toast.error("مشکلی در تایید رزرو دوره به وجود آمد !");
        }
      };

      // ** Function for handle delete course reserve
      const handleDeleteCourseReserve = async () => {
        try {
          const deleteCourseReserve = await deleteCourseReserveAPI(
            row.reserveId
          );

          if (deleteCourseReserve.success) {
            toast.success("رزرو با موفقیت حذف شد !");
            navigate("/courses");
          } else {
            toast.error("مشکلی در حذف دوره به وجود آمد !");
            toast.error(deleteCourseReserveAPI.message);
          }
        } catch (error) {
          toast.error("مشکلی در حذف رزرو به وجود آمد !");
        }
      };

      return (
        !row.accept && (
          <div>
            <div className="d-flex gap-2">
              <div>
                <Check
                  className="cursor-pointer"
                  id="ChangeCourseReserveToStudentCourse"
                  onClick={handleChangeCourseReserveToStudentCourse}
                />
                <Tooltip
                  placement="top"
                  isOpen={addReserveToCourse}
                  target="ChangeCourseReserveToStudentCourse"
                  toggle={() => setAddReserveToCourse(!addReserveToCourse)}
                  innerClassName="table-tooltip"
                >
                  پذیرفتن رزرو
                </Tooltip>
              </div>
              <div>
                <X
                  className="cursor-pointer"
                  id="DeleteCourseReserve"
                  onClick={handleDeleteCourseReserve}
                />
                <Tooltip
                  placement="top"
                  isOpen={deleteCourseReserve}
                  target="DeleteCourseReserve"
                  toggle={() => setDeleteCourseReserve(!deleteCourseReserve)}
                  innerClassName="table-tooltip"
                >
                  رد کردن رزرو
                </Tooltip>
              </div>
            </div>
          </div>
        )
      );
    },
  },
];
