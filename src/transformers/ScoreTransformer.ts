import IFrame from "../contracts/IFrame";
import Score from "../models/Score";

export default class ScoreTransformer {
    public static toFrame(score: Score): IFrame {
        const frame: IFrame = {
            first: score.first,
            second: score.second
        };
        if (score.third !== null) {
            frame.third = score.third;
        }
        return frame;
    }

    public static toScore(frame: IFrame): Score {
        const score = new Score();
        score.first = frame.first;
        score.second = frame.second;
        score.third = frame.third;
        return score;
    }
}
