import express from "express";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import IScoreRepository from "../repositories/IScoreRepository";
import { Score } from "../models/Score";
import { validate, ValidationError } from "class-validator";
import { IFrame } from "../contracts/IFrame";

@injectable()
export default class ScoreController {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public async index(req: express.Request, res: express.Response): Promise<express.Response> {
        let scores: Score[] = await this.scoreRepository.all();
        let total: number = scores.map(score => score.first + score.second + score.third).reduce((a, v) => a + v);
        let frames: IFrame[] = scores.map(score => {
            let frame: IFrame = {
                first: score.first,
                second: score.second
            };
            if (score.third !== null) {
                frame.third = score.third;
            }
            return frame;
        });
        return res.json({"frames": frames, "total": total});
    }

    public async store(req: express.Request, res: express.Response): Promise<express.Response> {
        const score = new Score();
        score.first = req.body.first;
        score.second = req.body.second;
        score.third = req.body.third;

        const errors: ValidationError[] = await validate(score);
        if (errors.length > 0) {
            return res.status(422).json(errors);
        }

        await this.scoreRepository.save(score);
        return res.json(score);
    }
}
