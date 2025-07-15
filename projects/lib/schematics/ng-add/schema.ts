export interface Schema {
  project?: string;
  skipPackageJson?: boolean;
  theme?: 'default' | 'dark';
  includeTailwind?: boolean;
}
