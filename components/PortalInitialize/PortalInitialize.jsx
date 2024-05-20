import CodeDisplay from '../CodeDisplay/CodeDisplay';
import styles from './PortalInitialize.module.css';
import data from '../../data/data';

export default function PortalInitialize({portal}) {

    const sampleCode = data[portal.name].initialize.code
    const sampleLanguage = data[portal.name].initialize.language

    return (
        <>
            <CodeDisplay code={sampleCode} language={sampleLanguage} />
        </>
    )
}