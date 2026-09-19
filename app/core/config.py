import os
from pathlib import Path
from typing import Optional

try:
    from pydantic_settings import BaseSettings, SettingsConfigDict
    from pydantic import Field

    class Settings(BaseSettings):
        model_config = SettingsConfigDict(
            env_file=(".env", "../.env", "backend/.env"),
            env_file_encoding="utf-8",
            extra="ignore",
            case_sensitive=False,
        )

        hf_api_token: str = Field(default="", alias="HF_API_TOKEN")
        hf_embedding_model: str = Field(
            default="sentence-transformers/all-MiniLM-L6-v2",
            alias="HF_EMBEDDING_MODEL"
        )
        hf_donut_model: str = Field(
            default="naver-clova-ix/donut-base",
            alias="HF_DONUT_MODEL"
        )
        hf_ner_model: str = Field(
            default="algiraldohe/lm-ner-linkedin-skills-recognition",
            alias="HF_NER_MODEL"
        )
        enable_skill_ner_prefilter: bool = Field(
            default=True,
            alias="ENABLE_SKILL_NER_PREFILTER"
        )
        gemini_api_key: str = Field(default="", alias="GEMINI_API_KEY")
        hf_api_url: Optional[str] = Field(default=None, alias="HF_API_URL")
        hf_donut_url: Optional[str] = Field(default=None, alias="HF_DONUT_URL")
        hf_ner_url: Optional[str] = Field(default=None, alias="HF_NER_URL")
        embedding_dim: int = 384
        timeout_seconds: float = 15.0
        max_retries: int = 2
        batch_chunk_size: int = 32
        pdf_text_min_chars: int = 30
        database_url: Optional[str] = Field(default=None, alias="DATABASE_URL")

        @property
        def feature_extraction_url(self) -> str:
            if self.hf_api_url:
                return self.hf_api_url
            return f"https://api-inference.huggingface.co/pipeline/feature-extraction/{self.hf_embedding_model}"

        @property
        def donut_inference_url(self) -> str:
            if self.hf_donut_url:
                return self.hf_donut_url
            return f"https://api-inference.huggingface.co/models/{self.hf_donut_model}"

        @property
        def ner_inference_url(self) -> str:
            if self.hf_ner_url:
                return self.hf_ner_url
            return f"https://api-inference.huggingface.co/models/{self.hf_ner_model}"

except ImportError:
    class Settings:  # type: ignore
        def __init__(self):
            env_paths = [Path(".env"), Path("../.env"), Path("backend/.env")]
            env_vars = {}
            for env_path in env_paths:
                if env_path.is_file():
                    with open(env_path, "r", encoding="utf-8") as f:
                        for line in f:
                            line = line.strip()
                            if line and not line.startswith("#") and "=" in line:
                                k, v = line.split("=", 1)
                                env_vars[k.strip()] = v.strip().strip("'\"")

            self.hf_api_token = os.getenv("HF_API_TOKEN", env_vars.get("HF_API_TOKEN", ""))
            self.hf_embedding_model = os.getenv(
                "HF_EMBEDDING_MODEL",
                env_vars.get("HF_EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
            )
            self.hf_donut_model = os.getenv(
                "HF_DONUT_MODEL",
                env_vars.get("HF_DONUT_MODEL", "naver-clova-ix/donut-base")
            )
            self.hf_ner_model = os.getenv(
                "HF_NER_MODEL",
                env_vars.get("HF_NER_MODEL", "algiraldohe/lm-ner-linkedin-skills-recognition")
            )
            raw_prefilter = os.getenv("ENABLE_SKILL_NER_PREFILTER", env_vars.get("ENABLE_SKILL_NER_PREFILTER", "true"))
            self.enable_skill_ner_prefilter = str(raw_prefilter).lower() in ("true", "1", "yes")
            self.gemini_api_key = os.getenv("GEMINI_API_KEY", env_vars.get("GEMINI_API_KEY", ""))

            self.hf_api_url = os.getenv("HF_API_URL", env_vars.get("HF_API_URL", None))
            self.hf_donut_url = os.getenv("HF_DONUT_URL", env_vars.get("HF_DONUT_URL", None))
            self.hf_ner_url = os.getenv("HF_NER_URL", env_vars.get("HF_NER_URL", None))
            self.embedding_dim = int(os.getenv("EMBEDDING_DIM", "384"))
            self.timeout_seconds = float(os.getenv("TIMEOUT_SECONDS", "15.0"))
            self.max_retries = int(os.getenv("MAX_RETRIES", "2"))
            self.batch_chunk_size = int(os.getenv("BATCH_CHUNK_SIZE", "32"))
            self.pdf_text_min_chars = int(os.getenv("PDF_TEXT_MIN_CHARS", "30"))
            self.database_url = os.getenv("DATABASE_URL", env_vars.get("DATABASE_URL", None))

        @property
        def feature_extraction_url(self) -> str:
            if self.hf_api_url:
                return self.hf_api_url
            return f"https://api-inference.huggingface.co/pipeline/feature-extraction/{self.hf_embedding_model}"

        @property
        def donut_inference_url(self) -> str:
            if self.hf_donut_url:
                return self.hf_donut_url
            return f"https://api-inference.huggingface.co/models/{self.hf_donut_model}"

        @property
        def ner_inference_url(self) -> str:
            if self.hf_ner_url:
                return self.hf_ner_url
            return f"https://api-inference.huggingface.co/models/{self.hf_ner_model}"

settings = Settings()
