// ** React Imports
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";

// ** Core Imports
import { useCreateUser } from "../core/services/api/user/useCreateUser.api";
import { createUserFormSchema } from "../core/validations/create-user-form.validation";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";

const CreateUserPage = () => {
  // ** States
  const [isLoading, setLoading] = useState(false);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });
  const createUser = useCreateUser();

  const onSubmit = async (data) => {
    setLoading(true);

    const {
      firstName,
      lastName,
      gmail,
      password,
      phoneNumber,
      isStudent,
      isTeacher,
    } = data;

    createUser.mutate(
      {
        lastName,
        firstName,
        gmail,
        password,
        phoneNumber,
        isStudent: !!isStudent,
        isTeacher: !!isTeacher,
      },
      {
        onSuccess: () => setLoading(false),
        onError: () => setLoading(false),
      }
    );
  };

  return (
    <div className="blog-edit-wrapper">
      <Breadcrumbs
        title="افزودن کاربر"
        data={[{ title: "مدیریت کاربران" }, { title: "افزودن کاربر" }]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <div>
                <h2>افزودن کاربر</h2>
                <p>برای افزودن کاربر لطفا اطلاعات زیر را کامل کنید.</p>
              </div>
              <Form
                className="mt-2"
                onSubmit={handleSubmit((data) => onSubmit(data))}
              >
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="firstName">
                      نام کاربر
                    </Label>
                    <Controller
                      id="firstName"
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="firstName"
                          invalid={errors.firstName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.firstName && (
                      <FormFeedback>{errors.firstName.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="lastName">
                      نام خانوادگی کاربر
                    </Label>
                    <Controller
                      id="lastName"
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="lastName"
                          invalid={errors.lastName && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.lastName && (
                      <FormFeedback>{errors.lastName.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="gmail">
                      جیمیل کاربر
                    </Label>
                    <Controller
                      id="gmail"
                      name="gmail"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="gmail"
                          invalid={errors.gmail && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.gmail && (
                      <FormFeedback>{errors.gmail.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="password">
                      رمز عبور کاربر
                    </Label>
                    <Controller
                      id="password"
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <InputPasswordToggle
                          className="input-group-merge"
                          label="رمز عبور کاربر"
                          htmlFor="basic-default-password"
                          invalid={errors.password && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.password && (
                      <FormFeedback>{errors.password.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="phoneNumber">
                      شماره موبایل کاربر
                    </Label>
                    <Controller
                      id="phoneNumber"
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          id="phoneNumber"
                          invalid={errors.phoneNumber && true}
                          {...field}
                        />
                      )}
                    />
                    {errors.phoneNumber && (
                      <FormFeedback>{errors.phoneNumber.message}</FormFeedback>
                    )}
                  </Col>
                  <Col md="6" className="mb-2">
                    <h4 className="mb-2">دسترسی های کاربر</h4>
                    <div className="d-flex gap-1">
                      <div className="form-check form-check-primary">
                        <Controller
                          id="isStudent"
                          name="isStudent"
                          control={control}
                          render={({ field }) => (
                            <Input type="checkbox" id="isStudent" {...field} />
                          )}
                        />
                        <Label
                          className="form-check-label isStudentRoleLabel"
                          for="isStudent"
                        >
                          دانش آموز
                        </Label>
                      </div>
                      <div className="form-check form-check-primary">
                        <Controller
                          id="isTeacher"
                          name="isTeacher"
                          control={control}
                          render={({ field }) => (
                            <Input type="checkbox" id="isTeacher" {...field} />
                          )}
                        />
                        <Label className="form-check-label" for="isTeacher">
                          استاد
                        </Label>
                      </div>
                    </div>
                  </Col>
                  <Col md="12" className="mt-50 d-flex">
                    <Button
                      color="primary"
                      className="me-1 d-flex align-items-center submit-button"
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Spinner size="sm" className="loading-spinner" />
                      )}
                      <span className="submit-button-text"> افزودن کاربر</span>
                    </Button>
                    <Button as={Link} href="/users" color="secondary" outline>
                      کنسل
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateUserPage;
