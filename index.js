// state

const state = {
  allPuppies: [],
}

// dom selectors
const ul = document.querySelector(`ul`)

// call API & store in state
const getPuppies = async () => {
  try{
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2406-FTB-ET-WEB-FT/players`);
    const events = await response.json();

    state.allPuppies = events.data.players;
    console.log(state.allPuppies)
    renderPuppies();
    } catch (err){
      console.log(err);
  }
}


// Render from state to HTML in UL
const renderPuppies = () => {
  const puppyInfo = state.allPuppies.map((singlePuppy) => {
    return `<li> Name:${singlePuppy.name} <br>
            Breed: ${singlePuppy.breed} <br>
            <img src="${singlePuppy.imageUrl}"> </li>`;
  });

  ul.innerHTML = (puppyInfo.join(``));
}

getPuppies();