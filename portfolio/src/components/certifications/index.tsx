import "./styles.css";

import { certifications } from "../../data/certifications.ts";

const Certification = () => {
    return (
        <div className="certifications-container">
            <h1 id="certifications">Certificações</h1>
            <div className="certifications-grid">
                {certifications.slice().reverse().map((cert, i) => (
                    <a key={i} href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-card">
                        <img src={cert.img} alt={cert.nome} />
                        <h3>{cert.nome}</h3>
                        <span className="issuer">Emitido por {cert.issuer}</span>
                        <p>{cert.data}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Certification;
