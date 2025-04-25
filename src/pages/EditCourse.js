// ** React Imports
import { useRef, useState } from "react";
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
import { useGetEditCourse } from "../core/services/api/course/useGetEditCourse.api";
import { useUpdateCourse } from "../core/services/api/course/useUpdateCourse.api";

// ** Utils
import { onFormData } from "../utility/form-data-helper.utils";

const EditCourse = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);
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

  //  ** Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: courseData } = useGetEditCourse(id);
  const updateCourse = useUpdateCourse();

  const onSubmit = () => {
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

    const formData = onFormData(courseDataObj);
    updateCourse.mutate(formData, { onSuccess: () => navigate("/courses") });
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
          isPending={updateCourse.isPending}
          setCourseLvlId={setCourseLvlId}
          setCourseTypeIdState={setCourseTypeIdState}
          setTeacherIdState={setTeacherIdState}
          setClassIdState={setClassIdState}
          setTermIdState={setTermIdState}
        />
      ),
    },
  ];

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
