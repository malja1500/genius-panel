// ** React Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Icons Components
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Validation Import
import { createCourseStepThreeFormSchema } from "../../../../core/validations/create-course/create-course-step-three-form.validation";

// ** Utils
import { selectThemeColors } from "../../../../utility/Utils";
import { convertOptions } from "../../../../utility/convert-options-helper.utils";
import { findDefaultOption } from "../../../../utility/default-option-helper.utils";

const defaultValues = {
  courseType: undefined,
  courseLevel: undefined,
  courseLvlId: undefined,
  courseTypeIdState: undefined,
  teacherIdState: undefined,
  classIdState: undefined,
  termIdState: undefined,
};

const CourseFeatures = ({
  stepper,
  course,
  handleSubmitFn,
  courseLvlId,
  courseTypeIdState,
  teacherIdState,
  classIdState,
  termIdState,
  isLoading,
  setCourseLvlId,
  setCourseTypeIdState,
  setTeacherIdState,
  setClassIdState,
  setTermIdState,
  createCourseOptions,
}) => {
  // ** States
  const [types, setTypes] = useState();
  const [defaultType, setDefaultType] = useState();
  const [levels, setLevels] = useState();
  const [defaultLevel, setDefaultLevel] = useState();
  const [teachers, setTeachers] = useState();
  const [defaultTeacher, setDefaultTeacher] = useState();
  const [classrooms, setClassrooms] = useState();
  const [defaultClassroom, setDefaultClassroom] = useState();
  const [terms, setTerms] = useState();
  const [defaultTerm, setDefaultTerm] = useState();
  // Create Course
  const [createTypes, setCreateTypes] = useState();
  const [createLevels, setCreateLevels] = useState();
  const [createTeachers, setCreateTeachers] = useState();
  const [createClassrooms, setCreateClassrooms] = useState();
  const [createTerms, setCreateTerms] = useState();

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(createCourseStepThreeFormSchema),
  });

  const onSubmit = (e) => {
    if (isObjEmpty(errors)) {
      setCourseTypeIdState(e.courseType.value);
      setCourseLvlId(e.courseLevel?.value);
      setTeacherIdState(e.teacherId?.value);
      setClassIdState(e.classId?.value);
      setTermIdState(+e.termId?.value);

      if (
        courseLvlId &&
        courseTypeIdState &&
        teacherIdState &&
        classIdState &&
        termIdState
      ) {
        handleSubmitFn();
      }
    }
  };

  useEffect(() => {
    if (
      courseLvlId &&
      courseTypeIdState &&
      teacherIdState &&
      classIdState &&
      termIdState
    ) {
      handleSubmitFn();
    }
  }, [
    courseLvlId,
    courseTypeIdState,
    teacherIdState,
    classIdState,
    termIdState,
  ]);

  useEffect(() => {
    if (course) {
      // ** Types
      const getTypes = convertOptions(course.getCourseFor.courseTypeDtos);
      const findType = findDefaultOption(getTypes, course.courseTypeId);
      setTypes(getTypes);
      setDefaultType(findType);

      // ** Levels
      const getLevels = convertOptions(course.getCourseFor.courseLevelDtos);
      const findLevel = findDefaultOption(getLevels, course.courseLvlId);
      setLevels(getLevels);
      setDefaultLevel(findLevel);

      // ** Teachers
      const getTeachers = convertOptions(course.getCourseFor.teachers);
      const findTeacher = findDefaultOption(getTeachers, course.teacherId);
      setTeachers(getTeachers);
      setDefaultTeacher(findTeacher);

      // ** Classrooms
      const getClassRooms = convertOptions(course.getCourseFor.classRoomDtos);
      const findClassroom = findDefaultOption(getClassRooms, course.classId);
      setClassrooms(getClassRooms);
      setDefaultClassroom(findClassroom);

      // ** Terms
      const getTerms = convertOptions(course.getCourseFor.termDtos);
      const findTerm = findDefaultOption(getTerms, course.tremId);
      setTerms(getTerms);
      setDefaultTerm(findTerm);

      setValue("courseType", findType);
      setValue("courseLevel", findLevel);
      setValue("teacherId", findTeacher);
      setValue("classId", findClassroom);
      setValue("termId", findTerm);
    }
  }, [course]);

  useEffect(() => {
    if (createCourseOptions) {
      // ** Types
      const getTypes = convertOptions(createCourseOptions.courseTypeDtos);
      setCreateTypes(getTypes);

      // ** Levels
      const getLevels = convertOptions(createCourseOptions.courseLevelDtos);
      setCreateLevels(getLevels);

      // ** Teachers
      const getTeachers = convertOptions(createCourseOptions.teachers);
      setCreateTeachers(getTeachers);

      // ** Classrooms
      const getClassRooms = convertOptions(createCourseOptions.classRoomDtos);
      setCreateClassrooms(getClassRooms);

      // ** Terms
      const getTerms = convertOptions(createCourseOptions.termDtos);
      setCreateTerms(getTerms);
    }
  }, [createCourseOptions]);

  const animatedComponents = makeAnimated();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">ویژگی های دوره</h5>
        <small className="text-muted">
          در این بخش باید ویژگی های دوره را وارد کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseType">
              نوع دوره
            </Label>
            <Controller
              id="courseType"
              name="courseType"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="courseType"
                  defaultInputValue={course && defaultType?.label}
                  options={course ? types : createTypes}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.courseType && (
              <FormFeedback>{errors.courseType.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="courseLevel">
              سطح دوره
            </Label>
            {/* {levels && defaultLevel && ( */}
            <Controller
              control={control}
              id="courseLevel"
              name="courseLevel"
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="courseLevel"
                  options={course ? levels : createLevels}
                  defaultInputValue={course && defaultLevel?.label}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {/* )} */}
            {errors.courseLevel && (
              <FormFeedback>{errors.courseLevel.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="teacherId">
              استاد دوره
            </Label>
            {/* {teachers && defaultTeacher && ( */}
            <Controller
              id="teacherId"
              name="teacherId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="teacherId"
                  options={course ? teachers : createTeachers}
                  defaultInputValue={course && defaultTeacher?.label}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {/* )} */}
            {errors.teacherId && (
              <FormFeedback>{errors.teacherId.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="classId">
              انتخاب کلاس
            </Label>
            {/* {classrooms && defaultClassroom && ( */}
            <Controller
              id="classId"
              name="classId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="classId"
                  options={course ? classrooms : createClassrooms}
                  defaultInputValue={course && defaultClassroom?.label}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {/* )} */}
            {errors.classId && (
              <FormFeedback>{errors.classId.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="termId">
              وضعیت دوره
            </Label>
            {/* {terms && defaultTerm && ( */}
            <Controller
              id="termId"
              name="termId"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="termId"
                  options={course ? terms : createTerms}
                  defaultInputValue={course && defaultTerm?.label}
                  isClearable
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {/* )} */}
            {errors.termId && (
              <FormFeedback>{errors.termId.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            type="button"
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            type="submit"
            color="primary"
            className="btn-next d-flex align-items-center submit-button"
            disabled={isLoading}
          >
            {isLoading && <Spinner size="sm" className="loading-spinner" />}
            <span className="align-middle d-sm-inline-block d-none">
              {course ? "آپدیت" : "ایجاد"} دوره
            </span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default CourseFeatures;
