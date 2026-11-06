const inventory = {
  items: [
    {
      name: "Python",
      category: "languages",
      icon: "python",
      color: "#4775a0",
      description:
        "The language connecting my AI experiments, data workflows, and FastAPI services.",
    },
    {
      name: "Go",
      category: "languages",
      icon: "go",
      color: "#298c9c",
      description:
        "Part of my programming toolkit, alongside Python, SQL, and C++.",
    },
    {
      name: "C++",
      category: "languages",
      icon: "cplusplus",
      color: "#476f9a",
      description:
        "A language in my toolkit for programming and computer science foundations.",
    },
    {
      name: "SQL",
      category: "languages",
      icon: "database",
      color: "#967142",
      description:
        "Querying, validating, and cleaning data. I used SQL and Python on 10,000+ records during my internship.",
    },
    {
      name: "FastAPI",
      category: "backend",
      icon: "fastapi",
      color: "#328778",
      description:
        "The API layer behind AI Co-Founder, TripSync, and OmniMark.",
    },
    {
      name: "REST APIs",
      category: "backend",
      icon: "api",
      color: "#727e55",
      description:
        "Structured interfaces for recommendations, itinerary generation, grading, and backend workflows.",
    },
    {
      name: "Redis",
      category: "backend",
      icon: "redis",
      color: "#aa5148",
      description:
        "Caching embeddings, sessions, company data, and agent state in AI Co-Founder.",
    },
    {
      name: "Apache Kafka",
      category: "backend",
      icon: "apachekafka",
      color: "#4a5547",
      description:
        "Event-driven message persistence, memory extraction, and session-title generation.",
    },
    {
      name: "PostgreSQL",
      category: "data",
      icon: "postgresql",
      color: "#487a98",
      description:
        "Validated travel datasets in TripSync and the database foundation for pgvector retrieval.",
    },
    {
      name: "pgvector",
      category: "data",
      icon: "vector",
      color: "#637ca0",
      description:
        "Vector search and HNSW indexes for the hybrid RAG pipeline in AI Co-Founder.",
    },
    {
      name: "MongoDB",
      category: "data",
      icon: "mongodb",
      color: "#60844a",
      description:
        "The document database in OmniMark’s API and worker platform.",
    },
    {
      name: "ChromaDB",
      category: "data",
      icon: "nodes",
      color: "#a77742",
      description: "A vector database in my AI and data-store toolkit.",
    },
    {
      name: "TensorFlow / Keras",
      category: "ai",
      icon: "tensorflow",
      color: "#b47a37",
      description:
        "Two-tower destination retrieval and neural reranking in TripSync.",
    },
    {
      name: "PyTorch",
      category: "ai",
      icon: "pytorch",
      color: "#ac6150",
      description: "A framework in my machine-learning toolkit.",
    },
    {
      name: "Scikit-learn",
      category: "ai",
      icon: "scikitlearn",
      color: "#a47a43",
      description:
        "Machine-learning utilities and signals used in evaluation and plagiarism analysis.",
    },
    {
      name: "RAG",
      category: "ai",
      icon: "book",
      color: "#6f7b4a",
      description:
        "Combining semantic and keyword retrieval with reranking to ground agents in relevant context.",
    },
    {
      name: "Embedding models",
      category: "ai",
      icon: "vector",
      color: "#9577ab",
      description:
        "Turning preferences and text into representations for retrieval, recommendation, and semantic comparison.",
    },
    {
      name: "Agentic AI",
      category: "ai",
      icon: "nodes",
      color: "#6b7c52",
      description:
        "Coordinating 10 specialized agents through the AI Co-Founder orchestrator.",
    },
    {
      name: "LangChain",
      category: "ai",
      icon: "langchain",
      color: "#548577",
      description:
        "The framework used for the CEO orchestrator in AI Co-Founder.",
    },
    {
      name: "LangGraph",
      category: "ai",
      icon: "langgraph",
      color: "#657d80",
      description: "A framework in my toolkit for agentic AI workflows.",
    },
    {
      name: "Recommender systems",
      category: "ai",
      icon: "compass",
      color: "#587d91",
      description:
        "Matching travelers to destinations through retrieval, reranking, and preference encoding.",
    },
    {
      name: "NLTK",
      category: "ai",
      icon: "book",
      color: "#65835b",
      description:
        "A natural-language processing library in the OmniMark project stack.",
    },
    {
      name: "Docker",
      category: "build",
      icon: "docker",
      color: "#4d84a6",
      description:
        "Containerized services for AI Co-Founder, TripSync, and OmniMark.",
    },
    {
      name: "Git",
      category: "build",
      icon: "git",
      color: "#af6852",
      description: "Version control for my code and project iterations.",
    },
    {
      name: "GitHub",
      category: "build",
      icon: "github",
      color: "#54564f",
      description:
        "The home of the source code linked throughout this portfolio.",
    },
    {
      name: "Linux",
      category: "build",
      icon: "linux",
      color: "#977d35",
      description:
        "An operating environment in my systems and deployment toolkit.",
    },
    {
      name: "AWS EC2",
      category: "build",
      icon: "cloud",
      color: "#a47c3f",
      description:
        "Compute hosting for deployed FastAPI and Docker-based project services.",
    },
    {
      name: "AWS S3",
      category: "build",
      icon: "cloud",
      color: "#6d873e",
      description: "Object storage in my cloud and DevOps toolkit.",
    },
    {
      name: "Data structures & algorithms",
      category: "foundations",
      icon: "sword",
      color: "#8e74a2",
      description:
        "Core computer science foundations that support how I reason about code and systems.",
    },
    {
      name: "Object-oriented programming",
      category: "foundations",
      icon: "cube",
      color: "#8e74a2",
      description:
        "Object modeling, including the Strategy and Factory patterns used in OmniMark.",
    },
    {
      name: "DBMS",
      category: "foundations",
      icon: "database",
      color: "#8e74a2",
      description:
        "The database-management foundations behind modeling, querying, and storing data.",
    },
    {
      name: "Operating systems",
      category: "foundations",
      icon: "chip",
      color: "#8e74a2",
      description:
        "Core coursework supporting my understanding of how software runs.",
    },
    {
      name: "Computer networks",
      category: "foundations",
      icon: "network",
      color: "#8e74a2",
      description:
        "Core coursework behind the connections between APIs, services, and clients.",
    },
    {
      name: "Software engineering",
      category: "foundations",
      icon: "cube",
      color: "#8e74a2",
      description:
        "Design, implementation, and validation, including the tested multi-service OmniMark platform.",
    },
    {
      name: "Machine learning",
      category: "foundations",
      icon: "spark",
      color: "#8e74a2",
      description:
        "AI & ML coursework connected to my recommendation and evaluation projects.",
    },
  ],
  groups: {
    languages: "Languages",
    backend: "Backend",
    data: "Data stores",
    ai: "AI & ML",
    build: "Build & ship",
    foundations: "Foundations",
  },
};

export const { groups, items } = inventory;
