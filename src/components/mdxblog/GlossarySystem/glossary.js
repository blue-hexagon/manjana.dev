export const glossary = {
  SAN: {
    label: "SAN",
    define: "Subject Alternative Name — lists all hostnames and IPs a certificate is valid for.",
    explain:
      "Modern TLS clients validate hostnames against SAN entries, not the Common Name field.",
    example:
      "DNS:example.com, DNS:www.example.com, IP:10.0.0.5",
    category: "x509",
  },

  CSR: {
    label: "CSR",
    define: "Certificate Signing Request — signed request containing public key + subject identity.",
    explain:
      "Generated locally and sent to a Certificate Authority to request issuance.",
    example:
      "openssl req -new -key server.key -out server.csr",
    category: "x509",
  },
};

