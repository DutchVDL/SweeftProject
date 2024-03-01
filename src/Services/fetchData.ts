export async function fetchPhotos({
  pageParam,
  word,
}: {
  pageParam?: number;
  word: string;
}) {
  try {
    let apiUrl: string = "";
    if (word) {
      apiUrl = `https://api.unsplash.com/search/photos/?query=${word}&page=${pageParam}&per_page=25`;
    } else {
      apiUrl = `https://api.unsplash.com/photos/?per_page=20&order_by=popular`;
    }

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_API_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function fetchPhotoStatistics(photoId: string | undefined) {
  if (!photoId) {
    throw new Error("Photo ID is undefined");
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/${photoId}/statistics`,
      {
        headers: {
          Authorization: `Client-ID ${import.meta.env.VITE_API_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch photo statistics");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching photo statistics:", error);
    throw error;
  }
}
