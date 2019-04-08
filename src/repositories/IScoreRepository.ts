import { Score } from "../models/Score";

export default interface IScoreRepository {
    all(): Promise<Score[]>;

    delete(): Promise<void>;

    save(score: Score): Promise<void>;
}
