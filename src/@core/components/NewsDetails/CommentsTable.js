// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import ReactPaginate from "react-paginate";

// ** Core Imports
import { getAdminNewsCommentsAPI } from "../../../core/services/api/news/get-admin-news-comments.api";

// ** Columns
import { NEWS_COMMENTS_COLUMNS } from "./comments-columns";

const CommentsTable = ({ id }) => {
  // ** States
  const [comments, setComments] = useState();
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 7;

  const endOffset = itemOffset + rowsPerPage;
  const currentItems = comments?.slice(itemOffset, endOffset);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
    const newOffset = (event.selected * rowsPerPage) % comments?.length;

    setItemOffset(newOffset);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(comments.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const getComments = await getAdminNewsCommentsAPI(id);

        setComments(getComments);
      } catch (error) {
        toast.error("مشکلی در دریافت نظرات به وجود آمد !");
      }
    };

    fetchComments();
  }, []);

  return (
    <DataTable
      noHeader
      pagination
      paginationServer
      className="react-dataTable"
      columns={NEWS_COMMENTS_COLUMNS}
      sortIcon={<ChevronDown size={10} />}
      paginationComponent={CustomPagination}
      data={currentItems}
    />
  );
};

export default CommentsTable;
