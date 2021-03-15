export class Difficulty {

  public static HARD = new Difficulty(50, 'Hard');
  public static MEDIUM = new Difficulty(100, 'Medium');
  public static EASY = new Difficulty(null, 'Easy');

  private static ALL_DIFFICULTIES = [Difficulty.HARD, Difficulty.MEDIUM, Difficulty.EASY];

  attemptsAllowed: number;
  name: string;

  public static getDifficultyByAttempts(attempts: number): Difficulty {
    const diff = Difficulty.ALL_DIFFICULTIES.find(e => e.attemptsAllowed === attempts);
    return diff || new Difficulty(attempts, 'Custom');
  }

  constructor(attemptsAllowed: number, name: string) {
    this.attemptsAllowed = attemptsAllowed;
    this.name = name;
  }
}
