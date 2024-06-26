//Test browser support
/*can't directly access the flashlight without asking for camera permission because most browser APIs for accessing media devices, including the flashlight,
 require permission to access both the camera and microphone. This is a security measure implemented by browsers to protect user privacy.*/
const SUPPORTS_MEDIA_DEVICES = 'mediaDevices' in navigator;

if (SUPPORTS_MEDIA_DEVICES) {
  //Get the environment camera (usually the second one)
  navigator.mediaDevices.enumerateDevices().then(devices => {
  
    // const cameras = devices.filter((device) => device.kind === 'videoinput');

    // if (cameras.length === 0) {
    //   throw 'No camera found on this device.';
    // }
    // const camera = cameras[cameras.length - 1];

    // Create stream and get video track
    navigator.mediaDevices.getUserMedia({
      // video: {
      //   deviceId: camera.deviceId,
      //   facingMode: ['user', 'environment'],
      //   height: {ideal: 1080},
      //   width: {ideal: 1920}
      // }
      video:false,
      audio:false,
      advanced:[{torch:true}]
    }).then(stream => {
      const track = stream.getVideoTracks()[0];

      //Create image capture object and get camera capabilities
      // const imageCapture = new ImageCapture(track)
      // const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {

        //todo: check if camera has a torch

        //let there be light!
        const btn = document.querySelector('.switch');
        btn.addEventListener('click', function(){
          track.applyConstraints({
            advanced: [{torch: true}]
          });
  
        });
        const btnoff = document.querySelector('.offswitch');
        btnoff.addEventListener('click', function(){
          track.applyConstraints({
            advanced: [{torch: false}]
          });
  
        });
      });
    });
  };
  
  //The light will be on as long the track exists
