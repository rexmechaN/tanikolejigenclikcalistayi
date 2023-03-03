import {useMainContext} from "../../contexts/MainContext";

const CommitteeSelection = ({ values }) => {

    const {setKomite, disabled} = values

    const { komiteler } = useMainContext()

    return (
        <select disabled={disabled} onChange={(e) => setKomite(e.target.value)} className="committee-selection">
            <option value="Seçilmedi">Seçilmedi</option>
            {komiteler.map(komite => (
                <option key={komite} value={komite}>
                    {komite}
                </option>
            ))}
        </select>
    )
}

export default CommitteeSelection;
