// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import { Card, Col, Row } from "reactstrap";

// ** Icon Imports
import { CheckCircle, Trash2 } from "react-feather";

// ** Core Imports
import { adminNewsFilterListAPI } from "../core/services/api/news/admin-news-filter-list.api";

// ** Custom Components
import BreadCrumbs from "../@core/components/breadcrumbs";
import StatsHorizontal from "../@core/components/StatsHorizontal";

// ** Styles
import "@styles/react/apps/app-invoice.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import NewsListTable from "../@core/components/News/Table";

const NewsPage = () => {
  // ** States
  const [allNews, setAllNews] = useState();
  const [sort, setSort] = useState("desc");
  const [sortColumn, setSortColumn] = useState("id");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchText, setSearchText] = useState();
  const [deletedNews, setDeletedNews] = useState();
  const [activeNews, setActiveNews] = useState();
  const [active, setActive] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getNews = await adminNewsFilterListAPI(currentPage, rowsPerPage);

        const getDeletedCourses = await adminNewsFilterListAPI(
          1,
          10000,
          undefined,
          undefined,
          undefined,
          false
        );

        setAllNews(getNews);
        setActiveNews(getNews);
        setDeletedNews(getDeletedCourses);
      } catch (error) {
        toast.error("مشکلی در دریافت اخبار به وجود آمد !");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const getNews = await adminNewsFilterListAPI(
          currentPage,
          rowsPerPage,
          sortColumn,
          sort,
          searchText,
          active
        );

        setAllNews(getNews);
      } catch (error) {
        toast.error("مشکلی در دریافت اخبار به وجود آمد !");
      }
    };

    fetchCourses();
  }, [searchText, sort, sortColumn, active, currentPage, rowsPerPage]);

  return (
    <div className="invoice-list-wrapper">
      <BreadCrumbs
        title="لیست اخبار"
        data={[
          { title: "مدیریت اخبار", link: "/news" },
          { title: "لیست اخبار" },
        ]}
      />
      <div className="app-user-list w-100">
        <Row>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="success"
              statTitle="اخبار فعال"
              icon={<CheckCircle />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {activeNews?.totalCount || 0}
                </h3>
              }
              onClick={() => setActive(true)}
              className="cursor-pointer"
              backgroundColor={active === true && "rgb(0 0 0 / 23%)"}
            />
          </Col>
          <Col lg="3" sm="6">
            <StatsHorizontal
              color="danger"
              statTitle="اخبار غیر فعال"
              icon={<Trash2 size={20} />}
              renderStats={
                <h3 className="fw-bolder mb-75">
                  {deletedNews?.totalCount || 0}
                </h3>
              }
              onClick={() => setActive(false)}
              className="cursor-pointer"
              backgroundColor={active === false && "rgb(0 0 0 / 23%)"}
            />
          </Col>
        </Row>
      </div>
      <Card className="rounded">
        <NewsListTable
          news={allNews}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          searchText={searchText}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
          setSearchText={setSearchText}
          setSort={setSort}
          setSortColumn={setSortColumn}
        />
      </Card>
    </div>
  );
};

export default NewsPage;
