// ** React Imports
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useGenerateImage = () =>
  useMutation({
    mutationKey: ["generateImage"],
    mutationFn: async (prompt) =>
      await axios
        .post("https://api.imggen.ai/guest-generate-image", {
          prompt,
        })
        .then((res) => res.data),
  });
