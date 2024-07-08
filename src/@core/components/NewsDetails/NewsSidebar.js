// ** React Imports
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

// ** Core Imports
import { adminNewsFilterListAPI } from "../../../core/services/api/news/admin-news-filter-list.api";
import { getNewsCategoryListsAPI } from "../../../core/services/api/news/get-news-category-lists";

// ** Utils
import { convertDateToPersian } from "../../../utility/date-helper.utils";

// ** Third Party Components
import classnames from "classnames";
import { Star } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Images
import blankThumbnail from "../../../assets/images/common/blank-thumbnail.jpg";

const NewsSidebar = () => {
  // ** States
  const [recentNews, setRecentNews] = useState();
  const [newsCategoryLists, setNewsCategoryLists] = useState();

  useEffect(() => {
    const fetchRecentNews = async () => {
      try {
        const getRecentNews = await adminNewsFilterListAPI(1, 4);

        setRecentNews(getRecentNews);
      } catch (error) {
        toast.error("مشکلی در دریافت آخرین اخبار به وجود آمد !");
      }
    };

    const fetchNewsCategoryLists = async () => {
      try {
        const getNewsCategoryLists = await getNewsCategoryListsAPI();

        const getLatestNewsCategoryLists = getNewsCategoryLists.slice(0, 4);

        setNewsCategoryLists(getLatestNewsCategoryLists);
      } catch (error) {
        toast.error("مشکلی در دریافت لیست دسته بندی های اخبار به وجود آمد !");
      }
    };

    fetchRecentNews();
    fetchNewsCategoryLists();
  }, []);

  const renderRecentNews = () => {
    return recentNews?.news.map((news) => {
      const formattedUpdateDate = convertDateToPersian(news.updateDate);

      return (
        <div
          key={news.id}
          className={classnames("d-flex", {
            "mb-2": news.id !== recentNews.totalCount - 1,
          })}
        >
          <Link className="me-2" to={`/news/${news.id}`}>
            <img
              className="rounded"
              src={
                news.currentImageAddressTumb !== null
                  ? news.currentImageAddressTumb
                  : blankThumbnail
              }
              alt={news.title}
              width="60"
              height="60"
            />
          </Link>
          <div>
            <h6 className="blog-recent-post-title">
              <Link
                className="text-body-heading text-truncate recent-news-title"
                to={`/news/${news.id}`}
              >
                {news.title}
              </Link>
            </h6>
            <div className="text-muted mb-0">{formattedUpdateDate}</div>
          </div>
        </div>
      );
    });
  };

  const renderCategories = () => {
    return newsCategoryLists?.map((item) => {
      return (
        <div
          key={item.id}
          className="d-flex justify-content-start align-items-center"
        >
          <a className="me-75" href="/" onClick={(e) => e.preventDefault()}>
            <Avatar
              className="rounded-full"
              color="light-primary"
              icon={<Star size={15} />}
            />
          </a>
          <a href="/" onClick={(e) => e.preventDefault()}>
            <div className="blog-category-title text-body">
              {item.categoryName}
            </div>
          </a>
        </div>
      );
    });
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            {newsCategoryLists !== null ? (
              <Fragment>
                <div className="blog-recent-posts mt-3">
                  <h6 className="section-label">آخرین اخبار</h6>
                  <div className="mt-75">{renderRecentNews()}</div>
                </div>
                <div className="blog-categories mt-3">
                  <h6 className="section-label">دسته بندی های اخبار</h6>
                  <div className="mt-1 d-flex flex-column gap-1">
                    {renderCategories()}
                  </div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;
