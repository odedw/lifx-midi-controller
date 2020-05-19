import { EventHandler } from "./EventHandler";
import { Device } from "./Device";
import { LifxLanColor } from "./types/Lifx";

let colors = ["#00F1FF", "#0161E8", "#290CFF", "#9B00E8", "#FF019A"];
let currentColor = colors[0];
let currentBrightness = 0.6;

const randomColor = () =>
  colors.filter((c) => c !== currentColor).sort(() => Math.random() - 0.5)[0];

const switchColor = async (device: Device): Promise<void> => {
  const currentColor = randomColor();
  await device.setColor({
    css: currentColor,
    brightness: currentBrightness,
  } as LifxLanColor);
};

export const init = async (device: Device) => {
  await switchColor(device);
  await device.turnOn();
};

export const generateHandlers = (device: Device) => {
  return [
    new EventHandler("noteon", async () => {
      currentBrightness = currentBrightness === 1 ? 0.6 : 1;
      await device.setColor(
        {
          css: currentColor,
          brightness: currentBrightness,
        } as LifxLanColor,
        100
      );
    }),
  ];
};
