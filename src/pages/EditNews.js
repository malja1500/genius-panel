// ** React Imports
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";

// ** Steps
import Describe from "../@core/components/CreateNews/steps/Describe";
import GlobalData from "../@core/components/CreateNews/steps/GlobalData";

// ** Core Imports
import { getNewsWithIdAPI } from "../core/services/api/news/get-news-with-id.api";

// ** Utils
import { onFormData } from "../utility/form-data-helper.utils";
import { updateNewsAPI } from "../core/services/api/news/update-news.api";

const EditNews = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [news, setNews] = useState();
  const [stepper, setStepper] = useState(null);
  const [files, setFiles] = useState([]);
  const [describe, setDescribe] = useState();
  const [updatedData, setUpdatedData] = useState();
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const data = {
      id,
      image: (files && files[0]) || news.imageAddress,
      tumbImage: (files && files[0]) || news.imageAddress,
      imageAddress: (files && files[0]) || news.imageAddress,
      describe: describe || news.describe,
      active: true,
      ...updatedData,
    };

    try {
      setLoading(true);

      const formData = onFormData(data);
      const editBlog = await updateNewsAPI(formData);

      if (editBlog.success) {
        toast.success("خبر با موفقیت ویرایش شد !");

        navigate("/news");
      } else toast.error(editBlog.message);
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در ویرایش خبر به وجود آمد !");
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
          news={news}
          files={files}
          setFiles={setFiles}
          setUpdatedData={setUpdatedData}
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
          defaultValue={news?.describe}
          isLoading={isLoading}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const getNews = await getNewsWithIdAPI(id);

        setNews(getNews.detailsNewsDto);
      } catch (error) {
        toast.error("مشکلی در دریافت اطلاعات خبر به وجود آمد !");
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="ویرایش خبر"
        data={[{ title: "مدیریت اخبار", links: "/news" }, { title: "ویرایش" }]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default EditNews;
