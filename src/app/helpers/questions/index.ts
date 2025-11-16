export function getPostMbiQuestions() {
  return fetch("/motor_post_mbi.json")
    .then((res) => res.json())
    .then((data) => data);
}

export function toYouTubeEmbed(url:string) {
  try {
    const YT_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
    const parsedUrl = new URL(url);
    let videoId = null;

    // Standard YouTube URL
    if (parsedUrl.hostname.includes("youtube.com") && parsedUrl.searchParams.has("v")) {
      videoId = parsedUrl.searchParams.get("v");
    }

    // Short URL
    if (parsedUrl.hostname === "youtu.be") {
      videoId = parsedUrl.pathname.slice(1);
    }

    // Validate the video ID
    if (videoId && YT_ID_REGEX.test(videoId)) {
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Invalid URL or video ID
    return null;
  } catch (e) {
    return null;
  }
}
