// Function to move the element randomly
function moveRandomEl(elm) {
  // Set the position as absolute to move freely
  elm.style.position = "absolute";

  // Random positions between 5% and 95% of the screen width and height
  elm.style.top = Math.floor(Math.random() * 90 + 5) + "%";
  elm.style.left = Math.floor(Math.random() * 90 + 5) + "%";
}

// Select the element that will move randomly
const moveRandom = document.querySelector("#move-random");

// Move the element when the mouse enters (hover effect)
moveRandom.addEventListener("mouseenter", function (e) {
  moveRandomEl(e.target);
});

// Optional: Move the element when clicked
moveRandom.addEventListener("click", function (e) {
  moveRandomEl(e.target);
});

// Select the form and names list elements
const nameForm = document.getElementById('nameForm');
const namesList = document.getElementById('namesList');

// Load names from local storage and display them
function loadNames() {
  const names = JSON.parse(localStorage.getItem('names')) || [];
  namesList.innerHTML = ''; // Clear the list
  names.forEach(name => {
    const li = document.createElement('li');
    li.textContent = name;
    namesList.appendChild(li);
  });
}

// Handle form submission
nameForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  // Save the name to local storage
  const names = JSON.parse(localStorage.getItem('names')) || [];
  names.push(name);
  localStorage.setItem('names', JSON.stringify(names));

  // Update the names list
  loadNames();

  // Create a FormData object to send the data to Formspree
  const formData = new FormData();
  formData.append('name', name);
  formData.append('email', email);

  // Send the form data to Formspree
  fetch(nameForm.action, {
    method: 'POST',
    body: formData,
  })
  .then(response => {
    if (response.ok) {
      alert('Your name has been submitted successfully!');
      nameForm.reset(); // Reset the form after submission
    } else {
      alert('There was a problem with your submission.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was a problem with your submission.');
  });
});

// Load names on initial page load
loadNames();

    const form = document.getElementById('myForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        // Create an object with the form values
        const formData = {
            name: form.name.value,
            _replyto: form._replyto.value,
            _subject: "New submission from Neocities"
        };

        try {
            const response = await fetch('https://formspree.io/f/xqakkzly', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                responseMessage.textContent = 'Thank you for your submission! We will be in touch soon.';
                responseMessage.style.color = 'green';
                responseMessage.style.display = 'block';
                form.reset(); // Reset form fields
            } else {
                responseMessage.textContent = 'Oops! There was a problem with your submission. Please try again.';
                responseMessage.style.color = 'red';
                responseMessage.style.display = 'block';
            }
        } catch (error) {
            responseMessage.textContent = 'There was an error submitting the form. Please try again.';
            responseMessage.style.color = 'red';
            responseMessage.style.display = 'block';
            console.error('Form submission error:', error);
        }
    });
    document.getElementById('responseForm').addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the form from refreshing the page

      // Capture the selected response
      const formData = new FormData(event.target);
      const response = formData.get('response');

      // Example: Show a confirmation with the response
      if (response === 'yes') {
        alert("Yay! You said YES! 😍");
      } else {
        alert("Oh no! You said NO! 😢");
      }

      // Here you can send the response to a backend server or save it locally
      console.log("User response: ", response);
    });