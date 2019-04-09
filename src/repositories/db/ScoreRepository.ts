import IScoreRepository from "../IScoreRepository";
import Score from "../../models/Score";

export default class ScoreRepository implements IScoreRepository {
    public async all(): Promise<Score[]> {
        return Score.find();
    }

    public async delete(): Promise<void> {
        await Score.clear();
    }

    public async save(score: Score): Promise<void> {
        await score.save();
    }
}
