// Placeholder for Supabase database types
// These will be generated automatically when the database schema is available
export interface Database {
	// This will be populated with actual table types when we run:
	// npx supabase gen types typescript --local > src/lib/database.types.ts
	public: {
		Tables: Record<string, unknown>;
		Views: Record<string, unknown>;
		Functions: Record<string, unknown>;
		Enums: Record<string, unknown>;
	};
}
