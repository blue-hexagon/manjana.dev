export const lldpGlossary = {

    // =========================
    // Core Protocol
    // =========================

    LLDP: {
        term: "LLDP",
        fullName: "Link Layer Discovery Protocol",
        definition:
            "Vendor-neutral Layer 2 protocol (IEEE 802.1AB) used to advertise device identity and capabilities to directly connected neighbors.",
        explanation:
            "Devices periodically send structured TLV-based advertisements. Neighbors are discovered by observing incoming LLDP frames, not through negotiation.",
        appearsIn: ["Layer 2", "Control Plane"],
        whyItMatters:
            "Provides ground truth for physical topology and is essential for troubleshooting, mapping, and endpoint discovery.",
        kind: "protocol",
        domain: ["lldp", "layer2", "networking"],
        rfcs: [
            {
                id: "IEEE 802.1AB",
                title: "LLDP Standard",
                relevance: "Defines LLDP protocol behavior and TLV structure."
            }
        ]
    },

    LLDPDU: {
        term: "LLDPDU",
        fullName: "LLDP Data Unit",
        definition:
            "Complete LLDP payload consisting of a sequence of TLVs carried inside an Ethernet frame.",
        explanation:
            "The LLDPDU is the actual data structure transmitted between devices, composed entirely of TLVs including mandatory and optional fields.",
        appearsIn: ["LLDP Frame"],
        whyItMatters:
            "Understanding LLDPDU structure is required for parsing, debugging, and interpreting LLDP traffic.",
        kind: "data-structure",
        domain: ["lldp"]
    },

    Neighbor: {
        term: "Neighbor",
        definition:
            "The last device that sent an LLDP frame on a given interface.",
        explanation:
            "Represents an observed relationship based on received advertisements, not a negotiated or stateful session.",
        whyItMatters:
            "LLDP neighbors define physical adjacency and are the foundation for topology discovery.",
        kind: "relationship",
        domain: ["lldp"]
    },

    Advertisement: {
        term: "advertisement",
        definition:
            "Unidirectional LLDP frame containing structured metadata about a device.",
        explanation:
            "Devices continuously broadcast their identity and capabilities; discovery occurs as a side effect of receiving these advertisements.",
        whyItMatters:
            "Clarifies that LLDP is not a discovery protocol in itself, but an advertisement mechanism.",
        kind: "behavior",
        domain: ["lldp"]
    },

    // =========================
    // TLV Model
    // =========================

    TLV: {
        term: "TLV",
        fullName: "Type-Length-Value",
        definition:
            "Encoding format used to represent all LLDP information.",
        explanation:
            "Each TLV contains a type identifier, a length field, and a variable-length value, allowing flexible and extensible protocol design.",
        appearsIn: ["LLDPDU"],
        whyItMatters:
            "TLVs are the entire protocol — understanding them is equivalent to understanding LLDP.",
        kind: "data-structure",
        domain: ["lldp", "encoding"]
    },

    ChassisID: {
        term: "Chassis ID",
        definition:
            "TLV identifying the sending device.",
        explanation:
            "Typically contains MAC address, hostname, or a locally defined identifier.",
        appearsIn: ["TLV"],
        whyItMatters:
            "Determines which device you are physically connected to.",
        kind: "tlv",
        domain: ["lldp"]
    },

    PortID: {
        term: "Port ID",
        definition:
            "TLV identifying the sending interface.",
        explanation:
            "Usually contains interface name or port identifier such as Gi1/0/24.",
        appearsIn: ["TLV"],
        whyItMatters:
            "Allows precise mapping of physical connections between devices.",
        kind: "tlv",
        domain: ["lldp"]
    },

    TTL: {
        term: "TTL",
        fullName: "Time To Live",
        definition:
            "Lifetime in seconds of an LLDP advertisement in the neighbor table.",
        explanation:
            "Entries are removed when TTL expires unless refreshed by new LLDP frames.",
        appearsIn: ["LLDPDU"],
        whyItMatters:
            "Controls neighbor stability and determines when entries are aged out.",
        kind: "field",
        domain: ["lldp"]
    },

    SystemName: {
        term: "System Name",
        definition:
            "TLV containing the hostname of the device.",
        kind: "tlv",
        domain: ["lldp"]
    },

    SystemDescription: {
        term: "System Description",
        definition:
            "TLV describing operating system, platform, or software version.",
        whyItMatters:
            "Useful for fingerprinting devices and identifying software versions during troubleshooting.",
        kind: "tlv",
        domain: ["lldp"]
    },

    SystemCapabilities: {
        term: "System Capabilities",
        definition:
            "TLV describing device roles such as bridge, router, or access point.",
        whyItMatters:
            "Helps determine what type of device is connected.",
        kind: "tlv",
        domain: ["lldp"]
    },

    ManagementAddress: {
        term: "Management Address",
        definition:
            "TLV containing reachable management IP address(es).",
        whyItMatters:
            "Allows direct access (SSH/API) to the discovered device.",
        kind: "tlv",
        domain: ["lldp"]
    },

    TLV127: {
        term: "TLV Type 127",
        definition:
            "Organizationally specific TLV used for vendor extensions.",
        explanation:
            "Encodes vendor-specific features such as VLAN assignment, PoE, LLDP-MED, and QoS policies.",
        whyItMatters:
            "Most real-world LLDP functionality depends on this TLV.",
        kind: "tlv",
        domain: ["lldp"],
        tags: ["vendor-extension"]
    },

    EndOfLLDPDU: {
        term: "End of LLDPDU",
        definition:
            "TLV marking the end of the LLDP frame.",
        explanation:
            "Type 0 TLV that signals the parser to stop reading the TLV stream.",
        whyItMatters:
            "Missing this TLV indicates malformed packets.",
        kind: "tlv",
        domain: ["lldp"]
    },

    // =========================
    // Behavior & Mechanics
    // =========================


    LinkLocal: {
        term: "Link-Local",
        definition:
            "Traffic scope limited to a single Layer 2 segment.",
        explanation:
            "LLDP frames are never forwarded by switches.",
        whyItMatters:
            "Defines the scope and limitations of LLDP visibility.",
        kind: "property",
        domain: ["lldp", "layer2"]
    },

    MulticastMAC: {
        term: "LLDP Multicast MAC",
        definition:
            "Destination MAC address 01:80:C2:00:00:0E used by LLDP.",
        whyItMatters:
            "Identifies LLDP frames at Layer 2 and ensures link-local delivery.",
        kind: "identifier",
        domain: ["lldp"]
    },

    EtherType88CC: {
        term: "EtherType 0x88CC",
        definition:
            "EtherType value used to identify LLDP frames.",
        kind: "identifier",
        domain: ["lldp", "ethernet"]
    },

    // =========================
    // Operational Reality
    // =========================

    ControlPlane: {
        term: "Control Plane",
        definition:
            "Plane responsible for generating, processing, and storing LLDP data.",
        explanation:
            "Handles LLDP parsing and neighbor table updates.",
        kind: "architecture",
        domain: ["networking"]
    },

    DataPlane: {
        term: "Data Plane",
        definition:
            "Plane responsible for transmitting LLDP frames and forwarding traffic.",
        explanation:
            "LLDP frames can be observed here via packet capture.",
        kind: "architecture",
        domain: ["networking"]
    },

    NeighborTable: {
        term: "LLDP Neighbor Table",
        definition:
            "Local cache of received LLDP advertisements.",
        explanation:
            "Maintained in the control plane and updated based on incoming LLDP frames.",
        kind: "data-structure",
        domain: ["lldp"]
    },

    CoPP: {
        term: "CoPP",
        fullName: "Control Plane Policing",
        definition:
            "Mechanism that rate-limits traffic to the control plane.",
        explanation:
            "Can throttle or drop LLDP frames before they are processed.",
        whyItMatters:
            "Explains cases where LLDP is visible in captures but missing from neighbor tables.",
        kind: "security",
        domain: ["networking"]
    },

    NativeVLAN: {
        term: "Native VLAN",
        definition:
            "Default untagged VLAN on a trunk link.",
        explanation:
            "LLDP frames follow the native VLAN implicitly since they are sent untagged.",
        whyItMatters:
            "Mismatches can silently break LLDP visibility.",
        kind: "configuration",
        domain: ["layer2"]
    },

};