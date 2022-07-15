// function to simulate loading
const addDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const form = document.querySelector("form");
const input = form.children[0];
form.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const images = document.querySelector(".image");
  images.innerHTML = "";
  const config = {
    params: {
      q: input.value,
      age: "lte16",
    },
  };
  document.querySelector(".loading").classList.remove("hidden");
  // simulate loading
  await addDelay(1500);
  const res = await axios.get(`https://api.tvmaze.com/search/shows?`, config);
  document.querySelector(".loading").classList.add("hidden");
  input.value = "";
  // no results
  if (!res.data.length) {
    document.querySelector(".image").innerHTML = "<h1>No results found</h1>";
    return;
  }
  console.log(res.data);
  for (let show of res.data) {
    const movie = document.createElement("div");
    movie.classList.add("movie");
    const newImg = document.createElement("img");
    newImg.src =
      show.show.image && show.show.image.medium
        ? show.show.image && show.show.image.medium
        : "https://via.placeholder.com/210x295";
    const title = document.createElement("div");
    title.innerText = show.show.name;
    movie.append(newImg, title);
    document.querySelector(".image").append(movie);
  }
});
