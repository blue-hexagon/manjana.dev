import { tlsGlossary } from "./glossary_kfs/tls";
import { unicodeGlossary } from "./glossary_kfs/unicode";
import {ospfGlossary} from "./glossary_kfs/ospf";
import {lldpGlossary} from "./glossary_kfs/lldp";

/**
 * Prefixes all keys in a glossary object.
 */
function prefixKeys(prefix, glossary) {
    return Object.fromEntries(
        Object.entries(glossary).map(([key, value]) => [
            `${prefix}_${key}`,
            value,
        ])
    );
}

export const glossary = {
    ...prefixKeys("TLS", tlsGlossary),
    ...prefixKeys("UNICODE", unicodeGlossary),
    ...prefixKeys("OSPF", ospfGlossary),
    ...prefixKeys("LLDP", lldpGlossary),
};

export default glossary;