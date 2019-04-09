import IFrame from "./IFrame";
import { inject, injectable } from "tsyringe";
import IScoreRepository from "../repositories/IScoreRepository";

@injectable()
export default class FrameValidator {
    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public async validate(frame: IFrame): Promise<FrameValidatorError[]> {
        let errors: FrameValidatorError[] = [];

        // First
        if (frame.first === null || frame.first === undefined) {
            errors.push({field: 'first', message: 'value should be not null'});
            return errors;
        }

        if (typeof frame.first !== 'number') {
            errors.push({field: 'first', message: 'value should be number'});
            return errors;
        }

        if (frame.first < 0 || frame.first > 10) {
            errors.push({field: 'first', message: 'value should be >= 0 or <= 10'});
            return errors;
        }

        // Second
        if (frame.second === null || frame.second === undefined) {
            errors.push({field: 'second', message: 'value should be not null'});
            return errors;
        }

        if (typeof frame.second !== 'number') {
            errors.push({field: 'second', message: 'value should be number'});
            return errors;
        }

        if (frame.second < 0 || frame.second > 10) {
            errors.push({field: 'second', message: 'value should be >= 0 or <= 10'});
            return errors;
        }

        const frameCount: number = (await this.scoreRepository.all()).length + 1;

        if (frameCount > 10) {
            errors.push({field: null, message: "total frames can't be more than 10"});
            return errors;
        }

        if (frameCount <= 10 && frame.third !== undefined) {
            errors.push({field: 'third', message: "value should be null until frame count < 10"});
            return errors;
        }

        // Third
        if (frame.third === null && frame.third === undefined) {
            if (typeof frame.third !== 'number') {
                errors.push({field: 'third', message: 'value should be number'});
                return errors;
            }

            if (frame.third < 0 || frame.third > 10) {
                errors.push({field: 'third', message: 'value should be >= 0 or <= 10'});
                return errors;
            }
        }

        // Total
        if ((frame.first + frame.second + (frame.third || 0)) > 10) {
            errors.push({field: null, message: "total can't be more than 10"});
            return errors;
        }

        return errors;
    }
}

export interface FrameValidatorError {
    field: string,
    message: string
}