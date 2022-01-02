import React from 'react'

const TodoContext = React.createContext({todos: [], dispatch: () => {}})				// Set initial values for better auto-complete

export default TodoContext;