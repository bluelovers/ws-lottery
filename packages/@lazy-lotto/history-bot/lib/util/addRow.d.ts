import { IRecordRow } from '@lazy-lotto/types/index';
export declare function addRow<R extends IRecordRow<any[]>>(id: string | number, data: Record<string, R>, row: Partial<R>): {
    id: string;
    date?: string;
    result: any[];
} & Partial<R>;
export declare function getRow<T extends Record<string, IRecordRow<any[]>>>(id: string | number, data: T): IRecordRow<any[]>;
