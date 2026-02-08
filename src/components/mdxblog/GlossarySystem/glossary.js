export const glossary = {
    // =========================
    // Tooling
    // =========================
    OpenSSL: {
        term: "OpenSSL",
        definition:
            "Cryptographic toolkit providing SSL/TLS implementations and cryptographic primitives.",
        explanation:
            "Used both as a linked library and via a command-line interface by most TLS-enabled software.",
        appearsIn: ["CLI", "Linked libraries"],
        whyItMatters:
            "Forms the cryptographic backbone of most certificate, key, and TLS operations.",
        kind: "tooling",
        domain: ["tls", "crypto"],
        tags: ["library"],
    },

    openssl: {
        term: "openssl",
        definition:
            "Command-line interface for the OpenSSL cryptographic toolkit.",
        explanation:
            "Used to generate keys, CSRs, certificates, and inspect or debug TLS material.",
        examples: [
            "openssl version",
            "openssl x509 -in cert.pem -text -noout",
        ],
        appearsIn: ["Terminal"],
        whyItMatters:
            "Primary operator interface for managing certificates and keys.",
        kind: "tooling",
        domain: ["tls"],
        tags: ["cli"],
    },

    // =========================
    // Standards & Encodings
    // =========================
    "X.509": {
        term: "X.509",
        definition:
            "Standard defining the structure and semantics of digital certificates.",
        explanation:
            "Specifies certificate fields, extensions, and validation rules used in TLS.",
        appearsIn: ["Certificates"],
        whyItMatters:
            "Defines how identities, public keys, and trust chains are represented.",
        kind: "standard",
        domain: ["tls", "pki"],
        tags: ["certificates"],
        rfcs: [
            {
                id: "RFC5280",
                title: "Internet X.509 Public Key Infrastructure Certificate and CRL Profile",
                relevance: "Primary specification for X.509 certificates used in TLS.",
            },
        ],
    },

    PEM: {
        term: "PEM",
        fullName: "Privacy Enhanced Mail",
        definition:
            "Text-based encoding wrapper for cryptographic objects.",
        explanation:
            "Encodes binary data using Base64 with BEGIN/END markers.",
        examples: [
            "-----BEGIN CERTIFICATE-----",
            "-----BEGIN PRIVATE KEY-----",
        ],
        appearsIn: [".pem", ".crt", ".key"],
        whyItMatters:
            "Most common format for certificates and keys in Unix-like systems.",
        kind: "encoding",
        domain: ["crypto"],
        tags: ["base64"],
    },

    DER: {
        term: "DER",
        fullName: "Distinguished Encoding Rules",
        definition:
            "Binary encoding format for ASN.1 data structures.",
        explanation:
            "Represents the same data as PEM, but without Base64 wrapping.",
        appearsIn: [".der", ".cer"],
        whyItMatters:
            "Required by systems that expect compact binary input.",
        kind: "encoding",
        domain: ["crypto"],
        tags: ["binary"],
    },

    // =========================
    // Certificate lifecycle
    // =========================
    CSR: {
        term: "CSR",
        fullName: "Certificate Signing Request",
        definition:
            "A signed request containing a public key and subject identity.",
        explanation:
            "Generated locally and submitted to a Certificate Authority.",
        examples: [
            "openssl req -new -key server.key -out server.csr",
        ],
        appearsIn: [".csr"],
        whyItMatters:
            "Proves possession of the private key and requests identity binding.",
        kind: "artifact",
        domain: ["pki"],
        tags: ["certificates"],
    },

    CA: {
        term: "CA",
        fullName: "Certificate Authority",
        definition:
            "Trusted entity that signs and issues certificates.",
        explanation:
            "Forms the root or intermediate trust anchor in PKI systems.",
        appearsIn: ["Root certificates", "Intermediate certificates"],
        whyItMatters:
            "Without a trusted CA, certificates cannot be validated.",
        kind: "role",
        domain: ["pki"],
        tags: ["trust"],
    },

    PFX: {
        term: "PFX / P12",
        fullName: "PKCS#12 container",
        definition:
            "Encrypted container bundling private key, certificate, and chain.",
        explanation:
            "Commonly used by Windows systems and browsers.",
        appearsIn: [".pfx", ".p12"],
        whyItMatters:
            "Allows portable and secure distribution of key material.",
        kind: "container",
        domain: ["pki"],
        tags: ["certificates"],
    },

    // =========================
    // Identity structures
    // =========================
    DN: {
        term: "DN",
        fullName: "Distinguished Name",
        definition:
            "Structured identity block describing the certificate subject.",
        explanation:
            "Contains human-readable identity fields such as CN, O, and C.",
        examples: [
            "CN=mqtt.lab.local,O=AgriTech,C=DK",
        ],
        appearsIn: ["X.509 Subject"],
        whyItMatters:
            "Describes the entity associated with a certificate.",
        kind: "identity-structure",
        domain: ["x509"],
        tags: ["subject"],
    },

    CN: {
        term: "CN",
        fullName: "Common Name",
        definition:
            "Human-readable name within a Distinguished Name.",
        explanation:
            "Historically used for hostname validation.",
        example: "mqtt.lab.local",
        appearsIn: ["DN"],
        whyItMatters:
            "Ignored by modern TLS clients when SAN is present.",
        kind: "dn-field",
        domain: ["x509"],
        tags: ["legacy"],
    },

    O: {
        term: "O",
        fullName: "Organization",
        definition:
            "Organization name within a Distinguished Name.",
        example: "AgriTech",
        appearsIn: ["DN"],
        kind: "dn-field",
        domain: ["x509"],
    },

    OU: {
        term: "OU",
        fullName: "Organizational Unit",
        definition:
            "Department or team name within a Distinguished Name.",
        example: "IoT",
        appearsIn: ["DN"],
        kind: "dn-field",
        domain: ["x509"],
    },

    C: {
        term: "C",
        fullName: "Country",
        definition:
            "ISO country code within a Distinguished Name.",
        example: "DK",
        appearsIn: ["DN"],
        kind: "dn-field",
        domain: ["x509"],
    },

    ST: {
        term: "ST",
        fullName: "State or Province",
        definition:
            "Region or state within a Distinguished Name.",
        example: "Zealand",
        appearsIn: ["DN"],
        kind: "dn-field",
        domain: ["x509"],
    },

    L: {
        term: "L",
        fullName: "Locality",
        definition:
            "City or locality within a Distinguished Name.",
        example: "Ringsted",
        appearsIn: ["DN"],
        kind: "dn-field",
        domain: ["x509"],
    },

    // =========================
    // SAN extension (canonical)
    // =========================
    SAN: {
        term: "SAN",
        fullName: "Subject Alternative Name",
        definition:
            "X.509 extension listing all identities a certificate is valid for.",
        explanation:
            "Modern TLS clients validate identities using SAN, not CN.",
        examples: [
            "DNS:example.com",
            "IP:10.0.0.5",
        ],
        appearsIn: ["X509v3 Subject Alternative Name"],
        whyItMatters:
            "Incorrect SAN entries cause hostname validation failures.",
        kind: "identity-extension",
        domain: ["x509", "tls"],
        tags: ["validation"],
        rfcs: [
            {
                id: "RFC5280",
                section: "§4.2.1.6",
                relevance: "Defines the Subject Alternative Name extension structure.",
            },
        ],
    },

    // =========================
    // Canonical identity types
    // =========================
    DNS: {
        term: "DNS",
        fullName: "Domain Name System",
        definition:
            "Hierarchical naming system used to resolve hostnames to IP addresses.",
        kind: "protocol",
        domain: ["networking"],
    },

    IP: {
        term: "IP",
        fullName: "Internet Protocol",
        definition:
            "Numerical addressing scheme used to identify hosts on IP networks.",
        kind: "protocol",
        domain: ["networking"],
    },

    URI: {
        term: "URI",
        fullName: "Uniform Resource Identifier",
        definition:
            "Structured identifier for naming or locating resources.",
        kind: "identifier",
        domain: ["networking"],
    },

    // =========================
    // SAN-scoped variants
    // =========================
    DNS_SAN: {
        term: "DNS",
        fulleName: "Domain Name System",
        scope: "SAN",
        canonical: "DNS",
        definition:
            "Hostname identity entry within a SAN extension.",
        explanation:
            "Matches the hostname used by the client during TLS negotiation.",
        example: "DNS:example.com",
        whyItMatters:
            "Primary identity type for HTTPS and MQTT.",
        kind: "san-identity",
        domain: ["tls"],
          rfcs: [
    {
      id: "RFC6125",
      title: "Representation and Verification of Domain-Based Application Service Identity",
      relevance: "Defines how DNS names are matched during TLS verification.",
    },
  ],
    },

    IP_SAN: {
        term: "IP",
        scope: "SAN",
        canonical: "IP",
        definition:
            "IP address identity entry within a SAN extension.",
        explanation:
            "Used when connecting directly via IP instead of hostname.",
        example: "IP:10.0.0.5",
        kind: "san-identity",
        domain: ["tls"],
    },

    URI_SAN: {
        term: "URI",
        scope: "SAN",
        canonical: "URI",
        definition:
            "Structured service identity entry within a SAN extension.",
        explanation:
            "Used by service identity systems such as SPIFFE.",
        example: "URI:spiffe://example/service",
        kind: "san-identity",
        domain: ["tls"],
    },
};
