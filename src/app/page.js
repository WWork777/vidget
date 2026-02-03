"use client";
import { useEffect } from "react";
import styles from "./Module.module.scss";

export default function Page() {
  useEffect(() => {
    // Проверяем, не загружен ли уже скрипт
    if (document.querySelector('script[src*="booking_iframe.js"]')) {
      initWidget();
      return;
    }

    // Загружаем скрипт
    const script = document.createElement("script");
    script.src =
      "https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js";
    script.async = true;

    script.onload = initWidget;

    document.head.appendChild(script);

    return () => {
      // Очистка при размонтировании
      const existingScript = document.querySelector(
        'script[src*="booking_iframe.js"]',
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const initWidget = () => {
    // Инициализируем виджет после загрузки скрипта
    if (window.BookingIframe) {
      const BnovoBookFrame = new window.BookingIframe({
        html_id: "booking_iframe",
        uid: "1e8bc851-59f4-4698-8b25-19b46beada1d",
        lang: "ru",
        width: "auto",
        height: "auto",
        rooms: "",
        IsMobile: "0",
        scroll_to_rooms: "0",
        fixed_header_selector: "",
        fixed_mobile_header_width: 800,
        fixed_mobile_header_selector: "",
        fixed_footer_selector: "",
        fixed_mobile_footer_width: 800,
        fixed_mobile_footer_selector: "",
      });
      BnovoBookFrame.init();
    }
  };

  return (
    <section className={styles.bookingSection}>
      <div className={styles.bookingContainer}>
        <div className={styles.bookingWidget} id="booking_iframe">
          <div className={styles.bnovoBranding} id="bn_iframe">
            <a
              className={styles.bnovoLink}
              href="https://bnovo.ru/bnovo-mb/?utm_source=client_modul_br"
              target="_blank"
              rel="noopener noreferrer"
            >
              Система управления отелем Bnovo ©
            </a>
          </div>
        </div>

        {/* Индикатор загрузки */}
      </div>
    </section>
  );
}
