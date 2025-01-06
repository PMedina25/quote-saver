import { Quote } from "@/models/Quote";
import { ReactNode, createContext, useState } from "react";

interface QuotesContextType {
  quotes: Quote[];
  addQuote: (quote: Quote) => void;
  addQuotes: (quotes: Quote[]) => void;
  removeQuote: (id: number) => void;
  clearQuotes: () => void;
}

const defaultValue: QuotesContextType = {
  quotes: [],
  addQuote: () => {},
  addQuotes: () => {},
  removeQuote: () => {},
  clearQuotes: () => {},
};

export const QuotesContext = createContext<QuotesContextType>(defaultValue);

export const QuotesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  const addQuote = (quote: Quote) => {
    setQuotes((prevQuotes) => [...prevQuotes, quote]);
  };

  const addQuotes = (quotes: Quote[]) => {
    setQuotes(quotes);
  };

  const removeQuote = (id: number) => {
    setQuotes((quotes) => quotes.filter((quote) => quote.id !== id));
  };

  const clearQuotes = () => {
    setQuotes([]);
  };

  return (
    <QuotesContext.Provider
      value={{ quotes, addQuote, addQuotes, removeQuote, clearQuotes }}
    >
      {children}
    </QuotesContext.Provider>
  );
};
