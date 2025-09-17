const countryName = new URLSearchParams(location.search).get("name");
const countryTitle = document.querySelector(".country-title")
const flagImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const body = document.querySelector("body");
const themeToggle = document.querySelector(".theme-changer");
const N_A = document.querySelector(".N-A");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    countryTitle.innerText = `${country.name.common}'s info` || "Loading...";
    flagImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    population.innerText = country.population.toLocaleString("en-PK") || "N/A";
    region.innerText = country.region;
    if (country.subregion) {
      subRegion.innerText = country.subregion;
    } else {
      subRegion.innerText = "N/A";
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    } else {
      capital.innerText = "N/A";
    }
    topLevelDomain.innerText = country.tld.join(", ") || "N/A";
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    } else {
      currencies.innerText = "N/A";
    }
    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    } else {
      languages.innerText = "N/A";
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    } else {
      N_A.innerText = "N/A";
    }
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
  localStorage.setItem("theme", isDark ? "dark" : "Light");
  themeToggle.innerHTML = isDark
    ? `<p><i class="fa-regular fa-sun"></i>&nbsp;&nbsp;Light Mood</p>`
    : `<p><i class="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mood</p>`;
});