// state
const state = {
  teamRuff: [],
  teamFluff: [],
}

// dom selectors
const main = document.querySelector(`main`)
const sectionOne = document.querySelector(`#ruff`)
const sectionTwo = document.querySelector(`#fluff`)

// call API & store each team in state
const getTeams = async () => {
  try{
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-FTB-ET-WEB-FT/teams`);
    const events = await response.json();

    state.teamRuff = events.data.teams[0]
    state.teamFluff = events.data.teams[1]
    renderTeams();
    } catch (err){
      console.log(err);
  }
}

// Render from state to HTML in UL
const renderTeams = () => {
  const secRuff = document.createElement(`section`)
  const ruffPlayerInfo = state.teamRuff.players.map((singlePuppy) => {
    return ` <article class="player"> 
            <img src="${singlePuppy.imageUrl}">
            Name: ${singlePuppy.name} <Br>
            Breed: ${singlePuppy.breed} <br>
            Position: ${singlePuppy.status}
            </article>
            `;
  });

  // at time of writing this code, team fluff has no puppies in it.
  const secFluff = document.createElement(`section`)
  const fluffPlayerInfo = state.teamFluff.players.map((singlePuppy) => {
    return ` <article class="player"> 
            <img src="${singlePuppy.imageUrl}">
            Name: ${singlePuppy.name} <Br>
            Breed: ${singlePuppy.breed} <br>
            Position: ${singlePuppy.status}
            </article>
            `;;
  });

  secRuff.innerHTML = ruffPlayerInfo
  secFluff.innerHTML = fluffPlayerInfo

  sectionOne.append(secRuff)
  sectionTwo.append(secFluff)
}

getTeams();

