WebMidi.enable((err) => {
  if (err) reject(err);
  // list inputs
  WebMidi.inputs.forEach((i) => console.log(i.name));

  const midiInput = WebMidi.inputs.find((i) => i.name === "loopMIDI Port");
  midiInput.addListener("noteon", "all", (e) => {
    // eventHandlers
    //   .filter((element) => element.filter(e))
    //   .forEach((element) => {
    //     element.handle(e);
    //   });
    console.log(`${e.channel} ${e.note.name}${e.note.octave}`);
  });
});
