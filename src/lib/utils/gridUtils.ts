// Tailwind requires full class names at build time, so we map to explicit classes
const smColsMap: Record<number, string> = {
	1: 'sm:grid-cols-1',
	2: 'sm:grid-cols-2'
};

const mdColsMap: Record<number, string> = {
	1: 'md:grid-cols-1',
	2: 'md:grid-cols-2',
	3: 'md:grid-cols-3',
	4: 'md:grid-cols-4'
};

const lgColsMap: Record<number, string> = {
	1: 'lg:grid-cols-1',
	2: 'lg:grid-cols-2',
	3: 'lg:grid-cols-3',
	4: 'lg:grid-cols-4',
	5: 'lg:grid-cols-5',
	6: 'lg:grid-cols-6',
	7: 'lg:grid-cols-7'
};

/**
 * Build responsive grid classes based on item count.
 * Caps columns at actual item count for each breakpoint:
 * - default: 1 col
 * - sm: max 2 cols
 * - md: max 4 cols
 * - lg: max 7 cols
 */
export function getGridClass(itemCount: number): string {
	const smCols = Math.min(itemCount, 2);
	const mdCols = Math.min(itemCount, 4);
	const lgCols = Math.min(itemCount, 7);

	return `grid-cols-1 ${smColsMap[smCols]} ${mdColsMap[mdCols]} ${lgColsMap[lgCols]}`;
}
