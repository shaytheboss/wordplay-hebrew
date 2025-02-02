import VocabularyGame from '@/components/VocabularyGame';

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          English-Hebrew Vocabulary Practice
        </h1>
        <VocabularyGame />
      </div>
    </div>
  );
};

export default Index;