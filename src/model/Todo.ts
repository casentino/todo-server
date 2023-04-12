import User from './User';

type Todo = {
	id: string;
	title: string;
	content: string;
	checked: boolean;
	createdBy: User['_id'];
};
export default Todo;
