const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchInput = document.querySelector(".search-container input");
const themeToggle = document.querySelector(".theme-changer");
const body = document.querySelector("body");

let allCountriesData;

fetch(`https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital`)
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then(renderCountries);
});

function renderCountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common} flag" />
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString(
                  "en-PK"
                )}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p>
            </div>`;
    countriesContainer.append(countryCard);
  });
}

searchInput.addEventListener("input", (e) => {
  let filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountries);
});

const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.classList.add("dark");
  themeToggle.innerHTML = `<p><i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mood</p>`;
} else {
  themeToggle.innerHTML = `<p><i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mood</p>`;
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.innerHTML = isDark
  ? `<p><i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mood</p>`
  : `<p><i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mood</p>`;
});
