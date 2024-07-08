// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card, Col, Row } from "reactstrap";

// ** Icon Imports
import { Book, CheckCircle, Trash2 } from "react-feather";

// ** Core Imports
import { getCourseReserveAPI } from "../core/services/api/course/course-reserve/get-course-reserve.api";

// ** Columns
import { COURSE_RESERVED_PAGE_COLUMNS } from "../@core/components/course-columns/course-reserved-page-columns";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import TableServerSide from "../@core/components/TableServerSide";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseReservedPage = () => {
  // ** States
  const [allReserves, setAllReserves] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [acceptedReserves, setAcceptedReserves] = useState();
  const [notAcceptedReserves, setNotAcceptedReserves] = useState();
  const [isAllReserves, setIsAllReserves] = useState(true);
  const [acceptReserves, setAcceptReserves] = useState(false);
  const [isNotAcceptedReserves, setIsNotAcceptedReserves] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const dataToRender = () => {
    if (isAllReserves) {
      return allReserves;
    } else if (acceptReserves) {
      return acceptedReserves;
    } else if (isNotAcceptedReserves) {
      return notAcceptedReserves;
    }
  };

  const renderTitle = () => {
    if (isAllReserves) {
      return "همه رزرو ها";
    } else if (acceptReserves) {
      return "رزرو های تایید شده";
    } else if (isNotAcceptedReserves) {
      return "رزرو های تایید نشده";
    }
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchText(value);

    if (value.length) {
      updatedData = allReserves.filter((reserve) => {
        if (reserve.studentName === null) return null;
        const startsWith = reserve?.studentName.startsWith(value.toLowerCase());

        const includes = reserve?.studentName.includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchText(value);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getCourseReserves = await getCourseReserveAPI();
        const getAcceptedReserves = getCourseReserves.filter((course) => {
          return course.accept === true;
        });
        const getNotAcceptedReserves = getCourseReserves.filter((course) => {
          return course.accept === false;
        });

        setAllReserves(getCourseReserves);
        setAcceptedReserves(getAcceptedReserves);
        setNotAcceptedReserves(getNotAcceptedReserves);
      } catch (error) {
        toast.error("مشکلی در دریافت رزرو ها به وجود آمد !");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست رزرو ها"
        data={[
          { title: "مدیریت دوره ها", link: "/courses" },
          { title: "لیست رزرو ها" },
        ]}
      />
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="primary"
              statTitle="همه رزرو ها"
              icon={<Book />}
              renderStats={
                <h3 className="fw-bolder mb-75">{allReserves?.length || 0}</h3>
              }
              onClick={() => {
                setIsAllReserves(true);
                setAcceptReserves(false);
                setIsNotAcceptedReserves(false);
              }}
              className="cursor-pointer"
              backgroundColor={isAllReserves && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="رزرو های تایید شده"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {acceptedReserves?.length || 0}
                </h3>
              }
              onClick={() => {
                setIsAllReserves(false);
                setAcceptReserves(true);
                setIsNotAcceptedReserves(false);
              }}
              className="cursor-pointer"
              backgroundColor={acceptReserves && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="رزرو های تایید نشده"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {notAcceptedReserves?.length || 0}
                </h3>
              }
              onClick={() => {
                setIsAllReserves(false);
                setAcceptReserves(false);
                setIsNotAcceptedReserves(true);
              }}
              className="cursor-pointer"
              backgroundColor={isNotAcceptedReserves && "rgb(0 0 0 / 23%)"}
            />
          </Col>
        </Row>
      </div>
      <Card className="rounded">
        <TableServerSide
          data={searchText.length ? filteredData : dataToRender()}
          columns={COURSE_RESERVED_PAGE_COLUMNS()}
          renderTitle={renderTitle()}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchValue={setSearchText}
          notFoundText="رزروی پیدا نشد !"
          handleSearchFilter={handleFilter}
        />
      </Card>
    </div>
  );
};

export default CourseReservedPage;
