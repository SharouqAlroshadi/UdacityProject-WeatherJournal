/*
 *code and comments are written by Mohammed Abdallah
 *Second nanodegree project
 */
/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=3891ce854ae1a43fd2e4d1c8262cd10a&units=imperial";
const generate = document.getElementById("generate");

//add event listener to the button
generate.addEventListener("click", performAction);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const content = document.getElementById("feelings").value;
  console.log(`${baseURL}${zipCode}${apiKey}`);
  retrieveData(baseURL, zipCode, apiKey)
    //then
    .then(function (data) {
      postData("/addEntry", { date: newDate, temp: data.main.temp, content });
    })
    .then(() => updateUi());
}

//get data
const retrieveData = async (base, zip, key) => {
  const res = await fetch(base + zip + key);
  console.log(res);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//post data function
const postData = async (url = "", data = {}) => {
  console.log(data);
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const updateUi = async () => {
  const res = await fetch("/all");
  console.log(res);
  try {
    const allData = await res.json();
    console.log(allData);
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + " degrees";
    document.getElementById("#content").innerHTML = allData.content;
    return allData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
