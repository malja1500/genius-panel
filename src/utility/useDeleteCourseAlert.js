// ** React Imports
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Core Imports
import { useDeleteCourse } from "../core/services/api/course/useDeleteCourse";

const MySwal = withReactContent(Swal);

export const useHandleDeleteCourse = () => {
  const deleteCourseAPI = useDeleteCourse();

  const handleDeleteCourse = async (isDeleted, courseId, setIsDeleted) => {
    MySwal.fire({
      title: isDeleted
        ? "آیا از بازگردانی دوره مطمئن هستید؟"
        : "آیا از حذف دوره مطمئن هستید ؟",
      text: isDeleted
        ? "در صورت بازگردانی دوره،دوره برای کاربران قابل رویت خواهد بود ."
        : "در صورت حذف دوره، دوره برای کاربران قابل رویت نخواهد بود.",
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
      confirmButtonText: isDeleted ? "بازگردانی" : "حذف",
      cancelButtonText: "انصراف",
      showLoaderOnConfirm: true,
      preConfirm() {
        return new Promise((resolve) => {
          deleteCourseAPI.mutate(
            {
              active: isDeleted,
              id: courseId,
            },
            {
              onSuccess: (data) => {
                if (data.success) {
                  MySwal.fire({
                    title: `دوره با موفقیت ${
                      isDeleted ? "بازگردانی" : "حذف"
                    } شد`,
                    icon: "success",
                    confirmButtonText: "باشه",
                  });

                  if (setIsDeleted) setIsDeleted(!isDeleted);
                } else
                  MySwal.fire({
                    title: `مشکلی در ${
                      isDeleted ? "بازگردانی" : "حذف"
                    } دوره به وجود آمد`,
                    icon: "error",
                    confirmButtonText: "باشه",
                  });

                resolve();
              },
              onError: () => {
                MySwal.fire({
                  title: `مشکلی در ${
                    isDeleted ? "بازگردانی" : "حذف"
                  } دوره به وجود آمد`,
                  icon: "error",
                  confirmButtonText: "باشه",
                });
                resolve();
              },
            }
          );
        });
      },
      focusCancel: true,
      focusConfirm: true,
    });
  };

  return handleDeleteCourse;
};
