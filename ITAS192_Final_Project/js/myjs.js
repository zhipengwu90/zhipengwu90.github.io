import React, {
  useState,
  useEffect,
  useCallback,
} from "https://unpkg.com/es-react@latest/dev/react.js";
import ReactDOM from "https://unpkg.com/es-react@latest/dev/react-dom.js";
import htm from "https://unpkg.com/htm@latest?module";
const html = htm.bind(React.createElement);

//Predict age based on a name component
const NameApp = () => {
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //fecth data from API
  const fetchData = async (name) => {
    setIsLoading(true);
    let url = new URL(`https://api.agify.io/?name=${name}`);
    let response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      //set age as "loading" for 1 second after clicking fetch button
      setAge(json.age + " years old");

      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      console.log(json.age);
    } else {
      setIsLoading(false);
      alert(`HTTP-Error: ${response.status}! Please enter a name!!`);
    }
  };

  const getName = () => {
    return document.getElementById("name").value;
  };
  const handleFetchData = async () => {
    fetchData(getName());
  };
  return html` ${isLoading
    ? html` <button
          className="btn btn-outline-light my-1"
          onClick=${handleFetchData}
        >
          Fetch
        </button>

        <br /><img
          className="rounded mx-auto d-block"
          src="imgs/calculating.gif"
          alt="calculating"
          width="200"
          height="100"
        />`
    : html` <button
          className="btn btn-outline-light my-1"
          onClick=${handleFetchData}
        >
          Fetch
        </button>

        <br />
        <div className=" text-white text-center mt-4">
          ${age ? html`${getName()}: ${age}` : html`Enter a name`}
        </div>`}`;
};
ReactDOM.render(html`<${NameApp} />`, document.getElementById("app2"));
//end of Predict age based on a name component

// random activities component
const App = () => {
  const [activity, setActivity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //fecth data from API
  const fetchData = async () => {
    setIsLoading(true);
    let url = new URL("https://www.boredapi.com/api/activity");
    let response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      //Set the data from API
      setActivity(json.activity);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log(json.activity);
    } else {
      alert(`HTTP-Error: ${response.status}`);
    }
  };

  const handleFetchData = async () => {
    fetchData();
  };
  return html` ${isLoading
    ? html`<div className="text-center">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <br /><img
          className="rounded mx-auto d-block mt-0"
          src="imgs/loading.gif"
          alt="calculating"
          width="100"
          height="100"
        />`
    : html`
        <div className="text-center">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <br />
        <div className="text-white text-center mt-3">
          ${activity ? html`${activity} ` : html`Click the button...`}
        </div>
      `}`;
};

// Use ReactDOM to render the App component
ReactDOM.render(html`<${App} />`, document.getElementById("app"));
// end of random activities component

// get your local (from you IP)
const ipAPI = () => {
  const [info, setInfo] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [click, setClick] = useState(true);
  const [weather,setWeather] =useState([]);

  const yourInfo = (props) => {
    const {
      country_name: country,
      region_code: code,
      city: city,
      latitude: latitude,
      longitude: longitude,
    } = props.data;
    return html`
      <div className="text-center">
        <p>You are at: ${city} ${code} ${country}.</p>
        <p>Latitude: ${latitude}, Longtitude: ${longitude}.</p>

      </div>
    `;
  };
  // const weatherInfo = (props) => {
  //   const {
  //     temp:temp,

  //   } = props.data;
  //   return html`
  //     <div className="text-center">
  //       <p>Temperature: ${temp}.</p>
  //       <p>weather:${weather}</p>
  //       <p>Wind Speed: ${speed}</p>
  //     </div>
  //   `;
  // };

  //fecth data from API
  const fetchData = async () => {
    setIsLoading(true);
    let url = new URL("https://freegeoip.app/json/");
    let response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      //Set the data from API
      setInfo({ data: json });
      // console.log(json.longitude);
      console.log(info);

      setTimeout(() => {
        setIsLoading(false);
        setClick(false);
      }, 1000);


    } else {
      alert(`HTTP-Error: ${response.status}`);
    }
  };
  const handleFetchData = async () => {
    fetchData();
    console.log(info);
  };

  return html` ${isLoading
    ? html`<div className="text-center">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <br /><img
          className="rounded mx-auto d-block"
          src="imgs/loading.gif"
          alt="calculating"
          width="100"
          height="100"
        />`
    : html` <div className="text-center">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <br />
        <div className="text-white">
          ${click
            ? html`<p className="text-center">Click the button...</p>`
            : html`<${yourInfo} data=${info.data} />
            
               `}
        </div>`}`;
};
// Use ReactDOM to render the App component
ReactDOM.render(html`<${ipAPI} />`, document.getElementById("yourIP"));
// end of get your locaol (from you IP)

//dog picuture api
const doggy = () => {
  const [dogPicture, setPicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  //fecth data from API
  const fetchData = async () => {
    setIsLoading(true);
    let url = new URL("https://dog.ceo/api/breeds/image/random");
    let response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();
      //Set the data from API
      setPicture(json.message);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      console.log(dogPicture);
    } else {
      alert(`HTTP-Error: ${response.status}`);
    }
  };

  const handleFetchData = async () => {
    fetchData();
  };
  return html` ${isLoading
    ? html`<div className="text-center">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <br /><img
          className="rounded mx-auto d-block"
          src="imgs/loading.gif"
          alt="calculating"
          width="200"
          height="200"
        />`
    : html`
        <div className="text-center">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <br />
        <div className="text-white text-center mt-3">
          ${dogPicture
            ? html`<div>This is the dog you should have:</div>
                <img
                  src="${dogPicture}"
                  className="mt-2"
                  alt="a dog picuture"
                  width="200"
                /> `
            : html`Click the button...`}
        </div>
      `}`;
};
ReactDOM.render(html`<${doggy} />`, document.getElementById("dogPic"));

//end of doggy picture

// beer API
const beerAPI = () => {
  const [beer, setBeer] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [click, setClick] = useState(true);

  const beerInfo = (props) => {
    const {
      name: name,
      description: description,
      image_url: url,
      first_brewed: first,
    } = props.data;
    return html`
      <div className="container mt-0">
        <div className="row">
          <div className="col-lg-9 col-md-12">

          <p>Name: <i>${name}</i> --- First Brewed: ${first}</p>
   
            <p>${description}.</p>
          </div>
          <div className="col-lg-3 text-center">
            <img src="${url} " className="mt-2 " alt="a beer" height="100" />
          </div>
        </div>
      </div>
    `;
  };

  //fecth data from API

  const fetchData = async () => {
    setIsLoading(true);
    let url = new URL("https://api.punkapi.com/v2/beers");
    let response = await fetch(url);
    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let json = await response.json();

      //Set the data from API
      let random = Math.floor(Math.random() * 25);
      console.log(random);
      setBeer({ data: json[random] });
      setTimeout(() => {
        setIsLoading(false);
        setClick(false);
      }, 1000);
      console.log(beer);
    } else {
      alert(`HTTP-Error: ${response.status}`);
      setBeer({ data: json });
    }
  };

  const handleFetchData = async () => {
    fetchData();
  };
  return html` ${isLoading
    ? html`<div className="text-center mb-0">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        <img
          className="rounded mx-auto d-block"
          src="imgs/loading.gif"
          alt="calculating"
          width="100"
          height="100"
        />`
    : html` <div className="text-center mb-0">
          <button
            className="btn btn-outline-light my-1"
            onClick=${handleFetchData}
          >
            Fetch
          </button>
        </div>
        
        <div className="text-white">
          ${click
            ? html`<p className="text-center">Click the button...</p>`
            : html`<${beerInfo} data=${beer.data} />`}
        </div>`}`;
};
// Use ReactDOM to render the App component
ReactDOM.render(html`<${beerAPI} />`, document.getElementById("beer"));
// end of beer API
