import React from "react";

const ExchangeSummaryCards = () => {
  const summaryCards = [
    {
      id: 1,
      title: "Available Exchange Slots",
      value: 12,
      description: "Slots available to claim",
      icon: "🔄",
      color: "bg-emerald-50",
      iconColor: "bg-emerald-100",
      textColor: "text-emerald-700",
    },
    {
      id: 2,
      title: "My Active Requests",
      value: 2,
      description: "Requests awaiting a result",
      icon: "📩",
      color: "bg-amber-50",
      iconColor: "bg-amber-100",
      textColor: "text-amber-700",
    },
    {
      id: 3,
      title: "Successful Exchanges",
      value: 4,
      description: "Exchanges completed",
      icon: "✓",
      color: "bg-blue-50",
      iconColor: "bg-blue-100",
      textColor: "text-blue-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {summaryCards.map((card) => (
        <div
          key={card.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>

              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>

              <p className="mt-2 text-sm text-slate-500">{card.description}</p>
            </div>

            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.iconColor}`}
            >
              <span className={`text-xl font-bold ${card.textColor}`}>
                {card.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExchangeSummaryCards;
