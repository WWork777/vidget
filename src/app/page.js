"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Module.module.scss";

export default function Page() {
  const iframeRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Загружаем скрипт в head, если он еще не загружен
    const scriptId = "widget-booking-resizer";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://pms.mehotel.ru/resources/js/ays-widget-booking.resizer.min.js?version=2.1";
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }

    // Очистка при размонтировании компонента
    return () => {
      // Можно оставить скрипт в head, так как он может использоваться на других страницах
    };
  }, []);

  useEffect(() => {
    // Инициализация виджета после загрузки скрипта и iframe
    if (isScriptLoaded && iframeRef.current) {
      const iframe = iframeRef.current;

      // Вызов функций виджета
      if (window.WidgetBookingOnLoadIframe) {
        window.WidgetBookingOnLoadIframe(iframe, false, null, null, {});
      }

      if (window.SetRoistatVisitId) {
        window.SetRoistatVisitId(iframe);
      }
    }
  }, [isScriptLoaded]);

  return (
    <div className={styles.container}>
      <iframe
        ref={iframeRef}
        id="widgetBookingReservations"
        src="https://widgets.ays-office.ru/booking/#/%7B%22primary%22%3A%22134734%22%2C%22background%22%3A%22ffffff%22%2C%22foreground%22%3A%22ffffff%22%2C%22text%22%3A%22134734%22%2C%22widgetId%22%3A%2265558%22%7D/calendar/22/hotel/131094"
        style={{
          border: 0,
          outline: 0,
          overflow: "hidden",
          minHeight: "auto",
          width: "100%",
        }}
        scrolling="no"
        title="Бронирование отеля"
      />
    </div>
  );
}
