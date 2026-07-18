/* ══════════════════════════════════════════════════════════════════
   Product catalogue — single source of truth for both the homepage
   Products section and the reusable /products/[slug] detail template.

   BackEX is fully specced (real render + 3D asset). ShoulderEX and
   ErgoEX are scaffolded as `comingSoon` until their assets land — drop
   in `viewer`, `features`, `specs`, `deployments`, `faqs` and flip the
   flag to promote them to the full template with no structural change.
   ══════════════════════════════════════════════════════════════════ */

export const PRODUCT_SLUGS = ["backex", "shoulderex", "ergoex"];

export const PRODUCTS = {
    backex: {
        slug: "backex",
        name: "BackEX",
        // Split so the detail hero can two-tone the "EX".
        nameLead: "Back",
        nameAccent: "EX",
        eyebrow: "Flagship System // 01",
        stage: "Stage 1 — Deployed",
        stageType: "green",
        indexNum: "",
        tagline:
            "A passive, zero-power exosuit engineered to eradicate lumbar strain and protect the industrial spine.",
        headline: ["Redefining back support", "in heavy industry."],
        // Short description used on the homepage row.
        summary:
            "A 0.7 kg passive elastic back-support exosuit. Elastic bands run parallel to the erector spinae — storing energy on forward bend, releasing on return. No batteries. No motors. No charging. Demonstrated 20–46% reduction in back muscle strain, validated with an FDA-approved EMG device. Currently deployed with L&T Construction and Indian Army.",
        paragraphs: [
            "The BackEX system is not an accessory; it is structural reinforcement for the human body. Engineered to seamlessly integrate with natural biomechanics, it drastically reduces the physical toll of repetitive lifting, bending, and static holding.",
            "By offloading weight from the lumbar spine and transferring it to the thighs, BackEX empowers workers to operate with greater safety and efficiency, without restricting their range of motion.",
        ],
        viewer: {
            type: "model",              // "model" → 3D GLB viewer
            src: "/textures/backex.glb",
            image: "/textures/BackEX.png", // dark-bg render (homepage reveal + poster)
        },
        features: [
            {
                number: "",
                title: "Biomechanical Relief",
                text: "Reduces lower back muscle strain by up to 46%, driving a 12% boost in productivity and a 40% improvement in lifting comfort.",
            },
            {
                number: "",
                title: "Ultra-Light Architecture",
                text: "Weighs just 700 grams (1.5 lbs). Engineered from aerospace-grade materials for invisible, non-restrictive support.",
            },
            {
                number: "",
                title: "Passive Independence",
                text: "100% mechanical assistance. Zero motors. Zero batteries. Zero downtime or charging cycles required on the floor.",
            },
            {
                number: "",
                title: "Endurance Engineered",
                text: "Fully customizable, modular fit designed specifically for uncompromising comfort across continuous, long-duration shifts.",
            },
        ],
        specs: [
            { value: "0.7 kg", label: "System Weight" },
            { value: "20–46%", label: "Strain Reduction" },
            { value: "0 W", label: "Power Draw · Passive" },
            { value: "FDA-EMG", label: "Validation Method" },
        ],
        // Deployment proof — filtered from Traction to just this product.
        deployments: [
            {
                key: "lt",
                company: "L&T Construction",
                status: "Live · Expanding",
                statusType: "green",
                img: "/textures/image.png",
                body: "Exosuits deployed pan-India with the first official PO secured and scale-up to additional plants underway.",
            },
            {
                key: "army",
                company: "Maruti Suzuki",
                status: "Pilot Complete",
                statusType: "green",
                img: "/textures/image2.png",
                body: "Validated in demanding field conditions — improving endurance and reducing physical strain during critical tasks.",
            },
        ],
        faqs: [
            {
                question: "Is BackEX powered or passive?",
                answer: "BackEX is a fully passive exosuit. It uses elastic elements to store energy during forward bending and release it during return, without motors, electronics, batteries, or charging.",
            },
            {
                question: "What problem is BackEX designed to solve?",
                answer: "BackEX is designed to reduce lower-back strain during repetitive bending, lifting, and forward-leaning industrial tasks. It is intended for environments where musculoskeletal load is persistent and injury risk compounds over time.",
            },
            {
                question: "What kind of strain reduction has been observed?",
                answer: "BackEX has demonstrated a 20–46% reduction in back muscle strain, validated using an FDA-approved EMG device. This makes it a practical intervention for teams focused on ergonomics, injury prevention, and sustained worker performance.",
            },
            {
                question: "Which industries or environments is it suited for?",
                answer: "BackEX is suited for physically demanding environments such as construction, manufacturing, logistics, and defence-related field use — especially where workers repeatedly bend, lift, or sustain load through the lower back.",
            },
            {
                question: "Does it require charging, maintenance-heavy infrastructure, or technical setup?",
                answer: "No. BackEX does not require charging or powered infrastructure. Because it is passive, deployment is operationally simpler than powered systems and better suited for real industrial settings that need reliability and low friction.",
            },
            {
                question: "Is BackEX already deployed or only in testing?",
                answer: "BackEX is already deployed in real-world contexts, including with L&T Construction and the Indian Army. It is not just a concept or lab-stage system.",
            },
            {
                question: "How does a pilot typically begin?",
                answer: "A pilot typically starts with a conversation around the target workflow, worker profile, and deployment environment. From there, the team can define pilot scope, evaluation criteria, and the operational conditions needed to test BackEX in context.",
            },
        ],
    },

    shoulderex: {
        slug: "shoulderex",
        name: "ShoulderEX",
        nameLead: "Shoulder",
        nameAccent: "EX",
        eyebrow: "Overhead System // 02",
        stage: "Stage 2 — Production Ready · Oct 2026",
        stageType: "orange",
        indexNum: "",
        comingSoon: true,
        tagline:
            "A pneumatic overhead-task exosuit for the highest-strain environments — automotive assembly, aerospace MRO, and construction overhead work.",
        summary:
            "A pneumatic overhead task exosuit for the highest-strain environments — automotive assembly, aerospace MRO, and construction overhead work. Reduces shoulder and trapezius load during sustained overhead operations. The highest per-unit value product in our portfolio with the clearest ROI case for automotive OEMs.",
    },

    ergoex: {
        slug: "ergoex",
        name: "ErgoEX",
        nameLead: "Ergo",
        nameAccent: "EX",
        eyebrow: "Intelligence Layer // 03",
        stage: "Stage 3 — In Development · AI Intelligence Layer",
        stageType: "orange",
        indexNum: "",
        comingSoon: true,
        tagline:
            "A wearable, multi-IMU intelligence system that monitors posture, movement, and load dynamics in real time.",
        summary:
            "ErgoEX is a wearable, multi-IMU–based intelligence system that continuously monitors body posture, movement, and load dynamics in real time. It analyzes musculoskeletal strain patterns and predicts fatigue-driven injury risk using adaptive algorithms, delivering actionable ergonomic insights to improve worker safety, productivity, and long-term health.",
    },
};

/* Homepage row order + routing target. */
export const PRODUCT_LIST = PRODUCT_SLUGS.map((s) => PRODUCTS[s]);
