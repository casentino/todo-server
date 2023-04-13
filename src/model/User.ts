type User = {
	_id?: string;
	email: string;
	name: string;
	password?: string;
};
export type SignUpRequest = {
	email: string;
	name: string;
	password: string;
};
export default User;
