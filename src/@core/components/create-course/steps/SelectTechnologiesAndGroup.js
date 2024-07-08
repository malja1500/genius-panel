// ** React Imports
import { Fragment, useState } from "react";

// ** Third Party Components
import { ArrowLeft, ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ** Reactstrap Imports
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Core Imports
import { addCourseTechnologyAPI } from "../../../../core/services/api/course/add-course-technology.api";
import { addCourseGroupAPI } from "../../../../core/services/api/course/course-group/add-course-group.api";

// ** Util Imports
import { selectThemeColors } from "../../../../utility/Utils";
import { onFormData } from "../../../../utility/form-data-helper.utils";

const defaultValues = {
  technologies: undefined,
};

const SelectTechnologiesAndGroup = ({
  stepper,
  createCourseOptions,
  courseId,
}) => {
  // ** States
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = async (e) => {
    const convertTechnologies = e.technologies.map((technology) => ({
      techId: technology.id,
    }));

    try {
      setLoading(true);

      const addTechnology = await addCourseTechnologyAPI(
        courseId,
        convertTechnologies
      );

      const { groupName, groupCapacity } = e;

      const courseGroupData = {
        groupName,
        groupCapacity,
        courseId,
      };

      const courseGroupFormData = onFormData(courseGroupData);

      const addCourseGroup = await addCourseGroupAPI(courseGroupFormData);

      if (addTechnology.success) {
        toast.success("تکنولوژی های این دوره با موفقیت اضافه شد !");
      } else toast.error("مشکلی در افزودن تکنولوژی ها به وجود آمد !");

      if (addCourseGroup.success) {
        toast.success("گروه این دوره با موفقیت اضافه شد !");
      } else toast.error("مشکلی در افزودن گروه به وجود آمد !");

      if (addTechnology.success && addCourseGroup.success) navigate("/courses");
    } catch (error) {
      setLoading(false);

      toast.error("مشکلی در افزودن تکنولوژی ها به وجود آمد !");
    } finally {
      setLoading(false);
    }
  };

  const animatedComponents = makeAnimated();

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">تکنولوژی و گروه دوره</h5>
        <small className="text-muted">
          در این بخش باید تکنولوژی ها و گروه دوره را انتخاب کنید.
        </small>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for="technologies">
              تکنولوژی های دوره
            </Label>
            <Controller
              id="technologies"
              name="technologies"
              control={control}
              render={({ field }) => (
                <Select
                  theme={selectThemeColors}
                  className="react-select"
                  classNamePrefix="select"
                  name="technologies"
                  options={createCourseOptions?.technologyDtos}
                  getOptionValue={(technology) => technology.id}
                  getOptionLabel={(technology) => technology.techName}
                  isClearable
                  isMulti
                  components={animatedComponents}
                  {...field}
                />
              )}
            />
            {errors.technologies && (
              <FormFeedback>{errors.technologies.message}</FormFeedback>
            )}
          </Col>
        </Row>
        <Row className="mt-1">
          <h6>افزودن گروه دوره</h6>
          <Col md="6" className="mb-2">
            <Label className="form-label" for="groupName">
              نام گروه
            </Label>
            <Controller
              control={control}
              name="groupName"
              id="groupName"
              render={({ field }) => (
                <Input invalid={errors.groupName} {...field} />
              )}
            />
            {errors.groupName && (
              <FormFeedback>{errors.groupName.message}</FormFeedback>
            )}
          </Col>
          <Col md="6" className="mb-2">
            <Label className="form-label" for="groupCapacity">
              ظرفیت گروه
            </Label>
            <Controller
              control={control}
              name="groupCapacity"
              id="groupCapacity"
              render={({ field }) => (
                <Input invalid={errors.groupCapacity} {...field} />
              )}
            />
            {errors.groupCapacity && (
              <FormFeedback>{errors.groupCapacity.message}</FormFeedback>
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
            <span className="align-middle d-sm-inline-block d-none">ثبت</span>
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

export default SelectTechnologiesAndGroup;
