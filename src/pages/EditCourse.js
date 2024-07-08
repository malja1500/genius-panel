// ** React Imports
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";
import Wizard from "@components/wizard";
import Describe from "../@core/components/create-course/steps/Describe";

// ** Steps
import AdvanceData from "../@core/components/create-course/steps/AdvanceData";
import CourseFeatures from "../@core/components/create-course/steps/CourseFeatures";
import GlobalData from "../@core/components/create-course/steps/GlobalData";

// ** Core Imports
import { getEditCourseAPI } from "../core/services/api/course/get-edit-course.api";
import { updateCourseAPI } from "../core/services/api/course/update-course.api";

// ** Utils
import { onFormData } from "../utility/form-data-helper.utils";

const EditCourse = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
  const [courseData, setCourseData] = useState();
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();
  const [capacity, setCapacity] = useState();
  const [sessionNumber, setSessionNumber] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [describe, setDescribe] = useState();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [courseLvlId, setCourseLvlId] = useState();
  const [courseTypeIdState, setCourseTypeIdState] = useState();
  const [teacherIdState, setTeacherIdState] = useState();
  const [classIdState, setClassIdState] = useState();
  const [termIdState, setTermIdState] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleSchema, setGoogleSchema] = useState();
  const [uniqueUrlString, setUniqueUrlString] = useState();
  const [shortLink, setShortLink] = useState();
  const [isLoading, setLoading] = useState(false);

  //  ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const courseDataObj = {
      id,
      image: (files && files[0]) || courseData.imageAddress,
      tumbImage: (files && files[0]) || courseData.imageAddress,
      imageAddress: (files && files[0]) || courseData.imageAddress,
      title,
      cost,
      capacity,
      sessionNumber,
      miniDescribe,
      describe: JSON.stringify(describe) || courseData.describe,
      startTime,
      endTime,
      courseLvlId,
      courseTypeId: courseTypeIdState,
      classId: classIdState,
      tremId: termIdState,
      teacherId: teacherIdState,
      googleTitle,
      googleSchema,
      uniqeUrlString: uniqueUrlString,
      shortLink,
    };

    try {
      setLoading(true);

      const formData = onFormData(courseDataObj);
      const createCourse = await updateCourseAPI(formData);

      if (createCourse.success) {
        toast.success("دوره با موفقیت آپدیت شد !");

        navigate("/courses");
      } else toast.error(createCourse.message);
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در ارسال دوره به وجود آمد !");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: "global-data",
      title: "اطلاعات عمومی",
      subtitle: "اطلاعات عمومی دوره",
      content: (
        <GlobalData
          stepper={stepper}
          title={title}
          cost={cost}
          capacity={capacity}
          sessionNumber={sessionNumber}
          miniDescribe={miniDescribe}
          startTime={startTime}
          endTime={endTime}
          setTitle={setTitle}
          setCost={setCost}
          setCapacity={setCapacity}
          setSessionNumber={setSessionNumber}
          setMiniDescribe={setMiniDescribe}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          files={files}
          setFiles={setFiles}
          course={courseData}
        />
      ),
    },
    {
      id: "course-describe",
      title: "توضیحات",
      subtitle: "توضیحات دوره",
      content: (
        <Describe
          stepper={stepper}
          setDescribe={setDescribe}
          describe={describe}
          defaultValue={courseData?.describe}
        />
      ),
    },
    {
      id: "advance-data",
      title: "اطلاعات پیشرفته",
      subtitle: "اطلاعات پیشرفته دوره",
      content: (
        <AdvanceData
          stepper={stepper}
          setGoogleTitle={setGoogleTitle}
          setGoogleSchema={setGoogleSchema}
          setUniqueUrlString={setUniqueUrlString}
          setShortLink={setShortLink}
          course={courseData}
        />
      ),
    },
    {
      id: "course-features",
      title: "ویژگی",
      subtitle: "ویژگی های دوره",
      content: (
        <CourseFeatures
          stepper={stepper}
          course={courseData}
          handleSubmitFn={onSubmit}
          courseLvlId={courseLvlId}
          courseTypeIdState={courseTypeIdState}
          teacherIdState={teacherIdState}
          classIdState={classIdState}
          termIdState={termIdState}
          isLoading={isLoading}
          setCourseLvlId={setCourseLvlId}
          setCourseTypeIdState={setCourseTypeIdState}
          setTeacherIdState={setTeacherIdState}
          setClassIdState={setClassIdState}
          setTermIdState={setTermIdState}
        />
      ),
    },
  ];

  useEffect(() => {
    const getEditCourse = async () => {
      try {
        const response = await getEditCourseAPI(id);

        setCourseData(response);
      } catch (error) {
        toast.error("مشکلی در دریافت داده ها به وجود آمد !");
      }
    };

    getEditCourse();
  }, []);

  return (
    <div className="horizontal-wizard">
      <BreadCrumbs
        title="ویرایش دوره"
        data={[
          { title: "دوره ها", link: "/courses" },
          { title: "افزودن دوره" },
        ]}
      />
      <Wizard instance={(el) => setStepper(el)} ref={ref} steps={steps} />
    </div>
  );
};

export default EditCourse;
