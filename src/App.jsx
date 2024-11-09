import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdContentCopy } from "react-icons/md";
import { useToast } from "./Toast/ToastService";
import { TiTick } from "react-icons/ti";

const App = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [orgUrl, setOrgUrl] = useState("");
  const toast = useToast();
  const textReadRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("data:", data);
    setOrgUrl(data?.orgUrl);
    axios
      .post("http://localhost:3000/create", data)
      .then((response) => {
        console.log("Response:", response);
        console.log("Response Data:", response.data);
        console.log(
          "Response Data:",
          response?.data?.isUrl || response?.data?.newUrl[0]?.ShortUrl
        );
        setShortUrl(
          response?.data?.isUrl || response?.data?.newUrl[0]?.ShortUrl
        );
      })
      .catch((error) => {
        `Error: ${error?.response?.data.message}`;
      });
  };

  if (shortUrl) console.log("Short Url:", shortUrl);

  const handleCopy = useCallback(async () => {
    try {
      await navigator?.clipboard?.writeText(textReadRef?.current?.innerText);
      toast.open(
        <div className="bg-green-100 flex gap-2 text-green-500 p-2 rounded-lg shadow-lg">
          <TiTick size={20} />
          <div>
            <h3 className="font-bold">Link Copied</h3>
            <p className="text-sm">Link copied to your clipboard</p>
          </div>
        </div>
      );
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }, [textReadRef]);

  return (
    <div>
      <div className="text-2xl text-sky-900 px-10 py-14 text-center font-medium lg:text-5xl">
        URL Shortner
      </div>
      <div className=" max-w-[90%] mx-auto px-4 py-2 mb-4 flex flex-col gap-12 justify-center items-center border-2 bg-white rounded-lg shadow-md md:max-w-[80%] lg:max-w-[60%] lg:px-8 lg:py-4">
        <div className="text-xl text-slate-500 font-normal mb-3 lg:text-4xl">
          Paste the URL to be shortend
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-start gap-2 mb-2"
        >
          <input
            {...register("orgUrl", {
              required: true,
              pattern: {
                value:
                  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
                message: "Invalid URL",
              },
            })}
            type="url"
            name="orgUrl"
            className="w-full font-roboto font-normal text-base bg-transparent placeholder:text-slate-600 text-slate-700  border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow lg:px-4 lg:py-3 lg:text-lg"
            placeholder="https://example.com/long-url"
          />
          {errors.orgUrl?.type === "required" && (
            <small className="text-red-500 font-roboto font-normal text-base">
              URL is required
            </small>
          )}
          {errors.orgUrl && (
            <small className="text-red-500 font-roboto font-normal text-base">
              {errors.orgUrl.message}
            </small>
          )}
          <button
            type="submit"
            className="bg-blue-900 text-lg text-white px-3 py-2 rounded-md font-roboto font-medium"
          >
            Shorten URL
          </button>
        </form>
      </div>
      {shortUrl && (
        <div className=" max-w-[90%] mx-auto px-4 py-2 flex flex-col gap-12 justify-start border-2 bg-white rounded-lg shadow-md md:max-w-[80%] lg:max-w-[60%] lg:px-8 lg:py-4 ">
          <div>
            <div className="font-roboto font-normal text-base">
              Long URL: {orgUrl}
            </div>
            <br></br>
            <div className="flex justify-between items-center">
              <div
                ref={textReadRef}
                className="font-roboto font-medium text-xl"
              >
                {" "}
                {shortUrl}
              </div>
              <MdContentCopy
                size={20}
                className="cursor-pointer "
                onClick={handleCopy}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
