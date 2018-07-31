
export function generateExport(name: string): string {
    return `\nexport * from "./${name}";\n`;
}
