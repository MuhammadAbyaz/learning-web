const form = document.querySelector("#searchForm");
const search = document.querySelector("#search");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const res = await axios.get(`https://api.tvmaze.com/search/shows`, {
    params: { q: search.value },
  });
  search.value = "";
  for (let i = 0; i < res.data.length; i++) {
    if (res.data[i].show.image) {
      const img = document.createElement("img");
      img.src = res.data[i].show.image.medium;
      document.body.append(img);
    } else {
      console.log("No image found");
    }
  }
});
