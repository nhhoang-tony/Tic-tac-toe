document.addEventListener('DOMContentLoaded', function () {
  getVisit();
});

// get current visit numbers on site
async function getVisit() {
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append('Content-Type', 'application/json');
  // using built in JSON utility package turn object to string and store in a variable
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  // make API call with parameters and use promises to get response
  const data = await fetch(
    'https://lff8ghifme.execute-api.ap-southeast-2.amazonaws.com/prod',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result).body;
    })
    .catch((error) => console.log('error', error));

  var count;
  var domains = JSON.parse(data);
  for (let i = 0; i < domains.length; i++) {
    if (domains[i].domain == 'tictactoe.tonynguyen61.com') {
      count = domains[i].count;
    }
  }
  console.log(count + 1);

  incrementVisit(count + 1);
}

// update visit numbers
function incrementVisit(count) {
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append('Content-Type', 'application/json');
  // using built in JSON utility package turn object to string and store in a variable
  const raw = JSON.stringify({ count: count, domain: 'tictactoe.tonynguyen61.com' });
  // using built in JSON utility package turn object to string and store in a variable
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  // make API call with parameters and use promises to get response
  fetch(
    'https://sspb2z8a24.execute-api.ap-southeast-2.amazonaws.com/prod',
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log('error', error));
}
