import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { hostname } from "../../hostname";

const PostEditor = ({ content, setContent }) => {
  const handleFileUpload = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open("POST", `${hostname}/blog/upload`);

      let token;
      if (localStorage.getItem("userAuthToken")) {
        token = localStorage.getItem("userAuthToken");
      } else {
        token = localStorage.getItem("adminAuthToken");
      }

      // xhr.setRequestHeader("Content-type", "application/json");
      xhr.setRequestHeader("authorization", token);

      xhr.upload.onprogress = (e) => {
        progress((e.loaded / e.total) * 100);
      };

      xhr.onload = () => {
        if (xhr.status === 403) {
          reject({ message: "HTTP Error: " + xhr.status, remove: true });
          return;
        }

        if (xhr.status < 200 || xhr.status >= 300) {
          reject("HTTP Error: " + xhr.status);
          return;
        }

        const json = JSON.parse(xhr.responseText);

        console.log(json);

        if (!json || typeof json.url != "string") {
          reject("Invalid JSON: " + xhr.responseText);
          return;
        }

        resolve(json.url);
      };

      xhr.onerror = () => {
        reject(
          "Image upload failed due to a XHR Transport error. Code: " +
            xhr.status
        );
      };

      const formData = new FormData();
      formData.append("file", blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    });

  return (
    <Editor
      initialValue="<h1>start typing</h1>"
      apiKey="737ctk8spome1abtlmdn1d8968z1badiw4l81la080r6c6xb"
      value={content}
      onEditorChange={(newContent, Editor) => {
        setContent(newContent);
      }}
      onInit={(evt, editor) => editor.setContent(content)}
      init={{
        height: 400,
        menubar: false,
        plugins:
          "anchor autolink charmap codesample code emoticons image link lists media searchreplace table visualblocks wordcount fullscreen",

        toolbar:
          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough codesample code | link image media table | fullscreen | spellcheckdialog | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",

        images_upload_url: "http://localhost:4000/media/upload",
        images_upload_handler: handleFileUpload,
      }}
    />
  );
};

export default PostEditor;
