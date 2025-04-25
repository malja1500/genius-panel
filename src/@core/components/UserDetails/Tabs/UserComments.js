// ** React Imports
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardHeader, Col, Input, Label, Row } from "reactstrap";

// ** Core Imports
import { useAdminCommentManagement } from "../../../../core/services/api/comment/useAdminCommentManagement.api";

// ** Utility
import { useTimeOut } from "../../../../utility/hooks/useTimeOut";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Columns
import { USER_COMMENTS_COLUMNS } from "./user-comments-columns";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const UserComments = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [sortComments, setSortComments] = useState(true);
  const [query, setQuery] = useState("");

  // ** Hooks
  const { id } = useParams();
  const textTimeOut = useTimeOut();

  const { data, isLoading } = useAdminCommentManagement(
    currentPage,
    rowsPerPage,
    undefined,
    undefined,
    query ? query : undefined,
    sortComments,
    id
  );

  // ** Function to handle filter
  const handleFilter = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
    textTimeOut(() => setQuery(e.target.value), 800);
  };

  // ** Function to handle Pagination
  const handlePagination = (event) => {
    setCurrentPage(event.selected + 1);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Function to handle sort comments
  const handleSortComments = (e) => {
    setSortComments(e.target.value);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageRangeDisplayed={2}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        pageCount={Math.ceil(data.totalCount / rowsPerPage) || 1}
        onPageChange={(page) => handlePagination(page)}
        containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      />
    );
  };

  return (
    <Card>
      <CardHeader tag="h4">نظرات کاربر</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <Row className="justify-content-end align-items-center mx-0 course-reserve-filters">
          <Col md="6" sm="12">
            <div className="d-flex align-items-center">
              <Label for="sort-select">تعداد نمایش در صفحه</Label>
              <Input
                className="dataTable-select course-reserve-rows-per-page-input"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={handlePerPage}
              >
                <option value={5}>5</option>
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
            </div>
          </Col>
          <Col
            md="6"
            sm="12"
            className="d-flex align-items-center justify-content-end course-reserve-filters-search"
          >
            <Label className="me-1" for="search-input">
              جستجو
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <Row className="course-reserve-filters user-comments-sort-accepted-row">
          <Col md="9" sm="12" className="user-comments-sort-accepted-wrapper">
            <Label for="sort-select">مرتب سازی نظرات</Label>
            <Input
              className="dataTable-select user-comments-sort-accepted-select-box"
              type="select"
              id="sort-select"
              value={sortComments}
              onChange={handleSortComments}
            >
              <option value={true}>تایید شده</option>
              <option value={false}>تایید نشده</option>
            </Input>
          </Col>
        </Row>
        <DataTable
          noHeader
          pagination
          paginationServer
          data={data?.comments}
          columns={USER_COMMENTS_COLUMNS}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          noDataComponent={
            <span className="my-2">
              {isLoading
                ? "در حال دریافت نظرات کاربر"
                : " نظری برای این کاربر پیدا نشد !"}
            </span>
          }
        />
      </div>
    </Card>
  );
};

export default UserComments;
