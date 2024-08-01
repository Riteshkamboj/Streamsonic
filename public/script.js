const userVideo = document.getElementById('user-video')
const startButton = document.getElementById('start-btn')
const state = { media: null}
const socket = io()

startButton.addEventListener('click', () =>{
    const mediarecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
    })

    mediarecorder.ondataavailable = ev => {
        console.log('Binary stream', ev.data)
        socket.emit('binarystream', ev.data)
    }
    mediarecorder.start(25)
})

window.addEventListener('load', async e => {
    const media = await navigator.mediaDevices.getUserMedia({ audio: true, video: true})
    state.media = media
    userVideo.srcObject = media
})