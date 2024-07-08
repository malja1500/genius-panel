import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../utility/toast.utils";
import http from "../../interceptor";

export const useAddUserAccess = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addUserAccess", userId],
    mutationFn: async (data) => {
      const { enable, roleId } = data;

      return await http
        .post(
          `/User/AddUserAccess`,
          {
            roleId,
            userId,
          },
          {
            params: {
              enable,
            },
          }
        )
        .then((res) => res.data);
    },
    onMutate: () =>
      showLoadingToast("در حال بررسی نقش ...", "addUserAccessLoading"),
    onSuccess: (data) => {
      dismissToast("addUserAccessLoading");

      if (data.success) showSuccessToast("دسترسی با موفقیت تغییر کرد !");

      queryClient.invalidateQueries({
        queryKey: ["userLists"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userDetails"],
      });
    },
    onError: () => dismissToast("addUserAccessLoading"),
  });
};
