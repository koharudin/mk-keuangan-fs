import { useParams } from "react-router-dom";

const KategoriShow = () => {
    const { id } = useParams();

    return (
        <>
            <h4>Detail Kategori #{id}</h4>

            <ul>
                <li>ID: {id}</li>
                <li>Nama: Elektronik</li>
            </ul>
        </>
    );
};

export default KategoriShow;
