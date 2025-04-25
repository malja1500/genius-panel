// ** React Imports
import { useState } from "react";

// ** Reactstrap Import
import { Badge, Tooltip } from "reactstrap";

// ** Icon Imports
import { Check, X } from "react-feather";

// ** Core Imports
import { useCourseGroup } from "../../../core/services/api/course/course-group/useCourseGroup.api";
import { useDeleteCourseReserve } from "../../../core/services/api/course/course-reserve/useDeleteCourseReserve.api";
import { useSendReserveToCourse } from "../../../core/services/api/course/course-reserve/useSendReserveToCourse.api";
import { useCourseById } from "../../../core/services/api/course/useCourseById.api";

// ** Utils Imports
import { convertDateToPersian } from "../../../utility/date-helper.utils";

export const COURSE_RESERVED_COMMON_COLUMNS = (isUserDetailsPage) => [
  {
    name: "زمان رزرو",
    reorder: true,
    minWidth: "170px",
    cell: (row) => <span>{convertDateToPersian(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    reorder: true,
    minWidth: isUserDetailsPage ? "160px" : "200px",
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
      const [addReserveToCourseTooltip, setAddReserveToCourseTooltip] =
        useState(false);
      const [deleteCourseReserveTooltip, setDeleteCourseReserveTooltip] =
        useState(false);

      // ** Hooks
      const { fetchCourseById } = useCourseById(row.courseId);
      const { fetchCourseGroup } = useCourseGroup(undefined, undefined, false);
      const sendReserveToCourse = useSendReserveToCourse();
      const deleteCourseReserve = useDeleteCourseReserve(row.reserveId);

      // ** Function to handle change course reserve to student course
      const handleChangeCourseReserveToStudentCourse = async () => {
        const getCourseDetail = await fetchCourseById();
        const getCourseGroup = await fetchCourseGroup(
          getCourseDetail.teacherId,
          row.courseId
        );

        sendReserveToCourse.mutate({
          courseId: row.courseId,
          courseGroupId:
            getCourseGroup.length === 0 ? undefined : getCourseGroup[0].groupId,
          studentId: row.studentId,
        });
      };

      // ** Function to handle delete course reserve
      const handleDeleteCourseReserve = () => {
        deleteCourseReserve.mutate();
      };

      return (
        !row.accept && (
          <div>
            <div className="d-flex gap-2">
              <div>
                <Check
                  className="cursor-pointer outline-none"
                  id="ChangeCourseReserveToStudentCourse"
                  onClick={handleChangeCourseReserveToStudentCourse}
                />
                <Tooltip
                  placement="top"
                  isOpen={addReserveToCourseTooltip}
                  target="ChangeCourseReserveToStudentCourse"
                  toggle={() =>
                    setAddReserveToCourseTooltip(!addReserveToCourseTooltip)
                  }
                  innerClassName="table-tooltip"
                >
                  پذیرفتن رزرو
                </Tooltip>
              </div>
              <div>
                <X
                  className="cursor-pointer outline-none"
                  id="deleteCourseReserve"
                  onClick={handleDeleteCourseReserve}
                />
                <Tooltip
                  placement="top"
                  isOpen={deleteCourseReserveTooltip}
                  target="deleteCourseReserve"
                  toggle={() =>
                    setDeleteCourseReserveTooltip(!deleteCourseReserveTooltip)
                  }
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
