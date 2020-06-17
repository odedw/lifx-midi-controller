import Color from 'Color';
import { log } from '@odedw/shared';

export class Data {
  bassLevel: number = 0;
  melodyLevel: number = 0;
  maxMelodyLevel: number = 110;
  colorScheme = ['#0161E8', '#290CFF', '#9B00E8', '#FF019A'].map((hex) => new Color(hex));
  currentColor = this.colorScheme[0];
  currentHH = 0;
  numberOfHH = 16;

  switchToRandomColor() {
    this.currentColor = this.colorScheme.filter((c) => c !== this.currentColor).sort(() => Math.random() - 0.5)[0];
  }

  bumpHH() {
    this.currentHH += 1;
    if (this.currentHH === this.numberOfHH) this.currentHH = 0;
  }
}

export default new Data();
