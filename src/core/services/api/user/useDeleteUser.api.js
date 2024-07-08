import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useDeleteUser = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteUser", userId],
    mutationFn: async () =>
      await http.delete("/User/DeleteUser", {
        data: {
          userId,
        },
      }),
    onMutate: () =>
      showLoadingToast("در حال حذف کاربر ...", "deleteUserLoading"),
    onSuccess: (data) => {
      dismissToast("deleteUserLoading");

      if (data.success) showSuccessToast("کاربر با موفقیت حذف شد !");

      queryClient.invalidateQueries({
        queryKey: ["userLists"],
      });
    },
    onError: () => dismissToast("deleteUserLoading"),
  });
};
