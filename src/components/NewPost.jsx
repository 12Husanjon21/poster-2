import { useState } from "react";
import Swal from "sweetalert2";

const NewPost = ({
  handleSubmit,
  postTitle,
  setPostTitle,
  postBody,
  setPostBody,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmit(true);

    let timerInterval;
    Swal.fire({
      title: "Creating Post",
      html: "Please wait...",
      timer: 1500,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {
          let timer = Swal.getHtmlContainer();
          timer.querySelector(
            ".swal2-timer-progress-bar"
          );  
          if (timer) {
            timer.style.width = Swal.getTimerLeft() / 15 + "%";
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("Closed by timer");
      }
    });

   await handleSubmit(e);
    setIsSubmit(false);
    Swal.fire({
      icon: "success",
      title: "Post Created Successfully",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      position: "top-end",
      toast: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="postTitle">Title:</label>
          <input
            id="postTitle"
            type="text"
            className="form-control"
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="postBody">Post:</label>
          <textarea
            id="postBody"
            className="form-control"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={isSubmit}>
            {isSubmit ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default NewPost;