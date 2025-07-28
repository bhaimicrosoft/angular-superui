interface ComponentConfig {
    name: string;
    description: string;
    dependencies: string[];
    files: string[];
    requiresHttpClient?: boolean;
}
export declare const COMPONENTS: Record<string, ComponentConfig>;
export declare function addCommand(componentNames: string | string[], options: {
    force?: boolean;
    all?: boolean;
}): Promise<void>;
export {};
//# sourceMappingURL=add.d.ts.map