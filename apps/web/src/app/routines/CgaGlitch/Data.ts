import Color from 'Color';
import { log } from '@odedw/shared';

export default class Data {
  colorScheme = ['#00AAAA', '#55FFFF', '#AA00AA', '#FF55FF', '#AAAAAA', '#FFFFFF'].map((hex) => new Color(hex));
  bassLevel: number = 0;

  getRandomColor(): Color {
    return this.colorScheme.sort(() => Math.random() - 0.5)[0];
  }
}
