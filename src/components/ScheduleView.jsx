import { useState, useEffect } from "react";

const ScheduleView = ({ selectedSlot, onSlotSelect, onNext, selectedDoctor, onChangeDoctor }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState("weekly");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const generateTimeSlots = (date, dayOfMonth) => {
    const allTimes = [
      { time: "9:00 AM", available: true },
      { time: "9:30 AM", available: false },
      { time: "10:00 AM", available: true },
      { time: "10:30 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "2:00 PM", available: true },
      { time: "2:30 PM", available: false },
      { time: "3:00 PM", available: true },
      { time: "3:30 PM", available: true },
      { time: "4:00 PM", available: false },
    ];
    const numSlots = 3 + (dayOfMonth % 3);
    const startIndex = dayOfMonth % (allTimes.length - numSlots);
    return allTimes.slice(startIndex, startIndex + numSlots).map(({ time, available }) => ({
      date: date.toDateString(),
      time,
      datetime: `${date.toLocaleDateString()} at ${time}`,
      available,
    }));
  };

  const handleSlotClick = (slot) => {
    if (slot.available) {
      onSlotSelect(slot);
      setTimeout(() => onNext(), 100);
    }
  };

  const changeWeekOrMonth = (direction) => {
    const d = new Date(currentMonth);
    if (view === "weekly") d.setDate(d.getDate() + direction * 7);
    else d.setMonth(d.getMonth() + direction);
    setCurrentMonth(d);
  };

  // ── Weekly calendar ──────────────────────────────────────
  const renderWeeklyCalendar = () => {
    const weekStart = new Date(currentMonth);
    weekStart.setHours(0, 0, 0, 0);

    const times = [];
    for (let h = 9; h <= 17; h++) {
      times.push(`${h % 12 || 12}:00 ${h < 12 ? "AM" : "PM"}`);
      if (h < 17) times.push(`${h % 12 || 12}:30 ${h < 12 ? "AM" : "PM"}`);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cols = isMobile ? "grid-cols-[64px_repeat(7,1fr)]" : "grid-cols-[90px_repeat(7,1fr)]";

    return (
      <div className="overflow-x-auto overflow-y-auto max-h-[520px] md:max-h-[600px] rounded-xl border border-slate-100">
        <div className={`grid ${cols} min-w-[480px]`}>
          {/* Corner */}
          <div className="bg-slate-50 border-b border-r border-slate-100 sticky top-0 z-10" />

          {/* Day headers */}
          {Array.from({ length: 7 }, (_, i) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const isToday = date.getTime() === today.getTime();
            const isSun = date.getDay() === 0;
            return (
              <div
                key={`hdr-${i}`}
                className={`py-2.5 text-center border-b border-l border-slate-100 sticky top-0 z-10 ${
                  isToday ? "bg-teal-600 text-white" : "bg-slate-50 text-slate-600"
                } ${isSun ? "opacity-40" : ""}`}
              >
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wide">
                  {date.toLocaleDateString("en-US", { weekday: isMobile ? "narrow" : "short" })}
                </p>
                <p className={`text-base md:text-lg font-bold leading-tight ${isToday ? "text-white" : "text-slate-800"}`}>
                  {date.getDate()}
                </p>
              </div>
            );
          })}

          {/* Time-slot rows */}
          {times.map((time, tIdx) => (
            <>
              {/* Time label */}
              <div
                key={`t-${tIdx}`}
                className="pr-2 md:pr-3 text-right text-[10px] md:text-xs text-slate-400 font-medium border-r border-b border-slate-100 bg-slate-50 flex items-center justify-end py-1"
              >
                {isMobile ? time.replace(" ", "") : time}
              </div>

              {/* Slots */}
              {Array.from({ length: 7 }, (_, i) => {
                const date = new Date(weekStart);
                date.setDate(weekStart.getDate() + i);
                date.setHours(0, 0, 0, 0);
                const isSun = date.getDay() === 0;
                const isPast = date < today;
                const isAvail = !isSun && !isPast && Math.random() > 0.4;
                const slot = { date: date.toDateString(), time, datetime: `${date.toLocaleDateString()} at ${time}`, available: isAvail };

                return (
                  <div
                    key={`s-${tIdx}-${i}`}
                    onClick={() => handleSlotClick(slot)}
                    className={`m-0.5 rounded-lg min-h-[34px] md:min-h-[38px] flex items-center justify-center text-xs font-semibold transition-all border ${
                      isAvail
                        ? "bg-teal-500 text-white border-teal-600 cursor-pointer hover:bg-teal-600 hover:shadow-md hover:scale-[1.04]"
                        : isPast || isSun
                        ? "bg-white border-slate-100 text-slate-200"
                        : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    }`}
                  >
                    {isAvail ? (
                      isMobile ? "+" : "예약"
                    ) : isPast || isSun ? "" : (
                      <span className="text-[10px]">N/A</span>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>
    );
  };

  // ── Monthly calendar ─────────────────────────────────────
  const renderMonthlyCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startDow = firstDay.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    for (let i = 0; i < startDow; i++) {
      days.push(<div key={`e-${i}`} className="min-h-[80px] md:min-h-[110px]" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(year, month, day);
      d.setHours(0, 0, 0, 0);
      const isToday = d.getTime() === today.getTime();
      const isSun = d.getDay() === 0;
      const isPast = d < today;
      const slots = !isSun && !isPast ? generateTimeSlots(d, day) : [];

      days.push(
        <div
          key={day}
          className={`rounded-xl border p-1.5 md:p-2.5 min-h-[80px] md:min-h-[110px] transition-colors ${
            isToday
              ? "border-teal-400 bg-teal-50"
              : isPast || isSun
              ? "border-slate-100 bg-slate-50 opacity-50"
              : "border-slate-200 bg-white hover:border-teal-200"
          }`}
        >
          <p className={`text-xs md:text-sm font-bold mb-1 ${isToday ? "text-teal-600" : "text-slate-600"}`}>
            {day}
          </p>
          {slots.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => handleSlotClick(slot)}
              className={`text-[10px] md:text-xs py-0.5 px-1 md:px-1.5 my-0.5 rounded-md font-semibold border transition-all ${
                slot.available
                  ? "bg-teal-500 text-white border-teal-600 cursor-pointer hover:bg-teal-600 hover:shadow-sm"
                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
              }`}
            >
              {slot.available
                ? isMobile ? slot.time.replace(" ", "") : slot.time
                : isMobile ? "N/A" : `${slot.time} N/A`}
            </div>
          ))}
        </div>
      );
    }
    return days;
  };

  const rangeLabel = view === "weekly"
    ? `${currentMonth.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${
        new Date(currentMonth.getTime() + 6 * 86400000).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        })
      }`
    : currentMonth.toLocaleDateString("en-US", { month: isMobile ? "short" : "long", year: "numeric" });

  return (
    <div className="space-y-4">

    {/* ── Selected doctor banner ── */}
    {selectedDoctor && (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-sm shrink-0 ${selectedDoctor.color}`}>
            {selectedDoctor.initials}
          </div>
          <div>
         
            <p className="font-bold text-slate-800 text-sm md:text-base">{selectedDoctor.name}</p>
            <p className="text-teal-600 text-xs font-medium">{selectedDoctor.specialty} · {selectedDoctor.city}</p>
          </div>
        </div>
        <button
          onClick={onChangeDoctor}
          className="shrink-0 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 hover:text-teal-600 hover:border-teal-200 transition-all"
        >
          의사 변경
        </button>
      </div>
    )}

    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 md:p-6">



      {/* Controls row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

        {/* View toggle */}
        <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1">
          {["weekly", "monthly"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                view === v
                  ? "bg-white text-teal-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {v === "weekly" ? "주간" : "월간"}
            </button>
          ))}
        </div>

        {/* Date navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => changeWeekOrMonth(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <span className="font-bold text-slate-700 text-sm md:text-base min-w-[180px] md:min-w-[240px] text-center">
            {rangeLabel}
          </span>
          <button
            onClick={() => changeWeekOrMonth(1)}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-teal-600 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      {view === "monthly" ? (
        <>
          <div className="grid grid-cols-7 mb-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wide">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
              <div key={d} className="py-1.5">{isMobile ? d[0] : d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {renderMonthlyCalendar()}
          </div>
        </>
      ) : (
        renderWeeklyCalendar()
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-teal-500 inline-block"></span>
          예약 가능
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-slate-200 inline-block"></span>
          예약 불가
        </span>
      </div>
    </div>
    </div>
  );
};

export default ScheduleView;
