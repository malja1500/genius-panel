// ** React Imports
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import RawTool from "@editorjs/raw";
import Warning from "@editorjs/warning";
import Table from "editorjs-table";
import { Fragment, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Button, Spinner } from "reactstrap";

// ** Utils
import Headline from "../../../../utility/headline-class-helper.utils";

// ** Icon Imports
import { ArrowLeft, ArrowRight } from "react-feather";

const Describe = ({
  stepper,
  describe,
  defaultValue,
  setDescribe,
  onSubmit,
  isLoading,
}) => {
  // ** Hooks
  const editorJsInstance = useRef(null);
  const editorRef = useRef(null);

  const handleSaveData = async () => {
    if (editorJsInstance.current) {
      const savedData = await editorJsInstance.current.save();

      setDescribe(JSON.stringify(savedData));
    } else toast.error("لطفا توضیحات را وارد کنید !");
  };

  useEffect(() => {
    if (!editorRef.current) return;

    editorJsInstance.current = new EditorJS({
      holder: editorRef.current,
      autofocus: true,
      tools: {
        header: Header,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:3000/fetchUrl", // Your backend endpoint for url data fetching
          },
        },
        raw: RawTool,
        image: {
          class: ImageTool,
          config: {
            endpoints: {
              byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
              byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
            },
          },
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              coub: true,
            },
          },
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        delimiter: Delimiter,
        warning: {
          class: Warning,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+W",
          config: {
            titlePlaceholder: "عنوان",
            messagePlaceholder: "پیام",
          },
        },
        table: {
          class: Table,
        },
        headline: {
          class: Headline,
        },
      },
    });

    return () => {
      if (editorJsInstance.current) {
        editorJsInstance.current.destroy();
        editorJsInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!editorRef.current) return;

    if (defaultValue) {
      try {
        const convertDescribe = JSON.parse(defaultValue);
        editorJsInstance.current = new EditorJS({
          holder: editorRef.current,
          autofocus: true,
          data: convertDescribe,
          tools: {
            header: Header,
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: "http://localhost:3000/fetchUrl", // Your backend endpoint for url data fetching
              },
            },
            raw: RawTool,
            image: {
              class: ImageTool,
              config: {
                endpoints: {
                  byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                  byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
                },
              },
            },
            checklist: {
              class: Checklist,
              inlineToolbar: true,
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
            },
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                  coub: true,
                },
              },
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+O",
              config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote's author",
              },
            },
            delimiter: Delimiter,
            warning: {
              class: Warning,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+W",
              config: {
                titlePlaceholder: "عنوان",
                messagePlaceholder: "پیام",
              },
            },
            table: {
              class: Table,
            },
            headline: {
              class: Headline,
            },
          },
        });
      } catch (error) {
        // return null;
      }
    }
  }, [defaultValue]);

  useEffect(() => {
    if (describe) onSubmit();
  }, [describe]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">توضیحات اخبار</h5>
        <small className="text-muted">
          در این بخش باید توضیحات اخبار را وارد کنید.
        </small>
      </div>
      <div ref={editorRef}></div>
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
          color="primary"
          className="btn-next d-flex align-items-center submit-button"
          onClick={handleSaveData}
          disabled={isLoading}
        >
          {isLoading && <Spinner size="sm" className="loading-spinner" />}
          <span className="align-middle d-sm-inline-block d-none">
            {defaultValue ? "ویرایش" : "ایجاد"} خبر
          </span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default Describe;
