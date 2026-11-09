export const projects = {
  cofounder: {
    number: "BUILD NOTES / 001",
    category: "AGENTIC AI · BACKEND SYSTEMS",
    title: "AI Co-Founder",
    intro: "What if a big idea had a team behind it?",
    summary: "A founder can delegate research, writing, and analysis from one conversation. The CEO agent brings in specialists and recalls relevant company context.",
    stack: ["LangChain", "Hybrid RAG", "FastAPI + Kafka"],
    sections: [
      [
        "THE QUESTION",
        "How can specialized AI agents collaborate on a business problem while retaining context across conversations?",
      ],
      [
        "THE BUILD",
        "A LangChain CEO orchestrator delegates to specialist agents. The selected Flash, Mid, or Max mode controls model choice and tool budgets. FastAPI streams the answer while a buffered WebSocket timeline makes tool activity visible.",
      ],
      [
        "THE DEEPER LAYER",
        "Hybrid retrieval combines semantic chunking, pgvector HNSW indexes, keyword fusion, and reranking. Kafka separates message persistence, memory extraction, and session-title generation. Redis caches embeddings, sessions, company data, and agent state.",
      ],
      [
        "THE TAKEAWAY",
        "Caching company data and agent instances in Redis cut the documented worst-case dashboard load from about 15 seconds to about 2 seconds.",
      ],
    ],
    metrics: [
      ["27", "END-TO-END EVAL RUNS"],
      ["0.950", "RECALL@5"],
      ["~15s → ~2s", "WORST-CASE DASHBOARD LOAD"],
    ],
    links: [
      ["Live site", "https://get-cofounder.tech/"],
      ["Source code", "https://github.com/karthik132007/Co_Founder"],
    ],
  },
  tripsync: {
    number: "BUILD NOTES / 002",
    category: "RECOMMENDATION SYSTEMS · MACHINE LEARNING",
    title: "TripSync AI",
    intro: "Where would your curiosity take you?",
    summary: "A travel recommender that turns preferences into a ranked destination shortlist, then builds a day-by-day itinerary for the place you pick.",
    stack: ["TensorFlow", "FastAPI", "PostgreSQL"],
    sections: [
      [
        "THE QUESTION",
        "How do you turn a set of travel preferences into destinations that feel relevant—and then into an actual plan?",
      ],
      [
        "THE BUILD",
        "A two-tower neural recommendation system uses a 71-dimensional preference encoder, a 72-dimensional user tower, and 64-dimensional embeddings. Cosine similarity retrieves the Top-100 candidates before a TensorFlow/Keras model reranks the Top-20.",
      ],
      [
        "THE DEEPER LAYER",
        "Preprocessing maps 100+ activity tags, 20+ travel-type labels, 20+ climate labels, and 180+ countries. FastAPI serves recommendations and itinerary generation, while PostgreSQL stores validated destination and hotel datasets.",
      ],
      [
        "THE TAKEAWAY",
        "A ranking is a starting point. Structured day-by-day itineraries and Top-5 hotel recommendations turn model outputs into something a traveler can use.",
      ],
    ],
    metrics: [
      ["64-D", "EMBEDDING SPACE"],
      ["100 → 20", "RETRIEVE THEN RERANK"],
      ["180+", "COUNTRIES IN PREPROCESSING"],
    ],
    links: [
      ["Live site", "https://tripsyncai.onrender.com/"],
      ["Source code", "https://github.com/karthik132007/TripSync_Ai"],
    ],
  },
  omnimark: {
    number: "BUILD NOTES / 003",
    category: "EXPLAINABLE AI · ASYNC PROCESSING",
    title: "OmniMark AI",
    award: { label: "Hackathon winner", event: "TechnicalHub Project Space 8.0", place: 1 },
    intro: "Can a grade explain the “why” behind it?",
    summary: "An assessment platform that processes batches of answer sheets and gives teachers per-question feedback and a review process for disputed marks.",
    stack: ["FastAPI + Celery", "Semantic AI", "MongoDB"],
    sections: [
      [
        "THE QUESTION",
        "How can automated answer evaluation move beyond a bare score and give useful, explainable feedback?",
      ],
      [
        "THE BUILD",
        "FastAPI queues batches of answer sheets for Celery. Scanned pages go through OCR. Teachers can select NLP scoring with semantic similarity and keyword overlap, or LLM grading with structured per-question feedback.",
      ],
      [
        "THE DEEPER LAYER",
        "The plagiarism engine brings together DBSCAN, semantic similarity, Jaccard, TF-IDF, sequence matching, and adaptive thresholds. A Dockerized platform connects the API, worker, React frontend, and MongoDB.",
      ],
      [
        "THE TAKEAWAY",
        "Students can request a reevaluation. Teachers can review the request and update the result, and the platform records the change. The project won first prize at TechnicalHub Project Space 8.0.",
      ],
    ],
    metrics: [
      ["124", "UNIT + INTEGRATION TESTS"],
      ["92%", "CODE COVERAGE"],
      ["1ST", "TechnicalHub Project Space 8.0"],
    ],
    links: [
      ["Source code", "https://github.com/karthik132007/omnimark.ai"],
    ],
  },
  sherlock: {
    number: "BUILD NOTES / 004",
    category: "KNOWLEDGE GRAPHS · DESKTOP SOFTWARE",
    title: "Sherlock",
    award: { label: "National finalist", event: "GDG DevJams · VIT Vellore" },
    intro: "Can you trace every connection back to the evidence?",
    summary: "An investigation workspace that turns case files into a searchable evidence graph, timeline, and list of contradictions.",
    stack: ["Electron", "Python", "Neo4j"],
    sections: [
      [
        "THE QUESTION",
        "How can someone cross-check statements, timelines, and relationships across a folder of case evidence?",
      ],
      [
        "THE BUILD",
        "An Electron desktop app runs a Python pipeline that chunks evidence, resolves entity aliases, and extracts relationships and timeline events.",
      ],
      [
        "THE DEEPER LAYER",
        "Relationships carry the source file, chunk ID, and evidence excerpt. Each case keeps its own JSON outputs, with optional Neo4j support for graph queries.",
      ],
      [
        "THE TAKEAWAY",
        "The graph lets a reviewer follow a connection back to its source, compare conflicting accounts, and decide which leads deserve a closer look.",
      ],
    ],
    links: [
      ["Source code", "https://github.com/karthik132007/sherlock"],
    ],
  },
};
