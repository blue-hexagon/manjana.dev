export const ospfGlossary = {

    // =========================
    // Core Protocol
    // =========================

    OSPF: {
        term: "OSPF",
        fullName: "Open Shortest Path First",
        definition:
            "Link-state Interior Gateway Protocol that synchronizes a distributed topological database and derives routing decisions using Dijkstra’s SPF algorithm.",
        explanation:
            "Routers exchange topology information (LSAs), not routes. Each router independently computes shortest paths from the shared LSDB.",
        appearsIn: ["IGP", "Control Plane"],
        whyItMatters:
            "Provides deterministic, loop-free, and fast-converging routing inside an autonomous system.",
        kind: "protocol",
        domain: ["ospf","routing", "control-plane"],
        rfcs: [
            {
                id: "RFC2328",
                title: "OSPF Version 2",
                relevance: "Primary specification for OSPFv2.",
            },
        ],
    },

    LSDB: {
        term: "LSDB",
        fullName: "Link-State Database",
        definition:
            "Synchronized database containing all LSAs within an OSPF area.",
        explanation:
            "Represents the network as a graph. All routers in the same area must maintain an identical LSDB.",
        appearsIn: ["OSPF Area"],
        whyItMatters:
            "SPF computation depends entirely on LSDB consistency.",
        kind: "data-structure",
        domain: ["ospf"],
        tags: ["topology", "graph"],
    },

    LSA: {
        term: "LSA",
        fullName: "Link-State Advertisement",
        definition:
            "Topology information unit flooded between OSPF routers.",
        explanation:
            "Describes router links, networks, summaries, or external routes depending on LSA type.",
        appearsIn: ["LSDB"],
        whyItMatters:
            "LSAs form the atomic building blocks of the LSDB.",
        kind: "control-plane-artifact",
        domain: ["ospf"],
        tags: ["flooding"],
    },

    SPF: {
        term: "SPF",
        fullName: "Shortest Path First",
        definition:
            "Algorithm used to compute shortest paths from the LSDB.",
        explanation:
            "OSPF uses Dijkstra’s algorithm to build a shortest-path tree rooted at each router.",
        appearsIn: ["Route calculation"],
        whyItMatters:
            "Determines the optimal forwarding paths installed into the routing table.",
        kind: "algorithm",
        domain: ["routing"],
        tags: ["dijkstra"],
    },

    // =========================
    // Neighbor & Adjacency
    // =========================

    Hello: {
        term: "Hello",
        definition:
            "OSPF packet used for neighbor discovery and liveness detection.",
        explanation:
            "Carries parameters such as Area ID, timers, authentication, and network type.",
        appearsIn: ["Neighbor formation"],
        whyItMatters:
            "Adjacency cannot form without bidirectional Hello exchange.",
        kind: "packet",
        domain: ["ospf"],
    },

    Adjacency: {
        term: "Adjacency",
        definition:
            "Full synchronization relationship between OSPF neighbors.",
        explanation:
            "Established after successful database exchange and LSDB alignment.",
        appearsIn: ["Neighbor state machine"],
        whyItMatters:
            "Without FULL adjacency, LSDB synchronization is incomplete.",
        kind: "relationship",
        domain: ["ospf"],
    },

    RouterID: {
        term: "Router ID",
        definition:
            "32-bit identifier uniquely identifying an OSPF router.",
        explanation:
            "Chosen manually or derived from loopback/highest interface IP.",
        whyItMatters:
            "Duplicate Router IDs prevent adjacency formation.",
        kind: "identifier",
        domain: ["ospf"],
    },

    // =========================
    // Network Architecture
    // =========================

    Area: {
        term: "Area",
        definition:
            "Logical grouping of routers sharing the same LSDB.",
        explanation:
            "Reduces SPF scope and improves scalability through hierarchical design.",
        appearsIn: ["Area 0", "Backbone"],
        whyItMatters:
            "Defines LSDB flooding boundaries and SPF calculation scope.",
        kind: "architecture",
        domain: ["ospf"],
    },

    DR: {
        term: "DR",
        fullName: "Designated Router",
        definition:
            "Router elected on broadcast networks to reduce adjacency scaling.",
        explanation:
            "Acts as central LSA exchange hub on multi-access segments.",
        appearsIn: ["Broadcast networks"],
        whyItMatters:
            "Reduces adjacency count from N² to N.",
        kind: "role",
        domain: ["ospf"],
    },

    BDR: {
        term: "BDR",
        fullName: "Backup Designated Router",
        definition:
            "Standby router ready to assume DR responsibilities.",
        explanation:
            "Elected alongside DR during neighbor election.",
        kind: "role",
        domain: ["ospf"],
    },

    // =========================
    // Metrics & Path Selection
    // =========================

    Cost: {
        term: "Cost",
        definition:
            "Metric used by OSPF to calculate shortest paths.",
        explanation:
            "Derived from interface bandwidth or manually configured.",
        appearsIn: ["SPF"],
        whyItMatters:
            "Determines path preference and traffic engineering behavior.",
        kind: "metric",
        domain: ["routing"],
    },

    ReferenceBandwidth: {
        term: "Reference Bandwidth",
        definition:
            "Global value used to calculate interface cost.",
        explanation:
            "Default is 100 Mbps; should be adjusted in modern networks.",
        whyItMatters:
            "Incorrect reference bandwidth causes suboptimal path selection.",
        kind: "configuration",
        domain: ["ospf"],
    },

    // =========================
    // LSA Types
    // =========================

    LSA_Type1: {
        term: "Type 1 LSA",
        definition:
            "Router LSA describing links from a router within an area.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type2: {
        term: "Type 2 LSA",
        definition:
            "Network LSA generated by DR describing multi-access networks.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type3: {
        term: "Type 3 LSA",
        definition:
            "Summary LSA describing inter-area routes.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type5: {
        term: "Type 5 LSA",
        definition:
            "External LSA describing redistributed routes.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    // =========================
    // Behavioral Properties
    // =========================

    Convergence: {
        term: "Convergence",
        definition:
            "Process by which routers reach a consistent LSDB and routing state.",
        explanation:
            "Triggered by topology events and resolved through LSA flooding and SPF recomputation.",
        kind: "behavior",
        domain: ["routing"],
    },

}
