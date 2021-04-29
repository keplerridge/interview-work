let pumpingImg = document.getElementById('pumping');
let stagnantImg = document.getElementById('stagnant');
let displayTemp = document.getElementById('temp');
let pump = true;
let tankTemp = 114;
let tankMass = 50;
let gpm = 13.2;
let stagInterval = null;
let increaseInterval = null;

// 13.2 gpm grundfos 1" pump
// Temperature equation for incoming water
// T(final) = (m1 * T1 + m2 * T2) / (m1 + m2)
// T1 will be tankTemp

const increasing = () => {
  let m2 = gpm / 10;
  let m1 = tankMass - m2;
  let t2 = tankTemp + 2;

  tankTemp = (m1 * tankTemp + m2 * t2) / (m1 + m2);
  console.log(tankTemp)
};

const pumping = (tankTemp) => {
    increasing();
    if (tankTemp >= 120) {
        pump = false;
        pumpingImg.classList.remove('active');
        pumpingImg.classList.add('inactive');
        stagnantImg.classList.add('active');
        stagnantImg.classList.remove('inactive');
    }
};

// Quick google search said a well insulated water heater loses about 1/2 degree to 1 degree of temperature per hour
// I am using that to calculate the heat loss at 1 degree per hour 1 / 60 / 10

const decreasing = () => {
    tankTemp = tankTemp - 1 / 60 / 10;
    console.log(tankTemp)
};

const stagnant = (tankTemp) => {
    decreasing();
    if (tankTemp <= 115) {
        pump = true;
        stagnantImg.classList.remove('active');
        stagnantImg.classList.add('inactive');
        pumpingImg.classList.remove('inactive');
        pumpingImg.classList.add('active');
  }
};

setInterval(() => {
    if (pump) {
        pumping(tankTemp);
    } else if (!pump) {
        stagnant(tankTemp);
    }
    displayTemp.innerHTML = tankTemp.toFixed(2) + ' &#176' + 'F';
}, 6000);