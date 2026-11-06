export const projects = {
  cofounder: {
    number: "BUILD NOTES / 001",
    category: "AGENTIC AI · BACKEND SYSTEMS",
    title: "AI Co-Founder",
    intro: "What if a big idea had a team behind it?",
    sections: [
      [
        "THE QUESTION",
        "How can specialized AI agents collaborate on a business problem while retaining context across conversations?",
      ],
      [
        "THE BUILD",
        "A LangChain CEO orchestrator coordinates 10 specialist agents. Effort-based routing selects between Flash, Mid, and Max modes. A FastAPI backend handles streaming and WebSocket traces so the work can be followed as it happens.",
      ],
      [
        "THE DEEPER LAYER",
        "Hybrid retrieval combines semantic chunking, pgvector HNSW indexes, keyword fusion, and reranking. Kafka separates message persistence, memory extraction, and session-title generation. Redis caches embeddings, sessions, company data, and agent state.",
      ],
      [
        "THE TAKEAWAY",
        "The intelligence is only one part of the experience. Context, observability, asynchronous work, and latency all need deliberate engineering.",
      ],
    ],
    metrics: [
      ["10", "SPECIALIST AGENTS"],
      ["0.950", "RECALL@5"],
      ["15s → 2s", "WORST-CASE LATENCY"],
    ],
    links: [
      ["Explore the live project ↗", "https://get-cofounder.tech/"],
      ["Read the source ↗", "https://github.com/karthik132007/Co_Founder"],
    ],
  },
  tripsync: {
    number: "BUILD NOTES / 002",
    category: "RECOMMENDATION SYSTEMS · MACHINE LEARNING",
    title: "TripSync AI",
    intro: "Where would your curiosity take you?",
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
      ["Explore the live project ↗", "https://tripsyncai.onrender.com/"],
      ["Read the source ↗", "https://github.com/karthik132007/TripSync_Ai"],
    ],
  },
  omnimark: {
    number: "BUILD NOTES / 003",
    category: "EXPLAINABLE AI · ASYNC PROCESSING",
    title: "OmniMark AI",
    intro: "Can a grade explain the “why” behind it?",
    sections: [
      [
        "THE QUESTION",
        "How can automated answer evaluation move beyond a bare score and give useful, explainable feedback?",
      ],
      [
        "THE BUILD",
        "A hybrid evaluation system combines Sentence Transformers, OpenAI/Ollama LLMs, keyword matching, and heuristic scoring. FastAPI and Celery process PDF answer sheets asynchronously through OCR, grading, and plagiarism detection.",
      ],
      [
        "THE DEEPER LAYER",
        "The plagiarism engine brings together DBSCAN, semantic similarity, Jaccard, TF-IDF, sequence matching, and adaptive thresholds. A Dockerized platform connects the API, worker, React frontend, and MongoDB.",
      ],
      [
        "THE TAKEAWAY",
        "A useful evaluation needs more than a model output: it needs reasons, confidence, reliable processing, and tests that cover the pipeline. The platform won first prize at TechnicalHub Project Space 8.0.",
      ],
    ],
    metrics: [
      ["124", "UNIT + INTEGRATION TESTS"],
      ["92%", "CODE COVERAGE"],
      ["5,000+", "PAIRWISE COMPARISONS"],
    ],
    links: [
      ["Read the source ↗", "https://github.com/karthik132007/omnimark.ai"],
    ],
  },
};
