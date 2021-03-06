const presence = new Presence({
    clientId: "817753774868529154"
  }),
  elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
    startTimestamp: elapsed
    },
    path = document.location.pathname;

  if(path === "/"){
    presenceData.details = "Viewing HomePage";
  }
  else if (path == "/browse"){
    presenceData.details = "Searching for an Anime";
  }
  else if( path == "/search"){
    presenceData.details = "Searching for an Anime";
  }
  else if(path.includes("details")){
    presenceData.details = "Viewing an Anime";
    presenceData.state = document.querySelector("body > section > div > div.anime__details__content > div > div.col-lg-9 > div > div.row > div.col-lg-10 > div > h3").textContent;
  }
  else if(path.includes("watch")){
    presenceData.details = `Watching ${document.querySelector("#anime_details_breadcrumbs").textContent}`;
    presenceData.state = document.querySelector("#current_episode").textContent;
    presenceData.buttons = [
      {
        label:"Watch Episode", url:document.location.href
      }
    ];
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
