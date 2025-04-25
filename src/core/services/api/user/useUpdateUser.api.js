import { useMutation } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (user) =>
      await http.put("/User/UpdateUser", user).then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال ویرایش کاربر ...", "updateUserLoading"),
    onSuccess: (data) => {
      dismissToast("updateUserLoading");

      if (data.success) showSuccessToast("کاربر با موفقیت ویرایش شد !");
      else showErrorToast("مشکلی در ویرایش کاربر به وجود آمد !");
    },
    onError: () => {
      dismissToast("updateUserLoading");
      showErrorToast("مشکلی در ویرایش کاربر به وجود آمد !");
    },
  });
};
