"use client";

import { JSX, startTransition, useEffect, useState } from "react";
import { questions, Question } from "../data/questions";
import Image from "next/image";
import getResultDog from "./helpers/getResult";

const STORAGE_KEY = "dog-quiz-attempts";

interface Attempt {
  id: number;
  timestamp: string;
  score: number;
  total: number;
}

export default function HomePage(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  // Load attempts from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Attempt[];

      if (Array.isArray(parsed)) {
        startTransition(() => {
          setAttempts(parsed);
        });
      }
    } catch (e) {
      console.error("Failed to load attempts", e);
    }
  }, []);

  const currentQuestion: Question = questions[currentIndex];

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = optionIndex;
      return updated;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const correctCount = questions.reduce((acc, q, index) => {
      return acc + (answers[index] === q.correctIndex ? 1 : 0);
    }, 0);

    setScore(correctCount);
    setIsFinished(true);

    const attempt: Attempt = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      score: correctCount,
      total: questions.length,
    };

    setAttempts((prev) => {
      const updated = [...prev, attempt];
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
      } catch (e) {
        console.error("Failed to save attempts", e);
      }
      return updated;
    });
  };

  const handleRetake = () => {
    setAnswers(Array(questions.length).fill(null));
    setCurrentIndex(0);
    setIsFinished(false);
    setScore(0);
  };

  const totalQuestions = questions.length;
  const answeredCurrent = answers[currentIndex] !== null;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const percentage = Math.round((score / totalQuestions) * 100);
  const resultDog = getResultDog(percentage);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-xl w-full bg-white/90 rounded-3xl shadow-xl border border-white/70 backdrop-blur-sm p-6 sm:p-8">
        {!isFinished ? (
          <>
            {/* Progress */}
            <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
              <span>
                Otázka {currentIndex + 1} / {totalQuestions}
              </span>
              <div className="flex-1 h-1.5 ml-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all"
                  style={{
                    width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Question */}
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
              {currentQuestion.question}
            </h1>

            {/* Image */}
            {currentQuestion.image && (
              <div className="w-full h-64 mb-6 relative rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={currentQuestion.image}
                  alt={`Image for question ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  key={currentQuestion.id}
                />
              </div>
            )}

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, idx) => {
                const selected = answers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left px-4 py-3 rounded-2xl border transition
                      ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                          : "border-gray-200 bg-white/80 text-gray-800 hover:border-emerald-300 hover:bg-emerald-50/60"
                      }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentIndex === 0}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition
                  ${
                    currentIndex === 0
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100"
                  }`}
              >
                Späť
              </button>

              <div className="flex gap-2">
                {!isLastQuestion && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!answeredCurrent}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition
                      ${
                        !answeredCurrent
                          ? "bg-emerald-200 text-white cursor-not-allowed"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                  >
                    Ďalej
                  </button>
                )}

                {isLastQuestion && (
                  <button
                    type="button"
                    onClick={handleFinish}
                    disabled={!answeredCurrent}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition
                      ${
                        !answeredCurrent
                          ? "bg-emerald-200 text-white cursor-not-allowed"
                          : "bg-emerald-500 text-white hover:bg-emerald-600"
                      }`}
                  >
                    Dokončiť kvíz
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Result screen */}
            <div className="text-center mb-6">
              <Image
                src={resultDog.src}
                alt={resultDog.alt}
                className="w-40 h-40 mx-auto mb-4 object-contain"
                width={160}
                height={160}
              />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Tvoj výsledok
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                {score} z {totalQuestions} otázok ({percentage}%)
              </p>
              <p className="text-base text-gray-800">{resultDog.text}</p>
            </div>

            <div className="flex justify-center mb-6">
              <button
                type="button"
                onClick={handleRetake}
                className="px-5 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-semibold hover:bg-emerald-600 transition"
              >
                Skúsiť kvíz znova
              </button>
            </div>

            {/* Answer summary */}
            <div className="border-t pt-4 mt-2 mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Prehľad tvojich odpovedí
              </h3>
              <ul className="space-y-3 max-h-72 overflow-y-auto text-sm">
                {questions.map((q, index) => {
                  const userAnswerIndex = answers[index];
                  const correctIndex = q.correctIndex;
                  const isCorrect = userAnswerIndex === correctIndex;

                  const userAnswerText =
                    userAnswerIndex !== null
                      ? q.options[userAnswerIndex]
                      : "Nezodpovedané";

                  const correctAnswerText = q.options[correctIndex];

                  return (
                    <li
                      key={q.id}
                      className={`rounded-2xl border px-3 py-2 text-left bg-white/80`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-500">
                          Otázka {index + 1}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            userAnswerIndex === null
                              ? "bg-gray-100 text-gray-500"
                              : isCorrect
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {userAnswerIndex === null
                            ? "Nezodpovedané"
                            : isCorrect
                            ? "Správne"
                            : "Nesprávne"}
                        </span>
                      </div>

                      <p className="text-gray-900 text-xs sm:text-sm mb-1">
                        {q.question}
                      </p>

                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">Tvoja odpoveď: </span>
                        <span
                          className={
                            userAnswerIndex === null
                              ? "italic text-gray-500"
                              : isCorrect
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }
                        >
                          {userAnswerIndex !== null
                            ? `${String.fromCharCode(
                                65 + userAnswerIndex
                              )}. ${userAnswerText}`
                            : "—"}
                        </span>
                      </p>

                      {!isCorrect && (
                        <p className="text-xs text-gray-700 mt-0.5">
                          <span className="font-semibold">
                            Správna odpoveď:{" "}
                          </span>
                          <span className="text-emerald-700">
                            {String.fromCharCode(65 + correctIndex)}.{" "}
                            {correctAnswerText}
                          </span>
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Attempts history */}
            <div className="border-t pt-4 mt-2">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Predchádzajúce pokusy
              </h3>
              {attempts.length === 0 ? (
                <p className="text-xs text-gray-500">
                  Zatiaľ nemáš žiadne uložené pokusy.
                </p>
              ) : (
                <ul className="space-y-2 max-h-40 overflow-y-auto text-xs">
                  {attempts
                    .slice()
                    .reverse()
                    .map((attempt) => {
                      const date = new Date(attempt.timestamp);
                      const attemptPercentage = Math.round(
                        (attempt.score / attempt.total) * 100
                      );
                      return (
                        <li
                          key={attempt.id}
                          className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
                        >
                          <span className="font-medium text-gray-800">
                            {attempt.score}/{attempt.total} ({attemptPercentage}
                            %)
                          </span>
                          <span className="text-[11px] text-gray-500">
                            {date.toLocaleDateString("sk-SK", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}{" "}
                            {date.toLocaleTimeString("sk-SK", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
