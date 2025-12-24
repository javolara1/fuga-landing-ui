/**
 * Format a date string to a human-readable format in Spanish
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "15 de enero de 2024")
 */
export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString('es-MX', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};
