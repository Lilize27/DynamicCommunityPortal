console.log("appFrontEnd.js loaded");
const APIKey = '7ea8e93a82795eb3f01171225bef07c1';

function toggleLoginPopup(show = null) {
    const popup = document.getElementById("loginPopup");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const messageEl = document.getElementById("loginMessage");
  
    if (show === true) {
      popup.style.display = "block";
    } else if (show === false) {
      popup.style.display = "none";
      usernameInput.value = "";
      passwordInput.value = "";
      messageEl.textContent = "";
    } else {
      popup.style.display = popup.style.display === "block" ? "none" : "block";
      if (popup.style.display === "none") {
        usernameInput.value = "";
        passwordInput.value = "";
        messageEl.textContent = "";
      }
    }
  }

  function updateLoginButton(username) {
    const loginBtn = document.getElementById("loginToggleBtn");
    loginBtn.textContent = `Signed in as ${username}`;
    loginBtn.onclick = showLogoutOption;
}

function showLogoutOption() {
    if (confirm("Do you want to sign out?")) {
        localStorage.removeItem('user');
        const loginBtn = document.getElementById("loginToggleBtn");
        loginBtn.textContent = "Login / Sign Up";
        loginBtn.onclick = () => toggleLoginPopup(true);

        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("loginMessage").textContent = "";
    }
}
  
  function showLoginMessage(message, success = false) {
    const msgElem = document.getElementById("loginMessage");
    msgElem.textContent = message;
    msgElem.style.color = success ? "green" : "red";
  }
  
  async function loginUser() {
    console.log("Login button clicked");
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
    const messageEl = document.getElementById("loginMessage");
  
    if (data.success) {
      localStorage.setItem('user', username);
      messageEl.textContent = "Logged in!";
      toggleLoginPopup(); 
      updateLoginButton(username);
      toggleEventForm();
    } else {
      messageEl.textContent =  data.message;
    }
  }
  
  async function signupUser() {
    console.log("Signup button clicked");
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    const res = await fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
  
    const data = await res.json();
    const messageEl = document.getElementById("loginMessage");
  
    if (data.success) {
      messageEl.textContent =  data.message;
      localStorage.setItem('user', username);
      toggleLoginPopup(); 
      updateLoginButton(username);
      toggleEventForm();
    } else {
      messageEl.textContent =  data.message;
    }
  }

  function requireLogin() {
    const user = localStorage.getItem('user');
    if (!user) {
      alert("Please log in or sign up.");
      return null;
    }
    return user;
  }

  function getLoggedInUser() {
    return localStorage.getItem('user');
  }

//   async function loadForumMessages() {
//     const res = await fetch('/api/forum');
//     const data = await res.json();
  
//     const forum = document.getElementById('forum-list');
//     forum.innerHTML = '';
//     data.forEach(msg => {
//         const div = document.createElement('div');
//         div.className = 'forum-msg';
//         div.innerHTML = `<strong>${msg.username}</strong> <em>(${msg.time})</em>: ${msg.message}`;
//         forum.appendChild(div);
//       });
//   }
  
  
// //   async function submitForumMessage() {
// //     const username = localStorage.getItem('user');
// //     const message = document.getElementById('forum-input').value.trim();
  
// //     if (!username) {
// //       alert('Please log in or sign up to post a message.');
// //       return;
// //     }
  
// //     if (!message) return;
  
// //     const res = await fetch('/api/forum', {
// //       method: 'POST',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ username, message })
// //     });
  
// //     document.getElementById('forum-input').value = '';
// //     loadForumMessages();
// //   }
  
  
//   document.getElementById('forum-form').addEventListener('submit', async (e) => {
//     e.preventDefault(); 

//     const forumMessage = document.getElementById('forum-message').value.trim();
//     const username = localStorage.getItem('user'); 

//     if (!forumMessage) {
//         alert("Message cannot be empty!");
//         return;
//     }

//     if (!username) {
//         alert("Please log in or sign up to post a message.");
//         return;
//     }

   
//     const res = await fetch('/api/forum', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, message: forumMessage })
//     });

//     const data = await res.json();

//     if (data.success) {
//         alert("Message posted successfully!");
//         document.getElementById('forum-message').value = '';
//         loadForumMessages();
//     } else {
//         alert("Error posting message: " + data.error);
//     }
// });
  
  function toggleEvent(card) {
    if (!card) return; // <- avoids crashing
  
    const title = card.querySelector('.event-title');
    const desc = card.querySelector('.event-description');
    const time = card.querySelector('.event-time');
  
    if (!title || !desc || !time) {
      console.warn("Missing DOM elements in event card", card);
      return;
    }
  
    const isOpen = card.classList.contains('expanded');
  
    // Collapse others
    document.querySelectorAll('.event-card').forEach(c => {
      c.classList.remove('expanded');
      const t = c.querySelector('.event-title');
      const d = c.querySelector('.event-description');
      const tm = c.querySelector('.event-time');
      if (t) t.style.transform = 'translateY(0)';
      if (d) d.style.display = 'none';
      if (tm) tm.style.display = 'none';
    });
  
    // Expand current
    card.classList.add('expanded');
    title.style.transform = 'translateY(-5px)';
    desc.style.display = 'block';
    time.style.display = 'block';
  }
  


//   ---------------WEATHER------------------



const weatherInfoSection = document.querySelector('.weather-info');
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const currentDateTxt = document.querySelector('.current-date-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-image');
const forecastItem = document.querySelector('.forecast-item-container');

function getWeatherIcon(id) {
    if (id <= 232) return 'thunderstorm.svg';
    if (id <= 321) return 'drizzle.svg';
    if (id <= 531) return 'rain.svg';
    if (id <= 622) return 'snow.svg';
    if (id <= 781) return 'atmosphere.svg';
    if (id === 800) return 'clear.svg';
    return 'clouds.svg';
}

async function getFetchData(endPoint, city) {
    const APIURL = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${APIKey}&units=metric`;
    const response = await fetch(APIURL);
    return response.json();
}

function getCurrentDate() {
    const currDate = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    return currDate.toLocaleDateString('en-GB', options);
}

function showWeatherSection() {
    weatherInfoSection.style.display = 'flex';
}

function updateForecastItems(weatherData) {
    const { dt_txt: date, weather: [{ id }], main: { temp } } = weatherData;
    const dateObj = new Date(date);
    const options = { day: '2-digit', month: 'short' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);

    const itemHTML = `
        <div class="forecast-item">
            <h5 class="forecast-item-date regular-txt">${formattedDate}</h5>
            <img src="/images/weather/${getWeatherIcon(id)}" alt="" class="forecast-item-img">
            <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
        </div>`;
    forecastItem.insertAdjacentHTML('beforeend', itemHTML);
}

async function updateForecastInfo(city) {
    const forecastData = await getFetchData('forecast', city);
    const targetTime = '12:00:00';
    const today = new Date().toISOString().split('T')[0];

    forecastItem.innerHTML = '';
    forecastData.list.forEach(forecast => {
        if (forecast.dt_txt.includes(targetTime) && !forecast.dt_txt.includes(today)) {
            updateForecastItems(forecast);
        }
    });
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);

    if (weatherData.cod !== 200) return;

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + '°C';
    conditionTxt.textContent = main;
    humidityTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + 'M/s';
    currentDateTxt.textContent = getCurrentDate();
    weatherSummaryImg.src = `/images/weather/${getWeatherIcon(id)}`;

    await updateForecastInfo(city);
    showWeatherSection();
}




//   --------------------EVENTS--------------------------

// Check login
function isUserSignedIn() {
    return localStorage.getItem("user") !== null;
  }
  
  function loadEvents() {
    const user = requireLogin();  
      if (!user) return;
      
    fetch('/api/events')
      .then(res => res.json())
      .then(events => {
        const container = document.querySelector('.events-container');
        container.innerHTML = '';
  
        events.forEach(event => {
          const card = document.createElement('div');
          card.classList.add('event-card');
          card.onclick = () => toggleEvent(card);
  
          card.innerHTML = `
            <div class="event-image" style="background-image: url('${event.image}');"></div>
            <div class="event-content">
              <h3 class="event-title">${event.title}</h3>
              <p class="event-creator">By ${event.addedBy}</p>
              <p class="event-time">${event.time || 'No time set'}</p>
              <p class="event-description">${event.description}</p>
            </div>
          `;
  
          container.appendChild(card);
        });
  
        
        const formWrapper = document.createElement('div');
        formWrapper.className = 'event-card add-event-wrapper';
        
        
        const toggleFormBtn = document.createElement('button');
        toggleFormBtn.textContent = '+ Add New Event';
        toggleFormBtn.className = 'toggle-form-btn';
        toggleFormBtn.onclick = () => {
          form.style.display = form.style.display === 'none' ? 'block' : 'none';
        };
        
        
        const form = document.createElement('section');
        form.id = 'add-event-form';
        form.style.display = 'none';
        form.innerHTML = `
          <h3>Add a New Event</h3>
          <input type="text" id="event-title" placeholder="Event Title" required>
          <input type="text" id="event-description" placeholder="Description" required>
          <input type="text" id="event-time" placeholder="Event Date and Time" required>
          <input type="text" id="event-image" placeholder="Image URL" required>
          <button onclick="addNewEvent()">Add Event</button>
        `;
        
       
        formWrapper.appendChild(toggleFormBtn);
        formWrapper.appendChild(form);
        container.appendChild(formWrapper);

      })
      .catch(err => console.error('Failed to load events:', err));
  }
  
  function addNewEvent() {
    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;
    const time = document.getElementById('event-time').value;
    const image = document.getElementById('event-image').value;
    const addedBy = localStorage.getItem('user') || 'Anonymous';
    
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, description, time, image, addedBy })
    })
      .then(res => res.json())
      .then(() => {
        loadEvents(); // Refresh the event list
        document.getElementById('event-title').value = '';
        document.getElementById('event-description').value = '';
        document.getElementById('event-time').value='';
        document.getElementById('event-image').value = '';
      });
  }
  
  function toggleEventForm() {
   
    const user = localStorage.getItem("user");
   

    const form = document.getElementById("add-event-form");
    if (!form) return; 

    form.style.display = (form.style.display === "block") ? "none" : "block";
  }

  function loadSimpleEvents(limit = 3) {
    fetch('/api/events')
    .then(res => res.json())
    .then(events => {
      const list = document.querySelector('.simple-event-list');
      if (!list) return;

      list.innerHTML = ''; 

      events.forEach(event => {
        const li = document.createElement('li');
        li.classList.add('simple-event-item');
        let html = "<strong>" + event.title + "</strong>";

        if (event.time) {
            html += '<span class="simple-event-time"> – ' + event.time + '</span>';
        }

        if (event.description) {
            html += '<p class="simple-event-desc">' + event.description + '</p>';
        }

    li.innerHTML = html;
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Failed to load events:', err));
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const eventList = document.querySelector('.simple-event-list');
    if (eventList) {
      loadSimpleEvents();
    }
//     const weatherEl = document.getElementById('weather-temp'); // Or the correct ID/class
//   if (weatherEl) {
//     updateWeatherInfo();
//   }
  });

  


  window.onload = function () {
    const user = localStorage.getItem('user');
    const loginBtn = document.getElementById("loginToggleBtn");
  
    if (loginBtn) {
      if (user) {
        updateLoginButton(user);
      } else {
        loginBtn.textContent = "Login / Sign Up";
        loginBtn.onclick = () => toggleLoginPopup(true);
      }
    }
  
    updateWeatherInfo("Pretoria");
  
    if (document.querySelector(".events-container")) {
      loadEvents();
    }
  
    // if (document.getElementById("add-event-form")) {
    //   toggleEventForm();
    // }
  
    
    
  };
