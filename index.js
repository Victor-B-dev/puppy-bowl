// state
const state = {
  allPuppies: [],
  selectedPuppy: {},
  teamRuff: [],
  teamFluff: [],
}

// dom selectors
const main = document.querySelector(`main`)
const sectionOne = document.querySelector(`.one`)
const sectionTwo = document.querySelector(`.two`)
const h1 = document.querySelector(`h1`)
const form = document.querySelector(`form`)

// dom select for nav bar
const allPuppiesNav = document.querySelector(`#allPuppiesButton`)
const teamsNav = document.querySelector(`#teamsButton`)
const addPuppyNav = document.querySelector(`#addPuppy`)

// dom selector for form
const dogName = document.querySelector(`#dogName`)
const breed = document.querySelector(`#breed`)
const position = document.querySelector(`#status`)
const imageButton = document.querySelector(`#myImage`)
const submitButton = document.querySelector(`#formSubmit`)


// call API for all puppies & store in state
const getPuppies = async () => {
  try{
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-FTB-ET-WEB-FT/players`);
    const events = await response.json();

    state.allPuppies = events.data.players;
    renderPuppies();
    } catch (err){
      console.log(err);
  }
}

// single puppy full info
const getSinglePuppy = async(puppyID) => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-FTB-ET-WEB-FT/players/${puppyID}`);
    const singlePuppy = await response.json();
    state.selectedPuppy = singlePuppy.data.player;

    renderSinglePuppy();
  } catch(err) {
    console.log(err);
  }
}

// getting teams info
const getTeams = async () => {
  try{
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-FTB-ET-WEB-FT/teams`);
    const events = await response.json();

    state.teamRuff = events.data.teams[0]
    state.teamFluff = events.data.teams[1]
    } catch (err){
      console.log(err);
  }
}


// buttons for navigation/rendering
allPuppiesNav.addEventListener('click', () => {
  renderPuppies();
})
teamsNav.addEventListener('click', ()=> {
  renderTeams();
})
addPuppyNav.addEventListener('click', () => {
  renderForm();
})


// Render all puppies from state to HTML via loop, each puppy is an article
// each puppy element is selectable for more info
const renderPuppies = () => {
  const puppyInfo = state.allPuppies.map((singlePuppy) => {
    return ` <article class="player"> 
            <img src="${singlePuppy.imageUrl}">
            <article class="player-id"> ${singlePuppy.id} </article> <br>
            <p> Click the # for more info about this puppy </p>
            </article>
            `;
  });

  h1.innerText = `Meet the Competitors`;
  sectionOne.innerHTML = (puppyInfo.join(``));
  sectionTwo.innerHTML = ``;
  main.replaceChildren(sectionOne)

// clicking on a puppy 
// will need to update the state.selectedPuppy with info
// use that to clear out the main.html and display all of selected puppys info
// need to create/add a button that will renderPuppies again. 

  const id = document.querySelectorAll(`.player-id`)

  id.forEach((puppyID) => {
    puppyID.addEventListener(`click`, (event) => {
      const player_id = event.target.innerText;
      getSinglePuppy(player_id);
    })
  });
}

// turns the section into displaying singular puppy
const renderSinglePuppy = () => {
  const html = `<section>
    <article class="player">

      <img src="${state.selectedPuppy.imageUrl}">
      <h2> Name: ${state.selectedPuppy.name} </h2>

      <p> Breed: ${state.selectedPuppy.breed} <Br>
      Team: ${state.selectedPuppy.teamId} <Br>
      Cohort: ${state.selectedPuppy.cohortId} <br>
      Status: ${state.selectedPuppy.status}
      </p>
      <button id="backButton"> Back </button>
      </article>
    </section>
  `;

  h1.innerText = `This Goodest Dog`;
  main.innerHTML = html;

  const backButton = document.querySelector(`#backButton`);
  backButton.addEventListener(`click`, ()=>{
    renderPuppies();
  })
}

// display each team in two sections, one team per section
const renderTeams = () => {
  const ruffPlayerInfo = state.teamRuff.players.map((singlePuppy) => {
    return ` <article class="player"> 
            <img src="${singlePuppy.imageUrl}">
            Name: ${singlePuppy.name} <Br>
            Breed: ${singlePuppy.breed} <br>
            Position: ${singlePuppy.status}
            </article>
            `;
  });

  // at time of writing this code, team fluff has no puppies in it. so it doesn't render anything
  const fluffPlayerInfo = state.teamFluff.players.map((singlePuppy) => {
    return ` <article class="player"> 
            <img src="${singlePuppy.imageUrl}">
            Name: ${singlePuppy.name} <Br>
            Breed: ${singlePuppy.breed} <br>
            Position: ${singlePuppy.status}
            </article>
            `;
  });

  h1.innerText = `Meet the Teams`;
  sectionOne.innerHTML = ruffPlayerInfo;
  sectionTwo.innerHTML = fluffPlayerInfo;
}

const renderForm = () => {
  sectionOne.innerHTML = ` 
  <form>
    <label name="dogName"> Dog Name:</label>
    <input type="text" id="dogName" name="dogName"> <br>

    <label name="breed"> Breed: </label>
    <input type="text" id="breed" name="breed"> <br>

    <label for="Status">Choose a status:</label>
      <select id="status" name="status">
      <option value="bench">Bench</option>
      <option value="field">Field</option>
    </select> <br>

    <input type="file" id="myImage" name="filename"> <br>
      
    <input type="submit" id="formSubmit" value="submit">
  </form>
`;
  sectionTwo.innerHTML = ``;
}


// post to API
// would need to add eventlistener to submit buttons
// don't want to accidentally submit something so intentionally not leave it, want to discuss in morning office hours
// need to make sure targeting the correct submit buttons
const submitForm = async() => {
  try {
    const response = await fetch(
      'https://fsa-puppy-bowl.herokuapp.com/api//players',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        // here is taking the info from the html page to submit.
        body: JSON.stringify({
          name: dogName.value,
          breed: breed.value,
          status: position.value,
          cohortId: 438,
          teamId: 777,
        }),
      }
    );
  const result = await response.json();
  console.log(result);
} catch (err) {
  console.error(err);
}
}

getPuppies();
getTeams();