// ** React Imports
import { useEffect, useState } from "react";

// ** Reactstrap Imports
import { Card, Col, Row } from "reactstrap";

// ** Icon Imports
import { Book, BookOpen, CheckCircle, Trash2 } from "react-feather";

// ** Core Imports
import { useCourseList } from "../core/services/api/course/useCourseList";

// ** Columns
import { COURSE_COLUMNS } from "../@core/components/course-columns";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import TableServerSide from "../@core/components/TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CoursesPage = () => {
  // ** States
  const [allCourses, setAllCourses] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();
  const [courses, setCourses] = useState();
  const [activeCourses, setActiveCourses] = useState();
  const [deletedCourses, setDeletedCourses] = useState();
  const [openCourses, setOpenCourses] = useState();
  const [isAllCourses, setIsAllCourses] = useState(true);
  const [isActiveCourses, setIsActiveCourses] = useState(false);
  const [isDeletedCourses, setIsDeletedCourses] = useState(false);
  const [isOpenCourses, setIsOpenCourses] = useState(false);
  const [isDeletingCourses, setIsDeletingCourses] = useState(false);

  // ** Hooks
  const { data: firstData, isLoading: isFirstDataLoading } = useCourseList(
    1,
    100000
  );
  const { data, isLoading: isDataLoading } = useCourseList(
    undefined,
    100000,
    sortColumn ? sortColumn : undefined,
    sort ? sort : undefined,
    searchText ? searchText : undefined,
    false
  );

  const dataToRender = () => {
    if (isAllCourses) {
      return allCourses;
    } else if (isActiveCourses) {
      return activeCourses;
    } else if (isDeletedCourses) {
      return deletedCourses;
    } else if (isOpenCourses) {
      return openCourses;
    }
  };

  const renderTitle = () => {
    if (isAllCourses) {
      return "همه دوره ها";
    } else if (isActiveCourses) {
      return "دوره های فعال";
    } else if (isDeletedCourses) {
      return "دوره های حذف شده";
    } else if (isOpenCourses) {
      return "دوره های در حال برگزاری";
    }
  };

  useEffect(() => {
    if (firstData) {
      const getActiveCourses = firstData.courseDtos.filter((course) => {
        return course.isActive === true;
      });
      const getDeletedCourses = firstData.courseDtos.filter((course) => {
        return course.isdelete === true;
      });
      const getOpenCourses = firstData.courseDtos.filter((course) => {
        return course.statusName == "درحال برگزاری";
      });

      setCourses(firstData.courseDtos);
      setActiveCourses(getActiveCourses);
      setDeletedCourses(getDeletedCourses);
      setOpenCourses(getOpenCourses);
    }

    if (data) setAllCourses(data?.courseDtos);
  }, [firstData, data]);

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست دوره ها"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "لیست دوره ها" },
        ]}
      />
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="همه دوره ها"
              icon={<Book />}
              renderStats={
                <h3 className="fw-bolder mb-75">{courses?.length || 0}</h3>
              }
              onClick={() => {
                setIsAllCourses(true);
                setIsActiveCourses(false);
                setIsDeletedCourses(false);
                setIsOpenCourses(false);
              }}
              className="cursor-pointer"
              backgroundColor={isAllCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="دوره های فعال"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {activeCourses?.length || 0}
                </h3>
              }
              onClick={() => {
                setIsAllCourses(false);
                setIsActiveCourses(true);
                setIsDeletedCourses(false);
                setIsOpenCourses(false);
              }}
              className="cursor-pointer"
              backgroundColor={isActiveCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="دوره های حذف شده"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {deletedCourses?.length || 0}
                </h3>
              }
              onClick={() => {
                setIsAllCourses(false);
                setIsActiveCourses(false);
                setIsDeletedCourses(true);
                setIsOpenCourses(false);
              }}
              className="cursor-pointer"
              backgroundColor={isDeletedCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="warning"
              statTitle="دوره های در حال برگزاری"
              icon={<BookOpen size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">{openCourses?.length || 0}</h3>
              }
              onClick={() => {
                setIsAllCourses(false);
                setIsActiveCourses(false);
                setIsDeletedCourses(false);
                setIsOpenCourses(true);
              }}
              className="cursor-pointer"
              backgroundColor={isOpenCourses && "rgb(0 0 0 / 23%)"}
            />
          </Col>
        </Row>
      </div>
      <Card className="rounded">
        <TableServerSide
          data={dataToRender()}
          columns={COURSE_COLUMNS}
          renderTitle={renderTitle()}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          setSort={setSort}
          setSortColumn={setSortColumn}
          isCourseCreateButtonShow
          loadingNotFoundText={
            isFirstDataLoading || isDataLoading
              ? "در حال دریافت دوره ها ..."
              : "دوره ای پیدا نشد !"
          }
          isDeletingData={isDeletingCourses}
          setIsDeletingData={setIsDeletingCourses}
        />
      </Card>
    </div>
  );
};

export default CoursesPage;
