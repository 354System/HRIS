import { useFetchAllPresence } from "../api/fetchData/useFetchAllPresence"

const Tes = () => {
    const {data} = useFetchAllPresence()
    console.log(data);
    return(
        <div>kocak</div>
    )
}
export default Tes