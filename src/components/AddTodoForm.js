import React, {useState} from 'react'

const AddTodoForm = ({addTodo}) => {
	const [description, setDescription] = useState('')

	const handleSubmit = (evt) => {
		evt.preventDefault()
		if (description.trim() === '') return;
		addTodo(description)
		setDescription('')
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				autoFocus
				type="text"
				placeholder="Add something todo..."
				value={description}
				onChange={evt => setDescription(evt.target.value)}
			/>
			<button className="button accent-button" type="submit">ADD</button>
		</form>
	)
}

export default AddTodoForm;