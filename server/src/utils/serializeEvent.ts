export const serializeEvent = (id: string, data: any): string => {
    const jsonString = JSON.stringify(data);
    return `id: ${id}\ndata: ${jsonString}\n\n`;
}
