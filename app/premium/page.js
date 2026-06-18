"use client";

import { useState } from "react";
import { setPremium } from "../lib/premium";

const initialForm = {
  cardholderName: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
  email: "",
};

export default function PremiumPage() {
  const [form, setForm] = useState(initialForm);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const cardDigits = form.cardNumber.replace(/\s/g, "");
    if (
      !form.cardholderName.trim() ||
      cardDigits.length < 13 ||
      !form.expiryDate.trim() ||
      form.cvc.length < 3 ||
      !form.email.trim()
    ) {
      setError("Please fill in all fields with valid details.");
      return;
    }

    setPremium();
    setPaid(true);
  }

  if (paid) {
    return (
      <main className="mx-auto w-full max-w-lg flex-1 px-6 py-16 text-center">
        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
          ✅ Payment complete, ads removed!
        </p>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Enjoy your ad-free TechCart experience. Your premium status is saved
          in this browser.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-lg flex-1 px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Go Premium</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Pay once (mock payment, no real charge) and never see another ad.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Cardholder name</span>
          <input
            type="text"
            name="cardholderName"
            value={form.cardholderName}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 dark:border-white/15 dark:bg-zinc-900"
            autoComplete="cc-name"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Card number</span>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            inputMode="numeric"
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 dark:border-white/15 dark:bg-zinc-900"
            autoComplete="cc-number"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium">Expiry date</span>
            <input
              type="text"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 dark:border-white/15 dark:bg-zinc-900"
              autoComplete="cc-exp"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">CVC</span>
            <input
              type="text"
              name="cvc"
              value={form.cvc}
              onChange={handleChange}
              inputMode="numeric"
              className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 dark:border-white/15 dark:bg-zinc-900"
              autoComplete="cc-csc"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-black/15 bg-white px-3 py-2 dark:border-white/15 dark:bg-zinc-900"
            autoComplete="email"
          />
        </label>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Pay $9.99 / month
        </button>
      </form>
    </main>
  );
}
