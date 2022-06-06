import '../Button/Button.css'

const Button = ({ text, func }) =>  {
    return (
        <div className='button' onClick={() => func()}>
            {text}
        </div>
    )
}

export default Button