"use client";
import { useEffect, useRef } from "react";

export default function Booking() {
  const widgetInitialized = useRef(false);

  useEffect(() => {
    // Предотвращаем повторную инициализацию
    if (widgetInitialized.current) return;
    widgetInitialized.current = true;

    // Настройки виджета
    window.widgetOptions = {
      token: "3E08748E32EE77E477BE89DD6961F74C",
      target: "search-widget",
    };

    // Загружаем скрипт виджета
    const script = document.createElement("script");
    script.src = "https://www.bookinglite.ru/widgetBL/js/wid.js";
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="booking-widget-container">
      <div id="search-widget"></div>
    </div>
  );
}
