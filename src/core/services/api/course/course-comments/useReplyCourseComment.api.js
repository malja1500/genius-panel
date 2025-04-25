import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useReplyCourseComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addReplyCourseComment"],
    mutationFn: async (comment) =>
      await http
        .post("/Course/AddReplyCourseComment", comment)
        .then((res) => res.data),
    onMutate: () =>
      showLoadingToast("در حال ریپلای نظر ...", "addReplyCourseCommentLoading"),
    onSuccess: (data) => {
      dismissToast("addReplyCourseCommentLoading");

      if (data) {
        showSuccessToast("ریپلای شما با موفقیت ثبت شد !");

        queryClient.invalidateQueries({
          queryKey: ["adminCommentManagement"],
        });
      } else showErrorToast("مشکلی در ریپلای نظر به وجود آمد !");
    },
    onError: () => {
      dismissToast("addReplyCourseCommentLoading");
      showErrorToast("مشکلی در ریپلای نظر به وجود آمد !");
    },
  });
};
