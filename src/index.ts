/**
 * @param input The string or other data that you want to search for.
 * @returns An array of all possible base64 encodings of `input`.
 */
export const base64Encodings = (input: string | Buffer): string[] => {
    // Inspired by: https://www.leeholmes.com/searching-for-content-in-base-64-strings/
    const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input);
    return [
        buffer.toString('base64'),
        Buffer.concat([Buffer.alloc(1), buffer])
            .toString('base64')
            .substring(2),
        Buffer.concat([Buffer.alloc(2), buffer])
            .toString('base64')
            .substring(4),
    ].map((e) => e.replace(/.==?$/, ''));
};

/**
 * @param input The string or other data that you want to search for.
 * @returns A regex that matches all possible base64 encodings of `input` in a single capture group.
 */
export const base64Regex = (input: string | Buffer): string => {
    const encodings = base64Encodings(input);
    return `(${encodings.sort().join('|')})`;
};
