import User from './User';

type Todo = {
	id: number;
	title: string;
	content: string;
	checked: boolean;
	createdBy: User['_id'];
};
export default Todo;
