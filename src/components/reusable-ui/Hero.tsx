"use cliet";
export default function Hero(){

    return (
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-deep-violet via-primary to-[#9b7cf0] px-6 py-10 text-white sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-white/10 sm:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/2 hidden h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-white/10 sm:block"
        />

        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-10 top-1/2 h-20 w-20 -translate-y-1/2 fill-white/80 sm:right-32 sm:h-28 sm:w-28"
        >
          <path d="M12 0c.7 6.6 4.4 10.3 12 12-7.6 1.7-11.3 5.4-12 12-.7-6.6-4.4-10.3-12-12C7.6 10.3 11.3 6.6 12 0z" />
        </svg>

        <div className="relative max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Discover &amp; Connect
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Learn something new, together.
          </h1>
          <p className="mt-3 text-white/90">
            Small events. Big ideas. Find your next workshop.
          </p>
        </div>
      </section>
    );
}