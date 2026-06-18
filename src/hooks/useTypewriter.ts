import { useState, useEffect } from 'react';

interface UseTypewriterOptions {
  words: string[];
  speed?: number;
  delay?: number;
  loop?: boolean;
}

export const useTypewriter = (options: UseTypewriterOptions) => {
  const { words, speed = 80, delay = 2000, loop = true } = options;
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(text.slice(0, -1));
        }, speed / 2);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        if (!loop && wordIndex === words.length - 1) return;
      }
    } else {
      if (text.length < currentWord.length) {
        timeout = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, speed);
      } else {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, isPaused, wordIndex, words, speed, delay, loop]);

  return { text, isTyping: !isDeleting && text.length > 0 };
};
