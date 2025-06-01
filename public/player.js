// SUPEREMBED PLAYER SCRIPT
// PLAYER SETTINGS

// Player font - paste font name from Google fonts, replace spaces with +
const player_font = "Verdana";

// Player colors - paste color code in HEX format without # e.g., 123456
const player_bg_color = "000000"; // background color
const player_font_color = "ffffff"; // font color
const player_primary_color = "00edc3"; // primary color for loader and buttons
const player_secondary_color = "10fdd3"; // secondary color for hovers and elements

// Player loader - choose a loading animation from 1 to 10
const player_loader = 1;

// Preferred server - choose server that will be on top of the list and open after
// clicking play button, works only for quality >= 720p
// options: vidlox = 7, fembed = 11, mixdrop = 12, upstream = 17, videobin = 18,
// doodstream = 21, streamtape = 25, streamsb = 26, voe = 29, ninjastream = 33
const preferred_server = 0; // use only server number, leave 0 for no preference

// Source list style
// 1 = button with server count and full page overlay with server list
// 2 = button with icon and dropdown with server list
const player_sources_toggle_type = 1;

// Function to get URL query parameters
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Main logic
document.addEventListener("DOMContentLoaded", async () => {
  const video_id = getQueryParam("video_id");
  let is_tmdb = getQueryParam("tmdb") || 0;
  let season = getQueryParam("season") || getQueryParam("s") || 0;
  let episode = getQueryParam("episode") || getQueryParam("e") || 0;

  if (video_id && video_id.trim() !== "") {
    const request_url = `https://getsuperembed.link/?video_id=${video_id}&tmdb=${is_tmdb}&season=${season}&episode=${episode}&player_font=${player_font}&player_bg_color=${player_bg_color}&player_font_color=${player_font_color}&player_primary_color=${player_primary_color}&player_secondary_color=${player_secondary_color}&player_loader=${player_loader}&preferred_server=${preferred_server}&player_sources_toggle_type=${player_sources_toggle_type}`;

    try {
      const response = await fetch(request_url, {
        method: "GET",
        redirect: "follow",
        timeout: 7000,
      });

      if (!response.ok) {
        throw new Error("Request server didn't respond");
      }

      const player_url = await response.text();

      if (player_url && player_url.startsWith("https://")) {
        window.location.href = player_url;
      } else {
        document.body.innerHTML = `<span style="color:red">${player_url}</span>`;
      }
    } catch (error) {
      console.error("Error fetching player URL:", error);
      document.body.innerHTML = "Request server didn't respond";
    }
  } else {
    document.body.innerHTML = "Missing video_id";
  }
});
