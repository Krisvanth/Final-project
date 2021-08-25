const getData = async (link) => {
    let response = await fetch(link);
    let resdata = await response.json();
    return resdata;
}

getData("https://restcountries.eu/rest/v2/all").then(resData => {
    data = resData
    if (data === null || data === undefined || data.length === 0) {
        content.innerHTML = `<div class="alert alert-danger" role="alert">
        No Data
      </div>`
    }
    else {
        putData(data.slice(0,20))
    }
})
.catch(err => {
    console.log(err.message);
})

putData=(finalData)=>{
content.innerHTML = ''
    finalData.map((country) => content.innerHTML +=
        `
    <div class="card mx-3 my-3" style="width: 18rem;">
        <div class="card-header text-center">
            ${country.alpha2Code}
        </div>
        <img src="${country.flag}" class="card-img-top border border-secondary" height="191px">
        <div class="card-body">
            <p class="card-title text-center">${country.name}</p>
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Region: ${country.region}</p>
            <p class="card-text">Sub-Region: ${country.subregion}</p>
            <p class="card-text">Population: ${country.population}</p>
            <p class="card-text">Timezone: ${country.timezones}</p>
            <p class="card-text">Currency: ${country.currencies[0].name}</p>
        </div>
    </div>
    `
    )
}

document.querySelector("#search").addEventListener("input", (event) => {
    let content = document.querySelector("#content")
    let finalData = data.filter(country => country.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
    if (finalData.length === 0) {
        content.innerHTML = `<div class="alert alert-danger" role="alert">
        Country Not Found / Wrong User Input
      </div>`
    }
    else{
        putData(finalData)
    }
})