import { Nullable } from '../..';
import { DataTypes } from './data-types';
export default class Field {
    private name;
    private type;
    private size;
    private allowNull;
    constructor(name: string, type: DataTypes, allowNull?: boolean, size?: Nullable<number>);
    /** Returns field's name */
    get getName(): string;
    /** check if value is in the acceptable limits
     *
     * @param value
     */
    checkIfValueIsAcceptable(value: any | null): boolean;
}
