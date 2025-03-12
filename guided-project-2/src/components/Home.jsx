import { Link } from "react-router-dom"

export default function Home ({ characters }) {
    return(
        <>
        <ul>
        {
          characters?.map((char) => ( <li key={char._id}>
                <Link to = {`/${char.id}`} >
                    {char.name}
                </Link>
            </li>))
        }
        </ul>
        </>
    )
}