import { EventHandler } from "./EventHandler";
import { Device } from "./Device";
import { LifxLanColor } from "./types/Lifx";
import EventHandlerFactory from "./EventHandlerFactory";

let colors = ["#00F1FF", "#0161E8", "#290CFF", "#9B00E8", "#FF019A"];
let currentColor = colors[0];

const randomColor = () =>
  colors.filter((c) => c !== currentColor).sort(() => Math.random() - 0.5)[0];

// const switchColor = async (device: Device): Promise<void> => {
//   currentColor = randomColor();
//   await device.setColor(currentColor, 0.6);
// };

export const init = async (device: Device) => {
  currentColor = randomColor();

  await device.setColor(currentColor, 0.6);
  await device.turnOn();
};

export const generateHandlers = (device: Device) => {
  return [
    EventHandlerFactory.noteOn("C3")
      .do((device) => device.setColor(currentColor, 0.6))
      .create(device),
    EventHandlerFactory.noteOn("D3")
      .do((device) => device.setColor(currentColor, 1))
      .create(device),
    EventHandlerFactory.noteOn("E3")
      .do((device) => {
        currentColor = randomColor();
        return device.setColor(currentColor, 0.6);
      })
      .create(device),
    EventHandlerFactory.noteOn("F3")
      .do((device) => device.turnOfF())
      .create(device),
  ];
};
