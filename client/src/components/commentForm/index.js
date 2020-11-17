import {useState, useRef} from 'react'
import {useMutation} from '@apollo/client'
import {Form} from 'semantic-ui-react'

import {ADD_COMMENT} from '../../utils/graphql'

const CommentForm = ({postId}) => {
    const [input, setInput] = useState('')
    const inputRef = useRef(null)
    const [addComment] = useMutation(ADD_COMMENT, {
        variables: {
            postId,
            body: input
        },
        update(){
            setInput('')
            inputRef.current.blur()
        }
    })

    return (
         <Form className='comment-form'>
            <div className="ui action input fluid">
                <input
                type="text"
                placeholder="Leave a comment.."
                name="comment"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={inputRef}
                />
                <button
                type="submit"
                className="ui button teal"
                disabled={input.trim() === ''}
                onClick={addComment}
                >
                Submit
                </button>
            </div>
        </Form>
    )
            
}

export default CommentForm
