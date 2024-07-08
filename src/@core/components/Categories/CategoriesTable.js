// ** React Imports
import { Fragment, memo, useState } from "react";
import { Link } from "react-router-dom";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Reactstrap Imports
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";

const CategoriesTable = ({ data = [], columns }) => {
  // ** States
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = data && data?.slice(itemOffset, endOffset);

  const handlePageClick = (event, isFilter, currentPage) => {
    setCurrentPage(isFilter ? currentPage : event.selected + 1);
    const newOffset =
      (isFilter ? currentPage * rowsPerPage : event.selected * rowsPerPage) %
      data?.length;

    setItemOffset(newOffset);
  };

  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    setSearchValue(value);

    if (value.length) {
      updatedData = data.filter((category) => {
        const startsWith = category.categoryName
          .toLowerCase()
          .startsWith(value.toLowerCase());

        const includes = category.categoryName
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

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={
          searchValue.length
            ? Math.ceil(filteredData.length / rowsPerPage)
            : count || 1
        }
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePageClick(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  // ** Handle sort
  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="d-flex justify-content-between align-items-center border-bottom">
          <CardTitle tag="h4">لیست دسته بندی ها</CardTitle>
          <div className="d-flex gap-1">
            <Button tag={Link} to="/create-category" color="primary">
              افزودن دسته بندی
            </Button>
          </div>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
            <div className="d-flex gap-1 align-items-center">
              <Label for="sort-select" className="mt-one">
                تعداد نمایش در صفحه
              </Label>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
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
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="6"
          >
            <Label className="me-1 mt-one" for="search-input">
              جستجو
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable">
          <DataTable
            noHeader
            pagination
            paginationServer
            className="react-dataTable"
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={searchValue.length ? filteredData : currentItems}
            noDataComponent={
              <span className="mt-2">دسته بندی ای پیدا نشد !</span>
            }
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default memo(CategoriesTable);
