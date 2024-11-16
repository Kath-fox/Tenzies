export default function Die(props) {
    return (
        <div className={`die ${props.isHeld ? 'held' : ''}`}
            key={props.id}
            onClick={() => props.onClick(props.id)}
        >
            <p className="value">{props.value}</p>
        </div>
    )
}