/**
 * The comments through this file indicate the expected functionality
 * required to complete the exercise.
 */

/**
 * This is the base Animal class; all Rabbits will extend this class.
 */
class Animal {
  constructor(name) {
    this._speed = 0;
    this._name = name;
  }

  getSpeed() {
    return this._speed;
  }

  getName() {
    return this._name;
  }
}

/**
 * This is the Rabbit class; all new Rabbits that are created will call the
 * constructor of this class to instantiate a new rabbit object.
 */
class Rabbit extends Animal {
  constructor(name) {
    super(name);
  }

  hop(speed) {
    // Add a guard here to prevent negative numbers from interferring with speed and sending a rabbuit backwards
    // ...

    if (speed >= 0) {
      this._speed += speed;
    } else {
      throw new Error("Cannot supply rabbit with negative speed.");
    }
  }

  stop() {
    this._speed = 0;
  }

  getRacerId() {
    return this._name.toLowerCase().replace(/\s+/, "-");
  }
}

// Declare two global variables here:
// - an array to house all rabbit objects
let house = [];
// - one to assign the timer id from `setInterval` (see MDN docs)
let timerId;

function getRandomSpeed() {
  return Math.floor(Math.random() * 10 + 1);
  // Have this function return a random whole number between 1 and 10
}

function initRace() {
  // Enable the "stop" button (see the `disabled` button attribute in MDN docs)
  let stopButton = document.querySelector(".js-btn-stop-race");
  stopButton.disabled = false;
  let startButton = document.querySelector(".js-btn-start-race");
  startButton.disabled = true;

  // Create 4 new Rabbit obejcts with names 'Rabbit 1' through 'Rabbit 4' (this is crucial for things them to move across the screen).
  // Remember: the name is passed to each constructor!
  // Add all the rabbit objects you created above to the global array declared on line 50
  let rabbit1 = new Rabbit("Rabbit 1");
  let rabbit2 = new Rabbit("Rabbit 2");
  let rabbit3 = new Rabbit("Rabbit 3");
  let rabbit4 = new Rabbit("Rabbit 4");

  let house=[rabbit1, rabbit2, rabbit3, rabbit4];

  // Assign the timer id that is returned from the setInterval call aboveon line 51 with 500ms intervals to the global variable `timer`
  timerId = setInterval(() => {
    // Loop over all the rabbits
    for (let rabbit of house) {
      // Call the `.hop(getRandomSpeed())` function on each rabbit
      rabbit.hop(getRandomSpeed());
      speed = rabbit.getSpeed();
      console.log(speed);
      // NOTE: This is what moves the rabbit to the right from the start line.
      // We use the `calc` function in CSS to calculate the speed across the screen in `vw` units
      // and subtract 10rem units (half the width of our 20rem wide rabbit images) so we get the center of the rabbit image.
      // Uncomment this line below when you get this far, this is what moves the rabbit across the screen
      const calculatedValue = `calc(${speed <= 6 ? 6 : speed}vw - 10rem)`;
      // Get the rabbit image by it's class name using `.getRacerId()` and add a `left: ...;` style using the previous calculated value
      let r = ".js-" + rabbit.getRacerId();
      console.log(r);
      document.querySelector(r).style.left = calculatedValue;
      console.log(calculatedValue);
    }
    // Determine the winner here by filtering the rabbits array and returning the ones with a speed greater than or equal to 98
    // If the filtered winners array length is greater than 1
    let winner = house.filter((rabbit) => rabbit.getSpeed() > 98);
    console.log(winner);
    if (winner.length > 0) {
      // Alert the name of the rabbit that won the race
      // Disable the stop button
      // Call the `stopRace()` function
      alert(winner[0].getName());

      stopButton.disabled = true;
      startButton.disabled = false;
      stopRace();
    }
  }, 500);
}

function stopRace() {
  // Loop over all the rabbit objects and call the `.stop()` function on each rabbit object
  for (let rabbit of house) {
    rabbit.stop();
  }
  //enable the start button after clicking stop
  let startButton = document.querySelector(".js-btn-start-race");
  startButton.disabled = false;
  // Clear the `timer` interval here. HINT: see `clearInterval` function MDN docs
  clearInterval(timerId);
}

/**
 * domReady is a 3rd-party library that is loaded in the HTML file and used here.
 * It exposes a utility function that we call which takes a callback as the
 * first and only argument to it, which we use to call our own code to initialize the page.
 */
domready(() => {
  document.querySelector(".js-btn-start-race").addEventListener("click", () => {
    alert("Starting the race!");
    initRace();
  });

  document.querySelector(".js-btn-stop-race").addEventListener("click", () => {
    stopRace();
    alert("Stopping the race!");
  });
});
