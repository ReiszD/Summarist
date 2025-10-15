import styles from "@/styles/Plan.module.css";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const AccordionItem = ({ title, content, isOpen, onToggle }) => {
    return (
      <div className={styles.accordion__card}>
        <div className={styles.accordion__header} onClick={onToggle}>
          <div className={styles.accordion__title}>
            {title}
          </div>
          <span className={styles.accordion__icon}>{isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
        </div>
          {isOpen && (
            <div
              className={`${styles.accordion__body} ${
                isOpen ? styles.show : styles.hide
              }`}
            >
              {content}
            </div>
          )}
      </div>
    );
  };
  return (
    <>
      <div className={styles.accordion}>
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </div>
    </>
  );
}
