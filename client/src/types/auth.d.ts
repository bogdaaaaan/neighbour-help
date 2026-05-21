export interface User {
	email: string;
	fullName: string;
	avatar?: string;
}

export interface FieldErrors {
	avatar?: string;
	fullName?: string;
	email?: string;
	password?: string;
	repeatPassword?: string;
}