import React from 'react'

const AddTodoForm = () => {

	return (
		<form>
			<input type="text" placeholder="Add something todo..." />
			<button className="button accent-button" type="submit">ADD</button>
		</form>
	)
}

export default AddTodoForm;