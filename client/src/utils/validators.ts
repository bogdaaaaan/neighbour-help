const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_RE = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const TITLE_MIN = 5;
export const TITLE_MAX = 80;

const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 400;

export const validators = {
	email(email_string: string): string | undefined {
		return !EMAIL_RE.test(email_string.trim()) ? 'Enter a valid email address.' : undefined;
	},

	password(password_string: string): string | undefined {
		return !PASSWORD_RE.test(password_string) ? 'Password must be at least 8 characters and include a letter and a number.' : undefined;
	},

	full_name(name_string: string): string | undefined {
		return !NAME_RE.test(name_string.trim()) ? 'Enter a valid full name (letters, spaces, hyphens, 2–50 chars).' : undefined;
	},

	repeat_password(password: string, repeat: string): string | undefined {
		return password !== repeat ? 'Passwords do not match.' : undefined;
	},

	avatar(file: File | undefined): string | undefined {
		if (!file) {return 'No file uploaded';}
		if (!file.type.startsWith('image/')) {return 'Please upload an image file.';}
		if (file.size > 5 * 1024 * 1024) {return 'Image must be under 5 MB.';}

		return undefined;
	},

	passwordStrength(password: string): number {
		if (!password) {return 0;}
		let score = 0;

		if (password.length >= 8) {score++;}
		if (/[A-Z]/.test(password)) {score++;}
		if (/\d/.test(password)) {score++;}
		if (/[^A-Za-z0-9]/.test(password)) {score++;}
		return score;
	},

	title(title_string: string): string | undefined {
		if (title_string.trim().length < 5) {return `Title must be at least ${TITLE_MIN} characters.`;}
		if (title_string.trim().length > 80) {return `Title must be less than ${TITLE_MAX} characters.`;}
		return undefined;
	},

	category(category_string: string): string | undefined {
		return !category_string ? 'Please select a category.' : undefined;
	},

	description(description_string: string): string | undefined {
		if (description_string.trim().length < 20) {return `Description must be at least ${DESCRIPTION_MIN} characters.`;}
		if (description_string.trim().length > 80) {return `Description must be less than ${DESCRIPTION_MAX} characters.`;}
		return undefined;
	}
};