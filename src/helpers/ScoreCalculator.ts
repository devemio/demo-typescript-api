import Score from "../models/Score";

export default class ScoreCalculator {
    public static getTotal(scores: Score[]): number {
        let total: number = 0;
        for (let i = 0; i < scores.length; i++) {
            let score: Score = scores[i];
            let nextScore: Score = scores[i + 1];
            let state: FrameMark = this.getFrameMark(score);

            if (state == FrameMark.Open) {
                total += this.getSum(score);
            } else if (state == FrameMark.Strike) {
                total += 10 + (nextScore ? this.getSum(nextScore) : 0)
            } else if (state == FrameMark.Spare) {
                total += 10 + (nextScore ? nextScore.first : (i + 1 == scores.length ? score.third : 0))
            }
        }
        return total;
    }

    public static getFrameMark(score: Score): FrameMark {
        if (score.first == 10) {
            return FrameMark.Strike;
        } else if (score.first + score.second == 10) {
            return FrameMark.Spare;
        }
        return FrameMark.Open;
    }

    public static getSum(score: Score): number {
        return score.first + score.second + (score.third || 0);
    }
}

enum FrameMark {
    Open,
    Spare,
    Strike
}