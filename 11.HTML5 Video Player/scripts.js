//find elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const range = player.querySelectorAll('.player__slider')

//build function
function togglePlay() {
  // if (video.paused) {
  //   video.play()
  // } else {
  //   video.pause()
  // }
  const method = video.paused ? 'play' : 'pause'
  video[method]() //==video.play() or video.pause()
}

function buttonUpdate() {
  const icon = this.paused ? 'start' : 'pause'
  toggle.textContent = icon
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
  console.log(parseFloat(this.dataset.skip))
}

function rangeUpdate() {
  video[this.name] = this.value
  console.log(this.value, this.name)
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}
function jump(e) {
  console.log(progress.offsetWidth)
  const jumpTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = jumpTime
}
// hook up event
video.addEventListener('play', buttonUpdate)
video.addEventListener('pause', buttonUpdate)
video.addEventListener('click', togglePlay)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
range.forEach(range => range.addEventListener('change', rangeUpdate))
progress.addEventListener('click', jump)
let mousedown = false
// progress.addEventListener('mousemove', e => {
//   if (mousedown) {
//     jump(e)
//   } else {
//     return
//   }
// })
progress.addEventListener('mousemove', e => mousedown && jump(e)) //mousedown为真则执行jump(e) 反之返回false
progress.addEventListener('mousedown', () => (mousedown = true))
progress.addEventListener('mouseup', () => (mousedown = false))
