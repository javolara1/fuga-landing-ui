// Client-side Strapi API (used in browser for form submissions)
import { PUBLIC_STRAPI_URL } from '$env/static/public';
import type { Prospect, ProspectSubmitResult, ProspectErrorCode } from './types';

const errorMessages: Record<ProspectErrorCode, string> = {
	duplicate_email: 'Este correo electrónico ya está registrado.',
	missing_fields: 'Por favor, completa todos los campos requeridos.',
	server_error: 'Ha ocurrido un error. Por favor, intenta de nuevo.'
};

/**
 * Submit prospect data to Strapi (client-side)
 */
export async function submitProspect(data: Prospect): Promise<ProspectSubmitResult> {
	const strapiUrl = PUBLIC_STRAPI_URL || 'http://localhost:1337';

	try {
		const response = await fetch(`${strapiUrl}/api/prospects`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data })
		});

		if (response.ok) {
			return { success: true };
		}

		// Parse error response from Strapi
		const errorData = await response.json();
		const errorMessage = errorData?.error?.message?.toLowerCase() || '';

		// Check for duplicate email error
		if (errorMessage.includes('unique') || errorMessage.includes('already')) {
			return { success: false, errorCode: 'duplicate_email' };
		}

		// Check for missing required fields
		if (errorMessage.includes('required') || response.status === 400) {
			return { success: false, errorCode: 'missing_fields' };
		}

		return { success: false, errorCode: 'server_error' };
	} catch (error) {
		console.error('[Strapi] Error submitting prospect:', error);
		return { success: false, errorCode: 'server_error' };
	}
}

/**
 * Get error message for a given error code
 */
export function getErrorMessage(errorCode: ProspectErrorCode): string {
	return errorMessages[errorCode];
}
