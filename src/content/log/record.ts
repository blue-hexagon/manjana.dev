export type Category =
    | "Encoding"
    | "TLS"
    | "MQTT"
    | "SDA"
    | "Policy"
    | "Kernel"
    | "Containers"
    | "Routing & Switching"

export type Status =
    | "hypothesis"
    | "validated"
    | "falsified"

export interface ResearchEntry {
    id: string
    timestamp: string
    category: Category
    tags?: string[]
    title: string

    /* Trigger (why you started thinking) */
    trigger?: string

    /* Core loop */
    model: string
    prediction: string
    test: {
        setup: string
        command: string
    } | string
    result: string
    conclusion: string

    /* State */
    status: Status
    confidence?: number

    /* Signal */
    insight?: string
    edgeCase?: string
    counterEvidence?: string
    signals?: string[]

    /* Action */
    nextSteps?: {
        goal: string
        steps: string[]
        successCriteria?: string
    }

    /* Reference */
    code?: string
    reference?: string
}

export const RESEARCH_LOG: Record<string, ResearchEntry> = {
    "ospf-init-stuck": {
        id: "ospf-init-stuck",
        timestamp: "2026-03-02 11:10 CET",
        category: "Routing & Switching",
        title: "OSPF Neighbor Stuck in INIT",
        trigger: "One-way neighbor visibility",
        model: "Hello packets received but not acknowledged bidirectionally.",
        prediction: "Neighbor remains in INIT, never reaches 2-WAY.",
        test: "Debug hello packets + packet capture.",
        result: "R1 sees R2, R2 does not list R1 in hello.",
        conclusion: "Unidirectional communication confirmed.",
        status: "validated",
        confidence: 0.85,
        signals: [
            "INIT state persists",
            "one-way hello",
            "missing router-id in neighbor list",
        ],
        edgeCase: "ACLs or multicast filtering may mimic this behavior.",
        counterEvidence: "If both sides list each other → not INIT issue.",
        insight: "INIT = one-way visibility",
        tags: ["ospf", "adjacency"],
    },

    "tls-record-size": {
        id: "tls-record-size",
        timestamp: "2026-03-01 19:22 CET",
        category: "TLS",
        title: "TLS Record Size Leakage",
        trigger: "Encrypted traffic still reveals patterns",
        model: "TLS hides payload but not record length.",
        prediction: "Packet sizes correlate with application behavior.",
        test: "Capture TLS traffic during known request patterns.",
        result: "Consistent size patterns observed per request type.",
        conclusion: "Metadata leakage confirmed.",
        status: "validated",
        confidence: 0.75,
        signals: [
            "consistent record lengths",
            "no payload visibility",
            "pattern correlation",
        ],
        edgeCase: "Padding can reduce leakage but not eliminate.",
        counterEvidence: "If record sizes vary randomly → padding effective.",
        insight: "TLS encrypts content, not shape",
        tags: ["tls", "side-channel"],
    },

    "mqtt-retain-delay": {
        id: "mqtt-retain-delay",
        timestamp: "2026-02-28 21:05 CET",
        category: "MQTT",
        title: "Retained Message Delay",
        trigger: "Subscriber not receiving retained message immediately",
        model: "Broker delays retained message until session established.",
        prediction: "Message arrives after CONNACK.",
        test: "Subscribe with clean session false.",
        result: "Message delayed until subscription acknowledged.",
        conclusion: "Spec-compliant behavior.",
        status: "validated",
        confidence: 0.8,
        signals: [
            "delayed retained delivery",
            "clean session dependency",
        ],
        insight: "Retained ≠ instant, depends on session",
        tags: ["mqtt", "broker"],
    },

    "container-dns-failure": {
        id: "container-dns-failure",
        timestamp: "2026-02-27 14:33 CET",
        category: "Containers",
        title: "Container DNS Resolution Failure",
        trigger: "Intermittent DNS failures inside container",
        model: "Docker DNS cache inconsistency",
        prediction: "Container resolves intermittently, host always resolves.",
        test: "nslookup inside vs outside container.",
        result: "Container fails 30% of requests.",
        conclusion: "Docker DNS instability suspected.",
        status: "hypothesis",
        confidence: 0.6,
        signals: [
            "intermittent DNS failure",
            "host works, container fails",
        ],
        edgeCase: "Could be upstream DNS server issue.",
        counterEvidence: "If host also fails → upstream problem.",
        tags: ["docker", "dns"],
    },

    "kernel-socket-leak": {
        id: "kernel-socket-leak",
        timestamp: "2026-02-26 09:18 CET",
        category: "Kernel",
        title: "Socket Descriptor Leak",
        trigger: "Increasing open file descriptors over time",
        model: "Application not closing sockets properly.",
        prediction: "FD count increases linearly with requests.",
        test: "Monitor lsof over time.",
        result: "FD count stable under load.",
        conclusion: "Leak not reproduced.",
        status: "falsified",
        confidence: 0.7,
        signals: [
            "no fd growth",
            "stable under load",
        ],
        insight: "Not all spikes are leaks",
        tags: ["kernel", "sockets"],
    },
    "flow-control": {
        id: "flow-control",
        timestamp: "2026-03-03 16:42 CET",
        category: "Routing & Switching",

        title: "Flow Control vs Egress Queue Drops",

        trigger:
            "Sustained outDiscards on access ports while uplinks remain clean",

        model:
            "Microbursts overflow egress queue on access port.",

        prediction:
            "Specific queue drops under north→south burst while uplink remains clean.",

        test: {
            setup:
                "10G upstream server → C9400 → 1G access port endpoint",
            command:
                "iperf3 -c <endpoint-ip> -P 8 -t 300",
        },

        result:
            "queue_2_drops: +120344 | uplink_drops: 0",

        conclusion:
            "Local egress queue overflow confirmed.",

        status: "validated",
        confidence: 0.9,

        insight:
            "outDiscards ≠ uplink congestion",

        edgeCase:
            "Flow-control can shift congestion upstream.",

        counterEvidence:
            "If uplink queue drops increase under same test, congestion is not localized.",

        signals: [
            "outDiscards on access only",
            "uplinks clean",
            "asymmetric bandwidth",
        ],

        nextSteps: {
            goal:
                "Determine whether drops are class-default or classified traffic",
            steps: [
                "show platform hardware fed switch active qos queue config interface GiX/X/X",
                "identify queue-to-class mapping for Queue 2",
                "show policy-map interface GiX/X/X",
                "verify if DSCP/CoS classification is applied",
            ],
            successCriteria:
                "Confirmed whether drops occur in class-default or a specific QoS class",
        },

        code: [
            "! Baseline",
            "show interface GiX/X/X",
            "show platform hardware fed switch active qos queue stats interface GiX/X/X",
            "",
            "! Map queue to class",
            "show platform hardware fed switch active qos queue config interface GiX/X/X",
        ].join("\\n"),

        reference:
            "IEEE 802.3x; Catalyst 9400 QoS",
    },

}