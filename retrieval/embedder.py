from langchain_community.embeddings import OpenAIEmbeddings

#Create class to embed incoming json documents, ensure embeddings model can be swapped out

class OpenAIEmbedder:
    def __init__(self, chunk_size) -> None:
        self.embeddings_model = OpenAIEmbeddings()
        self.chunk_size = chunk_size

    def embed_documents(self, documents: list) -> list:
        """
        Embeds a list of documents using the OpenAI embeddings model.
        """
        embeddings = []
        for document in documents:
            embeddings.append(self.embeddings_model.embed(document))
        return embeddings