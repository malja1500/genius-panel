// ** React Imports
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

// ** Steps
import Describe from "../@core/components/CreateNews/steps/Describe";
import GlobalData from "../@core/components/CreateNews/steps/GlobalData";

// ** Core Imports
import { createNewsAPI } from "../core/services/api/news/create-news.api";
import { onFormData } from "../utility/form-data-helper.utils";

const CreateNewsPage = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleDescribe, setGoogleDescribe] = useState();
  const [newsCategoryId, setNewsCategoryId] = useState();
  const [keyword, setKeyword] = useState();
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const navigate = useNavigate();

  const onSubmit = async () => {
    const Data = {
      image: files[0],
      title,
      googleTitle,
      googleDescribe,
      miniDescribe,
      describe,
      keyword,
      newsCatregoryId: newsCategoryId,
    };

    try {
      setLoading(true);

      const formData = onFormData(Data);
      const createBlog = await createNewsAPI(formData);

      if (createBlog.success) {
        toast.success("خبر با موفقیت ثبت شد !");

        navigate("/news");
      } else toast.error(createBlog.message);
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در ارسال خیر به وجود آمد !");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی خبر",
      content: (
        <GlobalData
          stepper={stepper}
          setTitle={setTitle}
          setGoogleTitle={setGoogleTitle}
          setGoogleDescribe={setGoogleDescribe}
          setMiniDescribe={setMiniDescribe}
          setKeyword={setKeyword}
          setNewsCategoryId={setNewsCategoryId}
          files={files}
          setFiles={setFiles}
        />
      ),
    },
    {
      id: "describe",
      title: "توضیحات",
      subtitle: "توضیحات خبر",
      content: (
        <Describe
          stepper={stepper}
          setDescribe={setDescribe}
          describe={describe}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      ),
    },
  ];
  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="افزودن خبر"
        data={[
          { title: "مدیریت اخبار", links: "/news" },
          { title: "افزودن خبر" },
        ]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default CreateNewsPage;
