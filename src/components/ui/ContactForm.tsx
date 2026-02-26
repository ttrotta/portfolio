"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitContact } from "@/app/actions/contact";
import { HiMail } from "react-icons/hi";

export default function ContactForm({
  dict,
}: {
  dict: {
    messageSent: string;
    sendAnother: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sending: string;
    sendMessage: string;
  };
}) {
  const [state, formAction, isPending] = useActionState(submitContact, {});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  if (state.success) {
    return (
      <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-3xl border border-green-500/30 bg-green-500/10 p-8 text-center backdrop-blur-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
          <svg
            className="h-8 w-8 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-2xl font-bold text-white">
          {dict.messageSent}
        </h3>
        <p className="font-body text-neutral-400">{state.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="font-body mt-4 text-sm text-neutral-500 underline hover:text-white"
        >
          {dict.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mx-auto flex w-full max-w-md flex-col gap-4"
    >
      <div>
        <input
          type="text"
          name="name"
          placeholder={dict.namePlaceholder}
          required
          disabled={isPending}
          className="font-body w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 px-6 py-4 text-white placeholder-neutral-500 backdrop-blur-sm transition-all outline-none focus:border-neutral-500 focus:bg-neutral-800/80 disabled:opacity-50"
        />
        {state.errors?.properties?.name?.errors && (
          <p className="font-body mt-2 pl-2 text-sm text-red-500">
            {state.errors.properties.name.errors[0]}
          </p>
        )}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder={dict.emailPlaceholder}
          required
          disabled={isPending}
          className="font-body w-full rounded-2xl border border-neutral-800 bg-neutral-900/60 px-6 py-4 text-white placeholder-neutral-500 backdrop-blur-sm transition-all outline-none focus:border-neutral-500 focus:bg-neutral-800/80 disabled:opacity-50"
        />
        {state.errors?.properties?.email?.errors && (
          <p className="font-body mt-2 pl-2 text-sm text-red-500">
            {state.errors.properties.email.errors[0]}
          </p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          placeholder={dict.messagePlaceholder}
          required
          disabled={isPending}
          rows={4}
          className="font-body w-full resize-none rounded-2xl border border-neutral-800 bg-neutral-900/60 px-6 py-4 text-white placeholder-neutral-500 backdrop-blur-sm transition-all outline-none focus:border-neutral-500 focus:bg-neutral-800/80 disabled:opacity-50"
        />
        {state.errors?.properties?.message?.errors && (
          <p className="font-body mt-2 pl-2 text-sm text-red-500">
            {state.errors.properties.message.errors[0]}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="font-body group flex w-full items-center justify-center gap-3 rounded-full border border-neutral-700 bg-white px-8 py-4 text-lg font-medium text-black transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending ? (
          <span className="flex items-center gap-2">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
            {dict.sending}
          </span>
        ) : (
          <>
            <HiMail className="h-6 w-6" />
            {dict.sendMessage}
          </>
        )}
      </button>

      {state.message && !state.success && (
        <p className="font-body mt-2 text-center text-sm text-red-500">
          {state.message}
        </p>
      )}
    </form>
  );
}
