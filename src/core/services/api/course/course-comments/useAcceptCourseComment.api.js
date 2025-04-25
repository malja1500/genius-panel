import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  dismissToast,
  showLoadingToast,
} from "../../../../../utility/toast.utils";
import http from "../../../interceptor";

export const useAcceptCourseComment = (commentCourseId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["acceptCourseComment", commentCourseId],
    mutationFn: async () =>
      await http.post("/Course/AcceptCourseComment", undefined, {
        params: {
          commentCourseId,
        },
      }),
    onMutate: () =>
      showLoadingToast("ذر حال تایید نظر  ...", "acceptCourseCommentLoading"),
    onSuccess: (data) => {
      dismissToast("acceptCourseCommentLoading");
      if (data.success) {
        toast.success("نظر با موفقیت تایید شد !");

        queryClient.invalidateQueries({
          queryKey: ["adminCommentManagement"],
        });
        queryClient.invalidateQueries({
          queryKey: ["courseById"],
        });
      } else toast.error("مشکلی در تایید نظر به وجود آمد !");
    },
    onError: () => {
      dismissToast("acceptCourseCommentLoading");
      toast.error("مشکلی در تایید نظر به وجود آمد !");
    },
  });
};
