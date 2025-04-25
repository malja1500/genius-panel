// ** React Imports
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { useDeleteCourse } from "../core/services/api/course/useDeleteCourse";

const MySwal = withReactContent(Swal);

export const useHandleDeleteCourse = () => {
  const deleteCourseAPI = useDeleteCourse();

  const handleDeleteCourse = async (selectedRows, clearSelection) => {
    const result = await MySwal.fire({
      title: `آیا از حذف یا بازگردانی ${
        selectedRows.length <= 1 ? "دوره" : "دوره ها"
      } مطمئن هستید ؟`,
      text: `در صورتی که از حذف یا بازگردانی ${
        selectedRows.length <= 1 ? "دوره" : "دوره ها"
      } مطمئن هستید این کار را انجام دهید. `,
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
      confirmButtonText: "بله، مطمئن هستم",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
    });

    if (result.isConfirmed) {
      Promise.all(
        selectedRows.map((course) => {
          deleteCourseAPI.mutate({
            active: course.isdelete,
            id: course.courseId,
          });
        })
      );

      MySwal.fire({
        title: "عملیات با موفقیت انجام شد !",
        icon: "success",
        confirmButtonText: "باشه",
      });

      console.log(selectedRows);

      clearSelection();
    }
  };

  return handleDeleteCourse;
};
