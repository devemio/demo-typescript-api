import IFrame from "./IFrame";
import { inject, injectable } from "tsyringe";
import IScoreRepository from "../repositories/IScoreRepository";

@injectable()
export default class FrameValidator {
    protected maxFrameCount: number = 10;
    protected maxPins: number = 10;

    constructor(@inject("IScoreRepository") protected scoreRepository: IScoreRepository) {
    }

    public async validate(frame: IFrame): Promise<FrameValidatorError[]> {
        let errors: FrameValidatorError[] = [];

        const frameCount: number = await this.getCurrentFrameCount();

        // Total frame count
        if (frameCount > this.maxFrameCount) {
            errors.push({field: null, message: `total frames can't be more than ${this.maxFrameCount}`});
            return errors;
        }

        // First
        errors = this.validateRange(frame.first, 'first');
        if (errors.length > 0) {
            return errors;
        }

        // Second
        errors = this.validateRange(frame.second, 'second');
        if (errors.length > 0) {
            return errors;
        }

        if (frameCount < this.maxFrameCount) { // Frames 1..9
            // Third
            if (frame.third !== null && frame.third !== undefined) {
                errors.push({field: 'third', message: `value should be null until frames < ${this.maxFrameCount}`});
                return errors;
            }

            // Total
            if ((frame.first + frame.second + (frame.third || 0)) > this.maxPins) {
                errors.push({field: null, message: `total pins can't be more than ${this.maxPins}`});
                return errors;
            }
        } else { // Frames 10
            // Third
            if (frame.third !== null && frame.third !== undefined) {
                errors = this.validateRange(frame.third, 'third');
                if (errors.length > 0) {
                    return errors;
                }
            }
        }

        return errors;
    }

    protected validateRange(value: number, field: string): FrameValidatorError[] {
        let errors: FrameValidatorError[] = [];

        if (value === null || value === undefined) {
            errors.push({field: field, message: 'value should be not null'});
            return errors;
        }

        if (typeof value !== 'number') {
            errors.push({field: field, message: 'value should be number'});
            return errors;
        }

        if (value < 0 || value > this.maxPins) {
            errors.push({field: field, message: `value should be >= 0 and <= ${this.maxPins}`});
            return errors;
        }

        return errors;
    }

    protected async getCurrentFrameCount(): Promise<number> {
        return (await this.scoreRepository.all()).length + 1;
    }
}

export interface FrameValidatorError {
    field: string,
    message: string
}