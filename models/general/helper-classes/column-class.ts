export abstract class ColumnClass{
    // tslint:disable-next-line: variable-name
    protected _columns: string[] = []

    constructor(columns?: string[]) {
        this._columns = columns ? columns! : []
    }

    set columns(value: string[]) {
        if (value !== this._columns) { this._columns = value }
    }

    public addToColumns(value: string) {
        if (value.length !== 0 && this._columns.indexOf(value) === -1) {
            this._columns.push(value)
        }
    }

    public removeFromColumns(value: string) {
        if (value.length !== 0) {
            const index = this._columns.indexOf(value)
            if (index !== -1) {
                this._columns.splice(index, 1)
            }
        }
    }

    abstract get toString(): string | null 
}