// ** React Imports
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardHeader, Col, Input, Label, Row } from "reactstrap";

// ** Core Imports
import { useCourseReserveWithId } from "../../../../core/services/api/course/course-reserve/useCourseReserveWithId";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Columns
import { COURSE_RESERVED_COLUMNS } from "../../course-columns/course-reserved-columns";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CourseReserve = () => {
  // ** States
  const [currentPage, setCurrentPage] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ** Hooks
  const { id } = useParams();
  const { data: courseReserve } = useCourseReserveWithId(id);

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = courseReserve?.slice(itemOffset, endOffset);

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = courseReserve.filter((reserve) => {
        const startsWith = reserve.studentName
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = reserve.studentName
          .toLowerCase()
          .includes(value.toLowerCase());

        if (startsWith) {
          return startsWith;
        } else if (!startsWith && includes) {
          return includes;
        } else return null;
      });
      setFilteredData(updatedData);
      setSearchValue(value);
    }
  };

  // ** Function to handle Pagination
  const handlePagination = (event) => {
    setCurrentPage(event.selected + 1);
    const newOffset = (event.selected * rowsPerPage) % courseReserve?.length;

    setItemOffset(newOffset);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
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
        pageCount={
          searchValue.length
            ? Math.ceil(filteredData.length / rowsPerPage)
            : Math.ceil(courseReserve.length / rowsPerPage) || 1
        }
        onPageChange={(page) => handlePagination(page)}
        containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
      />
    );
  };

  return (
    <Card>
      <CardHeader tag="h4">رزرو کنندگان دوره</CardHeader>
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
                onChange={(e) => handlePerPage(e)}
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
        <DataTable
          noHeader
          pagination
          data={searchValue.length ? filteredData : currentItems}
          columns={COURSE_RESERVED_COLUMNS(true)}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          noDataComponent={<p className="my-1">رزروی برای این دوره پیدا نشد</p>}
        />
      </div>
    </Card>
  );
};

export default CourseReserve;
