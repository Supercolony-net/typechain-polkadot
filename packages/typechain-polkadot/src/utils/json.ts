/**
 * Minimizes JSON string by removing whitespaces and newlines.
 * @param json - JSON string
 */
export function minimizeJson(json: string): string {
	return JSON.stringify(JSON.parse(json));
}