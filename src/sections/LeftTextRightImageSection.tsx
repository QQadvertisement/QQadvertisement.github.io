  return (
    <section
      className={`relative ${gradientClass} py-20 px-6 overflow-hidden`}
    >
      {/* Background Shapes */}
      {reverseGradient ? (
        <>
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-teal-200 rounded-full opacity-20 blur-3xl z-0" />
          <div className="absolute bottom-0 -left-20 w-[200px] h-[200px] bg-yellow-200 rounded-full opacity-10 blur-2xl z-0" />
        </>
      ) : (
        <>
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-teal-200 rounded-full opacity-20 blur-3xl z-0" />
          <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-yellow-200 rounded-full opacity-10 blur-2xl z-0" />
        </>
      )}

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Text Column */}
        {/* ... existing code ... */}
      </div>
    </section>
  ); 