import { Score } from "../models/Score";

export default class ScoreHelper {
    public static getTotal(scores: Score[]): number {
        if (!scores.length) {
            return 0;
        }

        return scores.map((score) => score.first + score.second + score.third).reduce((a, v) => a + v);
    }
}