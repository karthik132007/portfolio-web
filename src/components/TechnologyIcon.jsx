import { memo } from "react";

const icons = {
  Python: "python",
  Go: "go",
  "C++": "cplusplus",
  SQL: "sql",
  FastAPI: "fastapi",
  "REST APIs": "rest",
  Redis: "redis",
  "Apache Kafka": "apachekafka",
  PostgreSQL: "postgresql",
  pgvector: "pgvector",
  MongoDB: "mongodb",
  ChromaDB: "chroma",
  "TensorFlow / Keras": "tensorflow",
  PyTorch: "pytorch",
  "Scikit-learn": "scikitlearn",
  RAG: "rag",
  "Embedding models": "embeddings",
  "Agentic AI": "agents",
  LangChain: "langchain",
  LangGraph: "langgraph",
  "Recommender systems": "recommender",
  NLTK: "nltk",
  Docker: "docker",
  Git: "git",
  GitHub: "github",
  Linux: "linux",
  "AWS EC2": "ec2",
  "AWS S3": "s3",
  "Data structures & algorithms": "algorithms",
  "Object-oriented programming": "oop",
  DBMS: "dbms",
  "Operating systems": "os",
  "Computer networks": "networks",
  "Software engineering": "engineering",
  "Machine learning": "ml",
};

function TechnologyIcon({ item }) {
  return (
    <img
      className="technology-icon"
      src={`assets/tech-icons/${icons[item.name]}.svg`}
      width="32"
      height="32"
      alt=""
      draggable="false"
    />
  );
}

export default memo(TechnologyIcon);
