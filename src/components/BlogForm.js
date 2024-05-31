import { useState } from 'react'
import { useBlogsContext } from '../hooks/useBlogsContext'

const BlogForm = () => {
    // All updated info gets stored here in the states
    const { dispatch } = useBlogsContext()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const blog = {title, author, content}

        const response = await fetch('/api/blogs', {
            method: 'POST', 
            body: JSON.stringify(blog),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setContent('')
            setError(null)
            setEmptyFields([])
            console.log('new blog added', json)
            dispatch({type: 'CREATE_BLOG', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Blog</h3>
            <label>Blog Title:</label> 
            <input 
                type="text" 
                onChange = {(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Author Name:</label> 
            <input 
                type="text" 
                onChange = {(e) => setAuthor(e.target.value)}
                value={author}
                className={emptyFields.includes('author') ? 'error' : ''}
            />
            
            <label>Blog Content:</label> 
            <input 
                type="text" 
                onChange = {(e) => setContent(e.target.value)}
                value={content}
                className={emptyFields.includes('content') ? 'error' : ''}
            />

            <button>Post Your Blog</button> 
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default BlogForm