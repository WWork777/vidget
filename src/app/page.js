"use client";
import { useEffect, useRef } from "react";
import styles from "./Module.module.scss";

export default function Page() {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Функция для обработки iframe после загрузки
    const setupIframe = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      // Функция для вызова после загрузки iframe
      const onIframeLoad = () => {
        // Проверяем, что функции существуют в глобальном окне
        if (window.WidgetBookingOnLoadIframe) {
          window.WidgetBookingOnLoadIframe(iframe, false, null, null, {});
        }
        if (window.SetRoistatVisitId) {
          window.SetRoistatVisitId(iframe);
        }
      };

      // Добавляем обработчик загрузки
      iframe.addEventListener("load", onIframeLoad);

      // Если iframe уже загружен, вызываем сразу
      if (iframe.contentDocument?.readyState === "complete") {
        onIframeLoad();
      }

      // Очистка при размонтировании
      return () => {
        iframe.removeEventListener("load", onIframeLoad);
      };
    };

    // Даем время на монтирование iframe в DOM
    const timer = setTimeout(setupIframe, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.bookingSection}>
      <div className="container">
        <div className={styles.widgetWrapper}>
          <iframe
            ref={iframeRef}
            style={{
              border: 0,
              outline: 0,
              overflow: "hidden !important",
              minHeight: "auto !important",
              width: "100%",
            }}
            src="https://widgets.ays-office.ru/booking/#/%7B%22primary%22%3A%22134734%22%2C%22background%22%3A%22faf4df%22%2C%22foreground%22%3A%22fffefa%22%2C%22text%22%3A%22134734%22%2C%22widgetId%22%3A%2265558%22%7D/calendar/22/hotel/131094"
            id="widgetBookingReservations"
            scrolling="no"
            title="Виджет бронирования"
            className={styles.iframe}
          />
        </div>
      </div>
    </section>
  );
}
