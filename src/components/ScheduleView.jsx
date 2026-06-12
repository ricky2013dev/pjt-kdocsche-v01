import { useState, useEffect } from 'react';
import { Button, Card } from './common';

const ScheduleView = ({ selectedSlot, onSlotSelect, onNext }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('monthly');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Predefined demo data for time slots
  const generateTimeSlots = (date, dayOfMonth) => {
    const slots = [];
    const allTimes = [
      { time: '9:00 AM', available: true },
      { time: '9:30 AM', available: false },
      { time: '10:00 AM', available: true },
      { time: '10:30 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '2:00 PM', available: true },
      { time: '2:30 PM', available: false },
      { time: '3:00 PM', available: true },
      { time: '3:30 PM', available: true },
      { time: '4:00 PM', available: false },
    ];

    // Show 3-5 slots per day based on day number for variety
    const numSlots = 3 + (dayOfMonth % 3);
    const startIndex = dayOfMonth % (allTimes.length - numSlots);
    const daySlots = allTimes.slice(startIndex, startIndex + numSlots);

    daySlots.forEach(({ time, available }) => {
      slots.push({
        date: date.toDateString(),
        time: time,
        datetime: `${date.toLocaleDateString()} at ${time}`,
        available: available
      });
    });

    return slots;
  };

  const handleSlotClick = (slot) => {
    if (slot.available) {
      onSlotSelect(slot);
      // Automatically go to patient info page when available slot is clicked
      setTimeout(() => {
        onNext();
      }, 100);
    }
  };

  const renderMonthlyCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Empty cells before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="border-2 border-gray-200 rounded-lg p-2 md:p-3 min-h-[100px] md:min-h-[120px] opacity-30 pointer-events-none"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentDate.setHours(0, 0, 0, 0);
      const isToday = currentDate.getTime() === today.getTime();
      const isWeekday = currentDate.getDay() !== 0 && currentDate.getDay() !== 6;
      const isPast = currentDate < today;

      const slots = isWeekday && !isPast ? generateTimeSlots(currentDate, day) : [];

      days.push(
        <div
          key={day}
          className={`border border-gray-300 md:border-2 rounded md:rounded-lg p-1 md:p-3 min-h-[80px] md:min-h-[120px] ${
            isToday ? 'bg-green-50' : 'bg-white'
          }`}
        >
          <div className="font-bold text-gray-700 mb-1 text-xs md:text-base">{day}</div>
          {slots.length === 0 && !isPast && (
            <div className="text-[10px] md:text-xs text-gray-400 py-1">No slots</div>
          )}
          {slots.map((slot, idx) => (
            <div
              key={idx}
              onClick={() => handleSlotClick(slot)}
              title={slot.available ? `Click to book appointment at ${slot.time}` : 'Time slot not available'}
              className={`text-[9px] md:text-xs py-0.5 md:py-1 px-0.5 md:px-2 my-0.5 md:my-1 rounded-md transition-all leading-tight font-semibold border ${
                slot.available
                  ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600 hover:shadow-md hover:scale-102 border-green-600'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed border-gray-400'
              }`}
            >
              {slot.available ? (isMobile ? slot.time.replace(' ', '') : slot.time) : (isMobile ? 'N/A' : `${slot.time} - N/A`)}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const renderWeeklyCalendar = () => {
    const today = new Date(currentMonth);
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);

    const times = [];
    for (let hour = 9; hour <= 17; hour++) {
      times.push(`${hour % 12 || 12}:00 ${hour < 12 ? 'AM' : 'PM'}`);
      if (hour < 17) {
        times.push(`${hour % 12 || 12}:30 ${hour < 12 ? 'AM' : 'PM'}`);
      }
    }

    const elements = [];
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    // On mobile, show only 4 days (Sun-Wed), on desktop show all 7
    const daysToShow = isMobile ? 4 : 7;

    // Header row
    elements.push(<div key="corner" className="bg-white"></div>);
    for (let i = 0; i < daysToShow; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      elements.push(
        <div key={`header-${i}`} className="p-1 md:p-2 font-bold text-center border-b-2 border-gray-300 text-xs md:text-sm">
          <div className="hidden md:block">
            {date.toLocaleDateString('en-US', { weekday: 'short' })}<br />
            {date.getDate()}
          </div>
          <div className="md:hidden">
            {date.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 1)}<br />
            {date.getDate()}
          </div>
        </div>
      );
    }

    // Time rows
    times.forEach((time, timeIdx) => {
      elements.push(
        <div key={`time-${timeIdx}`} className="p-1 md:p-2 text-[10px] md:text-xs font-medium text-gray-600 text-right border-r-2 border-gray-300">
          <div className="hidden md:block">{time}</div>
          <div className="md:hidden">{time.replace(' ', '')}</div>
        </div>
      );

      for (let i = 0; i < daysToShow; i++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + i);
        date.setHours(0, 0, 0, 0);
        const isSunday = date.getDay() === 0;
        const isSaturday = date.getDay() === 6;
        const isWeekday = !isSunday && !isSaturday;
        const isPast = date < todayDate;

        // Randomly determine if slot is available (60% chance for weekdays, future dates)
        const isAvailable = isWeekday && !isPast && Math.random() > 0.4;

        const slot = {
          date: date.toDateString(),
          time: time,
          datetime: `${date.toLocaleDateString()} at ${time}`,
          available: isAvailable
        };

        elements.push(
          <div
            key={`slot-${timeIdx}-${i}`}
            onClick={() => handleSlotClick(slot)}
            title={isAvailable ? 'Click to book this appointment' : isSunday && !isPast ? 'Office closed on Sundays' : isWeekday && !isPast ? 'Time slot not available' : ''}
            className={`p-1 md:p-2 border min-h-[35px] md:min-h-[40px] transition-all text-center text-[9px] md:text-xs font-semibold flex items-center justify-center ${
              isAvailable
                ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600 hover:shadow-lg hover:scale-105 border-green-600 rounded-md'
                : isSunday && !isPast
                ? 'bg-red-100 text-red-600 cursor-not-allowed border-red-200'
                : isWeekday && !isPast
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                : 'bg-white border-gray-200'
            }`}
          >
            {isAvailable ? (
              <>
                <span className="hidden md:inline">Book</span>
                <span className="md:hidden">✓</span>
              </>
            ) : isSunday && !isPast ? (
              'Closed'
            ) : isWeekday && !isPast ? (
              'N/A'
            ) : (
              ''
            )}
          </div>
        );
      }
    });

    return elements;
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  return (
    <Card>
      <h2 className="text-xl md:text-3xl font-bold text-green-600 mb-3 md:mb-6">
        Select Your Appointment Time
      </h2>

      <div className="mb-3 md:mb-4 p-2 md:p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-[11px] md:text-sm text-blue-800 leading-snug md:leading-normal">
          <strong>Click green "Book" buttons</strong> to reserve your appointment. Hover to see details. Gray slots are unavailable.
        </p>
        <p className="text-[10px] md:text-xs text-blue-700 leading-snug md:leading-normal mt-1">
          녹색 "Book" 버튼을 클릭하여 예약하세요. 마우스를 올려 세부정보를 확인하세요. 회색 슬롯은 예약 불가능합니다.
        </p>
      </div>

      <div className="flex flex-col gap-2 md:gap-4 mb-3 md:mb-6">
        <div className="flex gap-1.5 md:gap-3">
          <Button
            onClick={() => setView('monthly')}
            variant={view === 'monthly' ? 'primary' : 'secondary'}
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-base flex-1 md:flex-none"
          >
            Monthly
          </Button>
          <Button
            onClick={() => setView('weekly')}
            variant={view === 'weekly' ? 'primary' : 'secondary'}
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-base flex-1 md:flex-none"
          >
            Weekly
          </Button>
        </div>

        <div className="flex items-center justify-between gap-1 md:gap-2">
          <Button
            onClick={() => changeMonth(-1)}
            variant="secondary"
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-base min-w-[40px] md:min-w-0"
          >
            <span className="hidden md:inline">← Previous</span>
            <span className="md:hidden">←</span>
          </Button>
          <span className="font-bold text-xs md:text-lg text-center px-1">
            {currentMonth.toLocaleDateString('en-US', { month: isMobile ? 'short' : 'long', year: 'numeric' })}
          </span>
          <Button
            onClick={() => changeMonth(1)}
            variant="secondary"
            className="px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-base min-w-[40px] md:min-w-0"
          >
            <span className="hidden md:inline">Next →</span>
            <span className="md:hidden">→</span>
          </Button>
        </div>
      </div>

      {view === 'monthly' ? (
        <>
          <div className="grid grid-cols-7 gap-0.5 md:gap-2 mb-1 md:mb-2 font-bold text-center text-[10px] md:text-base text-gray-600">
            <div className="hidden md:block">Sun</div>
            <div className="hidden md:block">Mon</div>
            <div className="hidden md:block">Tue</div>
            <div className="hidden md:block">Wed</div>
            <div className="hidden md:block">Thu</div>
            <div className="hidden md:block">Fri</div>
            <div className="hidden md:block">Sat</div>
            <div className="md:hidden py-1">S</div>
            <div className="md:hidden py-1">M</div>
            <div className="md:hidden py-1">T</div>
            <div className="md:hidden py-1">W</div>
            <div className="md:hidden py-1">T</div>
            <div className="md:hidden py-1">F</div>
            <div className="md:hidden py-1">S</div>
          </div>
          <div className="grid grid-cols-7 gap-0.5 md:gap-2">{renderMonthlyCalendar()}</div>
        </>
      ) : (
        <div className="max-h-[500px] md:max-h-[600px] overflow-x-auto overflow-y-auto">
          <div className={`grid gap-[2px] md:gap-1 ${isMobile ? 'grid-cols-[60px_repeat(4,1fr)]' : 'grid-cols-[100px_repeat(7,1fr)]'}`}>
            {renderWeeklyCalendar()}
          </div>
        </div>
      )}

      <div className="mt-3 md:mt-6 p-2 md:p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 md:gap-6 justify-center text-[10px] md:text-sm flex-wrap">
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-green-500 rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-gray-300 rounded"></div>
            <span>Not Available</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-red-100 border border-red-300 rounded"></div>
            <span>Closed</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ScheduleView;
