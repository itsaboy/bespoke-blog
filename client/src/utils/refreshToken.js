export const refreshAccessToken = async () => {
  try {
    const response = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to refresh access token.");
    return true;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
