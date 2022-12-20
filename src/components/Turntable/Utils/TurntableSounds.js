import { Howl, Howler } from "howler";

const mainSounds = {
  starting: null,
  spinning: null,
  ending: null,
  short: null,
};
const testSounds = {
  starting: null,
  spinning: null,
  ending: null,
};
const sounds = {};

Howler.volume(0.5);

export let isSpinningSoundRepeat = false; // repeat means the same sound will play again when passing each pie

export const startingSounds = [
  { name: "No Sound", value: "no-sound" },
  {
    name: "Button [Default]",
    value: "button-sound",
    file: "../../../../public/Assets/Button.mp3",
  },
];

export const spinningSounds = [
  { name: "No Sound", value: "no-sound" },
  {
    name: "Tick (Repeat) [Default]",
    value: "tick-sound",
    file: "../../../../public/Assets/Tick.mp3",
    repeat: true,
    volume: 0.5,
  }
];

export const endingSounds = [
  { name: "No Sound", value: "no-sound" },
  {
    name: "Celebration [Default]",
    value: "celebration-sound",
    file: "../../../../public/Assets/Tada.mp3",
  },
];

const shortAnnouncementSound = endingSounds[1];

export const preloadShortAnnouce = () => {
  try {
    preloadFile(shortAnnouncementSound.file, "short");
  } catch (error) {
    console.log(error);
  }
};

export const preloadSounds = (startingSound, spinningSound, endingSound) => {
  try {
    preloadFile(
      startingSounds.find((sound) => sound.value == startingSound).file,
      "starting"
    );

    const filteredSpinningSound = spinningSounds.find(
      (sound) => sound.value == spinningSound
    );
    preloadFile(
      filteredSpinningSound.file,
      "spinning",
      filteredSpinningSound.repeat ? true : false,
      filteredSpinningSound.volume ? filteredSpinningSound.volume : 1.0
    );

    preloadFile(
      endingSounds.find((sound) => sound.value == endingSound).file,
      "ending"
    );
  } catch (error) {
    console.log(error);
  }
};

const preloadFile = (file, where, repeat = false, volume = 1.0) => {
  if (file) {
    if (!sounds[file]) {
      import(`../../../../public/Assets/${file}`).then((importedFile) => {
        //have to give a static prefix "../../audio/" in order to works.
        sounds[file] = new Howl({
          src: [importedFile.default],
          volume: volume,
        });
        if (where) mainSounds[where] = sounds[file];
      });
    } else {
      // to check same sound file for hide choice and add count action, and input change during spinning, ensure music play continually not restarting.
      if (mainSounds[where] !== sounds[file]) {
        if (mainSounds[where].playing()) {
          mainSounds[where].stop(); // to make sure previous sound stop
        }
        mainSounds[where] = sounds[file];
        mainSounds[where].stop();
      } else {
        if (where === "spinning") {
          if (mainSounds[where].playing()) {
            mainSounds[where].stop();
          }
        }
      }

      // if (
      //   mainSounds[where] !== sounds[file] // to check same sound file for hide choice and add count action
      // ) {
      //   mainSounds[where] = sounds[file]
      //   mainSounds[where].stop()
      // }

      // if (!mainSounds[where].playing()) {
      //
      //   mainSounds[where].stop()
      // }
    }
    if (where === "spinning") {
      isSpinningSoundRepeat = repeat;
    }
  } else {
    mainSounds[where] = null;
  }
  // return null
};

export const playSound = (where, needLoop = false) => {
  if (mainSounds[where] !== null) {
    if (where === "spinning") {
      if (isSpinningSoundRepeat) {
        mainSounds[where].currentTime = 0; //to reset to zero for repeat sound
      }

      if (needLoop) {
        mainSounds[where].loop(true);
      }
    } else if (where === "short") {
      if (mainSounds["ending"] === null) {
        return; //to check ending sound if it is null, if yes the skip playing, for rng
      }
    }
    mainSounds[where].play();
  }
};

export const pauseSound = (where) => {
  //only used for no repeat spinning sound
  if (mainSounds[where] !== null) {
    const tempVolume = mainSounds[where].volume();
    mainSounds[where].fade(tempVolume, 0, 500);
    mainSounds[where].on("fade", () => {
      mainSounds[where].pause();
      mainSounds[where].volume([tempVolume]);
    });
  }
};

export const stopSound = (where) => {
  if (mainSounds[where] !== null) {
    mainSounds[where].stop();
  }
};

export const unmuteAllSounds = () => {
  const keys = Object.keys(mainSounds);
  keys.forEach((key) => {
    if (mainSounds[key] !== null) {
      mainSounds[key].mute(false);
    }
  });
};

// export const preloadTestSounds = (
//   startingSound,
//   spinningSound,
//   endingSound
// ) => {
//   try {
//     preloadTestFile(
//       startingSounds.find((sound) => sound.value == startingSound).file,
//       "starting"
//     );
//     const filteredSpinningSound = spinningSounds.find(
//       (sound) => sound.value == spinningSound
//     );
//     preloadTestFile(
//       filteredSpinningSound.file,
//       "spinning",
//       filteredSpinningSound.volume ? filteredSpinningSound.volume : 1.0
//     );
//     preloadTestFile(
//       endingSounds.find((sound) => sound.value == endingSound).file,
//       "ending"
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// const preloadTestFile = (file, where, volume = 1.0) => {
//   if (file) {
//     if (!sounds[file]) {
//       import(`../../audio/${file}`).then((importedFile) => {
//         //have to give a static prefix "../../audio/" in order to works.
//         sounds[file] = new Howl({
//           src: [importedFile.default],
//           volume: volume,
//         });
//         if (where) testSounds[where] = sounds[file];
//       });
//     } else {
//       testSounds[where] = sounds[file];
//     }
//   } else {
//     testSounds[where] = null;
//   }
//   // return null
// };

// export const playTestSound = (where, callback = () => {}) => {
//   if (testSounds[where] !== null) {
//     testSounds[where].stop();
//     if (testSounds[where].loop()) {
//       testSounds[where].loop(false);
//     }
//     testSounds[where].play();
//     testSounds[where].once("end", () => {
//       callback();
//     });
//   } else {
//     setTimeout(() => {
//       callback();
//     }, 50);
//   }
// };

// export const stopTestSound = (where) => {
//   if (testSounds[where] !== null) {
//     testSounds[where].stop();
//   }
// };
