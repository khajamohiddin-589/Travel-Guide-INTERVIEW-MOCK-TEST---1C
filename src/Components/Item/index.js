import './index.css'

const Item = props => {
  const {each} = props
  const {id, imageUrl, description, name} = each
  return (
    <li className="list-item">
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
      <p className="para">{description}</p>
    </li>
  )
}

export default Item
