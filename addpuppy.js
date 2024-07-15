// dom selector to take information from html page 
const dogName = document.querySelector(`#dogName`)
const breed = document.querySelector(`#breed`)
const position = document.querySelector(`#status`)
const imageButton = document.querySelector(`#myImage`)
const submitButton = document.querySelector(`#formSubmit`)

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

// pull from API to see if it worked