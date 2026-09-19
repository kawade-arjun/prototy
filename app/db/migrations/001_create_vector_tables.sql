-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Table: student_profile_vectors
CREATE TABLE IF NOT EXISTS public.student_profile_vectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id VARCHAR(100) NOT NULL,
    profile_text TEXT NOT NULL,
    embedding vector(384) NOT NULL,
    embedding_model VARCHAR(100) NOT NULL DEFAULT 'sentence-transformers/all-MiniLM-L6-v2',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure embedding_model column exists on student_profile_vectors
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'student_profile_vectors' AND column_name = 'embedding_model'
    ) THEN
        ALTER TABLE public.student_profile_vectors
        ADD COLUMN embedding_model VARCHAR(100) NOT NULL DEFAULT 'sentence-transformers/all-MiniLM-L6-v2';
    END IF;
END $$;

-- Table: role_requirements
CREATE TABLE IF NOT EXISTS public.role_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id VARCHAR(100) NOT NULL,
    role_title VARCHAR(255) NOT NULL,
    requirements_text TEXT NOT NULL,
    embedding vector(384) NOT NULL,
    embedding_model VARCHAR(100) NOT NULL DEFAULT 'sentence-transformers/all-MiniLM-L6-v2',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure embedding_model column exists on role_requirements
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'role_requirements' AND column_name = 'embedding_model'
    ) THEN
        ALTER TABLE public.role_requirements
        ADD COLUMN embedding_model VARCHAR(100) NOT NULL DEFAULT 'sentence-transformers/all-MiniLM-L6-v2';
    END IF;
END $$;

-- Indexes for model filtering and cosine similarity
CREATE INDEX IF NOT EXISTS idx_student_vector_model ON public.student_profile_vectors (embedding_model);
CREATE INDEX IF NOT EXISTS idx_role_vector_model ON public.role_requirements (embedding_model);

-- HNSW indexes for cosine distance matching
CREATE INDEX IF NOT EXISTS idx_student_vector_hnsw ON public.student_profile_vectors USING hnsw (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_role_vector_hnsw ON public.role_requirements USING hnsw (embedding vector_cosine_ops);
