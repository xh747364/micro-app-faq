export declare class PortScanner {
    host: string;
    constructor(host?: string);
    scan(port: number): Promise<{
        status: string;
    }>;
    findAPortNotInUse(range: [number, number]): Promise<number>;
}
