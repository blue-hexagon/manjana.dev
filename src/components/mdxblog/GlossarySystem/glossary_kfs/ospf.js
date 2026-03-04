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
        domain: ["ospf", "routing", "control-plane"],
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
    // =========================
// Control Plane Architecture
// =========================

    RIB: {
        term: "RIB",
        fullName: "Routing Information Base",
        definition:
            "Logical routing table maintained in the control plane.",
        explanation:
            "Stores best routes selected by routing protocols before installation into the FIB.",
        whyItMatters:
            "Represents protocol-derived routing decisions prior to hardware programming.",
        kind: "data-structure",
        domain: ["routing", "control-plane"],
    },

    FIB: {
        term: "FIB",
        fullName: "Forwarding Information Base",
        definition:
            "Hardware-optimized forwarding table derived from the RIB.",
        explanation:
            "Used by the data plane to make actual packet forwarding decisions.",
        whyItMatters:
            "Determines how traffic is forwarded at line rate.",
        kind: "data-structure",
        domain: ["forwarding", "data-plane"],
    },

    CEF: {
        term: "CEF",
        fullName: "Cisco Express Forwarding",
        definition:
            "Cisco’s high-performance Layer 3 forwarding architecture.",
        explanation:
            "Uses a precomputed FIB and adjacency table to enable deterministic hardware forwarding.",
        whyItMatters:
            "Separates control-plane routing logic from fast-path packet forwarding.",
        kind: "forwarding-architecture",
        domain: ["cisco", "forwarding"],
    },

    ControlPlane: {
        term: "Control Plane",
        definition:
            "Logical plane responsible for routing decisions and protocol computation.",
        explanation:
            "Processes OSPF packets, maintains LSDB, and runs SPF.",
        kind: "architecture",
        domain: ["networking"],
    },

    DataPlane: {
        term: "Data Plane",
        definition:
            "Plane responsible for forwarding user traffic based on FIB entries.",
        explanation:
            "Operates independently of routing protocol computation.",
        kind: "architecture",
        domain: ["networking"],
    },

    SPT: {
        term: "SPT",
        fullName: "Shortest Path Tree",
        definition:
            "Tree structure generated by SPF computation.",
        explanation:
            "Rooted at the local router and used to derive best paths for the RIB.",
        kind: "data-structure",
        domain: ["ospf"],
    },

    Flooding: {
        term: "Flooding",
        definition:
            "Reliable propagation mechanism used to distribute LSAs.",
        explanation:
            "Ensures all routers within an LSA’s scope receive identical topology information.",
        kind: "behavior",
        domain: ["ospf"],
    },

    Authentication: {
        term: "Authentication",
        definition:
            "Mechanism used to validate OSPF packet integrity and peer legitimacy.",
        explanation:
            "Prevents unauthorized routers from forming adjacencies.",
        kind: "security",
        domain: ["ospf"],
    },

// =========================
// Neighbor State Machine
// =========================

    Neighbor: {
        term: "Neighbor",
        definition:
            "Router discovered via Hello exchange.",
        explanation:
            "Represents a bidirectional OSPF relationship prior to full database synchronization.",
        kind: "relationship",
        domain: ["ospf"],
    },

    Down: {
        term: "Down",
        definition:
            "Initial OSPF neighbor state where no Hello has been received.",
        kind: "state",
        domain: ["ospf"],
    },

    Init: {
        term: "Init",
        definition:
            "State indicating a Hello has been received but bidirectional communication is not yet confirmed.",
        kind: "state",
        domain: ["ospf"],
    },

    TwoWay: {
        term: "2-Way",
        definition:
            "State where bidirectional Hello exchange is confirmed.",
        explanation:
            "Adjacency may not proceed further on broadcast networks unless router becomes DR or BDR.",
        kind: "state",
        domain: ["ospf"],
    },

    ExStart: {
        term: "ExStart",
        definition:
            "State where master/slave negotiation and DBD sequence exchange begins.",
        kind: "state",
        domain: ["ospf"],
    },

    Exchange: {
        term: "Exchange",
        definition:
            "State where routers exchange DBD packets summarizing LSAs.",
        kind: "state",
        domain: ["ospf"],
    },

    Loading: {
        term: "Loading",
        definition:
            "State where routers request and receive missing LSAs.",
        kind: "state",
        domain: ["ospf"],
    },

    Full: {
        term: "Full",
        definition:
            "State indicating LSDB synchronization between neighbors is complete.",
        kind: "state",
        domain: ["ospf"],
    },

// =========================
// OSPF Packet Types
// =========================

    DBD: {
        term: "DBD",
        fullName: "Database Description Packet",
        definition:
            "Packet used to summarize LSDB contents during adjacency formation.",
        kind: "packet",
        domain: ["ospf"],
    },

    LSR: {
        term: "LSR",
        fullName: "Link-State Request",
        definition:
            "Packet requesting specific LSAs during database synchronization.",
        kind: "packet",
        domain: ["ospf"],
    },

    LSU: {
        term: "LSU",
        fullName: "Link-State Update",
        definition:
            "Packet carrying full LSAs for synchronization or flooding.",
        kind: "packet",
        domain: ["ospf"],
    },

    LSAck: {
        term: "LSAck",
        fullName: "Link-State Acknowledgment",
        definition:
            "Packet acknowledging receipt of LSAs to ensure reliable flooding.",
        kind: "packet",
        domain: ["ospf"],
    },

// =========================
// Roles & Hierarchy
// =========================

    ABR: {
        term: "ABR",
        fullName: "Area Border Router",
        definition:
            "Router connecting multiple OSPF areas.",
        explanation:
            "Maintains separate LSDB per area and generates summary LSAs.",
        kind: "role",
        domain: ["ospf"],
    },

    ASBR: {
        term: "ASBR",
        fullName: "Autonomous System Boundary Router",
        definition:
            "Router redistributing external routes into OSPF.",
        kind: "role",
        domain: ["ospf"],
    },

    Backbone: {
        term: "Backbone",
        definition:
            "Area 0 of OSPF serving as the core transit area.",
        kind: "architecture",
        domain: ["ospf"],
    },

    NSSA: {
        term: "NSSA",
        fullName: "Not-So-Stubby Area",
        definition:
            "Area type allowing limited external route redistribution.",
        kind: "area-type",
        domain: ["ospf"],
    },

    NBMA: {
        term: "NBMA",
        fullName: "Non-Broadcast Multi-Access",
        definition:
            "Network type supporting multiple routers without native multicast.",
        kind: "network-type",
        domain: ["ospf"],
    },

// =========================
// Additional LSA Types
// =========================

    LSA_Type4: {
        term: "Type 4 LSA",
        definition:
            "ASBR Summary LSA advertising reachability to an ASBR.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type6: {
        term: "Type 6 LSA",
        definition:
            "Multicast OSPF LSA (MOSPF extension).",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type7: {
        term: "Type 7 LSA",
        definition:
            "NSSA External LSA translated to Type 5 by ABR.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type8: {
        term: "Type 8 LSA",
        definition:
            "Link LSA used in OSPFv3 for link-local information.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type9: {
        term: "Type 9 LSA",
        definition:
            "Opaque LSA with link-local scope.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type10: {
        term: "Type 10 LSA",
        definition:
            "Opaque LSA with area scope.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

    LSA_Type11: {
        term: "Type 11 LSA",
        definition:
            "Opaque LSA with autonomous system scope.",
        kind: "lsa-type",
        domain: ["ospf"],
    },

}
