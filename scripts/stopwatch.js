
let timer;
let startTime;
let elapsedTime = 0;
let running = true;
let lap = 1;
let lapTimes = [];

const watchTime = document.querySelector('.stop-watch-time');
const startButton = document.querySelector('.start-button');

const lapButton = document.querySelector('.lap-button');


function formatTime(milliseconds){
  const minutes = Math.floor(milliseconds/ 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const centiseconds = Math.floor((milliseconds % 1000) / 10);

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}.`;
}

function startStopWatch(){
  
  // My implementation
  if (running){
    startTime = Date.now() - elapsedTime;
    timer = setInterval(()=>{
      elapsedTime = Date.now() - startTime;
      watchTime.innerHTML = formatTime(elapsedTime);
    }, 10)
    startButton.classList.add('stop-button');
    lapButton.classList.add('lap-button-on');
    startButton.innerHTML = 'Stop';
    running = false;
  } else {
    clearInterval(timer);
    startButton.innerHTML = 'Start';
    lapButton.innerHTML = 'Reset';
    startButton.classList.remove('stop-button');
    lapButton.classList.remove('lap-button-on');
    lapButton.classList.add('reset-button');
    running = true;
    return watchTime.innerHTML;
  }
}

function lapResetButton(){
  let lapTimeHTML = '';
  if (lapButton.innerHTML === 'Reset'){
    watchTime.innerHTML = formatTime(0);
    lapTimeHTML = '';
    document.querySelector('.lap-times')
      .innerHTML = '';
    elapsedTime = 0;
    lapTimes = [];
    lapButton.innerHTML = 'Lap';
    lap = 0;
  } else if (lapButton.innerHTML === 'Lap'){
    lapTimes.push({
      lap: `Lap ${lap}`,
      time: formatTime(elapsedTime)
    })

    lapTimes.forEach((lapTimeObject, index) => {
      const { lap, time} = lapTimeObject;
      
      const html = `<div>${lap}</div>
                    <div class = "js-lap-time">${time} </div>`;
      lapTimeHTML += html;
    })
    document.querySelector('.lap-times')
      .innerHTML = lapTimeHTML;
  }
  lap++;
}
  document.querySelector('.start-button').addEventListener('click', () => {
    startStopWatch();
  });

  document.querySelector('.lap-button')
  .addEventListener('click', () => {
    lapResetButton();
  });