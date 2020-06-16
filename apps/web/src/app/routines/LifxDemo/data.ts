import Color from 'Color';

export class Data {
  bassLevel: number = 0;
  melodyLevel: number = 0;
  maxMelodyLevel: number = 40;
  colorScheme = ['#00F1FF', '#0161E8', '#290CFF', '#9B00E8', '#FF019A'].map((hex) => new Color(hex));
  currentColor = this.colorScheme[0];

  switchToRandomColor() {
    this.currentColor = this.colorScheme.filter((c) => c !== this.currentColor).sort(() => Math.random() - 0.5)[0];
  }
}

export default new Data();
