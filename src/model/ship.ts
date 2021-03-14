export class Ship {
  totalTiles: number;
  sunkTiles: number;

  constructor(totalTiles: number) {
    this.totalTiles = totalTiles;
    this.sunkTiles = 0;
  }

  isSunk(): boolean {
    return this.sunkTiles === this.totalTiles;
  }

  gettingShot() {
    if (this.sunkTiles < this.totalTiles) {
      this.sunkTiles += 1;
    }
  }
}
