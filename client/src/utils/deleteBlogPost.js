export const deletePost = async (postId) => {
    const attemptDelete = async () => {
      try {
        const response = await fetch(`/api/blogPost/delete/${postId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Authentication required");
          } else {
            throw new Error("Delete failed");
          }
        }
        fetchBlogPosts();
        setSubmissionMsg("Delete succeeded!");
      } catch (error) {
        console.error("Error during delete operation:", error);
        if (error.message === "Authentication required") {
          try {
            const refreshSuccess = await refreshAccessToken();
            if (refreshSuccess) {
              const retryResponse = await fetch(
                `/api/blogPost/delete/${postId}`,
                {
                  method: "DELETE",
                  credentials: "include",
                }
              );
              if (!retryResponse.ok)
                throw new Error("Delete failed after retry");
              fetchBlogPosts();
              setSubmissionMsg("Delete succeeded after retry!");
            } else {
              setSubmissionMsg("Session expired. Please log in again.");
            }
          } catch (retryError) {
            console.error("Error retrying delete:", retryError);
            setSubmissionMsg(retryError.message);
          }
        } else {
          setSubmissionMsg(error.message);
        }
      }
    };

    await attemptDelete();
  };