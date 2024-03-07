import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import URI from "urijs";

const isUrl = (input) => {
  const checkInput =
    /^(https?:\/\/)(www\.)?([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?/.test(
      input
    );
  return checkInput;
};

const extractUsername = (input) => {
  const regex = /[!@#/$%^&*()_+]/g;
  if (isUrl(input)) {
    if (!input.includes("youtube.com")) {
      return { status: false };
    }
    const extractPathName = new URI(input);
    const pathname = extractPathName.pathname().split("/");
    var result = {};
    var linkType = "username";
    switch (pathname[1]) {
      case "c":
        result = pathname[2];
        break;
      case "channel":
        result = pathname[2];
        linkType = "channel_id";
        break;
      case "user":
        result = pathname[2];
        break;

      default:
        result = pathname[1];
        break;
    }
    if (result.includes("@")) {
      result = result.replace(regex, "").replace("\\", "");
    }
    return { status: true, linkType: linkType, result: result };
  } else {
    var result = input.replace(regex, "").replace("\\", "");

    return { status: true, linkType: "username", result: result };
  }
};

function useChanneInput() {
  const [formData, setFormData] = useState({
    url: "",
  });
  const [errorForm, setErrorForm] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorForm([]);
    const link = formData.url;
    const regex = /[!@#/$%^&*()_+]/g;
    if (isUrl(link)) {
      if (!link.includes("youtube.com")) {
        setErrorForm([
          { message: "Your URL is't From Youtube" },
          { message: "Example: https://www.youtube.com/@PakdeChan" },
        ]);
      } else {
        try {
          const response = await axios.get(
            `/api/getChannelId?url=${encodeURIComponent(link)}`
          );
          if (response.data.status) {
            router.push(`/live/${response.data.channelId}`);
          } else {
            setErrorForm([
              { message: response.data.message },
              { message: "Example: https://www.youtube.com/@PakdeChan" },
            ]);
          }
        } catch (error) {
          setErrorForm([{ message: error.message }]);
        }
      }
    } else {
      const username = link.replace(regex, "").replace("\\", "");
      try {
        const response = await axios.get(
          `/api/getChannelId?url=${encodeURIComponent(
            "https://www.youtube.com/@" + username
          )}`
        );
        if (response.data.status) {
          router.push(`/live/${response.data.channelId}`);
        } else {
          setErrorForm([
            { message: response.data.message },
            { message: "Example: https://www.youtube.com/@PakdeChan" },
          ]);
        }
      } catch (error) {
        setErrorForm([{ message: error.message }]);
      }
    }

    setIsLoading(false);
  };

  const handleCloseError = () => {
    setErrorForm([]);
  };

  return {
    handleSubmit,
    handleInput,
    handleCloseError,
    isLoading,
    errorForm,
    formData,
  };
}

export default useChanneInput;
