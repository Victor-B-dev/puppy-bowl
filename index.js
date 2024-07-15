// state
const state = {
  allPuppies: [],
  selectedPuppy: {},
}

// dom selectors
const main = document.querySelector(`main`)

// call API & store in state
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

// Render from state to HTML in UL
// each puppy element is selectable for more info
const renderPuppies = () => {
  const ul = document.createElement(`ul`)
  const puppyInfo = state.allPuppies.map((singlePuppy) => {
    return `<li> ${singlePuppy.id} </li>
            <p> Click the # for more info about this puppy </p>
            <img src="${singlePuppy.imageUrl}">`;
  });

  ul.innerHTML = (puppyInfo.join(``));
  main.replaceChildren(ul)

// clicking on a puppy (li element)
// will need to update the state.selectedPuppy with info
// use that to clear out the main.html and display all of selected puppys info
// need to create/add a button that will renderPuppies again. 

  const li = document.querySelectorAll(`li`)

  li.forEach((puppyLI) => {
    puppyLI.addEventListener(`click`, (event) => {
      const id = event.target.innerText;
      getSinglePuppy(id);
    })
  });
}

const renderSinglePuppy = () => {
  const html = `
  <h2> Name: ${state.selectedPuppy.name} </h2>

  <p> Breed: ${state.selectedPuppy.breed} <Br>
      Team: ${state.selectedPuppy.teamId} <Br>
      Cohort: ${state.selectedPuppy.cohortID} <br>
      Status: ${state.selectedPuppy.status}
  </p>

  <img src="${state.selectedPuppy.imageUrl}"> <br>
  
    <button> Back to the Other Puppies </button>
  `;

  main.innerHTML = html;

  const backButton = document.querySelector(`button`);
  backButton.addEventListener(`click`, ()=>{
    renderPuppies();
  })
}

getPuppies();